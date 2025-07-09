'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, AuthWrapper } from '@/components/auth-wrapper';
import { 
  Home, 
  FileText, 
  TrendingUp, 
  Mail, 
  LogOut,
  Menu,
  X,
  Briefcase,
  Settings,
  Bell,
  User,
  Crown,
  Zap,
  BarChart3,
  Globe,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

// Dashboard sidebar and layout component
function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  // Define navigation items
  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: <Home className="h-5 w-5" />,
      badge: null
    },
    { 
      name: 'Resume Builder', 
      href: '/resume-builder', 
      icon: <FileText className="h-5 w-5" />,
      badge: null
    },
    { 
      name: 'Career Path', 
      href: '/career-path', 
      icon: <TrendingUp className="h-5 w-5" />,
      badge: null
    },
    { 
      name: 'Cover Letter', 
      href: '/cover-letter', 
      icon: <Mail className="h-5 w-5" />,
      badge: null
    },
    { 
      name: 'Job Search', 
      href: '/job-search', 
      icon: <Briefcase className="h-5 w-5" />,
      badge: null
    },
    { 
      name: 'Analytics', 
      href: '/analytics', 
      icon: <BarChart3 className="h-5 w-5" />,
      badge: <Badge variant="secondary" className="text-xs">Pro</Badge>
    },
  ];

  const secondaryNavigation = [
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: <Settings className="h-5 w-5" />
    },
    { 
      name: 'Help & Support', 
      href: '/help', 
      icon: <HelpCircle className="h-5 w-5" />
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 transition-all duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto md:h-auto bg-white md:z-auto border-r border-gray-200 flex flex-col shadow-xl md:shadow-none`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0 bg-white">
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900">CareerStarter</span>
              <div className="flex items-center space-x-1">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Pro</span>
              </div>
            </div>
          </Link>
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200 shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`mr-3 flex-shrink-0 transition-colors ${
                      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}>
                      {item.icon}
                    </div>
                    {item.name}
                  </div>
                  {item.badge && item.badge}
                </Link>
              );
            })}
          </div>

          {/* Secondary Navigation */}
          <div className="pt-6 border-t border-gray-200">
            <div className="space-y-1">
              {secondaryNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gray-50 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className={`mr-3 flex-shrink-0 transition-colors ${
                      isActive ? 'text-gray-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}>
                      {item.icon}
                    </div>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white shadow-sm border border-gray-200">
            <Avatar fallback={user?.name} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 md:hidden bg-white border-b border-gray-200 flex-shrink-0 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              type="button"
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">CareerStarter</span>
            </div>
            
            {user && (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="p-2">
                  <Bell className="h-4 w-4 text-gray-400" />
                </Button>
                <Avatar fallback={user.name} size="sm" />
              </div>
            )}
          </div>
        </div>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

// Main layout component with AuthProvider wrapper
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <DashboardLayoutContent>
        {children}
      </DashboardLayoutContent>
    </AuthWrapper>
  );
} 