import { draft } from "./review";

/*
 * Skin treatments page, extra sections (November 2026): the ladder from gentle to deeper, goal chips, two motion
 * explainers, a series planner, aftercare and who should wait. Downtime and visit counts come from the treatment
 * menu (aesthetics-menu.ts) and the aesthetics ladder (deep.ts). No prices: pricing waits on clinic approval.
 * Every line is draft until the clinic signs it off.
 */

export type SkinGoal = "glow" | "texture" | "scars" | "pores" | "tone";

export type SkinRungItem = {
  id: string;
  name: string;
  brand?: string;
  d: string;
  downtime: string;
  visits: string;
  goals: SkinGoal[];
};

export const skinLadder = {
  eyebrow: draft("From gentle to deeper"),
  title: draft("Four steps, lightest first."),
  lead: draft(
    "Most people start at the top of the ladder. Your nurse suggests the lightest step that fits your skin, and you only step down if you want to.",
  ),
  goalsLabel: draft("Pick your goal"),
  all: draft("Show all"),
  fits: draft("Often considered for this"),
  downtimeLabel: draft("Downtime"),
  visitsLabel: draft("Usual visits"),
  goals: [
    { k: "glow", t: draft("Glow") },
    { k: "texture", t: draft("Texture") },
    { k: "scars", t: draft("Acne scars") },
    { k: "pores", t: draft("Pores") },
    { k: "tone", t: draft("Uneven tone") },
  ] as { k: SkinGoal; t: string }[],
  rungs: [
    {
      n: "1",
      t: draft("Facials"),
      d: draft("No downtime. Back to your day straight after."),
      items: [
        {
          id: "hydrafacial",
          name: draft("HydraFacial"),
          d: draft(
            "Cleanse, exfoliate, extract and hydrate, with a SkinCeuticals home routine.",
          ),
          downtime: draft("None"),
          visits: draft("One visit, or part of a plan"),
          goals: ["glow", "texture", "pores"],
        },
        {
          id: "vamp",
          name: draft("Glass facial"),
          brand: "VAMP",
          d: draft("A PDRN complex micro-infused into the skin."),
          downtime: draft("None"),
          visits: draft("Usually a series of 3"),
          goals: ["glow", "texture", "pores"],
        },
      ],
    },
    {
      n: "2",
      t: draft("Medical peels"),
      d: draft("A day or two of light flaking or redness."),
      items: [
        {
          id: "peel",
          name: draft("Medical peel"),
          brand: "SkinCeuticals",
          d: draft(
            "A customised medical-grade peel, with a home routine to extend it.",
          ),
          downtime: draft("A day or two"),
          visits: draft("Monthly, planned at your consult"),
          goals: ["texture", "tone", "scars"],
        },
      ],
    },
    {
      n: "3",
      t: draft("Microneedling"),
      d: draft("Redness for 1 to 3 days."),
      items: [
        {
          id: "microneedling",
          name: draft("Microneedling"),
          d: draft(
            "Fine needles make tiny channels that prompt your skin's own repair.",
          ),
          downtime: draft("1 to 3 days"),
          visits: draft("3 to 6, every 4 to 6 weeks"),
          goals: ["texture", "scars", "pores"],
        },
      ],
    },
    {
      n: "4",
      t: draft("Regenerative"),
      d: draft(
        "From your own blood, or a peptide complex. Little to a day or two of downtime.",
      ),
      items: [
        {
          id: "exosome",
          name: draft("Exosome facial"),
          brand: "Pluryal",
          d: draft(
            "An exosome and peptide complex, micro-infused for skin renewal.",
          ),
          downtime: draft("None"),
          visits: draft("Usually a series of 3"),
          goals: ["glow", "texture"],
        },
        {
          id: "prp",
          name: draft("PRP"),
          d: draft("Platelet-rich plasma from your own blood, for the face."),
          downtime: draft("A day or two"),
          visits: draft("Usually a series of 3"),
          goals: ["texture", "scars", "glow"],
        },
        {
          id: "prf",
          name: draft("PRF"),
          d: draft(
            "Platelet-rich fibrin from your own blood, released more slowly, for the under-eye area and face.",
          ),
          downtime: draft("A day or two"),
          visits: draft("Planned at your consult"),
          goals: ["texture"],
        },
      ],
    },
  ] as { n: string; t: string; d: string; items: SkinRungItem[] }[],
};

export const hydraExplainer = {
  eyebrow: draft("Inside a HydraFacial"),
  title: draft("What happens in the pore."),
  lead: draft(
    "A HydraFacial works in three passes with one handpiece. Drag the slider to move through it at your own pace.",
  ),
  play: draft("Play"),
  pause: draft("Pause"),
  scrub: draft("Move through the treatment"),
  note: draft("Illustration, not your results."),
  steps: [
    {
      t: draft("Cleanse and peel"),
      d: draft(
        "A gentle swirl of serum loosens the dead cells sitting on the surface, and they lift away.",
      ),
      alt: draft(
        "A swirl of serum over the skin lifts flakes of dead cells off the surface.",
      ),
    },
    {
      t: draft("Extract"),
      d: draft(
        "Light suction draws out the oil and debris blocking the pore, so it empties and looks tighter.",
      ),
      alt: draft(
        "A vortex above an open pore pulls the blocking plug up and out, and the pore narrows.",
      ),
    },
    {
      t: draft("Hydrate"),
      d: draft(
        "Hydrating serums soak in to finish, leaving the surface smoother.",
      ),
      alt: draft(
        "Drops of serum settle into the skin and the surface becomes smooth.",
      ),
    },
  ],
};

export const needleExplainer = {
  eyebrow: draft("Microneedling, up close"),
  title: draft("Tiny channels, your own repair."),
  lead: draft(
    "The needles make fine channels that close within hours. Over the following weeks your skin lays down new collagen. Slide through the weeks, or add PRP to see it go in first.",
  ),
  weeksLabel: draft("Weeks after treatment"),
  week: (n: number) =>
    n === 0
      ? draft("Treatment day")
      : n === 1
        ? draft("1 week")
        : draft(`${n} weeks`),
  prpLabel: draft("Add PRP"),
  play: draft("Play"),
  pause: draft("Pause"),
  note: draft(
    "Illustration, not your results. Your skin and series decide the timing.",
  ),
  stages: [
    {
      at: 0,
      t: draft("Channels open"),
      d: draft("Fine needles make tiny channels in the top layers of skin."),
    },
    {
      at: 0.3,
      t: draft("PRP goes in"),
      d: draft(
        "With PRP, platelets from your own blood are applied while the channels are open.",
      ),
      prp: true,
    },
    {
      at: 1,
      t: draft("Channels close"),
      d: draft("The channels close within hours and repair cells move in."),
    },
    {
      at: 3,
      t: draft("Collagen builds"),
      d: draft(
        "Over the following weeks, new collagen fibres are laid down. This is why visits are spaced 4 to 6 weeks apart.",
      ),
    },
  ] as { at: number; t: string; d: string; prp?: boolean }[],
  alt: (w: number, prp: boolean) =>
    w < 0.6
      ? draft(
          `Treatment day: fine channels open in the skin${prp ? ", and golden platelets flow into them" : ""}.`,
        )
      : w < 2
        ? draft(
            "The channels have closed and repair cells gather where they were.",
          )
        : draft(
            `About ${Math.round(w)} weeks on: new collagen fibres weave across the deeper skin.`,
          ),
};

export type SeriesKind = {
  k: string;
  t: string;
  visits: number[];
  gapWeeks: [number, number];
  note: string;
};

export const seriesPlanner = {
  eyebrow: draft("Plan a series"),
  title: draft("See when your visits would fall."),
  lead: draft(
    "Pick a treatment and a first date. We space the visits the way your nurse usually would, and move any Friday to the Saturday, since the clinic is closed Fridays.",
  ),
  treatmentLabel: draft("Treatment"),
  visitsLabel: draft("Number of visits"),
  dateLabel: draft("First visit"),
  visit: (n: number) => draft(`Visit ${n}`),
  between: (a: string, b: string) => draft(`Between ${a} and ${b}`),
  first: draft("Your first visit"),
  moved: draft("Moved from a Friday"),
  empty: draft("Pick a first date to see the rest of the series."),
  fine: draft(
    "A planning guide, not a booking. Your nurse sets the real plan and dates at your consult.",
  ),
  cta: draft("Book a complimentary consult"),
  reason: (t: string, d: string) =>
    draft(`${t} series, first visit around ${d}`),
  kinds: [
    {
      k: "microneedling",
      t: draft("Microneedling"),
      visits: [3, 4, 5, 6],
      gapWeeks: [4, 6],
      note: draft("Usually 3 to 6 visits, every 4 to 6 weeks."),
    },
    {
      k: "vamp",
      t: draft("Glass facial"),
      visits: [3],
      gapWeeks: [4, 4],
      note: draft("Usually a series of 3, about a month apart."),
    },
    {
      k: "exosome",
      t: draft("Exosome facial"),
      visits: [3],
      gapWeeks: [4, 4],
      note: draft("Usually a series of 3, about a month apart."),
    },
    {
      k: "prp",
      t: draft("PRP for the face"),
      visits: [3],
      gapWeeks: [4, 4],
      note: draft("Usually a series of 3, about a month apart."),
    },
    {
      k: "peel",
      t: draft("Medical peel"),
      visits: [3, 4, 5, 6],
      gapWeeks: [4, 4],
      note: draft("Monthly. How many is planned at your consult."),
    },
  ] as SeriesKind[],
};

export const skinAftercare = {
  eyebrow: draft("After your treatment"),
  title: draft("Small habits that help."),
  lead: draft(
    "Your nurse gives you aftercare for your treatment. These are the habits that apply to most of them.",
  ),
  cards: [
    {
      t: draft("The first day"),
      d: draft(
        "Wash gently with lukewarm water. Skip makeup if your nurse suggests it, and keep your hands off your face.",
      ),
    },
    {
      t: draft("The first few days"),
      d: draft(
        "Hold retinol, acids and scrubs until your skin feels calm. A gentle cleanser and a moisturizer are enough.",
      ),
    },
    {
      t: draft("Sun, every day"),
      d: draft(
        "Treated skin burns more easily. Mineral sunscreen every morning, and a hat when you are out for long.",
      ),
    },
    {
      t: draft("If something feels wrong"),
      d: draft(
        "Blistering, spreading redness or pain that gets worse: call us at 905-709-3222.",
      ),
    },
  ],
  kitTitle: draft("The Recovery kit"),
  kitD: draft(
    "A calming SkinCeuticals routine for the days and weeks after a treatment.",
  ),
  kitLink: draft("See the Recovery kit"),
};

export const skinWait = {
  eyebrow: draft("Who should wait"),
  title: draft("Sometimes the answer is not yet."),
  lead: draft(
    "We would rather move your treatment than rush it. Tell us at your consult if any of these apply.",
  ),
  items: [
    {
      t: draft("Pregnant or breastfeeding"),
      d: draft(
        "Most skin treatments wait until after. We can suggest what is suitable now.",
      ),
    },
    {
      t: draft("An active cold sore"),
      d: draft(
        "Treatment waits until it has healed. If you get them often, tell us beforehand.",
      ),
    },
    {
      t: draft("Recent isotretinoin"),
      d: draft(
        "Microneedling, peels and resurfacing usually wait after isotretinoin (Accutane). Ask how long for your treatment.",
      ),
    },
    {
      t: draft("An infection or open wound"),
      d: draft(
        "Including active, inflamed acne in the area. Acne is treated medically first, in Family Medicine.",
      ),
    },
    {
      t: draft("A fresh sunburn or tan"),
      d: draft(
        "Skin needs to settle first, especially before peels and microneedling.",
      ),
    },
  ],
  link: draft("Book a Family Medicine visit for active acne"),
};
