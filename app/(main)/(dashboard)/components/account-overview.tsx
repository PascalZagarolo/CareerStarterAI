'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  Crown,
  Shield,
  CreditCard
} from 'lucide-react';
import { DashboardStats } from '@/lib/hooks/use-dashboard-stats';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AccountOverviewProps {
  user: User;
  stats: DashboardStats | null;
  resumeCount: number;
}

export function AccountOverview({ user, stats, resumeCount }: AccountOverviewProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getSubscriptionIcon = (status: string) => {
    switch (status) {
      case 'enterprise':
        return <Crown className="h-4 w-4 text-blue-600" />;
      case 'pro':
        return <Shield className="h-4 w-4 text-blue-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSubscriptionColor = (status: string) => {
    switch (status) {
      case 'enterprise':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pro':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const memberSince = formatDate(user.createdAt);
  const subscriptionStatus = stats?.subscriptionStatus || 'free';

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <div>
          <CardTitle className="text-xl font-semibold text-gray-900">Account</CardTitle>
          <p className="text-gray-600 mt-1">Your profile and subscription details</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <Avatar 
            src="" 
            alt={user.name} 
            fallback={getInitials(user.name)}
            size="lg"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {user.name}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {user.email}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              {getSubscriptionIcon(subscriptionStatus)}
              <Badge className={getSubscriptionColor(subscriptionStatus)}>
                {subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{resumeCount}</div>
            <div className="text-sm text-gray-600">Resumes</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {stats?.resumeViews || 0}
            </div>
            <div className="text-sm text-gray-600">Views</div>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Email</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{user.email}</span>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Member Since</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{memberSince}</span>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Plan</span>
            </div>
            <span className="text-sm font-medium text-gray-900 capitalize">
              {subscriptionStatus}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Settings className="h-4 w-4 mr-2" />
            Account Settings
          </Button>
          
          {subscriptionStatus === 'free' && (
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Pro
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 