import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { 
  X, Maximize2, XCircle, AlertTriangle, Trash2, Terminal as TerminalIcon
} from 'lucide-react';

// --- SAFE ELECTRON IMPORT ---
const getElectron = () => {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.require) {
    try { return window.require('electron'); } catch { return null; }
  }
  return null;
};
const electron = getElectron();
const ipcRenderer = electron?.ipcRenderer || null;

interface TerminalProps {
  onClose: () => void;
  onClear: () => void;
  onMaximize?: () => void;
  resetTrigger?: number;
}

interface Problem {
  id: number;
  message: string;
  line?: string;
  source: string;
  type: 'error' | 'warning';
}

const Terminal: React.FC<TerminalProps> = ({ onClose, onClear, onMaximize, resetTrigger }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  // Use a ref for activeTab so ResizeObserver callback is never stale
  const activeTabRef = useRef<'PROBLEMS' | 'TERMINAL'>('TERMINAL');
  
  const [activeTab, setActiveTab] = useState<'PROBLEMS' | 'TERMINAL'>('TERMINAL');
  const [problems, setProblems] = useState<Problem[]>([]);

  // Keep ref in sync with state
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  const stripAnsi = (str: string) => {
    return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
  };

  const parseForProblems = (chunk: string) => {
    const cleanLine = stripAnsi(chunk);
    const javaMatch = cleanLine.match(/([a-zA-Z0-9_]+\.(java|c|cpp|py)):(\d+): (error|warning): (.+)/);
    if (javaMatch) {
        setProblems(prev => [...prev, {
            id: Date.now() + Math.random(),
            source: javaMatch[1],
            line: javaMatch[3],
            type: javaMatch[4] === 'warning' ? 'warning' : 'error',
            message: javaMatch[5].trim()
        }]);
    }
  };

  // Stable sync function — reads activeTab via ref so it's never stale
  const syncDimensions = useCallback(() => {
    if (activeTabRef.current === 'TERMINAL' && terminalRef.current && fitAddonRef.current) {
      try {
        fitAddonRef.current.fit();
        const dims = fitAddonRef.current.proposeDimensions();
        if (dims && ipcRenderer) {
          ipcRenderer.send('terminal:resize', { cols: dims.cols, rows: dims.rows });
        }
      } catch(e) {}
    }
  }, []);

  // --- INITIALIZE XTERM ---
  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerminal({
      cursorBlink: true,
      fontSize: 13,
      fontFamily: 'Consolas, "Courier New", monospace',
      lineHeight: 1.2,
      convertEol: true,
      scrollback: 5000,
      theme: {
        background: '#1e1e1e',
        foreground: '#cccccc',
        cursor: '#ffffff',
        selectionBackground: '#264f78',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        brightBlack: '#666666'
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    // This is the ONLY handler that writes to xterm.
    // Everything the PTY sends comes through here.
    // We do not write to xterm anywhere else during a run.
    const handleIncoming = (_: any, data: string) => {
      if (xtermRef.current) {
        xtermRef.current.write(data);
        parseForProblems(data);
      }
    };

    if (ipcRenderer) {
        ipcRenderer.on('terminal:incoming', handleIncoming);
        
        term.onData((data) => {
          ipcRenderer.send('terminal:input', data);
        });
    }

    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(syncDimensions);
    });
    resizeObserver.observe(terminalRef.current);

    // Initial fit after mount
    setTimeout(syncDimensions, 150);

    return () => {
      if (ipcRenderer) {
          ipcRenderer.removeListener('terminal:incoming', handleIncoming);
      }
      resizeObserver.disconnect();
      term.dispose();
    };
  }, [syncDimensions]);

  // --- MANUAL CLEAR (trash button only) ---
  // This is NOT called during a run. During a run, main.cjs handles
  // clearing by writing "clear"/"Clear-Host" into the PTY itself.
  // This handler is only for when the user manually clicks the trash icon.
  // It writes "clear" into the PTY via IPC so that the clear goes through
  // the PTY stream and PTY + xterm stay synchronized.
  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      setProblems([]);
      setActiveTab('TERMINAL');
      // Send clear command through the PTY so both sides stay in sync
      if (ipcRenderer) {
        ipcRenderer.send('terminal:input', 'clear\r');
      }
    }
  }, [resetTrigger]);

  // Manual trash button click handler
  const handleTrashClick = () => {
    setProblems([]);
    // Write clear into the PTY — do not call xterm.reset() or xterm.clear()
    if (ipcRenderer) {
      ipcRenderer.send('terminal:input', 'clear\r');
    }
    onClear();
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-t border-[#2b2b2b]">
      {/* VS CODE STYLE HEADER */}
      <div className="flex items-center justify-between px-4 h-9 bg-[#1e1e1e] select-none border-b border-[#2b2b2b] shrink-0">
        <div className="flex h-full items-center gap-6">
           <div 
             onClick={() => setActiveTab('PROBLEMS')}
             className={`text-[11px] font-semibold cursor-pointer h-full flex items-center border-b-2 transition-all gap-1.5 ${activeTab === 'PROBLEMS' ? 'text-white border-blue-500' : 'text-[#969696] border-transparent hover:text-[#cccccc]'}`}
           >
             PROBLEMS
             {problems.length > 0 && <span className="bg-[#444] text-white rounded-full px-1.5 text-[9px]">{problems.length}</span>}
           </div>

           <div 
             onClick={() => setActiveTab('TERMINAL')}
             className={`text-[11px] font-semibold cursor-pointer h-full flex items-center border-b-2 transition-all gap-1.5 ${activeTab === 'TERMINAL' ? 'text-white border-blue-500' : 'text-[#969696] border-transparent hover:text-[#cccccc]'}`}
           >
              <TerminalIcon size={12} />
              TERMINAL
           </div>
        </div>
        
        <div className="flex items-center gap-3 text-[#969696]">
           <Trash2 size={14} className="hover:text-white cursor-pointer" onClick={handleTrashClick} />
           <Maximize2 size={14} className="hover:text-white cursor-pointer" onClick={onMaximize} />
           <X size={16} className="hover:text-red-500 cursor-pointer" onClick={onClose} />
        </div>
      </div>

      {/* TERMINAL CONTAINER */}
      <div className="flex-1 relative bg-[#1e1e1e] overflow-hidden">
         <div 
            ref={terminalRef} 
            className="h-full w-full absolute inset-0 pl-2 py-1"
            style={{ 
                visibility: activeTab === 'TERMINAL' ? 'visible' : 'hidden',
                zIndex: activeTab === 'TERMINAL' ? 1 : 0
            }}
         />
         
         {activeTab === 'PROBLEMS' && (
            <div className="absolute inset-0 z-10 h-full w-full overflow-y-auto p-4 font-sans bg-[#1e1e1e]">
                {problems.length === 0 ? (
                    <div className="text-gray-500 text-sm text-center mt-10">No problems have been detected in the workspace.</div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {problems.map((prob) => (
                            <div key={prob.id} className="flex items-start gap-3 hover:bg-[#2a2d2e] p-1.5 rounded group transition-colors">
                                {prob.type === 'error' ? <XCircle size={14} className="text-[#f14c4c] mt-0.5" /> : <AlertTriangle size={14} className="text-[#e5e510] mt-0.5" />}
                                <div className="flex flex-col">
                                    <span className="text-[#cccccc] text-sm">{prob.message}</span>
                                    <span className="text-[#868686] text-xs uppercase tracking-tighter">{prob.source} • Line {prob.line}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
         )}
      </div>
    </div>
  );
};

export default Terminal;