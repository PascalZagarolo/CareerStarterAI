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
        fontFamily: 'Merriweather, serif',
        fontSize: '10px',
        color: colorScheme.text,
        backgroundColor: colorScheme.background,
        padding: '20mm'
      }}
    >
      {/* Header */}
      <div 
        className="mb-6 pb-3 border-b-2"
        style={{ borderColor: colorScheme.primary }}
      >
        <h1 
          className="text-2xl font-bold mb-2"
          style={{ color: colorScheme.primary }}
        >
          {personalInfo.fullName}
        </h1>
        <p className="text-sm mb-3" style={{ color: colorScheme.secondary }}>
          {sections.find(s => s.type === 'summary')?.content[0].content || 'Executive Summary'}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center">
            <span className="font-semibold mr-2">Email:</span>
            <span>{personalInfo.email}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Phone:</span>
            <span>{personalInfo.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Location:</span>
            <span>{personalInfo.location}</span>
          </div>
          <div className="flex items-center">
            {personalInfo.linkedin && (
              <>
                <Linkedin className="w-3 h-3 mr-1" style={{ color: colorScheme.accent }} />
                <a 
                  href={ensureHttps(personalInfo.linkedin)}
                  className="hover:underline transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: colorScheme.text }}
                >
                  {formatLinkedInLink(personalInfo.linkedin)}
                  <ExternalLink className="w-2 h-2" />
                </a>
              </>
            )}
          </div>
        </div>
        {personalInfo.portfolio && (
          <div className="mt-2 text-xs flex items-center">
            <Globe className="w-3 h-3 mr-1" style={{ color: colorScheme.accent }} />
            <a 
              href={ensureHttps(personalInfo.portfolio)}
              className="hover:underline transition-colors flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: colorScheme.text }}
            >
              {formatPortfolioLink(personalInfo.portfolio)}
              <ExternalLink className="w-2 h-2" />
            </a>
          </div>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="flex h-full">
        {/* Left Column */}
        <div className="w-1/2 pr-4 border-r" style={{ borderColor: colorScheme.border }}>
          {/* Experience */}
          {sections.find(s => s.type === 'experience') && (
            <div className="mb-6">
              <h2 
                className="text-lg font-bold mb-3 pb-1 border-b"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.border
                }}
              >
                {getTranslatedSectionTitle('experience')}
              </h2>
              <div className="space-y-3">
                {(() => {
                  const experienceSection = sections.find(s => s.type === 'experience');
                  if (!experienceSection) return null;
                  const content = experienceSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((exp, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm" style={{ color: colorScheme.secondary }}>
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
                      <ul className="text-xs space-y-1 ml-3">
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
                className="text-lg font-bold mb-3 pb-1 border-b"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.border
                }}
              >
                {getTranslatedSectionTitle('projects')}
              </h2>
              <div className="space-y-3">
                {(() => {
                  const projectsSection = sections.find(s => s.type === 'projects');
                  if (!projectsSection) return null;
                  const content = projectsSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((project, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-bold text-sm mb-1" style={{ color: colorScheme.secondary }}>
                      {project.name}
                    </h3>
                    <p className="text-xs mb-1 leading-relaxed">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded text-xs"
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
        <div className="w-1/2 pl-4">
          {/* Skills */}
          {sections.find(s => s.type === 'skills') && (
            <div className="mb-6">
              <h2 
                className="text-lg font-bold mb-3 pb-1 border-b"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.border
                }}
              >
                {getTranslatedSectionTitle('skills')}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {(() => {
                  const skillsSection = sections.find(s => s.type === 'skills');
                  if (!skillsSection) return null;
                  const content = skillsSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as string[]).map((skill: string, index: number) => (
                  <div
                    key={index}
                    className="p-2 text-center text-xs font-medium"
                    style={{
                      backgroundColor: colorScheme.background,
                      border: `1px solid ${colorScheme.border}`,
                      borderRadius: '3px'
                    }}
                  >
                    {skill}
                  </div>
                ));
                })()}
              </div>
            </div>
          )}

          {/* Education */}
          {sections.find(s => s.type === 'education') && (
            <div className="mb-6">
              <h2 
                className="text-lg font-bold mb-3 pb-1 border-b"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.border
                }}
              >
                {getTranslatedSectionTitle('education')}
              </h2>
              <div className="space-y-3">
                {(() => {
                  const educationSection = sections.find(s => s.type === 'education');
                  if (!educationSection) return null;
                  const content = educationSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm" style={{ color: colorScheme.secondary }}>
                        {edu.degree} in {edu.field}
                      </h3>
                      <span className="text-xs" style={{ color: colorScheme.accent }}>
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="font-semibold text-xs" style={{ color: colorScheme.primary }}>
                      {edu.institution}
                    </p>
                    {edu.gpa && (
                      <p className="text-xs mt-1">GPA: {edu.gpa}</p>
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
                className="text-lg font-bold mb-3 pb-1 border-b"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.border
                }}
              >
                {getTranslatedSectionTitle('certifications')}
              </h2>
              <div className="space-y-2">
                {(() => {
                  const certificationsSection = sections.find(s => s.type === 'certifications');
                  if (!certificationsSection) return null;
                  const content = certificationsSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((cert, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: colorScheme.background, border: `1px solid ${colorScheme.border}` }}>
                    <div>
                      <h3 className="font-bold text-xs" style={{ color: colorScheme.secondary }}>
                        {cert.name}
                      </h3>
                      <p className="text-xs">{cert.issuer}</p>
                    </div>
                    <span className="text-xs" style={{ color: colorScheme.accent }}>
                      {cert.date}
                    </span>
                  </div>
                ));
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 