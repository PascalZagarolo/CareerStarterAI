import { useState } from 'react';
import { FileText, Briefcase, GraduationCap, Code, Award, BookOpen } from 'lucide-react';

// Section type descriptions and icons
export const getSectionInfo = (type: string) => {
  switch (type) {
    case 'summary':
      return { description: 'Professional Summary', icon: FileText };
    case 'experience':
      return { description: 'Work Experience', icon: Briefcase };
    case 'education':
      return { description: 'Education & Qualifications', icon: GraduationCap };
    case 'skills':
      return { description: 'Skills & Competencies', icon: Code };
    case 'projects':
      return { description: 'Projects & Achievements', icon: BookOpen };
    case 'certifications':
      return { description: 'Certifications & Licenses', icon: Award };
    default:
      return { description: 'Resume Section', icon: FileText };
  }
};

export const useSectionHover = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const handleSectionHover = (sectionId: string | null) => {
    setHoveredSection(sectionId);
  };

  return {
    hoveredSection,
    handleSectionHover,
    getSectionInfo
  };
}; 