/**
 * Formats a link for display in resume templates
 * @param url - The URL to format
 * @param displayText - Optional display text (defaults to the URL)
 * @returns Formatted link text
 */
export function formatLink(url: string, displayText?: string): string {
  if (!url) return '';
  
  // Use display text if provided, otherwise use the URL
  return displayText || url;
}

/**
 * Formats LinkedIn URL for display
 * @param linkedinUrl - LinkedIn URL
 * @returns Display text for LinkedIn
 */
export function formatLinkedInLink(linkedinUrl: string): string {
  if (!linkedinUrl) return '';
  
  // Extract username from LinkedIn URL
  const username = linkedinUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '');
  const displayText = username ? `LinkedIn` : linkedinUrl;
  
  return formatLink(linkedinUrl, displayText);
}

/**
 * Formats Portfolio URL for display
 * @param portfolioUrl - Portfolio URL
 * @returns Display text for Portfolio
 */
export function formatPortfolioLink(portfolioUrl: string): string {
  if (!portfolioUrl) return '';
  
  // Extract domain from portfolio URL
  const domain = portfolioUrl.replace(/^https?:\/\/(www\.)?/, '');
  const displayText = domain ? `Portfolio` : portfolioUrl;
  
  return formatLink(portfolioUrl, displayText);
}

/**
 * Ensures URL has proper protocol
 * @param url - The URL to format
 * @returns URL with https protocol
 */
export function ensureHttps(url: string): string {
  if (!url) return '';
  return url.startsWith('http') ? url : `https://${url}`;
} 