'use client';

import { Template } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

export default function TemplateSelector({ 
  templates, 
  selectedTemplate, 
  onTemplateChange 
}: TemplateSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-900">Design Templates</CardTitle>
          <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Suggest Template
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`relative cursor-pointer rounded-lg border-2 transition-all hover:shadow-md ${
                selectedTemplate === template.id
                  ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="aspect-[4/3] bg-gray-100 rounded-t-lg flex items-center justify-center">
                <div className="text-center">
                  <div 
                    className="w-8 h-8 rounded mx-auto mb-2"
                    style={{ backgroundColor: template.colors.primary }}
                  ></div>
                  <div className="text-xs text-gray-600 font-medium">{template.name}</div>
                </div>
              </div>
              <div className="p-3">
                <div className="text-sm font-medium text-gray-900">{template.name}</div>
                <div className="text-xs text-gray-500">{template.fontFamily}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 