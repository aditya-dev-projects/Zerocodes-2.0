import React, { useEffect, useRef, useState } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { 
  X, Maximize2, XCircle, AlertTriangle 
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
// ----------------------------

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

const Terminal: React.FC<TerminalProps> = ({ onClose, onMaximize, resetTrigger }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  
  // TABS (Only Problems & Terminal)
  const [activeTab, setActiveTab] = useState<'PROBLEMS' | 'TERMINAL'>('TERMINAL');
  const [problems, setProblems] = useState<Problem[]>([]);

  // Helper: Remove ANSI color codes
  const stripAnsi = (str: string) => {
    return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
  };

  const parseForProblems = (chunk: string) => {
    const cleanLine = stripAnsi(chunk);
    const javaMatch = cleanLine.match(/([a-zA-Z0-9_]+\.(java|c|cpp|py)):(\d+): (error|warning): (.+)/);
    const pythonError = cleanLine.includes("Traceback (most recent call last)") || cleanLine.includes("Error:");

    if (javaMatch) {
        setProblems(prev => [...prev, {
            id: Date.now() + Math.random(),
            source: javaMatch[1],
            line: javaMatch[3],
            type: javaMatch[4] === 'warning' ? 'warning' : 'error',
            message: javaMatch[5].trim()
        }]);
    } else if (pythonError) {
        setProblems(prev => {
            if (prev.some(p => p.message.includes("Traceback"))) return prev;
            return [...prev, {
                id: Date.now(),
                source: 'script.py',
                type: 'error',
                message: "Runtime Error (See Terminal for details)"
            }];
        });
    }
  };

  // --- INITIALIZE XTERM ---
  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Consolas, "Courier New", monospace',
      lineHeight: 1.2,
      convertEol: true, 
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
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#e5e5e5',
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    
    term.open(terminalRef.current);
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    setTimeout(() => {
        try {
             if (terminalRef.current && terminalRef.current.clientWidth > 0) {
                 fitAddon.fit();
             }
        } catch (e) { console.warn("Initial fit failed", e); }
    }, 50);

    // --- LISTENERS ---
    const handleIncoming = (_: any, data: string) => {
      if (!xtermRef.current) return;
      try { term.write(data); } catch (err) { console.warn("Xterm write error:", err); }
      if (data.includes('\x1b[2J') || data.includes('\x1b[3J') || data.includes('\x1bc')) {
          setProblems([]);
      }
      parseForProblems(data);
    };

    const handleClearCommand = () => {
       try { 
           // FIX: Use reset() instead of clear() to force cursor to top-left (0,0)
           term.reset(); 
       } catch(e){}
       setProblems([]);
    };

    if (ipcRenderer) {
        ipcRenderer.on('terminal:incoming', handleIncoming);
        ipcRenderer.on('terminal:clear', handleClearCommand);
        term.onData((data) => {
          ipcRenderer.send('terminal:input', data);
        });
    } else {
        term.write("\r\n\x1b[33m[Web Mode] Terminal is read-only. Download Desktop App to run code.\x1b[0m\r\n");
    }

    return () => {
      if (ipcRenderer) {
          ipcRenderer.removeListener('terminal:incoming', handleIncoming);
          ipcRenderer.removeListener('terminal:clear', handleClearCommand);
      }
      term.dispose();
      xtermRef.current = null;
    };
  }, []);

  // --- RESET TRIGGER (Run Button) ---
  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
        if (xtermRef.current) {
            try { 
                // FIX: Full Reset on Run
                xtermRef.current.reset(); 
            } catch(e){}
        }
        setProblems([]);
    }
  }, [resetTrigger]);

  // --- SAFE RESIZE OBSERVER ---
  useEffect(() => {
    const performFit = () => {
        if (!fitAddonRef.current || !xtermRef.current || !terminalRef.current) return;
        if (activeTab !== 'TERMINAL' || terminalRef.current.clientWidth === 0) return;

        try {
            fitAddonRef.current.fit();
            const dims = fitAddonRef.current.proposeDimensions();
            if (dims && !isNaN(dims.cols) && !isNaN(dims.rows)) {
                if (ipcRenderer) ipcRenderer.send('terminal:resize', { cols: dims.cols, rows: dims.rows });
            }
        } catch(e) { }
    };

    const resizeObserver = new ResizeObserver(() => {
        window.requestAnimationFrame(performFit);
    });

    if (terminalRef.current) resizeObserver.observe(terminalRef.current);
    if (activeTab === 'TERMINAL') setTimeout(performFit, 100);

    return () => resizeObserver.disconnect();
  }, [activeTab]);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-t border-[#2b2b2b]">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 h-9 min-h-[36px] bg-[#1e1e1e] select-none border-b border-[#2b2b2b]">
        <div className="flex items-center gap-6">
           <div 
             onClick={() => setActiveTab('PROBLEMS')}
             className={`text-[11px] font-medium cursor-pointer h-full flex items-center border-b-[1px] transition-colors gap-1.5 ${activeTab === 'PROBLEMS' ? 'text-white border-[#e7c059]' : 'text-[#969696] border-transparent hover:text-[#cccccc]'}`}
           >
              <span>PROBLEMS</span>
              {problems.length > 0 && <div className="flex items-center justify-center bg-[#333] text-[#cccccc] rounded-full h-4 min-w-[16px] px-1 text-[10px]">{problems.length}</div>}
           </div>

           <div 
             onClick={() => setActiveTab('TERMINAL')}
             className={`text-[11px] font-medium cursor-pointer h-full flex items-center border-b-[1px] transition-colors ${activeTab === 'TERMINAL' ? 'text-white border-[#e7c059]' : 'text-[#969696] border-transparent hover:text-[#cccccc]'}`}
           >
              TERMINAL
           </div>
        </div>
        <div className="flex items-center gap-2 text-[#cccccc]">
           <div onClick={onMaximize} className="p-1 hover:bg-[#2a2d2e] rounded cursor-pointer"><Maximize2 size={14} /></div>
           <div onClick={onClose} className="p-1 hover:bg-[#2a2d2e] rounded cursor-pointer"><X size={14} /></div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 relative overflow-hidden bg-[#1e1e1e]">
         <div 
            ref={terminalRef} 
            className="h-full w-full pl-2"
            style={{ 
                visibility: activeTab === 'TERMINAL' ? 'visible' : 'hidden',
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                zIndex: activeTab === 'TERMINAL' ? 1 : 0
            }}
         />
         
         {activeTab === 'PROBLEMS' && (
            <div className="absolute inset-0 z-10 h-full w-full overflow-y-auto p-2 font-sans bg-[#1e1e1e]">
                {problems.length === 0 ? (
                    <div className="text-gray-500 text-sm flex flex-col items-center mt-4"><span>No problems have been detected.</span></div>
                ) : (
                    <div className="flex flex-col gap-1">
                        {problems.map((prob) => (
                            <div key={prob.id} className="flex items-start gap-2 hover:bg-[#2a2d2e] p-1 rounded cursor-pointer">
                                {prob.type === 'error' ? <XCircle size={14} className="text-[#f14c4c] mt-0.5" /> : <AlertTriangle size={14} className="text-[#e5e510] mt-0.5" />}
                                <div className="flex flex-col text-sm">
                                    <span className="text-[#cccccc]">{prob.message}</span>
                                    <span className="text-[#868686] text-xs">{prob.source} {prob.line && `[Ln ${prob.line}]`}</span>
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