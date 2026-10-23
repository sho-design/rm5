"use client";

import Link from "next/link";
import type { NavKey } from "@/content/types";
import { divisions } from "@/content/divisions";
import { href } from "@/lib/routes";

/**
 * Hover mega menu: three columns on paper. Explore (Fraunces 26 links),
 * Book (14px semibold, booking routes with the service preselected) and
 * More (14px semibold, related pages).
 */
export function MegaMenu({ menuKey, onNavigate }: { menuKey: NavKey; onNavigate: () => void }) {
  const d = divisions[menuKey];
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
            <Link key={b.label} href={href(b.page)} onClick={onNavigate} className="hover:text-sky">
              {b.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[18px]">
        <span className="text-[12px] font-semibold text-muted">More from {d.label}</span>
        <div className="flex flex-col gap-3 text-[14px] font-semibold">
          {d.more.map((m) => (
            <Link key={m.label} href={href(m.page)} onClick={onNavigate} className="hover:text-sky">
              {m.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
