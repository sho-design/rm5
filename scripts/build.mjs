/**
 * Production build.
 *
 * 1. When DATABASE_URL is set (Vercel + Neon), apply pending Payload
 *    migrations so the schema matches the code being deployed.
 * 2. When SEED_ON_BUILD=1 is also set, fill the database from the typed
 *    content in src/content. Existing documents are never overwritten,
 *    so the flag is safe to leave on; it only adds what is missing and
 *    creates the first admin from ADMIN_EMAIL / ADMIN_PASSWORD if there
 *    are no staff accounts yet.
 * 3. next build.
 */
import { spawnSync } from "node:child_process";

function run(cmd, args, env = {}) {
  const r = spawnSync(cmd, args, { stdio: "inherit", env: { ...process.env, ...env }, shell: process.platform === "win32" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const npx = process.platform === "win32" ? "npx.cmd" : "npx";

if (process.env.DATABASE_URL) {
  console.log("build: applying Payload migrations");
  run(npx, ["payload", "migrate"]);
  if (process.env.SEED_ON_BUILD === "1") {
    console.log("build: filling missing CMS content (existing documents kept)");
    run(npx, ["tsx", "scripts/seed.ts"], { SEED_FILL_ONLY: "1" });
  }
} else {
  console.log("build: DATABASE_URL not set, skipping migrations");
}

run(npx, ["next", "build"]);
