# Link Formatter Utility

This utility provides functions to format LinkedIn and Portfolio links for display in resume templates with proper clickable links and icons.

## Functions

### `formatLink(url: string, displayText?: string): string`

Returns the display text for a link, defaulting to the URL if no display text is provided.

- **url**: The URL to format
- **displayText**: Optional display text (defaults to the URL)
- **Returns**: Display text string

### `formatLinkedInLink(linkedinUrl: string): string`

Formats LinkedIn URLs for display:
- Extracts username from LinkedIn URLs
- Returns "LinkedIn" for standard LinkedIn URLs
- Falls back to full URL for non-standard URLs

### `formatPortfolioLink(portfolioUrl: string): string`

Formats Portfolio URLs for display:
- Extracts domain from portfolio URLs
- Returns "Portfolio" for standard URLs
- Falls back to full URL for non-standard URLs

### `ensureHttps(url: string): string`

Ensures a URL has the proper https protocol.

- **url**: The URL to format
- **Returns**: URL with https protocol

## Usage Examples

```typescript
import { formatLinkedInLink, formatPortfolioLink, ensureHttps } from '../utils/link-formatter';
import { Linkedin, Globe, ExternalLink } from 'lucide-react';

// LinkedIn formatting
formatLinkedInLink('linkedin.com/in/johndoe')
// Returns: "LinkedIn"

// Portfolio formatting
formatPortfolioLink('johndoe.dev')
// Returns: "Portfolio"

// URL with protocol
ensureHttps('example.com')
// Returns: "https://example.com"
```

## Implementation

All resume templates now display LinkedIn and Portfolio links as clickable elements with:
- **Icons**: LinkedIn icon for LinkedIn links, Globe icon for Portfolio links
- **Clean Text**: Shows "LinkedIn" and "Portfolio" instead of full URLs
- **Clickable Links**: Proper `<a>` tags with hover effects
- **External Link Indicators**: Small external link icons to indicate they open in new tabs
- **Proper Styling**: Consistent with each template's color scheme

### Example Implementation

```tsx
{personalInfo.linkedin && (
  <div className="flex items-center">
    <Linkedin className="w-3 h-3 mr-1" />
    <a 
      href={ensureHttps(personalInfo.linkedin)}
      className="hover:underline transition-colors flex items-center gap-1"
      target="_blank"
      rel="noopener noreferrer"
    >
      {formatLinkedInLink(personalInfo.linkedin)}
      <ExternalLink className="w-2 h-2" />
    </a>
  </div>
)}
```

This creates a clean, professional appearance where users see just "LinkedIn" with an icon, but the link is fully functional and opens the actual LinkedIn profile. 