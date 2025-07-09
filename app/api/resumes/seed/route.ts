import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import { userResumes, templates, colorSchemes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';
import { defaultResumeData } from '../../../../app/(main)/(features)/resume-builder/components/data';
import type { UserResume } from '@/db/schema';

// POST /api/resumes/seed - Create sample resumes for testing
export async function POST() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get available templates and color schemes
    const availableTemplates = await db
      .select()
      .from(templates)
      .where(eq(templates.isActive, true))
      .limit(5);

    if (availableTemplates.length === 0) {
      return NextResponse.json({ error: 'No templates available' }, { status: 400 });
    }

    // Get color schemes for each template
    const templateColorSchemes: { [key: string]: any[] } = {};
    for (const template of availableTemplates) {
      const schemes = await db
        .select()
        .from(colorSchemes)
        .where(eq(colorSchemes.templateId, template.id))
        .limit(3);
      templateColorSchemes[template.id] = schemes;
    }

    // Sample resume data
    const sampleResumes = [
      {
        name: 'Software Engineer Resume',
        description: 'Professional resume for software engineering positions',
        templateId: availableTemplates[0]?.id || 'professional-classic',
        colorSchemeId: templateColorSchemes[availableTemplates[0]?.id]?.[0]?.id,
        status: 'published' as const,
        isDefault: true,
        data: {
          ...defaultResumeData,
          personalInfo: {
            ...defaultResumeData.personalInfo,
            fullName: 'John Doe',
            email: 'john.doe@email.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            linkedin: 'linkedin.com/in/johndoe',
            portfolio: 'johndoe.dev'
          }
        }
      },
      {
        name: 'Marketing Manager Resume',
        description: 'Creative resume for marketing and brand management roles',
        templateId: availableTemplates[1]?.id || availableTemplates[0]?.id,
        colorSchemeId: templateColorSchemes[availableTemplates[1]?.id]?.[0]?.id || templateColorSchemes[availableTemplates[0]?.id]?.[1]?.id,
        status: 'draft' as const,
        isDefault: false,
        data: {
          ...defaultResumeData,
          personalInfo: {
            ...defaultResumeData.personalInfo,
            fullName: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+1 (555) 987-6543',
            location: 'New York, NY',
            linkedin: 'linkedin.com/in/sarahjohnson',
            portfolio: 'sarahjohnson.com'
          }
        }
      },
      {
        name: 'Data Scientist Resume',
        description: 'Technical resume highlighting analytical and ML skills',
        templateId: availableTemplates[2]?.id || availableTemplates[0]?.id,
        colorSchemeId: templateColorSchemes[availableTemplates[2]?.id]?.[0]?.id || templateColorSchemes[availableTemplates[0]?.id]?.[2]?.id,
        status: 'published' as const,
        isDefault: false,
        data: {
          ...defaultResumeData,
          personalInfo: {
            ...defaultResumeData.personalInfo,
            fullName: 'Michael Chen',
            email: 'michael.chen@email.com',
            phone: '+1 (555) 456-7890',
            location: 'Seattle, WA',
            linkedin: 'linkedin.com/in/michaelchen',
            portfolio: 'michaelchen.ai'
          }
        }
      },
      {
        name: 'UX Designer Portfolio',
        description: 'Creative portfolio resume for design positions',
        templateId: availableTemplates[3]?.id || availableTemplates[1]?.id,
        colorSchemeId: templateColorSchemes[availableTemplates[3]?.id]?.[0]?.id || templateColorSchemes[availableTemplates[1]?.id]?.[1]?.id,
        status: 'archived' as const,
        isDefault: false,
        data: {
          ...defaultResumeData,
          personalInfo: {
            ...defaultResumeData.personalInfo,
            fullName: 'Emily Rodriguez',
            email: 'emily.rodriguez@email.com',
            phone: '+1 (555) 321-6540',
            location: 'Austin, TX',
            linkedin: 'linkedin.com/in/emilyrodriguez',
            portfolio: 'emilyrodriguez.design'
          }
        }
      }
    ];

    // Create the sample resumes
    const createdResumes: UserResume[] = [];
    for (const resumeData of sampleResumes) {
      // Skip if we don't have valid template or color scheme
      if (!resumeData.templateId || !resumeData.colorSchemeId) {
        continue;
      }

      // If this is set as default, unset other defaults for this user
      if (resumeData.isDefault) {
        await db
          .update(userResumes)
          .set({ isDefault: false })
          .where(eq(userResumes.userId, user.id));
      }

      const [newResume] = await db
        .insert(userResumes)
        .values({
          userId: user.id,
          name: resumeData.name,
          description: resumeData.description,
          templateId: resumeData.templateId,
          colorSchemeId: resumeData.colorSchemeId,
          data: JSON.stringify(resumeData.data),
          status: resumeData.status,
          isDefault: resumeData.isDefault,
          version: 1,
        })
        .returning();

      createdResumes.push(newResume);
    }

    return NextResponse.json({ 
      message: `Created ${createdResumes.length} sample resumes`,
      resumes: createdResumes
    });
  } catch (error) {
    console.error('Error seeding resumes:', error);
    return NextResponse.json(
      { error: 'Failed to seed resumes' },
      { status: 500 }
    );
  }
} 