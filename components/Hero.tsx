
import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.classList.add('active');
    }
  }, []);

  const scrollToWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('works');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 transition-colors duration-500">
      <div className="absolute inset-0 z-0 bg-[#f8f7f4] dark:bg-stone-950 transition-colors duration-500">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl aspect-video opacity-20 dark:opacity-10 pointer-events-none transition-transform duration-[3000ms] ease-out hover:scale-110">
           <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover grayscale dark:opacity-50" 
            alt="Background"
           />
        </div>
      </div>
      
      <div className="relative z-10 text-center max-w-5xl">
        <p className="text-sm uppercase tracking-[0.4em] text-stone-500 dark:text-stone-400 mb-8 reveal active font-bold">
          Senior UI/UX Designer
        </p>
        <h1 
          ref={titleRef}
          className="serif text-5xl md:text-8xl lg:text-9xl font-normal leading-[1.1] mb-12 reveal dark:text-stone-100"
        >
          Designing the <br /> 
          <span className="italic">Future</span> of Experience.
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 reveal active" style={{ transitionDelay: '0.4s' }}>
          <a 
            href="#works" 
            onClick={scrollToWorks}
            className="group relative px-12 py-6 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full text-xs font-bold hover:bg-black dark:hover:bg-white transition-all duration-500 uppercase tracking-[0.3em] shadow-2xl hover:shadow-stone-400/20 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Explore Portfolio</span>
            <div className="absolute inset-0 bg-white/10 dark:bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </a>
          <p className="text-stone-500 dark:text-stone-400 text-[13px] max-w-[240px] text-center md:text-left leading-relaxed font-light">
            Crafting fluid, high-fidelity digital products with a focus on human behavior and aesthetic clarity.
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <svg className="w-5 h-5 text-stone-900 dark:text-stone-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
