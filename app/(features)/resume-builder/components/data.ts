import { ResumeData } from './types';

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
      content: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Leadership', 'Problem Solving', 'Communication', 'Team Collaboration'],
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
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
        },
        {
          id: 'proj2',
          name: 'Task Management App',
          description: 'Developed a collaborative task management application with real-time updates',
          technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL']
        }
      ],
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