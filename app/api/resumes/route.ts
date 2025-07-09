import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { userResumes, templates, colorSchemes } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

// GET /api/resumes - Get all resumes for the current user
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resumes = await db
      .select({
        resume: userResumes,
        template: templates,
        colorScheme: colorSchemes,
      })
      .from(userResumes)
      .innerJoin(templates, eq(userResumes.templateId, templates.id))
      .innerJoin(colorSchemes, eq(userResumes.colorSchemeId, colorSchemes.id))
      .where(eq(userResumes.userId, user.id))
      .orderBy(desc(userResumes.updatedAt));

    // Transform the data to include template and color scheme details
    const resumesWithDetails = resumes.map(row => ({
      ...row.resume,
      template: row.template,
      colorScheme: row.colorScheme,
    }));

    return NextResponse.json({ resumes: resumesWithDetails });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}

// POST /api/resumes - Create a new resume
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, templateId, colorSchemeId, data, isDefault = false } = body;

    if (!name || !templateId || !colorSchemeId || !data) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate resume data structure
    if (!data.personalInfo || !data.sections || !Array.isArray(data.sections)) {
      return NextResponse.json(
        { error: 'Invalid resume data structure' },
        { status: 400 }
      );
    }

    // If this is set as default, unset other defaults for this user
    if (isDefault) {
      await db
        .update(userResumes)
        .set({ isDefault: false })
        .where(eq(userResumes.userId, user.id));
    }

    const [newResume] = await db
      .insert(userResumes)
      .values({
        userId: user.id,
        name,
        description,
        templateId,
        colorSchemeId,
        data: JSON.stringify(data),
        isDefault,
        status: 'draft',
        version: 1,
      })
      .returning();

    return NextResponse.json({ resume: newResume }, { status: 201 });
  } catch (error) {
    console.error('Error creating resume:', error);
    return NextResponse.json(
      { error: 'Failed to create resume' },
      { status: 500 }
    );
  }
} 