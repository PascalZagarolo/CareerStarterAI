'use client';

import { ResumeData, ColorScheme, Experience, Education, Project, Certification } from '../types';
import { formatLinkedInLink, formatPortfolioLink, ensureHttps } from '../utils/link-formatter';
import { useTranslatedSectionTitle } from '../utils/section-title-translator';
import { Linkedin, Globe, ExternalLink } from 'lucide-react';

interface ProfessionalClassicProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

export default function ProfessionalClassic({ data, colorScheme }: ProfessionalClassicProps) {
  const { personalInfo, sections } = data;
  const getTranslatedSectionTitle = useTranslatedSectionTitle;

  return (
    <div 
      className="w-full h-full bg-white"
      style={{ 
        fontFamily: 'Times New Roman, serif',
        fontSize: '10px',
        lineHeight: '1.2',
        color: colorScheme.text,
        backgroundColor: colorScheme.background,
        padding: '12mm'
      }}
    >
      {/* Header */}
      <div 
        className="mb-4 pb-2 border-b"
        style={{ borderColor: colorScheme.primary }}
      >
        <h1 
          className="text-xl font-bold mb-1"
          style={{ color: colorScheme.primary }}
        >
          {personalInfo.fullName}
        </h1>
        <p className="text-xs mb-2" style={{ color: colorScheme.secondary }}>
          {sections.find(s => s.type === 'summary')?.content[0] || getTranslatedSectionTitle('summary')}
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center">
            <span className="font-semibold mr-1">Email:</span>
            <span>{personalInfo.email}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-1">Phone:</span>
            <span>{personalInfo.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-1">Location:</span>
            <span>{personalInfo.location}</span>
          </div>
        </div>
        {(personalInfo.linkedin || personalInfo.portfolio) && (
          <div className="mt-1 flex gap-3 text-xs">
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
      <div className="space-y-3">
        {sections
          .filter(section => section.isVisible && section.type !== 'summary')
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <div key={section.id} className="mb-3">
              <h2 
                className="text-sm font-bold mb-2 pb-1 border-b"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.border
                }}
              >
                {getTranslatedSectionTitle(section.type)}
              </h2>
              
              {section.type === 'experience' && (
                <div className="space-y-2">
                  {(section.content as Experience[])?.map((exp, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-xs" style={{ color: colorScheme.secondary }}>
                          {exp.position}
                        </h3>
                        <span className="text-xs" style={{ color: colorScheme.accent }}>
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="font-medium mb-1 text-xs" style={{ color: colorScheme.primary }}>
                        {exp.company}
                      </p>
                      <p className="mb-1 text-xs">{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="list-disc list-inside space-y-0.5 ml-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-xs">{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'education' && (
                <div className="space-y-2">
                  {(section.content as Education[])?.map((edu, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-xs" style={{ color: colorScheme.secondary }}>
                          {edu.degree} in {edu.field}
                        </h3>
                        <span className="text-xs" style={{ color: colorScheme.accent }}>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      <p className="font-medium text-xs" style={{ color: colorScheme.primary }}>
                        {edu.institution}
                      </p>
                      {edu.gpa && (
                        <p className="text-xs mt-0.5">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'skills' && (
                <div className="flex flex-wrap gap-1">
                  {(section.content as string[])?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: colorScheme.accent + '20',
                        color: colorScheme.primary,
                        border: `1px solid ${colorScheme.border}`
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {section.type === 'projects' && (
                <div className="space-y-2">
                  {(section.content as Project[])?.map((project, index) => (
                    <div key={index} className="mb-2">
                      <h3 className="font-semibold text-xs mb-1" style={{ color: colorScheme.secondary }}>
                        {project.name}
                      </h3>
                      <p className="mb-1 text-xs">{project.description}</p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded text-xs"
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
                <div className="space-y-1">
                  {(section.content as Certification[])?.map((cert, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-xs" style={{ color: colorScheme.secondary }}>
                          {cert.name}
                        </h3>
                        <p className="text-xs">{cert.issuer}</p>
                      </div>
                      <span className="text-xs" style={{ color: colorScheme.accent }}>
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