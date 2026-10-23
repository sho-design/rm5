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
  ["/ingredients", routes.ingredients],
  ["/pricing", routes.infusionPricing],
  ["/memberships", `${routes.infusionPricing}#memberships`],
  ["/concerns", routes.concerns],
  ["/how-it-works", routes.infusionHow],
  ["/iron", routes.iron],
  ["/iron-therapy", routes.iron],
  ["/team", routes.infusionTeam],
  ["/book", `${routes.book}?service=infusion`],
  ["/:path*", routes.infusion],
];

/** Likely old main-site paths (unconfirmed, see above). */
export const legacyRedirects: [string, string][] = [
  ["/home", routes.home],
  ["/about-us", routes.about],
  ["/our-story", routes.story],
  ["/our-team", routes.team],
  ["/team", routes.team],
  ["/doctors", routes.team],
  ["/contact", routes.contact],
  ["/contact-us", routes.contact],
  ["/locations", routes.locations],
  ["/location", routes.locations],
  ["/hours", routes.locations],
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
