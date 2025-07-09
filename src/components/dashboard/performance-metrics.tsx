import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Award,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';

interface PerformanceMetricsProps {
  metrics: {
    resumeCompletionRate: number;
    applicationSuccessRate: number;
    averageTimeToResponse: number;
    topPerformingResume?: string;
  };
  loading?: boolean;
}

const getMetricColor = (value: number, threshold: number) => {
  if (value >= threshold) return 'text-green-600';
  if (value >= threshold * 0.8) return 'text-yellow-600';
  return 'text-red-600';
};

const getMetricIcon = (value: number, threshold: number) => {
  if (value >= threshold) return <CheckCircle className="h-4 w-4 text-green-600" />;
  if (value >= threshold * 0.8) return <AlertCircle className="h-4 w-4 text-yellow-600" />;
  return <AlertCircle className="h-4 w-4 text-red-600" />;
};

export function PerformanceMetrics({ metrics, loading = false }: PerformanceMetricsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-gray-400" />
            <span>Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
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
        <CardTitle className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-indigo-600" />
          <span>Performance Metrics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resume Completion Rate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">Resume Completion</h4>
              {getMetricIcon(metrics.resumeCompletionRate, 90)}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className={`text-2xl font-bold ${getMetricColor(metrics.resumeCompletionRate, 90)}`}>
                {metrics.resumeCompletionRate}%
              </span>
              <span className="text-sm text-gray-500">completion rate</span>
            </div>
            <Progress 
              value={metrics.resumeCompletionRate} 
              variant={metrics.resumeCompletionRate >= 90 ? 'success' : metrics.resumeCompletionRate >= 80 ? 'warning' : 'danger'}
              className="h-2"
            />
            <p className="text-xs text-gray-500">
              {metrics.resumeCompletionRate >= 90 
                ? 'Excellent! Your resumes are well-completed' 
                : metrics.resumeCompletionRate >= 80 
                ? 'Good progress, consider adding more details' 
                : 'Consider completing more sections for better results'
              }
            </p>
          </div>

          {/* Application Success Rate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">Success Rate</h4>
              {getMetricIcon(metrics.applicationSuccessRate, 25)}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className={`text-2xl font-bold ${getMetricColor(metrics.applicationSuccessRate, 25)}`}>
                {metrics.applicationSuccessRate}%
              </span>
              <span className="text-sm text-gray-500">response rate</span>
            </div>
            <Progress 
              value={metrics.applicationSuccessRate} 
              variant={metrics.applicationSuccessRate >= 25 ? 'success' : metrics.applicationSuccessRate >= 15 ? 'warning' : 'danger'}
              className="h-2"
            />
            <p className="text-xs text-gray-500">
              {metrics.applicationSuccessRate >= 25 
                ? 'Outstanding! Above industry average' 
                : metrics.applicationSuccessRate >= 15 
                ? 'Good rate, keep optimizing your applications' 
                : 'Consider improving your resume and targeting'
              }
            </p>
          </div>

          {/* Average Response Time */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">Response Time</h4>
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                {metrics.averageTimeToResponse}
              </span>
              <span className="text-sm text-gray-500">days average</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div 
                className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((metrics.averageTimeToResponse / 7) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {metrics.averageTimeToResponse <= 3 
                ? 'Fast responses! Companies are interested' 
                : metrics.averageTimeToResponse <= 7 
                ? 'Normal response time, be patient' 
                : 'Consider following up on applications'
              }
            </p>
          </div>

          {/* Top Performing Resume */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">Top Resume</h4>
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="space-y-2">
              {metrics.topPerformingResume ? (
                <>
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">
                    {metrics.topPerformingResume}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Best performing
                  </Badge>
                </>
              ) : (
                <p className="text-sm text-gray-500">No data available yet</p>
              )}
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full w-3/4" />
            </div>
            <p className="text-xs text-gray-500">
              {metrics.topPerformingResume 
                ? 'This resume gets the most responses' 
                : 'Create and track your first resume'
              }
            </p>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
          <div className="flex items-start space-x-3">
            <Target className="h-5 w-5 text-indigo-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-indigo-900">Performance Insights</h4>
              <p className="text-xs text-indigo-700 mt-1">
                {metrics.applicationSuccessRate >= 25 
                  ? 'You\'re performing above average! Keep up the great work.' 
                  : 'Focus on optimizing your resume and targeting the right positions.'
                }
              </p>
              <button className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                View detailed analytics →
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 