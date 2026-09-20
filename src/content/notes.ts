import type { HealthNote } from "./types";
import { images } from "./images";

/**
 * Health notes (CMS collection). Order matches the prototype: the first
 * three appear on the home page.
 */
export const healthNotes: HealthNote[] = [
  {
    slug: "iron-infusion",
    division: "Infusion Therapy",
    title: "What to expect at an iron infusion",
    dek: "How the visit runs, how long it takes and what to do afterwards.",
    author: "Dr. Johnny Nguyen",
    date: "Sep 2026",
    readMinutes: 3,
    img: images.notes["iron-infusion"],
    ctaTitle: "Think you may be low in iron?",
    ctaSub: "Start with bloodwork on site and a physician review.",
    ctaPage: "iron",
    body: [
      {
        type: "p",
        text: "An iron infusion delivers iron directly into your bloodstream through a small IV. It is offered when iron tablets are not tolerated, not absorbed well, or when levels need to come up sooner than tablets allow.",
      },
      { type: "h", text: "Before your visit" },
      {
        type: "p",
        text: "You will need recent bloodwork showing your ferritin and hemoglobin. If you do not have it, we can draw it on site. Eat normally and drink water beforehand. Wear a top with sleeves that roll up easily.",
      },
      { type: "h", text: "During the infusion" },
      {
        type: "p",
        text: "A nurse places the IV, checks your vital signs and starts the infusion. Depending on the product, the infusion itself takes 15 to 60 minutes, and we observe you for 30 minutes afterwards. Bring something to read.",
      },
      { type: "h", text: "Afterwards" },
      {
        type: "p",
        text: "Most people go back to their day. Mild headache, flushing or muscle aches can occur for a day or two. Call us if you notice a rash, swelling, chest tightness or trouble breathing, or go to the nearest emergency department. Repeat bloodwork is usually done 4 to 8 weeks later.",
      },
    ],
  },
  {
    slug: "flu-shot-faq",
    division: "Family Medicine",
    title: "Flu shot questions, answered",
    dek: "Who should get one, when to book and what to expect after.",
    author: "Dr. Joseph Truong",
    date: "Sep 2026",
    readMinutes: 2,
    img: images.notes["flu-shot-faq"],
    ctaTitle: "Flu shots from October",
    ctaSub: "Book a short visit or add it to your next appointment.",
    ctaPage: "family",
    body: [
      {
        type: "p",
        text: "Ontario recommends a yearly flu shot for everyone six months and older. It is especially important for young children, adults over 65, pregnant people and anyone with a chronic condition.",
      },
      { type: "h", text: "When to book" },
      {
        type: "p",
        text: "Vaccine typically arrives in October. Protection takes about two weeks to build, so booking in October or November covers the peak season.",
      },
      { type: "h", text: "What to expect" },
      {
        type: "p",
        text: "A sore arm for a day or two is common. Some people feel tired or have a mild fever for a day. These are signs your immune system is responding, not the flu itself. The shot cannot give you the flu.",
      },
      { type: "h", text: "Who should wait" },
      {
        type: "p",
        text: "If you have a fever on the day, we will ask you to rebook. If you have had a serious allergic reaction to a previous flu shot, tell us before booking so the physician can advise.",
      },
    ],
  },
  {
    slug: "headache-when-to-see",
    division: "Pain Centre",
    title: "When a headache needs a doctor",
    dek: "Most headaches are not dangerous. These signs mean you should be seen.",
    author: "Dr. Johnny Nguyen",
    date: "Aug 2026",
    readMinutes: 3,
    img: images.notes["headache-when-to-see"],
    ctaTitle: "Recurring headaches?",
    ctaSub: "A physician assessment can identify the type and a plan.",
    ctaPage: "pain",
    body: [
      {
        type: "p",
        text: "Tension headaches and migraines are common and usually manageable. A small number of headaches need urgent attention.",
      },
      { type: "h", text: "Go to emergency or call 911 if" },
      {
        type: "p",
        text: "The headache is sudden and the worst of your life, follows a head injury, comes with fever and a stiff neck, weakness or numbness on one side, confusion, trouble speaking or a seizure.",
      },
      { type: "h", text: "Book a visit if" },
      {
        type: "p",
        text: "Headaches are becoming more frequent or severe, you are taking pain relievers more than two days a week, they wake you from sleep, or they started after age 50.",
      },
      { type: "h", text: "What we do" },
      {
        type: "p",
        text: "Your physician takes a detailed history, examines you and may order imaging. Depending on the diagnosis, options include lifestyle changes, medication, nerve blocks or referral to a neurologist.",
      },
    ],
  },
  {
    slug: "nerve-block-prep",
    division: "Pain Centre",
    title: "Preparing for a nerve block",
    dek: "A short checklist for the day before and the day of your procedure.",
    author: "Dr. Johnny Nguyen",
    date: "Jul 2026",
    readMinutes: 2,
    img: images.notes["nerve-block-prep"],
    ctaTitle: "Referred for a nerve block?",
    ctaSub: "Send us the referral and we will call to book.",
    ctaPage: "pain",
    body: [
      {
        type: "p",
        text: "A nerve block is an image-guided injection of local anesthetic, sometimes with a steroid, around a specific nerve. It is used both to diagnose the source of pain and to treat it.",
      },
      { type: "h", text: "The day before" },
      {
        type: "p",
        text: "Tell us about blood thinners, diabetes medication or allergies to contrast or local anesthetic. Do not stop any medication unless the physician tells you to. Arrange a ride home.",
      },
      { type: "h", text: "The day of" },
      {
        type: "p",
        text: "Eat a light meal. Wear loose clothing. The procedure takes 15 to 30 minutes and you will rest afterwards for a short observation period.",
      },
      { type: "h", text: "After" },
      {
        type: "p",
        text: "Numbness in the area is expected for a few hours. Avoid driving that day. Keep a simple pain diary for the next two weeks so we can judge how well the block worked.",
      },
    ],
  },
  {
    slug: "reading-requisition",
    division: "Family Medicine",
    title: "How to read your lab requisition",
    dek: "What the boxes mean, fasting rules and how results reach you.",
    author: "Dr. Joseph Truong",
    date: "Jun 2026",
    readMinutes: 2,
    img: images.notes["reading-requisition"],
    ctaTitle: "Bloodwork on site",
    ctaSub: "Our lab technician draws most requisitions in clinic.",
    ctaPage: "family",
    body: [
      {
        type: "p",
        text: "A requisition is the form your doctor fills out to order blood or urine tests. Each ticked box is one test or panel.",
      },
      { type: "h", text: "Fasting" },
      {
        type: "p",
        text: "If fasting is required it is marked on the form. Fasting means nothing to eat or drink except water for 8 to 12 hours. Take regular medication unless told otherwise.",
      },
      { type: "h", text: "Where to go" },
      {
        type: "p",
        text: "Most tests on the form can be drawn at our Thornhill clinic by our lab technician. Bring your health card and the form.",
      },
      { type: "h", text: "Results" },
      {
        type: "p",
        text: "Results return to your physician within a few days. We contact you if anything needs follow-up. You can also book a results visit if you want to go through them together.",
      },
    ],
  },
  {
    slug: "blood-pressure-at-home",
    division: "Family Medicine",
    title: "Taking your blood pressure at home",
    dek: "A simple routine that gives your doctor numbers worth acting on.",
    author: "Dr. Johnny Nguyen",
    coAuthor: "with a TMU medical learner",
    date: "Sep 2026",
    readMinutes: 2,
    // No dedicated photo in the prototype; it falls back to the division image.
    img: images.division.family,
    ctaTitle: "Living with high blood pressure?",
    ctaSub: "Chronic care visits include a review of your home readings.",
    ctaPage: "family",
    body: [
      {
        type: "p",
        text: "Clinic readings are a snapshot. Home readings, taken the same way each time, show the pattern your doctor actually needs.",
      },
      { type: "h", text: "The routine" },
      {
        type: "p",
        text: "Sit quietly for five minutes, feet flat, back supported, arm resting at heart level. Take two readings one minute apart, morning and evening, for seven days. Skip the first day when averaging.",
      },
      { type: "h", text: "The cuff" },
      {
        type: "p",
        text: "Use an upper-arm cuff validated by Hypertension Canada. Wrist cuffs are less reliable. Bring your device to a visit once so we can check it against ours.",
      },
      { type: "h", text: "What to bring" },
      {
        type: "p",
        text: "The seven-day log, on paper or in your phone. If the average is 135 over 85 or higher, book a visit. Readings above 180 over 110 with headache, chest pain or vision changes need emergency care.",
      },
    ],
  },
  {
    slug: "physio-first-visit",
    division: "Rehab & Recovery",
    title: "Your first physiotherapy visit",
    dek: "What the assessment covers and what to bring.",
    author: "Dr. Johnny Nguyen",
    date: "May 2026",
    readMinutes: 2,
    img: images.notes["physio-first-visit"],
    ctaTitle: "Start rehab",
    ctaSub: "Book an initial assessment with our rehab team.",
    ctaPage: "rehab",
    body: [
      {
        type: "p",
        text: "The first visit is mostly assessment. Your physiotherapist asks about your history, watches how you move and tests strength and range of motion.",
      },
      { type: "h", text: "What to bring" },
      {
        type: "p",
        text: "Comfortable clothing you can move in, any imaging reports, and your insurance details if you plan to claim.",
      },
      { type: "h", text: "What you leave with" },
      {
        type: "p",
        text: "A clear explanation of what is going on, a home exercise plan and a proposed schedule. Most plans are reviewed every few visits and adjusted as you progress.",
      },
    ],
  },
];

/** Filter chips on the notes index ("All" plus the five service lines). */
export const noteFilters = ["All", "Family Medicine", "Pain Centre", "Infusion Therapy", "Medical Aesthetics", "Rehab & Recovery"];

export const notesByDivision = (label: string): HealthNote[] =>
  label === "All" ? healthNotes : healthNotes.filter((n) => n.division === label);

export const noteBySlug = (slug: string): HealthNote | undefined => healthNotes.find((n) => n.slug === slug);

/** Author byline as displayed ("Dr. Johnny Nguyen, with a TMU medical learner"). */
export const noteByline = (n: HealthNote): string => (n.coAuthor ? n.author + ", " + n.coAuthor : n.author);
