import { unstable_cache } from "next/cache";
import { buildSearchIndex } from "@/lib/search-build";

/**
 * /search-index.json: the full site search index (page text, FAQ answers,
 * health notes, team, open roles), fetched by the search overlay the first
 * time it opens. Static, rebuilt when CMS content changes (the "cms" tag)
 * and at most every 10 minutes.
 */
export const dynamic = "force-static";
export const revalidate = 600;

const load = unstable_cache(buildSearchIndex, ["search-index"], { tags: ["cms"], revalidate: 600 });

export async function GET() {
  const docs = await load();
  return new Response(JSON.stringify(docs), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=600, stale-while-revalidate=86400" },
  });
}
