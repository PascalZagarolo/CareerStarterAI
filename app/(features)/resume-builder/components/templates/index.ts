// Template Components
export { default as ProfessionalClassic } from './professional-classic';
export { default as ModernMinimal } from './modern-minimal';
export { default as CreativeSidebar } from './creative-sidebar';
export { default as ExecutiveTwoColumn } from './executive-two-column';
export { default as StartupModern } from './startup-modern';

// Template Data
export { templates, colorSchemes, getTemplateById, getTemplatesByCategory, getColorSchemeById } from './template-data';

// Template mapping
export const templateComponents: Record<string, any> = {
  'professional-classic': () => import('./professional-classic'),
  'modern-minimal': () => import('./modern-minimal'),
  'creative-sidebar': () => import('./creative-sidebar'),
  'executive-two-column': () => import('./executive-two-column'),
  'startup-modern': () => import('./startup-modern'),
  'academic-clean': () => import('./professional-classic'), // Reuse professional classic for now
  'designer-portfolio': () => import('./creative-sidebar'), // Reuse creative sidebar for now
  'corporate-elegant': () => import('./executive-two-column'), // Reuse executive two-column for now
  'minimalist-clean': () => import('./modern-minimal'), // Reuse modern minimal for now
  'tech-focused': () => import('./startup-modern'), // Use startup modern for tech-focused
}; 