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
