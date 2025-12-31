import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, Lock, ArrowRight, Terminal, Code2, Sparkles, CheckCircle2,
  AlertCircle, Loader2
} from 'lucide-react';
import { supabase } from '../services/supabase';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/editor');
    });
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (signUpError) throw signUpError;
        
        if (data.user && !data.session) {
          const { error: secondSignInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (secondSignInError) throw secondSignInError;
        }
      }
      navigate('/editor');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/editor'
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
      </div>

      <div className="w-full max-w-[1100px] grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Branding & Features */}
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

        {/* Right Side: Auth Card */}
        <div className="bg-[#0c0c0c] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="mb-10 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start items-center gap-3 mb-8">
              <img src="/favicon.png" alt="Zekodes" className="h-8 w-auto filter brightness-0 invert" />
              <span className="text-xl font-bold text-white tracking-tighter">Zekodes</span>
            </div>
            <h2 className="text-3xl font-medium text-white mb-3 tracking-tight">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-gray-500 font-light">
              {isLogin ? 'Sign in to continue building with Zekodes' : 'Start your coding journey today'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
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
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.05] transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.05] transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isLogin ? 'Sign in' : 'Sign up'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.05]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0c0c0c] px-4 text-gray-600 font-semibold tracking-widest">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-4 bg-white/[0.03] border border-white/[0.05] text-white py-4 rounded-2xl hover:bg-white/[0.08] transition-all active:scale-[0.99]"
            >
              <img 
                src="http://pluspng.com/img-png/google-logo-png-open-2000.png" 
                alt="Google" 
                className="w-5 h-5"
              />
              <span className="text-sm font-semibold">Continue with Google</span>
            </button>
          </div>

          <p className="text-center mt-10 text-gray-600 text-sm font-light">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-white font-semibold hover:text-blue-400 transition-colors"
            >
              {isLogin ? 'Sign up for free' : 'Sign in now'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;