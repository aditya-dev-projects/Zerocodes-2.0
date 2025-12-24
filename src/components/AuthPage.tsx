import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Lock, Mail, Loader2, ArrowRight, Sparkles } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-screen bg-[#0d1117] flex items-center justify-center font-sans overflow-x-hidden py-12">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative flex flex-col items-center w-full max-w-[440px] px-6">
        
        {/* Header Section with Official Icon */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center mb-6 drop-shadow-2xl group hover:scale-105 transition-transform duration-300">
            {/* Updated to use your Official Icon from image_c2a8c1.png */}
            <img 
              src="/logo-icon.png" 
              alt="Zekodes Icon" 
              className="w-16 h-16 rounded-2xl shadow-blue-500/20 shadow-2xl"
              onError={(e) => {
                // Fallback to a styled div if image path isn't set yet
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `<div class="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl shadow-blue-500/40">Z</div>`;
              }}
            />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Zekodes</span>
          </h1>
          <p className="text-gray-400 text-sm font-light">
            {isSignUp ? 'Start building logic visually today.' : 'Sign in to access your cloud-powered workspace.'}
          </p>
        </div>

        {/* Auth Container */}
        <div className="w-full bg-[#161b22]/40 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-800/60 shadow-2xl animate-in fade-in zoom-in-95 duration-700">
          <form onSubmit={handleAuth} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-2 animate-in shake">
                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                {error}
              </div>
            )}
            {message && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-xs flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-green-400" />
                {message}
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full bg-[#0d1117]/60 border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder-gray-600" 
                  placeholder="name@zekodes.com" 
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">Password</label>
                {!isSignUp && (
                  <button type="button" className="text-[10px] text-blue-500 hover:text-blue-400 font-bold transition-colors">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full bg-[#0d1117]/60 border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder-gray-600" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || googleLoading} 
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 mt-2 shadow-lg shadow-blue-600/20 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Styled "Or" Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800/40"></div>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-[0.25em] font-bold">
              <span className="bg-[#141921] px-4 text-gray-600">or continue with</span>
            </div>
          </div>

          {/* Google Button Aligned with Form */}
          <button 
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-[#0d1117] border border-gray-800 hover:bg-gray-800/40 text-white py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
          >
            {googleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"/>
                </svg>
                <span>Google Account</span>
              </>
            )}
          </button>

          {/* Toggle Link */}
          <div className="mt-8 pt-6 border-t border-gray-800/40 text-center">
            <p className="text-gray-500 text-xs font-medium">
              {isSignUp ? 'Already have a Zekodes account?' : "Don't have an account?"}
              <button 
                onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }} 
                className="ml-2 text-blue-400 hover:text-blue-300 font-bold transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-10 flex items-center justify-center gap-5 text-[10px] font-bold text-gray-600 tracking-widest uppercase opacity-70">
          <Link to="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
          <div className="w-1 h-1 bg-gray-800 rounded-full" />
          <Link to="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
          <div className="w-1 h-1 bg-gray-800 rounded-full" />
          <span>v2.0.4-stable</span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;