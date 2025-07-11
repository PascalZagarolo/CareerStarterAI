'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Sparkles, 
  Target, 
  Zap, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Brain,
  FileText,
  Camera,
  Search,
  MessageSquare,
  BarChart3,
  Shield,
  Clock,
  Globe,
  Award
} from 'lucide-react';

export default function WaitingList() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check localStorage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('waitingListEmail');
    if (savedEmail) {
      setIsSubmitted(true);
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email)
    // Check if already submitted
    if (isSubmitted) {
      setError('You have already joined the waiting list!');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      console.log("2")
      const response = await axios.post('/api/waiting-list', { email });
      console.log(response)
      
      // Save to localStorage to prevent multiple submissions
      localStorage.setItem('waitingListEmail', email);
      localStorage.setItem('waitingListSubmitted', 'true');
      
      setIsSubmitted(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || err.message || 'Failed to join waiting list');
      } else {
        setError('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center px-4 py-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Career Platform
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Your Career Journey
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Reimagined by AI
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              The world&apos;s first comprehensive AI platform that handles your entire career journey—from discovering your perfect path to landing your dream job.
            </motion.p>

            {/* CTA Section */}
            <motion.div
              variants={fadeInUp}
              className="max-w-md mx-auto"
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                      required
                    />
                  </div>
                  {error && (
                    <div className="text-red-400 text-sm text-center">{error}</div>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        Join the Waitlist
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">You&apos;re on the list!</h3>
                  <p className="text-gray-300">We&apos;ll notify you as soon as we launch. Get ready to transform your career!</p>
                </div>
              )}
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex items-center justify-center space-x-8 text-gray-400"
            >
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full border-2 border-slate-900"></div>
                  ))}
                </div>
                <span className="ml-3 text-sm">2,847+ already waiting</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* USPs Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why CareerStarter AI is
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Revolutionary
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unlike traditional career tools, we provide a complete AI-powered ecosystem that adapts to your unique career goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-First Approach",
                description: "Every feature leverages advanced AI, from resume optimization to interview coaching, ensuring personalized results.",
                color: "from-indigo-500 to-cyan-500"
              },
              {
                icon: Target,
                title: "Complete Career Journey",
                description: "From career discovery to job application to interview prep—all in one seamless platform.",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: Zap,
                title: "Real-time Optimization",
                description: "AI continuously optimizes your materials based on job market trends and ATS requirements.",
                color: "from-cyan-500 to-blue-500"
              },
              {
                icon: Users,
                title: "Personalized Experience",
                description: "AI learns your preferences and career goals to provide tailored recommendations and content.",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: TrendingUp,
                title: "Data-Driven Insights",
                description: "Access real-time market intelligence, salary data, and career progression analytics.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Shield,
                title: "ATS-Optimized Results",
                description: "Ensure your resume passes through Applicant Tracking Systems with AI-powered keyword optimization.",
                color: "from-indigo-500 to-blue-500"
              }
            ].map((usp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${usp.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <usp.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{usp.title}</h3>
                <p className="text-gray-300 leading-relaxed">{usp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive suite of AI-powered tools covers every aspect of your career development journey.
            </p>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                icon: FileText,
                title: "AI Resume Builder",
                subtitle: "Create ATS-optimized resumes that get you interviews",
                features: [
                  "Job-specific keyword optimization",
                  "Real-time ATS scoring",
                  "Professional templates",
                  "Smart content suggestions"
                ],
                gradient: "from-indigo-500 to-cyan-500"
              },
              {
                icon: Camera,
                title: "AI Professional Headshots",
                subtitle: "Generate studio-quality headshots for any industry",
                features: [
                  "Industry-specific styling",
                  "Multiple variations",
                  "Professional backgrounds",
                  "Instant generation"
                ],
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                icon: Search,
                title: "AI Job Search Assistant",
                subtitle: "Find your perfect job matches with intelligent recommendations",
                features: [
                  "Skills-based matching",
                  "Market demand analysis",
                  "Salary insights",
                  "Application tracking"
                ],
                gradient: "from-cyan-500 to-blue-500"
              },
              {
                icon: MessageSquare,
                title: "AI Cover Letter Generator",
                subtitle: "Write compelling cover letters that stand out",
                features: [
                  "Job description analysis",
                  "Experience matching",
                  "Tone customization",
                  "Company research integration"
                ],
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: Brain,
                title: "AI Interview Coach",
                subtitle: "Practice interviews with personalized feedback",
                features: [
                  "Industry-specific questions",
                  "Real-time feedback",
                  "Behavioral training",
                  "Confidence building"
                ],
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: BarChart3,
                title: "Career Intelligence",
                subtitle: "Get data-driven insights for career decisions",
                features: [
                  "Skills gap analysis",
                  "Salary progression tracking",
                  "Market trend forecasting",
                  "Performance analytics"
                ],
                gradient: "from-indigo-500 to-blue-500"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="lg:w-1/2">
                  <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-xl text-gray-300 mb-6">{service.subtitle}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:w-1/2">
                  <div className={`w-full h-80 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center`}>
                    <div className="text-white text-center">
                      <service.icon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Interactive Demo</p>
                      <p className="text-sm opacity-75">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof & Stats */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Career
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Professionals
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "95%", label: "ATS Success Rate", icon: Target },
              { number: "3x", label: "Faster Job Placement", icon: Zap },
              { number: "50K+", label: "Resumes Generated", icon: FileText },
              { number: "98%", label: "User Satisfaction", icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Your Career?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of professionals who are already waiting to revolutionize their career journey with AI.
            </p>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                  required
                />
                {error && (
                  <div className="text-red-400 text-sm text-center">{error}</div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Join the Waitlist
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-8 max-w-md mx-auto">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">Welcome aboard!</h3>
                <p className="text-gray-300">You&apos;ll be among the first to experience the future of career development.</p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-center space-x-6 text-gray-400">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">Launching Q1 2024</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <span className="text-sm">Global Access</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2" />
                <span className="text-sm">Free Beta Access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
