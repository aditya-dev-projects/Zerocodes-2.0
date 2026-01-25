import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { User, BookOpen, Layers, ArrowRight, Loader2 } from 'lucide-react';

const CreateProfile: React.FC = () => {
  // Initialize states with empty strings for strict validation
  const [fullName, setFullName] = useState('');
  const [education, setEducation] = useState<'school' | 'college' | 'graduate' | ''>('');
  const [mode, setMode] = useState<'beginner' | 'advanced' | ''>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // STRICT VALIDATION: Ensure all fields have values before enabling the button
  const isFormValid = fullName.trim().length > 0 && education !== '' && mode !== '';

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final check to prevent submission of invalid forms
    if (!isFormValid) return;

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user found.");

      const { error } = await supabase
        .from('user_profiles')
        .insert([
          { 
            user_id: user.id, 
            full_name: fullName.trim(), 
            education_level: education, 
            mode: mode 
          }
        ]);

      if (error) throw error;

      // Mark setup as complete and move to editor
      localStorage.setItem('zekodes_setup_complete', 'true');
      navigate('/editor');
    } catch (err: any) {
      console.error("Profile creation error:", err.message);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-medium mb-2 tracking-tight">Setup your profile</h1>
          <p className="text-gray-400 font-light text-sm">Fill in all details to customize your logical coding experience.</p>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* FULL NAME FIELD */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-gray-500 ml-1 tracking-widest">Full Name</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input
                type="text" 
                required
                placeholder="Type your name..."
                autoFocus
                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/30 transition-all"
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} // Fixed typing reactivity
              />
            </div>
          </div>

          {/* EDUCATION LEVEL FIELD */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-gray-500 ml-1 tracking-widest">Education Level</label>
            <div className="relative">
              <BookOpen className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <select
                required
                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-14 pr-5 appearance-none focus:outline-none focus:border-blue-500/30 text-white cursor-pointer"
                value={education} 
                onChange={(e) => setEducation(e.target.value as any)}
              >
                <option value="" disabled className="bg-[#0c0c0c]">Select your level</option>
                <option value="school" className="bg-[#0c0c0c]">School</option>
                <option value="college" className="bg-[#0c0c0c]">College</option>
                <option value="graduate" className="bg-[#0c0c0c]">Graduate</option>
              </select>
            </div>
          </div>

          {/* MODE SELECTION FIELD */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-gray-500 ml-1 tracking-widest">Editor Mode</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setMode('beginner')}
                className={`py-4 rounded-2xl border transition-all text-sm font-medium ${
                  mode === 'beginner' 
                  ? 'bg-blue-600/10 border-blue-500 text-blue-400' 
                  : 'bg-white/[0.01] border-white/5 text-gray-600 hover:border-white/10'
                }`}
              >
                Beginner
              </button>
              <button
                type="button"
                onClick={() => setMode('advanced')}
                className={`py-4 rounded-2xl border transition-all text-sm font-medium ${
                  mode === 'advanced' 
                  ? 'bg-purple-600/10 border-purple-500 text-purple-400' 
                  : 'bg-white/[0.01] border-white/5 text-gray-600 hover:border-white/10'
                }`}
              >
                Advanced
              </button>
            </div>
            <p className="text-[10px] text-gray-600 px-1 mt-2 leading-relaxed">
              {mode === 'beginner' && '★ Beginner: Enforces C-syntax rules and auto-braces.'}
              {mode === 'advanced' && '✦ Advanced: Flexible block placement for free logic.'}
              {mode === '' && 'Choose a mode to start building logic.'}
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit" 
            disabled={loading || !isFormValid}
            className={`w-full font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 ${
              isFormValid 
              ? 'bg-white text-black hover:bg-gray-200 active:scale-[0.98] shadow-lg shadow-white/5' 
              : 'bg-white/5 text-gray-700 cursor-not-allowed border border-white/5'
            }`}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>Complete Setup <ArrowRight size={20} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;