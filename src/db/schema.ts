import { pgTable, text, timestamp, uuid, boolean, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  secretHash: text('secret_hash').notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  ip: text('ip'),
  browserAgent: text('browser_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Waiting List table for SaaS pre-launch
export const waitingList = pgTable('waiting_list', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  company: text('company'),
  jobTitle: text('job_title'),
  industry: text('industry'),
  companySize: text('company_size'), // '1-10', '11-50', '51-200', '201-1000', '1000+'
  interests: text('interests').array(), // ['resume-builder', 'interview-prep', 'job-search', etc.]
  referralSource: text('referral_source'), // 'google', 'social-media', 'friend', 'blog', etc.
  expectedUsage: text('expected_usage'), // 'personal', 'team', 'enterprise'
  budget: text('budget'), // 'free', 'under-50', '50-100', '100-500', '500+'
  timeline: text('timeline'), // 'immediately', 'next-month', 'next-quarter', 'planning'
  additionalInfo: text('additional_info'), // Free text field for additional context
  status: text('status').notNull().default('waiting'), // 'waiting', 'invited', 'registered', 'declined'
  priority: integer('priority').notNull().default(0), // Higher number = higher priority
  invitedAt: timestamp('invited_at'),
  registeredAt: timestamp('registered_at'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const jobs = pgTable('jobs', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  company: text('company').notNull(),
  location: text('location').notNull(),
  salary: text('salary'),
  type: text('type').notNull(),
  experience: text('experience').notNull(),
  description: text('description').notNull(),
  contactEmail: text('contact_email').notNull(),
  companyWebsite: text('company_website'),
  tags: text('tags').array(),
  source: text('source').notNull(),
  sourceUrl: text('source_url'),
  submittedBy: text('submitted_by'),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Template Categories
export const templateCategories = pgTable('template_categories', {
  id: text('id').primaryKey(), // 'professional', 'creative', 'modern', 'classic', 'minimal'
  name: text('name').notNull(),
  description: text('description'),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Templates
export const templates = pgTable('templates', {
  id: text('id').primaryKey(), // 'professional-classic', 'modern-minimal', etc.
  name: text('name').notNull(),
  description: text('description').notNull(),
  categoryId: text('category_id').references(() => templateCategories.id).notNull(),
  layout: text('layout').notNull(), // 'single-column', 'two-column', 'sidebar', 'header-focused'
  fontFamily: text('font_family').notNull(),
  fontSize: text('font_size').notNull(),
  spacing: text('spacing').notNull(), // 'compact', 'standard', 'spacious'
  thumbnail: text('thumbnail').notNull(),
  plan: text('plan').notNull(), // 'free', 'premium', 'professional'
  isActive: boolean('is_active').notNull().default(true),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Color Schemes
export const colorSchemes = pgTable('color_schemes', {
  id: uuid('id').primaryKey().defaultRandom(),
  templateId: text('template_id').references(() => templates.id).notNull(),
  name: text('name').notNull(),
  primary: text('primary').notNull(), // hex color
  secondary: text('secondary').notNull(),
  accent: text('accent').notNull(),
  background: text('background').notNull(),
  text: text('text').notNull(),
  border: text('border').notNull(),
  displayOrder: integer('display_order').notNull().default(0),
  isDefault: boolean('is_default').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// User Resumes (to track which templates users have used)
export const userResumes = pgTable('user_resumes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  templateId: text('template_id').references(() => templates.id).notNull(),
  colorSchemeId: uuid('color_scheme_id').references(() => colorSchemes.id).notNull(),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  description: text('description'), // Optional description for the resume
  data: text('data').notNull(), // JSON string of resume data
  status: text('status').notNull().default('draft'), // 'draft', 'published', 'archived'
  version: integer('version').notNull().default(1), // For version tracking
  isPublic: boolean('is_public').notNull().default(false),
  isDefault: boolean('is_default').notNull().default(false), // Mark as user's default resume
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  resumes: many(userResumes),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const templateCategoriesRelations = relations(templateCategories, ({ many }) => ({
  templates: many(templates),
}));

export const templatesRelations = relations(templates, ({ one, many }) => ({
  category: one(templateCategories, {
    fields: [templates.categoryId],
    references: [templateCategories.id],
  }),
  colorSchemes: many(colorSchemes),
  userResumes: many(userResumes),
}));

export const colorSchemesRelations = relations(colorSchemes, ({ one, many }) => ({
  template: one(templates, {
    fields: [colorSchemes.templateId],
    references: [templates.id],
  }),
  userResumes: many(userResumes),
}));

export const userResumesRelations = relations(userResumes, ({ one }) => ({
  user: one(users, {
    fields: [userResumes.userId],
    references: [users.id],
  }),
  template: one(templates, {
    fields: [userResumes.templateId],
    references: [templates.id],
  }),
  colorScheme: one(colorSchemes, {
    fields: [userResumes.colorSchemeId],
    references: [colorSchemes.id],
  }),
}));

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;

export type TemplateCategory = typeof templateCategories.$inferSelect;
export type NewTemplateCategory = typeof templateCategories.$inferInsert;

export type Template = typeof templates.$inferSelect;
export type NewTemplate = typeof templates.$inferInsert;

export type ColorScheme = typeof colorSchemes.$inferSelect;
export type NewColorScheme = typeof colorSchemes.$inferInsert;

export type UserResume = typeof userResumes.$inferSelect;
export type NewUserResume = typeof userResumes.$inferInsert;

export type WaitingList = typeof waitingList.$inferSelect;
export type NewWaitingList = typeof waitingList.$inferInsert;