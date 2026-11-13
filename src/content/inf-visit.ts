import { draft } from "./review";
import { dripVisit, whyPhysicianLed } from "./infusion-site";

/*
 * "Your visit, minute by minute" on How it works (November 2026). The four timed parts come from dripVisit in
 * infusion-site.ts, so the visit is described once; check-in and "who you meet" are new and draft.
 * Who you meet uses only what the site already says: a registered nurse places and monitors the infusion, and
 * our physician reviews every treatment.
 */

export type VisitStep = {
  k: "checkin" | "screen" | "mix" | "drip" | "home";
  t: string;
  d: string;
  when: string;
  who: string;
};

const [screen, mix, drip, home] = dripVisit.parts;
const rn = whyPhysicianLed.find((w) => w.t === "RN administration");
const md = whyPhysicianLed.find((w) => w.t === "Physician oversight");

export const visitStory = {
  eyebrow: draft("Your visit, minute by minute"),
  title: dripVisit.title,
  lead: draft(
    "Scroll through a drip visit at our Thornhill clinic, from the front desk to the door.",
  ),
  illustration: draft("Illustration"),
  pause: draft("Pause"),
  play: draft("Play"),
  progress: draft("How far through the visit"),
  whoLabel: draft("With"),
  whenLabel: draft("Time"),
  whoTitle: draft("Who looks after you"),
  who: [
    { t: draft("A registered nurse"), d: rn?.d ?? "" },
    { t: draft("Our physician"), d: md?.d ?? "" },
  ],
  steps: [
    {
      k: "checkin",
      t: draft("Check in"),
      d: draft(
        "Say hello at the front desk. Tell us about any change to your health or your medications since you booked.",
      ),
      when: draft("A few minutes"),
      who: draft("Our front desk"),
    },
    {
      k: "screen",
      t: screen.t,
      d: screen.d,
      when: draft("About 10 minutes"),
      who: draft("Your nurse"),
    },
    {
      k: "mix",
      t: mix.t,
      d: mix.d,
      when: draft("A few minutes"),
      who: draft("Your nurse, on a plan our physician reviews"),
    },
    {
      k: "drip",
      t: drip.t,
      d: drip.d,
      when: draft("About 45 minutes"),
      who: draft("Your nurse, close by"),
    },
    {
      k: "home",
      t: home.t,
      d: home.d,
      when: draft("A few minutes"),
      who: draft("Your nurse"),
    },
  ] as VisitStep[],
  /** What the picture shows at each step, for screen readers. */
  figure: {
    checkin: draft(
      "Illustration: the front desk, with a tablet showing your check-in and a tick.",
    ),
    screen: draft(
      "Illustration: a blood pressure cuff, a heartbeat line and a short health checklist being ticked.",
    ),
    mix: draft(
      "Illustration: an empty drip bag filling from small vials, labelled mixed now.",
    ),
    drip: draft(
      "Illustration: a lounge chair beside a drip stand, drops falling in the drip chamber and a 45 minute timer.",
    ),
    home: draft(
      "Illustration: a small bandage, a tick and an open door with daylight.",
    ),
  } as Record<VisitStep["k"], string>,
  labels: { mixedNow: draft("Mixed now"), minutes: draft("min") },
};
