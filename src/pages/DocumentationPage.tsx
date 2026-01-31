import React, {  } from 'react';
import { 
  Book, MonitorPlay, 
  ArrowLeft
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
    <div className="flex h-screen bg-white text-gray-600 font-sans overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- Sidebar Navigation --- */}
      <aside className="w-80 flex-shrink-0 bg-gray-50 border-r border-gray-200 overflow-y-auto hidden lg:block">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-md z-10">
           <div className="flex items-center justify-between">
             <div className="flex items-center space-x-2">
               <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                 <Book className="w-5 h-5" />
               </div>
               <span className="font-bold text-gray-900 text-lg tracking-tight">Zekodes Docs</span>
             </div>
             <Link to="/editor" className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all" title="Back to Editor">
               <ArrowLeft size={18} />
             </Link>
           </div>
        </div>

        <nav className="p-6 space-y-8 text-sm">
          {/* Foundation */}
          <div>
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> Foundation
            </div>
            <div className="space-y-1 mt-2">
                <NavButton label="Introduction to Zekodes" id="overview" onClick={scrollToSection} />
                <NavButton label="Design Philosophy" id="philosophy" onClick={scrollToSection} />
                <NavButton label="Platform & Requirements" id="platform" onClick={scrollToSection} />
                <NavButton label="Onboarding Experience" id="onboarding" onClick={scrollToSection} />
                <NavButton label="Zekodes Academy" id="academy" onClick={scrollToSection} />
            </div>
          </div>

          {/* Workspace & Interface */}
          <div>
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Workspace & Interface
            </div>
            <div className="space-y-1 mt-2">
                <NavButton label="Dual-Pane Workspace" id="dual-pane" onClick={scrollToSection} />
                <NavButton label="Navigation and Controls" id="nav-controls" onClick={scrollToSection} />
                <NavButton label="File Management" id="file-mgmt" onClick={scrollToSection} />
                <NavButton label="Integrated Terminal" id="terminal" onClick={scrollToSection} />
            </div>
          </div>

          {/* Programming Concepts */}
          <div>
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div> Programming Concepts
            </div>
            <div className="space-y-1 mt-2">
                <NavButton label="Data Types & Variables" id="data-types" onClick={scrollToSection} />
                <NavButton label="Control Flow" id="control-flow" onClick={scrollToSection} />
                <NavButton label="Loops & Iteration" id="loops" onClick={scrollToSection} />
                <NavButton label="Functions & Scope" id="functions" onClick={scrollToSection} />
                <NavButton label="Nesting & Child Logic" id="nesting" onClick={scrollToSection} />
            </div>
          </div>

          {/* Execution & Compilation */}
          <div>
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Execution & Compilation
            </div>
            <div className="space-y-1 mt-2">
                <NavButton label="Local Code Execution" id="local-exec" onClick={scrollToSection} />
                <NavButton label="C Compilation Workflow" id="c-compilation" onClick={scrollToSection} />
                <NavButton label="Python Execution Workflow" id="python-exec" onClick={scrollToSection} />
                <NavButton label="Standard Input & Output" id="io" onClick={scrollToSection} />
            </div>
          </div>

          {/* Error Handling */}
          <div>
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Error Handling
            </div>
            <div className="space-y-1 mt-2">
                <NavButton label="Compilation Errors" id="comp-errors" onClick={scrollToSection} />
                <NavButton label="Runtime Errors" id="runtime-errors" onClick={scrollToSection} />
                <NavButton label="Debugging Output" id="debug-output" onClick={scrollToSection} />
            </div>
          </div>

          {/* Security & Privacy */}
          <div>
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Security & Privacy
            </div>
            <div className="space-y-1 mt-2">
                <NavButton label="Local Execution Model" id="local-model" onClick={scrollToSection} />
                <NavButton label="Data Privacy" id="privacy" onClick={scrollToSection} />
            </div>
          </div>

          {/* Support & Community */}
          <div>
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Support & Community
            </div>
            <div className="space-y-1 mt-2">
                <NavButton label="Documentation" id="doc-support" onClick={scrollToSection} />
                <NavButton label="Academy" id="academy-support" onClick={scrollToSection} />
                <NavButton label="Support & Contact" id="contact" onClick={scrollToSection} />
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div> Legal
            </div>
            <div className="space-y-1 mt-2">
                <NavButton label="Licensing" id="licensing" onClick={scrollToSection} />
                <NavButton label="Terms of Use" id="terms" onClick={scrollToSection} />
            </div>
          </div>
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 overflow-y-auto scroll-smooth bg-white">
        <div className="max-w-4xl mx-auto px-10 py-16 space-y-24 pb-40">
          
          {/* 1. FOUNDATION */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Foundation</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Introduction to Zekodes</h1>
            <div className="prose max-w-none text-gray-600 space-y-6 leading-relaxed">
              <p>Zekodes is a desktop‑first, logic‑driven integrated development environment (IDE) designed to help beginners learn programming by understanding logic before syntax. It combines visual logic building with a professional code editor, allowing users to transition naturally from drag‑and‑drop programming to real‑world development.</p>
              <p>Unlike traditional IDEs that require users to manage syntax rules, compiler setup, and environment configuration from the start, Zekodes removes early friction by letting users focus on problem‑solving and program structure. Real C and Python code is generated in real time, ensuring that users build transferable programming skills.</p>
            </div>
          </section>

          <section id="philosophy" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Design Philosophy</h1>
            <div className="prose max-w-none text-gray-600 space-y-6">
              <p className="text-xl italic text-gray-800 font-serif border-l-4 border-blue-600 pl-6 my-8 bg-gray-50 py-4 rounded-r-lg">Logic First. Syntax Follows.</p>
              <p>Programming is fundamentally about reasoning, decision‑making, and structure. Zekodes prioritizes these foundations by enabling users to design programs visually using structured logic blocks. Syntax is not hidden; instead, it is revealed live in the code editor as logic is built.</p>
              <p>This approach reduces cognitive overload, accelerates learning, and creates a smooth transition from visual programming to professional software development tools.</p>
            </div>
          </section>

          <section id="platform" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Platform & Requirements</h1>
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm mb-8">
              <h4 className="text-gray-900 font-bold mb-3 flex items-center gap-2"><MonitorPlay size={18} className="text-blue-600" /> Desktop Application (Windows)</h4>
              <p className="text-sm text-gray-600">Zekodes runs as a native desktop application optimized for performance and long coding sessions.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-4 text-sm text-gray-600">
              <h4 className="text-gray-900 font-bold">System Requirements</h4>
              <ul className="list-disc pl-5 space-y-1 marker:text-blue-500">
                <li>Windows 10 or 11</li>
                <li>No external compiler or interpreter installation required</li>
                <li>Works fully offline after installation</li>
              </ul>
              <p className="pt-2 text-xs text-gray-500 font-medium">Zekodes ships with embedded runtimes for supported languages.</p>
            </div>
          </section>

          <section id="onboarding" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Onboarding Experience</h1>
            <div className="prose max-w-none text-gray-600">
              <p>First‑time users are guided through a short onboarding flow that explains the core interaction model:</p>
              <div className="my-6 text-center">
                 <span className="text-gray-900 bg-blue-50 px-4 py-2 rounded-lg font-bold text-lg border border-blue-100">Build Logic → View Code → Run Program</span>
              </div>
              <p>This ensures users understand how visual blocks, generated code, and execution are connected before building their first program.</p>
            </div>
          </section>

          <section id="academy" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Zekodes Academy</h1>
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p>Zekodes Academy is an integrated learning hub designed to help users progress from beginner to confident programmer.</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                <li>Short, focused video lessons</li>
                <li>Step‑by‑step logic‑building demonstrations</li>
                <li>Side‑by‑side logic and code explanations</li>
              </ul>
              <p>The Academy follows a <strong className="text-gray-900">Watch → Build → Run</strong> learning model to encourage hands‑on practice.</p>
            </div>
          </section>

          {/* 2. WORKSPACE */}
          <section id="dual-pane" className="scroll-mt-20">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Workspace & Interface</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Dual-Pane Workspace</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <h4 className="text-gray-900 font-bold mb-2">Visual Canvas</h4>
                <p className="text-sm text-gray-600">An infinite grid where users assemble programs using drag‑and‑drop logic blocks. Structural constraints ensure only valid program logic can be built.</p>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <h4 className="text-gray-900 font-bold mb-2">Code Editor</h4>
                <p className="text-sm text-gray-600">A professional text editor that displays the live translation of visual logic into real C or Python code.</p>
              </div>
            </div>
          </section>

          <section id="nav-controls" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Navigation and Controls</h1>
            <div className="space-y-4 text-gray-600">
              <p><strong className="text-gray-900">Activity Bar:</strong> Access editor, academy, documentation, and profile</p>
              <p><strong className="text-gray-900">Top Toolbar:</strong> Language selection, run, save, and file actions</p>
            </div>
          </section>

          <section id="file-mgmt" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">File Management</h1>
            <p className="text-gray-600">Zekodes uses a tab-based system to manage multiple files, operating similarly to traditional IDEs for a familiar workflow.</p>
          </section>

          <section id="terminal" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Integrated Terminal</h1>
            <div className="prose max-w-none text-gray-600">
              <p>Zekodes includes a built‑in terminal similar to VS Code.</p>
              <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm mt-4 mb-4">
                 $ ./program<br/>
                  Hello World
              </div>
              <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                <li>Uses the local operating system shell</li>
                <li>Displays real stdout and stderr</li>
                <li>Supports interactive input (stdin)</li>
                <li>Allows process interruption (Ctrl+C)</li>
              </ul>
            </div>
          </section>

          {/* 3. CONCEPTS */}
          <section id="data-types" className="scroll-mt-20">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Programming Concepts</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Data Types & Variables</h1>
            <p className="text-gray-600">Understanding how data is stored and manipulated is key. Zekodes introduces variables and data types visually, helping users grasp concepts like integers, strings, and floating-point numbers.</p>
          </section>

          <section id="control-flow" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Control Flow</h1>
            <p className="text-gray-600">Learn how programs make decisions. Blocks for If, Else, and Else-If allow users to build logical branching visually.</p>
          </section>

          <section id="loops" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Loops & Iteration</h1>
            <p className="text-gray-600">Automate repetitive tasks using For and While loops. Visual nesting clearly shows which parts of the code are repeated.</p>
          </section>

          <section id="functions" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Functions & Scope</h1>
            <p className="text-gray-600">Encapsulate logic into reusable blocks. Understand how data is passed into functions and how return values work.</p>
          </section>

          <section id="nesting" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Nesting & Child Logic</h1>
            <p className="text-gray-600">Build complex structures by placing blocks inside other blocks. The visual editor enforces correct nesting, preventing common syntax errors.</p>
          </section>

          {/* 4. EXECUTION */}
          <section id="local-exec" className="scroll-mt-20">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Execution & Compilation</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Local Code Execution</h1>
            <div className="prose max-w-none text-gray-600">
              <p>All programs run locally on the user’s machine using embedded runtimes. There is no cloud execution.</p>
              <p className="font-bold mt-4">Benefits:</p>
              <ul className="list-disc pl-5 space-y-1 marker:text-green-500">
                <li>Faster execution</li>
                <li>Full offline support</li>
                <li>Complete user control over code</li>
              </ul>
            </div>
          </section>

          <section id="c-compilation" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">C Compilation Workflow</h1>
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
               <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                 <li>Generated code is saved to a temporary file</li>
                 <li>Compiled using the embedded GCC toolchain</li>
                 <li>Executed locally</li>
                 <li>Output streamed to the terminal</li>
               </ol>
            </div>
          </section>

          <section id="python-exec" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Python Execution Workflow</h1>
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
               <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                 <li>Generated code is executed using the embedded Python runtime</li>
                 <li>No virtual environments or setup required</li>
                 <li>Output streamed to the terminal</li>
               </ol>
            </div>
          </section>

          <section id="io" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Standard Input & Output</h1>
            <div className="prose max-w-none text-gray-600">
              <p>Zekodes fully supports:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                <li>User input via terminal</li>
                <li>Real‑time output display</li>
                <li>Error messages and exit codes</li>
              </ul>
            </div>
          </section>

          {/* 5. ERRORS */}
          <section id="comp-errors" className="scroll-mt-20">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Error Handling</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Compilation Errors</h1>
            <p className="text-gray-600">Errors that occur during the build process (e.g., syntax errors in C) are caught and displayed clearly in the terminal.</p>
          </section>

          <section id="runtime-errors" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Runtime Errors</h1>
            <p className="text-gray-600">Errors that happen while the program is running (e.g., division by zero) are reported immediately to help users debug logic.</p>
          </section>

          <section id="debug-output" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Debugging Output</h1>
            <p className="text-gray-600">Errors are displayed directly in the terminal to mirror professional development environments, teaching users how to read and interpret standard error logs.</p>
          </section>

          {/* 6. SECURITY */}
          <section id="local-model" className="scroll-mt-20">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Security & Privacy</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Local Execution Model</h1>
            <p className="text-gray-600">Since all code runs locally on your machine, you maintain complete control over your environment.</p>
          </section>

          <section id="privacy" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Data Privacy</h1>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 marker:text-green-500">
              <li>No user code is uploaded to any server</li>
              <li>No telemetry or tracking of source code</li>
              <li>User projects remain private on the local disk</li>
            </ul>
          </section>

          {/* 7. SUPPORT */}
          <section id="doc-support" className="scroll-mt-20">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Support & Community</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Documentation</h1>
            <p className="text-gray-600">Access the built-in docs section anytime for references on blocks and features.</p>
          </section>

          <section id="academy-support" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Academy</h1>
            <p className="text-gray-600">Use the integrated tutorials to master new concepts step-by-step.</p>
          </section>

          <section id="contact" className="scroll-mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Support & Contact</h1>
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
              <p className="text-gray-900 font-medium">Email Support:</p>
              <a href="mailto:issues.zekodes@gmail.com" className="text-blue-600 hover:underline">issues.zekodes@gmail.com</a>
            </div>
          </section>

          {/* 8. LEGAL */}
          <section id="licensing" className="scroll-mt-20">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Legal</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Licensing</h1>
            <p className="text-gray-600">© 2025 Zekodes Inc. All rights reserved.</p>
          </section>

          <section id="terms" className="scroll-mt-20 border-t border-gray-200 pt-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Terms of Use</h1>
            <p className="text-gray-600 text-sm">By using Zekodes, you agree to the standard terms of use for the desktop application.</p>
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
        className="w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all flex items-center gap-2 group"
    >
        <div className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-600 transition-colors"></div>
        {label}
    </button>
);

export default DocumentationPage;