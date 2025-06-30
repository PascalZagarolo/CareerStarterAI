'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface ResumeSection {
  id: string;
  type: 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications';
  title: string;
  content: any;
  isVisible: boolean;
  order: number;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
  };
  sections: ResumeSection[];
  template: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  colors: {
    primary: string;
    secondary: string;
  };
  fontFamily: string;
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      portfolio: 'johndoe.dev'
    },
    sections: [
      {
        id: 'summary',
        type: 'summary',
        title: 'Professional Summary',
        content: 'Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams.',
        isVisible: true,
        order: 0
      },
      {
        id: 'experience',
        type: 'experience',
        title: 'Work Experience',
        content: [
          {
            id: 'exp1',
            company: 'TechCorp Inc.',
            position: 'Senior Software Engineer',
            startDate: '2022-01',
            endDate: 'Present',
            description: 'Lead development of enterprise applications using React and Node.js',
            achievements: [
              'Led a team of 5 developers to deliver a customer portal that increased user engagement by 40%',
              'Implemented CI/CD pipeline reducing deployment time by 60%',
              'Mentored junior developers and conducted code reviews'
            ]
          },
          {
            id: 'exp2',
            company: 'StartupXYZ',
            position: 'Full Stack Developer',
            startDate: '2020-03',
            endDate: '2021-12',
            description: 'Developed and maintained web applications using modern technologies',
            achievements: [
              'Built responsive web applications using React and TypeScript',
              'Optimized database queries improving performance by 30%',
              'Collaborated with design team to implement UI/UX improvements'
            ]
          }
        ],
        isVisible: true,
        order: 1
      },
      {
        id: 'education',
        type: 'education',
        title: 'Education',
        content: [
          {
            id: 'edu1',
            institution: 'University of Technology',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startDate: '2016-09',
            endDate: '2020-05',
            gpa: '3.8/4.0'
          }
        ],
        isVisible: true,
        order: 2
      },
      {
        id: 'skills',
        type: 'skills',
        title: 'Skills',
        content: {
          technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
          soft: ['Leadership', 'Problem Solving', 'Communication', 'Team Collaboration']
        },
        isVisible: true,
        order: 3
      }
    ],
    template: 'modern',
    theme: {
      primaryColor: '#3B82F6',
      secondaryColor: '#1F2937',
      fontFamily: 'Inter'
    }
  });

  const [activeSection, setActiveSection] = useState<string>('summary');
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Templates
  const templates: Template[] = [
    {
      id: 'modern',
      name: 'Modern',
      thumbnail: '/api/placeholder/200/150',
      colors: { primary: '#3B82F6', secondary: '#1F2937' },
      fontFamily: 'Inter'
    },
    {
      id: 'classic',
      name: 'Classic',
      thumbnail: '/api/placeholder/200/150',
      colors: { primary: '#374151', secondary: '#6B7280' },
      fontFamily: 'Georgia'
    },
    {
      id: 'creative',
      name: 'Creative',
      thumbnail: '/api/placeholder/200/150',
      colors: { primary: '#8B5CF6', secondary: '#4C1D95' },
      fontFamily: 'Poppins'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      thumbnail: '/api/placeholder/200/150',
      colors: { primary: '#000000', secondary: '#6B7280' },
      fontFamily: 'Helvetica'
    },
    {
      id: 'professional',
      name: 'Professional',
      thumbnail: '/api/placeholder/200/150',
      colors: { primary: '#059669', secondary: '#065F46' },
      fontFamily: 'Roboto'
    }
  ];

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

  // Render functions
  const renderSectionEditor = (section: ResumeSection) => {
    switch (section.type) {
      case 'summary':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
              <button
                onClick={() => generateWithAI(section.id)}
                disabled={isGenerating}
                className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Generate with AI'}
              </button>
            </div>
            <textarea
              value={section.content}
              onChange={(e) => updateSection(section.id, { content: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write your professional summary..."
            />
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
              <button
                onClick={() => {
                  const newExp: Experience = {
                    id: `exp-${Date.now()}`,
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    achievements: []
                  };
                  updateSection(section.id, {
                    content: [...section.content, newExp]
                  });
                }}
                className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
              >
                Add Experience
              </button>
            </div>
            <div className="space-y-4">
              {section.content.map((exp: Experience, index: number) => (
                <div key={exp.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      value={exp.company}
                      onChange={(e) => {
                        const newContent = [...section.content];
                        newContent[index] = { ...exp, company: e.target.value };
                        updateSection(section.id, { content: newContent });
                      }}
                      placeholder="Company"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      value={exp.position}
                      onChange={(e) => {
                        const newContent = [...section.content];
                        newContent[index] = { ...exp, position: e.target.value };
                        updateSection(section.id, { content: newContent });
                      }}
                      placeholder="Position"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      value={exp.startDate}
                      onChange={(e) => {
                        const newContent = [...section.content];
                        newContent[index] = { ...exp, startDate: e.target.value };
                        updateSection(section.id, { content: newContent });
                      }}
                      placeholder="Start Date (MM/YYYY)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      value={exp.endDate}
                      onChange={(e) => {
                        const newContent = [...section.content];
                        newContent[index] = { ...exp, endDate: e.target.value };
                        updateSection(section.id, { content: newContent });
                      }}
                      placeholder="End Date (MM/YYYY)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) => {
                      const newContent = [...section.content];
                      newContent[index] = { ...exp, description: e.target.value };
                      updateSection(section.id, { content: newContent });
                    }}
                    placeholder="Description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
                <input
                  value={section.content.technical.join(', ')}
                  onChange={(e) => {
                    const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    updateSection(section.id, {
                      content: { ...section.content, technical: skills }
                    });
                  }}
                  placeholder="JavaScript, React, Node.js..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soft Skills</label>
                <input
                  value={section.content.soft.join(', ')}
                  onChange={(e) => {
                    const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    updateSection(section.id, {
                      content: { ...section.content, soft: skills }
                    });
                  }}
                  placeholder="Leadership, Communication, Problem Solving..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        );

      default:
        return <div>Section editor not implemented for {section.type}</div>;
    }
  };

  const renderResumePreview = () => {
    const visibleSections = resumeData.sections.filter(s => s.isVisible).sort((a, b) => a.order - b.order);
    
    return (
      <div 
        ref={previewRef}
        className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto"
        style={{ fontFamily: resumeData.theme.fontFamily }}
      >
        {/* Header */}
        <div className="text-center mb-8 border-b border-gray-200 pb-6">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: resumeData.theme.primaryColor }}
          >
            {resumeData.personalInfo.fullName}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-6 text-gray-600 text-sm">
            {resumeData.personalInfo.email && (
              <span>{resumeData.personalInfo.email}</span>
            )}
            {resumeData.personalInfo.phone && (
              <span>{resumeData.personalInfo.phone}</span>
            )}
            {resumeData.personalInfo.location && (
              <span>{resumeData.personalInfo.location}</span>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {visibleSections.map(section => (
            <div key={section.id}>
              <h2 
                className="text-xl font-bold mb-3 pb-1 border-b"
                style={{ color: resumeData.theme.primaryColor, borderColor: resumeData.theme.secondaryColor }}
              >
                {section.title}
              </h2>
              
              {section.type === 'summary' && (
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              )}
              
              {section.type === 'experience' && (
                <div className="space-y-4">
                  {section.content.map((exp: Experience) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                          <p className="text-gray-700">{exp.company}</p>
                        </div>
                        <span className="text-gray-500 text-sm">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-600">
                              <span className="mr-2 mt-1" style={{ color: resumeData.theme.primaryColor }}>•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {section.type === 'skills' && (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {section.content.technical.map((skill: string, index: number) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ 
                            backgroundColor: `${resumeData.theme.primaryColor}20`,
                            color: resumeData.theme.primaryColor
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {section.content.soft.map((skill: string, index: number) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ 
                            backgroundColor: `${resumeData.theme.secondaryColor}20`,
                            color: resumeData.theme.secondaryColor
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1>
              <p className="text-gray-600">Create a professional resume in minutes</p>
            </div>
            <button
              onClick={downloadPDF}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Sections Manager */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Resume Sections</h2>
              
              {/* Personal Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-3">Personal Information</h3>
                <div className="space-y-3">
                  <input
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    placeholder="Phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    value={resumeData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    placeholder="Location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Sections List */}
              <div className="space-y-3">
                {resumeData.sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      activeSection === section.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-800">{section.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSectionUp(section.id);
                          }}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSectionDown(section.id);
                          }}
                          disabled={index === resumeData.sections.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSectionVisibility(section.id);
                          }}
                          className={`p-1 rounded ${
                            section.isVisible ? 'text-green-600' : 'text-gray-400'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSection(section.id);
                          }}
                          className="p-1 text-red-500 hover:text-red-700 rounded"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Section */}
              <div className="mt-4">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addSection(e.target.value as ResumeSection['type']);
                      e.target.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Add Section...</option>
                  <option value="summary">Professional Summary</option>
                  <option value="experience">Work Experience</option>
                  <option value="education">Education</option>
                  <option value="skills">Skills</option>
                  <option value="projects">Projects</option>
                  <option value="certifications">Certifications</option>
                </select>
              </div>
            </div>

            {/* Section Editor */}
            {activeSection && (
              <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
                {renderSectionEditor(resumeData.sections.find(s => s.id === activeSection)!)}
              </div>
            )}
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Live Preview</h2>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Desktop
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Mobile
                  </button>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                {renderResumePreview()}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel - Design Templates */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Design Templates</h2>
              <button className="px-4 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
                AI Suggest Template
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => changeTemplate(template.id)}
                  className={`relative cursor-pointer rounded-lg border-2 transition-all ${
                    resumeData.template === template.id
                      ? 'border-indigo-500 ring-2 ring-indigo-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="aspect-[4/3] bg-gray-100 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <div 
                        className="w-8 h-8 rounded mx-auto mb-2"
                        style={{ backgroundColor: template.colors.primary }}
                      ></div>
                      <div className="text-xs text-gray-600">{template.name}</div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-medium text-gray-800">{template.name}</div>
                    <div className="text-xs text-gray-500">{template.fontFamily}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
