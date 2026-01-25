import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, Lock, ArrowRight, Terminal, Code2, Sparkles, CheckCircle2,
  AlertCircle, Loader2
} from 'lucide-react';
import { supabase } from '../services/supabase';

// --- SAFE ELECTRON IMPORT PATTERN ---
const getElectron = () => {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.require) {
    try {
      // @ts-ignore
      return window.require('electron');
    } catch (e) {
      console.warn("Electron not detected. Running in browser mode.");
      return null;
    }
  }
  return null;
};

const electron = getElectron();
const ipcRenderer = electron?.ipcRenderer || null;
const shell = electron?.shell || null;
// ------------------------------------

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Basic Auth State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState<string | null>(null);

  // Helper to check profile existence and redirect
  const checkProfileAndNavigate = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('user_id')
        .eq('user_id', userId)
        .single();

      if (error || !data) {
        // Redirect to new Create Profile page if no profile exists
        navigate('/create-profile');
      } else {
        // Directly to Editor if profile exists
        localStorage.setItem('zekodes_setup_complete', 'true');
        navigate('/editor');
      }
    } catch (err) {
      console.error("Profile check failed", err);
      navigate('/create-profile');
    }
  };

  // 1. CHECK SESSION ON LOAD & LISTEN FOR DEEP LINK
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
            console.warn("Session error:", error.message);
            await supabase.auth.signOut();
            return;
        }
        if (session) {
          await checkProfileAndNavigate(session.user.id);
        }
      } catch (err) {
        console.error("Session check failed", err);
      }
    };
    
    checkSession();

    const handleAuthSession = async (_: any, url: string) => {
        try {
            const hashIndex = url.indexOf('#');
            if (hashIndex !== -1) {
                const params = new URLSearchParams(url.substring(hashIndex + 1));
                const access_token = params.get('access_token');
                const refresh_token = params.get('refresh_token');

                if (access_token && refresh_token) {
                    const { data, error } = await supabase.auth.setSession({
                        access_token,
                        refresh_token
                    });
                    if (!error && data.user) {
                        await checkProfileAndNavigate(data.user.id);
                    } else if (error) {
                        setError(error.message);
                    }
                }
            }
        } catch (err: any) {
            console.error("Auth parsing error", err);
            setError("Failed to parse login information.");
        }
    };

    if (ipcRenderer) {
        ipcRenderer.on('auth:session', handleAuthSession);
    }

    return () => {
        if (ipcRenderer) {
            ipcRenderer.removeListener('auth:session', handleAuthSession);
        }
    };
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        if (data.user) await checkProfileAndNavigate(data.user.id);
      } else {
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (signUpError) throw signUpError;
        
        if (user) {
          const { data: sessionData } = await supabase.auth.getSession();
          if (!sessionData.session) {
             alert('Account created! If email confirmation is enabled, please check your inbox.');
             return; 
          }
          await checkProfileAndNavigate(user.id);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const isElectron = !!ipcRenderer;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: isElectron ? 'zekodes://google-auth' : window.location.origin,
          skipBrowserRedirect: isElectron 
        }
      });
      
      if (error) throw error;

      if (isElectron && data?.url) {
        if (shell) {
            shell.openExternal(data.url);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
      </div>

      <div className="w-full max-w-[1100px] grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="hidden lg:block space-y-10 pr-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-white/5 text-blue-400 text-xs font-medium">
            <Sparkles size={12} />
            <span>v2.0 is now live</span>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <img src="/favicon.png" alt="Zekodes Logo" className="h-10 w-auto filter brightness-0 invert" />
               <span className="text-2xl font-bold text-white tracking-tighter">Zekodes</span>
            </div>
            <h1 className="text-5xl font-medium text-white tracking-tight leading-tight">
              Master the art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                logical thinking.
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md font-light leading-relaxed">
              Build real programs visually. Learn logic first. Code with confidence.
            </p>
          </div>
          <div className="grid gap-6">
            {[
              { icon: <Terminal size={20} />, title: "Cloud Terminal", desc: "Run code instantly in your browser" },
              { icon: <Code2 size={20} />, title: "Visual Blocks", desc: "Build logic without syntax stress" },
              { icon: <CheckCircle2 size={20} />, title: "AI-Powered Assistance", desc: "Explain, fix, and improve code in real time" }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-blue-400 group-hover:bg-white/[0.08] transition-all">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-white font-medium">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0c0c0c] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-medium text-white mb-3 tracking-tight">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-gray-500 font-light">
              {isLogin ? 'Sign in to continue building' : 'Start your coding journey today'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {error && (
              <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input
                  type="email" placeholder="Email address" required
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.05] transition-all"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input
                  type="password" placeholder="Password" required
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.05] transition-all"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {!isLogin && (
                <div className="relative animate-in fade-in slide-in-from-top-2">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input
                    type="password" placeholder="Confirm Password" required
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.05] transition-all"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <> {isLogin ? 'Sign in' : 'Sign up'} <ArrowRight size={20} /> </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.05]"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0c0c0c] px-4 text-gray-600 font-semibold tracking-widest">Or continue with</span></div>
          </div>

          <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-4 bg-white/[0.03] border border-white/[0.05] text-white py-4 rounded-2xl hover:bg-white/[0.08] transition-all active:scale-[0.99]">
            <img src="http://pluspng.com/img-png/google-logo-png-open-2000.png" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-semibold">Continue with Google</span>
          </button>

          <p className="text-center mt-8 text-gray-600 text-sm font-light">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-white font-semibold hover:text-blue-400 transition-colors">
              {isLogin ? 'Sign up for free' : 'Sign in now'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;