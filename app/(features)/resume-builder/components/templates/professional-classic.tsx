'use client';

import { ResumeData, ColorScheme, Experience, Education, Project, Certification } from '../types';

interface ProfessionalClassicProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

export default function ProfessionalClassic({ data, colorScheme }: ProfessionalClassicProps) {
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
      <div 
        className="mb-6 pb-4 border-b-2"
        style={{ borderColor: colorScheme.primary }}
      >
        <h1 
          className="text-2xl font-bold mb-2"
          style={{ color: colorScheme.primary }}
        >
          {personalInfo.fullName}
        </h1>
        <p className="text-sm mb-3" style={{ color: colorScheme.secondary }}>
          {sections.find(s => s.type === 'summary')?.content[0] || 'Professional Summary'}
        </p>
        <div className="grid grid-cols-3 gap-4 text-xs">
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
        </div>
        {(personalInfo.linkedin || personalInfo.portfolio) && (
          <div className="mt-2 flex gap-4 text-xs">
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <span className="font-semibold mr-2">LinkedIn:</span>
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center">
                <span className="font-semibold mr-2">Portfolio:</span>
                <span>{personalInfo.portfolio}</span>
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
            <div key={section.id} className="mb-4">
              <h2 
                className="text-lg font-bold mb-3 pb-1 border-b"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.border
                }}
              >
                {section.title}
              </h2>
              
              {section.type === 'experience' && (
                <div className="space-y-3">
                  {(section.content as Experience[])?.map((exp, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                          {exp.position}
                        </h3>
                        <span className="text-xs" style={{ color: colorScheme.accent }}>
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="font-medium mb-1 text-xs" style={{ color: colorScheme.primary }}>
                        {exp.company}
                      </p>
                      <p className="mb-2 text-xs">{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="list-disc list-inside space-y-1 ml-2">
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
                <div className="space-y-3">
                  {(section.content as Education[])?.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-sm" style={{ color: colorScheme.secondary }}>
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
                        <p className="text-xs mt-1">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'skills' && (
                <div className="flex flex-wrap gap-2">
                  {(section.content as string[])?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full text-xs font-medium"
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
                <div className="space-y-3">
                  {(section.content as Project[])?.map((project, index) => (
                    <div key={index} className="mb-3">
                      <h3 className="font-semibold text-sm mb-1" style={{ color: colorScheme.secondary }}>
                        {project.name}
                      </h3>
                      <p className="mb-2 text-xs">{project.description}</p>
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
                  ))}
                </div>
              )}

              {section.type === 'certifications' && (
                <div className="space-y-2">
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