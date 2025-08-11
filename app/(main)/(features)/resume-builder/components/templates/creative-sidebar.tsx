'use client';

import { ResumeData, ColorScheme } from '../types';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from 'lucide-react';
import { formatLinkedInLink, formatPortfolioLink, ensureHttps } from '../utils/link-formatter';
import { useTranslatedSectionTitle } from '../utils/section-title-translator';
import { useSectionHover } from '../utils/use-section-hover';
import { useLanguage } from '../i18n/language-context';

interface CreativeSidebarProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

export default function CreativeSidebar({ data, colorScheme }: CreativeSidebarProps) {
  const { personalInfo, sections } = data;
  const getTranslatedSectionTitle = useTranslatedSectionTitle;
  const { hoveredSection, handleSectionHover, getSectionInfo } = useSectionHover();
  const { language } = useLanguage();

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
          {/* Profile Picture */}
          {personalInfo.profilePicture && (
            <div className="flex justify-center mb-3">
              <img
                src={personalInfo.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 shadow-lg"
                style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
              />
            </div>
          )}
          
          <div className="text-white px-1">
            <h1 className="text-2xl font-extrabold mb-3 tracking-tight drop-shadow-lg text-white">
              {personalInfo.fullName}
            </h1>
            {(() => {
              const summarySection = sections.find(s => s.type === 'summary');
              const summaryContent = summarySection && Array.isArray(summarySection.content) ? summarySection.content[0] : '';
              if (typeof summaryContent === 'string' && summaryContent.trim().length > 0) {
                return (
                  <p className="text-xs mb-4 opacity-95 leading-relaxed px-1 text-white">
                    {summaryContent}
                  </p>
                );
              }
              return null;
            })()}
          </div>
          {/* Contact Info */}
          <div className="mb-4 px-1">
            <h2 className="text-sm font-bold mb-2 text-white tracking-wide">{language === 'de' ? 'Kontakt' : 'Contact'}</h2>
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
          {(() => {
            const skillsSection = sections.find(s => s.type === 'skills');
            if (!skillsSection) return null;
            const content = skillsSection.content as string[];
            if (!Array.isArray(content) || content.length === 0 || content.every((s) => typeof s !== 'string' || !s.trim())) return null;
            const isHovered = hoveredSection === skillsSection?.id;
            const sectionInfo = getSectionInfo('skills');
            const IconComponent = sectionInfo.icon;
            return (
              <div 
                className="mb-4 px-1 relative group cursor-pointer transition-all duration-300 ease-in-out"
                onMouseEnter={() => handleSectionHover(skillsSection?.id || null)}
                onMouseLeave={() => handleSectionHover(null)}
              >
                {/* Hover effect overlay for sidebar */}
                {isHovered && (
                  <div className="absolute inset-0 bg-white/10 border border-white/30 rounded-lg pointer-events-none z-10 transition-all duration-300">
                    {/* Section indicator */}
                    <div className="absolute top-2 right-2 bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-medium shadow-lg pointer-events-none z-20 flex items-center gap-1">
                      <IconComponent className="w-3 h-3" />
                      {sectionInfo.description}
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-lg pointer-events-none"></div>
                  </div>
                )}
                <h2 className="text-sm font-bold mb-2 text-white tracking-wide relative z-20">{getTranslatedSectionTitle('skills')}</h2>
                <div className="flex flex-wrap gap-1 relative z-20">
                  {(content as string[]).map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 rounded-full bg-white/25 text-xs font-medium border border-white/40 shadow-sm text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}
          {/* Education */}
          {sections.find(s => s.type === 'education') && (() => {
            const educationSection = sections.find(s => s.type === 'education');
            const isHovered = hoveredSection === educationSection?.id;
            const sectionInfo = getSectionInfo('education');
            const IconComponent = sectionInfo.icon;
            
            return (
              <div 
                className="px-1 relative group cursor-pointer transition-all duration-300 ease-in-out"
                onMouseEnter={() => handleSectionHover(educationSection?.id || null)}
                onMouseLeave={() => handleSectionHover(null)}
              >
                {/* Hover effect overlay for sidebar */}
                {isHovered && (
                  <div className="absolute inset-0 bg-white/10 border border-white/30 rounded-lg pointer-events-none z-10 transition-all duration-300">
                    {/* Section indicator */}
                    <div className="absolute top-2 right-2 bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-medium shadow-lg pointer-events-none z-20 flex items-center gap-1">
                      <IconComponent className="w-3 h-3" />
                      {sectionInfo.description}
                    </div>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-lg pointer-events-none"></div>
                  </div>
                )}
                
                <h2 className="text-sm font-bold mb-2 text-white tracking-wide relative z-20">{getTranslatedSectionTitle('education')}</h2>
                <div className="space-y-2 relative z-20">
                  {(() => {
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
            );
          })()}
        </div>
        {/* Main Content */}
        <div className="w-2/3 p-6 bg-white flex flex-col gap-5">
          {/* Experience */}
          {sections.find(s => s.type === 'experience') && (() => {
            const experienceSection = sections.find(s => s.type === 'experience');
            const isHovered = hoveredSection === experienceSection?.id;
            const sectionInfo = getSectionInfo('experience');
            const IconComponent = sectionInfo.icon;
            
            return (
              <div 
                className="mb-4 relative group cursor-pointer transition-all duration-300 ease-in-out"
                onMouseEnter={() => handleSectionHover(experienceSection?.id || null)}
                onMouseLeave={() => handleSectionHover(null)}
              >
                {/* Hover effect overlay */}
                {isHovered && (
                  <div className="absolute inset-0 bg-blue-500/5 border border-blue-300/30 rounded-lg pointer-events-none z-10 transition-all duration-300">
                    {/* Section indicator */}
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg pointer-events-none z-20 flex items-center gap-1">
                      <IconComponent className="w-3 h-3" />
                      {sectionInfo.description}
                    </div>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-lg pointer-events-none"></div>
                  </div>
                )}
                
                <h2 
                  className="text-lg font-bold mb-3 pb-1 border-b-2 tracking-tight relative z-20"
                  style={{ 
                    color: colorScheme.primary,
                    borderColor: colorScheme.accent
                  }}
                >
                  {getTranslatedSectionTitle('experience')}
                </h2>
                <div className="space-y-4 relative z-20">
                  {(() => {
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
                          <ul className="space-y-0.5 mb-1 list-disc list-inside">
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
            );
          })()}
          {/* Projects */}
          {sections.find(s => s.type === 'projects') && (() => {
            const projectsSection = sections.find(s => s.type === 'projects');
            const isHovered = hoveredSection === projectsSection?.id;
            const sectionInfo = getSectionInfo('projects');
            const IconComponent = sectionInfo.icon;
            
            return (
              <div 
                className="mb-4 relative group cursor-pointer transition-all duration-300 ease-in-out"
                onMouseEnter={() => handleSectionHover(projectsSection?.id || null)}
                onMouseLeave={() => handleSectionHover(null)}
              >
                {/* Hover effect overlay */}
                {isHovered && (
                  <div className="absolute inset-0 bg-blue-500/5 border border-blue-300/30 rounded-lg pointer-events-none z-10 transition-all duration-300">
                    {/* Section indicator */}
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg pointer-events-none z-20 flex items-center gap-1">
                      <IconComponent className="w-3 h-3" />
                      {sectionInfo.description}
                    </div>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-lg pointer-events-none"></div>
                  </div>
                )}
                
                <h2 
                  className="text-lg font-bold mb-3 pb-1 border-b-2 tracking-tight relative z-20"
                  style={{ 
                    color: colorScheme.primary,
                    borderColor: colorScheme.accent
                  }}
                >
                  {getTranslatedSectionTitle('projects')}
                </h2>
                <div className="space-y-4 relative z-20">
                  {(() => {
                    if (!projectsSection) return null;
                    const content = projectsSection.content;
                    if (!Array.isArray(content)) return null;
                    return (content as any[]).map((project, index) => (
                      <div key={index} className="border-l-2 pl-4 bg-gray-50 rounded-lg shadow-sm py-3" style={{ borderColor: colorScheme.accent }}>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-sm font-bold" style={{ color: colorScheme.secondary }}>
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
                        <p className="mb-1 leading-relaxed text-xs" style={{ color: colorScheme.text }}>
                          {project.description}
                        </p>
                        {project.bulletPoints && project.bulletPoints.length > 0 && (
                          <ul className="space-y-0.5 mb-1 list-disc list-inside">
                            {project.bulletPoints.map((bullet: string, idx: number) => (
                              <li key={idx} className="text-xs" style={{ color: colorScheme.text }}>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                        {project.technologies && project.technologies.length > 0 && (
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
            );
          })()}
          {/* Certifications */}
          {sections.find(s => s.type === 'certifications') && (() => {
            const certificationsSection = sections.find(s => s.type === 'certifications');
            const isHovered = hoveredSection === certificationsSection?.id;
            const sectionInfo = getSectionInfo('certifications');
            const IconComponent = sectionInfo.icon;
            
            return (
              <div 
                className="relative group cursor-pointer transition-all duration-300 ease-in-out"
                onMouseEnter={() => handleSectionHover(certificationsSection?.id || null)}
                onMouseLeave={() => handleSectionHover(null)}
              >
                {/* Hover effect overlay */}
                {isHovered && (
                  <div className="absolute inset-0 bg-blue-500/5 border border-blue-300/30 rounded-lg pointer-events-none z-10 transition-all duration-300">
                    {/* Section indicator */}
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg pointer-events-none z-20 flex items-center gap-1">
                      <IconComponent className="w-3 h-3" />
                      {sectionInfo.description}
                    </div>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-lg pointer-events-none"></div>
                  </div>
                )}
                
                <h2 
                  className="text-lg font-bold mb-3 pb-1 border-b-2 tracking-tight relative z-20"
                  style={{ 
                    color: colorScheme.primary,
                    borderColor: colorScheme.accent
                  }}
                >
                  {getTranslatedSectionTitle('certifications')}
                </h2>
                <div className="space-y-2 relative z-20">
                  {(() => {
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

                  {/* Custom Fields */}
                  {certificationsSection?.customFields && certificationsSection.customFields.length > 0 && (
                    <div className="space-y-2 mt-3 pt-3 border-t" style={{ borderColor: colorScheme.border }}>
                      {certificationsSection.customFields
                        .filter(field => field.isVisible && field.value.trim())
                        .sort((a, b) => a.order - b.order)
                        .map((field) => (
                          <div key={field.id} className="space-y-1">
                            <h4 className="text-xs font-bold" style={{ color: colorScheme.secondary }}>
                              {field.label}
                            </h4>
                            <div className="text-xs">
                              {field.type === 'list' ? (
                                <div className="flex flex-wrap gap-1">
                                  {field.value.split(',').map((item, idx) => (
                                    <span
                                      key={idx}
                                      className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-white border border-gray-200"
                                      style={{ color: colorScheme.primary }}
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
                                <p className="leading-relaxed">{field.value}</p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
} 