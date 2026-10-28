import { aboutTeaching, divisions, navOrder } from "@/content/divisions";
import { deepDives } from "@/content/deep";
import { topics } from "@/content/topics";
import { infusionCopy, infusionPages, infusionTeam, signatureDrips, shots, ingredients, concerns, honestClaims, infusionSteps, pricingPrinciples, memberships } from "@/content/infusion-site";
import * as sub from "@/content/subpages";
import * as kids from "@/content/kids";
import * as iron from "@/content/iron";
import * as about from "@/content/about";
import * as referrals from "@/content/referrals";
import { numbers, screeningDue, yearSeasons } from "@/content/prevention";
import { feesCopy, wayfindingCopy } from "@/content/patient-help";
import { baseSearchDocs } from "@/content/search-index";
import { aliasesFor, faqAliases } from "@/content/search-synonyms";
import { getFaq, getHealthNotes, getJobs, getLegalPages, getLocations, getTeam, getUninsuredFees } from "@/lib/cms";
import { href, noteRoute, routes } from "@/lib/routes";
import { wordsOf, type SearchDoc } from "@/lib/search";

/** Keys whose values are never page text (images, colours, links, ids). */
const SKIP = new Set(["img", "imgAlt", "image", "photo", "src", "bg", "tint", "accent", "icon", "page", "href", "url", "linkPage", "ctaPage", "cta2Page", "ctaTo", "cta2To", "slug", "key", "color", "maxHeight", "path"]);

/** All human-readable strings inside a content value, joined. */
function textOf(value: unknown, depth = 0): string {
  if (depth > 8 || value == null) return "";
  // Colours, links, paths and SVG path data are not text.
  if (typeof value === "string") return /^(#|https?:|\/|[Mm]\s?-?\d)/.test(value) ? "" : value;
  if (typeof value !== "object") return "";
  if (Array.isArray(value)) return value.map((v) => textOf(v, depth + 1)).join(" ");
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => (SKIP.has(k) ? "" : textOf(v, depth + 1)))
      .join(" ");
  }
  return "";
}

/** Page text by destination (page key or path), from the static content modules behind each page. */
function staticPageText(): Record<string, string> {
  const t: Record<string, string> = {};
  const add = (page: string, ...parts: unknown[]) => {
    t[page] = `${t[page] ?? ""} ${parts.map((p) => textOf(p)).join(" ")}`;
  };
  for (const k of navOrder) add(k, divisions[k], k === "about" ? aboutTeaching : deepDives[k as keyof typeof deepDives]);
  for (const topic of topics) add(topic.key, topic);
  add("women", sub.womenOptions, sub.womenScreen, sub.womenFaq, sub.womenCopy, screeningDue(30, true), screeningDue(50, true));
  add("men", sub.menOptions, sub.menDecades, sub.menFaq, sub.menCopy, screeningDue(50, false));
  add("blood", sub.bloodOptions, sub.bloodPath, sub.bloodTips, sub.bloodFaq);
  add("chronic", sub.chronicOptions, sub.chronicRhythm, sub.chronicVsPain, sub.chronicFaq);
  add("kids", kids.kidsAges, kids.kidsFaq, kids.immunizations, kids.kidsPath, kids.kidsForms, kids.kidsSick, kids.kidsCopy);
  add("iron", iron.ironSymptoms, iron.ironWho, iron.ironSteps, iron.ironVisit, iron.ironPrices, iron.ironFaq);
  add("numbers", numbers);
  add("year", yearSeasons(45, true), yearSeasons(45, false), yearSeasons(70, true));
  add("story", about.storyTimeline, about.storyValues, about.storyPage);
  add("standards", about.standardsList, about.standardsPage);
  add("careers", about.careersWhy, about.careersCopy);
  add("locations", about.locationsCopy, wayfindingCopy);
  add("referrals", referrals.refServices, referrals.refSteps, referrals.referralsPage);
  add("fees", feesCopy);
  add("drips", infusionCopy.drips, signatureDrips);
  add("shots", infusionCopy.shots, shots);
  add("ingredients", infusionCopy.ingredients, ingredients);
  add("concerns", infusionCopy.concerns, concerns);
  add("honest", infusionCopy.honest, honestClaims);
  add("infusionHow", infusionCopy.how, infusionSteps);
  add("infusionPricing", infusionCopy.pricing, pricingPrinciples, memberships);
  add("metabolic", infusionCopy.metabolic);
  add("infusionTeam", infusionTeam);
  for (const p of infusionPages) add(p.key, p.description);
  return t;
}

const firstSentence = (s: string, max = 120) => {
  const one = s.split(/(?<=\.)\s/)[0] ?? s;
  return one.length > max ? `${one.slice(0, max - 1).replace(/\s+\S*$/, "")}…` : one;
};

/**
 * The full search index served at /search-index.json: the built-in rows
 * with each page's text attached, plus FAQ answers, health notes, team,
 * open roles, clinics, fees and legal pages. CMS collections come through
 * lib/cms (static content when the CMS is not connected).
 */
export async function buildSearchIndex(): Promise<SearchDoc[]> {
  const [faq, notes, team, jobs, locations, fees, legal] = await Promise.all([getFaq(), getHealthNotes(), getTeam(), getJobs(), getLocations(), getUninsuredFees(), getLegalPages()]);

  const text = staticPageText();
  for (const l of locations) text.locations = `${text.locations ?? ""} ${l.name} ${l.address} ${l.access} ${l.findingUs ?? ""} ${l.hours.map((h) => h.join(" ")).join(" ")}`;
  text.fees = `${text.fees ?? ""} ${fees.map((f) => `${f.service} ${f.note ?? ""}`).join(" ")}`;
  for (const p of legal) text[p.key] = `${p.title} ${p.intro} ${p.sections.map((s) => `${s.h} ${s.p.join(" ")}`).join(" ")}`;

  // Page text goes on the first row for each destination; later rows for the same page stay label-only.
  const withText = new Set<string>();
  const rows: SearchDoc[] = baseSearchDocs.map((r) => {
    const body = text[r.page] ?? text[Object.keys(routes).find((k) => routes[k as keyof typeof routes] === r.page) ?? ""];
    if (!body || withText.has(r.page)) return r;
    withText.add(r.page);
    return { ...r, words: wordsOf(body) };
  });

  const faqRows: SearchDoc[] = faq.items.map((f) => ({
    kind: "FAQ",
    label: f.q,
    sub: firstSentence(f.a),
    page: `${routes.faq}?q=${encodeURIComponent(f.q)}#faq-${encodeURIComponent(f.category)}`,
    words: wordsOf(f.a),
    keys: faqAliases[f.q],
    weight: 0.9,
  }));

  const noteRows: SearchDoc[] = notes.map((n) => ({
    kind: "Health note",
    label: n.title,
    sub: n.dek,
    page: noteRoute(n.slug),
    keys: aliasesFor(noteRoute(n.slug)),
    words: wordsOf(`${n.division} ${n.author} ${n.body.map((b) => b.text).join(" ")}`),
    weight: 0.9,
  }));

  const teamRows: SearchDoc[] = team.map((m) => ({
    kind: "Team",
    label: m.name,
    sub: [m.role, m.divisions.join(", ")].filter(Boolean).join(", "),
    page: routes.team,
    group: `team:${m.name}`,
    weight: 0.75,
    words: wordsOf(`${m.preceptorTag ?? ""} ${m.bio ?? ""} ${(m.credentials ?? []).join(" ")}`),
  }));

  const jobRows: SearchDoc[] = jobs.map((j) => ({
    kind: "Careers",
    label: j.title,
    sub: `${j.location}, ${j.type}`,
    page: href("careers"),
    group: `job:${j.id}`,
    weight: 0.75,
    words: wordsOf(`${j.division} ${j.schedule} ${j.summary} ${j.requirements.join(" ")}`),
  }));

  return [...rows, ...faqRows, ...noteRows, ...teamRows, ...jobRows];
}
