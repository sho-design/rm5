import type { Division, DivisionKey, NavKey } from "./types";
import { images } from "./images";
import { bookFor } from "@/lib/routes";
import { draft } from "./review";

/** Tint cycle used across the prototype for cards in a row. */
export const tints = ["#EEF5FC", "#FFF3C4", "#E6F4EA", "#FDE8E4", "#EEE9FA"] as const;

/** Division tint + accent (from tokens/colors.css, light theme). */
export const divisionTint: Record<NavKey, string> = {
  family: "var(--div-family)",
  pain: "var(--div-pain)",
  infusion: "var(--div-infusion)",
  aesthetics: "var(--div-aesthetics)",
  rehab: "var(--div-rehab)",
  about: "var(--rm-paper-2)",
};
export const divisionAccent: Record<NavKey, string> = {
  family: "var(--div-family-accent)",
  pain: "var(--div-pain-accent)",
  infusion: "var(--div-infusion-accent)",
  aesthetics: "var(--div-aesthetics-accent)",
  rehab: "var(--div-rehab-accent)",
  about: "var(--rm-sky)",
};
/** Dot colours used for division labels on notes and calendars. */
export const divisionDot: Record<string, string> = {
  "Family Medicine": "#2F7FD1",
  "Pain Centre": "#E07A5F",
  "Infusion Therapy": "#3D9B78",
  "Medical Aesthetics": "#8E5FB5",
  "Rehab & Recovery": "#B8860B",
};

export const divisionKeyByLabel: Record<string, DivisionKey> = {
  "Family Medicine": "family",
  "Pain Centre": "pain",
  "Infusion Therapy": "infusion",
  "Medical Aesthetics": "aesthetics",
  "Rehab & Recovery": "rehab",
  "Rehab and Recovery": "rehab",
};

export const divisions: Record<NavKey, Division> = {
  family: {
    key: "family",
    label: "Family Medicine",
    tag: "Your doctor, for the long run.",
    img: images.division.family,
    tint: tints[0],
    accent: "#2F7FD1",
    eyebrow: "Accepting new patients",
    headline: "A family doctor who knows your name.",
    blurb:
      "Comprehensive, personalized care for every stage of life: pediatric care, routine check-ups, chronic disease management and preventive wellness education. Family medicine visits are covered by OHIP.",
    cta: "Join our roster",
    ctaPage: "register",
    footCta: "Looking for a family doctor in Thornhill?",
    explore: [
      { label: "All Family Medicine", page: "family" },
      { label: "New patients", page: "register" },
      { label: "Chronic care", page: "chronic" },
      { label: "Children & youth", page: "kids" },
      { label: "Women’s health", page: "women" },
      { label: "Men’s health", page: "men" },
      { label: "Bloodwork on site", page: "blood" },
      { label: "Preventive checkups", page: "year" },
    ],
    book: [
      { label: "Book a visit", page: bookFor("family") },
      { label: "Same-day sick visit", page: bookFor("family", "concern") },
      { label: "Annual physical", page: bookFor("family", "checkup") },
      { label: "Join the roster", page: "register" },
    ],
    more: [
      { label: "Our physicians", page: "team" },
      { label: "Referrals", page: "referrals" },
      { label: "Prescription renewals", page: "rx" },
      { label: "Lab results", page: "labs" },
      { label: "Hours & location", page: "locations" },
    ],
    sub: [
      { label: "New patients", icon: "steth", page: "register" },
      { label: "Checkups", icon: "checkup", page: "year" },
      { label: "Chronic care", icon: "chronic", page: "chronic" },
      { label: "Kids", icon: "kids", page: "kids" },
      { label: "Women’s health", icon: "women", page: "women" },
      { label: "Men’s health", icon: "men", page: "men" },
      { label: "Bloodwork on site", icon: "blood", page: "blood" },
      { label: "Same-day", icon: "sameday", page: bookFor("family") },
    ],
    services: [
      { title: "New patients", desc: "Register with our Thornhill location to be contacted for an appointment.", page: "register", image: images.services.family[0] },
      { title: "Chronic disease & acute illness", desc: "Support for long-term conditions and immediate concerns.", page: "chronic", image: images.services.family[1] },
      { title: "Children & youth", desc: "Pediatric care, growth checks, immunizations and school forms.", page: "kids", image: images.services.family[2] },
      { title: "Women’s health", desc: "Pap tests, contraception, prenatal and menopause care.", page: "women", image: images.services.family[3] },
      { title: "Men’s health", desc: "Prostate and heart health screening, testosterone assessment and lifestyle care.", page: "men", image: images.services.family[4] },
      { title: "Bloodwork on site", desc: "Lab requisitions drawn in clinic by our lab technician, so you do not need a separate trip.", page: "blood", image: images.services.family[5] },
      { title: "Preventive care & wellness education", desc: "Proactive care to keep your family healthy.", page: "year", image: images.services.family[6] },
    ],
  },
  pain: {
    key: "pain",
    label: "Pain Centre",
    tag: "Interventional pain care that gets you moving.",
    img: images.division.pain,
    tint: tints[3],
    accent: "#C4573A",
    eyebrow: "Physician-led. OHIP-covered with a referral.",
    headline: "Pain Centre in Thornhill, with evening and weekend hours.",
    blurb:
      "Nerve blocks, trigger point and joint injections performed by a physician, with family medicine and rehab in the same building. With a physician referral and a valid Ontario health card, the assessment and OHIP-listed injections cost you nothing. No family doctor? Our family medicine team can assess you and refer you within the same clinic.",
    cta: "Book a family medicine assessment",
    ctaPage: bookFor("family", "concern"),
    cta2: "Send a referral",
    cta2Page: "/for-physicians#refer",
    footCta: "Start with a referral or an assessment.",
    explore: [
      { label: "All Pain Centre", page: "pain" },
      { label: "Back & neck", page: "painBack" },
      { label: "Joint pain", page: "painJoints" },
      { label: "Nerve blocks", page: "painNerve" },
      { label: "Trigger point injections", page: "painTrigger" },
      { label: "No family doctor?", page: bookFor("family", "concern") },
      { label: "Refer a patient", page: "referrals" },
    ],
    book: [
      { label: "Book a family medicine assessment", page: bookFor("family", "concern") },
      { label: "Referral from your doctor", page: "painOhip" },
      { label: "Follow-up visit", page: bookFor("pain", "followup") },
      { label: "Procedure visit", page: bookFor("pain", "procedure") },
    ],
    more: [
      { label: "What we treat", page: "/pain-centre#chooser" },
      { label: "Dr. Johnny Nguyen", page: "team" },
      { label: "What happens at a first visit", page: "painFirstVisit" },
      { label: "OHIP coverage", page: "painOhip" },
      { label: "Hours and location", page: "locations" },
    ],
    sub: [
      { label: "Back & neck", icon: "spine", page: "painBack" },
      { label: "Joints", icon: "joint", page: "painJoints" },
      { label: "Nerve blocks", icon: "nerve", page: "painNerve" },
      { label: "Trigger points", icon: "sports", page: "painTrigger" },
      { label: "Headache", icon: "head", page: "/health-notes/headache-when-to-see" },
      { label: "Referrals", icon: "referral", page: "referrals" },
    ],
    services: [
      { title: "Pain assessment", desc: "History, examination, a review of your imaging and a written plan. OHIP with a referral.", page: "painFirstVisit", image: images.services.pain[0] },
      { title: "Nerve blocks", desc: "Local anaesthetic, sometimes with an anti-inflammatory, placed around the nerve carrying the pain signal.", page: "painNerve", image: images.services.pain[1] },
      { title: "Trigger point injections", desc: "Injection into a tight, tender band of muscle. Usually under 20 minutes.", page: "painTrigger", image: images.services.pain[2] },
      { title: "Joint injections", desc: "Knee, hip, shoulder and other painful joints, with ultrasound or X-ray guidance where it improves accuracy.", page: "painJoints", image: images.services.pain[3] },
    ],
  },
  infusion: {
    key: "infusion",
    label: "Infusion Therapy",
    tag: "Drips, shots and iron therapy.",
    img: images.division.infusion,
    tint: tints[2],
    accent: "#3D9B78",
    explore: [
      { label: "All Infusion Therapy", page: "infusion" },
      { label: "Drips", page: "drips" },
      { label: "The Injection Bar", page: "shots" },
      { label: "Iron therapy", page: "iron" },
      { label: "By concern", page: "concerns" },
      { label: "Metabolic program", page: "metabolic" },
    ],
    book: [
      { label: "Book a consult", page: bookFor("infusion", "consult") },
      { label: "Iron assessment", page: bookFor("infusion", "iron") },
      { label: "Build your own drip", page: "/infusion-therapy#build" },
      { label: "Memberships", page: "/infusion-therapy/pricing#memberships" },
    ],
    more: [
      { label: "How it works", page: "infusionHow" },
      { label: "Ingredient library", page: "ingredients" },
      { label: "The honest menu", page: "honest" },
      { label: "Pricing", page: "infusionPricing" },
      { label: "Our nurses", page: "infusionTeam" },
    ],
  },
  aesthetics: {
    key: "aesthetics",
    label: "Medical Aesthetics",
    tag: "Physician-assessed, conservatively planned.",
    img: images.division.aesthetics,
    tint: tints[4],
    accent: "#8E5FB5",
    eyebrow: "Assessed by an authorized prescriber",
    headline: "Look like yourself, on a good day.",
    blurb:
      "Non-surgical aesthetic treatments in a calm setting, personalized to your skin and planned following medical assessment by an authorized prescriber. Individual results vary.",
    cta: "Book a consult",
    ctaPage: bookFor("aesthetics", "consult"),
    footCta: "Curious where to start?",
    explore: [
      { label: "All Medical Aesthetics", page: "aesthetics" },
      { label: "Injectables", page: "aesInjectables" },
      { label: "Skin treatments", page: "aesSkin" },
      { label: "Laser", page: "aesLaser" },
      { label: "Skin health plans", page: "aesPlans" },
      { label: "Men’s aesthetics", page: "aesMen" },
    ],
    book: [
      { label: "Book online (Ocean)", page: bookFor("aesthetics") },
      { label: "Injectables appointment", page: bookFor("aesthetics", "injectables") },
      { label: "Skin consult", page: bookFor("aesthetics", "skin") },
      { label: "Laser consult", page: bookFor("aesthetics", "laser") },
    ],
    more: [
      { label: "Our clinicians", page: "team" },
      { label: "Before & after", page: "aesPhotos" },
      { label: "Safety standards", page: "standards" },
      { label: "Pricing", page: "aesPricing" },
      { label: "Gift cards", page: "aesGift" },
    ],
    sub: [
      { label: "Injectables", icon: "shot", page: "aesInjectables" },
      { label: "Skin", icon: "skin", page: "aesSkin" },
      { label: "Laser", icon: "laser", page: "aesLaser" },
      { label: "Plans", icon: "plan", page: "aesPlans" },
      { label: "Men", icon: "men", page: "aesMen" },
      { label: "Gift cards", icon: "gift", page: "aesGift" },
    ],
    services: [
      { title: "Injectables", desc: "Neuromodulators and fillers, conservatively planned. Ultrasound is available to map vessels in higher-risk areas when the injector judges it useful.", page: "aesInjectables", image: images.services.aesthetics[0] },
      { title: "Skin treatments", desc: "Peels, microneedling and medical facials.", page: "aesSkin", image: images.services.aesthetics[1] },
      { title: "Laser", desc: "Redness, pigment and texture.", page: "aesLaser", image: images.services.aesthetics[2] },
      { title: "Skin health plans", desc: "A year of care, mapped with your clinician.", page: "aesPlans", image: images.services.aesthetics[3] },
    ],
  },
  rehab: {
    key: "rehab",
    label: "Rehab & Recovery",
    tag: "Physio, chiro and massage, together.",
    img: images.division.rehab,
    tint: tints[1],
    accent: "#B8860B",
    eyebrow: "Multidisciplinary rehab",
    headline: "Recovery, with a team behind you.",
    blurb: "Physiotherapy, chiropractic, massage and kinesiology, coordinated with your physician under one roof.",
    cta: "Book a session",
    ctaPage: bookFor("rehab"),
    footCta: "Ready to start recovering?",
    explore: [
      { label: "All Rehab & Recovery", page: "rehab" },
      { label: "Physiotherapy", page: "rehabPhysio" },
      { label: "Chiropractic", page: "rehabChiro" },
      { label: "Massage therapy", page: "rehabMassage" },
      { label: "Kinesiology", page: "rehabKines" },
      { label: "Motor vehicle accidents", page: "rehabMva" },
    ],
    book: [
      { label: "Book a session", page: bookFor("rehab") },
      { label: "Initial assessment", page: bookFor("rehab", "assessment") },
      { label: "MVA claim intake", page: bookFor("rehab", "mva") },
      { label: "WSIB intake", page: bookFor("rehab", "wsib") },
    ],
    more: [
      { label: "Our therapists", page: "team" },
      { label: "Insurance & direct billing", page: "rehabBilling" },
      { label: "What to bring", page: "rehabBring" },
      { label: "Home exercise portal", page: "rehabHome" },
      { label: "Hours & location", page: "locations" },
    ],
    sub: [
      { label: "Physio", icon: "physio", page: "rehabPhysio" },
      { label: "Chiro", icon: "band", page: "rehabChiro" },
      { label: "Massage", icon: "massage", page: "rehabMassage" },
      { label: "Kinesiology", icon: "kines", page: "rehabKines" },
      { label: "MVA", icon: "mva", page: "rehabMva" },
      { label: "WSIB", icon: "wsib", page: "rehabWsib" },
    ],
    services: [
      { title: "Physiotherapy", desc: "Assessment and individualized treatment plans.", page: "rehabPhysio", image: images.services.rehab[0] },
      { title: "Chiropractic", desc: "Spine and joint care that fits your goals.", page: "rehabChiro", image: images.services.rehab[1] },
      { title: "Massage therapy", desc: "Registered massage for recovery and tension.", page: "rehabMassage", image: images.services.rehab[2] },
      { title: "Kinesiology", desc: "Movement coaching and exercise programs.", page: "rehabKines", image: images.services.rehab[3] },
    ],
  },
  about: {
    key: "about",
    label: "About",
    tag: "Our clinics, our team, our story.",
    img: images.division.about,
    tint: "#F5F8FB",
    accent: "#2F7FD1",
    eyebrow: "Refined by Medicine",
    headline: "A clinic built around people, not products.",
    blurb:
      "Led by Medical Director Dr. Johnny Nguyen and Dr. Joseph Truong, Restoration Medical brings family medicine, pain care, infusion therapy, aesthetics and rehab together under one physician-led standard of care, with safety, accessibility and trust at the core of everything we do.",
    cta: "Meet the team",
    ctaPage: "team",
    footCta: "Questions? We are happy to help.",
    explore: [
      { label: "About Restoration Medical", page: "about" },
      { label: "Our team", page: "team" },
      { label: "Our clinics", page: "locations" },
      { label: "Health notes", page: "notes" },
      { label: "FAQ", page: "faq" },
      { label: "Our story", page: "story" },
      { label: "Standards of care", page: "standards" },
      { label: "Careers", page: "careers" },
    ],
    book: [
      { label: "Contact us", page: "contact" },
      { label: "Thornhill clinic", page: "/about/clinics#thornhill" },
      { label: "Maple clinic (coming soon)", page: "/about/clinics#maple" },
      { label: "Hours & directions", page: "locations" },
    ],
    more: [
      { label: "Patient forms", page: "forms" },
      { label: "Insurance & billing", page: "billing" },
      { label: "FAQ", page: "faq" },
      { label: "Privacy", page: "privacy" },
      { label: "Accessibility", page: "accessibility" },
    ],
    sub: [
      { label: "Team", icon: "team", page: "team" },
      { label: "Clinics", icon: "clinic", page: "locations" },
      { label: "FAQ", icon: "how", page: "faq" },
      { label: "Story", icon: "story", page: "story" },
      { label: "Standards", icon: "standards", page: "standards" },
      { label: "Careers", icon: "careers", page: "careers" },
    ],
    services: [
      { title: "Our team", desc: "Physicians, nurses, therapists and clinicians, in one place.", page: "team", image: images.services.about[0] },
      { title: "Our clinics", desc: "Thornhill today, Maple opening soon.", page: "locations", image: images.services.about[1] },
      { title: "Our story", desc: "Why we built a clinic around one standard of care.", page: "story", image: images.services.about[2] },
      { title: "Standards of care", desc: "Who does what, and how we keep it safe.", page: "standards", image: images.services.about[3] },
    ],
  },
};

export const divisionOrder: DivisionKey[] = ["family", "pain", "infusion", "aesthetics", "rehab"];
export const navOrder: NavKey[] = [...divisionOrder, "about"];

/** The five service lines, in nav order, with their display tint. */
export const divisionList = divisionOrder.map((k) => divisions[k]);

/** Infusion sub-nav (icon row) used on the Infusion Therapy page. */
export const infusionSub = [
  { label: "Drips", icon: "drip", page: "drips" },
  { label: "Shots", icon: "shot", page: "shots" },
  { label: "Iron", icon: "iron", page: "iron" },
  { label: "Concerns", icon: "concern", page: "concerns" },
  { label: "How it works", icon: "how", page: "infusionHow" },
  { label: "Pricing", icon: "price", page: "infusionPricing" },
] as const;

/** Mega menu and phone menu column headings. About has no bookings, so its middle column reads "Get in touch". */
export const menuHeadings = {
  book: (d: Division) => (d.key === "about" ? draft("Get in touch") : `Book ${d.label}`),
  more: (d: Division) => `More from ${d.label}`,
};

/** Copy shared by the division page shell (prototype division template). */
export const divisionPageCopy = {
  home: "Home",
  offerTitle: "What we offer.",
  compareAll: "Compare all",
  book: "Book",
  learnMore: "Learn more",
} as const;

/** Infusion Therapy page: header tagline, hero and the "under one roof" grid (prototype isInfusion branch). */
export const infusionPage = {
  tagline: "at Restoration Medical",
  hero: {
    pill: "Physician-led, nurse-administered",
    h2: "Come as you are.",
    h2em: "Leave feeling restored.",
    p: "From everyday energy to clinically indicated iron infusions, our therapies meet your body where it is. Reviewed by our physician, given by our nurses.",
    cta: "Book a consult",
    cta2: "Explore drips & shots",
    cta3: "Iron therapy",
    note: "Thornhill, with Maple coming soon",
    alt: "Guest relaxing during an infusion",
  },
  grid: {
    title: "Wellness and clinical, under one roof.",
    note: "Two paths, one standard of care. Wellness is elective; iron therapy may be clinically indicated.",
    wellness: {
      k: "Wellness infusions & shots",
      t: "Energy, immunity, skin, recovery, healthy aging.",
      d: "Personalized to you, given in a calm clinical setting. Elective, and designed around how you want to feel.",
      cta: "Browse drips & shots",
    },
    iron: { k: "Clinical infusion", tag: "Lab-reviewed", t: "Iron therapy", d: "For low ferritin and iron deficiency. When supplements have not been enough.", cta: "Book an assessment" },
    how: { k: "How it works", t: "Three simple steps", d: "Consult & screen, personalize, relax." },
    concerns: { k: "Browse by how you feel", t: "Start with how you feel.", cta: "Browse by concern" },
  },
} as const;

/** Concern chips on the Infusion page (prototype `concerns`). */
export const infusionConcerns = [
  "Low energy & fatigue",
  "Seasonal wellness",
  "Skin, hair & nails",
  "Recovery & performance",
  "Longevity & healthy aging",
  "Weight & metabolism",
  "Iron deficiency",
  "Hydration & travel",
] as const;

/** About page: teaching clinic block (prototype isAboutDiv). */
export const aboutTeaching = {
  eyebrow: "A teaching clinic",
  title: "Learners in the building. Supervision in the room.",
  p: "Restoration Medical hosts medical, nursing and laboratory learners on placement. A learner may take part in your visit, always under the direct supervision of a licensed clinician. We tell you when a learner is involved, and you can ask for the clinician only at any time. Your care and your chart are unchanged.",
  cards: [
    { k: "Physician learners", v: "Preceptor: Dr. Johnny Nguyen, Medical Director" },
    { k: "Laboratory learners", v: "Preceptor: Lab Manager" },
  ],
  link: "Read our supervision standard",
  partnersLabel: "Placement partners",
  partners: [
    { name: "Toronto Metropolitan University", logo: images.logos.tmu, maxHeight: 72 },
    { name: "Anderson College of Health, Business and Technology", logo: images.logos.anderson, maxHeight: 40 },
  ],
  partnersNote: "Toronto Metropolitan University and Anderson College. Students are placed through their program, not hired by the clinic.",
} as const;
