import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView, useMotionValueEvent } from 'framer-motion';
import { 
  Download, ChevronDown, Layout, Code2, Terminal, Rocket, 
  CheckCircle2, Plus, Minus, Box, BookOpen , Layers
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const DOWNLOAD_LINK = "https://github.com/aditya-dev-projects/Zerocodes-2.0/releases/download/v2.0/Zerocodes.Setup.2.0.0.exe";

// --- ANIMATION UTILS (Bypassing strict TS errors with 'any') ---
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- SCROLL-TRIGGERED TYPEWRITER COMPONENT ---
const TypewriterHeading = ({ text, delay = 0, speed = 40, className = "" }: { text: string, delay?: number, speed?: number, className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay, speed, isInView]);

  return (
    <h2 ref={ref} className={className}>
      {displayText.split('\n').map((line, idx) => (
        <React.Fragment key={idx}>
          {line}
          {idx < displayText.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="inline-block w-[0.06em] h-[0.9em] bg-slate-900 ml-1 align-middle -translate-y-[0.05em]"
        />
      )}
    </h2>
  );
};

// --- ANTIGRAVITY DROPDOWN MENU ---
const NavDropdown = ({ label, items }: { label: string, items: { label: string, icon: any, to: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className="relative group z-50 h-full flex items-center" 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1.5 hover:text-slate-900 transition-colors py-2">
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2"
          >
            <div className="bg-white rounded-2xl p-2 w-56 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-100 relative before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
              {items.map((item, idx) => (
                <button 
                  key={idx} 
                  onClick={() => navigate(item.to)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group/item text-left"
                >
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover/item:text-blue-600 group-hover/item:bg-blue-50 transition-colors shadow-sm">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover/item:text-slate-900 transition-colors">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- HERO PARTICLE BACKGROUND (ANTIGRAVITY SWIRL) ---
const ParticleSwirl = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const rotateX = useTransform(springY, [-40, 40], [10, -10]);
  const rotateY = useTransform(springX, [-40, 40], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x * 40);
      mouseY.set(y * 40);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const particles = useMemo(() => {
    const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8A2BE2'];
    return Array.from({ length: 450 }).map((_, i) => {
      const radius = Math.sqrt(Math.random()) * 45 + 5; 
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const tangent = (angle * 180) / Math.PI + 90;
      const rotation = tangent + (Math.random() * 40 - 20); 

      return {
        id: i,
        x: `${x}vw`,
        y: `${y}vw`,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: `${Math.random() * 12 + 6}px`, 
        height: `${Math.random() * 2 + 1.5}px`, 
        rotation: rotation,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden" style={{ perspective: 1000 }}>
      <motion.div 
        className="relative w-full h-full flex items-center justify-center opacity-70"
        style={{ x: springX, y: springY, rotateX, rotateY }}
      >
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        >
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.width,
                height: p.height,
                backgroundColor: p.color,
                transform: `translate(${p.x}, ${p.y}) rotate(${p.rotation}deg)`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,253,253,0.8)_0%,rgba(253,253,253,0.3)_50%,transparent_100%)]" />
    </div>
  );
};

// --- GLOWING IMAGE WRAPPER ---
const GlowingImage = ({ src, alt }: { src: string, alt: string }) => (
  <div className="relative group perspective-1000">
    <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500/40 via-purple-500/40 to-pink-500/40 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition duration-700 pointer-events-none" />
    <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-200 via-pink-200 to-orange-200 overflow-hidden transform transition-transform duration-700 hover:scale-[1.02] shadow-2xl shadow-slate-300">
      <div className="bg-white rounded-2xl overflow-hidden border border-white/50">
        <div className="bg-slate-50/80 px-4 py-3 flex gap-2 items-center border-b border-slate-100 backdrop-blur-md">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        </div>
        <img src={src} alt={alt} className="w-full h-auto object-cover" />
      </div>
    </div>
  </div>
);

// --- MAIN LANDING PAGE ---
const LandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeMode, setActiveMode] = useState<'beginner' | 'advanced'>('beginner');
  
  const { scrollY, scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 50]);

  // Robust Scroll tracking for Nav Bar hiding/showing
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Determine if we've scrolled past the very top (to add shadow/blur)
    setScrolled(latest > 20);

    // Get previous scroll position
    const previous = scrollY.getPrevious() || 0;
    
    // If scrolling down AND we are past 150px, hide the navbar
    if (latest > previous && latest > 150) {
      setNavVisible(false);
    } else {
      // If scrolling up, show the navbar
      setNavVisible(true);
    }
  });

  const handleDownload = () => window.open(DOWNLOAD_LINK, '_blank');
  
  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* NAVBAR (SMOOTH AUTO-HIDING) */}
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: navVisible ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <div className="flex items-center gap-12">
            {/* Logo ONLY (Clicks to top) */}
            <a href="/" onClick={scrollToTop} className="flex items-center group cursor-pointer">
              <img 
                src="/logo.svg" 
                alt="Zekodes Logo" 
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                }}
              />
              {/* Fallback icon just in case the image path is missing */}
              <div className="fallback-icon hidden w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white transition-transform group-hover:scale-105">
                <Code2 size={18} strokeWidth={2.5} />
              </div>
            </a>
            
            {/* Center Links */}
            <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-500 h-10">
              <button onClick={() => scrollToSection('product')} className="hover:text-slate-900 transition-colors h-full flex items-center">Product</button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-slate-900 transition-colors h-full flex items-center">How it Works</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-slate-900 transition-colors h-full flex items-center">FAQ</button>
              <NavDropdown 
                label="Resources" 
                items={[
                  { label: 'Documentation', icon: <BookOpen size={16} />, to: '/docs' },
                  { label: 'Academy', icon: <Rocket size={16} />, to: '/tutorial' }
                ]} 
              />
            </div>
          </div>

          {/* Right Button */}
          <button onClick={handleDownload} className="bg-[#111111] hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5">
             <Download size={16} /> Download
          </button>

        </div>
      </motion.nav>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 overflow-hidden pt-16">
        <ParticleSwirl />
        
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="max-w-4xl mx-auto text-center mt-10 relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center gap-2 mb-8"
          >
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Code2 size={12} />
            </div>
            <span className="text-sm font-semibold tracking-wide text-slate-600 uppercase">Zekodes Visual IDE</span>
          </motion.div>

          <TypewriterHeading 
            text={"Think in Logic.\nCode in Reality."} 
            delay={200} 
            speed={50} 
            className="text-6xl md:text-8xl font-medium tracking-tighter text-slate-900 mb-8 leading-[1.05] min-h-[2.2em]"
          />

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.8 }}
            className="text-xl md:text-2xl text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Zekodes is a logic-first programming IDE that lets you build structured programs visually while generating real C and Python code in real time.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 2.1 }}
            className="text-base text-slate-400 max-w-xl mx-auto mb-12"
          >
            Designed for beginners and serious learners, Zekodes removes setup friction and helps you focus on how programs work before worrying about syntax details.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button onClick={handleDownload} className="w-full sm:w-auto px-8 py-4 bg-[#111111] text-white rounded-full font-medium text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
              <Download size={20} /> Download Desktop App
            </button>
            <Link to="/docs" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-medium text-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
              View Documentation
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="py-32 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-slate-900 mb-6">Why Most Beginners Quit Programming</h2>
            <p className="text-xl md:text-2xl text-slate-500 mb-16">The difficulty is not intelligence. It is <span className="text-slate-900 font-medium">cognitive overload</span>.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 text-left mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
              <p className="text-lg text-slate-600 leading-relaxed">Traditional coding environments require learners to manage logic, syntax, environment setup, and debugging all at once.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
              <p className="text-lg text-slate-600 leading-relaxed">This leads to frustration, confusion, and early abandonment before foundational thinking skills are built.</p>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6 text-left">
            {[
              "Syntax errors appear before logic is understood",
              "Compiler installation blocks early momentum",
              "Small mistakes feel like major failures"
            ].map((point, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-start gap-4 p-6 border border-slate-100 rounded-2xl shadow-sm">
                <div className="mt-1 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold">✕</span>
                </div>
                <p className="font-medium text-slate-700">{point}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: THE SHIFT */}
      <section className="py-32 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-8">
              <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-medium tracking-tight">Separate Logic<br/>from Syntax.</motion.h2>
              <motion.p variants={fadeUp} className="text-2xl text-slate-400">Learn structure first. Let syntax follow.</motion.p>
              <motion.p variants={fadeUp} className="text-lg text-slate-300 leading-relaxed">
                Zekodes changes the order of learning. Instead of typing code blindly, you construct programs using structured logic blocks. The system translates your logic into real C and Python code instantly.
              </motion.p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
              {[
                "Visual blocks represent real programming structures",
                "Generated code is industry-standard and exportable",
                "Execution happens locally without dependency setup"
              ].map((point, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                  <CheckCircle2 className="text-blue-400 shrink-0" size={24} />
                  <span className="text-lg font-medium">{point}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PRODUCT EXPERIENCE */}
      <section id="product" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 min-h-[140px]">
            <TypewriterHeading 
              text="A Structured Programming Workspace" 
              delay={100} 
              speed={40} 
              className="text-4xl md:text-6xl font-medium tracking-tight text-slate-900 mb-6"
            />
            <motion.p 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.5 }} viewport={{ once: true }}
              className="text-xl text-slate-500"
            >
              Everything you need. Nothing to configure.
            </motion.p>
          </div>

          <div className="space-y-32">
            {/* Feature 1 */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="space-y-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6"><Layout size={24}/></div>
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight">Visual Logic Builder</h3>
                <p className="text-lg text-slate-500 leading-relaxed">Drag and arrange structured blocks for variables, conditionals, loops, functions, and input/output.</p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                <GlowingImage src="/editor-blocks.png" alt="Visual Logic Builder" />
              </motion.div>
            </div>

            {/* Feature 2 */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="lg:order-2 space-y-6">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6"><Code2 size={24}/></div>
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight">Live Code Generation</h3>
                <p className="text-lg text-slate-500 leading-relaxed">Watch clean, readable C and Python code update instantly as you build logic.</p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="lg:order-1">
                <GlowingImage src="/editor-code.png" alt="Live Code Generation" />
              </motion.div>
            </div>

            {/* Feature 3 */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="space-y-6">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6"><Terminal size={24}/></div>
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight">Local Execution Terminal</h3>
                <p className="text-lg text-slate-500 leading-relaxed">Run programs directly inside the app with full input and output support.</p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                <GlowingImage src="/editor-terminal.png" alt="Local Execution Terminal" />
              </motion.div>
            </div>

            {/* Feature 4: Interactive Modes */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="lg:order-2 space-y-6">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6"><Layers size={24}/></div>
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight">Beginner and Advanced Modes</h3>
                <p className="text-lg text-slate-500 leading-relaxed">Choose structured constraints for guided learning or switch to full control when ready.</p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="lg:order-1">
                
                {/* INTERACTIVE TOGGLE UI */}
                <div className="bg-slate-50 rounded-[2rem] p-10 border border-slate-200 shadow-inner relative overflow-hidden h-[400px] flex flex-col">
                  
                  {/* Toggle Buttons */}
                  <div className="flex justify-center gap-4 mb-10 relative z-10">
                    <button 
                      onClick={() => setActiveMode('beginner')}
                      className={`px-8 py-3 rounded-full font-semibold transition-all ${activeMode === 'beginner' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'}`}
                    >
                      Beginner
                    </button>
                    <button 
                      onClick={() => setActiveMode('advanced')}
                      className={`px-8 py-3 rounded-full font-semibold transition-all ${activeMode === 'advanced' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'}`}
                    >
                      Advanced
                    </button>
                  </div>

                  {/* Dynamic Content Area */}
                  <div className="flex-1 relative">
                    <AnimatePresence mode="wait">
                      {activeMode === 'beginner' ? (
                        <motion.div 
                          key="beginner"
                          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}
                          className="absolute inset-0 flex flex-col items-center text-center"
                        >
                          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><Box size={32} /></div>
                          <h4 className="text-xl font-bold text-slate-900 mb-4">Structured Constraints</h4>
                          <ul className="text-slate-600 space-y-3 font-medium text-left">
                            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500"/> Snap-to-grid visual logic</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500"/> Syntax error prevention</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500"/> Step-by-step logic validation</li>
                          </ul>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="advanced"
                          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}
                          className="absolute inset-0 flex flex-col items-center text-center"
                        >
                          <div className="w-16 h-16 bg-slate-800 text-white rounded-2xl flex items-center justify-center mb-6"><Terminal size={32} /></div>
                          <h4 className="text-xl font-bold text-slate-900 mb-4">Full Control</h4>
                          <ul className="text-slate-600 space-y-3 font-medium text-left">
                            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-800"/> Direct code editing</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-800"/> Advanced compiler flags</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-slate-800"/> Native terminal access</li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section id="how-it-works" className="py-32 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-slate-900 mb-6">From Idea to Execution in Three Steps</h2>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Build Logic", body: "Assemble structured blocks that represent real programming concepts." },
              { step: "02", title: "Review Generated Code", body: "Understand how your logic translates into proper C or Python syntax." },
              { step: "03", title: "Run Locally", body: "Execute your program instantly without installing separate compilers." }
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
                <div className="text-6xl font-black text-slate-100 mb-6 group-hover:text-blue-50 transition-colors">{s.step}</div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: WHY ZEKODES */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-slate-900 mb-6">Built for Real Learning</h2>
            <p className="text-xl text-slate-500 mb-12">Not a toy editor. Not a simplified abstraction.</p>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-16">
              Zekodes produces real code that developers can recognize and reuse. The goal is not to hide programming complexity, but to introduce it in a structured and understandable way.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-wrap justify-center gap-4">
            {[
              "Reduces early frustration",
              "Strengthens logical reasoning",
              "Produces transferable programming skills",
              "Works without external setup"
            ].map((point, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-blue-50 text-blue-700 px-6 py-3 rounded-full font-medium text-sm md:text-base border border-blue-100">
                {point}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CTA - NO DEPENDENCIES */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-orange-50/80 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-white/60 backdrop-blur-xl p-16 md:p-24 rounded-[3rem] shadow-2xl border border-white">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-slate-900 mb-8">Start Coding Instantly</h2>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Download Zekodes and begin building real programs immediately. No separate compiler installations. No environment configuration. No setup tutorials.
          </p>
          <button onClick={handleDownload} className="px-10 py-5 bg-[#111111] text-white rounded-full font-medium text-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 mx-auto shadow-2xl shadow-slate-300">
            <Download size={24} /> Download Desktop App
          </button>
        </div>
      </section>

      {/* SECTION 8: FAQ */}
      <section id="faq" className="py-32 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-slate-900 mb-16 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              { q: "What is Zekodes?", a: "Zekodes is a logic-first visual programming IDE that generates real C and Python code as users build structured logic blocks." },
              { q: "Do I need to install compilers separately?", a: "No. Zekodes includes embedded runtimes, so programs can be executed locally without additional setup." },
              { q: "Is this only for beginners?", a: "No. Zekodes supports both beginner mode with structural constraints and advanced mode with full flexibility." },
              { q: "Can I export my code?", a: "Yes. The generated source code can be copied or exported for use in other environments." },
              { q: "Does Zekodes require internet access?", a: "Core coding and execution features run locally after installation." },
              { q: "What languages are supported?", a: "Currently C and Python are supported, with expansion planned." },
              { q: "How are projects saved?", a: "User accounts and projects are securely managed using Supabase authentication and database services." },
              { q: "Is Zekodes free?", a: "Zekodes offers a free tier with core functionality available to all users." }
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-lg">{faq.q}</span>
                  {activeFaq === i ? <Minus className="text-blue-500 shrink-0" /> : <Plus className="text-slate-400 shrink-0" />}
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-8 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Code2 className="text-blue-600" size={24} />
            <span className="font-medium text-lg text-slate-900">Zekodes</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
            <Link to="/docs" className="hover:text-slate-900 transition-colors">Documentation</Link>
          </div>
          <div className="text-sm text-slate-400">
            © 2026 Zekodes. Built in Bengaluru.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;