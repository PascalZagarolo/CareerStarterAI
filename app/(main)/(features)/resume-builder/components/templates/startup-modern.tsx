'use client';

import { ResumeData, ColorScheme, Project, Certification, Experience, Education } from '../types';
import { formatLinkedInLink, formatPortfolioLink, ensureHttps } from '../utils/link-formatter';
import { useTranslatedSectionTitle } from '../utils/section-title-translator';
import { Linkedin, Globe, ExternalLink } from 'lucide-react';

interface StartupModernProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

export default function StartupModern({ data, colorScheme }: StartupModernProps) {
  const { personalInfo, sections } = data;
  const getTranslatedSectionTitle = useTranslatedSectionTitle;

  return (
    <div 
      className="w-full h-full bg-white"
      style={{ 
        fontFamily: 'Segoe UI, sans-serif',
        fontSize: '10px',
        lineHeight: '1.2',
        color: colorScheme.text,
        backgroundColor: colorScheme.background
      }}
    >
      {/* Header */}
      <div 
        className="p-4 text-center"
        style={{ backgroundColor: colorScheme.primary }}
      >
        {/* Profile Picture */}
        {personalInfo.profilePicture && (
          <div className="flex justify-center mb-3">
            <img
              src={personalInfo.profilePicture}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 shadow-lg"
              style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
            />
          </div>
        )}
        
        <h1 
          className="text-2xl font-bold mb-1 text-white"
        >
          {personalInfo.fullName}
        </h1>
        <p className="text-sm mb-3 text-white opacity-90">
          {sections.find(s => s.type === 'summary')?.content[0].content || getTranslatedSectionTitle('summary')}
        </p>
        <div className="flex justify-center items-center space-x-3 text-white opacity-80 text-xs">
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
          <div className="mt-2 flex justify-center items-center space-x-3 text-white opacity-80 text-xs">
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin className="w-2 h-2 mr-1" />
                <a 
                  href={ensureHttps(personalInfo.linkedin)}
                  className="hover:underline transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formatLinkedInLink(personalInfo.linkedin)}
                  <ExternalLink className="w-1 h-1" />
                </a>
              </div>
            )}
            {personalInfo.linkedin && personalInfo.portfolio && (
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center">
                <Globe className="w-2 h-2 mr-1" />
                <a 
                  href={ensureHttps(personalInfo.portfolio)}
                  className="hover:underline transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formatPortfolioLink(personalInfo.portfolio)}
                  <ExternalLink className="w-1 h-1" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {sections
          .filter(section => section.isVisible && section.type !== 'summary')
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <div key={section.id}>
              <h2 
                className="text-sm font-bold mb-3 pb-1 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent
                }}
              >
                {getTranslatedSectionTitle(section.type)}
              </h2>
              
              {section.type === 'experience' && (
                <div className="space-y-3">
                  {(section.content as Experience[])?.map((exp, index) => (
                    <div key={index} className="relative pl-3 border-l-2" style={{ borderColor: colorScheme.accent }}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-bold" style={{ color: colorScheme.secondary } as React.CSSProperties}>
                          {exp.position}
                        </h3>
                        <span className="text-xs font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: colorScheme.accent + '20', color: colorScheme.primary }}>
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold mb-1" style={{ color: colorScheme.primary }}>
                        {exp.company}
                      </h4>
                      <p className="mb-1 leading-relaxed text-xs">{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-0.5">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-xs flex items-start">
                              <span 
                                className="mr-1 mt-1 w-1 h-1 rounded-full flex-shrink-0"
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
                <div className="space-y-3">
                  {(section.content as Education[])?.map((edu, index) => (
                    <div key={index} className="relative pl-3 border-l-2" style={{ borderColor: colorScheme.accent }}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-bold" style={{ color: colorScheme.secondary } as React.CSSProperties}>
                          {edu.degree} in {edu.field}
                        </h3>
                        <span className="text-xs font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: colorScheme.accent + '20', color: colorScheme.primary }}>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold" style={{ color: colorScheme.primary }}>
                        {edu.institution}
                      </h4>
                      {edu.gpa && (
                        <p className="text-xs mt-0.5 px-1.5 py-0.5 rounded-full inline-block" style={{ backgroundColor: colorScheme.accent + '20', color: colorScheme.primary }}>
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'skills' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {(section.content as string[])?.map((skill, index) => (
                    <div
                      key={index}
                      className="p-2 text-center rounded-lg border-2"
                      style={{
                        backgroundColor: colorScheme.background,
                        borderColor: colorScheme.accent,
                        borderRadius: '6px'
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
                <div className="space-y-3">
                  {(section.content as Project[])?.map((project, index) => (
                    <div key={index} className="relative pl-3 border-l-2" style={{ borderColor: colorScheme.accent }}>
                      <h3 className="text-sm font-bold mb-1" style={{ color: colorScheme.secondary } as React.CSSProperties}>
                        {project.name}
                      </h3>
                      <p className="mb-1 leading-relaxed text-xs">{project.description}</p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: colorScheme.accent + '20',
                                color: colorScheme.primary
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
                <div className="space-y-2">
                  {(section.content as Certification[])?.map((cert, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-1" style={{ borderColor: colorScheme.border }}>
                      <div>
                        <h3 className="text-xs font-semibold" style={{ color: colorScheme.secondary }}>
                          {cert.name}
                        </h3>
                        <p className="text-xs mt-0.5">{cert.issuer}</p>
                      </div>
                      <span className="text-xs font-medium" style={{ color: colorScheme.accent }}>
                        {cert.date}
                      </span>
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