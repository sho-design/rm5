"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bookFor, routes, type PageKey } from "@/lib/routes";
import { topicVisit } from "@/content/topic-visits";

/** Division booked from each section of the site. */
const sections: [string, string][] = [
  ["/family-medicine", "family"],
  ["/pain-centre", "pain"],
  ["/infusion-therapy", "infusion"],
  ["/medical-aesthetics", "aesthetics"],
  ["/rehab-recovery", "rehab"],
];

/** Pages whose own booking or form would sit under the bar. */
const hiddenOn = [routes.book, routes.register, routes.contact, routes.referrals, routes.careers];

function bookingFor(pathname: string): string {
  const section = sections.find(([prefix]) => pathname === prefix || pathname.startsWith(prefix + "/"));
  if (!section) return routes.book;
  const topic = Object.entries(topicVisit).find(([key]) => routes[key as PageKey] === pathname);
  return bookFor(section[1], topic?.[1]);
}

/**
 * Mobile sticky Book button. It books the service of the section you are in,
 * and steps aside while you type in a form, while a form or another booking
 * button is on screen (it would only cover it), and once the footer is in
 * view, or while you scroll down to read (it comes back on scroll up).
 * Hidden on pages that are already a booking or contact form.
 */
export function StickyBook() {
  const pathname = usePathname();
  const [typing, setTyping] = useState(false);
  const [footer, setFooter] = useState(false);
  const [covered, setCovered] = useState(false);
  /** Reading down the page: the bar slides away so it never sits on the lines being read; it returns on scroll up. */
  const [reading, setReading] = useState(false);

  useEffect(() => {
    const isField = (el: EventTarget | null) => el instanceof HTMLElement && el.matches("input, textarea, select, [contenteditable]");
    const onIn = (e: FocusEvent) => setTyping(isField(e.target));
    const onOut = () => setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    const foot = document.querySelector("footer");
    const io = foot ? new IntersectionObserver(([e]) => setFooter(e.isIntersecting), { rootMargin: "0px 0px 80px 0px" }) : null;
    if (foot && io) io.observe(foot);
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 8) return;
      setReading(y > lastY && y > 160);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Booking buttons and forms already on screen: the bar would duplicate or cover them.
    const seen = new Set<Element>();
    const watch = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target);
        else seen.delete(e.target);
      }
      setCovered(seen.size > 0);
    });
    document.querySelectorAll('main a[href^="/book"], main form, main [data-keep-clear]').forEach((el) => watch.observe(el));
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      watch.disconnect();
    };
  }, [pathname]);

  if (hiddenOn.some((p) => pathname.startsWith(p))) return null;
  const away = typing || footer || covered || reading;
  return (
    <div className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-4 transition-transform duration-300 motion-reduce:transition-none sm:hidden ${away ? "translate-y-[120%]" : ""}`}>
      <Link href={bookingFor(pathname)} tabIndex={away ? -1 : undefined} aria-hidden={away || undefined} className="pointer-events-auto block rounded-chip bg-ink py-[15px] text-center text-[15px] font-semibold text-white shadow-sticky outline outline-1 outline-white/50">
        Book an appointment
      </Link>
    </div>
  );
}
