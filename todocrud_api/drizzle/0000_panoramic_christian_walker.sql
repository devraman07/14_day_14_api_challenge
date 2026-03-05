CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" text DEFAULT 'pending',
	"is_checked" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
