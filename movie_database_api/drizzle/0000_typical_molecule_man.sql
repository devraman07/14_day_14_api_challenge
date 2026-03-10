CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'admin',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"genre" text,
	"director" text,
	"actor" text,
	"actress" text,
	"release_year" integer,
	"rating" real,
	"creator_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "movies_creator_id_admins_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;