/**
 * Permanent redirects from old addresses, read by next.config.ts.
 *
 * 1. infusion.restorationmedical.ca: the Infusion pages now live on this
 *    site. These are the subdomain paths the old site's links used. They
 *    take effect once the subdomain's DNS points at this Vercel project.
 * 2. Likely paths on the old restorationmedical.ca. The old sitemap was not
 *    reachable when this was written, so these are common slugs, not a
 *    confirmed map. Add confirmed ones here, or in the admin under
 *    Redirects (no deploy needed). A rule only fires when that exact old
 *    path is requested, so unused guesses cost nothing.
 */
import { routes } from "../lib/routes";

export const infusionHost = "infusion.restorationmedical.ca";

/** Old infusion subdomain path to new path on the main site. Order matters: the catch-all is last. */
export const infusionRedirects: [string, string][] = [
  ["/", routes.infusion],
  ["/drips", routes.drips],
  ["/drips/:slug", `${routes.drips}/:slug`],
  ["/shots", routes.shots],
  ["/ingredients", (routes.honest + "#ingredients")],
  ["/pricing", routes.infusionPricing],
  ["/memberships", `${routes.infusionPricing}#memberships`],
  ["/concerns", (routes.infusion + "#concern-route")],
  ["/how-it-works", routes.infusionHow],
  ["/iron", routes.iron],
  ["/iron-therapy", routes.iron],
  ["/team", (routes.team + "?service=Infusion%20Therapy")],
  ["/book", `${routes.book}?service=infusion`],
  ["/:path*", routes.infusion],
];

/** Likely old main-site paths (unconfirmed, see above). */
export const legacyRedirects: [string, string][] = [
  // Gift cards became clinic-wide (Nov 2026): one card for any service you pay for.
  ["/medical-aesthetics/gift-cards", routes.aesGift],
  // Know your numbers removed (Nov 2026): the clinic prefers results explained by the doctor.
  ["/family-medicine/know-your-numbers", "/family-medicine/bloodwork-ecg?moved=numbers#results"],
  // Drip renamed from Kingmaker (one unisex drip).
  [`${routes.drips}/healing-myers`, `${routes.drips}/myers`],
  [`${routes.drips}/radiance`, `${routes.drips}/antioxidant`],
  [`${routes.drips}/hair-and-nails`, `${routes.drips}/biotin`],
  [`${routes.drips}/beauty-elixir`, routes.drips],
  [`${routes.drips}/seasonal-support`, `${routes.drips}/vitamin-c-zinc`],
  [`${routes.drips}/recover`, `${routes.drips}/after-exercise`],
  [`${routes.drips}/revive`, `${routes.drips}/hydration`],
  [`${routes.drips}/nad-longevity`, `${routes.drips}/nad`],
  [`${routes.drips}/metabolic`, routes.metabolic],
  [`${routes.drips}/pregnancy-care`, routes.pregnancy],
  [`${routes.drips}/pregnancy-hydration`, routes.pregnancy],
  [`${routes.drips}/kingmaker`, `${routes.drips}/signature`],
  ["/home", routes.home],
  ["/about-us", routes.about],
  ["/our-story", (routes.about + "#story")],
  ["/our-team", routes.team],
  ["/team", routes.team],
  ["/doctors", routes.team],
  ["/contact", routes.contact],
  ["/contact-us", routes.contact],
  ["/locations", (routes.contact + "#clinics")],
  ["/location", (routes.contact + "#clinics")],
  ["/hours", (routes.contact + "#clinics")],
  ["/book-appointment", routes.book],
  ["/book-an-appointment", routes.book],
  ["/booking", routes.book],
  ["/appointments", routes.book],
  ["/new-patients", routes.register],
  ["/new-patient-registration", routes.register],
  ["/services", routes.home],
  ["/pain-management", routes.pain],
  ["/pain-clinic", routes.pain],
  ["/iv-therapy", routes.infusion],
  ["/iv-drip-therapy", routes.infusion],
  ["/infusion", routes.infusion],
  ["/iron-infusion", routes.iron],
  ["/aesthetics", routes.aesthetics],
  ["/botox", routes.aesInjectables],
  ["/rehab", routes.rehab],
  ["/physiotherapy", routes.rehabPhysio],
  ["/physio", routes.rehabPhysio],
  ["/chiropractic", routes.rehabChiro],
  ["/massage-therapy", routes.rehabMassage],
  ["/careers", routes.careers],
  ["/jobs", routes.careers],
  ["/faq", routes.faq],
  ["/faqs", routes.faq],
  ["/blog", routes.notes],
  ["/news", routes.notes],
  ["/referrals", routes.referrals],
  ["/referral", routes.referrals],
  ["/privacy", routes.privacy],
  ["/privacy-policy", routes.privacy],
  ["/accessibility", routes.accessibility],
  ["/terms", routes.terms],
];

/**
 * Service domains the clinic owns, each sent permanently to its section of the
 * main site (one site, so search strength and booking stay in one place). Any
 * path on these domains lands on the section's front page: they never had pages
 * of their own. The bare and www forms both redirect. They take effect once each
 * domain's DNS points at this Vercel project.
 */
export const serviceDomains: [host: string, to: string][] = [
  ["ironinfusion.ca", routes.iron],
  ["medicalaesthetics.ca", routes.aesthetics],
  ["familymedicine.ca", routes.family],
  ["infusiontherapy.ca", routes.infusion],
];
