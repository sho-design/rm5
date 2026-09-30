/**
 * Read-side façade for CMS content. Pages call these functions only.
 *
 * Source of truth is Payload CMS (admin at /admin). When the database is
 * unreachable or a collection is still empty (a fresh checkout before the
 * seed, or a build without DATABASE_URL), each getter falls back to the
 * typed content modules in src/content so the site always builds.
 */
import { getPayload, type Payload } from "payload";
import { healthNotes as staticNotes } from "@/content/notes";
import { jobs as staticJobs } from "@/content/jobs";
import { team as staticTeam } from "@/content/team";
import { faqItems as staticFaq, faqCategories } from "@/content/faq";
import { legalPages as staticLegal } from "@/content/legal";
import { locations as staticLocations, announcements as staticAnnouncements } from "@/content/site";
import { tints, divisionKeyByLabel } from "@/content/divisions";
import { images } from "@/content/images";
import type { Announcement, FaqItem, HealthNote, Job, LegalPage, Location, TeamMember, DivisionLabel, DivisionKey } from "@/content/types";
import { lexicalToBlocks } from "./lexical";

let client: Promise<Payload> | null = null;

/** Payload local API client, or null when the CMS is not configured. */
export async function cms(): Promise<Payload | null> {
  if (!process.env.PAYLOAD_SECRET) return null;
  try {
    if (!client) client = import("@payload-config").then((m) => getPayload({ config: m.default }));
    return await client;
  } catch (err) {
    client = null;
    if (process.env.NODE_ENV !== "production") console.warn("[cms] unavailable, using static content:", (err as Error).message);
    return null;
  }
}

type Doc = Record<string, unknown>;
const str = (v: unknown, d = "") => (typeof v === "string" ? v : d);
const num = (v: unknown, d = 0) => (typeof v === "number" ? v : d);
const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

/** URL of an uploaded image (largest useful size), or a fallback string. */
export function mediaUrl(v: unknown, fallback = ""): string {
  if (v && typeof v === "object") {
    const m = v as { url?: string; sizes?: Record<string, { url?: string }> };
    return m.sizes?.hero?.url || m.sizes?.card?.url || m.url || fallback;
  }
  return fallback;
}

async function findAll(collection: string, options: { sort?: string; where?: Record<string, unknown>; depth?: number } = {}): Promise<Doc[] | null> {
  const p = await cms();
  if (!p) return null;
  try {
    const res = await p.find({ collection: collection as never, limit: 500, depth: options.depth ?? 1, sort: options.sort, where: options.where as never, overrideAccess: false });
    return res.docs as Doc[];
  } catch (err) {
    if (process.env.NODE_ENV !== "production") console.warn(`[cms] ${collection} unavailable:`, (err as Error).message);
    return null;
  }
}

const monthLabel = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-CA", { month: "short", year: "numeric", timeZone: "America/Toronto" });
};

function toNote(d: Doc): HealthNote {
  const division = str(d.division) as DivisionLabel;
  const key = divisionKeyByLabel[division] ?? "family";
  const author = d.author && typeof d.author === "object" ? str((d.author as Doc).name) : "";
  const cta = (d.cta as Doc) ?? {};
  return {
    slug: str(d.slug),
    division,
    title: str(d.title),
    dek: str(d.dek),
    author: author || str(d.authorName, "Restoration Medical"),
    coAuthor: str(d.coAuthor) || undefined,
    date: monthLabel(str(d.date)),
    readMinutes: num(d.readMinutes, 2),
    img: mediaUrl(d.hero, str(d.heroUrl) || images.division[key]),
    ctaTitle: str(cta.title),
    ctaSub: str(cta.sub),
    ctaPage: str(cta.page, key),
    body: lexicalToBlocks(d.body),
  };
}

export async function getHealthNotes(): Promise<HealthNote[]> {
  const docs = await findAll("health-notes", { sort: "-date" });
  return docs && docs.length ? docs.map(toNote) : staticNotes;
}
export async function getHealthNote(slug: string): Promise<HealthNote | undefined> {
  return (await getHealthNotes()).find((n) => n.slug === slug);
}

const jobTint: Record<string, string> = { "Family Medicine": tints[0], "Pain Centre": tints[3], "Medical Aesthetics": "#F3ECF7", "Infusion Therapy": tints[2], "Rehab and Recovery": tints[1], "Front desk": tints[0], Operations: tints[0] };

function toJob(d: Doc): Job {
  return {
    id: String(d.id),
    title: str(d.title),
    location: str(d.location) as Job["location"],
    division: str(d.division),
    type: str(d.type) as Job["type"],
    schedule: str(d.schedule),
    postedDate: str(d.postedDate).slice(0, 10),
    summary: str(d.summary),
    tint: jobTint[str(d.division)] ?? tints[0],
    featured: !!d.featured,
    requirements: arr<Doc>(d.requirements).map((r) => str(r.text)),
  };
}

export async function getJobs(): Promise<Job[]> {
  const docs = await findAll("jobs", { sort: "-postedDate", where: { status: { equals: "open" } } });
  return docs && docs.length ? docs.map(toJob) : staticJobs;
}

function toMember(d: Doc, i: number): TeamMember {
  const name = str(d.name);
  return {
    name,
    role: str(d.role),
    divisions: arr<string>(d.divisions),
    preceptorTag: str(d.preceptorTag) || undefined,
    initial: name.startsWith("Dr. ") ? (name.split(" ").pop()?.[0] ?? "") : name[0] ?? "",
    tint: tints[i % 5],
    photo: mediaUrl(d.photo, str(d.photoUrl)) || undefined,
    bio: str(d.bio) || undefined,
    credentials: arr<Doc>(d.credentials).map((c) => str(c.text)),
  };
}

export async function getTeam(): Promise<TeamMember[]> {
  const docs = await findAll("team", { sort: "order", where: { active: { equals: true } } });
  return docs && docs.length ? docs.map(toMember) : staticTeam;
}

function toFaq(d: Doc): FaqItem {
  return { category: str(d.category), q: str(d.question), a: str(d.answer), linkLabel: str(d.linkLabel) || undefined, linkPage: str(d.linkPage) || undefined };
}

export async function getFaq(): Promise<{ items: FaqItem[]; categories: string[] }> {
  const docs = await findAll("faq", { sort: "order" });
  return { items: docs && docs.length ? docs.map(toFaq) : staticFaq, categories: faqCategories };
}

function toLocation(d: Doc): Location {
  const key = str(d.key) as Location["key"];
  const fallback = staticLocations.find((l) => l.key === key);
  const line1 = str(d.addressLine1);
  const line2 = str(d.addressLine2);
  return {
    key,
    name: str(d.name),
    address: `${line1}, ${line2}`,
    addressLines: [line1, line2],
    access: str(d.access),
    map: str(d.mapsUrl),
    img: mediaUrl(d.image, str(d.imageUrl) || fallback?.img || images.division.about),
    soon: !!d.comingSoon,
    cta: str(d.cta),
    hours: arr<Doc>(d.hours).map((h) => [str(h.day), str(h.time)] as [string, string]),
    services: arr<DivisionKey>(d.services),
    footCta: str(d.footCta),
    footSub: str(d.footSub),
    phone: str(d.phone) || undefined,
    fax: str(d.fax) || undefined,
  };
}

export async function getLocations(): Promise<Location[]> {
  const docs = await findAll("locations", { sort: "createdAt" });
  if (!docs || !docs.length) return staticLocations;
  const order = ["thornhill", "maple"];
  return docs.map(toLocation).sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const now = new Date().toISOString();
  const docs = await findAll("announcements", {
    sort: "-createdAt",
    where: { and: [{ active: { equals: true } }, { or: [{ startsAt: { exists: false } }, { startsAt: { less_than_equal: now } }] }, { or: [{ endsAt: { exists: false } }, { endsAt: { greater_than_equal: now } }] }] },
  });
  if (!docs || !docs.length) return staticAnnouncements;
  return docs.slice(0, 3).map((d) => ({ text: str(d.text), page: str(d.url) || str(d.page, "home") }));
}

const legalKey: Record<string, LegalPage["key"]> = { privacy: "privacy", accessibility: "accessibility", "patient-rights": "rights", terms: "terms" };

function toLegal(d: Doc): LegalPage {
  const slug = str(d.slug) as LegalPage["slug"];
  return {
    slug,
    key: legalKey[slug],
    eyebrow: str(d.eyebrow),
    title: str(d.title),
    updated: str(d.updatedLabel),
    intro: str(d.intro),
    contactTitle: str(d.contactTitle),
    contact: str(d.contact),
    sections: arr<Doc>(d.sections).map((s) => ({ h: str(s.heading), p: arr<Doc>(s.paragraphs).map((p) => str(p.text)) })),
  };
}

export async function getLegalPages(): Promise<LegalPage[]> {
  const docs = await findAll("legal-pages");
  if (!docs || !docs.length) return staticLegal;
  const order = ["privacy", "accessibility", "patient-rights", "terms"];
  return docs.map(toLegal).sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
}
export async function getLegalPage(slug: string): Promise<LegalPage | undefined> {
  return (await getLegalPages()).find((p) => p.slug === slug);
}

export interface PageSeoOverride {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

/** Per-page SEO override from the CMS, if one was saved for this path. */
export async function getPageSeo(path: string): Promise<PageSeoOverride | null> {
  const docs = await findAll("page-seo", { where: { path: { equals: path } } });
  const d = docs?.[0];
  if (!d) return null;
  return { title: str(d.title) || undefined, description: str(d.description) || undefined, ogImage: mediaUrl(d.ogImage) || undefined, canonical: str(d.canonical) || undefined, noIndex: !!d.noIndex };
}

export interface SiteSettingsData {
  siteName: string;
  titleSuffix: string;
  defaultDescription: string;
  defaultOgImage?: string;
  gtmId?: string;
}

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  const p = await cms();
  if (!p) return null;
  try {
    const g = (await p.findGlobal({ slug: "site-settings" as never, depth: 1 })) as Doc;
    return { siteName: str(g.siteName, "Restoration Medical"), titleSuffix: str(g.titleSuffix, " | Restoration Medical"), defaultDescription: str(g.defaultDescription), defaultOgImage: mediaUrl(g.defaultOgImage) || undefined, gtmId: str(g.gtmId) || undefined };
  } catch {
    return null;
  }
}
