'use client';

import { ResumeData, ColorScheme } from '../types';
import { formatLinkedInLink, formatPortfolioLink, ensureHttps } from '../utils/link-formatter';
import { useTranslatedSectionTitle } from '../utils/section-title-translator';
import { Linkedin, Globe, ExternalLink } from 'lucide-react';

interface ModernMinimalProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

export default function ModernMinimal({ data, colorScheme }: ModernMinimalProps) {
  const { personalInfo, sections } = data;
  const getTranslatedSectionTitle = useTranslatedSectionTitle;

  return (
    <div 
      className="w-full h-full bg-white"
      style={{ 
        fontFamily: 'Arial, sans-serif',
        fontSize: '10px',
        lineHeight: '1.2',
        color: colorScheme.text,
        backgroundColor: colorScheme.background,
        padding: '12mm'
      }}
    >
      {/* Header */}
      <div className="text-center mb-5 border-b pb-3" style={{ borderColor: colorScheme.border }}>
        {/* Profile Picture */}
        {personalInfo.profilePicture && (
          <div className="flex justify-center mb-3">
            <img
              src={personalInfo.profilePicture}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2"
              style={{ borderColor: colorScheme.primary }}
            />
          </div>
        )}
        
        <h1 
          className="text-2xl font-light mb-2 tracking-wide"
          style={{ color: colorScheme.primary }}
        >
          {personalInfo.fullName}
        </h1>
        <p className="text-sm mb-3" style={{ color: colorScheme.secondary }}>
          {sections.find(s => s.type === 'summary')?.content[0] || getTranslatedSectionTitle('summary')}
        </p>
        <div className="flex justify-center items-center space-x-4 text-xs">
          <div className="flex items-center">
            <span>{personalInfo.email}</span>
          </div>
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colorScheme.accent }}></div>
          <div className="flex items-center">
            <span>{personalInfo.phone}</span>
          </div>
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colorScheme.accent }}></div>
          <div className="flex items-center">
            <span>{personalInfo.location}</span>
          </div>
        </div>
        {(personalInfo.linkedin || personalInfo.portfolio) && (
          <div className="mt-2 flex justify-center items-center space-x-4 text-xs">
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin className="w-2 h-2 mr-1" style={{ color: colorScheme.accent }} />
                <a 
                  href={ensureHttps(personalInfo.linkedin)}
                  className="hover:underline transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: colorScheme.text }}
                >
                  {formatLinkedInLink(personalInfo.linkedin)}
                  <ExternalLink className="w-1 h-1" />
                </a>
              </div>
            )}
            {personalInfo.linkedin && personalInfo.portfolio && (
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colorScheme.accent }}></div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center">
                <Globe className="w-2 h-2 mr-1" style={{ color: colorScheme.accent }} />
                <a 
                  href={ensureHttps(personalInfo.portfolio)}
                  className="hover:underline transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: colorScheme.text }}
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
      <div className="space-y-4">
        {sections
          .filter(section => section.isVisible && section.type !== 'summary')
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <div key={section.id}>
              <h2 
                className="text-sm font-light mb-3 tracking-wide uppercase"
                style={{ color: colorScheme.primary }}
              >
                {getTranslatedSectionTitle(section.type)}
              </h2>
              
              {section.type === 'experience' && (
                <div className="space-y-3">
                  {(() => {
                    const experienceSection = sections.find(s => s.type === 'experience');
                    if (!experienceSection) return null;
                    const content = experienceSection.content;
                    if (!Array.isArray(content)) return null;
                    return (content as any[]).map((exp, index) => (
                    <div key={index} className="border-l-2 pl-3" style={{ borderColor: colorScheme.accent }}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-medium" style={{ color: colorScheme.secondary }}>
                          {exp.position}
                        </h3>
                        <span className="text-xs font-light" style={{ color: colorScheme.accent }}>
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-xs mb-1" style={{ color: colorScheme.primary }}>
                        {exp.company}
                      </p>
                      <p className="mb-1 leading-relaxed text-xs">{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-0.5">
                          {exp.achievements.map((achievement: string, idx: number) => (
                            <li key={idx} className="text-xs leading-relaxed">• {achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ));
                  })()}
                </div>
              )}

              {section.type === 'education' && (
                <div className="space-y-3">
                  {(() => {
                    const educationSection = sections.find(s => s.type === 'education');
                    if (!educationSection) return null;
                    const content = educationSection.content;
                    if (!Array.isArray(content)) return null;
                    return (content as any[]).map((edu, index) => (
                    <div key={index} className="border-l-2 pl-3" style={{ borderColor: colorScheme.accent }}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-medium" style={{ color: colorScheme.secondary }}>
                          {edu.degree} in {edu.field}
                        </h3>
                        <span className="text-xs font-light" style={{ color: colorScheme.accent }}>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: colorScheme.primary }}>
                        {edu.institution}
                      </p>
                      {edu.gpa && (
                        <p className="text-xs mt-0.5">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ));
                  })()}
                </div>
              )}

              {section.type === 'skills' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {(() => {
                    const skillsSection = sections.find(s => s.type === 'skills');
                    if (!skillsSection) return null;
                    const content = skillsSection.content;
                    if (!Array.isArray(content)) return null;
                    return (content as string[]).map((skill: string, index: number) => (
                    <div
                      key={index}
                      className="p-2 text-center"
                      style={{
                        backgroundColor: colorScheme.background,
                        border: `1px solid ${colorScheme.border}`,
                        borderRadius: '4px'
                      }}
                    >
                      <span className="font-medium text-xs" style={{ color: colorScheme.primary }}>
                        {skill}
                      </span>
                    </div>
                  ));
                  })()}
                </div>
              )}

              {section.type === 'projects' && (
                <div className="space-y-3">
                    {(() => {
                        const projectsSection = sections.find(s => s.type === 'projects');
                        if (!projectsSection) return null;
                        const content = projectsSection.content;
                        if (!Array.isArray(content)) return null;
                        return (content as any[]).map((project, index) => (
                    <div key={index} className="border-l-2 pl-3" style={{ borderColor: colorScheme.accent }}>
                      <h3 className="text-sm font-medium mb-1" style={{ color: colorScheme.secondary }}>
                        {project.name}
                      </h3>
                      <p className="mb-1 leading-relaxed text-xs">{project.description}</p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded-full text-xs font-light"
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
                  ));
                  })()}
                </div>
              )}

              {section.type === 'certifications' && (
                <div className="space-y-2"> 
                  {(() => {
                    const certificationsSection = sections.find(s => s.type === 'certifications');
                    if (!certificationsSection) return null;
                    const content = certificationsSection.content;
                    if (!Array.isArray(content)) return null;
                    return (content as any[]).map((cert, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-1" style={{ borderColor: colorScheme.border }}>
                      <div>
                        <h3 className="text-xs font-medium" style={{ color: colorScheme.secondary }}>
                          {cert.name}
                        </h3>
                        <p className="text-xs mt-0.5">{cert.issuer}</p>
                      </div>
                      <span className="text-xs font-light" style={{ color: colorScheme.accent }}>
                        {cert.date}
                      </span>
                    </div>
                  ));
                  })()}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
} 