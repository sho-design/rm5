import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Route keys and paths added to src/lib/routes.ts after the last migration (vaccines, pregnancy care, the treatment
 * menu, gift cards and the new skincare page). Each value is added only if missing, so the migration is safe to run
 * on a database that already has some of them.
 */
const keys = ['vaccines', 'pregnancy', 'aesMenu', 'aesSkincare']
const keyEnums = ['enum_health_notes_cta_page', 'enum__health_notes_v_version_cta_page', 'enum_faq_link_page', 'enum_announcements_page']
const paths = ['/family-medicine/vaccines', '/family-medicine/pregnancy-care', '/gift-cards', '/medical-aesthetics/treatments', '/medical-aesthetics/skincare']

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const e of keyEnums) {
    for (const k of keys) await db.execute(sql.raw(`ALTER TYPE "public"."${e}" ADD VALUE IF NOT EXISTS '${k}';`))
  }
  for (const p of paths) await db.execute(sql.raw(`ALTER TYPE "public"."enum_page_seo_path" ADD VALUE IF NOT EXISTS '${p}';`))
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  // Postgres cannot drop a value from an enum type; the extra values are harmless.
}
