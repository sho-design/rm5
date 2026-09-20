import type { Benefit, ChooserOption, ChooserResult, DivisionKey, Fact, PathStep, QA } from "./types";

/** Division deep-dive content (prototype `DEEP`): chooser, results, benefits, path, FAQ. */
export interface DeepDive {
  tint: string;
  accent: string;
  chooser: {
    eyebrow: string;
    title: string;
    intro: string;
    options: ChooserOption[];
  };
  results: ChooserResult[];
  benefitsTitle: string;
  benefits: Benefit[];
  pathTitle: string;
  path: PathStep[];
  faq: QA[];
  closing: string;
}

/** Infusion drip builder row (prototype `DRIPS`). `mins` of 0 means an add-on. */
export interface Drip {
  name: string;
  desc: string;
  mins: number;
  price: number;
}

/** Pain body-map hotspot (prototype `SPOTS`). `optionIndex` points into the pain chooser options. */
export interface BodySpot {
  label: string;
  short: string;
  x: number;
  y: number;
  optionIndex: number;
}

/** Aesthetics treatment ladder rung (prototype `LADDER`). `h` is the illustrated card height. */
export interface LadderRung {
  t: string;
  tag: string;
  d: string;
  facts: Fact[];
  h: number;
}

/** Rehab coverage option (prototype `COV`). */
export interface CoverageOption {
  label: string;
  upfront: string;
  p: string;
  facts: Fact[];
  cta: string;
}

/** Infusion "clinic vs lounge" comparison row. */
export interface CompareRow {
  k: string;
  us: string;
  them: string;
}

export const deepDives: Record<DivisionKey, DeepDive> = {
  family: {
    tint: "#EEF5FC",
    accent: "#2F7FD1",
    chooser: {
      eyebrow: "What do you need today?",
      title: "Tell us what brings you in.",
      intro: "Pick the closest match and we will show you the kind of visit, whether OHIP covers it and how to book.",
      options: [
        { label: "I am new and need a family doctor", sub: "Registering as a patient" },
        { label: "Something is bothering me", sub: "A new symptom or concern" },
        { label: "Prescription or referral", sub: "Renewals and specialist letters" },
        { label: "Annual checkup or bloodwork", sub: "Preventive care" },
        { label: "A form needs filling", sub: "School, camp, work or travel" },
      ],
    },
    results: [
      {
        title: "New patient visit",
        p: "A longer first appointment to get to know you, your history and your medications. You leave with a plan and a doctor who knows your name.",
        facts: [
          { k: "Time", v: "30 minutes" },
          { k: "Coverage", v: "OHIP-insured" },
          { k: "Bring", v: "Health card, medication list" },
          { k: "Doctor", v: "Dr. Truong or Dr. Nguyen" },
        ],
        tags: ["New patients", "OHIP"],
        cta: "Register as a patient",
        link: "How registration works",
        linkPage: "register",
      },
      {
        title: "Same-week visit",
        p: "A focused appointment for a new concern. If it needs follow-up tests, we order them on the spot and draw blood on site.",
        facts: [
          { k: "Time", v: "15 minutes" },
          { k: "Coverage", v: "OHIP-insured" },
          { k: "When", v: "Usually within the week" },
          { k: "Bloodwork", v: "On site, no second trip" },
        ],
        tags: ["Same week", "OHIP"],
        cta: "Book a visit",
        link: "See our hours",
        linkPage: "locations",
      },
      {
        title: "Renewal or referral visit",
        p: "Short visit for prescription renewals and specialist referrals. Existing patients can often do this by phone.",
        facts: [
          { k: "Time", v: "10 minutes" },
          { k: "Coverage", v: "OHIP-insured" },
          { k: "Phone option", v: "Yes, for existing patients" },
          { k: "Turnaround", v: "Referrals faxed within 2 days" },
        ],
        tags: ["Existing patients"],
        cta: "Request a renewal",
        link: "For referring doctors",
        linkPage: "referrals",
      },
      {
        title: "Preventive checkup",
        p: "A yearly review of the things worth catching early: blood pressure, sugars, cholesterol, screening that fits your age.",
        facts: [
          { k: "Time", v: "20 minutes" },
          { k: "Coverage", v: "OHIP-insured" },
          { k: "Bloodwork", v: "Drawn on site, fasting if needed" },
          { k: "Results", v: "Reviewed with you" },
        ],
        tags: ["Preventive", "OHIP"],
        cta: "Book a checkup",
        link: "Know your numbers",
        linkPage: "numbers",
      },
      {
        title: "Forms and notes",
        p: "School, camp, daycare, employment, travel and insurance forms. Most are done in one short visit.",
        facts: [
          { k: "Time", v: "10 to 15 minutes" },
          { k: "Coverage", v: "Uninsured fee, receipt provided" },
          { k: "Bring", v: "The form, partly filled" },
          { k: "Ready", v: "Usually same day" },
        ],
        tags: ["Uninsured"],
        cta: "Book a form visit",
        link: "See the fee list",
        linkPage: "legal",
      },
    ],
    benefitsTitle: "What having a family doctor here means for you.",
    benefits: [
      { big: "1", t: "One doctor who knows you", d: "You see the same physician, not a different face each visit.", bg: "#EEF5FC" },
      { big: "0", t: "Second trips for bloodwork", d: "Our lab technician draws most requisitions in clinic.", bg: "#FFF3C4" },
      { big: "2", t: "Languages at the front desk", d: "English and Tiếng Việt, from booking to follow-up.", bg: "#E6F4EA" },
    ],
    pathTitle: "From first call to first visit.",
    path: [
      { n: "1", time: "Today", t: "Register online or call", d: "Two minutes. We confirm we have room and set your first visit." },
      { n: "2", time: "Before you come", t: "Send your records", d: "Your previous clinic transfers your file. We handle the request." },
      { n: "3", time: "First visit", t: "Meet your doctor", d: "A longer appointment to go through history, medications and goals." },
      { n: "4", time: "Ongoing", t: "Care that follows you", d: "Reminders for screening, quick renewals and same-week visits when something comes up." },
    ],
    faq: [
      { q: "Are you accepting new patients?", a: "Yes, at Thornhill. Register online or call and we will confirm and book your first visit." },
      { q: "Do I need to bring anything?", a: "Your Ontario health card, a list of medications and any recent test results. If you are transferring, we request your file for you." },
      { q: "Can I be seen the same day?", a: "We hold same-week slots for existing patients. For urgent concerns call in the morning and we will do our best. Emergencies go to 911 or the nearest emergency department." },
      { q: "Do you do virtual visits?", a: "Phone visits are available for existing patients for renewals, results and follow-up. New concerns are seen in person." },
      { q: "What is not covered by OHIP?", a: "Forms, notes, travel consultations and some cosmetic services. We tell you the fee before the visit and give you a receipt." },
    ],
    closing: "Registration takes two minutes. Your first visit is a proper conversation, not a rushed one.",
  },

  pain: {
    tint: "#FDE8E4",
    accent: "#C4573A",
    chooser: {
      eyebrow: "What kinds of pain does the Pain Centre treat?",
      title: "Pain that has lasted longer than three months, or keeps coming back.",
      intro: "Tap where it hurts and the card beside it shows how we assess that area, which procedures may be used and what OHIP covers. If your pain is new, sudden or severe, see your family physician or go to an emergency department first.",
      options: [
        { label: "Head", sub: "Headache, tension, occipital" },
        { label: "Neck and lower back", sub: "Including pain into the arm or leg" },
        { label: "Shoulder, hip and knee", sub: "Joint pain, osteoarthritis" },
        { label: "Muscle pain", sub: "Tender trigger points" },
        { label: "Nerve pain", sub: "After shingles or surgery" },
      ],
    },
    results: [
      {
        title: "Headache",
        p: "A detailed history sorts the headache type first. Where a nerve is the source, an occipital nerve block may be an option. Ask us which headache types are seen at the Pain Centre.",
        facts: [
          { k: "First visit", v: "Pain assessment, about 20 min" },
          { k: "Procedures", v: "Occipital nerve block, where indicated" },
          { k: "Coverage", v: "OHIP with a referral and health card" },
          { k: "Read first", v: "When a headache needs a doctor" },
        ],
        tags: ["Head", "OHIP"],
        cta: "Book a family medicine assessment",
        link: "Read the health note",
        linkPage: "notes",
      },
      {
        title: "Lower back and neck pain",
        p: "A physician takes your history, examines the painful area and reviews your imaging. Where an injection is indicated, it is explained first, including what OHIP covers.",
        facts: [
          { k: "First visit", v: "Pain assessment, about 20 min" },
          { k: "Procedures", v: "Nerve blocks, joint injections" },
          { k: "Coverage", v: "OHIP with a referral and health card" },
          { k: "Guidance", v: "Ultrasound or X-ray where it helps" },
        ],
        tags: ["Back and neck", "OHIP"],
        cta: "Book a family medicine assessment",
        link: "Refer a patient",
        linkPage: "referrals",
      },
      {
        title: "Knee, hip and shoulder pain",
        p: "Joint injections into the painful joint, with image guidance where it improves accuracy. Physiotherapy is in the same building if rehab is part of your plan.",
        facts: [
          { k: "First visit", v: "Pain assessment, about 20 min" },
          { k: "Procedures", v: "Joint injections" },
          { k: "Coverage", v: "OHIP with a referral and health card" },
          { k: "Bring", v: "X-ray or MRI reports" },
        ],
        tags: ["Joints", "OHIP"],
        cta: "Book a family medicine assessment",
        link: "Rehab and Recovery",
        linkPage: "rehab",
      },
      {
        title: "Muscle pain with trigger points",
        p: "A trigger point injection goes into a tight, tender band of muscle. Most take under 20 minutes and most people drive themselves home.",
        facts: [
          { k: "First visit", v: "Pain assessment, about 20 min" },
          { k: "Procedures", v: "Trigger point injections" },
          { k: "Coverage", v: "OHIP with a referral and health card" },
          { k: "Drive home", v: "Usually yes" },
        ],
        tags: ["Muscle", "OHIP"],
        cta: "Book a family medicine assessment",
        link: "Refer a patient",
        linkPage: "referrals",
      },
      {
        title: "Nerve pain",
        p: "Burning or shooting pain, including pain after shingles or surgery. A nerve block places local anaesthetic around the nerve carrying the signal, sometimes with an anti-inflammatory.",
        facts: [
          { k: "First visit", v: "Pain assessment, about 20 min" },
          { k: "Procedures", v: "Nerve blocks" },
          { k: "Coverage", v: "OHIP with a referral and health card" },
          { k: "Prep", v: "Tell us about blood thinners" },
        ],
        tags: ["Nerve", "OHIP"],
        cta: "Book a family medicine assessment",
        link: "Preparing for a nerve block",
        linkPage: "notes",
      },
    ],
    benefitsTitle: "Three plain facts.",
    benefits: [
      { big: "MD", t: "Physician-led", d: "A physician assesses, decides and performs every procedure.", bg: "#FDE8E4" },
      { big: "$0", t: "OHIP-covered", d: "With a referral and a valid health card, the assessment and OHIP-listed injections cost you nothing. Private procedures are priced before booking.", bg: "#FFF3C4" },
      { big: "1", t: "One roof", d: "Family medicine and rehab in the same building, sharing one chart. English and Vietnamese spoken.", bg: "#EEF5FC" },
    ],
    pathTitle: "What happens at a first visit.",
    path: [
      { n: "1", time: "Before you come", t: "Referral", d: "Your family physician sends a referral by fax or Ocean eReferral. We call you to book. Bring your health card, imaging reports and a list of what you have tried." },
      { n: "2", time: "Visit 1", t: "Assessment", d: "History, examination and a review of your imaging. You describe what the pain stops you doing. That becomes the goal in your written plan." },
      { n: "3", time: "Same day or booked", t: "Procedure", d: "A nurse prepares the room. The physician performs the injection, usually in under 20 minutes. Most people drive themselves home." },
      { n: "4", time: "Follow-up", t: "Review", d: "The physician reviews how you responded and adjusts the plan. Your family physician receives a report after every visit." },
    ],
    faq: [
      { q: "Do I need a referral?", a: "For OHIP-covered care, yes. Any Ontario physician can refer you. If you do not have one, book a family medicine assessment here and our physician can refer you internally." },
      { q: "Is it covered by OHIP?", a: "The assessment, nerve blocks, trigger point injections and joint injections are OHIP-covered when you are referred and have a valid health card. Private procedures are listed with their prices, and you are told the price before anything is booked." },
      { q: "Does a nerve block hurt?", a: "You feel the local anaesthetic, similar to dental freezing, then pressure. Most people describe the procedure as uncomfortable rather than painful, and it is usually over in minutes." },
      { q: "How soon will I feel something?", a: "It varies by person and by procedure, and the physician will tell you what is typical for yours. Some people notice a change the same day; for others it takes longer, or the first procedure is diagnostic. Results vary from person to person." },
      { q: "Will I have to keep coming back?", a: "Some people need a short series; some need occasional repeat procedures; some need none after rehab. The physician sets the plan with you and reviews it at every visit. There is no automatic schedule." },
      { q: "Can I drive home?", a: "Usually yes after trigger point and most joint injections. After some nerve blocks the physician may ask you to have a ride. You are told at the time of booking." },
      { q: "Do you speak Vietnamese?", a: "Yes. Most of our staff speak Vietnamese, and the physician does too." },
      { q: "What should I bring?", a: "Your health card, your referral if you have it, any imaging reports, and a list of medications and treatments you have tried." },
    ],
    closing: "Have a family doctor? Ask them to fax a referral to 905-761-7306 or send it by Ocean eReferral. No family doctor? Book a family medicine assessment and we handle the referral inside the clinic. This page is general information, not medical advice. Results vary from person to person.",
  },

  infusion: {
    tint: "#E6F4EA",
    accent: "#3D9B78",
    chooser: {
      eyebrow: "Why are you here?",
      title: "Start with how you feel.",
      intro: "Pick the closest match. We will show what we recommend, what the visit involves and what it costs.",
      options: [
        { label: "Tired all the time", sub: "Low iron, low energy" },
        { label: "Run down after illness or travel", sub: "Hydration and recovery" },
        { label: "Nausea or cannot keep fluids down", sub: "Rehydration" },
        { label: "Training or an event", sub: "Recovery support" },
        { label: "Not sure, I just want to feel better", sub: "Start with an assessment" },
      ],
    },
    results: [
      {
        title: "Iron assessment first",
        p: "Fatigue has many causes and low iron is one of the most common. A physician visit and bloodwork come first. If iron is low, an infusion may follow.",
        facts: [
          { k: "Step one", v: "OHIP-insured assessment" },
          { k: "Bloodwork", v: "On site" },
          { k: "If needed", v: "Iron infusion, from $250" },
          { k: "Days", v: "Tue, Sat, Sun" },
        ],
        tags: ["Iron", "Physician first"],
        cta: "Book an iron assessment",
        link: "Read about iron therapy",
        linkPage: "iron",
      },
      {
        title: "Hydration and vitamin drip",
        p: "Fluids with electrolytes and a vitamin blend, given by a nurse after a short screening. About an hour in a lounge chair.",
        facts: [
          { k: "Time", v: "45 to 60 minutes" },
          { k: "Price", v: "$150 to $200, HST incl." },
          { k: "Screening", v: "Nurse, 10 minutes" },
          { k: "Coverage", v: "Not OHIP-insured" },
        ],
        tags: ["Hydration"],
        cta: "Book a consult",
        link: "See all drips on the Infusion site",
        linkPage: "infusion",
      },
      {
        title: "Rehydration",
        p: "For dehydration from a stomach bug or heat when you cannot keep fluids down. A nurse screens you and a physician is on site.",
        facts: [
          { k: "Time", v: "45 to 60 minutes" },
          { k: "Price", v: "$150, HST incl." },
          { k: "Safety", v: "Physician on site" },
          { k: "Not for", v: "Severe symptoms: go to emergency" },
        ],
        tags: ["Rehydration"],
        cta: "Call to book today",
        link: "See our hours",
        linkPage: "locations",
      },
      {
        title: "Recovery drip",
        p: "Fluids, electrolytes and amino acids after hard training or a race. Booked around your schedule.",
        facts: [
          { k: "Time", v: "60 minutes" },
          { k: "Price", v: "$200, HST incl." },
          { k: "Add-on", v: "Anti-nausea or vitamin C" },
          { k: "Coverage", v: "Not OHIP-insured" },
        ],
        tags: ["Recovery"],
        cta: "Book a drip",
        link: "Rehab & Recovery",
        linkPage: "rehab",
      },
      {
        title: "Start with a physician",
        p: "Feeling unwell without a clear reason deserves a proper look, not a menu. Book a family medicine visit; if a drip makes sense, we will say so.",
        facts: [
          { k: "Step one", v: "OHIP-insured visit" },
          { k: "Bloodwork", v: "On site" },
          { k: "Then", v: "A plan that may or may not include IV" },
          { k: "Honesty", v: "We will tell you if it is not for you" },
        ],
        tags: ["Physician first"],
        cta: "Book a visit",
        link: "Family Medicine",
        linkPage: "family",
      },
    ],
    benefitsTitle: "Why choose a clinic, not a lounge.",
    benefits: [
      { big: "MD", t: "A physician is always on site", d: "Every infusion happens in a medical clinic with a doctor in the building.", bg: "#E6F4EA" },
      { big: "1", t: "Visit for bloodwork and drip", d: "Assessment, labs and infusion under one roof.", bg: "#FFF3C4" },
      { big: "$0", t: "For the assessment", d: "Iron assessments and bloodwork are OHIP-insured. Only the infusion visit is a fee.", bg: "#EEF5FC" },
    ],
    pathTitle: "From booking to back on your feet.",
    path: [
      { n: "1", time: "2 minutes", t: "Book online", d: "Pick a drip or an iron assessment. Same-week times are common." },
      { n: "2", time: "On arrival", t: "Nurse screening", d: "Vitals, history and allergies. The physician reviews anything unusual." },
      { n: "3", time: "45 to 180 minutes", t: "Your infusion", d: "A lounge chair, a blanket and a nurse nearby. Bring headphones." },
      { n: "4", time: "Afterwards", t: "Go about your day", d: "No sedation. Iron patients get repeat bloodwork booked at 4 to 8 weeks." },
    ],
    faq: [
      { q: "Is IV therapy covered by OHIP?", a: "The physician assessment and bloodwork are. Infusion visits are a fee, and we provide a receipt for private plans." },
      { q: "Do I need a referral?", a: "No. Book directly. For iron, bring recent bloodwork if you have it." },
      { q: "Who gives the infusion?", a: "A registered nurse places the IV and monitors you. A physician is on site throughout." },
      { q: "How do I prepare?", a: "Eat normally, drink water and wear sleeves that roll up. No fasting." },
      { q: "Who should not have a drip?", a: "People with certain heart or kidney conditions, and anyone acutely unwell. The screening is there to catch this, and we will refer you elsewhere if needed." },
    ],
    closing: "A short screening, a comfortable chair and a physician in the building. Book a drip or start with an iron assessment.",
  },

  aesthetics: {
    tint: "#F3ECF8",
    accent: "#8E5FB5",
    chooser: {
      eyebrow: "What is on your mind?",
      title: "Tell us the concern, not the treatment.",
      intro: "Pick what you notice in the mirror. We will show the approaches we use, the downtime and what a consult covers.",
      options: [
        { label: "Lines when I move my face", sub: "Forehead, frown, crow's feet" },
        { label: "Volume loss or hollows", sub: "Cheeks, under eyes, lips" },
        { label: "Skin texture and tone", sub: "Dullness, pores, sun spots" },
        { label: "Acne or scarring", sub: "Active or past" },
        { label: "I want to look rested", sub: "Not sure what I need" },
      ],
    },
    results: [
      {
        title: "Expression lines",
        p: "Neuromodulator injections relax the muscles that fold the skin. Dosing is conservative and reviewed at two weeks.",
        facts: [
          { k: "Consult", v: "Physician, 20 min" },
          { k: "Treatment time", v: "15 minutes" },
          { k: "Downtime", v: "None to minimal" },
          { k: "Review", v: "Included at 2 weeks" },
        ],
        tags: ["Injectable"],
        cta: "Book a consult",
        link: "Our standards of care",
        linkPage: "about",
      },
      {
        title: "Volume and contour",
        p: "Hyaluronic acid fillers restore volume where it has thinned. We build gradually across visits rather than all at once.",
        facts: [
          { k: "Consult", v: "Physician, 20 min" },
          { k: "Treatment time", v: "30 to 45 minutes" },
          { k: "Downtime", v: "Swelling 2 to 3 days" },
          { k: "Approach", v: "Gradual, reversible" },
        ],
        tags: ["Injectable"],
        cta: "Book a consult",
        link: "Meet the team",
        linkPage: "team",
      },
      {
        title: "Skin quality",
        p: "Medical-grade peels, microneedling and skincare plans. Usually a series, spaced a month apart.",
        facts: [
          { k: "Consult", v: "Nurse, 20 min" },
          { k: "Treatment time", v: "30 to 60 minutes" },
          { k: "Downtime", v: "Redness 1 to 3 days" },
          { k: "Series", v: "Typically 3 to 6" },
        ],
        tags: ["Skin"],
        cta: "Book a consult",
        link: "Skin care notes",
        linkPage: "notes",
      },
      {
        title: "Acne and scarring",
        p: "Active acne is treated medically first. Scarring is addressed after, with microneedling or resurfacing.",
        facts: [
          { k: "Consult", v: "Physician, 20 min" },
          { k: "Active acne", v: "OHIP-insured visit" },
          { k: "Scar treatment", v: "Uninsured, quoted at consult" },
          { k: "Series", v: "Typically 3 to 6" },
        ],
        tags: ["Medical first"],
        cta: "Book a consult",
        link: "Family Medicine",
        linkPage: "family",
      },
      {
        title: "A consult, no commitment",
        p: "Bring the concern. We assess skin, structure and lifestyle and suggest the lightest approach that fits, which may be skincare alone.",
        facts: [
          { k: "Consult", v: "Physician, 20 min" },
          { k: "Fee", v: "Complimentary" },
          { k: "Pressure", v: "None" },
          { k: "Plan", v: "Written, with prices" },
        ],
        tags: ["Consult"],
        cta: "Book a consult",
        link: "Our approach",
        linkPage: "about",
      },
    ],
    benefitsTitle: "Aesthetics inside a medical clinic.",
    benefits: [
      { big: "MD", t: "Physician assessed", d: "Every plan starts with a doctor, and injectables are physician-directed.", bg: "#F3ECF8" },
      { big: "$", t: "Prices before you decide", d: "A written plan with prices at the consult. No surprises.", bg: "#FFF3C4" },
      { big: "0", t: "Pressure", d: "Less is a valid recommendation and we make it often.", bg: "#EEF5FC" },
    ],
    pathTitle: "How a treatment plan comes together.",
    path: [
      { n: "1", time: "Visit 1", t: "Consult", d: "Skin assessment, medical history and photos for your file. You get a written plan with prices." },
      { n: "2", time: "Same day or later", t: "Treatment", d: "Start when you are ready. Many people treat at the consult; many wait." },
      { n: "3", time: "2 weeks", t: "Review", d: "Included. Small adjustments if needed." },
      { n: "4", time: "Ongoing", t: "Maintenance", d: "A schedule that fits your budget, reviewed by your physician." },
    ],
    faq: [
      { q: "Who does the injections?", a: "A physician or a registered nurse under physician direction, in a medical clinic." },
      { q: "Is a consult free?", a: "Yes. You leave with a written plan and prices, and no obligation." },
      { q: "How much does it cost?", a: "It depends on the plan. Prices are given in writing at your consult and include HST." },
      { q: "Will it look natural?", a: "We start conservatively and review at two weeks. You stay in control of how far to go." },
      { q: "Is any of this covered by OHIP?", a: "Medical treatment of active acne is. Cosmetic treatments are not, and receipts are provided." },
    ],
    closing: "A complimentary consult with a physician. Leave with a written plan and prices, and decide in your own time.",
  },

  rehab: {
    tint: "#FFF3C4",
    accent: "#B8860B",
    chooser: {
      eyebrow: "What happened?",
      title: "Tell us your situation.",
      intro: "Pick the closest match and see who you will work with, how billing works and what week one looks like.",
      options: [
        { label: "Sports or gym injury", sub: "Sprain, strain, overuse" },
        { label: "After surgery", sub: "Knee, hip, shoulder, spine" },
        { label: "Car accident", sub: "MVA claim" },
        { label: "Workplace injury", sub: "WSIB claim" },
        { label: "Desk and posture pain", sub: "Neck, back, headaches" },
      ],
    },
    results: [
      {
        title: "Sports injury rehab",
        p: "Assessment on day one, a home program the same day and hands-on treatment to get you back to the sport, not just out of pain.",
        facts: [
          { k: "Team", v: "Physiotherapist, kinesiologist" },
          { k: "First visit", v: "45 minutes" },
          { k: "Coverage", v: "Private insurance, direct billing" },
          { k: "Physician", v: "On site if imaging is needed" },
        ],
        tags: ["Physio", "Direct billing"],
        cta: "Book an assessment",
        link: "Pain Centre",
        linkPage: "pain",
      },
      {
        title: "Post-surgical rehab",
        p: "We follow your surgeon's protocol and report back. Progress is measured, not guessed.",
        facts: [
          { k: "Team", v: "Physiotherapist" },
          { k: "Bring", v: "Surgical report and protocol" },
          { k: "Coverage", v: "Private insurance, direct billing" },
          { k: "Frequency", v: "Usually 1 to 2 per week" },
        ],
        tags: ["Physio"],
        cta: "Book an assessment",
        link: "Meet the team",
        linkPage: "team",
      },
      {
        title: "Motor vehicle accident",
        p: "We open your claim, complete the OCF forms and coordinate physio, chiro and massage under one plan.",
        facts: [
          { k: "Team", v: "Physio, chiro, massage" },
          { k: "Paperwork", v: "We complete OCF forms" },
          { k: "Coverage", v: "Auto insurer, no upfront cost" },
          { k: "Physician", v: "Assessment on site" },
        ],
        tags: ["MVA", "No upfront cost"],
        cta: "Start an MVA claim",
        link: "Refer a patient",
        linkPage: "referrals",
      },
      {
        title: "WSIB return to work",
        p: "Approved WSIB provider. Treatment plus a graded return-to-work plan shared with your employer and case manager.",
        facts: [
          { k: "Team", v: "Physio, kinesiologist" },
          { k: "Paperwork", v: "We report to WSIB" },
          { k: "Coverage", v: "WSIB, no cost to you" },
          { k: "Goal", v: "Safe, staged return" },
        ],
        tags: ["WSIB"],
        cta: "Start a WSIB claim",
        link: "For referring doctors",
        linkPage: "referrals",
      },
      {
        title: "Desk and posture pain",
        p: "Neck, upper back and tension headaches from long hours seated. A mix of manual therapy, exercise and a desk setup review.",
        facts: [
          { k: "Team", v: "Physio, chiro, massage" },
          { k: "First visit", v: "45 minutes" },
          { k: "Coverage", v: "Private insurance, direct billing" },
          { k: "Homework", v: "A 10-minute daily routine" },
        ],
        tags: ["Physio", "Chiro"],
        cta: "Book an assessment",
        link: "Headache note",
        linkPage: "notes",
      },
    ],
    benefitsTitle: "Rehab with doctors down the hall.",
    benefits: [
      { big: "4", t: "Disciplines, one plan", d: "Physio, chiro, massage and kinesiology sharing a chart.", bg: "#FFF3C4" },
      { big: "MD", t: "Physician on site", d: "If you need imaging, an injection or a note, it happens here.", bg: "#FDE8E4" },
      { big: "$0", t: "Upfront for MVA and WSIB", d: "We bill the insurer directly and handle the forms.", bg: "#EEF5FC" },
    ],
    pathTitle: "Your first four weeks.",
    path: [
      { n: "1", time: "Day 1", t: "Assessment", d: "Movement, strength and history. You leave with a home program and a plan." },
      { n: "2", time: "Week 1 to 2", t: "Settle and mobilise", d: "Hands-on treatment and gentle loading. Pain and range are tracked each visit." },
      { n: "3", time: "Week 2 to 4", t: "Build", d: "Progressive strength and movement specific to your sport, job or life." },
      { n: "4", time: "Week 4", t: "Re-assess", d: "Measured against day one. Continue, taper or discharge with a maintenance plan." },
    ],
    faq: [
      { q: "Do I need a doctor's referral?", a: "No for private insurance and MVA. Some extended health plans ask for one to reimburse; check your plan." },
      { q: "Do you bill my insurance directly?", a: "Yes for most major insurers. Bring your card and we submit at the front desk." },
      { q: "How many visits will I need?", a: "It depends on the injury. Your therapist gives an estimate at the first visit and re-assesses at week four." },
      { q: "What should I wear?", a: "Clothing you can move in. Shorts for knee and hip, a tank top for shoulder and neck." },
      { q: "Can I see a doctor here too?", a: "Yes. Dr. Nguyen sees rehab patients for imaging, injections and notes without a second clinic." },
    ],
    closing: "One assessment, a home program the same day and a plan you can see progress against.",
  },
};

/** Infusion drip builder options. Add-ons have `mins` of 0. */
export const drips: Drip[] = [
  { name: "Hydration", desc: "Fluids and electrolytes", mins: 45, price: 150 },
  { name: "Vitamin blend", desc: "B vitamins, vitamin C, zinc", mins: 60, price: 200 },
  { name: "Recovery", desc: "Amino acids and electrolytes", mins: 60, price: 200 },
  { name: "Anti-nausea add-on", desc: "Added to any drip", mins: 0, price: 40 },
  { name: "Vitamin C add-on", desc: "Added to any drip", mins: 0, price: 40 },
  { name: "Iron (Venofer)", desc: "Requires physician assessment first", mins: 120, price: 400 },
];

/** Index of the drip that requires a physician assessment first (Iron). */
export const dripIronIndex = 5;

/** Drip builder helper copy. */
export const dripCopy = {
  empty: "Nothing selected yet. Tap a drip to build your visit.",
  note: "Includes a 10 minute nurse screening. Final price confirmed at your visit. HST included.",
  ironNote: "Iron requires an OHIP-insured physician assessment and bloodwork first. Times include a 10 minute screening.",
  /** Minutes added for the nurse screening when at least one drip is selected. */
  screeningMinutes: 10,
} as const;

/** Pain Centre body map hotspots (x, y in the illustration's coordinate space). */
export const bodySpots: BodySpot[] = [
  { label: "Head", short: "Head", x: 110, y: 32, optionIndex: 0 },
  { label: "Neck", short: "Neck", x: 110, y: 82, optionIndex: 1 },
  { label: "Shoulder", short: "Shldr", x: 40, y: 100, optionIndex: 2 },
  { label: "Upper back muscles", short: "Muscle", x: 160, y: 130, optionIndex: 3 },
  { label: "Low back", short: "Back", x: 110, y: 215, optionIndex: 1 },
  { label: "Hip", short: "Hip", x: 60, y: 270, optionIndex: 2 },
  { label: "Knee", short: "Knee", x: 155, y: 380, optionIndex: 2 },
  { label: "Nerve pain down a limb", short: "Nerve", x: 188, y: 250, optionIndex: 4 },
];

/** Medical Aesthetics treatment ladder, lightest first. */
export const aestheticsLadder: LadderRung[] = [
  {
    t: "Skincare and peels",
    tag: "No downtime",
    d: "Medical-grade skincare, light peels and sun protection. Often enough on its own.",
    facts: [
      { k: "Consult", v: "Nurse, 20 min" },
      { k: "Per visit", v: "From $150" },
      { k: "Cadence", v: "Monthly" },
    ],
    h: 300,
  },
  {
    t: "Skin treatments",
    tag: "1 to 3 days",
    d: "Microneedling and deeper peels for texture, tone and scarring. A short series.",
    facts: [
      { k: "Consult", v: "Physician, 20 min" },
      { k: "Per visit", v: "From $350" },
      { k: "Cadence", v: "4 to 6 weeks, 3 to 6 visits" },
    ],
    h: 360,
  },
  {
    t: "Injectables",
    tag: "Minimal",
    d: "Neuromodulators and fillers, physician-directed and conservatively dosed, with a two-week review.",
    facts: [
      { k: "Consult", v: "Physician, 20 min" },
      { k: "Quoted", v: "In writing at consult" },
      { k: "Review", v: "Included at 2 weeks" },
    ],
    h: 420,
  },
];

/** Rehab & Recovery coverage chooser. */
export const rehabCoverage: CoverageOption[] = [
  {
    label: "Private or work insurance",
    upfront: "$0 to co-pay",
    p: "We bill most major insurers directly at the desk. You pay only what your plan does not cover, if anything.",
    facts: [
      { k: "Bring", v: "Insurance card" },
      { k: "Referral", v: "Only if your plan requires" },
      { k: "Receipts", v: "Emailed same day" },
      { k: "Direct billing", v: "Most insurers" },
    ],
    cta: "Book an assessment",
  },
  {
    label: "Car accident (MVA)",
    upfront: "$0",
    p: "Your auto insurer covers treatment. We open the claim, complete the OCF forms and bill them directly.",
    facts: [
      { k: "Bring", v: "Claim number, insurer" },
      { k: "Forms", v: "We complete OCF-18 and 23" },
      { k: "Timing", v: "Start within days" },
      { k: "Physician", v: "Assessment on site" },
    ],
    cta: "Start an MVA claim",
  },
  {
    label: "Workplace injury (WSIB)",
    upfront: "$0",
    p: "Approved WSIB provider. Treatment and a graded return-to-work plan, reported to WSIB and your employer.",
    facts: [
      { k: "Bring", v: "Claim number" },
      { k: "Forms", v: "We report to WSIB" },
      { k: "Plan", v: "Return to work in stages" },
      { k: "Cost to you", v: "None" },
    ],
    cta: "Start a WSIB claim",
  },
  {
    label: "Paying myself",
    upfront: "From $95",
    p: "Clear per-visit prices, HST included, with a receipt you can claim later or use for a health spending account.",
    facts: [
      { k: "Physio assessment", v: "$120" },
      { k: "Physio follow-up", v: "$95" },
      { k: "Chiro / massage", v: "From $95" },
      { k: "Receipts", v: "Always" },
    ],
    cta: "Book an assessment",
  },
];

/** Infusion Therapy: clinic versus lounge comparison table. */
export const infusionCompareRows: CompareRow[] = [
  { k: "Who screens you", us: "Registered nurse, physician on site", them: "Often a nurse only" },
  { k: "Iron infusions", us: "Physician-reviewed bloodwork first", them: "Rarely offered" },
  { k: "If something goes wrong", us: "Doctor in the building", them: "Call 911" },
  { k: "Your records", us: "One chart with your family doctor", them: "Separate, if any" },
  { k: "Bloodwork", us: "Drawn on site, OHIP-insured", them: "Elsewhere, extra cost" },
];

/**
 * Closing band fallbacks per division (prototype `FOOT`). The division's own
 * `footCta` and `cta` win when set; these fill the gaps, then the generic pair.
 */
export const deepFootDefaults: Partial<Record<DivisionKey, { footCta: string; cta: string }>> = {
  infusion: { footCta: "Ready when you are.", cta: "Book a drip" },
};

export const deepFootFallback = { footCta: "Ready when you are.", cta: "Book an appointment" } as const;

/** Copy for the division deep-dive modules (prototype deep template). */
export const deepModuleCopy = {
  painHint: "Tap the figure, or pick from the list",
  painMapLabel: "Where it hurts",
  amIDue: {
    eyebrow: "Am I due?",
    title: "Two answers. See what screening applies to you.",
    iAm: "I am",
    sexes: ["Female", "Male"],
    age: "My age",
    ageMin: 18,
    ageMax: 85,
    ageDefault: 45,
    note: "Based on Ontario screening guidelines. Your doctor tailors these to your history.",
    coverage: "All OHIP-insured",
    cta: "Book a checkup and catch up",
  },
  compare: { title: "A medical clinic, not a drip bar.", us: "Restoration Medical", them: "Typical IV lounge" },
  ladder: { eyebrow: "How we think", title: "Lightest option first. Step up only if you want to.", note: "Tap a rung to see what it involves. Most people start on the first.", step: "Step" },
  coverage: { eyebrow: "What will I pay?", title: "Pick how you are covered.", payLabel: "You pay at the desk" },
  handoff: {
    eyebrow: "The full menu lives on its own site",
    title: "Drips, shots, ingredients and pricing.",
    p: "Our Infusion Therapy site has every drip and shot, the ingredient library, pricing and memberships, and a journal. Same physicians, same nurses, same booking.",
    cta: "Explore the Infusion site",
    cta2: "Book a consult",
  },
} as const;

/** "Am I due?" result title (prototype `famDueTitle`). */
export function amIDueTitle(count: number, age: number): string {
  return `${count} things to keep up with at ${age}`;
}

/**
 * Build-your-own-drip picker. The prototype defines the state (`drips`,
 * `dripTime`, `dripTotal`, `dripNote`) but no markup, so this heading copy
 * was written for the composed section.
 */
export const dripBuilderCopy = {
  eyebrow: "Build your own drip",
  title: "Pick what goes in, see the time and the price.",
  intro: "Tap the drips and add-ons you want. We add the nurse screening and show the total before you book.",
  summary: "Your visit",
  time: "Time",
  total: "Total",
  addOn: "Add-on",
  cta: "Book a consult",
} as const;
