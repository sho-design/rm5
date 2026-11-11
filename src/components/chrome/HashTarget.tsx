"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Makes "#id" links land properly after in-site navigation, where the browser's own :target does not update:
 * - marks the target with data-hash-target, so it gets the same outline as :target (a product opened from search,
 *   round 29);
 * - when the target is hidden at this screen size and a phone version exists ("#family-energy" has
 *   "#family-energy-m" on a phone), goes there instead and opens it if it is a <details> (tool tiles and menu
 *   links did nothing on a phone, round 29).
 */
export function HashTarget() {
  const pathname = usePathname();
  useEffect(() => {
    let marked: Element | null = null;
    const run = () => {
      marked?.removeAttribute("data-hash-target");
      marked = null;
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      let el = document.getElementById(id);
      const hidden = (e: HTMLElement | null) => !e || e.getClientRects().length === 0;
      if (hidden(el)) {
        const alt = document.getElementById(`${id}-m`);
        if (alt && !hidden(alt)) el = alt;
      }
      if (!el || hidden(el)) return;
      if (el instanceof HTMLDetailsElement) el.open = true;
      el.setAttribute("data-hash-target", "");
      marked = el;
      el.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    };
    // After the page has painted, so the target exists and layout is settled.
    const t = window.setTimeout(run, 60);
    const onHash = () => run();
    window.addEventListener("hashchange", onHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", onHash);
      marked?.removeAttribute("data-hash-target");
    };
  }, [pathname]);
  return null;
}
