import React from 'react';
import { X, MessageSquareHeart, ExternalLink } from 'lucide-react';

interface FeedbackPopupProps {
  message: string;
  onClose: () => void;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1e1e1e] border border-blue-500/30 w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 relative">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center text-blue-500 shadow-inner">
            <MessageSquareHeart size={40} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white leading-tight">{message}</h2>
            <p className="text-gray-400 text-sm">Help us improve Zekodes (2 minutes)</p>
          </div>

          <div className="w-full space-y-3">
            <a 
              href="https://forms.gle/xz9LQQ3wrvWKUCJC7" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              Give Feedback <ExternalLink size={16} />
            </a>
            <button 
              onClick={onClose}
              className="w-full py-2 text-gray-500 hover:text-gray-300 font-medium transition-colors text-sm"
            >
              No, thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPopup;