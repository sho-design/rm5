import { draft } from "./review";

/*
 * Bloodwork & ECG: "One trip, start to finish" (November 2026). Facts only from bloodPath (content/subpages.ts) and
 * the page's closing band: about ten minutes at the clinic, results reach your doctor in about a week, a follow-up
 * with your doctor 2 to 3 weeks after the test (critical results flag the clinic right away).
 */
export const journeyCopy = {
  eyebrow: "The visit",
  title: "About ten minutes, start to finish.",
  alt: draft(
    "Illustration of one trip through the clinic: from the doctor's room with a requisition, down the hall to the lab chair, then results back to your doctor in about a week and a follow-up 2 to 3 weeks after the test. If something is critical, the clinic is flagged right away.",
  ),
  illustration: draft("Illustration. Your own visit may differ."),
  pause: draft("Pause"),
  play: draft("Play"),
  phaseVisit: draft("At the clinic"),
  phaseAfter: draft("After your visit"),
  clockDone: draft("About ten minutes"),
  minutes: (m: number) => draft(`${m} min`),
  rooms: {
    doctor: draft("Doctor's room"),
    lab: draft("Lab, down the hall"),
    results: draft("Your doctor"),
    followUp: draft("Follow-up"),
  },
  stepLabel: (n: number, total: number) => draft(`Step ${n} of ${total}`),
};

/** "Nervous about needles?" The note is the page's existing wording; the breathing circle is new (draft). */
export const needleCopy = {
  note: "Nervous about needles? Tell the technician. We can have you lie down and take it slowly.",
  start: draft("Try a slow breath"),
  stop: draft("Stop"),
  breatheIn: draft("Breathe in"),
  breatheOut: draft("Breathe out"),
  hint: draft("In for four, out for four. Stop any time."),
};
