'use client';

import { ResumeData, ColorScheme } from '../types';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from 'lucide-react';
import { formatLinkedInLink, formatPortfolioLink, ensureHttps } from '../utils/link-formatter';
import { useTranslatedSectionTitle } from '../utils/section-title-translator';

interface CreativeSidebarProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

export default function CreativeSidebar({ data, colorScheme }: CreativeSidebarProps) {
  const { personalInfo, sections } = data;
  const getTranslatedSectionTitle = useTranslatedSectionTitle;

  return (
    <div 
      className="w-full h-full bg-white shadow-lg rounded-lg overflow-hidden"
      style={{ 
        fontFamily: 'Calibri, sans-serif',
        fontSize: '10px',
        lineHeight: '1.2',
        color: colorScheme.text,
        backgroundColor: colorScheme.background
      }}
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <div 
          className="w-1/3 p-5 flex flex-col gap-5"
          style={{ background: `linear-gradient(135deg, ${colorScheme.primary} 80%, ${colorScheme.accent} 100%)` }}
        >
          <div className="text-white px-1">
            <h1 className="text-2xl font-extrabold mb-3 tracking-tight drop-shadow-lg text-white">
              {personalInfo.fullName}
            </h1>
            <p className="text-xs mb-4 opacity-95 leading-relaxed px-1 text-white">
              {sections.find(s => s.type === 'summary')?.content[0] || getTranslatedSectionTitle('summary')}
            </p>
          </div>
          {/* Contact Info */}
          <div className="mb-4 px-1">
            <h2 className="text-sm font-bold mb-2 text-white tracking-wide">Contact</h2>
                          <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-white/90" />
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-white font-medium opacity-95 text-xs break-all hover:underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-white/90" />
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="text-white font-medium opacity-95 text-xs hover:underline transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-white/90" />
                  <span className="text-white font-medium opacity-95 text-xs">{personalInfo.location}</span>
                </div>
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-3 h-3 text-white/90" />
                    <a 
                      href={ensureHttps(personalInfo.linkedin)}
                      className="text-white font-medium opacity-95 text-xs break-all hover:underline transition-colors flex items-center gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {formatLinkedInLink(personalInfo.linkedin)}
                      <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>
                )}
                {personalInfo.portfolio && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3 text-white/90" />
                    <a 
                      href={ensureHttps(personalInfo.portfolio)}
                      className="text-white font-medium opacity-95 text-xs break-all hover:underline transition-colors flex items-center gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {formatPortfolioLink(personalInfo.portfolio)}
                      <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>
                )}
              </div>
          </div>
          {/* Skills */}
          {sections.find(s => s.type === 'skills') && (
            <div className="mb-4 px-1">
              <h2 className="text-sm font-bold mb-2 text-white tracking-wide">{getTranslatedSectionTitle('skills')}</h2>
              <div className="flex flex-wrap gap-1">
                {(() => {
                  const skillsSection = sections.find(s => s.type === 'skills');
                  if (!skillsSection) return null;
                  const content = skillsSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as string[]).map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 rounded-full bg-white/25 text-xs font-medium border border-white/40 shadow-sm text-white"
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
            <div className="px-1">
              <h2 className="text-sm font-bold mb-2 text-white tracking-wide">{getTranslatedSectionTitle('education')}</h2>
              <div className="space-y-2">
                {(() => {
                  const educationSection = sections.find(s => s.type === 'education');
                  if (!educationSection) return null;
                  const content = educationSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((edu, index) => (
                    <div key={index} className="mb-1">
                      <h3 className="font-bold text-white text-xs">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-xs opacity-95 text-white">{edu.institution}</p>
                      <p className="text-xs opacity-90 text-white">{edu.startDate} - {edu.endDate}</p>
                      {edu.gpa && (
                        <p className="text-xs opacity-90 text-white">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}
        </div>
        {/* Main Content */}
        <div className="w-2/3 p-6 bg-white flex flex-col gap-5">
          {/* Experience */}
          {sections.find(s => s.type === 'experience') && (
            <div className="mb-4">
              <h2 
                className="text-lg font-bold mb-3 pb-1 border-b-2 tracking-tight"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent
                }}
              >
                {getTranslatedSectionTitle('experience')}
              </h2>
              <div className="space-y-4">
                {(() => {
                  const experienceSection = sections.find(s => s.type === 'experience');
                  if (!experienceSection) return null;
                  const content = experienceSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((exp, index) => (
                    <div key={index} className="border-l-2 pl-4 bg-gray-50 rounded-lg shadow-sm py-3" style={{ borderColor: colorScheme.accent }}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-bold" style={{ color: colorScheme.secondary }}>
                          {exp.position}
                        </h3>
                        <span className="text-xs font-medium" style={{ color: colorScheme.accent }}>
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold mb-1" style={{ color: colorScheme.primary }}>
                        {exp.company}
                      </h4>
                      <p className="mb-1 leading-relaxed text-xs" style={{ color: colorScheme.text }}>
                        {exp.description}
                      </p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-0.5 list-disc list-inside">
                          {exp.achievements.map((achievement: string, idx: number) => (
                            <li key={idx} className="text-xs" style={{ color: colorScheme.text }}>
                              {achievement}
                            </li>
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
            <div className="mb-4">
              <h2 
                className="text-lg font-bold mb-3 pb-1 border-b-2 tracking-tight"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent
                }}
              >
                {getTranslatedSectionTitle('projects')}
              </h2>
              <div className="space-y-4">
                {(() => {
                  const projectsSection = sections.find(s => s.type === 'projects');
                  if (!projectsSection) return null;
                  const content = projectsSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((project, index) => (
                    <div key={index} className="border-l-2 pl-4 bg-gray-50 rounded-lg shadow-sm py-3" style={{ borderColor: colorScheme.accent }}>
                      <h3 className="text-sm font-bold mb-1" style={{ color: colorScheme.secondary }}>
                        {project.name}
                      </h3>
                      <p className="mb-1 leading-relaxed text-xs" style={{ color: colorScheme.text }}>
                        {project.description}
                      </p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-white border border-gray-200"
                              style={{ color: colorScheme.primary }}
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
          {/* Certifications */}
          {sections.find(s => s.type === 'certifications') && (
            <div>
              <h2 
                className="text-lg font-bold mb-3 pb-1 border-b-2 tracking-tight"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent
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
                    <div key={index} className="flex justify-between items-center border-b pb-1" style={{ borderColor: colorScheme.border }}>
                      <div>
                        <h3 className="text-xs font-bold" style={{ color: colorScheme.secondary }}>
                          {cert.name}
                        </h3>
                        <p className="text-xs mt-0.5">{cert.issuer}</p>
                      </div>
                      <span className="text-xs font-medium" style={{ color: colorScheme.accent }}>
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