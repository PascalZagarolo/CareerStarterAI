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
  Briefcase
} from 'lucide-react';

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
      icon: <Home className="h-5 w-5" />
    },
    { 
      name: 'Resume Builder', 
      href: '/resume-builder', 
      icon: <FileText className="h-5 w-5" />
    },
    { 
      name: 'Career Path', 
      href: '/career-path', 
      icon: <TrendingUp className="h-5 w-5" />
    },
    { 
      name: 'Cover Letter', 
      href: '/cover-letter', 
      icon: <Mail className="h-5 w-5" />
    },
    { 
      name: 'Job Search', 
      href: '/job-search', 
      icon: <Briefcase className="h-5 w-5" />
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
    

  

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 md:hidden bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">CareerStarter</span>
            </div>
            
            {user && (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
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