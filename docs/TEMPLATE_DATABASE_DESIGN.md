# Template Database Design

This document outlines the comprehensive database design for storing resume templates and related data in the CareerStarter AI application.

## Overview

The template system uses a **normalized relational database design** with separate tables for templates, categories, color schemes, and user resumes. This approach provides flexibility, maintainability, and efficient querying capabilities.

## Database Schema

### 1. Template Categories (`template_categories`)

Stores the main categories of templates (Professional, Creative, Modern, Classic, Minimal).

```sql
CREATE TABLE template_categories (
  id TEXT PRIMARY KEY,                    -- 'professional', 'creative', etc.
  name TEXT NOT NULL,                     -- Display name
  description TEXT,                       -- Category description
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

### 2. Templates (`templates`)

Stores the main template information including layout, styling, and subscription requirements.

```sql
CREATE TABLE templates (
  id TEXT PRIMARY KEY,                    -- 'professional-classic', 'modern-minimal'
  name TEXT NOT NULL,                     -- Display name
  description TEXT NOT NULL,              -- Template description
  category_id TEXT NOT NULL REFERENCES template_categories(id),
  layout TEXT NOT NULL,                   -- 'single-column', 'two-column', 'sidebar', 'header-focused'
  font_family TEXT NOT NULL,              -- 'Inter', 'Poppins', 'Times New Roman'
  font_size TEXT NOT NULL,                -- '12px', '14px'
  spacing TEXT NOT NULL,                  -- 'compact', 'standard', 'spacious'
  thumbnail TEXT NOT NULL,                -- Path to thumbnail image
  plan TEXT NOT NULL,                     -- 'free', 'premium', 'professional'
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

### 3. Color Schemes (`color_schemes`)

Stores color schemes for each template, allowing multiple color variations per template.

```sql
CREATE TABLE color_schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id TEXT NOT NULL REFERENCES templates(id),
  name TEXT NOT NULL,                     -- 'Navy Blue', 'Forest Green'
  primary TEXT NOT NULL,                  -- Hex color codes
  secondary TEXT NOT NULL,
  accent TEXT NOT NULL,
  background TEXT NOT NULL,
  text TEXT NOT NULL,
  border TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

### 4. User Resumes (`user_resumes`)

Stores user-created resumes with their template and color scheme selections.

```sql
CREATE TABLE user_resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  template_id TEXT NOT NULL REFERENCES templates(id),
  color_scheme_id UUID NOT NULL REFERENCES color_schemes(id),
  name TEXT NOT NULL,                     -- User-defined resume name
  data TEXT NOT NULL,                     -- JSON string of resume content
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

## Key Benefits of This Design

### 1. **Normalization**
- Eliminates data redundancy
- Ensures data consistency
- Reduces storage requirements
- Makes updates easier and safer

### 2. **Flexibility**
- Easy to add new templates without code changes
- Simple to modify color schemes
- Can add new categories dynamically
- Supports template versioning

### 3. **Performance**
- Efficient queries with proper indexing
- Fast template lookups by category/plan
- Optimized joins for related data
- Scalable for large template libraries

### 4. **Maintainability**
- Clear separation of concerns
- Easy to understand relationships
- Simple to extend with new features
- Database-driven configuration

### 5. **User Experience**
- Fast template loading
- Efficient color scheme switching
- Quick resume saving/loading
- Seamless template browsing

## Relationships

```
template_categories (1) ←→ (N) templates
templates (1) ←→ (N) color_schemes
templates (1) ←→ (N) user_resumes
users (1) ←→ (N) user_resumes
color_schemes (1) ←→ (N) user_resumes
```

## Usage Examples

### Fetching Templates by Category
```typescript
const professionalTemplates = await TemplateService.getTemplatesByCategory('professional');
```

### Getting Template with Color Schemes
```typescript
const template = await TemplateService.getTemplateById('professional-classic');
// Returns template with all its color schemes
```

### Filtering by Subscription Plan
```typescript
const freeTemplates = await TemplateService.getTemplatesByPlan('free');
```

### Saving User Resume
```typescript
const resume = await TemplateService.saveUserResume({
  userId: 'user-uuid',
  templateId: 'professional-classic',
  colorSchemeId: 'color-scheme-uuid',
  name: 'My Professional Resume',
  data: JSON.stringify(resumeData),
  isPublic: false
});
```

## Migration Strategy

### 1. **Database Migration**
```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 2. **Data Seeding**
```bash
npx tsx src/db/seed-templates.ts
```

### 3. **API Integration**
- Replace static template imports with database queries
- Update frontend to use new API endpoints
- Implement caching for performance

## API Endpoints

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates?category=professional` - Get templates by category
- `GET /api/templates?plan=free` - Get templates by subscription plan
- `GET /api/templates/[id]` - Get specific template with color schemes

### Categories
- `GET /api/templates/categories` - Get all template categories

### User Resumes
- `GET /api/resumes` - Get user's saved resumes
- `POST /api/resumes` - Save new resume
- `PUT /api/resumes/[id]` - Update existing resume
- `DELETE /api/resumes/[id]` - Delete resume

## Performance Considerations

### 1. **Indexing Strategy**
- Primary keys on all tables
- Foreign key indexes for joins
- Composite indexes for common queries
- Text indexes for search functionality

### 2. **Caching**
- Template metadata caching
- Color scheme caching
- User resume caching
- CDN for thumbnail images

### 3. **Query Optimization**
- Efficient joins with proper indexing
- Pagination for large result sets
- Selective field loading
- Connection pooling

## Security Considerations

### 1. **Data Validation**
- Input sanitization for all user data
- JSON schema validation for resume data
- SQL injection prevention with parameterized queries

### 2. **Access Control**
- User authentication for resume operations
- Authorization checks for template access
- Plan-based template restrictions

### 3. **Data Privacy**
- User resume data isolation
- Public/private resume controls
- Secure data transmission

## Future Enhancements

### 1. **Template Analytics**
- Usage tracking per template
- Popular color schemes
- User preference analysis

### 2. **Advanced Features**
- Template customization options
- Custom color scheme creation
- Template sharing and collaboration

### 3. **Performance Improvements**
- Database query optimization
- Advanced caching strategies
- CDN integration for assets

## Conclusion

This database design provides a robust, scalable, and maintainable foundation for the template system. It supports current requirements while enabling future enhancements and ensuring optimal performance for users. 