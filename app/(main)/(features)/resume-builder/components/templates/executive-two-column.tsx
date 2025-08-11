'use client';

import { ResumeData, ColorScheme } from '../types';
import { formatLinkedInLink, formatPortfolioLink, ensureHttps } from '../utils/link-formatter';
import { useTranslatedSectionTitle } from '../utils/section-title-translator';
import { Linkedin, Globe, ExternalLink } from 'lucide-react';

interface ExecutiveTwoColumnProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

export default function ExecutiveTwoColumn({ data, colorScheme }: ExecutiveTwoColumnProps) {
  const { personalInfo, sections } = data;
  const getTranslatedSectionTitle = useTranslatedSectionTitle;

  return (
    <div 
      className="w-full h-full bg-white"
      style={{ 
        fontFamily: 'Georgia, serif',
        fontSize: '9px',
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
        <div className="flex items-start gap-4">
          {/* Profile Picture */}
          {personalInfo.profilePicture && (
            <div className="flex-shrink-0">
              <img
                src={personalInfo.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2"
                style={{ borderColor: colorScheme.primary }}
              />
            </div>
          )}
          
          {/* Personal Info */}
          <div className="flex-1">
            <h1 
              className="text-xl font-bold mb-1"
              style={{ color: colorScheme.primary }}
            >
              {personalInfo.fullName}
            </h1>
        <p className="text-xs mb-2" style={{ color: colorScheme.secondary }}>
          {sections.find(s => s.type === 'summary')?.content[0].content || 'Executive Summary'}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
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
          <div className="flex items-center">
            {personalInfo.linkedin && (
              <>
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
              </>
            )}
          </div>
        </div>
        {personalInfo.portfolio && (
          <div className="mt-1 text-xs flex items-center">
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
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex h-full">
        {/* Left Column */}
        <div className="w-1/2 pr-3 border-r" style={{ borderColor: colorScheme.border }}>
          {/* Experience */}
          {sections.find(s => s.type === 'experience') && (
            <div className="mb-4">
              <h2 
                className="text-sm font-bold mb-2 pb-1 border-b"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.border
                }}
              >
                {getTranslatedSectionTitle('experience')}
              </h2>
              <div className="space-y-2">
                {(() => {
                  const experienceSection = sections.find(s => s.type === 'experience');
                  if (!experienceSection) return null;
                  const content = experienceSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((exp, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-xs" style={{ color: colorScheme.secondary }}>
                        {exp.position}
                      </h3> 
                      <span className="text-xs" style={{ color: colorScheme.accent }}>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <h4 className="font-semibold mb-1 text-xs" style={{ color: colorScheme.primary }}>
                      {exp.company}
                    </h4>
                    <p className="text-xs mb-1 leading-relaxed">{exp.description}</p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="text-xs space-y-0.5 ml-2">
                        {exp.achievements.map((achievement: string, idx: number) => (
                          <li key={idx} className="list-disc">{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ));
                })()}
              </div>
            </div>
          )}

          {/* Projects */}
          {sections.find(s => s.type === 'projects') && (
            <div>
              <h2 
                className="text-sm font-bold mb-2 pb-1 border-b"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.border
                }}
              >
                {getTranslatedSectionTitle('projects')}
              </h2>
              <div className="space-y-2">
                {(() => {
                  const projectsSection = sections.find(s => s.type === 'projects');
                  if (!projectsSection) return null;
                  const content = projectsSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((project, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-xs" style={{ color: colorScheme.secondary }}>
                        {project.name}
                      </h3>
                      <div className="flex gap-2 text-xs">
                        {project.githubLink && (
                          <a 
                            href={ensureHttps(project.githubLink)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                            style={{ color: colorScheme.accent }}
                          >
                            GitHub
                            <ExternalLink className="w-1 h-1" />
                          </a>
                        )}
                        {project.liveLink && (
                          <a 
                            href={ensureHttps(project.liveLink)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                            style={{ color: colorScheme.accent }}
                          >
                            Live
                            <ExternalLink className="w-1 h-1" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs mb-1 leading-relaxed">{project.description}</p>
                    {project.bulletPoints && project.bulletPoints.length > 0 && (
                      <ul className="text-xs space-y-0.5 ml-2 mb-1">
                        {project.bulletPoints.map((bullet: string, idx: number) => (
                          <li key={idx} className="list-disc">{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
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
                ));
                })()}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-1/2 pl-3">
          {/* Skills */}
          {sections.find(s => s.type === 'skills') && (
            <div className="mb-4">
              <h2 
                className="text-sm font-bold mb-2 pb-1 border-b"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.border
                }}
              >
                {getTranslatedSectionTitle('skills')}
              </h2>
              <div className="flex flex-wrap gap-1">
                {(() => {
                  const skillsSection = sections.find(s => s.type === 'skills');
                  if (!skillsSection) return null;
                  const content = skillsSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as string[]).map((skill: string, index: number) => (
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
                  ));
                })()}
              </div>
            </div>
          )}

          {/* Education */}
          {sections.find(s => s.type === 'education') && (
            <div className="mb-4">
              <h2 
                className="text-sm font-bold mb-2 pb-1 border-b"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.border
                }}
              >
                {getTranslatedSectionTitle('education')}
              </h2>
              <div className="space-y-2">
                {(() => {
                  const educationSection = sections.find(s => s.type === 'education');
                  if (!educationSection) return null;
                  const content = educationSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((edu, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-xs" style={{ color: colorScheme.secondary }}>
                          {edu.degree} in {edu.field}
                        </h3>
                        <span className="text-xs" style={{ color: colorScheme.accent }}>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      <h4 className="font-semibold text-xs" style={{ color: colorScheme.primary }}>
                        {edu.institution}
                      </h4>
                      {edu.gpa && (
                        <p className="text-xs mt-0.5">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          {/* Certifications */}
          {sections.find(s => s.type === 'certifications') && (
            <div>
              <h2 
                className="text-sm font-bold mb-2 pb-1 border-b"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.border
                }}
              >
                {getTranslatedSectionTitle('certifications')}
              </h2>
              <div className="space-y-1">
                {(() => {
                  const certificationsSection = sections.find(s => s.type === 'certifications');
                  if (!certificationsSection) return null;
                  const content = certificationsSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((cert, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-1" style={{ borderColor: colorScheme.border }}>
                      <div>
                        <h3 className="text-xs font-semibold" style={{ color: colorScheme.secondary }}>
                          {cert.name}
                        </h3>
                        <p className="text-xs mt-0.5">{cert.issuer}</p>
                      </div>
                      <span className="text-xs" style={{ color: colorScheme.accent }}>
                        {cert.date}
                      </span>
                    </div>
                  ));
                })()}

                {/* Custom Fields */}
                {(() => {
                  const certificationsSection = sections.find(s => s.type === 'certifications');
                  if (!certificationsSection?.customFields || certificationsSection.customFields.length === 0) return null;
                  
                  return (
                    <div className="space-y-2 mt-3 pt-3 border-t" style={{ borderColor: colorScheme.border }}>
                      {certificationsSection.customFields
                        .filter(field => field.isVisible && field.value.trim())
                        .sort((a, b) => a.order - b.order)
                        .map((field) => (
                          <div key={field.id} className="space-y-1">
                            <h4 className="text-xs font-semibold" style={{ color: colorScheme.secondary }}>
                              {field.label}
                            </h4>
                            <div className="text-xs">
                              {field.type === 'list' ? (
                                <div className="flex flex-wrap gap-1">
                                  {field.value.split(',').map((item, idx) => (
                                    <span
                                      key={idx}
                                      className="px-1.5 py-0.5 rounded text-xs font-medium"
                                      style={{
                                        backgroundColor: colorScheme.accent + '20',
                                        color: colorScheme.primary,
                                        border: `1px solid ${colorScheme.border}`
                                      }}
                                    >
                                      {item.trim()}
                                    </span>
                                  ))}
                                </div>
                              ) : field.type === 'url' ? (
                                <a 
                                  href={field.value.startsWith('http') ? field.value : `https://${field.value}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline transition-colors flex items-center gap-1"
                                  style={{ color: colorScheme.accent }}
                                >
                                  {field.value}
                                  <ExternalLink className="w-1 h-1" />
                                </a>
                              ) : (
                                <p>{field.value}</p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 