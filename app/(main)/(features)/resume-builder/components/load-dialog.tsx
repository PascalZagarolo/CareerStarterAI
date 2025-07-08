'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Trash2, Calendar, Star, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useSavedResumes } from '@/lib/hooks/use-saved-resumes';
import { ResumeData } from './types';
import { UserResume } from '@/db/schema';
import { toast } from 'sonner';

interface LoadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoadResume: (data: ResumeData, templateId: string, colorSchemeId: string) => void;
}

export function LoadDialog({
  open,
  onOpenChange,
  onLoadResume
}: LoadDialogProps) {
  const [loading, setLoading] = useState(false);

  const {
    resumes,
    loading: fetchLoading,
    error,
    fetchResumes,
    deleteResume,
    parseResumeData
  } = useSavedResumes();

  useEffect(() => {
    if (open) {
      fetchResumes();
    }
  }, [open, fetchResumes]);

  const handleLoad = async (resume: UserResume) => {
    setLoading(true);
    try {
      const parsedData = parseResumeData(resume.data);
      if (parsedData) {
        onLoadResume(parsedData, resume.templateId, resume.colorSchemeId);
        onOpenChange(false);
      } else {
        // Show error to user when parsing fails
        toast.error(`Failed to load resume "${resume.name}". The data appears to be corrupted.`);
      }
    } catch (error) {
      console.error('Load failed:', error);
      toast.error(`Failed to load resume "${resume.name}". Please try again.`);
    } finally {
      setLoading(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Load Resume</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="h-[400px] pr-4">
          {fetchLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : resumes.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Download className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No saved resumes found.</p>
              <p className="text-sm">Create your first resume to get started!</p>
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
                        <Download className="w-4 h-4 mr-1" />
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
      </DialogContent>
    </Dialog>
  );
} 