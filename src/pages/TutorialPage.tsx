import React, { useState } from 'react';
import { 
  X, Rocket, Play, ArrowLeft, GraduationCap, 
  MonitorPlay, Zap, Code2, Clock, Sparkles 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeedbackPopup from '../components/FeedbackPopup'; // Import feedback component

const TutorialPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [showFeedback, setShowFeedback] = useState(false); // Feedback state

  const tutorials = [
    {
      id: 'getting-started',
      title: 'Zekodes: Getting Started',
      description: 'Watch how to drag blocks, sync code, and run in the cloud.',
      videoSrc: '/zekodes-tutorial.mp4',
      thumbnail: '/tutorial-thumb.png', // Placeholder for your thumbnail image
      duration: '0:14',
      tag: 'Fundamentals'
    },
    {
      id: 'logic-flow',
      title: 'Logic Flow Mastery',
      description: 'Coming soon: Learn how to use complex nested conditionals.',
      isComingSoon: true
    },
    {
      id: 'ai-features',
      title: 'AI Power Tools',
      description: 'Coming soon: Deep dive into AI Fix and Explain features.',
      isComingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans">
      {/* --- Academy Header --- */}
      <header className="border-b border-gray-800 bg-[#161b22] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/editor')} 
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2 text-gray-400 hover:text-white"
            >
              <ArrowLeft size={24} />
              <span className="font-bold text-sm">Back to Editor</span>
            </button>
            <div className="h-8 w-px bg-gray-800 mx-2" />
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Learn From Here</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Zekodes Mastery Academy</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Added Give Feedback Button in Header */}
            <a 
              href="https://forms.gle/xz9LQQ3wrvWKUCJC7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-gray-400 hover:text-white border border-gray-700 px-4 py-2 rounded-lg transition-all"
            >
              Give Feedback
            </a>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full">
              <GraduationCap className="text-blue-500" size={18} />
              <span className="text-sm font-bold text-blue-400">Academy Enrollment Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* --- Video Gallery Grid --- */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((video) => (
            <div 
              key={video.id} 
              onClick={() => !video.isComingSoon && setSelectedVideo(video)}
              className={`group bg-[#161b22] border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 ${
                video.isComingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer'
              }`}
            >
              {/* Thumbnail Container */}
              <div className="aspect-video relative bg-[#0d1117] flex items-center justify-center">
                {video.isComingSoon ? (
                  <div className="flex flex-col items-center gap-2">
                    <Clock className="text-gray-700" size={32} />
                    <span className="text-[10px] font-bold text-gray-700 tracking-widest uppercase">Coming Soon</span>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <Play className="text-white fill-current opacity-0 group-hover:opacity-100 transition-all z-20" size={40} />
                    <div className="absolute bottom-3 right-3 z-20 bg-black/80 px-2 py-1 rounded text-[10px] font-bold text-white">
                      {video.duration}
                    </div>
                  </>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest px-2 py-1 bg-blue-500/10 rounded">
                    {video.isComingSoon ? 'Stay Tuned' : video.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Academy Feature Banner --- */}
        <div className="mt-20 p-12 bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-gray-800 rounded-[2.5rem] text-center">
          <Sparkles className="text-blue-500 mx-auto mb-4" size={40} />
          <h2 className="text-3xl font-black text-white mb-2 text-center">Master the Visual Code</h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed text-center">
            New lessons are being recorded every week. Check back soon for more advanced tutorials on variables, loops, and AI-driven debugging.
          </p>
        </div>
      </main>

      {/* --- YouTube Style Player Modal --- */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl bg-[#1e1e1e] border border-gray-800 shadow-2xl overflow-hidden rounded-lg">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#252526] border-b border-gray-800">
              <div className="flex items-center gap-2">
                <MonitorPlay className="text-blue-500 w-5 h-5" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">{selectedVideo.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedVideo(null)} 
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Body */}
            <div className="bg-black aspect-video flex items-center justify-center">
              <video 
                className="w-full h-full" 
                controls 
                autoPlay 
                src={selectedVideo.videoSrc} 
                onEnded={() => setShowFeedback(true)} // Trigger feedback when tutorial completes
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[#252526] flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 max-w-md">
                {selectedVideo.description}
              </p>
              <button 
                onClick={() => navigate('/editor')} 
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                Start Coding Now <Rocket size={14} className="inline ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Milestone Feedback Popup triggered on video completion */}
      {showFeedback && (
        <FeedbackPopup 
          message="🎓 You just completed a tutorial!" 
          onClose={() => setShowFeedback(false)} 
        />
      )}
    </div>
  );
};

export default TutorialPage;