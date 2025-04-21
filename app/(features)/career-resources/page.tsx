'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CareerResources() {
  const [activeResourceTab, setActiveResourceTab] = useState('overview');

  // Resource types with icons and descriptions
  const resourceTypes = [
    {
      id: 'tips',
      name: 'Career Tips & Advice',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      description: 'Expert advice on interviewing, resume building, and career advancement',
      cta: 'Read Latest Articles',
      link: '/career-blog'
    },
    {
      id: 'coaching',
      name: 'Interview Coaching',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      description: 'Practice interviews with our AI coach and get personalized feedback',
      cta: 'Start Practicing',
      link: '/interview-prep'
    },
    {
      id: 'networking',
      name: 'Networking Events',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: 'Connect with professionals and industry leaders at our curated events',
      cta: 'Find Upcoming Events',
      link: '/networking'
    },
    {
      id: 'jobs',
      name: 'Job Opportunities',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Discover new job openings matched to your skills and career goals',
      cta: 'Browse Jobs',
      link: '/job-search'
    }
  ];

  // Featured content preview
  const featuredContent = [
    {
      type: 'article',
      title: "How to Answer 'What's Your Greatest Weakness?' Without Shooting Yourself in the Foot",
      image: "/images/blog/article-weakness.jpg",
      link: "/career-blog/2"
    },
    {
      type: 'event',
      title: "Virtual Networking: Women in Data Science",
      image: "/images/events/data-science.jpg",
      link: "/networking?tab=events"
    },
    {
      type: 'job',
      title: "Senior Frontend Developer at TechCorp Inc.",
      image: "/images/jobs/frontend-dev.jpg",
      link: "/job-search"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <header className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Career Resources & Opportunities</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Everything you need to supercharge your career journey, all in one place.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="bg-white p-1 rounded-full shadow-md inline-flex">
              <button
                onClick={() => setActiveResourceTab('overview')}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  activeResourceTab === 'overview'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveResourceTab('articles')}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  activeResourceTab === 'articles'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Articles
              </button>
              <button
                onClick={() => setActiveResourceTab('events')}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  activeResourceTab === 'events'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveResourceTab('jobs')}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  activeResourceTab === 'jobs'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Jobs
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Resource Types Grid */}
        {activeResourceTab === 'overview' && (
          <>
            <div className="py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">All Resources at Your Fingertips</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {resourceTypes.map((resource) => (
                  <motion.div 
                    key={resource.id}
                    className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-indigo-600 mb-4">
                      {resource.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <Link 
                      href={resource.link} 
                      className="inline-flex items-center text-indigo-600 font-medium text-sm"
                    >
                      {resource.cta}
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Featured content preview */}
            <div className="py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Featured Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredContent.map((content, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="h-44 bg-gray-200 relative">
                      {content.image ? (
                        <img 
                          src={content.image} 
                          alt={content.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
                          <span className="text-white text-lg font-medium">{content.type}</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {content.type === 'article' ? 'Article' : content.type === 'event' ? 'Event' : 'Job'}
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">{content.title}</h3>
                      <Link 
                        href={content.link} 
                        className="inline-flex items-center text-indigo-600 font-medium text-sm"
                      >
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {/* Content for other tabs */}
        {activeResourceTab === 'articles' && (
          <div className="py-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Career Articles & Tips</h2>
            <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover expert advice, industry insights, and success stories to help you advance your career.
            </p>
            <Link 
              href="/career-blog" 
              className="bg-indigo-600 text-white font-medium px-8 py-3 rounded-lg shadow hover:bg-indigo-700 transition-colors"
            >
              Visit Career Blog
            </Link>
          </div>
        )}
        
        {activeResourceTab === 'events' && (
          <div className="py-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Networking Events</h2>
            <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with professionals, industry leaders, and potential employers at our curated events.
            </p>
            <Link 
              href="/networking" 
              className="bg-indigo-600 text-white font-medium px-8 py-3 rounded-lg shadow hover:bg-indigo-700 transition-colors"
            >
              Explore Events
            </Link>
          </div>
        )}
        
        {activeResourceTab === 'jobs' && (
          <div className="py-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Opportunities</h2>
            <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
              Find your next career opportunity with our curated job listings matched to your skills and goals.
            </p>
            <Link 
              href="/job-search" 
              className="bg-indigo-600 text-white font-medium px-8 py-3 rounded-lg shadow hover:bg-indigo-700 transition-colors"
            >
              Search Jobs
            </Link>
          </div>
        )}
        
        {/* Premium Services */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl overflow-hidden shadow-lg">
            <div className="px-6 py-12 md:flex md:items-center md:justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-2xl font-bold text-white mb-2">Premium Career Services</h2>
                <p className="text-indigo-100">
                  Unlock personalized coaching, resume reviews, and exclusive events with our premium subscription.
                </p>
              </div>
              <div className="md:w-1/3 text-center md:text-right">
                <button className="bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-indigo-50 transition-all">
                  Explore Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="/interview-prep" className="text-indigo-600 hover:text-indigo-800">AI Interview Coach</Link>
            <Link href="/job-search" className="text-indigo-600 hover:text-indigo-800">Job Search</Link>
            <Link href="/career-blog" className="text-indigo-600 hover:text-indigo-800">Career Blog</Link>
            <Link href="/networking" className="text-indigo-600 hover:text-indigo-800">Networking</Link>
          </div>
          <p className="text-gray-600">© 2023 CareerStarter AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 