import { NextRequest, NextResponse } from 'next/server';
import { TemplateService } from '@/lib/template-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const plan = searchParams.get('plan') as 'free' | 'premium' | 'professional' | null;

    let templates;

    if (category) {
      templates = await TemplateService.getTemplatesByCategory(category);
    } else if (plan) {
      templates = await TemplateService.getTemplatesByPlan(plan);
    } else {
      // Get all templates sorted by access level with their color schemes
      const allTemplates = await TemplateService.getAllTemplatesSortedByAccess();
      templates = [];
      
      for (const template of allTemplates) {
        const templateWithColorSchemes = await TemplateService.getTemplateById(template.id);
        if (templateWithColorSchemes) {
          templates.push(templateWithColorSchemes);
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: templates,
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
} 