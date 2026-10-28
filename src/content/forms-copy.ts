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
    relationHint: draft("For example daughter, son, partner or caregiver."),
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
  family: {
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
  done: {
    book: draft("Book a first visit"),
    people: (n: number) => (n === 1 ? draft("Registered") : draft(`Registered, ${n} people`)),
    clinic: draft("Clinic"),
  },
};

export const contactExtraCopy = {
  reply: draft("We use your email or phone to reply to this message."),
  replyLabel: draft("How should we reply?"),
  replyOptions: [draft("Email or phone"), draft("Email only, please do not call")],
  complaintTopic: draft("A concern or complaint"),
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
