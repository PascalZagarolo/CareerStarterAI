import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Briefcase, 
  Calendar, 
  Mail, 
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'resume_created' | 'resume_updated' | 'cover_letter_created' | 'job_applied' | 'interview_scheduled';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  loading?: boolean;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'resume_created':
    case 'resume_updated':
      return <FileText className="h-4 w-4" />;
    case 'cover_letter_created':
      return <Mail className="h-4 w-4" />;
    case 'job_applied':
      return <Briefcase className="h-4 w-4" />;
    case 'interview_scheduled':
      return <Calendar className="h-4 w-4" />;
    default:
      return <TrendingUp className="h-4 w-4" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'resume_created':
    case 'resume_updated':
      return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'cover_letter_created':
      return 'bg-purple-50 text-purple-600 border-purple-200';
    case 'job_applied':
      return 'bg-green-50 text-green-600 border-green-200';
    case 'interview_scheduled':
      return 'bg-orange-50 text-orange-600 border-orange-200';
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200';
  }
};

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const activityTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

export function ActivityFeed({ activities, loading = false }: ActivityFeedProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Activity</span>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 animate-pulse">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Activity</span>
          <Clock className="h-4 w-4 text-gray-400" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-8">
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">No recent activity</p>
            </div>
          ) : (
            activities.slice(0, 6).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 group">
                <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {activity.type.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {activities.length > 6 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="w-full text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center space-x-1 transition-colors">
              <span>View all activity</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 