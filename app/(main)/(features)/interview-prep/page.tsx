'use client';

import Link from 'next/link';
import { useState } from 'react';


export default function InterviewPrep() {
  const [activeTab, setActiveTab] = useState('common');

  // Mock interview questions for different categories
  const interviewQuestions = {
    common: [
      "Tell me about yourself.",
      "What are your greatest strengths and weaknesses?",
      "Why do you want to work for this company?",
      "Where do you see yourself in 5 years?",
      "Describe a challenge you faced at work and how you overcame it."
    ],
    technical: [
      "Explain the concept of object-oriented programming.",
      "What is the difference between RESTful and GraphQL APIs?",
      "How would you optimize a slow-performing database query?",
      "Explain the concept of continuous integration and continuous deployment.",
      "What are your strategies for writing maintainable code?"
    ],
    behavioral: [
      "Describe a time when you had to work with a difficult team member.",
      "Tell me about a project you're particularly proud of.",
      "How do you handle stress and pressure?",
      "Describe your leadership style with an example.",
      "Tell me about a time you failed and what you learned from it."
    ],
    situational: [
      "How would you handle a situation where you disagree with your manager's decision?",
      "What would you do if you were assigned a task you've never done before?",
      "If a team member wasn't pulling their weight, how would you address it?",
      "How would you prioritize multiple deadline-driven projects?",
      "If you noticed a security vulnerability in your company's product, what steps would you take?"
    ]
  };
  
  // Mock progress data


  // Mock blog posts for tips & tricks


  // Mock networking events
 



  // Career fields options
  const careerFields = [
    { value: 'all', label: 'All Fields' },
    { value: 'technology', label: 'Technology & IT' },
    { value: 'business', label: 'Business & Management' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Finance & Accounting' },
    { value: 'marketing', label: 'Marketing & Communications' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design & Creative' },
    { value: 'legal', label: 'Legal' }
  ];

  // Job roles based on fields
  const jobRoles = {
    all: [
      { value: 'general', label: 'General Interview Questions' }
    ],
    technology: [
      { value: 'software_developer', label: 'Software Developer' },
      { value: 'data_scientist', label: 'Data Scientist' },
      { value: 'product_manager', label: 'Product Manager' },
      { value: 'devops_engineer', label: 'DevOps Engineer' },
      { value: 'ux_designer', label: 'UX Designer' }
    ],
    business: [
      { value: 'project_manager', label: 'Project Manager' },
      { value: 'business_analyst', label: 'Business Analyst' },
      { value: 'product_owner', label: 'Product Owner' },
      { value: 'operations_manager', label: 'Operations Manager' }
    ],
    healthcare: [
      { value: 'nurse', label: 'Nurse' },
      { value: 'physician', label: 'Physician' },
      { value: 'healthcare_admin', label: 'Healthcare Administrator' },
      { value: 'medical_technician', label: 'Medical Technician' }
    ],
    finance: [
      { value: 'financial_analyst', label: 'Financial Analyst' },
      { value: 'accountant', label: 'Accountant' },
      { value: 'investment_banker', label: 'Investment Banker' },
      { value: 'financial_advisor', label: 'Financial Advisor' }
    ]
  };

  // State for selected field and job
  const [selectedField, setSelectedField] = useState('all');
  const [selectedJob, setSelectedJob] = useState('general');
  
  // Filter job roles based on selected field
  const availableJobs = jobRoles[selectedField as keyof typeof jobRoles] || jobRoles.all;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <header className="relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">AI Interview Coach</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Practice interviews with our AI coach to get personalized feedback and improve your performance.
          </p>
          
          <div className="mt-8 flex justify-center">
            <button className="bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-indigo-50 transition-all">
              Start Practice Interview
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Feature highlights */}
        <div className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Practice With Our AI Coach?</h2>
            <p className="text-gray-800 max-w-3xl mx-auto">
              Our AI-powered interview coach helps you prepare for your next interview with personalized feedback and industry-specific questions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Job-specific Questions</h3>
              <p className="text-gray-600">
                Practice with questions tailored to your industry, role, and experience level.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Feedback</h3>
              <p className="text-gray-600">
                Receive instant analysis on your answers, including clarity, relevance, and structure.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Answer Improvement</h3>
              <p className="text-gray-600">
                Get suggestions on how to improve your responses and highlight your strengths effectively.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Interview Scenarios</h3>
              <p className="text-gray-600">
                Practice with various interview scenarios from technical assessments to behavioral questions.
              </p>
            </div>
          </div>
        </div>
        
        {/* Interview Practice Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-2 text-gray-600">Start Practicing Now</h2>
              <p className="text-gray-800 text-center mb-10">Choose a question type and difficulty level to begin your interview preparation</p>
              
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Question Type</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Behavioral', 'Technical', 'Leadership', 'Problem Solving'].map((type) => (
                      <button 
                        key={type}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-medium px-4 py-2 rounded-lg transition-colors"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Industry Focus</h3>
                  <select className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900">
                    <option>Software Development</option>
                    <option>Data Science</option>
                    <option>Product Management</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Customer Service</option>
                  </select>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Difficulty Level</h3>
                  <div className="flex items-center space-x-2">
                    <input type="range" min="1" max="5" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    <span className="text-gray-900 font-medium">3/5</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-800 mt-1">
                    <span>Entry Level</span>
                    <span>Mid-Level</span>
                    <span>Expert</span>
                  </div>
                </div>
                
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md">
                  Start Interview Session
                </button>
              </div>
              
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex items-start">
                <svg className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="ml-3 text-indigo-900 text-sm">
                  <span className="font-medium">Pro tip:</span> For technical roles, we recommend practicing both behavioral and technical questions to prepare for a well-rounded interview experience.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Practice area */}
        <div className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Practice Interview Questions</h2>
            <p className="text-gray-800 max-w-3xl mx-auto">
              Select a category to view sample questions and start practicing.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Field and job selection */}
            <div className="bg-gray-50 p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="careerField" className="block text-sm font-medium text-gray-800 mb-2">
                    Select Your Field
                  </label>
                  <select 
                    id="careerField"
                    value={selectedField}
                    onChange={(e) => {
                      setSelectedField(e.target.value);
                      setSelectedJob(jobRoles[e.target.value as keyof typeof jobRoles]?.[0]?.value || 'general');
                    }}
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                  >
                    {careerFields.map((field) => (
                      <option key={field.value} value={field.value}>
                        {field.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="jobRole" className="block text-sm font-medium text-gray-800 mb-2">
                    Select Your Job Role
                  </label>
                  <select 
                    id="jobRole"
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                  >
                    {availableJobs.map((job) => (
                      <option key={job.value} value={job.value}>
                        {job.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex items-center">
                <div className="w-4 h-4 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                </div>
                <p className="ml-2 text-sm text-gray-700">
                  <span className="font-medium">Pro tip:</span> Selecting a specific field and job role will provide more targeted questions for your interview preparation.
                </p>
              </div>
            </div>
            
            <div className="border-b border-gray-200">
              <nav className="flex">
                {Object.keys(interviewQuestions).map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                      activeTab === category
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <ul className="space-y-4">
                {interviewQuestions[activeTab as keyof typeof interviewQuestions].map((question, index) => (
                  <li key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-indigo-600 text-sm font-medium">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{question}</p>
                        {selectedField !== 'all' && (
                          <div className="mt-2 flex items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {careerFields.find(f => f.value === selectedField)?.label || selectedField}
                            </span>
                            {selectedJob !== 'general' && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {availableJobs.find(j => j.value === selectedJob)?.label || selectedJob}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <button className="ml-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Practice
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 flex justify-end">
                <button className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors">
                  Start Full Interview Session
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mock Interview Practice */}
        <div className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Practice With Our AI Interview Coach</h2>
            <p className="text-gray-800 max-w-3xl mx-auto">
              Get real-time feedback and guidance as you practice answering interview questions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Interview Simulation Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col">
                <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-indigo-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4M12 8h.01"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">AI Interview Coach</h3>
                      <p className="text-xs text-indigo-200">Specialized in {selectedField} interviews</p>
                    </div>
                  </div>
                  <div>
                    <button className="bg-indigo-700 hover:bg-indigo-800 text-white text-sm px-3 py-1 rounded-md">
                      New Session
                    </button>
                  </div>
                </div>
                
                <div className="flex-grow p-6 overflow-y-auto max-h-[500px] bg-gray-50">
                  <div className="space-y-4">
                    {/* Interview messages */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-600">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4M12 8h.01"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1">
                        <p className="text-gray-800">
                          Hello! I&apos;m your AI Interview Coach specializing in {selectedField} roles. Today we&apos;ll practice some common interview questions for {selectedJob} positions. Are you ready to begin?
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          You
                        </div>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-lg shadow-sm border border-indigo-100 flex-1">
                        <p className="text-gray-800">
                          Yes, I&apos;m ready to start!
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-600">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4M12 8h.01"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1">
                        <div className="mb-3 pb-3 border-b border-gray-100">
                          <p className="text-gray-800">
                            Good answer! You&apos;ve demonstrated leadership and conflict resolution skills well.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">Feedback:</h4>
                          <div className="flex items-center">
                            <span className="w-24 text-xs text-gray-500">Structure</span>
                            <div className="flex-grow h-2 bg-gray-200 rounded-full ml-2">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <span className="ml-2 text-xs font-medium text-gray-600">85%</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-24 text-xs text-gray-500">Specificity</span>
                            <div className="flex-grow h-2 bg-gray-200 rounded-full ml-2">
                              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                            <span className="ml-2 text-xs font-medium text-gray-600">70%</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-24 text-xs text-gray-500">Relevance</span>
                            <div className="flex-grow h-2 bg-gray-200 rounded-full ml-2">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                            <span className="ml-2 text-xs font-medium text-gray-600">90%</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Suggestion:</span> Try to include specific metrics or outcomes that resulted from your resolution. This strengthens your answer by showing concrete impact.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center">
                    <textarea 
                      className="flex-grow border border-gray-300 rounded-lg px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600 focus:border-transparent"
                      placeholder="Type your response here..."
                      rows={2}
                    ></textarea>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center mt-3 text-sm">
                    <button className="text-gray-500 hover:text-gray-700 mr-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                      </svg>
                      Voice Input
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      Video Mode
                    </button>
                    <div className="ml-auto">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                        Skip Question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Session Info Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800">Session Information</h3>
                </div>
                
                <div className="p-4 flex-grow">
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Current Session</h4>
                    <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-gray-500">Field</span>
                        <span className="text-sm font-medium text-gray-800">{careerFields.find(f => f.value === selectedField)?.label || selectedField}</span>
                      </div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-gray-500">Role</span>
                        <span className="text-sm font-medium text-gray-800">{availableJobs.find(j => j.value === selectedJob)?.label || selectedJob}</span>
                      </div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-gray-500">Questions</span>
                        <span className="text-sm font-medium text-gray-800">1 of 10</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Duration</span>
                        <span className="text-sm font-medium text-gray-800">00:05:42</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Question Categories</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">Behavioral</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Current</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">Technical</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">2 pending</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">Common</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">3 pending</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">Role-specific</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">4 pending</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Performance Summary</h4>
                    <div className="bg-green-50 rounded-lg p-3 border border-green-100 mb-3">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h5 className="font-medium text-green-800">Strengths</h5>
                      </div>
                      <ul className="text-sm text-gray-700 pl-7 list-disc space-y-1">
                        <li>Clear communication</li>
                        <li>Structured responses</li>
                        <li>Professional tone</li>
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <h5 className="font-medium text-amber-800">Areas to Improve</h5>
                      </div>
                      <ul className="text-sm text-gray-700 pl-7 list-disc space-y-1">
                        <li>Include more specific examples</li>
                        <li>Quantify achievements where possible</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm py-2 px-3 rounded-md w-full">
                      Pause Session
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 px-3 rounded-md w-full">
                      End & Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Tracking */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Your Interview Progress</h2>
              <p className="text-gray-800 text-center mb-10">Track your improvement and practice history</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Sessions Completed</h3>
                      <p className="text-gray-500 text-sm">Last 30 days</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">+3 this week</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-gray-900">12</span>
                    <div className="flex items-center text-sm text-green-600 mb-1">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                      </svg>
                      +20%
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Average Score</h3>
                      <p className="text-gray-500 text-sm">Across all questions</p>
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Improving</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-gray-900">7.8</span>
                    <span className="text-gray-500 text-lg mb-1">/10</span>
                    <div className="flex items-center text-sm text-green-600 mb-1 ml-2">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                      </svg>
                      +0.5
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Questions Practiced</h3>
                      <p className="text-gray-500 text-sm">By question type</p>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">45 total</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Behavioral</span>
                        <span className="font-medium">24</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '53%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Technical</span>
                        <span className="font-medium">15</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '33%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Leadership</span>
                        <span className="font-medium">6</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '14%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-semibold text-gray-900">Recent Practice Sessions</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {[
                    { date: 'Yesterday', type: 'Behavioral', score: 8.5, questions: 5, time: '18 min' },
                    { date: '3 days ago', type: 'Technical', score: 7.2, questions: 4, time: '22 min' },
                    { date: '1 week ago', type: 'Leadership', score: 8.0, questions: 3, time: '15 min' },
                  ].map((session, index) => (
                    <div key={index} className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{session.type} Interview Practice</p>
                          <p className="text-sm text-gray-500">{session.date} • {session.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-right mr-6">
                          <p className="text-sm font-medium text-gray-900">{session.questions} Questions</p>
                          <div className="flex items-center justify-end">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm text-gray-600 ml-1">{session.score}/10</span>
                          </div>
                        </div>
                        <button className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors rounded-full hover:bg-indigo-50">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-3 bg-gray-50 text-right">
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    View All Sessions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Practice Interview Types */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Interview Practice</h2>
              <p className="text-gray-800 max-w-3xl mx-auto">
                Select from various interview types to prepare for any scenario you might face during your job search
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Behavioral Interview */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-3 bg-blue-500"></div>
                <div className="p-6">
                  <div className="p-2 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Behavioral Interview</h3>
                  <p className="text-gray-800 mb-4">
                    Practice answering questions about your past experiences, work style, and how you handle various situations.
                  </p>
                  <div className="flex items-center text-sm text-gray-700 mb-4">
                    <span className="mr-3">⏱️ 20-30 min</span>
                    <span>📋 15 questions</span>
                  </div>
                  <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                    Start Practice
                  </button>
                </div>
              </div>

              {/* Technical Interview */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-3 bg-green-500"></div>
                <div className="p-6">
                  <div className="p-2 bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Interview</h3>
                  <p className="text-gray-800 mb-4">
                    Test your technical knowledge with role-specific questions about tools, technologies, and problem-solving.
                  </p>
                  <div className="flex items-center text-sm text-gray-700 mb-4">
                    <span className="mr-3">⏱️ 30-45 min</span>
                    <span>📋 10 questions</span>
                  </div>
                  <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">
                    Start Practice
                  </button>
                </div>
              </div>

              {/* Mock Interview */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-3 bg-purple-500"></div>
                <div className="p-6">
                  <div className="p-2 bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Full Mock Interview</h3>
                  <p className="text-gray-800 mb-4">
                    Experience a complete end-to-end interview simulation with a mix of behavioral and technical questions.
                  </p>
                  <div className="flex items-center text-sm text-gray-700 mb-4">
                    <span className="mr-3">⏱️ 45-60 min</span>
                    <span>📋 20 questions</span>
                  </div>
                  <button className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors">
                    Start Practice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call-to-Action */}
        <section className="py-16 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto">
                Start practicing with our AI Interview Coach today and gain the confidence 
                you need to impress any hiring manager.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-indigo-900 font-semibold rounded-lg shadow-md hover:bg-indigo-50 transition-colors text-lg">
                  Start Practice Interview
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-lg">
                  View Practice Plans
                </button>
              </div>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <p className="text-indigo-200">Interview Questions</p>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">98%</div>
                  <p className="text-indigo-200">Improved Confidence</p>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">75%</div>
                  <p className="text-indigo-200">Higher Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">Need more help with your job search? Check out our <Link href="/job-search" className="text-indigo-600 hover:text-indigo-800">AI Job Search Assistant</Link></p>
        </div>  
      </footer>
    </div>
  );
} 