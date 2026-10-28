import { draft } from "./review";

/**
 * Booking flow wording added after the usability test (not in the prototype):
 * visit type, booking for someone else, claim fields, the review step and
 * the split reminder and updates consent. All new, listed in
 * docs/content-review.md.
 */
export const bookingExtra = {
  card: {
    label: draft("Health card"),
    options: [draft("Ontario health card"), draft("From another province"), draft("No health card")],
    endsIn: draft("ending"),
    notes: [
      draft("That is fine. Coverage for a card from another province depends on the service. We confirm it, and any fee, before the visit."),
      draft("That is fine. Without a health card the visit is uninsured. We tell you the fee before the visit and give you a receipt."),
    ],
    coverage: [draft("Card from another province, coverage confirmed before the visit"), draft("Uninsured, fee told to you before the visit, receipt provided")],
    bring: draft("Photo ID, and your health card from another province if you have one."),
  },
  /** Before the approved fasting line on morning checkups. */
  fastingIf: draft("If your doctor asked for fasting bloodwork with this visit:"),
  /** Review line for someone else's booking: "Thu Tran. You are their daughter." */
  youAreTheir: (relationship: string) => draft(`You are their ${relationship.toLowerCase()}.`),
  visitTitle: draft("What is the visit for?"),
  forTitle: draft("Who is this appointment for?"),
  forOptions: [draft("Me"), draft("Someone I care for")] as const,
  statusLabel: draft("Patient status"),
  patientTitle: draft("About the patient"),
  contactTitle: draft("Your contact details"),
  fields: {
    patientFirst: draft("Their first name"),
    patientLast: draft("Their last name"),
    relationship: draft("Your relationship to them (optional)"),
    relationshipHint: draft("For example parent, adult child or caregiver."),
    first: draft("Your first name"),
    last: draft("Your last name"),
    cardSomeoneElse: draft("Their Ontario health card, last 4 digits (optional)"),
    claimNumber: draft("Claim number (optional)"),
    insurer: draft("Auto insurer (optional)"),
    accidentDate: draft("Date of the accident (optional)"),
    employer: draft("Employer (optional)"),
    injuryDate: draft("Date of the injury (optional)"),
    benefitsInsurer: draft("Insurance company (optional)"),
  },
  /** Error lines for fields whose label already starts with "Your" or "Their". */
  missing: {
    patientFirst: draft("Add their first name."),
    patientLast: draft("Add their last name."),
    first: draft("Add your first name."),
    last: draft("Add your last name."),
  },
  cardError: draft("Use the last 4 digits of the card, or leave it blank."),
  claimTitle: { mva: draft("About the claim"), wsib: draft("About the claim") },
  claimHint: draft("Not sure yet? Leave these blank. We can open the claim with you at the first visit."),
  paymentTitle: draft("How are you paying?"),
  benefitsHint: "We bill most major insurers directly at the desk.",
  reminders: draft("Send me appointment reminders by email or text. You can unsubscribe at any time."),
  updates: draft("Send me clinic updates by email. Optional, unsubscribe any time. See our "),
  closedShort: draft("Closed"),
  todayShort: draft("Today"),
  review: {
    title: draft("Check your booking."),
    sub: draft("Nothing is sent until you confirm."),
    keys: {
      service: "Service",
      visit: draft("Visit"),
      for: draft("For"),
      status: draft("Patient status"),
      time: "Time",
      clinic: "Clinic",
      coverage: "Coverage",
      contact: draft("Contact"),
      claim: draft("Claim"),
      insurer: draft("Insurer"),
      notes: draft("Your note"),
      reminders: draft("Reminders"),
    },
    you: draft("You"),
    yes: draft("Yes, by email or text"),
    no: draft("No"),
    editDetails: draft("Edit details"),
    changeTime: draft("Change time"),
  },
  confirmed: {
    noReminders: draft("A confirmation is on its way to your email and phone. You chose not to get reminders, so add the visit to your calendar."),
    service: "Service",
    for: draft("For"),
    coverage: "Coverage",
  },
} as const;
