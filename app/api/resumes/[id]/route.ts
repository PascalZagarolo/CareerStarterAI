import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { userResumes } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

// GET /api/resumes/[id] - Get a specific resume
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resume = await db
      .select()
      .from(userResumes)
      .where(
        and(
          eq(userResumes.id, params.id),
          eq(userResumes.userId, user.id)
        )
      )
      .limit(1);

    if (resume.length === 0) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    return NextResponse.json({ resume: resume[0] });
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    );
  }
}

// PUT /api/resumes/[id] - Update a resume
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, templateId, colorSchemeId, data, status, isDefault = false } = body;

    // Check if resume exists and belongs to user
    const existingResume = await db
      .select()
      .from(userResumes)
      .where(
        and(
          eq(userResumes.id, params.id),
          eq(userResumes.userId, user.id)
        )
      )
      .limit(1);

    if (existingResume.length === 0) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    // If this is set as default, unset other defaults for this user
    if (isDefault) {
      await db
        .update(userResumes)
        .set({ isDefault: false })
        .where(
          and(
            eq(userResumes.userId, user.id),
            eq(userResumes.id, params.id)
          )
        );
    }

    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (templateId !== undefined) updateData.templateId = templateId;
    if (colorSchemeId !== undefined) updateData.colorSchemeId = colorSchemeId;
    if (data !== undefined) updateData.data = JSON.stringify(data);
    if (status !== undefined) updateData.status = status;
    if (isDefault !== undefined) updateData.isDefault = isDefault;

    // Increment version if data changed
    if (data !== undefined) {
      updateData.version = existingResume[0].version + 1;
    }

    const [updatedResume] = await db
      .update(userResumes)
      .set(updateData)
      .where(
        and(
          eq(userResumes.id, params.id),
          eq(userResumes.userId, user.id)
        )
      )
      .returning();

    return NextResponse.json({ resume: updatedResume });
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    );
  }
}

// DELETE /api/resumes/[id] - Delete a resume
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const deletedResume = await db
      .delete(userResumes)
      .where(
        and(
          eq(userResumes.id, params.id),
          eq(userResumes.userId, user.id)
        )
      )
      .returning();

    if (deletedResume.length === 0) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    );
  }
} 