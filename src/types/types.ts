export type Locale = "en" | "es";

export interface Resume {
  meta: Meta;
  ui: Ui;
  personal: Personal;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillGroup[];
  publications: Publication[];
  awards: Award[];
  languages: Language[];
}

export interface Meta {
  /** Locale of this document. */
  locale: Locale;
  /** Native name of the language, used by the language switcher. */
  label: string;
  /** Path of the generated PDF, relative to the site root. */
  pdf: string;
  /** Page <title> and meta description. */
  title: string;
  description: string;
}

export interface Ui {
  downloadPdf: string;
  /** Label shown on the link pointing to the other locale. */
  otherLanguage: string;
  /** Used as the end date of an ongoing role. */
  present: string;
  /** Labels for the light/dark toggle; the states double as its accessible name. */
  theme: {
    label: string;
    system: string;
    light: string;
    dark: string;
  };
  sections: {
    about: string;
    experience: string;
    projects: string;
    education: string;
    skills: string;
    publications: string;
    awards: string;
    languages: string;
  };
}

export interface Personal {
  name: string;
  title: string;
  /** Optional second line under the title, e.g. a degree. */
  subtitle?: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
}

export interface Experience {
  company: string;
  role: string;
  location?: string;
  url?: string;
  /** Localized display string, e.g. "Feb 2019". */
  start: string;
  /** Omit for an ongoing role: `ui.present` is shown instead. */
  end?: string;
  summary?: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location?: string;
  start?: string;
  end?: string;
  detail?: string;
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

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  url?: string;
}

export interface Award {
  title: string;
  issuer: string;
  year: string;
  detail?: string;
}

export interface Language {
  name: string;
  level: string;
}
