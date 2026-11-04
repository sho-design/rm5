import { bookFor } from "@/lib/routes";
import { draft } from "./review";

/**
 * "Physio or chiro?" on the Physiotherapy and Chiropractic pages. A tester with three weeks of back pain found two
 * near-identical pages and nothing to choose between them (round 23). Describes what each profession does, no outcomes.
 */
export const rehabCompare = {
  title: draft("Physio or chiro?"),
  lead: draft("Both are regulated health professionals. Both assess you first and give you a plan, and both cost the same here."),
  rows: [draft("Focus"), draft("A visit often includes"), draft("Regulated by")],
  cols: [
    {
      t: draft("Physiotherapy"),
      page: "rehabPhysio",
      cells: [
        draft("How you move: muscles, joints and strength. Back and neck pain, sprains, sports injuries, and getting back to activity after surgery."),
        draft("Guided exercise, hands-on treatment, and a routine to do at home."),
        draft("College of Physiotherapists of Ontario"),
      ],
    },
    {
      t: draft("Chiropractic"),
      page: "rehabChiro",
      cells: [
        draft("The spine and joints, most often back and neck pain."),
        draft("Spinal and joint adjustment, soft tissue work, and exercises."),
        draft("College of Chiropractors of Ontario"),
      ],
    },
  ],
  price: draft("Either one: assessment $135 plus HST ($152.55 total), treatment $100 plus HST ($113 total). We bill most insurers directly."),
  notSure: draft("Not sure which? Tell us what is going on at an initial assessment, and we suggest which to start with."),
  cta: draft("Book an initial assessment"),
  ctaPage: bookFor("rehab", "assessment"),
};

/** The same answer for the Rehab & Recovery FAQs. */
export const rehabCompareQA = {
  q: draft("Should I see physio or chiro?"),
  a: draft("Either can be a place to start for back or neck pain. Physio focuses on movement, strength and recovery from injury or surgery. Chiro focuses on the spine and joints, often with adjustments. Not sure? Book an initial assessment and we suggest which to start with. Both cost the same."),
};
