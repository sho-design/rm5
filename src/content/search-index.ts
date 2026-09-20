import type { SearchEntry } from "./types";
import { divisions, navOrder } from "./divisions";

/**
 * Site search index, built the same way as the prototype's INDEX:
 * one "Service" row per nav item, one "Explore" row per mega-menu link
 * (after the "All ..." entry), one row per service card, then the
 * hand-written rows below.
 */
const generated: SearchEntry[] = navOrder.flatMap((k) => {
  const d = divisions[k];
  return [
    { kind: "Service", label: d.label, sub: d.tag, page: k },
    ...d.explore.slice(1).map((e) => ({ kind: d.label, label: e.label, sub: "Explore", page: k })),
    ...(d.services ?? []).map((s) => ({ kind: d.label, label: s.title, sub: s.desc, page: k })),
  ];
});

const handWritten: SearchEntry[] = [
  { kind: "About", label: "Teaching clinic", sub: "TMU and Anderson College placements, supervision", page: "about" },
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
  { kind: "Infusion Therapy", label: "Iron therapy", sub: "Tired of being tired? Iron infusions in Thornhill", page: "iron" },
  { kind: "Referrals", label: "Refer a patient", sub: "For referring doctors, fax 905-761-7306", page: "referrals" },
  { kind: "Referrals", label: "Iron infusion referral", sub: "Referrals", page: "referrals" },
  { kind: "Health notes", label: "Health notes", sub: "Notes from your doctors", page: "notes" },
  { kind: "Health note", label: "What to expect at an iron infusion", sub: "Infusion Therapy", page: "notes" },
  { kind: "Health note", label: "Flu shot questions, answered", sub: "Family Medicine", page: "notes" },
  { kind: "Health note", label: "When a headache needs a doctor", sub: "Pain Centre", page: "notes" },
  { kind: "About", label: "Our story", sub: "Why one clinic, one standard of care", page: "story" },
  { kind: "About", label: "Standards of care", sub: "Physician oversight, consent, pricing, complaints", page: "standards" },
  { kind: "About", label: "Careers", sub: "Open roles in Thornhill and Maple", page: "careers" },
  { kind: "Location", label: "Thornhill clinic", sub: "700 Centre St", page: "locations" },
  { kind: "Location", label: "Maple clinic", sub: "Opening soon", page: "locations" },
  { kind: "Team", label: "Dr. Johnny Nguyen", sub: "Medical Director", page: "team" },
  { kind: "Team", label: "Our team", sub: "Physicians, nurses, therapists", page: "team" },
  { kind: "Book", label: "Book an appointment", sub: "Any service", page: "book" },
];

export const searchIndex: SearchEntry[] = [...generated, ...handWritten];

/** Top 8 entries whose label, sub or kind contains the query (case-insensitive). */
export function searchIndexFilter(q: string): SearchEntry[] {
  const ql = q.trim().toLowerCase();
  if (!ql) return [];
  return searchIndex
    .filter((r) => (r.label + " " + r.sub + " " + r.kind).toLowerCase().includes(ql))
    .slice(0, 8);
}
