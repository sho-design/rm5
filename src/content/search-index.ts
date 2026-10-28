import type { SearchEntry } from "./types";
import { divisions, navOrder } from "./divisions";
import { topics } from "./topics";
import { infusionPages, signatureDrips } from "./infusion-site";
import { dripRoute, noteRoute, routes } from "@/lib/routes";
import { searchDocs, type SearchDoc } from "@/lib/search";
import { aliasesFor, searchExtras } from "./search-synonyms";

/**
 * Site search index, built the same way as the prototype's INDEX:
 * one "Service" row per nav item, one "Explore" row per mega-menu link
 * (after the "All ..." entry), one row per service card, then the
 * hand-written rows below.
 */
/** One row per topic page, infusion page and signature drip. */
const pages: SearchEntry[] = [
  ...topics.map((t) => ({ kind: divisions[t.division].label, label: t.page, sub: t.lead, page: t.key })),
  ...infusionPages.map((p) => ({ kind: divisions.infusion.label, label: p.title, sub: p.description, page: p.key })),
  ...signatureDrips.map((d) => ({ kind: "Drip", label: d.t, sub: d.d, page: dripRoute(d.slug) })),
];

const handWritten: SearchEntry[] = [
  { kind: "About", label: "Teaching clinic", sub: "TMU and Anderson College placements, supervision", page: `${routes.about}#teaching` },
  { kind: "About", label: "Frequently asked questions", sub: "Visits, coverage, results, parking", page: "faq" },
  { kind: "Family Medicine", label: "Women’s health", sub: "Pap, contraception, pregnancy, menopause", page: "women" },
  { kind: "Family Medicine", label: "Men’s health", sub: "Yearly checkup, prostate, heart, mood", page: "men" },
  { kind: "Family Medicine", label: "Chronic care", sub: "Diabetes, blood pressure, asthma, thyroid, heart, kidney", page: "chronic" },
  { kind: "Family Medicine", label: "Bloodwork and ECG on site", sub: "Drawn in clinic, fasting before 10am, 10-lead ECG", page: "blood" },
  { kind: "Family Medicine", label: "Children and youth", sub: "Well-baby visits, vaccines, school forms, teen care", page: "kids" },
  { kind: "Prevention", label: "Your year of staying well", sub: "Screenings and checks by season", page: "year" },
  { kind: "Prevention", label: "Know your numbers", sub: "Ferritin, A1c, cholesterol, blood pressure explained", page: "numbers" },
  { kind: "New patients", label: "Register as a patient", sub: "Two minutes, we confirm in 2 days", page: "register" },
  { kind: "Contact", label: "Contact us", sub: "905-709-3222, fax, email, hours", page: "contact" },
  { kind: "About", label: "Uninsured services and fees", sub: "Forms, notes and services OHIP does not cover", page: "fees" },
  { kind: "Family Medicine", label: "Request a prescription renewal", sub: "Existing patients, allow two business days", page: "/family-medicine/prescription-renewals#request" },
  { kind: "Infusion Therapy", label: "Iron therapy", sub: "Tired of being tired? Iron infusions in Thornhill", page: "iron" },
  { kind: "Referrals", label: "Refer a patient", sub: "For referring doctors, fax 905-761-7306", page: "referrals" },
  { kind: "Referrals", label: "Iron infusion referral", sub: "Referrals", page: "referrals" },
  { kind: "Health notes", label: "Health notes", sub: "Notes from your doctors", page: "notes" },
  { kind: "Health note", label: "What to expect at an iron infusion", sub: "Infusion Therapy", page: noteRoute("iron-infusion") },
  { kind: "Health note", label: "Flu shot questions, answered", sub: "Family Medicine", page: noteRoute("flu-shot-faq") },
  { kind: "Health note", label: "When a headache needs a doctor", sub: "Pain Centre", page: noteRoute("headache-when-to-see") },
  { kind: "About", label: "Our story", sub: "Why one clinic, one standard of care", page: "story" },
  { kind: "About", label: "Standards of care", sub: "Physician oversight, consent, pricing, complaints", page: "standards" },
  { kind: "About", label: "Careers", sub: "Open roles in Thornhill and Maple", page: "careers" },
  { kind: "Location", label: "Thornhill clinic", sub: "700 Centre St", page: "locations" },
  { kind: "Location", label: "Maple clinic", sub: "Opening soon", page: "locations" },
  { kind: "Team", label: "Dr. Johnny Nguyen", sub: "Medical Director", page: "team" },
  { kind: "Team", label: "Our team", sub: "Physicians, nurses, therapists", page: "team" },
  { kind: "Book", label: "Book an appointment", sub: "Any service", page: "book" },
];

// Menu rows say what the page is about (its topic lead, or the hand-written row) rather than just "Explore".
const leadFor = (page: string) => topics.find((t) => t.key === page)?.lead ?? handWritten.find((h) => h.page === page)?.sub;

const generated: SearchEntry[] = navOrder.flatMap((k) => {
  const d = divisions[k];
  return [
    { kind: "Service", label: d.label, sub: d.tag, page: k },
    ...d.explore.slice(1).map((e) => ({ kind: d.label, label: e.label, sub: leadFor(e.page) ?? "Explore", page: e.page })),
    ...(d.services ?? []).map((s) => ({ kind: d.label, label: s.title, sub: s.desc, page: s.page })),
  ];
});


/** Same label and destination appear once (menu rows and page rows overlap). */
export const searchIndex: SearchEntry[] = [...generated, ...pages, ...handWritten].filter(
  (r, i, all) => all.findIndex((x) => x.label.toLowerCase() === r.label.toLowerCase() && x.page === r.page) === i,
);

/**
 * The small index built into the page: labels, summaries and search
 * aliases. The overlay uses it straight away and swaps in the full index
 * (page text, FAQ answers, health notes, team) from /search-index.json
 * once that has loaded.
 */
export const baseSearchDocs: SearchDoc[] = [
  ...searchIndex.map((r) => ({ kind: r.kind, label: r.label, sub: r.sub, page: r.page, keys: aliasesFor(r.page) })),
  ...searchExtras,
];

/** Top 8 matches in the built-in index. */
export function searchIndexFilter(q: string): SearchDoc[] {
  return searchDocs(baseSearchDocs, q);
}
