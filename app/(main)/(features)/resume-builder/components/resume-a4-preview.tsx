import { ResumeData, Template } from './types';
import ProfessionalClassic from './templates/professional-classic';
import ModernMinimal from './templates/modern-minimal';
import CreativeSidebar from './templates/creative-sidebar';
import ExecutiveTwoColumn from './templates/executive-two-column';
import StartupModern from './templates/startup-modern';
import React from 'react';

interface ResumeA4PreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  selectedColorScheme: string;
  templates: Template[];
}

export default function ResumeA4Preview({ resumeData, selectedTemplate, selectedColorScheme, templates }: ResumeA4PreviewProps) {
  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  const currentColorScheme = currentTemplate?.colorSchemes?.find(cs => cs.id === selectedColorScheme);

  // If no color scheme is selected, try to use the first available one
  let colorSchemeToUse = currentColorScheme;
  if (!colorSchemeToUse && currentTemplate?.colorSchemes && currentTemplate.colorSchemes.length > 0) {
    colorSchemeToUse = currentTemplate.colorSchemes[0];
  }

  const renderTemplate = () => {
    if (!currentTemplate) {
      return <div className="p-8 text-center text-gray-500">Please select a template</div>;
    }
    if (!colorSchemeToUse) {
      return <div className="p-8 text-center text-gray-500">No color schemes available for this template</div>;
    }
    let Component;
    switch (currentTemplate.id) {
      case 'professional-classic':
        Component = ProfessionalClassic;
        break;
      case 'modern-minimal':
        Component = ModernMinimal;
        break;
      case 'creative-sidebar':
        Component = CreativeSidebar;
        break;
      case 'executive-two-column':
        Component = ExecutiveTwoColumn;
        break;
      case 'startup-modern':
        Component = StartupModern;
        break;
      default:
        Component = ProfessionalClassic;
    }
    return <Component data={resumeData} colorScheme={colorSchemeToUse} />;
  };

  return (
    <div
      className="bg-white shadow-xl border border-gray-200 relative overflow-hidden px-4 py-4 resume-preview-print"
      style={{
        width: '210mm', // A4 width
        height: '297mm', // A4 height
        aspectRatio: '210/297', // A4 aspect ratio (1:1.41)
        maxWidth: '100%',
        maxHeight: '80vh',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      {/* Page fold effect */}
      <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-br from-transparent to-gray-200 opacity-50 z-5"></div>
      {/* Content container */}
      <div className="w-full h-full overflow-hidden">
        {renderTemplate()}
      </div>
    </div>
  );
} 