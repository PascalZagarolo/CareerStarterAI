'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight, FiStar, FiUsers, FiZap } from 'react-icons/fi';
import { BsLightningCharge, BsGraphUp, BsBriefcase } from 'react-icons/bs';
import { HiOutlineDocument, HiOutlineChatAlt2 } from 'react-icons/hi';

export default function WaitingListPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-800">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-indigo-500 bg-opacity-20 text-indigo-100 text-sm font-medium rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <BsLightningCharge className="mr-2" />
            AI-Powered Career Platform
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Job Hunting</span> is Here
          </motion.h1>
          
          <motion.p 
            className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Join thousands of professionals who are already using AI to create perfect resumes, 
            generate cover letters, and land their dream jobs faster than ever before.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-indigo-200">Professionals Joined</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-indigo-200">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-indigo-200">AI Assistance</div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mr-4">
                <HiOutlineDocument className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">AI Resume Builder</h3>
            </div>
            <p className="text-indigo-100">
              Create professional, ATS-optimized resumes tailored to specific job descriptions 
              with our advanced AI technology.
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <HiOutlineChatAlt2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Smart Cover Letters</h3>
            </div>
            <p className="text-indigo-100">
              Generate personalized cover letters that match job requirements and highlight 
              your most relevant experience.
            </p>
          </div>
        </motion.div>

        {/* Signup Form */}
        <motion.div 
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Join the Waitlist
                </h2>
                <p className="text-gray-600 text-lg">
                  Be among the first to experience the future of job hunting. 
                  Get early access and exclusive benefits.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Joining...
                    </div>
                  ) : (
                    <>
                      Join Waitlist
                      <FiArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  No spam, ever. Unsubscribe at any time.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                You're on the list!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for joining our waitlist. We'll notify you as soon as we launch 
                and give you exclusive early access to CareerStarter AI.
              </p>
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-sm text-indigo-700">
                  <strong>What's next?</strong> We'll send you updates about our launch, 
                  exclusive previews, and early access opportunities.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Social Proof */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-indigo-200 mb-6">Trusted by professionals from</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-white font-semibold">Google</div>
            <div className="text-white font-semibold">Microsoft</div>
            <div className="text-white font-semibold">Amazon</div>
            <div className="text-white font-semibold">Apple</div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-indigo-200 text-sm">
            © 2024 CareerStarter AI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}