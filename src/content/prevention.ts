import type { LinkTarget } from "./types";

export interface NumberCard {
  name: string;
  full: string;
  unit: string;
  tint: string;
  what: string;
  target: string;
  lowLabel: string;
  highLabel: string;
  /** Left edge of the healthy band, percent of the scale width. */
  bandL: number;
  /** Width of the healthy band, percent of the scale width. */
  bandW: number;
  /** CSS linear-gradient colour stops for the scale. */
  gradient: string;
  ifLow: string;
  ifHigh: string;
  often: string;
  cta: string;
  page: LinkTarget;
}

export interface YearItem {
  t: string;
  svc: string;
  page: LinkTarget;
}

export interface YearSeason {
  name: string;
  months: string;
  bg: string;
  items: YearItem[];
}

export interface ScreeningRow {
  t: string;
  d: string;
  how: string;
}

/** Know your numbers. */
export const numbers: NumberCard[] = [
  {
    name: "Ferritin",
    full: "Iron stores",
    unit: "µg/L",
    tint: "#E6F4EA",
    what: "How much iron your body has in reserve. It drops long before you become anemic, which is why tiredness often comes first.",
    target: "30 to 150 µg/L",
    lowLabel: "< 30",
    highLabel: "> 300",
    bandL: 20,
    bandW: 45,
    gradient: "#E07A5F,#7FC8A9 25%,#7FC8A9 65%,#F2B134",
    ifLow: "We look for the cause, try oral iron if it suits you, or arrange an infusion.",
    ifHigh: "Usually inflammation or liver related. We repeat and investigate.",
    often: "With symptoms, or yearly if you have had low iron before.",
    cta: "Read about iron therapy",
    page: "iron",
  },
  {
    name: "Hemoglobin",
    full: "Oxygen-carrying protein",
    unit: "g/L",
    tint: "#FDE8E4",
    what: "The part of your blood that carries oxygen. Low hemoglobin is anemia, and low iron is its most common cause.",
    target: "120 to 160 g/L",
    lowLabel: "< 110",
    highLabel: "> 180",
    bandL: 25,
    bandW: 45,
    gradient: "#E07A5F,#7FC8A9 30%,#7FC8A9 70%,#F2B134",
    ifLow: "We check iron, B12 and folate and treat the cause.",
    ifHigh: "Often dehydration or smoking. We repeat the test.",
    often: "With your regular bloodwork.",
    cta: "Book bloodwork",
    page: "book",
  },
  {
    name: "A1c",
    full: "Three-month blood sugar",
    unit: "%",
    tint: "#FFF3C4",
    what: "Your average blood sugar over the past three months. It is how diabetes and prediabetes are diagnosed and followed.",
    target: "Below 6.0%",
    lowLabel: "4.0",
    highLabel: "> 8.0",
    bandL: 5,
    bandW: 40,
    gradient: "#7FC8A9,#7FC8A9 40%,#F2B134 60%,#E07A5F",
    ifLow: "Rarely a concern unless you are on diabetes medication.",
    ifHigh: "6.0 to 6.4 is prediabetes; 6.5 and up is diabetes. We build a plan around food, movement and, if needed, medication.",
    often: "Every 3 years from 40, yearly if prediabetic.",
    cta: "Book a checkup",
    page: "book",
  },
  {
    name: "LDL cholesterol",
    full: "The cholesterol that clogs",
    unit: "mmol/L",
    tint: "#EEF5FC",
    what: "The type that builds up in artery walls over decades. Your target depends on your overall heart risk.",
    target: "Below 3.5 mmol/L",
    lowLabel: "1.0",
    highLabel: "> 5.0",
    bandL: 5,
    bandW: 55,
    gradient: "#7FC8A9,#7FC8A9 50%,#F2B134 75%,#E07A5F",
    ifLow: "Good news. Keep doing what you are doing.",
    ifHigh: "We calculate your 10-year risk and discuss lifestyle first, then medication if the risk warrants it.",
    often: "Every 3 to 5 years from 40, sooner with family history.",
    cta: "Book a checkup",
    page: "book",
  },
  {
    name: "Blood pressure",
    full: "Pressure in your arteries",
    unit: "mmHg",
    tint: "#F3ECF8",
    what: "Two numbers: pressure when the heart beats and when it rests. High pressure has no symptoms and is the biggest preventable cause of stroke.",
    target: "Below 130/80",
    lowLabel: "90/60",
    highLabel: "> 160/100",
    bandL: 15,
    bandW: 40,
    gradient: "#F2B134,#7FC8A9 20%,#7FC8A9 55%,#E07A5F",
    ifLow: "Usually fine unless you feel dizzy.",
    ifHigh: "We confirm with home readings, then lifestyle and medication if it stays up.",
    often: "Every visit, at least every 2 years.",
    cta: "Book a visit",
    page: "book",
  },
  {
    name: "Vitamin D",
    full: "The sunshine vitamin",
    unit: "nmol/L",
    tint: "#FFF3C4",
    what: "Needed for bone strength and muscle function. Most Canadians run low through winter.",
    target: "75 to 150 nmol/L",
    lowLabel: "< 30",
    highLabel: "> 250",
    bandL: 30,
    bandW: 40,
    gradient: "#E07A5F,#7FC8A9 35%,#7FC8A9 70%,#F2B134",
    ifLow: "A daily supplement, usually 1000 to 2000 IU. Retest in three months.",
    ifHigh: "Rare, from over-supplementing. We adjust the dose.",
    often: "Not routinely covered by OHIP. Once, or with bone or muscle concerns.",
    cta: "Ask at your visit",
    page: "book",
  },
  {
    name: "TSH",
    full: "Thyroid signal",
    unit: "mIU/L",
    tint: "#E6F4EA",
    what: "Tells us whether your thyroid is running slow or fast. Both can look like tiredness, weight change or mood change.",
    target: "0.4 to 4.0 mIU/L",
    lowLabel: "< 0.1",
    highLabel: "> 10",
    bandL: 15,
    bandW: 45,
    gradient: "#F2B134,#7FC8A9 20%,#7FC8A9 60%,#E07A5F",
    ifLow: "May mean an overactive thyroid. We repeat with more detailed tests.",
    ifHigh: "May mean an underactive thyroid, common and treatable with a daily tablet.",
    often: "With symptoms, or yearly if on thyroid medication.",
    cta: "Book bloodwork",
    page: "book",
  },
];

/**
 * Your year of staying well: four seasons, with items that apply to the
 * given age and sex (the prototype's Y(t, svc, page, ok) rows).
 */
export function yearSeasons(age: number, female: boolean): YearSeason[] {
  const Y = (t: string, svc: string, page: LinkTarget, ok = true): YearItem[] => (ok ? [{ t, svc, page }] : []);
  const fem = female;
  return [
    {
      name: "Fall",
      months: "Sep to Nov",
      bg: "#FFF3C4",
      items: [
        ...Y("Flu shot", "Family Medicine, from October", "family"),
        ...Y("Annual checkup", "Family Medicine, OHIP", "family"),
        ...Y("Shingles vaccine", "Family Medicine, funded 65 to 70", "family", age >= 65 && age <= 70),
      ],
    },
    {
      name: "Winter",
      months: "Dec to Feb",
      bg: "#EEF5FC",
      items: [
        ...Y("Fasting bloodwork", "On site, cholesterol and sugars", "numbers", age >= 40),
        ...Y("Iron and vitamin D check", "Bloodwork on site", "iron"),
        ...Y("Joint and back check-in", "Pain Centre or Rehab", "pain"),
      ],
    },
    {
      name: "Spring",
      months: "Mar to May",
      bg: "#E6F4EA",
      items: [
        ...Y("Cervical screening", "Every 3 years, 25 to 69", "family", fem && age >= 25 && age <= 69),
        ...Y("Mammogram requisition", "Every 2 years, 40 to 74", "family", fem && age >= 40 && age <= 74),
        ...Y("Prostate conversation", "From 50, your call", "family", !fem && age >= 50),
        ...Y("Skin check", "Family Medicine or Aesthetics", "aesthetics"),
        ...Y("Allergy plan", "Family Medicine", "family"),
      ],
    },
    {
      name: "Summer",
      months: "Jun to Aug",
      bg: "#FDE8E4",
      items: [
        ...Y("Colon screening (FIT)", "Every 2 years, 50 to 74", "family", age >= 50 && age <= 74),
        ...Y("Bone density", "Once at 65", "family", age >= 65),
        ...Y("Movement and balance plan", "Rehab & Recovery", "rehab"),
        ...Y("Travel health visit", "Family Medicine", "family"),
      ],
    },
  ];
}

/** Screenings that apply at the given age and sex (the prototype's SCR rows). */
export function screeningDue(age: number, female: boolean): ScreeningRow[] {
  const fem = female;
  const rows: (ScreeningRow & { ok: boolean })[] = [
    { t: "Blood pressure", d: "Checked at every visit, at least every 2 years.", how: "Any visit", ok: age >= 18 },
    { t: "Cholesterol and diabetes screen", d: "Fasting bloodwork every 3 to 5 years, sooner with risk factors.", how: "Bloodwork on site", ok: age >= 40 },
    { t: "Cervical screening (Pap)", d: "Every 3 years for anyone with a cervix, 25 to 69.", how: "Book with your doctor", ok: fem && age >= 25 && age <= 69 },
    { t: "Breast screening", d: "Mammogram every 2 years, 40 to 74. We give you the requisition.", how: "Requisition from us", ok: fem && age >= 40 && age <= 74 },
    { t: "Colon cancer screening", d: "FIT stool test every 2 years, 50 to 74.", how: "Kit from your doctor", ok: age >= 50 && age <= 74 },
    { t: "Shingles vaccine", d: "Publicly funded 65 to 70.", how: "In clinic", ok: age >= 65 && age <= 70 },
    { t: "Bone density", d: "Once at 65, sooner with risk factors.", how: "Requisition from us", ok: age >= 65 },
    { t: "Prostate conversation", d: "A talk about PSA testing, 50 and up. It is your call.", how: "Book with your doctor", ok: !fem && age >= 50 },
    { t: "Yearly flu shot", d: "Everyone, every fall.", how: "From October", ok: true },
  ];
  return rows.filter((s) => s.ok).map(({ t, d, how }) => ({ t, d, how }));
}
