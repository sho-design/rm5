import type { DivisionKey } from "./types";
import { draft } from "./review";
import { bookingCopy, bookingCoverage } from "./booking";
import { deepDives, rehabCoverage } from "./deep";
import { divisionOrder, divisions } from "./divisions";
import { ironSteps } from "./iron";
import { kidsCopy } from "./kids";
import { womensHealthDay } from "./womens-day";
import { bloodOptions, menFaq } from "./subpages";
import { routes } from "@/lib/routes";

/**
 * Visit types per service on /book (step 1, "What is the visit for?"),
 * with the coverage line and the "Bring" list each one shows on the
 * confirmation. Built on the server from approved copy wherever it exists
 * and passed to the booking flow as plain data, so the client bundle does
 * not carry the content modules. Keys match bookFor(division, visit) in
 * lib/routes. New wording uses draft() and is listed in docs/content-review.md.
 */

export type BookingClaim = "mva" | "wsib";

export interface BookingVisit {
  key: string;
  label: string;
  /** Overrides the service's coverage line. */
  coverage?: string;
  bring: string[];
  /** Short note under the choice, with an optional link. */
  hint?: { text: string; link?: string; href?: string };
  /** Car accident or workplace claim: shows claim fields. */
  claim?: BookingClaim;
  /** Rehab session: ask whether insurance or self-pay. */
  payment?: boolean;
  /** Fasting bloodwork: show the fasting line for morning slots. */
  fasting?: boolean;
  /** A visit that often includes fasting bloodwork (checkups): show the fasting line as conditional. */
  fastingMaybe?: boolean;
  /** Rehab: the self-pay coverage line for this visit (its own price instead of the "from" price). */
  selfPay?: string;
  /** Only bookable on set days: "womensday" = the last Sunday of the month. */
  days?: "womensday";
}

export interface BookingService {
  key: DivisionKey;
  label: string;
  coverage: string;
  /** Note shown for every visit of this service (Pain Centre referral). */
  note?: { text: string; action?: string; switchTo?: { service: DivisionKey; visit: string } };
  visits: BookingVisit[];
}

/** Coverage and bring lines for rehab sessions, by payment choice (0 insurance, 1 self-pay). */
export interface BookingPayment {
  label: string;
  coverage: string;
  bring: string[];
}

export interface BookingConfig {
  services: BookingService[];
  payments: BookingPayment[];
  /** Added to the bring list for new patients. */
  firstVisit: string;
  /** Fasting line for a bloodwork visit before 10am, and the hint for later slots. */
  fasting: { early: string; late: string };
}

/** A substring of approved copy. Throws at build time if the source no longer contains it. */
function approved(source: string, part: string): string {
  if (!source.includes(part)) throw new Error(`booking-visits.ts: "${part}" is no longer in its approved source`);
  return part;
}

/** An approved FAQ answer from a division deep dive, picked by its exact question. */
function faqA(k: DivisionKey, q: string): string {
  const hit = deepDives[k].faq.find((f) => f.q === q);
  if (!hit) throw new Error(`booking-visits.ts: FAQ "${q}" is no longer in ${k}`);
  return hit.a;
}

const fact = (facts: { k: string; v: string }[], k: string) => {
  const hit = facts.find((f) => f.k === k);
  if (!hit) throw new Error(`booking-visits.ts: fact "${k}" is missing`);
  return hit.v;
};

const label = (k: DivisionKey) => divisions[k].label;
const menuLabel = (k: DivisionKey, l: string) => {
  const all = [...divisions[k].book, ...divisions[k].explore];
  if (!all.some((x) => x.label === l)) throw new Error(`booking-visits.ts: menu label "${l}" is no longer in ${k}`);
  return l;
};

const bring = bookingCopy.confirmed.bringValue;
const familyBring = approved(bring, "Ontario health card, medication list, any recent results.");
const healthCard = draft("Your Ontario health card.");

const [insured, mva, wsib, selfPay] = rehabCoverage;
const rehabWear = faqA("rehab", "What should I wear?");
const resultsFact = (k: DivisionKey, title: string) => {
  const r = deepDives[k].results.find((x) => x.title === title);
  if (!r) throw new Error(`booking-visits.ts: result "${title}" is no longer in ${k}`);
  return r.facts;
};
const mvaCoverage = fact(resultsFact("rehab", "Motor vehicle accident"), "Coverage");
const wsibCoverage = fact(resultsFact("rehab", "WSIB return to work"), "Coverage");
const painCoverage = fact(resultsFact("pain", deepDives.pain.results[0].title), "Coverage");
const uninsured = "Uninsured fee, receipt provided";
const formsTitle = deepDives.family.results.find((r) => r.cta === "Book a form visit")?.title ?? "";
const selfPayFacts = rehabCoverage.find((o) => o.label === "Paying myself")?.facts ?? [];
/** Self-pay lines from the rehab coverage checker: "$135 plus HST" assessments, "$100 plus HST" treatments. */
const physioChiroSelfPay = draft(`Self-pay: ${fact(selfPayFacts, "Physio or chiro assessment")} for an assessment, ${fact(selfPayFacts, "Physio or chiro treatment")} per treatment`);
const massageSelfPay = draft(`Self-pay: massage ${fact(selfPayFacts, "Massage therapy").toLowerCase()}`);
const painBlurb = divisions.pain.blurb ?? "";

const services: Record<DivisionKey, Omit<BookingService, "key" | "label">> = {
  family: {
    coverage: bookingCoverage[label("family")],
    visits: [
      { key: "concern", label: draft("A health concern"), bring: [familyBring] },
      { key: "checkup", label: menuLabel("family", "Annual physical"), bring: [familyBring], fastingMaybe: true },
      { key: "bloodwork", label: draft("Bloodwork or ECG"), bring: [draft("Your Ontario health card, and your requisition if another clinic wrote one.")], fasting: true },
      { key: "flu", label: draft("Flu shot"), bring: [healthCard] },
      { key: "vaccine", label: draft("Vaccines"), bring: [approved(kidsCopy.imm.whereNote, "Bring the yellow immunization card and health card.")] },
      { key: "pregnancy", label: draft("Pregnancy care"), bring: [familyBring] },
      { key: "womensday", label: womensHealthDay.visitLabel, bring: [womensHealthDay.bring], days: "womensday" },
      { key: "forms", label: draft("A form or note"), coverage: uninsured, bring: [`${fact(resultsFact("family", formsTitle), "Bring")}.`, healthCard] },
      {
        key: "renewal",
        label: draft("Prescription renewal"),
        bring: [familyBring],
        hint: { text: draft("Existing patients can request a renewal online, with no visit."), link: approved(deepDives.family.results.map((r) => r.cta).join(" "), "Request a renewal"), href: `${routes.rx}#request` },
      },
    ],
  },
  pain: {
    coverage: bookingCoverage[label("pain")],
    note: {
      text: `${approved(painBlurb, "With a physician referral and a valid Ontario health card, the assessment and OHIP-listed injections cost you nothing.")} ${approved(painBlurb, "No family doctor? Our family medicine team can assess you and refer you within the same clinic.")}`,
      action: approved(divisions.pain.cta ?? "", "Book a family medicine assessment"),
      switchTo: { service: "family", visit: "concern" },
    },
    visits: [
      { key: "referral", label: draft("First visit with a referral"), coverage: painCoverage, bring: [faqA("pain", "What should I bring?")] },
      { key: "followup", label: menuLabel("pain", "Follow-up visit"), coverage: painCoverage, bring: [faqA("pain", "What should I bring?")] },
      { key: "procedure", label: menuLabel("pain", "Procedure visit"), coverage: painCoverage, bring: [faqA("pain", "What should I bring?")] },
    ],
  },
  infusion: {
    coverage: bookingCoverage[label("infusion")],
    visits: [
      { key: "consult", label: draft("A consult"), bring: [healthCard] },
      {
        key: "iron",
        label: menuLabel("infusion", "Iron assessment"),
        coverage: draft("Assessment and bloodwork OHIP-insured"),
        bring: [healthCard, approved(ironSteps[0].d, "If you already have recent results, bring them and skip the wait.")],
      },
      { key: "drip", label: draft("An IV drip"), coverage: uninsured, bring: [faqA("infusion", "How do I prepare?")] },
      { key: "shot", label: draft("A shot from the Injection Bar"), coverage: uninsured, bring: [draft("Wear a top with sleeves that roll up.")] },
    ],
  },
  aesthetics: {
    coverage: bookingCoverage[label("aesthetics")],
    visits: [
      { key: "consult", label: draft("A consult"), bring: [draft("A list of your medications."), draft("Any past treatments and when you had them.")] },
      { key: "injectables", label: menuLabel("aesthetics", "Injectables appointment"), coverage: uninsured, bring: [draft("A list of your medications."), draft("Any past treatments and when you had them.")] },
      { key: "skin", label: menuLabel("aesthetics", "Skin consult"), bring: [draft("A list of your medications."), draft("Any past treatments and when you had them.")] },
      { key: "laser", label: menuLabel("aesthetics", "Laser consult"), bring: [draft("A list of your medications."), draft("Any past treatments and when you had them.")] },
    ],
  },
  rehab: {
    coverage: bookingCoverage[label("rehab")],
    visits: [
      { key: "assessment", label: menuLabel("rehab", "Initial assessment"), bring: [rehabWear], payment: true, selfPay: physioChiroSelfPay },
      { key: "physio", label: menuLabel("rehab", "Physiotherapy"), bring: [rehabWear], payment: true, selfPay: physioChiroSelfPay },
      { key: "chiro", label: menuLabel("rehab", "Chiropractic"), bring: [rehabWear], payment: true, selfPay: physioChiroSelfPay },
      { key: "massage", label: menuLabel("rehab", "Massage therapy"), bring: [rehabWear], payment: true, selfPay: massageSelfPay },
      { key: "kines", label: menuLabel("rehab", "Kinesiology"), bring: [rehabWear], payment: true },
      {
        key: "mva",
        label: mva.label,
        coverage: mvaCoverage,
        claim: "mva",
        bring: [`${fact(mva.facts, "Bring")}.`, draft("Your adjuster's name and phone number, if you have them."), draft("The date of the accident."), rehabWear],
      },
      {
        key: "wsib",
        label: wsib.label,
        coverage: wsibCoverage,
        claim: "wsib",
        bring: [`${fact(wsib.facts, "Bring")}.`, draft("Your employer's name and contact."), healthCard, rehabWear],
      },
    ],
  },
};

export function bookingConfig(): BookingConfig {
  return {
    services: divisionOrder.map((k) => ({ key: k, label: label(k), ...services[k] })),
    payments: [
      { label: insured.label, coverage: draft("Private or work insurance, we bill most plans directly"), bring: [`${fact(insured.facts, "Bring")}.`] },
      { label: selfPay.label, coverage: draft("Self-pay, prices plus HST, receipt provided"), bring: [] },
    ],
    firstVisit: approved(bring, "Arrive 10 minutes early for your first visit."),
    fasting: {
      early: bloodOptions[0].p,
      late: approved(menFaq.find((f) => f.q === "Can bloodwork be done the same day?")?.a ?? "", "Fasting tests are best before 10am."),
    },
  };
}
