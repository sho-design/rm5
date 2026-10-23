import { notFound, permanentRedirect, redirect } from "next/navigation";
import { getRedirect } from "@/lib/cms";

type Params = { params: Promise<{ notFound: string[] }> };

/**
 * Unmatched URLs: first check the admin's Redirects list (old website
 * addresses), then render the site's 404 inside the site layout (the app
 * has two root layouts). Only addresses with no page ever reach this.
 */
export default async function CatchAll({ params }: Params) {
  const segments = (await params).notFound ?? [];
  const path = "/" + segments.map((s) => decodeURIComponent(s)).join("/");
  const r = await getRedirect(path);
  if (r) {
    if (r.permanent) permanentRedirect(r.to);
    redirect(r.to);
  }
  notFound();
}
