
import React from 'react';
import { Project, Experience, Skill } from './types';

/**
 * Helper to generate optimized Unsplash URLs.
 * leverages Unsplash's image API as a high-performance CDN.
 */
const getUnsplashUrl = (id: string, width: number = 1200, blur: number = 0) => {
  const base = `https://images.unsplash.com/${id}?auto=format,compress&q=80&w=${width}`;
  return blur > 0 ? `${base}&blur=${blur}` : base;
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nike Website Rebranding',
    category: 'Digital Experience',
    description: 'A comprehensive reimagining of the Nike e-commerce ecosystem, emphasizing kinetic typography and a frictionless path to purchase.',
    imageUrl: getUnsplashUrl('photo-1542291026-7eec264c27ff'),
    lowResImageUrl: getUnsplashUrl('photo-1542291026-7eec264c27ff', 50, 10),
    imageAlt: 'Vibrant red Nike sneaker against a clean background',
    link: 'https://www.behance.net/gallery/141174193/Shoe-E-commerce',
    tags: ['Rebranding', 'E-commerce', 'Interactive']
  },
  {
    id: '2',
    title: 'XpertOnline Chatbot',
    category: 'AI & Conversational UX',
    description: 'Developing a contextually aware AI interface that bridge the gap between complex data and human-centric conversation.',
    imageUrl: getUnsplashUrl('photo-1611746872915-64382b5c76da'),
    lowResImageUrl: getUnsplashUrl('photo-1611746872915-64382b5c76da', 50, 10),
    imageAlt: 'Abstract blue and white digital network representing AI',
    link: 'https://www.behance.net/gallery/231083459/XpertOnline-Chatbot',
    tags: ['AI Strategy', 'UX Research', 'NLU']
  },
  {
    id: '3',
    title: 'Patient Management System',
    category: 'Healthcare Ecosystem',
    description: 'A data-driven platform designed to optimize clinical workflows and enhance patient-provider communication.',
    imageUrl: getUnsplashUrl('photo-1576091160550-2173dba999ef'),
    lowResImageUrl: getUnsplashUrl('photo-1576091160550-2173dba999ef', 50, 10),
    imageAlt: 'Medical professional using a tablet in a modern clinic',
    link: 'https://www.behance.net/gallery/221640093/Doctor-Patient-Management-App',
    tags: ['HealthTech', 'Enterprise', 'Dashboard']
  },
  {
    id: '4',
    title: 'Moment Insurance Platform',
    category: 'Insurtech Solutions',
    description: 'Modernizing legacy insurance structures with a streamlined, modular interface that empowers users.',
    imageUrl: getUnsplashUrl('photo-1554224155-6726b3ff858f'),
    lowResImageUrl: getUnsplashUrl('photo-1554224155-6726b3ff858f', 50, 10),
    imageAlt: 'Minimalist desk setup with financial documents and laptop',
    link: 'https://www.momentum.co.za/',
    tags: ['Product Design', 'FinTech', 'Scalability']
  },
  {
    id: '5',
    title: 'Academy of Dental Excellence',
    category: 'EdTech & Certification',
    description: 'A premium educational portal for medical professionals, featuring integrated LMS and webinar capabilities.',
    imageUrl: getUnsplashUrl('photo-1588776814546-1ffce47267a5'),
    lowResImageUrl: getUnsplashUrl('photo-1588776814546-1ffce47267a5', 50, 10),
    imageAlt: 'Bright and clean modern dental examination room',
    link: 'https://dentalexcellence.academy/prelogin/',
    tags: ['E-Learning', 'Platform Design', 'LMS']
  },
  {
    id: '6',
    title: 'Omnifood AI Delivery',
    category: 'Direct-to-Consumer',
    description: 'An AI-powered subscription service landing page optimized for high conversion through storytelling.',
    imageUrl: getUnsplashUrl('photo-1543353071-873f17a7a088'),
    lowResImageUrl: getUnsplashUrl('photo-1543353071-873f17a7a088', 50, 10),
    imageAlt: 'Freshly prepared healthy meal ingredients artistically arranged',
    link: 'https://omnifood-nine-zeta.vercel.app/',
    tags: ['Web Design', 'Conversion', 'Optimization']
  },
  {
    id: '7',
    title: 'Secure Password Utility',
    category: 'Cybersecurity Tool',
    description: 'A minimalist utility focused on cryptographic security and zero-clutter interface design.',
    imageUrl: getUnsplashUrl('photo-1633265486064-086b219458ec'),
    lowResImageUrl: getUnsplashUrl('photo-1633265486064-086b219458ec', 50, 10),
    imageAlt: 'Abstract blue digital data streams representing digital security',
    link: 'https://random-password-generator-eight-xi.vercel.app/',
    tags: ['Tooling', 'Security', 'Minimalism']
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Acadlog',
    role: 'Senior UI/UX Designer',
    period: 'Oct 2023 - Present',
    description: [
      'Orchestrating the end-to-end design strategy for a next-generation EdTech platform.',
      'Conducting deep-dive user research and behavioral analysis to inform high-level product decisions.',
      'Establishing a robust design system to ensure multi-platform consistency and developer velocity.',
      'Mentoring junior design talent and fostering a culture of rapid prototyping and design critique.'
    ]
  },
  {
    company: 'i2i TeleSolutions',
    role: 'UI/UX Specialist',
    period: 'Apr 2018 - Oct 2023',
    description: [
      'Transformed the UX architecture of complex healthcare portals, resulting in a 30% increase in user retention.',
      'Designed a multi-tenant certification system used by thousands of dental professionals globally.',
      'Collaborated directly with engineering leads to bridge the gap between creative vision and technical feasibility.',
      'Developed high-fidelity interactive prototypes to validate user flows before production development.'
    ]
  },
  {
    company: 'Independent Design Consultant',
    role: 'Freelance UI/UX Designer',
    period: 'Dec 2017 - Apr 2018',
    description: [
      'Partnered with startups to define their visual identity and initial MVP product experiences.',
      'Delivered comprehensive design audits for existing web platforms, identifying and fixing UX bottlenecks.'
    ]
  },
  {
    company: 'Skanda Graphics',
    role: 'Visual Designer',
    period: 'Sep 2015 - Dec 2017',
    description: [
      'Executed end-to-end branding and communication projects for a diverse range of enterprise clients.',
      'Optimized creative workflows, reducing project turnaround time by nearly 40% through better asset management.'
    ]
  }
];

export const SKILLS: Skill[] = [
  {
    category: 'Product Strategy',
    items: ['UX Research', 'Information Architecture', 'User Flows', 'Design Systems', 'Usability Testing', 'Service Design']
  },
  {
    category: 'Craft & Execution',
    items: ['UI Design', 'Interaction Design', 'High-Fidelity Prototyping', 'Visual Storytelling', 'Motion Graphics', '3D Design']
  },
  {
    category: 'Technical Stack',
    items: ['Figma', 'React', 'TypeScript', 'Tailwind CSS', 'Adobe Creative Cloud', 'DaVinci Resolve', 'GSAP']
  }
];
