
import React from 'react';
import { EXPERIENCES } from '../constants';

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-40 bg-stone-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between mb-32 reveal">
          <h2 className="serif text-5xl md:text-8xl mb-8 md:mb-0">Selected <br/><span className="italic text-stone-500">Chapters</span></h2>
          <div className="max-w-md">
            <p className="text-stone-400 leading-relaxed font-light text-lg">
              A chronological journey of sculpting digital interfaces. Collaborating with high-growth teams to define the next generation of user interactions.
            </p>
          </div>
        </div>

        <div className="space-y-0 border-b border-stone-800/50">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="reveal group relative border-t border-stone-800/50 py-20 px-6 -mx-6 hover:bg-white/5 transition-all duration-700 cursor-default">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-3">
                  <span className="text-stone-500 text-[11px] uppercase tracking-[0.3em] font-bold group-hover:text-stone-300 transition-colors duration-500">
                    {exp.period}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="serif text-3xl md:text-4xl mb-3 group-hover:italic transition-all duration-500 group-hover:text-stone-200">
                    {exp.company}
                  </h3>
                  <p className="text-stone-500 text-[11px] uppercase tracking-[0.2em] font-bold group-hover:text-stone-400 transition-colors duration-500">
                    {exp.role}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <ul className="space-y-6">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-stone-400 text-[15px] leading-relaxed flex gap-4 font-light group/item hover:text-stone-200 transition-colors">
                        <span className="text-stone-700 group-hover:text-stone-500 transition-colors duration-500 flex-shrink-0 group-hover/item:translate-x-1 transform transition-transform">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
