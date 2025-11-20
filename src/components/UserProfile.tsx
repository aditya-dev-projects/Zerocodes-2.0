import React from 'react';
import { User, LogOut } from 'lucide-react';
import { supabase } from '../services/supabase';

interface UserProfileProps {
  userEmail: string | undefined;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userEmail, onClose }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onClose();
  };

  return (
    <div className="absolute bottom-14 left-14 z-50 w-64 bg-[#252526] border border-[#2b2b2b] rounded-lg shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-[#333]">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          {userEmail?.[0].toUpperCase()}
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="text-sm font-bold text-white truncate">Developer</div>
          <div className="text-xs text-gray-500 truncate" title={userEmail}>{userEmail}</div>
        </div>
      </div>
      
      <button
        onClick={handleLogout}
        className="w-full flex items-center px-3 py-2 text-sm text-red-400 hover:bg-[#2b2b2b] rounded transition-colors"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </button>
    </div>
  );
};

export default UserProfile;