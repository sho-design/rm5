import { noteRoute, routes } from "@/lib/routes";
import type { SearchDoc } from "@/lib/search";
import { draft } from "./review";

/**
 * Words patients type that are not on the page itself, by destination
 * (page key or path). They are matched like a label, a little lower, so
 * "botox" finds injectables and "sun life" finds direct billing. Search
 * aliases are never shown on screen.
 */
export const searchAliases: Record<string, string> = {
  book: "appointment appointments visit schedule reserve booking waitlist wait list cancellation",
  register: "dang ky benh nhan moi new patient accepting patients family doctor roster rostered register join sign up",
  family: "earache ear ache ear pain ear infection sore ear pink eye uti urinary infection bac si kham benh kham suc khoe dau dau medico medica doctor gp physician insomnia sleep sleeping burnout mole moles skin check spot lesion lump sick cough cold fever flu sore throat rash infection concern walk in walkin checkup physical anxiety depression mood mental health stress sleep",
  vaccines: "vacuna vacunas tiem cum tiem phong vac xin chich ngua vaccine vaccines vaccination immunization immunizations shot shots flu shot shingles shingrix rsv pneumonia tdap whooping cough",
  pregnancy: "pregnant pregnancy prenatal antenatal obstetrics obstetrician midwife midwifery baby expecting first trimester postpartum breastfeeding nursing mang thai",
  rx: "thuoc toa thuoc ke toa refill refills prescription prescriptions renew renewal medication medications meds pharmacy run out ran out",
  labs: "results result bloodwork lab tests test results",
  women: "sti std stis stds sti test sexual health pap smear pap test cervical screening hpv menopause perimenopause hot flashes contraception birth control iud period periods womens health day women's health day last sunday testing nurse nurses",
  men: "libido low libido sex drive vitality low t low testosterone hormones hormone mens hormone health prostate psa testosterone checkup physical std stds sti stis std test sti test sexual health erectile",
  chronic: "huyet ap huyet ap cao tieu duong diabetes diabetic a1c sugar blood sugar glucose blood pressure hypertension cholesterol asthma thyroid copd kidney heart senior seniors elderly elder older adult older adults aging memory dementia caregiver caregivers complex care parkinson parkinsons ms multiple sclerosis stroke falls fall",
  blood: "bloodwork blood test fasting ecg ekg lab draw requisition",
  numbers: "a1c ferritin cholesterol ldl blood pressure numbers results",
  year: "screening prevention checkup annual vaccine vaccines shingles shingrix rsv pneumonia immunization",
  kids: "earache ear ache ear infection fever child kid fever newborn new baby well baby well-baby rourke child children kid kids baby babies infant daughter son teen teens teenager vaccine vaccines immunization immunizations school forms anxiety mental health mood confidential",
  iron: "iron ferritin anemia anaemia anemic low iron tired fatigue exhausted monoferric iron infusion postpartum breastfeeding thieu mau sat",
  infusion: "iv drip drips vitamin vitamins",
  drips: "mixed prepared premixed premade made fresh iv drip drips hydration myers vitamin",
  shots: "shot shots b12 vitamin injection injections",
  metabolic: "weight metabolic",
  pain: "pain chronic pain injection injections",
  painBack: "back neck sciatica spine lower back facet facet joint facet injection medial branch radiofrequency rfa ablation",
  painJoints: "knee shoulder hip joint joints arthritis",
  painNerve: "nerve block occipital headache headaches migraine migraines",
  painTrigger: "trigger point muscle knot knots",
  painOhip: "referral ohip covered coverage free",
  aesthetics: "cosmetic cosmetics beauty",
  aesInjectables: "botox tox dysport xeomin neurotoxin wrinkle wrinkles filler fillers lines frown forehead",
  aesSkin: "acne acne scars scarring microneedling peel peels skin facial pigmentation rosacea",
  aesLaser: "laser hair removal ipl resurfacing rosacea redness red face flushing broken capillaries",
  aesGift: "gift card gift cards gift certificate voucher present",
  rehab: "rehab rehabilitation injury injuries",
  rehabPhysio: "dau lung vat ly tri lieu physio physiotherapy physiotherapist physical therapy pt acl surgery post surgical sports injury shoulder knee hip ankle neck back sore stiff sprain strain back pain lower back low back price prices cost costs",
  rehabChiro: "chiro chiropractor chiropractic adjustment back neck shoulder posture spine back pain lower back low back neck pain price prices cost costs",
  rehabMassage: "massage massage price massage cost price prices cost rmt shoulder neck back sore tight tension knots",
  rehabKines: "kinesiology kinesiologist exercise",
  rehabMva: "mva car accident motor vehicle accident collision crash auto insurance",
  rehabWsib: "wsib work injury workplace injury workers compensation",
  rehabBilling: "sun life sunlife manulife canada life green shield greenshield blue cross desjardins benefits insurance direct billing extended health ohip physio",
  billing: "insurance billing benefits sun life manulife direct billing",
  fees: "price prices cost costs fee fees uninsured sick note note form forms letter charge charges disability form insurance form employer",
  forms: "forms patient forms records medical records transfer chart",
  locations: "gio mo cua horario maple waitlist hours directions address parking map walmart thornhill maple vaughan woodbridge step free entrance bus transit open closed",
  contact: "phone call email fax contact message",
  careers: "job jobs career careers hiring work nurse rn apply employment",
  standards: "complication complications side effect side effects safety safe emergency kit something went wrong reaction student students placement placements learner learners teaching nursing student supervision complaint complaints",
  team: "bac si noi tieng viet doctor doctors physician physicians nurse nurses staff vietnamese tieng viet language languages speak",
  referrals: "refer referral physician fax ocean ereferral",
  privacy: "privacy personal information phipa cookies data",
  accessibility: "accessibility accessible aoda",
  rights: "rights complaint complaints complain concern concerns cpso",
  notes: "articles blog",
  [noteRoute("flu-shot-faq")]: "flu shot flu shots vaccine influenza",
  [noteRoute("headache-when-to-see")]: "headache headaches migraine migraines",
  [noteRoute("iron-infusion")]: "iron infusion",
};

/** Words patients type for an FAQ answer, keyed by the exact question. */
export const faqAliases: Record<string, string> = {
  "Is the clinic accessible?": "wheelchair walker scooter stroller step free ramp elevator mobility disability",
  "Where do I park?": "parking car lot free",
  "How long is the wait?": "wait time waiting list how soon pain centre referral",
  "What if I do not have OHIP?": "uhip international student no health card without ohip visitor tourist",
  "Do you have interpreters?": "espanol spanish ingles idioma traductor interprete mandarin chinese cantonese farsi persian arabic tamil punjabi hindi urdu korean tagalog spanish portuguese russian italian interpreter translator translation language languages",
  "What is your late and cancellation policy?": "cancel cancelling cancellation reschedule change appointment move visit no show",
  "I have a health card from another province. Can I be seen?": "alberta british columbia bc quebec manitoba saskatchewan nova scotia new brunswick newfoundland pei out of province reciprocal billing student",
  "Do you offer phone or video visits?": "phone appointment phone visit call video virtual telehealth telemedicine online visit zoom",
  "How do I renew a prescription?": "refill run out ran out running out medication pills prescription",
};

/** Keywords for a destination, by page key or by the path it resolves to. */
export function aliasesFor(page: string): string | undefined {
  if (searchAliases[page]) return searchAliases[page];
  const key = (Object.keys(routes) as (keyof typeof routes)[]).find((k) => routes[k] === page);
  return key ? searchAliases[key] : undefined;
}

/** Entries for things people search that have no page of their own. New wording, see docs/content-review.md. */
export const searchExtras: SearchDoc[] = [
  // Teens searching "reminder text" did not find the children and youth FAQ.
  {
    kind: draft("Children & youth"),
    label: draft("Will a reminder text say what my visit is for?"),
    sub: draft("No. Teen visit reminders do not say the reason"),
    page: "/family-medicine/children-youth#families",
    keys: "reminder reminders text texts message lock screen parents parent mom dad private privacy teen teens confidential",
  },
  // Square receipts say IV Kingmaker or IV Queenmaker; the site shows that recipe as one Signature drip.
  {
    kind: draft("Infusion Therapy"),
    label: draft("Signature drip"),
    sub: draft("Our house blend, the same for everyone"),
    page: "/infusion-therapy/drips/signature",
    keys: "kingmaker queenmaker king maker queen maker iv kingmaker iv queenmaker signature house blend",
  },
  // STI testing for anyone, not only under Men's health (a nonbinary tester found it only there).
  {
    kind: draft("Family Medicine"),
    label: draft("Sexual health and STI testing"),
    sub: draft("Confidential and OHIP-insured, at any age"),
    page: "/book?service=family&visit=concern&reason=Sexual%20health",
    keys: "std stds sti stis std test sti test sexual health confidential testing hiv chlamydia gonorrhea syphilis herpes hpv partner",
  },
  // Mood and sleep with a family doctor: a tester searching "depression" got only "Family Medicine" with no reason.
  {
    kind: draft("Family Medicine"),
    label: draft("Mood, anxiety and sleep"),
    sub: draft("Talk to a family doctor, OHIP-insured. In crisis, call or text 988"),
    page: "/book?service=family&visit=concern&reason=Mood%20or%20sleep",
    keys: "hopeless need to talk talk to someone someone to talk to therapy therapist counsellor psychologist depression depressed anxiety anxious panic mood low mood mental health stress burnout insomnia sleep sleeping cant sleep counselling counseling therapy sad lonely grief tram cam mat ngu lo au cang thang",
    weight: 1.8,
  },
  // A bleeding spot that will not heal is a doctor's visit, not a cosmetic one (a tester was offered a peel).
  {
    kind: draft("Family Medicine"),
    label: draft("A mole or skin spot that is changing"),
    sub: draft("See a family doctor first, OHIP-insured"),
    page: "/book?service=family&visit=concern&reason=Skin%20spot%20or%20mole",
    keys: "mole moles spot spots skin spot bleeding bleeds bleed wont heal not healing sore lesion lump growth skin check skin cancer changing mole dark spot itchy spot scab",
    weight: 1.4,
  },
  // A caregiver searching "dementia" got a chronic care row listing diabetes and kidney.
  {
    kind: draft("Family Medicine"),
    label: draft("Memory concerns and dementia care"),
    sub: draft("With your family doctor, OHIP-insured. Family and caregivers are welcome at the visit"),
    page: "/book?service=family&visit=chronic&reason=Memory%20or%20dementia",
    keys: "dementia memory memory loss forgetful forgetting alzheimer alzheimers confusion caregiver caregivers aging parent sa sut tri nho mat tri nho",
    weight: 1.3,
  },
  // Vietnamese words for a check-up (a tester typed "kham suc khoe" and got nothing).
  {
    kind: draft("Family Medicine"),
    label: draft("Annual physical"),
    sub: draft("Khám sức khỏe, OHIP-insured"),
    page: "/book?service=family&visit=checkup",
    keys: "kham suc khoe kham tong quat kiem tra suc khoe checkup check up annual physical",
  },
  {
    kind: draft("Help"),
    label: draft("Health advice after hours"),
    sub: draft("Health811 at 811, any time, day or night"),
    page: "https://health811.ontario.ca",
    keys: "after hours afterhours night evening weekend urgent advice nurse line 811 health811 telehealth",
  },
];
