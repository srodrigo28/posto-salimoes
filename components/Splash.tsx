import React from 'react';
import logo from '../assets/logo.jpeg';

const Splash: React.FC<{ onDone?: () => void }> = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 splash-bg -z-10" aria-hidden="true" />

      <div className="flex flex-col items-center gap-4 animate-fade-in-out">
        <div className="w-28 h-28 rounded-full bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center shadow-lg">
          <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
        </div>
        <h2 className="text-xl font-bold text-[#ef4444]">Solimões Plus</h2>
      </div>

      <style>{`
        .splash-bg {
          background: radial-gradient(circle at 20% 30%, rgba(239,68,68,0.06), transparent 25%),
                      linear-gradient(135deg, #fff5f5 0%, #ffffff 60%);
          backdrop-filter: blur(0.5px);
          animation: bgShift 4s ease-in-out infinite;
        }

        @keyframes bgShift {
          0% { background-position: 0% 0%, 0% 0%; }
          50% { background-position: 20% 10%, 10% 5%; }
          100% { background-position: 0% 0%, 0% 0%; }
        }

        @keyframes fadeInOut { 0% { opacity: 0 } 10% { opacity: 1 } 85% { opacity: 1 } 100% { opacity: 0 } }
        .animate-fade-in-out { animation: fadeInOut 1.2s ease-in-out forwards; }
      `}</style>
    </div>
  );
};

export default Splash;
