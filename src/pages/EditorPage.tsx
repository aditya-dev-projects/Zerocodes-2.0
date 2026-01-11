import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, Save, Code2, Blocks, Settings, FileJson, 
  Book, UserCircle, ArrowLeft, ChevronDown, Trash2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Language, type BlockInstance } from '../types';
import { BlockSidebar, BlockCanvas, BLOCK_DEFINITIONS } from '../components/BlockComponents';
import { supabase } from '../services/supabase';
import type { Session } from '@supabase/supabase-js';
import AuthPage from '../components/AuthPage';
import DocumentationPage from './DocumentationPage';
import Editor, { loader } from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react"; 
import * as monaco from "monaco-editor";
import Terminal from '../components/Terminal'; 

loader.config({ monaco });
const { ipcRenderer } = window.require('electron');

// --- CODE GENERATION LOGIC ---
const generateCodeFromBlocks = (blocks: BlockInstance[], lang: Language): string => {
  if (blocks.length === 0) return "";
  
  // Helper to recursively generate code for a single block
  const generateBlockCode = (block: BlockInstance, indentLevel: number): string => {
    const indent = "    ".repeat(indentLevel);
    const def = BLOCK_DEFINITIONS.find(d => d.id === block.type);
    if (!def) return `${indent}// Unknown block: ${block.type}\n`;
    
    let template = def.code[lang] || Object.values(def.code)[0] || "";
    
    // Replace parameters
    Object.entries(block.params).forEach(([key, value]) => {
      template = template.split(`{${key}}`).join(value);
    });
    
    let result = indent + template + "\n";
    
    // Process children (nested blocks)
    if (block.children && block.children.length > 0) {
      block.children.forEach(child => {
        result += generateBlockCode(child, indentLevel + 1);
      });
      // Close bracket if the template opened one (heuristic)
      if (template.trim().endsWith('{')) { result += indent + "}\n"; }
    }
    return result;
  };

  // --- JAVA SPECIFIC HANDLER ---
  if (lang === Language.JAVA) {
      const imports: string[] = [];
      const bodyBlocks: BlockInstance[] = [];

      // Separate Imports from Body Logic
      blocks.forEach(b => {
          const def = BLOCK_DEFINITIONS.find(d => d.id === b.type);
          // Check if it's an 'includes' category OR the code starts with 'import'
          const isImport = def?.category === 'includes' || def?.code[lang]?.trim().startsWith('import');
          
          if (isImport) {
              imports.push(generateBlockCode(b, 0).trim());
          } else {
              bodyBlocks.push(b);
          }
      });

      const importsCode = imports.join("\n");
      // Raw body code (indent 0) for checking structure
      const bodyRaw = bodyBlocks.map(b => generateBlockCode(b, 0)).join("");

      // Logic: If we have body blocks, we might need a Main class wrapper.
      if (bodyBlocks.length > 0) {
          if (!bodyRaw.includes("class ")) {
              // Wrap in Main class
              const bodyIndented = bodyBlocks.map(b => generateBlockCode(b, 2)).join("");
              const mainClass = `public class Main {\n    public static void main(String[] args) {\n${bodyIndented}    }\n}`;
              return importsCode ? `${importsCode}\n\n${mainClass}` : mainClass;
          } else {
              // User already dropped a Class block, just append imports at top
              return importsCode ? `${importsCode}\n\n${bodyRaw}` : bodyRaw;
          }
      } else {
          // If NO body blocks (only imports), just return imports (don't force empty Main class)
          return importsCode;
      }
  }

  // --- C SPECIFIC HANDLER ---
  if (lang === Language.C) {
      const includes: string[] = [];
      const bodyBlocks: BlockInstance[] = [];

      blocks.forEach(b => {
          const def = BLOCK_DEFINITIONS.find(d => d.id === b.type);
          const isInclude = def?.category === 'includes' || def?.code[lang]?.trim().startsWith('#include');
          
          if (isInclude) {
              includes.push(generateBlockCode(b, 0).trim());
          } else {
              bodyBlocks.push(b);
          }
      });

      let includesCode = includes.join("\n");
      const bodyRaw = bodyBlocks.map(b => generateBlockCode(b, 0)).join("");

      // If we have logic but no main(), wrap it
      if (bodyBlocks.length > 0 && !bodyRaw.includes("main(")) {
          // Ensure stdio.h is present if we are auto-generating main
          if (!includesCode.includes("<stdio.h>")) {
              includesCode = `#include <stdio.h>\n${includesCode}`;
          }
          const bodyIndented = bodyBlocks.map(b => generateBlockCode(b, 1)).join("");
          const mainFunc = `int main() {\n${bodyIndented}    return 0;\n}`;
          return includesCode.trim() ? `${includesCode.trim()}\n\n${mainFunc}` : mainFunc;
      }
      
      return includesCode ? `${includesCode}\n\n${bodyRaw}` : bodyRaw;
  }

  // --- PYTHON / FALLBACK ---
  return blocks.map(b => generateBlockCode(b, 0)).join("");
};

const getMonacoLanguage = (lang: Language) => {
    switch (lang) {
        case Language.JAVA: return 'java';
        case Language.PYTHON: return 'python';
        case Language.C: return 'c';
        default: return 'plaintext';
    }
};

const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // Editor State
  const [language, setLanguage] = useState<Language>(Language.PYTHON); 
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string>("// Switch to 'Blocks' tab to start building...");
  const [viewMode, setViewMode] = useState<'blocks' | 'code' | 'docs'>('blocks');
  
  // Terminal UI State
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(250);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // RESET TRIGGER STATE
  const [resetTrigger, setResetTrigger] = useState(0); 

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const isDesktop = navigator.userAgent.toLowerCase().includes('electron');

  useEffect(() => {
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoadingAuth(false);
    };
    initSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  // --- Update Code Logic ---
  useEffect(() => {
    if (viewMode === 'blocks') {
      const code = generateCodeFromBlocks(blocks, language);
      if (blocks.length === 0) {
        setGeneratedCode("// Drag blocks here to generate code...");
      } else {
        setGeneratedCode(code);
      }
    }
  }, [blocks, language, viewMode]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    // Optional: Clear blocks on language switch if syntax is incompatible
    if (viewMode === 'blocks') setBlocks([]); 
  };

  // --- Handle Clear Canvas ---
  const handleClearCanvas = () => {
    if (window.confirm("Are you sure you want to clear the entire canvas?")) {
        setBlocks([]);
    }
  };

  // --- RUN LOGIC ---
  const handleRun = () => {
    // Allows running in code mode even if user typed it manually
    if (!generatedCode.trim()) return;
    
    setTerminalOpen(true);
    if (terminalHeight < 50) setTerminalHeight(250); 
    
    setResetTrigger(prev => prev + 1);
    ipcRenderer.send('terminal:kill');
    setTimeout(() => {
        ipcRenderer.send('execution:run', { language, code: generatedCode });
    }, 100);
  };

  const handleResetTerminal = () => {
      setResetTrigger(prev => prev + 1);
      ipcRenderer.send('terminal:clear-request');
  };
  const handleCloseTerminal = () => setTerminalOpen(false);

  const startDragging = useCallback((e: React.MouseEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const onDrag = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newHeight = containerRect.bottom - e.clientY;
    if (newHeight > 30 && newHeight < containerRect.height - 100) setTerminalHeight(newHeight);
  }, [isDragging]);
  const stopDragging = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', stopDragging);
    } else {
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', stopDragging);
    }
    return () => {
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging, onDrag, stopDragging]);

  const handleEditorChange = (value: string | undefined) => {
      // Allow updates ONLY if in code mode
      if (viewMode === 'code') {
          setGeneratedCode(value || "");
      }
  };
  
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    // Initial layout fix
    setTimeout(() => { editor.layout(); editor.focus(); }, 100);
  };

  if (loadingAuth) return <div className="flex h-screen items-center justify-center bg-[#1e1e1e] text-gray-500">Loading Zekodes...</div>;
  if (!session) return <AuthPage />;

  return (
    <div className="flex h-screen w-screen bg-[#1e1e1e] text-gray-300 overflow-hidden font-sans">
      <div className="w-12 flex flex-col items-center py-4 bg-[#333333] border-r border-[#2b2b2b] z-20">
        {!isDesktop && (<Link to="/" className="mb-6 p-2 text-gray-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>)}
        <div onClick={() => setViewMode('blocks')} className={`mb-6 cursor-pointer border-l-2 pl-3 ml-[-2px] ${viewMode === 'blocks' ? 'text-white border-white' : 'text-gray-500 border-transparent'}`}><Blocks className="w-6 h-6" /></div>
        <div onClick={() => setViewMode('code')} className={`mb-6 cursor-pointer border-l-2 pl-3 ml-[-2px] ${viewMode === 'code' ? 'text-white border-white' : 'text-gray-500 border-transparent'}`}><Code2 className="w-6 h-6" /></div>
        <div onClick={() => setViewMode('docs')} className={`mb-6 cursor-pointer border-l-2 pl-3 ml-[-2px] ${viewMode === 'docs' ? 'text-white border-white' : 'text-gray-500 border-transparent'}`}><Book className="w-6 h-6" /></div>
        <div className="mt-auto flex flex-col items-center space-y-4">
           <div onClick={() => navigate('/profile')} className="cursor-pointer text-gray-500 hover:text-white"><UserCircle className="w-6 h-6" /></div>
           <div className="cursor-pointer text-gray-500 hover:text-white pb-4"><Settings className="w-6 h-6" /></div>
        </div>
      </div>

      {viewMode === 'docs' ? (<div className="flex-1 h-full overflow-hidden bg-[#0d1117]"><DocumentationPage /></div>) : (
        <>
          {viewMode === 'blocks' && (
            <div className="w-64 flex flex-col bg-[#252526] border-r border-[#2b2b2b]">
              <div className="h-9 px-4 flex items-center text-xs font-medium uppercase text-gray-400 bg-[#252526]">Toolbox</div>
              <BlockSidebar currentLang={language} />
            </div>
          )}
          <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e] h-full relative" ref={containerRef}>
            <div className="h-10 flex items-center justify-between px-4 bg-[#1e1e1e] border-b border-[#2b2b2b] shrink-0">
              <div className="flex items-center space-x-2 text-sm">
                 <FileJson className="w-4 h-4 text-yellow-400" />
                 <span className="text-gray-300">main.{language === Language.PYTHON ? 'py' : language === Language.JAVA ? 'java' : 'c'}</span>
              </div>
              <div className="flex items-center space-x-3">
                 <div className="relative flex items-center bg-[#252526] border border-[#333] rounded px-2 py-1 mr-2 group">
                  <span className="text-[10px] font-bold text-gray-500 uppercase mr-2 border-r border-[#333] pr-2">Target</span>
                  <select value={language} onChange={(e) => handleLanguageChange(e.target.value as Language)} className="bg-transparent text-white text-xs font-medium outline-none cursor-pointer appearance-none pr-4">
                    <option value={Language.C} className="bg-[#252526]">C / C++</option>
                    <option value={Language.PYTHON} className="bg-[#252526]">Python 3</option>
                    <option value={Language.JAVA} className="bg-[#252526]">Java</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2 pointer-events-none text-gray-500" />
                </div>

                 {/* --- CLEAR CANVAS BUTTON (Only visible in Blocks mode) --- */}
                 {viewMode === 'blocks' && (
                   <button 
                     onClick={handleClearCanvas} 
                     className="flex items-center space-x-1.5 bg-red-900/40 hover:bg-red-900/60 border border-red-900/50 text-red-200 px-3 py-1 rounded-sm text-xs transition-all active:scale-95"
                     title="Clear Canvas"
                   >
                     <Trash2 className="w-3 h-3" /> <span>Clear</span>
                   </button>
                 )}

                 <div className="w-px h-4 bg-gray-600 mx-1"></div>
                 
                 <button onClick={handleRun} className="flex items-center space-x-1.5 bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded-sm text-xs transition-all active:scale-95 shadow-sm">
                   <Play className="w-3 h-3 fill-current" /> <span>Run Local</span>
                 </button>
                 <div className="w-px h-4 bg-gray-600 mx-1"></div>
                 <button className="flex items-center space-x-1.5 bg-[#007acc] hover:bg-[#0062a3] text-white px-3 py-1 rounded-sm text-xs transition-all active:scale-95"><Save className="w-3 h-3" /> <span>Save</span></button>
              </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden relative">
               <div className="flex-1 flex flex-row overflow-hidden min-h-0">
                  {viewMode === 'blocks' && (
                    <div className="flex-1 flex flex-col min-w-0 border-r border-[#2b2b2b] relative bg-[#1e1e1e]">
                      <BlockCanvas blocks={blocks} setBlocks={setBlocks} />
                    </div>
                  )}
                  <div className={`${viewMode === 'blocks' ? 'w-[40%] border-l border-[#2b2b2b]' : 'flex-1'} bg-[#1e1e1e] h-full overflow-hidden`}>
                    <Editor
                        key={viewMode} // CRITICAL FIX: Forces remount on mode switch to reset ReadOnly state
                        height="100%"
                        width="100%"
                        language={getMonacoLanguage(language)}
                        theme="vs-dark"
                        value={generatedCode}
                        onChange={handleEditorChange}
                        onMount={handleEditorDidMount} 
                        options={{
                            readOnly: viewMode === 'blocks',
                            minimap: { enabled: viewMode === 'code' },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            fontSize: 14,
                            fontFamily: 'Consolas, "Courier New", monospace',
                            contextmenu: true, 
                            wordWrap: 'on',
                        }}
                    />
                  </div>
               </div>
               {terminalOpen && <div className="h-1 bg-[#2b2b2b] hover:bg-blue-500 cursor-row-resize transition-colors z-50 w-full" onMouseDown={startDragging}></div>}
               
               {terminalOpen && (
                 <div style={{ height: terminalHeight }} className="shrink-0 bg-[#1e1e1e] overflow-hidden">
                    <Terminal 
                        resetTrigger={resetTrigger}
                        onClose={handleCloseTerminal} 
                        onClear={handleResetTerminal}
                        onMaximize={() => setTerminalHeight(prev => prev === 250 ? 600 : 250)}
                    />
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