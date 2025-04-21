'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CareerPath {
  title: string;
  description: string;
  matchScore: number;
  salaryRange: string;
  growthOutlook: string;
  requiredSkills: string[];
  recommendedCourses: {
    title: string;
    provider: string;
    url: string;
    duration: string;
  }[];
  entryLevelJobs: {
    title: string;
    description: string;
  }[];
}

interface FormData {
  currentSkills: string;
  interests: string;
  education: string;
  experience: string;
  goals: string;
}

export default function CareerPathFinder() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    currentSkills: '',
    interests: '',
    education: '',
    experience: '',
    goals: '',
  });
  
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };
  
  const handleGenerateCareerPaths = async () => {
    setIsGenerating(true);
    
    try {
      // In a real app, this would call the OpenAI API via a Next.js API route
      // const response = await fetch('/api/generate-career-paths', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      
      // Simulating API response for demo
      setTimeout(() => {
        // Generate sample career paths based on skills and interests
        const mockPaths: CareerPath[] = [
          {
            title: 'Software Developer',
            description: 'Design, develop, and maintain software applications and systems using programming languages and development tools.',
            matchScore: 92,
            salaryRange: '$70,000 - $120,000',
            growthOutlook: 'High growth (22% growth projected over the next decade)',
            requiredSkills: [
              'JavaScript',
              'Python',
              'React',
              'Git',
              'Problem Solving',
              'Agile Development',
            ],
            recommendedCourses: [
              {
                title: 'Complete Web Development Bootcamp',
                provider: 'Udemy',
                url: 'https://www.udemy.com/',
                duration: '12 weeks',
              },
              {
                title: 'Computer Science Fundamentals',
                provider: 'Coursera',
                url: 'https://www.coursera.org/',
                duration: '6 months',
              },
              {
                title: 'JavaScript: The Advanced Concepts',
                provider: 'Udemy',
                url: 'https://www.udemy.com/',
                duration: '8 weeks',
              },
            ],
            entryLevelJobs: [
              {
                title: 'Junior Software Developer',
                description: 'Entry-level position focusing on building and maintaining software applications under the guidance of senior developers.',
              },
              {
                title: 'Front-End Developer',
                description: 'Focus on creating user interfaces and implementing visual elements that users interact with in web applications.',
              },
            ],
          },
          {
            title: 'Data Analyst',
            description: 'Collect, process, and analyze data to help organizations make better business decisions.',
            matchScore: 87,
            salaryRange: '$60,000 - $95,000',
            growthOutlook: 'Above average growth (18% projected over the next decade)',
            requiredSkills: [
              'SQL',
              'Excel',
              'Python',
              'Data Visualization',
              'Statistical Analysis',
              'Problem Solving',
            ],
            recommendedCourses: [
              {
                title: 'Data Analyst with Python',
                provider: 'DataCamp',
                url: 'https://www.datacamp.com/',
                duration: '4 months',
              },
              {
                title: 'SQL for Data Analysis',
                provider: 'Udacity',
                url: 'https://www.udacity.com/',
                duration: '6 weeks',
              },
              {
                title: 'Business Analytics Specialization',
                provider: 'Coursera',
                url: 'https://www.coursera.org/',
                duration: '5 months',
              },
            ],
            entryLevelJobs: [
              {
                title: 'Junior Data Analyst',
                description: 'Entry-level position focusing on collecting, cleaning, and analyzing data to support business decisions.',
              },
              {
                title: 'Business Intelligence Analyst',
                description: 'Focus on transforming data into insights that drive business value and help organizations make decisions.',
              },
            ],
          },
          {
            title: 'UX/UI Designer',
            description: 'Design user interfaces and experiences for digital products, focusing on usability, accessibility, and visual appeal.',
            matchScore: 81,
            salaryRange: '$65,000 - $110,000',
            growthOutlook: 'Above average growth (15% projected over the next decade)',
            requiredSkills: [
              'UI Design',
              'User Research',
              'Wireframing',
              'Prototyping',
              'Figma/Adobe XD',
              'Visual Design',
            ],
            recommendedCourses: [
              {
                title: 'UX Design Professional Certificate',
                provider: 'Google (Coursera)',
                url: 'https://www.coursera.org/',
                duration: '6 months',
              },
              {
                title: 'UX/UI Design Bootcamp',
                provider: 'Springboard',
                url: 'https://www.springboard.com/',
                duration: '9 months',
              },
              {
                title: 'UI Design Fundamentals',
                provider: 'LinkedIn Learning',
                url: 'https://www.linkedin.com/learning/',
                duration: '4 weeks',
              },
            ],
            entryLevelJobs: [
              {
                title: 'Junior UX/UI Designer',
                description: 'Entry-level position working on user interface design and user experience improvements under the guidance of senior designers.',
              },
              {
                title: 'Web Designer',
                description: 'Focus on designing visually appealing and functional websites that meet client and user needs.',
              },
            ],
          },
        ];
        
        setCareerPaths(mockPaths);
        setIsGenerating(false);
        setStep(2);
      }, 3000);
      
    } catch (error) {
      console.error('Error generating career paths:', error);
      setIsGenerating(false);
    }
  };
  
  const handleSavePath = async (path: CareerPath) => {
    // In a real app, this would save to Supabase
    alert(`Career path "${path.title}" saved to your account!`);
  };
  
  const handleSelectPath = (path: CareerPath) => {
    setSelectedPath(path);
    setStep(3);
  };
  
  const renderInputForm = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Current Skills</h2>
          <p className="text-gray-600 mb-4">
            List your technical and soft skills (e.g., Python, project management, communication)
          </p>
          <textarea
            name="currentSkills"
            value={formData.currentSkills}
            onChange={handleChange}
            rows={3}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="List your skills..."
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Interests</h2>
          <p className="text-gray-600 mb-4">
            What kind of work are you interested in? (e.g., technology, design, healthcare)
          </p>
          <textarea
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            rows={3}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe your interests..."
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          <p className="text-gray-600 mb-4">
            Your educational background (degrees, certifications, self-learning)
          </p>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            rows={3}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe your education..."
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
          <p className="text-gray-600 mb-4">
            Briefly describe your work history and key responsibilities
          </p>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows={3}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe your work experience..."
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Career Goals</h2>
          <p className="text-gray-600 mb-4">
            What are you looking for in your ideal career? (e.g., remote work, growth opportunities, work-life balance)
          </p>
          <textarea
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            rows={3}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe your career goals..."
          />
        </div>
      </div>
    );
  };
  
  const renderCareerPathList = () => {
    if (isGenerating) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-lg">Analyzing your profile...</p>
          <p className="text-gray-600 mt-2">Our AI is identifying optimal career paths based on your skills and interests.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Recommended Career Paths</h2>
        <p className="text-gray-600">
          Based on your skills, interests, and goals, here are the best career paths for you:
        </p>
        
        <div className="space-y-6">
          {careerPaths.map((path, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{path.title}</h3>
                  <div className="flex items-center mb-3">
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {path.matchScore}% Match
                    </div>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-600 text-sm">{path.salaryRange}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-600 text-sm">{path.growthOutlook}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSavePath(path)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-700 mb-4">{path.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {path.requiredSkills.map((skill, i) => (
                    <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => handleSelectPath(path)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                View Detailed Roadmap
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800">
          <p className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pro tip: Save career paths to your account to access them later and track your progress.
          </p>
        </div>
      </div>
    );
  };
  
  const renderDetailedPathView = () => {
    if (!selectedPath) return null;
    
    return (
      <div className="space-y-8">
        <div className="flex items-center">
          <button
            onClick={() => setStep(2)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold">{selectedPath.title} Roadmap</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Career Overview</h3>
              <p className="text-gray-700 mb-4">{selectedPath.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Salary Range</h4>
                  <p className="text-gray-900 font-medium">{selectedPath.salaryRange}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Growth Outlook</h4>
                  <p className="text-gray-900 font-medium">{selectedPath.growthOutlook}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPath.requiredSkills.map((skill, i) => (
                    <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Learning Roadmap</h3>
              <div className="space-y-6">
                {selectedPath.recommendedCourses.map((course, i) => (
                  <div key={i} className="border-l-2 border-indigo-200 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-[7px] top-1"></div>
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <p className="text-gray-600 text-sm">{course.provider} • {course.duration}</p>
                    <a 
                      href={course.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 text-sm hover:underline"
                    >
                      View Course
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Entry-Level Jobs</h3>
              <div className="space-y-4">
                {selectedPath.entryLevelJobs.map((job, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <h4 className="font-medium text-gray-900 mb-1">{job.title}</h4>
                    <p className="text-gray-600 text-sm">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Ready to Start?</h3>
              <p className="text-gray-700 mb-4">
                Save this career path to your account to access it anytime and start tracking your progress.
              </p>
              <button 
                onClick={() => handleSavePath(selectedPath)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors mb-3"
              >
                Save Career Path
              </button>
              
              <Link 
                href="/resume-builder"
                className="block w-full bg-white border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
              >
                Create Resume for This Path
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderInputForm();
      case 2:
        return renderCareerPathList();
      case 3:
        return renderDetailedPathView();
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Career Path Finder</h1>
        <p className="text-gray-600">Discover your ideal career path based on your skills and interests</p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        {renderCurrentStep()}
        
        {step === 1 && (
          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleGenerateCareerPaths}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isGenerating}
            >
              {isGenerating ? 'Analyzing...' : 'Find Career Paths'}
            </button>
          </div>
        )}
        
        {step === 2 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handlePrevStep}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-indigo-800 mb-2">How Career Path Finder Works</h3>
        <p className="text-indigo-700 mb-4">
          Our AI analyzes your skills, interests, education, and goals to identify career paths that match your profile. 
          We provide detailed roadmaps with required skills, recommended courses, and entry-level job options.
        </p>
        <p className="text-indigo-700">
          <span className="font-semibold">Pro subscribers</span> can access unlimited career paths and detailed roadmaps. 
          Free users can explore one career path.
        </p>
      </div>
    </div>
  );
} 