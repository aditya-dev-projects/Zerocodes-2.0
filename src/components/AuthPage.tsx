import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Lock, Mail, Loader2, Code2, ArrowRight, Sparkles } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="relative h-screen w-screen bg-[#0d1117] flex items-center justify-center font-sans overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[140px] rounded-full" />
      
      <div className="relative flex flex-col items-center w-full max-w-[480px] px-8">
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-3xl shadow-2xl mb-6 group hover:scale-110 hover:rotate-3 transition-all"><Code2 className="w-12 h-12 text-white" /></div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-3">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Zekodes</span></h1>
          <p className="text-gray-400 text-lg font-light">{isSignUp ? 'The professional IDE for visual logic building.' : 'Sign in to access your cloud-powered workspace.'}</p>
        </div>

        <div className="w-full bg-[#161b22]/70 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-gray-800/50 shadow-2xl animate-in fade-in zoom-in-95 duration-1000">
          <form onSubmit={handleAuth} className="space-y-6">
            {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3 animate-in shake"><div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />{error}</div>}
            {message && <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 text-sm flex items-center gap-3"><Sparkles className="w-4 h-4 text-green-400" />{message}</div>}

            <div className="space-y-2.5">
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-all" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0d1117]/80 border border-gray-800 rounded-2xl py-4 pl-14 pr-6 text-white focus:border-blue-500 focus:ring-[4px] focus:ring-blue-500/10 outline-none transition-all placeholder-gray-600" placeholder="name@zekodes.com" />
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Password</label>
                {!isSignUp && <button type="button" className="text-[11px] text-blue-500 hover:text-blue-400 font-bold transition-colors">Forgot Password?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-all" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#0d1117]/80 border border-gray-800 rounded-2xl py-4 pl-14 pr-6 text-white focus:border-blue-500 focus:ring-[4px] focus:ring-blue-500/10 outline-none transition-all placeholder-gray-600" placeholder="••••••••" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium transition-all disabled:opacity-50 mt-6 shadow-lg shadow-blue-600/10">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{<span>{isSignUp ? 'Create Account' : 'Sign In'}</span>}<ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-800/50 text-center">
            <p className="text-gray-500 text-sm font-medium">
              {isSignUp ? 'Already have a Zekodes account?' : "Don't have an account?"}
              <button onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }} className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors">{isSignUp ? 'Sign In' : 'Sign Up'}</button>
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-[11px] font-bold text-gray-600 tracking-widest uppercase">
          <Link to="/privacy" className="hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</Link>
          <div className="w-1 h-1 bg-gray-800 rounded-full" />
          <Link to="/terms" className="hover:text-gray-400 cursor-pointer transition-colors">Terms of Service</Link>
          <div className="w-1 h-1 bg-gray-800 rounded-full" />
          <span className="text-gray-500">v2.0.4-stable</span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;