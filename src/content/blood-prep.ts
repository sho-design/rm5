import { draft } from "./review";

/*
 * Bloodwork & ECG page, November 2026: the "When to stop eating" clock (replaces the four fasting cards) and the
 * "What is in one tube" explainer. New wording is draft; fasting rules and stop-time sentences stay in
 * content/subpages.ts (bloodPrep) so the lab's list lives in one place.
 */

export const fastingClockCopy = {
  ruleLabel: draft("Your fasting rule"),
  appointment: draft("Your appointment"),
  lastFood: draft("Last food"),
  lastFoodDrink: draft("Last food or drink"),
  night: draft("Night"),
  window: draft("Last food window"),
  fasting: draft("Fasting"),
  stillFine: draft("Still fine"),
  waterOk: draft("Water is fine"),
  waterNo: draft("No water either"),
  water: draft("Water. Drink enough the day before and that morning."),
  noWater: draft("Nothing at all, not even water, for these 4 hours."),
  // The hero's own sentence, shown when a fasting draw is booked late in the morning.
  lateMorning: "Fasting tests are best booked before 10am.",
  allRules: (time: string) => draft(`Every rule for a ${time} appointment`),
  ruleCol: draft("Rule"),
  stopCol: draft("When to stop"),
  clockAlt: (stop: string) => draft(`Clock: ${stop}`),
  illustration: draft("Illustration. Your requisition or our lab team tells you which rule applies."),
};

/*
 * "What is in one tube". EDUCATIONAL ONLY: a nurse or our lab team must check this wording before publishing
 * (which layer each test reads, and the note that some tests use their own tube).
 */
export type TubeLayer = "plasma" | "buffy" | "cells" | "whole";

export const tubeCopy = {
  eyebrow: draft("Inside a blood sample"),
  title: draft("What is in one tube."),
  lead: draft(
    "Spun fast for a few minutes, a tube of blood settles into layers. Different tests read different layers. Pick a test to see which.",
  ),
  stages: { drawn: draft("Drawn"), spun: draft("Spinning"), settled: draft("Settled") },
  layers: {
    plasma: { short: draft("Plasma"), t: draft("Plasma"), d: draft("The pale liquid part. It carries proteins, fats and sugars.") },
    buffy: { short: draft("White cells"), t: draft("White cells and platelets"), d: draft("A thin pale layer between the two.") },
    cells: { short: draft("Red cells"), t: draft("Red cells"), d: draft("The heavy part at the bottom. Red cells carry oxygen.") },
  },
  tests: [
    {
      k: "counts",
      t: draft("Blood counts"),
      d: draft("Read from the cells: red cells, white cells and platelets are counted."),
      layers: ["cells", "buffy"] as TubeLayer[],
    },
    {
      k: "iron",
      t: draft("Iron stores (ferritin)"),
      d: draft("Read from the liquid part, the plasma or serum."),
      layers: ["plasma"] as TubeLayer[],
    },
    {
      k: "chol",
      t: draft("Cholesterol"),
      d: draft("Read from the liquid part, the plasma or serum."),
      layers: ["plasma"] as TubeLayer[],
    },
    {
      k: "sugar",
      t: draft("Sugars"),
      d: draft("Glucose is read from the liquid part. A1c is read from whole blood, in a tube that is not spun."),
      layers: ["plasma", "whole"] as TubeLayer[],
    },
  ],
  pickLabel: draft("Pick a test"),
  pause: draft("Pause"),
  play: draft("Play"),
  alt: draft(
    "Illustration of a blood tube filling, spinning and settling into three layers: plasma on top, a thin pale layer of white cells and platelets, and red cells at the bottom.",
  ),
  note: draft("Illustration, not to scale. Some tests use their own tube, and the lab decides which."),
};
