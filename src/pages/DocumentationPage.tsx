import React, { useState } from 'react';
import { 
  Book, FileText, ShieldAlert, Globe, BookOpen, Bug, Sparkles,
  Layers, Cpu, Code2, Terminal, Info, ChevronRight, Lightbulb, 
  Zap, Settings, Database, MousePointer2, MonitorPlay, 
  GraduationCap, Rocket, ArrowLeft, ShieldCheck, Clock, Scale
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DocumentationPage: React.FC = () => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex h-screen bg-[#0d1117] text-gray-300 font-sans overflow-hidden">
      
      {/* --- Sidebar Navigation (Based on ref image) --- */}
      <aside className="w-80 flex-shrink-0 bg-[#161b22] border-r border-gray-800 overflow-y-auto hidden lg:block">
        <div className="p-6 border-b border-gray-800 sticky top-0 bg-[#161b22] z-10">
           <div className="flex items-center justify-between">
             <div className="flex items-center space-x-2">
               <Book className="w-6 h-6 text-blue-500" />
               <span className="font-bold text-white text-lg">Zekodes Docs</span>
             </div>
             <Link to="/editor" className="text-gray-500 hover:text-white transition-colors" title="Back to Editor">
               <ArrowLeft size={18} />
             </Link>
           </div>
        </div>

        <nav className="p-4 space-y-6 text-sm">
          {/* Foundation */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Foundation
            </p>
            <div className="space-y-1">
                <NavButton label="Introduction to Zekodes" id="overview" onClick={scrollToSection} />
                <NavButton label="Design Philosophy" id="philosophy" onClick={scrollToSection} />
                <NavButton label="Platform & Requirements" id="platform" onClick={scrollToSection} />
                <NavButton label="Onboarding Experience" id="onboarding" onClick={scrollToSection} />
                <NavButton label="Zekodes Academy" id="academy" onClick={scrollToSection} />
            </div>
          </div>

          {/* Workspace & Interface */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Workspace & Interface
            </p>
            <div className="space-y-1">
                <NavButton label="Dual-Pane Workspace" id="dual-pane" onClick={scrollToSection} />
                <NavButton label="Navigation and Controls" id="nav-controls" onClick={scrollToSection} />
            </div>
          </div>

          {/* Core Programming Concepts */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div> Programming Concepts
            </p>
            <div className="space-y-1">
                <NavButton label="Data Types & Variables" id="data-types" onClick={scrollToSection} />
                <NavButton label="Control Flow" id="control-flow" onClick={scrollToSection} />
                <NavButton label="Loops & Iteration" id="loops" onClick={scrollToSection} />
                <NavButton label="Functions & Scope" id="functions" onClick={scrollToSection} />
                <NavButton label="Nesting & Child Logic" id="nesting" onClick={scrollToSection} />
            </div>
          </div>

          {/* Execution & Compilation */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Execution & Compilation
            </p>
            <div className="space-y-1">
                <NavButton label="Cloud Compiler Workflow" id="compiler" onClick={scrollToSection} />
            </div>
          </div>

          {/* AI Intelligence */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> AI Intelligence
            </p>
            <div className="space-y-1">
                <NavButton label="Automated Debugging" id="ai-debug" onClick={scrollToSection} />
                <NavButton label="Logic Explanation Engine" id="ai-explain" onClick={scrollToSection} />
                <NavButton label="Code Optimization Advisor" id="ai-opt" onClick={scrollToSection} />
            </div>
          </div>

          {/* Error Handling */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Error Handling
            </p>
            <div className="space-y-1">
                <NavButton label="Common Runtime Errors" id="errors" onClick={scrollToSection} />
            </div>
          </div>

          {/* Final Sections */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div> Legal & Community
            </p>
            <div className="space-y-1">
                <NavButton label="Security & Privacy" id="security" onClick={scrollToSection} />
                <NavButton label="Support & Community" id="support" onClick={scrollToSection} />
                <NavButton label="Product Roadmap" id="roadmap" onClick={scrollToSection} />
                <NavButton label="Legal & Licensing" id="legal" onClick={scrollToSection} />
            </div>
          </div>
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 overflow-y-auto scroll-smooth bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-10 py-16 space-y-24 pb-40">
          
          {/* 1. Introduction */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mb-4">1. Introduction</h2>
            <h1 className="text-4xl font-black text-white mb-8">Overview</h1>
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6 leading-relaxed">
              <p>Zekodes is a hybrid, Logic-First integrated development environment (IDE) designed to make programming more accessible without compromising professional standards. It enables users to construct programs visually using structured logic blocks while simultaneously generating clean, readable, and industry-standard source code.</p>
              <p>Traditional programming environments require beginners to manage logic, syntax, and environment configuration at the same time. This often results in frustration and early abandonment. Zekodes addresses this challenge by separating logical reasoning from syntactic expression, allowing users to focus on problem-solving while the system handles syntax generation automatically.</p>
              <p>Zekodes supports real-time code generation for C, Python, and Java, ensuring that users learn transferable programming skills rather than simplified abstractions.</p>
            </div>
          </section>

          {/* 1.2 Design Philosophy */}
          <section id="philosophy" className="scroll-mt-20">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mb-4">1.2 Design Philosophy</h2>
            <h1 className="text-4xl font-black text-white mb-8">Logic First</h1>
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p className="text-xl italic text-gray-300 font-serif border-l-4 border-blue-500 pl-6 my-8">Logic First. Syntax Follows.</p>
              <p>Programming is fundamentally about reasoning, decision-making, and structure. Zekodes prioritizes these aspects by allowing users to design logic visually before engaging with textual code. Syntax is not hidden; instead, it is revealed progressively through real-time synchronization with the code editor.</p>
              <p>This approach reduces cognitive load, accelerates learning, and creates a smoother transition from visual logic building to professional software development.</p>
            </div>
          </section>

          {/* 2. Platform Availability */}
          <section id="platform" className="scroll-mt-20">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mb-4">2. Platform</h2>
            <h1 className="text-4xl font-black text-white mb-8">Availability & Requirements</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="p-6 bg-[#161b22] rounded-2xl border border-gray-800">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2"><MonitorPlay size={18} className="text-blue-500" /> Windows Desktop</h4>
                <p className="text-sm text-gray-400">Native desktop application optimized for performance and extended development sessions (Windows 10/11).</p>
              </div>
              <div className="p-6 bg-[#161b22] rounded-2xl border border-gray-800">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Globe size={18} className="text-green-500" /> Web Editor</h4>
                <p className="text-sm text-gray-400">Fully featured browser-based version compatible with macOS, Linux, and ChromeOS. No installation required.</p>
              </div>
            </div>
            <div className="space-y-4 text-gray-400 text-sm">
              <h4 className="text-white font-bold">System Requirements</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Modern web browser (Chrome, Edge, Firefox, or Safari)</li>
                <li>Stable internet connection for cloud compilation</li>
                <li>Recommended: 8 GB RAM for optimal desktop performance</li>
              </ul>
            </div>
          </section>

          {/* 3. Getting Started */}
          <section id="onboarding" className="scroll-mt-20">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mb-4">3. Getting Started</h2>
            <h1 className="text-4xl font-black text-white mb-8">Onboarding Experience</h1>
            <div className="prose prose-invert max-w-none text-gray-400">
              <p>Zekodes includes an automated onboarding workflow for first-time users. Upon initial launch, users are guided through the core interaction model of the platform: <strong className="text-white">Drag → Sync → Run</strong></p>
              <p className="mt-4">This onboarding process explains how visual blocks, generated code, and execution are connected, enabling users to start building programs with minimal setup or prior experience.</p>
            </div>
          </section>

          <section id="academy" className="scroll-mt-20">
            <h1 className="text-4xl font-black text-white mb-8">Zekodes Academy</h1>
            <div className="prose prose-invert max-w-none text-gray-400 space-y-4">
              <p>Zekodes Academy is a centralized learning system designed to support users at different skill levels. It provides structured educational content directly integrated into the IDE.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>High-quality video tutorials</li>
                <li>Step-by-step logic-building demonstrations</li>
                <li>Coverage of both visual programming and generated code</li>
                <li>Progressive learning paths from fundamentals to advanced topics</li>
              </ul>
              <p>The Academy follows a <strong className="text-white">Watch and Build</strong> approach, encouraging active learning alongside instruction.</p>
            </div>
          </section>

          {/* 4. Workspace */}
          <section id="dual-pane" className="scroll-mt-20">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mb-4">4. Workspace</h2>
            <h1 className="text-4xl font-black text-white mb-8">Dual-Pane Workspace</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-bold mb-2">Visual Canvas</h4>
                <p className="text-sm text-gray-400">An infinite grid where users assemble programs using drag-and-drop logic blocks. The canvas enforces structural correctness through block constraints.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2">Code Editor</h4>
                <p className="text-sm text-gray-400">A professional-grade text editor that displays the live translation of visual logic into the selected programming language.</p>
              </div>
            </div>
          </section>

          <section id="nav-controls" className="scroll-mt-20">
            <h1 className="text-4xl font-black text-white mb-8">Navigation and Controls</h1>
            <div className="space-y-6">
              <p className="text-gray-400"><strong className="text-white">Activity Bar:</strong> Provides access to the editor, academy content, user profile, and global settings.</p>
              <p className="text-gray-400"><strong className="text-white">Header Toolbar:</strong> Contains frequently used actions such as language selection, program execution, and AI assistance tools.</p>
            </div>
          </section>

          {/* 5. Core Concepts */}
          <section id="data-types" className="scroll-mt-20">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mb-4">5. Core Programming Concepts</h2>
            <h1 className="text-4xl font-black text-white mb-8">Data Types & Variables</h1>
            <div className="prose prose-invert max-w-none text-gray-400">
              <p>Variables represent memory locations used to store data during program execution. Zekodes supports the following primary data types: <strong className="text-white">Integers, Floating-point numbers, and Strings.</strong></p>
              <p className="mt-4">Each data type is represented by visually distinct blocks, helping users develop an understanding of type systems and data modeling.</p>
            </div>
          </section>

          <section id="control-flow" className="scroll-mt-20">
            <h1 className="text-4xl font-black text-white mb-8">Control Flow</h1>
            <p className="text-gray-400 leading-relaxed">Control flow determines how a program makes decisions and chooses execution paths. Zekodes provides structured logic blocks such as conditional statements and logical operators. The most common structure is the If–Else block, which allows programs to execute different logic based on evaluated conditions. Block constraints ensure that conditions and actions are placed correctly.</p>
          </section>

          <section id="loops" className="scroll-mt-20">
            <h1 className="text-4xl font-black text-white mb-8">Loops & Iteration</h1>
            <p className="text-gray-400 leading-relaxed">Loops enable repeated execution of logic blocks. Zekodes supports <strong className="text-white">For Loops</strong> for fixed iterations and <strong className="text-white">While Loops</strong> for condition-based repetition. Visual nesting ensures correct scoping and indentation across all supported languages.</p>
          </section>

          <section id="functions" className="scroll-mt-20">
            <h1 className="text-4xl font-black text-white mb-8">Functions & Scope</h1>
            <p className="text-gray-400 leading-relaxed">Functions allow users to encapsulate reusable logic into named units. Zekodes enables users to define, call, and reuse functions across projects. The platform automatically manages scope rules, parameter passing, and language-specific function syntax.</p>
          </section>

          <section id="nesting" className="scroll-mt-20">
            <h1 className="text-4xl font-black text-white mb-8">Nesting & Child Logic</h1>
            <p className="text-gray-400 leading-relaxed">Nesting allows complex logic structures by placing blocks within other blocks. Zekodes enforces valid nesting through physical block constraints, preventing structurally invalid programs. This approach mirrors professional indentation and scoping rules without requiring users to manage formatting manually.</p>
          </section>

          {/* 6. Execution */}
          <section id="compiler" className="scroll-mt-20">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mb-4">6. Execution & Compilation</h2>
            <h1 className="text-4xl font-black text-white mb-8">Cloud Compiler Workflow</h1>
            <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/20 text-gray-400 space-y-4">
              <p>Zekodes removes the need for local compiler installation and configuration. When a user executes a program:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>The generated code is serialized</li>
                <li>Sent to a secure cloud execution environment</li>
                <li>Compiled in a standardized runtime</li>
                <li>Output is streamed back to the integrated terminal in real time</li>
              </ol>
            </div>
          </section>

          {/* 7. AI Intelligence */}
          <section id="ai-debug" className="scroll-mt-20">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mb-4">7. AI Intelligence</h2>
            <h1 className="text-4xl font-black text-white mb-8">Automated Debugging</h1>
            <p className="text-gray-400 leading-relaxed">The automated debugging system analyzes programs to detect syntax issues, logical inconsistencies, and structural errors. Suggested fixes are presented clearly, allowing users to understand and correct mistakes efficiently.</p>
          </section>

          <section id="ai-explain" className="scroll-mt-20">
            <h1 className="text-4xl font-black text-white mb-8">Logic Explanation Engine</h1>
            <p className="text-gray-400 leading-relaxed">The logic explanation engine converts programs into human-readable explanations. This feature is useful for reviewing complex logic, understanding shared projects, and reinforcing learning outcomes.</p>
          </section>

          <section id="ai-opt" className="scroll-mt-20">
            <h1 className="text-4xl font-black text-white mb-8">Code Optimization Advisor</h1>
            <p className="text-gray-400 leading-relaxed">The optimization advisor reviews working programs and provides recommendations for improving performance, readability, and maintainability while preserving original logic.</p>
          </section>

          {/* 8. Error Handling */}
          <section id="errors" className="scroll-mt-20">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mb-4">8. Error Handling & Diagnostics</h2>
            <h1 className="text-4xl font-black text-white mb-8">Common Runtime Errors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                <span className="text-red-500 font-mono text-xs">Segmentation Fault</span>
                <p className="text-gray-500 text-[11px] mt-2">(C) Memory access error.</p>
              </div>
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                <span className="text-red-500 font-mono text-xs">IndexError</span>
                <p className="text-gray-500 text-[11px] mt-2">(Python) List index out of range.</p>
              </div>
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                <span className="text-red-500 font-mono text-xs">NullPointerException</span>
                <p className="text-gray-500 text-[11px] mt-2">(Java) Uninitialized reference.</p>
              </div>
            </div>
          </section>

          {/* 9. Security */}
          <section id="security" className="scroll-mt-20">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mb-4">9. Security & Privacy</h2>
            <h1 className="text-4xl font-black text-white mb-8">Isolation & Privacy</h1>
            <ul className="list-disc pl-5 text-gray-400 space-y-2">
              <li>Cloud execution environments are sandboxed</li>
              <li>User projects are private by default</li>
              <li>Authentication and data storage are securely managed</li>
              <li>No user code is shared without explicit permission</li>
            </ul>
          </section>

          {/* 10. Support */}
          <section id="support" className="scroll-mt-20">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mb-4">10. Support & Community</h2>
            <h1 className="text-4xl font-black text-white mb-8">Community Channels</h1>
            <div className="p-8 bg-[#161b22] rounded-2xl border border-gray-800 space-y-4">
              <p className="text-gray-400">Report issues: <span className="text-blue-500 font-mono">issues.zekodes@gmail.com</span></p>
              <div className="flex gap-4">
                <span className="text-gray-500 text-sm italic">Instagram: @zekodes_official</span>
                <span className="text-gray-500 text-sm italic">X (Twitter): @ZekodesApp</span>
              </div>
            </div>
          </section>

          {/* 11. Roadmap */}
          <section id="roadmap" className="scroll-mt-20">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mb-4">11. Roadmap</h2>
            <h1 className="text-4xl font-black text-white mb-8">Future Enhancements</h1>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-gray-800 rounded-xl text-gray-500 text-sm">Classroom tools</div>
              <div className="p-4 border border-gray-800 rounded-xl text-gray-500 text-sm">Offline compilation</div>
              <div className="p-4 border border-gray-800 rounded-xl text-gray-500 text-sm">New languages</div>
              <div className="p-4 border border-gray-800 rounded-xl text-gray-500 text-sm">Plugin ecosystem</div>
            </div>
          </section>

          {/* 12. Legal */}
          <section id="legal" className="scroll-mt-20 border-t border-gray-800 pt-10">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] mb-4">12. Legal</h2>
            <p className="text-gray-500 text-xs">© 2025 Zekodes Inc. All rights reserved.</p>
          </section>

        </div>
      </main>
    </div>
  );
};

// --- Helpers ---

const NavButton: React.FC<{ label: string; id: string; onClick: (id: string) => void }> = ({ label, id, onClick }) => (
    <button 
        onClick={() => onClick(id)}
        className="w-full text-left px-3 py-2 rounded-lg text-gray-400 hover:bg-[#1f242c] hover:text-blue-400 transition-all flex items-center gap-2 group"
    >
        <div className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-500 transition-colors"></div>
        {label}
    </button>
);

export default DocumentationPage;