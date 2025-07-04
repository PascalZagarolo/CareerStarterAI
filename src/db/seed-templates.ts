"use server";

import { db } from './index';
import { templateCategories, templates, colorSchemes } from './schema';
import { and, eq } from 'drizzle-orm';
import { colorSchemes as existingColorSchemes, templates as existingTemplates } from '../../app/(features)/resume-builder/components/templates/template-data';

// Load environment variables
import 'dotenv/config';

export async function seedTemplates() {
  console.log('🌱 Seeding template data...');
  
  // Log environment info
  console.log('🔧 Environment check:', {
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    databaseUrlLength: process.env.DATABASE_URL?.length || 0,
    nodeEnv: process.env.NODE_ENV
  });

  try {
    // Insert template categories
    const categories = [
      { id: 'professional', name: 'Professional', description: 'Clean and traditional layouts perfect for corporate environments', displayOrder: 1 },
      { id: 'creative', name: 'Creative', description: 'Bold and innovative designs for creative professionals', displayOrder: 2 },
      { id: 'modern', name: 'Modern', description: 'Sleek and contemporary designs with modern aesthetics', displayOrder: 3 },
      { id: 'classic', name: 'Classic', description: 'Timeless and structured layouts for traditional industries', displayOrder: 4 },
      { id: 'minimal', name: 'Minimal', description: 'Ultra-clean designs with maximum readability', displayOrder: 5 },
    ];

    for (const category of categories) {
      await db.insert(templateCategories).values(category).onConflictDoNothing();
    }
    console.log('✅ Template categories seeded');

    const test = await db.query.templates.findMany();
    console.log(test);

    // Insert templates
    for (const template of existingTemplates) {
      await db.insert(templates).values({
        id: template.id,
        name: template.name,
        description: template.description,
        categoryId: template.category,
        layout: template.layout,
        fontFamily: template.fontFamily,
        fontSize: template.fontSize,
        spacing: template.spacing,
        thumbnail: template.thumbnail,
        plan: template.plan,
        displayOrder: 0, // Will be set based on template order
      }).onConflictDoNothing();
    }
    console.log('✅ Templates seeded');

    // Insert color schemes
    for (const template of existingTemplates) {
      for (const colorScheme of template.colorSchemes) {
        await db.insert(colorSchemes).values({
          templateId: template.id,
          name: colorScheme.name,
          primary: colorScheme.primary,
          secondary: colorScheme.secondary,
          accent: colorScheme.accent,
          background: colorScheme.background,
          text: colorScheme.text,
          border: colorScheme.border,
          displayOrder: 0, // Will be set based on color scheme order
          isDefault: false, // First color scheme will be default
        })
      }
    }
    console.log('✅ Color schemes seeded');

    // Set default color schemes (first one for each template)
    for (const template of existingTemplates) {
      if (template.colorSchemes.length > 0) {
        await db
          .update(colorSchemes)
          .set({ isDefault: true })
          .where(
            and(
              eq(colorSchemes.templateId, template.id),
              eq(colorSchemes.name, template.colorSchemes[0].name)
            )
          );
      }
    }
    console.log('✅ Default color schemes set');

    console.log('🎉 Template seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding templates:', error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error('📋 Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 5).join('\n')
      });
    }
    
    // Log connection-specific error details
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('🔍 Connection error code:', error.code);
    }
    
    throw error;
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedTemplates()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Failed to seed templates:', error);
      process.exit(1);
    });
} 