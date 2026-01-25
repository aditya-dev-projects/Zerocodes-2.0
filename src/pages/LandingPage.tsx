import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Download, ChevronDown, Layout, Code2, 
  Terminal, Rocket, BookOpen, LifeBuoy, 
  ArrowRight, XCircle, CheckCircle2, Zap,
  Box, Cpu, Layers
} from 'lucide-react';
import { supabase } from '../services/supabase';
import type { Session } from '@supabase/supabase-js';

// REPLACE THIS WITH YOUR ACTUAL GITHUB RELEASE LINK
const DOWNLOAD_LINK = "https://github.com/aditya-dev-projects/Zerocodes-2.0/releases/download/v2.0/Zerocodes.Setup.2.0.0.exe";

// --- STYLES FOR ANIMATIONS ---
const animationStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
  }
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
`;

// --- COMPONENTS ---

interface DropdownItem { label: string; icon: any; targetId?: string; to?: string; }

const NavDropdown: React.FC<{ label: string; items: DropdownItem[]; onItemClick: (id: string) => void }> = ({ label, items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative group z-50" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors py-2 font-medium text-[15px]">
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} text-gray-400`} />
      </button>
      <div className={`absolute top-full right-0 w-64 pt-2 transition-all duration-200 ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 overflow-hidden ring-1 ring-black/5">
          {items.map((item, idx) => (
            <div key={idx} onClick={(e) => { if (item.targetId) { e.preventDefault(); onItemClick(item.targetId); setIsOpen(false); } }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group/item cursor-pointer">
              {item.to ? (
                <Link to={item.to} className="flex items-center gap-3 w-full">
                   <div className="p-2 bg-gray-50 rounded-md group-hover/item:bg-blue-50 group-hover/item:text-blue-600 transition-colors text-gray-500">{React.cloneElement(item.icon, { size: 18 })}</div>
                  <span className="text-sm font-medium text-gray-700 group-hover/item:text-gray-900">{item.label}</span>
                </Link>
              ) : (
                <>
                  <div className="p-2 bg-gray-50 rounded-md group-hover/item:bg-blue-50 group-hover/item:text-blue-600 transition-colors text-gray-500">{React.cloneElement(item.icon, { size: 18 })}</div>
                  <span className="text-sm font-medium text-gray-700 group-hover/item:text-gray-900">{item.label}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureSection: React.FC<{ 
  title: string; 
  description: string; 
  image: string; 
  align?: 'left' | 'right'; 
  icon: any;
  label?: string;
}> = ({ title, description, image, align = 'left', icon, label }) => (
  <div className="py-24 border-t border-gray-100 first:border-t-0 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      {/* Text Side */}
      <div className={`space-y-8 ${align === 'right' ? 'lg:order-2' : ''} animate-fade-in-up`}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
          {label || "Feature"}
        </div>
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">{title}</h3>
          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
        </div>
        
        <div className="flex items-center gap-4 pt-2">
           <div className="p-3 bg-gray-50 rounded-xl text-gray-900 border border-gray-200 shadow-sm">
             {React.cloneElement(icon, { size: 24 })}
           </div>
           <div className="h-px flex-1 bg-gray-100"></div>
        </div>
      </div>

      {/* Image Side */}
      <div className={`relative ${align === 'right' ? 'lg:order-1' : ''} group animate-fade-in-up delay-200`}>
        {/* Decorative Background Blob */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-gray-50 rounded-3xl transform rotate-2 scale-105 -z-10 transition-transform group-hover:rotate-1" />
        
        {/* Window Frame Container */}
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-transform duration-500 hover:-translate-y-1">
          {/* Mock Window Titlebar */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
             <div className="flex gap-1.5">
               <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
               <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
               <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
             </div>
             <div className="mx-auto text-[10px] font-semibold text-gray-400 uppercase tracking-widest pl-2">Zekodes</div>
          </div>
          {/* Screenshot */}
          <img src={image} alt={title} className="w-full h-auto object-cover" />
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN PAGE ---

const LandingPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleDownload = () => window.open(DOWNLOAD_LINK, '_blank');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="h-screen overflow-y-auto bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 scroll-smooth">
      <style>{animationStyles}</style>
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* LOGO - Using specific sizing class */}
            <Link to="/" onClick={() => scrollToSection('hero')} className="flex items-center gap-3 group select-none transition-transform hover:scale-105 active:scale-95">
              <img 
                src="/logo.svg" 
                alt="Zekodes" 
                className="h-8 w-auto object-contain filter drop-shadow-sm" 
              />
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={() => scrollToSection('problem')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">The Problem</button>
              <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Features</button>
              <NavDropdown 
                label="Resources" 
                onItemClick={scrollToSection} 
                items={[
                  { label: 'Documentation', icon: <BookOpen />, to: '/docs' }, 
                  { label: 'Academy', icon: <Rocket />, to: '/tutorial' }, 
                  { label: 'Support', icon: <LifeBuoy />, targetId: 'footer' }
                ]} 
              />
            </div>
            
            <div className="flex items-center gap-4">
               <button 
                  onClick={handleDownload}
                  className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95"
                >
                  <Download size={16} /> Download
                </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="hero" className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          <div className="animate-fade-in-up">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8">
                <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                v2.0 Now Available for Windows
             </div>
             <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-8 max-w-5xl mx-auto">
               Skip the Setup. <br className="hidden md:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Start Coding Instantly.</span>
             </h1>
             <p className="text-xl text-gray-600 font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
               Forget about installing compilers, configuring paths, or hunting for extensions. Zekodes is a complete coding environment that just works — download and run.
             </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 animate-fade-in-up delay-100">
             <div className="flex items-center gap-2 text-gray-600 font-medium text-sm bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
               <CheckCircle2 size={16} className="text-green-500" /> Compilers Included
             </div>
             <div className="flex items-center gap-2 text-gray-600 font-medium text-sm bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
               <CheckCircle2 size={16} className="text-green-500" /> Zero Config
             </div>
             <div className="flex items-center gap-2 text-gray-600 font-medium text-sm bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
               <CheckCircle2 size={16} className="text-green-500" /> Visual & Text
             </div>
          </div>

          <div className="animate-fade-in-up delay-200 relative z-20">
             <button 
                 onClick={handleDownload}
                 className="h-16 px-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-3 text-lg font-bold transition-all shadow-xl hover:shadow-blue-200 hover:-translate-y-1 mx-auto"
             >
               <Download className="w-5 h-5" />
               Download for Windows
             </button>
             <p className="mt-4 text-sm text-gray-400">Everything pre-installed • Runs Offline</p>
          </div>

          {/* Hero Image Mockup */}
          <div className="mt-20 -mb-32 relative z-10 max-w-5xl mx-auto animate-fade-in-up delay-300">
             <div className="rounded-xl bg-gray-900 p-2 shadow-2xl ring-1 ring-gray-900/10">
                <div className="rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
                   {/* Fake Window Controls */}
                   <div className="h-8 bg-gray-800 flex items-center px-3 gap-2 border-b border-gray-700">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                   </div>
                   {/* Image */}
                   <img src="/editor-code.png" alt="Zekodes Interface" className="w-full h-auto opacity-95" />
                </div>
             </div>
          </div>
        </div>
        
        {/* Background Gradient Mesh */}
        <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white -z-10 pointer-events-none" />
      </section>

      {/* 2. PROBLEM SECTION (The "Setup Hell") */}
      <section id="problem" className="pt-48 pb-24 bg-white">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider mb-6">
              The Reality
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">Why is starting to code so frustrating?</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-16">
              Before writing a single line of code, beginners often spend hours installing SDKs, setting PATH variables, and selecting extensions in complex professional tools.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
               <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-100 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-6 text-red-500">
                     <Box size={28} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Dependency Hell</h3>
                  <p className="text-sm text-gray-500">Downloading Python, GCC, and runtimes separately just to run "Hello World".</p>
               </div>
               <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-100 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-6 text-red-500">
                     <Layers size={28} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Extension Fatigue</h3>
                  <p className="text-sm text-gray-500">Figuring out which of the 50 "Python" extensions is the right one.</p>
               </div>
               <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-100 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-6 text-red-500">
                     <XCircle size={28} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Setup Errors</h3>
                  <p className="text-sm text-gray-500">Getting stuck on "Command not found" before you even start learning.</p>
               </div>
            </div>
         </div>
      </section>

      {/* 3. SOLUTION SECTION */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold uppercase tracking-wider mb-6">
              The Solution
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Batteries Included. Zero Config.</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Zekodes comes with Python and GCC compilers pre-bundled inside the app. Just download, open, and hit "Run".
            </p>
          </div>
          
          {/* Logic Flow Visualization */}
          <div className="grid md:grid-cols-3 gap-8 items-center justify-center relative">
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center relative z-10">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <Download size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Download</h3>
                <p className="text-gray-500 text-sm">One lightweight installer</p>
             </div>
             
             <div className="hidden md:flex absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0"></div>
             
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center relative z-10">
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Install</h3>
                <p className="text-gray-500 text-sm">Everything sets up automatically</p>
             </div>
             
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center relative z-10">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <Terminal size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Code</h3>
                <p className="text-gray-500 text-sm">Instant execution environment</p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURE WALKTHROUGH */}
      <section id="features" className="bg-white">
        <FeatureSection 
           label="Logic First"
           title="Visual Block Editor" 
           description="Start by dragging and dropping blocks. This allows you to focus on the logic—loops, conditions, variables—without getting syntax errors."
           image="/editor-blocks.png"
           icon={<Layout />}
        />
        <FeatureSection 
           label="Professional Transition"
           title="Real Code Generation" 
           description="Watch as Zekodes instantly translates your blocks into clean, valid C or Python code. This helps you bridge the gap between visual logic and text-based coding."
           image="/editor-code.png"
           align="right"
           icon={<Code2 />}
        />
        <FeatureSection 
           label="No Downloads Required"
           title="Integrated Local Runtimes" 
           description="Running code requires no extra downloads. The integrated terminal uses our pre-bundled Python and GCC environments to compile and execute your programs locally."
           image="/editor-terminal.png"
           icon={<Cpu />}
        />
        <FeatureSection 
           label="Self-Paced Learning"
           title="Built-in Academy" 
           description="Access step-by-step tutorials directly within the app. Learn concepts one at a time without needing to switch browser tabs."
           image="/academy-preview.png"
           align="right"
           icon={<BookOpen />}
        />
      </section>

      {/* 5. WHO IT IS FOR */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for Immediate Start</h2>
            <p className="text-gray-500 text-lg">Designed for anyone who wants to code right now, not configure tools.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600 font-bold">
                 <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Students</h3>
              <p className="text-gray-600 leading-relaxed">
                Need to submit a C or Python assignment? Download Zekodes and verify your logic instantly without installing heavy IDEs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600 font-bold">
                 <Rocket size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Absolute Beginners</h3>
              <p className="text-gray-600 leading-relaxed">
                Skip the "Environment Setup" tutorials. Just open Zekodes and build your first working program in minutes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 font-bold">
                 <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Hobbyists</h3>
              <p className="text-gray-600 leading-relaxed">
                Prototype ideas visually and transition smoothly into real code. Perfect for quick logic tests and learning new concepts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DOWNLOAD SECTION */}
      <section className="py-32 px-6 text-center bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform rotate-3 shadow-lg">
            <Download size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Ready to Code?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            No setup. No extensions. Just download Zekodes and start building your logic today.
          </p>
          <button 
              onClick={handleDownload}
              className="h-16 px-12 rounded-full bg-gray-900 hover:bg-black text-white text-lg font-bold transition-all shadow-xl hover:-translate-y-1 flex items-center gap-3 mx-auto"
          >
            <Download className="w-5 h-5" />
            Download for Windows
          </button>
          <p className="mt-6 text-sm text-gray-400">
             Requires Windows 10 or later • 64-bit Architecture
          </p>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer id="footer" className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            {/* Footer Logo using exact requested class */}
            <img src="/logo.svg" alt="Zekodes" className="h-8 w-auto object-contain filter drop-shadow-sm" />
          </div>
          <div className="text-sm text-gray-500">© 2026 Zekodes. All rights reserved.</div>
          <div className="flex gap-8 text-sm font-medium text-gray-600">
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;