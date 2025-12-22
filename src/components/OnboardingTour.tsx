import React from 'react';
import { X, Rocket, MonitorPlay, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingTourProps {
  onComplete: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl bg-[#1e1e1e] border border-gray-800 shadow-2xl overflow-hidden rounded-lg animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#252526] border-b border-gray-800">
          <div className="flex items-center gap-2">
            <MonitorPlay className="text-blue-500 w-5 h-5" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Welcome to Zekodes: Quick Start
            </h2>
          </div>
          <button onClick={onComplete} className="p-1 hover:bg-red-500/20 hover:text-red-500 rounded transition-all text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* Video Body */}
        <div className="bg-black aspect-video flex items-center justify-center">
          <video className="w-full h-full" controls autoPlay src="/zekodes-tutorial.mp4" />
        </div>

        {/* Footer with Redirection Text */}
        <div className="px-6 py-6 bg-[#252526] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-xl flex-1">
               <p className="text-sm text-blue-400 font-medium flex items-center gap-2">
                 <Rocket size={16} /> 
                 To learn more in-depth topics, visit the Tutorial Page!
               </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => { onComplete(); navigate('/tutorial'); }}
                className="flex items-center gap-2 bg-[#333] hover:bg-[#444] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all"
              >
                Go to Academy <ExternalLink size={14} />
              </button>
              <button 
                onClick={onComplete}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg shadow-blue-500/20"
              >
                Start Coding
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;