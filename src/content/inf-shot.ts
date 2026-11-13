import { draft } from "./review";
import { dripVisit, shotBar } from "./infusion-site";

/*
 * "Shot or drip, side by side" (Injection Bar page, November 2026). Two drawings with clocks that run together:
 * a quick shot into the upper-arm muscle and a drip into a vein. Facts only from infusion-site.ts (shotBar,
 * dripVisit, dripBrowserCopy.shotsLead). No benefit claims.
 */

const [shot, drip] = shotBar.vs;

export const shotDripCopy = {
  eyebrow: draft("Side by side"),
  title: draft("Shot or drip, side by side."),
  lead: draft(
    "Both start with screening. A shot is one quick injection into a muscle. A drip runs slowly into a vein while you sit.",
  ),
  pause: draft("Pause"),
  play: draft("Play"),
  illustration: draft(
    "Illustration, not to scale. The clocks run faster than real time.",
  ),
  minLeft: (n: number) => draft(`About ${n} min`),
  done: draft("Done"),
  shot: {
    t: shot.t,
    time: shot.big,
    alt: draft(
      "Illustration: a short needle goes through the skin into the muscle of the upper arm. A clock beside it shows about 10 minutes.",
    ),
    skin: draft("Skin"),
    fat: draft("Fat"),
    muscle: draft("Muscle"),
    where: draft("Into a muscle"),
  },
  drip: {
    t: drip.t,
    time: drip.big,
    alt: draft(
      "Illustration: a bag of fluid drips slowly through a thin line into a vein in the forearm. A clock beside it shows about 45 minutes.",
    ),
    bag: draft("Fluid bag"),
    vein: draft("Vein"),
    where: draft("Into a vein"),
  },
  compareTitle: draft("How they compare"),
  rows: [
    {
      k: draft("Time"),
      shot: shot.big,
      drip: draft(
        "About 45 minutes in the chair, about an hour start to finish",
      ),
    },
    {
      k: draft("Where it goes"),
      shot: shotBar.visit[1].d,
      drip: draft("Into a vein, through a small IV"),
    },
    { k: draft("What is in it"), shot: shot.d, drip: drip.d },
    {
      k: draft("Screening first"),
      shot: draft("Yes, a few questions with your nurse"),
      drip: draft("Yes, about 10 minutes with your nurse"),
    },
    {
      k: draft("Preparation"),
      shot: draft("Your nurse confirms the dose with you"),
      drip: dripVisit.parts[1].d,
    },
    { k: draft("After"), shot: shotBar.visit[2].d, drip: dripVisit.parts[3].d },
  ],
  shotHead: shot.t,
  dripHead: drip.t,
  shotsLink: draft("See the shots"),
  dripsLink: draft("See the drips"),
};
