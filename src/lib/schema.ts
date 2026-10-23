/**
 * Structured data (schema.org JSON-LD). The site-wide graph describes the
 * organisation, the website, the Thornhill clinic and its physicians; pages
 * add breadcrumbs, FAQ and article data. Facts come from content/site.ts so
 * they never disagree with what the page shows. Maple is left out until it
 * opens, so no one sees hours for a clinic that is not seeing patients.
 */
import { site, locations, openingHours, socials } from "@/content/site";
import { external } from "@/lib/routes";
import type { FaqItem, HealthNote } from "@/content/types";

const url = site.url.replace(/\/$/, "");
const abs = (path: string) => (path.startsWith("http") ? path : `${url}${path === "/" ? "" : path}`);
const tel = (n: string) => `+1-${n}`;
const ids = {
  org: `${url}/#organization`,
  website: `${url}/#website`,
  thornhill: `${url}/about/clinics#thornhill`,
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hhmm = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${h % 1 ? "30" : "00"}`;

/** Opening hours grouped by identical open/close times. */
function hoursSpec() {
  const groups = new Map<string, string[]>();
  for (let d = 0; d < 7; d++) {
    const h = openingHours[d];
    if (!h) continue;
    const key = `${hhmm(h[0])}-${hhmm(h[1])}`;
    groups.set(key, [...(groups.get(key) ?? []), dayNames[d] as string]);
  }
  return [...groups.entries()].map(([k, days]) => {
    const [opens, closes] = k.split("-");
    return { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes };
  });
}

export function siteGraph() {
  const thornhill = locations.find((l) => l.key === "thornhill");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalOrganization",
        "@id": ids.org,
        name: site.name,
        url,
        slogan: site.signoff,
        email: site.email,
        telephone: tel(site.phone),
        sameAs: socials.map((s) => s.href),
      },
      { "@type": "WebSite", "@id": ids.website, url, name: site.name, inLanguage: "en-CA", publisher: { "@id": ids.org } },
      {
        "@type": "MedicalClinic",
        "@id": ids.thornhill,
        name: `${site.name} Thornhill`,
        parentOrganization: { "@id": ids.org },
        url: abs("/about/clinics"),
        telephone: tel(site.phone),
        faxNumber: tel(site.fax),
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: thornhill?.addressLines[0] ?? "700 Centre St",
          addressLocality: "Thornhill",
          addressRegion: "ON",
          postalCode: "L4J 0A7",
          addressCountry: "CA",
        },
        geo: { "@type": "GeoCoordinates", latitude: 43.8116505, longitude: -79.4510506 },
        hasMap: external.thornhillMaps,
        openingHoursSpecification: hoursSpec(),
        isAcceptingNewPatients: true,
        availableLanguage: ["English", "Vietnamese"],
        medicalSpecialty: ["PrimaryCare", "Physiotherapy"],
        isAccessibleForFree: false,
        publicAccess: true,
      },
      {
        "@type": "Person",
        name: "Dr. Johnny Nguyen",
        jobTitle: "Physician, Medical Director",
        worksFor: { "@id": ids.thornhill },
        alumniOf: { "@type": "CollegeOrUniversity", name: "University of Toronto" },
      },
      { "@type": "Person", name: "Dr. Joseph Truong", jobTitle: "Physician", worksFor: { "@id": ids.thornhill } },
    ],
  };
}

/** Breadcrumb trail: Home, then each [name, path] pair. */
export function breadcrumbs(trail: [string, string][]) {
  const items: [string, string][] = [["Home", "/"], ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
  };
}

export function faqPage(items: Pick<FaqItem, "q" | "a">[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** "Sep 2026" or an ISO date to YYYY-MM-DD (first of the month for month-only dates). */
function isoDate(d: string): string | undefined {
  const parsed = /^\d{4}-\d{2}-\d{2}/.test(d) ? new Date(d) : new Date(`${d.replace(/^(\w{3})\w*\s/, "$1 1, ")} 12:00:00`);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
}

export function article(note: HealthNote, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.dek,
    image: note.img ? [note.img] : undefined,
    datePublished: isoDate(note.date),
    author: [{ "@type": "Person", name: note.author }, ...(note.coAuthor ? [{ "@type": "Person", name: note.coAuthor }] : [])],
    publisher: { "@id": ids.org },
    mainEntityOfPage: abs(path),
    about: note.division,
  };
}
