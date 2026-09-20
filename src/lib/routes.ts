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
  referrals: "/for-physicians",
  about: "/about",
  team: "/about/team",
  locations: "/about/clinics",
  story: "/about/story",
  standards: "/about/standards",
  careers: "/about/careers",
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

export const external = {
  infusionSite: "https://infusion.restorationmedical.ca",
  infusionDrips: "https://infusion.restorationmedical.ca/drips",
  infusionShots: "https://infusion.restorationmedical.ca/shots",
  infusionIngredients: "https://infusion.restorationmedical.ca/ingredients",
  infusionPricing: "https://infusion.restorationmedical.ca/pricing",
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

/** Resolve a prototype page key (or an already-built path) to an href. */
export function href(key: PageKey | string): string {
  return key in routes ? routes[key as PageKey] : key;
}
