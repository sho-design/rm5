/**
 * Ocean (OceanMD) links for OSCAR Pro. When a link is set, patients enter their details in Ocean, which books
 * into the OSCAR schedule or files the form to the chart, and none of it passes through this site.
 * Unset links keep the site's own form (FORM_ENDPOINT_*) as the fallback. See docs/forms.md.
 *
 * NEXT_PUBLIC_OCEAN_BOOKING_URL     one booking page for everything
 * NEXT_PUBLIC_OCEAN_BOOKING_LINKS   JSON by service or service:visit, for example
 *                                   {"family":"https://...","family:pap":"https://...","rehab":"https://..."}
 * NEXT_PUBLIC_OCEAN_REGISTER_URL    the patient registration form
 * NEXT_PUBLIC_OCEAN_RENEWAL_URL     the prescription renewal form
 */

const safe = (v?: string | null) => (v && /^https:\/\/[^\s"'<>]+$/.test(v) ? v : null);

function parseLinks(v?: string): Record<string, string> {
  if (!v) return {};
  try {
    const o = JSON.parse(v) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(o).flatMap(([k, u]) => (typeof u === "string" && safe(u) ? [[k, u]] : [])));
  } catch {
    return {};
  }
}

// Written out in full so Next.js inlines them at build time.
const bookingLinks = parseLinks(process.env.NEXT_PUBLIC_OCEAN_BOOKING_LINKS);
const bookingDefault = safe(process.env.NEXT_PUBLIC_OCEAN_BOOKING_URL);

/** The Ocean booking page for a service and visit, most specific first, or null to use the site's form. */
export function oceanBookingUrl(service: string, visit?: string | null): string | null {
  return (visit ? bookingLinks[`${service}:${visit}`] : undefined) ?? bookingLinks[service] ?? bookingDefault;
}

export const oceanRegisterUrl = safe(process.env.NEXT_PUBLIC_OCEAN_REGISTER_URL);
export const oceanRenewalUrl = safe(process.env.NEXT_PUBLIC_OCEAN_RENEWAL_URL);
