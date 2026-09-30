/**
 * Seed the CMS from the typed content modules.
 *
 *   npm run seed                      # content only
 *   ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run seed   # also creates the first admin
 *
 * Safe to re-run: existing documents are matched by slug, key or title and
 * updated rather than duplicated. With SEED_FILL_ONLY=1 (used by the
 * production build when SEED_ON_BUILD=1) existing documents are left
 * untouched and only missing ones are added, so editors' changes survive.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { healthNotes } from "../src/content/notes";
import { jobs } from "../src/content/jobs";
import { team } from "../src/content/team";
import { faqItems } from "../src/content/faq";
import { legalPages } from "../src/content/legal";
import { locations, announcements } from "../src/content/site";
import { blocksToLexical } from "../src/lib/lexical";

process.env.PAYLOAD_SEED = "1";
const fillOnly = process.env.SEED_FILL_ONLY === "1";

type Where = Record<string, { equals: string }>;

async function main() {
  const payload = await getPayload({ config });
  const log = (s: string) => payload.logger.info(s);

  async function upsert(collection: string, where: Where, data: Record<string, unknown>) {
    const existing = await payload.find({ collection: collection as never, where: where as never, limit: 1, overrideAccess: true });
    const found = existing.docs[0] as { id: string | number } | undefined;
    if (found) {
      if (fillOnly) return found.id;
      await payload.update({ collection: collection as never, id: found.id, data: data as never, overrideAccess: true, context: { disableRevalidate: true } });
      return found.id;
    }
    const created = (await payload.create({ collection: collection as never, data: data as never, overrideAccess: true, context: { disableRevalidate: true } })) as { id: string | number };
    return created.id;
  }

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const users = await payload.find({ collection: "users", limit: 1, overrideAccess: true });
    if (users.totalDocs === 0) {
      await payload.create({ collection: "users", data: { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, name: process.env.ADMIN_NAME || "Site admin", role: "admin" }, overrideAccess: true });
      log(`created admin ${process.env.ADMIN_EMAIL}`);
    } else {
      log("staff accounts exist; admin not created");
    }
  }

  const teamIds: Record<string, string | number> = {};
  for (const [i, m] of team.entries()) {
    teamIds[m.name] = await upsert("team", { name: { equals: m.name } }, { name: m.name, role: m.role, divisions: m.divisions, preceptorTag: m.preceptorTag, order: (i + 1) * 10, active: true });
  }
  log(`team: ${team.length}`);

  for (const n of healthNotes) {
    const [mon, year] = n.date.split(" ");
    const date = new Date(`${mon} 1, ${year} 12:00:00`).toISOString();
    await upsert(
      "health-notes",
      { slug: { equals: n.slug } },
      { title: n.title, slug: n.slug, dek: n.dek, division: n.division, date, readMinutes: n.readMinutes, author: teamIds[n.author] ?? null, authorName: n.author, coAuthor: n.coAuthor, heroUrl: n.img, body: blocksToLexical(n.body), cta: { title: n.ctaTitle, sub: n.ctaSub, page: n.ctaPage }, _status: "published" },
    );
  }
  log(`health notes: ${healthNotes.length}`);

  for (const j of jobs) {
    await upsert("jobs", { title: { equals: j.title } }, { title: j.title, location: j.location, division: j.division, type: j.type, schedule: j.schedule, postedDate: new Date(`${j.postedDate}T12:00:00`).toISOString(), summary: j.summary, requirements: j.requirements.map((text) => ({ text })), featured: j.featured, status: "open" });
  }
  log(`jobs: ${jobs.length}`);

  for (const [i, f] of faqItems.entries()) {
    await upsert("faq", { question: { equals: f.q } }, { category: f.category, question: f.q, answer: f.a, linkLabel: f.linkLabel, linkPage: f.linkPage, order: (i + 1) * 10 });
  }
  log(`faq: ${faqItems.length}`);

  for (const l of locations) {
    await upsert(
      "locations",
      { key: { equals: l.key } },
      { name: l.name, key: l.key, addressLine1: l.addressLines[0], addressLine2: l.addressLines[1], mapsUrl: l.map, phone: l.phone, fax: l.fax, hours: l.hours.map(([day, time]) => ({ day, time })), access: l.access, services: l.services, imageUrl: l.img, comingSoon: l.soon, cta: l.cta, footCta: l.footCta, footSub: l.footSub },
    );
  }
  log(`locations: ${locations.length}`);

  for (const a of announcements) {
    await upsert("announcements", { text: { equals: a.text } }, { text: a.text, page: a.page, active: true });
  }
  log(`announcements: ${announcements.length}`);

  for (const p of legalPages) {
    await upsert(
      "legal-pages",
      { slug: { equals: p.slug } },
      { title: p.title, slug: p.slug, eyebrow: p.eyebrow, updatedLabel: p.updated, intro: p.intro, sections: p.sections.map((s) => ({ heading: s.h, paragraphs: s.p.map((text) => ({ text })) })), contactTitle: p.contactTitle, contact: p.contact },
    );
  }
  log(`legal pages: ${legalPages.length}`);

  log("seed complete");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
