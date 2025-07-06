'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResumeData, ResumeSection, Template } from './components/types';
import { defaultResumeData } from './components/data';
import Header from './components/header';
import PersonalInfoEditor from './components/personal-info-editor';
import SectionManager from './components/section-manager';
import SectionEditor from './components/section-editor';
import ResumePreview from './components/resume-preview';
import LoadingSpinner from './components/loading-spinner';
import { useSavedResumes } from '@/lib/hooks/use-saved-resumes';
import { toast } from 'sonner';

function DesignSidebar({
  templates,
  selectedTemplate,
  setSelectedTemplate,
  selectedColorScheme,
  setSelectedColorScheme
}: {
  templates: Template[];
  selectedTemplate: string;
  setSelectedTemplate: (id: string) => void;
  selectedColorScheme: string;
  setSelectedColorScheme: (id: string) => void;
}) {
  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  const templateListRef = useRef<HTMLDivElement>(null!);
  const colorSchemeListRef = useRef<HTMLDivElement>(null!);

  // Scroll helpers
  const scrollList = (ref: React.RefObject<HTMLDivElement>, amount: number) => {
    if (ref.current) {
      ref.current.scrollBy({ top: amount, behavior: 'smooth' });
    }
  };

  const boxHeight = 420;
  const arrowStyle =
    'absolute left-1/2 -translate-x-1/2 z-20 bg-white/80 hover:bg-blue-50 border border-gray-200 rounded-full shadow p-1 transition flex items-center justify-center';

  const isPaidTemplate = (plan: string) => plan === 'premium' || plan === 'professional';

  const getOverlayStyle = (plan: string) => {
    if (plan === 'premium') {
      return 'bg-gradient-to-br from-purple-600/95 via-purple-700/95 to-amber-500/95';
    } else if (plan === 'professional') {
      return 'bg-gradient-to-br from-blue-700/95 via-blue-800/95 to-indigo-900/95';
    }
    return '';
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-6 tracking-tight text-gray-900">Design</h2>
      {/* Template Selector */}
      <div className="mb-10">
        <div className="font-semibold mb-3 text-gray-700">Templates</div>
        <div className="relative" style={{ height: boxHeight }}>
          {/* Up arrow inside box */}
          <button
            className={arrowStyle + ' top-2'}
            style={{ top: 8 }}
            aria-label="Scroll up"
            onClick={() => scrollList(templateListRef, -120)}
            type="button"
          >
            &#8593;
          </button>
          <div
            ref={templateListRef}
            className="flex flex-col gap-4 overflow-y-auto no-scrollbar border rounded-xl p-2 bg-gray-50 shadow-inner h-full"
            style={{ height: boxHeight }}
          >
            <div className="pt-8 pb-8"> {/* Padding for arrows */}
              {templates.map(t => (
                <button
                  key={t.id}
                  className={`w-full group flex items-center gap-4 px-4 py-4 rounded-xl border transition-all relative shadow-sm hover:scale-[1.03] hover:shadow-lg hover:border-blue-400 focus:outline-none overflow-hidden ${t.id === selectedTemplate ? 'border-blue-600 bg-white ring-2 ring-blue-200' : 'border-gray-200 bg-white'}`}
                  onClick={() => setSelectedTemplate(t.id)}
                  type="button"
                >
                  {/* Overlay for paid templates - covers entire option */}
                  {isPaidTemplate(t.plan) && (
                    <div className={`absolute inset-0 ${getOverlayStyle(t.plan)} flex items-center justify-center z-10 backdrop-blur-sm`}>
                      <div className="text-center relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150"></div>
                        
                        {/* Lock icon with glow */}
                        <div className="relative mb-3">
                          <div className="absolute inset-0 bg-white/30 rounded-full blur-md scale-125"></div>
                          <svg className="w-8 h-8 text-white mx-auto relative z-10 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        
                        {/* Plan text with enhanced styling */}
                        <div className="relative">
                          <span className="text-white text-lg font-black tracking-wider drop-shadow-lg">
                            {t.plan === 'premium' ? 'PREMIUM' : 'PRO'}
                          </span>
                          <div className="text-white/80 text-xs font-medium mt-1 tracking-wide">
                            {t.plan === 'premium' ? 'Unlock Premium Templates' : 'Professional Access'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Placeholder for preview image/icon */}
                  <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-blue-400 font-bold text-lg shadow-inner relative">
                    <span className="opacity-60">{t.name[0]}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{t.description?.slice(0, 40) || 'Template'}</div>
                  </div>
                  {t.id === selectedTemplate && (
                    <span className="ml-auto text-blue-600 font-bold text-lg">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          {/* Down arrow inside box */}
          <button
            className={arrowStyle + ' bottom-2'}
            style={{ bottom: 8 }}
            aria-label="Scroll down"
            onClick={() => scrollList(templateListRef, 120)}
            type="button"
          >
            &#8595;
          </button>
        </div>
      </div>
      {/* Color Scheme Selector */}
      <div>
        <div className="font-semibold mb-3 text-gray-700">Color Schemes</div>
        <div className="relative" style={{ height: boxHeight }}>
          {/* Up arrow inside box */}
          <button
            className={arrowStyle + ' top-2'}
            style={{ top: 8 }}
            aria-label="Scroll up"
            onClick={() => scrollList(colorSchemeListRef, -120)}
            type="button"
          >
            &#8593;
          </button>
          <div
            ref={colorSchemeListRef}
            className="flex flex-col gap-4 overflow-y-auto no-scrollbar border rounded-xl p-2 bg-gray-50 shadow-inner h-full"
            style={{ height: boxHeight }}
          >
            <div className="pt-8 pb-8"> {/* Padding for arrows */}
              {currentTemplate?.colorSchemes?.map(cs => (
                <button
                  key={cs.id}
                  className={`w-full group flex items-center gap-4 px-4 py-4 rounded-xl border whitespace-nowrap transition-all relative shadow-sm hover:scale-[1.03] hover:shadow-lg hover:border-blue-400 focus:outline-none ${cs.id === selectedColorScheme ? 'border-blue-600 bg-white ring-2 ring-blue-200' : 'border-gray-200 bg-white'}`}
                  onClick={() => setSelectedColorScheme(cs.id)}
                  type="button"
                >
                  {/* Color swatch row */}
                  <div className="flex gap-1">
                    <span className="w-4 h-4 rounded-full border border-gray-300 inline-block" style={{ background: cs.primary }} title="Primary"></span>
                    <span className="w-4 h-4 rounded-full border border-gray-300 inline-block" style={{ background: cs.secondary }} title="Secondary"></span>
                    <span className="w-4 h-4 rounded-full border border-gray-300 inline-block" style={{ background: cs.accent }} title="Accent"></span>
                    <span className="w-4 h-4 rounded-full border border-gray-300 inline-block" style={{ background: cs.background }} title="Background"></span>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition">{cs.name}</div>
                  </div>
                  {cs.id === selectedColorScheme && (
                    <span className="ml-auto text-blue-600 font-bold text-lg">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          {/* Down arrow inside box */}
          <button
            className={arrowStyle + ' bottom-2'}
            style={{ bottom: 8 }}
            aria-label="Scroll down"
            onClick={() => scrollList(colorSchemeListRef, 120)}
            type="button"
          >
            &#8595;
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResumeBuilder() {
  const searchParams = useSearchParams();
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeSection, setActiveSection] = useState<string>('summary');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional-classic');
  const [selectedColorScheme, setSelectedColorScheme] = useState<string>('navy-blue');
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  
  // Database state
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [templateError, setTemplateError] = useState<string | null>(null);

  // Save/load functionality
  const { getDefaultResume, parseResumeData, loadResume } = useSavedResumes();
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Load resume from URL parameter or default resume
  useEffect(() => {
    const loadResumeData = async () => {
      if (isLoadingTemplates) return;

      try {
        const loadId = searchParams!.get('load');
        
        if (loadId) {
          // Load specific resume from URL parameter
          const resume = await loadResume(loadId);
          if (resume) {
            const parsedData = parseResumeData(resume.data);
            if (parsedData) {
              setResumeData(parsedData);
              setSelectedTemplate(resume.templateId);
              setSelectedColorScheme(resume.colorSchemeId);
              setCurrentResumeId(resume.id);
              setHasUnsavedChanges(false);
              toast.success(`Loaded resume: ${resume.name}`);
            }
          } else {
            toast.error('Resume not found');
          }
        } else {
          // Load default resume if no specific resume requested
          const defaultResume = getDefaultResume();
          if (defaultResume) {
            const parsedData = parseResumeData(defaultResume.data);
            if (parsedData) {
              setResumeData(parsedData);
              setSelectedTemplate(defaultResume.templateId);
              setSelectedColorScheme(defaultResume.colorSchemeId);
              setCurrentResumeId(defaultResume.id);
              toast.success('Loaded your default resume');
            }
          }
        }
      } catch (error) {
        console.error('Error loading resume:', error);
        toast.error('Failed to load resume');
      }
    };

    loadResumeData();
  }, [isLoadingTemplates, searchParams, loadResume, parseResumeData, getDefaultResume]);

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (!hasUnsavedChanges || !currentResumeId) return;

    try {
      const response = await fetch(`/api/resumes/${currentResumeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: resumeData,
          templateId: selectedTemplate,
          colorSchemeId: selectedColorScheme,
        }),
      });

      if (response.ok) {
        setHasUnsavedChanges(false);
        console.log('Auto-saved successfully');
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, [hasUnsavedChanges, currentResumeId, resumeData, selectedTemplate, selectedColorScheme]);

  // Set up auto-save timer
  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    if (hasUnsavedChanges && currentResumeId) {
      autoSaveTimeoutRef.current = setTimeout(autoSave, 30000); // Auto-save after 30 seconds
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [hasUnsavedChanges, currentResumeId, autoSave]);

  // Mark changes as unsaved
  const markAsUnsaved = useCallback(() => {
    if (currentResumeId) {
      setHasUnsavedChanges(true);
    }
  }, [currentResumeId]);

  // Handlers
  const updateSection = (sectionId: string, updates: Partial<ResumeSection>) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
    markAsUnsaved();
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
    markAsUnsaved();
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
    markAsUnsaved();
  };

  const removeSection = (sectionId: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
    markAsUnsaved();
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
      markAsUnsaved();
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
      markAsUnsaved();
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
    } else {
      // If no color schemes available, set to empty string to trigger fallback
      setSelectedColorScheme('');
    }
    
    // Reset sections to default when template changes
    setResumeData(prev => ({
      ...prev,
      sections: defaultResumeData.sections.map(section => ({
        ...section,
        id: `${section.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }))
    }));
    markAsUnsaved();
  };

  const changeColorScheme = (colorSchemeId: string) => {
    setSelectedColorScheme(colorSchemeId);
    markAsUnsaved();
  };

  const handleLoadResume = (data: ResumeData, templateId: string, colorSchemeId: string) => {
    setResumeData(data);
    setSelectedTemplate(templateId);
    setSelectedColorScheme(colorSchemeId);
    setHasUnsavedChanges(false);
    toast.success('Resume loaded successfully');
  };

  const activeSectionData = resumeData.sections.find(s => s.id === activeSection);

  // Show loading state while fetching templates
  if (isLoadingTemplates) {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          currentResumeData={resumeData}
          currentTemplateId={selectedTemplate}
          currentColorSchemeId={selectedColorScheme}
          onLoadResume={handleLoadResume}
        />
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
        <Header 
          currentResumeData={resumeData}
          currentTemplateId={selectedTemplate}
          currentColorSchemeId={selectedColorScheme}
          onLoadResume={handleLoadResume}
        />
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
      <Header 
        currentResumeData={resumeData}
        currentTemplateId={selectedTemplate}
        currentColorSchemeId={selectedColorScheme}
        onLoadResume={handleLoadResume}
      />

      {/* Unsaved changes indicator */}
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center text-yellow-800">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">You have unsaved changes</span>
            </div>
            <div className="text-xs text-yellow-600">
              Auto-saving in 30 seconds...
            </div>
          </div>
        </div>
      )}

      {/* Tab Toggle - At the very top */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            <button
              className={`px-6 py-4 font-medium text-sm focus:outline-none transition-colors ${
                activeTab === 'content' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('content')}
              type="button"
            >
              Content
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm focus:outline-none transition-colors ${
                activeTab === 'design' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('design')}
              type="button"
            >
              Design
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Consistent layout: sidebar + preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar: switches content based on tab */}
          <div className="lg:col-span-1">
            {activeTab === 'content' ? (
              <>
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
              </>
            ) : (
              <DesignSidebar
                templates={templates}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={changeTemplate}
                selectedColorScheme={selectedColorScheme}
                setSelectedColorScheme={changeColorScheme}
              />
            )}
          </div>

          {/* Main Preview always on the right */}
          <div className="lg:col-span-2">
            <ResumePreview 
              resumeData={resumeData} 
              selectedTemplate={selectedTemplate}
              selectedColorScheme={selectedColorScheme}
              templates={templates}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
