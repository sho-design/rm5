/**
 * Infusion Therapy pages on this site: drips and shots, single drip pages,
 * by concern, metabolic program, how it works, the honest menu, ingredients,
 * pricing and memberships, and the infusion team.
 *
 * Copy is taken from design/handoff/Infusion Site Fraunces.dc.html (the
 * Infusion division reference). The handoff first planned these pages on a
 * separate site, infusion.restorationmedical.ca; the clinic asked for them
 * here instead. Strings wrapped in `draft()` are new wording written to join
 * the pages together and need clinic approval (docs/content-review.md).
 */
import { bookFor, type PageKey } from "@/lib/routes";

function draft(text: string): string {
  return text;
}

/** Evidence label shown on every drip and ingredient. */
export type Evidence = "Established" | "Supported" | "Emerging" | "Supervised";
/**
 * Evidence labels are hidden until a physician defines each one in writing: three reviewers read them as
 * efficacy ratings, and "Supervised" is not an evidence level (clinic decision, Nov 2026). Set to true to show.
 */
export const showEvidenceLabels = false;

/** Treatment families and their accent colours (from the Infusion design file). */
export const dripFamilies = {
  // Families renamed to describe contents, not results (clinic decision, Nov 2026). Colours unchanged.
  Foundation: "#7FC8A9",
  "Skin and hair": "#D9A6E0",
  Vitamins: "#F5C451",
  "Signature and NAD+": "#F0955C",
  Program: "#6FB4E8",
  Hydration: "#9BD0E0",
} as const;

export type DripFamily = keyof typeof dripFamilies;
// Defined after signatureDrips below so families with no drips on the menu (Program) get no empty filter.

export interface DripDetail {
  whatItIs: string;
  supports: string[];
  insideNote: string;
  /** Ingredient names, matched against `ingredients`. */
  inside: string[];
  addOns: string;
  addOnsNote: string;
  expect: string;
  helpsWith: string[];
  /** Extra fact shown in the hero row, e.g. "Kidney health screened". */
  screen?: string;
}

export interface Drip {
  slug: string;
  t: string;
  f: DripFamily;
  d: string;
  ev: Evidence;
  /** Former menu name, shown on the page so receipts match (names changed November 2026). */
  was?: string;
  /** Full page copy. Drips without it get a short page that is kept out of search until it exists. */
  detail?: DripDetail;
}

// Names describe what is in the drip, not a result (CPSO, Health Canada prescription drug advertising).
// Old names, for staff: Healing (Myers'), Radiance, Hair & Nails, Seasonal Support, Kingmaker/Queenmaker,
// Recover, Revive, NAD+ Longevity. Pregnancy Care was removed (a pregnant patient needing fluids sees a doctor,
// round 18) and now redirects to pregnancy care. Beauty Elixir was removed (it overlapped Radiance and
// made a beauty claim); Metabolic now shows only on the metabolic program page. Old addresses redirect.
export const signatureDrips: Drip[] = [
  { slug: "foundation", t: "Foundation", f: "Foundation", d: "Hydration and core nutrients to start from.", ev: "Established" },
  {
    slug: "myers", was: "Healing (Myers’)",
    t: draft("Myers’ cocktail"),
    f: "Foundation",
    d: "A classic blend of B vitamins, vitamin C, magnesium and calcium.",
    ev: "Established",
    detail: {
      whatItIs: draft("Our version of the classic Myers’ cocktail, a well-known blend of B vitamins, vitamin C, magnesium and calcium."),
      supports: [draft("Contains B vitamins, vitamin C, magnesium and calcium."), draft("Given with fluids, so it also adds hydration.")],
      insideNote: "A consult and screening confirm the final blend for you.",
      inside: ["B-Complex", "Vitamin C", "Magnesium", "Calcium", "B12 (methylcobalamin)"],
      addOns: "Glutathione, zinc, amino blend",
      addOnsNote: draft("Added only on a physician's order, after a quick screening."),
      expect: "Around forty-five minutes in the chair. The magnesium can bring a gentle warmth, which your nurse paces for comfort.",
      helpsWith: [draft("Vitamins"), draft("Hydration")],
      screen: "Kidney health screened",
    },
  },
  { slug: "antioxidant", was: "Radiance", t: draft("Antioxidant drip"), f: "Skin and hair", d: draft("Antioxidant vitamins. Ingredients and doses are confirmed with you at your consult."), ev: "Supported" },
  { slug: "biotin", was: "Hair & Nails", t: draft("Biotin drip"), f: "Skin and hair", d: draft("Built around biotin, a B vitamin. Tell us before any blood test, as biotin can affect some results."), ev: "Supported" },
  { slug: "vitamin-c-zinc", was: "Seasonal Support", t: draft("Vitamin C, zinc and B vitamins"), f: "Vitamins", d: draft("A vitamin and mineral blend."), ev: "Supported" },
  // Was "Kingmaker", "Vitality support for men". Square sells it as IV Kingmaker and IV Queenmaker, the same
  // recipe; a men's or women's drip implies a sex-specific benefit (CPSO), so the site shows one unisex drip.
  { slug: "signature", t: draft("Signature drip"), f: "Signature and NAD+", d: draft("Our house blend, the same for everyone. Ingredients and doses are confirmed with you at your consult."), ev: "Supported" },
  { slug: "after-exercise", was: "Recover", t: draft("Hydration after exercise"), f: "Hydration", d: draft("Fluids and electrolytes, with amino acids."), ev: "Supported" },
  { slug: "hydration", was: "Revive", t: draft("Hydration drip"), f: "Hydration", d: draft("Fluids and electrolytes."), ev: "Supported" },
  { slug: "nad", was: "NAD+ Longevity", t: draft("NAD+ drip"), f: "Signature and NAD+", d: draft("NAD+, a coenzyme found in every cell. The evidence for NAD+ drips is still developing."), ev: "Emerging" },
];

/** Part of the medical weight management program only, so not on the drip menu (no weight-loss marketing). */
export const metabolicDrip: Drip = { slug: "metabolic", t: "Metabolic", f: "Program", d: "Part of our physician-supervised medical weight management program.", ev: "Emerging" };

export const dripBySlug = (slug: string) => signatureDrips.find((d) => d.slug === slug);

/** Filter chips: only families that have a drip on the menu (a tester found "Program" with 0 drips). */
export const dripFamilyList = (Object.keys(dripFamilies) as DripFamily[]).filter((f) => signatureDrips.some((d) => d.f === f));

/** The Injection Bar. */
export const shots: { t: string; d: string }[] = [
  { t: "B12", d: draft("A B vitamin") },
  { t: "B-Complex", d: draft("Several B vitamins") },
  { t: "Vitamin D", d: draft("A fat-soluble vitamin") },
  { t: "Glutathione", d: draft("An antioxidant") },
  { t: "Vitamin C + Zinc", d: draft("A vitamin and a mineral") },
  { t: "MIC blend", d: "Program add-on" },
  { t: "L-Carnitine", d: "Program add-on" },
  { t: "Amino blend", d: draft("Amino acids") },
  { t: "NAD+", d: draft("A coenzyme") },
  { t: "Biotin", d: draft("A B vitamin") },
];

export const ingredients: { t: string; d: string }[] = [
  { t: "B-Complex", d: "A full B-vitamin team for energy metabolism." },
  { t: "Vitamin C", d: "An antioxidant vitamin. Dose listed at your consult." },
  { t: "Magnesium", d: "Supports muscle function and recovery." },
  { t: "Calcium", d: "Supports bones and muscle function." },
  { t: "B12 (methylcobalamin)", d: "Supports steady energy and a healthy nervous system." },
];

export interface Concern {
  t: string;
  d: string;
  cta: string;
  tag: "Wellness" | "Program" | "Clinical";
  page: string;
}

/** By concern. Wellness concerns open the drips list on the matching family. */
const dripsIn = (f: DripFamily) => `/infusion-therapy/drips?family=${encodeURIComponent(f)}`;
export const concerns: Concern[] = [
  // Fatigue goes to a doctor's visit first, not straight to paid drips (CPSO: no promoting services a patient may not need).
  { t: "Low energy & fatigue", d: draft("Start with a family doctor visit and bloodwork. OHIP-insured."), cta: draft("Book a visit"), tag: "Clinical", page: `${bookFor("family", "concern")}&reason=${encodeURIComponent("Low energy")}` },
  { t: draft("Vitamin drips"), d: draft("Vitamin and mineral blends, given by a nurse."), cta: "Explore", tag: "Wellness", page: dripsIn("Vitamins") },
  { t: draft("Skin and hair"), d: draft("Antioxidant and biotin drips."), cta: "Explore", tag: "Wellness", page: dripsIn("Skin and hair") },
  { t: draft("After exercise"), d: draft("Fluids, electrolytes and amino acids."), cta: "Explore", tag: "Wellness", page: dripsIn("Hydration") },
  { t: draft("NAD+"), d: draft("Where the evidence is still developing, we say so."), cta: "Explore", tag: "Wellness", page: dripsIn("Signature and NAD+") },
  { t: "Weight & metabolism", d: "Physician-supervised medical weight management.", cta: "Explore", tag: "Program", page: "metabolic" },
  { t: "Iron deficiency & low ferritin", d: "When fatigue may be about iron.", cta: "Clinical pathway", tag: "Clinical", page: "iron" },
  { t: draft("Hydration"), d: draft("Fluids and electrolytes."), cta: "Explore", tag: "Wellness", page: dripsIn("Hydration") },
];

export const whyPhysicianLed = [
  { t: "Physician oversight", d: draft("Every treatment is reviewed by our physician.") },
  { t: "RN administration", d: "Your infusion is placed and monitored by a registered nurse." },
  { t: "Honest screening", d: "We screen first, and we will adjust or decline on clinical grounds." },
  { t: "Sourcing standards", d: "Pharmaceutical-grade ingredients, prepared to clinical standards." },
];

export const honestClaims = [
  { p: draft("Claims that a drip detoxes or burns fat."), s: "Metabolic support happens inside a physician-guided program, with real screening and follow-up. No miracles, and we say so." },
  { p: "“Boosts your defences.”", s: draft("We tell you what is in the bag and the dose at your consult. We do not make treatment or prevention claims that the evidence does not support.") },

  { p: "“Prevent illness before it starts.”", s: "We cannot promise you will not get sick. Preventing disease is not a claim we make, and we will not make it." },
];

export const infusionSteps = [
  { n: "01", t: "Consult & screen", d: draft("We review your health first, and we adjust or decline a treatment if it is not right for you.") },
  { n: "02", t: draft("Your treatment"), d: draft("Our physician reviews every plan, and any change to a drip is on a physician's order. No pressure.") },
  { n: "03", t: "Relax while we care for you", d: "Settle into the chair in a calm clinical setting. We stay with you from the first drop to the last." },
];

export const pricingPrinciples = [
  { n: "01", t: "A consult first", d: "We confirm what is right for you before anything else. You will know what is involved, and what it costs, before you decide." },
  { n: "02", t: "Personalized, so priced that way", d: "Because we tailor and screen, the right plan differs from person to person. We share clear, itemized costs at your consult." },
  { n: "03", t: "No pressure, no upsell", d: "We would rather you do less, more thoughtfully. We will never push add-ons you do not need." },
  { n: "04", t: "Elective, and clear about it", d: "Wellness infusions are elective and not covered by OHIP. Clinically indicated care, like iron therapy, may be different." },
];

export const memberships = {
  eyebrow: "Memberships",
  title: "Regular care, made simpler.",
  p: "If wellness is part of your routine, a membership makes it easier to keep a steady rhythm, without changing the standard of care.",
  points: [
    "A simple way to keep a regular wellness routine consistent.",
    "A consistent treatment-plan price on drips and shots, with a predictable monthly rhythm.",
    "Priority booking and the same physician oversight on every visit.",
    "No long lock-ins. Your health, your pace.",
  ],
  note: "Membership details and current pricing are shared at your consult as they are finalized.",
};

export const infusionTeam = {
  eyebrow: "Our team",
  title: "The people behind your care.",
  lead: draft("A physician reviews every plan; registered nurses give every treatment. Calm, careful, and accountable."),
  // Comparative lines removed (CPSO): was "delivered by people, not a counter".
  director: {
    role: "Medical Director",
    name: "Dr. Johnny Nguyen",
    title: "Interventional Pain Physician, University of Toronto MD",
    bio: "Over a decade of combined experience as a family doctor, emergency doctor, and pain-management physician. Owner of Restoration Medical Thornhill and Restoration Medical (Vaughan), centres for comprehensive, compassionate, multidisciplinary care.",
    credentials: ["Family medicine residency", "Emergency medicine fellowship", "Advanced Diplomate, Interventional Pain"],
  },
  chairTitle: "At the chair",
  chairNote: "Photographs are added as each team member joins the public page.",
  people: [
    ...["Michelle", "Anh", "Kim", "Marika", "Kelly", "Tiffany", "Rose", "Hillary", "Aastha"].map((name) => ({ name, role: "Registered Nurse" })),
    { name: "Karen", role: "Lab Technician" },
  ],
  band: { title: "Care you can put a face to.", sub: "Book a consult and meet the team. We take the time to understand what you need before we suggest anything." },
};

/** Section and page copy, verbatim from the Infusion design file unless wrapped in draft(). */
export const infusionCopy = {
  smallPrint:
    "Wellness infusion services are elective and are not covered by OHIP. Iron therapy may be clinically indicated. Every treatment is physician-reviewed and nurse-administered. Information on this site is educational and is not medical advice. Results vary from person to person. A consult confirms what is right for you.",
  wellnessNote: draft("An elective wellness service. Not a treatment for any disease."),
  band: {
    title: "Care that begins with you.",
    sub: "Wellness or clinical, the standard of care is the same. A consult confirms what is right for you. No pricing surprises, no pressure.",
    cta: "Book a consult",
    cta2: "Is this right for me?",
  },
  drips: {
    eyebrow: "Browse our drips & shots",
    title: "Our drips and shots.",
    lead: draft("Drips are grouped by what is in them. Pick a group to narrow the list, or browse everything."),
    all: "All families",
    signature: draft("All drips"),
    count: (n: number) => `${n} drips, about 45 minutes in the chair`,
    shotsTitle: "Shots: The Injection Bar",
    shotsSub: "10 shots, about 10 minutes",
    buildTitle: "Build your own",
    buildSub: "Choose a base and add-ons with your nurse, after a quick screening.",
    buildCta: "Start with a consult",
    viewAll: draft("See the Injection Bar"),
  },
  drip: {
    back: "All drips",
    time: "~45 min",
    elective: "Elective wellness",
    /** Clinic fact: every drip is mixed at the appointment, never ahead (a tester found it only on the claims page). */
    mixed: draft("Mixed by our nurse at your appointment"),
    was: draft("Formerly"),
    /** Tired people reached drip pages with no pointer to a doctor first (round 16, CPSO: no promoting services a patient may not need). */
    tired: draft("Often tired? Start with a family doctor visit and bloodwork. OHIP-insured."),
    tiredCta: draft("Book a doctor visit"),
    unwell: draft("Being sick or cannot keep fluids down? A drip is not the place to start. Call us the same day at 905-709-3222, or Health811 at 811 when we are closed. Pregnant? Please see a doctor before any drip."),
    pregnancyCta: draft("Pregnancy care"),
    shotsUnwell: draft("Being sick, cannot keep fluids down, or pregnant? Please see a doctor before any shot. Call us the same day at 905-709-3222, or Health811 at 811 when we are closed."),
    /** Returning drip clients booked "A consult" from a drip page and lost which drip (round 19). */
    bookDrip: draft("Book this drip"),
    whatItIs: "What it is",
    supports: "Designed to support",
    inside: "What's inside",
    addOns: "Recommended add-ons",
    expect: "What to expect",
    helpsWith: "Helps with",
    confirm: "A consult confirms this is right for you.",
    pending: draft("Ingredients and doses for this drip are confirmed with you at your consult."),
  },
  shots: {
    eyebrow: draft("The Injection Bar"),
    title: "Shots: The Injection Bar",
    lead: "10 shots, about 10 minutes",
  },
  concerns: {
    eyebrow: "Find your starting point",
    title: "Start with how you feel.",
    lead: "Tell us how you want to feel. We will help you find the right support. Most people arrive with a feeling, not a product name.",
    unsureEyebrow: "Not sure where you fit?",
    unsureTitle: "Tell us in your own words.",
    unsureP: "A consult starts with how you feel. Our physician reviews, our nurse tailors, and we only suggest what is right for you.",
  },
  metabolic: {
    eyebrow: draft("Physician-supervised program"),
    title: draft("Metabolic program"),
    lead: "Physician-supervised medical weight management.",
    whatWeSayTitle: draft("What we say."),
    partsTitle: draft("Part of the program."),
    prefill: "I’m interested in the physician-guided metabolic program.",
  },
  how: {
    eyebrow: "How it works",
    title: "How it works, in three steps.",
    lead: "We stay with you from the first drop to the last.",
    rightEyebrow: "Is this right for me?",
    rightTitle: "We screen first, and we will adjust or decline on clinical grounds.",
    rightP: "Wellness infusions are elective and not covered by OHIP. Iron therapy may be clinically indicated. Results vary from person to person.",
    whyEyebrow: "Why physician-led matters",
    whyTitle: draft("Physician-led, with screening first."),
    whyP: draft("Screening first, a physician on site, and nurses who do this every day."),
  },
  honest: {
    eyebrow: "The honest menu",
    title: draft("Common claims, and what we say."),
    lead: draft("Screening first, a physician on site, and nurses who do this every day."),
    theySay: draft("Claims you may see online"),
    weSay: draft("What we say"),
    evidenceEyebrow: "Where the evidence is still developing",
    evidenceTitle: draft("Where the evidence is still developing, we say so."),
    evidenceP: draft("Ask at your consult what the evidence supports for each ingredient, and what we will and will not claim."),
  },
  ingredients: {
    eyebrow: "Where the evidence is still developing",
    title: draft("Ingredient library"),
    lead: draft("Where the evidence is still developing, we say so."),
    coreTitle: draft("Core ingredients."),
    shotsTitle: draft("Also given as shots."),
    byEvidenceTitle: draft("Drips by evidence label."),
  },
  pricing: {
    eyebrow: "How pricing works",
    title: "Clear costs, no surprises.",
    lead: "We keep pricing simple and honest: a consult first, clear costs before you decide, and no pressure. Here is how it works, and how memberships can help.",
    askTitle: "Have a question about cost?",
    askP: "Ask us, plainly. A consult gets you clear, personalized numbers, with no obligation.",
  },
} as const;

/** Page registry for search, sitemap and llms.txt. */
export const infusionPages: { key: PageKey; title: string; description: string }[] = [
  { key: "drips", title: infusionCopy.drips.title, description: infusionCopy.drips.lead },
  { key: "shots", title: infusionCopy.shots.title, description: draft("Ten vitamin and nutrient shots at Restoration Medical in Thornhill, about 10 minutes each, physician-reviewed and nurse-administered.") },
  { key: "concerns", title: infusionCopy.concerns.title, description: infusionCopy.concerns.lead },
  { key: "metabolic", title: infusionCopy.metabolic.title, description: draft("A physician-supervised medical weight management program at Restoration Medical in Thornhill, with screening and follow-up.") },
  { key: "infusionHow", title: infusionCopy.how.title, description: infusionSteps.map((s) => s.t).join(", ") + ". " + infusionCopy.how.rightTitle },
  { key: "honest", title: infusionCopy.honest.title, description: draft("Common claims about IV drips, and what our physicians say. Screening first, medical oversight and registered nurses.") },
  { key: "ingredients", title: infusionCopy.ingredients.title, description: draft("The ingredients in our drips and shots, what each one is for, and where the evidence is still developing.") },
  { key: "infusionPricing", title: infusionCopy.pricing.title, description: infusionCopy.pricing.lead },
  { key: "infusionTeam", title: infusionTeam.title, description: infusionTeam.lead },
];
