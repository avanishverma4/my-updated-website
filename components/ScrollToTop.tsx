
import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="group relative w-14 h-14 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 rounded-full flex items-center justify-center shadow-xl hover:shadow-stone-200/50 dark:hover:shadow-black/50 hover:border-stone-900 dark:hover:border-stone-100 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
        aria-label="Scroll to top"
      >
        <div className="absolute inset-0 bg-stone-900 dark:bg-stone-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <svg 
          className="w-5 h-5 relative z-10 group-hover:text-white dark:group-hover:text-stone-900 transition-colors duration-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default ScrollToTop;
