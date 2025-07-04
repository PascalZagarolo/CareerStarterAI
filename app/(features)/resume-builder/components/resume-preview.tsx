'use client';

import { useRef, useState, useEffect } from 'react';
import { ResumeData, Template } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import ProfessionalClassic from './templates/professional-classic';
import ModernMinimal from './templates/modern-minimal';
import CreativeSidebar from './templates/creative-sidebar';
import ExecutiveTwoColumn from './templates/executive-two-column';
import StartupModern from './templates/startup-modern';

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  selectedColorScheme: string;
  templates: Template[];
}

export default function ResumePreview({ resumeData, selectedTemplate, selectedColorScheme, templates }: ResumePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);

  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  const currentColorScheme = currentTemplate?.colorSchemes?.find(cs => cs.id === selectedColorScheme);

  // Detect content overflow and calculate needed pages
  useEffect(() => {
    if (!previewRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const container = previewRef.current;
      if (!container) return;

      // Get the content height
      const contentHeight = container.scrollHeight;
      const pageHeight = 297; // A4 height in mm
      const pageHeightPx = (pageHeight * 96) / 25.4; // Convert mm to pixels (96 DPI)

      // Calculate how many pages we need
      const neededPages = Math.ceil(contentHeight / pageHeightPx);
      setPageCount(Math.max(1, neededPages));
    });

    resizeObserver.observe(previewRef.current);

    return () => resizeObserver.disconnect();
  }, [resumeData, selectedTemplate, selectedColorScheme]);

  const renderTemplate = () => {
    if (!currentTemplate) {
      return <div className="p-8 text-center text-gray-500">Please select a template</div>;
    }
    
    if (!currentColorScheme) {
      return <div className="p-8 text-center text-gray-500">Please select a color scheme</div>;
    }

    // For now, we'll use a simple mapping since dynamic imports are complex in this context
    let Component;
    switch (currentTemplate.id) {
      case 'professional-classic':
        Component = ProfessionalClassic;
        break;
      case 'modern-minimal':
        Component = ModernMinimal;
        break;
      case 'creative-sidebar':
        Component = CreativeSidebar;
        break;
      case 'executive-two-column':
        Component = ExecutiveTwoColumn;
        break;
      case 'startup-modern':
        Component = StartupModern;
        break;
      default:
        // Fallback to professional classic
        Component = ProfessionalClassic;
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
          <CardTitle className="text-lg font-semibold text-gray-900">
            Live Preview {pageCount > 1 && `(${pageCount} pages)`}
          </CardTitle>
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
        <div className="border rounded-lg overflow-hidden bg-gray-50 flex justify-center px-2">
          <div className="flex flex-col gap-6">
            {/* Render multiple pages if needed */}
            {Array.from({ length: pageCount }, (_, index) => (
              <div 
                key={index}
                className="bg-white shadow-xl border border-gray-200 relative overflow-hidden px-4 py-4"
                style={{
                  width: '210mm', // A4 width
                  height: '297mm', // A4 height
                  aspectRatio: '210/297', // A4 aspect ratio (1:1.41)
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  pageBreakAfter: index < pageCount - 1 ? 'always' : 'auto',
                  pageBreakInside: 'avoid',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px'
                }}
              >
                {/* Page number indicator */}
                <div className="absolute top-2 right-8 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium z-10">
                  Page {index + 1}
                </div>
                
                {/* Content container with proper clipping */}
                <div 
                  className="absolute inset-0"
                  style={{
                    clipPath: `inset(${index * 297}mm 0 ${(pageCount - index - 1) * 297}mm 0)`,
                    transform: `translateY(-${index * 297}mm)`
                  }}
                >
                  {renderTemplate()}
                </div>
                
                {/* Page fold effect */}
                <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-br from-transparent to-gray-200 opacity-50 z-5"></div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 