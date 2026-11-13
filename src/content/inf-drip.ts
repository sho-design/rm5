import { draft } from "./review";
import type { Drip } from "./infusion-site";

/*
 * "Inside your drip" explainer and the per-drip page extras (November 2026). Ingredients shown are only those the
 * menu already states (dripInside in infusion-site.ts); anything else reads "Confirmed at your consult".
 * No benefit or outcome claims; never "Health Canada approved".
 */

export const dripInsideCopy = {
  eyebrow: draft("Inside your drip"),
  title: draft("Mixed for you, then into your arm."),
  lead: draft(
    "Pick a drip to see what goes into the bag, how it reaches you and how long it takes. Your nurse screens you first and confirms every ingredient and dose with you.",
  ),
  pickLabel: draft("Pick a drip"),
  pause: draft("Pause"),
  play: draft("Play"),
  note: draft("Illustration. Your nurse confirms what goes into your drip."),
  consult: draft("Confirmed at your consult"),
  stamp: draft("Mixed at your appointment, after screening"),
  timer: draft("About 45 minutes"),
  inArm: draft("Into a vein in your arm"),
  steps: [
    {
      t: draft("Screened first"),
      d: draft(
        "Your nurse checks your health history and vitals, and talks through what goes in.",
      ),
    },
    {
      t: draft("Mixed for you"),
      d: draft(
        "Each ingredient goes into the bag at your appointment, never made ahead.",
      ),
    },
    {
      t: draft("Into a vein"),
      d: draft(
        "A small IV in your arm. The drip runs in slowly, drop by drop.",
      ),
    },
    {
      t: draft("About 45 minutes"),
      d: draft(
        "Sit back in a lounge chair. Read, work or rest while your nurse checks in.",
      ),
    },
  ],
  figure: (drip: string, step: string, items: string) =>
    draft(`${drip}. ${step}. In the bag: ${items}.`),
};

/** Search title and description for a drip's own page. */
export const dripSeo = (d: Drip) => ({
  title: draft(`${d.t.replace(/ drip$/i, "")} IV drip in Thornhill`),
  description: draft(
    `${d.d} About 45 minutes, screened first, mixed at your appointment and given by a registered nurse at Restoration Medical in Thornhill.`,
  ),
});

/** Questions on each drip page, answered from facts the clinic already states. */
export function dripFaq(d: Drip) {
  const list = [
    { q: draft(`What is in the ${d.t.replace(/ drip$/i, "")} drip?`), a: d.d },
    {
      q: draft("How long does it take?"),
      a: draft(
        "About 45 minutes in the chair, plus about 10 minutes of screening with your nurse first.",
      ),
    },
    {
      q: draft("Is it mixed ahead of time?"),
      a: draft(
        "No. Every drip is mixed at your appointment, after screening, never premixed or made in advance.",
      ),
    },
    {
      q: draft("Who gives it?"),
      a: draft(
        "A registered nurse places and monitors your IV. Every treatment is reviewed by our physician.",
      ),
    },
    {
      q: draft("Is it covered by OHIP?"),
      a: draft(
        "No. Wellness infusions are elective and not covered by OHIP. Itemized costs are shared at your consult.",
      ),
    },
    {
      q: draft("Can anyone have one?"),
      a: draft(
        "Not always. We screen first and may adjust or decline a drip on clinical grounds. If you are being sick, cannot keep fluids down or are pregnant, please see a doctor first.",
      ),
    },
  ];
  if (d.slug === "biotin")
    list.splice(1, 0, {
      q: draft("Does biotin affect blood tests?"),
      a: draft(
        "It can. Tell us, and the lab, before any blood test, as biotin can affect some results.",
      ),
    });
  if (d.slug === "nad")
    list.splice(1, 0, {
      q: draft("What does the evidence say?"),
      a: draft(
        "The evidence for NAD+ drips is still developing, and we say so. Your physician talks it through with you at your consult.",
      ),
    });
  return list;
}
