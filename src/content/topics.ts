/**
 * Topic pages behind the mega-menu links that used to fall back to the
 * division page (Pain Centre, Medical Aesthetics, Rehab & Recovery, Family
 * Medicine and About).
 *
 * Every page is assembled from copy that already exists in the prototype:
 * the division deep dives (deep.ts), division cards (divisions.ts) and the
 * site FAQ (faq.ts). `approved(source, part)` and the FAQ pickers check at
 * build time that each quoted string is still present, word for word, in
 * the approved source, so a copy edit upstream cannot silently drift here.
 *
 * Strings written for these pages, which have not been through clinic
 * review, are wrapped in `draft()`. They are listed in docs/content-review.md
 * and need clinic approval before launch (RM-HB-COMMS).
 */
import type { PageKey } from "@/lib/routes";
import { bookFor } from "@/lib/routes";
import { rehabCompareQA } from "./rehab-compare";
import type { Benefit, Fact, NavKey, PathStep } from "./types";
import {
  aestheticsLadder,
  deepDives,
  rehabCoverage,
} from "./deep";
import { divisions } from "./divisions";
import { faqItems } from "./faq";
import { images } from "./images";
import { kidsCopy } from "./kids";
import { womenFaq } from "./subpages";
import { womensHealthDay } from "./womens-day";
import { site } from "./site";

export interface TopicFaq {
  q: string;
  a: string;
  linkLabel?: string;
  linkPage?: string;
}

export interface TopicCard {
  t: string;
  d: string;
  facts?: Fact[];
  meta?: string;
  link?: string;
  page?: string;
}

export interface Topic {
  key: PageKey;
  /** Segment under the division path, e.g. "back-neck". */
  slug: string;
  division: NavKey;
  /** Breadcrumb label: the mega-menu label for this page. */
  page: string;
  title: string;
  lead: string;
  /** Meta description, 120 to 160 characters where the copy allows. */
  description: string;
  cta: string;
  ctaTo: string;
  cta2?: string;
  cta2To?: string;
  coverage?: string;
  img: string;
  imgAlt: string;
  pills?: string[];
  glance?: { title: string; p: string; facts: Fact[] };
  cards?: { title: string; sub?: string; items: TopicCard[] };
  benefits?: { title: string; items: Benefit[] };
  /** Show the rehab "what will I pay?" coverage chooser. */
  coverageChooser?: boolean;
  /** Show the aesthetics "lightest option first" ladder. */
  ladder?: boolean;
  /** Show the SkinCeuticals home regimens. */
  regimens?: boolean;
  path?: { title: string; steps: PathStep[] };
  faq?: TopicFaq[];
  related?: { title: string; items: { t: string; d: string; page: string }[] };
  /** Small print under the page content. */
  note?: string;
  /** Side-by-side comparison (Physio or chiro?). */
  compare?: boolean;
  /** An interactive block rendered before the FAQ. */
  extra?: "renewal";
  band: {
    title: string;
    sub?: string;
    cta: string;
    ctaTo: string;
    cta2?: string;
    cta2To?: string;
  };
}

/* ------------------------------------------------------------------ */
/* Guards                                                              */
/* ------------------------------------------------------------------ */

/** A substring of approved copy. Throws at build time if the source no longer contains it. */
function approved(source: string, part: string): string {
  if (!source.includes(part))
    throw new Error(`topics.ts: "${part}" is no longer in its approved source`);
  return part;
}

/** New wording for these pages that still needs clinic approval. Listed in docs/content-review.md. */
function draft(text: string): string {
  return text;
}

/**
 * Meta description from whole sentences of `text`, plus an optional suffix,
 * kept to 160 characters so search results do not cut it mid-word.
 */
function fit(text: string, suffix = ""): string {
  const max = 160 - (suffix ? suffix.length + 1 : 0);
  const sentences = text.match(/[^.?!]+[.?!]+/g) ?? [text];
  let out = "";
  for (const raw of sentences) {
    const next = (out + " " + raw.trim()).trim();
    if (next.length > max) break;
    out = next;
  }
  if (!out) out = sentences[0]?.trim() ?? text;
  return suffix ? `${out} ${suffix}` : out;
}

/** A site FAQ entry, by its exact question. */
function fq(q: string): TopicFaq {
  const f = faqItems.find((x) => x.q === q);
  if (!f) throw new Error(`topics.ts: FAQ "${q}" not found in faq.ts`);
  return { q: f.q, a: f.a, linkLabel: f.linkLabel, linkPage: f.linkPage };
}

/** A division deep-dive FAQ entry, by its exact question. */
function dq(div: "pain" | "aesthetics" | "rehab", q: string): TopicFaq {
  const f = deepDives[div].faq.find((x) => x.q === q);
  if (!f)
    throw new Error(
      `topics.ts: ${div} deep-dive FAQ "${q}" not found in deep.ts`,
    );
  return { q: f.q, a: f.a };
}

const P = deepDives.pain;
const A = deepDives.aesthetics;
const R = deepDives.rehab;
const PD = divisions.pain;
const AD = divisions.aesthetics;
const RD = divisions.rehab;
const FD = divisions.family;
/** Approved answers from the women's health page, by exact question. */
function womenFaqQA(q: string) {
  const f = womenFaq.find((x) => x.q === q);
  if (!f) throw new Error(`topics.ts: women's FAQ "${q}" missing`);
  return f;
}
const womenFaqA = (q: string) => womenFaqQA(q).a;
const svc = (
  d: { services?: { title: string; desc: string }[] },
  i: number,
) => {
  const s = d.services?.[i];
  if (!s) throw new Error("topics.ts: missing division service card");
  return s;
};
const result = (dive: typeof P, i: number) => {
  const r = dive.results[i];
  if (!r) throw new Error("topics.ts: missing deep-dive result");
  return r;
};
const asCard = (
  r: { title: string; p: string; facts: Fact[] },
  link?: string,
  page?: string,
): TopicCard => ({ t: r.title, d: r.p, facts: r.facts, link, page });

/* ------------------------------------------------------------------ */
/* Pain Centre                                                         */
/* ------------------------------------------------------------------ */

const painBand: Topic["band"] = {
  title: PD.footCta ?? "",
  sub: P.closing,
  cta: PD.cta ?? "",
  ctaTo: PD.ctaPage ?? bookFor("family"),
  cta2: PD.cta2,
  cta2To: "referrals",
};
const painRedFlag = approved(
  P.chooser.intro,
  "If your pain is new, sudden or severe, see your family physician or go to an emergency department first.",
);
const painPath = { title: P.pathTitle, steps: P.path };
const painHero = {
  cta: PD.cta ?? "",
  ctaTo: PD.ctaPage ?? bookFor("family"),
  cta2: PD.cta2,
  cta2To: "referrals",
  coverage: approved(PD.eyebrow ?? "", "OHIP-covered with a referral."),
};

const pain: Topic[] = [
  {
    key: "painBack",
    slug: "back-neck",
    division: "pain",
    page: "Back & neck",
    title: result(P, 1).title,
    lead: result(P, 1).p,
    description: fit(result(P, 1).p, "OHIP-covered with a physician referral."),
    ...painHero,
    img: images.services.pain[0],
    imgAlt: draft("Physician reviewing a patient's imaging at the Pain Centre"),
    pills: result(P, 1).tags,
    glance: {
      title: draft("At a glance"),
      p: painRedFlag,
      facts: result(P, 1).facts,
    },
    cards: {
      title: draft("What may be used."),
      items: [
        {
          t: svc(PD, 1).title,
          d: svc(PD, 1).desc,
          link: draft("About nerve blocks"),
          page: "painNerve",
        },
        {
          t: svc(PD, 3).title,
          d: svc(PD, 3).desc,
          link: draft("About joint pain"),
          page: "painJoints",
        },
        { t: result(P, 4).title, d: result(P, 4).p },
      ],
    },
    path: painPath,
    faq: [
      dq("pain", "Do I need a referral?"),
      dq("pain", "Is it covered by OHIP?"),
      dq("pain", "How soon will I feel something?"),
      dq("pain", "What should I bring?"),
    ],
    band: painBand,
  },
  {
    key: "painJoints",
    slug: "joint-pain",
    division: "pain",
    page: "Joint pain",
    title: result(P, 2).title,
    lead: result(P, 2).p,
    description: fit(result(P, 2).p, "OHIP-covered with a physician referral."),
    ...painHero,
    img: images.services.pain[3],
    imgAlt: draft("Physician preparing an ultrasound-guided knee injection"),
    pills: result(P, 2).tags,
    glance: {
      title: draft("At a glance"),
      p: painRedFlag,
      facts: result(P, 2).facts,
    },
    cards: {
      title: draft("One plan, one building."),
      items: [
        { t: svc(PD, 3).title, d: svc(PD, 3).desc },
        {
          t: svc(RD, 0).title,
          d: svc(RD, 0).desc,
          link: svc(RD, 0).title,
          page: "rehabPhysio",
        },
        { t: P.benefits[2]?.t ?? "", d: P.benefits[2]?.d ?? "" },
      ],
    },
    path: painPath,
    faq: [
      dq("pain", "Do I need a referral?"),
      dq("pain", "Can I drive home?"),
      dq("pain", "Will I have to keep coming back?"),
      dq("pain", "What should I bring?"),
    ],
    band: painBand,
  },
  {
    key: "painNerve",
    slug: "nerve-blocks",
    division: "pain",
    page: "Nerve blocks",
    title: svc(PD, 1).title,
    lead: svc(PD, 1).desc,
    description: fit(
      svc(PD, 1).desc,
      "Physician-led in Thornhill, OHIP-covered with a referral.",
    ),
    ...painHero,
    img: images.services.pain[1],
    imgAlt: draft("Physician performing a nerve block with a nurse assisting"),
    pills: result(P, 4).tags,
    glance: {
      title: result(P, 4).title,
      p: result(P, 4).p,
      facts: result(P, 4).facts,
    },
    path: painPath,
    faq: [
      dq("pain", "Does a nerve block hurt?"),
      dq("pain", "Can I drive home?"),
      dq("pain", "How soon will I feel something?"),
      dq("pain", "What should I bring?"),
    ],
    related: {
      title: draft("Read before your visit."),
      items: [
        {
          t: "Preparing for a nerve block",
          d: "Health note",
          page: "/health-notes/nerve-block-prep",
        },
      ],
    },
    band: painBand,
  },
  {
    key: "painTrigger",
    slug: "trigger-point-injections",
    division: "pain",
    page: "Trigger point injections",
    title: svc(PD, 2).title,
    lead: svc(PD, 2).desc,
    description: fit(
      svc(PD, 2).desc,
      "Physician-led at the Pain Centre in Thornhill, OHIP-covered with a referral.",
    ),
    ...painHero,
    img: images.services.pain[2],
    imgAlt: draft("Physician examining a patient's upper back"),
    pills: result(P, 3).tags,
    glance: {
      title: result(P, 3).title,
      p: result(P, 3).p,
      facts: result(P, 3).facts,
    },
    path: painPath,
    faq: [
      dq("pain", "Do I need a referral?"),
      dq("pain", "Can I drive home?"),
      dq("pain", "How soon will I feel something?"),
      dq("pain", "Will I have to keep coming back?"),
    ],
    band: painBand,
  },
];

/* ------------------------------------------------------------------ */
/* Medical Aesthetics                                                  */
/* ------------------------------------------------------------------ */

// Medical skin concerns belong in Family Medicine: a tester with a changing mole nearly booked a cosmetic consult.
const medicalSkinQA = {
  q: draft("Is this the place for a changing mole or a rash?"),
  a: draft(
    "No. A mole that changes, a spot that bleeds or will not heal, or a new rash is a family medicine visit, covered by OHIP. Book a health concern with Family Medicine.",
  ),
};
// Pages for one kind of consult (skin, laser) open booking on that consult; the rest on "A consult".
const aesBandFor = (visit = "consult"): Topic["band"] => ({
  title: AD.footCta ?? "",
  sub: A.closing,
  cta: AD.cta ?? "",
  ctaTo: bookFor("aesthetics", visit),
});
const aesHeroFor = (visit = "consult") => ({
  cta: AD.cta ?? "",
  ctaTo: bookFor("aesthetics", visit),
  coverage: approved(AD.blurb ?? "", "Individual results vary."),
});
const aesBand = aesBandFor();
const aesHero = aesHeroFor();
const aesPath = { title: A.pathTitle, steps: A.path };
const rung = (i: number): TopicCard => {
  const r = aestheticsLadder[i];
  if (!r) throw new Error("topics.ts: missing ladder rung");
  return { t: r.t, d: r.d, facts: r.facts, meta: r.tag };
};

const aesthetics: Topic[] = [
  {
    key: "aesInjectables",
    slug: "injectables",
    division: "aesthetics",
    page: "Injectables",
    title: svc(AD, 0).title,
    lead: svc(AD, 0).desc,
    description: fit(svc(AD, 0).desc, "Physician-assessed in Thornhill."),
    ...aesHero,
    img: images.services.aesthetics[0],
    imgAlt: draft("Physician planning an injectable treatment with a patient"),
    pills: result(A, 0).tags,
    cards: {
      title: A.chooser.title,
      items: [asCard(result(A, 0)), asCard(result(A, 1)), rung(2)],
    },
    benefits: { title: A.benefitsTitle, items: A.benefits },
    path: aesPath,
    faq: [
      dq("aesthetics", "Who does the injections?"),
      dq("aesthetics", "Pregnant or breastfeeding?"),
      dq("aesthetics", "Is a consult free?"),
      dq("aesthetics", "Will it look natural?"),
      dq("aesthetics", "How much does it cost?"),
    ],
    band: aesBand,
  },
  {
    key: "aesSkin",
    slug: "skin-treatments",
    division: "aesthetics",
    page: "Skin treatments",
    title: svc(AD, 1).title,
    lead: svc(AD, 1).desc,
    description: fit(
      svc(AD, 1).desc,
      "Planned after a medical assessment at Restoration Medical in Thornhill. Individual results vary.",
    ),
    ...aesHeroFor("skin"),
    img: images.services.aesthetics[1],
    imgAlt: draft("Aesthetic nurse preparing a skin treatment"),
    pills: result(A, 2).tags,
    cards: {
      title: A.chooser.title,
      items: [asCard(result(A, 2)), asCard(result(A, 3)), rung(0), rung(1)],
    },
    path: aesPath,
    faq: [
      medicalSkinQA,
      fq("Is there downtime?"),
      dq("aesthetics", "Is any of this covered by OHIP?"),
      dq("aesthetics", "Is a consult free?"),
    ],
    band: aesBandFor("skin"),
  },
  {
    key: "aesLaser",
    slug: "laser",
    division: "aesthetics",
    page: "Laser",
    title: svc(AD, 2).title,
    lead: svc(AD, 2).desc,
    description: fit(
      `Laser for ${svc(AD, 2).desc.toLowerCase()}`,
      "Planned after a consult at Restoration Medical in Thornhill. Individual results vary.",
    ),
    ...aesHeroFor("laser"),
    img: images.services.aesthetics[2],
    imgAlt: draft("Treatment room prepared for a laser consult"),
    cards: { title: A.chooser.title, items: [asCard(result(A, 4))] },
    path: aesPath,
    faq: [
      fq("Do I need a consultation first?"),
      medicalSkinQA,
      fq("Is there downtime?"),
      fq("How is pricing set?"),
      fq("Who performs treatments?"),
    ],
    band: aesBandFor("laser"),
  },
  {
    key: "aesPlans",
    slug: "skin-health-plans",
    division: "aesthetics",
    page: "Skin health plans",
    title: svc(AD, 3).title,
    lead: svc(AD, 3).desc,
    description: fit(
      svc(AD, 3).desc,
      "A written plan with prices at a complimentary consult in Thornhill.",
    ),
    ...aesHero,
    img: images.services.aesthetics[3],
    imgAlt: draft("Clinician mapping a skin health plan with a patient"),
    ladder: true,
    regimens: true,
    path: aesPath,
    faq: [
      fq("How is pricing set?"),
      dq("aesthetics", "How much does it cost?"),
      dq("aesthetics", "Is a consult free?"),
    ],
    band: aesBand,
  },
  {
    key: "aesMen",
    slug: "mens-aesthetics",
    division: "aesthetics",
    page: "Men’s aesthetics",
    title: "Men’s aesthetics",
    lead: AD.blurb ?? "",
    description: fit(AD.blurb ?? ""),
    ...aesHero,
    img: images.aesMen,
    imgAlt: draft("A relaxed man sitting in the clinic lounge"),
    cards: {
      title: A.chooser.title,
      items: [asCard(result(A, 0)), asCard(result(A, 2)), asCard(result(A, 4))],
    },
    path: aesPath,
    faq: [
      dq("aesthetics", "Who does the injections?"),
      dq("aesthetics", "Will it look natural?"),
      dq("aesthetics", "Is a consult free?"),
    ],
    band: aesBand,
  },
];

/* ------------------------------------------------------------------ */
/* Rehab & Recovery                                                    */
/* ------------------------------------------------------------------ */

const rehabBand: Topic["band"] = {
  title: RD.footCta ?? "",
  sub: R.closing,
  cta: result(R, 0).cta,
  ctaTo: bookFor("rehab"),
};
const rehabHero = {
  cta: result(R, 0).cta,
  ctaTo: bookFor("rehab"),
  coverage: approved(
    R.benefits[2]?.d ?? "",
    "We bill the insurer directly and handle the forms.",
  ),
};
const rehabPath = { title: R.pathTitle, steps: R.path };
const cov = (i: number) => {
  const c = rehabCoverage[i];
  if (!c) throw new Error("topics.ts: missing coverage option");
  return c;
};
const selfPay = cov(3);
const priceFact = (k: string): Fact => {
  const f = selfPay.facts.find((x) => x.k === k);
  if (!f) throw new Error(`topics.ts: self-pay price "${k}" missing`);
  return f;
};
const directBilling = cov(0).facts.find((f) => f.k === "Direct billing") ?? {
  k: "Direct billing",
  v: "",
};
const rehabFaq = R.faq.map((f) => ({ q: f.q, a: f.a }));

const rehab: Topic[] = [
  {
    key: "rehabPhysio",
    slug: "physiotherapy",
    division: "rehab",
    page: "Physiotherapy",
    title: svc(RD, 0).title,
    lead: svc(RD, 0).desc,
    description: fit(
      `Physiotherapy in Thornhill. ${svc(RD, 0).desc}`,
      "Direct billing to most insurers, MVA and WSIB.",
    ),
    ...rehabHero,
    img: images.services.rehab[0],
    imgAlt: draft("Physiotherapist assessing a patient's knee"),
    compare: true,
    pills: result(R, 0).tags,
    glance: {
      title: draft("What it costs"),
      p: cov(0).p,
      facts: [
        priceFact("Physio or chiro assessment"),
        priceFact("Physio or chiro treatment"),
        directBilling,
        cov(3).facts[3] ?? directBilling,
      ],
    },
    cards: {
      title: R.chooser.title,
      items: [asCard(result(R, 0)), asCard(result(R, 1)), asCard(result(R, 4))],
    },
    benefits: { title: R.benefitsTitle, items: R.benefits },
    path: rehabPath,
    faq: rehabFaq,
    band: rehabBand,
  },
  {
    key: "rehabChiro",
    slug: "chiropractic",
    division: "rehab",
    page: "Chiropractic",
    title: svc(RD, 1).title,
    lead: svc(RD, 1).desc,
    description: fit(
      `Chiropractic care in Thornhill. ${svc(RD, 1).desc}`,
      "Coordinated with physiotherapy and a physician on site.",
    ),
    ...rehabHero,
    img: images.services.rehab[1],
    imgAlt: draft("Chiropractor working with a patient"),
    compare: true,
    glance: {
      title: draft("What it costs"),
      p: cov(0).p,
      facts: [
        priceFact("Physio or chiro assessment"),
        priceFact("Physio or chiro treatment"),
        directBilling,
      ],
    },
    cards: {
      title: R.chooser.title,
      items: [asCard(result(R, 4)), asCard(result(R, 2))],
    },
    path: rehabPath,
    faq: [
      rehabCompareQA,
      dq("rehab", "Do I need a doctor's referral?"),
      dq("rehab", "Do you bill my insurance directly?"),
      dq("rehab", "What should I wear?"),
    ],
    band: rehabBand,
  },
  {
    key: "rehabMassage",
    slug: "massage-therapy",
    division: "rehab",
    page: "Massage therapy",
    title: svc(RD, 2).title,
    lead: svc(RD, 2).desc,
    description: fit(
      `Massage therapy in Thornhill. ${svc(RD, 2).desc}`,
      "Direct billing to most insurers, part of one rehab plan.",
    ),
    ...rehabHero,
    // The shared rehab button says "Book an assessment", which reads as physio or chiro here.
    cta: draft("Book a massage"),
    img: images.services.rehab[2],
    imgAlt: draft("Registered massage therapist treating a patient's shoulder"),
    glance: {
      title: draft("What it costs"),
      p: cov(0).p,
      facts: [
        priceFact("Massage therapy"),
        { k: draft("Session length"), v: draft("25 or 55 minutes") },
        directBilling,
      ],
    },
    cards: {
      title: R.chooser.title,
      items: [asCard(result(R, 4)), asCard(result(R, 2))],
    },
    faq: [
      dq("rehab", "Do I need a doctor's referral?"),
      dq("rehab", "Do you bill my insurance directly?"),
      dq("rehab", "What should I wear?"),
    ],
    band: { ...rehabBand, cta: draft("Book a massage") },
  },
  {
    key: "rehabKines",
    slug: "kinesiology",
    division: "rehab",
    page: "Kinesiology",
    title: svc(RD, 3).title,
    lead: svc(RD, 3).desc,
    description: fit(
      `Kinesiology in Thornhill. ${svc(RD, 3).desc}`,
      "Part of one rehab plan with physiotherapy and a physician on site.",
    ),
    ...rehabHero,
    img: images.services.rehab[3],
    imgAlt: draft("Kinesiologist coaching a patient through an exercise"),
    cards: {
      title: R.chooser.title,
      items: [asCard(result(R, 0)), asCard(result(R, 3))],
    },
    faq: [
      dq("rehab", "How many visits will I need?"),
      dq("rehab", "Do you bill my insurance directly?"),
      dq("rehab", "What should I wear?"),
    ],
    band: rehabBand,
  },
  // Car accident and workplace injury were two pages until Nov 2026; one page now, both kinds of claim side by side.
  {
    key: "rehabMva",
    slug: "accident-and-injury",
    division: "rehab",
    page: draft("Car accident or workplace injury"),
    title: draft("Car accident or workplace injury"),
    lead: `${result(R, 2).p} ${result(R, 3).p}`,
    description: fit(
      `Car accident (MVA) and WSIB rehab in Thornhill. ${result(R, 2).p}`,
      "No upfront cost.",
    ),
    cta: result(R, 2).cta,
    ctaTo: bookFor("rehab"),
    img: images.services.rehab[0],
    imgAlt: draft("Physiotherapist and patient reviewing a treatment plan"),
    pills: [...new Set([...(result(R, 2).tags ?? []), ...(result(R, 3).tags ?? [])])],
    cards: {
      title: draft("Two kinds of claim."),
      items: [
        { t: result(R, 2).title, d: cov(1).p },
        { t: result(R, 3).title, d: cov(2).p },
      ],
    },
    coverageChooser: true,
    faq: [
      fq("Do you handle MVA and WSIB claims?"),
      dq("rehab", "Do I need a doctor's referral?"),
      dq("rehab", "How many visits will I need?"),
      dq("rehab", "Can I see a doctor here too?"),
    ],
    band: { ...rehabBand, cta: result(R, 2).cta },
  },
  {
    key: "rehabBilling",
    slug: "insurance-billing",
    division: "rehab",
    page: "Insurance & direct billing",
    title: draft("Insurance and direct billing"),
    lead: fq("Which insurance plans do you direct-bill?").a,
    description: fit(
      `Rehab billing in Thornhill. ${fq("Which insurance plans do you direct-bill?").a}`,
    ),
    ...rehabHero,
    img: images.division.rehab,
    imgAlt: draft("Front desk staff helping a patient with an insurance card"),
    coverageChooser: true,
    faq: [
      dq("rehab", "Do you bill my insurance directly?"),
      fq("Do you handle MVA and WSIB claims?"),
      fq("Do I need a doctor’s note for physio, chiro or massage?"),
      fq("Is rehab covered?"),
    ],
    band: rehabBand,
  },
  // What to bring and the home program were two short pages until Nov 2026.
  {
    key: "rehabBring",
    slug: "your-visit",
    division: "rehab",
    page: draft("Before and after your visit"),
    title: draft("Before and after your visit"),
    lead: `${draft("A few things make your first visit quicker.")} ${R.closing}`,
    description: draft(
      "What to bring to a first rehab visit in Thornhill: your insurance card, claim number, surgical report and clothing you can move in. Then a home program between visits.",
    ),
    ...rehabHero,
    img: images.services.rehab[1],
    imgAlt: draft("Patient arriving for a first physiotherapy visit"),
    cards: {
      title: draft("Bring these."),
      items: [
        { t: "Insurance card", d: cov(0).p },
        { t: "Claim number, insurer", d: cov(1).p },
        { t: "Surgical report and protocol", d: result(R, 1).p },
        {
          t: draft("Clothing you can move in"),
          d: dq("rehab", "What should I wear?").a,
        },
      ],
    },
    glance: {
      title: draft("Between visits"),
      p: draft(`Questions about your program? Call ${site.phone}.`),
      facts: [
        result(R, 4).facts.find((f) => f.k === "Homework") ?? {
          k: "Homework",
          v: "",
        },
        { k: R.path[0]?.time ?? "", v: R.path[0]?.d ?? "" },
      ],
    },
    faq: [
      dq("rehab", "What should I wear?"),
      dq("rehab", "Do I need a doctor's referral?"),
      dq("rehab", "How many visits will I need?"),
    ],
    band: rehabBand,
  },
];

/* ------------------------------------------------------------------ */
/* Family Medicine                                                     */
/* ------------------------------------------------------------------ */

const familyBand: Topic["band"] = {
  title: FD.footCta ?? "",
  cta: FD.cta ?? "",
  ctaTo: "register",
  cta2: "Book a visit",
  cta2To: bookFor("family"),
};

const family: Topic[] = [
  {
    key: "rx",
    slug: "prescription-renewals",
    division: "family",
    page: "Prescription renewals",
    title: draft("Prescription renewals"),
    lead: fq("How do I renew a prescription?").a,
    description: fit(
      `Prescription renewals at Restoration Medical in Thornhill. ${fq("How do I renew a prescription?").a}`,
    ),
    cta: draft("Request a renewal"),
    ctaTo: "#request",
    cta2: "Book a visit",
    cta2To: bookFor("family"),
    img: images.services.family[1],
    imgAlt: draft(
      "Family physician reviewing a medication list with a patient",
    ),
    extra: "renewal",
    faq: [
      fq("How do I renew a prescription?"),
      fq("Can you send prescriptions to any pharmacy?"),
      fq("Do you offer phone or video visits?"),
    ],
    band: familyBand,
  },
  {
    key: "vaccines",
    slug: "vaccines",
    division: "family",
    page: draft("Vaccines"),
    title: draft("Vaccines for every age."),
    lead: draft(
      "Flu shots, routine vaccines for children and adults, and catch-up doses, given in clinic and recorded in your chart. Given at Thornhill, 700 Centre St. Maple is not open yet.",
    ),
    description: fit(
      draft(
        "Vaccines in Thornhill: flu shots, children's routine vaccines, shingles and catch-up doses at Restoration Medical. OHIP-insured visits, given in clinic.",
      ),
    ),
    cta: approved(kidsCopy.imm.catchCta, "Book a vaccine visit"),
    ctaTo: bookFor("family", "vaccine"),
    cta2: draft("Book a flu shot"),
    cta2To: bookFor("family", "flu"),
    coverage: draft(
      "Publicly funded vaccines are free with your Ontario health card. We tell you before the visit if one is not.",
    ),
    img: images.services.family[6],
    imgAlt: draft("Nurse preparing a vaccine for a patient"),
    related: {
      title: draft("Related."),
      items: [
        {
          t: draft("Children and youth"),
          d: draft("Vaccines by age and school forms"),
          page: "kids",
        },
        {
          t: draft("Am I due for screening?"),
          d: draft("The screenings that apply at your age"),
          page: "family#your-year",
        },
      ],
    },
    band: {
      title: draft("Due for a vaccine?"),
      sub: draft("Book a short visit, or ask at your next appointment."),
      cta: approved(kidsCopy.imm.catchCta, "Book a vaccine visit"),
      ctaTo: bookFor("family", "vaccine"),
      cta2: draft("Book a flu shot"),
      cta2To: bookFor("family", "flu"),
    },
  },
  {
    key: "pregnancy",
    slug: "pregnancy-care",
    division: "family",
    page: draft("Pregnancy care"),
    title: draft("Pregnancy care, from the first visit."),
    lead: womenFaqA("Do you follow pregnancies?"),
    description: fit(
      `Pregnancy care in Thornhill. ${womenFaqA("Do you follow pregnancies?")}`,
    ),
    cta: draft("Book a pregnancy visit"),
    ctaTo: bookFor("family", "pregnancy"),
    cta2: "Register as a patient",
    cta2To: "register",
    // Newcomers with a card from another province asked whether they count.
    coverage: draft(
      "OHIP-insured. Bring your health card. Card from another province? We may be able to bill your home province.",
    ),
    img: images.services.family[3],
    imgAlt: draft("Family physician talking with a pregnant patient"),
    // "What to expect" and the first-trimester steps live in the Two teams journey; warning signs in When to call us (Nov 2026).
    related: {
      title: draft("Related."),
      items: [
        {
          t: draft("Vaccines in pregnancy"),
          d: draft("Flu shot and whooping cough (Tdap)"),
          page: "vaccines",
        },
        {
          t: draft("Women's health"),
          d: draft("Screening, contraception and menopause"),
          page: "women",
        },
        {
          t: draft("Women's health day"),
          d: womensHealthDay.when,
          page: "/family-medicine/women-s-health#womens-day",
        },
        {
          t: draft("Children and youth"),
          d: draft("Well-baby visits and vaccines"),
          page: "kids",
        },
      ],
    },
    faq: [
      womenFaqQA("Can I ask for a female physician?"),
      ...faqItems
        .filter(
          (f) =>
            f.q ===
            "I have a health card from another province. Can I be seen?",
        )
        .map(({ q, a }) => ({ q, a })),
    ],
    band: {
      ...familyBand,
      cta: draft("Book a pregnancy visit"),
      ctaTo: bookFor("family", "pregnancy"),
      cta2: "Register as a patient",
      cta2To: "register",
    },
  },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

const aboutBand: Topic["band"] = {
  title: divisions.about.footCta ?? "",
  cta: "Contact us",
  ctaTo: "contact",
};

const about: Topic[] = [
  {
    key: "forms",
    slug: "patient-forms",
    division: "about",
    page: "Patient forms",
    title: draft("Patient forms"),
    lead: draft("The forms you may need, and where each one goes."),
    description: draft(
      "Patient forms at Restoration Medical in Thornhill: new patient registration, records requests, third-party forms and physician referrals.",
    ),
    cta: fq("Are you accepting new patients?").linkLabel ?? "",
    ctaTo: "register",
    cta2: "Contact us",
    cta2To: "contact",
    img: images.services.about[1],
    imgAlt: draft("Front desk at the Thornhill clinic"),
    cards: {
      title: draft("Forms and requests."),
      items: [
        {
          t: draft("New patient registration"),
          d: approved(
            fq("Are you accepting new patients?").a,
            "Register online and we confirm within two business days.",
          ),
          link: fq("Are you accepting new patients?").linkLabel,
          page: "register",
        },
        {
          t: draft("Copies of your records"),
          d: fq("Can I get a copy of my records?").a,
          link: fq("Can I get a copy of my records?").linkLabel,
          page: "privacy",
        },
        {
          t: draft("Third-party forms"),
          d: fq("Do you charge for forms and notes?").a,
          link: draft("Uninsured services and fees"),
          page: "billing#fees",
        },
        {
          t: "Refer a patient",
          d: draft(
            `For physicians: Ocean eReferral, fax ${site.fax} or ${site.referralsEmail}.`,
          ),
          link: "Refer a patient",
          page: "referrals",
        },
      ],
    },
    faq: [
      fq("Do you charge for forms and notes?"),
      fq("Can I get a copy of my records?"),
      fq("Who can see my health information?"),
    ],
    band: aboutBand,
  },
];

/**
 * Coverage by service, shown on the merged Insurance, billing and fees page (about/insurance-billing, Nov 2026).
 * Kept here because it reads the other divisions' approved copy.
 */
export const billingTopic: Topic = {
    key: "billing",
    slug: "insurance-billing",
    division: "about",
    page: "Insurance & billing",
    title: draft("Insurance and billing"),
    lead: fq("What is covered by OHIP?").a,
    description: fit(
      `What OHIP covers at Restoration Medical in Thornhill. ${fq("What is covered by OHIP?").a}`,
    ),
    cta: "Contact us",
    ctaTo: "contact",
    cta2: fq("What is covered by OHIP?").linkLabel,
    cta2To: "rights",
    img: images.services.about[0],
    imgAlt: draft("Front desk staff explaining a receipt to a patient"),
    cards: {
      title: draft("By service."),
      items: [
        {
          t: FD.label,
          d: approved(
            FD.blurb ?? "",
            "Family medicine visits are covered by OHIP.",
          ),
          link: FD.label,
          page: "family",
        },
        {
          t: PD.label,
          d: P.benefits[1]?.d ?? "",
          link: PD.label,
          page: "pain#ohip",
        },
        {
          t: RD.label,
          d: fq("Is rehab covered?").a,
          link: draft("Insurance and direct billing"),
          page: "rehabBilling",
        },
        {
          t: divisions.infusion.label,
          d: fq("Are drips covered by OHIP?").a,
          link: divisions.infusion.label,
          page: "infusionPricing",
        },
        {
          t: AD.label,
          d: dq("aesthetics", "Is any of this covered by OHIP?").a,
          link: AD.label,
          page: "aesMenu#pricing",
        },
        {
          t: draft("Forms and notes"),
          d: fq("Do you charge for forms and notes?").a,
          link: draft("Uninsured services and fees"),
          page: "billing#fees",
        },
      ],
    },
    faq: [
      fq("What if I do not have OHIP?"),
      fq("Do you charge for forms and notes?"),
      fq("Is rehab covered?"),
    ],
    band: aboutBand,
  };

export const topics: Topic[] = [
  ...pain,
  ...aesthetics,
  ...rehab,
  ...family,
  ...about,
];

/** Topics under one division path, for generateStaticParams. */
export const topicsFor = (division: NavKey) =>
  topics.filter((t) => t.division === division);

export function topicBySlug(division: NavKey, slug: string): Topic | undefined {
  return topics.find((t) => t.division === division && t.slug === slug);
}
