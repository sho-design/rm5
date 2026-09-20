import type { PathStep, QA, SubChooserItem, TintCard } from "./types";
import { images } from "./images";

/** Hero photos for the Family Medicine sub-pages (index into the family service photo set). */
export const subpageHero = {
  chronic: images.services.family[1],
  women: images.services.family[3],
  men: images.services.family[4],
  blood: images.services.family[5],
  kids: images.services.family[2],
} as const;

/* ---------------------------------------------------------------- Women’s health */

export const womenOptions: SubChooserItem[] = [
  {
    label: "Routine screening",
    sub: "Pap, breast, bloodwork",
    tags: ["Pap test", "Breast screening", "Bloodwork"],
    title: "The checks that fit your age.",
    p: "Cervical screening every three years from 25, a mammogram requisition every two years from 40, and bloodwork on site. We track what is due so you do not have to.",
    facts: [
      { k: "Time", v: "20 minutes" },
      { k: "Coverage", v: "OHIP" },
      { k: "Bring", v: "Health card, last Pap date if known" },
      { k: "Results", v: "Within two weeks, by phone or portal" },
    ],
    cta: "Book a screening visit",
  },
  {
    label: "Contraception",
    sub: "Pill, IUD, implant",
    tags: ["Prescription", "IUD insertion", "Follow-up"],
    title: "The option that fits your life, not a default.",
    p: "We go through pill, patch, ring, injection, IUD and implant, side effects and cost. IUDs are inserted in clinic with a follow-up check at six weeks.",
    facts: [
      { k: "Time", v: "15 to 30 minutes" },
      { k: "Coverage", v: "Visit OHIP; device or prescription varies" },
      { k: "Also", v: "Emergency contraception, same day" },
      { k: "Privacy", v: "Confidential, any age" },
    ],
    cta: "Book a contraception visit",
  },
  {
    label: "Planning a pregnancy",
    sub: "Before and early",
    tags: ["Preconception", "Prenatal", "Bloodwork"],
    title: "A plan before the test turns positive.",
    p: "Folic acid, vaccines, medication review and a baseline set of bloodwork. Once pregnant, we confirm, order first-trimester tests and arrange obstetric care with you.",
    facts: [
      { k: "Time", v: "20 minutes" },
      { k: "Coverage", v: "OHIP" },
      { k: "Bring", v: "Medication list, cycle dates" },
      { k: "Then", v: "Referral to obstetrics or midwifery by 12 weeks" },
    ],
    cta: "Book a planning visit",
  },
  {
    label: "Periods and pelvic pain",
    sub: "Heavy, painful, irregular",
    tags: ["Assessment", "Iron check", "Ultrasound"],
    title: "Heavy or painful periods are worth a visit.",
    p: "We look for the cause, check iron stores and arrange an ultrasound when needed. Low iron from heavy periods is common and treatable, including infusion when tablets are not enough.",
    facts: [
      { k: "Time", v: "20 minutes" },
      { k: "Coverage", v: "OHIP" },
      { k: "Bloodwork", v: "Ferritin and hemoglobin, on site" },
      { k: "Next", v: "Iron therapy or gynecology referral as needed" },
    ],
    cta: "Book an assessment",
  },
  {
    label: "Perimenopause and menopause",
    sub: "40s and beyond",
    tags: ["Symptoms", "Hormone therapy", "Bone health"],
    title: "Symptoms are real and there are options.",
    p: "Sleep, mood, hot flashes, cycle changes. We talk through hormone and non-hormone options, check bone health and heart risk, and revisit the plan each year.",
    facts: [
      { k: "Time", v: "30 minutes" },
      { k: "Coverage", v: "OHIP" },
      { k: "Bring", v: "A note of symptoms and timing" },
      { k: "Also", v: "Bone density requisition at 65 or earlier" },
    ],
    cta: "Book a menopause visit",
  },
];

export const womenScreen: TintCard[] = [
  { t: "Cervical screening", d: "Pap test every 3 years for anyone with a cervix, 25 to 69.", meta: "From 25", bg: "#FDE8E4" },
  { t: "Breast screening", d: "Mammogram every 2 years. We give you the requisition; the scan is at an OBSP site.", meta: "40 to 74", bg: "#FFF3C4" },
  { t: "Colon screening", d: "FIT stool test every 2 years, done at home and dropped at a lab.", meta: "50 to 74", bg: "#E6F4EA" },
  { t: "Bone density", d: "One scan at 65, earlier with risk factors or early menopause.", meta: "At 65", bg: "#EEF5FC" },
];

export const womenFaq: QA[] = [
  { q: "Can I ask for a female physician?", a: "Yes. Tell us when booking. Both physicians provide women’s health care, and a female nurse is present for examinations if you prefer." },
  { q: "Do I still need a Pap if I have had the HPV vaccine?", a: "Yes. The vaccine covers the most common strains, not all. Screening every three years from 25 continues." },
  { q: "Do you insert IUDs in clinic?", a: "Yes. A first visit to choose and prescribe, an insertion visit, and a check at six weeks." },
  { q: "Do you follow pregnancies?", a: "We confirm the pregnancy, order first-trimester tests and care for you until you are settled with obstetrics or midwifery, then stay your family doctor throughout." },
  { q: "Is menopause hormone therapy safe?", a: "For many women it is a reasonable option; for some it is not. We go through your history and decide together, and review yearly." },
];

/* ------------------------------------------------------------------ Men’s health */

export const menOptions: SubChooserItem[] = [
  {
    label: "Yearly checkup",
    sub: "The full review",
    tags: ["Blood pressure", "Bloodwork", "Screening"],
    title: "Twenty minutes that cover the year.",
    p: "Blood pressure, weight, medications, mood and sleep, plus bloodwork drawn on the way out. Screening is added by age: cholesterol and sugars from 40, colon screening from 50, and a prostate conversation when you want one.",
    facts: [
      { k: "Time", v: "20 minutes" },
      { k: "Coverage", v: "OHIP" },
      { k: "Bloodwork", v: "Same visit, on site" },
      { k: "Results", v: "About a week" },
    ],
    cta: "Book a checkup",
  },
  {
    label: "Heart and metabolic",
    sub: "Pressure, cholesterol, sugar",
    tags: ["Blood pressure", "Cholesterol", "A1c"],
    title: "The numbers that matter most after 40.",
    p: "Blood pressure at every visit, fasting cholesterol and A1c every three to five years, sooner with family history. If a number is off we explain it plainly and agree a plan.",
    facts: [
      { k: "Time", v: "15 minutes plus draw" },
      { k: "Fasting", v: "Yes, book before 10am" },
      { k: "Coverage", v: "OHIP" },
      { k: "Related", v: "Know your numbers page" },
    ],
    cta: "Book bloodwork",
  },
  {
    label: "Prostate and urinary",
    sub: "50 and up, or symptoms",
    tags: ["PSA conversation", "Symptoms", "Referral"],
    title: "A conversation first, a test if you want it.",
    p: "PSA screening has trade-offs, so we talk it through before ordering. Urinary symptoms, getting up at night or changes in flow are assessed at any age.",
    facts: [
      { k: "Time", v: "15 minutes" },
      { k: "Coverage", v: "OHIP; PSA is a small lab fee unless symptomatic" },
      { k: "Bring", v: "Family history of prostate cancer" },
      { k: "Next", v: "Urology referral when needed" },
    ],
    cta: "Book a visit",
  },
  {
    label: "Energy, mood and sleep",
    sub: "Feeling off",
    tags: ["Assessment", "Bloodwork", "Plan"],
    title: "Tired, flat or not sleeping deserves a proper look.",
    p: "We check thyroid, iron, sugars and testosterone where it fits, and talk about stress, alcohol and sleep without judgment. A plan follows the results, not a guess.",
    facts: [
      { k: "Time", v: "30 minutes" },
      { k: "Coverage", v: "OHIP" },
      { k: "Bloodwork", v: "On site, same visit" },
      { k: "Follow-up", v: "Two weeks, with results" },
    ],
    cta: "Book an assessment",
  },
  {
    label: "Sexual health",
    sub: "Testing and treatment",
    tags: ["STI testing", "Erectile function", "Confidential"],
    title: "Confidential, routine and quick.",
    p: "STI testing with results by phone, erectile difficulty assessed as the health signal it often is, and vaccines such as HPV and hepatitis B where indicated.",
    facts: [
      { k: "Time", v: "15 minutes" },
      { k: "Coverage", v: "OHIP" },
      { k: "Privacy", v: "Results shared only with you" },
      { k: "Also", v: "Partner testing arranged" },
    ],
    cta: "Book a confidential visit",
  },
];

export const menDecades: TintCard[] = [
  { t: "In your 20s and 30s", d: "Blood pressure, weight, mood, sexual health and vaccines. A baseline so later changes are obvious.", meta: "Checkup every 2 to 3 years", bg: "#EEF5FC" },
  { t: "In your 40s", d: "Fasting cholesterol and A1c begin. Family history of heart disease or diabetes moves this earlier.", meta: "Yearly checkup", bg: "#FFF3C4" },
  { t: "In your 50s", d: "Colon screening starts. A conversation about PSA testing, your call. Eye pressure and hearing if not done.", meta: "Yearly checkup", bg: "#E6F4EA" },
  { t: "65 and beyond", d: "Shingles and pneumonia vaccines, an ultrasound for aortic aneurysm if you have ever smoked, balance and strength.", meta: "Yearly checkup", bg: "#FDE8E4" },
];

export const menFaq: QA[] = [
  { q: "I feel fine. Do I need a checkup?", a: "Blood pressure, cholesterol and sugars rarely feel like anything until they have done damage. A checkup finds them while they are easy to fix." },
  { q: "Should I get a PSA test?", a: "It depends on your age, family history and how you weigh false alarms against early detection. We talk it through and you decide." },
  { q: "Can bloodwork be done the same day?", a: "Yes. Our technician draws on site during clinic hours. Fasting tests are best before 10am." },
  { q: "Do you test testosterone?", a: "When symptoms suggest it. Low energy usually has other causes, so we test broadly first, with testosterone drawn in the morning if indicated." },
  { q: "Is everything confidential?", a: "Yes. Results go to you and your chart only. Nothing is shared with employers, insurers or family without your consent." },
];

/* -------------------------------------------------------------- Bloodwork and ECG */

export const bloodOptions: SubChooserItem[] = [
  {
    label: "Fasting bloodwork",
    sub: "Cholesterol, sugars",
    tags: ["Fast 8 to 12 hours", "Before 10am", "On site"],
    title: "Nothing to eat after midnight, water is fine.",
    p: "Cholesterol, fasting glucose and some other tests need an empty stomach. Book a slot before 10am, drink water, take your usual medications unless your doctor said otherwise.",
    facts: [
      { k: "Fast", v: "8 to 12 hours, water allowed" },
      { k: "Time", v: "10 minutes" },
      { k: "Results", v: "About a week" },
      { k: "Coverage", v: "OHIP" },
    ],
    cta: "Book a fasting draw",
  },
  {
    label: "Routine, no fasting",
    sub: "Iron, thyroid, blood count",
    tags: ["Any time of day", "On site"],
    title: "Come as you are, any time we are open.",
    p: "Ferritin, hemoglobin, thyroid, kidney and liver panels and most vitamin levels do not need fasting. If your requisition mixes fasting and non-fasting tests, fast and come early.",
    facts: [
      { k: "Fast", v: "No" },
      { k: "Time", v: "10 minutes" },
      { k: "Results", v: "About a week" },
      { k: "Coverage", v: "OHIP" },
    ],
    cta: "Book a blood draw",
  },
  {
    label: "Before an iron infusion",
    sub: "Ferritin and hemoglobin",
    tags: ["No fasting", "Physician reviewed"],
    title: "The test that decides whether infusion fits.",
    p: "A ferritin and hemoglobin check drawn here, reviewed by our physician within days. If iron is low and tablets are not right for you, the infusion is booked from the same chart.",
    facts: [
      { k: "Fast", v: "No" },
      { k: "Time", v: "10 minutes" },
      { k: "Results", v: "2 to 3 days" },
      { k: "Next", v: "Iron therapy visit if indicated" },
    ],
    cta: "Book an iron check",
  },
  {
    label: "ECG (heart tracing)",
    sub: "Palpitations, blood pressure, clearance",
    tags: ["No fasting", "10 minutes", "Physician read"],
    title: "A 10-lead ECG, done in the next room.",
    p: "Ordered for palpitations, chest discomfort, blood pressure follow-up, medication monitoring or pre-operative clearance. Small stickers on the chest, arms and legs record the heart rhythm for a few seconds. Our physician reads it the same day and calls if anything needs attention.",
    facts: [
      { k: "Prep", v: "None; avoid chest lotion, wear an easy top" },
      { k: "Time", v: "About 10 minutes" },
      { k: "Results", v: "Same day, physician read" },
      { k: "Coverage", v: "OHIP when medically ordered" },
    ],
    cta: "Book an ECG",
  },
  {
    label: "Outside requisition",
    sub: "From another doctor",
    tags: ["Bring the paper", "Results to them"],
    title: "Yes, we draw for other doctors too.",
    p: "Bring the requisition from your specialist or another clinic. We draw it here and results go to the ordering doctor. Call ahead so we can confirm the tests are ones we can process.",
    facts: [
      { k: "Bring", v: "Requisition and health card" },
      { k: "Time", v: "10 minutes" },
      { k: "Results", v: "Sent to the ordering doctor" },
      { k: "Coverage", v: "As per the requisition" },
    ],
    cta: "Call to confirm",
  },
  {
    label: "Children",
    sub: "Small arms, steady hands",
    tags: ["Numbing cream", "Parent stays"],
    title: "Gentle draws for kids.",
    p: "A parent stays in the room, numbing cream is available if you ask when booking, and our technician is used to small veins. Bring a snack for afterwards.",
    facts: [
      { k: "Fast", v: "Rarely; we will tell you" },
      { k: "Time", v: "15 minutes" },
      { k: "Results", v: "About a week" },
      { k: "Coverage", v: "OHIP" },
    ],
    cta: "Book a child blood draw",
  },
];

export const bloodPath: PathStep[] = [
  { n: "1", time: "At the visit", t: "Your doctor writes the requisition", d: "Or you bring one from another clinic. We check which tests need fasting." },
  { n: "2", time: "Same day or booked", t: "Sit down with the technician", d: "Down the hall. Health card checked, arm cleaned, usually one tube or a few. If an ECG is ordered, it is done in the same room right after." },
  { n: "3", time: "About a week", t: "Results reach your doctor", d: "Urgent results are called the same day. Everything else is reviewed at the follow-up." },
  { n: "4", time: "Follow-up", t: "Every number explained", d: "By phone, portal or in person. What it means and what, if anything, changes." },
];

export const bloodTips: TintCard[] = [
  { t: "Drink water", d: "Well hydrated veins are easier to find. Water is allowed even when fasting.", meta: "Morning of", bg: "#E6F4EA" },
  { t: "Take your medications", d: "Unless your doctor said to hold one for the test. Ask if unsure.", meta: "As usual", bg: "#EEF5FC" },
  { t: "Wear loose sleeves", d: "A sleeve that rolls above the elbow saves fiddling.", meta: "Small thing, helps", bg: "#FFF3C4" },
  { t: "Say if you faint", d: "We have you lie down and take it slowly. No judgment, it is common.", meta: "Tell the technician", bg: "#FDE8E4" },
];

export const bloodFaq: QA[] = [
  { q: "Do I need an appointment?", a: "Booking is best so the technician is free. Patients seen the same day are usually drawn right after their visit." },
  { q: "How long until results?", a: "Most within a week. Urgent values are phoned the same day. Your doctor reviews everything before it reaches you." },
  { q: "Is it covered?", a: "Tests ordered for medical reasons are covered by OHIP. A few, such as vitamin D or PSA without symptoms, carry a small provincial fee we tell you about beforehand." },
  { q: "Can I see my own results?", a: "Yes, through the patient portal once your doctor has reviewed them, or at the follow-up." },
  { q: "Do you draw for other clinics?", a: "Yes, with the paper requisition. Results go to the doctor who ordered them." },
  { q: "Is the ECG covered by OHIP?", a: "Yes, when a physician orders it for a medical reason. ECGs for insurance, employment or fitness certificates are uninsured; the fee is told to you before the test." },
  { q: "How do I prepare for an ECG?", a: "Nothing special. Wear a top that is easy to remove and skip lotion on the chest that morning so the stickers hold. It takes about ten minutes and does not hurt." },
];

/* ------------------------------------------------------------------- Chronic care */

export const chronicOptions: SubChooserItem[] = [
  {
    label: "Diabetes and prediabetes",
    sub: "A1c, kidneys, eyes, feet",
    tags: ["A1c every 3 months", "Foot check", "Eye referral"],
    title: "Steady numbers, fewer surprises.",
    p: "A1c and kidney bloodwork drawn here every three to six months, blood pressure and cholesterol managed alongside, feet checked yearly, eye exam referral arranged. Medication is adjusted in small steps and explained each time. Pharmacist review available for complex regimens.",
    facts: [
      { k: "Visits", v: "Every 3 months, 20 minutes" },
      { k: "Bloodwork", v: "A1c, kidney, lipids, on site" },
      { k: "Coverage", v: "OHIP; test strips through ODB or your plan" },
      { k: "Also", v: "Diabetes education referral" },
    ],
    cta: "Book a diabetes review",
  },
  {
    label: "Blood pressure",
    sub: "Hypertension",
    tags: ["Home readings", "Kidney check", "ECG on site"],
    title: "The quiet number we watch closely.",
    p: "We confirm with home or 24-hour readings before treating, check kidneys and an ECG here, and adjust medication until you are consistently at target. Salt, sleep, alcohol and movement come up every visit because they move the number as much as pills.",
    facts: [
      { k: "Visits", v: "Every 3 to 6 months once stable" },
      { k: "Bring", v: "Two weeks of home readings" },
      { k: "On site", v: "ECG and bloodwork same visit" },
      { k: "Coverage", v: "OHIP" },
    ],
    cta: "Book a pressure check",
  },
  {
    label: "Asthma and COPD",
    sub: "Breathing",
    tags: ["Action plan", "Inhaler technique", "Spirometry referral"],
    title: "Breathe easier with a plan you can follow.",
    p: "A written action plan for good days, bad days and emergencies, inhaler technique checked in person, flu and pneumonia vaccines kept current. Spirometry is arranged when the diagnosis needs confirming or the picture changes.",
    facts: [
      { k: "Visits", v: "Every 6 months, sooner in flare season" },
      { k: "Bring", v: "All inhalers, used or not" },
      { k: "Coverage", v: "OHIP" },
      { k: "Vaccines", v: "Flu yearly, pneumonia once" },
    ],
    cta: "Book a breathing review",
  },
  {
    label: "Thyroid",
    sub: "Under or over active",
    tags: ["TSH monitoring", "Dose adjustments", "No fasting"],
    title: "Small gland, small dose changes.",
    p: "TSH checked six to eight weeks after any dose change, then yearly once stable. Symptoms of fatigue, weight or mood are reviewed against the numbers, not guessed at. Nodules and goitre are assessed with ultrasound when needed.",
    facts: [
      { k: "Visits", v: "Yearly when stable" },
      { k: "Bloodwork", v: "TSH, free T4, on site" },
      { k: "Coverage", v: "OHIP" },
      { k: "Next", v: "Endocrinology referral for complex cases" },
    ],
    cta: "Book a thyroid review",
  },
  {
    label: "Heart and cholesterol",
    sub: "After a stent, or high risk",
    tags: ["Lipids", "ECG", "Medication review"],
    title: "Keeping the plan going after the cardiologist.",
    p: "Statin and blood pressure targets held, lipids drawn here, ECG when symptoms change. We share care with your cardiologist so nothing falls between the two offices, and we hold the whole medication list.",
    facts: [
      { k: "Visits", v: "Every 6 months" },
      { k: "On site", v: "Lipids, ECG" },
      { k: "Coverage", v: "OHIP" },
      { k: "Also", v: "Rehab and exercise plan down the hall" },
    ],
    cta: "Book a heart review",
  },
  {
    label: "Kidney disease",
    sub: "CKD stages 1 to 3",
    tags: ["eGFR tracking", "Medication safety", "Nephrology referral"],
    title: "Watching the trend, protecting what is left.",
    p: "eGFR and urine protein tracked over time, blood pressure and sugars tightened, medications that strain the kidneys flagged or swapped. Referral to nephrology when the stage or the slope calls for it.",
    facts: [
      { k: "Visits", v: "Every 6 months" },
      { k: "Bloodwork", v: "eGFR, urine ACR, on site" },
      { k: "Coverage", v: "OHIP" },
      { k: "Avoid", v: "We review anti-inflammatories and supplements" },
    ],
    cta: "Book a kidney review",
  },
  {
    label: "Several at once",
    sub: "Complex care",
    tags: ["One longer visit", "Medication list", "Care plan"],
    title: "One appointment for everything, not five.",
    p: "If you live with three or more conditions, we book a longer visit, reconcile every medication with the pharmacy, set targets that fit together, and write a single care plan you and your family can read. Chronic pain is coordinated with the Pain Centre down the hall.",
    facts: [
      { k: "Visits", v: "30 to 40 minutes, then quarterly" },
      { k: "Bring", v: "Every bottle and supplement" },
      { k: "Coverage", v: "OHIP" },
      { k: "Also", v: "Family member welcome in the room" },
    ],
    cta: "Book a care plan visit",
  },
];

export const chronicRhythm: PathStep[] = [
  { n: "1", time: "First visit", t: "Full picture", d: "History, every medication, bloodwork and ECG on site. We agree on targets and how often to meet." },
  { n: "2", time: "Every 3 to 6 months", t: "Review visit", d: "Numbers checked against targets, medication adjusted in small steps, one thing to work on until next time." },
  { n: "3", time: "Between visits", t: "Recall and refills", d: "Bloodwork reminders before the visit so results are ready. Refills without a visit when you are stable." },
  { n: "4", time: "Yearly", t: "Annual review", d: "Vaccines, screening, feet, eyes, kidneys and a fresh look at whether the plan still fits your life." },
];

export const chronicVsPain: TintCard[] = [
  { t: "Chronic care is", d: "Long-term management of a condition: diabetes, blood pressure, asthma, thyroid, heart, kidney. Your family doctor, ongoing, OHIP.", bg: "#EEF5FC", link: "This page", page: "chronic" },
  { t: "The Pain Centre is", d: "Procedures for pain itself: image-guided injections, nerve blocks, medication review. A pain physician, by referral, OHIP for most procedures.", bg: "#FDE8E4", link: "Pain Centre", page: "pain" },
  { t: "Both, if", d: "You have chronic back or joint pain alongside another condition. Your family doctor refers down the hall and keeps the rest of the plan. One chart.", bg: "#FFF3C4", link: "How referrals work", page: "referrals" },
];

export const chronicFaq: QA[] = [
  { q: "How often will I need to come in?", a: "Every three to six months once stable, more often when starting or changing medication. Bloodwork is timed the week before so results are ready." },
  { q: "Can I get refills without a visit?", a: "Yes, when your condition is stable and you have been seen within the review period. Ask the pharmacy to fax us or request through the portal." },
  { q: "Do you work with my specialist?", a: "Yes. We send notes both ways and hold the full medication list. If two plans conflict, we sort it out before you are caught in the middle." },
  { q: "Is chronic care covered by OHIP?", a: "Yes. Visits, bloodwork and ECG are insured. Some medications and supplies depend on your drug plan or the Ontario Drug Benefit." },
  { q: "What about chronic pain?", a: "Chronic pain is coordinated with the Pain Centre down the hall. Your family doctor refers you, the pain physician does procedures, and everything stays in one chart." },
  { q: "Can family come to the visit?", a: "Yes. For complex care we encourage it. A second set of ears helps, and Vietnamese-speaking staff can join." },
];
