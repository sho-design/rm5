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
  book: "appointment appointments visit schedule reserve booking waitlist wait list wait time cancellation",
  register: "new patient accepting patients family doctor roster rostered register join sign up",
  family: "doctor gp physician sick cough cold fever flu sore throat rash infection concern walk in walkin checkup physical",
  rx: "refill refills prescription prescriptions renew renewal medication medications meds pharmacy run out ran out",
  labs: "results result bloodwork lab tests test results",
  women: "pap smear pap test cervical screening hpv menopause perimenopause hot flashes contraception birth control iud pregnancy prenatal period periods",
  men: "prostate psa testosterone checkup physical",
  chronic: "diabetes diabetic a1c sugar blood sugar glucose blood pressure hypertension cholesterol asthma thyroid copd kidney heart",
  blood: "bloodwork blood test fasting ecg ekg lab draw requisition",
  numbers: "a1c ferritin cholesterol ldl blood pressure numbers results",
  year: "screening prevention checkup annual",
  kids: "child children kid kids baby babies infant daughter son teen teenager vaccine vaccines immunization immunizations school forms",
  iron: "iron ferritin anemia anaemia anemic low iron tired fatigue exhausted monoferric iron infusion",
  infusion: "iv drip drips vitamin vitamins",
  drips: "iv drip drips hydration myers vitamin",
  shots: "shot shots b12 vitamin injection injections",
  metabolic: "weight metabolic",
  pain: "pain chronic pain injection injections",
  painBack: "back neck sciatica spine lower back",
  painJoints: "knee shoulder hip joint joints arthritis",
  painNerve: "nerve block occipital headache headaches migraine migraines",
  painTrigger: "trigger point muscle knot knots",
  painOhip: "referral ohip covered coverage free",
  aesthetics: "cosmetic cosmetics beauty",
  aesInjectables: "botox tox dysport xeomin neurotoxin wrinkle wrinkles filler fillers lines frown forehead",
  aesSkin: "acne acne scars scarring microneedling peel peels skin facial pigmentation rosacea",
  aesLaser: "laser hair removal ipl resurfacing",
  aesGift: "gift card gift cards gift certificate voucher present",
  rehab: "rehab rehabilitation injury injuries",
  rehabPhysio: "physio physiotherapy physiotherapist physical therapy pt acl surgery post surgical sports injury",
  rehabChiro: "chiro chiropractor chiropractic adjustment",
  rehabMassage: "massage rmt",
  rehabKines: "kinesiology kinesiologist exercise",
  rehabMva: "mva car accident motor vehicle accident collision crash auto insurance",
  rehabWsib: "wsib work injury workplace injury workers compensation",
  rehabBilling: "sun life sunlife manulife canada life green shield greenshield blue cross desjardins benefits insurance direct billing extended health",
  billing: "insurance billing benefits sun life manulife direct billing",
  fees: "price prices cost costs fee fees uninsured sick note note form forms letter charge charges",
  forms: "forms patient forms records medical records transfer chart",
  locations: "maple waitlist hours directions address parking map walmart thornhill maple vaughan woodbridge wheelchair accessible accessibility step free entrance bus transit open closed",
  contact: "phone call email fax contact message",
  careers: "job jobs career careers hiring work nurse rn apply employment",
  standards: "student students placement placements learner learners teaching nursing student supervision complaint complaints",
  team: "doctor doctors physician physicians nurse nurses staff vietnamese tieng viet language languages speak",
  referrals: "refer referral physician fax ocean ereferral",
  privacy: "privacy personal information phipa cookies data",
  accessibility: "accessibility accessible aoda",
  rights: "rights complaint complaints",
  notes: "articles blog",
  [noteRoute("flu-shot-faq")]: "flu shot flu shots vaccine influenza",
  [noteRoute("headache-when-to-see")]: "headache migraine",
  [noteRoute("iron-infusion")]: "iron infusion",
};

/** Keywords for a destination, by page key or by the path it resolves to. */
export function aliasesFor(page: string): string | undefined {
  if (searchAliases[page]) return searchAliases[page];
  const key = (Object.keys(routes) as (keyof typeof routes)[]).find((k) => routes[k] === page);
  return key ? searchAliases[key] : undefined;
}

/** Entries for things people search that have no page of their own. New wording, see docs/content-review.md. */
export const searchExtras: SearchDoc[] = [
  {
    kind: draft("Help"),
    label: draft("Health advice after hours"),
    sub: draft("Health811 at 811, any time, day or night"),
    page: "https://health811.ontario.ca",
    keys: "after hours afterhours night evening weekend urgent advice nurse line 811 health811 telehealth",
  },
];
