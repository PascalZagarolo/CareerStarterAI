import ResumeA4Preview from '../../(main)/(features)/resume-builder/components/resume-a4-preview';
import { defaultResumeData } from '../../(main)/(features)/resume-builder/components/data';
import { TemplateService } from '@/lib/template-service';
import type { Template } from '../../(main)/(features)/resume-builder/components/types';
import type { Language } from '../../(main)/(features)/resume-builder/components/i18n/translations';

export default async function PreviewPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const params = await searchParams;
  let templateId = '';
  let colorSchemeId = '';
  let resumeData = defaultResumeData;
  let language: Language = 'en';
  
  templateId = Array.isArray(params.template) ? params.template[0] : params.template ?? '';
  colorSchemeId = Array.isArray(params.color) ? params.color[0] : params.color ?? '';
  if (params.language) {
    language = Array.isArray(params.language) ? params.language[0] as Language : params.language as Language;
    if (language !== 'en' && language !== 'de') language = 'en';
  }

  if (params.data) {
    try {
      const rawData = Array.isArray(params.data) ? params.data[0] : params.data;
      resumeData = JSON.parse(decodeURIComponent(rawData));
    } catch (e) {
      console.log(e);
      // fallback to defaultResumeData
    }
  }

  if (!templateId || !colorSchemeId) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxWidth: '90vw', fontSize: '12px' }}>
          {JSON.stringify(params, null, 2)}
        </pre>
        <div>Missing template or color parameter.</div>
      </div>
    );
  }

  // Fetch template with color schemes from database
  let dbTemplate: Awaited<ReturnType<typeof TemplateService.getTemplateById>> = null;
  try {
    dbTemplate = await TemplateService.getTemplateById(templateId);
  } catch (error) {
    console.error('Error fetching template:', error);
  }

  if (!dbTemplate) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <div>Template not found: {templateId}</div>
      </div>
    );
  }

  // Convert database template to frontend Template type
  const template: Template = {
    id: dbTemplate.id,
    name: dbTemplate.name,
    description: dbTemplate.description,
    categoryId: dbTemplate.categoryId,
    category: dbTemplate.category?.name,
    layout: dbTemplate.layout as 'single-column' | 'two-column' | 'sidebar' | 'header-focused',
    colorSchemes: dbTemplate.colorSchemes?.map(cs => ({
      id: cs.id,
      name: cs.name,
      primary: cs.primary,
      secondary: cs.secondary,
      accent: cs.accent,
      background: cs.background,
      text: cs.text,
      border: cs.border,
      templateId: cs.templateId,
      displayOrder: cs.displayOrder,
      isDefault: cs.isDefault,
      createdAt: cs.createdAt?.toISOString(),
      updatedAt: cs.updatedAt?.toISOString(),
    })),
    fontFamily: dbTemplate.fontFamily,
    fontSize: dbTemplate.fontSize,
    spacing: dbTemplate.spacing as 'compact' | 'standard' | 'spacious',
    thumbnail: dbTemplate.thumbnail,
    plan: dbTemplate.plan as 'free' | 'premium' | 'professional',
    isActive: dbTemplate.isActive,
    displayOrder: dbTemplate.displayOrder,
    createdAt: dbTemplate.createdAt?.toISOString(),
    updatedAt: dbTemplate.updatedAt?.toISOString(),
  };

  // Find the specific color scheme
  const colorScheme = template.colorSchemes?.find(cs => cs.id === colorSchemeId);
  
  if (!colorScheme) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <div>Color scheme not found: {colorSchemeId}</div>
        <div>Available schemes: {template.colorSchemes?.map(cs => cs.id).join(', ')}</div>
      </div>
    );
  }

  // Create a templates array with just this template for the ResumeA4Preview component
  const templates = [template];

  return (
    <div className='h-screen w-screen'>
      
      <div className="flex justify-center items-center h-full bg-gray-100">
        <ResumeA4Preview
          resumeData={resumeData}
          selectedTemplate={templateId}
          selectedColorScheme={colorSchemeId}
          templates={templates}
          language={language}
        />
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';