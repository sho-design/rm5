import { notFound } from "next/navigation";

/** Unmatched URLs render the site's 404 inside the site layout (the app has two root layouts). */
export default function CatchAll() {
  notFound();
}
