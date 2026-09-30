import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_health_notes_division" AS ENUM('Family Medicine', 'Pain Centre', 'Infusion Therapy', 'Medical Aesthetics', 'Rehab & Recovery');
  CREATE TYPE "public"."enum_health_notes_cta_page" AS ENUM('home', 'family', 'pain', 'infusion', 'aesthetics', 'rehab', 'kids', 'women', 'men', 'chronic', 'blood', 'year', 'numbers', 'iron', 'referrals', 'about', 'team', 'locations', 'story', 'standards', 'careers', 'faq', 'contact', 'notes', 'book', 'register', 'privacy', 'accessibility', 'rights', 'terms', 'sitemap');
  CREATE TYPE "public"."enum_health_notes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__health_notes_v_version_division" AS ENUM('Family Medicine', 'Pain Centre', 'Infusion Therapy', 'Medical Aesthetics', 'Rehab & Recovery');
  CREATE TYPE "public"."enum__health_notes_v_version_cta_page" AS ENUM('home', 'family', 'pain', 'infusion', 'aesthetics', 'rehab', 'kids', 'women', 'men', 'chronic', 'blood', 'year', 'numbers', 'iron', 'referrals', 'about', 'team', 'locations', 'story', 'standards', 'careers', 'faq', 'contact', 'notes', 'book', 'register', 'privacy', 'accessibility', 'rights', 'terms', 'sitemap');
  CREATE TYPE "public"."enum__health_notes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_jobs_location" AS ENUM('Thornhill', 'Maple', 'Thornhill and Maple');
  CREATE TYPE "public"."enum_jobs_division" AS ENUM('Family Medicine', 'Pain Centre', 'Medical Aesthetics', 'Infusion Therapy', 'Rehab and Recovery', 'Front desk', 'Operations');
  CREATE TYPE "public"."enum_jobs_type" AS ENUM('Full time', 'Part time', 'Contract', 'Full or part time');
  CREATE TYPE "public"."enum_jobs_status" AS ENUM('open', 'closed');
  CREATE TYPE "public"."enum_team_divisions" AS ENUM('Family Medicine', 'Pain Centre', 'Infusion Therapy', 'Medical Aesthetics', 'Rehab & Recovery');
  CREATE TYPE "public"."enum_faq_category" AS ENUM('Visits', 'Coverage', 'Results', 'Prescriptions', 'Clinic', 'Privacy', 'Pain Centre', 'Infusion', 'Aesthetics', 'Rehab');
  CREATE TYPE "public"."enum_faq_link_page" AS ENUM('home', 'family', 'pain', 'infusion', 'aesthetics', 'rehab', 'kids', 'women', 'men', 'chronic', 'blood', 'year', 'numbers', 'iron', 'referrals', 'about', 'team', 'locations', 'story', 'standards', 'careers', 'faq', 'contact', 'notes', 'book', 'register', 'privacy', 'accessibility', 'rights', 'terms', 'sitemap');
  CREATE TYPE "public"."enum_locations_services" AS ENUM('family', 'pain', 'infusion', 'aesthetics', 'rehab');
  CREATE TYPE "public"."enum_locations_key" AS ENUM('thornhill', 'maple');
  CREATE TYPE "public"."enum_announcements_page" AS ENUM('home', 'family', 'pain', 'infusion', 'aesthetics', 'rehab', 'kids', 'women', 'men', 'chronic', 'blood', 'year', 'numbers', 'iron', 'referrals', 'about', 'team', 'locations', 'story', 'standards', 'careers', 'faq', 'contact', 'notes', 'book', 'register', 'privacy', 'accessibility', 'rights', 'terms', 'sitemap');
  CREATE TYPE "public"."enum_legal_pages_slug" AS ENUM('privacy', 'accessibility', 'patient-rights', 'terms');
  CREATE TYPE "public"."enum_page_seo_path" AS ENUM('/', '/about', '/about/careers', '/about/clinics', '/about/contact', '/about/faq', '/about/standards', '/about/story', '/about/team', '/book', '/family-medicine', '/family-medicine/bloodwork-ecg', '/family-medicine/children-youth', '/family-medicine/chronic-care', '/family-medicine/know-your-numbers', '/family-medicine/men-s-health', '/family-medicine/women-s-health', '/family-medicine/your-year', '/for-physicians', '/health-notes', '/infusion-therapy', '/infusion-therapy/iron-therapy', '/legal/accessibility', '/legal/patient-rights', '/legal/privacy', '/legal/terms', '/medical-aesthetics', '/pain-centre', '/register', '/rehab-recovery', '/sitemap');
  CREATE TYPE "public"."enum_users_role" AS ENUM('editor', 'admin');
  CREATE TABLE "health_notes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"dek" varchar,
  	"division" "enum_health_notes_division",
  	"date" timestamp(3) with time zone,
  	"read_minutes" numeric DEFAULT 2,
  	"author_id" integer,
  	"author_name" varchar,
  	"co_author" varchar,
  	"hero_id" integer,
  	"hero_url" varchar,
  	"body" jsonb,
  	"cta_title" varchar,
  	"cta_sub" varchar,
  	"cta_page" "enum_health_notes_cta_page" DEFAULT 'book',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_health_notes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_health_notes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_dek" varchar,
  	"version_division" "enum__health_notes_v_version_division",
  	"version_date" timestamp(3) with time zone,
  	"version_read_minutes" numeric DEFAULT 2,
  	"version_author_id" integer,
  	"version_author_name" varchar,
  	"version_co_author" varchar,
  	"version_hero_id" integer,
  	"version_hero_url" varchar,
  	"version_body" jsonb,
  	"version_cta_title" varchar,
  	"version_cta_sub" varchar,
  	"version_cta_page" "enum__health_notes_v_version_cta_page" DEFAULT 'book',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__health_notes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "jobs_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"location" "enum_jobs_location" NOT NULL,
  	"division" "enum_jobs_division" NOT NULL,
  	"type" "enum_jobs_type" NOT NULL,
  	"schedule" varchar NOT NULL,
  	"posted_date" timestamp(3) with time zone NOT NULL,
  	"status" "enum_jobs_status" DEFAULT 'open' NOT NULL,
  	"summary" varchar NOT NULL,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_divisions" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_team_divisions",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "team_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer,
  	"photo_url" varchar,
  	"bio" varchar,
  	"preceptor_tag" varchar,
  	"order" numeric DEFAULT 100,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum_faq_category" NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"link_label" varchar,
  	"link_page" "enum_faq_link_page",
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "locations_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" varchar NOT NULL,
  	"time" varchar NOT NULL
  );
  
  CREATE TABLE "locations_services" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_locations_services",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"key" "enum_locations_key" NOT NULL,
  	"address_line1" varchar NOT NULL,
  	"address_line2" varchar NOT NULL,
  	"maps_url" varchar NOT NULL,
  	"phone" varchar,
  	"fax" varchar,
  	"access" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"coming_soon" boolean DEFAULT false,
  	"cta" varchar NOT NULL,
  	"foot_cta" varchar NOT NULL,
  	"foot_sub" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "announcements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"page" "enum_announcements_page",
  	"url" varchar,
  	"active" boolean DEFAULT true,
  	"starts_at" timestamp(3) with time zone,
  	"ends_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "legal_pages_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "legal_pages_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" "enum_legal_pages_slug" NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"updated_label" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"contact_title" varchar NOT NULL,
  	"contact" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"credit" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "page_seo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"path" "enum_page_seo_path" NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"og_image_id" integer,
  	"canonical" varchar,
  	"no_index" boolean DEFAULT false,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "audit_log" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer,
  	"user_email" varchar,
  	"operation" varchar,
  	"collection" varchar,
  	"doc_id" varchar,
  	"doc_title" varchar,
  	"changes" jsonb,
  	"ip" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"health_notes_id" integer,
  	"jobs_id" integer,
  	"team_id" integer,
  	"faq_id" integer,
  	"locations_id" integer,
  	"announcements_id" integer,
  	"legal_pages_id" integer,
  	"media_id" integer,
  	"page_seo_id" integer,
  	"users_id" integer,
  	"audit_log_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar DEFAULT '905-709-3222',
  	"fax" varchar DEFAULT '905-761-7306',
  	"contact_email" varchar DEFAULT 'contact@restorationmedical.ca',
  	"referrals_email" varchar DEFAULT 'referrals@restorationmedical.ca',
  	"careers_email" varchar DEFAULT 'careers@restorationmedical.ca',
  	"placements_email" varchar DEFAULT 'placements@restorationmedical.ca',
  	"closures" varchar DEFAULT 'Fridays, Thanksgiving (Oct 12), Dec 25 and 26, Jan 1',
  	"instagram" varchar DEFAULT 'https://www.instagram.com/restorationmedicalofficial/',
  	"facebook" varchar DEFAULT 'https://www.facebook.com/restorationmedicalofficial/',
  	"google_maps" varchar,
  	"google_maps_maple" varchar,
  	"site_name" varchar DEFAULT 'Restoration Medical',
  	"title_suffix" varchar DEFAULT ' | Restoration Medical',
  	"default_description" varchar DEFAULT 'Family medicine, pain care, infusion therapy, aesthetics and rehab, under one physician-led standard of care. Care in English and Tiếng Việt.',
  	"default_og_image_id" integer,
  	"gtm_id" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "health_notes" ADD CONSTRAINT "health_notes_author_id_team_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "health_notes" ADD CONSTRAINT "health_notes_hero_id_media_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_health_notes_v" ADD CONSTRAINT "_health_notes_v_parent_id_health_notes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."health_notes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_health_notes_v" ADD CONSTRAINT "_health_notes_v_version_author_id_team_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_health_notes_v" ADD CONSTRAINT "_health_notes_v_version_hero_id_media_id_fk" FOREIGN KEY ("version_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "jobs_requirements" ADD CONSTRAINT "jobs_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_divisions" ADD CONSTRAINT "team_divisions_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_credentials" ADD CONSTRAINT "team_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team" ADD CONSTRAINT "team_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_hours" ADD CONSTRAINT "locations_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_services" ADD CONSTRAINT "locations_services_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal_pages_sections_paragraphs" ADD CONSTRAINT "legal_pages_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages_sections" ADD CONSTRAINT "legal_pages_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_seo" ADD CONSTRAINT "page_seo_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_health_notes_fk" FOREIGN KEY ("health_notes_id") REFERENCES "public"."health_notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_announcements_fk" FOREIGN KEY ("announcements_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_page_seo_fk" FOREIGN KEY ("page_seo_id") REFERENCES "public"."page_seo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_log_fk" FOREIGN KEY ("audit_log_id") REFERENCES "public"."audit_log"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "health_notes_slug_idx" ON "health_notes" USING btree ("slug");
  CREATE INDEX "health_notes_author_idx" ON "health_notes" USING btree ("author_id");
  CREATE INDEX "health_notes_hero_idx" ON "health_notes" USING btree ("hero_id");
  CREATE INDEX "health_notes_updated_at_idx" ON "health_notes" USING btree ("updated_at");
  CREATE INDEX "health_notes_created_at_idx" ON "health_notes" USING btree ("created_at");
  CREATE INDEX "health_notes__status_idx" ON "health_notes" USING btree ("_status");
  CREATE INDEX "_health_notes_v_parent_idx" ON "_health_notes_v" USING btree ("parent_id");
  CREATE INDEX "_health_notes_v_version_version_slug_idx" ON "_health_notes_v" USING btree ("version_slug");
  CREATE INDEX "_health_notes_v_version_version_author_idx" ON "_health_notes_v" USING btree ("version_author_id");
  CREATE INDEX "_health_notes_v_version_version_hero_idx" ON "_health_notes_v" USING btree ("version_hero_id");
  CREATE INDEX "_health_notes_v_version_version_updated_at_idx" ON "_health_notes_v" USING btree ("version_updated_at");
  CREATE INDEX "_health_notes_v_version_version_created_at_idx" ON "_health_notes_v" USING btree ("version_created_at");
  CREATE INDEX "_health_notes_v_version_version__status_idx" ON "_health_notes_v" USING btree ("version__status");
  CREATE INDEX "_health_notes_v_created_at_idx" ON "_health_notes_v" USING btree ("created_at");
  CREATE INDEX "_health_notes_v_updated_at_idx" ON "_health_notes_v" USING btree ("updated_at");
  CREATE INDEX "_health_notes_v_latest_idx" ON "_health_notes_v" USING btree ("latest");
  CREATE INDEX "_health_notes_v_autosave_idx" ON "_health_notes_v" USING btree ("autosave");
  CREATE INDEX "jobs_requirements_order_idx" ON "jobs_requirements" USING btree ("_order");
  CREATE INDEX "jobs_requirements_parent_id_idx" ON "jobs_requirements" USING btree ("_parent_id");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE INDEX "team_divisions_order_idx" ON "team_divisions" USING btree ("order");
  CREATE INDEX "team_divisions_parent_idx" ON "team_divisions" USING btree ("parent_id");
  CREATE INDEX "team_credentials_order_idx" ON "team_credentials" USING btree ("_order");
  CREATE INDEX "team_credentials_parent_id_idx" ON "team_credentials" USING btree ("_parent_id");
  CREATE INDEX "team_photo_idx" ON "team" USING btree ("photo_id");
  CREATE INDEX "team_updated_at_idx" ON "team" USING btree ("updated_at");
  CREATE INDEX "team_created_at_idx" ON "team" USING btree ("created_at");
  CREATE INDEX "faq_updated_at_idx" ON "faq" USING btree ("updated_at");
  CREATE INDEX "faq_created_at_idx" ON "faq" USING btree ("created_at");
  CREATE INDEX "locations_hours_order_idx" ON "locations_hours" USING btree ("_order");
  CREATE INDEX "locations_hours_parent_id_idx" ON "locations_hours" USING btree ("_parent_id");
  CREATE INDEX "locations_services_order_idx" ON "locations_services" USING btree ("order");
  CREATE INDEX "locations_services_parent_idx" ON "locations_services" USING btree ("parent_id");
  CREATE UNIQUE INDEX "locations_key_idx" ON "locations" USING btree ("key");
  CREATE INDEX "locations_image_idx" ON "locations" USING btree ("image_id");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE INDEX "announcements_updated_at_idx" ON "announcements" USING btree ("updated_at");
  CREATE INDEX "announcements_created_at_idx" ON "announcements" USING btree ("created_at");
  CREATE INDEX "legal_pages_sections_paragraphs_order_idx" ON "legal_pages_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "legal_pages_sections_paragraphs_parent_id_idx" ON "legal_pages_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "legal_pages_sections_order_idx" ON "legal_pages_sections" USING btree ("_order");
  CREATE INDEX "legal_pages_sections_parent_id_idx" ON "legal_pages_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "legal_pages" USING btree ("slug");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "page_seo_path_idx" ON "page_seo" USING btree ("path");
  CREATE INDEX "page_seo_og_image_idx" ON "page_seo" USING btree ("og_image_id");
  CREATE INDEX "page_seo_updated_at_idx" ON "page_seo" USING btree ("updated_at");
  CREATE INDEX "page_seo_created_at_idx" ON "page_seo" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "audit_log_user_idx" ON "audit_log" USING btree ("user_id");
  CREATE INDEX "audit_log_updated_at_idx" ON "audit_log" USING btree ("updated_at");
  CREATE INDEX "audit_log_created_at_idx" ON "audit_log" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_health_notes_id_idx" ON "payload_locked_documents_rels" USING btree ("health_notes_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX "payload_locked_documents_rels_team_id_idx" ON "payload_locked_documents_rels" USING btree ("team_id");
  CREATE INDEX "payload_locked_documents_rels_faq_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_announcements_id_idx" ON "payload_locked_documents_rels" USING btree ("announcements_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_page_seo_id_idx" ON "payload_locked_documents_rels" USING btree ("page_seo_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_audit_log_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_log_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "health_notes" CASCADE;
  DROP TABLE "_health_notes_v" CASCADE;
  DROP TABLE "jobs_requirements" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "team_divisions" CASCADE;
  DROP TABLE "team_credentials" CASCADE;
  DROP TABLE "team" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "locations_hours" CASCADE;
  DROP TABLE "locations_services" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "announcements" CASCADE;
  DROP TABLE "legal_pages_sections_paragraphs" CASCADE;
  DROP TABLE "legal_pages_sections" CASCADE;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "page_seo" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "audit_log" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_health_notes_division";
  DROP TYPE "public"."enum_health_notes_cta_page";
  DROP TYPE "public"."enum_health_notes_status";
  DROP TYPE "public"."enum__health_notes_v_version_division";
  DROP TYPE "public"."enum__health_notes_v_version_cta_page";
  DROP TYPE "public"."enum__health_notes_v_version_status";
  DROP TYPE "public"."enum_jobs_location";
  DROP TYPE "public"."enum_jobs_division";
  DROP TYPE "public"."enum_jobs_type";
  DROP TYPE "public"."enum_jobs_status";
  DROP TYPE "public"."enum_team_divisions";
  DROP TYPE "public"."enum_faq_category";
  DROP TYPE "public"."enum_faq_link_page";
  DROP TYPE "public"."enum_locations_services";
  DROP TYPE "public"."enum_locations_key";
  DROP TYPE "public"."enum_announcements_page";
  DROP TYPE "public"."enum_legal_pages_slug";
  DROP TYPE "public"."enum_page_seo_path";
  DROP TYPE "public"."enum_users_role";`)
}
