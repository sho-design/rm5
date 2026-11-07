import type { Metadata } from "next";
import { routes, viPairs, type PageKey } from "./routes";
import { site } from "@/content/site";
import { getPageSeo } from "./cms";
import { homeTitle, seoTitles } from "@/content/seo-titles";

/**
 * Page metadata = the page's built-in defaults, overridden field by field
 * by whatever the team saved under Page SEO in the admin panel. Search
 * titles come from content/seo-titles.ts when the admin has not set one.
 * Adds the canonical URL and Open Graph fields every page should carry.
 */
/** Generated brand share image (src/app/(site)/og.png/route.tsx). */
export const defaultShareImage = { url: "/og.png", alt: "Restoration Medical, physician-led clinic in Thornhill, Ontario" };

/** hreflang pair for a page that has a Vietnamese version. English stays the default. */
export function langAlternates(en: string, vi: string) {
  const u = (p: string) => `${site.url}${p === "/" ? "" : p}`;
  return { "en-CA": u(en), vi: u(vi), "x-default": u(en) };
}

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
    alternates: { ...(defaults.alternates ?? {}), canonical, ...(viPairs[path] ? { languages: langAlternates(path, viPairs[path]) } : {}) },
    openGraph: { ...(defaults.openGraph ?? {}), title: ogTitle, description: description ?? undefined, url: canonical, images: [{ url: ogImage ?? defaultShareImage.url, width: 1200, height: 630, alt: ogImage ? undefined : defaultShareImage.alt }] },
    twitter: { card: "summary_large_image", title: ogTitle, description: description ?? undefined, images: [ogImage ?? defaultShareImage.url] },
    robots: override.noIndex ? { index: false, follow: false } : defaults.robots,
  };
}
