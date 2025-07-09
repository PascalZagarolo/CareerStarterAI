import { useState, useCallback, useEffect } from 'react';

export interface DashboardStats {
  totalResumes: number;
  totalCoverLetters: number;
  totalCareerPaths: number;
  totalJobApplications: number;
  resumeViews: number;
  applicationsThisMonth: number;
  applicationsLastMonth: number;
  averageResponseRate: number;
  interviewsScheduled: number;
  offersReceived: number;
  subscriptionStatus: 'free' | 'pro' | 'enterprise';
  subscriptionEndDate?: string;
  usageQuota: {
    resumes: { used: number; limit: number };
    coverLetters: { used: number; limit: number };
    careerPaths: { used: number; limit: number };
    aiGenerations: { used: number; limit: number };
  };
  recentActivity: Array<{
    id: string;
    type: 'resume_created' | 'resume_updated' | 'cover_letter_created' | 'job_applied' | 'interview_scheduled';
    title: string;
    description: string;
    timestamp: string;
    icon: string;
  }>;
  performanceMetrics: {
    resumeCompletionRate: number;
    applicationSuccessRate: number;
    averageTimeToResponse: number;
    topPerformingResume?: string;
  };
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call - replace with actual endpoint
      const response = await fetch('/api/dashboard/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      
      const data = await response.json();
      setStats(data.stats);
    } catch (err) {
      // Fallback to mock data for development
      const mockStats: DashboardStats = {
        totalResumes: 12,
        totalCoverLetters: 8,
        totalCareerPaths: 5,
        totalJobApplications: 47,
        resumeViews: 156,
        applicationsThisMonth: 12,
        applicationsLastMonth: 8,
        averageResponseRate: 23.4,
        interviewsScheduled: 6,
        offersReceived: 2,
        subscriptionStatus: 'pro',
        subscriptionEndDate: '2024-12-31',
        usageQuota: {
          resumes: { used: 12, limit: 50 },
          coverLetters: { used: 8, limit: 30 },
          careerPaths: { used: 5, limit: 20 },
          aiGenerations: { used: 89, limit: 200 },
        },
        recentActivity: [
          {
            id: '1',
            type: 'resume_updated',
            title: 'Software Engineer Resume Updated',
            description: 'Updated skills section with React and TypeScript',
            timestamp: '2024-01-15T10:30:00Z',
            icon: 'FileText',
          },
          {
            id: '2',
            type: 'job_applied',
            title: 'Applied to Senior Developer at TechCorp',
            description: 'Application submitted with custom cover letter',
            timestamp: '2024-01-14T15:45:00Z',
            icon: 'Briefcase',
          },
          {
            id: '3',
            type: 'interview_scheduled',
            title: 'Interview Scheduled with StartupXYZ',
            description: 'Technical interview scheduled for next week',
            timestamp: '2024-01-13T09:15:00Z',
            icon: 'Calendar',
          },
          {
            id: '4',
            type: 'cover_letter_created',
            title: 'Cover Letter Created for Product Manager Role',
            description: 'AI-generated cover letter for remote position',
            timestamp: '2024-01-12T14:20:00Z',
            icon: 'Mail',
          },
        ],
        performanceMetrics: {
          resumeCompletionRate: 94.2,
          applicationSuccessRate: 23.4,
          averageTimeToResponse: 3.2,
          topPerformingResume: 'Software Engineer Resume v3',
        },
      };
      
      setStats(mockStats);
      console.warn('Using mock dashboard stats - implement actual API endpoint');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refreshStats = useCallback(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refreshStats,
  };
} 