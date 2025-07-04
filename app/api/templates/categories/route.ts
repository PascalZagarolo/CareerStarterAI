import { NextResponse } from 'next/server';
import { TemplateService } from '@/lib/template-service';

export async function GET() {
  try {
    const categories = await TemplateService.getTemplateCategories();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching template categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch template categories' },
      { status: 500 }
    );
  }
} 