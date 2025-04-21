'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for form data and state
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  companyName: string;
  hiringManager: string;
  jobTitle: string;
  jobDescription: string;
  relevantExperience: string;
  coverLetterTone: string;
  additionalDetails: string;
}

interface GeneratedCoverLetter {
  salutation: string;
  introduction: string;
  body: string[];
  conclusion: string;
  signature: string;
}

export default function CoverLetterGenerator() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    companyName: '',
    hiringManager: '',
    jobTitle: '',
    jobDescription: '',
    relevantExperience: '',
    coverLetterTone: 'professional',
    additionalDetails: ''
  });
  
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState<GeneratedCoverLetter>({
    salutation: '',
    introduction: '',
    body: [],
    conclusion: '',
    signature: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };
  
  const handleGenerateCoverLetter = async () => {
    setIsGenerating(true);
    
    try {
      // In a real app, this would call the OpenAI API via a Next.js API route
      // const response = await fetch('/api/generate-cover-letter', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // const data = await response.json();
      
      // For demo purposes, we'll simulate the AI response
      setTimeout(() => {
        const mockAIResponse: GeneratedCoverLetter = {
          salutation: formData.hiringManager 
            ? `Dear ${formData.hiringManager},` 
            : 'Dear Hiring Manager,',
          introduction: `I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.companyName}. With my background in ${formData.relevantExperience.split(',')[0]} and passion for delivering results, I am confident in my ability to make a valuable contribution to your team.`,
          body: [
            `My experience has equipped me with the skills necessary to excel in this role. ${formData.relevantExperience.split(',').slice(0, 2).join(' and ')} have been central to my professional development.`,
            `From the job description, I understand you're looking for someone who can ${formData.jobDescription.split('.')[0]}. In my previous roles, I have demonstrated these capabilities by consistently delivering high-quality results and adapting to new challenges.`,
            `What particularly excites me about ${formData.companyName} is your commitment to innovation and excellence in the industry. I am eager to bring my unique perspective and skills to your team.`
          ],
          conclusion: `I would welcome the opportunity to discuss how my background, skills, and experiences would be beneficial to the ${formData.jobTitle} position at ${formData.companyName}. Thank you for considering my application. I look forward to the possibility of working with your team.`,
          signature: `Sincerely,\n${formData.fullName}`
        };
        
        setGeneratedCoverLetter(mockAIResponse);
        setIsGenerating(false);
        setIsGenerated(true);
        setStep(3);
      }, 3000);
      
    } catch (error) {
      console.error('Error generating cover letter:', error);
      setIsGenerating(false);
    }
  };
  
  const handleSaveCoverLetter = async () => {
    // In a real app, this would save to Supabase
    alert('Cover letter saved successfully!');
  };
  
  const handleExportPDF = () => {
    // In a real app, this would use react-pdf to export as PDF
    alert('PDF export is a Pro feature. Please upgrade to export your cover letter.');
  };
  
  const handleCopy = () => {
    const fullCoverLetter = `${generatedCoverLetter.salutation}\n\n${generatedCoverLetter.introduction}\n\n${generatedCoverLetter.body.join('\n\n')}\n\n${generatedCoverLetter.conclusion}\n\n${generatedCoverLetter.signature}`;
    
    navigator.clipboard.writeText(fullCoverLetter)
      .then(() => alert('Cover letter copied to clipboard!'))
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Cover Letter Generator</h1>
            <p className="text-gray-600">Create personalized cover letters that match job requirements and highlight your experience</p>
          </div>
          
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {['Personal Details', 'Job Information', 'Generated Letter'].map((label, index) => (
                <div 
                  key={index}
                  className={`text-sm font-medium ${step > index + 1 ? 'text-indigo-600' : step === index + 1 ? 'text-indigo-600' : 'text-gray-400'}`}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-500"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-500"
                      placeholder="City, State"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-md shadow-sm hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    Next Step
                  </button>
                </div>
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-500"
                      placeholder="ABC Company"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hiringManager" className="block text-sm font-medium text-gray-700 mb-1">
                      Hiring Manager (if known)
                    </label>
                    <input
                      type="text"
                      id="hiringManager"
                      name="hiringManager"
                      value={formData.hiringManager}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-500"
                      placeholder="Jane Smith"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-500"
                      placeholder="Software Engineer"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="coverLetterTone" className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter Tone
                    </label>
                    <select
                      id="coverLetterTone"
                      name="coverLetterTone"
                      value={formData.coverLetterTone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-500"
                    >
                      <option value="professional">Professional</option>
                      <option value="enthusiastic">Enthusiastic</option>
                      <option value="formal">Formal</option>
                      <option value="conversational">Conversational</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description (key requirements)
                  </label>
                  <textarea
                    id="jobDescription"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-500"
                    placeholder="Paste key requirements from the job posting or describe what they're looking for..."
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="relevantExperience" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Relevant Experience
                  </label>
                  <textarea
                    id="relevantExperience"
                    name="relevantExperience"
                    value={formData.relevantExperience}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-500"
                    placeholder="Briefly describe your relevant skills and experience for this position..."
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details (optional)
                  </label>
                  <textarea
                    id="additionalDetails"
                    name="additionalDetails"
                    value={formData.additionalDetails}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-500"
                    placeholder="Any other information you'd like to include..."
                  ></textarea>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-2 bg-white text-indigo-600 font-medium rounded-md shadow-sm border border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    Back
                  </button>
                  
                  <button
                    onClick={handleGenerateCoverLetter}
                    disabled={isGenerating}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-md shadow-sm hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </div>
                    ) : (
                      'Generate Cover Letter'
                    )}
                  </button>
                </div>
              </motion.div>
            )}
            
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Generated Cover Letter</h2>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner">
                  <div className="space-y-4 text-gray-800">
                    <p>{generatedCoverLetter.salutation}</p>
                    
                    <p>{generatedCoverLetter.introduction}</p>
                    
                    {generatedCoverLetter.body.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                    
                    <p>{generatedCoverLetter.conclusion}</p>
                    
                    <p className="whitespace-pre-line">{generatedCoverLetter.signature}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Pro tip: Customize this cover letter further before sending. Always tailor it to each specific job application.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-between mt-6">
                  <button
                    onClick={handlePrevStep}
                    className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-md shadow-sm border border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    Back to Edit
                  </button>
                  
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-md shadow-sm border border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      Copy to Clipboard
                    </button>
                    
                    <button
                      onClick={handleSaveCoverLetter}
                      className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-md shadow-sm border border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      Save Cover Letter
                    </button>
                    
                    <button
                      onClick={handleExportPDF}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-md shadow-sm hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      Export PDF
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">Need help with your resume? Try our <Link href="/resume-builder" className="text-indigo-600 hover:text-indigo-800 font-medium">Resume Builder</Link></p>
        <p className="text-xs text-gray-500 mt-2">Your data is secure and never shared with third parties</p>
      </div>
    </div>
  );
} 