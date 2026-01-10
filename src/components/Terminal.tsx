import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const { ipcRenderer } = window.require('electron');

const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    // 1. Initialize XTerm
    const term = new XTerm({
      cursorBlink: true,
      theme: {
        background: '#0c0c0c',
        foreground: '#cccccc',
        cursor: '#ffffff'
      },
      fontFamily: 'Consolas, monospace',
      fontSize: 14,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();
    xtermRef.current = term;

    // 2. Handle Resize
    const handleResize = () => {
        fitAddon.fit();
        if(xtermRef.current) {
            ipcRenderer.send('terminal:resize', { 
                cols: xtermRef.current.cols, 
                rows: xtermRef.current.rows 
            });
        }
    };
    window.addEventListener('resize', handleResize);

    // 3. Setup Listeners
    // Data from User -> Electron
    term.onData((data) => {
      ipcRenderer.send('terminal:input', data);
    });

    // Data from Electron -> Screen
    const handleIncoming = (_: any, data: string) => {
        term.write(data);
    };

    // Clear Screen Command
    const handleClear = () => {
        term.clear(); // Clears buffer
        term.reset(); // Resets state
    };

    ipcRenderer.on('terminal:incoming', handleIncoming);
    ipcRenderer.on('terminal:clear', handleClear);

    // Cleanup
    return () => {
      term.dispose();
      ipcRenderer.removeListener('terminal:incoming', handleIncoming);
      ipcRenderer.removeListener('terminal:clear', handleClear);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={terminalRef} 
      style={{ width: '100%', height: '100%', overflow: 'hidden' }} 
    />
  );
};

export default Terminal;