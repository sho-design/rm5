import type { MetadataRoute } from "next";
import { noteRoute, routes } from "@/lib/routes";
import { site } from "@/content/site";
import { getHealthNotes, getLegalPages } from "@/lib/cms";

/** /sitemap.xml: every static route, each health note and each legal page. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [notes, legal] = await Promise.all([getHealthNotes(), getLegalPages()]);
  const paths = new Set<string>([...Object.values(routes), ...notes.map((n) => noteRoute(n.slug)), ...legal.map((p) => `/legal/${p.slug}`)]);
  const lastModified = new Date();
  return [...paths].map((p) => ({
    url: new URL(p, site.url).toString(),
    lastModified,
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p.startsWith("/legal") || p === routes.sitemap ? 0.3 : 0.7,
  }));
}
