import { draft } from "./review";
/**
 * Patient helpers added before launch: emergency guidance, the
 * prescription renewal request form, the uninsured fees page and the
 * "finding us" wayfinding block. All new wording: needs clinic approval
 * (docs/content-review.md). Approved FAQ answers are reused where they fit.
 */
export const emergencyCopy = {
  title: "Is this an emergency?",
  body: "Call 911 or go to the nearest emergency department. For health advice any time, day or night, call Health811 at 811 or visit health811.ontario.ca. Online requests are read during clinic hours.",
  // 911 first and tappable; Health811 second. A tester with chest pressure at 3am read the old box as "try 811 first".
  // 911 first and tappable; Health811 second. A tester with chest pressure at 3am read the old box as "try 811 first".
  // Stroke signs are named: a tester checking for a parent's stroke did not see the word.
  // Round 15: a tester with arm pain and breathlessness, no chest pain, read the list as not meant for him.
  urgent: draft("Chest pain, pressure or tightness (even if it feels like heartburn, especially with sweating), pain spreading to the arm, jaw or back, sudden shortness of breath or trouble breathing, heavy bleeding, signs of a stroke (face drooping, arm weakness, slurred speech), a child who is very drowsy, limp or hard to wake, or a fever in a baby under 3 months: call 911 now, or go to the nearest emergency department."),
  call911: draft("Call 911"),
  /** Mental health crisis: a tester with low mood found only physical emergencies listed. 988 is Canada's suicide crisis line. */
  crisis: draft("Thoughts of suicide or self-harm?"),
  call988: draft("Call or text 988, any time, day or night."),
  /** Crisis-first note (search for "hopeless" and similar). 988 is Canada's suicide crisis line, by call or text. */
  crisisLead: draft("You do not have to wait for us. Talk to someone now: call or text 988, any time, day or night. It is free and confidential."),
  call988Button: draft("Call or text 988"),
  crisisSafety: draft("If you might act on thoughts of suicide or are in danger now, call 911."),
  /** For people who are not sure: phone and website are separate, clearly named links. */
  unsure: draft("Not sure if it is urgent? Health811 gives health advice any time, day or night."),
  call811: draft("Call Health811 at 811"),
  siteLabel: draft("Visit health811.ontario.ca"),
  advice: draft("For health advice any time, day or night, call Health811 at 811."),
  requests: draft("Messages and renewal requests sent on this website are read during clinic hours."),
  /** Utility bar and phone menu while the clinic is closed. */
  closedLine: draft("Emergency? Call 911"),
  /** Phone menu: the clinic call button says whose number it is. */
  callClinic: draft("Call clinic"),
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
  /** A tester out of heart pills tomorrow found no route for a gap shorter than two business days. */
  urgentTitle: draft("Running out sooner than two business days?"),
  urgentBody: draft("Call us at 905-709-3222 during clinic hours. Your pharmacist can also often extend a regular prescription for a short time. If you have no medication and feel unwell, call Health811 at 811 or 911."),
  /** A caregiver could not tell whose details go where; renewals had no "someone I care for" path (round 15). */
  forSomeone: draft("Asking for someone you care for? Use their name and date of birth, and add your name and relationship in the note."),
  /** Caregiver mode (round 16: a son renewing his mother's pills could not tell whose phone, and "I am an existing patient" was not true of him). */
  forWhom: { label: draft("Who is this request for?"), options: [draft("Me"), draft("Someone I care for")] as readonly string[] },
  patientFirst: draft("Patient's first name"),
  patientLast: draft("Patient's last name"),
  patientDob: draft("Patient's date of birth"),
  yourName: draft("Your name"),
  yourRelationship: draft("Your relationship to them"),
  yourPhone: draft("Your phone"),
  existingOther: draft("The person I am asking for is an existing Restoration Medical patient."),
  contactOther: draft("You may contact me by phone or email about this request."),
  /** Requests sent at night are read the next day we are open (a tester sent one at 11:35pm). */
  afterHours: draft("Sent outside clinic hours? We count the two business days from the next day we are open."),
  existing: "I am an existing Restoration Medical patient.",
  contactConsent: "You may contact me by phone or email about this request.",
  submit: "Send renewal request",
  done: {
    title: "Request sent.",
    body: "Allow two business days. If a visit is needed first, we call you to book one.",
    urgent: draft("If you will run out before then, call us at 905-709-3222 or ask your pharmacist about a short extension."),
    again: "Send another request",
  },
  failed: "That did not go through. Call 905-709-3222 and we will take the request by phone.",
} as const;

export const feesCopy = {
  eyebrow: draft("Fees"),
  title: "Uninsured services and fees",
  /** The page opened with the forms answer (camp and daycare), which did not match "what does it cost". */
  lead: draft("What OHIP does not cover, and what it costs. We tell you the fee before any uninsured service, and every payment comes with a receipt."),
  // Read as contradicting the list under it ("Ask us for the current list" above a list).
  emptyTitle: draft("Anything not listed below? Ask us."),
  emptyBody: "The front desk has the current fee list and tells you the fee before any uninsured service. Call 905-709-3222.",
  tableService: "Service",
  tableFee: "Fee",
  receipts: "Fees are told to you before the service, and every payment comes with a receipt.",
  knownTitle: draft("Prices on our service pages"),
  knownSub: draft("These are already published with each service. HST is shown as on the service page."),
  ironPrefix: draft("Iron therapy"),
  noOhipVisit: draft("Doctor visit without OHIP"),
  noOhipNote: draft("Receipt provided for travel or private insurance"),
  noOhipFee: draft("$100 plus HST ($113 total)"),
  details: draft("Details"),
  dripPrefix: draft("IV drip"),
  dripNote: draft("HST included, plus a 10 minute nurse screening"),
  aesPrefix: draft("Medical Aesthetics"),
  aesNote: draft("Per visit. Your exact price is given in writing at the consult."),
} as const;

export const wayfindingCopy = {
  title: "Finding us",
} as const;
