import type { PageKey } from "@/lib/routes";

export type DivisionKey = "family" | "pain" | "infusion" | "aesthetics" | "rehab";
export type NavKey = DivisionKey | "about";

export type DivisionLabel =
  | "Family Medicine"
  | "Pain Centre"
  | "Infusion Therapy"
  | "Medical Aesthetics"
  | "Rehab & Recovery";

/** A key/value fact shown in result cards ("Time", "20 minutes"). */
export interface Fact {
  k: string;
  v: string;
}

/** A question and answer row in a sticky-label FAQ. */
export interface QA {
  q: string;
  a: string;
}

/** Link target: a prototype page key, an internal path, or an external URL. */
export type LinkTarget = PageKey | string;

export interface SubNavItem {
  label: string;
  icon: string;
  page: LinkTarget;
}

export interface DivisionService {
  title: string;
  desc: string;
  page: LinkTarget;
  /** index into the division's photo set */
  image?: string;
}

export interface Division {
  key: NavKey;
  label: string;
  tag: string;
  img: string;
  tint: string;
  accent: string;
  eyebrow?: string;
  headline?: string;
  blurb?: string;
  cta?: string;
  ctaPage?: LinkTarget;
  cta2?: string;
  cta2Page?: LinkTarget;
  footCta?: string;
  /** Mega menu: first column (first entry is "All ...") */
  explore: { label: string; page: LinkTarget }[];
  /** Mega menu: second column, all go to /book (or /about/clinics for About) */
  book: string[];
  /** Mega menu: third column, all go to the division page */
  more: string[];
  sub?: SubNavItem[];
  services?: DivisionService[];
}

export interface Location {
  key: "thornhill" | "maple";
  name: string;
  address: string;
  addressLines: [string, string];
  access: string;
  map: string;
  img: string;
  soon: boolean;
  cta: string;
  hours: [string, string][];
  services: DivisionKey[];
  footCta: string;
  footSub: string;
  phone?: string;
  fax?: string;
}

export interface HeroSlide {
  img: string;
  alt: string;
  eyebrow: string;
  h1: string;
  h1em: string;
  p: string;
  cta: string;
  page: LinkTarget;
  sub: string;
}

export interface SearchEntry {
  kind: string;
  label: string;
  sub: string;
  page: LinkTarget;
}

export interface TeamMember {
  name: string;
  role: string;
  divisions: string[];
  preceptorTag?: string;
  initial: string;
  tint: string;
}

export interface LegalSection {
  h: string;
  p: string[];
}

export interface LegalPage {
  slug: "privacy" | "accessibility" | "patient-rights" | "terms";
  key: "privacy" | "accessibility" | "rights" | "terms";
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  contactTitle: string;
  contact: string;
  sections: LegalSection[];
}

export type NoteBlock = { type: "h"; text: string } | { type: "p"; text: string };

export interface HealthNote {
  slug: string;
  division: DivisionLabel;
  title: string;
  dek: string;
  author: string;
  coAuthor?: string;
  date: string;
  readMinutes: number;
  img: string;
  ctaTitle: string;
  ctaSub: string;
  ctaPage: LinkTarget;
  body: NoteBlock[];
}

export interface Job {
  id: string;
  title: string;
  location: "Thornhill" | "Maple" | "Thornhill and Maple";
  division: string;
  type: "Full time" | "Part time" | "Contract" | "Full or part time";
  schedule: string;
  postedDate: string;
  summary: string;
  tint: string;
  featured: boolean;
  requirements: string[];
}

export interface FaqItem {
  category: string;
  q: string;
  a: string;
  linkLabel?: string;
  linkPage?: LinkTarget;
}

export interface Announcement {
  text: string;
  page: LinkTarget;
}

/** Option list entry for choosers (label + optional sub line). */
export interface ChooserOption {
  label: string;
  sub?: string;
}

/** Result card shown beside a chooser. */
export interface ChooserResult {
  title: string;
  p: string;
  facts: Fact[];
  tags?: string[];
  cta: string;
  ctaPage?: LinkTarget;
  link?: string;
  linkPage?: LinkTarget;
}

/** Sub-page chooser entry (women, men, blood, chronic, kids): option and result in one. */
export interface SubChooserItem {
  label: string;
  sub: string;
  tags: string[];
  title: string;
  p: string;
  facts: Fact[];
  cta: string;
}

export interface PathStep {
  n: string;
  time: string;
  t: string;
  d: string;
}

export interface Benefit {
  big: string;
  t: string;
  d: string;
  bg: string;
}

export interface TintCard {
  t: string;
  d: string;
  bg: string;
  meta?: string;
  link?: string;
  page?: LinkTarget;
  time?: string;
}
