import { draft } from "./review";
import { bookFor } from "@/lib/routes";

/*
 * Treatment programs and SkinCeuticals regimens (plan doc "intake, treatment plans and combined pricing",
 * November 2026). Programs carry no prices: each is quoted in writing at the consult. Regimens show the
 * SkinCeuticals suggested retail prices from the July 2, 2026 list. Every line is draft until the clinic
 * and Dr. Nguyen sign it off; steps and lengths are typical practice for the physicians to confirm.
 */

/** `keys` are extra search words; `regimen` is the matching home routine on skin health plans. */
export type Program = { k: string; t: string; forWhom: string; steps: string[]; length: string; color: string; keys?: string; regimen?: string };

/** Aesthetics programs: a quick-acting treatment, a slower one and a skin plan, in a set order. */
export const aesPrograms: Program[] = [
  {
    k: "glass",
    t: draft("Glass skin"),
    forWhom: draft("Dull skin, uneven tone, pores"),
    steps: [draft("HydraFacial to start"), draft("Glass facial three times, alternating with PicoSure three times"), draft("Pigment and tone regimen at home")],
    length: draft("About 12 weeks"),
    color: "#E8A0A8",
    keys: "glow dull skin uneven tone pores brightening da cang bong",
    regimen: "pigment",
  },
  {
    k: "eyes",
    t: draft("Eye refresh"),
    forWhom: draft("Lines, hollows and eyelid skin"),
    steps: [draft("Neuromodulator for lines at the corners"), draft("PRF twice for the under-eye area"), draft("Plasma eyelid treatment twice, if suitable")],
    length: draft("About 12 to 16 weeks"),
    color: "#B98AD9",
    keys: "under eye dark circles hollows tired eyes crows feet eyelids eye bags",
    regimen: "aging",
  },
  {
    k: "jaw",
    t: draft("Jawline and lower face"),
    forWhom: draft("Contour, early laxity, a strong jaw muscle"),
    steps: [draft("Jaw muscle neuromodulator, if wanted"), draft("Chin or jaw filler, then a biostimulator"), draft("RF skin tightening three times")],
    length: draft("About 12 weeks"),
    color: "#B98AD9",
    keys: "jawline jowls masseter jaw slimming chin contour sagging lower face",
    regimen: "aging",
  },
  {
    k: "scars",
    t: draft("Acne scar program"),
    forWhom: draft("Rolling and boxcar acne scars"),
    steps: [draft("Active acne treated first in Family Medicine (OHIP)"), draft("Fractional CO₂ two or three times, each followed by an Exosome facial"), draft("PRP for the face and a recovery kit")],
    length: draft("About 16 to 24 weeks"),
    color: "#F2B134",
    keys: "acne scars pitted scars pockmarks seo mun",
    regimen: "acne",
  },
  {
    k: "redness",
    t: draft("Redness and rosacea"),
    forWhom: draft("Flushing and small vessels"),
    steps: [draft("Medical treatment first in Family Medicine (OHIP)"), draft("Clarity II three times"), draft("HydraFacial and the redness regimen at home")],
    length: draft("About 12 weeks"),
    color: "#F2B134",
    keys: "rosacea redness flushing broken capillaries red face",
    regimen: "redness",
  },
  {
    k: "hair",
    t: draft("Hair restoration"),
    forWhom: draft("Thinning hair"),
    steps: [draft("Doctor visit and bloodwork first (OHIP)"), draft("Iron therapy if ferritin is low"), draft("PRP for the scalp monthly, four times, then every 3 to 6 months")],
    length: draft("About 16 weeks, then upkeep"),
    color: "#E8A0A8",
    keys: "hair loss thinning hair balding alopecia shedding receding hairline prp scalp rung toc",
  },
  {
    k: "event",
    t: draft("Event ready"),
    forWhom: draft("A wedding or event about 6 weeks away"),
    steps: [draft("HydraFacial at 6 weeks"), draft("Neuromodulator at 3 to 4 weeks"), draft("Glass facial in the last week; no lasers in the last 2 weeks")],
    length: draft("6 weeks"),
    color: "#7FC8A9",
    keys: "wedding bride party event photos graduation dam cuoi",
    regimen: "starter",
  },
  {
    k: "yearly",
    t: draft("Aging well, yearly"),
    forWhom: draft("A steady, long-term routine"),
    steps: [draft("Neuromodulator every 3 to 4 months"), draft("HydraFacial each season and one Baby CO₂ a year"), draft("Biostimulator yearly and the lines and aging regimen")],
    length: draft("12 months"),
    color: "#9BB0C9",
    keys: "anti aging maintenance yearly plan prevention lines wrinkles",
    regimen: "aging",
  },
];

/** Plans that cross Family Medicine, Infusion Therapy, aesthetics and rehab, each starting with a medical question. */
export const combinedPlans: { k: string; t: string; start: string; then: string; upkeep: string; keys: string; to: string; toLabel: string }[] = [
  { k: "hair", t: draft("Hair restoration plus"), start: draft("Doctor visit and bloodwork (OHIP)"), then: draft("Iron therapy if ferritin is low, PRP for the scalp monthly four times, a Biotin drip monthly if wanted"), upkeep: draft("PRP every 3 to 6 months; ferritin rechecked"), keys: "hair loss thinning hair balding iron ferritin biotin", to: bookFor("family", "concern"), toLabel: draft("Book a doctor visit") },
  { k: "tired", t: draft("Tired all the time"), start: draft("Doctor visit and bloodwork (OHIP)"), then: draft("Iron therapy if low, B12 or vitamin D shots if low, otherwise a Foundation drip routine"), upkeep: draft("A monthly drip or shot; yearly bloodwork"), keys: "tired fatigue exhausted low energy iron b12 vitamin d", to: bookFor("family", "concern"), toLabel: draft("Book a doctor visit") },
  { k: "skin", t: draft("Skin from within"), start: draft("Aesthetics consult and photos"), then: draft("Glass skin program with an Antioxidant drip monthly"), upkeep: draft("HydraFacial and an Antioxidant drip monthly; a SkinCeuticals regimen"), keys: "glow skin drip antioxidant glass skin", to: bookFor("aesthetics", "consult"), toLabel: draft("Book a complimentary consult") },
  { k: "event", t: draft("Event ready plus"), start: draft("Consult 6 to 8 weeks before"), then: draft("Event ready program and a Hydration drip a day or two before"), upkeep: draft("None, or a membership"), keys: "wedding event hydration drip", to: bookFor("aesthetics", "consult"), toLabel: draft("Book a complimentary consult") },
  { k: "active", t: draft("Active and recovering"), start: draft("Rehab assessment"), then: draft("Physio or chiro plan, a Hydration after exercise drip and an Amino blend shot around events"), upkeep: draft("Massage, 25 or 55 minutes, monthly"), keys: "athlete sports recovery physio hydration drip amino", to: bookFor("rehab", "assessment"), toLabel: draft("Book a rehab assessment") },
];

export const programsCopy = {
  aesEyebrow: draft("Programs"),
  aesTitle: draft("Treatments that work together."),
  aesLead: draft("Most plans pair a quicker treatment with a slower one and a skin routine, in a set order. Your consult adjusts the steps to you, and the program is quoted in writing as one total, with each part also available on its own."),
  forLabel: draft("For"),
  lengthLabel: draft("Length"),
  priceNote: draft("Price in writing at your complimentary consult"),
  book: draft("Ask about this program"),
  /** The booking reason, so the nurse sees which program before the consult. */
  reason: (t: string) => (/program/i.test(t) ? t : draft(`${t} program`)),
  eventLink: draft("Plan from your event date"),
  routine: (t: string) => draft(`Home routine: ${t}`),
  combinedEyebrow: draft("Combined plans"),
  combinedTitle: draft("Start with a medical question."),
  combinedLead: draft("One chart covers your doctor, your bloodwork, drips and aesthetics, so a plan can start by finding the cause. OHIP-insured parts stay OHIP-insured and are never part of a package price."),
  startLabel: draft("Starts with"),
  thenLabel: draft("Then, uninsured and priced in writing first"),
  upkeepLabel: draft("Upkeep"),
  regEyebrow: draft("SkinCeuticals regimens"),
  regTitle: draft("A routine to take home."),
  regLead: draft("Every plan includes a home routine. These are starting points; your nurse adjusts them to your skin at the consult. Prices are SkinCeuticals suggested retail, HST extra."),
  regTotal: draft("Total, HST extra"),
  regAm: draft("Morning"),
  regPm: draft("Night"),
  regPmNone: draft("Your usual cleanser and moisturizer."),
  regOrder: draft("Order to use them"),
  regPairs: draft("Often paired with"),
  seeAll: draft("See all the skincare we carry"),
  regNote: draft("We sell these products and earn from their sale. Buying them is never a condition of treatment."),
};

/** `am` and `pm` are the order to use them, by product id; an empty `pm` means the usual cleanser and moisturizer. */
export type Regimen = { k: string; t: string; items: string[]; pairs: string; am: string[]; pm: string[]; note?: string };

/** Product ids from `skincare.ts`; names and prices come from there. */
export const regimens: Regimen[] = [
  { k: "starter", t: draft("Starter"), items: ["ce-ferulic", "physical-fusion"], pairs: draft("Any first plan"), am: ["ce-ferulic", "physical-fusion"], pm: [] },
  { k: "pigment", t: draft("Pigment and tone"), items: ["gentle-cleanser", "phloretin-cf", "tnxa-shot", "physical-fusion"], pairs: draft("Glass skin, PicoSure, peels"), am: ["gentle-cleanser", "phloretin-cf", "tnxa-shot", "physical-fusion"], pm: ["gentle-cleanser", "tnxa-shot"] },
  { k: "aging", t: draft("Lines and aging"), items: ["simply-clean", "ce-ferulic", "retinol-03", "sheer-physical"], pairs: draft("Neuromodulator, Aging well, Baby CO\u2082"), am: ["simply-clean", "ce-ferulic", "sheer-physical"], pm: ["simply-clean", "retinol-03"], note: draft("Start retinol 2 or 3 nights a week and build up as your skin allows.") },
  { k: "acne", t: draft("Oily and acne-prone"), items: ["lha-cleansing-gel", "silymarin-cf", "lha-serum", "clear-daily-soothing"], pairs: draft("Acne scar program, Clarity II"), am: ["lha-cleansing-gel", "silymarin-cf", "clear-daily-soothing"], pm: ["lha-cleansing-gel", "lha-serum"] },
  { k: "redness", t: draft("Redness and sensitive"), items: ["soothing-cleanser", "phyto-corrective-gel", "serum-10-aox", "clear-daily-soothing"], pairs: draft("Redness and rosacea program"), am: ["soothing-cleanser", "serum-10-aox", "phyto-corrective-gel", "clear-daily-soothing"], pm: ["soothing-cleanser", "phyto-corrective-gel"] },
  { k: "recovery", t: draft("Recovery kit"), items: ["gentle-cleanser", "phyto-corrective-gel", "epidermal-repair", "hydrating-b5-gel", "physical-fusion"], pairs: draft("After CO\u2082, plasma, PicoSure or a peel"), am: ["gentle-cleanser", "phyto-corrective-gel", "hydrating-b5-gel", "physical-fusion"], pm: ["gentle-cleanser", "phyto-corrective-gel", "hydrating-b5-gel", "epidermal-repair"] },
];

/**
 * Event ready, planned back from the event date (EventPlanner). `from` and `to` are days before the event; a step
 * with the same `from` and `to` is a single visit. Timings follow the Event ready program above; the nurse confirms
 * them at the consult.
 */
export const eventPlan = {
  eyebrow: draft("Event ready"),
  title: draft("Plan back from your event."),
  lead: draft("Pick the date and see roughly when each step of the Event ready program would fall. Your nurse confirms the plan and the dates at your consult."),
  dateLabel: draft("Your event date"),
  left: (n: number) => (n === 1 ? draft("Your event is tomorrow.") : n < 14 ? draft(`Your event is in ${n} days.`) : draft(`Your event is in about ${Math.round(n / 7)} weeks.`)),
  short: draft("Some steps need more time than that. Your nurse suggests what still fits."),
  tooLate: draft("Not enough time for this step. Your nurse suggests what still fits."),
  between: (a: string, b: string) => draft(`Between ${a} and ${b}`),
  consultBy: (d: string) => draft(`As soon as you can, by ${d}`),
  consultSoon: draft("As soon as you can"),
  reason: (d: string) => draft(`Event ready program, event on ${d}`),
  reasonNoDate: draft("Event ready program"),
  cta: draft("Book a complimentary consult"),
  fine: draft("A planning guide, not a booking. Single visits avoid Fridays, when the clinic is closed."),
  steps: [
    { k: "consult", t: draft("Consult and screening"), rel: draft("First"), from: 56, to: 1, d: draft("As early as you can. Your nurse confirms the plan."), color: "#9BB0C9" },
    { k: "hydra", t: "HydraFacial", rel: draft("About 6 weeks before"), from: 42, to: 35, d: draft("Cleanses and hydrates, no downtime."), color: "#E8A0A8" },
    { k: "neuro", t: draft("Neuromodulator"), rel: draft("3 to 4 weeks before"), from: 28, to: 21, d: draft("Time to settle before the day."), color: "#B98AD9" },
    { k: "nolaser", t: draft("No laser treatments"), rel: draft("Last 2 weeks"), from: 14, to: 0, d: draft("Lasers can leave redness, so none in the last 2 weeks."), color: "#F2B134" },
    { k: "glass", t: draft("Glass facial"), rel: draft("In the last week"), from: 7, to: 2, d: draft("A gentle facial in the final days."), color: "#E8A0A8" },
    { k: "drip", t: draft("Hydration drip, if you like"), rel: draft("1 or 2 days before"), from: 2, to: 1, d: draft("After screening, at IV wellness."), color: "#7FC8A9" },
    { k: "event", t: draft("Your event"), rel: "", from: 0, to: 0, d: draft("Pick a date to see it on the plan."), color: "#14202E" },
  ],
};
