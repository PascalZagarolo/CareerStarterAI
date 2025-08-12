'use client';


import { ResumeSection, Experience, Education, Project, Certification } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronUp, ChevronDown, Eye, EyeOff, Trash2, FileText, Briefcase, GraduationCap, Code, Award, BookOpen, Plus, Sparkles,    } from 'lucide-react';
import { useLanguage } from './i18n/language-context';
import TechnologiesInput from './technologies-input';
import CustomFieldsEditor from './custom-fields-editor';
import { useTranslatedSectionTitle } from './utils/section-title-translator';

interface SectionManagerProps {
  sections: ResumeSection[];
  activeSection: string;
  onSectionSelect: (sectionId: string) => void;
  onSectionMoveUp: (sectionId: string) => void;
  onSectionMoveDown: (sectionId: string) => void;
  onSectionToggleVisibility: (sectionId: string) => void;
  onSectionRemove: (sectionId: string) => void;
  onSectionAdd: (type: ResumeSection['type']) => void;
  onSectionUpdate: (sectionId: string, updates: Partial<ResumeSection>) => void;
  isGenerating: boolean;
  onGenerateWithAI: (sectionId: string) => void;
}

// Icon mapping for different section types
const getSectionIcon = (type: ResumeSection['type']) => {
  switch (type) {
    case 'summary':
      return <FileText className="h-4 w-4" />;
    case 'experience':
      return <Briefcase className="h-4 w-4" />;
    case 'education':
      return <GraduationCap className="h-4 w-4" />;
    case 'skills':
      return <Code className="h-4 w-4" />;
    case 'projects':
      return <BookOpen className="h-4 w-4" />;
    case 'certifications':
      return <Award className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

// Get section description for better context


// Helper function to get section preview content
const getSectionPreview = (section: ResumeSection) => {
  let basePreview = '';
  
  switch (section.type) {
    case 'summary':
      const summaryContent = Array.isArray(section.content) ? section.content[0] : '';
      basePreview = typeof summaryContent === 'string' && summaryContent ? summaryContent.slice(0, 100) + (summaryContent.length > 100 ? '...' : '') : 'No summary added';
      break;
    
    case 'experience':
      if (!Array.isArray(section.content) || section.content.length === 0) {
        basePreview = 'No experience added';
      } else {
        const exp = section.content[0] as Experience;
        basePreview = `${exp.position} at ${exp.company}` || 'No experience added';
      }
      break;
    
    case 'education':
      if (!Array.isArray(section.content) || section.content.length === 0) {
        basePreview = 'No education added';
      } else {
        const edu = section.content[0] as Education;
        basePreview = `${edu.degree} in ${edu.field} from ${edu.institution}` || 'No education added';
      }
      break;
    
    case 'skills':
      if (typeof section.content === 'object' && !Array.isArray(section.content)) {
        const technical = section.content.technical || [];
        const soft = section.content.soft || [];
        const allSkills = [...technical, ...soft];
        basePreview = allSkills.length > 0 ? allSkills.slice(0, 5).join(', ') + (allSkills.length > 5 ? '...' : '') : 'No skills added';
      } else {
        basePreview = 'No skills added';
      }
      break;
    
    case 'projects':
      if (!Array.isArray(section.content) || section.content.length === 0) {
        basePreview = 'No projects added';
      } else {
        const proj = section.content[0] as Project;
        basePreview = proj.name || 'No projects added';
      }
      break;
    
    case 'certifications':
      if (!Array.isArray(section.content) || section.content.length === 0) {
        basePreview = 'No certifications added';
      } else {
        const cert = section.content[0] as Certification;
        basePreview = `${cert.name} from ${cert.issuer}` || 'No certifications added';
      }
      break;
    
    default:
      basePreview = 'Section content';
  }

  // Add custom fields preview if available
  if (section.customFields && section.customFields.length > 0) {
    const visibleCustomFields = section.customFields
      .filter(field => field.isVisible && field.value.trim())
      .slice(0, 2); // Show max 2 custom fields in preview
    
    if (visibleCustomFields.length > 0) {
      const customFieldsPreview = visibleCustomFields
        .map(field => `${field.label}: ${field.value.slice(0, 30)}${field.value.length > 30 ? '...' : ''}`)
        .join(', ');
      return `${basePreview} • ${customFieldsPreview}`;
    }
  }

  return basePreview;
};

// Section Editor Component
const SectionEditor = ({ 
  section, 
  onUpdate, 
  isGenerating, 
  onGenerateWithAI 
}: {
  section: ResumeSection;
  onUpdate: (sectionId: string, updates: Partial<ResumeSection>) => void;
  isGenerating: boolean;
  onGenerateWithAI: (sectionId: string) => void;
}) => {
  
  const getTranslatedSectionTitle = useTranslatedSectionTitle;
  const renderEditor = () => {
    switch (section.type) {
      case 'summary':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{getTranslatedSectionTitle(section.type)}</h3>
              <Button
                onClick={() => onGenerateWithAI(section.id)}
                disabled={isGenerating}
                variant="outline"
                size="sm"
                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate with AI'}
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary" className="text-sm font-medium text-gray-700">Professional Summary</Label>
              <Textarea
                id="summary"
                value={Array.isArray(section.content) ? section.content.join('\n') : ''}
                onChange={(e) => onUpdate(section.id, { content: e.target.value.split('\n') })}
                rows={6}
                placeholder="Write your professional summary..."
                className="text-gray-900 placeholder:text-gray-500"
              />
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{getTranslatedSectionTitle(section.type)}</h3>
              <Button
                onClick={() => {
                  const newExp: Experience = {
                    id: `exp-${Date.now()}`,
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: '', // keep for data compatibility, but not shown in UI
                    achievements: []
                  };
                  onUpdate(section.id, {
                    content:
                      Array.isArray(section.content) && section.type === 'experience'
                        ? [...(section.content as Experience[]), newExp]
                        : [newExp]
                  });
                }}
                variant="outline"
                size="sm"
                className="text-green-600 border-green-200 hover:bg-green-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
            <div className="space-y-4">
              {Array.isArray(section.content) && section.type === 'experience' &&
                (section.content as Experience[]).map((exp, index) => (
                  <Card key={exp.id} className="border-gray-200">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-end mb-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newContent = Array.isArray(section.content) ? [...section.content] : [];
                            newContent.splice(index, 1);
                            onUpdate(section.id, { content: newContent as Experience[] });
                          }}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          title="Delete Experience"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`company-${exp.id}`} className="text-sm font-medium text-gray-700">Company</Label>
                          <Input
                            id={`company-${exp.id}`}
                            value={exp.company}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) ? [...section.content] : [];
                              newContent[index] = { ...exp, company: e.target.value };
                              onUpdate(section.id, { content: newContent as Experience[] });
                            }}
                            placeholder="Company name"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`position-${exp.id}`} className="text-sm font-medium text-gray-700">Position</Label>
                          <Input
                            id={`position-${exp.id}`}
                            value={exp.position}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) ? [...section.content] : [];
                              newContent[index] = { ...exp, position: e.target.value };
                              onUpdate(section.id, { content: newContent as Experience[] });
                            }}
                            placeholder="Job title"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${exp.id}`} className="text-sm font-medium text-gray-700">Start Date</Label>
                          <Input
                            id={`startDate-${exp.id}`}
                            value={exp.startDate}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) ? [...section.content] : [];
                              newContent[index] = { ...exp, startDate: e.target.value };
                              onUpdate(section.id, { content: newContent as Experience[] });
                            }}
                            placeholder="MM/YYYY"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${exp.id}`} className="text-sm font-medium text-gray-700">End Date</Label>
                          <Input
                            id={`endDate-${exp.id}`}
                            value={exp.endDate}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) ? [...section.content] : [];
                              newContent[index] = { ...exp, endDate: e.target.value };
                              onUpdate(section.id, { content: newContent as Experience[] });
                            }}
                            placeholder="MM/YYYY or Present"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                      </div>
                      {/* Bullet Points for Achievements */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Achievements / Responsibilities</Label>
                        {(exp.achievements || []).map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="flex items-center gap-2 mb-1">
                            <Input
                              value={bullet}
                              onChange={e => {
                                const newContent = Array.isArray(section.content) ? [...(section.content as Experience[])] : [];
                                const newAchievements = [...(exp.achievements || [])];
                                newAchievements[bulletIndex] = e.target.value;
                                newContent[index] = { ...exp, achievements: newAchievements };
                                onUpdate(section.id, { content: newContent });
                              }}
                              placeholder="e.g. Improved system performance by 30%"
                              className="text-gray-900 placeholder:text-gray-500 flex-1"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newContent = Array.isArray(section.content) ? [...(section.content as Experience[])] : [];
                                const newAchievements = [...(exp.achievements || [])];
                                newAchievements.splice(bulletIndex, 1);
                                newContent[index] = { ...exp, achievements: newAchievements };
                                onUpdate(section.id, { content: newContent });
                              }}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              title="Delete Bullet Point"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newContent = Array.isArray(section.content) ? [...(section.content as Experience[])] : [];
                            const newAchievements = [...(exp.achievements || []), ''];
                            newContent[index] = { ...exp, achievements: newAchievements };
                            onUpdate(section.id, { content: newContent });
                          }}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Bullet Point
                        </Button>
                      </div>
                      {/* Description Area */}
                      <div className="space-y-2">
                        <Label htmlFor={`description-${exp.id}`} className="text-sm font-medium text-gray-700">Description</Label>
                        <Textarea
                          id={`description-${exp.id}`}
                          value={exp.description}
                          onChange={(e) => {
                            const newContent = Array.isArray(section.content) ? [...(section.content as Experience[])] : [];
                            newContent[index] = { ...exp, description: e.target.value };
                            onUpdate(section.id, { content: newContent });
                          }}
                          placeholder="Describe your role and responsibilities"
                          rows={3}
                          className="text-gray-900 placeholder:text-gray-500"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{getTranslatedSectionTitle(section.type)}</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technical-skills" className="text-sm font-medium text-gray-700">Technical Skills</Label>
                <Input
                  id="technical-skills"
                  value={typeof section.content === 'object' && !Array.isArray(section.content) && section.content.technical ? section.content.technical.join(', ') : ''}
                  onChange={(e) => {
                    const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    if (typeof section.content === 'object' && !Array.isArray(section.content)) {
                      onUpdate(section.id, {
                        content: { ...section.content, technical: skills }
                      });
                    } else {
                      onUpdate(section.id, {
                        content: { technical: skills, soft: [] }
                      });
                    }
                  }}
                  placeholder="JavaScript, React, Node.js..."
                  className="text-gray-900 placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-500">Separate skills with commas</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="soft-skills" className="text-sm font-medium text-gray-700">Soft Skills</Label>
                <Input
                  id="soft-skills"
                  value={typeof section.content === 'object' && !Array.isArray(section.content) && section.content.soft ? section.content.soft.join(', ') : ''}
                  onChange={(e) => {
                    const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    if (typeof section.content === 'object' && !Array.isArray(section.content)) {
                      onUpdate(section.id, {
                        content: { ...section.content, soft: skills }
                      });
                    } else {
                      onUpdate(section.id, {
                        content: { technical: [], soft: skills }
                      });
                    }
                  }}
                  placeholder="Leadership, Communication, Problem Solving..."
                  className="text-gray-900 placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-500">Separate skills with commas</p>
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{getTranslatedSectionTitle(section.type)}</h3>
              <Button
                onClick={() => {
                  const newEdu: Education = {
                    id: `edu-${Date.now()}`,
                    institution: '',
                    degree: '',
                    field: '',
                    startDate: '',
                    endDate: '',
                    gpa: ''
                  };
                  onUpdate(section.id, {
                    content:
                      Array.isArray(section.content) && section.type === 'education'
                        ? [...(section.content as Education[]), newEdu]
                        : [newEdu]
                  });
                }}
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
            <div className="space-y-4">
              {Array.isArray(section.content) && section.type === 'education' &&
                (section.content as Education[]).map((edu, index) => (
                  <Card key={edu.id} className="border-gray-200">
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`institution-${edu.id}`} className="text-sm font-medium text-gray-700">Institution</Label>
                          <Input
                            id={`institution-${edu.id}`}
                            value={edu.institution}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) && section.type === 'education' ? [...(section.content as Education[])] : [];
                              newContent[index] = { ...edu, institution: e.target.value };
                              onUpdate(section.id, { content: newContent });
                            }}
                            placeholder="Institution name"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`degree-${edu.id}`} className="text-sm font-medium text-gray-700">Degree</Label>
                          <Input
                            id={`degree-${edu.id}`}
                            value={edu.degree}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) && section.type === 'education' ? [...(section.content as Education[])] : [];
                              newContent[index] = { ...edu, degree: e.target.value };
                              onUpdate(section.id, { content: newContent });
                            }}
                            placeholder="Degree earned"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`field-${edu.id}`} className="text-sm font-medium text-gray-700">Field of Study</Label>
                          <Input
                            id={`field-${edu.id}`}
                            value={edu.field}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) && section.type === 'education' ? [...(section.content as Education[])] : [];
                              newContent[index] = { ...edu, field: e.target.value };
                              onUpdate(section.id, { content: newContent });
                            }}
                            placeholder="Major or area of study"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${edu.id}`} className="text-sm font-medium text-gray-700">Start Date</Label>
                          <Input
                            id={`startDate-${edu.id}`}
                            value={edu.startDate}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) && section.type === 'education' ? [...(section.content as Education[])] : [];
                              newContent[index] = { ...edu, startDate: e.target.value };
                              onUpdate(section.id, { content: newContent });
                            }}
                            placeholder="MM/YYYY"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${edu.id}`} className="text-sm font-medium text-gray-700">End Date</Label>
                          <Input
                            id={`endDate-${edu.id}`}
                            value={edu.endDate}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) && section.type === 'education' ? [...(section.content as Education[])] : [];
                              newContent[index] = { ...edu, endDate: e.target.value };
                              onUpdate(section.id, { content: newContent });
                            }}
                            placeholder="MM/YYYY or Present"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`gpa-${edu.id}`} className="text-sm font-medium text-gray-700">GPA</Label>
                          <Input
                            id={`gpa-${edu.id}`}
                            value={edu.gpa}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) && section.type === 'education' ? [...(section.content as Education[])] : [];
                              newContent[index] = { ...edu, gpa: e.target.value };
                              onUpdate(section.id, { content: newContent });
                            }}
                            placeholder="3.8"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{getTranslatedSectionTitle(section.type)}</h3>
              <Button
                onClick={() => {
                  const newProj: Project = {
                    id: `proj-${Date.now()}`,
                    name: '',
                    description: '',
                    technologies: [],
                    bulletPoints: [],
                    githubLink: '',
                    liveLink: ''
                  };
                  onUpdate(section.id, {
                    content:
                      Array.isArray(section.content) && section.type === 'projects'
                        ? [...(section.content as Project[]), newProj]
                        : [newProj]
                  });
                }}
                variant="outline"
                size="sm"
                className="text-purple-600 border-purple-200 hover:bg-purple-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>
            <div className="space-y-4">
              {Array.isArray(section.content) && section.type === 'projects' &&
                (section.content as Project[]).map((proj, index) => (
                  <Card key={proj.id} className="border-gray-200">
                    <CardContent className="p-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${proj.id}`} className="text-sm font-medium text-gray-700">Name</Label>
                        <Input
                          id={`name-${proj.id}`}
                          value={proj.name}
                          onChange={(e) => {
                            const newContent = Array.isArray(section.content) && section.type === 'projects' ? [...(section.content as Project[])] : [];
                            newContent[index] = { ...proj, name: e.target.value };
                            onUpdate(section.id, { content: newContent });
                          }}
                          placeholder="Project name"
                          className="text-gray-900 placeholder:text-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`description-${proj.id}`} className="text-sm font-medium text-gray-700">Description</Label>
                        <Textarea
                          id={`description-${proj.id}`}
                          value={proj.description}
                          onChange={(e) => {
                            const newContent = Array.isArray(section.content) && section.type === 'projects' ? [...(section.content as Project[])] : [];
                            newContent[index] = { ...proj, description: e.target.value };
                            onUpdate(section.id, { content: newContent });
                          }}
                          placeholder="Describe your project"
                          rows={3}
                          className="text-gray-900 placeholder:text-gray-500"
                        />
                      </div>
                      
                      {/* Technologies */}
                      <div className="space-y-2">
                        <Label htmlFor={`technologies-${proj.id}`} className="text-sm font-medium text-gray-700">Technologies</Label>
                        <TechnologiesInput
                          id={`technologies-${proj.id}`}
                          value={proj.technologies}
                          onChange={(technologies) => {
                            const newContent = Array.isArray(section.content) && section.type === 'projects' ? [...(section.content as Project[])] : [];
                            newContent[index] = { ...proj, technologies };
                            onUpdate(section.id, { content: newContent });
                          }}
                          placeholder="React, Node.js, MongoDB (comma separated)"
                        />
                      </div>
                      
                      {/* Links */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`github-${proj.id}`} className="text-sm font-medium text-gray-700">GitHub Link</Label>
                          <Input
                            id={`github-${proj.id}`}
                            value={proj.githubLink || ''}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) && section.type === 'projects' ? [...(section.content as Project[])] : [];
                              newContent[index] = { ...proj, githubLink: e.target.value };
                              onUpdate(section.id, { content: newContent });
                            }}
                            placeholder="github.com/username/project"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`live-${proj.id}`} className="text-sm font-medium text-gray-700">Live Link</Label>
                          <Input
                            id={`live-${proj.id}`}
                            value={proj.liveLink || ''}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) && section.type === 'projects' ? [...(section.content as Project[])] : [];
                              newContent[index] = { ...proj, liveLink: e.target.value };
                              onUpdate(section.id, { content: newContent });
                            }}
                            placeholder="project-demo.com"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                      </div>
                      
                      {/* Bullet Points */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Key Features & Achievements</Label>
                        <div className="space-y-2">
                          {(proj.bulletPoints || []).map((bullet, bulletIndex) => (
                            <div key={bulletIndex} className="flex gap-2">
                              <Input
                                value={bullet}
                                onChange={(e) => {
                                  const newContent = Array.isArray(section.content) && section.type === 'projects' ? [...(section.content as Project[])] : [];
                                  const newBulletPoints = [...(proj.bulletPoints || [])];
                                  newBulletPoints[bulletIndex] = e.target.value;
                                  newContent[index] = { ...proj, bulletPoints: newBulletPoints };
                                  onUpdate(section.id, { content: newContent });
                                }}
                                placeholder="Describe a key feature or achievement"
                                className="text-gray-900 placeholder:text-gray-500"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newContent = Array.isArray(section.content) && section.type === 'projects' ? [...(section.content as Project[])] : [];
                                  const newBulletPoints = [...(proj.bulletPoints || [])];
                                  newBulletPoints.splice(bulletIndex, 1);
                                  newContent[index] = { ...proj, bulletPoints: newBulletPoints };
                                  onUpdate(section.id, { content: newContent });
                                }}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newContent = Array.isArray(section.content) && section.type === 'projects' ? [...(section.content as Project[])] : [];
                              const newBulletPoints = [...(proj.bulletPoints || []), ''];
                              newContent[index] = { ...proj, bulletPoints: newBulletPoints };
                              onUpdate(section.id, { content: newContent });
                            }}
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Bullet Point
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        );

      case 'certifications':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{getTranslatedSectionTitle(section.type)}</h3>
              <Button
                onClick={() => {
                  const newCert: Certification = {
                    id: `cert-${Date.now()}`,
                    name: '',
                    issuer: '',
                    date: '',
                  };
                  onUpdate(section.id, {
                    content:
                      Array.isArray(section.content) && section.type === 'certifications'
                        ? [...(section.content as Certification[]), newCert]
                        : [newCert]
                  });
                }}
                variant="outline"
                size="sm"
                className="text-teal-600 border-teal-200 hover:bg-teal-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Certification
              </Button>
            </div>
            <div className="space-y-4">
              {Array.isArray(section.content) && section.type === 'certifications' &&
                (section.content as Certification[]).map((cert, index) => (
                  <Card key={cert.id} className="border-gray-200">
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`name-${cert.id}`} className="text-sm font-medium text-gray-700">Name</Label>
                          <Input
                            id={`name-${cert.id}`}
                            value={cert.name}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) && section.type === 'certifications' ? [...(section.content as Certification[])] : [];
                              newContent[index] = { ...cert, name: e.target.value };
                              onUpdate(section.id, { content: newContent });
                            }}
                            placeholder="Certification name"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`issuer-${cert.id}`} className="text-sm font-medium text-gray-700">Issuer</Label>
                          <Input
                            id={`issuer-${cert.id}`}
                            value={cert.issuer}
                            onChange={(e) => {
                              const newContent = Array.isArray(section.content) && section.type === 'certifications' ? [...(section.content as Certification[])] : [];
                              newContent[index] = { ...cert, issuer: e.target.value };
                              onUpdate(section.id, { content: newContent });
                            }}
                            placeholder="Certifying organization"
                            className="text-gray-900 placeholder:text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`date-${cert.id}`} className="text-sm font-medium text-gray-700">Date</Label>
                        <Input
                          id={`date-${cert.id}`}
                          value={cert.date}
                          onChange={(e) => {
                            const newContent = Array.isArray(section.content) && section.type === 'certifications' ? [...(section.content as Certification[])] : [];
                            newContent[index] = { ...cert, date: e.target.value };
                            onUpdate(section.id, { content: newContent });
                          }}
                          placeholder="MM/YYYY"
                          className="text-gray-900 placeholder:text-gray-500"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        );

      default:
        return <div className="text-gray-600">Section editor not implemented for {section.type}</div>;
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      {renderEditor()}
      
      {/* Custom Fields Editor */}
      <div className="mt-6">
        <CustomFieldsEditor
          customFields={section.customFields || []}
          onUpdate={(customFields) => onUpdate(section.id, { customFields })}
        />
      </div>
    </div>
  );
};

export default function SectionManager({
  sections,
  activeSection,
  onSectionSelect,
  onSectionMoveUp,
  onSectionMoveDown,
  onSectionToggleVisibility,
  onSectionRemove,
  onSectionAdd,
  onSectionUpdate,
  isGenerating,
  onGenerateWithAI
}: SectionManagerProps) {
  const { t } = useLanguage();
  const getTranslatedSectionTitle = useTranslatedSectionTitle;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">{t.ui.resumeSections}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sections List */}
        <div className="space-y-3">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            const isVisible = section.isVisible;
            const preview = getSectionPreview(section);
            
            return (
              <div key={section.id}>
                <div
                  className={`group relative p-4 border rounded-xl cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-md ${
                    isActive
                      ? 'border-blue-500 bg-blue-50 shadow-sm ring-2 ring-blue-100'
                      : isVisible
                      ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                      : 'border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-100/50'
              }`}
              onClick={() => onSectionSelect(section.id)}
                  title={`Click to edit ${getTranslatedSectionTitle(section.type)}`}
            >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-xl"></div>
                  )}
                  
              <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      {/* Section Icon */}
                      <div className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                      }`}>
                        {getSectionIcon(section.type)}
                      </div>
                      
                      {/* Section Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold text-sm transition-colors ${
                            isActive 
                              ? 'text-blue-900' 
                              : 'text-gray-900 group-hover:text-blue-800'
                          }`}>
                            {getTranslatedSectionTitle(section.type)}
                          </span>
                          {!isVisible && (
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                              Hidden
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-1 transition-colors ${
                          isActive 
                            ? 'text-blue-700' 
                            : 'text-gray-500 group-hover:text-blue-600'
                        }`}>
                          {preview}
                        </p>
                      </div>
                </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSectionMoveUp(section.id);
                    }}
                    disabled={index === 0}
                    variant="ghost"
                    size="sm"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-100 disabled:opacity-30 transition-colors"
                        title="Move section up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSectionMoveDown(section.id);
                    }}
                    disabled={index === sections.length - 1}
                    variant="ghost"
                    size="sm"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-100 disabled:opacity-30 transition-colors"
                        title="Move section down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSectionToggleVisibility(section.id);
                    }}
                    variant="ghost"
                    size="sm"
                        className="h-8 w-8 p-0 transition-colors"
                        title={isVisible ? "Hide section" : "Show section"}
                  >
                        {isVisible ? (
                          <Eye className="h-4 w-4 text-green-600 hover:text-green-700" />
                    ) : (
                          <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSectionRemove(section.id);
                    }}
                    variant="ghost"
                    size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                        title="Remove section"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                </div>
                
                {/* Expanded Editor */}
                {isActive && (
                  <SectionEditor
                    section={section}
                    onUpdate={onSectionUpdate}
                    isGenerating={isGenerating}
                    onGenerateWithAI={onGenerateWithAI}
                  />
                )}
            </div>
            );
          })}
        </div>

        {/* Add Section */}
        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-2">Add New Section</div>
          <Select onValueChange={(value) => {
            if (value) {
              onSectionAdd(value as ResumeSection['type']);
            }
          }}>
            <SelectTrigger className="w-full hover:border-blue-300 transition-colors">
              <SelectValue placeholder="Choose section type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summary" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>{t.sections.summary}</span>
              </SelectItem>
              <SelectItem value="experience" className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>{t.sections.experience}</span>
              </SelectItem>
              <SelectItem value="education" className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>{t.sections.education}</span>
              </SelectItem>
              <SelectItem value="skills" className="flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>{t.sections.skills}</span>
              </SelectItem>
              <SelectItem value="projects" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>{t.sections.projects}</span>
              </SelectItem>
              <SelectItem value="certifications" className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>{t.sections.certifications}</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
} 