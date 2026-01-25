import React, { useEffect, useRef } from 'react';
import { Terminal, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ExecutionStatus, ToolMode } from '../types';

interface OutputConsoleProps {
  output: string;
  status: ExecutionStatus;
  mode: ToolMode;
  executionTime?: number;
}

const OutputConsole: React.FC<OutputConsoleProps> = ({ output, status, mode, executionTime }) => {
  const outputRef = useRef<HTMLPreElement>(null);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const getStatusColor = () => {
    switch (status) {
      case ExecutionStatus.RUNNING: return 'text-yellow-400';
      case ExecutionStatus.COMPILING: return 'text-blue-400';
      case ExecutionStatus.ERROR: return 'text-red-400';
      case ExecutionStatus.SUCCESS: return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case ExecutionStatus.RUNNING: 
      case ExecutionStatus.COMPILING:
        return <Activity className={`w-4 h-4 animate-pulse ${getStatusColor()}`} />;
      case ExecutionStatus.ERROR:
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case ExecutionStatus.SUCCESS:
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return <Terminal className="w-4 h-4 text-gray-500" />;
    }
  };

  const getHeaderText = () => {
    if (mode === ToolMode.EXECUTE) return "Terminal Output";
    // Future modes (DEBUG, OPTIMIZE, etc.) can be added here once defined in types.ts
    return "Output";
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1117] border-t md:border-t-0 md:border-l border-gray-800">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-gray-800 select-none">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-sm font-medium text-gray-300">{getHeaderText()}</span>
        </div>
        <div className="flex items-center space-x-4 text-xs font-mono">
          {executionTime !== undefined && status === ExecutionStatus.SUCCESS && (
            <span className="text-gray-500">Done in {executionTime}ms</span>
          )}
          <span className={`${getStatusColor()} uppercase`}>{status}</span>
        </div>
      </div>

      {/* Console Body */}
      <div className="flex-1 relative overflow-hidden p-4">
        <pre 
          ref={outputRef}
          className="w-full h-full overflow-auto font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap break-words"
        >
          {output || <span className="text-gray-600 italic">// Output will appear here...</span>}
          {status === ExecutionStatus.RUNNING && (
             <span className="animate-pulse inline-block w-2 h-4 align-middle bg-gray-400 ml-1"/>
          )}
        </pre>
      </div>
    </div>
  );
};

export default OutputConsole;