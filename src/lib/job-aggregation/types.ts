export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type?: string;
  experience?: string;
  tags: string[];
  datePosted: string;
  description: string;
  url?: string;
  source: JobSource;
  isAIIRecommended?: boolean;
  logo?: string;
  companyWebsite?: string;
  companySize?: string;
  companyIndustry?: string;
  remote?: string;
  equity?: string;
  requirements?: string[];
  benefits?: string[];
  applicationsCount?: number;
  viewsCount?: number;
}

export interface JobSource {
  name: string;
  api: string;
  rateLimit: number;
  priority: number;
  enabled: boolean;
  apiKey?: string;
  baseUrl?: string;
}

export interface SearchParams {
  query?: string;
  location?: string;
  radius?: number;
  salaryRange?: string;
  jobType?: string;
  experienceLevel?: string;
  remote?: boolean;
  limit?: number;
  page?: number;
}

export interface JobCache {
  jobs: Map<string, Job>;
  lastUpdated: Date;
  ttl: number; // Time to live in milliseconds
}

export interface JobAggregationResult {
  jobs: Job[];
  total: number;
  sources: string[];
  cacheHit: boolean;
  executionTime: number;
}

export interface UserSubmittedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type?: string;
  experience?: string;
  tags: string[];
  description: string;
  contactEmail: string;
  companyWebsite?: string;
  verified: boolean;
  submittedAt: Date;
  submittedBy: string;
}

export interface JobAlert {
  id: string;
  userId: string;
  keywords: string[];
  location?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  sources: string[];
  active: boolean;
  createdAt: Date;
  lastSent?: Date;
}

export interface RSSFeed {
  name: string;
  url: string;
  enabled: boolean;
  lastFetched?: Date;
  company?: string;
}

export interface APIResponse {
  success: boolean;
  data?: any;
  error?: string;
  source: string;
  executionTime: number;
} 