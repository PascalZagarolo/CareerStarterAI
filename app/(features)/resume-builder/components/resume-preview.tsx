'use client';

import { useRef } from 'react';
import { ResumeData } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { templates, getTemplateById, getColorSchemeById } from './templates/template-data';
import { templateComponents } from './templates';

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  selectedColorScheme: string;
}

export default function ResumePreview({ resumeData, selectedTemplate, selectedColorScheme }: ResumePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  const currentTemplate = getTemplateById(selectedTemplate);
  const currentColorScheme = getColorSchemeById(selectedTemplate, selectedColorScheme);

  const renderTemplate = () => {
    if (!currentTemplate || !currentColorScheme) {
      return <div className="p-8 text-center text-gray-500">Please select a template and color scheme</div>;
    }

    // For now, we'll use a simple mapping since dynamic imports are complex in this context
    let Component;
    switch (currentTemplate.id) {
      case 'professional-classic':
        const { default: ProfessionalClassic } = require('./templates/professional-classic');
        Component = ProfessionalClassic;
        break;
      case 'modern-minimal':
        const { default: ModernMinimal } = require('./templates/modern-minimal');
        Component = ModernMinimal;
        break;
      case 'creative-sidebar':
        const { default: CreativeSidebar } = require('./templates/creative-sidebar');
        Component = CreativeSidebar;
        break;
      case 'executive-two-column':
        const { default: ExecutiveTwoColumn } = require('./templates/executive-two-column');
        Component = ExecutiveTwoColumn;
        break;
      case 'startup-modern':
        const { default: StartupModern } = require('./templates/startup-modern');
        Component = StartupModern;
        break;
      default:
        // Fallback to professional classic
        const { default: FallbackTemplate } = require('./templates/professional-classic');
        Component = FallbackTemplate;
    }

    return (
      <Component 
        data={resumeData} 
        colorScheme={currentColorScheme}
      />
    );
  };

  const handleDownload = () => {
    // TODO: Implement PDF download functionality
    console.log('Download PDF');
  };

  const handlePrint = () => {
    if (previewRef.current) {
      window.print();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-900">Live Preview</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="text-gray-700">
              <Eye className="h-4 w-4 mr-2" />
              Print View
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="text-gray-700">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden bg-gray-50 flex justify-center">
          <div 
            ref={previewRef}
            className="bg-white shadow-lg"
            style={{
              width: '210mm', // A4 width
              minHeight: '297mm', // A4 height
              maxHeight: '297mm',
              overflow: 'hidden'
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 