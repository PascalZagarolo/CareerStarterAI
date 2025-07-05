ALTER TABLE "user_resumes" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "user_resumes" ADD COLUMN "status" text DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "user_resumes" ADD COLUMN "version" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "user_resumes" ADD COLUMN "is_default" boolean DEFAULT false NOT NULL;