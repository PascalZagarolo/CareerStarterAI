'use client';

import { ResumeData, ColorScheme } from '../types';

interface StartupModernProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

export default function StartupModern({ data, colorScheme }: StartupModernProps) {
  const { personalInfo, sections } = data;

  return (
    <div 
      className="w-full h-full bg-white"
      style={{ 
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        color: colorScheme.text,
        backgroundColor: colorScheme.background
      }}
    >
      {/* Header */}
      <div 
        className="p-6 text-center"
        style={{ backgroundColor: colorScheme.primary }}
      >
        <h1 
          className="text-3xl font-bold mb-2 text-white"
        >
          {personalInfo.fullName}
        </h1>
        <p className="text-lg mb-4 text-white opacity-90">
          {sections.find(s => s.type === 'summary')?.content?.title || 'Professional Summary'}
        </p>
        <div className="flex justify-center items-center space-x-4 text-white opacity-80 text-xs">
          <div className="flex items-center">
            <span>{personalInfo.email}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
          <div className="flex items-center">
            <span>{personalInfo.phone}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
          <div className="flex items-center">
            <span>{personalInfo.location}</span>
          </div>
        </div>
        {(personalInfo.linkedin || personalInfo.portfolio) && (
          <div className="mt-3 flex justify-center items-center space-x-4 text-white opacity-80 text-xs">
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.linkedin && personalInfo.portfolio && (
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center">
                <span>{personalInfo.portfolio}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {sections
          .filter(section => section.isVisible && section.type !== 'summary')
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <div key={section.id}>
              <h2 
                className="text-xl font-bold mb-4 pb-2 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent
                }}
              >
                {section.title}
              </h2>
              
              {section.type === 'experience' && (
                <div className="space-y-4">
                  {section.content?.map((exp: any, index: number) => (
                    <div key={index} className="relative pl-4 border-l-4" style={{ borderColor: colorScheme.accent }}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold" style={{ color: colorScheme.secondary }}>
                          {exp.position}
                        </h3>
                        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: colorScheme.accent + '20', color: colorScheme.primary }}>
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
              )}

              {section.type === 'education' && (
                <div className="space-y-4">
                  {section.content?.map((edu: any, index: number) => (
                    <div key={index} className="relative pl-4 border-l-4" style={{ borderColor: colorScheme.accent }}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold" style={{ color: colorScheme.secondary }}>
                          {edu.degree} in {edu.field}
                        </h3>
                        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: colorScheme.accent + '20', color: colorScheme.primary }}>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold" style={{ color: colorScheme.primary }}>
                        {edu.institution}
                      </h4>
                      {edu.gpa && (
                        <p className="text-xs mt-1 px-2 py-1 rounded-full inline-block" style={{ backgroundColor: colorScheme.accent + '20', color: colorScheme.primary }}>
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'skills' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {section.content?.map((skill: string, index: number) => (
                    <div
                      key={index}
                      className="p-3 text-center rounded-lg border-2"
                      style={{
                        backgroundColor: colorScheme.background,
                        borderColor: colorScheme.accent,
                        borderRadius: '8px'
                      }}
                    >
                      <span className="font-semibold text-xs" style={{ color: colorScheme.primary }}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'projects' && (
                <div className="space-y-4">
                  {section.content?.map((project: any, index: number) => (
                    <div key={index} className="relative pl-4 border-l-4" style={{ borderColor: colorScheme.accent }}>
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
              )}

              {section.type === 'certifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {section.content?.map((cert: any, index: number) => (
                    <div key={index} className="p-3 rounded-lg border-2" style={{ backgroundColor: colorScheme.background, borderColor: colorScheme.accent }}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-xs" style={{ color: colorScheme.secondary }}>
                            {cert.name}
                          </h3>
                          <p className="text-xs mt-1">{cert.issuer}</p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded" style={{ backgroundColor: colorScheme.accent + '20', color: colorScheme.primary }}>
                          {cert.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
} 