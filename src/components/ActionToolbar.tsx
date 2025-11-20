import React from 'react';
import { Play, Bug, Sparkles, BookOpen, ArrowRightLeft } from 'lucide-react';
import { Language, ToolMode, ExecutionStatus } from '../types';

interface ActionToolbarProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  onRun: (mode: ToolMode) => void;
  onConvert: () => void;
  status: ExecutionStatus;
}

const ActionToolbar: React.FC<ActionToolbarProps> = ({ 
  currentLang, 
  onLangChange, 
  onRun, 
  onConvert,
  status 
}) => {
  const isBusy = status === ExecutionStatus.RUNNING || status === ExecutionStatus.COMPILING;

  return (
    <div className="h-16 border-b border-gray-800 bg-[#161b22] flex items-center justify-between px-4 md:px-6 shadow-sm z-10">
      
      {/* Left: Language Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex bg-[#0d1117] rounded-lg p-1 border border-gray-700">
          <button
            onClick={() => onLangChange(Language.C)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              currentLang === Language.C 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            C (GCC)
          </button>
          <button
            onClick={() => onLangChange(Language.PYTHON)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              currentLang === Language.PYTHON 
                ? 'bg-yellow-500 text-gray-900 shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Python 3
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-2 md:space-x-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onRun(ToolMode.EXECUTE)}
          disabled={isBusy}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            isBusy 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 text-white shadow-green-900/20 shadow-lg'
          }`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">Run Code</span>
        </button>

        <div className="h-6 w-px bg-gray-700 mx-2 hidden md:block"></div>

        <button
          onClick={() => onRun(ToolMode.DEBUG)}
          disabled={isBusy}
          title="Debug & Fix"
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Bug className="w-5 h-5" />
        </button>

        <button
          onClick={() => onRun(ToolMode.OPTIMIZE)}
          disabled={isBusy}
          title="Optimize"
          className="p-2 text-gray-400 hover:text-purple-400 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Sparkles className="w-5 h-5" />
        </button>

        <button
          onClick={() => onRun(ToolMode.EXPLAIN)}
          disabled={isBusy}
          title="Explain Code"
          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <BookOpen className="w-5 h-5" />
        </button>

        <button
          onClick={onConvert}
          disabled={isBusy}
          title={`Convert to ${currentLang === Language.C ? 'Python' : 'C'}`}
          className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowRightLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ActionToolbar;