'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight, FiStar } from 'react-icons/fi';
import { BsLightningCharge, BsGraphUp, BsBriefcase } from 'react-icons/bs';
import { HiOutlineDocument, HiOutlineChatAlt2, HiOutlineChartBar } from 'react-icons/hi';

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  // Calculate discounted annual prices (2 months free)
  const premiumAnnual = Math.floor(49.99 * 10);
  const premiumPlusAnnual = Math.floor(89.99 * 10);
  
  // Toggle FAQs
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const toggleFAQ = (index: number): void => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Modern gradient with floating elements */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-800 pt-24 pb-32">
        {/* Decorative blurred circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col items-center md:flex-row md:justify-between md:space-x-8">
            <motion.div 
              className="md:w-1/2 mb-16 md:mb-0 text-center md:text-left"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.span 
                className="inline-block px-3 py-1 bg-indigo-500 bg-opacity-20 text-indigo-100 text-sm font-medium rounded-full mb-5"
                variants={fadeIn}
              >
                AI-Powered Career Platform
              </motion.span>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
                variants={fadeIn}
              >
                Getting hired <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">shouldn&apos;t feel</span> like a job.
              </motion.h1>
              
              <motion.p 
                className="text-xl text-indigo-100 mb-8 max-w-lg"
                variants={fadeIn}
              >
                Our AI-powered platform handles the heavy lifting—creating perfect CVs, generating headshots, writing cover letters, and finding your ideal job matches.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                variants={fadeIn}
              >
                <Link 
                  href="/signup" 
                  className="group bg-white text-indigo-700 px-8 py-3 rounded-lg font-medium text-lg hover:bg-indigo-50 transition-colors flex items-center justify-center"
                >
                  Try for Free
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href="#features" 
                  className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-center"
                >
                  See Features
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 relative md:pl-12 mt-8 md:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white border-opacity-20 shadow-xl mx-auto max-w-md">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse"></div>
                  
                  {/* Resume mockup with animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-2xl w-[90%] h-[90%] p-3 sm:p-5 transform transition-all duration-500 hover:scale-105">
                      {/* Resume header */}
                      <div className="border-b border-gray-200 pb-3 mb-3">
                      <div className="h-6 bg-indigo-600 w-1/3 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                      </div>
                      
                      {/* Resume content */}
                      <div className="flex gap-4">
                        <div className="w-1/3">
                          <div className="h-4 bg-gray-200 w-full rounded mb-3"></div>
                          <div className="h-3 bg-gray-100 w-5/6 rounded mb-2"></div>
                          <div className="h-3 bg-gray-100 w-full rounded mb-2"></div>
                          <div className="h-3 bg-gray-100 w-4/6 rounded mb-4"></div>
                          
                          <div className="h-4 bg-gray-200 w-full rounded mb-3"></div>
                          <div className="h-3 bg-gray-100 w-5/6 rounded mb-2"></div>
                          <div className="h-3 bg-gray-100 w-full rounded mb-2"></div>
                          <div className="h-3 bg-gray-100 w-4/6 rounded mb-2"></div>
                        </div>
                        
                        <div className="w-2/3">
                          <div className="h-4 bg-gray-200 w-1/2 rounded mb-3"></div>
                          <div className="h-3 bg-gray-100 w-full rounded mb-2"></div>
                          <div className="h-3 bg-gray-100 w-full rounded mb-2"></div>
                          <div className="h-3 bg-gray-100 w-5/6 rounded mb-4"></div>
                          
                          <div className="h-4 bg-gray-200 w-1/2 rounded mb-3"></div>
                          <div className="h-3 bg-gray-100 w-full rounded mb-2"></div>
                          <div className="h-3 bg-gray-100 w-full rounded mb-2"></div>
                          <div className="h-3 bg-gray-100 w-5/6 rounded mb-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI generation effect */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="absolute -inset-4 opacity-30 bg-gradient-to-r from-indigo-500 to-purple-600 blur-lg rounded-full animate-pulse"></div>
                      <div className="relative bg-white bg-opacity-90 rounded-full h-12 w-12 flex items-center justify-center shadow-lg">
                        <BsLightningCharge className="text-indigo-600 h-6 w-6 animate-bounce" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements - make more responsive */}
                  <div className="absolute top-5 sm:top-10 right-3 sm:right-5 animate-float-slow">
                    <div className="bg-indigo-500 bg-opacity-20 backdrop-blur-sm rounded-md p-1 sm:p-2 shadow-md flex items-center">
                      <BsBriefcase className="text-gray-200text-xs sm:text-sm sm:mr-2" />
                      <span className="text-xs font-medium font-semibold hidden sm:inline text-gray-200">ATS Optimized</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-5 sm:bottom-10 left-3 sm:left-5 animate-float">
                    <div className="bg-purple-500 bg-opacity-20 backdrop-blur-sm rounded-md p-1 sm:p-2 shadow-md flex items-center">
                      <BsGraphUp className="text-purple-200  text-xs sm:text-sm" />
                      
                    </div>
                  </div>
                </div>
                
                {/* Floating badges - make more responsive */}
                <motion.div 
                  className="absolute -top-3 sm:-top-5 -right-3 sm:-right-5 bg-gradient-to-r from-green-500 to-green-600 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm font-medium shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex items-center">
                    <FiStar className="mr-1" />
                    <span>95% Success Rate</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-3 sm:-bottom-5 -left-3 sm:-left-5 bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-indigo-700 text-xs sm:text-sm font-medium shadow-lg flex items-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <BsLightningCharge className="mr-1" />
                  <span>Powered by AI</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <p className="text-gray-500 font-medium">Trusted by professionals from companies like</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <Image src="/logos/logo-google.svg" alt="Google" width={48} height={48} className="opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200" />
            <Image src="/logos/logo-microsoft.svg" alt="Microsoft" width={48} height={48} className="opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200" />
            <Image src="/logos/logo-amazon.svg" alt="Amazon" width={48} height={48} className="opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200" />
            <Image src="/logos/logo-apple.svg" alt="Apple" width={48} height={48} className="opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200" />
            <Image src="/logos/logo-netflix.svg" alt="Netflix" width={48} height={48} className="opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200" />
            <Image src="/logos/logo-urent.svg" alt="Netflix" width={48} height={48} className="opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200" />
          </div>
        </div>
      </section>

      {/* Features Section - Update to match new functions */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Everything You Need For Your Job Search</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of AI tools helps you create professional applications, stand out from competitors, and land your dream job faster.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card 1 - AI CV Builder */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100 relative overflow-hidden group flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-100 rounded-bl-full opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 relative z-10">
                <HiOutlineDocument className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">AI CV Builder</h3>
              <p className="text-gray-600 mb-6 z-10 relative">
                Create professional, ATS-optimized CVs tailored to specific job descriptions for maximum interview potential.
              </p>
              <ul className="space-y-2 mb-8 flex-grow">
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Job-specific keyword optimization</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Multiple professional templates</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">One-click tailoring to job ads</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link 
                  href="/resume-builder" 
                  className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center group"
                >
                  Build Your CV
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            
            {/* Feature Card 2 - AI Cover Letter */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100 relative overflow-hidden group flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-100 rounded-bl-full opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 relative z-10">
                <HiOutlineChatAlt2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Cover Letter Generator</h3>
              <p className="text-gray-600 mb-6 z-10 relative">
                Generate personalized cover letters that match job requirements and highlight your most relevant experience.
              </p>
              <ul className="space-y-2 mb-8 flex-grow">
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Job description analysis</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Customizable tone and style</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Multiple format options</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link 
                  href="/cover-letter" 
                  className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center group"
                >
                  Create Cover Letter
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            
            {/* Feature Card 3 - AI Headshot */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100 relative overflow-hidden group flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-100 rounded-bl-full opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 relative z-10">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Professional Headshot</h3>
              <p className="text-gray-600 mb-6 z-10 relative">
                Create studio-quality professional headshots for your CV, LinkedIn, and other professional profiles.
              </p>
              <ul className="space-y-2 mb-8 flex-grow">
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Professional lighting and backgrounds</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Industry-appropriate styling</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Multiple variations to choose from</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link 
                  href="/ai-headshot" 
                  className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center group"
                >
                  Generate Headshot
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Second row of features */}
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {/* Feature Card 4 - AI Job Search */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100 relative overflow-hidden group flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-100 rounded-bl-full opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 relative z-10">
                <BsBriefcase className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Job Search Assistant</h3>
              <p className="text-gray-600 mb-6 z-10 relative">
                Find the perfect job matches based on your skills, experience, and preferences with our AI-powered job search.
              </p>
              <ul className="space-y-2 mb-8 flex-grow">
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Personalized job recommendations</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Skill-match analysis</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Automated application tracking</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link 
                  href="/job-search" 
                  className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center group"
                >
                  Find Jobs
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            
            {/* Feature Card 5 - AI Interview Prep */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100 relative overflow-hidden group flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-100 rounded-bl-full opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 relative z-10">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Interview Coach</h3>
              <p className="text-gray-600 mb-6 z-10 relative">
                Practice interviews with our AI coach to get personalized feedback and improve your interview performance.
              </p>
              <ul className="space-y-2 mb-8 flex-grow">
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Job-specific interview questions</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Real-time feedback</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Answer improvement suggestions</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link 
                  href="/interview-prep" 
                  className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center group"
                >
                  Practice Interviews
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            
            {/* Feature Card 6 - Career Resources */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100 relative overflow-hidden group flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-100 rounded-bl-full opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 relative z-10">
                <HiOutlineChartBar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Career Resources Hub</h3>
              <p className="text-gray-600 mb-6 z-10 relative">
                Access our comprehensive library of career tips, networking events, and job opportunities all in one place.
              </p>
              <ul className="space-y-2 mb-8 flex-grow">
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Expert career advice articles</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Industry networking events</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-indigo-600 mt-1 mr-2" />
                  <span className="text-gray-600">Curated job opportunities</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link 
                  href="/career-resources" 
                  className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center group"
                >
                  Explore Resources
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section with Timeline */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mt-32 -mr-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mb-32 -ml-32"></div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How CareerStarter Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple, intuitive process helps you advance your career in just a few steps.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Timeline connector */}
            <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-1 bg-gradient-to-r from-indigo-200 via-indigo-400 to-purple-300"></div>
            
            {/* Step 1 */}
            <motion.div 
              className="text-center relative bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xl font-bold mb-6 relative z-10 mx-auto transform transition-transform hover:scale-110 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Create Your Profile</h3>
              <p className="text-gray-600 mb-6">
                Share your skills, education, and work experience to help our AI understand your background.
              </p>
              <motion.div 
                className="rounded-lg overflow-hidden shadow-md relative"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse"></div>
                <Image 
                  src="/profile-creation.png" 
                  alt="Profile Creation" 
                  width={300} 
                  height={200}
                  className="mx-auto w-full h-auto rounded-lg relative z-10 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-indigo-600/20 rounded-lg"></div>
              </motion.div>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div 
              className="text-center relative bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow md:mt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-xl font-bold mb-6 relative z-10 mx-auto transform transition-transform hover:scale-110 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Get AI Recommendations</h3>
              <p className="text-gray-600 mb-6">
                Our AI analyzes your profile to recommend career paths, resume improvements, and skill gaps.
              </p>
              <motion.div 
                className="rounded-lg overflow-hidden shadow-md relative"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse"></div>
                <Image 
                  src="/ai-recommendations.png" 
                  alt="AI Recommendations" 
                  width={300} 
                  height={200}
                  className="mx-auto w-full h-auto rounded-lg relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-indigo-600/20 rounded-lg"></div>
              </motion.div>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div 
              className="text-center relative bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xl font-bold mb-6 relative z-10 mx-auto transform transition-transform hover:scale-110 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Apply With Confidence</h3>
              <p className="text-gray-600 mb-6">
                Use our optimized resumes and cover letters to apply for jobs with confidence and get hired.
              </p>
              <motion.div 
                className="rounded-lg overflow-hidden shadow-md relative"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse"></div>
                <Image 
                  src="/job-application.png" 
                  alt="Job Application" 
                  width={300} 
                  height={200}
                  className="mx-auto w-full h-auto rounded-lg relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-indigo-600/20 rounded-lg"></div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link 
              href="/signup" 
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from users who transformed their careers with CareerStarter.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <Image 
                  src="/testimonial-1.jpg" 
                  alt="Sarah J." 
                  width={56} 
                  height={56} 
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah J.</h4>
                  <p className="text-sm text-gray-600">Software Developer</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
              </div>
              <p className="text-gray-700">
                &quot;CareerStarter helped me identify the skills I needed to transition into tech. Within 3 months of following their roadmap, I landed my first developer job!&quot;
              </p>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <Image 
                  src="/testimonial-2.jpg" 
                  alt="Michael T." 
                  width={56} 
                  height={56} 
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Michael T.</h4>
                  <p className="text-sm text-gray-600">Marketing Specialist</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
              </div>
              <p className="text-gray-700">
                &quot;The AI resume builder is incredible. It helped me highlight my achievements in a way I never could have on my own. I started getting interviews within a week!&quot;
              </p>
            </motion.div>
            
            {/* Testimonial 3 */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <Image 
                  src="/testimonial-3.jpg" 
                  alt="Emma L." 
                  width={56} 
                  height={56} 
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Emma L.</h4>
                  <p className="text-sm text-gray-600">UX Designer</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
              </div>
              <p className="text-gray-700">
                &quot;As a career changer, I was lost about how to position myself. CareerStarter&apos;s cover letter generator helped me tell my story convincingly. I&apos;m now working at my dream company!&quot;
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">Choose The Right Plan For You</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you&apos;re just getting started or looking for advanced features, we have a plan that fits your needs.
            </p>
            
            {/* Monthly/Annual Toggle */}
            <div className="mt-8 inline-flex items-center justify-center bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setIsAnnual(false)} 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !isAnnual 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsAnnual(true)} 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
                  isAnnual 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Annual
                <span className="ml-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </motion.div>
          
          {/* Pricing tiers */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 max-w-sm sm:max-w-none mx-auto">
            {/* Free Plan */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full border border-gray-200 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-auto">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">Free</h3>
                <p className="text-gray-600 mb-4 sm:mb-6">Get started with the basics</p>
                <p className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900">$0</p>
                <p className="text-gray-700 mb-4 sm:mb-6">forever</p>
                <ul className="text-left space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800">1 basic CV template</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800">3 AI headshots per month</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800">10 job searches per month</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-500">Job ad optimization</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-500">AI cover letters</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-500">Interview coaching</span>
                  </li>
                </ul>
              </div>
              <Link 
                href="/signup" 
                className="block w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-center text-sm sm:text-base"
              >
                Get Started
              </Link>
            </motion.div>
            
            {/* Premium Plan */}
            <motion.div 
              className="bg-white rounded-xl shadow-xl p-6 sm:p-8 w-full border-2 border-indigo-600 relative sm:scale-100 lg:scale-105 z-10 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white py-1 px-4 sm:px-6 rounded-full text-xs sm:text-sm font-medium">
                MOST POPULAR
              </div>
              <div className="mb-auto">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">Premium</h3>
                <p className="text-gray-600 mb-4 sm:mb-6">Everything you need</p>
                <p className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900">${isAnnual ? premiumAnnual : '49.99'}</p>
                <p className="text-gray-700 mb-4 sm:mb-6">per {isAnnual ? 'year' : 'month'}</p>
                <ul className="text-left space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800"><strong>5</strong> professional CV templates</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800"><strong>20</strong> AI headshots per month</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800">Unlimited job searches</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800">Job ad optimization</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800"><strong>5</strong> AI cover letters per month</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-500">Interview coaching</span>
                  </li>
                </ul>
              </div>
              <Link 
                href={`/pricing?plan=premium${isAnnual ? '&billing=annual' : ''}`}
                className="block w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-center text-sm sm:text-base"
              >
                Upgrade to Premium
              </Link>
            </motion.div>
            
            {/* Professional Plan */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full border border-gray-200 flex flex-col h-full sm:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="mb-auto">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Professional</h3>
                <p className="text-gray-600 mb-4 sm:mb-6">For serious job seekers</p>
                <p className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900">${isAnnual ? premiumPlusAnnual : '89.99'}</p>
                <p className="text-gray-700 mb-4 sm:mb-6">per {isAnnual ? 'year' : 'month'}</p>
                <ul className="text-left space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800"><strong>All</strong> premium CV templates</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800"><strong>Unlimited</strong> AI headshots</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800">Unlimited job searches</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800">Advanced job ad optimization</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800"><strong>Unlimited</strong> AI cover letters</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800">Unlimited interview coaching</span>
                  </li>
                </ul>
              </div>
              <Link 
                href={`/pricing?plan=premiumplus${isAnnual ? '&billing=annual' : ''}`}
                className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center text-sm sm:text-base"
              >
                Get Professional
              </Link>
            </motion.div>
          </div>
          
          {/* Feature comparison table */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">Feature Comparison</h3>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full sm:px-0 align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                      <th className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Free</th>
                      <th className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-indigo-600 uppercase tracking-wider">Premium</th>
                      <th className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-purple-600 uppercase tracking-wider">Professional</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* CV Templates */}
                    <tr>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">CV Templates</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">1 basic</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center font-medium">5 professional</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center font-medium">All templates</td>
                    </tr>
                    {/* CV Exports */}
                    <tr className="bg-gray-50">
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">CV Exports (PDF)</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">2 per month</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center font-medium">15 per month</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center font-medium">Unlimited</td>
                    </tr>
                    {/* AI Headshots */}
                    <tr>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">AI Headshots</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">3 per month</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center font-medium">20 per month</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center font-medium">Unlimited</td>
                    </tr>
                    {/* Job Ad Optimization */}
                    <tr className="bg-gray-50">
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">Job Ad Optimization</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center font-medium">Advanced</td>
                    </tr>
                    {/* AI Cover Letters */}
                    <tr>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">AI Cover Letters</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center font-medium">5 per month</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center font-medium">Unlimited</td>
                    </tr>
                    {/* Job Search */}
                    <tr className="bg-gray-50">
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">Job Searches</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">10 per month</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center font-medium">Unlimited</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center font-medium">Unlimited</td>
                    </tr>
                    {/* Interview Coaching */}
                    <tr>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">AI Interview Coach</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 text-center font-medium">Unlimited</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mt-8 sm:mt-10">
            <p className="text-gray-600 mb-4 text-sm sm:text-base">All plans include secure data storage and regular updates.</p>
            <Link href="/pricing" className="inline-block text-indigo-600 font-medium hover:text-indigo-700 text-sm sm:text-base">
              See full pricing details and FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section with dropdowns */}
      <section className="py-16 sm:py-24 bg-gray-50 mt-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our services and plans.
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {/* FAQ 1 */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(0)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-gray-900">Can I cancel my subscription anytime?</h3>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${openFAQ === 0 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`px-6 pb-4 ${openFAQ === 0 ? 'block' : 'hidden'}`}>
                <p className="text-gray-700">
                  Yes, you can cancel your subscription at any time. You&apos;ll continue to have access to the paid features until the end of your billing period.
                </p>
              </div>
            </motion.div>
            
            {/* FAQ 2 */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={() => toggleFAQ(1)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-gray-900">What happens to my documents if I downgrade?</h3>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${openFAQ === 1 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`px-6 pb-4 ${openFAQ === 1 ? 'block' : 'hidden'}`}>
                <p className="text-gray-700">
                  Your documents will remain in your account, but you&apos;ll only be able to access the features available in your current plan. You can still view all your saved documents.
                </p>
              </div>
            </motion.div>
            
            {/* FAQ 3 */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => toggleFAQ(2)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-gray-900">What&apos;s the difference between Premium and Professional?</h3>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${openFAQ === 2 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`px-6 pb-4 ${openFAQ === 2 ? 'block' : 'hidden'}`}>
                <p className="text-gray-700">
                  Professional offers unlimited access to all features including unlimited AI headshots, cover letters, and the exclusive AI interview coach. It&apos;s ideal for serious job seekers who need comprehensive tools.
                </p>
              </div>
            </motion.div>
            
            {/* FAQ 4 */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                onClick={() => toggleFAQ(3)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-gray-900">Do you offer refunds?</h3>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${openFAQ === 3 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`px-6 pb-4 ${openFAQ === 3 ? 'block' : 'hidden'}`}>
                <p className="text-gray-700">
                  We offer a 14-day money-back guarantee if you&apos;re not satisfied with your subscription. Contact our support team to request a refund.
                </p>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/pricing" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm sm:text-base">
              See All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-800 py-20">
        {/* Decorative blurred circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Start Your Career Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-indigo-100">
              Join thousands of users who have found their ideal career path and landed their dream jobs with CareerStarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup" 
                className="group bg-white text-indigo-700 px-8 py-3 rounded-lg font-medium text-lg hover:bg-indigo-50 transition-colors flex items-center justify-center"
              >
                Get Started for Free
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/contact" 
                className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 