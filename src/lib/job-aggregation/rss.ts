import { Job, RSSFeed, APIResponse } from './types';
import { rssFeeds } from './sources';

// Simple RSS parser for company career feeds
export class RSSParser {
  private async fetchRSSFeed(url: string): Promise<string> {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'CareerStarter-AI/1.0',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch RSS feed: ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      console.error(`Error fetching RSS feed from ${url}:`, error);
      throw error;
    }
  }

  private parseRSSContent(content: string): any[] {
    try {
      // Simple XML parsing - in production, use a proper XML parser
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(content, 'text/xml');
      
      const items = xmlDoc.querySelectorAll('item');
      const jobs: any[] = [];

      items.forEach(item => {
        const title = item.querySelector('title')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const company = item.querySelector('company')?.textContent || '';

        if (title && description) {
          jobs.push({
            title,
            description,
            link,
            pubDate,
            company
          });
        }
      });

      return jobs;
    } catch (error) {
      console.error('Error parsing RSS content:', error);
      return [];
    }
  }

  private extractTags(description: string): string[] {
    if (!description) return [];
    
    const commonTags = [
      'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++',
      'AWS', 'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'Redis', 'GraphQL',
      'Machine Learning', 'AI', 'Data Science', 'DevOps', 'Frontend', 'Backend',
      'Remote', 'Full-time', 'Part-time', 'Contract', 'Senior', 'Junior', 'Lead'
    ];

    return commonTags.filter(tag => 
      description.toLowerCase().includes(tag.toLowerCase())
    ).slice(0, 5);
  }

  private mapExperienceLevel(title: string): string {
    if (!title) return 'Mid-level';
    
    const lower = title.toLowerCase();
    if (lower.includes('senior') || lower.includes('lead') || lower.includes('principal')) return 'Senior';
    if (lower.includes('junior') || lower.includes('entry') || lower.includes('associate')) return 'Entry';
    return 'Mid-level';
  }

  private isAIRecommended(job: any): boolean {
    const keywords = ['ai', 'machine learning', 'data science', 'python', 'senior', 'ml'];
    const text = `${job.title} ${job.description}`.toLowerCase();
    return keywords.some(keyword => text.includes(keyword));
  }

  async parseFeed(feed: RSSFeed): Promise<APIResponse> {
    const startTime = Date.now();

    try {
      const content = await this.fetchRSSFeed(feed.url);
      const rawJobs = this.parseRSSContent(content);

      const jobs: Job[] = rawJobs.map((rawJob, index) => ({
        id: `rss-${feed.name}-${index}`,
        title: rawJob.title,
        company: rawJob.company || feed.company || 'Unknown Company',
        location: this.extractLocation(rawJob.description) || 'Remote',
        type: this.extractJobType(rawJob.description) || 'Full-time',
        experience: this.mapExperienceLevel(rawJob.title),
        tags: this.extractTags(rawJob.description),
        datePosted: rawJob.pubDate || new Date().toISOString(),
        description: rawJob.description,
        url: rawJob.link,
        source: { name: `RSS-${feed.name}`, api: '', rateLimit: 100, priority: 5, enabled: true },
        isAIIRecommended: this.isAIRecommended(rawJob)
      }));

      return {
        success: true,
        data: jobs,
        source: `RSS-${feed.name}`,
        executionTime: Date.now() - startTime
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: `RSS-${feed.name}`,
        executionTime: Date.now() - startTime
      };
    }
  }

  private extractLocation(description: string): string {
    if (!description) return 'Remote';
    
    const locationPatterns = [
      /(?:in|at|based in|location:?)\s+([A-Z][a-z]+(?:\s*,\s*[A-Z]{2})?)/i,
      /([A-Z][a-z]+(?:\s*,\s*[A-Z]{2})?)/i
    ];

    for (const pattern of locationPatterns) {
      const match = description.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return 'Remote';
  }

  private extractJobType(description: string): string {
    if (!description) return 'Full-time';
    
    const lower = description.toLowerCase();
    if (lower.includes('part-time') || lower.includes('part time')) return 'Part-time';
    if (lower.includes('contract') || lower.includes('freelance')) return 'Contract';
    if (lower.includes('internship') || lower.includes('intern')) return 'Internship';
    return 'Full-time';
  }
}

// RSS Aggregator that fetches from multiple feeds
export class RSSAggregator {
  private parser: RSSParser;
  private enabledFeeds: RSSFeed[];

  constructor() {
    this.parser = new RSSParser();
    this.enabledFeeds = rssFeeds.filter(feed => feed.enabled);
  }

  async aggregateJobs(): Promise<Job[]> {
    const allJobs: Job[] = [];
    const promises = this.enabledFeeds.map(async (feed) => {
      try {
        const result = await this.parser.parseFeed(feed);
        if (result.success && result.data) {
          allJobs.push(...result.data);
        }
      } catch (error) {
        console.error(`Error aggregating from ${feed.name}:`, error);
      }
    });

    await Promise.allSettled(promises);
    return allJobs;
  }

  async getJobsFromFeed(feedName: string): Promise<Job[]> {
    const feed = this.enabledFeeds.find(f => f.name === feedName);
    if (!feed) {
      throw new Error(`Feed ${feedName} not found or disabled`);
    }

    const result = await this.parser.parseFeed(feed);
    return result.success ? result.data || [] : [];
  }

  getEnabledFeeds(): RSSFeed[] {
    return this.enabledFeeds;
  }

  async updateFeedStatus(feedName: string, enabled: boolean): Promise<void> {
    const feed = this.enabledFeeds.find(f => f.name === feedName);
    if (feed) {
      feed.enabled = enabled;
      feed.lastFetched = new Date();
    }
  }
}

// Export instances
export const rssAggregator = new RSSAggregator();
export const rssParser = new RSSParser(); 