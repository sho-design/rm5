import type { TintCard } from "./types";

export interface TimelineEntry {
  y: string;
  t: string;
  d: string;
}

export interface StandardEntry {
  n: string;
  t: string;
  d: string;
  bg: string;
}

export interface ReasonEntry {
  t: string;
  d: string;
}

/** Our story: timeline. */
export const storyTimeline: TimelineEntry[] = [
  {
    y: "2015",
    t: "Two doctors, one frustration",
    d: "Working in emergency and family practice, Dr. Nguyen kept seeing the same thing: patients bounced between clinics that never spoke to each other. Pain went untreated while referrals sat in fax trays.",
  },
  {
    y: "2019",
    t: "The Pain Centre opens",
    d: "Restoration Medical begins as an interventional pain practice in Thornhill, built on image guidance and a physician doing every procedure.",
  },
  {
    y: "2021",
    t: "Family Medicine joins",
    d: "Patients asked for a doctor who could follow them between procedures. A family practice opens down the hall, sharing one chart.",
  },
  {
    y: "2023",
    t: "Rehab and Aesthetics",
    d: "Physiotherapy, chiropractic and massage move in so injections and rehab happen in the same week. Medical Aesthetics opens under the same physician oversight.",
  },
  {
    y: "2025",
    t: "Infusion Therapy and Dr. Truong",
    d: "Nurse-administered drips and clinical iron therapy launch. Dr. Joseph Truong joins Family Medicine and the roster opens to new patients.",
  },
  {
    y: "2026",
    t: "Maple",
    d: "A second clinic at 2620 Rutherford Rd, built on the same standard. Pre-registration is open.",
  },
];

/** Our story: values. */
export const storyValues: TintCard[] = [
  {
    t: "A doctor in the building",
    d: "Every division runs under physician oversight. Elective or insured, someone with a medical licence is accountable for your plan.",
    bg: "#EEF5FC",
  },
  {
    t: "One chart",
    d: "Your family doctor, pain physician, therapist and nurse read the same record. Nothing is repeated, nothing is lost.",
    bg: "#FFF3C4",
  },
  {
    t: "Care in your language",
    d: "Nearly half our team speaks Vietnamese. The front desk, the nurse and the doctor can all talk to you directly.",
    bg: "#E6F4EA",
  },
  {
    t: "Plain prices",
    d: "If OHIP does not cover it, you see the number before you agree. No packages you did not ask for.",
    bg: "#FDE8E4",
  },
];

/** Standards of care. */
export const standardsList: StandardEntry[] = [
  {
    n: "01",
    t: "Physician oversight",
    d: "A licensed physician reviews every treatment plan across all five divisions, including wellness infusions and aesthetics. Nurses and therapists work under medical directives that are reviewed yearly.",
    bg: "#EEF5FC",
  },
  {
    n: "02",
    t: "Who does what",
    d: "Physicians assess, diagnose, prescribe and perform image-guided procedures. Registered nurses administer infusions, injections and aesthetic treatments under directive. Physiotherapists, chiropractors, massage therapists and kinesiologists are regulated by their own Ontario colleges. You are told who is treating you.",
    bg: "#FFF3C4",
  },
  {
    n: "03",
    t: "Sterile technique and sourcing",
    d: "Single-use needles and supplies. Health Canada approved products only, bought from licensed Canadian distributors, with lot numbers recorded in your chart.",
    bg: "#E6F4EA",
  },
  {
    n: "04",
    t: "Consent and pricing",
    d: "Risks, alternatives and costs are explained before anything is booked. Uninsured prices are listed with HST and confirmed in writing at the consult. You can stop or change your mind at any point.",
    bg: "#F3ECF8",
  },
  {
    n: "05",
    t: "Screening before elective care",
    d: "Drips, injections and aesthetic treatments start with a health screen. If something in your history makes a treatment unwise, we tell you and suggest an alternative or nothing at all.",
    bg: "#FDE8E4",
  },
  {
    n: "06",
    t: "Emergency readiness",
    d: "Every treatment room has an emergency kit and a physician on site during clinic hours. Staff renew CPR and anaphylaxis training every two years.",
    bg: "#EEF5FC",
  },
  {
    n: "07",
    t: "Your record and privacy",
    d: "One electronic chart, access limited to your care team, audited regularly. Full policy under Privacy.",
    bg: "#FFF3C4",
  },
  {
    n: "08",
    t: "Supervision and learning",
    d: "We are a teaching clinic with Toronto Metropolitan University and Anderson College. Learners never assess or treat unsupervised. You are told when a learner is present and can ask for the clinician alone at any time, without it affecting your care. Physician learners are supervised by Dr. Nguyen; laboratory learners by the Lab Manager.",
    bg: "#F3ECF8",
  },
  {
    n: "09",
    t: "When something goes wrong",
    d: "Tell the clinic manager or the Medical Director directly. Concerns are acknowledged within two business days and reviewed within ten. You may also contact the CPSO or the relevant regulatory college at any time.",
    bg: "#E6F4EA",
  },
];

/** Careers: why work here. */
export const careersWhy: ReasonEntry[] = [
  {
    t: "Physician-led, not investor-led",
    d: "Clinical decisions are made by clinicians. The owner is a doctor who still sees patients.",
  },
  {
    t: "Modern kit",
    d: "Two Clarius handheld ultrasounds (L15 and C3) for guided procedures, one electronic chart across divisions, 10-lead ECG and bloodwork on site.",
  },
  {
    t: "Learn across divisions",
    d: "Nurses rotate between Infusion, Pain and Aesthetics if they want to. Cross-training is paid.",
  },
  {
    t: "A bilingual team",
    d: "English and Vietnamese spoken daily. Interpreters for everything else.",
  },
];
