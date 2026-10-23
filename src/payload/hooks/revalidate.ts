import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

/**
 * The public site is static. After an edit, ask Next to rebuild only the
 * affected paths so changes appear within seconds without a redeploy.
 * Outside a Next request (the seed script, the CLI) revalidation is a no-op.
 */
async function revalidate(paths: string[]) {
  if (process.env.PAYLOAD_SEED === "1") return;
  try {
    const { revalidatePath, revalidateTag } = await import("next/cache");
    revalidateTag("cms");
    for (const p of paths) revalidatePath(p);
  } catch {
    /* not inside a Next.js request context */
  }
}

/** Paths each collection feeds. Dynamic slugs are added per document. */
const pathsFor: Record<string, string[]> = {
  "health-notes": ["/", "/health-notes"],
  jobs: ["/about/careers"],
  team: ["/about/team", "/family-medicine/children-youth"],
  faq: ["/about/faq"],
  locations: ["/about/clinics", "/", "/about/contact"],
  announcements: ["/"],
  "legal-pages": ["/legal/privacy", "/legal/accessibility", "/legal/patient-rights", "/legal/terms"],
  "page-seo": ["/"],
  redirects: [],
  media: [],
};

function docPaths(slug: string, doc: Record<string, unknown>): string[] {
  const base = [...(pathsFor[slug] ?? [])];
  if (slug === "health-notes" && typeof doc.slug === "string") base.push(`/health-notes/${doc.slug}`);
  if (slug === "legal-pages" && typeof doc.slug === "string") base.push(`/legal/${doc.slug}`);
  if (slug === "page-seo" && typeof doc.path === "string") base.push(doc.path);
  return base;
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, collection }) => {
  await revalidate(docPaths(collection.slug, doc as Record<string, unknown>));
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, collection }) => {
  await revalidate(docPaths(collection.slug, doc as Record<string, unknown>));
  return doc;
};

/** Site settings touch every page: revalidate the layout tree. */
export const revalidateSiteAfterChange: GlobalAfterChangeHook = async ({ doc }) => {
  await revalidate(["/"]);
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");
  } catch {
    /* outside Next */
  }
  return doc;
};
