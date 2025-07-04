CREATE TABLE "jobs" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"company" text NOT NULL,
	"location" text NOT NULL,
	"salary" text,
	"type" text NOT NULL,
	"experience" text NOT NULL,
	"description" text NOT NULL,
	"contact_email" text NOT NULL,
	"company_website" text,
	"tags" text[],
	"source" text NOT NULL,
	"source_url" text,
	"submitted_by" text,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
