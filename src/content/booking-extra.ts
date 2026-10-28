import { draft } from "./review";

/**
 * Booking flow wording added after the usability test (not in the prototype):
 * visit type, booking for someone else, claim fields, the review step and
 * the split reminder and updates consent. All new, listed in
 * docs/content-review.md.
 */
export const bookingExtra = {
  womensDaySub: draft("Women’s health days at Thornhill"),
  card: {
    label: draft("Health card"),
    options: [draft("Ontario health card"), draft("From another province"), draft("No health card")],
    endsIn: draft("ending"),
    notes: [
      draft("That is fine. We may be able to bill your home province directly. Bring your health card and we confirm coverage, and any fee, before the visit."),
      draft("That is fine. Without a health card the visit is uninsured. We tell you the fee before the visit and give you a receipt."),
    ],
    coverage: [draft("Card from another province, we may bill your province directly"), draft("Uninsured, fee told to you before the visit, receipt provided")],
    bring: draft("Your health card from another province."),
    bringNone: draft("Photo ID."),
  },
  /** Before the approved fasting line on morning checkups. */
  /** After booking a morning fasting draw (the page line says "Book a slot before 10am", which no longer applies). */
  fastingBooked: draft("Fast 8 to 12 hours before your visit. Nothing to eat after midnight, water is fine. Take your usual medications unless your doctor said otherwise."),
  fastingIf: draft("If your doctor asked for fasting bloodwork with this visit:"),
  /** Review line for someone else's booking: "Thu Tran. You are their daughter." */
  youAreTheir: (relationship: string) => draft(`Your relationship: ${relationship.toLowerCase()}.`),
  visitTitle: draft("What is the visit for?"),
  forTitle: draft("Who is this appointment for?"),
  forOptions: [draft("Me"), draft("Someone I care for")] as const,
  statusLabel: draft("Patient status"),
  patientTitle: draft("About the patient"),
  contactTitle: draft("Your contact details"),
  contactTitleSelf: draft("Your details"),
  paymentError: draft("Choose how you are paying."),
  fields: {
    patientFirst: draft("Their first name"),
    patientLast: draft("Their last name"),
    relationship: draft("Your relationship to them (optional)"),
    relationshipHint: draft("For example parent, spouse, adult child or caregiver."),
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
  cardError: draft("Use the last 4 digits of the number, without the letters, or leave it blank."),
  statusHint: draft("Registered but not seen yet? Choose New patient."),
  registerHint: draft("Booking is for one visit. To have us as your family doctor, register as well."),
  registerLink: draft("Register as a patient"),
  // Approved FAQ wording ("Do you speak Vietnamese?"), copied: this file ships to the browser, the FAQ module does not.
  languageHint: "Both physicians and several staff speak Vietnamese.",
  womensDayLead: draft("Women’s health days at Thornhill, the last Sunday of each month."),
  current: draft("Current step: "),
  todayReminder: draft("Your appointment is today, so there is no reminder."),
  confirmNote: draft("Your note"),
  provinceLabel: draft("Which province or territory?"),
  provinces: ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"],
  quebecNote: draft("Quebec cards cannot be billed directly for doctor visits. You pay at the visit and claim it back from RAMQ with the receipt we give you. We tell you the fee before the visit."),
  quebecCoverage: draft("Quebec card: you pay and claim it back from RAMQ, receipt provided"),
  claimTitle: { mva: draft("About the claim"), wsib: draft("About the claim") },
  claimHint: draft("Not sure yet? Leave these blank. We can open the claim with you at the first visit."),
  paymentTitle: draft("How are you paying?"),
  benefitsHint: "We bill most major insurers directly at the desk.",
  reminders: draft("Send me appointment reminders by email or text. You can unsubscribe at any time."),
  updates: draft("Send me clinic updates by email. Optional, unsubscribe any time. See our "),
  closedShort: draft("Closed"),
  todayShort: draft("Today"),
  /** Shown above the times, so the times read as belonging to the chosen day (the day strip wraps at larger text). */
  timesOn: (day: string) => draft(`Times on ${day}`),
  /** Phone and video visits (results and follow-ups). */
  modeLabel: draft("How would you like the visit?"),
  modes: [draft("At the clinic"), draft("By phone"), draft("By video")] as const,
  modeWhere: [null, draft("By phone. We call you at the number you gave us."), draft("By video. We email you a link before the visit.")] as const,
  /** Third language choice, with a box to name it. */
  otherLanguage: draft("Another language"),
  otherLanguageField: draft("Which language?"),
  otherLanguageHint: draft("Tell us and we will arrange an interpreter where we can."),
  /** Shown when this tab already booked and the page was opened again with Back or Forward. */
  alreadyBooked: draft("You booked an appointment in this tab. Your confirmation is in your email. To change it, call us."),
  /** Read out (not shown) when the day changes, so screen reader users know the times changed. */
  timesFor: (day: string, n: number) => (n === 1 ? draft(`1 time on ${day}.`) : draft(`${n} times on ${day}.`)),
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
    // Teens on a shared family phone asked where messages go: say email only, and no "you chose" for an unticked box.
    noReminders: draft("A confirmation is on its way to the email you gave us. We will not send reminders, so add the visit to your calendar."),
    service: "Service",
    for: draft("For"),
    coverage: "Coverage",
  },
} as const;
