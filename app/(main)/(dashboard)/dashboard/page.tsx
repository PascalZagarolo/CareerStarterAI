'use client';

import { useEffect } from 'react';
import { useAuth } from '@/components/auth-wrapper';
import { useSavedResumes } from '@/lib/hooks/use-saved-resumes';
import { useDashboardStats } from '@/lib/hooks/use-dashboard-stats';
import { 
  DashboardHeader,
  StatsOverview,
  ResumeManagement,
  QuickActions,
  AccountOverview,
  DashboardSkeleton,
  AuthRequired
} from '../components';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { UsageQuota } from '@/components/dashboard/usage-quota';
import { PerformanceMetrics } from '@/components/dashboard/performance-metrics';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const { resumes, loading: resumesLoading, fetchResumes, deleteResume } = useSavedResumes();
  const { stats, loading: statsLoading, refreshStats } = useDashboardStats();
  
  useEffect(() => {
    if (user) {
      fetchResumes();
    }
  }, [user, fetchResumes]);
  
  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteResume = async (id: string) => {
    if (confirm('Are you sure you want to delete this resume?')) {
      await deleteResume(id);
    }
  };
  
  if (loading || statsLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return <AuthRequired />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader userName={user.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your career resources and track your progress</p>
        </div>

        {/* Stats Overview - Full Width */}
        {stats && (
          <div className="mb-10">
            <StatsOverview stats={stats} />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Column - Main Content (3 columns) */}
          <div className="xl:col-span-3 space-y-8">
            {/* Resume Management - Most Important */}
            <div>
              <ResumeManagement 
                resumes={resumes}
                loading={resumesLoading}
                onDeleteResume={handleDeleteResume}
              />
            </div>

            {/* Performance Metrics */}
            {stats && (
              <div>
                <PerformanceMetrics 
                  metrics={stats.performanceMetrics}
                  loading={statsLoading}
                />
              </div>
            )}

            {/* Quick Actions */}
            <div>
              <QuickActions resumeCount={resumes.length} />
            </div>
          </div>

          {/* Right Column - Sidebar (1 column) */}
          <div className="space-y-8">
            {/* Account Overview - Most Important Sidebar Item */}
            <div>
              <AccountOverview 
                user={user}
                stats={stats}
                resumeCount={resumes.length}
              />
            </div>

            {/* Usage Quota */}
            {stats && (
              <div>
                <UsageQuota 
                  quotas={stats.usageQuota}
                  subscriptionStatus={stats.subscriptionStatus}
                  loading={statsLoading}
                />
              </div>
            )}

            {/* Activity Feed */}
            {stats && (
              <div>
                <ActivityFeed 
                  activities={stats.recentActivity}
                  loading={statsLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 