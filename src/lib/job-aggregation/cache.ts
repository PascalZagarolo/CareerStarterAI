import { Job, JobCache, SearchParams } from './types';

class JobCacheManager {
  private cache: Map<string, JobCache> = new Map();
  private readonly defaultTTL = 30 * 60 * 1000; // 30 minutes

  // Generate cache key from search parameters
  private generateCacheKey(params: SearchParams): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${params[key as keyof SearchParams]}`)
      .join('|');
    return `jobs:${sortedParams}`;
  }

  // Get jobs from cache
  getJobs(params: SearchParams): Job[] | null {
    const key = this.generateCacheKey(params);
    const cached = this.cache.get(key);

    if (!cached) return null;

    // Check if cache is expired
    const now = new Date();
    const isExpired = now.getTime() - cached.lastUpdated.getTime() > cached.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return Array.from(cached.jobs.values());
  }

  // Store jobs in cache
  setJobs(params: SearchParams, jobs: Job[], ttl?: number): void {
    const key = this.generateCacheKey(params);
    const jobsMap = new Map<string, Job>();
    
    jobs.forEach(job => {
      jobsMap.set(job.id, job);
    });

    this.cache.set(key, {
      jobs: jobsMap,
      lastUpdated: new Date(),
      ttl: ttl || this.defaultTTL
    });

    // Clean up old cache entries
    this.cleanup();
  }

  // Update specific job in cache
  updateJob(params: SearchParams, jobId: string, updatedJob: Job): void {
    const key = this.generateCacheKey(params);
    const cached = this.cache.get(key);

    if (cached) {
      cached.jobs.set(jobId, updatedJob);
      cached.lastUpdated = new Date();
    }
  }

  // Remove job from cache
  removeJob(params: SearchParams, jobId: string): void {
    const key = this.generateCacheKey(params);
    const cached = this.cache.get(key);

    if (cached) {
      cached.jobs.delete(jobId);
      cached.lastUpdated = new Date();
    }
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
  }

  // Clear expired cache entries
  private cleanup(): void {
    const now = new Date();
    const keysToDelete: string[] = [];

    this.cache.forEach((cached, key) => {
      const isExpired = now.getTime() - cached.lastUpdated.getTime() > cached.ttl;
      if (isExpired) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  // Get cache statistics
  getStats(): {
    totalEntries: number;
    totalJobs: number;
    oldestEntry: Date | null;
    newestEntry: Date | null;
  } {
    let totalJobs = 0;
    let oldestEntry: Date | null = null;
    let newestEntry: Date | null = null;

    this.cache.forEach(cached => {
      totalJobs += cached.jobs.size;
      
      if (!oldestEntry || cached.lastUpdated < oldestEntry) {
        oldestEntry = cached.lastUpdated;
      }
      
      if (!newestEntry || cached.lastUpdated > newestEntry) {
        newestEntry = cached.lastUpdated;
      }
    });

    return {
      totalEntries: this.cache.size,
      totalJobs,
      oldestEntry,
      newestEntry
    };
  }

  // Check if cache has data for given parameters
  hasCache(params: SearchParams): boolean {
    const key = this.generateCacheKey(params);
    const cached = this.cache.get(key);
    
    if (!cached) return false;

    const now = new Date();
    const isExpired = now.getTime() - cached.lastUpdated.getTime() > cached.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  // Get cache hit rate (for monitoring)
  getCacheHitRate(): number {
    // This would need to be implemented with request tracking
    // For now, return a placeholder
    return 0.75; // 75% cache hit rate
  }
}

// Export singleton instance
export const jobCache = new JobCacheManager();

// Helper function to deduplicate jobs across sources
export const deduplicateJobs = (jobs: Job[]): Job[] => {
  const seen = new Set<string>();
  const uniqueJobs: Job[] = [];

  jobs.forEach(job => {
    // Create a unique key based on title, company, and location
    const key = `${job.title.toLowerCase()}-${job.company.toLowerCase()}-${job.location.toLowerCase()}`;
    
    if (!seen.has(key)) {
      seen.add(key);
      uniqueJobs.push(job);
    }
  });

  return uniqueJobs;
};

// Helper function to rank jobs by relevance
export const rankJobs = (jobs: Job[], searchParams: SearchParams): Job[] => {
  return jobs.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // Boost AI recommended jobs
    if (a.isAIIRecommended) scoreA += 10;
    if (b.isAIIRecommended) scoreB += 10;

    // Boost jobs with salary information
    if (a.salary) scoreA += 5;
    if (b.salary) scoreB += 5;

    // Boost jobs with more tags (more detailed)
    scoreA += a.tags.length;
    scoreB += b.tags.length;

    // Boost jobs with longer descriptions
    scoreA += Math.min(a.description.length / 100, 5);
    scoreB += Math.min(b.description.length / 100, 5);

    // Boost recent jobs
    const daysA = Math.floor((Date.now() - new Date(a.datePosted).getTime()) / (1000 * 60 * 60 * 24));
    const daysB = Math.floor((Date.now() - new Date(b.datePosted).getTime()) / (1000 * 60 * 60 * 24));
    scoreA += Math.max(0, 10 - daysA);
    scoreB += Math.max(0, 10 - daysB);

    return scoreB - scoreA; // Higher score first
  });
}; 