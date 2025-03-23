CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact_id" integer NOT NULL,
	"name" text NOT NULL,
	"short_name" varchar(255) NOT NULL,
	"business_entity" varchar(50) NOT NULL,
	"contract" jsonb NOT NULL,
	"type" jsonb NOT NULL,
	"status" varchar(50) NOT NULL,
	"photos" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"patronymic" varchar(255),
	"phone" varchar(15) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contacts_email_unique" UNIQUE("email")
);
