import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import sharp from "sharp";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Announcements, Faq, HealthNotes, Jobs, LegalPages, Locations, Team } from "./payload/collections/content";
import { PageSeo } from "./payload/collections/PageSeo";
import { AuditLog } from "./payload/collections/AuditLog";
import { Redirects } from "./payload/collections/Redirects";
import { SiteSettings } from "./payload/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Database: Postgres (Neon, Canada or us-east-1) when DATABASE_URL is set,
 * which is production; otherwise a local SQLite file for development.
 */
function database() {
  if (process.env.DATABASE_URL) {
    return postgresAdapter({
      pool: { connectionString: process.env.DATABASE_URL, max: 5 },
      // Schema changes in production go through migrations, never live pushes.
      push: false,
      migrationDir: path.resolve(dirname, "payload/migrations"),
    });
  }
  const dir = path.resolve(dirname, "..", "data");
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch {
    /* read-only file system: Payload reports the connection error and the site falls back to static content */
  }
  return sqliteAdapter({ client: { url: process.env.DATABASE_URI || `file:${path.join(dir, "payload.db")}` } });
}

export default buildConfig({
  serverURL: siteUrl,
  routes: { admin: "/admin", api: "/cms-api" },
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " | Restoration Medical admin", description: "Content and search settings for restorationmedical.ca", robots: "noindex, nofollow" },
    dateFormat: "d MMM yyyy HH:mm",
    avatar: "default",
  },
  collections: [HealthNotes, Jobs, Team, Faq, Locations, Announcements, LegalPages, Media, PageSeo, Redirects, Users, AuditLog],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  db: database(),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  graphQL: { disable: true },
  csrf: [siteUrl],
  cors: [siteUrl],
  telemetry: false,
  maxDepth: 2,
  upload: { limits: { fileSize: 8 * 1024 * 1024 } },
});
