import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/db';
import { jobs } from '@/db/schema';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      company,
      location,
      salary,
      type,
      experience,
      description,
      contactEmail,
      companyWebsite,
      tags,
      submittedBy
    } = body;

    // Validate required fields
    if (!title || !company || !location || !description || !contactEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique job ID
    const jobId = nanoid(12);

    // Create job record
    await db.insert(jobs).values({
      id: jobId,
      title,
      company,
      location,
      salary: salary || null,
      type,
      experience,
      description,
      contactEmail,
      companyWebsite: companyWebsite || null,
      tags: tags || [],
      source: 'user-submitted',
      sourceUrl: null,
      submittedBy: submittedBy || user.email,
      status: 'pending', // Requires verification
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();

    return NextResponse.json({
      success: true,
      data: {
        jobId,
        message: 'Job submitted successfully and pending verification'
      }
    });

  } catch (error) {
    console.error('Error submitting job:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 