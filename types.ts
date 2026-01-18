
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  lowResImageUrl?: string;
  imageAlt: string;
  link: string;
  tags: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Skill {
  category: string;
  items: string[];
}
