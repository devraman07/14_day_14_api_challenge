CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"profile_image" text,
	"role" text DEFAULT 'user',
	"is_verified" boolean DEFAULT false,
	"otp" text,
	"otp_expires" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
