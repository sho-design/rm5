import type { TeamMember } from "./types";
import { tints } from "./divisions";
import { draft } from "./review";

/** Approved FAQ: "Both physicians and several staff speak Vietnamese." A daughter booking for her mother looked for it here. */
const physicianLanguages = draft("Speaks English and Tiếng Việt");

/** [name, role, divisions (comma separated), preceptor tag?] as in the prototype. */
const TEAM: [string, string, string, string?][] = [
  ["Dr. Johnny Nguyen", "Physician, Medical Director", "Family Medicine, Pain Centre", "Preceptor, physician learners"],
  ["Dr. Joseph Truong", "Physician", "Family Medicine"],
  ["Michelle", "Registered Nurse", "Infusion Therapy"],
  ["Anh", "Registered Nurse", "Infusion Therapy"],
  ["Kim", "Registered Nurse", "Infusion Therapy"],
  ["Marika", "Registered Nurse", "Family Medicine"],
  ["Kelly", "Registered Nurse", "Pain Centre"],
  ["Tiffany", "Registered Nurse", "Medical Aesthetics"],
  ["Rose", "Registered Nurse", "Family Medicine"],
  ["Hillary", "Registered Nurse", "Pain Centre"],
  ["Aastha", "Registered Nurse", "Infusion Therapy"],
  ["Karen", "Lab Manager", "Family Medicine", "Preceptor, laboratory learners"],
];

const initialOf = (name: string): string => {
  if (name.startsWith("Dr. ")) {
    const parts = name.split(" ");
    return parts[parts.length - 1].charAt(0);
  }
  return name.charAt(0);
};

export const team: TeamMember[] = TEAM.map(([name, role, divisions, preceptorTag], i) => ({
  name,
  role,
  divisions: divisions.split(", "),
  ...(preceptorTag ? { preceptorTag } : {}),
  ...(name.startsWith("Dr. ") ? { languages: physicianLanguages } : {}),
  initial: initialOf(name),
  tint: tints[i % 5],
}));

/** Filter chips on the team page ("All" plus the five service lines). */
export const teamFilters = ["All", "Family Medicine", "Pain Centre", "Infusion Therapy", "Medical Aesthetics", "Rehab & Recovery"];

/** Page-level copy for /about/team (prototype isTeam section). */
export const teamPage = {
  eyebrow: "Our team",
  title: "The people behind your care.",
  lead: "A physician reviews every plan. Registered nurses, therapists and clinicians deliver it. Calm, careful, and accountable, across every service.",
  founder: {
    eyebrow: "Founder and Medical Director",
    name: "Dr. Johnny Nguyen",
    role: "Medical Director, Interventional Pain Physician. MD, University of Toronto",
    bio: "Dr. Nguyen grew up in the Jane and Finch community in Toronto and earned his Doctor of Medicine at the University of Toronto, where he received the Heaslip Scholarship. He completed residency in family medicine, a fellowship in emergency medicine, and advanced credentialing in interventional pain management. He has 11 years of combined experience as a family doctor, emergency doctor and pain management doctor, and is the owner of Restoration Medical Thornhill and the Restoration Medical Maple clinic, opening soon.",
    credentials: ["Family medicine residency", "Emergency medicine fellowship", "Advanced Diplomate, Interventional Pain Management", "Governor General’s Academic Medal"],
    preceptor: "Preceptor, TMU and Anderson College placements",
    portraitNote: "Dr. Nguyen portrait (from restorationmedical.ca)",
  },
  photosNote: "Photographs are added as each team member joins the public page.",
  band: {
    title: "Care you can put a face to.",
    sub: "Book an appointment and meet the team.",
    cta: "Book an appointment",
  },
} as const;

/**
 * Team cards (November 2026, after the FIGS ambassador cards). Each card opens to say what this person does for
 * you, in your visit, and how to book with their service. All draft. Generic by role, so no one is quoted.
 */
export const teamCarousel = {
  /** Numbers strip under the title. Counts come from the roster; labels are draft. */
  stats: { physicians: draft("Physicians"), nurses: draft("Registered nurses"), lab: draft("On-site lab"), languages: draft("Languages, English and Tiếng Việt") },
  title: draft("Who you will meet."),
  lead: draft("Tap a name to see what they do in your visit."),
  open: draft("More about"),
  close: draft("Close"),
  listLabel: draft("Team members"),
  /** Announced to screen readers when a filter changes the list. */
  showing: (n: number, service: string) => (service === "All" ? draft(`Showing all ${n} team members.`) : draft(`Showing ${n} in ${service}.`)),
  /** What this person does for you. By name for the physicians, then by role and service. */
  byName: {
    "Dr. Johnny Nguyen": draft("Leads the clinic and performs Pain Centre procedures, guided by wireless ultrasound. Also sees family medicine patients."),
    "Dr. Joseph Truong": draft("Your family doctor for checkups, chronic care and the questions in between."),
  } as Record<string, string>,
  byRole: {
    "Registered Nurse|Infusion Therapy": draft("Screens you, places your IV and stays with you through your drip or iron infusion."),
    "Registered Nurse|Family Medicine": draft("Pap tests, vaccines and bloodwork, and testing on women's health day."),
    "Registered Nurse|Pain Centre": draft("Gets you ready for your procedure and checks on you before you go home."),
    "Registered Nurse|Medical Aesthetics": draft("Screens you first, then treats you, following the plan from your consult."),
    "Lab Manager|Family Medicine": draft("Runs our on-site lab, so your bloodwork happens here, not across town."),
  } as Record<string, string>,
  /** Booking per service, verb plus object. */
  book: {
    family: { t: draft("Book a family visit"), service: "family" },
    pain: { t: draft("Book a Pain Centre visit"), service: "pain" },
    infusion: { t: draft("Book an infusion visit"), service: "infusion" },
    aesthetics: { t: draft("Book a consult"), service: "aesthetics", visit: "consult" },
    rehab: { t: draft("Book a session"), service: "rehab" },
  } as Record<string, { t: string; service: string; visit?: string }>,
};
