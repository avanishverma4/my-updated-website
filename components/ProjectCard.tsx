
import React, { useState, useRef } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation: 5 degrees max tilt
    const tiltX = (y - centerY) / centerY * -5;
    const tiltY = (x - centerX) / centerX * 5;
    
    setRotateX(tiltX);
    setRotateY(tiltY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group cursor-pointer reveal transition-all duration-700 p-6 rounded-[2.5rem] 
        bg-white/30 dark:bg-stone-900/30 backdrop-blur-2xl border border-white/40 dark:border-white/5 shadow-2xl shadow-stone-200/30 dark:shadow-none
        hover:bg-white/50 dark:hover:bg-stone-800/40 hover:shadow-stone-300/50 dark:hover:shadow-stone-950/50 hover:border-white/60 dark:hover:border-white/10
        ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
      style={{
        perspective: '1000px',
      }}
    >
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-800 rounded-[1.8rem] mb-8 transition-all duration-500 ease-out shadow-sm"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Blur-up placeholder */}
        {project.lowResImageUrl && (
          <img 
            src={project.lowResImageUrl}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
          />
        )}

        <img 
          src={project.imageUrl} 
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Floating Tags */}
        <div className="absolute top-6 left-6 flex gap-2" style={{ transform: 'translateZ(50px)' }}>
          {project.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-4 py-1.5 bg-white/40 dark:bg-stone-900/60 backdrop-blur-xl text-[9px] uppercase tracking-widest font-bold text-stone-900 dark:text-stone-100 rounded-full border border-white/40 dark:border-white/10 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              {tag}
            </span>
          ))}
        </div>
        
        {/* View Project Button Overlay */}
        <div className="absolute inset-0 bg-stone-900/10 dark:bg-black/20 backdrop-blur-[2px] flex items-center justify-center transition-all duration-700 opacity-0 group-hover:opacity-100">
          <div 
            className="bg-white/80 dark:bg-stone-100 text-stone-900 px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold border border-white dark:border-white shadow-2xl"
            style={{ transform: 'translateZ(80px)' }}
          >
            View Project
          </div>
        </div>
      </div>

      <div className="space-y-5 px-3 transition-transform duration-500 ease-out group-hover:translate-x-1">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-3 font-bold">
            {project.category}
          </p>
          <h3 className="serif text-3xl group-hover:italic transition-all duration-500 group-hover:text-stone-700 dark:group-hover:text-stone-200 leading-tight">
            {project.title}
          </h3>
        </div>
        
        <p className="text-stone-500 dark:text-stone-400 text-[15px] leading-relaxed max-w-sm line-clamp-2 font-light">
          {project.description}
        </p>

        <div className="pt-2">
          <a 
            href={project.link} 
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-bold pb-2 group/link overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover/link:text-stone-900 dark:group-hover/link:text-stone-100">Explore Case Study</span>
            <svg className="w-4 h-4 ml-3 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute bottom-0 left-0 w-full h-px bg-stone-200 dark:bg-stone-800 group-hover/link:bg-stone-900 dark:group-hover/link:bg-stone-100 transition-colors duration-500"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
