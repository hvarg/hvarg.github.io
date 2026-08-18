export interface Resume {
  personal: {
    name: string;
    title: string;
    location: string;
    email: string;
    website: string;
    github: string;
    linkedin: string;
  };

  summary: string;

  experience: Experience[];

  education: Education[];

  projects: Project[];

  skills: SkillGroup[];

  languages: Language[];
}

export interface Experience {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  startDate?: string;
  endDate?: string;
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  repository?: string;
  technologies: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Language {
  name: string;
  level: string;
}

