import { db } from '@/db';
import { templates, templateCategories, colorSchemes, userResumes } from '@/db/schema';
import { eq, and, desc, asc } from 'drizzle-orm';
import type { Template, TemplateCategory } from '@/db/schema';

export class TemplateService {
  /**
   * Get all active templates with their categories and color schemes
   */
  static async getAllTemplates() {
    try {
      const result = await db
        .select({
          template: templates,
          category: templateCategories,
        })
        .from(templates)
        .innerJoin(templateCategories, eq(templates.categoryId, templateCategories.id))
        .where(eq(templates.isActive, true))
        .orderBy(asc(templates.displayOrder), asc(templates.name));

      // Group templates by category
      const templatesByCategory = result.reduce((acc, row) => {
        const categoryId = row.category.id;
        if (!acc[categoryId]) {
          acc[categoryId] = {
            category: row.category,
            templates: [],
          };
        }
        acc[categoryId].templates.push(row.template);
        return acc;
      }, {} as Record<string, { category: TemplateCategory; templates: Template[] }>);

      return Object.values(templatesByCategory);
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw new Error('Failed to fetch templates');
    }
  }

  /**
   * Get all templates sorted by access level (free, premium, professional)
   */
  static async getAllTemplatesSortedByAccess() {
    try {
      const result = await db
        .select({
          template: templates,
          category: templateCategories,
        })
        .from(templates)
        .innerJoin(templateCategories, eq(templates.categoryId, templateCategories.id))
        .where(eq(templates.isActive, true))
        .orderBy(asc(templates.displayOrder), asc(templates.name));

      // Sort templates by access level: free -> premium -> professional
      const sortedTemplates = result
        .map(row => ({
          ...row.template,
          category: row.category,
        }))
        .sort((a, b) => {
          const accessOrder = { free: 0, premium: 1, professional: 2 };
          const aOrder = accessOrder[a.plan as keyof typeof accessOrder] ?? 0;
          const bOrder = accessOrder[b.plan as keyof typeof accessOrder] ?? 0;
          
          if (aOrder !== bOrder) {
            return aOrder - bOrder;
          }
          
          // If same access level, sort by display order then name
          if (a.displayOrder !== b.displayOrder) {
            return (a.displayOrder || 0) - (b.displayOrder || 0);
          }
          
          return a.name.localeCompare(b.name);
        });

      return sortedTemplates;
    } catch (error) {
      console.error('Error fetching templates sorted by access:', error);
      throw new Error('Failed to fetch templates');
    }
  }

  /**
   * Get templates by category
   */
  static async getTemplatesByCategory(categoryId: string) {
    try {
      const result = await db
        .select({
          template: templates,
          category: templateCategories,
        })
        .from(templates)
        .innerJoin(templateCategories, eq(templates.categoryId, templateCategories.id))
        .where(
          and(
            eq(templates.categoryId, categoryId),
            eq(templates.isActive, true)
          )
        )
        .orderBy(asc(templates.displayOrder), asc(templates.name));

      return result.map(row => ({
        ...row.template,
        category: row.category,
      }));
    } catch (error) {
      console.error('Error fetching templates by category:', error);
      throw new Error('Failed to fetch templates by category');
    }
  }

  /**
   * Get a single template by ID with its color schemes
   */
  static async getTemplateById(templateId: string) {
    try {
      const templateResult = await db
        .select({
          template: templates,
          category: templateCategories,
        })
        .from(templates)
        .innerJoin(templateCategories, eq(templates.categoryId, templateCategories.id))
        .where(eq(templates.id, templateId))
        .limit(1);

      if (templateResult.length === 0) {
        return null;
      }

      const template = templateResult[0];

      // Get color schemes for this template
      const colorSchemesResult = await db
        .select()
        .from(colorSchemes)
        .where(eq(colorSchemes.templateId, templateId))
        .orderBy(asc(colorSchemes.displayOrder), asc(colorSchemes.name));

      return {
        ...template.template,
        category: template.category,
        colorSchemes: colorSchemesResult,
      };
    } catch (error) {
      console.error('Error fetching template by ID:', error);
      throw new Error('Failed to fetch template');
    }
  }

  /**
   * Get color schemes for a specific template
   */
  static async getColorSchemesByTemplateId(templateId: string) {
    try {
      const result = await db
        .select()
        .from(colorSchemes)
        .where(eq(colorSchemes.templateId, templateId))
        .orderBy(asc(colorSchemes.displayOrder), asc(colorSchemes.name));

      return result;
    } catch (error) {
      console.error('Error fetching color schemes:', error);
      throw new Error('Failed to fetch color schemes');
    }
  }

  /**
   * Get default color scheme for a template
   */
  static async getDefaultColorScheme(templateId: string) {
    try {
      const result = await db
        .select()
        .from(colorSchemes)
        .where(
          and(
            eq(colorSchemes.templateId, templateId),
            eq(colorSchemes.isDefault, true)
          )
        )
        .limit(1);

      return result[0] || null;
    } catch (error) {
      console.error('Error fetching default color scheme:', error);
      throw new Error('Failed to fetch default color scheme');
    }
  }

  /**
   * Get templates by subscription plan
   */
  static async getTemplatesByPlan(plan: 'free' | 'premium' | 'professional') {
    try {
      const result = await db
        .select({
          template: templates,
          category: templateCategories,
        })
        .from(templates)
        .innerJoin(templateCategories, eq(templates.categoryId, templateCategories.id))
        .where(
          and(
            eq(templates.plan, plan),
            eq(templates.isActive, true)
          )
        )
        .orderBy(asc(templates.displayOrder), asc(templates.name));

      return result.map(row => ({
        ...row.template,
        category: row.category,
      }));
    } catch (error) {
      console.error('Error fetching templates by plan:', error);
      throw new Error('Failed to fetch templates by plan');
    }
  }

  /**
   * Get user's saved resumes
   */
  static async getUserResumes(userId: string) {
    try {
      const result = await db
        .select({
          resume: userResumes,
          template: templates,
          colorScheme: colorSchemes,
        })
        .from(userResumes)
        .innerJoin(templates, eq(userResumes.templateId, templates.id))
        .innerJoin(colorSchemes, eq(userResumes.colorSchemeId, colorSchemes.id))
        .where(eq(userResumes.userId, userId))
        .orderBy(desc(userResumes.updatedAt));

      return result.map(row => ({
        ...row.resume,
        template: row.template,
        colorScheme: row.colorScheme,
      }));
    } catch (error) {
      console.error('Error fetching user resumes:', error);
      throw new Error('Failed to fetch user resumes');
    }
  }

  /**
   * Save a user's resume
   */
  static async saveUserResume(data: {
    userId: string;
    templateId: string;
    colorSchemeId: string;
    name: string;
    data: string;
    isPublic?: boolean;
  }) {
    try {
      const result = await db
        .insert(userResumes)
        .values({
          userId: data.userId,
          templateId: data.templateId,
          colorSchemeId: data.colorSchemeId,
          name: data.name,
          data: data.data,
          isPublic: data.isPublic || false,
        })
        .returning();

      return result[0];
    } catch (error) {
      console.error('Error saving user resume:', error);
      throw new Error('Failed to save resume');
    }
  }

  /**
   * Update a user's resume
   */
  static async updateUserResume(
    resumeId: string,
    userId: string,
    data: Partial<{
      name: string;
      templateId: string;
      colorSchemeId: string;
      data: string;
      isPublic: boolean;
    }>
  ) {
    try {
      const result = await db
        .update(userResumes)
        .set({
          ...data,
          // updatedAt will be automatically set by the database
        })
        .where(
          and(
            eq(userResumes.id, resumeId),
            eq(userResumes.userId, userId)
          )
        )
        .returning();

      return result[0] || null;
    } catch (error) {
      console.error('Error updating user resume:', error);
      throw new Error('Failed to update resume');
    }
  }

  /**
   * Delete a user's resume
   */
  static async deleteUserResume(resumeId: string, userId: string) {
    try {
      const result = await db
        .delete(userResumes)
        .where(
          and(
            eq(userResumes.id, resumeId),
            eq(userResumes.userId, userId)
          )
        )
        .returning();

      return result[0] || null;
    } catch (error) {
      console.error('Error deleting user resume:', error);
      throw new Error('Failed to delete resume');
    }
  }

  /**
   * Get all template categories
   */
  static async getTemplateCategories() {
    try {
      const result = await db
        .select()
        .from(templateCategories)
        .orderBy(asc(templateCategories.displayOrder), asc(templateCategories.name));

      return result;
    } catch (error) {
      console.error('Error fetching template categories:', error);
      throw new Error('Failed to fetch template categories');
    }
  }
} 