import type { PathStep, QA, TintCard } from "./types";
import { images } from "./images";
import { draft } from "./review";

export interface IronSymptom {
  label: string;
  sub: string;
}

export interface IronPrice {
  k: string;
  t: string;
  price: string;
  d: string;
  note: string;
  bg: string;
}

export const ironVisitImg = images.ironVisit;

/** Symptom checklist on the iron therapy page. */
export const ironSymptoms: IronSymptom[] = [
  { label: "Tired no matter how much you sleep", sub: "Fatigue that rest does not fix" },
  { label: "Short of breath on stairs", sub: "Or with light effort" },
  { label: "Brain fog", sub: "Trouble focusing or remembering" },
  { label: "Always cold", sub: "Cold hands and feet" },
  { label: "Heavy periods", sub: "Soaking through pads or tampons" },
  { label: "Hair thinning or brittle nails", sub: "Often overlooked" },
  { label: "Restless legs at night", sub: "An urge to move that disturbs sleep" },
  { label: "Craving ice or dizziness", sub: "Standing up too fast" },
];

/** Tally line under the symptom checklist, for `n` selected symptoms. */
export function ironTally(n: number): string {
  if (n === 0) return "";
  // No symptom-count threshold that points to a paid service (CPSO). Same line for any count.
  // Breathless on stairs led only to an iron assessment (public health reviewer, round 22).
  return draft(`${n} selected. Worth mentioning to your doctor, who can tell you whether a blood test makes sense. Already have a low result? Bring it to an iron assessment. Chest pain, fainting, or short of breath at rest? Dial 911.`);
}

export const ironWho: TintCard[] = [
  { t: "Heavy periods", d: "The most common cause of low iron in women under 50.", bg: "#FDE8E4" },
  { t: "Pregnancy and after", d: "Iron needs rise sharply, and tablets are often hard to tolerate.", bg: "#FFF3C4" },
  { t: "Plant-based or restricted diets", d: "Less absorbable iron from food over time.", bg: "#E6F4EA" },
  { t: "Gut conditions or surgery", d: "Celiac, IBD, bariatric surgery or long-term antacids can block absorption.", bg: "#EEF5FC" },
];

export const ironSteps: PathStep[] = [
  { n: "1", time: "OHIP-insured", t: "Assessment and bloodwork", d: "A short visit with our physician and a blood draw on site. If you already have recent results, bring them and skip the wait." },
  { n: "2", time: "Same week", t: "Your plan", d: "If your ferritin is low and tablets are not right for you, the physician chooses the iron and dose. We book your infusion, often within days." },
  // The 30 minutes read as extra time on top of the 3 hours (round 23). Infusion days added (clinic, Nov 2026).
  { n: "3", time: draft("3 visits, about 3 hours each"), t: "The infusions", d: draft("On a Tuesday, Saturday or Sunday. A nurse places a small IV and you relax in a lounge chair while 500 mg runs in, then we watch you for 30 minutes. About 3 hours in all. Repeat one to two weeks later until the course is done.") },
];

export const ironVisit: string[] = [
  "Eat normally and drink water beforehand. No fasting.",
  "Wear a top with sleeves that roll up. Bring a book, headphones or a laptop.",
  "A nurse checks your vitals, places the IV and stays close throughout.",
  "Repeat bloodwork 4 to 8 weeks later shows how your levels responded.",
];

export const ironPrices: IronPrice[] = [
  {
    k: "Bring your own iron",
    t: "Administration only",
    price: "$250",
    d: "We write the prescription, you fill it at your pharmacy and bring it in. Most private drug plans cover the iron. We supply the nursing, supplies and monitoring.",
    // Course total added to match the clinic-supplied card (3 visits per course).
    note: draft("Per visit, HST included. Course of 3: $750, plus the iron from your pharmacy"),
    bg: "#fff",
  },
  {
    k: "Clinic supplied",
    t: "Monoferric (ferric derisomaltose)",
    price: "$550",
    d: "500 mg per visit, iron, nursing and monitoring in one price. A full course is 3 visits, usually one to two weeks apart.",
    note: "Per visit, HST included. Course of 3: $1,650",
    bg: "#E6F4EA",
  },
  {
    k: "Covered by OHIP",
    t: "Physician assessment and bloodwork",
    price: "$0",
    d: "The visit that confirms iron deficiency and the follow-up bloodwork are insured. Only the infusion visits are a fee.",
    note: "Ontario health card required",
    bg: "#F5F8FB",
  },
];

export const ironFaq: QA[] = [
  { q: "Which days are infusions?", a: "Tuesday, Saturday and Sunday at Thornhill. A visit takes about 3 hours, so the last start is 6:30pm on Tuesday, 1pm on Saturday and 11am on Sunday. Your assessment can be on any day we are open." },
  { q: "Do I need a referral?", a: "No. Book an iron assessment directly. If you have a referral or recent bloodwork from another doctor, bring it and we will use it." },
  { q: "How soon will I feel different?", a: "Iron stores take time to rebuild and everyone responds differently. Your repeat bloodwork at 4 to 8 weeks is the reliable measure, and your physician reviews it with you." },
  { q: "Is it safe?", a: "Modern IV iron is well studied and given daily in hospitals and clinics across Canada. Serious reactions are rare. A nurse monitors you throughout and a physician is on site." },
  { q: "Will my insurance cover it?", a: "Your assessment and bloodwork are OHIP-insured. Most private drug plans cover the iron itself when filled with our prescription. The infusion visit fee is paid out of pocket and we provide a receipt." },
  { q: "Can I drive home?", a: "Yes. Iron infusions do not involve sedation. Most people return to their normal day." },
];

/** Iron self-check intro. Was "Three or more is a good reason to check your ferritin": an unsourced
 *  clinical threshold leading to a paid service. Now points to a doctor's visit (draft, clinical review). */
export const ironCheckLead = draft("Tap what sounds familiar. These feelings have many causes, and low iron is only one. A blood test, ordered by your doctor, is the only way to know.");

export const ironCheckBook = draft("Book an iron assessment");

/** Clinic answer (Nov 2026): an iron visit takes about 3 hours, including the time watching you afterwards. */
export const ironVisitPill = draft("3 visits, about 3 hours each");

/** Was "Find out in one blood test." / "… we can usually infuse the same week." (a hematologist: it is a panel,
 *  not one test; a compliance reviewer: same-week reads as urgency). */
export const ironCta = {
  title: draft("Start with an iron assessment."),
  sub: draft("OHIP-insured, with bloodwork on site. Your doctor goes through the results with you and tells you whether an infusion makes sense."),
};

export const ironStepsTitle = draft("Three steps, over a few weeks.");

/** Clinic answer (Nov 2026): iron infusions run on Tuesday, Saturday and Sunday at Thornhill. The assessment can be
 *  any clinic day. Day numbers are JavaScript weekdays (0 is Sunday). */
/* Latest start times are clinic answers (Nov 2026): a 3-hour visit has to finish before closing. */
export const ironInfusionDays: { day: number; label: string; hours: string; when: string; lastStart: string }[] = [
  { day: 2, label: "Tuesday", hours: "3pm to 9pm", when: "Evenings", lastStart: "6:30pm" },
  { day: 6, label: "Saturday", hours: "8am to 4pm", when: "Daytime", lastStart: "1pm" },
  { day: 0, label: "Sunday", hours: "8am to 2pm", when: "Mornings", lastStart: "11am" },
];
export const ironLastStart = (time: string) => `Last start ${time}`;

/** Course planner. A tester with ferritin 6 could not plan time off from the page (round 23). */
export const ironPlanner = {
  eyebrow: draft("Plan your course"),
  title: draft("See your three visits on a calendar."),
  lead: draft("Infusions run on Tuesday, Saturday and Sunday. Pick a first day and the spacing, and see roughly when each visit and your repeat bloodwork would fall."),
  startLabel: draft("First infusion"),
  gapLabel: draft("Time between visits"),
  gaps: [draft("1 week"), draft("2 weeks")] as const,
  ironLabel: draft("Iron"),
  ironOptions: [draft("Clinic supplied"), draft("Bring your own")] as const,
  visit: (n: number) => draft(`Visit ${n}`),
  visitSub: draft("About 3 hours"),
  labs: draft("Repeat bloodwork"),
  labsSub: draft("4 to 8 weeks after your last visit"),
  totalLabel: draft("Course of 3"),
  totals: [
    { v: "$1,650", sub: draft("HST included, iron and nursing") },
    { v: "$750", sub: draft("HST included, plus the iron from your pharmacy") },
  ] as const,
  timeLabel: draft("Time at the clinic"),
  time: { v: draft("About 9 hours"), sub: draft("Over 3 visits") },
  labsShort: draft("Bloodwork"),
  fine: draft("A planning guide, not a booking. Your physician confirms the iron, the dose and the number of visits after your assessment, and we book the dates with you."),
  cta: draft("Book an iron assessment"),
};

/** One infusion visit, start to finish (about 3 hours in all, including 30 minutes watching you afterwards). */
export const ironDay = {
  eyebrow: draft("One visit, start to finish"),
  title: draft("About 3 hours, in four parts."),
  parts: [
    { t: draft("Check in"), d: draft("A short nurse screening, your vitals, and a chance to ask questions."), w: 2 },
    { t: draft("IV placed"), d: draft("A small IV in your arm. Your nurse stays close throughout."), w: 1 },
    { t: draft("Infusion"), d: draft("500 mg runs in while you sit back in a lounge chair. Read, work or rest."), w: 5 },
    { t: draft("30 minutes after"), d: draft("We watch you for 30 minutes, then you go back to your day."), w: 2 },
  ],
  note: draft("Eat normally beforehand. No fasting, and you can drive home."),
};
