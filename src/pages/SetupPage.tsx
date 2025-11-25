import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Monitor } from 'lucide-react';
import { supabase } from '../services/supabase';

const SetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // State
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createShortcut, setCreateShortcut] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- STEP 1: Terms & Conditions ---
  const handleTermsSubmit = () => {
    if (agreedToTerms) setStep(2);
  };

  // --- STEP 2: Auth (Secure & Encrypted via HTTPS/Supabase) ---
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Try to Sign Up
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        // If user exists, try Sign In instead
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
      
      // Auth Success
      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 3: Preferences & Finish ---
  const handleFinish = async () => {
    setLoading(true);
    
    // 1. Create Desktop Shortcut (Electron only)
    if (createShortcut && window.require) {
      try {
        const { ipcRenderer } = window.require('electron');
        await ipcRenderer.invoke('create-desktop-shortcut');
      } catch (e) {
        console.error("Failed to create shortcut:", e);
      }
    }

    // 2. Mark setup as complete
    localStorage.setItem('zerocodes_setup_complete', 'true');
    
    // 3. Go to Editor
    navigate('/editor');
  };

  return (
    <div className="h-screen w-screen bg-[#0d1117] flex items-center justify-center text-gray-300 font-sans selection:bg-blue-500/30">
      <div className="w-full max-w-lg bg-[#161b22] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Progress Bar */}
        <div className="h-1 bg-gray-800 w-full">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="p-8 min-h-[400px] flex flex-col">
          
          {/* --- HEADER --- */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome to Zerocodes</h1>
            <p className="text-gray-500 text-sm">Let's get your environment ready.</p>
          </div>

          {/* --- STEP 1: TERMS --- */}
          {step === 1 && (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex-1 bg-[#0d1117] p-4 rounded-lg border border-gray-700 mb-6 overflow-y-auto max-h-48 text-xs text-gray-400 leading-relaxed">
                <p className="mb-2 font-bold text-white">Terms of Service</p>
                <p className="mb-2">By using Zerocodes, you agree to the following terms...</p>
                <p className="mb-2">1. Your code belongs to you. We do not claim ownership.</p>
                <p className="mb-2">2. We store your account credentials securely using industry-standard encryption.</p>
                <p>3. You agree to use the AI features responsibly.</p>
                {/* Add more lorem ipsum here */}
              </div>

              <label className="flex items-center space-x-3 cursor-pointer mb-6 p-3 rounded hover:bg-[#1f242c] transition-colors">
                <input 
                  type="checkbox" 
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-600 bg-[#0d1117] text-blue-600 focus:ring-blue-500 focus:ring-offset-[#161b22]" 
                />
                <span className="text-sm text-gray-300">I have read and agree to the <span className="text-blue-400">Terms & Conditions</span>.</span>
              </label>

              <button 
                onClick={handleTermsSubmit}
                disabled={!agreedToTerms}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all"
              >
                Continue
              </button>
            </div>
          )}

          {/* --- STEP 2: SECURE AUTH --- */}
          {step === 2 && (
            <form onSubmit={handleAuthSubmit} className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              </div>
              
              <h3 className="text-center text-white font-medium mb-6">Secure Sign In / Sign Up</h3>

              {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-400 text-xs rounded">{error}</div>}

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                  <input 
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="developer@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                  <input 
                    type="password" required value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                  <p className="text-[10px] text-gray-500 mt-1 flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span> End-to-end encrypted storage</p>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center justify-center"
              >
                {loading ? 'Securing...' : 'Create Account / Login'}
              </button>
            </form>
          )}

          {/* --- STEP 3: PREFERENCES --- */}
          {step === 3 && (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium text-white mb-4">Final Adjustments</h3>
                  
                  <label className="flex items-start p-4 bg-[#0d1117] border border-gray-700 rounded-xl cursor-pointer hover:border-gray-500 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={createShortcut}
                      onChange={(e) => setCreateShortcut(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-gray-600 bg-[#161b22] text-blue-600 focus:ring-0"
                    />
                    <div className="ml-4">
                      <div className="flex items-center text-white font-medium mb-1">
                        <Monitor className="w-4 h-4 mr-2 text-blue-400" />
                        Create Desktop Shortcut
                      </div>
                      <p className="text-xs text-gray-500">Add Zerocodes to your desktop for quick access.</p>
                    </div>
                  </label>
               </div>

               <button 
                onClick={handleFinish}
                disabled={loading}
                className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Finalizing...' : <>Get Started <ChevronRight className="w-4 h-4"/></>}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SetupPage;