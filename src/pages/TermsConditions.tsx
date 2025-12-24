import React from 'react';
import { 
  Scale, ShieldAlert, UserCheck, Zap, Server, 
  Sparkles, FileCode, Landmark, AlertCircle, 
  Ban, Gavel, RefreshCw, Mail, ArrowLeft,
  ShieldCheck, Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsConditions: React.FC = () => {
  
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
               <Scale className="w-6 h-6 text-blue-500" />
               <span className="font-bold text-white text-lg tracking-tight">Terms & Conditions</span>
             </div>
             <Link to="/editor" className="text-gray-500 hover:text-white transition-colors" title="Back to Editor">
               <ArrowLeft size={18} />
             </Link>
           </div>
        </div>

        <nav className="p-4 space-y-4 text-sm">
          <NavButton label="1. Acceptance of Terms" id="acceptance" onClick={scrollToSection} />
          <NavButton label="2. Eligibility & Registration" id="eligibility" onClick={scrollToSection} />
          <NavButton label="3. Beta Services" id="beta" onClick={scrollToSection} />
          <NavButton label="4. Acceptable Use" id="acceptable-use" onClick={scrollToSection} />
          <NavButton label="5. Cloud Fair Use" id="fair-use" onClick={scrollToSection} />
          <NavButton label="6. AI Features Disclaimer" id="ai-disclaimer" onClick={scrollToSection} />
          <NavButton label="7. User Content Ownership" id="ownership" onClick={scrollToSection} />
          <NavButton label="8. Intellectual Property" id="ip" onClick={scrollToSection} />
          <NavButton label="9. Warranty Disclaimer" id="warranty" onClick={scrollToSection} />
          <NavButton label="10. Limitation of Liability" id="liability" onClick={scrollToSection} />
          <NavButton label="11. Termination" id="termination" onClick={scrollToSection} />
          <NavButton label="12. Governing Law" id="law" onClick={scrollToSection} />
          <NavButton label="13. Changes to Terms" id="changes" onClick={scrollToSection} />
          <NavButton label="14. Contact Information" id="contact" onClick={scrollToSection} />
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 overflow-y-auto scroll-smooth bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-10 py-16 space-y-16 pb-40">
          
          {/* Header */}
          <section id="top">
            <h1 className="text-5xl font-black text-white mb-4">Zekodes Terms and Conditions</h1>
            <p className="text-blue-500 font-mono text-sm uppercase tracking-widest mb-8">Last updated: 2025</p>
            <div className="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed">
              <p>These Terms and Conditions ("Terms") govern your access to and use of the Zekodes platform, including the Zekodes website, web-based editor, desktop application, cloud compilation services, and AI-assisted features (collectively, the "Services").</p>
              <p className="text-base mt-4 font-semibold text-gray-300">By accessing or using Zekodes, you agree to be legally bound by these Terms. If you do not agree to these Terms, you must not access or use the Services.</p>
            </div>
          </section>

          {/* 1. Acceptance */}
          <section id="acceptance" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><ShieldAlert size={24}/></div>
              <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">Zekodes provides a Logic-First integrated development environment (IDE) that enables users to construct programs visually and generate professional source code. By creating an account, accessing the platform, or using any Zekodes Services, you acknowledge that you have read, understood, and agreed to these Terms.</p>
          </section>

          {/* 2. Eligibility */}
          <section id="eligibility" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><UserCheck size={24}/></div>
              <h2 className="text-2xl font-bold text-white">2. Eligibility and Account Registration</h2>
            </div>
            <div className="text-gray-400 space-y-4">
              <p>To use Zekodes, you must:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-400">
                <li>Be at least 13 years of age</li>
                <li>Have parental or legal guardian consent if you are under 18 years of age</li>
              </ul>
              <p className="text-sm">Account authentication and management are handled through Supabase. You are solely responsible for maintaining the confidentiality of your login credentials.</p>
            </div>
          </section>

          {/* 3. Beta Services */}
          <section id="beta" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Zap size={24}/></div>
              <h2 className="text-2xl font-bold text-white">3. Early Access and Beta Services</h2>
            </div>
            <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 space-y-4">
              <p className="text-sm font-bold text-purple-400 uppercase tracking-wider">3.1 Beta Status</p>
              <p className="text-sm text-gray-400">You acknowledge that Beta features may contain defects, functionality may change or be discontinued at any time, and service availability is not guaranteed.</p>
            </div>
          </section>

          {/* 4. Acceptable Use */}
          <section id="acceptable-use" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><Ban size={24}/></div>
              <h2 className="text-2xl font-bold text-white">4. Acceptable Use Policy</h2>
            </div>
            <div className="text-gray-400 space-y-4">
              <p>Prohibited activities include:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-400">
                <li>Developing or executing malware or malicious code</li>
                <li>Attempting to bypass security mechanisms or sandboxing</li>
                <li>Reverse-engineering the platform components</li>
                <li>Launching automated DoS attacks or infringing intellectual property</li>
              </ul>
            </div>
          </section>

          {/* 5. Fair Use */}
          <section id="fair-use" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><Server size={24}/></div>
              <h2 className="text-2xl font-bold text-white">5. Cloud Resource Fair Use</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">Zekodes provides shared cloud resources. Resource usage is subject to reasonable limits. Abusive usage, such as cryptocurrency mining or infinite loops, may result in throttling or suspension.</p>
          </section>

          {/* 6. AI Features */}
          <section id="ai-disclaimer" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500"><Sparkles size={24}/></div>
              <h2 className="text-2xl font-bold text-white">6. AI-Assisted Features Disclaimer</h2>
            </div>
            <div className="p-6 bg-[#161b22] rounded-2xl border border-gray-800 text-gray-400 space-y-4">
              <p className="text-sm">You acknowledge that AI-generated suggestions may be inaccurate. You are solely responsible for reviewing and securing any code generated or modified by AI.</p>
            </div>
          </section>

          {/* 7. Ownership */}
          <section id="ownership" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><FileCode size={24}/></div>
              <h2 className="text-2xl font-bold text-white">7. User Content and Ownership</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">You retain full ownership of all software, source code, and logic blocks you create using Zekodes. Zekodes grants a limited license to store and process your content solely to provide the Services.</p>
          </section>

          {/* 8. IP */}
          <section id="ip" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Landmark size={24}/></div>
              <h2 className="text-2xl font-bold text-white">8. Zekodes Intellectual Property</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">All rights, title, and interest in and to the Zekodes platform remain the exclusive property of Zekodes Inc., including translation engines and UI elements.</p>
          </section>

          {/* 9 & 10. Disclaimers */}
          <section id="warranty" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-500/10 rounded-lg text-gray-500"><AlertCircle size={24}/></div>
              <h2 className="text-2xl font-bold text-white">9. Disclaimer of Warranties</h2>
            </div>
            <p className="text-gray-400 text-sm italic">Services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind.</p>
          </section>

          <section id="liability" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-white mb-6">10. Limitation of Liability</h2>
            <p className="text-gray-400 text-sm leading-relaxed">Zekodes Inc. shall not be liable for indirect, incidental, or consequential damages, including loss of data or business opportunities.</p>
          </section>

          {/* 11 & 12. Legal Logic */}
          <section id="termination" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-white mb-6">11. Suspension and Termination</h2>
            <p className="text-gray-400 text-sm">We reserve the right to suspend access if you violate these Terms or pose a security risk.</p>
          </section>

          <section id="law" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Gavel size={24}/></div>
              <h2 className="text-2xl font-bold text-white">12. Governing Law</h2>
            </div>
            <p className="text-gray-400 text-sm">These Terms shall be governed by applicable laws and disputes resolved through binding arbitration.</p>
          </section>

          {/* 13. Changes */}
          <section id="changes" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><RefreshCw size={24}/></div>
              <h2 className="text-2xl font-bold text-white">13. Changes to These Terms</h2>
            </div>
            <p className="text-gray-400 text-sm">Material changes will be communicated via email or in-app notice.</p>
          </section>

          {/* 14. Contact */}
          <section id="contact" className="scroll-mt-20">
            <div className="p-10 bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-gray-800 rounded-[2.5rem] text-center">
              <Mail className="text-blue-500 mx-auto mb-4" size={40} />
              <h2 className="text-2xl font-black text-white mb-4">Contact Legal Team</h2>
              <p className="text-gray-500 mb-6">For legal inquiries or to report violations, please contact:</p>
              <a href="mailto:issues.zekodes@gmail.com" className="text-blue-500 font-mono text-lg font-bold">issues.zekodes@gmail.com</a>
            </div>
          </section>

          {/* Footer Branding */}
          <div className="mt-32 pt-10 border-t border-gray-800 flex flex-col items-center opacity-50">
            <div className="flex items-center space-x-2 mb-2">
                <ShieldCheck size={24}/>
                <span className="font-black text-xl tracking-tighter uppercase">Zekodes</span>
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-500">Compliance · Security · Logic</p>
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

export default TermsConditions;