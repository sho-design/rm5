/**
 * Patient helpers added before launch: emergency guidance, the
 * prescription renewal request form, the uninsured fees page and the
 * "finding us" wayfinding block. All new wording: needs clinic approval
 * (docs/content-review.md). Approved FAQ answers are reused where they fit.
 */
export const emergencyCopy = {
  title: "Is this an emergency?",
  body: "Call 911 or go to the nearest emergency department. For health advice any time, day or night, call Health811 at 811 or visit health811.ontario.ca. Online requests are read during clinic hours.",
  linkLabel: "Health811",
  link: "https://health811.ontario.ca",
} as const;

export const renewalCopy = {
  eyebrow: "Existing patients",
  title: "Request a renewal.",
  lead: "Allow two business days. Some medications need a visit before renewal.",
  fields: {
    first: "First name",
    last: "Last name",
    dob: "Date of birth",
    phone: "Phone",
    email: "Email (optional)",
    pharmacy: "Pharmacy name and location",
    meds: "Medications to renew",
    notes: "Anything we should know (optional)",
  },
  medsHint: "Name and strength, one per line. Do not include anything you need today.",
  existing: "I am an existing Restoration Medical patient.",
  contactConsent: "You may contact me by phone or email about this request.",
  submit: "Send renewal request",
  done: {
    title: "Request sent.",
    body: "Allow two business days. If a visit is needed first, we call you to book one.",
    again: "Send another request",
  },
  failed: "That did not go through. Call 905-709-3222 and we will take the request by phone.",
} as const;

export const feesCopy = {
  eyebrow: "Insurance and billing",
  title: "Uninsured services and fees",
  emptyTitle: "Ask us for the current list.",
  emptyBody: "The front desk has the current fee list and tells you the fee before any uninsured service. Call 905-709-3222.",
  tableService: "Service",
  tableFee: "Fee",
  receipts: "Fees are told to you before the service, and every payment comes with a receipt.",
} as const;

export const wayfindingCopy = {
  title: "Finding us",
} as const;
