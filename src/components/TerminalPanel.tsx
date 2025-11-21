import React, { useEffect, useRef, useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { ExecutionStatus } from '../types';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  output: string;
  status: ExecutionStatus;
  onClear: () => void;
  isWaitingForInput?: boolean;
  onInput?: (text: string) => void;
}

const TerminalPanel: React.FC<TerminalProps> = ({ 
  isOpen, 
  onClose, 
  output, 
  status, 
  onClear,
  isWaitingForInput = false,
  onInput
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output, isOpen, isWaitingForInput]);

  useEffect(() => {
    // Auto-focus input when waiting
    if (isWaitingForInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isWaitingForInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (onInput) {
        onInput(inputValue);
        setInputValue("");
      }
    }
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
          <div className="h-full flex items-center px-1 cursor-pointer hover:text-gray-200 text-gray-500">
            <span className="text-xs uppercase font-medium">Output</span>
          </div>
          <div className="h-full flex items-center px-1 cursor-pointer hover:text-gray-200 text-gray-500">
            <span className="text-xs uppercase font-medium">Debug Console</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-400">
          <button onClick={onClear} title="Clear Terminal" className="hover:text-gray-100 p-1 rounded hover:bg-gray-700">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={onClose} title="Close Panel" className="hover:text-gray-100 p-1 rounded hover:bg-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm text-gray-300"
      >
        {status === ExecutionStatus.COMPILING && (
          <div className="text-blue-400 mb-2 italic">Compiling blocks...</div>
        )}
        
        <div className="whitespace-pre-wrap leading-relaxed">
          {output || <span className="text-gray-600">Type 'Run' to execute your blocks.</span>}
          
          {status === ExecutionStatus.RUNNING && !isWaitingForInput && (
             <span className="inline-block w-2 h-4 align-middle bg-gray-400 ml-1 animate-pulse"/>
          )}
        </div>

        {/* Interactive Input Line */}
        {isWaitingForInput && (
          <div className="flex items-center mt-1">
             <span className="text-green-500 font-bold mr-2">➜</span>
             <input
               ref={inputRef}
               type="text"
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={handleKeyDown}
               className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder-gray-600"
               placeholder="Enter input..."
               autoComplete="off"
             />
          </div>
        )}

        {!isWaitingForInput && output && status !== ExecutionStatus.RUNNING && (
          <div className="mt-2 flex items-center text-gray-500">
            <span className="text-green-500 font-bold mr-2">➜</span>
            <span>_</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalPanel;