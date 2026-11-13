import { draft } from "./review";

/**
 * Injectables page extras (Nov 2026): the three families, the "what each one does" explainer, a face map,
 * safety with ultrasound vessel mapping, a timeline and common worries. Education only: no unit counts, no
 * prices, no outcome claims. Durations say "usually" because they vary from person to person.
 */
export type InjFamilyKey = "neuro" | "filler" | "bio";

export const injFamilies: {
  k: InjFamilyKey;
  t: string;
  brand?: string;
  short: string;
  d: string;
  lasts: string;
  tint: string;
}[] = [
  {
    k: "neuro",
    t: draft("Neuromodulator"),
    short: draft("Relaxes a muscle"),
    d: draft(
      "A small dose quiets the signal from a nerve to the muscle that folds the skin, so lines from frowning or squinting soften. It does not add anything to your face.",
    ),
    lasts: draft("Usually 3 to 4 months"),
    tint: "#F3ECF8",
  },
  {
    k: "filler",
    t: draft("Dermal filler"),
    brand: "Stylage (Vivacy)",
    short: draft("Replaces volume"),
    d: draft(
      "A hyaluronic acid gel, a sugar your skin already makes, placed where volume has thinned. It holds water and supports the area from underneath.",
    ),
    lasts: draft("Usually 6 to 18 months, depending on the area"),
    tint: "#EEF5FC",
  },
  {
    // clinic to confirm: Radiesse wording, who injects it and typical timing.
    k: "bio",
    t: draft("Biostimulator"),
    brand: "Radiesse",
    short: draft("Prompts your own collagen"),
    d: draft(
      "A gel that encourages your skin to build its own collagen around it over the following weeks, for gradual support.",
    ),
    lasts: draft("Planned at your consult"),
    tint: "#E6F4EA",
  },
];

export const injCopy = {
  famEyebrow: draft("Three families"),
  famTitle: draft("Three ways injectables work."),
  famLead: draft(
    "They are often grouped together, but they do very different things. Your consult decides which, if any, fits what you want.",
  ),
  lastsLabel: draft("How long it usually lasts"),

  howEyebrow: draft("Under the skin"),
  howTitle: draft("What each one actually does."),
  howLead: draft(
    "Pick one to see what happens beneath the surface. The pictures are simplified.",
  ),
  modesLabel: draft("Choose an injectable"),
  modes: {
    neuro: {
      tab: draft("Neuromodulator"),
      steps: [
        draft("A nerve sends a signal to the muscle under your forehead."),
        draft("The muscle tightens and folds the skin above it into a line."),
        draft(
          "After treatment the signal is quieter, the muscle relaxes and the line softens.",
        ),
      ],
      figure: draft(
        "Diagram: a nerve sends signals to a forehead muscle that tightens and folds the skin into a line. With treatment the signals slow, the muscle relaxes and the line softens.",
      ),
    },
    filler: {
      tab: draft("Dermal filler"),
      steps: [
        draft(
          "With time, the fat pads under the cheek thin and a hollow forms.",
        ),
        draft("A soft hyaluronic acid gel is placed under the skin."),
        draft("The gel holds water and supports the surface from below."),
      ],
      figure: draft(
        "Diagram: a hollow under the cheek fills with a soft, see-through gel and the skin surface above it lifts.",
      ),
    },
    bio: {
      tab: draft("Biostimulator"),
      steps: [
        draft("A gel with tiny particles is placed under the skin."),
        draft(
          "Over the following weeks, your skin builds collagen around the particles.",
        ),
        draft(
          "The gel is gradually absorbed and your own collagen remains for a while.",
        ),
      ],
      figure: draft(
        "Diagram: tiny particles under the skin, with collagen threads growing around them as the weeks pass.",
      ),
    },
  } as Record<InjFamilyKey, { tab: string; steps: string[]; figure: string }>,
  treated: draft("Show after treatment"),
  weeks: draft("Weeks after treatment"),
  weeksValue: (w: number) =>
    w === 0
      ? draft("Treatment day")
      : w === 1
        ? draft("1 week")
        : draft(`${w} weeks`),
  labels: {
    nerve: draft("Nerve"),
    signal: draft("Signal"),
    muscle: draft("Muscle"),
    skin: draft("Skin"),
    line: draft("Line"),
    gel: draft("Gel"),
    hollow: draft("Hollow"),
    collagen: draft("Collagen"),
    particles: draft("Particles"),
    fat: draft("Fat pad"),
  },
  play: draft("Play"),
  pause: draft("Pause"),
  illustration: draft("Illustration, not your results."),

  mapEyebrow: draft("Face map"),
  mapTitle: draft("Tap an area to see what is often considered."),
  mapLead: draft(
    "A starting point for your consult, not a plan. Everything is reviewed at two weeks.",
  ),
  mapLabel: draft("Areas of the face"),
  considered: draft("Often considered"),
  lasts: draft("Usually lasts"),
  reviewK: draft("Your review"),
  reviewV: draft("At 2 weeks, included"),

  safeEyebrow: draft("Safety first"),
  safeTitle: draft("Careful, from the first consult."),
  safety: [
    {
      t: draft("Physician-directed"),
      d: draft(
        "Every plan is set under a physician's direction. Injections are given by a physician or a registered nurse.",
      ),
    },
    {
      t: draft("Conservative dosing"),
      d: draft(
        "We start with less. It is easier to add at your review than to wait for too much to wear off.",
      ),
    },
    {
      t: draft("A two-week review, included"),
      d: draft("We check how things have settled and adjust if needed."),
    },
    {
      t: draft("Ultrasound mapping"),
      d: draft(
        "In higher-risk areas, when the injector judges it useful, a wireless handheld ultrasound shows the blood vessels on a tablet before we inject.",
      ),
    },
  ],
  screenTitle: draft("When we wait or say no"),
  screen: [
    draft("Pregnancy or breastfeeding"),
    draft("An active infection or cold sore where we would inject"),
    draft(
      "Some medical conditions and medications, which we ask about at the consult",
    ),
  ],

  usEyebrow: draft("Ultrasound mapping"),
  usTitle: draft("Seeing the vessels before we inject."),
  usLead: draft(
    "A small wireless scanner glides over the skin and the vessels show up live on a tablet. It helps the injector plan where not to go.",
  ),
  usFigure: draft(
    "Diagram: a wireless handheld ultrasound scanner glides across the cheek while a tablet beside it shows the blood vessels underneath lighting up.",
  ),
  usScanner: draft("Wireless scanner"),
  usTablet: draft("Live image"),
  usVessel: draft("Blood vessel"),

  timeEyebrow: draft("After your visit"),
  timeTitle: draft("What the weeks after look like."),
  timeline: [
    {
      when: draft("Day 0"),
      t: draft("Your treatment"),
      d: draft(
        "Small bumps or redness at the injection points usually settle within hours.",
      ),
    },
    {
      when: draft("Day 3"),
      t: draft("Settling in"),
      d: draft(
        "A neuromodulator starts to take effect. Filler swelling eases.",
      ),
    },
    {
      when: draft("Week 2"),
      t: draft("Your review"),
      d: draft("Included. We check the result and adjust if needed."),
    },
    {
      when: draft("Months 3 to 4"),
      t: draft("Neuromodulator wears off"),
      d: draft("Movement returns gradually. Many people come back around now."),
    },
    {
      when: draft("Months 6 to 18"),
      t: draft("Filler softens"),
      d: draft(
        "Your body slowly absorbs it. How long varies by area and person.",
      ),
    },
  ],

  mythEyebrow: draft("Common worries"),
  mythTitle: draft("What people ask before their first time."),
  myths: [
    {
      q: draft("Will I look frozen?"),
      a: draft(
        "We dose conservatively so you can still move your face. If you want a little more, we add it at your two-week review.",
      ),
    },
    {
      q: draft("Is filler permanent?"),
      a: draft(
        "No. Hyaluronic acid filler is gradually absorbed by your body, usually over 6 to 18 months. It can also be dissolved if needed.",
      ),
    },
    {
      q: draft("Does it hurt?"),
      a: draft(
        "Most people describe a quick pinch. Our filler contains a local anaesthetic, and we can use a numbing cream first.",
      ),
    },
  ],
};

/** Face map areas. Coordinates are on a 300 by 380 front-facing face drawing (the FemaleFace in AesFaces). */
export const injAreas: {
  k: string;
  t: string;
  x: number;
  y: number;
  families: InjFamilyKey[];
  what: string;
  lasts: string;
}[] = [
  {
    k: "forehead",
    t: draft("Forehead lines"),
    x: 150,
    y: 92,
    families: ["neuro"],
    what: draft("A neuromodulator to soften lines from raising your brows."),
    lasts: draft("Usually 3 to 4 months"),
  },
  {
    k: "frown",
    t: draft("Frown lines"),
    x: 150,
    y: 126,
    families: ["neuro"],
    what: draft("A neuromodulator for the lines between the brows."),
    lasts: draft("Usually 3 to 4 months"),
  },
  {
    k: "crows",
    t: draft("Crow's feet"),
    x: 236,
    y: 152,
    families: ["neuro"],
    what: draft("A neuromodulator for the lines at the corners of the eyes."),
    lasts: draft("Usually 3 to 4 months"),
  },
  {
    k: "undereye",
    t: draft("Under the eyes"),
    x: 108,
    y: 172,
    families: ["filler"],
    what: draft(
      "Filler in small amounts for hollows, only after a careful look at the area. Sometimes skin treatments suit better.",
    ),
    lasts: draft("Usually 9 to 12 months"),
  },
  {
    k: "cheeks",
    t: draft("Cheeks"),
    x: 206,
    y: 204,
    families: ["filler", "bio"],
    what: draft(
      "Filler to restore volume, or a biostimulator for gradual support.",
    ),
    lasts: draft("Usually 12 to 18 months for filler"),
  },
  {
    k: "lips",
    t: draft("Lips"),
    x: 150,
    y: 250,
    families: ["filler"],
    what: draft(
      "Filler for shape or hydration, kept in proportion to your face.",
    ),
    lasts: draft("Usually 6 to 12 months"),
  },
  {
    k: "jaw",
    t: draft("Jawline and chin"),
    x: 100,
    y: 268,
    families: ["filler", "bio"],
    what: draft("Filler or a biostimulator for definition and balance."),
    lasts: draft("Usually 12 to 18 months for filler"),
  },
  {
    k: "masseter",
    t: draft("Jaw muscle (masseter)"),
    x: 214,
    y: 264,
    families: ["neuro"],
    what: draft(
      "A neuromodulator for clenching or a wide jaw, planned with a physician.",
    ),
    lasts: draft("Usually 4 to 6 months"),
  },
];
