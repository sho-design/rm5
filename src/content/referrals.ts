/** Services listed on the For physicians (referrals) page. */
export interface RefService {
  title: string;
  lead: string;
  tint: string;
  p: string;
  items: string[];
  include: string;
  coverage: string;
}

export interface RefStep {
  n: string;
  t: string;
  d: string;
}

export const refServices: RefService[] = [
  {
    title: "Pain Centre",
    lead: "Dr. Johnny Nguyen",
    tint: "#FDE8E4",
    p: "Image-guided interventional pain management for chronic and post-injury pain.",
    items: [
      "Epidural, facet and medial branch blocks",
      "Image-guided joint injections (knee, hip, shoulder)",
      "Peripheral nerve blocks and headache procedures",
      "Radiofrequency ablation candidacy assessment",
    ],
    include: "Pain history and duration, relevant imaging reports, current medications, anticoagulant status.",
    coverage: "OHIP-insured consult and procedures. WSIB and MVA accepted.",
  },
  {
    title: "Iron Infusion",
    lead: "Physician reviewed",
    tint: "#E6F4EA",
    p: "IV iron for iron deficiency when oral iron is not tolerated, not absorbed or too slow.",
    items: [
      "Iron sucrose and ferric derisomaltose",
      "Pre-infusion physician review of labs",
      "Nurse-administered with 30 minute observation",
      "Repeat bloodwork at 4 to 8 weeks, copied to you",
    ],
    include: "Ferritin, hemoglobin, CBC and transferrin saturation within 3 months. Oral iron trial history and any prior infusion reactions.",
    coverage: "Physician assessment is OHIP-insured. Ask about drug and administration fees, which may be covered by private plans.",
  },
  {
    title: "Rehab & Recovery",
    lead: "Multidisciplinary",
    tint: "#FFF3C4",
    p: "Physiotherapy, chiropractic, massage and kinesiology, coordinated with our physicians.",
    items: [
      "Post-injury and post-surgical rehab",
      "Motor vehicle accident (MVA) claims",
      "WSIB return-to-work programs",
      "Chronic low back and neck pain programs",
    ],
    include: "Diagnosis, surgical or imaging reports, restrictions, and claim numbers for MVA or WSIB.",
    coverage: "Not OHIP-insured. Private insurance, MVA and WSIB billing accepted.",
  },
];

export const refSteps: RefStep[] = [
  { n: "1", t: "Send the referral", d: "Fax, secure email, Ocean or OTN. Include the items listed for that service." },
  { n: "2", t: "We confirm receipt", d: "You receive a fax acknowledgement within 2 business days." },
  { n: "3", t: "We book your patient", d: "Our team contacts the patient directly in English or Vietnamese and sends you the appointment date." },
  { n: "4", t: "You receive the report", d: "A consult note after the first visit and a procedure or progress note after each treatment." },
];
