'use client';

import { Button } from '@/components/ui/button';
import { Download, Save } from 'lucide-react';
import { SaveLoadDialog } from './save-load-dialog';
import { ResumeData } from './types';

interface HeaderProps {
  onDownloadPDF: () => void;
  currentResumeData: ResumeData;
  currentTemplateId: string;
  currentColorSchemeId: string;
  onLoadResume: (data: ResumeData, templateId: string, colorSchemeId: string) => void;
}

export default function Header({ 
  onDownloadPDF, 
  currentResumeData, 
  currentTemplateId, 
  currentColorSchemeId, 
  onLoadResume 
}: HeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1>
            <p className="text-gray-600">Create a professional resume in minutes</p>
          </div>
          <div className="flex items-center gap-3">
            <SaveLoadDialog
              currentData={currentResumeData}
              currentTemplateId={currentTemplateId}
              currentColorSchemeId={currentColorSchemeId}
              onLoadResume={onLoadResume}
              trigger={
                <Button variant="outline" className="border-gray-300">
                  <Save className="w-4 h-4 mr-2" />
                  Save/Load
                </Button>
              }
            />
            <Button
              onClick={onDownloadPDF}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 