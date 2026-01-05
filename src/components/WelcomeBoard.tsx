import React from 'react';
import { X, GraduationCap, ArrowRight } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';

interface WelcomeBoardProps {
  onClose: () => void;
}

const WelcomeBoard: React.FC<WelcomeBoardProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleGoToAcademy = () => {
    navigate('/tutorial'); // Directs to the Tutorial/Academy page
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-[#1e1e1e] text-white p-6 rounded-xl shadow-2xl border border-blue-500/30 w-96 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-lg text-blue-400">
              <GraduationCap size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Welcome to Zekodes 👋</h3>
              <p className="text-xs text-gray-400">
                Let's get you started properly.
              </p>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            Build logic visually and turn it into real code. Start with our 
            <strong> Academy</strong> to learn the basics, and use <strong>Documentation</strong> anytime you need help or
            clarification.
          </p>

          <button
            onClick={handleGoToAcademy}
            className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg text-sm transition-all flex justify-center items-center gap-2"
          >
            Start Learning <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBoard;