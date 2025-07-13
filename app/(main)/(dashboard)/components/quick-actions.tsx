'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Search, 
  MessageSquare, 
  Target
} from 'lucide-react';

interface QuickActionsProps {
  resumeCount: number;
}

export function QuickActions({ resumeCount }: QuickActionsProps) {
  const actions = [
    {
      title: 'Create Resume',
      description: 'Build a new professional resume',
      icon: Plus,
      href: '/resume-builder?new=true',
      primary: true
    },
    {
      title: 'Find Jobs',
      description: 'Search and apply to job opportunities',
      icon: Search,
      href: '/job-search',
      primary: false
    },
    {
      title: 'Interview Prep',
      description: 'Practice common interview questions',
      icon: MessageSquare,
      href: '/interview-prep',
      primary: false
    },
    {
      title: 'Career Path',
      description: 'Explore career development options',
      icon: Target,
      href: '/career-path',
      primary: false
    }
  ];

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <div>
          <CardTitle className="text-xl font-semibold text-gray-900">Quick Actions</CardTitle>
          <p className="text-gray-600 mt-1">Get started with your career goals</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={index}
                className="group relative p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-start space-x-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    action.primary 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {action.description}
                    </p>
                    
                    <Link href={action.href}>
                      <Button
                        size="sm"
                        className={`${
                          action.primary
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
                        }`}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-900">Your Progress</h4>
            <span className="text-sm text-gray-500">{resumeCount} resumes created</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Profile Completion</span>
                <span className="text-sm font-medium text-gray-900">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Applications This Month</span>
                <span className="text-sm font-medium text-gray-900">12</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 