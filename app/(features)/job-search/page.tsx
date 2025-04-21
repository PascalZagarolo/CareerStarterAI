'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Types for job search functionality
interface JobPreferences {
  jobTitle: string;
  location: string;
  industry: string;
  jobType: string;
  experienceLevel: string;
  skills: string[];
  salary: {
    min: number;
    max: number;
  };
}

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  matchScore: number;
  applied: boolean;
  saved: boolean;
}

export default function JobSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discover');
  const [savedJobs, setSavedJobs] = useState<JobListing[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<JobListing[]>([]);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock preferences (would be loaded from user profile in a real app)
  const [preferences, setPreferences] = useState<JobPreferences>({
    jobTitle: 'Software Engineer',
    location: 'Remote',
    industry: 'Technology',
    jobType: 'Full-time',
    experienceLevel: 'Mid-level',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    salary: {
      min: 80000,
      max: 150000
    }
  });

  // Mock job data
  const [jobListings, setJobListings] = useState<JobListing[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'Remote',
      salary: '$120,000 - $150,000',
      description: 'TechCorp is seeking a Senior Frontend Developer to join our team. You will be responsible for developing user interface components and implementing them using React.js workflows. You will ensure that these components and the overall application are robust and easy to maintain.',
      requirements: ['5+ years of experience in frontend development', 'Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model', 'Experience with React.js and its core principles'],
      postedDate: '2 days ago',
      matchScore: 92,
      applied: false,
      saved: true
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'InnovateSoft',
      location: 'New York, NY',
      salary: '$100,000 - $130,000',
      description: 'InnovateSoft is looking for a Full Stack Developer who will be responsible for developing and maintaining web applications. You will work with both the front-end and back-end, ensuring the smooth functioning of our applications.',
      requirements: ['3+ years of experience in full stack development', 'Experience with JavaScript, React, Node.js', 'Understanding of server-side rendering'],
      postedDate: '1 week ago',
      matchScore: 85,
      applied: false,
      saved: false
    },
    {
      id: '3',
      title: 'JavaScript Developer',
      company: 'WebFusion',
      location: 'Remote',
      salary: '$90,000 - $110,000',
      description: 'WebFusion is hiring a JavaScript Developer to help build modern web applications. You will work closely with our design and backend teams to create seamless user experiences.',
      requirements: ['2+ years of experience with JavaScript', 'Experience with modern JS frameworks (React, Vue, or Angular)', 'Knowledge of frontend build tools'],
      postedDate: '3 days ago',
      matchScore: 88,
      applied: true,
      saved: true
    },
    {
      id: '4',
      title: 'React Native Developer',
      company: 'MobileFirst',
      location: 'San Francisco, CA',
      salary: '$110,000 - $140,000',
      description: 'Join MobileFirst as a React Native Developer to build cross-platform mobile applications. You will be responsible for creating smooth, responsive user interfaces for our flagship products.',
      requirements: ['3+ years of experience in mobile development', 'Strong experience with React Native', 'Understanding of native mobile environments'],
      postedDate: '5 days ago',
      matchScore: 79,
      applied: false,
      saved: false
    },
    {
      id: '5',
      title: 'Frontend Engineer',
      company: 'UXDesign Co',
      location: 'Remote',
      salary: '$95,000 - $120,000',
      description: 'UXDesign Co needs a Frontend Engineer who can transform our designs into functional, beautiful interfaces. You will work on challenging projects for various clients in different industries.',
      requirements: ['3+ years of frontend development experience', 'Expert knowledge of HTML, CSS, and JavaScript', 'Experience with responsive design'],
      postedDate: '1 day ago',
      matchScore: 91,
      applied: false,
      saved: false
    }
  ]);

  const handleSearch = () => {
    setIsLoading(true);
    // In a real app, this would trigger an API call
    setTimeout(() => {
      setIsLoading(false);
      // Results would be set from API response
    }, 1500);
  };

  const toggleSaveJob = (jobId: string) => {
    setJobListings(prev => 
      prev.map(job => 
        job.id === jobId 
          ? { ...job, saved: !job.saved } 
          : job
      )
    );
  };

  const applyToJob = (jobId: string) => {
    // In a real app, this would open an application form or redirect to the application page
    setJobListings(prev => 
      prev.map(job => 
        job.id === jobId 
          ? { ...job, applied: true } 
          : job
      )
    );
    
    alert('Application submitted! In a real app, this would redirect to an application form.');
  };

  const openJobDetails = (job: JobListing) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  const closeJobModal = () => {
    setIsJobModalOpen(false);
    setSelectedJob(null);
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with search */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="relative max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-sm">AI Job Search Assistant</h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              Find the perfect job matches based on your skills, experience, and preferences
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-2xl shadow-xl">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Job title, skills, or keywords"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-800 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-150"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-70 shadow-md"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Searching...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        Search Jobs
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="bg-white text-indigo-700 font-medium px-4 py-3 rounded-xl hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center shadow-md border border-indigo-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                  </button>
                </div>
              </div>
              
              {/* Popular searches */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Popular searches:</span>
                <button className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">Software Engineer</button>
                <button className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">Data Scientist</button>
                <button className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">UX Designer</button>
                <button className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">Product Manager</button>
                <button className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">Remote Jobs</button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Skills match overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 relative overflow-hidden border border-gray-100">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-bl-full opacity-50 -z-10"></div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Your Skill Match Overview</h2>
              <p className="text-gray-500">Personalized insights based on your profile and market trends</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-medium flex items-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Insights
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 shadow-sm border border-blue-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-blue-800 text-lg">Top Skills</h3>
                  <p className="text-sm text-blue-600">Based on current job market</p>
                </div>
                <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-medium">
                  High demand
                </span>
              </div>
              <ul className="space-y-3">
                {preferences.skills.map((skill, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-gray-700 font-medium">{skill}</span>
                    </div>
                    <div className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                      +{Math.floor(Math.random() * 20) + 10}% demand
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-5 text-sm text-blue-700 hover:text-blue-800 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Update skills
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-5 shadow-sm border border-indigo-200">
              <div className="mb-4">
                <h3 className="font-semibold text-indigo-800 text-lg">Job Market Insights</h3>
                <p className="text-sm text-indigo-600">For {preferences.jobTitle}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-600 text-sm font-medium">Average Salary:</span>
                    <span className="font-bold text-gray-800">${preferences.salary.min.toLocaleString()} - ${preferences.salary.max.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                    <span>Market low</span>
                    <span>Market high</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-600 text-sm">Job Listings:</span>
                  </div>
                  <span className="font-bold text-gray-800">543 in your area</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-gray-600 text-sm">Growth Rate:</span>
                  </div>
                  <span className="font-bold text-green-600">+12% this year</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 shadow-sm border border-purple-200">
              <div className="mb-4">
                <h3 className="font-semibold text-purple-800 text-lg">Application Status</h3>
                <p className="text-sm text-purple-600">Track your progress</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <p className="text-2xl font-bold text-gray-800">3</p>
                  <div className="flex items-center justify-center text-xs text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Applications
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <p className="text-2xl font-bold text-gray-800">2</p>
                  <div className="flex items-center justify-center text-xs text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Interviews
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <p className="text-2xl font-bold text-gray-800">5</p>
                  <div className="flex items-center justify-center text-xs text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Saved
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <p className="text-2xl font-bold text-gray-800">78%</p>
                  <div className="flex items-center justify-center text-xs text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Match Rate
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-purple-700">Application completion</span>
                  <span className="text-xs font-bold text-purple-800">70%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for job sections */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <nav className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'discover'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Discover
              </button>
              <button
                onClick={() => setActiveTab('recommended')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'recommended'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Recommended
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center transition-all duration-200 ${
                  activeTab === 'saved'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Saved
                <span className="ml-1 bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full text-xs">
                  {jobListings.filter(job => job.saved).length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('applied')}
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center transition-all duration-200 ${
                  activeTab === 'applied'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Applied
                <span className="ml-1 bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full text-xs">
                  {jobListings.filter(job => job.applied).length}
                </span>
              </button>
            </nav>
            
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select className="text-sm border-0 bg-transparent text-gray-700 font-medium focus:ring-0 focus:outline-none">
                <option>Relevance</option>
                <option>Date (newest)</option>
                <option>Salary (highest)</option>
                <option>Match score</option>
              </select>
            </div>
          </div>
          
          {/* Active filter pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="text-xs px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full flex items-center">
              Remote
              <button className="ml-1 text-indigo-500 hover:text-indigo-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="text-xs px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full flex items-center">
              Full-time
              <button className="ml-1 text-indigo-500 hover:text-indigo-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="text-xs px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full flex items-center">
              $80,000 - $150,000
              <button className="ml-1 text-indigo-500 hover:text-indigo-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <button className="text-xs px-3 py-1.5 text-blue-600 font-medium hover:text-blue-800">
              Clear all filters
            </button>
          </div>
        </div>
        
        {/* Job listings */}
        <div className="grid grid-cols-1 gap-4">
          {jobListings.map(job => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all duration-200 relative overflow-hidden"
            >
              {job.matchScore >= 90 && (
                <div className="absolute top-0 right-0">
                  <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Top Match
                  </div>
                </div>
              )}
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-bold text-blue-700 border border-gray-200">
                    {job.company.substring(0, 2)}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => openJobDetails(job)}>
                      {job.title}
                    </h3>
                    <div>
                      <p className="text-gray-600 text-sm">{job.company} • {job.location}</p>
                      <p className="text-gray-500 text-sm">{job.salary}</p>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.requirements.slice(0, 2).map((req, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {req}
                        </span>
                      ))}
                      {job.requirements.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          +{job.requirements.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 md:flex-col md:items-end md:space-y-3 md:space-x-0">
                  <div className="flex items-center">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-full text-white font-medium ${getMatchColor(job.matchScore)} shadow-sm`}>
                      <div className="text-center">
                        <div className="text-lg font-bold leading-none">{job.matchScore}%</div>
                        <div className="text-[9px] opacity-90">match</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2 rounded-full ${job.saved ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'} transition-colors`}
                      aria-label={job.saved ? "Unsave job" : "Save job"}
                      title={job.saved ? "Unsave job" : "Save job"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={job.saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => applyToJob(job.id)}
                      disabled={job.applied}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        job.applied
                          ? 'bg-green-100 text-green-700 cursor-default'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-sm'
                      } transition-all duration-200`}
                    >
                      {job.applied ? 'Applied' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-600 line-clamp-2 text-sm">{job.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-xs text-gray-500">Posted {job.postedDate}</p>
                  <button 
                    onClick={() => openJobDetails(job)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center bg-white px-2 py-1 shadow-sm rounded-lg">
            <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="px-4">
              <span className="font-medium text-sm text-gray-700">Page 1 of 10</span>
            </div>
            <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </main>
      
      {/* Job details modal */}
      {isJobModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-10"></div>
              <div className="relative p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className="h-14 w-14 bg-gray-100 rounded-lg flex items-center justify-center text-xl font-bold text-blue-700 border border-gray-200">
                      {selectedJob.company.substring(0, 2)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                      <p className="text-gray-600">{selectedJob.company} • {selectedJob.location}</p>
                    </div>
                  </div>
                  <button onClick={closeJobModal} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-y-auto p-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-500 font-medium">Salary Range</p>
                  </div>
                  <p className="font-semibold text-gray-800 text-lg">{selectedJob.salary}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="text-sm text-gray-500 font-medium">Match Score</p>
                  </div>
                  <p className="font-semibold text-gray-800 text-lg">{selectedJob.matchScore}% Compatible</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-500 font-medium">Posted Date</p>
                  </div>
                  <p className="font-semibold text-gray-800 text-lg">{selectedJob.postedDate}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">Job Description</h3>
                  <div className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Full-time</div>
                </div>
                <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Why You'll Love This Role</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Competitive salary with benefits</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Flexible work arrangements</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Professional development</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Collaborative team environment</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills Match Analysis</h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="space-y-3">
                    {preferences.skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-700">{skill}</span>
                          <span className="text-xs font-medium text-gray-500">{70 + Math.floor(Math.random() * 30)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                            style={{ width: `${70 + Math.floor(Math.random() * 30)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <button className="text-gray-500 hover:text-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    Share
                  </button>
                  <button 
                    onClick={() => toggleSaveJob(selectedJob.id)}
                    className={`flex items-center ${selectedJob.saved ? 'text-yellow-500' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill={selectedJob.saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    {selectedJob.saved ? 'Saved' : 'Save'}
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Company Profile
                  </button>
                </div>
                
                <button
                  onClick={() => applyToJob(selectedJob.id)}
                  disabled={selectedJob.applied}
                  className={`px-6 py-3 rounded-xl text-sm font-medium flex items-center justify-center ${
                    selectedJob.applied
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md'
                  }`}
                >
                  {selectedJob.applied ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Applied
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Apply Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 