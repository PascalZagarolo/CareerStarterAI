'use client';

import { useRef } from 'react';
import { ResumeData, Experience } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  const renderResumePreview = () => {
    const visibleSections = resumeData.sections.filter(s => s.isVisible).sort((a, b) => a.order - b.order);
    
    return (
      <div 
        ref={previewRef}
        className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto"
        style={{ fontFamily: resumeData.theme.fontFamily }}
      >
        {/* Header */}
        <div className="text-center mb-8 border-b border-gray-200 pb-6">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: resumeData.theme.primaryColor }}
          >
            {resumeData.personalInfo.fullName}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-6 text-gray-600 text-sm">
            {resumeData.personalInfo.email && (
              <span>{resumeData.personalInfo.email}</span>
            )}
            {resumeData.personalInfo.phone && (
              <span>{resumeData.personalInfo.phone}</span>
            )}
            {resumeData.personalInfo.location && (
              <span>{resumeData.personalInfo.location}</span>
            )}
          </div>
          {(resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio) && (
            <div className="flex flex-wrap justify-center gap-x-6 text-gray-600 text-sm mt-2">
              {resumeData.personalInfo.linkedin && (
                <span>{resumeData.personalInfo.linkedin}</span>
              )}
              {resumeData.personalInfo.portfolio && (
                <span>{resumeData.personalInfo.portfolio}</span>
              )}
            </div>
          )}
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {visibleSections.map(section => (
            <div key={section.id}>
              <h2 
                className="text-xl font-bold mb-3 pb-1 border-b"
                style={{ color: resumeData.theme.primaryColor, borderColor: resumeData.theme.secondaryColor }}
              >
                {section.title}
              </h2>
              
              {section.type === 'summary' && (
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              )}
              
              {section.type === 'experience' && (
                <div className="space-y-4">
                  {section.content.map((exp: Experience) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                          <p className="text-gray-700">{exp.company}</p>
                        </div>
                        <span className="text-gray-500 text-sm">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-600">
                              <span className="mr-2 mt-1" style={{ color: resumeData.theme.primaryColor }}>•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {section.type === 'skills' && (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {section.content.technical.map((skill: string, index: number) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ 
                            backgroundColor: `${resumeData.theme.primaryColor}20`,
                            color: resumeData.theme.primaryColor
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {section.content.soft.map((skill: string, index: number) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ 
                            backgroundColor: `${resumeData.theme.secondaryColor}20`,
                            color: resumeData.theme.secondaryColor
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-900">Live Preview</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-gray-700">
              <Monitor className="h-4 w-4 mr-2" />
              Desktop
            </Button>
            <Button variant="outline" size="sm" className="text-gray-700">
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          {renderResumePreview()}
        </div>
      </CardContent>
    </Card>
  );
} 