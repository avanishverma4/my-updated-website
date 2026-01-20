
import React, { useState, useEffect } from 'react';

interface NavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track scroll position to adjust navbar transparency/blur
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync body overflow with menu state to prevent background scrolling
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navItems = [
    { label: 'Works', id: 'works' },
    { label: 'Experience', id: 'experience' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Buffer for fixed header
      const topPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[85%] z-[80] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full
        ${isScrolled || isMenuOpen 
          ? 'bg-white/40 dark:bg-stone-900/40 backdrop-blur-2xl py-4 shadow-2xl shadow-stone-200/50 dark:shadow-none border border-white/30 dark:border-white/10' 
          : 'bg-transparent py-6'}`}
      >
        <div className="container mx-auto px-8 flex justify-between items-center">
          <a 
            href="#" 
            onClick={(e) => handleScrollTo(e, 'root')}
            className={`text-xl font-medium tracking-tight z-[90] transition-colors duration-500 
            ${isMenuOpen ? 'text-stone-900 dark:text-white' : isScrolled ? 'text-stone-800 dark:text-stone-200' : 'text-stone-900 dark:text-stone-100'}`}
          >
            Awanish <span className={isScrolled || isMenuOpen ? 'text-stone-400 dark:text-stone-500' : 'text-stone-500 dark:text-stone-400'}>Verma</span>
          </a>
          
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-12">
              {navItems.map((item) => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`} 
                  onClick={(e) => handleScrollTo(e, item.id)}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] hover:text-stone-500 dark:hover:text-stone-400 transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 dark:bg-stone-100 transition-all duration-500 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-100 transition-all duration-500 hover:scale-110 border border-transparent dark:border-white/10"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden z-[90] p-2 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Navigation"
            >
              <div className="w-8 h-4 relative flex flex-col justify-center items-end">
                <span className={`h-px bg-stone-900 dark:bg-stone-100 transition-all duration-500 absolute ${isMenuOpen ? 'w-8 rotate-45' : 'w-8 -translate-y-1.5'}`} />
                <span className={`h-px bg-stone-900 dark:bg-stone-100 transition-all duration-500 absolute ${isMenuOpen ? 'w-8 -rotate-45' : 'w-5 translate-y-1.5'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[70] bg-white/80 dark:bg-stone-950/90 backdrop-blur-3xl transition-all duration-[800ms] cubic-bezier(0.22,1,0.36,1) md:hidden 
        ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-10 px-6 pt-12">
          {navItems.map((item, idx) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={(e) => handleScrollTo(e, item.id)}
              className={`serif text-5xl font-light hover:italic transition-all duration-[800ms] transform tracking-tight dark:text-white
              ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `${isMenuOpen ? 200 + idx * 100 : 0}ms` }}
            >
              {item.label}
            </a>
          ))}
          
          <div 
            className={`pt-16 flex flex-col items-center gap-8 transition-all duration-1000 transform
            ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} 
            style={{ transitionDelay: `${isMenuOpen ? 600 : 0}ms` }}
          >
             <div className="w-8 h-px bg-stone-200 dark:bg-stone-800"></div>
             <div className="flex gap-10">
               <a href="https://www.linkedin.com/in/awanish-verma/" target="_blank" rel="noopener" className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>
               <a href="http://github.com/avanishverma4/" target="_blank" rel="noopener" className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold hover:text-black dark:hover:text-white transition-colors">GitHub</a>
               <a href="https://www.behance.net/avanishverma4" target="_blank" rel="noopener" className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold hover:text-black dark:hover:text-white transition-colors">Behance</a>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
