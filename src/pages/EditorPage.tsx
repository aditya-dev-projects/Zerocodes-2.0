import React, { useState, useEffect } from 'react';
import { 
  Play, Save, Code2, Blocks, Settings, FileJson, 
  BookOpen, Bug, UserCircle, ArrowLeft, Trash2, Book, Rocket,
  ChevronDown
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Language, ExecutionStatus, ToolMode, type BlockInstance } from '../types';
import { BlockSidebar, BlockCanvas, BLOCK_DEFINITIONS } from '../components/BlockComponents';
import CodeEditor from '../components/CodeEditor';
import TerminalPanel from '../components/TerminalPanel';
import { streamGeminiResponse, CodeExecutor } from '../services/gemini';
import { supabase } from '../services/supabase';
import type { Session } from '@supabase/supabase-js';
import AuthPage from '../components/AuthPage';
import UserProfile from '../components/UserProfile';
import DocumentationPage from './DocumentationPage';
import OnboardingTour from '../components/OnboardingTour';

const generateCodeFromBlocks = (blocks: BlockInstance[], lang: Language): string => {
  if (blocks.length === 0) return "";
  const generateBlockCode = (block: BlockInstance, indentLevel: number): string => {
    const indent = "    ".repeat(indentLevel);
    const def = BLOCK_DEFINITIONS.find(d => d.id === block.type);
    if (!def) return `${indent}// Unknown block: ${block.type}\n`;
    let template = def.code[lang] || Object.values(def.code)[0] || "";
    Object.entries(block.params).forEach(([key, value]) => {
      template = template.split(`{${key}}`).join(value);
    });
    let result = indent + template + "\n";
    if (block.children && block.children.length > 0) {
      block.children.forEach(child => {
        result += generateBlockCode(child, indentLevel + 1);
      });
      if (template.trim().endsWith('{')) {
         result += indent + "}\n";
      }
    }
    return result;
  };
  return blocks.map(b => generateBlockCode(b, 0)).join("");
};

const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.C);
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [viewMode, setViewMode] = useState<'blocks' | 'code' | 'docs'>('blocks');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [status, setStatus] = useState<ExecutionStatus>(ExecutionStatus.IDLE);
  const [output, setOutput] = useState("");
  const [executor, setExecutor] = useState<CodeExecutor | null>(null);
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const isDesktop = navigator.userAgent.toLowerCase().includes('electron');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingAuth(false);
    });

    const hasSeenOnboarding = localStorage.getItem('zekodes_onboarding_complete');
    if (!hasSeenOnboarding) {
      setShowTutorial(true);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (viewMode === 'blocks') {
      const code = generateCodeFromBlocks(blocks, language);
      setGeneratedCode(code);
    }
  }, [blocks, language, viewMode]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('zekodes_onboarding_complete', 'true');
    setShowTutorial(false);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (viewMode === 'blocks') setBlocks([]); 
    setExecutor(null);
  };

  const handleRun = async () => {
    if (!generatedCode.trim()) return;
    setTerminalOpen(true);
    setStatus(ExecutionStatus.COMPILING);
    setOutput("");
    setIsWaitingForInput(false);
    const newExecutor = new CodeExecutor(language);
    setExecutor(newExecutor);
    setTimeout(async () => {
      setStatus(ExecutionStatus.RUNNING);
      try {
        let inputRequested = false;
        await newExecutor.start(generatedCode, (text) => {
          if (text.includes("__REQ_IN__")) {
            inputRequested = true;
            setIsWaitingForInput(true);
            setOutput(prev => prev + text.replace("__REQ_IN__", ""));
          } else {
            setOutput(prev => prev + text);
          }
        });
        if (!inputRequested) setStatus(ExecutionStatus.SUCCESS);
      } catch (e) {
        setStatus(ExecutionStatus.ERROR);
      }
    }, 500);
  };

  const handleTerminalInput = async (inputText: string) => {
    if (!executor) return;
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
      if (!inputRequested) setStatus(ExecutionStatus.SUCCESS);
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
        onChunk: (text) => { setOutput(prev => prev + text); }
      });
      setStatus(ExecutionStatus.SUCCESS);
    } catch (e) { setStatus(ExecutionStatus.ERROR); }
  };

  const handleDebug = async () => {
    if (!generatedCode.trim()) return;
    setTerminalOpen(true);
    setStatus(ExecutionStatus.RUNNING);
    setOutput("Scanning for potential fixes...\n\n");
    try {
      await streamGeminiResponse(generatedCode, language, ToolMode.DEBUG, {
        onChunk: (text) => { setOutput(prev => prev + text); }
      });
      setStatus(ExecutionStatus.SUCCESS);
    } catch (e) { setStatus(ExecutionStatus.ERROR); }
  };

  const handleSave = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    let ext = language === Language.PYTHON ? '.py' : language === Language.JAVA ? '.java' : '.c';
    a.download = `main${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loadingAuth) return <div className="flex h-screen items-center justify-center bg-[#1e1e1e] text-gray-500">Loading Zekodes...</div>;
  if (!session) return <AuthPage />;

  return (
    <div className="flex h-screen w-screen bg-[#1e1e1e] text-gray-300 overflow-hidden font-sans">
      
      {/* --- Activity Bar --- */}
      <div className="w-12 flex flex-col items-center py-4 bg-[#333333] border-r border-[#2b2b2b] z-20 relative">
        {!isDesktop && (
          <Link to="/" className="mb-6 p-2 rounded hover:bg-[#444] text-gray-400 hover:text-white transition-colors" title="Back to Home">
             <ArrowLeft className="w-5 h-5" />
          </Link>
        )}
        
        <div onClick={() => setViewMode('blocks')} className={`mb-6 cursor-pointer border-l-2 pl-3 ml-[-2px] ${viewMode === 'blocks' ? 'text-white border-white' : 'text-gray-500 border-transparent hover:text-white'}`} title="Block Editor">
          <Blocks className="w-6 h-6" />
        </div>
        <div onClick={() => setViewMode('code')} className={`mb-6 cursor-pointer border-l-2 pl-3 ml-[-2px] ${viewMode === 'code' ? 'text-white border-white' : 'text-gray-500 border-transparent hover:text-white'}`} title="Code Editor">
          <Code2 className="w-6 h-6" />
        </div>
        
        <div onClick={() => setViewMode('docs')} className={`mb-6 cursor-pointer border-l-2 pl-3 ml-[-2px] ${viewMode === 'docs' ? 'text-white border-white' : 'text-gray-500 border-transparent hover:text-white'}`} title="Documentation">
          <Book className="w-6 h-6" />
        </div>

        {/* Academy Icon correctly placed below Docs */}
        <div onClick={() => navigate('/tutorial')} className="mb-6 cursor-pointer text-gray-500 hover:text-blue-400 transition-colors" title="Academy">
          <Rocket className="w-6 h-6" />
        </div>

        <div className="mt-auto flex flex-col items-center space-y-4">
           <div onClick={() => setShowProfile(!showProfile)} className={`cursor-pointer transition-colors ${showProfile ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`} title="User Profile">
             <UserCircle className="w-6 h-6" />
           </div>
           <div className="cursor-pointer text-gray-500 hover:text-white pb-4">
             <Settings className="w-6 h-6" />
           </div>
        </div>
        {showProfile && <UserProfile userEmail={session.user.email} onClose={() => setShowProfile(false)} />}
      </div>

      {/* Main Workspace */}
      {viewMode === 'docs' ? (
         <div className="flex-1 h-full overflow-hidden bg-[#0d1117]">
            <DocumentationPage />
         </div>
      ) : (
        <>
          {viewMode === 'blocks' && (
            <div className="w-64 flex flex-col bg-[#252526] border-r border-[#2b2b2b]">
              <div className="h-9 px-4 flex items-center text-xs font-medium uppercase tracking-wide text-gray-400 bg-[#252526] shadow-sm">Toolbox</div>
              <BlockSidebar currentLang={language} />
            </div>
          )}

          <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
            {/* --- UPDATED TOP TOOLBAR --- */}
            <div className="h-10 flex items-center justify-between px-4 bg-[#1e1e1e] border-b border-[#2b2b2b]">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <FileJson className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">main.{language === Language.PYTHON ? 'py' : language === Language.JAVA ? 'java' : 'c'}</span>
                </div>
              </div>

              {/* Action Buttons and NEW Language Selector Placement */}
              <div className="flex items-center space-x-3">
                
                {/* Language Selector in Top Bar */}
                <div className="relative flex items-center bg-[#252526] border border-[#333] rounded px-2 py-1 mr-2 group">
                  <span className="text-[10px] font-bold text-gray-500 uppercase mr-2 border-r border-[#333] pr-2">Target</span>
                  <select 
                    value={language} 
                    onChange={(e) => handleLanguageChange(e.target.value as Language)} 
                    className="bg-transparent text-white text-xs font-medium outline-none cursor-pointer appearance-none pr-4"
                  >
                    <option value={Language.C} className="bg-[#252526]">C (GCC)</option>
                    <option value={Language.PYTHON} className="bg-[#252526]">Python 3</option>
                    <option value={Language.JAVA} className="bg-[#252526]">Java</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2 pointer-events-none text-gray-500" />
                </div>

                <div className="flex items-center space-x-2">
                  <button onClick={handleRun} className="flex items-center space-x-1.5 bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded-sm text-xs transition-all active:scale-95 shadow-sm">
                    <Play className="w-3 h-3 fill-current" /> <span>Run</span>
                  </button>
                  <button onClick={handleExplain} className="flex items-center space-x-1.5 bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-1 rounded-sm text-xs transition-all active:scale-95 shadow-sm">
                    <BookOpen className="w-3 h-3" /> <span>Explain</span>
                  </button>
                  <button onClick={handleDebug} className="flex items-center space-x-1.5 bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded-sm text-xs transition-all active:scale-95 shadow-sm">
                    <Bug className="w-3 h-3" /> <span>Fix Code</span>
                  </button>
                </div>

                <div className="w-px h-4 bg-gray-600 mx-1"></div>
                
                <button onClick={handleSave} className="flex items-center space-x-1.5 bg-[#007acc] hover:bg-[#0062a3] text-white px-3 py-1 rounded-sm text-xs transition-all active:scale-95">
                  <Save className="w-3 h-3" /> <span>Save</span>
                </button>
              </div>
            </div>

            <div className={`flex-1 flex flex-row overflow-hidden ${terminalOpen ? 'h-[60%]' : 'h-full'}`}>
              {viewMode === 'blocks' && (
                <div className="flex-1 flex flex-col min-w-0 border-r border-[#2b2b2b] relative">
                  <BlockCanvas blocks={blocks} setBlocks={setBlocks} />
                </div>
              )}
              <div className={`${viewMode === 'blocks' ? 'w-[40%]' : 'flex-1'} bg-[#1e1e1e]`}>
                <CodeEditor code={generatedCode} language={language} readOnly={viewMode === 'blocks'} onChange={viewMode === 'code' ? setGeneratedCode : undefined} />
              </div>
            </div>

            {terminalOpen && (
              <div className="h-48 border-t border-[#2b2b2b]">
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
        </>
      )}

      {showTutorial && <OnboardingTour onComplete={handleOnboardingComplete} />}
    </div>
  );
};

export default EditorPage;