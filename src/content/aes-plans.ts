import { draft } from "./review";

/*
 * "A year of care" on the skin health plans page (November 2026): what usually fits each month of an Ontario year.
 * NURSE TO CONFIRM: the seasonal guidance (which treatments suit which months, the seasonal reviews, the summer
 * and pre-laser sun advice). Treatments named here are ones the clinic offers (aesthetics-menu.ts, aes-laser.ts).
 */

export type Season = "winter" | "spring" | "summer" | "fall";

/** `color`: dots and outlines. `ink`: the same hue dark enough for text and for white text on it (4.5:1 or more). */
export const seasons: Record<
  Season,
  { t: string; color: string; ink: string; tint: string }
> = {
  winter: {
    t: draft("Winter"),
    color: "#2F7FD1",
    ink: "#296CB0",
    tint: "#EEF5FC",
  },
  spring: {
    t: draft("Spring"),
    color: "#3D9B78",
    ink: "#2F7662",
    tint: "#E6F4EA",
  },
  summer: {
    t: draft("Summer"),
    color: "#B8860B",
    ink: "#785F18",
    tint: "#FFF3C4",
  },
  fall: { t: draft("Fall"), color: "#C4573A", ink: "#8E4636", tint: "#FDE8E4" },
};

export type PlanMonth = {
  m: string;
  short: string;
  season: Season;
  fits: string[];
  mind: string;
  review?: boolean;
};

const winterFits = [
  draft(
    "Laser series, such as PicoSure for spots or Clarity II for hair and redness",
  ),
  draft("Deeper peels and eCO₂, with less sun to work around"),
  draft("Microneedling"),
];
const springFits = [
  draft("Finishing a laser series before summer"),
  draft("Microneedling and medical peels"),
  draft("A HydraFacial or glass facial"),
];
const summerFits = [
  draft("Gentle care: HydraFacial, glass facial, light peels"),
  draft("Neuromodulators and fillers, which do not depend on the sun"),
  draft("Your home routine, kept simple"),
];
const fallFits = [
  draft("Starting a laser series as the days shorten"),
  draft("Medical peels and microneedling"),
  draft("A plan for the darker months"),
];

export const planMonths: PlanMonth[] = [
  {
    m: draft("January"),
    short: "Jan",
    season: "winter",
    fits: winterFits,
    mind: draft("Cold, dry air: a richer moisturizer at night can help."),
  },
  {
    m: draft("February"),
    short: "Feb",
    season: "winter",
    fits: winterFits,
    mind: draft("Planning a trip south? Tell us before any laser or peel."),
  },
  {
    m: draft("March"),
    short: "Mar",
    season: "spring",
    fits: springFits,
    mind: draft(
      "Spring sun is stronger than it feels. Sunscreen every morning.",
    ),
    review: true,
  },
  {
    m: draft("April"),
    short: "Apr",
    season: "spring",
    fits: springFits,
    mind: draft(
      "A good time to wrap up treatments that need you to avoid the sun.",
    ),
  },
  {
    m: draft("May"),
    short: "May",
    season: "spring",
    fits: springFits,
    mind: draft("Before a summer event, give treatments time to settle."),
  },
  {
    m: draft("June"),
    short: "Jun",
    season: "summer",
    fits: summerFits,
    mind: draft(
      "No tanning before a laser visit, and reapply sunscreen outdoors.",
    ),
    review: true,
  },
  {
    m: draft("July"),
    short: "Jul",
    season: "summer",
    fits: summerFits,
    mind: draft("Heat and sun can bring on redness. Keep the routine gentle."),
  },
  {
    m: draft("August"),
    short: "Aug",
    season: "summer",
    fits: summerFits,
    mind: draft("Let a tan fade before starting a laser series in the fall."),
  },
  {
    m: draft("September"),
    short: "Sep",
    season: "fall",
    fits: fallFits,
    mind: draft("Back from summer: we check your skin before anything deeper."),
    review: true,
  },
  {
    m: draft("October"),
    short: "Oct",
    season: "fall",
    fits: fallFits,
    mind: draft("A series started now can finish before spring."),
  },
  {
    m: draft("November"),
    short: "Nov",
    season: "fall",
    fits: fallFits,
    mind: draft(
      "Holiday events coming? Plan back from the date with your nurse.",
    ),
  },
  {
    m: draft("December"),
    short: "Dec",
    season: "winter",
    fits: winterFits,
    mind: draft(
      "Indoor heating dries skin. Keep sunscreen on, even in winter.",
    ),
    review: true,
  },
];

export const plansCopy = {
  eyebrow: draft("A year of care"),
  title: draft("What fits each month."),
  lead: draft(
    "Skin care works best planned around the seasons. Sun-sensitive treatments fit the darker months, and summer is for gentler care. Tap a month to see what usually fits. Your nurse plans your own year at the consult.",
  ),
  months: draft("Months of the year"),
  now: draft("This month"),
  fits: draft("Often a good fit"),
  mind: draft("Keep in mind"),
  review: draft("Seasonal review with your nurse"),
  allYearTitle: draft("All year"),
  allYear: [
    {
      t: draft("Sunscreen every morning"),
      d: draft("The one step to keep in every season."),
    },
    {
      t: draft("Your home routine"),
      d: draft("Cleanse, correct, protect, morning and night."),
      link: "#regimens",
    },
    {
      t: draft("Neuromodulator, if you have one"),
      d: draft("Usually every 3 to 4 months, whatever the season."),
    },
  ],
  cta: draft("Plan your year"),
  pause: draft("Pause"),
  play: draft("Play"),
  illustration: draft("Illustration. Your nurse sets your own plan."),
  figure: (month: string, season: string) =>
    draft(`A wheel of the twelve months, turned to ${month}, in ${season}.`),
};
