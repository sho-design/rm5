import { draft } from "./review";

/**
 * New wording for the registration and contact forms (usability fixes,
 * October 2026). Not in the prototype; listed in docs/content-review.md.
 * Approved prototype copy stays in booking.ts (registerCopy, contactCopy).
 */
export const registerExtraCopy = {
  forWhom: {
    label: draft("Who is this registration for?"),
    options: [draft("Me"), draft("Someone I care for")],
  },
  helper: {
    /** Under the email field when registering someone else, for example a child. */
    contactHint: draft("Use your own email and phone if they do not have one."),
    consent: draft("I consent to Restoration Medical collecting this information to register the person named above as a patient, as described in the "),
    title: draft("About you, the person filling this in"),
    note: draft("We will call you if we have questions. The fields below are for the person being registered."),
    name: draft("Your name"),
    relation: draft("Your relationship to them"),
    relationHint: draft("For example parent, adult child, partner or caregiver."),
    phone: draft("Your phone"),
    nameError: draft("Add your name."),
    phoneError: draft("Add a phone number we can reach you at."),
  },
  patientTitle: draft("About the patient"),
  clinic: {
    label: draft("Which clinic?"),
    options: [draft("Thornhill"), draft("Maple, coming soon")],
    mapleNote: draft("Maple is not open yet. We will register you now and contact you once Maple opens. Until then you can be seen at Thornhill."),
  },
  /** Filling it in for someone else: "Send my registration" and "My partner" read as the helper's own. */
  submitCaregiver: draft("Send the registration"),
  languageCaregiver: draft("The patient's preferred language"),
  notesLabel: draft("Anything we should know? (optional)"),
  notesHint: draft("For example, the name and pronouns they use, if you will come to visits with them, or if they need an interpreter. Please do not include test results."),
    /** Registering yourself: a trans tester had nowhere to give the name she uses (round 17). */
    notesHintSelf: draft("For example, the name and pronouns you use if they differ from your health card, or if you need an interpreter. Please do not include test results."),
  family: {
    labelCaregiver: draft("Also registering from the patient's household"),
    theirs: [draft("Their partner"), draft("Their children"), draft("Their parents")],
    hint: draft("Choose any that apply. We will ask for each person's details below."),
    relation: { partner: draft("Partner"), children: draft("Child"), parents: draft("Parent") },
    first: draft("First name"),
    last: draft("Last name"),
    dob: draft("Date of birth"),
    card: draft("Ontario health card (optional)"),
    addChild: draft("Add another child"),
    addParent: draft("Add another parent"),
    remove: draft("Remove"),
    firstError: draft("Add their first name."),
    lastError: draft("Add their last name."),
    dobError: draft("Add their date of birth."),
  },
  reminders: draft("Send me appointment reminders by email or text. Optional."),
  updates: draft("Send me clinic updates by email. Optional, unsubscribe any time."),
  /** Newborns: the card arrives weeks after birth (a parent did not know blank was allowed). */
  cardHint: draft("Optional. Newborn whose card has not arrived yet? Leave it blank."),
  done: {
    /** Testers had already booked a visit, then read "we book your first visit" and feared two first visits. */
    alreadyBooked: draft("Already booked a visit online? Keep it, and mention it when we call so we do not book you twice."),
    people: (n: number) => (n === 1 ? draft("Registered") : draft(`Registered, ${n} people`)),
    clinic: draft("Clinic"),
  },
};

export const contactExtraCopy = {
  reply: draft("We use your email or phone to reply to this message."),
  replyLabel: draft("How should we reply?"),
  replyOptions: [draft("Email or phone"), draft("Email only, please do not call")],
  complaintTopic: draft("A concern or complaint"),
  /** Confirmation for a complaint: two testers wanted to know it reached the Medical Director, not the front desk. */
  /** A patient complaining about a nurse wanted to know her other options next to the form. */
  complaintOptions: draft("If you are not satisfied with our reply, you can contact the College of Physicians and Surgeons of Ontario, or the College of Nurses of Ontario for nursing care."),
  complaintDone: draft("Your concern goes to our Medical Director. It is logged and reviewed, and we reply within 2 business days."),
  /** A tester picked the complaint topic and nothing said who reads it (it is on Patient rights). Billing mistakes belong here too. */
  complaintHint: draft("Concerns and complaints, including billing mistakes, go to our Medical Director. Each one is logged and reviewed, and we reply within 2 business days."),
  updates: draft("Also send me clinic updates by email. Optional, unsubscribe any time."),
};

export const referralExtraCopy = {
  phone: draft("Your phone (optional)"),
  urgent: draft("Urgent"),
  urgentSub: draft("We review urgent referrals first. Please also call the referral line."),
  dobError: draft("Add the patient's date of birth."),
  serviceError: draft("Choose a service."),
};

export const careersExtraCopy = {
  applyingFor: (role: string) => draft(`You are applying for ${role}. Add your details below. We keep applications for 12 months.`),
  licenceHint: draft("Your college registration number, or \"pending\" if you are not registered yet."),
};
