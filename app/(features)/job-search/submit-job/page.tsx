'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-wrapper';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  DollarSign, 
  Briefcase,
  Mail,
  Globe,
  Plus,
  X,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function SubmitJob() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [jobId, setJobId] = useState<string>('');
  console.log(jobId);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'Full-time',
    experience: 'Mid-level',
    description: '',
    contactEmail: '',
    companyWebsite: '',
    tags: [] as string[]
  });

  const [newTag, setNewTag] = useState('');

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const experienceLevels = ['Entry', 'Mid-level', 'Senior', 'Lead'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push('/signin?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/jobs/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedBy: user.email
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setJobId(data.data.jobId);
        setSuccess(true);
      } else {
        alert('Failed to submit job: ' + data.error);
      }
    } catch (error) {
      console.error('Error submitting job:', error);
      alert('Failed to submit job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full mx-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your job posting has been submitted and is pending verification. 
            We{"'"}ll review it and make it live within 24 hours.
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => router.push('/job-search')}
              className="w-full"
            >
              Browse Jobs
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setSuccess(false);
                setFormData({
                  title: '',
                  company: '',
                  location: '',
                  salary: '',
                  type: 'Full-time',
                  experience: 'Mid-level',
                  description: '',
                  contactEmail: '',
                  companyWebsite: '',
                  tags: []
                });
              }}
              className="w-full"
            >
              Submit Another Job
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit a Job Posting</h1>
            <p className="text-gray-600">Share job opportunities with our community</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  required
                  className="w-full"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="e.g., TechCorp Inc"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., San Francisco, CA or Remote"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    placeholder="e.g., $80,000 - $120,000"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Job Type and Experience */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills & Technologies
                </label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="e.g., React, Python, AWS"
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    variant="outline"
                    className="px-4"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="flex items-center">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the role, responsibilities, and requirements..."
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="applications@company.com"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Company Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="url"
                    value={formData.companyWebsite}
                    onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                    placeholder="https://company.com"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Submit Job Posting
                  </div>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 