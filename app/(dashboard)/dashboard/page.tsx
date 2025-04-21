'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  // In a real app, this would come from Supabase
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    subscriptionStatus: 'free', // 'free', 'pro', or 'annual'
    documents: {
      resumes: 1,
      coverLetters: 0,
      careerPaths: 1,
    },
    createdAt: new Date().toISOString(),
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Calculate the time since account creation
  const accountAge = () => {
    const created = new Date(userData.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {userData.name}</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium mb-2">Account Status</h2>
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
              userData.subscriptionStatus === 'free' 
                ? 'bg-gray-100 text-gray-600' 
                : 'bg-indigo-100 text-indigo-600'
            }`}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">{userData.subscriptionStatus === 'free' ? 'Free Plan' : userData.subscriptionStatus === 'pro' ? 'Pro Plan' : 'Annual Plan'}</h3>
              {userData.subscriptionStatus === 'free' && (
                <Link href="/pricing" className="text-xs text-indigo-600 hover:text-indigo-500">
                  Upgrade now
                </Link>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium mb-2">Documents</h2>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">
                {userData.documents.resumes + userData.documents.coverLetters} Documents
              </h3>
              <p className="text-xs text-gray-500">
                {userData.documents.resumes} Resumes, {userData.documents.coverLetters} Cover Letters
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium mb-2">Account Created</h2>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">{accountAge()}</h3>
              <p className="text-xs text-gray-500">
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-4">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Resume Builder</h3>
              <p className="text-gray-600">Create or edit your professional resume</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Our AI-powered resume builder helps you create professional resumes tailored to your target roles.
          </p>
          <div className="flex justify-between">
            <Link
              href="/resume-builder"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create New Resume
            </Link>
            {userData.documents.resumes > 0 && (
              <Link
                href="/resume-builder?edit=latest"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Latest
              </Link>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-4">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Career Path Finder</h3>
              <p className="text-gray-600">Discover your ideal career path</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Find career paths that match your skills, education, and interests with personalized AI recommendations.
          </p>
          <div className="flex justify-between">
            <Link
              href="/career-path"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Find Career Paths
            </Link>
            {userData.documents.careerPaths > 0 && (
              <Link
                href="/career-path?view=latest"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View Latest
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 