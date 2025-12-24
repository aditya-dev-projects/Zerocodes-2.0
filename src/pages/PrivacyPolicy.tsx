import React from 'react';
import { 
  ShieldCheck, Lock, Eye, Server, Cpu, Globe, 
  Trash2, UserCheck, Scale, ArrowLeft, Mail, 
  Clock, FileText, Database, Play, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex h-screen bg-[#0d1117] text-gray-300 font-sans overflow-hidden">
      
      {/* --- Sidebar Navigation --- */}
      <aside className="w-80 flex-shrink-0 bg-[#161b22] border-r border-gray-800 overflow-y-auto hidden lg:block">
        <div className="p-6 border-b border-gray-800 sticky top-0 bg-[#161b22] z-10">
           <div className="flex items-center justify-between">
             <div className="flex items-center space-x-2">
               <ShieldCheck className="w-6 h-6 text-green-500" />
               <span className="font-bold text-white text-lg">Privacy Policy</span>
             </div>
             <Link to="/editor" className="text-gray-500 hover:text-white transition-colors" title="Back to Editor">
               <ArrowLeft size={18} />
             </Link>
           </div>
        </div>

        <nav className="p-4 space-y-4 text-sm">
          <NavButton label="1. Scope of Policy" id="scope" onClick={scrollToSection} />
          <NavButton label="2. Information Collection" id="collection" onClick={scrollToSection} />
          <NavButton label="3. How We Use Information" id="usage" onClick={scrollToSection} />
          <NavButton label="4. AI Feature Data" id="ai-data" onClick={scrollToSection} />
          <NavButton label="5. Third Parties" id="sharing" onClick={scrollToSection} />
          <NavButton label="6. Compilation Security" id="compilation-security" onClick={scrollToSection} />
          <NavButton label="7. Cookies & Storage" id="cookies" onClick={scrollToSection} />
          <NavButton label="8. Data Retention" id="retention" onClick={scrollToSection} />
          <NavButton label="9. User Rights" id="rights" onClick={scrollToSection} />
          <NavButton label="10. Children’s Privacy" id="children" onClick={scrollToSection} />
          <NavButton label="11. Policy Updates" id="updates" onClick={scrollToSection} />
          <NavButton label="12. Contact Information" id="contact" onClick={scrollToSection} />
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 overflow-y-auto scroll-smooth bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-10 py-16 space-y-16 pb-40">
          
          {/* Header */}
          <section id="top">
            <h1 className="text-5xl font-black text-white mb-4">Zekodes Privacy Policy</h1>
            <p className="text-blue-500 font-mono text-sm uppercase tracking-widest mb-8">Last updated: 2025</p>
            <div className="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed">
              <p>At Zekodes, privacy is a foundational principle, not an afterthought. This Privacy Policy explains how we collect, use, store, and protect information when you use the Zekodes platform, including our web and desktop applications.</p>
              <p className="text-base mt-4">This policy is written to meet the standards commonly followed by leading technology companies and is designed to be transparent, precise, and user-focused.</p>
            </div>
          </section>

          {/* 1. Scope */}
          <section id="scope" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Globe size={24}/></div>
              <h2 className="text-2xl font-bold text-white">1. Scope of This Policy</h2>
            </div>
            <div className="text-gray-400 space-y-4">
              <p>This Privacy Policy applies to all Zekodes services, including:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-400">
                <li>The Zekodes Web Editor</li>
                <li>The Zekodes Desktop Application</li>
                <li>Zekodes Academy and related learning content</li>
                <li>Cloud compilation and AI-assisted features</li>
              </ul>
              <p className="mt-4 pt-4 border-t border-gray-800 text-sm">By using Zekodes, you agree to the data practices described in this policy.</p>
            </div>
          </section>

          {/* 2. Collection */}
          <section id="collection" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><Database size={24}/></div>
              <h2 className="text-2xl font-bold text-white">2. Information We Collect</h2>
            </div>
            <div className="space-y-8">
              <p className="text-gray-400">We collect only the information necessary to operate, secure, and improve the Zekodes platform.</p>
              
              <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2 font-sans"><Lock size={18} className="text-gray-500"/> 2.1 Account Information</h4>
                <p className="text-sm text-gray-400 leading-relaxed">When you create an account, we collect your <strong className="text-white">Email address</strong> (used for identification, authentication, and communication). Authentication and account management are handled securely using Supabase.</p>
              </div>

              <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2 font-sans"><FileText size={18} className="text-gray-500"/> 2.2 Project and Usage Data</h4>
                <p className="text-sm text-gray-400 leading-relaxed">To enable core IDE functionality, we store Source code generated by you, visual logic blocks, project configurations, and IDE settings. This data allows you to access your projects across devices and sessions.</p>
              </div>

              <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2 font-sans"><Cpu size={18} className="text-gray-500"/> 2.3 Technical and Diagnostic Data</h4>
                <p className="text-sm text-gray-400 leading-relaxed">We automatically collect limited technical data including IP address, browser type, and operating system for platform security, performance optimization, and debugging.</p>
              </div>
            </div>
          </section>

          {/* 3. Usage */}
          <section id="usage" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500"><Play size={24}/></div>
              <h2 className="text-2xl font-bold text-white">3. How We Use Your Information</h2>
            </div>
            <div className="text-gray-400 space-y-4">
              <p>We use collected information to:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-400">
                <li>Authenticate users and secure accounts</li>
                <li>Convert visual logic into executable C, Python, and Java code</li>
                <li>Execute programs through our cloud compiler infrastructure</li>
                <li>Display real-time output and diagnostics</li>
                <li>Improve platform stability and performance</li>
              </ul>
              <p className="bg-blue-500/5 p-4 rounded-xl border border-blue-500/10 text-sm mt-6 italic">Anonymized and aggregated diagnostic data may be used to enhance AI-assisted features such as automated debugging, logic explanation, and optimization.</p>
            </div>
          </section>

          {/* 4. AI Data */}
          <section id="ai-data" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Sparkles size={24}/></div>
              <h2 className="text-2xl font-bold text-white">4. AI Feature Data Usage</h2>
            </div>
            <div className="bg-[#161b22] p-8 rounded-[2rem] border border-gray-800 space-y-4">
              <p className="text-gray-400 leading-relaxed">When you interact with Zekodes AI features (including Fix, Explain, and Optimize):</p>
              <ul className="list-disc pl-6 text-sm space-y-2 text-gray-500">
                <li>Relevant code snippets are transmitted securely for analysis</li>
                <li>Data is encrypted during transmission</li>
                <li>Code is processed only to generate your requested result</li>
              </ul>
              <p className="text-white font-bold mt-6">Zekodes does not use private user code to train public AI models.</p>
            </div>
          </section>

          {/* 5. Sharing */}
          <section id="sharing" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500"><Server size={24}/></div>
              <h2 className="text-2xl font-bold text-white">5. Information Sharing</h2>
            </div>
            <p className="text-gray-400">Zekodes does not sell personal data or source code. We share limited information only with trusted service providers essential to platform operation:</p>
            <div className="mt-4 space-y-2 text-sm text-gray-500">
              <p><strong className="text-white">Supabase:</strong> Authentication and secure data storage</p>
              <p><strong className="text-white">AI service providers:</strong> Code analysis and explanation</p>
            </div>
          </section>

          {/* 6. Execution Security */}
          <section id="compilation-security" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><ShieldCheck size={24}/></div>
              <h2 className="text-2xl font-bold text-white">6. Cloud Compilation Security</h2>
            </div>
            <div className="p-6 border border-gray-800 rounded-2xl bg-[#161b22]">
              <p className="text-gray-400 text-sm leading-relaxed">Each time you execute a program, Zekodes creates an isolated execution environment. Code runs inside a temporary, sandboxed cloud container. Containers are destroyed immediately after execution completes, ensuring strong isolation and preventing cross-user data exposure.</p>
            </div>
          </section>

          {/* 7. Cookies */}
          <section id="cookies" className="scroll-mt-20">
             <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><Eye size={24}/></div>
              <h2 className="text-2xl font-bold text-white">7. Cookies and Local Storage</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">Zekodes uses essential cookies and local storage to maintain authenticated sessions and save IDE preferences (such as theme and language selection). We do not use cookies for advertising, cross-site tracking, or behavioral profiling.</p>
          </section>

          {/* 8. Retention */}
          <section id="retention" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-500/10 rounded-lg text-gray-500"><Clock size={24}/></div>
              <h2 className="text-2xl font-bold text-white">8. Data Retention</h2>
            </div>
            <p className="text-gray-400">Account and project data is stored while your account remains active. If you delete your account, associated data is permanently removed from primary systems within 30 days, unless retention is required by law.</p>
          </section>

          {/* 9. Rights */}
          <section id="rights" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><UserCheck size={24}/></div>
              <h2 className="text-2xl font-bold text-white">9. User Rights (GDPR and CCPA)</h2>
            </div>
            <p className="text-gray-400 mb-4">Depending on your location, you may have the right to access, correct, or delete your data, and export your projects.</p>
          </section>

          {/* 10. Children */}
          <section id="children" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><Scale size={24}/></div>
              <h2 className="text-2xl font-bold text-white">10. Children’s Privacy</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">Zekodes is intended for educational use. Users under 13 should use the platform only under supervision. We do not knowingly collect personal data from children without verifiable parental consent.</p>
          </section>

          {/* 11. Updates */}
          <section id="updates" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-white mb-6">11. Policy Updates</h2>
            <p className="text-gray-400">Material changes will be communicated via email or within the application. Continued use of Zekodes after updates constitutes acceptance of the revised policy.</p>
          </section>

          {/* 12. Contact */}
          <section id="contact" className="scroll-mt-20">
            <div className="p-10 bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-gray-800 rounded-[2.5rem] text-center">
              <Mail className="text-blue-500 mx-auto mb-4" size={40} />
              <h2 className="text-2xl font-black text-white mb-4">Contact Privacy Team</h2>
              <p className="text-gray-500 mb-6">For privacy-related questions, data requests, or legal inquiries, please contact:</p>
              <a href="mailto:issues.zekodes@gmail.com" className="text-blue-500 font-mono text-lg font-bold">issues.zekodes@gmail.com</a>
            </div>
          </section>

          {/* Footer Branding */}
          <div className="mt-32 pt-10 border-t border-gray-800 flex flex-col items-center opacity-50">
            <div className="flex items-center space-x-2 mb-2">
                <ShieldCheck size={24}/>
                <span className="font-black text-xl tracking-tighter uppercase">Zekodes</span>
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-500">Secure · Private · Logical</p>
          </div>

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

export default PrivacyPolicy;