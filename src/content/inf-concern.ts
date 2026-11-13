import { draft } from "./review";
import { concerns, dripFinder, type Concern } from "./infusion-site";
import { bookFor, routes } from "@/lib/routes";

/*
 * "Where your concern goes first" (By concern page, November 2026). Each concern draws the route it takes through
 * the clinic: clinical concerns start with a doctor and bloodwork, wellness drips start with screening, and being
 * unwell stops at "see a doctor first". Facts only from content already on the site (infusion-site.ts, iron.ts).
 */

export type RouteKind = "clinical" | "wellness" | "program" | "stop";

export type RouteStep = { t: string; d: string; to: string; tag?: string };

/** Where the route sends you: one booking button, and one page to read first if you are not ready. */
export type RouteNext = {
  lead: string;
  cta: string;
  to: string;
  more: { t: string; to: string };
};

export type ConcernRoute = {
  key: string;
  label: string;
  kind: RouteKind;
  steps: RouteStep[];
  next?: RouteNext;
};

const familyVisit = (reason: string) =>
  `${bookFor("family", "concern")}&reason=${encodeURIComponent(reason)}`;

function routeFor(c: Concern, i: number): ConcernRoute {
  const key = `c${i}`;
  if (c.tag === "Clinical" && c.page === "iron") {
    return {
      key,
      label: c.t,
      kind: "clinical",
      steps: [
        {
          t: draft("Iron assessment"),
          d: draft("A short visit with our physician."),
          to: bookFor("infusion", "iron"),
          tag: draft("OHIP-insured"),
        },
        {
          t: draft("Bloodwork on site"),
          d: draft("Ferritin and hemoglobin, drawn down the hall."),
          to: routes.blood,
          tag: draft("OHIP-insured"),
        },
        {
          t: draft("Your plan"),
          d: draft(
            "If your ferritin is low and tablets are not right for you, the physician chooses the iron and dose.",
          ),
          to: routes.iron,
        },
        {
          t: draft("Iron therapy"),
          d: draft("Usually 3 visits, about 3 hours each."),
          to: routes.iron,
        },
      ],
      next: {
        lead: draft("Your first step is an iron assessment with our physician."),
        cta: draft("Book an iron assessment"),
        to: bookFor("infusion", "iron"),
        more: { t: draft("Read about iron therapy"), to: routes.iron },
      },
    };
  }
  if (c.tag === "Clinical") {
    return {
      key,
      label: c.t,
      kind: "clinical",
      steps: [
        {
          t: draft("A family doctor visit"),
          d: draft("Tiredness has many causes, so a doctor looks first."),
          to: familyVisit("Low energy"),
          tag: draft("OHIP-insured"),
        },
        {
          t: draft("Bloodwork on site"),
          d: draft("Iron, thyroid, B12 and sugars, drawn down the hall."),
          to: routes.blood,
          tag: draft("OHIP-insured"),
        },
        {
          t: draft("Results, explained"),
          d: draft(
            "Most people need no treatment beyond a plan with their doctor.",
          ),
          to: routes.labs,
        },
        {
          t: draft("Treatment, only if it fits"),
          d: draft(
            "For low iron, usually tablets first. Iron therapy or a drip only if your results show it.",
          ),
          to: routes.iron,
        },
      ],
      next: {
        lead: draft("Your first step is a family doctor visit. It is OHIP-insured."),
        cta: draft("Book a family doctor visit"),
        to: familyVisit("Low energy"),
        more: { t: draft("Read about bloodwork"), to: routes.blood },
      },
    };
  }
  if (c.tag === "Program") {
    return {
      key,
      label: c.t,
      kind: "program",
      steps: [
        {
          t: draft("Screening with a physician"),
          d: draft("Your health, medications and goals, before anything else."),
          to: routes.metabolic,
        },
        {
          t: draft("A plan you agree on"),
          d: draft("Physician-supervised, with real screening."),
          to: routes.metabolic,
        },
        {
          t: draft("Regular follow-up"),
          d: draft("Check-ins with the team. No miracles, and we say so."),
          to: routes.metabolic,
        },
      ],
      next: {
        lead: draft("Your first step is a consult, with screening by our physician."),
        cta: draft("Book a metabolic consult"),
        to: bookFor("infusion", "consult"),
        more: { t: draft("Read about the metabolic program"), to: routes.metabolic },
      },
    };
  }
  return {
    key,
    label: c.t,
    kind: "wellness",
    steps: [
      {
        t: draft("Screening with your nurse"),
        d: draft("About 10 minutes: health history, vitals and any questions."),
        to: bookFor("infusion", "consult"),
      },
      {
        t: draft("Physician-reviewed"),
        d: draft(
          "Every treatment is reviewed by our physician. We adjust or decline on clinical grounds.",
        ),
        to: routes.infusionHow,
      },
      {
        t: draft("Mixed for you"),
        d: draft(
          "Your drip is mixed at your appointment, after screening. Never made ahead.",
        ),
        to: routes.drips,
      },
      { t: c.t, d: c.d, to: c.page, tag: draft("About 45 minutes") },
    ],
    next: {
      lead: draft("Your first step is a consult. Screening comes first, and you decide after."),
      cta: draft("Book a drip consult"),
      to: bookFor("infusion", "consult"),
      more: { t: draft("Compare these drips"), to: c.page },
    },
  };
}

export const concernRoutes: ConcernRoute[] = [
  ...concerns.map(routeFor),
  {
    key: "unwell",
    label: draft("I am unwell, being sick or pregnant"),
    kind: "stop",
    steps: [
      {
        t: dripFinder.unwellTitle,
        d: dripFinder.unwellP,
        to: familyVisit("Unwell"),
      },
    ],
  },
];

export const concernPathCopy = {
  eyebrow: draft("Where your concern goes first"),
  title: draft("Pick what brings you in."),
  lead: draft(
    "Each concern takes its own route through the clinic. Clinical concerns start with a doctor and bloodwork. Wellness drips start with screening. Your first step is under the route.",
  ),
  pickLabel: draft("What brings you in?"),
  routeLabel: (label: string) => draft(`The route for ${label}`),
  stepOf: (n: number, total: number) => draft(`Step ${n} of ${total}`),
  kinds: {
    clinical: draft("Clinical, starts with a doctor"),
    wellness: draft("Wellness, starts with screening"),
    program: draft("Physician-supervised program"),
    stop: draft("Stop here first"),
  } as Record<RouteKind, string>,
  pause: draft("Pause"),
  play: draft("Play"),
  nextEyebrow: draft("Your next step"),
  illustration: draft(
    "Illustration of the usual route. Your doctor or nurse may suggest another, or nothing at all.",
  ),
  bookFamily: draft("Book a family medicine visit"),
  call: draft("Call 905-709-3222"),
  emergency: draft("In an emergency, call 911."),
};
