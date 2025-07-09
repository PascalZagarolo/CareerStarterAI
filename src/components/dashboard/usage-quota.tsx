import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Mail, 
  TrendingUp, 
  Zap,
  Crown,
  AlertCircle
} from 'lucide-react';

interface QuotaItem {
  name: string;
  used: number;
  limit: number;
  icon: React.ReactNode;
  color: string;
}

interface UsageQuotaProps {
  quotas: {
    resumes: { used: number; limit: number };
    coverLetters: { used: number; limit: number };
    careerPaths: { used: number; limit: number };
    aiGenerations: { used: number; limit: number };
  };
  subscriptionStatus: 'free' | 'pro' | 'enterprise';
  loading?: boolean;
}

const getQuotaItems = (quotas: UsageQuotaProps['quotas']): QuotaItem[] => [
  {
    name: 'Resumes',
    used: quotas.resumes.used,
    limit: quotas.resumes.limit,
    icon: <FileText className="h-4 w-4" />,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Cover Letters',
    used: quotas.coverLetters.used,
    limit: quotas.coverLetters.limit,
    icon: <Mail className="h-4 w-4" />,
    color: 'from-purple-500 to-pink-600'
  },
  {
    name: 'Career Paths',
    used: quotas.careerPaths.used,
    limit: quotas.careerPaths.limit,
    icon: <TrendingUp className="h-4 w-4" />,
    color: 'from-green-500 to-emerald-600'
  },
  {
    name: 'AI Generations',
    used: quotas.aiGenerations.used,
    limit: quotas.aiGenerations.limit,
    icon: <Zap className="h-4 w-4" />,
    color: 'from-orange-500 to-red-600'
  }
];

const getSubscriptionBadge = (status: string) => {
  switch (status) {
    case 'enterprise':
      return <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"><Crown className="h-3 w-3 mr-1" />Enterprise</Badge>;
    case 'pro':
      return <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"><Crown className="h-3 w-3 mr-1" />Pro</Badge>;
    default:
      return <Badge variant="outline">Free</Badge>;
  }
};

export function UsageQuota({ quotas, subscriptionStatus, loading = false }: UsageQuotaProps) {
  const quotaItems = getQuotaItems(quotas);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Usage Quota</span>
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getProgressVariant = (used: number, limit: number) => {
    const percentage = (used / limit) * 100;
    if (percentage >= 90) return 'danger';
    if (percentage >= 75) return 'warning';
    return 'default';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Usage Quota</span>
          {getSubscriptionBadge(subscriptionStatus)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quotaItems.map((item) => {
            const percentage = (item.used / item.limit) * 100;
            const isNearLimit = percentage >= 75;
            
            return (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`h-6 w-6 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white`}>
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    {isNearLimit && (
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {item.used.toLocaleString()} / {item.limit.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  variant={getProgressVariant(item.used, item.limit)}
                  className="h-2"
                />
                {isNearLimit && (
                  <p className="text-xs text-orange-600">
                    {percentage >= 90 ? 'Nearly at limit' : 'Approaching limit'}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        
        {subscriptionStatus === 'free' && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Crown className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">Upgrade to Pro</h4>
                <p className="text-xs text-blue-700 mt-1">
                  Get unlimited resumes, cover letters, and AI generations
                </p>
                <button className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  View plans →
                </button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 