import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { Lock, Mail, Loader2, Code2, ArrowRight } from 'lucide-react';

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
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#1e1e1e] items-center justify-center font-sans text-gray-300">
      <div className="w-full max-w-md p-8 bg-[#252526] rounded-lg border border-[#2b2b2b] shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600/20 rounded-xl">
              <Code2 className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to Zerocodes</h1>
          <p className="text-gray-500 text-sm">
            {isSignUp ? 'Create an account to start building' : 'Sign in to continue building'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-xs">
              {error}
            </div>
          )}
          
          {message && (
            <div className="p-3 bg-green-500/10 border border-green-500/50 rounded text-green-400 text-xs">
              {message}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400 uppercase">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1e1e1e] border border-[#333] rounded-md py-2 pl-10 pr-4 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-600"
                placeholder="dev@zerocodes.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400 uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1e1e1e] border border-[#333] rounded-md py-2 pl-10 pr-4 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-600"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </span>
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }}
            className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;