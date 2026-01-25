import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { 
  User, 
  Code, 
  Mail, 
  ArrowLeft, 
  Loader2, 
  LogOut, 
  BookOpen, 
  MessageSquare, 
  X, 
  Send,
  Save,
  Layers,
  GraduationCap
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  
  // UI State for Feedback
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch from the new user_profiles table
        const { data } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (data) {
          setProfile({ ...data, email: user.email });
        }
      }
      setLoading(false);
    };

    fetchProfile();
    
    // Check if we should show the feedback box for returning users
    const hasVisited = localStorage.getItem('zerocodes_has_visited');
    if (hasVisited) {
      setShowFeedback(true);
    } else {
      localStorage.setItem('zerocodes_has_visited', 'true');
    }
  }, []);

  const handleUpdateProfile = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          education_level: profile.education_level,
          mode: profile.mode
        })
        .eq('user_id', profile.user_id);

      if (error) throw error;
      alert("Profile updated successfully! Constraints will be applied in the editor.");
    } catch (err: any) {
      console.error("Update failed:", err.message);
      alert("Failed to update profile: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await supabase.auth.signOut();
      localStorage.removeItem('zekodes_setup_complete');
      navigate('/');
    }
  };

  const submitFeedback = () => {
    if (!feedbackText.trim()) return;
    console.log("Feedback submitted:", feedbackText);
    alert("Thank you for your feedback!");
    setShowFeedback(false);
    setFeedbackText('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-500">
        <Loader2 className="animate-spin mr-2" /> Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans flex flex-col items-center relative">
      
      <div className="w-full max-w-2xl">
        <Link to="/editor" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Back to Editor
        </Link>
        
        {/* Profile Card */}
        <div className="bg-[#0c0c0c] rounded-[2rem] border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
              {profile?.full_name?.charAt(0).toUpperCase() || <User />}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{profile?.full_name || 'Developer'}</h1>
              <p className="text-gray-500">{profile?.email}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Education Level Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 ml-1">
                <GraduationCap size={14} /> Education Level
              </label>
              <select
                className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-4 px-5 focus:outline-none focus:border-blue-500/30 transition-all appearance-none cursor-pointer"
                value={profile?.education_level}
                onChange={(e) => setProfile({...profile, education_level: e.target.value})}
              >
                <option value="school" className="bg-[#0c0c0c]">School</option>
                <option value="college" className="bg-[#0c0c0c]">College</option>
                <option value="graduate" className="bg-[#0c0c0c]">Graduate</option>
              </select>
            </div>

            {/* Mode Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 ml-1">
                <Layers size={14} /> Coding Mode
              </label>
              <select
                className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-4 px-5 focus:outline-none focus:border-purple-500/30 transition-all appearance-none cursor-pointer"
                value={profile?.mode}
                onChange={(e) => setProfile({...profile, mode: e.target.value})}
              >
                <option value="beginner" className="bg-[#0c0c0c]">Beginner (Enforced Logic)</option>
                <option value="advanced" className="bg-[#0c0c0c]">Advanced (Flexible Coding)</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-red-400 transition-all cursor-pointer group"
              >
                <LogOut size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Sign Out</span>
              </button>

              <button 
                onClick={handleUpdateProfile}
                disabled={saving}
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white text-black hover:bg-gray-100 transition-all font-medium disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- FEEDBACK BOX --- */}
        {showFeedback && (
          <div className="bg-[#0c0c0c] rounded-[1.5rem] border border-white/5 p-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-500/10 p-2 rounded-lg text-yellow-500">
                <MessageSquare size={20} />
              </div>
              <h3 className="font-semibold">How are we doing?</h3>
              <button 
                onClick={() => setShowFeedback(false)} 
                className="ml-auto text-gray-600 hover:text-gray-400"
              >
                <X size={16} />
              </button>
            </div>
            
            <textarea 
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 resize-none h-24 mb-3"
              placeholder="Tell us about your experience using Zekodes..."
            />
            
            <button 
              onClick={submitFeedback}
              className="flex items-center justify-center gap-2 w-full py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Send size={16} /> Send Feedback
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Profile;