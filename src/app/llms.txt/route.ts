import { divisionList, divisions } from "@/content/divisions";
import { infusionPages } from "@/content/infusion-site";
import { locations, site, thornhillHours } from "@/content/site";
import { topicsFor } from "@/content/topics";
import { healthNotes } from "@/content/notes";
import { href, noteRoute, routes } from "@/lib/routes";
import { seoTitles } from "@/content/seo-titles";

/**
 * /llms.txt (llmstxt.org): a plain summary of the clinic and links to the
 * pages that answer common questions, for AI search tools. Built from the
 * same content modules as the pages, so facts cannot drift. Static.
 */
export const dynamic = "force-static";

const url = site.url.replace(/\/$/, "");
const link = (label: string, path: string, note?: string) => `- [${label}](${url}${path === "/" ? "" : path})${note ? `: ${note}` : ""}`;

function body(): string {
  const thornhill = locations.find((l) => l.key === "thornhill");
  const maple = locations.find((l) => l.key === "maple");
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Physician-led clinic in Thornhill, Ontario, with a second clinic opening in Maple. Medical Director: Dr. Johnny Nguyen. Physicians: Dr. Johnny Nguyen and Dr. Joseph Truong. Care in English and Vietnamese.",
    "",
    "## Clinic facts",
    "",
    `- Thornhill: ${thornhill?.address ?? ""}. Phone ${site.phone}. Fax ${site.fax}. Email ${site.email}. Referrals ${site.referralsEmail}.`,
    `- Thornhill hours: ${thornhillHours.map(([d, h]) => `${d} ${h}`).join("; ")}. Closed statutory holidays.`,
    `- Maple: ${maple?.address ?? ""}. Coming soon; pre-registration is open.`,
    "- Family medicine visits and physician-ordered bloodwork are OHIP-insured. The Pain Centre is physician-led and OHIP-covered with a physician referral. Wellness infusions and aesthetic treatments are not covered by OHIP.",
    "- The website stores no patient information. Booking and registration requests go to the clinic's booking and records systems.",
    "",
  ];
  for (const d of divisionList) {
    lines.push(`## ${d.label}`, "", link(d.label, href(d.key), d.tag));
    for (const e of d.explore.slice(1)) {
      const path = href(e.page);
      if (path.startsWith(href(d.key)) && !path.includes("?")) lines.push(link(e.label, path.split("#")[0] ?? path));
    }
    for (const t of topicsFor(d.key)) {
      const path = href(t.key);
      if (!d.explore.some((e) => href(e.page) === path)) lines.push(link(t.page, path, t.lead));
    }
    if (d.key === "infusion") {
      for (const p of infusionPages) {
        const path = href(p.key);
        if (!d.explore.some((e) => href(e.page) === path)) lines.push(link(p.title, path));
      }
    }
    lines.push("");
  }
  lines.push(
    "## Patients",
    "",
    link("Book an appointment", routes.book),
    link("Register as a new patient", routes.register),
    link("Our clinics, hours and directions", routes.locations),
    link("Frequently asked questions", routes.faq),
    link(seoTitles[routes.referrals] ?? "Refer a patient", routes.referrals, "Ocean eReferral, fax or email"),
    ...topicsFor("about").map((t) => link(t.page, href(t.key), t.lead)),
    "",
    "## About",
    "",
    ...divisions.about.explore.slice(1).map((e) => link(e.label, href(e.page))),
    "",
    "## Health notes",
    "",
    ...healthNotes.map((n) => link(n.title, noteRoute(n.slug), n.dek)),
    "",
    "## Policies",
    "",
    link("Privacy policy", routes.privacy),
    link("Accessibility", routes.accessibility),
    link("Patient rights", routes.rights),
    link("Terms of use", routes.terms),
    "",
    "Information on this site is educational and is not medical advice. Results vary from person to person.",
    "",
  );
  return lines.join("\n");
}

export function GET() {
  return new Response(body(), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
