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
import type { PageKey } from "@/lib/routes";

function draft(text: string): string {
  return text;
}

/** Evidence label shown on every drip and ingredient. */
export type Evidence = "Established" | "Supported" | "Emerging" | "Supervised";

/** Treatment families and their accent colours (from the Infusion design file). */
export const dripFamilies = {
  "Foundation & Healing": "#7FC8A9",
  "Radiance & Beauty": "#D9A6E0",
  Seasonal: "#F5C451",
  "Energy & Longevity": "#F0955C",
  Metabolic: "#6FB4E8",
  Recovery: "#9BD0E0",
} as const;

export type DripFamily = keyof typeof dripFamilies;
export const dripFamilyList = Object.keys(dripFamilies) as DripFamily[];

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
  /** Full page copy. Drips without it get a short page that is kept out of search until it exists. */
  detail?: DripDetail;
}

export const signatureDrips: Drip[] = [
  { slug: "foundation", t: "Foundation", f: "Foundation & Healing", d: "Hydration and core nutrients to start from.", ev: "Established" },
  {
    slug: "healing-myers",
    t: "Healing (Myers’)",
    f: "Foundation & Healing",
    d: "A classic blend of B vitamins, vitamin C, magnesium and calcium.",
    ev: "Established",
    detail: {
      whatItIs:
        "Our take on the classic Myers’ cocktail, a well-known blend of B vitamins, vitamin C, magnesium, and calcium. A go-to when you feel run down and want to reset.",
      supports: ["May support recovery when you feel run down.", "Contains B vitamins, vitamin C, magnesium and calcium.", "Helps maintain hydration."],
      insideNote: "A consult and screening confirm the final blend for you.",
      inside: ["B-Complex", "Vitamin C", "Magnesium", "Calcium", "B12 (methylcobalamin)"],
      addOns: "Glutathione, zinc, amino blend",
      addOnsNote: "Your nurse can include any after a quick screening, on clinical grounds.",
      expect: "Around forty-five minutes in the chair. The magnesium can bring a gentle warmth, which your nurse paces for comfort.",
      helpsWith: ["Low energy & fatigue", "Seasonal wellness", "Hydration & travel"],
      screen: "Kidney health screened",
    },
  },
  { slug: "radiance", t: "Radiance", f: "Radiance & Beauty", d: "Antioxidant and skin-radiance support.", ev: "Supported" },
  { slug: "hair-and-nails", t: "Hair & Nails", f: "Radiance & Beauty", d: "Biotin-forward support for hair and nails.", ev: "Supported" },
  { slug: "beauty-elixir", t: "Beauty Elixir", f: "Radiance & Beauty", d: "Complete beauty-from-within support.", ev: "Supported" },
  { slug: "seasonal-support", t: "Seasonal Support", f: "Seasonal", d: "Vitamin C, zinc and B vitamins.", ev: "Supported" },
  { slug: "kingmaker", t: "Kingmaker", f: "Energy & Longevity", d: "Vitality support for men.", ev: "Supported" },
  { slug: "recover", t: "Recover", f: "Recovery", d: "Post-exertion rehydration and repair.", ev: "Supported" },
  { slug: "revive", t: "Revive", f: "Recovery", d: "A reset after travel or a long week.", ev: "Supported" },
  { slug: "nad-longevity", t: "NAD+ Longevity", f: "Energy & Longevity", d: "Cellular energy and healthy-aging support.", ev: "Emerging" },
  { slug: "metabolic", t: "Metabolic", f: "Metabolic", d: "Part of our physician-supervised medical weight management program.", ev: "Emerging" },
  { slug: "pregnancy-care", t: "Pregnancy Care", f: "Foundation & Healing", d: "Gentle, physician-supervised hydration through pregnancy.", ev: "Supervised" },
];

export const dripBySlug = (slug: string) => signatureDrips.find((d) => d.slug === slug);

/** The Injection Bar. */
export const shots: { t: string; d: string }[] = [
  { t: "B12", d: "Steady energy" },
  { t: "B-Complex", d: "Energy metabolism" },
  { t: "Vitamin D", d: "Bones & mood" },
  { t: "Glutathione", d: "Antioxidant" },
  { t: "Vitamin C + Zinc", d: "Seasonal support" },
  { t: "MIC blend", d: "Program add-on" },
  { t: "L-Carnitine", d: "Program add-on" },
  { t: "Amino blend", d: "Recovery" },
  { t: "NAD+", d: "Cellular energy" },
  { t: "Biotin", d: "Hair & nails" },
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
  { t: "Low energy & fatigue", d: "Running low more often than you would like.", cta: "Explore", tag: "Wellness", page: dripsIn("Foundation & Healing") },
  { t: "Seasonal wellness", d: "Support through a demanding season.", cta: "Explore", tag: "Wellness", page: dripsIn("Seasonal") },
  { t: "Skin, hair & nails", d: "Caring for how you look from within.", cta: "Explore", tag: "Wellness", page: dripsIn("Radiance & Beauty") },
  { t: "Recovery & performance", d: "Training hard and recovering harder.", cta: "Explore", tag: "Wellness", page: dripsIn("Recovery") },
  { t: "Longevity & healthy aging", d: "Investing in how you age.", cta: "Explore", tag: "Wellness", page: dripsIn("Energy & Longevity") },
  { t: "Weight & metabolism", d: "Physician-supervised medical weight management.", cta: "Explore", tag: "Program", page: "metabolic" },
  { t: "Iron deficiency & low ferritin", d: "When fatigue may be about iron.", cta: "Clinical pathway", tag: "Clinical", page: "iron" },
  { t: "Hydration & travel", d: "Resetting after the road.", cta: "Explore", tag: "Wellness", page: dripsIn("Recovery") },
];

export const whyPhysicianLed = [
  { t: "Physician oversight", d: "Every treatment is reviewed by our physician, not sold from a counter." },
  { t: "RN administration", d: "Your infusion is placed and monitored by a registered nurse." },
  { t: "Honest screening", d: "We screen first, and we will adjust or decline on clinical grounds." },
  { t: "Sourcing standards", d: "Pharmaceutical-grade ingredients, prepared to clinical standards." },
];

export const honestClaims = [
  { p: "“Detoxes and melts fat.”", s: "Metabolic support happens inside a physician-guided program, with real screening and follow-up. No miracles, and we say so." },
  { p: "“Boosts your defences.”", s: "We list what is in the bag and the dose. We do not make treatment or prevention claims that the evidence does not support." },
  { p: "“Prevent illness before it starts.”", s: "We cannot promise you will not get sick. Preventing disease is not a claim we make, and we will not make it." },
];

export const infusionSteps = [
  { n: "01", t: "Consult & screen", d: "We talk through how you want to feel and review your health, so any treatment is safe and right for you." },
  { n: "02", t: "Personalize your treatment", d: "Our physician reviews and our nurse tailors the drip or shot to you. No fixed menu, no pressure." },
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
  lead: "Infusion therapy here is delivered by people, not a counter. A physician reviews every plan; registered nurses give every treatment. Calm, careful, and accountable.",
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
  wellnessNote: "An elective wellness service. Results vary. Not a treatment for any disease.",
  band: {
    title: "Care that begins with you.",
    sub: "Wellness or clinical, the standard of care is the same. A consult confirms what is right for you. No pricing surprises, no pressure.",
    cta: "Book a consult",
    cta2: "Is this right for me?",
  },
  drips: {
    eyebrow: "Browse our drips & shots",
    title: "Our drips and shots.",
    lead: "Each treatment family carries its own accent, drawn from its ingredients. Pick a family to narrow the list, or browse everything.",
    all: "All families",
    signature: "Signature drips",
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
    whyTitle: "A real clinic, not a drip bar.",
    whyP: "The difference matters. Screening, real medical oversight, and nurses who do this every day.",
  },
  honest: {
    eyebrow: "The honest menu",
    title: "What a drip bar promises. What we say.",
    lead: "The difference matters. Screening, real medical oversight, and nurses who do this every day.",
    theySay: draft("What you may hear"),
    weSay: draft("What we say"),
    evidenceEyebrow: "Where the evidence is still developing",
    evidenceTitle: "We label it Emerging, right on the ingredient.",
    evidenceP: "Every ingredient page says what the evidence supports, and what we will and will not claim.",
  },
  ingredients: {
    eyebrow: "Where the evidence is still developing",
    title: draft("Ingredient library"),
    lead: "We label it Emerging, right on the ingredient.",
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
  { key: "honest", title: infusionCopy.honest.title, description: draft("What a drip bar promises, and what a physician-led clinic says instead. Screening first, real medical oversight and registered nurses.") },
  { key: "ingredients", title: infusionCopy.ingredients.title, description: draft("The ingredients in our drips and shots, what each one is for, and where the evidence is still developing.") },
  { key: "infusionPricing", title: infusionCopy.pricing.title, description: infusionCopy.pricing.lead },
  { key: "infusionTeam", title: infusionTeam.title, description: infusionTeam.lead },
];
