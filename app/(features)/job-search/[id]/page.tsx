'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-wrapper';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Calendar, 
  DollarSign, 
  Briefcase,
  Clock,
  Users,
  Globe,
  Mail,
  Share2,
  Bookmark,
  BookmarkPlus,
  Send,
  Eye,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Star,
  ExternalLink,
  FileText,
  MessageSquare,
  Zap,
  Sparkles,
  Brain,
  Target,
  Lightbulb,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  CalendarDays,
  Bell,
  Edit3,
  Download,
  Award,
  TrendingDown,
  Users2,
  Heart,
  Flag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

// Mock job data - in real app this would come from API
const mockJobDetails = {
  id: 1,
  title: 'Senior AI Engineer',
  company: 'TechCorp',
  companyLogo: '/images/logos/techcorp.png',
  companyWebsite: 'https://techcorp.com',
  companySize: '500-1000 employees',
  companyIndustry: 'Technology',
  companyFounded: 2015,
  location: 'San Francisco, CA',
  salary: '$120,000 - $180,000',
  salaryType: 'Annual',
  equity: '0.1% - 0.5%',
  type: 'Full-time',
  experience: 'Senior',
  remote: 'Remote',
  tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow', 'Deep Learning', 'NLP'],
  datePosted: '2024-01-15',
  applicationsCount: 47,
  viewsCount: 234,
  isAIIRecommended: true,
  isSaved: false,
  isApplied: false,
  
  // Detailed job information
  description: `
    We're looking for a Senior AI Engineer to join our cutting-edge AI team. You'll be responsible for developing and deploying machine learning models that power our next-generation products.

    **What you'll do:**
    - Design and implement scalable machine learning pipelines
    - Develop and optimize deep learning models for computer vision and NLP
    - Collaborate with cross-functional teams to integrate AI solutions
    - Mentor junior engineers and contribute to technical architecture decisions
    - Stay up-to-date with the latest AI research and technologies

    **What we're looking for:**
    - 5+ years of experience in machine learning and software engineering
    - Strong proficiency in Python, TensorFlow, and PyTorch
    - Experience with cloud platforms (AWS, GCP, or Azure)
    - Published research or open-source contributions (preferred)
    - Excellent communication and collaboration skills

    **What we offer:**
    - Competitive salary and equity package
    - Flexible remote work options
    - Comprehensive health benefits
    - Professional development budget
    - Regular team events and hackathons
  `,
  
  requirements: [
    'Bachelor\'s degree in Computer Science, Engineering, or related field',
    '5+ years of experience in machine learning and software engineering',
    'Strong proficiency in Python, TensorFlow, and PyTorch',
    'Experience with cloud platforms (AWS, GCP, or Azure)',
    'Knowledge of software engineering best practices',
    'Excellent problem-solving and analytical skills',
    'Strong communication and collaboration abilities'
  ],
  
  benefits: [
    'Competitive salary and equity package',
    'Flexitive remote work options',
    'Comprehensive health, dental, and vision insurance',
    '401(k) with company matching',
    'Professional development budget',
    'Regular team events and hackathons',
    'Unlimited PTO',
    'Home office setup allowance'
  ],
  
  // Company information
  companyDescription: 'TechCorp is a leading AI company focused on developing cutting-edge machine learning solutions for enterprise clients. We\'re passionate about pushing the boundaries of what\'s possible with AI.',
  
  // Similar jobs
  similarJobs: [
    {
      id: 2,
      title: 'Machine Learning Engineer',
      company: 'DataFlow Inc',
      location: 'Austin, TX',
      salary: '$90,000 - $140,000',
      type: 'Full-time',
      tags: ['Python', 'SQL', 'Hybrid'],
      datePosted: '2024-01-13',
      isAIIRecommended: true
    },
    {
      id: 3,
      title: 'AI Research Scientist',
      company: 'AILabs',
      location: 'Palo Alto, CA',
      salary: '$130,000 - $200,000',
      type: 'Full-time',
      tags: ['Research', 'PhD', 'On-site'],
      datePosted: '2024-01-12',
      isAIIRecommended: false
    },
    {
      id: 4,
      title: 'MLOps Engineer',
      company: 'CloudTech',
      location: 'Seattle, WA',
      salary: '$100,000 - $150,000',
      type: 'Full-time',
      tags: ['DevOps', 'AWS', 'Remote'],
      datePosted: '2024-01-11',
      isAIIRecommended: false
    }
  ]
};

export default function JobDetails() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [job, setJob] = useState(mockJobDetails);
  const [loading, setLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'not-applied' | 'applying' | 'applied'>('not-applied');
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [showInterviewPrep, setShowInterviewPrep] = useState(false);
  const [showCompanyCulture, setShowCompanyCulture] = useState(false);
  const [showResumeOptimizer, setShowResumeOptimizer] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  // Handle save job
  const handleSaveJob = () => {
    setJob(prev => ({ ...prev, isSaved: !prev.isSaved }));
    // In real app, this would call an API
  };

  // Handle apply
  const handleApply = async () => {
    if (!user) {
      router.push('/signin?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    setLoading(true);
    setApplicationStatus('applying');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setApplicationStatus('applied');
    setLoading(false);
    
    // In real app, this would redirect to application form or external site
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this ${job.title} position at ${job.company}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      setShowShareModal(true);
    }
  };

  // Copy link to clipboard
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareModal(false);
      // Show success toast
    } catch (error) {
      console.log('Error copying link:', error);
    }
  };

  // AI Skills Analysis
  const handleAIAnalysis = () => {
    setShowAIAnalysis(!showAIAnalysis);
  };

  // Interview Preparation
  const handleInterviewPrep = () => {
    setShowInterviewPrep(!showInterviewPrep);
  };

  // Company Culture
  const handleCompanyCulture = () => {
    setShowCompanyCulture(!showCompanyCulture);
  };

  // Resume Optimization
  const handleResumeOptimizer = () => {
    setShowResumeOptimizer(!showResumeOptimizer);
  };

  // Report Job
  const handleReportJob = () => {
    // In real app, this would open a report form
    alert('Report feature coming soon!');
  };

  // Set Reminder
  const handleSetReminder = () => {
    // In real app, this would set a calendar reminder
    alert('Reminder set for this job!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Jobs
            </button>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveJob}
                className={`flex items-center ${job.isSaved ? 'text-indigo-600 border-indigo-200' : ''}`}
              >
                {job.isSaved ? (
                  <Bookmark className="w-4 h-4 mr-2 fill-current" />
                ) : (
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                )}
                {job.isSaved ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-[1400px]">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-xl">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                      {job.isAIIRecommended && (
                        <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200">
                          <Sparkles className="w-3 h-3 mr-1" />
                          AI Recommended
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-lg text-gray-600 mb-1">{job.company}</h2>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{job.salary}</div>
                  <div className="text-sm text-gray-600">Salary</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{job.type}</div>
                  <div className="text-sm text-gray-600">Job Type</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{job.experience}</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{job.remote}</div>
                  <div className="text-sm text-gray-600">Work Style</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {job.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Job Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Posted {formatDate(job.datePosted)}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {job.viewsCount} views
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {job.applicationsCount} applications
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Job Description */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Job Description</h3>
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {job.description}
                </div>
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Requirements</h3>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Skills Analysis */}
            <motion.div 
              className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-sm border border-purple-200 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">AI Skills Analysis</h3>
                    <p className="text-sm text-gray-600">Get personalized insights for this role</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAIAnalysis}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  {showAIAnalysis ? 'Hide' : 'Show'} Analysis
                </Button>
              </div>

              {showAIAnalysis && (
                <div className="space-y-6">
                  {/* Skills Match */}
                  <div className="bg-white rounded-lg p-6 border border-purple-100">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-purple-600" />
                      Skills Match Analysis
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Python</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <span className="text-sm font-semibold text-green-600">85%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">TensorFlow</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                          <span className="text-sm font-semibold text-yellow-600">60%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">AWS</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                          <span className="text-sm font-semibold text-red-600">30%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Improvement Suggestions */}
                  <div className="bg-white rounded-lg p-6 border border-purple-100">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2 text-purple-600" />
                      Improvement Suggestions
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Take an AWS certification course to boost your cloud skills</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Complete a TensorFlow specialization on Coursera</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Build a portfolio project using PyTorch</span>
                      </div>
                    </div>
                  </div>

                  {/* Market Demand */}
                  <div className="bg-white rounded-lg p-6 border border-purple-100">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
                      Market Demand
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-semibold text-green-600">+15%</div>
                        <div className="text-xs text-gray-600">Job Growth</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-semibold text-blue-600">$140k</div>
                        <div className="text-xs text-gray-600">Avg Salary</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Interview Preparation */}
            <motion.div 
              className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-sm border border-blue-200 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Interview Preparation</h3>
                    <p className="text-sm text-gray-600">AI-powered interview questions and tips</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleInterviewPrep}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  {showInterviewPrep ? 'Hide' : 'Show'} Questions
                </Button>
              </div>

              {showInterviewPrep && (
                <div className="space-y-6">
                  {/* Common Questions */}
                  <div className="bg-white rounded-lg p-6 border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-4">Common Interview Questions</h4>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h5 className="font-medium text-gray-900 mb-2">"How would you approach building a recommendation system?"</h5>
                        <p className="text-sm text-gray-600">Focus on data collection, algorithm selection, and evaluation metrics.</p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h5 className="font-medium text-gray-900 mb-2">"Describe a challenging ML project you've worked on."</h5>
                        <p className="text-sm text-gray-600">Use the STAR method: Situation, Task, Action, Result.</p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h5 className="font-medium text-gray-900 mb-2">"How do you stay updated with AI research?"</h5>
                        <p className="text-sm text-gray-600">Mention conferences, papers, and online communities.</p>
                      </div>
                    </div>
                  </div>

                  {/* Technical Tips */}
                  <div className="bg-white rounded-lg p-6 border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-4">Technical Tips</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Prepare code examples for common ML algorithms</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Have metrics ready for model evaluation</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Know the company's tech stack and products</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Company Culture */}
            <motion.div 
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-200 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Users2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Company Culture</h3>
                    <p className="text-sm text-gray-600">Employee insights and company ratings</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCompanyCulture}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  {showCompanyCulture ? 'Hide' : 'Show'} Insights
                </Button>
              </div>

              {showCompanyCulture && (
                <div className="space-y-6">
                  {/* Overall Rating */}
                  <div className="bg-white rounded-lg p-6 border border-green-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Overall Rating</h4>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">4.2/5</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-semibold text-green-600">92%</div>
                        <div className="text-xs text-gray-600">Recommend</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-semibold text-blue-600">3.8</div>
                        <div className="text-xs text-gray-600">Work-Life Balance</div>
                      </div>
                    </div>
                  </div>

                  {/* Employee Reviews */}
                  <div className="bg-white rounded-lg p-6 border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-4">Recent Reviews</h4>
                    <div className="space-y-4">
                      <div className="border-b border-gray-100 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">Anonymous Employee</span>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-3 h-3 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">"Great company culture, excellent work-life balance, and amazing opportunities for growth."</p>
                      </div>
                      <div className="border-b border-gray-100 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">Anonymous Employee</span>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-3 h-3 ${star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">"Innovative projects and supportive team. Benefits are competitive."</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Similar Jobs */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Similar Jobs</h3>
              <div className="space-y-4">
                {job.similarJobs.map((similarJob) => (
                  <div 
                    key={similarJob.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/job-search/${similarJob.id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{similarJob.title}</h4>
                          {similarJob.isAIIRecommended && (
                            <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200 text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI Recommended
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{similarJob.company} • {similarJob.location}</p>
                        <p className="text-sm text-gray-600 mb-2">{similarJob.salary} • {similarJob.type}</p>
                        <div className="flex flex-wrap gap-1">
                          {similarJob.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(similarJob.datePosted)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Button */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {applicationStatus === 'applied' ? (
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Submitted!</h3>
                  <p className="text-gray-600 mb-4">We'll review your application and get back to you soon.</p>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Track Application
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    onClick={handleApply}
                    disabled={loading}
                    className="w-full mb-4 bg-indigo-600 hover:bg-indigo-700"
                    size="lg"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Applying...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Apply Now
                      </div>
                    )}
                  </Button>
                  
                  <div className="text-center text-sm text-gray-600 mb-4">
                    {job.applicationsCount} people have applied
                  </div>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Quick Apply with CV
                    </Button>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply on Company Site
                    </Button>
                  </div>
                </>
              )}
            </motion.div>

            {/* Company Information */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900">About {job.company}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {job.companyDescription}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600">{job.companySize} employees</span>
                </div>
                <div className="flex items-center text-sm">
                  <Building2 className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600">{job.companyIndustry}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600">Founded {job.companyFounded}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Globe className="w-4 h-4 mr-3 text-gray-400" />
                  <a 
                    href={job.companyWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Job Insights */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Job Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Application Rate</span>
                  <span className="text-sm font-semibold text-gray-900">High</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="text-sm font-semibold text-gray-900">2-3 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Interview Process</span>
                  <span className="text-sm font-semibold text-gray-900">3 rounds</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Remote Policy</span>
                  <span className="text-sm font-semibold text-gray-900">Flexible</span>
                </div>
              </div>
            </motion.div>

            {/* Salary Insights */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Salary Insights</h3>
              <div className="space-y-4">
                <div className="text-center p-3 bg-indigo-50 rounded-lg">
                  <div className="text-lg font-semibold text-indigo-600">{job.salary}</div>
                  <div className="text-sm text-gray-600">Base Salary</div>
                </div>
                {job.equity && (
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-semibold text-green-600">{job.equity}</div>
                    <div className="text-sm text-gray-600">Equity</div>
                  </div>
                )}
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-semibold text-purple-600">$140k</div>
                  <div className="text-sm text-gray-600">Market Average</div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleResumeOptimizer}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Optimize Resume for This Job
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleSetReminder}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Set Application Reminder
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Job Details
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleReportJob}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Report This Job
                </Button>
              </div>
            </motion.div>

            {/* Application Tracking */}
            {applicationStatus === 'applied' && (
              <motion.div 
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Application Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Under Review
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Applied</span>
                    <span className="text-sm font-semibold text-gray-900">Today</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Expected Response</span>
                    <span className="text-sm font-semibold text-gray-900">2-3 days</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Recruiter
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Resume Optimizer Modal */}
            {showResumeOptimizer && (
              <motion.div 
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Resume Optimization</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">AI Suggestions</h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Add "Machine Learning" to your skills section</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Highlight Python projects in your experience</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Include specific metrics for your achievements</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Update Resume
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setShowResumeOptimizer(false)}>
                    Close
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Share this job</h3>
            <div className="space-y-3">
              <Button onClick={copyLink} className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Share via Email
              </Button>
              <Button variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Share via LinkedIn
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowShareModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 