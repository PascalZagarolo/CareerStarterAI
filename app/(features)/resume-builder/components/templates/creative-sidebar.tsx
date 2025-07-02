'use client';

import { ResumeData, ColorScheme } from '../types';

interface CreativeSidebarProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

export default function CreativeSidebar({ data, colorScheme }: CreativeSidebarProps) {
  const { personalInfo, sections } = data;

  return (
    <div 
      className="w-full h-full bg-white"
      style={{ 
        fontFamily: 'Poppins, sans-serif',
        fontSize: '11px',
        color: colorScheme.text,
        backgroundColor: colorScheme.background
      }}
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <div 
          className="w-1/3 p-6"
          style={{ backgroundColor: colorScheme.primary }}
        >
          <div className="text-white">
            <h1 className="text-2xl font-bold mb-3">
              {personalInfo.fullName}
            </h1>
            <p className="text-sm mb-4 opacity-90">
              {sections.find(s => s.type === 'summary')?.content?.title || 'Professional Summary'}
            </p>
            
            {/* Contact Info */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-white">Contact</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-medium text-xs">Email:</span>
                  <span className="ml-2 opacity-90 text-xs">{personalInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-xs">Phone:</span>
                  <span className="ml-2 opacity-90 text-xs">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-xs">Location:</span>
                  <span className="ml-2 opacity-90 text-xs">{personalInfo.location}</span>
                </div>
                {personalInfo.linkedin && (
                  <div className="flex items-center">
                    <span className="font-medium text-xs">LinkedIn:</span>
                    <span className="ml-2 opacity-90 text-xs">{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.portfolio && (
                  <div className="flex items-center">
                    <span className="font-medium text-xs">Portfolio:</span>
                    <span className="ml-2 opacity-90 text-xs">{personalInfo.portfolio}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {sections.find(s => s.type === 'skills') && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3 text-white">Skills</h2>
                <div className="space-y-2">
                  {sections.find(s => s.type === 'skills')?.content?.map((skill: string, index: number) => (
                    <div
                      key={index}
                      className="p-2 rounded"
                      style={{ backgroundColor: colorScheme.secondary + '30' }}
                    >
                      <span className="text-xs font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {sections.find(s => s.type === 'education') && (
              <div>
                <h2 className="text-lg font-bold mb-3 text-white">Education</h2>
                <div className="space-y-3">
                  {sections.find(s => s.type === 'education')?.content?.map((edu: any, index: number) => (
                    <div key={index}>
                      <h3 className="font-bold text-white text-sm">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-xs opacity-90">{edu.institution}</p>
                      <p className="text-xs opacity-75">{edu.startDate} - {edu.endDate}</p>
                      {edu.gpa && (
                        <p className="text-xs opacity-75">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-6">
          {/* Experience */}
          {sections.find(s => s.type === 'experience') && (
            <div className="mb-6">
              <h2 
                className="text-xl font-bold mb-4 pb-2 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent
                }}
              >
                Professional Experience
              </h2>
              <div className="space-y-4">
                {sections.find(s => s.type === 'experience')?.content?.map((exp: any, index: number) => (
                  <div key={index} className="border-l-4 pl-4" style={{ borderColor: colorScheme.accent }}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold" style={{ color: colorScheme.secondary }}>
                        {exp.position}
                      </h3>
                      <span className="text-xs font-medium" style={{ color: colorScheme.accent }}>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold mb-2" style={{ color: colorScheme.primary }}>
                      {exp.company}
                    </h4>
                    <p className="mb-2 leading-relaxed text-xs">{exp.description}</p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement: string, idx: number) => (
                          <li key={idx} className="text-xs flex items-start">
                            <span 
                              className="mr-2 mt-1 w-1 h-1 rounded-full flex-shrink-0"
                              style={{ backgroundColor: colorScheme.accent }}
                            ></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {sections.find(s => s.type === 'projects') && (
            <div className="mb-6">
              <h2 
                className="text-xl font-bold mb-4 pb-2 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent
                }}
              >
                Projects
              </h2>
              <div className="space-y-4">
                {sections.find(s => s.type === 'projects')?.content?.map((project: any, index: number) => (
                  <div key={index} className="border-l-4 pl-4" style={{ borderColor: colorScheme.accent }}>
                    <h3 className="text-lg font-bold mb-2" style={{ color: colorScheme.secondary }}>
                      {project.name}
                    </h3>
                    <p className="mb-2 leading-relaxed text-xs">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: colorScheme.accent + '20',
                              color: colorScheme.primary,
                              border: `1px solid ${colorScheme.accent}`
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {sections.find(s => s.type === 'certifications') && (
            <div>
              <h2 
                className="text-xl font-bold mb-4 pb-2 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent
                }}
              >
                Certifications
              </h2>
              <div className="space-y-3">
                {sections.find(s => s.type === 'certifications')?.content?.map((cert: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded" style={{ backgroundColor: colorScheme.background, border: `1px solid ${colorScheme.border}` }}>
                    <div>
                      <h3 className="font-bold text-xs" style={{ color: colorScheme.secondary }}>
                        {cert.name}
                      </h3>
                      <p className="text-xs">{cert.issuer}</p>
                    </div>
                    <span className="text-xs font-medium" style={{ color: colorScheme.accent }}>
                      {cert.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 