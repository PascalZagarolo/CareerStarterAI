'use client';

import { ResumeData, ColorScheme } from '../types';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from 'lucide-react';

interface CreativeSidebarProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

export default function CreativeSidebar({ data, colorScheme }: CreativeSidebarProps) {
  const { personalInfo, sections } = data;

  return (
    <div 
      className="w-full h-full bg-white shadow-lg rounded-lg overflow-hidden"
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
          className="w-1/3 p-8 flex flex-col gap-8"
          style={{ background: `linear-gradient(135deg, ${colorScheme.primary} 80%, ${colorScheme.accent} 100%)` }}
        >
          <div className="text-white px-2">
            <h1 className="text-3xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
              {personalInfo.fullName}
            </h1>
            <p className="text-base mb-6 opacity-90 leading-relaxed px-1">
              {sections.find(s => s.type === 'summary')?.content[0] || 'Professional Summary'}
            </p>
          </div>
          {/* Contact Info */}
          <div className="mb-6 px-2">
            <h2 className="text-lg font-bold mb-3 text-white tracking-wide">Contact</h2>
                          <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white/80" />
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-white font-bold opacity-90 text-xs break-all hover:underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-white/80" />
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="text-white font-bold opacity-90 text-xs hover:underline transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-white/80" />
                  <span className="text-white font-bold opacity-90 text-xs">{personalInfo.location}</span>
                </div>
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-white/80" />
                    <a 
                      href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                      className="text-white font-bold opacity-90 text-xs break-all hover:underline transition-colors flex items-center gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {personalInfo.linkedin}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                {personalInfo.portfolio && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-white/80" />
                    <a 
                      href={personalInfo.portfolio.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`}
                      className="text-white font-bold opacity-90 text-xs break-all hover:underline transition-colors flex items-center gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {personalInfo.portfolio}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
          </div>
          {/* Skills */}
          {sections.find(s => s.type === 'skills') && (
            <div className="mb-6 px-2">
              <h2 className="text-lg font-bold mb-3 text-white tracking-wide">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const skillsSection = sections.find(s => s.type === 'skills');
                  if (!skillsSection) return null;
                  const content = skillsSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as string[]).map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold border border-white/30 shadow-sm"
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
            <div className="px-2">
              <h2 className="text-lg font-bold mb-3 text-white tracking-wide">Education</h2>
              <div className="space-y-3">
                {(() => {
                  const educationSection = sections.find(s => s.type === 'education');
                  if (!educationSection) return null;
                  const content = educationSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((edu, index) => (
                    <div key={index} className="mb-2">
                      <h3 className="font-bold text-white text-sm">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-xs opacity-90">{edu.institution}</p>
                      <p className="text-xs opacity-75">{edu.startDate} - {edu.endDate}</p>
                      {edu.gpa && (
                        <p className="text-xs opacity-75">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}
        </div>
        {/* Main Content */}
        <div className="w-2/3 p-10 bg-white flex flex-col gap-8">
          {/* Experience */}
          {sections.find(s => s.type === 'experience') && (
            <div className="mb-6">
              <h2 
                className="text-2xl font-extrabold mb-4 pb-2 border-b-2 tracking-tight"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent
                }}
              >
                Professional Experience
              </h2>
              <div className="space-y-6">
                {(() => {
                  const experienceSection = sections.find(s => s.type === 'experience');
                  if (!experienceSection) return null;
                  const content = experienceSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((exp, index) => (
                    <div key={index} className="border-l-4 pl-6 bg-gray-50 rounded-lg shadow-sm py-4" style={{ borderColor: colorScheme.accent }}>
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
                      <p className="mb-2 leading-relaxed text-xs" style={{ color: colorScheme.text }}>
                        {exp.description}
                      </p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-1 list-disc list-inside">
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
            <div className="mb-6">
              <h2 
                className="text-2xl font-extrabold mb-4 pb-2 border-b-2 tracking-tight"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent
                }}
              >
                Projects
              </h2>
              <div className="space-y-6">
                {(() => {
                  const projectsSection = sections.find(s => s.type === 'projects');
                  if (!projectsSection) return null;
                  const content = projectsSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((project, index) => (
                    <div key={index} className="border-l-4 pl-6 bg-gray-50 rounded-lg shadow-sm py-4" style={{ borderColor: colorScheme.accent }}>
                      <h3 className="text-lg font-bold mb-2" style={{ color: colorScheme.secondary }}>
                        {project.name}
                      </h3>
                      <p className="mb-2 leading-relaxed text-xs" style={{ color: colorScheme.text }}>
                        {project.description}
                      </p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-full text-xs font-medium bg-white border border-gray-200"
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
                className="text-2xl font-extrabold mb-4 pb-2 border-b-2 tracking-tight"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent
                }}
              >
                Certifications
              </h2>
              <div className="space-y-4">
                {(() => {
                  const certificationsSection = sections.find(s => s.type === 'certifications');
                  if (!certificationsSection) return null;
                  const content = certificationsSection.content;
                  if (!Array.isArray(content)) return null;
                  return (content as any[]).map((cert, index) => (
                    <div key={index} className="flex justify-between items-center p-4 rounded bg-gray-50 border border-gray-200">
                      <div>
                        <h3 className="font-bold text-xs" style={{ color: colorScheme.secondary }}>
                          {cert.name}
                        </h3>
                        <p className="text-xs" style={{ color: colorScheme.text }}>
                          {cert.issuer}
                        </p>
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