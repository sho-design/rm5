import type { TeamMember } from "./types";
import { tints } from "./divisions";

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
  ["Daniel", "Registered Physiotherapist", "Rehab & Recovery"],
  ["Priya", "Chiropractor", "Rehab & Recovery"],
  ["Linh", "Registered Massage Therapist", "Rehab & Recovery"],
  ["Marcus", "Kinesiologist", "Rehab & Recovery"],
  ["Thu", "Aesthetic Nurse", "Medical Aesthetics"],
  ["Jasmine", "Patient Coordinator", "Family Medicine, Pain Centre"],
  ["Van", "Front Desk and Vietnamese Liaison", "Family Medicine"],
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
    bio: "Dr. Nguyen grew up in the Jane and Finch community in Toronto and earned his Doctor of Medicine at the University of Toronto, where he received the Heaslip Scholarship. He completed residency in family medicine, a fellowship in emergency medicine, and advanced credentialing in interventional pain management. He has 11 years of combined experience as a family doctor, emergency doctor and pain management doctor, and is the owner of Restoration Medical Thornhill and Restoration Medical Woodbridge.",
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
