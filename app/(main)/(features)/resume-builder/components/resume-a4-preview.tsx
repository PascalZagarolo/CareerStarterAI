import { ResumeData, Template } from './types';
import ProfessionalClassic from './templates/professional-classic';
import ModernMinimal from './templates/modern-minimal';
import CreativeSidebar from './templates/creative-sidebar';
import ExecutiveTwoColumn from './templates/executive-two-column';
import StartupModern from './templates/startup-modern';
import React from 'react';
import { LanguageProvider } from './i18n/language-context';
import { Language } from './i18n/translations';

interface ResumeA4PreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  selectedColorScheme: string;
  templates: Template[];
  language?: Language;
}

export default function ResumeA4Preview({ resumeData, selectedTemplate, selectedColorScheme, templates, language = 'en' }: ResumeA4PreviewProps) {
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
    <LanguageProvider initialLanguage={language}>
      <div
        className="bg-white relative overflow-hidden resume-preview-print w-full h-full"
      >
        {/* Page fold effect */}
        
        {/* Content container */}
        <div className="w-full h-full overflow-hidden">
          {renderTemplate()}
        </div>
      </div>
    </LanguageProvider>
  );
} 