'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for our form data and state
interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceWithBullets extends Experience {
  bullets: string[];
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  education: Education[];
  experience: Experience[];
  skills: string;
  targetRole: string;
}

interface GeneratedResume {
  summary: string;
  experience: ExperienceWithBullets[];
  skills: string[];
  education: Education[];
}

export default function ResumeBuilder() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    location: '',
    // Education
    education: [{ institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' }],
    // Experience
    experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    // Skills
    skills: '',
    // Target Role
    targetRole: '',
  });
  
  const [generatedResume, setGeneratedResume] = useState<GeneratedResume>({
    summary: '',
    experience: [],
    skills: [],
    education: [],
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section?: string, index?: number) => {
    const { name, value } = e.target;
    
    if (section && typeof index === 'number') {
      // For arrays like education and experience
      setFormData(prev => {
        const newArray = [...prev[section as keyof FormData]] as any[];
        newArray[index] = { ...newArray[index], [name]: value };
        return { ...prev, [section]: newArray };
      });
    } else {
      // For simple fields
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const addItem = (section: 'education' | 'experience') => {
    const newItem = section === 'education'
      ? { institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' }
      : { company: '', position: '', startDate: '', endDate: '', description: '' };
    
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };
  
  const removeItem = (section: 'education' | 'experience', index: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };
  
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };
  
  const handleGenerateResume = async () => {
    setIsGenerating(true);
    
    try {
      // In a real app, this would call the OpenAI API via a Next.js API route
      // const response = await fetch('/api/generate-resume', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // const data = await response.json();
      
      // For demo purposes, we'll simulate the AI response
      setTimeout(() => {
        const mockAIResponse: GeneratedResume = {
          summary: `Experienced ${formData.targetRole} with a strong background in ${formData.skills.split(',')[0]}. Proven track record of success at ${formData.experience[0]?.company || 'previous companies'} with expertise in ${formData.skills.split(',').slice(1, 3).join(' and ')}.`,
          experience: formData.experience.map(exp => ({
            ...exp,
            bullets: [
              `Led key initiatives that resulted in improved efficiency and performance.`,
              `Collaborated with cross-functional teams to deliver high-quality results.`,
              `Implemented innovative solutions to complex problems.`
            ]
          })),
          skills: formData.skills.split(',').map(skill => skill.trim()),
          education: formData.education,
        };
        
        setGeneratedResume(mockAIResponse);
        setIsGenerating(false);
        setIsGenerated(true);
        setStep(4);
      }, 3000);
      
    } catch (error) {
      console.error('Error generating resume:', error);
      setIsGenerating(false);
    }
  };
  
  const handleSaveResume = async () => {
    // In a real app, this would save to Supabase
    alert('Resume saved successfully!');
  };
  
  const handleExportPDF = () => {
    // In a real app, this would use react-pdf to export as PDF
    alert('PDF export is a Pro feature. Please upgrade to export your resume.');
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-10">
        <div className="w-full max-w-3xl bg-white rounded-full h-2">
          <div 
            className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
        <div className="absolute flex w-full max-w-3xl justify-between px-2">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                step >= i 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'bg-white border-2 border-gray-200 text-gray-400'
              }`}
            >
              {i}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderPersonalInfoStep = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
        <p className="text-gray-600">Let's start with the basics. This information will appear at the top of your resume.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="City, State"
            />
          </div>
        </div>
      </motion.div>
    );
  };
  
  const renderEducationExperienceStep = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-8"
      >
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Education</h2>
              <p className="text-gray-600 mt-1">Add your educational background</p>
            </div>
            <button
              type="button"
              onClick={() => addItem('education')}
              className="flex items-center gap-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Education
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Education #{index + 1}</h3>
                  {formData.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem('education', index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                    <input
                      type="text"
                      name="institution"
                      value={edu.institution}
                      onChange={(e) => handleChange(e, 'education', index)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="University/School Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleChange(e, 'education', index)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Bachelor's, Master's, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                    <input
                      type="text"
                      name="field"
                      value={edu.field}
                      onChange={(e) => handleChange(e, 'education', index)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Computer Science, Business, etc."
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="text"
                        name="startDate"
                        value={edu.startDate}
                        onChange={(e) => handleChange(e, 'education', index)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="text"
                        name="endDate"
                        value={edu.endDate}
                        onChange={(e) => handleChange(e, 'education', index)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="MM/YYYY or Present"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={edu.description}
                    onChange={(e) => handleChange(e, 'education', index)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Achievements, GPA, relevant coursework, etc."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-5 mt-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
              <p className="text-gray-600 mt-1">Add your work experience</p>
            </div>
            <button
              type="button"
              onClick={() => addItem('experience')}
              className="flex items-center gap-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Experience
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.experience.map((exp, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Experience #{index + 1}</h3>
                  {formData.experience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem('experience', index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleChange(e, 'experience', index)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Company Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                      type="text"
                      name="position"
                      value={exp.position}
                      onChange={(e) => handleChange(e, 'experience', index)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Job Title"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="text"
                        name="startDate"
                        value={exp.startDate}
                        onChange={(e) => handleChange(e, 'experience', index)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="text"
                        name="endDate"
                        value={exp.endDate}
                        onChange={(e) => handleChange(e, 'experience', index)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="MM/YYYY or Present"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={exp.description}
                    onChange={(e) => handleChange(e, 'experience', index)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Describe your responsibilities and achievements. Our AI will turn this into bullet points."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };
  
  const renderSkillsTargetRoleStep = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-8"
      >
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Skills</h2>
          <p className="text-gray-600 mb-4">
            Enter your skills separated by commas. Our AI will organize them by relevance.
          </p>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="e.g., JavaScript, React, Node.js, Project Management, Team Leadership, Communication"
          />
          <div className="mt-3 text-sm text-gray-500 flex items-start">
            <svg className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Include both technical skills and soft skills for a well-rounded resume.</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Target Role</h2>
          <p className="text-gray-600 mb-4">
            What position are you applying for? This helps our AI tailor your resume.
          </p>
          <input
            type="text"
            name="targetRole"
            value={formData.targetRole}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="e.g., Frontend Developer, Marketing Manager, Data Scientist"
          />
          <div className="mt-3 text-sm text-gray-500 flex items-start">
            <svg className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Being specific helps create a more targeted resume. Include level if applicable (e.g., "Senior" or "Junior").</span>
          </div>
        </div>
      </motion.div>
    );
  };
  
  const renderResumePreviewStep = () => {
    if (isGenerating) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full border-t-4 border-indigo-500 animate-spin"></div>
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-gray-200"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Generating Your Resume</h3>
          <p className="text-gray-600 text-center max-w-md">
            Our AI is analyzing your information to create a professional, tailored resume...
          </p>
        </div>
      );
    }
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Your AI-Generated Resume</h2>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleSaveResume}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
              </svg>
              Save
            </button>
            <button
              type="button"
              onClick={handleExportPDF}
              className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 text-sm font-medium rounded-lg border border-indigo-200 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Export PDF
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-md">
          <div className="mb-8 border-b border-gray-100 pb-6">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">{formData.fullName}</h1>
            <div className="flex flex-wrap justify-center gap-x-6 text-gray-600">
              {formData.email && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {formData.email}
                </span>
              )}
              {formData.phone && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  {formData.phone}
                </span>
              )}
              {formData.location && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {formData.location}
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-100">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{generatedResume.summary}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-100">Experience</h2>
              <div className="space-y-5">
                {generatedResume.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                        <p className="text-gray-700">{exp.company}</p>
                      </div>
                      <span className="text-gray-500 text-sm">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-indigo-500 mr-2 mt-1">•</span>
                          <span className="text-gray-700">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-100">Education</h2>
              <div className="space-y-4">
                {generatedResume.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">{edu.institution}</h3>
                        <p className="text-gray-700">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                      </div>
                      <span className="text-gray-500 text-sm">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    {edu.description && <p className="text-gray-600 mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-100">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {generatedResume.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Pro Tip</h3>
              <p className="mt-1 text-gray-600">
                Use our <Link href="/cover-letter" className="text-indigo-600 font-medium hover:text-indigo-800">AI Cover Letter Generator</Link> to create a matching cover letter for this resume.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  
  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderPersonalInfoStep();
      case 2:
        return renderEducationExperienceStep();
      case 3:
        return renderSkillsTargetRoleStep();
      case 4:
        return renderResumePreviewStep();
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
            AI Resume Builder
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Create a professional, tailored resume in minutes with our AI-powered resume builder
          </p>
        </div>
        
        {renderStepIndicator()}
        
        <div className="mt-8 relative">
          <AnimatePresence mode="wait">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-10">
              {renderCurrentStep()}
              
              <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center px-5 py-2.5 bg-white text-indigo-600 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Previous
                  </button>
                )}
                
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={step === 3 ? handleGenerateResume : handleNextStep}
                    className={`inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                      step > 1 ? 'ml-auto' : ''
                    } ${
                      step === 3 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' 
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {step === 3 ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        Generate Resume
                      </>
                    ) : (
                      <>
                        Next
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </>
                    )}
                  </button>
                ) : null}
              </div>
            </div>
          </AnimatePresence>
        </div>
        
        {step !== 4 && (
          <div className="text-center text-sm text-gray-500 mt-10">
            <p>Your information is secure and never shared without your consent.</p>
            <p className="mt-1">Need help? <Link href="/support" className="text-indigo-600 font-medium hover:text-indigo-800">Contact our support team</Link></p>
          </div>
        )}
      </div>
    </div>
  );
} 