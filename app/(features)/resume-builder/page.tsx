'use client';

import { useState } from 'react';
import Link from 'next/link';

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
      <div className="flex items-center justify-center mb-8">
        <ol className="flex items-center w-full max-w-3xl">
          {[1, 2, 3, 4].map((item) => (
            <li key={item} className={`flex items-center ${item < 4 ? 'w-full' : ''}`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= item ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {item}
              </div>
              {item < 4 && (
                <div className={`w-full h-1 mx-2 ${
                  step > item ? 'bg-indigo-600' : 'bg-gray-200'
                }`}></div>
              )}
            </li>
          ))}
        </ol>
      </div>
    );
  };
  
  const renderPersonalInfoStep = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="City, State"
            />
          </div>
        </div>
      </div>
    );
  };
  
  const renderEducationExperienceStep = () => {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Education</h2>
            <button
              type="button"
              onClick={() => addItem('education')}
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Education
            </button>
          </div>
          
          {formData.education.map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-md font-medium">Education #{index + 1}</h3>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('education', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Institution</label>
                  <input
                    type="text"
                    name="institution"
                    value={edu.institution}
                    onChange={(e) => handleChange(e, 'education', index)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleChange(e, 'education', index)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                  <input
                    type="text"
                    name="field"
                    value={edu.field}
                    onChange={(e) => handleChange(e, 'education', index)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="text"
                      name="startDate"
                      value={edu.startDate}
                      onChange={(e) => handleChange(e, 'education', index)}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="MM/YYYY"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="text"
                      name="endDate"
                      value={edu.endDate}
                      onChange={(e) => handleChange(e, 'education', index)}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="MM/YYYY or Present"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={edu.description}
                  onChange={(e) => handleChange(e, 'education', index)}
                  rows={2}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Experience</h2>
            <button
              type="button"
              onClick={() => addItem('experience')}
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Experience
            </button>
          </div>
          
          {formData.experience.map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-md font-medium">Experience #{index + 1}</h3>
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('experience', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleChange(e, 'experience', index)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={exp.position}
                    onChange={(e) => handleChange(e, 'experience', index)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="text"
                      name="startDate"
                      value={exp.startDate}
                      onChange={(e) => handleChange(e, 'experience', index)}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="MM/YYYY"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="text"
                      name="endDate"
                      value={exp.endDate}
                      onChange={(e) => handleChange(e, 'experience', index)}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="MM/YYYY or Present"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleChange(e, 'experience', index)}
                  rows={3}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe your responsibilities and achievements"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderSkillsTargetRoleStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <p className="text-gray-600 mb-4">
            Enter your skills separated by commas (e.g., JavaScript, React, Project Management)
          </p>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows={4}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your skills..."
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Target Role</h2>
          <p className="text-gray-600 mb-4">
            What position are you applying for? This helps our AI tailor your resume.
          </p>
          <input
            type="text"
            name="targetRole"
            value={formData.targetRole}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Software Engineer, Marketing Manager, etc."
          />
        </div>
      </div>
    );
  };
  
  const renderResumePreviewStep = () => {
    if (isGenerating) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-lg">Generating your optimized resume...</p>
          <p className="text-gray-600 mt-2">Our AI is analyzing your information to create a professional resume.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Your Generated Resume</h2>
        
        <div className="border border-gray-200 rounded-lg p-8 bg-white shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">{formData.fullName}</h1>
            <div className="text-gray-600 mt-1 flex flex-wrap justify-center gap-x-4">
              {formData.email && <span>{formData.email}</span>}
              {formData.phone && <span>{formData.phone}</span>}
              {formData.location && <span>{formData.location}</span>}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-3">Professional Summary</h2>
            <p className="text-gray-700">{generatedResume.summary}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-3">Experience</h2>
            {generatedResume.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">{exp.position}</h3>
                  <span className="text-gray-600 text-sm">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-gray-800">{exp.company}</p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-3">Education</h2>
            {generatedResume.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-medium">{edu.institution}</h3>
                  <span className="text-gray-600 text-sm">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-gray-800">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {generatedResume.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleSaveResume}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Resume
          </button>
          
          <button
            type="button"
            onClick={handleExportPDF}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Export as PDF
          </button>
        </div>
        
        <div className="bg-indigo-50 border border-indigo-200 rounded-md p-4 mt-8">
          <p className="text-sm text-indigo-800">
            <span className="font-medium">Pro Tip:</span> Save this resume and then use our Cover Letter Generator to create a matching cover letter.
          </p>
        </div>
      </div>
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">AI Resume Builder</h1>
        <p className="text-gray-600">Create a professional resume in minutes</p>
      </div>
      
      {renderStepIndicator()}
      
      <div className="bg-white shadow rounded-lg p-6">
        {renderCurrentStep()}
        
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Previous
            </button>
          )}
          
          {step < 4 ? (
            <button
              type="button"
              onClick={step === 3 ? handleGenerateResume : handleNextStep}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-auto"
            >
              {step === 3 ? 'Generate Resume' : 'Next'}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
} 