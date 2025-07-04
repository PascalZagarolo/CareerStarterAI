'use client';

import { useState, useEffect } from 'react';
import { ResumeData, ResumeSection } from './components/types';
import { defaultResumeData } from './components/data';
import Header from './components/header';
import PersonalInfoEditor from './components/personal-info-editor';
import SectionManager from './components/section-manager';
import SectionEditor from './components/section-editor';
import ResumePreview from './components/resume-preview';
import TemplateSelector from './components/template-selector';
import LoadingSpinner from './components/loading-spinner';


export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeSection, setActiveSection] = useState<string>('summary');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional-classic');
  const [selectedColorScheme, setSelectedColorScheme] = useState<string>('navy-blue');
  
  // Database state
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [templateError, setTemplateError] = useState<string | null>(null);

  // Fetch templates from database
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoadingTemplates(true);
        setTemplateError(null);
        
        const response = await fetch('/api/templates');
        const result = await response.json();
        
        if (result.success) {
          setTemplates(result.data);
          // Set default template and color scheme if available
          if (result.data.length > 0) {
            const firstTemplate = result.data[0];
            setSelectedTemplate(firstTemplate.id);
            // Safely check for color schemes
            if (firstTemplate.colorSchemes && Array.isArray(firstTemplate.colorSchemes) && firstTemplate.colorSchemes.length > 0) {
              setSelectedColorScheme(firstTemplate.colorSchemes[0].id);
            }
          }
        } else {
          setTemplateError(result.error || 'Failed to load templates');
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
        setTemplateError('Failed to connect to template service');
      } finally {
        setIsLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, []);

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
      content: type === 'experience' ? [] : type === 'education' ? [] : type === 'skills' ? [] : type === 'projects' ? [] : type === 'certifications' ? [] : [],
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
          content: ['AI-generated professional summary based on your experience and skills. This summary highlights your key achievements and expertise in a compelling way that will catch recruiters\' attention.']
        });
      }
      setIsGenerating(false);
    }, 2000);
  };

  const changeTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    // Set the first color scheme of the new template as default
    const template = templates.find(t => t.id === templateId);
    if (template && template.colorSchemes && Array.isArray(template.colorSchemes) && template.colorSchemes.length > 0) {
      setSelectedColorScheme(template.colorSchemes[0].id);
    }
  };

  const changeColorScheme = (colorSchemeId: string) => {
    setSelectedColorScheme(colorSchemeId);
  };

  const downloadPDF = () => {
    // In a real app, this would use html2pdf or similar library
    alert('PDF download functionality would be implemented here');
  };

  const activeSectionData = resumeData.sections.find(s => s.id === activeSection);

    // Show loading state while fetching templates
  if (isLoadingTemplates) {
    return (
      <div className="min-h-screen bg-white">
        <Header onDownloadPDF={downloadPDF} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner 
              size="lg" 
              text="Loading beautiful templates..." 
              className="py-12"
            />
          </div>
        </div>
      </div>
    );
  }

  // Show error state if templates failed to load
  if (templateError) {
    return (
      <div className="min-h-screen bg-white">
        <Header onDownloadPDF={downloadPDF} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Templates</h3>
              <p className="text-gray-600 mb-4">{templateError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <ResumePreview 
              resumeData={resumeData} 
              selectedTemplate={selectedTemplate}
              selectedColorScheme={selectedColorScheme}
              templates={templates}
            />
          </div>
        </div>

        {/* Bottom Panel - Design Templates */}
        <div className="mt-8">
          <TemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            selectedColorScheme={selectedColorScheme}
            onTemplateChange={changeTemplate}
            onColorSchemeChange={changeColorScheme}
          />
        </div>
      </div>
    </div>
  );
}
