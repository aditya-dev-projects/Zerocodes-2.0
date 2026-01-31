import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, ChevronDown, Layout, Code2, 
  Terminal, Rocket, BookOpen, LifeBuoy, 
  XCircle, CheckCircle2, Zap,
  Box, Layers, Sparkles , ArrowRight
} from 'lucide-react';
import { supabase } from '../services/supabase';
import type { Session } from '@supabase/supabase-js';

const DOWNLOAD_LINK = "https://github.com/aditya-dev-projects/Zerocodes-2.0/releases/download/v2.0/Zerocodes.Setup.2.0.0.exe";

// --- ADVANCED ANIMATION STYLES (MAINTAINED EXACTLY) ---
const animationStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(2deg); }
    66% { transform: translateY(-10px) rotate(-2deg); }
  }
  @keyframes floatSlow {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(20px, -20px) scale(1.05); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(100px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes slideInDown {
    from { opacity: 0; transform: translateY(-50px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-100px) rotateY(-20deg); }
    to { opacity: 1; transform: translateX(0) rotateY(0deg); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(100px) rotateY(20deg); }
    to { opacity: 1; transform: translateX(0) rotateY(0deg); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.8) rotate(-5deg); }
    to { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @keyframes revealText {
    from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0px); }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.2); }
    50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3); }
  }
  @keyframes rotate360 {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
  .animate-slide-in-up { animation: slideInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  .animate-slide-in-down { animation: slideInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  .animate-scale-in { animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  .animate-reveal-text { animation: revealText 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  .animate-glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
  .animate-zoom-in { animation: zoomIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }

  /* Scroll Reveal Framework */
  .scroll-reveal { opacity: 0; transform: translateY(60px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
  .scroll-reveal.revealed { opacity: 1; transform: translateY(0); }
  .scroll-reveal-left { opacity: 0; transform: translateX(-80px) rotateY(-15deg); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
  .scroll-reveal-left.revealed { opacity: 1; transform: translateX(0) rotateY(0deg); }
  .scroll-reveal-right { opacity: 0; transform: translateX(80px) rotateY(15deg); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
  .scroll-reveal-right.revealed { opacity: 1; transform: translateX(0) rotateY(0deg); }
  .scroll-reveal-scale { opacity: 0; transform: scale(0.85); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
  .scroll-reveal-scale.revealed { opacity: 1; transform: scale(1); }

  .card-3d { transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
  .card-3d:hover { transform: translateY(-10px) rotateX(5deg) rotateY(5deg) scale(1.02); }
  .glass-effect { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.3); }
  .text-gradient { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
`;

// --- PARTICLE BACKGROUND ---
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: any[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x; const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke(); }
        });
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => {};
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

const MagneticButton: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string; style?: React.CSSProperties; }> = ({ children, onClick, className = '', style }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };
  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });
  return (
    <button ref={buttonRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick} className={`magnetic-button ${className}`} style={{ ...style, transform: `translate(${position.x}px, ${position.y}px)` }}>
      {children}
    </button>
  );
};

const NavDropdown: React.FC<{ label: string; items: DropdownItem[]; onItemClick: (id: string) => void }> = ({ label, items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative group z-50" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors py-2 font-semibold text-[14px] uppercase tracking-wider">
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`absolute top-full right-0 w-64 pt-2 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
        <div className="glass-effect rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden">
          {items.map((item, idx) => (
            <div key={idx} onClick={(e) => { if (item.targetId) { e.preventDefault(); onItemClick(item.targetId); setIsOpen(false); } }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50/50 transition-all cursor-pointer group/item">
              {item.to ? (
                <Link to={item.to} className="flex items-center gap-3 w-full">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover/item:bg-white group-hover/item:text-blue-600 shadow-sm transition-all text-slate-400">
                    {React.cloneElement(item.icon, { size: 18 })}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                </Link>
              ) : (
                <>
                  <div className="p-2 bg-slate-50 rounded-lg group-hover/item:bg-white group-hover/item:text-blue-600 shadow-sm transition-all text-slate-400">
                    {React.cloneElement(item.icon, { size: 18 })}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureSection: React.FC<{ title: string; description: string; image: string; align?: 'left' | 'right'; icon: any; label?: string; }> = ({ title, description, image, align = 'left', icon, label }) => (
  <div className="py-24 border-t border-slate-50 first:border-t-0 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <div className={`space-y-8 ${align === 'right' ? 'lg:order-2' : ''} ${align === 'left' ? 'scroll-reveal-left' : 'scroll-reveal-right'}`}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest">
          <Sparkles size={12} /> {label || "Feature"}
        </div>
        <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">{title}</h3>
        <p className="text-lg text-slate-500 font-medium leading-relaxed">{description}</p>
        <div className="flex items-center gap-4 pt-2">
          <div className="p-4 bg-white rounded-2xl text-blue-600 shadow-xl border border-slate-100 animate-float">
            {React.cloneElement(icon, { size: 28 })}
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
        </div>
      </div>
      <div className={`relative ${align === 'right' ? 'lg:order-1' : ''} group ${align === 'left' ? 'scroll-reveal-right' : 'scroll-reveal-left'}`}>
        <div className="absolute inset-0 bg-blue-100 rounded-[2.5rem] transform rotate-3 scale-105 -z-10 transition-transform group-hover:rotate-1 opacity-50" />
        <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden card-3d">
          <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <div className="w-3 h-3 rounded-full bg-slate-200" />
          </div>
          <img src={image} alt={title} className="w-full h-auto opacity-90 transition-opacity group-hover:opacity-100" />
        </div>
      </div>
    </div>
  </div>
);

interface DropdownItem { label: string; icon: any; targetId?: string; to?: string; }

const LandingPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // FIXED: Implementation of mouse parallax to resolve TS6133
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
      }, { threshold: 0.1 });
      document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => observer.observe(el));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDownload = () => window.open(DOWNLOAD_LINK, '_blank');
  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Safety check for session usage (Resolving TS6133)
  console.debug("Current Session State:", session?.user.id || "Guest");

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-blue-100 scroll-smooth overflow-x-hidden">
      <style>{animationStyles}</style>
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`glass-effect rounded-[2rem] px-8 flex items-center justify-between h-16 shadow-xl shadow-slate-200/50 transition-all border border-white/50`}>
            <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Code2 className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">ZEKODES</span>
            </Link>

            <div className="hidden lg:flex items-center space-x-10">
              <button onClick={() => scrollToSection('problem')} className="text-xs font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">The Problem</button>
              <button onClick={() => scrollToSection('features')} className="text-xs font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">Features</button>
              <NavDropdown label="Resources" onItemClick={scrollToSection} items={[
                { label: 'Documentation', icon: <BookOpen />, to: '/docs' }, 
                { label: 'Academy', icon: <Rocket />, to: '/tutorial' }, 
                { label: 'Support', icon: <LifeBuoy />, targetId: 'footer' }
              ]} />
            </div>
            
            <MagneticButton onClick={handleDownload} className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black hover:bg-blue-600 transition-all shadow-xl active:scale-95 tracking-widest">
              DOWNLOAD
            </MagneticButton>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-60 pb-32 px-6 relative">
        <ParticleBackground />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-slide-in-down">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-200 text-blue-600 text-xs font-black uppercase tracking-widest mb-10 shadow-sm animate-glow-pulse">
              <Sparkles size={14} className="animate-pulse" /> v2.0 Now Available for Windows
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-12">
              <span className="animate-reveal-text inline-block">Code without</span><br />
              <span className="text-gradient animate-reveal-text delay-200 inline-block italic">The Config.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium mb-14 max-w-2xl mx-auto leading-relaxed animate-reveal-text delay-400">
              Forget about GCC paths or Python SDKs. Zekodes is a logic-first environment that comes with everything pre-installed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 animate-zoom-in delay-600">
            <MagneticButton onClick={handleDownload} className="h-16 px-12 rounded-3xl bg-blue-600 text-white flex items-center justify-center gap-3 text-lg font-black hover:bg-slate-900 transition-all shadow-2xl shadow-blue-200 group relative overflow-hidden">
              <Download className="group-hover:animate-bounce" /> GET ZEKODES FREE
            </MagneticButton>
          </div>

          {/* Interactive Mockup */}
          <div className="mt-20 relative animate-slide-in-up delay-800 perspective-container"
               style={{ transform: `translateY(${mousePos.y * 15}px) rotateX(${mousePos.y * 3}deg) rotateY(${mousePos.x * 3}deg)` }}>
            <div className="rounded-[3rem] bg-white p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] ring-1 ring-slate-200">
              <div className="rounded-[2.2rem] overflow-hidden border border-slate-100 shadow-inner">
                <img src="/editor-code.png" alt="Zekodes Environment" className="w-full h-auto opacity-95 transition-transform duration-1000 hover:scale-[1.02]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest mb-6 border border-red-100">
              <XCircle size={14} /> The Status Quo
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter">Why is coding <span className="text-red-500">so painful?</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 stagger-children">
            {[
              { icon: <Box />, title: "Dependency Hell", desc: "Beginners spend hours downloading Python and GCC separately just to run 'Hello World'." },
              { icon: <Layers />, title: "Extension Fatigue", desc: "Configuring complex professional tools like VS Code is a nightmare for newcomers." },
              { icon: <XCircle />, title: "Setup Errors", desc: "Command line errors and missing paths kill the excitement of building logic." }
            ].map((item, i) => (
              <div key={i} className="scroll-reveal-scale glass-effect p-12 rounded-[3.5rem] border border-slate-100 hover:shadow-2xl transition-all duration-500 card-3d group" style={{'--index': i} as React.CSSProperties}>
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner group-hover:bg-red-500 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                  {React.cloneElement(item.icon, { size: 36 })}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-40 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="scroll-reveal-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 text-xs font-black uppercase tracking-widest mb-6 border border-green-100">
                <CheckCircle2 size={14} /> The Zekodes Way
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">One Click. <br /><span className="text-blue-600">Zero Config.</span></h2>
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-12">
                We bundle everything inside. From the GCC compiler to the Python runtime, everything is pre-configured for instant execution.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <Download />, label: "LIGHTWEIGHT" },
                  { icon: <Zap />, label: "INSTANT" },
                  { icon: <Terminal />, label: "LOCAL" },
                  { icon: <Rocket />, label: "FREE" }
                ].map((step, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 flex flex-col items-center gap-4 border border-white">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      {step.icon}
                    </div>
                    <span className="font-black text-[10px] tracking-[0.2em] text-slate-400">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="scroll-reveal-right glass-effect p-12 rounded-[4rem] border border-white shadow-2xl relative">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/20 blur-3xl rounded-full" />
               <h3 className="text-3xl font-black mb-8">Integrated Runtimes</h3>
               <div className="space-y-6">
                 {['Internal GCC v14', 'Python 3.12 Engine', 'Pre-configured System Paths', 'Offline Execution Support'].map((t, i) => (
                   <div key={i} className="flex items-center gap-4 text-slate-700 font-bold">
                     <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                       <CheckCircle2 size={14} />
                     </div>
                     {t}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FeatureSection label="Visual Engine" title="Logic-First Block Editor" description="Start by building logic structures visually. Perfect for understanding concepts without syntax errors." image="/editor-blocks.png" icon={<Layout />} />
          <FeatureSection label="Pro Bridge" title="Instant Code Translation" description="Watch as your visual blocks turn into professional C or Python code in real-time." image="/editor-code.png" align="right" icon={<Code2 />} />
          <FeatureSection label="Local Execution" title="High Performance Terminal" description="No external downloads required. Execute code locally with our built-in high-speed runtimes." image="/editor-terminal.png" icon={<Terminal />} />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-40 px-6">
        <div className="max-w-6xl mx-auto glass-effect rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl border-blue-100 shadow-blue-200/50 scroll-reveal-scale">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-40 -z-10" />
          <div className="w-24 h-24 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-12 shadow-2xl animate-float">
            <Download size={48} />
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-none">Stop configuring. <br /><span className="text-blue-600">Start building.</span></h2>
          <p className="text-2xl text-slate-500 font-medium mb-14">Get the standalone v2.0 for Windows today.</p>
          <MagneticButton onClick={handleDownload} className="h-20 px-16 rounded-[2.5rem] bg-slate-900 text-white text-xl font-black hover:bg-blue-600 transition-all shadow-2xl active:scale-95 group">
            DOWNLOAD STANDALONE <ArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
          </MagneticButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="py-24 bg-white border-t border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4 transition-transform hover:scale-110">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
              <Code2 className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">ZEKODES</span>
          </div>
          <div className="flex gap-16 text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
            <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-slate-50 text-center text-[10px] font-black text-slate-300 tracking-[0.5em] uppercase">
          © 2026 ZEKODES LABS • BENGALURU, INDIA
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;