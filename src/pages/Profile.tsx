import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { 
  ArrowLeft, 
  Loader2, 
  LogOut,  
  MessageSquare, 
  X, 
  Send,
  Save,
  Layers,
  GraduationCap,
  ChevronDown,
  Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  
  // UI State for Feedback
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
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
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
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
    setShowFeedback(false);
    setFeedbackText('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="flex items-center gap-3">
          <Loader2 className="animate-spin text-blue-500" size={20} />
          <span className="text-sm" style={{ color: '#666' }}>Loading profile...</span>
        </div>
      </div>
    );
  }

  // Inline styles for custom select options (Tailwind can't style native select internals)
  const selectStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: '#e0e0e0',
    fontSize: '13px',
    padding: '0',
    appearance: 'none',
    WebkitAppearance: 'none',
    outline: 'none',
    cursor: 'pointer',
    flex: 1,
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0a', fontFamily: "'SF Pro Display', 'Segoe UI', system-ui, sans-serif" }}>

      {/* Top Navigation Bar — matches IDE chrome */}
      <div className="flex items-center px-6 h-12 shrink-0" style={{ background: '#111', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link 
          to="/editor" 
          className="flex items-center gap-2 transition-all duration-200"
          style={{ color: '#666' }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#fff'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#666'}
        >
          <ArrowLeft size={15} />
          <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.02em' }}>Back to Editor</span>
        </Link>
        <div className="flex-1" />
        <span style={{ fontSize: '11px', color: '#444', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Profile</span>
        <div className="flex-1" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-start justify-center px-6 py-10">
        <div className="w-full" style={{ maxWidth: '480px' }}>

          {/* === PROFILE HEADER === */}
          <div className="flex items-center gap-5 mb-10">
            {/* Avatar */}
            <div className="relative">
              <div 
                className="rounded-full flex items-center justify-center"
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #4f7aef 0%, #7c5cfc 100%)',
                  boxShadow: '0 0 20px rgba(79,122,239,0.25)',
                }}
              >
                <span style={{ fontSize: '20px', fontWeight: 600, color: '#fff' }}>
                  {profile?.full_name?.charAt(0).toUpperCase() || '?'}
                </span>
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-0.5 right-0.5 rounded-full" style={{ width: '12px', height: '12px', background: '#22c55e', border: '2px solid #0a0a0a' }} />
            </div>

            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#f0f0f0', letterSpacing: '-0.02em' }}>
                {profile?.full_name || 'Developer'}
              </h1>
              <p style={{ fontSize: '12px', color: '#555', marginTop: '2px' }}>{profile?.email}</p>
            </div>
          </div>

          {/* === SETTINGS PANEL === */}
          <div 
            className="rounded-xl overflow-hidden"
            style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Section Label */}
            <div className="px-5 pt-4 pb-3">
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#4a4a4a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Preferences
              </span>
            </div>

            {/* Education Level Row */}
            <div 
              className="flex items-center px-5 py-3.5 transition-colors duration-150"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
            >
              <div className="flex items-center gap-2.5" style={{ width: '160px' }}>
                <GraduationCap size={14} style={{ color: '#4a4a4a' }} />
                <span style={{ fontSize: '13px', color: '#aaa', fontWeight: 450 }}>Education</span>
              </div>
              {/* Custom select wrapper */}
              <div 
                className="relative flex items-center ml-auto"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  padding: '6px 32px 6px 12px',
                  minWidth: '150px',
                }}
              >
                <select
                  style={selectStyle}
                  value={profile?.education_level}
                  onChange={(e) => setProfile({...profile, education_level: e.target.value})}
                >
                  <option value="school" style={{ background: '#1a1a1a', color: '#e0e0e0' }}>School</option>
                  <option value="college" style={{ background: '#1a1a1a', color: '#e0e0e0' }}>College</option>
                  <option value="graduate" style={{ background: '#1a1a1a', color: '#e0e0e0' }}>Graduate</option>
                </select>
                <ChevronDown size={13} className="absolute right-2.5" style={{ color: '#555', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Coding Mode Row */}
            <div 
              className="flex items-center px-5 py-3.5 transition-colors duration-150"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
            >
              <div className="flex items-center gap-2.5" style={{ width: '160px' }}>
                <Layers size={14} style={{ color: '#4a4a4a' }} />
                <span style={{ fontSize: '13px', color: '#aaa', fontWeight: 450 }}>Mode</span>
              </div>
              <div 
                className="relative flex items-center ml-auto"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  padding: '6px 32px 6px 12px',
                  minWidth: '200px',
                }}
              >
                <select
                  style={selectStyle}
                  value={profile?.mode}
                  onChange={(e) => setProfile({...profile, mode: e.target.value})}
                >
                  <option value="beginner" style={{ background: '#1a1a1a', color: '#e0e0e0' }}>Beginner — Enforced Logic</option>
                  <option value="advanced" style={{ background: '#1a1a1a', color: '#e0e0e0' }}>Advanced — Flexible</option>
                </select>
                <ChevronDown size={13} className="absolute right-2.5" style={{ color: '#555', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Mode description hint */}
            <div className="px-5 pt-2.5 pb-4">
              <p style={{ fontSize: '11px', color: '#444', lineHeight: '1.5', paddingLeft: '38px' }}>
                {profile?.mode === 'beginner' 
                  ? 'Structured constraints help you learn correct program flow and syntax.' 
                  : 'Full access to write and edit code freely without guardrails.'}
              </p>
            </div>
          </div>

          {/* === ACTION BUTTONS === */}
          <div className="flex gap-3 mt-5">
            {/* Sign Out */}
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 flex-1 transition-all duration-200 cursor-pointer"
              style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.15)',
                borderRadius: '10px',
                padding: '10px 0',
                color: '#ef4444',
                fontSize: '13px',
                fontWeight: 500,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.12)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(239,68,68,0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.06)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(239,68,68,0.15)';
              }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>

            {/* Save Changes */}
            <button 
              onClick={handleUpdateProfile}
              disabled={saving || saved}
              className="flex items-center justify-center gap-2 flex-1 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
              style={{
                background: saved ? 'rgba(34,197,94,0.12)' : 'rgba(79,122,239,0.12)',
                border: `1px solid ${saved ? 'rgba(34,197,94,0.3)' : 'rgba(79,122,239,0.25)'}`,
                borderRadius: '10px',
                padding: '10px 0',
                color: saved ? '#22c55e' : '#4f7aef',
                fontSize: '13px',
                fontWeight: 500,
                opacity: saving ? 0.6 : 1,
              }}
              onMouseEnter={e => {
                if (!saving && !saved) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(79,122,239,0.2)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(79,122,239,0.4)';
                }
              }}
              onMouseLeave={e => {
                if (!saving && !saved) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(79,122,239,0.12)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(79,122,239,0.25)';
                }
              }}
            >
              {saving ? (
                <Loader2 className="animate-spin" size={14} />
              ) : saved ? (
                <Check size={14} />
              ) : (
                <Save size={14} />
              )}
              <span>{saving ? 'Saving...' : saved ? 'Saved' : 'Save Changes'}</span>
            </button>
          </div>

          {/* === FEEDBACK SECTION === */}
          {showFeedback && (
            <div 
              className="mt-6 rounded-xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                animation: 'fadeSlideUp 0.3s ease forwards',
              }}
            >
              {/* Feedback Header */}
              <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2.5">
                  <div 
                    className="flex items-center justify-center rounded-lg"
                    style={{ width: '28px', height: '28px', background: 'rgba(234,179,8,0.1)' }}
                  >
                    <MessageSquare size={13} style={{ color: '#eab308' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: '#ddd', fontWeight: 500 }}>How are we doing?</p>
                    <p style={{ fontSize: '11px', color: '#4a4a4a', marginTop: '1px' }}>Your feedback helps us improve</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowFeedback(false)} 
                  className="flex items-center justify-center rounded-lg transition-colors duration-150 cursor-pointer"
                  style={{ width: '26px', height: '26px', color: '#4a4a4a' }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}
                >
                  <X size={13} />
                </button>
              </div>

              {/* Feedback Body */}
              <div className="p-4">
                <textarea 
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full rounded-lg resize-none transition-colors duration-150"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: '#ccc',
                    fontSize: '12.5px',
                    padding: '10px 12px',
                    height: '80px',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                  placeholder="Share your experience..."
                  onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(79,122,239,0.3)'}
                  onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.07)'}
                />
                <button 
                  onClick={submitFeedback}
                  disabled={!feedbackText.trim()}
                  className="flex items-center justify-center gap-2 w-full mt-2.5 rounded-lg transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-35"
                  style={{
                    background: feedbackText.trim() ? 'rgba(79,122,239,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${feedbackText.trim() ? 'rgba(79,122,239,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    color: feedbackText.trim() ? '#4f7aef' : '#555',
                    fontSize: '12px',
                    fontWeight: 500,
                    padding: '8px 0',
                  }}
                >
                  <Send size={12} />
                  <span>Send Feedback</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Keyframe injection for feedback slide-up */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;