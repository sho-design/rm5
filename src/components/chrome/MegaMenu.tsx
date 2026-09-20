"use client";

import Link from "next/link";
import type { NavKey } from "@/content/types";
import { divisions } from "@/content/divisions";
import { href, routes } from "@/lib/routes";

/**
 * Hover mega menu: three columns on paper. Explore (Fraunces 26 links),
 * Book (14px semibold, all go to /book, or /about/clinics for About) and
 * More (14px semibold, all go to the division page).
 */
export function MegaMenu({ menuKey, onNavigate }: { menuKey: NavKey; onNavigate: () => void }) {
  const d = divisions[menuKey];
  const bookTo = menuKey === "about" ? routes.locations : routes.book;
  return (
    <div className="grid grid-cols-1 gap-8 bg-card px-8 pb-12 pt-10 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-10" role="region" aria-label={`${d.label} menu`}>
      <div className="flex flex-col gap-[18px]">
        <span className="text-[12px] font-semibold text-muted">Explore {d.label}</span>
        <div className="flex flex-col gap-2.5">
          {d.explore.map((e) => (
            <Link key={e.label} href={href(e.page)} onClick={onNavigate} className="display text-[26px] leading-[1.1] hover:text-sky">
              {e.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[18px]">
        <span className="text-[12px] font-semibold text-muted">Book {d.label}</span>
        <div className="flex flex-col gap-3 text-[14px] font-semibold">
          {d.book.map((b) => (
            <Link key={b} href={bookTo} onClick={onNavigate} className="hover:text-sky">
              {b}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[18px]">
        <span className="text-[12px] font-semibold text-muted">More from {d.label}</span>
        <div className="flex flex-col gap-3 text-[14px] font-semibold">
          {d.more.map((m) => (
            <Link key={m} href={m === "FAQ" ? routes.faq : m === "Privacy" ? routes.privacy : m === "Accessibility" ? routes.accessibility : href(menuKey)} onClick={onNavigate} className="hover:text-sky">
              {m}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
