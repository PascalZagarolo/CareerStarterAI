import { useState, useCallback } from 'react';
import { UserResume } from '@/db/schema';

export interface ResumeSection {
  id: string;
  type: 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications';
  title: string;
  content: any;
  isVisible: boolean;
  order: number;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
  };
  sections: ResumeSection[];
  template: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

export interface SaveResumeParams {
  name: string;
  description?: string;
  templateId: string;
  colorSchemeId: string;
  data: ResumeData;
  isDefault?: boolean;
}

export interface UpdateResumeParams extends Partial<SaveResumeParams> {
  id: string;
  status?: 'draft' | 'published' | 'archived';
}

export function useSavedResumes() {
  const [resumes, setResumes] = useState<UserResume[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all resumes for the current user
  const fetchResumes = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/resumes');
      if (!response.ok) {
        throw new Error('Failed to fetch resumes');
      }
      
      const data = await response.json();
      setResumes(data.resumes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching resumes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save a new resume
  const saveResume = useCallback(async (params: SaveResumeParams): Promise<UserResume | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save resume');
      }
      
      const data = await response.json();
      setResumes(prev => [data.resume, ...prev]);
      return data.resume;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error saving resume:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing resume
  const updateResume = useCallback(async (params: UpdateResumeParams): Promise<UserResume | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/resumes/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update resume');
      }
      
      const data = await response.json();
      setResumes(prev => 
        prev.map(resume => 
          resume.id === params.id ? data.resume : resume
        )
      );
      return data.resume;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error updating resume:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load a specific resume
  const loadResume = useCallback(async (id: string): Promise<UserResume | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/resumes/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to load resume');
      }
      
      const data = await response.json();
      return data.resume;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error loading resume:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a resume
  const deleteResume = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete resume');
      }
      
      setResumes(prev => prev.filter(resume => resume.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error deleting resume:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get default resume
  const getDefaultResume = useCallback((): UserResume | null => {
    return resumes.find(resume => resume.isDefault) || null;
  }, [resumes]);

  // Parse resume data from JSON string
  const parseResumeData = useCallback((data: string): ResumeData | null => {
    try {
      return JSON.parse(data);
    } catch (err) {
      console.error('Error parsing resume data:', err);
      return null;
    }
  }, []);

  return {
    resumes,
    loading,
    error,
    fetchResumes,
    saveResume,
    updateResume,
    loadResume,
    deleteResume,
    getDefaultResume,
    parseResumeData,
  };
} 