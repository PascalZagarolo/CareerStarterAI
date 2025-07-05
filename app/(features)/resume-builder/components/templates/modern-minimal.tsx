'use client';

import { ResumeData, ColorScheme } from '../types';

interface ModernMinimalProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

export default function ModernMinimal({ data, colorScheme }: ModernMinimalProps) {
  const { personalInfo, sections } = data;

  return (
    <div 
      className="w-full h-full bg-white"
      style={{ 
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        color: colorScheme.text,
        backgroundColor: colorScheme.background,
        padding: '20mm'
      }}
    >
      {/* Header */}
      <div className="text-center mb-8 border-b-2 pb-6" style={{ borderColor: colorScheme.border }}>
        <h1 
          className="text-3xl font-light mb-3 tracking-wide"
          style={{ color: colorScheme.primary }}
        >
          {personalInfo.fullName}
        </h1>
        <p className="text-lg mb-4" style={{ color: colorScheme.secondary }}>
          {sections.find(s => s.type === 'summary')?.content[0] || 'Professional Summary'}
        </p>
        <div className="flex justify-center items-center space-x-6 text-xs">
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
          <div className="mt-3 flex justify-center items-center space-x-6 text-xs">
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.linkedin && personalInfo.portfolio && (
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colorScheme.accent }}></div>
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
      <div className="space-y-6">
        {sections
          .filter(section => section.isVisible && section.type !== 'summary')
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <div key={section.id}>
              <h2 
                className="text-xl font-light mb-4 tracking-wide uppercase"
                style={{ color: colorScheme.primary }}
              >
                {section.title}
              </h2>
              
              {section.type === 'experience' && (
                <div className="space-y-4">
                  {(() => {
                    const experienceSection = sections.find(s => s.type === 'experience');
                    if (!experienceSection) return null;
                    const content = experienceSection.content;
                    if (!Array.isArray(content)) return null;
                    return (content as any[]).map((exp, index) => (
                    <div key={index} className="border-l-4 pl-4" style={{ borderColor: colorScheme.accent }}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium" style={{ color: colorScheme.secondary }}>
                          {exp.position}
                        </h3>
                        <span className="text-xs font-light" style={{ color: colorScheme.accent }}>
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-sm mb-2" style={{ color: colorScheme.primary }}>
                        {exp.company}
                      </p>
                      <p className="mb-2 leading-relaxed text-xs">{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-1">
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
                <div className="space-y-4">
                  {(() => {
                    const educationSection = sections.find(s => s.type === 'education');
                    if (!educationSection) return null;
                    const content = educationSection.content;
                    if (!Array.isArray(content)) return null;
                    return (content as any[]).map((edu, index) => (
                    <div key={index} className="border-l-4 pl-4" style={{ borderColor: colorScheme.accent }}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium" style={{ color: colorScheme.secondary }}>
                          {edu.degree} in {edu.field}
                        </h3>
                        <span className="text-xs font-light" style={{ color: colorScheme.accent }}>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: colorScheme.primary }}>
                        {edu.institution}
                      </p>
                      {edu.gpa && (
                        <p className="text-xs mt-1">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ));
                  })()}
                </div>
              )}

              {section.type === 'skills' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(() => {
                    const skillsSection = sections.find(s => s.type === 'skills');
                    if (!skillsSection) return null;
                    const content = skillsSection.content;
                    if (!Array.isArray(content)) return null;
                    return (content as string[]).map((skill: string, index: number) => (
                    <div
                      key={index}
                      className="p-3 text-center"
                      style={{
                        backgroundColor: colorScheme.background,
                        border: `1px solid ${colorScheme.border}`,
                        borderRadius: '6px'
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
                <div className="space-y-4">
                    {(() => {
                        const projectsSection = sections.find(s => s.type === 'projects');
                        if (!projectsSection) return null;
                        const content = projectsSection.content;
                        if (!Array.isArray(content)) return null;
                        return (content as any[]).map((project, index) => (
                    <div key={index} className="border-l-4 pl-4" style={{ borderColor: colorScheme.accent }}>
                      <h3 className="text-lg font-medium mb-2" style={{ color: colorScheme.secondary }}>
                        {project.name}
                      </h3>
                      <p className="mb-2 leading-relaxed text-xs">{project.description}</p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-full text-xs font-light"
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
                <div className="space-y-3"> 
                  {(() => {
                    const certificationsSection = sections.find(s => s.type === 'certifications');
                    if (!certificationsSection) return null;
                    const content = certificationsSection.content;
                    if (!Array.isArray(content)) return null;
                    return (content as any[]).map((cert, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2" style={{ borderColor: colorScheme.border }}>
                      <div>
                        <h3 className="text-sm font-medium" style={{ color: colorScheme.secondary }}>
                          {cert.name}
                        </h3>
                        <p className="text-xs mt-1">{cert.issuer}</p>
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