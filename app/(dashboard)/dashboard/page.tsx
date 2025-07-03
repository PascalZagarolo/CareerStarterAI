'use client';

import Link from 'next/link';
import { useAuth } from '@/components/auth-wrapper';
import { 
  FileText, 
  Briefcase, 
  CreditCard, 
  Calendar, 
  TrendingUp,
  Plus,
  Edit3,
  Eye,
  User,
} from 'lucide-react';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  
  // Add additional user data for dashboard
  const userData = user ? {
    ...user,
    subscriptionStatus: 'free', // Default to free for now
    documents: {
      resumes: 0,
      coverLetters: 0,
      careerPaths: 0,
    }
  } : null;
  
  const handleLogout = async () => {
    await logout();
  };
  
  // Calculate the time since account creation
  const accountAge = () => {
    if (!userData?.createdAt) return 'Unknown';
    
    const created = new Date(userData.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48 bg-gray-200 rounded-lg"></div>
            <div className="h-48 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !userData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-lg">
          <p className="font-medium text-gray-900">Error loading dashboard</p>
          <p className="text-gray-700">User data not found</p>
          <button
            onClick={handleLogout}
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userData.name}</h1>
        <p className="text-gray-600">Here&apos;s what&apos;s happening with your career journey today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Account Status</p>
              <p className="text-2xl font-bold text-gray-900">
                {userData.subscriptionStatus === 'free' ? 'Free Plan' : userData.subscriptionStatus === 'pro' ? 'Pro Plan' : 'Annual Plan'}
              </p>
              {userData.subscriptionStatus === 'free' && (
                <Link href="/pricing" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                  Upgrade now →
                </Link>
              )}
            </div>
            <div className="h-12 w-12 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Documents Created</p>
              <p className="text-2xl font-bold text-gray-900">
                {userData.documents.resumes + userData.documents.coverLetters}
              </p>
              <p className="text-sm text-gray-500">
                {userData.documents.resumes} Resumes, {userData.documents.coverLetters} Cover Letters
              </p>
            </div>
            <div className="h-12 w-12 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Account Created</p>
              <p className="text-2xl font-bold text-gray-900">{accountAge()}</p>
              <p className="text-sm text-gray-500">
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start mb-4">
              <div className="h-12 w-12 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center mr-4">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Resume Builder</h3>
                <p className="text-gray-600 text-sm">Create or edit your professional resume with AI assistance</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/resume-builder"
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Link>
              {userData.documents.resumes > 0 && (
                <Link
                  href="/resume-builder?edit=latest"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Latest
                </Link>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start mb-4">
              <div className="h-12 w-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Career Path Finder</h3>
                <p className="text-gray-600 text-sm">Discover your ideal career path with personalized AI recommendations</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/career-path"
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Find Paths
              </Link>
              {userData.documents.careerPaths > 0 && (
                <Link
                  href="/career-path?view=latest"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Latest
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">More Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/cover-letter" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow group">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center mr-3">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">Cover Letters</h3>
                <p className="text-sm text-gray-500">Create compelling cover letters</p>
              </div>
            </div>
          </Link>
          
          <Link href="/interview-prep" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow group">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">Interview Prep</h3>
                <p className="text-sm text-gray-500">Practice with AI mock interviews</p>
              </div>
            </div>
          </Link>
          
          <Link href="/job-search" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow group">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">Job Search</h3>
                <p className="text-sm text-gray-500">Find your next opportunity</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 