import React, { useCallback, memo } from 'react';
import { 
  Book, MonitorPlay, ArrowLeft, Terminal, Layers, 
  Cpu, Shield, AlertTriangle, Scale, HelpCircle, 
  FileCode, Zap, Lock, Eye, Database, Globe, 
  CheckCircle2, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ============================================================================
// ⚡ PERFORMANCE OPTIMIZATION
// ============================================================================
const DocSection = memo(({ id, title, icon: Icon, children }: { id: string, title: string, icon?: any, children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-32 mb-20 border-b border-[#2b2b2b] pb-16 last:border-0 relative">
    
    {/* Section Header */}
    <div className="flex items-center gap-5 mb-10">
      {Icon && (
        <div className="flex-shrink-0 p-3 bg-[#252526] text-blue-400 rounded-xl border border-[#2b2b2b] shadow-sm">
          <Icon className="w-6 h-6" strokeWidth={2} />
        </div>
      )}
      <h2 className="text-3xl font-bold text-gray-100 tracking-tight">{title}</h2>
    </div>

    {/* Section Content - Dark Mode Typography */}
    <div className="prose prose-lg prose-invert max-w-none 
      
      /* Text Base */
      text-gray-400 leading-relaxed font-normal

      /* Headings */
      prose-headings:text-gray-100 prose-headings:font-semibold prose-headings:tracking-tight
      prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-blue-400
      prose-h4:text-lg prose-h4:text-gray-200 prose-h4:mt-6 prose-h4:mb-2 prose-h4:font-semibold

      /* Links */
      prose-a:text-blue-400 prose-a:font-medium prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline

      /* Code Inline */
      prose-code:text-[#ce9178] prose-code:bg-[#2d2d2d] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[0.9em] prose-code:border prose-code:border-[#3e3e3e]

      /* Code Blocks */
      prose-pre:bg-[#1e1e1e] prose-pre:text-gray-300 prose-pre:shadow-none prose-pre:rounded-lg prose-pre:border prose-pre:border-[#2b2b2b]

      /* Lists */
      prose-li:marker:text-blue-500 prose-ul:my-6 prose-ol:my-6
      
      /* Blockquotes */
      prose-blockquote:border-l-blue-500 prose-blockquote:bg-[#252526] prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-300 prose-blockquote:not-italic">
      
      {children}
    </div>
  </section>
));

const DocumentationPage: React.FC = () => {
  
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="flex h-full bg-[#1e1e1e] text-gray-300 font-sans overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* ============================================================================
          SIDEBAR NAVIGATION (Matches EditorPage Sidebar)
      ============================================================================ */}
      <aside className="w-72 flex-shrink-0 bg-[#252526] border-r border-[#2b2b2b] overflow-y-auto hidden lg:block custom-scrollbar">
        <div className="p-4 border-b border-[#2b2b2b] sticky top-0 bg-[#252526]/95 backdrop-blur-sm z-20">
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
               <span className="font-bold text-gray-100 text-sm tracking-wider uppercase">Contents</span>
             </div>
             <Link to="/editor" className="p-1.5 text-gray-400 hover:text-white hover:bg-[#333] rounded-md transition-all" title="Back to Editor">
               <ArrowLeft size={16} />
             </Link>
           </div>
        </div>

        <nav className="p-4 space-y-8 text-sm pb-32">
          <NavGroup label="Foundation" color="bg-blue-500">
            <NavButton label="Introduction" id="overview" onClick={scrollToSection} />
            <NavButton label="Design Philosophy" id="philosophy" onClick={scrollToSection} />
            <NavButton label="Platform Specs" id="platform" onClick={scrollToSection} />
            <NavButton label="Onboarding" id="onboarding" onClick={scrollToSection} />
            <NavButton label="Zekodes Academy" id="academy" onClick={scrollToSection} />
          </NavGroup>

          <NavGroup label="Workspace" color="bg-emerald-500">
            <NavButton label="Dual-Pane UI" id="dual-pane" onClick={scrollToSection} />
            <NavButton label="Controls" id="nav-controls" onClick={scrollToSection} />
            <NavButton label="File Manager" id="file-mgmt" onClick={scrollToSection} />
            <NavButton label="Terminal" id="terminal" onClick={scrollToSection} />
          </NavGroup>

          <NavGroup label="Concepts" color="bg-amber-500">
            <NavButton label="Data & Variables" id="data-types" onClick={scrollToSection} />
            <NavButton label="Control Flow" id="control-flow" onClick={scrollToSection} />
            <NavButton label="Loops" id="loops" onClick={scrollToSection} />
            <NavButton label="Functions" id="functions" onClick={scrollToSection} />
            <NavButton label="Nesting Logic" id="nesting" onClick={scrollToSection} />
          </NavGroup>

          <NavGroup label="Rules & Constraints" color="bg-rose-600">
             <NavButton label="Strict Necessity" id="strict-necessity" onClick={scrollToSection} />
             <NavButton label="C Constraints" id="c-constraints" onClick={scrollToSection} />
             <NavButton label="Python Constraints" id="python-constraints" onClick={scrollToSection} />
             <NavButton label="User Modes" id="modes" onClick={scrollToSection} />
          </NavGroup>

          <NavGroup label="Execution" color="bg-orange-500">
            <NavButton label="How It Works" id="local-exec" onClick={scrollToSection} />
            <NavButton label="C Compilation" id="c-compilation" onClick={scrollToSection} />
            <NavButton label="Python Runtime" id="python-exec" onClick={scrollToSection} />
            <NavButton label="Input / Output" id="io" onClick={scrollToSection} />
          </NavGroup>

          <NavGroup label="Troubleshooting" color="bg-red-500">
            <NavButton label="Compile Errors" id="comp-errors" onClick={scrollToSection} />
            <NavButton label="Runtime Errors" id="runtime-errors" onClick={scrollToSection} />
            <NavButton label="Debugging" id="debug-output" onClick={scrollToSection} />
          </NavGroup>

          <NavGroup label="Security" color="bg-purple-600">
            <NavButton label="Security Model" id="local-model" onClick={scrollToSection} />
            <NavButton label="Privacy Policy" id="privacy" onClick={scrollToSection} />
          </NavGroup>

          <NavGroup label="Help" color="bg-gray-500">
            <NavButton label="Support" id="contact" onClick={scrollToSection} />
            <NavButton label="Licensing" id="terms" onClick={scrollToSection} />
          </NavGroup>
        </nav>
      </aside>

      {/* ============================================================================
          MAIN CONTENT AREA
      ============================================================================ */}
      <main className="flex-1 overflow-y-auto scroll-smooth bg-[#1e1e1e] custom-scrollbar">
        <div className="max-w-5xl mx-auto px-12 py-20 pb-48">
          
          {/* Header */}
          <div className="mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#252526] border border-[#333] text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Book size={14} /> Official Documentation
            </div>
            <h1 className="text-5xl font-black text-gray-100 mb-6 tracking-tight">
              Zekodes <span className="text-blue-500">Manual</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
              The definitive guide to architecture, logic constraints, and compilation workflows for the Zekodes IDE.
            </p>
          </div>

          {/* ====================================================================================
              1. FOUNDATION
          ==================================================================================== */}
          
          <DocSection id="overview" title="Introduction to Zekodes" icon={Book}>
            <p>
              <strong>Zekodes</strong> is a desktop-first Integrated Development Environment (IDE) built to bridge the gap between block-based learning (Visual Programming) and syntax-based development (Textual Programming). 
            </p>
            <p>
              It solves a specific problem in Computer Science education: the <strong>"Syntax Cliff."</strong> Learners often master logic in tools like Scratch but fail when moving to C or Python because syntax errors (missing semicolons, indentation issues) distract them from algorithmic thinking.
            </p>
            <div className="bg-[#252526] border-l-4 border-blue-500 rounded-r-lg p-6 my-6 flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-gray-100 font-bold m-0 text-lg">The Hybrid Approach</h4>
                <p className="text-gray-400 m-0 mt-2 text-base leading-relaxed">
                  Zekodes provides a unique environment where <strong>Visual Logic Blocks</strong> drive a real-time, read-only <strong>Code Editor</strong>. Users manipulate blocks to build logic, while simultaneously reading the valid C or Python code being generated instantly.
                </p>
              </div>
            </div>
          </DocSection>

          <DocSection id="philosophy" title="Design Philosophy" icon={Zap}>
            <h3>1. Logic is Universal, Syntax is Local</h3>
            <p>
              The core philosophy of Zekodes is that a <code>While Loop</code> is conceptually identical in C, Python, Java, and JavaScript. Only the grammar changes. Zekodes forces users to think in "Atomic Logic Units" (Blocks) rather than characters.
            </p>

            <h3>2. Structural Integrity</h3>
            <p>
              In a standard text editor, you can type <code>int x = "hello";</code> and only find out it's wrong when you compile. In Zekodes, the editor prevents invalid state <em>before</em> it happens. 
            </p>
            <ul>
              <li>A String block cannot snap into an Integer socket.</li>
              <li>A Break statement cannot be placed outside a Loop.</li>
              <li>A Function definition cannot be nested inside another Function (in C mode).</li>
            </ul>

            <h3>3. Transparency</h3>
            <p>
              Zekodes hides nothing. It does not use a proprietary interpreter. It generates standard, compile-ready <strong>ANSI C</strong> and <strong>Python 3</strong> code that you can copy-paste into any professional IDE later.
            </p>
          </DocSection>

          <DocSection id="platform" title="Platform & Requirements" icon={MonitorPlay}>
            <h3>Architecture</h3>
            <p>
              Zekodes is an <strong>Electron</strong> application. This allows it to:
            </p>
            <ul>
              <li>Access the native file system for saving/loading projects.</li>
              <li>Spawn child processes for GCC compilation and Python execution.</li>
              <li>Work entirely offline without cloud dependencies.</li>
            </ul>

            <h3>System Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
               <div className="p-6 bg-[#252526] rounded-xl border border-[#2b2b2b]">
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu className="w-5 h-5 text-gray-400" />
                    <h4 className="font-bold text-gray-200 m-0">Minimum Specs</h4>
                  </div>
                  <ul className="text-sm space-y-2 pl-0 list-none text-gray-400 m-0">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> <strong>OS:</strong> Windows 10 (64-bit) or later</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> <strong>CPU:</strong> Intel Core i3 / AMD Ryzen 3</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> <strong>RAM:</strong> 4 GB</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> <strong>Disk:</strong> 1 GB Free Space</li>
                  </ul>
               </div>
               <div className="p-6 bg-[#252526] rounded-xl border border-[#2b2b2b]">
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-5 h-5 text-gray-400" />
                    <h4 className="font-bold text-gray-200 m-0">Bundled Tools</h4>
                  </div>
                  <p className="text-sm mb-4 text-gray-500">Zekodes includes portable runtimes, so no external installation is needed:</p>
                  <ul className="text-sm space-y-2 pl-0 list-none text-gray-400 m-0">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>MinGW-w64 (GCC):</strong> For C compilation</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span><strong>Python 3.11 (Embedded):</strong> For Python scripts</span>
                    </li>
                  </ul>
               </div>
            </div>
          </DocSection>

          <DocSection id="onboarding" title="Onboarding Experience" icon={Eye}>
            <p>
              When a user first launches Zekodes, a persistent profile is created in the local database. The onboarding flow determines the "Strictness Level" of the IDE.
            </p>
            <p><strong>The 3-Step Setup:</strong></p>
            <ol>
              <li><strong>Profile Creation:</strong> User provides a nickname and experience level.</li>
              <li><strong>Language Selection:</strong> User chooses their primary focus (C or Python).</li>
              <li><strong>Mode Selection:</strong> 
                <ul>
                  <li><em>Beginner:</em> Enables all guardrails and tutorials.</li>
                  <li><em>Advanced:</em> Disables structural locks for faster prototyping.</li>
                </ul>
              </li>
            </ol>
          </DocSection>

          <DocSection id="academy" title="Zekodes Academy">
            <p>
              The Academy is an integrated Learning Management System (LMS) overlay. It allows users to watch concept videos without leaving the application.
            </p>
            <p><strong>Workflow:</strong></p>
            <ol>
              <li>User opens "Academy" tab.</li>
              <li>Selects topic (e.g., "Variables in C").</li>
              <li>Watches video explaining the concept and the specific Zekodes blocks used.</li>
              <li>Clicks "Try it now" which switches to the Editor and highlights the relevant blocks in the toolbox.</li>
            </ol>
          </DocSection>

          {/* ====================================================================================
              2. WORKSPACE & INTERFACE
          ==================================================================================== */}

          <DocSection id="dual-pane" title="Dual-Pane Workspace" icon={Layers}>
            <p>
              The Editor Page is the heart of Zekodes. It uses a split-screen layout to show Cause (Blocks) and Effect (Code).
            </p>
            
            <h3>Left Pane: The Visual Canvas</h3>
            <p>
              An infinite 2D grid where blocks are dropped.
            </p>
            <ul>
                <li><strong>Drag & Drop:</strong> Blocks are dragged from the Sidebar (Toolbox).</li>
                <li><strong>Snapping:</strong> Blocks have "connectors". A notch on top means it follows previous logic; a bump on bottom means it leads to next logic. C-shaped mouths indicate nesting.</li>
                <li><strong>Context Actions:</strong> Right-click any block to Delete or Duplicate it.</li>
            </ul>

            <h3>Right Pane: The Code View</h3>
            <p>
              A read-only instance of the <strong>Monaco Editor</strong> (VS Code's core).
            </p>
            <ul>
                <li><strong>Real-time Transpilation:</strong> Every visual change triggers the <code>generateCode()</code> function which rebuilds the text string.</li>
                <li><strong>Syntax Highlighting:</strong> Proper tokenization for C and Python.</li>
                <li><strong>Minimap:</strong> Fast scrolling for long programs.</li>
            </ul>
          </DocSection>

          <DocSection id="nav-controls" title="Navigation & Controls">
            <p><strong>The Toolbar (Top):</strong></p>
            <ul>
              <li><strong>Language Selector:</strong> Toggles between C and Python mode. <span className="text-red-400 font-bold">Warning:</span> Switching languages clears the canvas as blocks are not compatible.</li>
              <li><strong>Run Button (Green):</strong> Triggers the compilation/execution pipeline.</li>
              <li><strong>Save Button (Blue):</strong> Persists the current block state to local JSON storage.</li>
              <li><strong>Clear Button (Red):</strong> Wipes the canvas (with confirmation).</li>
            </ul>

            <p><strong>The Activity Bar (Left):</strong> Navigate between Editor, Academy, Documentation, and Settings.</p>
          </DocSection>

          <DocSection id="file-mgmt" title="File Management" icon={FileCode}>
            <p>
              Zekodes uses a "Single Active File" model for simplicity. Projects are saved as <code>.zkd</code> files (internally JSON). This JSON contains:
            </p>
            <div className="not-prose">
                <div className="bg-[#252526] rounded-xl overflow-hidden shadow-lg border border-[#2b2b2b]">
                    <div className="bg-[#1e1e1e] px-4 py-2 border-b border-[#2b2b2b] text-xs text-gray-500 font-mono">project.zkd</div>
                    <pre className="p-4 text-sm text-[#9cdcfe] overflow-x-auto"><code>{`{
  "version": "2.0",
  "language": "c",
  "blocks": [
    { "id": "uuid", "type": "c-main", "params": {}, "children": [...] }
  ]
}`}</code></pre>
                </div>
            </div>
            <p className="mt-4">
              When you load a project, the JSON is parsed to reconstruct the visual block tree.
            </p>
          </DocSection>

          <DocSection id="terminal" title="Integrated Terminal" icon={Terminal}>
            <p>
              The bottom panel houses a pseudo-terminal component. It is NOT a full OS shell (like PowerShell), but a stream renderer.
            </p>
            <ul>
              <li><strong>Standard Output (stdout):</strong> Normal program output appears in white/grey.</li>
              <li><strong>Standard Error (stderr):</strong> Compilation errors or runtime crashes appear in red.</li>
              <li><strong>Standard Input (stdin):</strong> When a program requests input, the terminal unlocks an input field. Pressing Enter sends the data to the running process.</li>
            </ul>
          </DocSection>

          {/* ====================================================================================
              3. PROGRAMMING CONCEPTS
          ==================================================================================== */}

          <DocSection id="data-types" title="Data Types & Variables" icon={Database}>
            <p>
              Zekodes visualizes memory allocation through variable blocks.
            </p>
            
            <h3>Python Mode</h3>
            <p>
              Since Python is dynamically typed, you use generic assignment blocks. 
              <br/><code>Block: Set [variable] to [value]</code>
              <br/>The type is determined by the value you connect (Number vs String).
            </p>

            <h3>C Mode</h3>
            <p>
              C requires explicit typing. Zekodes provides distinct blocks for:
            </p>
            <ul>
              <li><strong>int:</strong> Integers (4 bytes)</li>
              <li><strong>float:</strong> Floating point (4 bytes)</li>
              <li><strong>double:</strong> Double precision (8 bytes)</li>
              <li><strong>char:</strong> Single character (1 byte)</li>
            </ul>
            <div className="bg-[#252526] border border-amber-600/30 rounded-lg p-4 flex gap-3 items-start">
              <Info className="w-5 h-5 text-amber-500 mt-0.5" />
              <p className="text-amber-200 text-sm m-0">
                <strong>Note:</strong> Strings in C are handled as <code>char[]</code> arrays automatically by the "String Declare" block to abstract pointer complexity for beginners.
              </p>
            </div>
          </DocSection>

          <DocSection id="control-flow" title="Control Flow">
            <p>
              Logic branching is handled by container blocks.
            </p>
            <ul>
              <li><strong>If Block:</strong> Evaluates a boolean condition. If true, executes blocks nested inside.</li>
              <li><strong>Else-If:</strong> Attachable to the bottom of an If block.</li>
              <li><strong>Else:</strong> The catch-all block.</li>
            </ul>
            <p>
              Visually, these blocks have a "C-mouth" shape. If you drag a block out of the mouth, it is removed from the logic flow immediately.
            </p>
          </DocSection>

          <DocSection id="loops" title="Loops & Iteration">
            <h3>For Loops</h3>
            <p>
              <strong>Python:</strong> Uses <code>range()</code>. Inputs are Start, Stop, and Step.
              <br/><strong>C:</strong> Uses standard <code>for(int i=0; i&lt;n; i++)</code> syntax. Zekodes exposes the initializer, condition, and incrementor as editable fields.
            </p>

            <h3>While Loops</h3>
            <p>
              Runs as long as the attached boolean condition is True.
              <br/><em>Warning:</em> Users must ensure they include logic to break the loop (like incrementing a counter), otherwise Zekodes will run an infinite loop which may freeze the execution runtime.
            </p>
          </DocSection>

          <DocSection id="functions" title="Functions & Scope">
            <p>
              Functions are independent logic islands.
            </p>
            <ul>
              <li><strong>Definition Block:</strong> Must be placed on the root canvas (Global scope). Cannot be nested inside other blocks (in C).</li>
              <li><strong>Call Block:</strong> Can be placed anywhere. Triggers the function.</li>
              <li><strong>Parameters:</strong> Defined as a comma-separated list in the block properties.</li>
            </ul>
          </DocSection>

          <DocSection id="nesting" title="Nesting & Logic">
            <p>
              Nesting is the act of placing blocks inside other blocks. Zekodes supports infinite depth nesting.
            </p>
            <p>
              <strong>The Indentation Engine:</strong>
              When generating code, the depth of the block in the visual tree determines the indentation level (Tabs or Spaces).
            </p>
            <div className="not-prose bg-[#252526] text-gray-300 p-4 rounded-xl border border-[#2b2b2b] text-sm font-mono">
{`// Depth 0
int main() {
    // Depth 1
    if (x > 0) {
        // Depth 2
        printf("Hello");
    }
}`}
            </div>
          </DocSection>

          {/* ====================================================================================
              4. CONSTRAINTS & RULES (CRITICAL)
          ==================================================================================== */}

          <DocSection id="strict-necessity" title="The Strict Necessity Rule" icon={Scale}>
            <p>
              To prevent beginners from feeling overwhelmed or making frustrating syntax errors, Zekodes implements the <strong>Strict Necessity Rule</strong>.
            </p>
            <div className="bg-[#252526] p-6 rounded-xl border border-blue-900/30">
              <h4 className="text-blue-400 font-bold mb-2 text-lg">The Rule:</h4>
              <p className="text-gray-300 m-0 italic font-medium">
                "A block cannot be placed on the canvas unless its logical prerequisites are already met."
              </p>
            </div>
            <p className="mt-4">
              This means the toolbox (sidebar) will actually <strong>disable/grey out</strong> blocks that are not yet valid to use in the current context.
            </p>
          </DocSection>

          <DocSection id="c-constraints" title="C Language Constraints">
            <p>C is highly structural. Zekodes enforces this structure rigidly in Beginner Mode.</p>
            
            <h3>1. The Main Mandate</h3>
            <p>You cannot drag <em>any</em> logic block (print, variable, loop) onto an empty canvas. You <strong>MUST</strong> drag the <code>int main()</code> block first.</p>
            
            <h3>2. The Header Mandate</h3>
            <p>If you try to use `printf` or `scanf`, Zekodes checks for <code>#include &lt;stdio.h&gt;</code>. If missing, the IO category is locked or the block is rejected.</p>

            <h3>3. Scope Lockdown</h3>
            <p>Logic blocks can only be dropped <strong>inside</strong> functions. You cannot drop a <code>printf</code> in the global scope (outside main), as this is illegal in C.</p>
          </DocSection>

          <DocSection id="python-constraints" title="Python Constraints">
            <p>Python is more permissive, so constraints are relaxed, but structure is still encouraged.</p>
            <h3>1. The Main Guard</h3>
            <p>Zekodes encourages starting with the <code>if __name__ == "__main__":</code> block. While not strictly required by the interpreter, it is enforced in Beginner Mode to teach modularity.</p>
            <h3>2. Pass Generation</h3>
            <p>Python relies on indentation. An empty `if` statement is a syntax error. Zekodes automatically inserts a <code>pass</code> keyword into any container block that has no children, ensuring the code always compiles.</p>
          </DocSection>

          <DocSection id="modes" title="Beginner vs Advanced Mode">
            <p>You can toggle constraints in the User Profile.</p>
            <div className="overflow-hidden border border-[#2b2b2b] rounded-xl mt-6">
                <table className="w-full text-left border-collapse">
                <thead className="bg-[#252526]">
                    <tr>
                    <th className="p-4 border-b border-[#2b2b2b] font-bold text-gray-200">Feature</th>
                    <th className="p-4 border-b border-[#2b2b2b] font-bold text-blue-400">Beginner Mode</th>
                    <th className="p-4 border-b border-[#2b2b2b] font-bold text-red-400">Advanced Mode</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#2b2b2b]">
                    <tr>
                    <td className="p-4 font-medium text-gray-400">Toolbox Locking</td>
                    <td className="p-4"><span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-green-900/30 text-green-400 text-sm font-semibold">Active</span></td>
                    <td className="p-4"><span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#333] text-gray-400 text-sm font-semibold">Disabled</span></td>
                    </tr>
                    <tr>
                    <td className="p-4 font-medium text-gray-400">Drop Validation</td>
                    <td className="p-4"><span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-green-900/30 text-green-400 text-sm font-semibold">Strict</span></td>
                    <td className="p-4"><span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#333] text-gray-400 text-sm font-semibold">Permissive</span></td>
                    </tr>
                    <tr>
                    <td className="p-4 font-medium text-gray-400">Error Messages</td>
                    <td className="p-4"><span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-green-900/30 text-green-400 text-sm font-semibold">Verbose</span></td>
                    <td className="p-4"><span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#333] text-gray-400 text-sm font-semibold">Silent</span></td>
                    </tr>
                </tbody>
                </table>
            </div>
          </DocSection>

          {/* ====================================================================================
              5. EXECUTION & COMPILATION
          ==================================================================================== */}

          <DocSection id="local-exec" title="Local Execution Model" icon={Cpu}>
            <p>Zekodes does not use cloud servers to run code. Everything happens on your metal.</p>
            <p><strong>The Pipeline:</strong></p>
            <ol className="list-decimal pl-6 space-y-3 marker:font-bold marker:text-gray-500">
              <li><strong>Generation:</strong> React state - String (source code).</li>
              <li><strong>File I/O:</strong> Node.js writes <code>temp_script.c</code> to the user's OS temp folder.</li>
              <li><strong>Shell Spawn:</strong> Electron spawns a hidden shell instance.</li>
              <li><strong>Compilation (C only):</strong> GCC is invoked to build an executable.</li>
              <li><strong>Execution:</strong> The binary (or Python script) is executed.</li>
              <li><strong>Cleanup:</strong> Temporary files are deleted.</li>
            </ol>
          </DocSection>

          <DocSection id="c-compilation" title="C Compilation (GCC)">
            <p>We bundle a lightweight version of <strong>MinGW-w64</strong>.</p>
            <p><strong>Command Used:</strong></p>
            <pre className="mt-2"><code>gcc "path/to/code.c" -o "path/to/app.exe"</code></pre>
            <p>If this command returns an Exit Code other than 0, the process aborts, and the GCC error output (stderr) is piped to the Zekodes terminal.</p>
          </DocSection>

          <DocSection id="python-exec" title="Python Runtime">
            <p>We bundle an <strong>Embeddable Python Package</strong>. This is a minimal Python environment.</p>
            <p><strong>Command Used:</strong></p>
            <pre className="mt-2"><code>python "path/to/script.py"</code></pre>
            <p><em>Note:</em> The embedded Python does not have pip installed by default to keep the app size small. Standard libraries (math, random, time) are available.</p>
          </DocSection>

          <DocSection id="io" title="Standard I/O">
            <p>
              <strong>Output:</strong> The stdout stream is listened to via `child.stdout.on('data')`. Chunks of data are converted to strings and pushed to the Terminal array.
            </p>
            <p>
              <strong>Input:</strong> When the process waits for stdin (e.g. `scanf`), it pauses. Zekodes does not automatically detect this pause (Node limitation). However, if you type in the terminal and hit Enter, Zekodes writes that string to `child.stdin`.
            </p>
          </DocSection>

          {/* ====================================================================================
              6. ERROR HANDLING
          ==================================================================================== */}

          <DocSection id="comp-errors" title="Compilation Errors" icon={AlertTriangle}>
            <p>These occur before the program runs (C Only).</p>
            <div className="bg-red-900/20 border-l-4 border-red-600 p-4 text-red-200 font-mono text-sm">
              main.c:5:5: error: expected ';' before 'return'
            </div>
            <p className="mt-4">Zekodes parses these errors and attempts to highlight the specific line in the Editor (if line mapping is enabled).</p>
          </DocSection>

          <DocSection id="runtime-errors" title="Runtime Errors">
            <p>These occur during execution.</p>
            <ul>
              <li><strong>Python:</strong> Tracebacks (NameError, IndexError).</li>
              <li><strong>C:</strong> Segmentation Faults (Accessing invalid memory).</li>
            </ul>
            <p>Runtime errors are displayed in Red text in the console to distinguish them from program output.</p>
          </DocSection>

          <DocSection id="debug-output" title="Debugging Output">
            <p>Zekodes supports basic "Print Debugging". Users are encouraged to place Print blocks at various stages of their logic to trace execution flow, as there is no step-through debugger in the current version.</p>
          </DocSection>

          {/* ====================================================================================
              7. SECURITY & PRIVACY
          ==================================================================================== */}

          <DocSection id="local-model" title="Local Execution Security" icon={Shield}>
            <p>Because Zekodes executes arbitrary code on your machine, security is handled by the OS User Permissions.</p>
            <ul>
              <li>Zekodes runs with standard user privileges, NOT Administrator privileges.</li>
              <li>Generated scripts cannot modify system files unless the user explicitly writes code to do so (which the OS would block).</li>
            </ul>
          </DocSection>

          <DocSection id="privacy" title="Data Privacy" icon={Lock}>
            <p><strong>Zero Telemetry on Code.</strong></p>
            <p>We do not track, upload, or analyze the code you write.</p>
            <ul>
                <li>Your <code>.c</code> and <code>.py</code> files stay on your disk.</li>
                <li>Your project structure stays in your LocalStorage.</li>
            </ul>
          </DocSection>

          {/* ====================================================================================
              8. SUPPORT & LEGAL
          ==================================================================================== */}

          <DocSection id="contact" title="Support Channels" icon={HelpCircle}>
            <p>Need help? Found a bug? Reach out to the team directly.</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
               <a href="mailto:issues.zekodes@gmail.com" className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#252526] text-white rounded-xl hover:bg-[#333] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 font-medium border border-[#333]">
                 <span>📧 issues.zekodes@gmail.com</span>
               </a>
            </div>
          </DocSection>

          <DocSection id="terms" title="Terms & Licensing" icon={Globe}>
            <p><strong>Zekodes Community Edition</strong> is free to use for educational and personal purposes.</p>
            <p>You own the copyright to any source code generated by the tool. You are free to compile, sell, or distribute software built with Zekodes.</p>
            <p className="text-sm text-gray-500 mt-12 pt-12 border-t border-[#2b2b2b]">
              © 2026 Zekodes Inc. All rights reserved. Documentation Version 2.4.
            </p>
          </DocSection>

        </div>
      </main>
    </div>
  );
};

// ============================================================================
// 🧩 HELPER COMPONENTS
// ============================================================================

const NavGroup: React.FC<{ label: string; color: string; children: React.ReactNode }> = ({ label, color, children }) => (
  <div className="mb-8 last:mb-0">
    <div className="px-3 py-2 text-xs font-extrabold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-3">
      <div className={`w-2 h-2 rounded-full shadow-sm ${color}`}></div> {label}
    </div>
    <div className="space-y-0.5">
      {children}
    </div>
  </div>
);

const NavButton: React.FC<{ label: string; id: string; onClick: (id: string) => void }> = ({ label, id, onClick }) => (
    <button 
        onClick={() => onClick(id)}
        className="w-full text-left px-3 py-2.5 rounded-lg text-gray-400 hover:bg-[#333] hover:text-white transition-all duration-200 flex items-center gap-3 group text-sm font-medium"
    >
        <span className="w-1.5 h-1.5 rounded-full bg-[#333] group-hover:bg-blue-500 transition-colors"></span>
        {label}
    </button>
);

export default DocumentationPage;