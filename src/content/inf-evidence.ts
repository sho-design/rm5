import { draft } from "./review";
import {
  dripFamilies,
  shotInfo,
  shots,
  signatureDrips,
  type Drip,
  type DripFamily,
} from "./infusion-site";

/*
 * "What is in the bag", on the honest menu (November 2026). Every drip and ingredient, sorted by what it is,
 * with what we can say in plain words, taken from copy already on the site. It never rates how well anything
 * works.
 *
 * Evidence labels (Established, Supported, Emerging) stay hidden while `showEvidenceLabels` is false in
 * infusion-site.ts: reviewers read them as efficacy ratings, and the clinic decided a physician must define each
 * one in writing first. The "By evidence label" view below appears only once that flag is turned on, and its
 * level definitions are drafts for that physician to replace.
 */

/** What each ingredient is, in plain words. Neutral descriptions only: no benefits. */
export type IngredientKind =
  | "Vitamins"
  | "Minerals"
  | "Fluids and electrolytes"
  | "Amino acids"
  | "Antioxidant and coenzyme"
  | "Program add-ons";

export const kindColor: Record<IngredientKind, string> = {
  Vitamins: "#F5C451",
  Minerals: "#B9C4CF",
  "Fluids and electrolytes": "#9BD0E0",
  "Amino acids": "#7FC8A9",
  "Antioxidant and coenzyme": "#F0955C",
  "Program add-ons": "#6FB4E8",
};

export type Ingredient = {
  k: string;
  t: string;
  kind: IngredientKind;
  /** What it is (neutral). */
  d: string;
  /** Also offered as a quick shot at the Injection Bar. */
  shot?: boolean;
  /** Only added on a physician's order, after screening. */
  addOn?: boolean;
  note?: string;
};

const shotNote = (name: string) => shotInfo[name]?.note;
const shotD = (name: string) => shots.find((s) => s.t === name)?.d;

export const ingredientList: Ingredient[] = [
  {
    k: "b-complex",
    t: "B-Complex",
    kind: "Vitamins",
    d: shotD("B-Complex") ?? draft("Several B vitamins"),
    shot: true,
  },
  {
    k: "b12",
    t: "B12",
    kind: "Vitamins",
    d: shotD("B12") ?? draft("A B vitamin"),
    shot: true,
  },
  {
    k: "vitamin-c",
    t: draft("Vitamin C"),
    kind: "Vitamins",
    d: draft("A vitamin. Your dose is listed at your consult."),
    shot: true,
  },
  {
    k: "vitamin-d",
    t: draft("Vitamin D"),
    kind: "Vitamins",
    d: shotD("Vitamin D") ?? draft("A fat-soluble vitamin"),
    shot: true,
  },
  {
    k: "biotin",
    t: "Biotin",
    kind: "Vitamins",
    d: shotD("Biotin") ?? draft("A B vitamin"),
    shot: true,
    note: shotNote("Biotin"),
  },
  {
    k: "magnesium",
    t: draft("Magnesium"),
    kind: "Minerals",
    d: draft("A mineral."),
  },
  {
    k: "calcium",
    t: draft("Calcium"),
    kind: "Minerals",
    d: draft("A mineral."),
  },
  {
    k: "zinc",
    t: draft("Zinc"),
    kind: "Minerals",
    d: draft("A mineral."),
    shot: true,
  },
  {
    k: "fluids",
    t: draft("Fluids and electrolytes"),
    kind: "Fluids and electrolytes",
    d: draft(
      "Sterile fluid with salts such as sodium and potassium, the base of most drips.",
    ),
  },
  {
    k: "amino",
    t: draft("Amino blend"),
    kind: "Amino acids",
    d: shotD("Amino blend") ?? draft("Amino acids"),
    shot: true,
  },
  {
    k: "glutathione",
    t: "Glutathione",
    kind: "Antioxidant and coenzyme",
    d: shotD("Glutathione") ?? draft("An antioxidant"),
    shot: true,
    addOn: true,
  },
  {
    k: "nad",
    t: "NAD+",
    kind: "Antioxidant and coenzyme",
    d: draft("A coenzyme found in every cell."),
    shot: true,
    note: shotNote("NAD+"),
  },
  {
    k: "mic",
    t: draft("MIC blend"),
    kind: "Program add-ons",
    d: draft("A program add-on."),
    shot: true,
    note: shotNote("MIC blend"),
  },
  {
    k: "carnitine",
    t: "L-Carnitine",
    kind: "Program add-ons",
    d: draft("A program add-on."),
    shot: true,
    note: shotNote("L-Carnitine"),
  },
];

/**
 * What is in each drip, by ingredient key, only where the site already says so (a drip's name or its page copy).
 * Drips whose blend is confirmed at the consult have none here and say so. Ingredient names in a drip's own
 * `detail.inside` (infusion-site.ts) are matched too, so fuller drip pages fill this in on their own.
 */
const knownInside: Record<string, string[]> = {
  myers: ["b-complex", "vitamin-c", "magnesium", "calcium", "b12", "fluids"],
  "vitamin-c-zinc": ["vitamin-c", "zinc", "b-complex", "fluids"],
  biotin: ["biotin", "fluids"],
  "after-exercise": ["fluids", "amino"],
  hydration: ["fluids"],
  nad: ["nad", "fluids"],
};
/** Physician-ordered add-ons a drip's page already names. */
const knownAddOns: Record<string, string[]> = {
  myers: ["glutathione", "zinc", "amino"],
};

const byName = (name: string) => {
  const n = name.toLowerCase();
  return ingredientList.find((i) => n.startsWith(i.t.toLowerCase()));
};

export function insideOf(d: Drip): string[] {
  const fromDetail = (d.detail?.inside ?? [])
    .map((x) => byName(x)?.k)
    .filter((x): x is string => Boolean(x));
  return [...new Set([...(knownInside[d.slug] ?? []), ...fromDetail])];
}
export const addOnsOf = (d: Drip): string[] => knownAddOns[d.slug] ?? [];
export const dripsWith = (k: string) =>
  signatureDrips.filter((d) => insideOf(d).includes(k));

export const familyOrder = (Object.keys(dripFamilies) as DripFamily[]).filter(
  (f) => signatureDrips.some((d) => d.f === f),
);
export const kindOrder = Object.keys(kindColor) as IngredientKind[];

export const evidenceCopy = {
  eyebrow: draft("Know what is in the bag"),
  title: draft("Every drip, sorted by what is in it."),
  lead: draft(
    "Tap a drip to see its ingredients, or switch to ingredients to see which drips and shots use each one. Where a blend is set at your consult, we say so instead of guessing.",
  ),
  modesLabel: draft("Sort by"),
  modes: {
    drips: draft("Drips"),
    ingredients: draft("Ingredients"),
    evidence: draft("Evidence label"),
  },
  tap: draft("Tap any item for the details."),
  inside: draft("What is inside"),
  insideUnknown: draft(
    "The blend is confirmed with you at your consult, after screening. Ask at your consult.",
  ),
  addOns: draft("Added only on a physician's order"),
  foundIn: draft("Found in"),
  foundInNone: draft("Not in a drip on the menu. Ask at your consult."),
  injectionBar: draft("The Injection Bar, as a quick shot"),
  programOnly: draft("Only inside our physician-supervised program"),
  seeDrip: draft("See the drip"),
  seeShots: draft("See the shots"),
  close: draft("Close"),
  ingredientsLink: draft("Read the ingredient library"),
  note: draft(
    "A guide to what is in each drip, not medical advice. Your nurse confirms the ingredients and doses with you after screening, and we may suggest something else, or nothing at all.",
  ),
  // Shown only with the evidence view, once a physician has defined each level in writing. Drafts for them.
  levels: {
    Established: draft(
      "Physician to define in writing before this view is shown.",
    ),
    Supported: draft(
      "Physician to define in writing before this view is shown.",
    ),
    Emerging: draft("The evidence is still developing, and we say so."),
  } as Record<"Established" | "Supported" | "Emerging", string>,
};
