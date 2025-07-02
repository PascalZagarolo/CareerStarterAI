import { ResumeData, Template } from './types';

// Default resume data
export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    portfolio: 'johndoe.dev'
  },
  sections: [
    {
      id: 'summary',
      type: 'summary',
      title: 'Professional Summary',
      content: 'Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams.',
      isVisible: true,
      order: 0
    },
    {
      id: 'experience',
      type: 'experience',
      title: 'Work Experience',
      content: [
        {
          id: 'exp1',
          company: 'TechCorp Inc.',
          position: 'Senior Software Engineer',
          startDate: '2022-01',
          endDate: 'Present',
          description: 'Lead development of enterprise applications using React and Node.js',
          achievements: [
            'Led a team of 5 developers to deliver a customer portal that increased user engagement by 40%',
            'Implemented CI/CD pipeline reducing deployment time by 60%',
            'Mentored junior developers and conducted code reviews'
          ]
        },
        {
          id: 'exp2',
          company: 'StartupXYZ',
          position: 'Full Stack Developer',
          startDate: '2020-03',
          endDate: '2021-12',
          description: 'Developed and maintained web applications using modern technologies',
          achievements: [
            'Built responsive web applications using React and TypeScript',
            'Optimized database queries improving performance by 30%',
            'Collaborated with design team to implement UI/UX improvements'
          ]
        }
      ],
      isVisible: true,
      order: 1
    },
    {
      id: 'education',
      type: 'education',
      title: 'Education',
      content: [
        {
          id: 'edu1',
          institution: 'University of Technology',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2016-09',
          endDate: '2020-05',
          gpa: '3.8/4.0'
        }
      ],
      isVisible: true,
      order: 2
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'Skills',
      content: {
        technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
        soft: ['Leadership', 'Problem Solving', 'Communication', 'Team Collaboration']
      },
      isVisible: true,
      order: 3
    }
  ],
  template: 'modern',
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#1F2937',
    fontFamily: 'Inter'
  }
};

// Available templates
export const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    thumbnail: '/api/placeholder/200/150',
    colors: { primary: '#3B82F6', secondary: '#1F2937' },
    fontFamily: 'Inter'
  },
  {
    id: 'classic',
    name: 'Classic',
    thumbnail: '/api/placeholder/200/150',
    colors: { primary: '#374151', secondary: '#6B7280' },
    fontFamily: 'Georgia'
  },
  {
    id: 'creative',
    name: 'Creative',
    thumbnail: '/api/placeholder/200/150',
    colors: { primary: '#8B5CF6', secondary: '#4C1D95' },
    fontFamily: 'Poppins'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: '/api/placeholder/200/150',
    colors: { primary: '#000000', secondary: '#6B7280' },
    fontFamily: 'Helvetica'
  },
  {
    id: 'professional',
    name: 'Professional',
    thumbnail: '/api/placeholder/200/150',
    colors: { primary: '#059669', secondary: '#065F46' },
    fontFamily: 'Roboto'
  }
]; 