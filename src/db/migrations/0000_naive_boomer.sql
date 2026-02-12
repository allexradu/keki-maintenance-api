CREATE TABLE IF NOT EXISTS "platform_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"uuid_value" uuid,
	"text_value" text,
	"numeric_value" real,
	"key_value_pairs" json,
	"boolean_value" boolean,
	"disabled" boolean DEFAULT false NOT NULL,
	CONSTRAINT "platform_settings_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "platform_settings_code_index" ON "platform_settings" USING btree ("code");