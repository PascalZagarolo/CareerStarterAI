'use client';

import { ResumeSection, Experience } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Sparkles } from 'lucide-react';

interface SectionEditorProps {
  section: ResumeSection;
  onUpdate: (sectionId: string, updates: Partial<ResumeSection>) => void;
  isGenerating: boolean;
  onGenerateWithAI: (sectionId: string) => void;
}

export default function SectionEditor({ 
  section, 
  onUpdate, 
  isGenerating, 
  onGenerateWithAI 
}: SectionEditorProps) {
  const renderSectionEditor = () => {
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
                value={section.content}
                onChange={(e) => onUpdate(section.id, { content: e.target.value })}
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
                    content: [...section.content, newExp]
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
              {section.content.map((exp: Experience, index: number) => (
                <Card key={exp.id} className="border-gray-200">
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${exp.id}`} className="text-sm font-medium text-gray-700">Company</Label>
                        <Input
                          id={`company-${exp.id}`}
                          value={exp.company}
                          onChange={(e) => {
                            const newContent = [...section.content];
                            newContent[index] = { ...exp, company: e.target.value };
                            onUpdate(section.id, { content: newContent });
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
                            const newContent = [...section.content];
                            newContent[index] = { ...exp, position: e.target.value };
                            onUpdate(section.id, { content: newContent });
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
                            const newContent = [...section.content];
                            newContent[index] = { ...exp, startDate: e.target.value };
                            onUpdate(section.id, { content: newContent });
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
                            const newContent = [...section.content];
                            newContent[index] = { ...exp, endDate: e.target.value };
                            onUpdate(section.id, { content: newContent });
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
                          const newContent = [...section.content];
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
            <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technical-skills" className="text-sm font-medium text-gray-700">Technical Skills</Label>
                <Input
                  id="technical-skills"
                  value={section.content.technical.join(', ')}
                  onChange={(e) => {
                    const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    onUpdate(section.id, {
                      content: { ...section.content, technical: skills }
                    });
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
                  value={section.content.soft.join(', ')}
                  onChange={(e) => {
                    const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    onUpdate(section.id, {
                      content: { ...section.content, soft: skills }
                    });
                  }}
                  placeholder="Leadership, Communication, Problem Solving..."
                  className="text-gray-900 placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-500">Separate skills with commas</p>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-gray-600">Section editor not implemented for {section.type}</div>;
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">{section.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderSectionEditor()}
      </CardContent>
    </Card>
  );
} 