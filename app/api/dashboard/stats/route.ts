import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock data for now - in a real app, you'd fetch this from your database
    const mockStats = {
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
      subscriptionStatus: 'pro' as const,
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
          type: 'resume_updated' as const,
          title: 'Software Engineer Resume Updated',
          description: 'Updated skills section with React and TypeScript',
          timestamp: '2024-01-15T10:30:00Z',
          icon: 'FileText',
        },
        {
          id: '2',
          type: 'job_applied' as const,
          title: 'Applied to Senior Developer at TechCorp',
          description: 'Application submitted with custom cover letter',
          timestamp: '2024-01-14T15:45:00Z',
          icon: 'Briefcase',
        },
        {
          id: '3',
          type: 'interview_scheduled' as const,
          title: 'Interview Scheduled with StartupXYZ',
          description: 'Technical interview scheduled for next week',
          timestamp: '2024-01-13T09:15:00Z',
          icon: 'Calendar',
        },
        {
          id: '4',
          type: 'cover_letter_created' as const,
          title: 'Cover Letter Created for Product Manager Role',
          description: 'AI-generated cover letter for remote position',
          timestamp: '2024-01-12T14:20:00Z',
          icon: 'Mail',
        },
        {
          id: '5',
          type: 'resume_created' as const,
          title: 'New Resume Created',
          description: 'Created a new resume for marketing positions',
          timestamp: '2024-01-11T16:30:00Z',
          icon: 'FileText',
        },
        {
          id: '6',
          type: 'job_applied' as const,
          title: 'Applied to Marketing Manager at GrowthCo',
          description: 'Application submitted with tailored resume',
          timestamp: '2024-01-10T11:20:00Z',
          icon: 'Briefcase',
        },
      ],
      performanceMetrics: {
        resumeCompletionRate: 94.2,
        applicationSuccessRate: 23.4,
        averageTimeToResponse: 3.2,
        topPerformingResume: 'Software Engineer Resume v3',
      },
    };

    return NextResponse.json({ 
      stats: mockStats,
      success: true 
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 