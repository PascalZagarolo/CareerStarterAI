# Dashboard Components

This directory contains all the modular components for the dashboard page. Each component is designed to be reusable, maintainable, and follows the professional design system.

## Component Structure

### Core Components

#### `DashboardHeader`
- **Purpose**: Displays the main dashboard header with greeting and action buttons
- **Props**: `userName: string`
- **Features**: Dynamic greeting based on time of day, current date display, notification and settings buttons

#### `StatsOverview`
- **Purpose**: Displays the main dashboard statistics cards
- **Props**: `stats: DashboardStats`
- **Features**: Total applications, response rate, interviews, and offers with trend indicators

#### `ResumeManagement`
- **Purpose**: Manages resume listing, search, and actions
- **Props**: `resumes: UserResume[]`, `loading: boolean`, `onDeleteResume: (id: string) => void`
- **Features**: Search functionality, filter options, professional resume cards with actions

#### `QuickActions`
- **Purpose**: Provides shortcuts to main features
- **Props**: `resumeCount: number`
- **Features**: Resume builder and career path finder quick access

#### `AccountOverview`
- **Purpose**: Displays user information and account statistics
- **Props**: `user: User`, `stats?: DashboardStats | null`, `resumeCount: number`
- **Features**: User profile, account status, member since, usage statistics

### Utility Components

#### `DashboardSkeleton`
- **Purpose**: Loading state for the entire dashboard
- **Props**: None
- **Features**: Professional skeleton loading with proper spacing and animations

#### `AuthRequired`
- **Purpose**: Authentication required state
- **Props**: None
- **Features**: Clean authentication prompt with sign in/sign up options

## Usage

```tsx
import { 
  DashboardHeader,
  StatsOverview,
  ResumeManagement,
  QuickActions,
  AccountOverview,
  DashboardSkeleton,
  AuthRequired
} from '../components';

// In your dashboard page
export default function Dashboard() {
  // ... hooks and logic

  if (loading) return <DashboardSkeleton />;
  if (!user) return <AuthRequired />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <DashboardHeader userName={user.name} />
      {stats && <StatsOverview stats={stats} />}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ResumeManagement 
            resumes={resumes}
            loading={resumesLoading}
            onDeleteResume={handleDeleteResume}
          />
          <QuickActions resumeCount={resumes.length} />
        </div>
        
        <div className="space-y-8">
          <AccountOverview 
            user={user}
            stats={stats}
            resumeCount={resumes.length}
          />
        </div>
      </div>
    </div>
  );
}
```

## Design Principles

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components are designed to be reused across different contexts
3. **Type Safety**: All components use TypeScript interfaces for props
4. **Professional Design**: Consistent with the million-dollar SaaS aesthetic
5. **Loading States**: Each component handles its own loading states appropriately
6. **Error Handling**: Graceful error handling and fallback states

## File Structure

```
components/
├── index.ts                 # Export all components
├── README.md               # This documentation
├── dashboard-header.tsx    # Main dashboard header
├── stats-overview.tsx      # Statistics cards
├── resume-management.tsx   # Resume listing and management
├── quick-actions.tsx       # Quick action buttons
├── account-overview.tsx    # User account information
├── dashboard-skeleton.tsx  # Loading skeleton
└── auth-required.tsx       # Authentication required state
```

## Benefits of This Structure

1. **Maintainability**: Easy to find and modify specific functionality
2. **Testability**: Each component can be tested in isolation
3. **Performance**: Components can be optimized individually
4. **Scalability**: Easy to add new components or modify existing ones
5. **Code Reuse**: Components can be used in other parts of the application
6. **Team Collaboration**: Multiple developers can work on different components simultaneously 