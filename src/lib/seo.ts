import type { Metadata } from "next";
import { routes, type PageKey } from "./routes";
import { site } from "@/content/site";
import { getPageSeo } from "./cms";
import { homeTitle, seoTitles } from "@/content/seo-titles";

/**
 * Page metadata = the page's built-in defaults, overridden field by field
 * by whatever the team saved under Page SEO in the admin panel. Search
 * titles come from content/seo-titles.ts when the admin has not set one.
 * Adds the canonical URL and Open Graph fields every page should carry.
 */
export async function pageMetadata(key: PageKey | string, defaults: Metadata): Promise<Metadata> {
  const path = key in routes ? routes[key as PageKey] : key;
  const override = (await getPageSeo(path)) ?? {};
  // Admin override, then the location-led search title, then the page's own default.
  const local = path === "/" ? { absolute: homeTitle } : seoTitles[path];
  const title = override.title ?? local ?? defaults.title;
  const description = override.description ?? defaults.description ?? site.description;
  const canonical = override.canonical ?? `${site.url}${path === "/" ? "" : path}`;
  const ogTitle = typeof title === "string" ? title : title && typeof title === "object" && "absolute" in title ? String(title.absolute) : undefined;
  const ogImage = override.ogImage;
  return {
    ...defaults,
    title,
    description,
    alternates: { ...(defaults.alternates ?? {}), canonical },
    openGraph: { ...(defaults.openGraph ?? {}), title: ogTitle, description: description ?? undefined, url: canonical, ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}) },
    robots: override.noIndex ? { index: false, follow: false } : defaults.robots,
  };
}
