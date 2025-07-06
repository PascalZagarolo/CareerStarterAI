# Job Search Page

A modern, responsive job search page with comprehensive filtering and search capabilities.

## Features

### 🔍 Search Functionality
- **AI-Powered Search Bar**: Dynamic suggestions based on job titles and skills
- **Real-time Filtering**: Results update as you type
- **Multi-field Search**: Search by job title, company name, or skills/tags

### 🎯 Advanced Filters
- **Location Filter**: Filter by specific cities and states
- **Salary Range**: Filter by salary brackets ($50k-$80k, $80k-$120k, etc.)
- **Job Type**: Remote, On-site, or Hybrid positions
- **Experience Level**: Entry, Mid-level, Senior, or Lead positions
- **Clear All Filters**: One-click reset of all applied filters

### 💼 Job Cards
Each job card displays:
- **Company Logo/Initial**: Visual company identification
- **Job Title**: Clear, prominent display
- **Company Name**: With building icon
- **Location**: With map pin icon
- **Salary Range**: With dollar sign icon
- **Job Description**: Truncated with line-clamp
- **Tags**: Skills and job characteristics
- **Date Posted**: Relative time (e.g., "2 days ago")
- **AI Recommended Badge**: Special highlighting for AI-recommended jobs
- **Save/Bookmark**: Toggle to save jobs for later

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Sticky Filters**: Filters sidebar stays accessible on desktop
- **Touch-Friendly**: Large touch targets for mobile users
- **Clean Layout**: Modern, accessible design with consistent spacing

### ⚡ Performance Features
- **Loading Skeletons**: Smooth loading experience with placeholder cards
- **Pagination**: Load jobs in manageable chunks (6 per page)
- **Empty States**: Helpful messaging when no jobs match criteria
- **Smooth Transitions**: Animated state changes and hover effects

### 🎨 Visual Enhancements
- **Gradient Logos**: Fallback company initials with gradient backgrounds
- **Hover Effects**: Subtle animations on job cards and buttons
- **Color-Coded Tags**: Different badge styles for different tag types
- **Icon Integration**: Lucide React icons throughout the interface

## Technical Implementation

### State Management
- React hooks for local state management
- Filtered results computed from search query and filter criteria
- Pagination handled with slice operations

### Data Structure
```typescript
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  tags: string[];
  datePosted: string;
  logo: string;
  isAIIRecommended: boolean;
  description: string;
}
```

### Key Components
- **Search Bar**: With AI suggestions dropdown
- **Filter Sidebar**: Collapsible on mobile, sticky on desktop
- **Job Cards**: Reusable component with all job information
- **Pagination**: Previous/Next with page numbers
- **Loading States**: Skeleton placeholders
- **Empty State**: When no jobs match criteria

## Future Enhancements

### Planned Features
- **Real API Integration**: Replace mock data with actual job APIs
- **Advanced Search**: Boolean operators and complex queries
- **Job Alerts**: Email notifications for new matching jobs
- **Application Tracking**: Track applied jobs and status
- **Company Profiles**: Detailed company information pages
- **Salary Insights**: Market data and salary comparisons
- **Interview Prep**: AI-powered interview preparation tools

### Technical Improvements
- **Server-Side Rendering**: For better SEO and performance
- **Caching**: Redis or similar for job data caching
- **Real-time Updates**: WebSocket integration for live job updates
- **Analytics**: Track search patterns and job interactions
- **A/B Testing**: Test different UI variations

## Usage

The job search page is accessible at `/job-search` and integrates seamlessly with the existing CareerStarter platform. Users can:

1. **Search**: Type in the search bar to find jobs
2. **Filter**: Use the sidebar filters to narrow results
3. **Browse**: Scroll through job cards with pagination
4. **Save**: Bookmark interesting jobs for later review
5. **Apply**: Click through to job details (future feature)

The page is fully responsive and provides an excellent user experience across all devices. 