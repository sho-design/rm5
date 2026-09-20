import type { LinkTarget } from "./types";

export interface CarePathStep {
  svc: string;
  time: string;
  t: string;
  d: string;
  page: LinkTarget;
  link: string;
}

export interface CarePath {
  label: string;
  outcome: string;
  cta: string;
  page: LinkTarget;
  steps: CarePathStep[];
}

export interface FamilyTile {
  t: string;
  bg: string;
  items: string[];
  link: string;
  page: LinkTarget;
}

export interface QuickAction {
  label: string;
  sub: string;
  page: LinkTarget;
  /** SVG path data, drawn in a 24x24 viewBox at stroke width 1.7. */
  icon: string[];
}

export interface Season {
  /** JS getMonth() values (0 = January). */
  months: number[];
  eyebrow: string;
  title: string;
  p: string;
  cta: string;
  page: LinkTarget;
  bg: string;
}

export interface CalendarItem {
  label: string;
  /** null means a closure notice (links to the clinics page). */
  page: string | null;
}

export interface InfusionLink {
  k: string;
  c: string;
  t: string;
  d: string;
  cta: string;
  href: string;
}

/** Card tint per service line for the care path steps (prototype T map). */
export const carePathTints: Record<string, string> = {
  "Family Medicine": "#EEF5FC",
  "Pain Centre": "#FDE8E4",
  "Infusion Therapy": "#E6F4EA",
  "Medical Aesthetics": "#F3ECF8",
  "Rehab & Recovery": "#FFF3C4",
};

export const carePaths: CarePath[] = [
  {
    label: "Low energy",
    outcome: "One chart, one team: the doctor who orders the test is the one who reads it and books the fix.",
    cta: "Start with a visit",
    page: "family",
    steps: [
      { svc: "Family Medicine", time: "Week 1", t: "Visit and bloodwork", d: "Ferritin, thyroid, B12 and sugars drawn on site.", page: "family", link: "Family Medicine" },
      { svc: "Family Medicine", time: "Day 3", t: "Results, explained", d: "A call or results visit. If iron is low and tablets are not right, we book step three.", page: "numbers", link: "Know your numbers" },
      { svc: "Infusion Therapy", time: "Same week", t: "Iron infusion", d: "About three hours in a lounge chair with a nurse nearby.", page: "iron", link: "Iron therapy" },
      { svc: "Family Medicine", time: "Week 6", t: "Recheck", d: "Repeat bloodwork shows the response. Your plan adjusts.", page: "year", link: "Your year" },
    ],
  },
  {
    label: "Back or neck pain",
    outcome: "Injection and rehab happen in the same building, in the same week, sharing one chart.",
    cta: "Book an assessment",
    page: "pain",
    steps: [
      { svc: "Pain Centre", time: "Week 1", t: "Physician assessment", d: "Examination and imaging review to find the source.", page: "pain", link: "Pain Centre" },
      { svc: "Pain Centre", time: "Week 2", t: "Image-guided treatment", d: "A targeted injection if it fits, done by Dr. Nguyen.", page: "pain", link: "What to expect" },
      { svc: "Rehab & Recovery", time: "Week 2 to 6", t: "Rehab program", d: "Physio and strength work while the pain is calmer.", page: "rehab", link: "Rehab & Recovery" },
      { svc: "Pain Centre", time: "Week 6", t: "Review", d: "Pain diary, function check, next step or discharge.", page: "pain", link: "Your path" },
    ],
  },
  {
    label: "After a car accident",
    outcome: "You focus on recovering. We handle the OCF forms, the insurer and the reports.",
    cta: "Start an MVA claim",
    page: "rehab",
    steps: [
      { svc: "Family Medicine", time: "Day 1 to 3", t: "Physician assessment", d: "Injuries documented, imaging ordered if needed.", page: "family", link: "Family Medicine" },
      { svc: "Rehab & Recovery", time: "Day 3", t: "Claim opened", d: "We complete OCF-18 and 23 and bill your insurer directly.", page: "rehab", link: "Coverage checker" },
      { svc: "Rehab & Recovery", time: "Week 1 to 8", t: "Treatment plan", d: "Physio, chiro and massage under one plan.", page: "rehab", link: "Rehab & Recovery" },
      { svc: "Pain Centre", time: "If needed", t: "Pain procedures", d: "For pain that does not settle with rehab alone.", page: "pain", link: "Pain Centre" },
    ],
  },
  {
    label: "Turning 50",
    outcome: "One checkup sets up a decade of quiet prevention, with reminders so you never track it alone.",
    cta: "Book a checkup",
    page: "year",
    steps: [
      { svc: "Family Medicine", time: "This month", t: "Preventive checkup", d: "Blood pressure, cholesterol, sugars, and a screening plan.", page: "family", link: "Family Medicine" },
      { svc: "Family Medicine", time: "This month", t: "Screening kit and requisitions", d: "FIT test, mammogram or PSA conversation, bloodwork on site.", page: "year", link: "Your year" },
      { svc: "Family Medicine", time: "Week 2", t: "Numbers, explained", d: "Results in plain language with your targets.", page: "numbers", link: "Know your numbers" },
      { svc: "Rehab & Recovery", time: "Ongoing", t: "Stay strong", d: "A movement plan from our kinesiologist to protect joints and balance.", page: "rehab", link: "Rehab & Recovery" },
    ],
  },
  {
    label: "Skin that looks tired",
    outcome: "Medical causes are ruled out first, then the lightest cosmetic step that fits, with prices in writing.",
    cta: "Book a consult",
    page: "aesthetics",
    steps: [
      { svc: "Family Medicine", time: "Week 1", t: "Rule out the medical", d: "Thyroid, iron and sleep can all show on the skin. Bloodwork on site.", page: "family", link: "Family Medicine" },
      { svc: "Medical Aesthetics", time: "Week 1", t: "Complimentary consult", d: "Skin assessment and a written plan with prices.", page: "aesthetics", link: "How we think" },
      { svc: "Medical Aesthetics", time: "When ready", t: "Lightest option first", d: "Skincare and peels before anything else.", page: "aesthetics", link: "Medical Aesthetics" },
      { svc: "Medical Aesthetics", time: "2 weeks", t: "Review", d: "Included. Step up only if you want to.", page: "aesthetics", link: "Your path" },
    ],
  },
];

export const familyTiles: FamilyTile[] = [
  {
    t: "Kids and teens",
    bg: "#EEF5FC",
    items: ["School, camp and sports forms", "Vaccines and growth checks", "Same-week visits when they are unwell"],
    link: "Children and youth",
    page: "kids",
  },
  {
    t: "You and your partner",
    bg: "#FFF3C4",
    items: ["One family doctor for both of you", "Screenings on a shared reminder", "Rehab, pain and infusion under one roof"],
    link: "Build your year",
    page: "year",
  },
  {
    t: "Parents and grandparents",
    bg: "#E6F4EA",
    items: ["Care in Tiếng Việt, front desk to doctor", "Chronic care and medication reviews", "Balance and strength plans to stay independent"],
    link: "How we care for elders",
    page: "family",
  },
];

export const quickActions: QuickAction[] = [
  { label: "Book an appointment", sub: "Any service, Thornhill", page: "book", icon: ["M4 6h16v14H4z", "M4 10h16", "M8 3v4", "M16 3v4"] },
  { label: "Renew a prescription", sub: "Existing patients", page: "family", icon: ["M6 3h9l3 3v15H6z", "M9 12h6", "M12 9v6"] },
  { label: "Refer a patient", sub: "For referring doctors", page: "referrals", icon: ["M5 12h12", "M13 7l5 5-5 5"] },
  {
    label: "Join the Maple waitlist",
    sub: "Opening soon",
    page: "locations",
    icon: ["M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z", "M12 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 1 0 0 5z"],
  },
];

export const seasons: Season[] = [
  {
    months: [8, 9, 10],
    eyebrow: "This fall",
    title: "Flu season starts in October.",
    p: "Flu shots, back-to-school checkups and a good time to review chronic care plans before winter.",
    cta: "Book a flu shot",
    page: "family",
    bg: "#FFE58A",
  },
  {
    months: [11, 0, 1],
    eyebrow: "This winter",
    title: "Keep moving through the cold months.",
    p: "Joint and back pain often flares in winter. Rehab, physician-led pain care and iron checks are all available under one roof.",
    cta: "Book a visit",
    page: "pain",
    bg: "#EEF5FC",
  },
  {
    months: [2, 3, 4],
    eyebrow: "This spring",
    title: "Allergy season and annual checkups.",
    p: "Seasonal allergy care, preventive checkups and bloodwork on site as the weather turns.",
    cta: "Book a checkup",
    page: "family",
    bg: "#E6F4EA",
  },
  {
    months: [5, 6, 7],
    eyebrow: "This summer",
    title: "Travel, sun and hydration.",
    p: "Travel health visits, sun-safe skin care and hydration infusions for the warmer months.",
    cta: "Book a visit",
    page: "infusion",
    bg: "#FDE8E4",
  },
];

export const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Two items per month, keyed by JS getMonth() (0 = January). */
export const calendar: Record<number, CalendarItem[]> = {
  0: [{ label: "Chronic care reviews", page: "family" }, { label: "Winter joint pain", page: "pain" }],
  1: [{ label: "Heart health month", page: "family" }, { label: "Iron checks", page: "infusion" }],
  2: [{ label: "Allergy season begins", page: "family" }, { label: "Rehab tune-up", page: "rehab" }],
  3: [{ label: "Annual checkups", page: "family" }, { label: "Spring skin care", page: "aesthetics" }],
  4: [{ label: "Sun-safe skin review", page: "aesthetics" }, { label: "Sports injury care", page: "rehab" }],
  5: [{ label: "Travel health visits", page: "family" }, { label: "Hydration infusions", page: "infusion" }],
  6: [{ label: "Summer hydration", page: "infusion" }, { label: "Kids camp forms", page: "family" }],
  7: [{ label: "Back-to-school checkups", page: "family" }, { label: "Sports physicals", page: "rehab" }],
  8: [{ label: "School and camp forms", page: "family" }, { label: "Fall wellness visits", page: "family" }],
  9: [{ label: "Flu shots begin", page: "family" }, { label: "Thanksgiving closure Oct 12", page: null }],
  10: [{ label: "Flu shots continue", page: "family" }, { label: "Winter pain prep", page: "pain" }],
  11: [{ label: "Holiday hours posted", page: "locations" }, { label: "Use benefits before year end", page: "rehab" }],
};

/** Dot colour per calendar page key. Items with a null page use "#5A6B7B". */
export const calendarDots: Record<string, string> = {
  family: "#2F7FD1",
  pain: "#E07A5F",
  infusion: "#7FC8A9",
  aesthetics: "#C9A0DC",
  rehab: "#F2B134",
  locations: "#0F1F2E",
};

export const calendarClosureDot = "#5A6B7B";

export const infusionLinks: InfusionLink[] = [
  {
    k: "Signature drips",
    c: "#7FC8A9",
    t: "Thirteen drips, one standard",
    d: "Foundation, Healing, Radiance, Recover, NAD+ Longevity and more, each physician-reviewed.",
    cta: "Browse drips",
    href: "https://infusion.restorationmedical.ca/drips",
  },
  {
    k: "The Injection Bar",
    c: "#FFD84D",
    t: "Shots in ten minutes",
    d: "B12, vitamin D, glutathione and other quick shots between visits.",
    cta: "See the shots",
    href: "https://infusion.restorationmedical.ca/shots",
  },
  {
    k: "Ingredients",
    c: "#C9A0DC",
    t: "Know what is in the bag",
    d: "Every ingredient explained, with the evidence labelled honestly.",
    cta: "Ingredient library",
    href: "https://infusion.restorationmedical.ca/ingredients",
  },
  {
    k: "Pricing",
    c: "#E07A5F",
    t: "Prices and memberships",
    d: "Clear per-visit pricing and optional memberships, HST included.",
    cta: "See pricing",
    href: "https://infusion.restorationmedical.ca/pricing",
  },
];
