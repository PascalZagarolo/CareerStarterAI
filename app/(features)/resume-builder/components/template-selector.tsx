'use client';

import { Template } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Palette } from 'lucide-react';
import { useState } from 'react';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  selectedColorScheme: string;
  onTemplateChange: (templateId: string) => void;
  onColorSchemeChange: (colorSchemeId: string) => void;
}

export default function TemplateSelector({ 
  templates, 
  selectedTemplate, 
  selectedColorScheme,
  onTemplateChange,
  onColorSchemeChange
}: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'professional', name: 'Professional' },
    { id: 'modern', name: 'Modern' },
    { id: 'creative', name: 'Creative' },
    { id: 'classic', name: 'Classic' },
    { id: 'minimal', name: 'Minimal' }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  

  return (
    <div className="space-y-6">
      {/* Template Selection */}
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
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid - Scrollable */}
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => onTemplateChange(template.id)}
                  className={`relative cursor-pointer rounded-lg border-2 transition-all hover:shadow-md flex-shrink-0 ${
                    selectedTemplate === template.id
                      ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ width: '280px' }}
                >
                  <div className="aspect-[4/3] bg-gray-100 rounded-t-lg flex items-center justify-center p-4">
                    <div className="text-center w-full">
                      <div className="flex justify-center mb-2">
                        {template.colorSchemes.slice(0, 3).map((scheme, index) => (
                          <div
                            key={scheme.id}
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ 
                              backgroundColor: scheme.primary,
                              marginLeft: index > 0 ? '-8px' : '0'
                            }}
                          ></div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">{template.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-medium text-gray-900">{template.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{template.category} • {template.layout}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Scheme Selection */}
      {currentTemplate && (
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Palette className="h-4 w-4 mr-2 text-indigo-600" />
              <CardTitle className="text-lg font-semibold text-gray-900">Color Scheme</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentTemplate.colorSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  onClick={() => onColorSchemeChange(scheme.id)}
                  className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                    selectedColorScheme === scheme.id
                      ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-sm">{scheme.name}</span>
                    <div className="flex space-x-1">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: scheme.primary }}
                      ></div>
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: scheme.secondary }}
                      ></div>
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: scheme.accent }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Primary:</span>
                      <span className="font-mono">{scheme.primary}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Secondary:</span>
                      <span className="font-mono">{scheme.secondary}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Accent:</span>
                      <span className="font-mono">{scheme.accent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 