import { draft } from "./review";

/*
 * Medical Aesthetics treatment menu, concerns and planner.
 * Source: the clinic's Medical Aesthetics guide site (ma1, Nov 2026), adapted to RM-HB-COMMS: no superlatives,
 * no outcome promises, no prices online (the guide shares pricing at consult). Every line is draft until the clinic
 * signs it off.
 */

export type AesFamily = "injectables" | "regenerative" | "energy" | "plasma" | "facials" | "skin";

export const aesFamilies: Record<AesFamily, { t: string; d: string; color: string }> = {
  injectables: { t: draft("Injectables"), d: draft("Neuromodulators, dermal fillers and biostimulators, by injector."), color: "#B98AD9" },
  regenerative: { t: draft("Regenerative and boosters"), d: draft("PDRN, exosomes, PRP and PRF, micro-infused or injected."), color: "#E8A0A8" },
  energy: { t: draft("Energy and laser"), d: draft("RF skin tightening and laser: XERF, eCO₂, PicoSure and Clarity II."), color: "#F2B134" },
  plasma: { t: draft("Plasma and lesions"), d: draft("PlexR Plus plasma and removal of small vessels and lesions."), color: "#6FB4E8" },
  facials: { t: draft("Facials and peels"), d: draft("HydraFacial, medical peels and prep facials, in a clinical setting."), color: "#7FC8A9" },
  skin: { t: draft("Skin health"), d: draft("SkinCeuticals medical-grade actives, prescribed and reviewed."), color: "#9BB0C9" },
};

export type AesConcern = "lines" | "volume" | "texture" | "acne" | "pigment" | "redness" | "laxity" | "hair" | "aging";

export const aesConcerns: { k: AesConcern; t: string; d: string }[] = [
  { k: "lines", t: draft("Fine lines and wrinkles"), d: draft("Soften expression lines while keeping your face yours.") },
  { k: "volume", t: draft("Volume and contour"), d: draft("Subtle structure where time has quietly taken it.") },
  { k: "texture", t: draft("Texture and tone"), d: draft("A smoother surface and more even light across the skin.") },
  { k: "acne", t: draft("Acne and scarring"), d: draft("Calm active skin and soften the marks it leaves.") },
  { k: "pigment", t: draft("Pigmentation"), d: draft("Sun and hormonal pigment, treated with measured energy.") },
  { k: "redness", t: draft("Redness"), d: draft("Diffuse redness and visible small vessels.") },
  { k: "laxity", t: draft("Laxity and lifting"), d: draft("Firmer, more defined contours, without surgery.") },
  { k: "hair", t: draft("Hair thinning"), d: draft("Evidence-led options for thinning hair, after a medical look at the cause.") },
  { k: "aging", t: draft("Aging well"), d: draft("A long-view plan, subtle by design.") },
];

export type AesSession = { t: string; mins?: number };
export type AesTreatment = {
  id: string;
  family: AesFamily;
  brand?: string;
  name: string;
  d: string;
  sessions?: AesSession[];
  note?: string;
  concerns: AesConcern[];
  /** 0 none, 1 a day or two, 2 a few days. A guide for the planner; the consult confirms it. */
  downtime: 0 | 1 | 2;
};

export const aesTreatments: AesTreatment[] = [
  {
    id: "neuromodulator",
    family: "injectables",
    name: draft("Neuromodulator"),
    d: draft("Softens dynamic lines and refines facial balance. Priced per unit, by injector."),
    sessions: [{ t: draft("Standard treatment, Registered Nurse") }, { t: draft("Larger areas, such as masseter or sweating") }, { t: draft("Physician-administered, Dr. Johnny Nguyen") }],
    note: draft("Usually repeated every 3 to 4 months."),
    concerns: ["lines", "aging"],
    downtime: 0,
  },
  {
    id: "filler",
    family: "injectables",
    brand: "Stylage (Vivacy)",
    name: draft("Dermal filler"),
    d: draft("A hyaluronic acid filler with built-in lidocaine, for volume, contour and structure."),
    sessions: [{ t: draft("½ cc or 1 cc, Registered Nurse") }, { t: draft("½ cc or 1 cc, Senior Registered Nurse") }, { t: draft("1 cc, Dr. Johnny Nguyen") }],
    concerns: ["volume", "lines", "aging"],
    downtime: 1,
  },
  {
    id: "biostimulator",
    family: "injectables",
    brand: "Radiesse",
    name: draft("Biostimulator"),
    d: draft("Encourages your own collagen for gradual structural support."),
    sessions: [{ t: draft("Planned at consult") }],
    concerns: ["volume", "laxity", "aging"],
    downtime: 1,
  },
  {
    id: "vamp",
    family: "regenerative",
    brand: "VAMP",
    name: draft("Glass facial"),
    d: draft("A PDRN complex micro-infused into the skin, for glow, pores and elasticity."),
    sessions: [{ t: draft("Facial"), mins: 60 }],
    note: draft("Usually a series of 3."),
    concerns: ["texture", "aging"],
    downtime: 0,
  },
  {
    id: "exosome",
    family: "regenerative",
    brand: "Pluryal",
    name: draft("Exosome facial"),
    d: draft("An exosome and peptide complex, micro-infused for skin renewal and radiance."),
    sessions: [{ t: draft("Facial"), mins: 60 }],
    note: draft("Usually a series of 3."),
    concerns: ["texture", "aging"],
    downtime: 0,
  },
  {
    id: "prp",
    family: "regenerative",
    name: draft("PRP"),
    d: draft("Platelet-rich plasma from your own blood, for the face or the scalp."),
    sessions: [{ t: draft("Face or scalp"), mins: 75 }],
    note: draft("Usually a series of 3."),
    concerns: ["texture", "hair", "aging"],
    downtime: 1,
  },
  {
    id: "prf",
    family: "regenerative",
    name: draft("PRF"),
    d: draft("Platelet-rich fibrin from your own blood, released more slowly, for the under-eye area and face."),
    concerns: ["texture", "volume"],
    downtime: 1,
  },
  {
    id: "xerf",
    family: "energy",
    brand: "XERF",
    // XERF is needle-free radiofrequency skin tightening, not microneedling (corrected November 2026).
    name: draft("RF skin tightening"),
    d: draft("Needle-free radiofrequency for skin tightening and texture on the face, neck and body. Often paired with a glass facial or PRF."),
    sessions: [{ t: draft("Face") }, { t: draft("Face and neck"), mins: 90 }, { t: draft("Body"), mins: 90 }],
    note: draft("Usually a series of 3."),
    concerns: ["laxity", "texture"],
    downtime: 0,
  },
  {
    id: "eco2",
    family: "energy",
    brand: "eCO₂",
    name: draft("Fractional CO₂ laser"),
    d: draft("Ablative fractional resurfacing for acne scars, deep texture, wrinkles and laxity."),
    sessions: [{ t: draft("Baby: lighter, less downtime"), mins: 60 }, { t: draft("Face"), mins: 105 }, { t: draft("Face and neck"), mins: 105 }],
    concerns: ["acne", "texture", "lines", "laxity"],
    downtime: 2,
  },
  {
    id: "picosure",
    family: "energy",
    brand: "PicoSure",
    name: draft("Picosecond laser"),
    d: draft("A 755 nm picosecond laser for pigment, tone, texture, scars and tattoo removal, comparatively gentle across skin tones."),
    sessions: [
      { t: draft("Baby: refresh or maintenance"), mins: 60 },
      { t: draft("Pigmentation"), mins: 60 },
      { t: draft("Texture or scars, face") },
      { t: draft("Texture or scars, face and neck"), mins: 75 },
      { t: draft("Spot treatment"), mins: 60 },
      { t: draft("Tattoo removal"), mins: 60 },
    ],
    concerns: ["pigment", "texture", "acne"],
    downtime: 1,
  },
  {
    id: "clarity",
    family: "energy",
    brand: "Clarity II",
    name: draft("Dual-wavelength laser"),
    d: draft("Alexandrite and Nd:YAG in one platform, for skin renewal, acne, pigment, vessels and hair removal."),
    sessions: [{ t: draft("Acne"), mins: 45 }, { t: draft("Face renewal"), mins: 60 }, { t: draft("Facial spot, pigment or vessel"), mins: 45 }],
    concerns: ["redness", "pigment", "acne"],
    downtime: 0,
  },
  {
    id: "plexr",
    family: "plasma",
    brand: "PlexR Plus",
    name: draft("Plasma soft surgery"),
    d: draft("Plasma for non-surgical eyelid tightening and lesion removal, with no incisions and no general anaesthesia."),
    sessions: [{ t: draft("Upper eyelids"), mins: 75 }, { t: draft("Lower eyelids or under-eye"), mins: 75 }, { t: draft("Upper and lower"), mins: 75 }, { t: draft("Mole removal, per lesion"), mins: 45 }],
    note: draft("Usually 2 sessions."),
    concerns: ["laxity", "aging"],
    downtime: 2,
  },
  {
    id: "lesions",
    family: "plasma",
    name: draft("Vessel and lesion removal"),
    d: draft("Spider veins, small facial vessels, skin tags and seborrheic keratoses, with Clarity II or PlexR."),
    sessions: [{ t: draft("Spider veins or vessels"), mins: 60 }, { t: draft("Skin tag or keratosis"), mins: 45 }],
    concerns: ["redness"],
    downtime: 1,
  },
  {
    id: "hydrafacial",
    family: "facials",
    brand: "HydraFacial",
    name: draft("Hydradermabrasion facial"),
    d: draft("Cleanse, exfoliate, extract and hydrate in a medical setting, with a SkinCeuticals home routine."),
    sessions: [{ t: draft("Signature"), mins: 75 }, { t: draft("Deluxe, with a targeted booster") }],
    concerns: ["texture", "acne"],
    downtime: 0,
  },
  {
    id: "peel",
    family: "facials",
    brand: "SkinCeuticals",
    name: draft("Medical peel"),
    d: draft("A customised medical-grade peel, with a home routine to extend it."),
    sessions: [{ t: draft("Peel"), mins: 60 }],
    concerns: ["pigment", "texture", "acne"],
    downtime: 1,
  },
  {
    id: "addons",
    family: "facials",
    name: draft("Add-ons"),
    d: draft("Small extras that pair with any treatment."),
    sessions: [{ t: draft("Red light, Healite II"), mins: 20 }, { t: draft("Lymphatic drainage"), mins: 30 }, { t: draft("Prep skin facial"), mins: 35 }],
    concerns: ["texture"],
    downtime: 0,
  },
  {
    id: "skinplan",
    family: "skin",
    brand: "SkinCeuticals",
    name: draft("Skin health plan"),
    d: draft("A prescribed home routine, included with every treatment plan and reviewed as your skin changes."),
    concerns: ["pigment", "texture", "redness", "acne", "aging"],
    downtime: 0,
  },
];

export const aesTreatment = (id: string) => aesTreatments.find((t) => t.id === id);

/** "Plan your treatment": goals map to starting points, never a prescription. Body-shaping goals are left out (no weight or fat claims). */
export const aesGoalGroups: { t: string; goals: { t: string; ids: string[] }[] }[] = [
  {
    t: draft("Face and skin"),
    goals: [
      { t: draft("Fine lines"), ids: ["neuromodulator", "eco2", "skinplan"] },
      { t: draft("Deeper lines and folds"), ids: ["filler", "eco2", "neuromodulator"] },
      { t: draft("Lost facial volume"), ids: ["filler", "biostimulator"] },
      { t: draft("Laxity or sagging"), ids: ["xerf", "eco2", "biostimulator"] },
      { t: draft("Dull or tired-looking skin"), ids: ["vamp", "hydrafacial", "exosome"] },
      { t: draft("Uneven tone"), ids: ["picosure", "peel", "skinplan"] },
      { t: draft("Dark spots or melasma"), ids: ["picosure", "clarity", "peel"] },
      { t: draft("Sun damage"), ids: ["picosure", "peel", "skinplan"] },
      { t: draft("Acne"), ids: ["clarity", "hydrafacial", "peel"] },
      { t: draft("Acne scars"), ids: ["eco2", "picosure"] },
      { t: draft("Large pores"), ids: ["vamp", "xerf", "hydrafacial"] },
      { t: draft("Dry or dehydrated skin"), ids: ["hydrafacial", "vamp", "skinplan"] },
      { t: draft("Redness or sensitivity"), ids: ["clarity", "lesions", "skinplan"] },
      { t: draft("Broken capillaries"), ids: ["clarity", "lesions"] },
    ],
  },
  {
    t: draft("Eyes, lips and folds"),
    goals: [
      { t: draft("Under-eye hollows"), ids: ["prf", "filler", "plexr"] },
      { t: draft("Under-eye darkness"), ids: ["prp", "prf", "filler"] },
      { t: draft("Lip volume"), ids: ["filler"] },
      { t: draft("Smile lines"), ids: ["filler", "biostimulator"] },
      { t: draft("Heavy or hooded eyelids"), ids: ["plexr"] },
      { t: draft("Brow position"), ids: ["neuromodulator"] },
    ],
  },
  {
    t: draft("Contour"),
    goals: [
      { t: draft("Jawline"), ids: ["filler", "biostimulator", "neuromodulator"] },
      { t: draft("Chin"), ids: ["filler"] },
      { t: draft("Jaw clenching"), ids: ["neuromodulator"] },
      { t: draft("Neck"), ids: ["xerf", "eco2", "biostimulator"] },
      { t: draft("Hands"), ids: ["biostimulator", "filler"] },
    ],
  },
  {
    t: draft("Body, hair and spots"),
    goals: [
      { t: draft("Stretch marks"), ids: ["eco2", "picosure"] },
      { t: draft("Scars"), ids: ["eco2", "picosure"] },
      { t: draft("Heavy sweating"), ids: ["neuromodulator"] },
      { t: draft("Tattoo removal"), ids: ["picosure"] },
      { t: draft("Unwanted hair"), ids: ["clarity"] },
      { t: draft("Thinning hair"), ids: ["prp"] },
      { t: draft("Skin tags or spider veins"), ids: ["lesions"] },
    ],
  },
];

/** Areas of the face for "Where would you like to start?". Treatments listed are starting points, not a plan (draft, clinic to confirm). */
export type AesArea = { k: string; t: string; d: string; ids: string[]; x: number; y: number };
export const aesAreas: AesArea[] = [
  { k: "forehead", t: draft("Forehead"), d: draft("Expression lines across the forehead and between the brows."), ids: ["neuromodulator", "eco2", "skinplan"], x: 50, y: 25 },
  { k: "eyes", t: draft("Around the eyes"), d: draft("Lines at the corners, the under-eye area and the eyelids."), ids: ["neuromodulator", "plexr", "prf"], x: 79, y: 42 },
  { k: "cheeks", t: draft("Cheeks"), d: draft("Volume, redness, small vessels and pigment."), ids: ["filler", "biostimulator", "clarity", "picosure"], x: 21, y: 55 },
  { k: "lips", t: draft("Lips and mouth"), d: draft("Lip volume and the lines around the mouth."), ids: ["filler", "neuromodulator", "eco2"], x: 74, y: 71 },
  { k: "jaw", t: draft("Jawline and neck"), d: draft("Contour, a strong jaw muscle and skin on the neck."), ids: ["neuromodulator", "filler", "biostimulator", "xerf"], x: 28, y: 77 },
  { k: "skin", t: draft("All-over skin"), d: draft("Tone, texture, glow, pores and acne."), ids: ["hydrafacial", "vamp", "exosome", "peel", "picosure", "clarity", "skinplan"], x: 68, y: 91 },
];

export const aesCopy = {
  concernsEyebrow: draft("What brings you in"),
  concernsTitle: draft("Start with what you notice."),
  concernsLead: draft("We match your concern to the right treatment, not the other way round."),
  menuEyebrow: draft("The menu"),
  seeMenu: draft("See the full menu"),
  planLink: draft("Not sure of the name? Start from an area or concern"),
  faceLead: draft("Tap what you notice. We show what often helps, and your consult decides what is right for you."),
  faceAria: draft("Concerns"),
  faceChoice: draft("Face drawing"),
  faceFemale: draft("Female"),
  faceMale: draft("Male"),
  youNotice: draft("You notice"),
  oftenHelps: draft("Often considered"),
  faceNote: draft("A starting point, not a plan. Your clinician and physician confirm the right option, if any, at a consult."),
  seeConcern: draft("See these in the menu"),
  count: (n: number) => (n === 1 ? draft("1 treatment") : draft(`${n} treatments`)),
  menuTitle: draft("Six families, one clinical standard."),
  menuLead: draft("Delivered by our Registered Nurses, Registered Practical Nurses and physicians, under physician supervision. Every treatment starts with a consult and a written plan, and your price is set there."),
  babyNote: draft("Some laser treatments come in a Baby option: a lighter session with less downtime, for a first try or for upkeep."),
  allFamilies: draft("All"),
  anyConcern: draft("Any concern"),
  noMatch: draft("Nothing in this family for that concern. Try another family or concern."),
  minutes: (m: number) => draft(`${m} min`),
  book: draft("Book a consult"),
  startEyebrow: draft("Start here"),
  startTitle: draft("Where would you like to start?"),
  startLead: draft("Pick an area or a concern. We show what is often considered and what each visit looks like, start to finish. Your consult decides what is right for you."),
  byArea: draft("By area"),
  byConcern: draft("By concern"),
  areaAria: draft("Areas of the face"),
  oftenConsidered: (n: number) => (n === 1 ? draft("1 treatment often considered") : draft(`${n} treatments often considered`)),
  downtimeAny: draft("Any downtime"),
  downtimeChips: [draft("No downtime"), draft("A day or two"), draft("A few days")],
  downtimeHiddenNote: (n: number) => (n === 1 ? draft("1 more if you can take more downtime.") : draft(`${n} more if you can take more downtime.`)),
  noneAtDowntime: draft("Nothing here at that downtime. Try another option."),
  stepConsult: draft("Consult"),
  stepVisit: draft("The visit"),
  stepAfter: draft("The days after"),
  stepBack: draft("Coming back"),
  consultValue: draft("Complimentary, with our nurse"),
  whoLine: draft("Consult with our nurse. A physician joins when your concern needs one."),
  plannedAtConsult: draft("Planned at consult"),
  asPlanned: draft("As planned at consult"),
  range: (a: number, b: number) => (a === b ? draft(`${a} min`) : draft(`${a} to ${b} min`)),
  menuTitleAll: draft("The full menu."),
  menuLeadAll: draft("Every treatment we offer, with how long it takes. Your price is given in writing at a complimentary consult."),
  menuNote: draft("Elective, not covered by OHIP. Receipts provided."),
  toolsTitle: draft("The tools we use"),
  tools: ["SkinCeuticals", "HydraFacial", "PicoSure", "Clarity II", "XERF", "eCO₂", "Stylage", "Radiesse", "PlexR Plus", "Healite II"],
  planEyebrow: draft("Plan your treatment"),
  planTitle: draft("Mark what you would like to address."),
  planLead: draft("Pick as many as apply. We suggest starting points, and your physician finalises everything at your consult. Nothing you pick is sent or saved."),
  downtimeLabel: draft("Comfort with downtime"),
  downtime: [draft("None"), draft("A day or two"), draft("A few days is fine")],
  planOut: draft("Your starting points"),
  planEmpty: draft("Pick a goal to see starting points."),
  planNote: draft("Starting points, not a treatment plan. We screen for candidacy and your physician decides with you."),
  planCta: draft("Take this to a consult"),
  planDowntimeHidden: (n: number) => (n === 1 ? draft("1 option hidden for downtime.") : draft(`${n} options hidden for downtime.`)),
  candidacyEyebrow: draft("Candidacy and safety"),
  candidacyTitle: draft("Screened first, treated second."),
  candidacyLead: draft("We would rather tell you a treatment is not right for you than sell it anyway."),
  candidacy: [
    { t: draft("Who we screen out"), d: draft("Pregnancy and breastfeeding, some neuromuscular or autoimmune conditions, infection in the area, some medications, a recent related procedure, or expectations a treatment cannot meet. We may pause or decline. That is the screening working.") },
    { t: draft("What to expect"), d: draft("A consult and screening first, then the treatment, then a settling period. We tell you when you may see a change, how long it tends to last and what upkeep looks like, before you decide.") },
    { t: draft("Downtime, honestly"), d: draft("From none to several days, depending on the treatment and how strong it is. If a treatment needs a quiet week, we say so and plan around your life.") },
    { t: draft("How long it lasts"), d: draft("Nothing here is permanent, and it varies from person to person. We are specific about how long an option usually lasts and what it asks of you.") },
  ],
};
