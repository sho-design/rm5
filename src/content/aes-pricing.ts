import { deepDives } from "./deep";
import { faqItems } from "./faq";

/*
 * Aesthetics pricing, as a section on the treatment menu (consolidation, Nov 2026; it was its own page). Same words as
 * the old page: its title and lead come from the aesthetics "Prices before you decide" card, its questions from the
 * site FAQ and the aesthetics deep dive.
 */
const A = deepDives.aesthetics;
const benefit = A.benefits.find((b) => b.t === "Prices before you decide");
const site = (q: string) => faqItems.find((f) => f.q === q);
const deep = (q: string) => A.faq.find((f) => f.q === q);

export const aesPricing = {
  title: benefit?.t ?? "",
  lead: benefit?.d ?? "",
  faq: [
    site("How is pricing set?"),
    deep("How much does it cost?"),
    deep("Is a consult free?"),
    deep("Is any of this covered by OHIP?"),
  ]
    .filter((f): f is NonNullable<typeof f> => Boolean(f))
    .map((f) => ({ q: f.q, a: f.a })),
};
