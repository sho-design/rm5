import { draft } from "./review";

/*
 * SkinCeuticals page additions (Nov 2026): the "cleanse, correct, protect" idea, the morning shield explainer, a
 * routine builder built on the regimens in programs.ts, how to apply, and the vitamin C serum comparison.
 * Written for someone new to skincare. Plain statements of what products are for, no results claims. All draft until
 * a nurse reviews them.
 */

export const scSteps = {
  eyebrow: draft("How a routine works"),
  title: draft("Cleanse, correct, protect."),
  lead: draft(
    "Most routines come down to three jobs. You do not need every product. Most people start with one from each step.",
  ),
  items: [
    {
      k: "cleanse",
      n: "1",
      t: draft("Cleanse"),
      d: draft(
        "Wash off oil, makeup, sweat and sunscreen so the next products can reach your skin. Morning and night, with lukewarm water.",
      ),
      eg: draft("For example: a gentle cleanser"),
    },
    {
      k: "correct",
      n: "2",
      t: draft("Correct"),
      d: draft(
        "Serums and treatments for one thing you want to work on, such as dark spots, oil or fine lines. They are light and go on clean skin.",
      ),
      eg: draft("For example: a vitamin C serum in the morning"),
    },
    {
      k: "protect",
      n: "3",
      t: draft("Protect"),
      d: draft(
        "Sunscreen every morning, even on cloudy days and in winter. It is the step we would keep if you kept only one.",
      ),
      eg: draft("For example: a mineral SPF 50"),
    },
  ],
};

export const scShield = {
  eyebrow: draft("Why antioxidants under sunscreen"),
  title: draft("The morning shield."),
  lead: draft(
    "Daylight and city air reach your skin all day. Sunscreen reflects and absorbs much of the sun's UV. An antioxidant serum underneath adds a second kind of care for what gets through.",
  ),
  figure: draft(
    "Illustration: sun rays and pollution particles reach bare skin and set off small sparks. A vitamin C serum layer catches the sparks. A mineral sunscreen layer on top reflects the rays.",
  ),
  note: draft(
    "Illustration only. It shows the idea, not how much any product protects.",
  ),
  play: draft("Play"),
  pause: draft("Pause"),
  steps: [
    {
      label: draft("Bare skin"),
      t: draft("Bare skin"),
      d: draft(
        "Sun rays and pollution particles reach the surface. They set off unstable molecules called free radicals, shown here as sparks.",
      ),
    },
    {
      label: draft("Step 1: vitamin C serum"),
      t: draft("Step 1: vitamin C serum"),
      d: draft(
        "A few drops on clean, dry skin. Antioxidants like vitamin C help neutralize free radicals before they settle in.",
      ),
    },
    {
      label: draft("Step 2: sunscreen"),
      t: draft("Step 2: sunscreen"),
      d: draft(
        "Last, every morning. A mineral sunscreen sits on top and reflects much of the UV away. Reapply when you are outdoors for long.",
      ),
    },
  ],
};

/** Main concern in the routine builder; `reg` is the regimen in programs.ts it maps to. */
export type ScConcern = { k: string; t: string; reg: string };

export const scBuilder = {
  eyebrow: draft("Build a starting routine"),
  title: draft("Your shelf, in order."),
  lead: draft(
    "Pick your skin type and what you would like to work on. We show a starting routine from our regimens. Your nurse adjusts it to your skin at the consult.",
  ),
  skinLabel: draft("Your skin"),
  concernLabel: draft("What you would like to work on"),
  concerns: [
    { k: "start", t: draft("Just getting started"), reg: "starter" },
    { k: "pigment", t: draft("Dark spots or uneven tone"), reg: "pigment" },
    { k: "lines", t: draft("Fine lines"), reg: "aging" },
    { k: "breakouts", t: draft("Breakouts and shine"), reg: "acne" },
    { k: "redness", t: draft("Redness or stinging"), reg: "redness" },
    { k: "after", t: draft("Healing after a treatment"), reg: "recovery" },
  ] as ScConcern[],
  shelfLabel: (name: string) => draft(`Your starting shelf: ${name}`),
  order: draft("Use them in this order"),
  am: draft("Morning"),
  pm: draft("Night"),
  pmNone: draft("Your usual cleanser and moisturizer."),
  total: draft("Total"),
  totalNote: draft("Prices are suggested retail, HST extra."),
  seeRegimen: draft(
    "See this regimen with notes on how the products work together",
  ),
  gentle: draft(
    "Sensitive skin: your nurse may start you on fewer products, or gentler ones, and add one at a time.",
  ),
  oilyStarter: draft(
    "For oily or acne-prone skin, we would usually start with the oily and acne-prone routine.",
  ),
  sensitiveStarter: draft(
    "For sensitive or red skin, we would usually start with the redness and sensitive routine.",
  ),
};

export const scApply = {
  eyebrow: draft("How to apply"),
  title: draft("Thinnest first, sunscreen last."),
  steps: [
    {
      t: draft("Start on clean skin"),
      d: draft("Wash and pat dry with a clean towel."),
    },
    {
      t: draft("Thinnest to thickest"),
      d: draft("Watery serums first, then gels, then creams."),
    },
    {
      t: draft("A little goes a long way"),
      d: draft(
        "A few drops of serum for the face and neck. A pea-sized amount of cream.",
      ),
    },
    {
      t: draft("Let each layer settle"),
      d: draft(
        "Give each layer a moment to soak in before the next, so they do not pill or slide.",
      ),
    },
    {
      t: draft("Sunscreen last, every morning"),
      d: draft(
        "Use enough to cover the face, neck and ears, and reapply when you are outdoors for long.",
      ),
    },
    {
      t: draft("New product? One at a time"),
      d: draft(
        "Add one new product at a time, so you can tell what suits your skin. Stop and call us if anything stings or burns.",
      ),
    },
  ],
};

export const scVitC = {
  eyebrow: draft("Vitamin C serums"),
  title: draft("Four serums, different skin."),
  lead: draft(
    "All four are antioxidant serums for the morning, under sunscreen. The difference is mostly which skin they suit.",
  ),
  caption: draft("Vitamin C serums we carry, by skin type"),
  cols: {
    name: draft("Serum"),
    suits: draft("Usually suits"),
    what: draft("What it is"),
    price: draft("Price"),
  },
  rows: [
    { id: "ce-ferulic", suits: draft("Normal to dry skin") },
    { id: "phloretin-cf", suits: draft("Normal to oily skin, uneven tone") },
    { id: "silymarin-cf", suits: draft("Oily and acne-prone skin") },
    {
      id: "serum-10-aox",
      suits: draft("Sensitive skin, or a first vitamin C"),
    },
  ],
  priceNote: draft(
    "Suggested retail, HST extra. Not sure? Your nurse helps you choose.",
  ),
};
