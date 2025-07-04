import { NextRequest, NextResponse } from 'next/server';
import { jobAggregationService } from '@/lib/job-aggregation/aggregator';
import { SearchParams } from '@/lib/job-aggregation/types';
import { db } from '@/db';
import { jobs } from '@/db/schema';
import { eq, and, or, like, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract search parameters
    const params: SearchParams = {
      query: searchParams.get('query') || undefined,
      location: searchParams.get('location') || undefined,
      radius: parseInt(searchParams.get('radius') || '25'),
      salaryRange: searchParams.get('salaryRange') || undefined,
      jobType: searchParams.get('jobType') || undefined,
      experienceLevel: searchParams.get('experienceLevel') || undefined,
      remote: searchParams.get('remote') === 'true',
      limit: parseInt(searchParams.get('limit') || '20'),
      page: parseInt(searchParams.get('page') || '1')
    };

    // Aggregate jobs from all sources
    const result = await jobAggregationService.aggregateJobs(params);

    // Get user-submitted jobs from database
    const whereConditions = [
      eq(jobs.status, 'active'),
      eq(jobs.source, 'user-submitted')
    ];

    if (params.query) {
      const queryCondition = or(
        like(jobs.title, `%${params.query}%`),
        like(jobs.company, `%${params.query}%`),
        like(jobs.description, `%${params.query}%`)
      );
      if (queryCondition) {
        whereConditions.push(queryCondition);
      }
    }
    if (params.location) {
      const locationCondition = like(jobs.location, `%${params.location}%`);
      if (locationCondition) {
        whereConditions.push(locationCondition);
      }
    }

    const userSubmittedJobs = await db
      .select()
      .from(jobs)
      .where(and(...whereConditions))
      .orderBy(desc(jobs.createdAt));

    // Convert database jobs to Job interface
    const dbJobs = userSubmittedJobs.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary || undefined,
      type: job.type,
      experience: job.experience,
      description: job.description,
      tags: job.tags || [],
      source: { name: 'User Submitted', api: '', rateLimit: 0, priority: 10, enabled: true },
      sourceUrl: job.sourceUrl || undefined,
      remote: job.location.toLowerCase().includes('remote') ? 'Remote' : 'On-site',
      datePosted: job.createdAt.toISOString(),
      logo: undefined,
      isAIIRecommended: false
    }));

    // Combine all jobs
    const allJobs = [...result.jobs, ...dbJobs];
    const totalJobs = allJobs.length;
    
    // Apply pagination
    const page = params.page || 1;
    const limit = params.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJobs = allJobs.slice(startIndex, endIndex);
    
    // Update sources to include user-submitted
    const allSources = [...result.sources];
    if (dbJobs.length > 0) {
      allSources.push('User Submitted');
    }

    return NextResponse.json({
      success: true,
      data: {
        jobs: paginatedJobs,
        total: totalJobs,
        page,
        limit,
        totalPages: Math.ceil(totalJobs / limit),
        sources: allSources,
        cacheHit: result.cacheHit,
        executionTime: result.executionTime
      }
    });

  } catch (error) {
    console.error('Job search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to search jobs',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract search parameters from request body
    const params: SearchParams = {
      query: body.query,
      location: body.location,
      radius: body.radius || 25,
      salaryRange: body.salaryRange,
      jobType: body.jobType,
      experienceLevel: body.experienceLevel,
      remote: body.remote,
      limit: body.limit || 20,
      page: body.page || 1
    };

    // Aggregate jobs from all sources
    const result = await jobAggregationService.aggregateJobs(params);

    // Apply pagination
    const page = params.page || 1;
    const limit = params.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJobs = result.jobs.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        jobs: paginatedJobs,
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit),
        sources: result.sources,
        cacheHit: result.cacheHit,
        executionTime: result.executionTime
      }
    });

  } catch (error) {
    console.error('Job search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to search jobs',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 