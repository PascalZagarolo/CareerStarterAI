'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Download, Loader2 } from 'lucide-react';
import { SaveDialog } from '../components/save-dialog';
import { LoadDialog } from '../components/load-dialog';
import { ResumeData } from './types';
import { useSavedResumes } from '@/lib/hooks/use-saved-resumes';
import { toast } from 'sonner';

interface HeaderProps {
  currentResumeData: ResumeData;
  currentTemplateId: string;
  currentColorSchemeId: string;
  onLoadResume: (data: ResumeData, templateId: string, colorSchemeId: string) => void;
  currentResumeId?: string | null;
  onResumeNameChange?: (name: string) => void;
  currentResumeName?: string;
}

export default function Header({ 
  currentResumeData, 
  currentTemplateId, 
  currentColorSchemeId, 
  onLoadResume,
  currentResumeId,
  onResumeNameChange,
  currentResumeName = "Untitled Resume"
}: HeaderProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [resumeName, setResumeName] = useState(currentResumeName);
  const { updateResume } = useSavedResumes();
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Update resume name when prop changes
  useEffect(() => {
    setResumeName(currentResumeName);
  }, [currentResumeName]);

  // Handle Ctrl+S shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleQuickSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentResumeData, currentTemplateId, currentColorSchemeId, resumeName, currentResumeId]);

  const handleQuickSave = async () => {
    if (!currentResumeId) {
      // If no current resume, open save dialog
      setSaveDialogOpen(true);
      return;
    }

    setIsSaving(true);
    try {
      const updatedResume = await updateResume({
        id: currentResumeId,
        name: resumeName,
        templateId: currentTemplateId,
        colorSchemeId: currentColorSchemeId,
        data: currentResumeData,
        isDefault: false
      });

      if (updatedResume) {
        toast.success('Resume saved successfully');
      }
    } catch (error) {
      console.error('Quick save failed:', error);
      toast.error('Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNameChange = (newName: string) => {
    setResumeName(newName);
    onResumeNameChange?.(newName);
  };

  const handleNameBlur = () => {
    if (resumeName.trim() === '') {
      setResumeName('Untitled Resume');
      onResumeNameChange?.('Untitled Resume');
    }
  };

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: Title and description */}
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1>
            <p className="text-gray-600">Create a professional resume in minutes</p>
          </div>
        </div>
        
        {/* Bottom row: Resume name input and action buttons */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Resume Name:</span>
              <Input
                ref={nameInputRef}
                value={resumeName}
                onChange={(e) => handleNameChange(e.target.value)}
                onBlur={handleNameBlur}
                placeholder="Enter resume name"
                className="max-w-xs"
                disabled={isSaving}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setLoadDialogOpen(true)}
              disabled={isSaving}
              className="border-gray-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Load
            </Button>
            
            <Button
              onClick={handleQuickSave}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save
              <span className="ml-2 text-xs opacity-75">Ctrl+S</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      <SaveDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        currentData={currentResumeData}
        currentTemplateId={currentTemplateId}
        currentColorSchemeId={currentColorSchemeId}
        currentResumeId={currentResumeId}
        currentResumeName={resumeName}
      />

      {/* Load Dialog */}
      <LoadDialog
        open={loadDialogOpen}
        onOpenChange={setLoadDialogOpen}
        onLoadResume={onLoadResume}
      />
    </div>
  );
} 