// Types for Resume Builder
export interface ResumeSection {
  id: string;
  type: 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications';
  title: string;
  content: string[] | { technical: string[], soft: string[] } | Experience[] | Education[] | Project[] | Certification[];
  isVisible: boolean;
  order: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  bulletPoints: string[];
  githubLink?: string;
  liveLink?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
    profilePicture?: string; // Base64 encoded image or URL
  };
  sections: ResumeSection[];
  template: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

export interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
  templateId?: string;
  displayOrder?: number;
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  categoryId: string; // Database field
  category?: string; // Legacy field for backward compatibility
  layout: 'single-column' | 'two-column' | 'sidebar' | 'header-focused';
  colorSchemes?: ColorScheme[]; // Optional since it might not be loaded
  fontFamily: string;
  fontSize: string;
  spacing: 'compact' | 'standard' | 'spacious';
  thumbnail: string;
  plan: 'free' | 'premium' | 'professional';
  isActive?: boolean;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
} 