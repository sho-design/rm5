"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import type { NavKey } from "@/content/types";
import { divisions, navOrder } from "@/content/divisions";
import { site } from "@/content/site";
import { href, routes } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Wordmark } from "./Wordmark";
import { MegaMenu } from "./MegaMenu";
import dynamic from "next/dynamic";

// Search (with its index) and the phone menu load only when opened, so they do not delay
// the first page on a slow phone.
const SearchOverlay = dynamic(() => import("./SearchOverlay").then((m) => m.SearchOverlay), { ssr: false });
const MobileMenu = dynamic(() => import("./MobileMenu").then((m) => m.MobileMenu), { ssr: false });
import { Icon } from "@/components/ui/Icon";

/**
 * 56px white header: wordmark, pill nav with hover mega menu per division,
 * search, phone and Book (navy pill). Mobile: search + hamburger opening
 * the full-screen navy menu. Menu closes on mouse leave of the header and on
 * navigation.
 *
 * Keyboard: each division link is followed by a small "open menu" button
 * (visible when focused) and the open menu sits right after it in the tab
 * order. Escape closes the menu and returns focus to that button; tabbing
 * out of the header closes it too. Menus never open on focus alone.
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
  const toggles = useRef<Partial<Record<NavKey, HTMLButtonElement | null>>>({});

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== "Escape" || !menu) return;
    e.preventDefault();
    const k = menu;
    setMenu(null);
    toggles.current[k]?.focus();
  };
  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (menu && !e.currentTarget.contains(e.relatedTarget as Node | null)) setMenu(null);
  };
  const searchButton = useRef<HTMLButtonElement>(null);
  // Closing search (Esc, Close) puts focus back on the Search button instead of the page body.
  const closeSearch = useCallback(() => {
    setSearch(false);
    requestAnimationFrame(() => {
      const a = document.activeElement;
      if (!a || a === document.body) searchButton.current?.focus();
    });
  }, []);

  const active = navOrder.find((k) => pathname === href(k) || (k !== "about" ? pathname.startsWith(href(k) + "/") : pathname.startsWith("/about")));

  return (
    <header className={cn("sticky top-0 z-40 border-b border-border transition-colors", menu ? "bg-card" : "bg-page")} onMouseLeave={closeMenu} onKeyDown={onKeyDown} onBlur={onBlur}>
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between gap-3 px-4 md:px-8">
        <div onMouseEnter={closeMenu}>
          <Wordmark />
        </div>
        <nav className="rm-desktop-nav hidden gap-1 text-[14px] lg:flex" aria-label="Primary">
          {navOrder.map((k) => {
            const on = menu === k;
            return (
              <Fragment key={k}>
                <span className="relative flex items-center">
                  <Link
                    href={href(k)}
                    onMouseEnter={() => setMenu(k)}
                    aria-current={active === k ? "page" : undefined}
                    className={cn("whitespace-nowrap rounded-chip px-3.5 py-2 transition-colors", on ? "bg-ink text-white" : "hover:bg-card", active === k ? "font-semibold" : "font-medium")}
                  >
                    {divisions[k].label}
                  </Link>
                  <button
                    ref={(el) => {
                      toggles.current[k] = el;
                    }}
                    type="button"
                    aria-expanded={on}
                    aria-controls={`mega-${k}`}
                    onClick={() => {
                      setSearch(false);
                      setMenu(on ? null : k);
                    }}
                    className="sr-only rounded-full text-[12px] focus-visible:not-sr-only focus-visible:absolute focus-visible:-bottom-3 focus-visible:left-1/2 focus-visible:z-10 focus-visible:-translate-x-1/2 focus-visible:bg-ink focus-visible:px-2 focus-visible:py-0.5 focus-visible:text-white"
                  >
                    <span aria-hidden>{on ? "▴" : "▾"}</span>
                    <span className="sr-only">{`${divisions[k].label} menu`}</span>
                  </button>
                </span>
                {on && !search ? (
                  <div id={`mega-${k}`} className="absolute inset-x-0 top-full border-y border-border bg-card shadow-card">
                    <div className="mx-auto w-full max-w-[1440px]">
                      <MegaMenu menuKey={k} onNavigate={closeMenu} />
                    </div>
                  </div>
                ) : null}
              </Fragment>
            );
          })}
        </nav>
        <div className="flex items-center gap-1.5 text-[14px] font-medium md:gap-2" onMouseEnter={closeMenu}>
          <button
            ref={searchButton}
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
          <a href={site.phoneHref} className="rm-header-phone hidden whitespace-nowrap rounded-chip border-[1.5px] border-border px-3.5 py-[9px] transition-colors hover:border-sky md:block">
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
            className="rm-menu-btn flex h-[38px] w-[38px] items-center justify-center rounded-full border-[1.5px] border-border text-[16px] lg:hidden"
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
