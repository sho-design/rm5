import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_health_notes_cta_page" ADD VALUE 'fees' BEFORE 'faq';
  ALTER TYPE "public"."enum__health_notes_v_version_cta_page" ADD VALUE 'fees' BEFORE 'faq';
  ALTER TYPE "public"."enum_faq_link_page" ADD VALUE 'fees' BEFORE 'faq';
  ALTER TYPE "public"."enum_announcements_page" ADD VALUE 'fees' BEFORE 'faq';
  ALTER TYPE "public"."enum_page_seo_path" ADD VALUE '/about/fees' BEFORE '/about/insurance-billing';
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"permanent" boolean DEFAULT true,
  	"note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_uninsured_fees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"service" varchar NOT NULL,
  	"fee" varchar NOT NULL,
  	"note" varchar
  );
  
  ALTER TABLE "locations" ADD COLUMN "finding_us" varchar;
  ALTER TABLE "locations" ADD COLUMN "finding_us_image_id" integer;
  ALTER TABLE "locations" ADD COLUMN "finding_us_image_url" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "redirects_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "ga_id" varchar;
  ALTER TABLE "site_settings_uninsured_fees" ADD CONSTRAINT "site_settings_uninsured_fees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "site_settings_uninsured_fees_order_idx" ON "site_settings_uninsured_fees" USING btree ("_order");
  CREATE INDEX "site_settings_uninsured_fees_parent_id_idx" ON "site_settings_uninsured_fees" USING btree ("_parent_id");
  ALTER TABLE "locations" ADD CONSTRAINT "locations_finding_us_image_id_media_id_fk" FOREIGN KEY ("finding_us_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "locations_finding_us_image_idx" ON "locations" USING btree ("finding_us_image_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "redirects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_uninsured_fees" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "site_settings_uninsured_fees" CASCADE;
  ALTER TABLE "locations" DROP CONSTRAINT "locations_finding_us_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_redirects_fk";
  
  ALTER TABLE "health_notes" ALTER COLUMN "cta_page" SET DATA TYPE text;
  ALTER TABLE "health_notes" ALTER COLUMN "cta_page" SET DEFAULT 'book'::text;
  DROP TYPE "public"."enum_health_notes_cta_page";
  CREATE TYPE "public"."enum_health_notes_cta_page" AS ENUM('home', 'family', 'pain', 'infusion', 'aesthetics', 'rehab', 'kids', 'women', 'men', 'chronic', 'blood', 'year', 'numbers', 'iron', 'rx', 'labs', 'painBack', 'painJoints', 'painNerve', 'painTrigger', 'painFirstVisit', 'painOhip', 'drips', 'shots', 'concerns', 'metabolic', 'infusionHow', 'honest', 'ingredients', 'infusionPricing', 'infusionTeam', 'aesInjectables', 'aesSkin', 'aesLaser', 'aesPlans', 'aesMen', 'aesPricing', 'aesPhotos', 'aesGift', 'rehabPhysio', 'rehabChiro', 'rehabMassage', 'rehabKines', 'rehabMva', 'rehabWsib', 'rehabBilling', 'rehabBring', 'rehabHome', 'referrals', 'about', 'team', 'locations', 'story', 'standards', 'careers', 'forms', 'billing', 'faq', 'contact', 'notes', 'book', 'register', 'privacy', 'accessibility', 'rights', 'terms', 'sitemap');
  ALTER TABLE "health_notes" ALTER COLUMN "cta_page" SET DEFAULT 'book'::"public"."enum_health_notes_cta_page";
  ALTER TABLE "health_notes" ALTER COLUMN "cta_page" SET DATA TYPE "public"."enum_health_notes_cta_page" USING "cta_page"::"public"."enum_health_notes_cta_page";
  ALTER TABLE "_health_notes_v" ALTER COLUMN "version_cta_page" SET DATA TYPE text;
  ALTER TABLE "_health_notes_v" ALTER COLUMN "version_cta_page" SET DEFAULT 'book'::text;
  DROP TYPE "public"."enum__health_notes_v_version_cta_page";
  CREATE TYPE "public"."enum__health_notes_v_version_cta_page" AS ENUM('home', 'family', 'pain', 'infusion', 'aesthetics', 'rehab', 'kids', 'women', 'men', 'chronic', 'blood', 'year', 'numbers', 'iron', 'rx', 'labs', 'painBack', 'painJoints', 'painNerve', 'painTrigger', 'painFirstVisit', 'painOhip', 'drips', 'shots', 'concerns', 'metabolic', 'infusionHow', 'honest', 'ingredients', 'infusionPricing', 'infusionTeam', 'aesInjectables', 'aesSkin', 'aesLaser', 'aesPlans', 'aesMen', 'aesPricing', 'aesPhotos', 'aesGift', 'rehabPhysio', 'rehabChiro', 'rehabMassage', 'rehabKines', 'rehabMva', 'rehabWsib', 'rehabBilling', 'rehabBring', 'rehabHome', 'referrals', 'about', 'team', 'locations', 'story', 'standards', 'careers', 'forms', 'billing', 'faq', 'contact', 'notes', 'book', 'register', 'privacy', 'accessibility', 'rights', 'terms', 'sitemap');
  ALTER TABLE "_health_notes_v" ALTER COLUMN "version_cta_page" SET DEFAULT 'book'::"public"."enum__health_notes_v_version_cta_page";
  ALTER TABLE "_health_notes_v" ALTER COLUMN "version_cta_page" SET DATA TYPE "public"."enum__health_notes_v_version_cta_page" USING "version_cta_page"::"public"."enum__health_notes_v_version_cta_page";
  ALTER TABLE "faq" ALTER COLUMN "link_page" SET DATA TYPE text;
  DROP TYPE "public"."enum_faq_link_page";
  CREATE TYPE "public"."enum_faq_link_page" AS ENUM('home', 'family', 'pain', 'infusion', 'aesthetics', 'rehab', 'kids', 'women', 'men', 'chronic', 'blood', 'year', 'numbers', 'iron', 'rx', 'labs', 'painBack', 'painJoints', 'painNerve', 'painTrigger', 'painFirstVisit', 'painOhip', 'drips', 'shots', 'concerns', 'metabolic', 'infusionHow', 'honest', 'ingredients', 'infusionPricing', 'infusionTeam', 'aesInjectables', 'aesSkin', 'aesLaser', 'aesPlans', 'aesMen', 'aesPricing', 'aesPhotos', 'aesGift', 'rehabPhysio', 'rehabChiro', 'rehabMassage', 'rehabKines', 'rehabMva', 'rehabWsib', 'rehabBilling', 'rehabBring', 'rehabHome', 'referrals', 'about', 'team', 'locations', 'story', 'standards', 'careers', 'forms', 'billing', 'faq', 'contact', 'notes', 'book', 'register', 'privacy', 'accessibility', 'rights', 'terms', 'sitemap');
  ALTER TABLE "faq" ALTER COLUMN "link_page" SET DATA TYPE "public"."enum_faq_link_page" USING "link_page"::"public"."enum_faq_link_page";
  ALTER TABLE "announcements" ALTER COLUMN "page" SET DATA TYPE text;
  DROP TYPE "public"."enum_announcements_page";
  CREATE TYPE "public"."enum_announcements_page" AS ENUM('home', 'family', 'pain', 'infusion', 'aesthetics', 'rehab', 'kids', 'women', 'men', 'chronic', 'blood', 'year', 'numbers', 'iron', 'rx', 'labs', 'painBack', 'painJoints', 'painNerve', 'painTrigger', 'painFirstVisit', 'painOhip', 'drips', 'shots', 'concerns', 'metabolic', 'infusionHow', 'honest', 'ingredients', 'infusionPricing', 'infusionTeam', 'aesInjectables', 'aesSkin', 'aesLaser', 'aesPlans', 'aesMen', 'aesPricing', 'aesPhotos', 'aesGift', 'rehabPhysio', 'rehabChiro', 'rehabMassage', 'rehabKines', 'rehabMva', 'rehabWsib', 'rehabBilling', 'rehabBring', 'rehabHome', 'referrals', 'about', 'team', 'locations', 'story', 'standards', 'careers', 'forms', 'billing', 'faq', 'contact', 'notes', 'book', 'register', 'privacy', 'accessibility', 'rights', 'terms', 'sitemap');
  ALTER TABLE "announcements" ALTER COLUMN "page" SET DATA TYPE "public"."enum_announcements_page" USING "page"::"public"."enum_announcements_page";
  ALTER TABLE "page_seo" ALTER COLUMN "path" SET DATA TYPE text;
  DROP TYPE "public"."enum_page_seo_path";
  CREATE TYPE "public"."enum_page_seo_path" AS ENUM('/', '/about', '/about/careers', '/about/clinics', '/about/contact', '/about/faq', '/about/insurance-billing', '/about/patient-forms', '/about/standards', '/about/story', '/about/team', '/book', '/family-medicine', '/family-medicine/bloodwork-ecg', '/family-medicine/children-youth', '/family-medicine/chronic-care', '/family-medicine/know-your-numbers', '/family-medicine/lab-results', '/family-medicine/men-s-health', '/family-medicine/prescription-renewals', '/family-medicine/women-s-health', '/family-medicine/your-year', '/for-physicians', '/health-notes', '/infusion-therapy', '/infusion-therapy/by-concern', '/infusion-therapy/drips', '/infusion-therapy/honest-menu', '/infusion-therapy/how-it-works', '/infusion-therapy/ingredients', '/infusion-therapy/injection-bar', '/infusion-therapy/iron-therapy', '/infusion-therapy/metabolic-program', '/infusion-therapy/pricing', '/infusion-therapy/team', '/legal/accessibility', '/legal/patient-rights', '/legal/privacy', '/legal/terms', '/medical-aesthetics', '/medical-aesthetics/before-and-after', '/medical-aesthetics/gift-cards', '/medical-aesthetics/injectables', '/medical-aesthetics/laser', '/medical-aesthetics/mens-aesthetics', '/medical-aesthetics/pricing', '/medical-aesthetics/skin-health-plans', '/medical-aesthetics/skin-treatments', '/pain-centre', '/pain-centre/back-neck', '/pain-centre/first-visit', '/pain-centre/joint-pain', '/pain-centre/nerve-blocks', '/pain-centre/ohip-coverage', '/pain-centre/trigger-point-injections', '/register', '/rehab-recovery', '/rehab-recovery/chiropractic', '/rehab-recovery/home-program', '/rehab-recovery/insurance-billing', '/rehab-recovery/kinesiology', '/rehab-recovery/massage-therapy', '/rehab-recovery/motor-vehicle-accidents', '/rehab-recovery/physiotherapy', '/rehab-recovery/what-to-bring', '/rehab-recovery/wsib', '/sitemap');
  ALTER TABLE "page_seo" ALTER COLUMN "path" SET DATA TYPE "public"."enum_page_seo_path" USING "path"::"public"."enum_page_seo_path";
  DROP INDEX "locations_finding_us_image_idx";
  DROP INDEX "payload_locked_documents_rels_redirects_id_idx";
  ALTER TABLE "locations" DROP COLUMN "finding_us";
  ALTER TABLE "locations" DROP COLUMN "finding_us_image_id";
  ALTER TABLE "locations" DROP COLUMN "finding_us_image_url";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "redirects_id";
  ALTER TABLE "site_settings" DROP COLUMN "ga_id";`)
}
