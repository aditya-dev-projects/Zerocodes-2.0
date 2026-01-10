import React, { useEffect, useRef } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

// --- Fix: Extend Window interface for Electron's require ---
declare global {
  interface Window {
    require: any;
  }
}

// Access Electron safely
const { ipcRenderer } = window.require ? window.require('electron') : { 
  ipcRenderer: { send: () => {}, on: () => {}, removeAllListeners: () => {} } 
};

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

const TerminalPanel: React.FC<TerminalProps> = ({ 
  isOpen, 
  onClose, 
  onClear
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!isOpen || !terminalRef.current) return;

    if (!xtermRef.current) {
      const term = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: 'Consolas, "Courier New", monospace',
        theme: {
          background: '#1e1e1e',
          foreground: '#cccccc'
        }
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      
      term.open(terminalRef.current);
      fitAddon.fit();

      // Send input to Electron PTY
      // --- Fix: Added explicit type (data: string) ---
      term.onData((data: string) => {
        ipcRenderer.send('terminal-input', data);
      });

      // Receive output from Electron PTY
      // --- Fix: Added explicit type (data: string) ---
      ipcRenderer.on('terminal-incoming', (_event: any, data: string) => {
        term.write(data);
      });

      xtermRef.current = term;
      fitAddonRef.current = fitAddon;
      
      // Initial resize to fit container
      setTimeout(() => fitAddon.fit(), 100);
    }

    // Handle Window Resize
    const handleResize = () => {
      if (fitAddonRef.current && xtermRef.current) {
        fitAddonRef.current.fit();
        ipcRenderer.send('terminal-resize', {
          cols: xtermRef.current.cols,
          rows: xtermRef.current.rows
        });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ipcRenderer.removeAllListeners('terminal-incoming');
    };
  }, [isOpen]);

  // Handle manual clear
  useEffect(() => {
    // xterm's clear is handled via the button below calling handleClear
  }, [onClear]);

  const handleClear = () => {
    if (xtermRef.current) {
      xtermRef.current.clear();
      // Optional: Send 'clear' or 'cls' command to PTY if you want a shell clear
      // ipcRenderer.send('terminal-input', navigator.userAgent.includes('Win') ? 'cls\r' : 'clear\r');
    }
    onClear();
  };

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] border-t border-[#2b2b2b]">
      {/* Terminal Tabs / Header */}
      <div className="flex items-center justify-between px-4 h-9 bg-[#1e1e1e] border-b border-[#2b2b2b] select-none">
        <div className="flex items-center space-x-6 h-full">
          <div className="h-full flex items-center border-b border-blue-500 px-1 cursor-pointer">
            <span className="text-xs uppercase font-medium text-gray-100">Terminal</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-400">
          <button onClick={handleClear} title="Clear Terminal" className="hover:text-gray-100 p-1 rounded hover:bg-gray-700">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={onClose} title="Close Panel" className="hover:text-gray-100 p-1 rounded hover:bg-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* XTerm Container */}
      <div className="flex-1 overflow-hidden relative pl-2 pt-1">
         <div ref={terminalRef} className="h-full w-full" />
      </div>
    </div>
  );
};

export default TerminalPanel;