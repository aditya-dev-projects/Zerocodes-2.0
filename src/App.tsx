
import React, { useState, useEffect, useRef } from 'react';
import { Play, Save, Code2, Blocks, Settings, FileJson, BookOpen, Bug, LayoutTemplate, Type } from 'lucide-react';
import { Language, ExecutionStatus, ToolMode, type BlockInstance } from './types';
import { BlockSidebar, BlockCanvas, BLOCK_DEFINITIONS } from './components/BlockComponents';
import CodeEditor from './components/CodeEditor';
import TerminalPanel from './components/TerminalPanel';
import { streamGeminiResponse, CodeExecutor } from './services/gemini';

// --- Code Generator Helper ---
const generateCodeFromBlocks = (blocks: BlockInstance[], lang: Language): string => {
  if (blocks.length === 0) return "";

  const generateBlockCode = (block: BlockInstance, indentLevel: number): string => {
    const indent = "    ".repeat(indentLevel);
    
    // Find the definition to get the template
    const def = BLOCK_DEFINITIONS.find(d => d.id === block.type);
    if (!def) return `${indent}// Unknown block: ${block.type}\n`;

    // Get template for current language, or fallback
    let template = def.code[lang] || Object.values(def.code)[0] || "";
    
    // Replace placeholders {varName} with actual values from block.params
    Object.entries(block.params).forEach(([key, value]) => {
      // Replace all occurrences
      template = template.split(`{${key}}`).join(value);
    });

    let result = indent + template + "\n";

    // Handle Children (Nesting)
    if (block.children && block.children.length > 0) {
      block.children.forEach(child => {
        result += generateBlockCode(child, indentLevel + 1);
      });
      
      // Auto-close logic
      if (template.trim().endsWith('{')) {
         result += indent + "}\n";
      }
    }
    
    return result;
  };

  return blocks.map(b => generateBlockCode(b, 0)).join("");
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.C);
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  
  // New state for switching views
  const [viewMode, setViewMode] = useState<'blocks' | 'code'>('blocks');
  
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [status, setStatus] = useState<ExecutionStatus>(ExecutionStatus.IDLE);
  const [output, setOutput] = useState("");
  
  // Interactive Execution State
  const [executor, setExecutor] = useState<CodeExecutor | null>(null);
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);

  // Auto-generate code when blocks or language changes (Only in Block Mode)
  useEffect(() => {
    if (viewMode === 'blocks') {
      const code = generateCodeFromBlocks(blocks, language);
      setGeneratedCode(code);
    }
  }, [blocks, language, viewMode]);

  // Reset blocks when language changes to prevent invalid block types staying
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (viewMode === 'blocks') {
      setBlocks([]); // Clear blocks on language switch for safety in block mode
    }
    setExecutor(null); // Reset executor on language change
  };

  const handleRun = async () => {
    if (!generatedCode.trim()) return;
    
    setTerminalOpen(true);
    setStatus(ExecutionStatus.COMPILING);
    setOutput("");
    setIsWaitingForInput(false);
    
    // Initialize a new executor session
    const newExecutor = new CodeExecutor(language);
    setExecutor(newExecutor);

    // Slight delay to show compiling state
    setTimeout(async () => {
      setStatus(ExecutionStatus.RUNNING);
      try {
        let inputRequested = false;
        await newExecutor.start(generatedCode, (text) => {
          if (text.includes("__REQ_IN__")) {
            inputRequested = true;
            setIsWaitingForInput(true);
            // Clean the token from output
            setOutput(prev => prev + text.replace("__REQ_IN__", ""));
          } else {
            setOutput(prev => prev + text);
          }
        });
        
        // If finished without requesting input, mark success
        if (!inputRequested) {
           setStatus(ExecutionStatus.SUCCESS);
        }
      } catch (e) {
        setStatus(ExecutionStatus.ERROR);
      }
    }, 500);
  };

  const handleTerminalInput = async (inputText: string) => {
    if (!executor) return;

    // Echo user input to terminal
    setOutput(prev => prev + inputText + "\n");
    setIsWaitingForInput(false);

    try {
      let inputRequested = false;
      await executor.sendInput(inputText, (text) => {
        if (text.includes("__REQ_IN__")) {
          inputRequested = true;
          setIsWaitingForInput(true);
          setOutput(prev => prev + text.replace("__REQ_IN__", ""));
        } else {
          setOutput(prev => prev + text);
        }
      });

      if (!inputRequested) {
        setStatus(ExecutionStatus.SUCCESS);
      }
    } catch (e) {
      setStatus(ExecutionStatus.ERROR);
    }
  };

  const handleExplain = async () => {
    if (!generatedCode.trim()) return;

    setTerminalOpen(true);
    setStatus(ExecutionStatus.RUNNING);
    setOutput("Analyzing code logic...\n\n");

    try {
      await streamGeminiResponse(generatedCode, language, ToolMode.EXPLAIN, {
        onChunk: (text) => {
          setOutput(prev => prev + text);
        }
      });
      setStatus(ExecutionStatus.SUCCESS);
    } catch (e) {
      setStatus(ExecutionStatus.ERROR);
    }
  };

  const handleDebug = async () => {
    if (!generatedCode.trim()) return;

    setTerminalOpen(true);
    setStatus(ExecutionStatus.RUNNING);
    setOutput("Scanning for errors and potential fixes...\n\n");

    try {
      await streamGeminiResponse(generatedCode, language, ToolMode.DEBUG, {
        onChunk: (text) => {
          setOutput(prev => prev + text);
        }
      });
      setStatus(ExecutionStatus.SUCCESS);
    } catch (e) {
      setStatus(ExecutionStatus.ERROR);
    }
  };

  const handleSave = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    let ext = '.txt';
    if (language === Language.C) ext = '.c';
    else if (language === Language.PYTHON) ext = '.py';
    else if (language === Language.JAVA) ext = '.java';
    
    a.download = `main${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen w-screen bg-[#1e1e1e] text-gray-300 overflow-hidden font-sans">
      
      {/* Activity Bar (Far Left) */}
      <div className="w-12 flex flex-col items-center py-4 bg-[#333333] border-r border-[#2b2b2b] z-20">
        <div 
          onClick={() => setViewMode('blocks')}
          className={`mb-6 cursor-pointer transition-colors border-l-2 pl-3 ml-[-2px] ${viewMode === 'blocks' ? 'text-white border-white' : 'text-gray-500 border-transparent hover:text-white'}`}
          title="Block Editor"
        >
          <Blocks className="w-6 h-6" />
        </div>
        <div 
          onClick={() => setViewMode('code')}
          className={`mb-6 cursor-pointer transition-colors border-l-2 pl-3 ml-[-2px] ${viewMode === 'code' ? 'text-white border-white' : 'text-gray-500 border-transparent hover:text-white'}`}
          title="Code Editor"
        >
          <Code2 className="w-6 h-6" />
        </div>
        <div className="mt-auto cursor-pointer text-gray-500 hover:text-white">
          <Settings className="w-6 h-6" />
        </div>
      </div>

      {/* Primary Sidebar (Toolbox) - Only visible in Block Mode */}
      {viewMode === 'blocks' && (
        <div className="w-64 flex flex-col bg-[#252526] border-r border-[#2b2b2b]">
          <div className="h-9 px-4 flex items-center text-xs font-medium uppercase tracking-wide text-gray-400 bg-[#252526] shadow-sm">
            Toolbox
          </div>
          <BlockSidebar currentLang={language} />
          
          {/* Language Selector in Sidebar Footer */}
          <div className="mt-auto p-4 border-t border-[#333]">
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Target Language</label>
            <select 
              value={language} 
              onChange={(e) => handleLanguageChange(e.target.value as Language)}
              className="w-full bg-[#3c3c3c] text-white text-sm rounded p-2 outline-none border border-gray-600 focus:border-blue-500"
            >
              <option value={Language.C}>C (GCC)</option>
              <option value={Language.PYTHON}>Python 3</option>
              <option value={Language.JAVA}>Java</option>
            </select>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
        
        {/* Top Bar */}
        <div className="h-10 flex items-center justify-between px-4 bg-[#1e1e1e] border-b border-[#2b2b2b] select-none">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <FileJson className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-300">
                {viewMode === 'blocks' ? 'visual_script' : 'main'}.{language === Language.PYTHON ? 'py' : language === Language.JAVA ? 'java' : 'c'}
              </span>
            </div>

            {/* View Mode Toggle Switch */}
            <div className="flex bg-[#2d2d2d] rounded p-0.5">
              <button
                onClick={() => setViewMode('blocks')}
                className={`flex items-center space-x-1 px-2 py-0.5 rounded text-xs transition-colors ${viewMode === 'blocks' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}
              >
                <LayoutTemplate className="w-3 h-3" />
                <span>Blocks</span>
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`flex items-center space-x-1 px-2 py-0.5 rounded text-xs transition-colors ${viewMode === 'code' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}
              >
                <Type className="w-3 h-3" />
                <span>Code</span>
              </button>
            </div>
            
            {/* Language Selector (Visible in Code Mode only since it's not in sidebar) */}
            {viewMode === 'code' && (
              <select 
                value={language} 
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="bg-[#3c3c3c] text-white text-xs rounded px-2 py-1 outline-none border border-gray-600 focus:border-blue-500"
              >
                <option value={Language.C}>C</option>
                <option value={Language.PYTHON}>Python</option>
                <option value={Language.JAVA}>Java</option>
              </select>
            )}
          </div>

          <div className="flex items-center space-x-2">
             <button 
              onClick={handleRun}
              className="flex items-center space-x-1.5 bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded-sm text-xs transition-colors"
              title="Run Code (Ctrl+Enter)"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Run</span>
            </button>
            
            <button 
              onClick={handleExplain}
              className="flex items-center space-x-1.5 bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-1 rounded-sm text-xs transition-colors"
              title="Explain Code Logic"
            >
              <BookOpen className="w-3 h-3" />
              <span>Explain</span>
            </button>

            <button 
              onClick={handleDebug}
              className="flex items-center space-x-1.5 bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded-sm text-xs transition-colors"
              title="Fix & Debug Code"
            >
              <Bug className="w-3 h-3" />
              <span>Fix Code</span>
            </button>

            <div className="w-px h-4 bg-gray-600 mx-1"></div>

            <button 
              onClick={handleSave}
              className="flex items-center space-x-1.5 bg-[#007acc] hover:bg-[#0062a3] text-white px-3 py-1 rounded-sm text-xs transition-colors"
              title="Download File"
            >
              <Save className="w-3 h-3" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Editors Split View */}
        <div className={`flex-1 flex flex-row overflow-hidden ${terminalOpen ? 'h-[60%]' : 'h-full'}`}>
          
          {/* Visual Editor (Only in Block Mode) */}
          {viewMode === 'blocks' && (
            <div className="flex-1 flex flex-col min-w-0 border-r border-[#2b2b2b] relative">
               <div className="absolute top-0 left-0 px-4 py-2 z-10 pointer-events-none opacity-50">
                  <span className="text-xs font-mono text-gray-500">CANVAS</span>
               </div>
               <BlockCanvas blocks={blocks} setBlocks={setBlocks} />
            </div>
          )}

          {/* Code Editor (Preview in Block Mode, Full Editor in Code Mode) */}
          <div className={`${viewMode === 'blocks' ? 'w-[40%]' : 'flex-1'} flex flex-col min-w-0 bg-[#1e1e1e]`}>
            <div className="h-full">
               <CodeEditor 
                 code={generatedCode} 
                 language={language} 
                 readOnly={viewMode === 'blocks'}
                 onChange={viewMode === 'code' ? setGeneratedCode : undefined}
               />
            </div>
          </div>

        </div>

        {/* Bottom Terminal Panel */}
        {terminalOpen && (
          <div className="h-48 md:h-64 border-t border-[#2b2b2b]">
            <TerminalPanel 
              isOpen={terminalOpen} 
              onClose={() => setTerminalOpen(false)} 
              output={output}
              status={status}
              onClear={() => setOutput("")}
              isWaitingForInput={isWaitingForInput}
              onInput={handleTerminalInput}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
