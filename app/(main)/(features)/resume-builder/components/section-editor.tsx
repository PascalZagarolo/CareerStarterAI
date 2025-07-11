'use client';

import { useState } from 'react';
import { ResumeSection, Experience, Education, Project, Certification } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Sparkles, ChevronDown, ChevronRight, Edit3, Eye } from 'lucide-react';

interface SectionEditorProps {
  section: ResumeSection;
  onUpdate: (sectionId: string, updates: Partial<ResumeSection>) => void;
  isGenerating: boolean;
  onGenerateWithAI: (sectionId: string) => void;
}

// Helper function to get section preview content
const getSectionPreview = (section: ResumeSection) => {
  switch (section.type) {
    case 'summary':
      const summaryContent = Array.isArray(section.content) ? section.content[0] : '';
      return typeof summaryContent === 'string' && summaryContent ? summaryContent.slice(0, 100) + (summaryContent.length > 100 ? '...' : '') : 'No summary added';
    
    case 'experience':
      if (!Array.isArray(section.content) || section.content.length === 0) return 'No experience added';
      const exp = section.content[0] as Experience;
      return `${exp.position} at ${exp.company}` || 'No experience added';
    
    case 'education':
      if (!Array.isArray(section.content) || section.content.length === 0) return 'No education added';
      const edu = section.content[0] as Education;
      return `${edu.degree} in ${edu.field} from ${edu.institution}` || 'No education added';
    
    case 'skills':
      if (typeof section.content === 'object' && !Array.isArray(section.content)) {
        const technical = section.content.technical || [];
        const soft = section.content.soft || [];
        const allSkills = [...technical, ...soft];
        return allSkills.length > 0 ? allSkills.slice(0, 5).join(', ') + (allSkills.length > 5 ? '...' : '') : 'No skills added';
      }
      return 'No skills added';
    
    case 'projects':
      if (!Array.isArray(section.content) || section.content.length === 0) return 'No projects added';
      const proj = section.content[0] as Project;
      return proj.name || 'No projects added';
    
    case 'certifications':
      if (!Array.isArray(section.content) || section.content.length === 0) return 'No certifications added';
      const cert = section.content[0] as Certification;
      return `${cert.name} from ${cert.issuer}` || 'No certifications added';
    
    default:
      return 'Section content';
  }
};

export default function SectionEditor({ 
  section, 
  onUpdate, 
  isGenerating, 
  onGenerateWithAI 
}: SectionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const preview = getSectionPreview(section);

  const handleDoubleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const renderExpandedEditor = () => {
    switch (section.type) {
      case 'summary':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
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
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              <Button
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
                      <div className="space-y-2">
                        <Label htmlFor={`description-${exp.id}`} className="text-sm font-medium text-gray-700">Description</Label>
                        <Textarea
                          id={`description-${exp.id}`}
                          value={exp.description}
                          onChange={(e) => {
                            const newContent = Array.isArray(section.content) ? [...section.content] : [];
                            newContent[index] = { ...exp, description: e.target.value };
                            onUpdate(section.id, { content: newContent as Experience[]});
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
            <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
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
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
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
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              <Button
                onClick={() => {
                  const newProj: Project = {
                    id: `proj-${Date.now()}`,
                    name: '',
                    description: '',
                    technologies: []
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
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
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
    <Card className="mt-6">
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                {section.title}
                <Edit3 className="h-4 w-4 text-gray-400" />
              </CardTitle>
              {!isExpanded && (
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                  <Eye className="h-3 w-3" />
                  {preview}
                </p>
              )}
            </div>
          </div>
          {!isExpanded && (
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Double-click to edit
            </div>
          )}
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          {renderExpandedEditor()}
        </CardContent>
      )}
    </Card>
  );
} 