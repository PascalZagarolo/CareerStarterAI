'use client';

import { useRef, useState } from 'react';
import { ResumeData, Template } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import ProfessionalClassic from './templates/professional-classic';
import ModernMinimal from './templates/modern-minimal';
import CreativeSidebar from './templates/creative-sidebar';
import ExecutiveTwoColumn from './templates/executive-two-column';
import StartupModern from './templates/startup-modern';
import ResumeA4Preview from './resume-a4-preview';

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  selectedColorScheme: string;
  templates: Template[];
}

export default function ResumePreview({ resumeData, selectedTemplate, selectedColorScheme, templates }: ResumePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  const currentColorScheme = currentTemplate?.colorSchemes?.find(cs => cs.id === selectedColorScheme);

  // If no color scheme is selected, try to use the first available one
  let colorSchemeToUse = currentColorScheme;
  if (!colorSchemeToUse && currentTemplate?.colorSchemes && currentTemplate.colorSchemes.length > 0) {
    colorSchemeToUse = currentTemplate.colorSchemes[0];
  }

  const renderTemplate = () => {
    if (!currentTemplate) {
      return <div className="p-8 text-center text-gray-500">Please select a template</div>;
    }
    
    if (!colorSchemeToUse) {
      return <div className="p-8 text-center text-gray-500">No color schemes available for this template</div>;
    }

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
        Component = ProfessionalClassic;
    }

    return (
      <Component 
        data={resumeData} 
        colorScheme={colorSchemeToUse}
      />
    );
  };

  const handlePrint = () => {
    if (previewRef.current) {
      window.print();
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      // Prepare the profile data to pass to the PDF API
      const profileData = {
        name: resumeData.personalInfo.fullName || 'John Doe',
        occupation: 'Software Developer',
        website: resumeData.personalInfo.linkedin || 'linkedin.com/in/johndoe',
        email: resumeData.personalInfo.email || 'john.doe@email.com',
        phone: resumeData.personalInfo.phone || '+1 (555) 123-4567',
        profilePic: '/profile-pic-podpros-unsplash.jpg',
      };
      
      // Generate filename
      const name = resumeData.personalInfo.fullName || 'Resume';
      const filename = `${name.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`;
      
      // Encode the profile data and pass it to the PDF API
      const encodedProfileData = encodeURIComponent(JSON.stringify(profileData));
      const downloadUrl = `/api/pdf?profileData=${encodedProfileData}`;
      
      // Create a temporary link to trigger the download
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