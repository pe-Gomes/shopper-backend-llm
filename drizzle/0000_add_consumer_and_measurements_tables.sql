CREATE TABLE IF NOT EXISTS "costumers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"costumer_code" text NOT NULL,
	CONSTRAINT "costumers_costumer_code_unique" UNIQUE("costumer_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "measurements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"costumer_code" text,
	"measurement_type" varchar(15) NOT NULL,
	"measure_value" integer NOT NULL,
	"measure_datetime" timestamp with time zone NOT NULL,
	"measure_image" text NOT NULL,
	"is_confirmed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "measurements" ADD CONSTRAINT "measurements_costumer_code_costumers_costumer_code_fk" FOREIGN KEY ("costumer_code") REFERENCES "public"."costumers"("costumer_code") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_costumer_code_constraint" ON "costumers" USING btree ("costumer_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "costumer_code_idx" ON "costumers" USING btree ("costumer_code");