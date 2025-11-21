import React from 'react';
import { 
  Book, FileText, 
  ShieldAlert, Globe, BookOpen, Bug, Sparkles 
} from 'lucide-react';

const DocumentationPage: React.FC = () => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-full bg-[#0d1117] text-gray-300 font-sans overflow-hidden">
      
      {/* --- Sidebar Navigation --- */}
      <aside className="w-72 flex-shrink-0 bg-[#161b22] border-r border-gray-800 overflow-y-auto hidden md:block">
        <div className="p-6 border-b border-gray-800">
           <div className="flex items-center space-x-2">
             <Book className="w-6 h-6 text-blue-500" />
             <span className="font-bold text-white text-lg">User Manual</span>
           </div>
        </div>

        <nav className="p-4 space-y-1 text-sm">
          <div className="pb-2">
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Contents</p>
            <button onClick={() => scrollToSection('intro')} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#1f242c] hover:text-white transition-colors">1. Introduction</button>
            <button onClick={() => scrollToSection('getting-started')} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#1f242c] hover:text-white transition-colors">2. Getting Started</button>
            <button onClick={() => scrollToSection('interface')} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#1f242c] hover:text-white transition-colors">3. User Interface</button>
            <button onClick={() => scrollToSection('blocks')} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#1f242c] hover:text-white transition-colors">4. Visual Programming</button>
            <button onClick={() => scrollToSection('code-mgmt')} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#1f242c] hover:text-white transition-colors">5. Code Management</button>
            <button onClick={() => scrollToSection('execution')} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#1f242c] hover:text-white transition-colors">6. Execution & Compilation</button>
            <button onClick={() => scrollToSection('ai')} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#1f242c] hover:text-white transition-colors">7. AI Assistance</button>
            <button onClick={() => scrollToSection('languages')} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#1f242c] hover:text-white transition-colors">8. Language Reference</button>
            <button onClick={() => scrollToSection('support')} className="w-full text-left px-3 py-1.5 rounded hover:bg-[#1f242c] hover:text-white transition-colors">9. Support & Feedback</button>
          </div>
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-4xl mx-auto px-8 py-12">
          
          {/* Header */}
          <div className="mb-12 border-b border-gray-800 pb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Zerocodes Documentation</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center"><FileText className="w-4 h-4 mr-1.5" /> Version 2.0 (Early Access)</span>
              <span className="flex items-center"><Globe className="w-4 h-4 mr-1.5" /> Last Updated: November 2025</span>
            </div>
          </div>

          {/* Content Blocks */}
          <div className="space-y-16">
            
            {/* Chapter 1 */}
            <section id="intro">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-blue-500 mr-3">1.</span> Introduction
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <div id="1.1">
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">1.1 Overview</h3>
                  <p>
                    Welcome to <strong>Zerocodes</strong>, an integrated development environment (IDE) specifically engineered to democratize programming education. Zerocodes bridges the significant cognitive gap between visual logic building and professional text-based coding. By synchronizing a drag-and-drop block interface with a real-time code editor, it allows students, educators, and beginners to construct complex algorithms intuitively while simultaneously learning the syntax of industry-standard languages like C, Python, and Java.
                  </p>
                </div>
                <div id="1.2">
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">1.2 Current Version & Availability</h3>
                  <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-4 rounded-r">
                    <p className="text-sm font-medium text-blue-300">
                      <strong>Important Notice:</strong> Zerocodes is currently in its <strong>Early Access</strong> phase (v2.0). The platform is fully functional but actively evolving. Users may experience frequent updates as we introduce new features, refine performance, and expand compatibility.
                    </p>
                  </div>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Desktop Application:</strong> Available exclusively for <strong>Microsoft Windows (10/11)</strong>. Native applications for macOS and Linux are currently in active development.</li>
                    <li><strong>Web Editor:</strong> For users on macOS, Linux, ChromeOS, or public computers, the <strong>Zerocodes Web Editor</strong> offers a zero-compromise experience. It is accessible via any modern web browser (Chrome, Edge, Firefox, Safari) and provides feature parity with the desktop app.</li>
                  </ul>
                </div>
                <div id="1.3">
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">1.3 Connectivity Requirements</h3>
                  <p>
                    <strong>An active Internet connection is mandatory.</strong> Zerocodes is a cloud-powered platform. To ensure lightweight performance on user devices, resource-intensive tasks such as code compilation, execution, and AI analysis are offloaded to secure cloud servers. Offline mode is not currently supported.
                  </p>
                </div>
              </div>
            </section>

            {/* Chapter 2 */}
            <section id="getting-started">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-blue-500 mr-3">2.</span> Getting Started
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <h3 className="text-lg font-semibold text-gray-200">2.1 Installation (Windows)</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li><strong>Download:</strong> Visit the official Zerocodes GitHub release page to download the installer (<code>Zerocodes Setup 2.0.0.exe</code>).</li>
                  <li><strong>Install:</strong> Double-click the file. The installer is automated and installs to your local AppData folder.</li>
                  <li><strong>Launch:</strong> Zerocodes will launch automatically. A shortcut is created on your desktop.</li>
                  <li><strong>Security:</strong> On first launch, Windows Defender may prompt you. Click "More Info" -&gt; "Run Anyway" to proceed.</li>
                </ol>
                
                <h3 className="text-lg font-semibold text-gray-200 mt-4">2.2 First Launch & Setup</h3>
                <p>
                  Upon opening Zerocodes, you will see the authentication screen. Creating an account allows you to save preferences and access cloud compilation quotas. Guest access is permitted for quick testing but does not support saving projects to the cloud.
                </p>
              </div>
            </section>

            {/* Chapter 3 */}
            <section id="interface">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-blue-500 mr-3">3.</span> The User Interface
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>The workspace is divided into five distinct zones to facilitate a "Left-to-Right" workflow:</p>
                <ul className="space-y-4">
                  <li className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-700">
                    <strong className="text-white block mb-1">3.1 Activity Bar (Left)</strong>
                    The vertical bar on the far left. It allows navigation between the "Blocks View" (Visual Editor) and "Code View" (Text Editor). It also houses User Profile and Settings.
                  </li>
                  <li className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-700">
                    <strong className="text-white block mb-1">3.2 Header Toolbar (Top)</strong>
                    Contains global controls: Language Selector (C, Python, Java), Action Buttons (Run, Save), and AI Tools. The <strong>Clear Canvas</strong> button is also located here for quick resetting.
                  </li>
                  <li className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-700">
                    <strong className="text-white block mb-1">3.3 The Dual-Pane Workspace</strong>
                    <ul className="list-disc list-inside ml-4 mt-2 text-sm">
                      <li><strong>Left Pane (Canvas):</strong> The infinite grid where you drag and drop logical blocks.</li>
                      <li><strong>Right Pane (Editor):</strong> The read-only text editor displaying generated code in real-time.</li>
                    </ul>
                  </li>
                  <li className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-700">
                    <strong className="text-white block mb-1">3.4 The Terminal Panel (Bottom)</strong>
                    A collapsible panel that mimics a real system terminal. It displays compilation status, standard output (stdout), error messages (stderr), and interactive input fields.
                  </li>
                </ul>
              </div>
            </section>

            {/* Chapter 4 */}
            <section id="blocks">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-blue-500 mr-3">4.</span> Visual Programming
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <h3 className="text-lg font-semibold text-gray-200">4.1 Block Categories</h3>
                <p>Blocks are color-coded for mental organization:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded border border-orange-500/30 bg-orange-900/10"><span className="text-orange-400 font-bold">Variables:</span> Declaring integers, floats, strings.</div>
                  <div className="p-3 rounded border border-green-500/30 bg-green-900/10"><span className="text-green-400 font-bold">Control:</span> Logic flow (if, else, switch).</div>
                  <div className="p-3 rounded border border-cyan-500/30 bg-cyan-900/10"><span className="text-cyan-400 font-bold">Loops:</span> Iteration (for, while).</div>
                  <div className="p-3 rounded border border-purple-500/30 bg-purple-900/10"><span className="text-purple-400 font-bold">Functions:</span> Definitions and Returns.</div>
                  <div className="p-3 rounded border border-blue-500/30 bg-blue-900/10"><span className="text-blue-400 font-bold">I/O:</span> Printing and Scanning input.</div>
                </div>

                <h3 className="text-lg font-semibold text-gray-200 mt-4">4.2 Advanced Operations</h3>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Nesting:</strong> Control blocks act as containers. Dragging a block <em>inside</em> an 'If' or 'Loop' block nests the logic and automatically handles indentation in the generated code.</li>
                  <li><strong>Reordering:</strong> Blocks can be dragged and reordered. Drop a block on top of another to insert it before; drop it inside a container to append it.</li>
                  <li><strong>Inputs:</strong> Click on the white text fields within blocks to modify variable names, values, or conditions.</li>
                </ul>
              </div>
            </section>

            {/* Chapter 5 */}
            <section id="code-mgmt">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-blue-500 mr-3">5.</span> Code Management
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <h3 className="text-lg font-semibold text-gray-200">5.1 Visual-to-Text Sync</h3>
                <p>
                  Changes in the Block Canvas <strong>always</strong> overwrite the Code Editor. This ensures syntax perfection for beginners. It serves as a learning tool: observe how a "Loop" block translates into actual C, Python, or Java syntax instantly.
                </p>
                <h3 className="text-lg font-semibold text-gray-200">5.2 Manual Coding Mode</h3>
                <p>
                  Advanced users can toggle the switch in the header from <strong>Blocks</strong> to <strong>Code</strong>. In this mode, the Canvas is hidden, and the Editor becomes writable. 
                  <br/><em className="text-red-400 text-xs">Warning: Switching back to Block mode will discard manual changes in favor of the block state.</em>
                </p>
              </div>
            </section>

            {/* Chapter 6 */}
            <section id="execution">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-blue-500 mr-3">6.</span> Execution & Compilation
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Zerocodes abstracts the complex toolchain. You do not need GCC, JDK, or Python installed locally.
                </p>
                <div className="pl-4 border-l-2 border-gray-700">
                  <h4 className="font-bold text-white mb-2">Workflow:</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Click <strong>Run</strong> (Green Button).</li>
                    <li>The Terminal Panel opens automatically.</li>
                    <li>Status shows <code>Compiling...</code>.</li>
                    <li>Upon success, output appears. If input is required (e.g., <code>scanf</code>), an input bar appears at the bottom of the terminal.</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Chapter 7 */}
            <section id="ai">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-blue-500 mr-3">7.</span> AI Assistance Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="bg-[#161b22] p-5 rounded-lg">
                  <h3 className="text-blue-400 font-bold mb-2 flex items-center"><BookOpen className="w-4 h-4 mr-2"/> Explain Code</h3>
                  <p>The AI analyzes your full code and prints a natural language summary, explaining the logic flow step-by-step.</p>
                </div>
                <div className="bg-[#161b22] p-5 rounded-lg">
                  <h3 className="text-purple-400 font-bold mb-2 flex items-center"><Bug className="w-4 h-4 mr-2"/> Fix Code</h3>
                  <p>If compilation fails, use this. The AI detects syntax errors (missing semicolons, types) and suggests a corrected version.</p>
                </div>
                <div className="bg-[#161b22] p-5 rounded-lg">
                  <h3 className="text-yellow-400 font-bold mb-2 flex items-center"><Sparkles className="w-4 h-4 mr-2"/> Optimize</h3>
                  <p>Reviews working code for efficiency. Suggests cleaner logic (e.g., replacing if-chains with switch statements).</p>
                </div>
              </div>
            </section>

            {/* Chapter 8 */}
            <section id="languages">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-blue-500 mr-3">8.</span> Language Reference
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-[#161b22] text-white uppercase">
                    <tr>
                      <th className="px-6 py-3">Feature</th>
                      <th className="px-6 py-3">C Language</th>
                      <th className="px-6 py-3">Python</th>
                      <th className="px-6 py-3">Java</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    <tr>
                      <td className="px-6 py-4 font-medium text-white">Standard</td>
                      <td className="px-6 py-4">C99/C11</td>
                      <td className="px-6 py-4">Python 3.10+</td>
                      <td className="px-6 py-4">OpenJDK 17+</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-white">Entry Point</td>
                      <td className="px-6 py-4"><code>int main()</code></td>
                      <td className="px-6 py-4">Script-based</td>
                      <td className="px-6 py-4"><code>public static void main</code></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-white">I/O</td>
                      <td className="px-6 py-4"><code>printf</code>, <code>scanf</code></td>
                      <td className="px-6 py-4"><code>print</code>, <code>input</code></td>
                      <td className="px-6 py-4"><code>System.out</code>, <code>Scanner</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Chapter 9 */}
            <section id="support">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-blue-500 mr-3">9.</span> Support & Feedback
              </h2>
              <div className="space-y-6 text-gray-300">
                <p>
                  We need your help to make Zerocodes better! If you find a bug or have a feature request, please reach out.
                </p>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 bg-[#161b22] p-6 rounded-lg border border-gray-800">
                     <h3 className="font-bold text-white mb-4 flex items-center"><ShieldAlert className="w-5 h-5 mr-2 text-red-400"/> Reporting Issues</h3>
                     <p className="mb-4 text-sm">Please email us with a description, screenshots, and the code you were trying to run.</p>
                     <a href="mailto:support@zerocodes.com" className="text-blue-400 hover:text-blue-300 font-mono">support@zerocodes.com</a>
                  </div>

                  <div className="flex-1 bg-[#161b22] p-6 rounded-lg border border-gray-800">
                     <h3 className="font-bold text-white mb-4 flex items-center"><Globe className="w-5 h-5 mr-2 text-green-400"/> Community</h3>
                     <p className="mb-4 text-sm">Follow us for updates on macOS/Linux releases and new features.</p>
                     <div className="space-y-1 text-sm font-mono text-gray-400">
                       <p>X / Twitter: @ZerocodesApp</p>
                       <p>LinkedIn: Zerocodes Inc.</p>
                       <p>Instagram: @Zerocodes.Official</p>
                     </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
          
          {/* Footer */}
          <div className="mt-20 pt-8 border-t border-gray-800 text-center text-gray-600 text-sm">
            © 2025 Zerocodes. All Rights Reserved.
          </div>

        </div>
      </main>
    </div>
  );
};

export default DocumentationPage;