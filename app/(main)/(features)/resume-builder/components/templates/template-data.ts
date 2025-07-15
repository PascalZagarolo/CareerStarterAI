import { Template, ColorScheme } from '../types';

export const colorSchemes: Record<string, ColorScheme[]> = {
  professional: [
    {
      id: 'navy-blue',
      name: 'Navy Blue',
      primary: '#1e3a8a',
      secondary: '#3b82f6',
      accent: '#60a5fa',
      background: '#ffffff',
      text: '#1f2937',
      border: '#e5e7eb'
    },
    {
      id: 'forest-green',
      name: 'Forest Green',
      primary: '#166534',
      secondary: '#22c55e',
      accent: '#4ade80',
      background: '#ffffff',
      text: '#1f2937',
      border: '#e5e7eb'
    },
    {
      id: 'burgundy',
      name: 'Burgundy',
      primary: '#991b1b',
      secondary: '#dc2626',
      accent: '#ef4444',
      background: '#ffffff',
      text: '#1f2937',
      border: '#e5e7eb'
    }
  ],
  modern: [
    {
      id: 'slate-gray',
      name: 'Slate Gray',
      primary: '#475569',
      secondary: '#64748b',
      accent: '#94a3b8',
      background: '#ffffff',
      text: '#1f2937',
      border: '#e2e8f0'
    },
    {
      id: 'indigo-purple',
      name: 'Indigo Purple',
      primary: '#4338ca',
      secondary: '#6366f1',
      accent: '#8b5cf6',
      background: '#ffffff',
      text: '#1f2937',
      border: '#e2e8f0'
    },
    {
      id: 'teal-cyan',
      name: 'Teal Cyan',
      primary: '#0f766e',
      secondary: '#14b8a6',
      accent: '#06b6d4',
      background: '#ffffff',
      text: '#1f2937',
      border: '#e2e8f0'
    }
  ],
  creative: [
    {
      id: 'coral-orange',
      name: 'Coral Orange',
      primary: '#ea580c',
      secondary: '#f97316',
      accent: '#fb923c',
      background: '#ffffff',
      text: '#1f2937',
      border: '#fef3c7'
    },
    {
      id: 'emerald-green',
      name: 'Emerald Green',
      primary: '#059669',
      secondary: '#10b981',
      accent: '#34d399',
      background: '#ffffff',
      text: '#1f2937',
      border: '#d1fae5'
    },
    {
      id: 'violet-purple',
      name: 'Violet Purple',
      primary: '#7c3aed',
      secondary: '#8b5cf6',
      accent: '#a78bfa',
      background: '#ffffff',
      text: '#1f2937',
      border: '#ede9fe'
    },
    {
      id: 'ocean-blue',
      name: 'Ocean Blue',
      primary: '#2563eb',
      secondary: '#3b82f6',
      accent: '#60a5fa',
      background: '#ffffff',
      text: '#1f2937',
      border: '#dbeafe'
    }
  ],
  classic: [
    {
      id: 'charcoal-black',
      name: 'Charcoal Black',
      primary: '#111827',
      secondary: '#374151',
      accent: '#6b7280',
      background: '#ffffff',
      text: '#111827',
      border: '#d1d5db'
    },
    {
      id: 'deep-brown',
      name: 'Deep Brown',
      primary: '#92400e',
      secondary: '#b45309',
      accent: '#d97706',
      background: '#ffffff',
      text: '#111827',
      border: '#d1d5db'
    },
    {
      id: 'steel-blue',
      name: 'Steel Blue',
      primary: '#1e40af',
      secondary: '#2563eb',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#111827',
      border: '#d1d5db'
    }
  ],
  minimal: [
    {
      id: 'pure-black',
      name: 'Pure Black',
      primary: '#000000',
      secondary: '#374151',
      accent: '#6b7280',
      background: '#ffffff',
      text: '#000000',
      border: '#e5e7eb'
    },
    {
      id: 'soft-gray',
      name: 'Soft Gray',
      primary: '#6b7280',
      secondary: '#9ca3af',
      accent: '#d1d5db',
      background: '#ffffff',
      text: '#374151',
      border: '#f3f4f6'
    },
    {
      id: 'warm-beige',
      name: 'Warm Beige',
      primary: '#a16207',
      secondary: '#d97706',
      accent: '#fbbf24',
      background: '#ffffff',
      text: '#374151',
      border: '#fef3c7'
    }
  ]
};

export const templates: Template[] = [
  {
    id: 'professional-classic',
    name: 'Professional Classic',
    description: 'Clean and traditional layout perfect for corporate environments',
    categoryId: 'professional',
    category: 'professional',
    layout: 'single-column',
    colorSchemes: colorSchemes.professional,
    fontFamily: 'Inter',
    fontSize: '14px',
    spacing: 'standard',
    thumbnail: '/images/templates/professional-classic.png',
    plan: 'free'
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Sleek and contemporary design with plenty of white space',
    categoryId: 'modern',
    category: 'modern',
    layout: 'single-column',
    colorSchemes: colorSchemes.modern,
    fontFamily: 'Inter',
    fontSize: '14px',
    spacing: 'spacious',
    thumbnail: '/images/templates/modern-minimal.png',
    plan: 'free'
  },
  {
    id: 'creative-sidebar',
    name: 'Creative Sidebar',
    description: 'Bold design with sidebar layout for creative professionals',
    categoryId: 'creative',
    category: 'creative',
    layout: 'sidebar',
    colorSchemes: colorSchemes.creative,
    fontFamily: 'Poppins',
    fontSize: '14px',
    spacing: 'standard',
    thumbnail: '/images/templates/creative-sidebar.png',
    plan: 'free'
  },
  {
    id: 'startup-modern',
    name: 'Startup Modern',
    description: 'Fresh and innovative design for tech and startup professionals',
    categoryId: 'modern',
    category: 'modern',
    layout: 'header-focused',
    colorSchemes: colorSchemes.modern,
    fontFamily: 'Inter',
    fontSize: '14px',
    spacing: 'standard',
    thumbnail: '/images/templates/startup-modern.png',
    plan: 'premium'
  },
  {
    id: 'academic-clean',
    name: 'Academic Clean',
    description: 'Structured layout ideal for academic and research positions',
    categoryId: 'classic',
    category: 'classic',
    layout: 'single-column',
    colorSchemes: colorSchemes.classic,
    fontFamily: 'Times New Roman',
    fontSize: '12px',
    spacing: 'compact',
    thumbnail: '/images/templates/academic-clean.png',
    plan: 'premium'
  },
  {
    id: 'designer-portfolio',
    name: 'Designer Portfolio',
    description: 'Visually striking design for creative and design professionals',
    categoryId: 'creative',
    category: 'creative',
    layout: 'sidebar',
    colorSchemes: colorSchemes.creative,
    fontFamily: 'Poppins',
    fontSize: '14px',
    spacing: 'spacious',
    thumbnail: '/images/templates/designer-portfolio.png',
    plan: 'premium'
  },
  {
    id: 'minimalist-clean',
    name: 'Minimalist Clean',
    description: 'Ultra-clean design with maximum readability',
    categoryId: 'minimal',
    category: 'minimal',
    layout: 'single-column',
    colorSchemes: colorSchemes.minimal,
    fontFamily: 'Inter',
    fontSize: '14px',
    spacing: 'spacious',
    thumbnail: '/images/templates/minimalist-clean.png',
    plan: 'premium'
  },
  {
    id: 'executive-two-column',
    name: 'Executive Two-Column',
    description: 'Sophisticated two-column layout for senior professionals',
    categoryId: 'professional',
    category: 'professional',
    layout: 'two-column',
    colorSchemes: colorSchemes.classic,
    fontFamily: 'Merriweather',
    fontSize: '13px',
    spacing: 'compact',
    thumbnail: '/images/templates/executive-two-column.png',
    plan: 'professional'
  },
  {
    id: 'corporate-elegant',
    name: 'Corporate Elegant',
    description: 'Refined and sophisticated design for corporate leadership',
    categoryId: 'professional',
    category: 'professional',
    layout: 'two-column',
    colorSchemes: colorSchemes.professional,
    fontFamily: 'Merriweather',
    fontSize: '13px',
    spacing: 'standard',
    thumbnail: '/images/templates/corporate-elegant.png',
    plan: 'professional'
  },
  {
    id: 'tech-focused',
    name: 'Tech Focused',
    description: 'Modern design optimized for technology and engineering roles',
    categoryId: 'modern',
    category: 'modern',
    layout: 'header-focused',
    colorSchemes: colorSchemes.modern,
    fontFamily: 'Inter',
    fontSize: '14px',
    spacing: 'standard',
    thumbnail: '/images/templates/tech-focused.png',
    plan: 'professional'
  }
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): Template[] => {
  return templates.filter(template => template.category === category);
};

export const getColorSchemeById = (templateId: string, colorSchemeId: string): ColorScheme | undefined => {
  const template = getTemplateById(templateId);
  return template?.colorSchemes?.find(scheme => scheme.id === colorSchemeId);
}; 