"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * After a client-side page change, move keyboard focus to the start of the
 * main content. Without this, focus stays on the menu link that was used and
 * the next Tab continues through the header of the new page.
 */
export function RouteFocus() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);
  // A link to a section that can take focus (the emergency note, a form) moves focus there,
  // so the next Tab continues inside it (a screen reader user landed back at the top).
  useEffect(() => {
    const go = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (el && el.tabIndex === -1) requestAnimationFrame(() => el.focus({ preventScroll: true }));
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, [pathname]);
  return null;
}
