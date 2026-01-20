
import React, { useState, useEffect } from 'react';

interface LoaderProps {
  isDarkMode: boolean;
  onFinish: () => void;
}

const Loader: React.FC<LoaderProps> = ({ isDarkMode, onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [activePhase, setActivePhase] = useState(0);

  const phases = ["Concept", "Architect", "Refine"];

  useEffect(() => {
    const duration = 2400; 
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onFinish, 1200); // Duration of the split animation
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onFinish]);

  useEffect(() => {
    if (progress < 33) setActivePhase(0);
    else if (progress < 66) setActivePhase(1);
    else setActivePhase(2);
  }, [progress]);

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none overflow-hidden">
      {/* Split Panels */}
      <div 
        className={`absolute inset-y-0 left-0 w-1/2 transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-auto
          ${isExiting ? '-translate-x-full' : 'translate-x-0'}
          ${isDarkMode ? 'bg-stone-950' : 'bg-[#f8f7f4]'}`}
      />
      <div 
        className={`absolute inset-y-0 right-0 w-1/2 transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-auto
          ${isExiting ? 'translate-x-full' : 'translate-x-0'}
          ${isDarkMode ? 'bg-stone-950' : 'bg-[#f8f7f4]'}`}
      />

      {/* Content Container */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500
          ${isExiting ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Kinetic Name Reveal */}
        <div className="relative mb-12 h-16 overflow-hidden flex items-center">
          <div className={`flex flex-col transition-transform duration-700 ease-out ${progress > 5 ? 'translate-y-0' : 'translate-y-full'}`}>
             <h2 className={`serif text-3xl md:text-5xl tracking-tighter ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>
              Awanish <span className="italic font-normal text-stone-500">Verma</span>
            </h2>
          </div>
          {/* Decorative line under name */}
          <div 
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-stone-500/30 transition-all duration-1000 delay-500
              ${progress > 10 ? 'w-full' : 'w-0'}`}
          />
        </div>

        {/* Phase Cycler */}
        <div className="h-4 overflow-hidden mb-12">
          <div 
            className="flex flex-col items-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateY(-${activePhase * 100}%)` }}
          >
            {phases.map((phase) => (
              <span 
                key={phase} 
                className="text-[10px] uppercase tracking-[0.6em] font-bold h-4 flex items-center text-stone-400"
              >
                {phase}
              </span>
            ))}
          </div>
        </div>

        {/* Rolling Counter & Progress Bar */}
        <div className="relative w-64">
           {/* Progress Line */}
           <div className="w-full h-[1px] bg-stone-200 dark:bg-stone-800 relative overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-stone-900 dark:bg-stone-100 transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
           </div>
           
           {/* Percentage label floating right */}
           <div className="absolute -bottom-8 right-0 overflow-hidden h-4">
              <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 tabular-nums">
                {Math.round(progress).toString().padStart(3, '0')}%
              </span>
           </div>
        </div>

        {/* Minimalist Graphic Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] aspect-square border border-stone-500/5 rounded-full pointer-events-none scale-150 animate-[pulse_8s_infinite_ease-in-out]"></div>
      </div>

      {/* Footer metadata */}
      <div className={`absolute bottom-12 left-0 right-0 px-12 flex justify-between items-end transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col gap-2">
           <span className={`text-[8px] uppercase tracking-[0.4em] font-bold ${isDarkMode ? 'text-stone-700' : 'text-stone-300'}`}>
            Product Experience
          </span>
          <div className={`w-12 h-px ${isDarkMode ? 'bg-stone-900' : 'bg-stone-200'}`}></div>
        </div>
        <div className="flex flex-col items-end gap-2">
           <span className={`text-[8px] uppercase tracking-[0.4em] font-bold ${isDarkMode ? 'text-stone-700' : 'text-stone-300'}`}>
            © {new Date().getFullYear()}
          </span>
          <span className={`text-[8px] uppercase tracking-[0.2em] font-medium ${isDarkMode ? 'text-stone-800' : 'text-stone-400'}`}>
            All Rights Reserved
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
