import React from 'react';
import { 
  FileText, Scale, Code, AlertTriangle, UserCheck, 
  ShieldAlert, Globe, Gavel, ScrollText, HardDrive, 
  UserMinus, MessageSquare, Copyright, Zap
} from 'lucide-react';

const TermsConditions: React.FC = () => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-screen bg-[#0d1117] text-gray-300 font-sans overflow-hidden">
      
      {/* --- Functional Sidebar --- */}
      <aside className="w-80 flex-shrink-0 bg-[#161b22] border-r border-gray-800 overflow-y-auto hidden lg:block">
        <div className="p-6 border-b border-gray-800 sticky top-0 bg-[#161b22] z-10">
           <div className="flex items-center space-x-2">
             <Gavel className="w-6 h-6 text-blue-500" />
             <span className="font-bold text-white text-lg">Terms of Service</span>
           </div>
           <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">User Agreement v1.0.4</p>
        </div>

        <nav className="p-4 space-y-6 text-sm">
          {/* Section: Introduction */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">01. Acceptance</p>
            <div className="space-y-1">
                <NavButton label="Agreement to Terms" id="agreement" onClick={scrollToSection} />
                <NavButton label="Eligibility & Registration" id="eligibility" onClick={scrollToSection} />
                <NavButton label="Early Access (Beta) Terms" id="beta-terms" onClick={scrollToSection} />
            </div>
          </div>

          {/* Section: Use of Service */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">02. Platform Usage</p>
            <div className="space-y-1">
                <NavButton label="Prohibited Activities" id="prohibited" onClick={scrollToSection} />
                <NavButton label="Cloud Resource Fair Use" id="fair-use" onClick={scrollToSection} />
                <NavButton label="AI Interaction Rules" id="ai-usage" onClick={scrollToSection} />
            </div>
          </div>

          {/* Section: Property Rights */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">03. Ownership</p>
            <div className="space-y-1">
                <NavButton label="User Content Ownership" id="user-content" onClick={scrollToSection} />
                <NavButton label="Zekodes IP Rights" id="zekodes-ip" onClick={scrollToSection} />
                <NavButton label="Open Source Attributions" id="open-source" onClick={scrollToSection} />
            </div>
          </div>

          {/* Section: Liability */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">04. Legal Boundaries</p>
            <div className="space-y-1">
                <NavButton label="Disclaimer of Warranties" id="disclaimer" onClick={scrollToSection} />
                <NavButton label="Limitation of Liability" id="liability" onClick={scrollToSection} />
                <NavButton label="Account Termination" id="termination" onClick={scrollToSection} />
            </div>
          </div>

          {/* Section: Support */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">05. Support</p>
            <div className="space-y-1">
                <NavButton label="Support & Arbitration" id="contact-legal" onClick={scrollToSection} />
            </div>
          </div>
        </nav>
      </aside>

      {/* --- Scrollable Content Canvas --- */}
      <main className="flex-1 overflow-y-auto scroll-smooth bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-10 py-16 space-y-32 pb-60">
          
          {/* Header */}
          <div className="border-b border-gray-800 pb-12">
            <h1 className="text-5xl font-black text-white mb-4">Terms & Conditions</h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              This agreement governs your use of Zekodes. By using our cloud-powered IDE, you agree to the rules and legal boundaries defined below.
            </p>
          </div>

          {/* --- 01. ACCEPTANCE --- */}
          <section id="agreement" className="scroll-mt-20">
            <ChapterHeader num="01" title="Agreement to Terms" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Zekodes provides an Integrated Development Environment (IDE) that converts visual logic into code. By accessing our website, web editor, or desktop application, you confirm that you have read, understood, and agreed to be bound by these Terms and Conditions.</p>
              <p>If you do not agree with any part of these terms, you must immediately cease use of the Zekodes platform. These terms constitute a legally binding agreement between you and Zekodes Inc.</p>
            </div>
          </section>

          <section id="eligibility" className="scroll-mt-20">
            <ChapterHeader num="02" title="Eligibility & Registration" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>You must be at least 13 years old to create an account. Users under 18 must have parental or guardian consent to use the service. You are responsible for providing accurate registration information via Supabase and maintaining the security of your password.</p>
            </div>
          </section>

          <section id="beta-terms" className="scroll-mt-20">
            <ChapterHeader num="03" title="Early Access (Beta) Terms" />
            <div className="bg-blue-900/10 border-l-4 border-blue-500 p-8 rounded-r-2xl space-y-4">
              <h4 className="text-white font-bold flex items-center gap-2">
                <Zap className="text-blue-500" size={18} /> Public Beta Notice
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Zekodes v2.0 is currently in its "Early Access" phase. You acknowledge that the service may contain bugs, experience downtime, or undergo significant architectural changes without prior notice. We do not guarantee 100% uptime for cloud compilation during this phase.
              </p>
            </div>
          </section>

          {/* --- 02. PLATFORM USAGE --- */}
          <section id="prohibited" className="scroll-mt-20">
            <ChapterHeader num="04" title="Prohibited Activities" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>You agree not to use Zekodes for any illegal or harmful activities, including but not limited to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Developing malware, viruses, or any code designed to disrupt system integrity.</li>
                <li>Attempting to bypass our cloud compiler sandboxing or reverse-engineering the Zekodes platform.</li>
                <li>Using automated scripts to overwhelm our cloud resources (DDoS attacks).</li>
                <li>Submitting code that violates intellectual property or privacy laws of others.</li>
              </ul>
            </div>
          </section>

          <section id="fair-use" className="scroll-mt-20">
            <ChapterHeader num="05" title="Cloud Resource Fair Use" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Our cloud compilation cluster is a shared resource. To ensure performance for all users, we enforce "Fair Use" limits. Accounts found to be running resource-heavy infinite loops or cryptocurrency miners will be automatically throttled or suspended.</p>
            </div>
          </section>

          <section id="ai-usage" className="scroll-mt-20">
            <ChapterHeader num="06" title="AI Interaction Rules" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>AI features (Explain, Fix, Optimize) are provided to assist in learning. While highly accurate, AI-generated content may occasionally be incorrect. You agree to take full responsibility for the logic and security of code that has been modified or generated by Zekodes AI.</p>
            </div>
          </section>

          {/* --- 03. OWNERSHIP --- */}
          <section id="user-content" className="scroll-mt-20">
            <ChapterHeader num="07" title="User Content Ownership" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p><strong>You own your logic.</strong> All source code (.c, .py, .java) and block configurations created by you remain your intellectual property. Zekodes does not claim any ownership over the software you build using our tools.</p>
            </div>
          </section>

          <section id="zekodes-ip" className="scroll-mt-20">
            <ChapterHeader num="08" title="Zekodes IP Rights" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Zekodes Inc. retains all rights, title, and interest in the Zekodes IDE, including visual block designs, user interface elements, the underlying translation engine, and our branding. You may not use Zekodes branding for commercial purposes without written consent.</p>
            </div>
          </section>

          {/* --- 04. LEGAL BOUNDARIES --- */}
          <section id="disclaimer" className="scroll-mt-20">
            <ChapterHeader num="09" title="Disclaimer of Warranties" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Zekodes is provided "AS IS" and "AS AVAILABLE". We disclaim all warranties, whether express or implied, regarding the accuracy of AI explanations, the stability of the cloud compiler, or the suitability of the IDE for any particular purpose.</p>
            </div>
          </section>

          <section id="liability" className="scroll-mt-20">
            <ChapterHeader num="10" title="Limitation of Liability" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>To the maximum extent permitted by law, Zekodes Inc. shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the platform, including data loss or loss of logic files due to beta system updates.</p>
            </div>
          </section>

          {/* --- 05. SUPPORT --- */}
          <section id="contact-legal" className="scroll-mt-20">
            <ChapterHeader num="11" title="Support & Arbitration" />
            <div className="p-8 bg-blue-600/10 border border-blue-500/20 rounded-3xl">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <Globe size={18} className="text-blue-400" /> Legal Inquiries
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Any disputes arising from these terms shall be resolved through binding arbitration. For support requests or to report violations of these terms, please contact our team.
              </p>
              <a href="mailto:issues.zekodes@gmail.com" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all inline-block">
                Contact Legal Support
              </a>
            </div>
          </section>

          {/* Footer Branding */}
          <div className="mt-32 pt-10 border-t border-gray-800 flex flex-col items-center opacity-30">
            <span className="font-black text-xl tracking-tighter uppercase text-white">Zekodes Terms</span>
            <p className="text-[10px] mt-2 tracking-[0.4em]">COMPLIANCE · SECURITY · LOGIC</p>
          </div>

        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---

const NavButton: React.FC<{ label: string; id: string; onClick: (id: string) => void }> = ({ label, id, onClick }) => (
    <button 
        onClick={() => onClick(id)}
        className="w-full text-left px-3 py-2 rounded-lg text-gray-400 hover:bg-[#1f242c] hover:text-blue-400 transition-all flex items-center gap-2 group"
    >
        <div className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-500 transition-colors"></div>
        {label}
    </button>
);

const ChapterHeader: React.FC<{ num: string; title: string }> = ({ num, title }) => (
    <div className="mb-10">
        <div className="flex items-center gap-4 mb-2">
            <span className="text-[10px] font-mono text-blue-500 border border-blue-500/30 px-2 py-0.5 rounded uppercase tracking-widest">Section {num}</span>
            <div className="h-[1px] flex-1 bg-gray-800"></div>
        </div>
        <h2 className="text-3xl font-black text-white">{title}</h2>
    </div>
);

export default TermsConditions;