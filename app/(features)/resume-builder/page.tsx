'use client';

import { useState } from 'react';
import { ResumeData, ResumeSection } from './components/types';
import { defaultResumeData, templates } from './components/data';
import Header from './components/header';
import PersonalInfoEditor from './components/personal-info-editor';
import SectionManager from './components/section-manager';
import SectionEditor from './components/section-editor';
import ResumePreview from './components/resume-preview';
import TemplateSelector from './components/template-selector';

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeSection, setActiveSection] = useState<string>('summary');
  const [isGenerating, setIsGenerating] = useState(false);

  // Handlers
  const updateSection = (sectionId: string, updates: Partial<ResumeSection>) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addSection = (type: ResumeSection['type']) => {
    const newSection: ResumeSection = {
      id: `${type}-${Date.now()}`,
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      content: type === 'experience' ? [] : type === 'education' ? [] : type === 'skills' ? { technical: [], soft: [] } : '',
      isVisible: true,
      order: resumeData.sections.length
    };
    
    setResumeData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const removeSection = (sectionId: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };

  const toggleSectionVisibility = (sectionId: string) => {
    updateSection(sectionId, { isVisible: !resumeData.sections.find(s => s.id === sectionId)?.isVisible });
  };

  const moveSectionUp = (sectionId: string) => {
    const sections = [...resumeData.sections];
    const currentIndex = sections.findIndex(s => s.id === sectionId);
    if (currentIndex > 0) {
      [sections[currentIndex], sections[currentIndex - 1]] = [sections[currentIndex - 1], sections[currentIndex]];
      setResumeData(prev => ({
        ...prev,
        sections: sections.map((section, index) => ({ ...section, order: index }))
      }));
    }
  };

  const moveSectionDown = (sectionId: string) => {
    const sections = [...resumeData.sections];
    const currentIndex = sections.findIndex(s => s.id === sectionId);
    if (currentIndex < sections.length - 1) {
      [sections[currentIndex], sections[currentIndex + 1]] = [sections[currentIndex + 1], sections[currentIndex]];
      setResumeData(prev => ({
        ...prev,
        sections: sections.map((section, index) => ({ ...section, order: index }))
      }));
    }
  };

  const generateWithAI = async (sectionId: string) => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const section = resumeData.sections.find(s => s.id === sectionId);
      if (section?.type === 'summary') {
        updateSection(sectionId, {
          content: 'AI-generated professional summary based on your experience and skills. This summary highlights your key achievements and expertise in a compelling way that will catch recruiters\' attention.'
        });
      }
      setIsGenerating(false);
    }, 2000);
  };

  const changeTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setResumeData(prev => ({
        ...prev,
        template: templateId,
        theme: {
          primaryColor: template.colors.primary,
          secondaryColor: template.colors.secondary,
          fontFamily: template.fontFamily
        }
      }));
    }
  };

  const downloadPDF = () => {
    // In a real app, this would use html2pdf or similar library
    alert('PDF download functionality would be implemented here');
  };

  const activeSectionData = resumeData.sections.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-white">
      <Header onDownloadPDF={downloadPDF} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Sections Manager */}
          <div className="lg:col-span-1">
            <PersonalInfoEditor 
              personalInfo={resumeData.personalInfo}
              onUpdate={updatePersonalInfo}
            />
            
            <SectionManager
              sections={resumeData.sections}
              activeSection={activeSection}
              onSectionSelect={setActiveSection}
              onSectionMoveUp={moveSectionUp}
              onSectionMoveDown={moveSectionDown}
              onSectionToggleVisibility={toggleSectionVisibility}
              onSectionRemove={removeSection}
              onSectionAdd={addSection}
            />

            {/* Section Editor */}
            {activeSectionData && (
              <SectionEditor
                section={activeSectionData}
                onUpdate={updateSection}
                isGenerating={isGenerating}
                onGenerateWithAI={generateWithAI}
              />
            )}
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="lg:col-span-2">
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>

        {/* Bottom Panel - Design Templates */}
        <div className="mt-8">
          <TemplateSelector
            templates={templates}
            selectedTemplate={resumeData.template}
            onTemplateChange={changeTemplate}
          />
        </div>
      </div>
    </div>
  );
}
