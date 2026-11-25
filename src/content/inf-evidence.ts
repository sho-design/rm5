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
  | "Antioxidant and coenzyme"
  | "Amino acids";

export const kindColor: Record<IngredientKind, string> = {
  Vitamins: "#F5C451",
  Minerals: "#B9C4CF",
  "Fluids and electrolytes": "#9BD0E0",
  "Antioxidant and coenzyme": "#F0955C",
  "Amino acids": "#6FB4E8",
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
  { k: "vitamin-a", t: draft("Vitamin A"), kind: "Vitamins", d: draft("A fat-soluble vitamin.") },
  {
    k: "b-complex",
    t: "B-Complex",
    kind: "Vitamins",
    d: draft("Several B vitamins."),
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
    d: draft("A water-soluble vitamin. Your dose is listed at your consult."),
  },
  {
    k: "vitamin-d",
    t: draft("Vitamin D"),
    kind: "Vitamins",
    d: shotD("Vitamin D") ?? draft("A fat-soluble vitamin"),
    shot: true,
  },
  { k: "vitamin-e", t: draft("Vitamin E"), kind: "Vitamins", d: draft("A fat-soluble vitamin.") },
  {
    k: "biotin",
    t: "Biotin",
    kind: "Vitamins",
    d: draft("A B vitamin."),
    note: draft("Tell us before any blood test, as biotin can affect some results."),
  },
  {
    k: "magnesium",
    t: draft("Magnesium"),
    kind: "Minerals",
    d: draft("A mineral."),
    addOn: true,
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
    k: "carnitine",
    t: "L-Carnitine",
    kind: "Amino acids",
    d: shotD("L-Carnitine") ?? draft("A nutrient made from amino acids"),
    shot: true,
  },
];

/**
 * What is in each drip, by ingredient key, only where the site already says so (a drip's name or its page copy).
 * Drips whose blend is confirmed at the consult have none here and say so. Ingredient names in a drip's own
 * `detail.inside` (infusion-site.ts) are matched too, so fuller drip pages fill this in on their own.
 */
const knownInside: Record<string, string[]> = {
  hydration: ["fluids"],
  myers: ["vitamin-c", "b-complex", "fluids"],
  antioxidant: ["glutathione", "fluids"],
  biotin: ["biotin", "fluids"],
  multivitamin: ["vitamin-a", "b-complex", "vitamin-c", "vitamin-d", "vitamin-e", "fluids"],
  nad: ["nad", "fluids"],
};
/** Physician-ordered add-ons a drip's page already names. */
const knownAddOns: Record<string, string[]> = {
  myers: ["magnesium", "glutathione"],
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
