import { draft } from "./review";

/*
 * Bloodwork & ECG page (November 2026): "Where the stickers go" (the ECG explainer) and "Your requisition, box by
 * box" (the requisition peek). Facts come from what the site already says: the ECG option in bloodOptions and the
 * ECG prep list in bloodPrep (content/subpages.ts), and the health note "How to read your lab requisition"
 * (content/notes.ts). How to prepare stays in the "How to prepare" section; these only link to it.
 *
 * FOR CLINIC CONFIRMATION (medical wording):
 * - Sticker count and places: 10 stickers, one on each arm and leg and six across the chest (the prep list on this
 *   page already says "Stickers go on each arm and leg and six across your chest").
 * - The three plain descriptions of the wave: P "the top of the heart squeezes", QRS "the bottom squeezes",
 *   T "it resets". Standard teaching, simplified on purpose.
 * - "It only records. Nothing goes into you."
 */

export type EcgStage = { k: "stickers" | "trace" | "p" | "qrs" | "t"; t: string; d: string };

export const ecgCopy = {
  eyebrow: draft("The ECG"),
  title: draft("Where the stickers go."),
  lead: draft(
    "A 12-lead ECG reads your heart's electrical rhythm through small stickers on the skin. It takes a few seconds of recording, lying still, and our physician reads it the same day.",
  ),
  note: draft("Illustration. Your technician places the stickers for you."),
  alt: draft(
    "Illustration of a person lying down with ten small stickers: one on each arm and leg and six across the chest. A heart tracing draws across a paper strip, with three parts of the wave labelled.",
  ),
  stages: [
    {
      k: "stickers",
      t: draft("Ten small stickers"),
      d: draft("One on each arm and leg, and six across the chest."),
    },
    {
      k: "trace",
      t: draft("A few seconds of recording"),
      d: draft("You lie still and breathe normally while the machine draws your rhythm."),
    },
    {
      k: "p",
      t: draft("The small first bump"),
      d: draft("The top of the heart squeezes."),
    },
    {
      k: "qrs",
      t: draft("The tall spike"),
      d: draft("The bottom of the heart squeezes."),
    },
    {
      k: "t",
      t: draft("The gentle wave after"),
      d: draft("The heart resets for the next beat."),
    },
  ] as EcgStage[],
  waveLabels: { p: draft("Top squeezes"), qrs: draft("Bottom squeezes"), t: draft("Resets") },
  records: draft("It only records. Nothing goes into you."),
  readBy: draft("Read by our physician the same day."),
  prepare: draft("How to prepare for an ECG"),
  pause: draft("Pause"),
  play: draft("Play"),
  stripLabel: draft("Heart tracing"),
};

export type ReqBox = { k: "patient" | "doctor" | "tests" | "fasting" | "copy"; label: string; caption: string };

export const reqCopy = {
  eyebrow: draft("Your requisition"),
  title: draft("Box by box."),
  lead: draft("The form your doctor fills out for your tests. Here is what the common boxes are for."),
  note: draft("Illustration. Real requisitions look different from clinic to clinic."),
  alt: draft(
    "Illustration of a lab requisition with five areas highlighted in turn: your details, the ordering doctor, the tests ticked, the fasting note and who gets a copy.",
  ),
  boxes: [
    { k: "patient", label: draft("Your details"), caption: draft("Your name, date of birth and health card number. Check they are right.") },
    { k: "doctor", label: draft("Ordering doctor"), caption: draft("The doctor who asked for the tests. Results go back to them.") },
    { k: "tests", label: draft("Tests ticked"), caption: draft("Each ticked box is one test or panel.") },
    { k: "fasting", label: draft("Fasting"), caption: draft("If your tests need fasting, it is marked here.") },
    { k: "copy", label: draft("Copy to"), caption: draft("Another doctor who should also see the results, if any.") },
  ] as ReqBox[],
  more: draft("How to read your lab requisition"),
  morePage: "/health-notes/reading-requisition",
  pause: draft("Pause"),
  play: draft("Play"),
};
