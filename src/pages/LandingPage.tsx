import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, Download, Globe, Terminal, Zap, Cpu, ChevronRight, Layout, 
  PlayCircle, FileCode, Sparkles, X, Plus, Check
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* --- Navigation Bar --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-gray-800 bg-[#0d1117]/90 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">Zerocodes</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <Link 
                to="/editor" 
                className="hidden sm:flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Web Editor</span>
              </Link>
              <a 
                href="#download" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-md text-sm font-bold transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5"
              >
                Download App
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center z-10 relative">
          <div className="inline-flex items-center space-x-2 bg-blue-900/30 border border-blue-700/50 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-xs text-blue-300 font-semibold tracking-wide uppercase">v2.0 Now Available</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
            Code smarter. Learn faster. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">Let AI guide you.</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Learn Coding Faster with Visual Blocks, Real Code, and AI Assistance. <br/>
            <span className="text-gray-500 text-lg mt-2 block">No setup. No installations. Just code.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5" id="download">
            <Link 
              to="/editor"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl shadow-white/10"
            >
              <Globe className="w-5 h-5" />
              <span>Try Web Editor (Free)</span>
            </Link>
            <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#21262d] hover:bg-[#30363d] text-white px-8 py-4 rounded-xl text-lg font-semibold border border-gray-700 transition-all hover:border-gray-500">
              <Download className="w-5 h-5 text-blue-400" />
              <span>Download Desktop App</span>
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500 font-medium">
            {/* <span className="flex items-center"><Check className="w-4 h-4 mr-1.5 text-green-500" /> Free Forever</span> */}
            {/* <span className="flex items-center"><Check className="w-4 h-4 mr-1.5 text-green-500" /> Open Source</span> */}
            {/* <span className="flex items-center"><Check className="w-4 h-4 mr-1.5 text-green-500" /> No Credit Card</span> */}
          </div>
        </div>
      </section>

      {/* --- How It Works (App Preview) --- */}
      <section id="how-it-works" className="py-16 scroll-mt-20">
        <div className="text-center mb-10">
           <h2 className="text-3xl font-bold text-white">How It Works</h2>
           <p className="text-gray-400 mt-2">Visual coding meets professional power.</p>
        </div>
        
        <div className="px-4 mb-32">
          <div className="max-w-6xl mx-auto rounded-2xl border border-gray-800 bg-[#161b22] shadow-2xl overflow-hidden relative group transform transition-transform hover:scale-[1.01] duration-500">
             {/* Window Controls */}
             <div className="h-10 bg-[#0d1117] border-b border-gray-800 flex items-center px-5 space-x-2">
               <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
               <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
               <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
             </div>
             
             {/* Interactive Placeholder Content */}
             <div className="aspect-[16/9] bg-gradient-to-br from-[#161b22] to-[#0d1117] p-8 flex flex-col items-center justify-center text-gray-500 relative">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                
                <Layout className="w-24 h-24 mb-6 opacity-20 animate-pulse" />
                <h3 className="text-2xl font-semibold text-gray-400 mb-2">Interactive Workspace</h3>
                <p className="text-gray-600">Drag blocks on the left. See code on the right.</p>

                {/* Floating UI Elements */}
                <div className="absolute top-1/4 left-10 p-4 bg-[#252526] rounded-lg border border-gray-700 shadow-xl w-48 animate-float-slow hidden md:block">
                  <div className="flex items-center mb-2 text-xs text-blue-400 font-bold uppercase">
                    <PlayCircle className="w-3 h-3 mr-2" /> Functions
                  </div>
                  <div className="h-2 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                </div>

                <div className="absolute bottom-1/4 right-10 p-4 bg-[#1e1e1e] rounded-lg border border-gray-700 shadow-xl w-64 font-mono text-xs text-green-400 animate-float-reverse hidden md:block">
                  <p>{`> Compiling project...`}</p>
                  <p>{`> Success! (23ms)`}</p>
                  <p className="text-white">{`Hello, World!`}</p>
                </div>
             </div>
             
             {/* Overlay CTA */}
             <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
               <Link to="/editor" className="flex items-center bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-transform transform hover:scale-105 shadow-2xl">
                 Launch Editor Now <ChevronRight className="w-5 h-5 ml-2" />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* --- Section 1: What is Zerocodes? --- */}
      <section id="features" className="py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What is Zerocodes?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A next-generation coding platform designed to make learning and writing programs smoother, faster, and easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureBox 
              icon={<Layout className="text-blue-400" />} 
              title="Visual Block Editor" 
              desc="Drag-and-drop logic blocks to build programs without syntax errors." 
            />
            <FeatureBox 
              icon={<FileCode className="text-green-400" />} 
              title="Real Code Editor" 
              desc="Switch to a professional text-based editor anytime you're ready." 
            />
            <FeatureBox 
              icon={<Terminal className="text-yellow-400" />} 
              title="Smart Compiler" 
              desc="Compiles and runs code instantly. No setup or installation needed." 
            />
            <FeatureBox 
              icon={<Sparkles className="text-purple-400" />} 
              title="AI Assistant" 
              desc="Get explanations, fixes, and guidance whenever you get stuck." 
            />
          </div>
        </div>
      </section>

      {/* --- Section 2: AI Assistance --- */}
      <section className="py-24 bg-[#161b22] border-y border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-block bg-purple-500/10 text-purple-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-purple-500/20">
              INTEGRATED AI
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              It’s like having a <br/> <span className="text-purple-400">personal tutor</span> inside the editor.
            </h2>
            <ul className="space-y-4 text-gray-300 text-lg">
              <AiListItem text="Understand exactly what your code does." />
              <AiListItem text="Fix mistakes instantly with one click." />
              <AiListItem text="Explain errors in simple language." />
              <AiListItem text="Get step-by-step guidance as you build." />
            </ul>
            <div className="mt-8 p-4 bg-[#0d1117] border border-purple-500/30 rounded-lg italic text-gray-400 border-l-4 border-l-purple-500">
              "Just highlight any code — the AI will explain, fix, or guide you at any moment."
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            {/* AI Chat Mockup */}
            <div className="bg-[#0d1117] rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-gray-800 bg-[#161b22] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span className="font-bold text-gray-200">AI Assistant</span>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex-shrink-0"></div>
                  <div className="bg-[#1e1e1e] p-3 rounded-lg rounded-tl-none text-sm text-gray-300 border border-gray-700">
                    Why is my loop infinite?
                  </div>
                </div>
                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex-shrink-0 flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
                  <div className="bg-purple-900/20 p-4 rounded-lg rounded-tr-none text-sm text-gray-200 border border-purple-500/30">
                    <p className="mb-2">Your <code className="text-pink-400">while</code> condition is always true because you aren't incrementing the variable <code>i</code>.</p>
                    <p>Try adding <code className="text-green-400">i++;</code> inside your loop block!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 3 & 4: Visual & Text --- */}
      <section className="py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Visual */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-32">
            <div className="md:w-1/2 order-2 md:order-1">
               <div className="bg-[#161b22] p-8 rounded-2xl border border-gray-800 shadow-lg relative">
                 {/* Block Mockup */}
                 <div className="flex flex-col space-y-2">
                   <div className="bg-orange-900/40 border border-orange-700 p-3 rounded-md w-3/4 text-orange-200 font-mono text-sm">Variable count = 0</div>
                   <div className="bg-blue-900/40 border border-blue-700 p-4 rounded-md w-full ml-4 text-blue-200 font-mono text-sm">
                     While (count &lt; 10)
                     <div className="mt-2 bg-green-900/40 border border-green-700 p-2 rounded-md w-11/12 text-green-200">Print "Hello"</div>
                   </div>
                 </div>
               </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <h3 className="text-3xl font-bold text-white mb-4">Build Logic Visually</h3>
              <p className="text-gray-400 text-lg mb-6">
                Drag and drop blocks for Variables, Loops, Conditions, and Functions.
                Every block you drop automatically produces <span className="text-blue-400 font-bold">Real C, Python, or Java code</span> instantly.
              </p>
              <p className="text-gray-500">It helps you understand programming logic faster and gain confidence quickly.</p>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold text-white mb-4">Text-Based Editor Included</h3>
              <p className="text-gray-400 text-lg mb-6">
                Prefer typing? Switch to the code editor at any time.
                Includes Syntax highlighting, Line numbers, and Auto-formatting.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-[#161b22] px-4 py-2 rounded border border-gray-700 text-gray-300 text-sm">Visual Mode</div>
                <div className="text-gray-600">↔</div>
                <div className="bg-blue-600/20 px-4 py-2 rounded border border-blue-500 text-blue-300 text-sm font-bold">Text Mode</div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-gray-700 shadow-lg font-mono text-sm text-gray-300">
                <div className="text-gray-500 mb-2">1  #include &lt;stdio.h&gt;</div>
                <div className="text-gray-500 mb-2">2</div>
                <div className="text-gray-500 mb-2">3  <span className="text-purple-400">int</span> main() {'{'}</div>
                <div className="text-gray-500 mb-2">4    <span className="text-blue-400">printf</span>(<span className="text-orange-400">"Hello World"</span>);</div>
                <div className="text-gray-500 mb-2">5    <span className="text-purple-400">return</span> 0;</div>
                <div className="text-gray-500">6  {'}'}</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- Section 5 & 6: Compiler & Audience --- */}
      <section className="py-24 bg-[#161b22] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16">
             <h2 className="text-3xl font-bold text-white mb-6">Built-In Compiler. <span className="text-red-400">No Installation Needed.</span></h2>
             <div className="flex flex-wrap justify-center gap-4 text-gray-400 mb-8">
               <span className="flex items-center line-through decoration-red-500"><X className="w-4 h-4 mr-1 text-red-500" /> Install GCC</span>
               <span className="flex items-center line-through decoration-red-500"><X className="w-4 h-4 mr-1 text-red-500" /> Setup Python</span>
               <span className="flex items-center line-through decoration-red-500"><X className="w-4 h-4 mr-1 text-red-500" /> Config Env</span>
             </div>
             <p className="text-lg text-gray-300">
               Just choose your language and click <b>Run</b>. Our compiler executes it instantly, supports user input, and shows output in real-time.
             </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
             <AudienceCard title="Students" desc="Visual learning + AI help." />
             <AudienceCard title="Teachers" desc="Engaging way to teach logic." />
             <AudienceCard title="Beginners" desc="Start without fear." />
             <AudienceCard title="Developers" desc="Quickly test boilerplate." />
          </div>
        </div>
      </section>

      {/* --- Section 7: Features List --- */}
      <section className="py-24 bg-[#0d1117]">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Learners Love Zerocodes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <ReasonBox title="No Setup Required" desc="Start coding instantly on any device." />
               <ReasonBox title="Visual Learning" desc="Blocks make logic easy to grasp." />
               <ReasonBox title="AI Removes Frustration" desc="Get answers and fixes instantly." />
               <ReasonBox title="Real Code = Real Skills" desc="You’re learning actual programming, not a toy." />
               <ReasonBox title="Smooth Transition" desc="See the real code behind every block." />
               <ReasonBox title="Works Everywhere" desc="Browser or desktop — your choice." />
            </div>
         </div>
      </section>

      {/* --- Section 9: CTA --- */}
      <section className="py-32 bg-gradient-to-b from-[#0d1117] to-[#161b22] text-center border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-white mb-6">Start Learning Today.</h2>
          <p className="text-2xl text-gray-400 mb-10">
            Code made simple. Learning made enjoyable. <br/>
            <span className="text-blue-400">Try Zerocodes for free.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
             <Link to="/editor" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-lg shadow-lg transition-all">
               Try Web Editor
             </Link>
             <a href="#download" className="px-8 py-4 bg-[#21262d] hover:bg-[#30363d] text-white font-bold rounded-xl text-lg border border-gray-700 transition-all">
               Download Desktop App
             </a>
          </div>
          <p className="text-gray-500 text-sm">No account required. Start instantly.</p>
        </div>
      </section>

      {/* --- Section 10: FAQ --- */}
      <section id="faq" className="py-24 bg-[#0d1117]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FaqItem 
              question="Do I need to install any compiler?" 
              answer="No. Zerocodes includes a built-in compiler for all supported languages. It handles everything for you." 
              isOpen={faqOpen === 0} onClick={() => toggleFaq(0)}
            />
            <FaqItem 
              question="Does it work on any computer?" 
              answer="Yes — it runs in your browser (Chrome, Edge, Firefox) or as a standalone desktop app for Windows." 
              isOpen={faqOpen === 1} onClick={() => toggleFaq(1)}
            />
            <FaqItem 
              question="Is it beginner-friendly?" 
              answer="Absolutely. The combination of Visual Blocks and AI makes it the perfect tool for your first day of coding." 
              isOpen={faqOpen === 2} onClick={() => toggleFaq(2)}
            />
            <FaqItem 
              question="Which languages are supported?" 
              answer="Currently we support C, Python, and Java with full execution support. More languages are coming soon." 
              isOpen={faqOpen === 3} onClick={() => toggleFaq(3)}
            />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#010409] border-t border-gray-800 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <Code2 className="w-5 h-5 text-blue-500" />
              <span className="font-bold text-white text-lg">Zerocodes</span>
            </div>
            <p className="text-gray-500">Learn visually. Build confidently.</p>
          </div>
          
          <div className="flex space-x-8 text-gray-400">
            <Link to="/editor" className="hover:text-white transition-colors">Web Editor</Link>
            <a href="#" className="hover:text-white transition-colors">Download</a>
            <a href="#" className="hover:text-white transition-colors">Documemtation</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-600">
          © Zerocodes — 2025. Powered by integrated AI.
        </div>
      </footer>

    </div>
  );
};

// --- Sub-components for Cleaner Code ---

const AiListItem = ({ text }: { text: string }) => (
  <li className="flex items-start">
    <div className="bg-purple-900/50 rounded-full p-1 mr-3 mt-1">
      <Check className="w-3 h-3 text-purple-400" />
    </div>
    <span>{text}</span>
  </li>
);

const FeatureBox = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-[#161b22] p-6 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors group">
    <div className="mb-4 bg-[#0d1117] w-12 h-12 rounded-lg flex items-center justify-center border border-gray-800 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const AudienceCard = ({ title, desc }: { title: string, desc: string }) => (
  <div className="bg-[#0d1117] p-4 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-colors">
    <h4 className="text-white font-bold mb-1">{title}</h4>
    <p className="text-gray-500 text-xs">{desc}</p>
  </div>
);

const ReasonBox = ({ title, desc }: { title: string, desc: string }) => (
  <div className="flex flex-col">
    <h4 className="text-blue-400 font-bold mb-2 flex items-center">
      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div> {title}
    </h4>
    <p className="text-gray-400 text-sm pl-4 border-l border-gray-800">{desc}</p>
  </div>
);

const FaqItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => (
  <div className="border border-gray-800 rounded-lg bg-[#161b22] overflow-hidden">
    <button 
      onClick={onClick}
      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#21262d] transition-colors"
    >
      <span className="text-white font-medium">{question}</span>
      <Plus className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
    </button>
    {isOpen && (
      <div className="px-6 py-4 text-gray-400 text-sm border-t border-gray-800 bg-[#0d1117]">
        {answer}
      </div>
    )}
  </div>
);

export default LandingPage;