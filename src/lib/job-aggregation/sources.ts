import { JobSource, RSSFeed } from './types';

// API-based job sources
export const jobSources: JobSource[] = [
  {
    name: 'Adzuna',
    api: 'https://api.adzuna.com/v1/api/jobs',
    rateLimit: 1000, // requests per hour
    priority: 1,
    enabled: true,
    baseUrl: 'https://api.adzuna.com/v1/api/jobs/gb/search/1'
  },
  {
    name: 'USAJobs',
    api: 'https://data.usajobs.gov/api/search',
    rateLimit: 500,
    priority: 2,
    enabled: true,
    baseUrl: 'https://data.usajobs.gov/api/search'
  },
  {
    name: 'GitHub Jobs',
    api: 'https://jobs.github.com/positions.json',
    rateLimit: 1000,
    priority: 3,
    enabled: true,
    baseUrl: 'https://jobs.github.com/positions.json'
  },
  {
    name: 'LinkedIn',
    api: 'https://api.linkedin.com/v2/jobs',
    rateLimit: 100,
    priority: 4,
    enabled: false, // Requires partnership
    baseUrl: 'https://api.linkedin.com/v2/jobs'
  }
];

// RSS feeds from company career pages
export const rssFeeds: RSSFeed[] = [
  {
    name: 'Google Careers',
    url: 'https://careers.google.com/feed/',
    enabled: true,
    company: 'Google'
  },
  {
    name: 'Microsoft Careers',
    url: 'https://careers.microsoft.com/feed/',
    enabled: true,
    company: 'Microsoft'
  },
  {
    name: 'Apple Careers',
    url: 'https://jobs.apple.com/feed/',
    enabled: true,
    company: 'Apple'
  },
  {
    name: 'Netflix Jobs',
    url: 'https://jobs.netflix.com/feed/',
    enabled: true,
    company: 'Netflix'
  },
  {
    name: 'Spotify Jobs',
    url: 'https://jobs.spotify.com/feed/',
    enabled: true,
    company: 'Spotify'
  },
  {
    name: 'Stripe Jobs',
    url: 'https://stripe.com/jobs/feed',
    enabled: true,
    company: 'Stripe'
  },
  {
    name: 'Airbnb Careers',
    url: 'https://careers.airbnb.com/feed/',
    enabled: true,
    company: 'Airbnb'
  },
  {
    name: 'Uber Jobs',
    url: 'https://www.uber.com/careers/feed/',
    enabled: true,
    company: 'Uber'
  },
  {
    name: 'Twitter Careers',
    url: 'https://careers.twitter.com/feed/',
    enabled: true,
    company: 'Twitter'
  },
  {
    name: 'Meta Careers',
    url: 'https://www.metacareers.com/feed/',
    enabled: true,
    company: 'Meta'
  }
];

// Mock data for development and testing
export const mockJobs = [
  {
    id: '1',
    title: 'Senior AI Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    type: 'Full-time',
    experience: 'Senior',
    tags: ['AI', 'Machine Learning', 'Python', 'Remote'],
    datePosted: '2024-01-15',
    description: 'Join our AI team to build cutting-edge machine learning models.',
    source: { name: 'Mock', api: '', rateLimit: 0, priority: 0, enabled: true },
    isAIIRecommended: true
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    salary: '$80,000 - $120,000',
    type: 'Full-time',
    experience: 'Mid-level',
    tags: ['React', 'TypeScript', 'Remote'],
    datePosted: '2024-01-14',
    description: 'Build beautiful user interfaces with modern web technologies.',
    source: { name: 'Mock', api: '', rateLimit: 0, priority: 0, enabled: true },
    isAIIRecommended: false
  }
];

// Environment variables for API keys
export const getApiKeys = () => ({
  ADZUNA_APP_ID: process.env.ADZUNA_APP_ID,
  ADZUNA_APP_KEY: process.env.ADZUNA_APP_KEY,
  USAJOBS_API_KEY: process.env.USAJOBS_API_KEY,
  LINKEDIN_ACCESS_TOKEN: process.env.LINKEDIN_ACCESS_TOKEN
}); 