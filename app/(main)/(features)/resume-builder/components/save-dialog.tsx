'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useSavedResumes } from '@/lib/hooks/use-saved-resumes';
import { ResumeData } from './types';
import { toast } from 'sonner';

interface SaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentData: ResumeData;
  currentTemplateId: string;
  currentColorSchemeId: string;
  currentResumeId?: string | null;
  currentResumeName?: string;
}

export function SaveDialog({
  open,
  onOpenChange,
  currentData,
  currentTemplateId,
  currentColorSchemeId,
  currentResumeId,
  currentResumeName = "Untitled Resume"
}: SaveDialogProps) {
  console.log(currentResumeId);
  const [saveName, setSaveName] = useState(currentResumeName);
  const [saveDescription, setSaveDescription] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(false);

  const { saveResume } = useSavedResumes();

  // Reset form when dialog opens
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setSaveName(currentResumeName);
      setSaveDescription('');
      setIsDefault(false);
    }
    onOpenChange(newOpen);
  };

  const handleSave = async () => {
    if (!saveName.trim()) {
      toast.error('Please enter a resume name');
      return;
    }

    setLoading(true);
    try {
      const savedResume = await saveResume({
        name: saveName.trim(),
        description: saveDescription.trim() || undefined,
        templateId: currentTemplateId,
        colorSchemeId: currentColorSchemeId,
        data: currentData,
        isDefault
      });

      if (savedResume) {
        toast.success('Resume saved successfully');
        handleOpenChange(false);
      }
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('Failed to save resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Save Resume</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="save-name">Resume Name *</Label>
            <Input
              id="save-name"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Enter resume name"
              className="mt-1"
              disabled={loading}
            />
          </div>
          
          <div>
            <Label htmlFor="save-description">Description (Optional)</Label>
            <Textarea
              id="save-description"
              value={saveDescription}
              onChange={(e) => setSaveDescription(e.target.value)}
              placeholder="Brief description of this resume"
              className="mt-1"
              rows={2}
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is-default"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="rounded"
              disabled={loading}
            />
            <Label htmlFor="is-default">Set as default resume</Label>
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!saveName.trim() || loading}
              className="flex-1"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <Save className="w-4 h-4 mr-2" />
              Save Resume
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 