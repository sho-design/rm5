"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { NavKey } from "@/content/types";
import { divisions, navOrder } from "@/content/divisions";
import { site } from "@/content/site";
import { href, routes } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Wordmark } from "./Wordmark";
import { MegaMenu } from "./MegaMenu";
import { SearchOverlay } from "./SearchOverlay";
import { MobileMenu } from "./MobileMenu";
import { Icon } from "@/components/ui/Icon";

/**
 * 56px white header: wordmark, pill nav with hover mega menu per division,
 * search, phone and Book (navy pill). Mobile: search + hamburger opening
 * the full-screen navy menu. Menu closes on mouse leave of the header and on
 * navigation.
 */
export function Header() {
  const [menu, setMenu] = useState<NavKey | null>(null);
  const [search, setSearch] = useState(false);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenu(null);
    setSearch(false);
    setMobile(false);
  }, [pathname]);

  const closeMenu = useCallback(() => setMenu(null), []);
  const closeSearch = useCallback(() => setSearch(false), []);

  const active = navOrder.find((k) => pathname === href(k) || (k !== "about" ? pathname.startsWith(href(k) + "/") : pathname.startsWith("/about")));

  return (
    <header className={cn("sticky top-0 z-40 border-b border-border transition-colors", menu ? "bg-card" : "bg-page")} onMouseLeave={closeMenu}>
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between gap-3 px-4 md:px-8">
        <div onMouseEnter={closeMenu}>
          <Wordmark />
        </div>
        <nav className="hidden gap-1 text-[14px] lg:flex" aria-label="Primary">
          {navOrder.map((k) => {
            const on = menu === k;
            return (
              <Link
                key={k}
                href={href(k)}
                onMouseEnter={() => setMenu(k)}
                onFocus={() => setMenu(k)}
                aria-expanded={on}
                className={cn("whitespace-nowrap rounded-chip px-3.5 py-2 transition-colors", on ? "bg-ink text-white" : "hover:bg-card", active === k ? "font-semibold" : "font-medium")}
              >
                {divisions[k].label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1.5 text-[14px] font-medium md:gap-2" onMouseEnter={closeMenu}>
          <button
            type="button"
            onClick={() => {
              setSearch((s) => !s);
              setMenu(null);
            }}
            aria-label="Search"
            aria-expanded={search}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-[1.5px] border-border transition-colors hover:border-sky"
          >
            <Icon name="search" size={16} stroke={2} />
          </button>
          <a href={site.phoneHref} className="hidden whitespace-nowrap rounded-chip border-[1.5px] border-border px-3.5 py-[9px] transition-colors hover:border-sky md:block">
            {site.phone}
          </a>
          <Link href={routes.book} className="hidden rounded-chip bg-ink px-4 py-[9px] text-white hover:opacity-90 sm:block">
            Book
          </Link>
          <button
            type="button"
            onClick={() => setMobile(true)}
            aria-label="Menu"
            aria-expanded={mobile}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-[1.5px] border-border text-[16px] lg:hidden"
          >
            ☰
          </button>
        </div>
      </div>
      {search ? (
        <div className="border-t border-border bg-card">
          <div className="mx-auto w-full max-w-[1440px]">
            <SearchOverlay onClose={closeSearch} />
          </div>
        </div>
      ) : null}
      {menu && !search ? (
        <div className="hidden border-t border-border bg-card lg:block">
          <div className="mx-auto w-full max-w-[1440px]">
            <MegaMenu menuKey={menu} onNavigate={closeMenu} />
          </div>
        </div>
      ) : null}
      {mobile ? (
        <MobileMenu
          onClose={() => setMobile(false)}
          onSearch={() => {
            setMobile(false);
            setSearch(true);
          }}
        />
      ) : null}
    </header>
  );
}
