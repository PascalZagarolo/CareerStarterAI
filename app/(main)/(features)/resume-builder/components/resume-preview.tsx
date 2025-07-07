'use client';

import { useState } from 'react';
import { ResumeData, Template } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import ResumeA4Preview from './resume-a4-preview';

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  selectedColorScheme: string;
  templates: Template[];
}

export default function ResumePreview({ resumeData, selectedTemplate, selectedColorScheme, templates }: ResumePreviewProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  const currentColorScheme = currentTemplate?.colorSchemes?.find(cs => cs.id === selectedColorScheme);

  // If no color scheme is selected, try to use the first available one
  let colorSchemeToUse = currentColorScheme;
  if (!colorSchemeToUse && currentTemplate?.colorSchemes && currentTemplate.colorSchemes.length > 0) {
    colorSchemeToUse = currentTemplate.colorSchemes[0];
  }

 

  const handlePrint = () => {
    const params = new URLSearchParams({
      template: selectedTemplate,
      color: selectedColorScheme,
      data: encodeURIComponent(JSON.stringify(resumeData)),
    });
    window.open(`/resume-export?${params.toString()}#print`, '_blank');
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const name = resumeData.personalInfo.fullName || 'Resume';
      const filename = `${name.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`;
      const params = new URLSearchParams({
        template: selectedTemplate,
        color: selectedColorScheme,
        data: encodeURIComponent(JSON.stringify(resumeData)),
      });
      const downloadUrl = `/api/pdf?${params.toString()}`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Live Preview
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="text-gray-700">
              <Eye className="h-4 w-4 mr-2" />
              Print View
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownloadPDF} 
              disabled={isGeneratingPDF}
              className="text-gray-700"
            >
              {isGeneratingPDF ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden bg-gray-50 flex justify-center px-2">
          <div className="flex flex-col gap-6">
            {/* Single page preview */}
            <ResumeA4Preview
              resumeData={resumeData}
              selectedTemplate={selectedTemplate}
              selectedColorScheme={selectedColorScheme}
              templates={templates}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 