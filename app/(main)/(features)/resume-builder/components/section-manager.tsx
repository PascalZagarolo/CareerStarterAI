'use client';

import { ResumeSection } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronUp, ChevronDown, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useLanguage } from './i18n/language-context';

interface SectionManagerProps {
  sections: ResumeSection[];
  activeSection: string;
  onSectionSelect: (sectionId: string) => void;
  onSectionMoveUp: (sectionId: string) => void;
  onSectionMoveDown: (sectionId: string) => void;
  onSectionToggleVisibility: (sectionId: string) => void;
  onSectionRemove: (sectionId: string) => void;
  onSectionAdd: (type: ResumeSection['type']) => void;
}

export default function SectionManager({
  sections,
  activeSection,
  onSectionSelect,
  onSectionMoveUp,
  onSectionMoveDown,
  onSectionToggleVisibility,
  onSectionRemove,
  onSectionAdd
}: SectionManagerProps) {
  const { t } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Resume Sections</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sections List */}
        <div className="space-y-3">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                activeSection === section.id
                  ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onSectionSelect(section.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">{section.title}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSectionMoveUp(section.id);
                    }}
                    disabled={index === 0}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 disabled:opacity-30"
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
                    className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 disabled:opacity-30"
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
                    className="h-8 w-8 p-0"
                  >
                    {section.isVisible ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSectionRemove(section.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Section */}
        <div className="pt-2 border-t border-gray-200">
          <Select onValueChange={(value) => {
            if (value) {
              onSectionAdd(value as ResumeSection['type']);
            }
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Add Section..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summary">{t.sections.summary}</SelectItem>
              <SelectItem value="experience">{t.sections.experience}</SelectItem>
              <SelectItem value="education">{t.sections.education}</SelectItem>
              <SelectItem value="skills">{t.sections.skills}</SelectItem>
              <SelectItem value="projects">{t.sections.projects}</SelectItem>
              <SelectItem value="certifications">{t.sections.certifications}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
} 