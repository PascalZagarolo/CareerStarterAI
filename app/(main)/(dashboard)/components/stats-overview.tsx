'use client';

import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { FileText, Briefcase, Send, Calendar } from 'lucide-react';
import { DashboardStats } from '@/lib/hooks/use-dashboard-stats';

interface StatsOverviewProps {
  stats: DashboardStats;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      title: 'Total Resumes',
      value: stats.totalResumes,
      trend: { value: 12, isPositive: true, period: 'last month' },
      icon: FileText,
      description: 'Active resumes in your portfolio'
    },
    {
      title: 'Job Applications',
      value: stats.totalJobApplications,
      trend: { value: 8, isPositive: true, period: 'last month' },
      icon: Briefcase,
      description: 'Applications submitted this month'
    },
    {
      title: 'Cover Letters',
      value: stats.totalCoverLetters,
      trend: { value: 24, isPositive: true, period: 'last month' },
      icon: Send,
      description: 'Cover letters created'
    },
    {
      title: 'Interviews',
      value: stats.interviewsScheduled,
      trend: { value: 3, isPositive: true, period: 'last month' },
      icon: Calendar,
      description: 'Interviews scheduled'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
        <p className="text-gray-600">Your career progress at a glance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
            className="bg-white border border-gray-200 hover:border-gray-300 transition-colors"
          />
        ))}
      </div>
    </div>
  );
} 