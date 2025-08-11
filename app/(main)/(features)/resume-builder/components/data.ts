import { ResumeData } from './types';

// Default resume data
export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    portfolio: 'johndoe.dev',
    profilePicture: undefined
  },
  sections: [
    {
      id: 'summary',
      type: 'summary',
      title: 'Professional Summary',
      content: [
        'Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams.'
      ],
      customFields: [],
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
          achievements: []
        },
        {
          id: 'exp2',
          company: 'StartupXYZ',
          position: 'Full Stack Developer',
          startDate: '2020-03',
          endDate: '2021-12',
          description: 'Developed and maintained web applications using modern technologies',
          achievements: []
        }
      ],
      customFields: [],
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
      customFields: [],
      isVisible: true,
      order: 2
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'Skills',
      content: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Leadership', 'Problem Solving', 'Communication', 'Team Collaboration'],
      customFields: [],
      isVisible: true,
      order: 3
    },
    {
      id: 'projects',
      type: 'projects',
      title: 'Projects',
      content: [
        {
          id: 'proj1',
          name: 'E-commerce Platform',
          description: 'Built a full-stack e-commerce platform using React, Node.js, and MongoDB',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          bulletPoints: [
            'Implemented secure payment processing with Stripe integration',
            'Built responsive UI with React and Material-UI components',
            'Designed RESTful API with Node.js and Express framework',
            'Integrated real-time inventory management system'
          ],
          githubLink: 'github.com/johndoe/ecommerce-platform',
          liveLink: 'ecommerce-demo.com'
        },
        {
          id: 'proj2',
          name: 'Task Management App',
          description: 'Developed a collaborative task management application with real-time updates',
          technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
          bulletPoints: [
            'Implemented real-time collaboration using Socket.io',
            'Created drag-and-drop interface for task management',
            'Built user authentication and role-based access control',
            'Optimized database queries for improved performance'
          ],
          githubLink: 'github.com/johndoe/task-manager',
          liveLink: 'taskmanager-demo.com'
        }
      ],
      customFields: [],
      isVisible: true,
      order: 4
    },
    {
      id: 'certifications',
      type: 'certifications',
      title: 'Certifications',
      content: [
        {
          id: 'cert1',
          name: 'AWS Certified Developer',
          issuer: 'Amazon Web Services',
          date: '2023-06'
        },
        {
          id: 'cert2',
          name: 'React Developer Certification',
          issuer: 'Meta',
          date: '2022-12'
        }
      ],
      customFields: [],
      isVisible: true,
      order: 5
    }
  ],
  template: 'professional-classic',
  theme: {
    primaryColor: '#1e3a8a',
    secondaryColor: '#3b82f6',
    fontFamily: 'Inter'
  }
}; 