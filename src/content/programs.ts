import { draft } from "./review";

/*
 * Treatment programs and SkinCeuticals regimens (plan doc "intake, treatment plans and combined pricing",
 * November 2026). Programs carry no prices: each is quoted in writing at the consult. Regimens show the
 * SkinCeuticals suggested retail prices from the July 2, 2026 list. Every line is draft until the clinic
 * and Dr. Nguyen sign it off; steps and lengths are typical practice for the physicians to confirm.
 */

export type Program = { k: string; t: string; forWhom: string; steps: string[]; length: string; color: string };

/** Aesthetics programs: a quick-acting treatment, a slower one and a skin plan, in a set order. */
export const aesPrograms: Program[] = [
  {
    k: "glass",
    t: draft("Glass skin"),
    forWhom: draft("Dull skin, uneven tone, pores"),
    steps: [draft("HydraFacial to start"), draft("Glass facial three times, alternating with PicoSure three times"), draft("Pigment and tone regimen at home")],
    length: draft("About 12 weeks"),
    color: "#E8A0A8",
  },
  {
    k: "eyes",
    t: draft("Eye refresh"),
    forWhom: draft("Lines, hollows and eyelid skin"),
    steps: [draft("Neuromodulator for lines at the corners"), draft("PRF twice for the under-eye area"), draft("Plasma eyelid treatment twice, if suitable")],
    length: draft("About 12 to 16 weeks"),
    color: "#B98AD9",
  },
  {
    k: "jaw",
    t: draft("Jawline and lower face"),
    forWhom: draft("Contour, early laxity, a strong jaw muscle"),
    steps: [draft("Jaw muscle neuromodulator, if wanted"), draft("Chin or jaw filler, then a biostimulator"), draft("RF skin tightening three times")],
    length: draft("About 12 weeks"),
    color: "#B98AD9",
  },
  {
    k: "scars",
    t: draft("Acne scar program"),
    forWhom: draft("Rolling and boxcar acne scars"),
    steps: [draft("Active acne treated first in Family Medicine (OHIP)"), draft("Fractional CO₂ two or three times, each followed by an Exosome facial"), draft("PRP for the face and a recovery kit")],
    length: draft("About 16 to 24 weeks"),
    color: "#F2B134",
  },
  {
    k: "redness",
    t: draft("Redness and rosacea"),
    forWhom: draft("Flushing and small vessels"),
    steps: [draft("Medical treatment first in Family Medicine (OHIP)"), draft("Clarity II three times"), draft("HydraFacial and the redness regimen at home")],
    length: draft("About 12 weeks"),
    color: "#F2B134",
  },
  {
    k: "hair",
    t: draft("Hair restoration"),
    forWhom: draft("Thinning hair"),
    steps: [draft("Doctor visit and bloodwork first (OHIP)"), draft("Iron therapy if ferritin is low"), draft("PRP for the scalp monthly, four times, then every 3 to 6 months")],
    length: draft("About 16 weeks, then upkeep"),
    color: "#E8A0A8",
  },
  {
    k: "event",
    t: draft("Event ready"),
    forWhom: draft("A wedding or event about 6 weeks away"),
    steps: [draft("HydraFacial at 6 weeks"), draft("Neuromodulator at 3 to 4 weeks"), draft("Glass facial in the last week; no lasers in the last 2 weeks")],
    length: draft("6 weeks"),
    color: "#7FC8A9",
  },
  {
    k: "yearly",
    t: draft("Aging well, yearly"),
    forWhom: draft("A steady, long-term routine"),
    steps: [draft("Neuromodulator every 3 to 4 months"), draft("HydraFacial each season and one Baby CO₂ a year"), draft("Biostimulator yearly and the lines and aging regimen")],
    length: draft("12 months"),
    color: "#9BB0C9",
  },
];

/** Plans that cross Family Medicine, Infusion Therapy, aesthetics and rehab, each starting with a medical question. */
export const combinedPlans: { k: string; t: string; start: string; then: string; upkeep: string }[] = [
  { k: "hair", t: draft("Hair restoration plus"), start: draft("Doctor visit and bloodwork (OHIP)"), then: draft("Iron therapy if ferritin is low, PRP for the scalp monthly four times, a Biotin drip monthly if wanted"), upkeep: draft("PRP every 3 to 6 months; ferritin rechecked") },
  { k: "tired", t: draft("Tired all the time"), start: draft("Doctor visit and bloodwork (OHIP)"), then: draft("Iron therapy if low, B12 or vitamin D shots if low, otherwise a Foundation drip routine"), upkeep: draft("A monthly drip or shot; yearly bloodwork") },
  { k: "skin", t: draft("Skin from within"), start: draft("Aesthetics consult and photos"), then: draft("Glass skin program with an Antioxidant drip monthly"), upkeep: draft("HydraFacial and an Antioxidant drip monthly; a SkinCeuticals regimen") },
  { k: "event", t: draft("Event ready plus"), start: draft("Consult 6 to 8 weeks before"), then: draft("Event ready program and a Hydration drip a day or two before"), upkeep: draft("None, or a membership") },
  { k: "active", t: draft("Active and recovering"), start: draft("Rehab assessment"), then: draft("Physio or chiro plan, a Hydration after exercise drip and an Amino blend shot around events"), upkeep: draft("Massage, 25 or 55 minutes, monthly") },
];

export const programsCopy = {
  aesEyebrow: draft("Programs"),
  aesTitle: draft("Treatments that work together."),
  aesLead: draft("Most plans pair a quicker treatment with a slower one and a skin routine, in a set order. Your consult adjusts the steps to you, and the program is quoted in writing as one total, with each part also available on its own."),
  forLabel: draft("For"),
  lengthLabel: draft("Length"),
  priceNote: draft("Price in writing at your complimentary consult"),
  book: draft("Ask about this program"),
  combinedEyebrow: draft("Combined plans"),
  combinedTitle: draft("Start with a medical question."),
  combinedLead: draft("One chart covers your doctor, your bloodwork, drips and aesthetics, so a plan can start by finding the cause. OHIP-insured parts stay OHIP-insured and are never part of a package price."),
  startLabel: draft("Starts with"),
  thenLabel: draft("Then"),
  upkeepLabel: draft("Upkeep"),
  regEyebrow: draft("SkinCeuticals regimens"),
  regTitle: draft("A routine to take home."),
  regLead: draft("Every plan includes a home routine. These are starting points; your nurse adjusts them to your skin at the consult. Prices are SkinCeuticals suggested retail, HST extra."),
  regTotal: draft("Total"),
  regPairs: draft("Often paired with"),
  seeAll: draft("See all the skincare we carry"),
  regNote: draft("We sell these products and earn from their sale. Buying them is never a condition of treatment."),
};

export type Regimen = { k: string; t: string; items: string[]; pairs: string };

/** Product ids from `skincare.ts`; names and prices come from there. */
export const regimens: Regimen[] = [
  { k: "starter", t: draft("Starter"), items: ["ce-ferulic", "physical-fusion"], pairs: draft("Any first plan") },
  { k: "pigment", t: draft("Pigment and tone"), items: ["gentle-cleanser", "phloretin-cf", "tnxa-shot", "physical-fusion"], pairs: draft("Glass skin, PicoSure, peels") },
  { k: "aging", t: draft("Lines and aging"), items: ["simply-clean", "ce-ferulic", "retinol-03", "sheer-physical"], pairs: draft("Neuromodulator, Aging well, Baby CO\u2082") },
  { k: "acne", t: draft("Oily and acne-prone"), items: ["lha-cleansing-gel", "silymarin-cf", "lha-serum", "clear-daily-soothing"], pairs: draft("Acne scar program, Clarity II") },
  { k: "redness", t: draft("Redness and sensitive"), items: ["soothing-cleanser", "phyto-corrective-gel", "serum-10-aox", "clear-daily-soothing"], pairs: draft("Redness and rosacea program") },
  { k: "recovery", t: draft("Recovery kit"), items: ["gentle-cleanser", "phyto-corrective-gel", "epidermal-repair", "hydrating-b5-gel", "physical-fusion"], pairs: draft("After CO\u2082, plasma, PicoSure or a peel") },
];
