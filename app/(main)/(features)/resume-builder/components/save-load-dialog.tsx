'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

import { useSavedResumes } from '@/lib/hooks/use-saved-resumes';
import { ResumeData } from './types';
import { Save, Loader2, Trash2, Calendar, Star, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserResume } from '@/db/schema';


interface SaveLoadDialogProps {
  currentData: ResumeData;
  currentTemplateId: string;
  currentColorSchemeId: string;
  onLoadResume: (data: ResumeData, templateId: string, colorSchemeId: string) => void;
  trigger?: React.ReactNode;
}

export function SaveLoadDialog({
  currentData,
  currentTemplateId,
  currentColorSchemeId,
  onLoadResume,
  trigger
}: SaveLoadDialogProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'save' | 'load'>('load');
  const [saveName, setSaveName] = useState('');
  const [saveDescription, setSaveDescription] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const {
    resumes,
    loading,
    error,
    fetchResumes,
    saveResume,
    deleteResume,
    parseResumeData
  } = useSavedResumes();

  useEffect(() => {
    if (open) {
      fetchResumes();
    }
  }, [open, fetchResumes]);

  const handleSave = async () => {
    if (!saveName.trim()) return;

    const savedResume = await saveResume({
      name: saveName.trim(),
      description: saveDescription.trim() || undefined,
      templateId: currentTemplateId,
      colorSchemeId: currentColorSchemeId,
      data: currentData,
      imageUrl: currentData.personalInfo.profilePicture,
      isDefault
    });

    if (savedResume) {
      setSaveName('');
      setSaveDescription('');
      setIsDefault(false);
      setMode('load');
    }
  };

  const handleLoad = async (resume: UserResume) => {
    const parsedData = parseResumeData(resume.data);
    if (parsedData) {
      onLoadResume(parsedData, resume.templateId, resume.colorSchemeId);
      setOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this resume?')) {
      await deleteResume(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save/Load
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Save & Load Resumes</DialogTitle>
        </DialogHeader>

        <div className="flex space-x-4 mb-4">
                      <Button
              variant={mode === 'load' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('load')}
            >
              <Download className="w-4 h-4 mr-2" />
              Load Resume
            </Button>
          <Button
            variant={mode === 'save' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('save')}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Resume
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {mode === 'save' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="save-name">Resume Name *</Label>
              <Input
                id="save-name"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="Enter resume name"
                className="mt-1"
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
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is-default"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="is-default">Set as default resume</Label>
            </div>
            <Button
              onClick={handleSave}
              disabled={!saveName.trim() || loading}
              className="w-full"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Resume
            </Button>
          </div>
        )}

        {mode === 'load' && (
          <div className="h-[400px] pr-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : resumes.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No saved resumes found. Create your first resume!
              </div>
            ) : (
              <div className="space-y-3">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium truncate">{resume.name}</h3>
                          {resume.isDefault && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Default
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            v{resume.version}
                          </Badge>
                        </div>
                        {resume.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {resume.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(String(resume.updatedAt))}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {resume.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => handleLoad(resume)}
                          disabled={loading}
                        >
                          Load
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(resume.id)}
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 