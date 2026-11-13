import { draft } from "./review";
import type { QA } from "./types";
import { bookFor, routes } from "@/lib/routes";

/**
 * Men's aesthetics (Nov 2026): the concerns men bring in, in their own words, each with the usual options,
 * downtime and where to read more. Downtime words follow the treatment menu (none, a day or two, a few days);
 * the consult confirms the plan. Education only: no outcome claims.
 */

/** Area of the drawing the concern points at. */
export type MenArea =
  | "forehead"
  | "eyes"
  | "scalp"
  | "jaw"
  | "cheeks"
  | "beard"
  | "scars"
  | "masseter"
  | "underarm";

export type MenConcern = {
  k: MenArea;
  /** In men's own words. */
  t: string;
  /** What the drawing shows, for screen readers. */
  alt: string;
  d: string;
  options: { t: string; d: string }[];
  downtime: string;
  /** Where to read more. */
  more: { t: string; page: string };
  /** A first step outside aesthetics, when the cause may be medical. */
  first?: { t: string; page: string };
  /** Copy the clinic still has to confirm. */
  pending?: boolean;
};

export const menCopy = {
  eyebrow: draft("Men’s aesthetics"),
  title: draft("Pick what’s bothering you."),
  lead: draft(
    "The things men most often ask us about. Tap one to see the usual options and how much time off they take. Your consult confirms what fits, which may be nothing at all.",
  ),
  chipsLabel: draft("Concerns"),
  idle: draft("Tap a concern to see the usual options."),
  idleSub: draft(
    "A consult with our nurse is complimentary, and a physician joins when your concern needs one.",
  ),
  optionsLabel: draft("Usual options"),
  downtimeLabel: draft("Time off"),
  book: draft("Book a consult"),
  bookTo: bookFor("aesthetics", "consult"),
  illustration: draft("Illustration"),
  pause: draft("Pause"),
  play: draft("Play"),
  figure: draft(
    "Line drawing of a man’s head and shoulders that turns slowly. Choosing a concern turns the drawing toward that area and highlights it.",
  ),
  firstLabel: draft("Start here"),
};

export const menConcerns: MenConcern[] = [
  {
    k: "forehead",
    t: draft("Forehead and frown lines"),
    alt: draft("The forehead and the area between the brows are highlighted."),
    d: draft(
      "Lines that stay when your face is at rest, or the frown line between the brows.",
    ),
    options: [
      {
        t: draft("Neuromodulator"),
        d: draft(
          "Relaxes the muscles that fold the skin. Men often need a higher dose, because the muscles are stronger.",
        ),
      },
    ],
    downtime: draft("None. Most people go back to work the same day."),
    more: { t: draft("About injectables"), page: routes.aesInjectables },
  },
  {
    k: "eyes",
    t: draft("Tired eyes and dark circles"),
    alt: draft("The area under the eyes is highlighted."),
    d: draft(
      "Hollows or shadows under the eyes that make you look more tired than you feel.",
    ),
    options: [
      {
        t: draft("PRF"),
        d: draft(
          "Made from a small sample of your own blood, for the under-eye area.",
        ),
      },
      {
        t: draft("Filler"),
        d: draft(
          "A small amount of hyaluronic acid filler, when the hollow is about volume.",
        ),
      },
      {
        t: draft("Skincare"),
        d: draft("A simple routine, often the place to start."),
      },
    ],
    downtime: draft("A day or two of possible swelling or bruising."),
    more: { t: draft("About skin treatments"), page: routes.aesSkin },
    first: {
      t: draft(
        "Always tired? See your family doctor first: sleep, iron and thyroid can all show under the eyes.",
      ),
      page: bookFor("family", "concern"),
    },
  },
  {
    k: "scalp",
    t: draft("Thinning hair"),
    alt: draft("The top of the head is highlighted."),
    d: draft("Hair thinning at the crown or the hairline."),
    options: [
      {
        t: draft("PRP for the scalp"),
        d: draft(
          "Platelet-rich plasma from your own blood, as a series of visits.",
        ),
      },
    ],
    downtime: draft("None to a day. The scalp can feel tender for a day."),
    more: { t: draft("About skin treatments"), page: routes.aesSkin },
    first: {
      t: draft(
        "Start with a Family Medicine visit to rule out medical causes, such as thyroid or iron.",
      ),
      page: bookFor("family", "concern"),
    },
  },
  {
    // Clinic to confirm: Radiesse wording and who injects it are still waiting for approval.
    k: "jaw",
    t: draft("Jawline and chin definition"),
    alt: draft("The jawline and chin are highlighted."),
    d: draft("A softer jawline or a chin that sits back from the profile."),
    options: [
      {
        t: draft("Dermal filler"),
        d: draft(
          "Hyaluronic acid filler placed along the jaw or chin, planned conservatively.",
        ),
      },
      {
        t: draft("Biostimulator"),
        d: draft(
          "Asked about at your consult, where the physician explains if it fits.",
        ),
      },
    ],
    downtime: draft("A day or two of possible swelling or bruising."),
    more: { t: draft("About injectables"), page: routes.aesInjectables },
    pending: true,
  },
  {
    k: "cheeks",
    t: draft("Sun damage and spots"),
    alt: draft("Both cheeks are highlighted."),
    d: draft("Brown spots and uneven colour from years outdoors."),
    options: [
      { t: draft("PicoSure"), d: draft("A picosecond laser for pigment.") },
      {
        t: draft("Medical peel"),
        d: draft("A SkinCeuticals peel, chosen for your skin."),
      },
    ],
    downtime: draft("A day or two of redness."),
    more: { t: draft("About laser"), page: routes.aesLaser },
  },
  {
    k: "beard",
    t: draft("Redness and razor bumps"),
    alt: draft("The beard area on the cheeks and neck is highlighted."),
    d: draft(
      "Flushed cheeks, broken vessels, or bumps and irritation where you shave.",
    ),
    options: [
      {
        t: draft("Clarity II"),
        d: draft(
          "A dual-wavelength laser for redness and vessels, and for hair removal.",
        ),
      },
      {
        t: draft("Skincare"),
        d: draft("A calming routine for skin that reacts to shaving."),
      },
    ],
    downtime: draft("None to a day of mild redness."),
    more: { t: draft("About laser"), page: routes.aesLaser },
  },
  {
    k: "scars",
    t: draft("Acne scars"),
    alt: draft("The cheeks, where acne scars often sit, are highlighted."),
    d: draft("Pitted or uneven skin left after acne."),
    options: [
      {
        t: draft("Microneedling"),
        d: draft("A short series of visits for texture."),
      },
      {
        t: draft("eCO₂"),
        d: draft("A fractional CO₂ laser, for deeper texture."),
      },
    ],
    downtime: draft("A day or two for microneedling. A few days for eCO₂."),
    more: { t: draft("About skin treatments"), page: routes.aesSkin },
  },
  {
    k: "masseter",
    t: draft("Jaw clenching"),
    alt: draft(
      "The jaw muscles at the sides of the face are highlighted and gently pulse.",
    ),
    d: draft("A clenching or grinding habit and a heavy, square jaw muscle."),
    options: [
      {
        t: draft("Neuromodulator for the masseter"),
        d: draft(
          "Placed in the jaw muscle on each side. A larger area, so the dose is set at your consult.",
        ),
      },
    ],
    downtime: draft("None. Avoid chewing gum and tough food that day."),
    more: { t: draft("About injectables"), page: routes.aesInjectables },
  },
  {
    k: "underarm",
    t: draft("Sweating through shirts"),
    alt: draft("The underarms are highlighted."),
    d: draft("Underarm sweating that stays heavy whatever you use."),
    options: [
      {
        t: draft("Neuromodulator for underarm sweating"),
        d: draft("Small injections across the underarm skin."),
      },
    ],
    downtime: draft("None. Back to your day straight away."),
    more: { t: draft("About injectables"), page: routes.aesInjectables },
  },
];

/** A busy week (Monday treatment unless the treatment needs a few days, then planned before a weekend). */
export type DayState = "visit" | "visible" | "clear";
export const menWeek = {
  eyebrow: draft("Planning around work"),
  title: draft("How a treatment fits a busy week."),
  lead: draft(
    "A guide only. Everyone heals differently, and your nurse tells you what to plan for.",
  ),
  days: [
    draft("Mon"),
    draft("Tue"),
    draft("Wed"),
    draft("Thu"),
    draft("Fri"),
    draft("Sat"),
    draft("Sun"),
  ],
  legend: {
    visit: draft("Treatment"),
    visible: draft("May show"),
    clear: draft("Usual day"),
  },
  rows: [
    {
      t: draft("Neuromodulator"),
      note: draft("Back to work the same day."),
      days: [
        "visit",
        "clear",
        "clear",
        "clear",
        "clear",
        "clear",
        "clear",
      ] as DayState[],
    },
    {
      t: draft("Filler"),
      note: draft("Possible swelling or bruising for a day or two."),
      days: [
        "visit",
        "visible",
        "visible",
        "clear",
        "clear",
        "clear",
        "clear",
      ] as DayState[],
    },
    {
      t: draft("PicoSure"),
      note: draft("Some redness for a day or two."),
      days: [
        "visit",
        "visible",
        "clear",
        "clear",
        "clear",
        "clear",
        "clear",
      ] as DayState[],
    },
    {
      t: draft("Microneedling"),
      note: draft("Pink, like mild sunburn, for a day or two."),
      days: [
        "visit",
        "visible",
        "visible",
        "clear",
        "clear",
        "clear",
        "clear",
      ] as DayState[],
    },
    {
      t: draft("eCO₂"),
      note: draft(
        "Plan around a few days. A Thursday visit lets the weekend cover some of them.",
      ),
      days: [
        "clear",
        "clear",
        "clear",
        "visit",
        "visible",
        "visible",
        "visible",
      ] as DayState[],
    },
  ],
};

/** A no-fuss routine: three SkinCeuticals products (ids in skincare.ts), suggested retail. */
export const menRoutine = {
  eyebrow: draft("Three products, two minutes"),
  title: draft("A routine that doesn’t take over your bathroom."),
  lead: draft(
    "Wash, protect, done. Your nurse can swap any of these for your skin.",
  ),
  items: [
    {
      id: "simply-clean",
      when: draft("Morning and night"),
      role: draft("Washes off oil, sweat and sunscreen."),
    },
    {
      id: "phloretin-cf",
      when: draft("Morning"),
      role: draft("Vitamin C serum. A few drops after you wash or shave."),
    },
    {
      id: "sheer-physical",
      when: draft("Morning, last step"),
      role: draft("Mineral SPF 50 with a matte finish, no white shine."),
    },
  ],
  total: draft("Total, HST extra"),
  note: draft("Suggested retail prices. Ask at any visit."),
  more: { t: draft("See all the skincare we carry"), page: routes.aesSkincare },
};

export const menFaq: QA[] = [
  {
    q: draft("Will people notice?"),
    a: draft(
      "We plan conservatively and start small. You stay in control of how far to go, and neuromodulator and filler are reviewed at two weeks.",
    ),
  },
  {
    q: draft("Can I go back to work?"),
    a: draft(
      "For most treatments, yes, the same day. Some, such as eCO₂ or plasma, need a few days, so your nurse helps you plan them around your week.",
    ),
  },
  {
    q: draft("Is it covered?"),
    a: draft(
      "No. Medical aesthetics is elective and not covered by OHIP. Your price is given in writing at a complimentary consult, before you decide.",
    ),
  },
  {
    q: draft("Do men need a different dose?"),
    a: draft(
      "Often a little more, because the muscles are stronger. The dose is set at your consult.",
    ),
  },
];
export const menFaqTitle = draft("What men usually ask.");
