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
  Send 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { Profile as ProfileType } from '../types';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // State for Onboarding/Feedback Logic
  const [showWelcome, setShowWelcome] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setProfile({ ...data, email: user.email });
        }
      }
      setLoading(false);
    };

    // --- ONBOARDING LOGIC START ---
    const checkFirstTimeUser = () => {
      const hasVisited = localStorage.getItem('zerocodes_has_visited');
      
      if (!hasVisited) {
        // Case 1: First time user -> Show Welcome
        setShowWelcome(true);
        localStorage.setItem('zerocodes_has_visited', 'true');
      } else {
        // Case 2: Returning user -> Show Feedback
        setShowFeedback(true);
      }
    };
    // --- ONBOARDING LOGIC END ---

    fetchProfile();
    checkFirstTimeUser();
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await supabase.auth.signOut();
      navigate('/login');
    }
  };

  const submitFeedback = () => {
    if (!feedbackText.trim()) return;
    // Here you would send 'feedbackText' to your backend/Supabase
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
      
      {/* --- WELCOME MODAL (First Time Only) --- */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0c0c0c] border border-blue-500/30 rounded-2xl max-w-md w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowWelcome(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-6 mx-auto text-blue-400">
              <BookOpen size={32} />
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-2">Welcome to Zerocodes!</h2>
            <p className="text-gray-400 text-center mb-8">
              Since you're new here, we recommend checking out our Academy to master the basics of block-based coding.
            </p>
            
            <div className="flex flex-col gap-3">
              <Link 
                to="/academy" 
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-center font-medium transition-colors"
                onClick={() => setShowWelcome(false)}
              >
                Go to Academy
              </Link>
              <button 
                onClick={() => setShowWelcome(false)}
                className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-center font-medium transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

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
              <h1 className="text-3xl font-bold tracking-tight">{profile?.full_name || 'User'}</h1>
              <p className="text-gray-500">Developer Profile</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="bg-gray-800/50 p-3 rounded-full text-blue-400">
                <User size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Full Name</p>
                <p className="text-lg font-medium">{profile?.full_name || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="bg-gray-800/50 p-3 rounded-full text-green-400">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Email Address</p>
                <p className="text-lg font-medium">{profile?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="bg-gray-800/50 p-3 rounded-full text-purple-400">
                <Code size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Coding Experience</p>
                <span className={`inline-flex mt-1 px-3 py-1 rounded-full text-sm font-medium border ${
                  profile?.experience_level === 'Pro' 
                    ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' 
                    : profile?.experience_level === 'Intermediate' 
                    ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' 
                    : 'bg-green-500/10 text-green-300 border-green-500/20'
                }`}>
                  {profile?.experience_level || 'Beginner'}
                </span>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="w-full mt-4 flex items-center justify-center gap-3 p-4 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-red-400 transition-all cursor-pointer group"
            >
              <LogOut size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* --- FEEDBACK BOX (Returning Users Only) --- */}
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
              placeholder="Tell us about your experience using Zerocodes..."
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