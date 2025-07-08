import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { userResumes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';
import { defaultResumeData } from '../../../../app/(main)/(features)/resume-builder/components/data';

// GET /api/resumes/debug - Debug resume data issues
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resumes = await db
      .select()
      .from(userResumes)
      .where(eq(userResumes.userId, user.id));

    const debugResults = resumes.map(resume => {
      let isValid = true;
      let error: string | null = null;
      let parsedData: any = null;

      try {
        // Check if data is empty or null
        if (!resume.data || resume.data.trim() === '') {
          isValid = false;
          error = 'Empty or null data';
        } else {
          // Try to parse JSON
          parsedData = JSON.parse(resume.data);
          
          // Validate structure
          if (!parsedData || typeof parsedData !== 'object') {
            isValid = false;
            error = 'Data is not a valid object';
          } else if (!parsedData.personalInfo || !parsedData.sections) {
            isValid = false;
            error = 'Missing required fields (personalInfo or sections)';
          } else if (!Array.isArray(parsedData.sections)) {
            isValid = false;
            error = 'Sections is not an array';
          }
        }
      } catch (parseError) {
        isValid = false;
        error = `JSON parse error: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`;
      }

      return {
        id: resume.id,
        name: resume.name,
        isValid,
        error,
        dataLength: resume.data?.length || 0,
        dataPreview: resume.data?.substring(0, 100) + (resume.data?.length > 100 ? '...' : ''),
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt
      };
    });

    return NextResponse.json({ 
      totalResumes: resumes.length,
      validResumes: debugResults.filter(r => r.isValid).length,
      corruptedResumes: debugResults.filter(r => !r.isValid).length,
      debugResults 
    });
  } catch (error) {
    console.error('Error debugging resumes:', error);
    return NextResponse.json(
      { error: 'Failed to debug resumes' },
      { status: 500 }
    );
  }
}

// POST /api/resumes/debug/fix - Fix corrupted resume data
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { resumeId } = body;

    if (!resumeId) {
      return NextResponse.json({ error: 'Resume ID is required' }, { status: 400 });
    }

    // Get the resume
    const [resume] = await db
      .select()
      .from(userResumes)
      .where(eq(userResumes.id, resumeId))
      .limit(1);

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    // Check if data is corrupted
    let isCorrupted = false;
    try {
      const parsed = JSON.parse(resume.data);
      if (!parsed.personalInfo || !parsed.sections || !Array.isArray(parsed.sections)) {
        isCorrupted = true;
      }
    } catch {
      isCorrupted = true;
    }

    if (!isCorrupted) {
      return NextResponse.json({ message: 'Resume data is already valid' });
    }

    // Fix the data by replacing with default data but keeping the name
    const fixedData = {
      ...defaultResumeData,
      personalInfo: {
        ...defaultResumeData.personalInfo,
        fullName: resume.name // Use the resume name as the full name
      }
    };

    // Update the resume with fixed data
    const [updatedResume] = await db
      .update(userResumes)
      .set({
        data: JSON.stringify(fixedData),
        version: resume.version + 1
        // updatedAt will be automatically set by the database
      })
      .where(eq(userResumes.id, resumeId))
      .returning();

    return NextResponse.json({ 
      message: 'Resume data fixed successfully',
      resume: updatedResume
    });
  } catch (error) {
    console.error('Error fixing resume:', error);
    return NextResponse.json(
      { error: 'Failed to fix resume' },
      { status: 500 }
    );
  }
} 