'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NetworkingEvents() {
  const [activeTab, setActiveTab] = useState('events');
  
  // Mock networking events
  const networkingEvents = [
    {
      id: 1,
      title: "Tech Meetup: Frontend Development Trends 2023",
      date: "June 15, 2023",
      time: "6:00 PM - 9:00 PM",
      location: "TechHub Downtown",
      format: "In-person",
      attendees: 120,
      tags: ["Frontend", "React", "UI/UX"],
      description: "Join us for an evening of networking and learning about the latest trends in frontend development. Our speakers will cover React 18, performance optimization, and design systems."
    },
    {
      id: 2,
      title: "Virtual Networking: Women in Data Science",
      date: "June 20, 2023",
      time: "12:00 PM - 1:30 PM",
      location: "Zoom",
      format: "Virtual",
      attendees: 85,
      tags: ["Data Science", "Women in Tech", "Networking"],
      description: "Connect with fellow women in the data science field. Share experiences, discuss challenges, and explore opportunities for collaboration and mentorship."
    },
    {
      id: 3,
      title: "Career Fair: Startups & Tech Companies",
      date: "July 5, 2023",
      time: "10:00 AM - 4:00 PM",
      location: "Convention Center",
      format: "In-person",
      attendees: 500,
      tags: ["Job Fair", "Startups", "Hiring"],
      description: "Meet representatives from over 50 startups and tech companies actively hiring. Bring your resume and be prepared for on-the-spot interviews."
    },
    {
      id: 4,
      title: "Workshop: Resume Building & LinkedIn Optimization",
      date: "June 25, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Community College, Room 302",
      format: "In-person",
      attendees: 40,
      tags: ["Resume", "LinkedIn", "Personal Branding"],
      description: "Learn how to craft a resume that gets noticed and optimize your LinkedIn profile to attract recruiters. Includes personalized feedback on your materials."
    },
    {
      id: 5,
      title: "Tech Talk: AI in Healthcare",
      date: "July 10, 2023",
      time: "5:30 PM - 7:30 PM",
      location: "Medical Research Center",
      format: "Hybrid",
      attendees: 150,
      tags: ["AI", "Healthcare", "Innovation"],
      description: "Explore how artificial intelligence is transforming healthcare delivery, diagnostics, and patient care. Network with professionals at the intersection of tech and medicine."
    },
    {
      id: 6,
      title: "Coding Bootcamp Showcase",
      date: "July 15, 2023",
      time: "1:00 PM - 5:00 PM",
      location: "Innovation Hub",
      format: "In-person",
      attendees: 200,
      tags: ["Bootcamp", "Education", "Portfolio"],
      description: "Recent bootcamp graduates showcase their projects to potential employers. Great opportunity for hiring managers to discover new talent."
    }
  ];

  // Mock job opportunities
  const jobOpportunities = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA (Remote Option)",
      salary: "$120,000 - $150,000",
      posted: "2 days ago",
      applicants: 45,
      tags: ["React", "TypeScript", "5+ years"],
      description: "We're seeking an experienced frontend developer to lead our UI team. You'll architect solutions, mentor junior developers, and collaborate with design and product teams."
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "AnalyticsPro",
      location: "New York, NY",
      salary: "$110,000 - $140,000",
      posted: "1 week ago",
      applicants: 78,
      tags: ["Python", "Machine Learning", "PhD preferred"],
      description: "Join our data science team to build predictive models and extract actionable insights from complex datasets. You'll work on challenging problems in finance and healthcare."
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "CreativeWorks Studio",
      location: "Remote",
      salary: "$90,000 - $120,000",
      posted: "3 days ago",
      applicants: 62,
      tags: ["Figma", "User Research", "3+ years"],
      description: "Design intuitive, engaging user experiences for our flagship products. You'll conduct user research, create wireframes, and collaborate with developers on implementation."
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudSystems",
      location: "Austin, TX",
      salary: "$130,000 - $160,000",
      posted: "Just now",
      applicants: 12,
      tags: ["AWS", "Kubernetes", "CI/CD"],
      description: "Build and maintain our cloud infrastructure, automate deployment processes, and ensure high availability of our services. Experience with AWS and Kubernetes required."
    },
    {
      id: 5,
      title: "Product Manager",
      company: "InnovateNow",
      location: "Boston, MA",
      salary: "$115,000 - $145,000",
      posted: "1 day ago",
      applicants: 34,
      tags: ["Agile", "B2B SaaS", "4+ years"],
      description: "Lead product development for our B2B SaaS platform. You'll gather requirements, define roadmaps, and work closely with engineering and design teams to deliver features."
    },
    {
      id: 6,
      title: "Full Stack Developer",
      company: "HealthTech Solutions",
      location: "Chicago, IL (Hybrid)",
      salary: "$100,000 - $130,000",
      posted: "5 days ago",
      applicants: 89,
      tags: ["JavaScript", "Node.js", "MongoDB"],
      description: "Develop end-to-end solutions for our healthcare platform. Experience with JavaScript, Node.js, and MongoDB required. Healthcare industry experience a plus."
    }
  ];

  // Filter for event format
  const [formatFilter, setFormatFilter] = useState('all');
  const filteredEvents = formatFilter === 'all' 
    ? networkingEvents 
    : networkingEvents.filter(event => event.format.toLowerCase() === formatFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <header className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Networking & Opportunities</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Connect with professionals, discover events, and explore job opportunities in your field.
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Toggle between events and jobs */}
        <div className="bg-white p-1 rounded-xl shadow-md inline-flex mb-8">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'events'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Networking Events
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'jobs'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Job Opportunities
          </button>
        </div>
        
        {/* Networking Events */}
        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setFormatFilter('all')}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    formatFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFormatFilter('in-person')}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    formatFilter === 'in-person' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  In-person
                </button>
                <button 
                  onClick={() => setFormatFilter('virtual')}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    formatFilter === 'virtual' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  Virtual
                </button>
                <button 
                  onClick={() => setFormatFilter('hybrid')}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    formatFilter === 'hybrid' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  Hybrid
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {filteredEvents.map((event) => (
                <motion.div 
                  key={event.id} 
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                        <p className="text-gray-600 text-sm">{event.date} • {event.time}</p>
                      </div>
                      <span className={`text-xs font-medium rounded-full px-3 py-1 ${
                        event.format === 'Virtual' 
                          ? 'bg-blue-50 text-blue-600' 
                          : event.format === 'Hybrid'
                            ? 'bg-purple-50 text-purple-600'
                            : 'bg-green-50 text-green-600'
                      }`}>
                        {event.format}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                    
                    <div className="flex items-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600 text-sm">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-gray-600 text-sm">{event.attendees} attendees</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-800 rounded-full px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        View Details
                      </button>
                      <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        RSVP Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <button className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                View All Events
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Job Opportunities */}
        {activeTab === 'jobs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Latest Job Openings</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                <select className="bg-white border border-gray-200 rounded-lg text-sm p-2">
                  <option>Most Recent</option>
                  <option>Highest Salary</option>
                  <option>Most Relevant</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-5 mb-8">
              {jobOpportunities.map((job) => (
                <motion.div 
                  key={job.id} 
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow p-6"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="mb-4 md:mb-0 md:flex-1">
                      <div className="flex items-center mb-2">
                        <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center mr-3 text-gray-500 font-bold">
                          {job.company.substring(0, 1)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                          <p className="text-gray-600 text-sm">{job.company} • {job.location}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mt-3 mb-4">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-800 rounded-full px-3 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-500 mt-4">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Posted {job.posted}
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {job.applicants} applicants
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 flex flex-row md:flex-col gap-3 justify-end">
                      <button className="bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                        Save
                      </button>
                      <button className="bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <button className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                View All Jobs
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Host your own event */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-6 py-12 md:flex md:items-center md:justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2">Host Your Own Networking Event</h2>
              <p className="text-indigo-100">
                Create a professional gathering for your industry or interest group. We&apos;ll help you promote and organize it.
              </p>  
            </div>
            <div className="md:w-1/3 text-center md:text-right">
              <button className="bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-indigo-50 transition-all">
                Create Event
              </button>
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
          </div>
          <p className="text-gray-600">© 2023 CareerStarter AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 