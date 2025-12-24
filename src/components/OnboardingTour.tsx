import React from 'react';
import { Rocket, Sparkles, Play } from 'lucide-react';

interface OnboardingTourProps {
  onComplete: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl bg-[#1e1e1e] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-800 bg-[#252526] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/20 rounded-2xl text-blue-500">
              <Rocket size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Welcome to Zekodes
              </h2>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Quick Start Guide</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full">
            <Sparkles className="text-blue-500" size={14} />
            <span className="text-[10px] font-bold text-blue-400 uppercase">First Time Setup</span>
          </div>
        </div>

        {/* Video Body */}
        <div className="bg-black aspect-video flex items-center justify-center relative group">
          <video 
            className="w-full h-full" 
            controls 
            autoPlay 
            muted
            playsInline
            src="/zekodes-tutorial.mp4" 
          />
        </div>

        {/* Action Footer */}
        <div className="px-8 py-6 bg-[#252526] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1">
             <p className="text-sm text-gray-300 font-medium italic">"Watch how to drag, sync, and run in 14 seconds."</p>
             <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
               <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Drag Blocks</span>
               <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Sync Code</span>
               <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Run in Cloud</span>
             </div>
          </div>
          <button 
            onClick={onComplete}
            className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-600/20 flex items-center gap-2 whitespace-nowrap"
          >
            Start Building Now <Play size={16} className="fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;



