import type { Announcement, HeroSlide, Location } from "./types";
import { images } from "./images";
import { external } from "@/lib/routes";

export const site = {
  name: "Restoration Medical",
  signoff: "Refined by Medicine.",
  phone: "905-709-3222",
  phoneHref: "tel:9057093222",
  fax: "905-761-7306",
  email: "contact@restorationmedical.ca",
  referralsEmail: "referrals@restorationmedical.ca",
  placementsEmail: "placements@restorationmedical.ca",
  careersEmail: "careers@restorationmedical.ca",
  description:
    "Family medicine, pain care, infusion therapy, aesthetics and rehab, under one physician-led standard of care. Care in English and Tiếng Việt.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://restorationmedical.ca",
  closures: "Fridays, Thanksgiving (Oct 12), Dec 25 and 26, Jan 1",
  landAcknowledgement:
    "Information on this site is educational and is not medical advice. Elective services are not covered by OHIP. Restoration Medical is located on the traditional territory of the Anishinaabe, Haudenosaunee, and Wendat peoples, and the treaty lands of the Mississaugas of the Credit.",
} as const;

export const socials = [
  { key: "instagram", label: "Instagram", href: external.instagram },
  { key: "facebook", label: "Facebook", href: external.facebook },
] as const;

/** Thornhill hours by weekday, Monday first (as displayed). */
export const thornhillHours: [string, string][] = [
  ["Monday", "9:00 am to 4:00 pm"],
  ["Tuesday", "3:00 pm to 9:00 pm"],
  ["Wednesday", "9:00 am to 4:00 pm"],
  ["Thursday", "9:00 am to 4:00 pm"],
  ["Friday", "Closed"],
  ["Saturday", "8:00 am to 4:00 pm"],
  ["Sunday", "8:00 am to 2:00 pm"],
];

/** Opening hours in 24h decimal, keyed by JS getDay() (0 = Sunday). null = closed. */
export const openingHours: Record<number, [number, number] | null> = {
  0: [8, 14],
  1: [9, 16],
  2: [15, 21],
  3: [9, 16],
  4: [9, 16],
  5: null,
  6: [8, 16],
};

export const locations: Location[] = [
  {
    key: "thornhill",
    name: "Thornhill",
    address: "700 Centre St (inside Walmart), Thornhill, ON L4J 0A7",
    addressLines: ["700 Centre St (inside Walmart)", "Thornhill, ON L4J 0A7"],
    access:
      "Wheelchair accessible entryways, hallways, restrooms and facilities. Free on-site parking. Near major bus routes. Family-friendly waiting areas.",
    map: external.thornhillMapsShort,
    img: images.division.about,
    soon: false,
    cta: "Book at Thornhill",
    hours: thornhillHours,
    services: ["family", "pain", "infusion", "aesthetics", "rehab"],
    footCta: "Visit us in Thornhill.",
    footSub: "Phone 905-709-3222. Fax 905-761-7306. contact@restorationmedical.ca",
    phone: site.phone,
    fax: site.fax,
  },
  {
    key: "maple",
    name: "Maple",
    address: "2620 Rutherford Rd, Unit 105 to 107, Maple, ON L4K 0H1",
    addressLines: ["2620 Rutherford Rd, Unit 105 to 107", "Maple, ON L4K 0H1"],
    access:
      "Wheelchair accessible entryways, hallways, restrooms and facilities. Free on-site parking. Near major bus routes. Family-friendly waiting areas.",
    map: external.mapleMapsShort,
    img: images.heroFamilyPark,
    soon: true,
    cta: "Join the Maple list",
    hours: [
      ["Opening", "Coming soon"],
      ["Pre-registration", "Open now"],
      ["Questions", "Call 905-709-3222"],
    ],
    services: ["family", "pain", "infusion", "rehab"],
    footCta: "Be first through the door in Maple.",
    footSub: "Sign up for the Maple waitlist and we will contact you once we open.",
  },
];

export const heroSlides: HeroSlide[] = [
  {
    img: images.heroFamilyPark,
    alt: "Family walking in a park",
    eyebrow: "Refined by Medicine",
    h1: "One clinic.",
    h1em: "Every stage of feeling well.",
    p: "Family medicine, pain care, infusion therapy, aesthetics, and rehab, under one roof and one physician-led standard of care.",
    cta: "Book an appointment",
    page: "book",
    sub: "Thornhill, with Maple coming soon",
  },
  {
    img: images.division.family,
    alt: "Family doctor with a young family",
    eyebrow: "Family Medicine",
    h1: "A family doctor",
    h1em: "who knows your name.",
    p: "Now accepting new patients in Thornhill. Comprehensive primary care for every age.",
    cta: "Join our roster",
    page: "family",
    sub: "Accepting new patients",
  },
  {
    img: images.division.infusion,
    alt: "Guest relaxing during an infusion",
    eyebrow: "New: Infusion Therapy",
    h1: "Come as you are.",
    h1em: "Leave feeling restored.",
    p: "Physician-reviewed, nurse-administered drips, shots and iron therapy.",
    cta: "Explore Infusion Therapy",
    page: "infusion",
    sub: "Elective wellness and clinical iron therapy",
  },
  {
    img: images.division.pain,
    alt: "Man gardening in his backyard",
    eyebrow: "Pain Centre",
    h1: "Pain Centre,",
    h1em: "physician-led and OHIP-covered.",
    p: "Nerve blocks, trigger point and joint injections performed by a physician, with evening and weekend hours in Thornhill.",
    cta: "See the Pain Centre",
    page: "pain",
    sub: "OHIP-covered with a referral",
  },
  {
    img: images.division.rehab,
    alt: "Physiotherapist guiding a stretch",
    eyebrow: "Rehab & Recovery",
    h1: "Recovery,",
    h1em: "with a team behind you.",
    p: "Physiotherapy, chiropractic, massage and kinesiology, coordinated with your physician.",
    cta: "Book a session",
    page: "rehab",
    sub: "Direct billing to participating insurers",
  },
];

export const announcements: Announcement[] = [
  { text: "Maple clinic pre-registration is open", page: "locations" },
  { text: "Dr. Joseph Truong has joined Family Medicine", page: "team" },
  { text: "Flu shots available from October", page: "family" },
];

export const network = [
  { t: "Restoration Medical", d: "Family medicine, pain, rehab and aesthetics", tag: "You are here", href: external.mainSite },
  { t: "Infusion Therapy", d: "Drips, shots, iron therapy", tag: "infusion.restorationmedical.ca", href: external.infusionSite },
  { t: "Canada Knee Clinic", d: "Knee and joint care", tag: "canadakneeclinic.com", href: external.kneeClinic },
] as const;

export const trust = [
  { v: "EN / VI", k: "Care in English and Vietnamese" },
  { v: "10+", k: "Years of physician experience" },
  { v: "5", k: "Services, one standard of care" },
] as const;

export const popularSearches: { label: string; page: string }[] = [
  { label: "Book an appointment", page: "book" },
  { label: "Iron therapy", page: "iron" },
  { label: "New patients", page: "register" },
  { label: "Hours & directions", page: "locations" },
  { label: "Our team", page: "team" },
  { label: "Pricing", page: "https://infusion.restorationmedical.ca/pricing" },
];
