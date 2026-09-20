import type { PathStep, QA, TintCard } from "./types";
import { images } from "./images";

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
  if (n < 3) return `${n} selected. Worth mentioning at your next visit.`;
  return `${n} selected. A ferritin test is a sensible next step.`;
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
  { n: "3", time: "3 visits, 90 min each", t: "The infusions", d: "A nurse places a small IV and you relax in a lounge chair while 500 mg runs in. We observe you for 30 minutes after, then you go back to your day. Repeat one to two weeks later until the course is done." },
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
    note: "Per visit, HST included",
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
  { q: "Do I need a referral?", a: "No. Book an iron assessment directly. If you have a referral or recent bloodwork from another doctor, bring it and we will use it." },
  { q: "How soon will I feel different?", a: "Iron stores take time to rebuild and everyone responds differently. Your repeat bloodwork at 4 to 8 weeks is the reliable measure, and your physician reviews it with you." },
  { q: "Is it safe?", a: "Modern IV iron is well studied and given daily in hospitals and clinics across Canada. Serious reactions are rare. A nurse monitors you throughout and a physician is on site." },
  { q: "Will my insurance cover it?", a: "Your assessment and bloodwork are OHIP-insured. Most private drug plans cover the iron itself when filled with our prescription. The infusion visit fee is paid out of pocket and we provide a receipt." },
  { q: "Can I drive home?", a: "Yes. Iron infusions do not involve sedation. Most people return to their normal day." },
];
