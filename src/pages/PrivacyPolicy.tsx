import React from 'react';
import { 
  Shield, Lock, Eye, Server, Globe, Scale, 
  UserCheck, Bell, ShieldCheck, Database, 
  FileWarning, Fingerprint, Trash2, History,
  Sparkles, Cookie, Share2, Baby
} from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  
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
             <ShieldCheck className="w-6 h-6 text-blue-500" />
             <span className="font-bold text-white text-lg">Privacy Center</span>
           </div>
           <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Legal Compliance v1.0.2</p>
        </div>

        <nav className="p-4 space-y-6 text-sm">
          {/* Section: The Basics */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">The Basics</p>
            <div className="space-y-1">
                <NavButton label="Data Collection Scope" id="data-scope" onClick={scrollToSection} />
                <NavButton label="How We Use Data" id="data-usage" onClick={scrollToSection} />
                <NavButton label="Information Sharing" id="data-sharing" onClick={scrollToSection} />
            </div>
          </div>

          {/* Section: AI & Cloud */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">AI & Cloud Storage</p>
            <div className="space-y-1">
                <NavButton label="AI Interaction Policy" id="ai-policy" onClick={scrollToSection} />
                <NavButton label="Cloud Compilation Security" id="cloud-security" onClick={scrollToSection} />
                <NavButton label="Cookie & Tracking" id="cookies" onClick={scrollToSection} />
            </div>
          </div>

          {/* Section: Your Control */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Your Control</p>
            <div className="space-y-1">
                <NavButton label="User Rights (GDPR/CCPA)" id="rights" onClick={scrollToSection} />
                <NavButton label="Data Retention & Deletion" id="retention" onClick={scrollToSection} />
                <NavButton label="Children's Privacy" id="children" onClick={scrollToSection} />
            </div>
          </div>

          {/* Section: Updates */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Updates</p>
            <div className="space-y-1">
                <NavButton label="Policy Modifications" id="updates" onClick={scrollToSection} />
                <NavButton label="Contact Legal Team" id="contact" onClick={scrollToSection} />
            </div>
          </div>
        </nav>
      </aside>

      {/* --- Scrollable Content Canvas --- */}
      <main className="flex-1 overflow-y-auto scroll-smooth bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-10 py-16 space-y-32 pb-60">
          
          {/* Header */}
          <div className="border-b border-gray-800 pb-12">
            <h1 className="text-5xl font-black text-white mb-4">Zekodes Privacy Policy</h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              At Zekodes, privacy is built into our logic. This comprehensive policy explains how we collect, process, and protect your information while providing a high-performance cloud IDE.
            </p>
          </div>

          {/* --- THE BASICS --- */}
          <section id="data-scope" className="scroll-mt-20">
            <ChapterHeader num="01" title="Data Collection Scope" />
            <div className="prose prose-invert text-gray-400 space-y-6">
              <p>Zekodes collects information essential for account security and IDE functionality. This includes your email address for account identification and authentication via Supabase. We also store the source code and logic blocks you create so you can access your work from any device.</p>
              <p>Additionally, we collect technical telemetry such as IP addresses and browser versions to ensure our cloud compiler remains secure and optimized for your specific hardware.</p>
            </div>
          </section>

          <section id="data-usage" className="scroll-mt-20">
            <ChapterHeader num="02" title="How We Use Data" />
            <div className="prose prose-invert text-gray-400 space-y-6">
              <p>Your data is primarily used to facilitate the conversion of visual logic into executable code. We process your projects on our cloud servers to provide real-time code previews and terminal output.</p>
              <p>We use anonymized diagnostic data to improve our "Explain" and "Fix" AI features, ensuring they become more accurate at identifying logical flaws in diverse coding scenarios.</p>
            </div>
          </section>

          <section id="data-sharing" className="scroll-mt-20">
            <ChapterHeader num="03" title="Information Sharing" />
            <div className="prose prose-invert text-gray-400 space-y-6">
              <p>Zekodes does not sell your source code or personal data to third-party advertisers. We only share information with essential service providers like Supabase (for authentication) and Google Gemini (for AI logic analysis) under strict security protocols.</p>
            </div>
          </section>

          {/* --- AI & CLOUD STORAGE --- */}
          <section id="ai-policy" className="scroll-mt-20">
            <ChapterHeader num="04" title="AI Interaction Policy" />
            <div className="prose prose-invert text-gray-400 space-y-6">
              <p>When you use our AI features, your code snippets are transmitted to AI processors for analysis. These interactions are encrypted. We do not use your private code snippets to train public AI models; they are used solely to provide your specific result and then discarded from the AI's short-term memory.</p>
            </div>
          </section>

          <section id="cloud-security" className="scroll-mt-20">
            <ChapterHeader num="05" title="Cloud Compilation Security" />
            <div className="prose prose-invert text-gray-400 space-y-6">
              <p>Every time you execute code, Zekodes creates a "Sandbox"—an isolated, temporary cloud container. Your code runs within this bubble, ensuring it cannot interfere with our systems or other users' data. Once your program finishes, the sandbox is completely erased.</p>
            </div>
          </section>

          <section id="cookies" className="scroll-mt-20">
            <ChapterHeader num="06" title="Cookie & Tracking" />
            <div className="prose prose-invert text-gray-400 space-y-6">
              <p>We use essential cookies to keep you logged into your session and to remember your IDE preferences (such as dark mode or chosen language). We do not use tracking cookies for behavioral advertising.</p>
            </div>
          </section>

          {/* --- YOUR CONTROL --- */}
          <section id="rights" className="scroll-mt-20">
            <ChapterHeader num="07" title="User Rights (GDPR/CCPA)" />
            <div className="prose prose-invert text-gray-400 space-y-6">
              <p>Under regulations like GDPR and CCPA, you have the right to access the data we hold about you and request its correction or deletion. You can export all your projects as raw source files at any time to maintain data portability.</p>
            </div>
          </section>

          <section id="retention" className="scroll-mt-20">
            <ChapterHeader num="08" title="Data Retention & Deletion" />
            <div className="prose prose-invert text-gray-400 space-y-6">
              <p>We retain your data as long as your account is active. If you choose to delete your account, all associated email records and project logic are permanently purged from our primary databases within 30 days.</p>
            </div>
          </section>

          <section id="children" className="scroll-mt-20">
            <ChapterHeader num="09" title="Children's Privacy" />
            <div className="prose prose-invert text-gray-400 space-y-6">
              <p>Zekodes is an educational tool. Users under the age of 13 should only use the platform under the supervision of a parent or educator. we do not knowingly collect personal data from children without verifiable parental consent.</p>
            </div>
          </section>

          {/* --- UPDATES --- */}
          <section id="updates" className="scroll-mt-20">
            <ChapterHeader num="10" title="Policy Modifications" />
            <div className="prose prose-invert text-gray-400 space-y-6">
              <p>As Zekodes evolves, we may update this policy. We will notify users of any significant changes via the email address linked to their account.</p>
            </div>
          </section>

          <section id="contact" className="scroll-mt-20">
            <ChapterHeader num="11" title="Contact Legal Team" />
            <div className="p-8 bg-blue-600/10 border border-blue-500/20 rounded-3xl">
              <p className="text-white font-medium mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-blue-400" /> Have questions?</p>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">For legal inquiries or data requests, please contact our privacy officer directly at issues.zekodes@gmail.com.</p>
              <a href="mailto:issues.zekodes@gmail.com" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all">
                Email Privacy Team
              </a>
            </div>
          </section>

          {/* Footer Branding */}
          <div className="mt-32 pt-10 border-t border-gray-800 flex flex-col items-center opacity-30">
            <span className="font-black text-xl tracking-tighter uppercase text-white">Zekodes Privacy</span>
            <p className="text-[10px] mt-2 tracking-[0.4em]">SECURE · PRIVATE · LOGICAL</p>
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

export default PrivacyPolicy;