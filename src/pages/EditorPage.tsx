import React, { useState, useEffect } from 'react';
import { 
  Play, Save, Code2, Blocks, Settings, FileJson, 
  Book, UserCircle, ArrowLeft, ChevronDown, X, Trash2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Language, type BlockInstance } from '../types';
import { BlockSidebar, BlockCanvas, BLOCK_DEFINITIONS } from '../components/BlockComponents';
import CodeEditor from '../components/CodeEditor';
import Terminal from '../components/Terminal'; 
import { supabase } from '../services/supabase';
import type { Session } from '@supabase/supabase-js';
import AuthPage from '../components/AuthPage';
import DocumentationPage from './DocumentationPage';

// Import Electron Communication
const { ipcRenderer } = window.require('electron');

// --- HELPER: Generate Code from Blocks (FIXED FOR JAVA/C) ---
const generateCodeFromBlocks = (blocks: BlockInstance[], lang: Language): string => {
  if (blocks.length === 0) return "";

  // Recursive helper to generate raw block code
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

  // 1. Generate Raw Code first
  const rawCode = blocks.map(b => generateBlockCode(b, 0)).join("");

  // 2. JAVA: Auto-wrap in class Main if missing
  if (lang === Language.JAVA) {
      if (!rawCode.includes("class ")) {
          // Re-generate body with indentation
          const body = blocks.map(b => generateBlockCode(b, 2)).join("");
          return `public class Main {\n    public static void main(String[] args) {\n${body}    }\n}`;
      }
  }

  // 3. C/C++: Auto-wrap in main() if missing
  if (lang === Language.C) {
      if (!rawCode.includes("main(")) {
          const body = blocks.map(b => generateBlockCode(b, 1)).join("");
          return `#include <stdio.h>\n\nint main() {\n${body}    return 0;\n}`;
      }
  }

  return rawCode;
};

const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // Editor State
  const [language, setLanguage] = useState<Language>(Language.PYTHON); 
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [viewMode, setViewMode] = useState<'blocks' | 'code' | 'docs'>('blocks');
  
  // Terminal State
  const [terminalOpen, setTerminalOpen] = useState(true); 
  
  const isDesktop = navigator.userAgent.toLowerCase().includes('electron');

  // --- AUTH INITIALIZATION ---
  useEffect(() => {
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoadingAuth(false);
    };
    initSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // --- CODE GENERATION ---
  useEffect(() => {
    if (viewMode === 'blocks') {
      const code = generateCodeFromBlocks(blocks, language);
      setGeneratedCode(code);
    }
  }, [blocks, language, viewMode]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (viewMode === 'blocks') setBlocks([]); 
  };

  // --- RUN BUTTON ---
  const handleRun = () => {
    if (!generatedCode.trim()) return;

    setTerminalOpen(true);

    // KILL PREVIOUS SESSION
    ipcRenderer.send('terminal:kill');

    // WAIT & RUN
    setTimeout(() => {
        ipcRenderer.send('execution:run', {
            language: language, 
            code: generatedCode
        });
    }, 100);
  };

  const handleResetTerminal = () => {
    ipcRenderer.send('terminal:clear-request');
  };

  const handleCloseTerminal = () => {
    ipcRenderer.send('terminal:kill');
    setTerminalOpen(false);
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
      
      {/* SIDEBAR */}
      <div className="w-12 flex flex-col items-center py-4 bg-[#333333] border-r border-[#2b2b2b] z-20 relative">
        {!isDesktop && (
          <Link to="/" className="mb-6 p-2 rounded hover:bg-[#444] text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
          </Link>
        )}
        <div onClick={() => setViewMode('blocks')} className={`mb-6 cursor-pointer border-l-2 pl-3 ml-[-2px] ${viewMode === 'blocks' ? 'text-white border-white' : 'text-gray-500 border-transparent hover:text-white'}`}>
          <Blocks className="w-6 h-6" />
        </div>
        <div onClick={() => setViewMode('code')} className={`mb-6 cursor-pointer border-l-2 pl-3 ml-[-2px] ${viewMode === 'code' ? 'text-white border-white' : 'text-gray-500 border-transparent hover:text-white'}`}>
          <Code2 className="w-6 h-6" />
        </div>
        <div onClick={() => setViewMode('docs')} className={`mb-6 cursor-pointer border-l-2 pl-3 ml-[-2px] ${viewMode === 'docs' ? 'text-white border-white' : 'text-gray-500 border-transparent hover:text-white'}`}>
          <Book className="w-6 h-6" />
        </div>
        <div className="mt-auto flex flex-col items-center space-y-4">
           <div onClick={() => navigate('/profile')} className="cursor-pointer transition-colors text-gray-500 hover:text-white">
             <UserCircle className="w-6 h-6" />
           </div>
           <div className="cursor-pointer text-gray-500 hover:text-white pb-4">
             <Settings className="w-6 h-6" />
           </div>
        </div>
      </div>

      {/* WORKSPACE */}
      {viewMode === 'docs' ? (
         <div className="flex-1 h-full overflow-hidden bg-[#0d1117]">
            <DocumentationPage />
         </div>
      ) : (
        <>
          {/* TOOLBOX */}
          {viewMode === 'blocks' && (
            <div className="w-64 flex flex-col bg-[#252526] border-r border-[#2b2b2b]">
              <div className="h-9 px-4 flex items-center text-xs font-medium uppercase tracking-wide text-gray-400 bg-[#252526] shadow-sm">Toolbox</div>
              <BlockSidebar currentLang={language} />
            </div>
          )}

          {/* MAIN AREA */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
            
            {/* TOOLBAR */}
            <div className="h-10 flex items-center justify-between px-4 bg-[#1e1e1e] border-b border-[#2b2b2b]">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <FileJson className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">main.{language === Language.PYTHON ? 'py' : language === Language.JAVA ? 'java' : 'c'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative flex items-center bg-[#252526] border border-[#333] rounded px-2 py-1 mr-2 group">
                  <span className="text-[10px] font-bold text-gray-500 uppercase mr-2 border-r border-[#333] pr-2">Target</span>
                  <select 
                    value={language} 
                    onChange={(e) => handleLanguageChange(e.target.value as Language)} 
                    className="bg-transparent text-white text-xs font-medium outline-none cursor-pointer appearance-none pr-4"
                  >
                    <option value={Language.C} className="bg-[#252526]">C / C++</option>
                    <option value={Language.PYTHON} className="bg-[#252526]">Python 3</option>
                    <option value={Language.JAVA} className="bg-[#252526]">Java</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2 pointer-events-none text-gray-500" />
                </div>

                <button onClick={handleRun} className="flex items-center space-x-1.5 bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded-sm text-xs transition-all active:scale-95 shadow-sm">
                  <Play className="w-3 h-3 fill-current" /> <span>Run Local</span>
                </button>

                <div className="w-px h-4 bg-gray-600 mx-1"></div>
                
                <button onClick={handleSave} className="flex items-center space-x-1.5 bg-[#007acc] hover:bg-[#0062a3] text-white px-3 py-1 rounded-sm text-xs transition-all active:scale-95">
                  <Save className="w-3 h-3" /> <span>Save</span>
                </button>
              </div>
            </div>

            {/* SPLIT VIEW (FIXED SCROLLING) */}
            <div className="flex-1 flex flex-col overflow-hidden">
               <div className={`flex-1 flex flex-row overflow-hidden`}>
                  {viewMode === 'blocks' && (
                    <div className="flex-1 flex flex-col min-w-0 border-r border-[#2b2b2b] relative bg-[#1e1e1e]">
                      <BlockCanvas blocks={blocks} setBlocks={setBlocks} />
                    </div>
                  )}
                  {/* UPDATED CODE CONTAINER: Added overflow-y-auto for scrolling */}
                  <div className={`${viewMode === 'blocks' ? 'w-[40%]' : 'flex-1'} bg-[#1e1e1e] h-full overflow-y-auto`}>
                    <CodeEditor 
                        code={generatedCode} 
                        language={language} 
                        readOnly={viewMode === 'blocks'} 
                        onChange={viewMode === 'code' ? setGeneratedCode : undefined} 
                    />
                  </div>
               </div>

               {/* TERMINAL */}
               {terminalOpen && (
                 <div className="h-[35%] min-h-[150px] border-t border-[#2b2b2b] bg-[#0c0c0c] flex flex-col">
                    <div className="flex items-center justify-between px-3 py-1 bg-[#252526] border-b border-[#333]">
                        <span className="text-xs font-bold text-gray-400 uppercase">Terminal (Local System)</span>
                        <div className="flex items-center gap-2">
                           
                           {/* TRASH ICON */}
                           <button onClick={handleResetTerminal} className="hover:text-red-400 text-gray-500 transition-colors" title="Clear Terminal">
                              <Trash2 size={14} />
                           </button>

                           {/* X ICON */}
                           <button onClick={handleCloseTerminal} className="hover:text-white text-gray-500" title="Close Terminal">
                             <X size={14}/>
                           </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden p-1">
                        <Terminal />
                    </div>
                 </div>
               )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditorPage;