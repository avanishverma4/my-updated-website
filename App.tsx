
import React, { useEffect, useState, useRef } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ExperienceSection from './components/ExperienceSection';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import { PROJECTS, SKILLS } from './constants';

const App: React.FC = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const INITIAL_PROJECT_COUNT = 4;
  const displayedProjects = showAllProjects ? PROJECTS : PROJECTS.slice(0, INITIAL_PROJECT_COUNT);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  const emailAddress = "avanishverma4@gmail.com";

  // Persist theme and update document root
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Initialize scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const observeElements = () => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };

    observeElements();
    
    const timeout = setTimeout(observeElements, 50);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [showAllProjects]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleShowAll = () => {
    setShowAllProjects(true);
    setTimeout(() => {
      if (projectsGridRef.current) {
        const grid = projectsGridRef.current;
        const yOffset = -100;
        const y = grid.getBoundingClientRect().bottom + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className={`relative antialiased text-stone-900 bg-[#f8f7f4] selection:bg-stone-200 dark:bg-stone-950 dark:text-stone-100 transition-colors duration-500`}>
      <ScrollProgress />
      <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main>
        <Hero />

        {/* Portfolio Section */}
        <section id="works" className="py-32 bg-white dark:bg-stone-900/20 transition-colors duration-500">
          <div className="container mx-auto px-6 md:px-12">
            <header className="flex flex-col md:flex-row items-baseline justify-between mb-24 reveal">
              <h2 className="serif text-5xl md:text-8xl leading-tight">
                Selected <br /><span className="italic font-normal">Works</span>
              </h2>
              <div className="text-stone-400 dark:text-stone-500 uppercase tracking-widest text-[11px] font-bold mt-4 md:mt-0">
                (2021 — 2024 Portfolio)
              </div>
            </header>

            <div ref={projectsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
              {displayedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {!showAllProjects && PROJECTS.length > INITIAL_PROJECT_COUNT && (
              <div className="mt-32 flex justify-center reveal">
                <button 
                  onClick={handleShowAll}
                  className="group flex flex-col items-center gap-6 focus:outline-none"
                  aria-label="View all projects"
                >
                  <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                    View Entire Portfolio
                  </span>
                  <div className="w-px h-20 bg-stone-200 dark:bg-stone-800 group-hover:bg-stone-900 dark:group-hover:bg-stone-100 transition-all duration-700 scale-y-100 group-hover:scale-y-150 origin-top"></div>
                </button>
              </div>
            )}
          </div>
        </section>

        <ExperienceSection />

        {/* About & Expertise Section */}
        <section id="about" className="py-40 bg-[#f8f7f4] dark:bg-stone-950 transition-colors duration-500">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              <article className="lg:col-span-7 reveal">
                <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-stone-400 mb-10">Philosophy</p>
                <h2 className="serif text-4xl md:text-6xl leading-[1.15] mb-12">
                  Sculpting interfaces that prioritize <span className="italic font-normal">humanity</span> and effortless utility.
                </h2>
                <div className="space-y-8 text-stone-600 dark:text-stone-400 leading-relaxed text-lg max-w-2xl font-light">
                  <p>
                    I am Awanish Verma, a Senior UI/UX Designer dedicated to the craft of building digital products that feel as natural as the physical world.
                  </p>
                  <p>
                    My approach is inspired by the "Lightship" philosophy: efficient, self-contained, and stunningly simple. I believe great design isn't about adding more—it's about removing noise until only core utility remains.
                  </p>
                </div>
              </article>
              
              <aside className="lg:col-span-5 reveal" style={{ transitionDelay: '200ms' }}>
                <div className="bg-white dark:bg-stone-900/40 p-12 border border-stone-100 dark:border-stone-800 shadow-sm rounded-xl">
                  <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-stone-400 mb-10">Expertise</p>
                  <div className="space-y-12">
                    {SKILLS.map((skillGroup, idx) => (
                      <div key={idx}>
                        <h4 className="serif text-xl mb-6 italic text-stone-700 dark:text-stone-300">{skillGroup.category}</h4>
                        <div className="flex flex-wrap gap-3">
                          {skillGroup.items.map(skill => (
                            <span 
                              key={skill} 
                              className="px-5 py-2.5 bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-stone-100 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-100 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-white dark:hover:bg-stone-700 hover:-translate-y-1 transition-all duration-500 cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-60 bg-stone-900 text-white text-center">
          <div className="container mx-auto px-6 reveal">
            <p className={`text-[11px] uppercase tracking-[0.4em] font-bold mb-16 transition-all duration-500 ${emailCopied ? 'text-emerald-400' : 'text-stone-500'}`}>
              {emailCopied ? 'Email Copied to Clipboard' : 'Collaboration'}
            </p>
            
            <button 
              onClick={handleCopyEmail}
              className="relative group block w-full mb-16 outline-none focus:outline-none"
            >
              <span className="serif text-4xl md:text-8xl hover:italic hover:text-stone-100 transition-all duration-700 block break-words font-light">
                {emailAddress}
              </span>
              <div className="mt-8 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Click to copy</span>
              </div>
            </button>

            <div className="flex justify-center flex-wrap gap-16 text-stone-500 uppercase tracking-[0.3em] text-[10px] font-bold">
              <a href="https://www.linkedin.com/in/awanishverma/" target="_blank" rel="noopener" className="group relative hover:text-white transition-colors duration-500">
                LinkedIn
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full"></span>
              </a>
              <a href="http://github.com/avanishverma4/" target="_blank" rel="noopener" className="group relative hover:text-white transition-colors duration-500">
                GitHub
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full"></span>
              </a>
              <a href="https://www.behance.net/avanishverma4" target="_blank" rel="noopener" className="group relative hover:text-white transition-colors duration-500">
                Behance
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-stone-900 text-stone-700 border-t border-stone-800/50 text-center">
        <div className="container mx-auto px-6">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold leading-loose">
            &copy; {new Date().getFullYear()} Awanish Verma &bull; Designed for Clarity & Performance.
          </p>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
};

export default App;
