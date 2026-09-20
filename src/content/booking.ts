/** Coverage line shown on the booking form, keyed by division label (prototype `COVER`). */
export const bookingCoverage: Record<string, string> = {
  "Family Medicine": "OHIP-insured",
  "Pain Centre": "OHIP-insured assessment",
  "Infusion Therapy": "Assessment OHIP, infusion fee",
  "Medical Aesthetics": "Complimentary consult",
  "Rehab & Recovery": "Insurance, MVA, WSIB or self-pay",
};

/** Fallback when the chosen division has no coverage line. */
export const bookingCoverageFallback = "Ask us";

export interface BookingStep {
  n: number;
  label: string;
}

export const bookingSteps: BookingStep[] = [
  { n: 1, label: "Details" },
  { n: 2, label: "Time" },
  { n: 3, label: "Confirm" },
];

export const bookingWho = ["New patient", "Existing patient"] as const;
export type BookingWho = (typeof bookingWho)[number];

/**
 * Booking flow state: 1 details, 2 time, 3 confirmed, 'w' waitlist, 'e' slot taken.
 * Title and lead copy per state, as the prototype's `bookTitle` / `bookLead` resolve.
 */
export type BookingState = 1 | 2 | 3 | "w" | "e";

export interface BookingTitle {
  title: string;
  lead: string;
}

export const bookingTitles: Record<"step1" | "step2" | "step3" | "waitlist" | "error", BookingTitle> = {
  step1: { title: "Book an appointment.", lead: "Tell us which service you need and who you are. Two minutes." },
  step2: { title: "Book an appointment.", lead: "Openings at Thornhill for the next seven days." },
  step3: { title: "See you soon.", lead: "Everything you need for the visit is below." },
  waitlist: { title: "We will call you.", lead: "Everything you need for the visit is below." },
  error: { title: "Book an appointment.", lead: "Everything you need for the visit is below." },
};

export function bookingTitleFor(state: BookingState): BookingTitle {
  if (state === 1) return bookingTitles.step1;
  if (state === 2) return bookingTitles.step2;
  if (state === 3) return bookingTitles.step3;
  if (state === "w") return bookingTitles.waitlist;
  return bookingTitles.error;
}

/** Confirm button labels on the time step. */
export const bookingConfirmLabel = {
  noSlot: "Choose a time above",
  ready: "Confirm booking",
  slotNotChosen: "Not chosen yet",
} as const;

/* ---------------------------------------------------------------- Registration */

export interface RegisterStep {
  n: string;
  t: string;
  d: string;
}

export const registerSteps: RegisterStep[] = [
  { n: "1", t: "Send this form", d: "Two minutes. No documents needed yet." },
  { n: "2", t: "We confirm", d: "Within 2 business days by phone or email." },
  { n: "3", t: "First visit", d: "A 30 minute appointment to meet your doctor." },
];

export const registerLanguages = ["English", "Tiếng Việt"] as const;
export type RegisterLanguage = (typeof registerLanguages)[number];

export const registerFamily = ["My partner", "My children", "My parents"] as const;

/* --------------------------------------------------------------------- Contact */

export const contactTopics = ["General question", "Appointment", "Results or records", "Billing", "Feedback"] as const;
export type ContactTopic = (typeof contactTopics)[number];
