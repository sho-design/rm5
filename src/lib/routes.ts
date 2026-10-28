/**
 * One URL per prototype page key (design/handoff/README.md, "Routes").
 * Every internal link in the site goes through this map so a route change
 * touches one file.
 */
export const routes = {
  home: "/",
  family: "/family-medicine",
  pain: "/pain-centre",
  infusion: "/infusion-therapy",
  aesthetics: "/medical-aesthetics",
  rehab: "/rehab-recovery",
  kids: "/family-medicine/children-youth",
  women: "/family-medicine/women-s-health",
  men: "/family-medicine/men-s-health",
  chronic: "/family-medicine/chronic-care",
  blood: "/family-medicine/bloodwork-ecg",
  year: "/family-medicine/your-year",
  numbers: "/family-medicine/know-your-numbers",
  iron: "/infusion-therapy/iron-therapy",
  rx: "/family-medicine/prescription-renewals",
  labs: "/family-medicine/lab-results",
  vaccines: "/family-medicine/vaccines",
  pregnancy: "/family-medicine/pregnancy-care",
  painBack: "/pain-centre/back-neck",
  painJoints: "/pain-centre/joint-pain",
  painNerve: "/pain-centre/nerve-blocks",
  painTrigger: "/pain-centre/trigger-point-injections",
  painFirstVisit: "/pain-centre/first-visit",
  painOhip: "/pain-centre/ohip-coverage",
  drips: "/infusion-therapy/drips",
  shots: "/infusion-therapy/injection-bar",
  concerns: "/infusion-therapy/by-concern",
  metabolic: "/infusion-therapy/metabolic-program",
  infusionHow: "/infusion-therapy/how-it-works",
  honest: "/infusion-therapy/honest-menu",
  ingredients: "/infusion-therapy/ingredients",
  infusionPricing: "/infusion-therapy/pricing",
  infusionTeam: "/infusion-therapy/team",
  aesInjectables: "/medical-aesthetics/injectables",
  aesSkin: "/medical-aesthetics/skin-treatments",
  aesLaser: "/medical-aesthetics/laser",
  aesPlans: "/medical-aesthetics/skin-health-plans",
  aesMen: "/medical-aesthetics/mens-aesthetics",
  aesPricing: "/medical-aesthetics/pricing",
  aesPhotos: "/medical-aesthetics/before-and-after",
  aesGift: "/medical-aesthetics/gift-cards",
  rehabPhysio: "/rehab-recovery/physiotherapy",
  rehabChiro: "/rehab-recovery/chiropractic",
  rehabMassage: "/rehab-recovery/massage-therapy",
  rehabKines: "/rehab-recovery/kinesiology",
  rehabMva: "/rehab-recovery/motor-vehicle-accidents",
  rehabWsib: "/rehab-recovery/wsib",
  rehabBilling: "/rehab-recovery/insurance-billing",
  rehabBring: "/rehab-recovery/what-to-bring",
  rehabHome: "/rehab-recovery/home-program",
  referrals: "/for-physicians",
  about: "/about",
  team: "/about/team",
  locations: "/about/clinics",
  story: "/about/story",
  standards: "/about/standards",
  careers: "/about/careers",
  forms: "/about/patient-forms",
  billing: "/about/insurance-billing",
  fees: "/about/fees",
  faq: "/about/faq",
  contact: "/about/contact",
  notes: "/health-notes",
  book: "/book",
  register: "/register",
  privacy: "/legal/privacy",
  accessibility: "/legal/accessibility",
  rights: "/legal/patient-rights",
  terms: "/legal/terms",
  sitemap: "/sitemap",
  legal: "/legal/privacy",
} as const;

export type PageKey = keyof typeof routes;

export const noteRoute = (slug: string) => `${routes.notes}/${slug}`;

/** One page per signature drip, under the drips list. */
export const dripRoute = (slug: string) => `${routes.drips}/${slug}`;

export const external = {
  instagram: "https://www.instagram.com/restorationmedicalofficial/",
  facebook: "https://www.facebook.com/restorationmedicalofficial/",
  thornhillMaps:
    "https://www.google.com/maps/place/Restoration+Medical/@43.8116543,-79.4536255,17z/data=!3m1!4b1!4m6!3m5!1s0x882b2db3105c83d1:0x644d7da1c8c35de7!8m2!3d43.8116505!4d-79.4510506!16s%2Fg%2F11yl66jl7w",
  thornhillMapsShort: "https://maps.app.goo.gl/fCfB173JFHE6NQUo7",
  mapleMaps:
    "https://www.google.com/maps/search/?api=1&query=2620%20Rutherford%20Rd%2C%20Unit%20105-107%2C%20Vaughan%2C%20ON%20L4K%200H1",
  mapleMapsShort: "https://maps.app.goo.gl/MC7bwChrxqido6vG9",
  kneeClinic: "https://canadakneeclinic.com",
  mainSite: "https://restorationmedical.ca",
} as const;

/** /book with a service preselected (division key: family, pain, infusion, aesthetics, rehab). */
/**
 * Booking link with the service (division key) and optionally the visit type
 * preselected: /book?service=rehab&visit=physio. Visit keys per division:
 * family: concern, checkup, renewal, flu, bloodwork, vaccine, pregnancy, forms, womensday; pain: referral, followup, procedure;
 * infusion: iron, drip, shot, consult; aesthetics: consult, injectables, skin, laser;
 * rehab: assessment, physio, chiro, massage, kines, mva, wsib.
 * Unknown keys are ignored by the booking page.
 */
export const bookFor = (division: string, visit?: string) => `${routes.book}?service=${division}${visit ? `&visit=${visit}` : ""}`;

/** Resolve a prototype page key (or an already-built path) to an href. */
export function href(key: PageKey | string): string {
  return key in routes ? routes[key as PageKey] : key;
}
