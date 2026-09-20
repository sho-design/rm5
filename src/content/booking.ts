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

/* ------------------------------------------------ Page copy (prototype markup) */

/** Copy on the /book page that lives in the prototype markup rather than its data. */
export const bookingCopy = {
  summaryTitle: "Your booking",
  summaryKeys: { service: "Service", clinic: "Clinic", time: "Time", coverage: "Coverage" },
  clinic: "Thornhill, 700 Centre St",
  callLine: "Prefer to call? 905-709-3222 during clinic hours. For emergencies call 911.",
  step1Title: "Which service?",
  fields: {
    first: "First name",
    last: "Last name",
    email: "Email",
    phone: "Mobile phone",
    card: "Ontario health card, last 4 digits (optional)",
    notes: "Anything we should know? (optional)",
  },
  consent: "I agree to receive appointment reminders and clinic updates by email or text. You can unsubscribe at any time. See our ",
  consentLink: "privacy policy",
  next: "Continue to choose a time",
  step2Title: "Pick a time.",
  step2Sub: "Next 7 days at Thornhill",
  closedTitle: "The clinic is closed this day.",
  closedBody: "Pick another day, or join the waitlist and we will call you if something opens sooner.",
  waitlistTitle: "Nothing that works?",
  waitlistBody: "Join the waitlist. We call in order when a cancellation opens, usually within a few days.",
  waitlistLink: "Join the waitlist",
  back: "Back",
  confirmed: {
    title: "You are booked.",
    body: "A confirmation is on its way to your email and phone. We send a reminder the day before.",
    when: "When",
    where: "Where",
    whereValue: "700 Centre St, Thornhill",
    whereSub: "Inside Walmart, free parking",
    bring: "Bring",
    bringValue: "Ontario health card, medication list, any recent results. Arrive 10 minutes early for your first visit.",
    calendar: "Add to calendar",
    directions: "Directions",
    reset: "Reschedule or cancel",
  },
  waitlisted: {
    title: "You are on the waitlist.",
    body: (division: string) => `We call in order when a spot opens for ${division}. Most people hear from us within a few days. Keep your phone nearby.`,
    listLabel: "Waitlist for Thornhill",
    bookAnyway: "Book a later time anyway",
    leave: "Leave the waitlist",
  },
  taken: {
    title: "That time was just taken.",
    body: "Someone booked it a moment before you. Your details are saved. Pick another time, or call us and we will find one together.",
    another: "Choose another time",
    call: "Call 905-709-3222",
  },
  /** Network or destination failure (not in the prototype, needed for a live form). */
  failed: {
    title: "That did not go through.",
    body: "Your details are still here. Try again, or call us and we will book it together.",
    retry: "Try again",
  },
} as const;

/** Copy on the /register page that lives in the prototype markup. */
export const registerCopy = {
  eyebrow: "New patients",
  title: "Register with a family doctor.",
  lead: "Two minutes now. We confirm within 2 business days and book your first visit, a longer appointment so your doctor can get to know you.",
  formTitle: "About you",
  fields: {
    first: "First name",
    last: "Last name",
    dob: "Date of birth",
    card: "Ontario health card",
    email: "Email",
    phone: "Mobile phone",
    address: "Home address",
    language: "Preferred language",
    family: "Also registering",
    previous: "Previous family doctor or clinic (optional)",
    previousHint: "We request your records for you.",
  },
  consent: "I consent to Restoration Medical collecting this information to register me as a patient, as described in the ",
  consentLink: "privacy policy",
  reminders: "Send me appointment reminders and clinic updates by email or text. Optional, unsubscribe any time.",
  submit: "Send my registration",
  done: {
    title: "Registration received.",
    body: "We review it within 2 business days and call or email to book your first visit. If you told us about a previous clinic, we request your records now.",
    waitTitle: "While you wait",
    waitBody: "Make a list of your medications and any questions. Your first visit is 30 minutes so there is time for them.",
    notes: "Read our health notes",
    home: "Back to home",
  },
} as const;

/** Copy on the /about/contact page that lives in the prototype markup. */
export const contactCopy = {
  eyebrow: "Contact",
  title: "Reach us.",
  leadSuffix: "For medical emergencies call 911.",
  tiles: {
    call: { k: "Call", sub: "Booking, results, renewals" },
    fax: { k: "Fax", sub: "Referrals and records" },
    email: { k: "Email", sub: "Not for urgent matters" },
    visit: { k: "Visit", v: "700 Centre St, Thornhill", sub: "Inside Walmart, free parking. Directions" },
  },
  formTitle: "Send a message.",
  fields: { name: "Name", contact: "Email or phone", message: "Message" },
  messageHint: "Please do not include test results or detailed medical information. We reply within 2 business days.",
  consent: "I agree that Restoration Medical may contact me about this message. Optional: also send me clinic updates by email. Unsubscribe any time.",
  submit: "Send message",
  done: {
    title: "Message sent.",
    body: "We reply within 2 business days. If it is about an appointment today, please call 905-709-3222.",
    again: "Send another",
  },
  mapAlt: "Map to Thornhill clinic",
  mapLink: "Open in Maps",
  hoursTitle: "Hours",
  gettingHereTitle: "Getting here",
  gettingHere: "Free parking in the Walmart lot. YRT routes 2 and 77 stop at Centre and Dufferin. Step-free entrance.",
} as const;
