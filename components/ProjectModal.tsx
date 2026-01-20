
import React, { useEffect, useState } from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose, isDarkMode }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure the DOM is ready for transitions
      const timer = setTimeout(() => setAnimateIn(true), 10);
      document.body.style.overflow = 'hidden';
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShouldRender(false), 500);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender || !project) return null;

  return (
    <div 
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 transition-all duration-500 ease-out
        ${animateIn ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/40 dark:bg-black/60 backdrop-blur-3xl cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Content Container */}
      <div 
        className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-stone-900 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] transform
          ${animateIn ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-20 scale-95 opacity-0'}`}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-10 p-4 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:rotate-90 transition-all duration-500 group"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Side */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[90vh] overflow-hidden bg-stone-100 dark:bg-stone-800">
            <img 
              src={project.imageUrl} 
              alt={project.imageAlt}
              className={`w-full h-full object-cover transition-all duration-[1500ms] delay-300 transform
                ${animateIn ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
            />
          </div>

          {/* Details Side */}
          <div className="p-10 md:p-20 flex flex-col justify-center">
            <div className={`transition-all duration-700 delay-500 transform ${animateIn ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
              <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-6">
                {project.category}
              </p>
              <h2 className="serif text-4xl md:text-6xl mb-10 leading-tight dark:text-stone-100">
                {project.title}
              </h2>
            </div>

            <div className={`space-y-8 transition-all duration-700 delay-700 transform ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl leading-relaxed font-light">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {project.tags.map(tag => (
                  <span key={tag} className="px-5 py-2 bg-stone-50 dark:bg-stone-800 text-stone-400 text-[10px] uppercase tracking-widest font-bold rounded-full border border-stone-100 dark:border-stone-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-10">
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center px-10 py-5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 shadow-xl hover:shadow-stone-200/50 dark:hover:shadow-black/50"
                >
                  <span className="relative z-10">Visit Live Project</span>
                  <div className="absolute inset-0 bg-white/10 dark:bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
