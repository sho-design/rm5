import type { PathStep, QA, SubChooserItem, TintCard } from "./types";

/** Age band chooser entry. `immIndex` selects the matching immunization tab. */
export interface KidsAge extends SubChooserItem {
  immIndex: number;
}

export interface Vaccine {
  n: string;
  d: string;
}

/** One tab of the Ontario routine immunization schedule (prototype `IMM`). */
export interface ImmunizationStage {
  label: string;
  title: string;
  where: string;
  shots: Vaccine[];
  note: string;
}

export interface KidsDoctor {
  name: string;
  role: string;
  initial: string;
  bg: string;
  p: string;
  tags: string[];
}

/** "When your child is sick" triage column. */
export interface KidsSickCard {
  tag: string;
  t: string;
  bg: string;
  items: string[];
  action: string;
}

export const kidsAges: KidsAge[] = [
  {
    label: "Newborn to 2",
    immIndex: 0,
    sub: "Well-baby visits",
    tags: ["Well-baby visits", "Growth checks", "Vaccines"],
    title: "Frequent, unhurried visits in the first two years.",
    p: "We follow the Rourke Baby Record used across Ontario: weight, length and head growth, feeding, sleep, development and the routine vaccine schedule. Questions are welcome; no concern is too small.",
    facts: [
      { k: "How often", v: "About 8 visits by age 2" },
      { k: "Vaccines", v: "Ontario routine schedule, given in clinic" },
      { k: "Bring", v: "Health card, yellow immunization card" },
      { k: "Coverage", v: "OHIP" },
    ],
    cta: "Book a well-baby visit",
  },
  {
    label: "3 to 5",
    immIndex: 6,
    sub: "Preschool and daycare",
    tags: ["Preschool checkup", "Daycare forms", "Vaccines"],
    title: "Ready for daycare and kindergarten.",
    p: "A yearly checkup covers growth, vision and hearing screening, speech and behaviour, plus the 4 to 6 year vaccine booster. Daycare and school entry forms are done at the same visit.",
    facts: [
      { k: "How often", v: "Once a year" },
      { k: "Vaccines", v: "4 to 6 year booster" },
      { k: "Forms", v: "Daycare, school entry, allergy plans" },
      { k: "Coverage", v: "OHIP; some forms carry a fee" },
    ],
    cta: "Book a preschool checkup",
  },
  {
    label: "6 to 12",
    immIndex: 7,
    sub: "School years",
    tags: ["School forms", "Sports", "Growth"],
    title: "Growth, school and staying active.",
    p: "Annual checkups track growth and development, and we manage the things school years bring: asthma, allergies, attention and learning concerns, sleep, screens and sport injuries.",
    facts: [
      { k: "How often", v: "Once a year, plus sick visits" },
      { k: "Forms", v: "Camp, sports, medication at school" },
      { k: "Also", v: "Referrals to pediatric specialists when needed" },
      { k: "Coverage", v: "OHIP" },
    ],
    cta: "Book a checkup",
  },
  {
    label: "Teens 13 to 18",
    immIndex: 8,
    sub: "Confidential care",
    tags: ["Confidential", "Mental health", "Sports physicals"],
    title: "Care that respects a teenager.",
    p: "Teens can see the doctor on their own for part of the visit. We cover mood and stress, sleep, skin, periods and contraception, sports and the Grade 7 and high school vaccines, in plain language and without judgment.",
    facts: [
      { k: "How often", v: "Once a year, plus as needed" },
      { k: "Vaccines", v: "HPV, meningococcal, hepatitis B" },
      { k: "Privacy", v: "Confidential time with the doctor" },
      { k: "Coverage", v: "OHIP" },
    ],
    cta: "Book a teen visit",
  },
];

export const kidsFaq: QA[] = [
  { q: "Do you accept children as new patients?", a: "Yes, at Thornhill. A child can be registered with a parent already on our roster or on their own. Register online and we confirm within two business days." },
  { q: "Can my child see the same doctor as me?", a: "Yes. One family doctor and one chart per household is how we prefer to work. Book back to back and one trip covers everyone." },
  { q: "What if my child is sick today?", a: "Call before 10am and we hold same-week visits for children who are unwell. If we are full, we tell you where to go rather than leaving you waiting." },
  { q: "Do you give routine vaccines in clinic?", a: "Yes. We follow the Ontario publicly funded schedule and update the yellow card at each visit. School-based vaccines from public health are recorded too." },
  { q: "Is there a charge for school and camp forms?", a: "Forms for medical care are covered. Third-party forms such as camp, daycare and sports carry a small uninsured fee. We tell you the amount before the visit and give a receipt." },
  { q: "Do you see teenagers without a parent?", a: "Yes. Teens can book and attend on their own. Part of every teen visit is private, and what is discussed stays confidential within the limits of the law." },
];

export const immunizations: ImmunizationStage[] = [
  {
    label: "2 months",
    title: "The first round, at 2 months.",
    where: "In clinic, with us",
    shots: [
      { n: "DTaP-IPV-Hib", d: "Diphtheria, tetanus, pertussis, polio, Hib" },
      { n: "Pneumococcal (Pneu-C)", d: "Protects against pneumococcal infection" },
      { n: "Rotavirus", d: "Oral drops, not a needle" },
    ],
    note: "Usually given at the 2 month well-baby visit. A little fussiness or a mild fever afterwards is common.",
  },
  {
    label: "4 months",
    title: "Second doses at 4 months.",
    where: "In clinic, with us",
    shots: [
      { n: "DTaP-IPV-Hib", d: "Second dose" },
      { n: "Pneumococcal (Pneu-C)", d: "Second dose" },
      { n: "Rotavirus", d: "Second dose, oral" },
    ],
    note: "Same three as at 2 months. Bring the yellow card so we can record them.",
  },
  {
    label: "6 months",
    title: "Third doses, plus the flu shot in season.",
    where: "In clinic, with us",
    shots: [
      { n: "DTaP-IPV-Hib", d: "Third dose" },
      { n: "Influenza", d: "Yearly from 6 months, each fall" },
    ],
    note: "Rotavirus may have a third dose depending on the product. From 6 months, a flu shot every fall is recommended.",
  },
  {
    label: "12 months",
    title: "First birthday vaccines.",
    where: "In clinic, with us",
    shots: [
      { n: "MMR", d: "Measles, mumps, rubella" },
      { n: "Pneumococcal (Pneu-C)", d: "Booster" },
      { n: "Meningococcal (Men-C-C)", d: "Single dose" },
    ],
    note: "A small rash or mild fever 7 to 12 days after MMR can happen and settles on its own.",
  },
  {
    label: "15 months",
    title: "Chickenpox at 15 months.",
    where: "In clinic, with us",
    shots: [{ n: "Varicella", d: "Chickenpox, first dose" }],
    note: "One vaccine at this visit, usually paired with the 15 month growth check.",
  },
  {
    label: "18 months",
    title: "Booster at 18 months.",
    where: "In clinic, with us",
    shots: [{ n: "DTaP-IPV-Hib", d: "Fourth dose" }],
    note: "Completes the infant series. The next routine vaccines are at 4 to 6 years.",
  },
  {
    label: "4 to 6 years",
    title: "Before kindergarten.",
    where: "In clinic, with us",
    shots: [
      { n: "Tdap-IPV", d: "Tetanus, diphtheria, pertussis, polio booster" },
      { n: "MMRV", d: "Measles, mumps, rubella and second chickenpox dose" },
    ],
    note: "Often done at the preschool checkup alongside daycare or school entry forms.",
  },
  {
    label: "Grade 7",
    title: "School-based vaccines in Grade 7.",
    where: "Usually at school, by public health. Also available with us",
    shots: [
      { n: "HPV", d: "Two doses, 6 months apart" },
      { n: "Meningococcal (Men-C-ACYW)", d: "Single dose" },
      { n: "Hepatitis B", d: "Two doses, 6 months apart" },
    ],
    note: "Public health runs school clinics. If a dose is missed, we can give it in clinic.",
  },
  {
    label: "14 to 16 years",
    title: "Teen booster.",
    where: "In clinic, with us",
    shots: [{ n: "Tdap", d: "Tetanus, diphtheria, pertussis booster" }],
    note: "Ten years after the 4 to 6 year dose. A good moment for a confidential teen checkup too.",
  },
  {
    label: "Every fall",
    title: "Flu shot, every year from 6 months.",
    where: "In clinic, from October",
    shots: [{ n: "Influenza", d: "One dose each season; two doses the first year for children under 9" }],
    note: "Flu shots begin in October each year. Families can book back to back.",
  },
];

/** "1 vaccine" or "N vaccines", as the prototype labels each immunization tab. */
export function immunizationCount(stage: ImmunizationStage): string {
  return stage.shots.length === 1 ? "1 vaccine" : `${stage.shots.length} vaccines`;
}

export const kidsDocs: KidsDoctor[] = [
  {
    name: "Dr. Johnny Nguyen",
    role: "Physician, Medical Director",
    initial: "N",
    bg: "#EEF5FC",
    p: "Family medicine with a focus on the whole household. Sees children from birth and their parents and grandparents in the same clinic.",
    tags: ["English", "Tiếng Việt", "Newborn to teen"],
  },
  {
    name: "Dr. Joseph Truong",
    role: "Physician, Family Medicine",
    initial: "T",
    bg: "#FFF3C4",
    p: "Accepting new families at Thornhill. Well-baby visits, school-age care and unhurried first appointments.",
    tags: ["English", "Tiếng Việt", "Accepting new patients"],
  },
];

export const kidsPath: PathStep[] = [
  { n: "1", time: "Today", t: "Register online", d: "Two minutes. Add your child to your own registration or start one for them." },
  { n: "2", time: "Within 2 business days", t: "We call to confirm", d: "A short call in English or Vietnamese to book the first visit and answer questions." },
  { n: "3", time: "First visit, 30 min", t: "History, growth and a plan", d: "Bring the health card and yellow card. We review history, measure growth and note what is due." },
  { n: "4", time: "Ongoing", t: "Checkups and sick visits", d: "Yearly checkups, vaccines on schedule and same-week visits when they are unwell." },
];

export const kidsForms: TintCard[] = [
  { t: "School and daycare", d: "Entry forms, medication at school, allergy and asthma plans.", time: "10 to 15 minute visit", bg: "#EEF5FC" },
  { t: "Camp and travel", d: "Camp health forms and travel letters, including vaccine records.", time: "Often same visit as a checkup", bg: "#FFF3C4" },
  { t: "Sports and activities", d: "Sports physicals, fitness-to-play notes and return-to-play after injury.", time: "15 minute visit", bg: "#FDE8E4" },
  { t: "Absence and sick notes", d: "School absence notes and letters for extended illness or recovery.", time: "During the sick visit", bg: "#E6F4EA" },
];

export const kidsSick: KidsSickCard[] = [
  {
    tag: "Call us",
    t: "Book a same-week visit with us",
    bg: "#EEF5FC",
    items: ["Fever for more than two days", "Ear pain, sore throat or a cough that lingers", "Rashes, tummy pain or vomiting that is settling", "Any worry that does not feel urgent"],
    action: "905-709-3222",
  },
  {
    tag: "Same day",
    t: "Call Health811 or visit a walk-in",
    bg: "#FFF3C4",
    items: ["We are closed or fully booked", "A fever in a child under 3 months", "Vomiting or diarrhea with fewer wet diapers", "You want advice tonight"],
    action: "Health811 is free, 24 hours",
  },
  {
    tag: "Emergency",
    t: "Go to the emergency department or call 911",
    bg: "#FDE8E4",
    items: ["Trouble breathing or blue lips", "Very drowsy, limp or hard to wake", "A seizure, or a stiff neck with fever", "A serious injury or a head injury with vomiting"],
    action: "Call 911",
  },
];

/** Section copy for the Children and youth page (prototype `isKids` block). */
export const kidsCopy = {
  hero: {
    page: "Children and youth",
    title: "One doctor from the first checkup to the last school form.",
    lead: "Well-baby visits, vaccines, growth checks, same-week sick visits and every form a school or camp asks for. Care in English or Tiếng Việt, covered by OHIP.",
    cta: "Register your child",
    cta2: "Book a sick visit",
    coverage: "Children can be registered with a parent or on their own. Bring the health card and immunization record.",
    alt: "Family doctor with a young child",
    pills: ["OHIP covered", "Same-week sick visits", "EN / Tiếng Việt"],
  },
  sick: {
    eyebrow: "When they are unwell",
    title: "Where to go, and when.",
    note: "If your child is struggling to breathe, is very drowsy or has a seizure, call 911. This guide is for everything else.",
  },
  ages: {
    eyebrow: "How old is your child?",
    title: "Care that changes as they grow.",
    intro: "Pick an age and see what a visit covers, how often we like to see them and what to bring.",
    link: "Register a child",
  },
  imm: {
    eyebrow: "Immunizations",
    title: "Which vaccines are due at this age?",
    note: "Ontario publicly funded schedule. All routine vaccines are given in clinic and recorded on the yellow card.",
    whereLabel: "Where it happens",
    whereNote: "Bring the yellow immunization card and health card. We update the record and can print a copy for school or daycare.",
    catchTitle: "Behind on a few?",
    catchBody: "Catch-up is common after a move or a gap in care. Bring whatever records you have and we plan the rest.",
    catchCta: "Book a vaccine visit",
    footnote: "Based on the Ontario publicly funded immunization schedule. Timing is adjusted for children with medical conditions or who started their series elsewhere. Your doctor confirms what is due at the visit.",
  },
  forms: {
    eyebrow: "Forms and notes",
    title: "Bring the form. We fill it in during the visit.",
    body: "Most forms are completed in one short appointment. Some carry an uninsured fee, which we tell you before the visit and give you a receipt for.",
    cta: "Book a forms visit",
  },
  docs: {
    eyebrow: "Who your child will see",
    title: "Two family doctors, one chart.",
    body: "Your child is rostered to one physician and sees the same face each visit. The other covers when they are away, from the same record.",
    link: "Meet the whole team",
  },
  path: {
    eyebrow: "Your child's first visit",
    title: "From the form to the yellow card.",
    cta: "Register your child",
  },
  vi: {
    eyebrow: "Chăm sóc bằng tiếng Việt",
    title: "Grandparents can bring the kids. We speak their language.",
    body: "Front desk, nurses and physicians speak Vietnamese and English. Forms, vaccine records and instructions can be explained in either, so whoever brings your child leaves knowing the plan.",
    cta: "Xem trang tiếng Việt",
    cta2: "Đăng ký cho con",
  },
  teens: {
    eyebrow: "For teenagers",
    title: "Part of every teen visit is private.",
    body: "Teens can book on their own and speak with the doctor without a parent in the room. What is discussed stays confidential within the limits of the law, and we explain those limits plainly.",
    cta: "Book a teen visit",
  },
  faq: {
    title: "Questions parents ask.",
    sub: "Not here? Call 905-709-3222 and ask for the family medicine desk.",
  },
  band: {
    title: "Register the whole household in one form.",
    body: "Children, parents and grandparents can share one family doctor and one chart. Appointments can be booked back to back so one trip covers everyone.",
    cta: "Register your family",
    link: "See the family screening year",
  },
} as const;
