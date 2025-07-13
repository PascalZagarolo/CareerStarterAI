'use client';

import { useState, useEffect } from 'react';
import { ResumeData, Template } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, Loader2, Clock } from 'lucide-react';
import { toast } from 'sonner';

import ResumeA4Preview from './resume-a4-preview';

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  selectedColorScheme: string;
  templates: Template[];
  language?: import('./i18n/translations').Language;
}

export default function ResumePreview({ resumeData, selectedTemplate, selectedColorScheme, templates, language }: ResumePreviewProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [lastEdited, setLastEdited] = useState<Date>(new Date());

  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  const currentColorScheme = currentTemplate?.colorSchemes?.find(cs => cs.id === selectedColorScheme);

  // If no color scheme is selected, try to use the first available one
  let colorSchemeToUse = currentColorScheme;
  if (!colorSchemeToUse && currentTemplate?.colorSchemes && currentTemplate.colorSchemes.length > 0) {
    colorSchemeToUse = currentTemplate.colorSchemes[0];
  }

  // Update last edited time whenever resume data changes
  useEffect(() => {
    setLastEdited(new Date());
  }, [resumeData]);

  // Update the display every minute to keep "ago" times current
  useEffect(() => {
    const interval = setInterval(() => {
      // Force a re-render to update the time display
      setLastEdited(prev => new Date(prev.getTime()));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatLastEdited = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };



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
      console.log(resumeData);
      const name = resumeData.personalInfo.fullName || 'Resume';
      const filename = `${name.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`;
      const params = new URLSearchParams({
        template: selectedTemplate,
        color: selectedColorScheme,
        language: language || 'en',
        data: encodeURIComponent(JSON.stringify(resumeData)),
      });
      
      // Direct PDF download
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
      {/* Last edited indicator */}
      <div className="px-6 pb-2">
        <div className="flex items-center justify-end text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>Last edited: {formatLastEdited(lastEdited)}</span>
        </div>
      </div>
      <CardContent>
        <div className="rounded-lg overflow-hidden bg-gray-50 flex justify-center ">
          <div className="flex flex-col gap-6 aspect-[1/1.414] max-w-full border">
            {/* Single page preview */}
            <ResumeA4Preview
              resumeData={resumeData}
              selectedTemplate={selectedTemplate}
              selectedColorScheme={selectedColorScheme}
              templates={templates}
              language={language}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 