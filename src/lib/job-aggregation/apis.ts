import { Job, SearchParams, APIResponse, JobSource } from './types';
import { getApiKeys } from './sources';

// Base API client with rate limiting and error handling
class APIClient {
  private rateLimitMap = new Map<string, { count: number; resetTime: number }>();

  private async checkRateLimit(source: string, limit: number): Promise<boolean> {
    const now = Date.now();
    const rateLimit = this.rateLimitMap.get(source);

    if (!rateLimit || now > rateLimit.resetTime) {
      this.rateLimitMap.set(source, { count: 1, resetTime: now + 3600000 }); // 1 hour
      return true;
    }

    if (rateLimit.count >= limit) {
      return false;
    }

    rateLimit.count++;
    return true;
  }

  protected async makeRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'User-Agent': 'CareerStarter-AI/1.0',
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  protected async makeRateLimitedRequest(
    source: string,
    limit: number,
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const canProceed = await this.checkRateLimit(source, limit);
    
    if (!canProceed) {
      throw new Error(`Rate limit exceeded for ${source}`);
    }

    return this.makeRequest(url, options);
  }
}

// Adzuna API integration
export class AdzunaAPI extends APIClient {
  private readonly appId: string;
  private readonly appKey: string;

  constructor() {
    super();
    const keys = getApiKeys();
    this.appId = keys.ADZUNA_APP_ID || '';
    this.appKey = keys.ADZUNA_APP_KEY || '';

    if (!this.appId || !this.appKey) {
      console.warn('Adzuna API keys not configured');
    }
  }

  async searchJobs(params: SearchParams): Promise<APIResponse> {
    const startTime = Date.now();

    try {
      if (!this.appId || !this.appKey) {
        return {
          success: false,
          error: 'API keys not configured',
          source: 'Adzuna',
          executionTime: Date.now() - startTime
        };
      }

      const searchParams = new URLSearchParams({
        app_id: this.appId,
        app_key: this.appKey,
        results_per_page: '20',
        what: params.query || 'software engineer',
        where: params.location || 'United States',
        content_type: 'jobs'
      });

      const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?${searchParams}`;
      
      const response = await this.makeRateLimitedRequest('Adzuna', 1000, url);
      const data = await response.json();

      const jobs: Job[] = data.results?.map((result: any) => ({
        id: `adzuna-${result.id}`,
        title: result.title,
        company: result.company?.display_name || 'Unknown Company',
        location: result.location?.display_name || 'Remote',
        salary: result.salary_min && result.salary_max 
          ? `$${result.salary_min.toLocaleString()} - $${result.salary_max.toLocaleString()}`
          : undefined,
        type: result.contract_time || 'Full-time',
        experience: this.mapExperienceLevel(result.category?.label),
        tags: this.extractTags(result.description),
        datePosted: result.created,
        description: result.description,
        url: result.redirect_url,
        source: { name: 'Adzuna', api: '', rateLimit: 1000, priority: 1, enabled: true },
        isAIIRecommended: this.isAIRecommended(result)
      })) || [];

      return {
        success: true,
        data: jobs,
        source: 'Adzuna',
        executionTime: Date.now() - startTime
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'Adzuna',
        executionTime: Date.now() - startTime
      };
    }
  }

  private mapExperienceLevel(category: string): string {
    if (!category) return 'Mid-level';
    
    const lower = category.toLowerCase();
    if (lower.includes('senior') || lower.includes('lead')) return 'Senior';
    if (lower.includes('junior') || lower.includes('entry')) return 'Entry';
    return 'Mid-level';
  }

  private extractTags(description: string): string[] {
    if (!description) return [];
    
    const commonTags = [
      'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++',
      'AWS', 'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'Redis', 'GraphQL',
      'Machine Learning', 'AI', 'Data Science', 'DevOps', 'Frontend', 'Backend'
    ];

    return commonTags.filter(tag => 
      description.toLowerCase().includes(tag.toLowerCase())
    ).slice(0, 5);
  }

  private isAIRecommended(job: any): boolean {
    const keywords = ['ai', 'machine learning', 'data science', 'python', 'senior'];
    const text = `${job.title} ${job.description}`.toLowerCase();
    return keywords.some(keyword => text.includes(keyword));
  }
}

// USAJobs API integration
export class USAJobsAPI extends APIClient {
  private readonly apiKey: string;

  constructor() {
    super();
    const keys = getApiKeys();
    this.apiKey = keys.USAJOBS_API_KEY || '';

    if (!this.apiKey) {
      console.warn('USAJobs API key not configured');
    }
  }

  async searchJobs(params: SearchParams): Promise<APIResponse> {
    const startTime = Date.now();

    try {
      if (!this.apiKey) {
        return {
          success: false,
          error: 'API key not configured',
          source: 'USAJobs',
          executionTime: Date.now() - startTime
        };
      }

      const searchParams = new URLSearchParams({
        Keyword: params.query || 'software engineer',
        LocationName: params.location || 'United States',
        ResultsPerPage: '20'
      });

      const url = `https://data.usajobs.gov/api/search?${searchParams}`;
      
      const response = await this.makeRateLimitedRequest('USAJobs', 500, url, {
        headers: {
          'Authorization-Key': this.apiKey,
          'Host': 'data.usajobs.gov'
        }
      });
      
      const data = await response.json();

      const jobs: Job[] = data.SearchResult?.SearchResultItems?.map((result: any) => ({
        id: `usajobs-${result.MatchedObjectId}`,
        title: result.MatchedObjectDescriptor?.PositionTitle || 'Unknown Position',
        company: result.MatchedObjectDescriptor?.OrganizationName || 'Federal Government',
        location: result.MatchedObjectDescriptor?.PositionLocationDisplay || 'Multiple Locations',
        salary: result.MatchedObjectDescriptor?.PositionRemuneration?.[0]?.MinimumRange || undefined,
        type: 'Full-time',
        experience: this.mapExperienceLevel(result.MatchedObjectDescriptor?.QualificationSummary),
        tags: this.extractTags(result.MatchedObjectDescriptor?.QualificationSummary),
        datePosted: result.MatchedObjectDescriptor?.PublicationStartDate,
        description: result.MatchedObjectDescriptor?.QualificationSummary || '',
        url: result.MatchedObjectDescriptor?.PositionURI,
        source: { name: 'USAJobs', api: '', rateLimit: 500, priority: 2, enabled: true },
        isAIIRecommended: this.isAIRecommended(result)
      })) || [];

      return {
        success: true,
        data: jobs,
        source: 'USAJobs',
        executionTime: Date.now() - startTime
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'USAJobs',
        executionTime: Date.now() - startTime
      };
    }
  }

  private mapExperienceLevel(qualification: string): string {
    if (!qualification) return 'Mid-level';
    
    const lower = qualification.toLowerCase();
    if (lower.includes('senior') || lower.includes('lead')) return 'Senior';
    if (lower.includes('entry') || lower.includes('junior')) return 'Entry';
    return 'Mid-level';
  }

  private extractTags(qualification: string): string[] {
    if (!qualification) return [];
    
    const commonTags = [
      'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++',
      'AWS', 'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'Redis', 'GraphQL',
      'Machine Learning', 'AI', 'Data Science', 'DevOps', 'Frontend', 'Backend'
    ];

    return commonTags.filter(tag => 
      qualification.toLowerCase().includes(tag.toLowerCase())
    ).slice(0, 5);
  }

  private isAIRecommended(job: any): boolean {
    const keywords = ['ai', 'machine learning', 'data science', 'python', 'senior'];
    const text = `${job.MatchedObjectDescriptor?.PositionTitle} ${job.MatchedObjectDescriptor?.QualificationSummary}`.toLowerCase();
    return keywords.some(keyword => text.includes(keyword));
  }
}

// GitHub Jobs API integration
export class GitHubJobsAPI extends APIClient {
  async searchJobs(params: SearchParams): Promise<APIResponse> {
    const startTime = Date.now();

    try {
      const searchParams = new URLSearchParams({
        description: params.query || 'software engineer',
        location: params.location || 'United States',
        full_time: 'true'
      });

      const url = `https://jobs.github.com/positions.json?${searchParams}`;
      
      const response = await this.makeRateLimitedRequest('GitHub Jobs', 1000, url);
      const data = await response.json();

      const jobs: Job[] = data.map((result: any) => ({
        id: `github-${result.id}`,
        title: result.title,
        company: result.company || 'Unknown Company',
        location: result.location || 'Remote',
        type: result.type || 'Full-time',
        experience: this.mapExperienceLevel(result.title),
        tags: this.extractTags(result.description),
        datePosted: result.created_at,
        description: result.description,
        url: result.url,
        source: { name: 'GitHub Jobs', api: '', rateLimit: 1000, priority: 3, enabled: true },
        isAIIRecommended: this.isAIRecommended(result)
      }));

      return {
        success: true,
        data: jobs,
        source: 'GitHub Jobs',
        executionTime: Date.now() - startTime
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'GitHub Jobs',
        executionTime: Date.now() - startTime
      };
    }
  }

  private mapExperienceLevel(title: string): string {
    if (!title) return 'Mid-level';
    
    const lower = title.toLowerCase();
    if (lower.includes('senior') || lower.includes('lead')) return 'Senior';
    if (lower.includes('junior') || lower.includes('entry')) return 'Entry';
    return 'Mid-level';
  }

  private extractTags(description: string): string[] {
    if (!description) return [];
    
    const commonTags = [
      'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++',
      'AWS', 'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'Redis', 'GraphQL',
      'Machine Learning', 'AI', 'Data Science', 'DevOps', 'Frontend', 'Backend'
    ];

    return commonTags.filter(tag => 
      description.toLowerCase().includes(tag.toLowerCase())
    ).slice(0, 5);
  }

  private isAIRecommended(job: any): boolean {
    const keywords = ['ai', 'machine learning', 'data science', 'python', 'senior'];
    const text = `${job.title} ${job.description}`.toLowerCase();
    return keywords.some(keyword => text.includes(keyword));
  }
}

// Export API instances
export const adzunaAPI = new AdzunaAPI();
export const usajobsAPI = new USAJobsAPI();
export const githubJobsAPI = new GitHubJobsAPI(); 