import { Job, SearchParams, JobAggregationResult, UserSubmittedJob } from './types';
import { jobSources, mockJobs } from './sources';
import { jobCache, deduplicateJobs, rankJobs } from './cache';
import { adzunaAPI, usajobsAPI, githubJobsAPI } from './apis';
import { rssAggregator } from './rss';

export class JobAggregationService {
  private userSubmittedJobs: Map<string, UserSubmittedJob> = new Map();

  async aggregateJobs(params: SearchParams): Promise<JobAggregationResult> {
    const startTime = Date.now();
    
    // Check cache first
    const cachedJobs = jobCache.getJobs(params);
    if (cachedJobs) {
      return {
        jobs: cachedJobs,
        total: cachedJobs.length,
        sources: ['cache'],
        cacheHit: true,
        executionTime: Date.now() - startTime
      };
    }

    // Fetch from all sources
    const allJobs: Job[] = [];
    const sources: string[] = [];
    const errors: string[] = [];

    // 1. Fetch from APIs
    const apiPromises = [
      this.fetchFromAdzuna(params),
      this.fetchFromUSAJobs(params),
      this.fetchFromGitHubJobs(params)
    ];

    const apiResults = await Promise.allSettled(apiPromises);
    
    apiResults.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.success && result.value.data) {
        allJobs.push(...result.value.data);
        sources.push(result.value.source);
      } else if (result.status === 'rejected') {
        errors.push(`API ${index} failed: ${result.reason}`);
      }
    });

    // 2. Fetch from RSS feeds
    try {
      const rssJobs = await rssAggregator.aggregateJobs();
      allJobs.push(...rssJobs);
      sources.push('RSS Feeds');
    } catch (error) {
      errors.push(`RSS aggregation failed: ${error}`);
    }

    // 3. Add user submitted jobs
    const userJobs = this.getUserSubmittedJobs(params);
    allJobs.push(...userJobs);
    if (userJobs.length > 0) {
      sources.push('User Submitted');
    }

    // 4. Add mock jobs for development
    if (process.env.NODE_ENV === 'development') {
      allJobs.push(...mockJobs);
      sources.push('Mock Data');
    }

    // Process and rank jobs
    const uniqueJobs = deduplicateJobs(allJobs);
    const rankedJobs = rankJobs(uniqueJobs, params);

    // Apply filters
    const filteredJobs = this.applyFilters(rankedJobs, params);

    // Cache the results
    jobCache.setJobs(params, filteredJobs);

    return {
      jobs: filteredJobs,
      total: filteredJobs.length,
      sources,
      cacheHit: false,
      executionTime: Date.now() - startTime
    };
  }

  private async fetchFromAdzuna(params: SearchParams) {
    try {
      return await adzunaAPI.searchJobs(params);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'Adzuna',
        executionTime: 0
      };
    }
  }

  private async fetchFromUSAJobs(params: SearchParams) {
    try {
      return await usajobsAPI.searchJobs(params);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'USAJobs',
        executionTime: 0
      };
    }
  }

  private async fetchFromGitHubJobs(params: SearchParams) {
    try {
      return await githubJobsAPI.searchJobs(params);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'GitHub Jobs',
        executionTime: 0
      };
    }
  }

  private applyFilters(jobs: Job[], params: SearchParams): Job[] {
    return jobs.filter(job => {
      // Location filter
      if (params.location && !job.location.toLowerCase().includes(params.location.toLowerCase())) {
        return false;
      }

      // Salary range filter
      if (params.salaryRange) {
        const jobSalary = this.extractSalaryRange(job.salary);
        const filterRange = this.parseSalaryRange(params.salaryRange);
        
        if (jobSalary && filterRange) {
          if (jobSalary.max < filterRange.min || jobSalary.min > filterRange.max) {
            return false;
          }
        }
      }

      // Job type filter
      if (params.jobType && job.type !== params.jobType) {
        return false;
      }

      // Experience level filter
      if (params.experienceLevel && job.experience !== params.experienceLevel) {
        return false;
      }

      // Remote filter
      if (params.remote !== undefined) {
        const isRemote = job.remote?.toLowerCase().includes('remote') || 
                        job.location.toLowerCase().includes('remote');
        if (params.remote !== isRemote) {
          return false;
        }
      }

      return true;
    });
  }

  private extractSalaryRange(salary?: string): { min: number; max: number } | null {
    if (!salary) return null;

    const match = salary.match(/\$?([\d,]+)\s*-\s*\$?([\d,]+)/);
    if (match) {
      return {
        min: parseInt(match[1].replace(/,/g, '')),
        max: parseInt(match[2].replace(/,/g, ''))
      };
    }

    return null;
  }

  private parseSalaryRange(range: string): { min: number; max: number } | null {
    const ranges: { [key: string]: { min: number; max: number } } = {
      '$50k - $80k': { min: 50000, max: 80000 },
      '$80k - $120k': { min: 80000, max: 120000 },
      '$120k - $180k': { min: 120000, max: 180000 },
      '$180k+': { min: 180000, max: 999999 }
    };

    return ranges[range] || null;
  }

  // User submitted jobs management
  submitJob(job: Omit<UserSubmittedJob, 'id' | 'submittedAt' | 'verified'>): string {
    const id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const userJob: UserSubmittedJob = {
      ...job,
      id,
      submittedAt: new Date(),
      verified: false
    };

    this.userSubmittedJobs.set(id, userJob);
    return id;
  }

  getUserSubmittedJobs(params: SearchParams): Job[] {
    const userJobs = Array.from(this.userSubmittedJobs.values())
      .filter(job => job.verified)
      .map(job => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        type: job.type,
        experience: job.experience,
        description: job.description,
        tags: job.tags,
        source: { name: 'User Submitted', api: '', rateLimit: 0, priority: 10, enabled: true },
        sourceUrl: null,
        remote: job.location.toLowerCase().includes('remote') ? 'Remote' : 'On-site',
        datePosted: job.submittedAt.toISOString(),
        logo: undefined,
        isAIIRecommended: false
      }));

    return this.applyFilters(userJobs, params);
  }

  verifyUserJob(jobId: string): boolean {
    const job = this.userSubmittedJobs.get(jobId);
    if (job) {
      job.verified = true;
      return true;
    }
    return false;
  }

  deleteUserJob(jobId: string): boolean {
    return this.userSubmittedJobs.delete(jobId);
  }

  // Get job by ID from all sources
  async getJobById(jobId: string): Promise<Job | null> {
    // Check user submitted jobs first
    const userJob = this.userSubmittedJobs.get(jobId);
    if (userJob) {
      return {
        id: userJob.id,
        title: userJob.title,
        company: userJob.company,
        location: userJob.location,
        salary: userJob.salary,
        type: userJob.type,
        experience: userJob.experience,
        tags: userJob.tags,
        datePosted: userJob.submittedAt.toISOString(),
        description: userJob.description,
        source: { name: 'User Submitted', api: '', rateLimit: 0, priority: 10, enabled: true },
        isAIIRecommended: false
      };
    }

    // Check mock jobs
    const mockJob = mockJobs.find(job => job.id === jobId);
    if (mockJob) {
      return mockJob;
    }

    // For real APIs, we would need to implement individual job fetching
    // This is a simplified version
    return null;
  }

  // Get statistics
  getStats() {
    return {
      cache: jobCache.getStats(),
      userSubmittedJobs: this.userSubmittedJobs.size,
      enabledSources: jobSources.filter(s => s.enabled).length,
      enabledRSSFeeds: rssAggregator.getEnabledFeeds().length
    };
  }

  // Clear cache
  clearCache(): void {
    jobCache.clear();
  }
}

// Export singleton instance
export const jobAggregationService = new JobAggregationService(); 