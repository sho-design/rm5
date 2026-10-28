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
 * steps aside while you type in a form or once the footer is on screen (so
 * it never covers form buttons or the last rows of a page), and is hidden on
 * pages that are already a booking or contact form.
 */
export function StickyBook() {
  const pathname = usePathname();
  const [typing, setTyping] = useState(false);
  const [footer, setFooter] = useState(false);

  useEffect(() => {
    const isField = (el: EventTarget | null) => el instanceof HTMLElement && el.matches("input, textarea, select, [contenteditable]");
    const onIn = (e: FocusEvent) => setTyping(isField(e.target));
    const onOut = () => setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    const foot = document.querySelector("footer");
    const io = foot ? new IntersectionObserver(([e]) => setFooter(e.isIntersecting), { rootMargin: "0px 0px 80px 0px" }) : null;
    if (foot && io) io.observe(foot);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
      io?.disconnect();
    };
  }, [pathname]);

  if (hiddenOn.some((p) => pathname.startsWith(p))) return null;
  const away = typing || footer;
  return (
    <div className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-4 transition-transform duration-300 motion-reduce:transition-none sm:hidden ${away ? "translate-y-[120%]" : ""}`}>
      <Link href={bookingFor(pathname)} tabIndex={away ? -1 : undefined} aria-hidden={away || undefined} className="pointer-events-auto block rounded-chip bg-ink py-[15px] text-center text-[15px] font-semibold text-white shadow-sticky">
        Book an appointment
      </Link>
    </div>
  );
}
