import { draft } from "./review";

/*
 * "What the program looks like" on the metabolic program page (November 2026). Process only: the program is
 * physician-supervised medical weight management, and this section shows the steps, never results. No weight,
 * no numbers of kilograms, no before and after, no claims (CLAUDE.md, CPSO). Timing is not set out anywhere on the
 * site, so every interval says it is set by your physician. CLINIC TO CONFIRM: the steps and their order.
 */

export type MetabolicStep = {
  k: "screen" | "blood" | "plan" | "checkin" | "repeat" | "next";
  t: string;
  d: string;
  tag: string;
};

export const metabolicPath = {
  eyebrow: draft("What the program looks like"),
  title: draft("A plan with a physician, step by step."),
  lead: draft(
    "Physician-supervised medical weight management. Here is how the program runs, from the first visit on. Your physician sets the timing with you.",
  ),
  timing: draft("Timing at each step is set by your physician."),
  illustration: draft("Illustration"),
  pause: draft("Pause"),
  play: draft("Play"),
  figure: draft(
    "Illustration: a path with six stops, from screening and bloodwork to a physician plan, check-ins, repeat bloodwork and next steps.",
  ),
  steps: [
    {
      k: "screen",
      t: draft("Screening and consult"),
      d: draft(
        "A visit with our physician about your health history, medications and goals. We check whether the program is right for you, and we say so if it is not.",
      ),
      tag: draft("First visit"),
    },
    {
      k: "blood",
      t: draft("Bloodwork"),
      d: draft(
        "Bloodwork drawn here at the clinic, before anything starts, so your plan begins from your own results.",
      ),
      tag: draft("Before you start"),
    },
    {
      k: "plan",
      t: draft("Your plan"),
      d: draft(
        "Our physician sets your plan with you. A drip or a shot is part of it only on a physician's order.",
      ),
      tag: draft("Set by your physician"),
    },
    {
      k: "checkin",
      t: draft("Regular check-ins"),
      d: draft(
        "Visits with our team to see how you are doing and answer questions. How often is set by your physician.",
      ),
      tag: draft("Ongoing"),
    },
    {
      k: "repeat",
      t: draft("Repeat bloodwork"),
      d: draft(
        "Bloodwork again, when your physician decides, so changes to your plan are based on your own numbers.",
      ),
      tag: draft("When your physician decides"),
    },
    {
      k: "next",
      t: draft("Next steps"),
      d: draft(
        "You and your physician decide together whether to continue, adjust or stop. No pressure either way.",
      ),
      tag: draft("Together"),
    },
  ] as MetabolicStep[],
};
