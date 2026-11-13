"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { divisions, menuHeadings, navOrder } from "@/content/divisions";
import { locations, site } from "@/content/site";
import { emergencyCopy } from "@/content/patient-help";
import { href, routes, viPairs, viRoutes } from "@/lib/routes";
import { viEnabled } from "@/lib/prefs";
import { Wordmark } from "./Wordmark";
import { OpenBadge } from "./OpenBadge";
import { TextControls } from "./TextControls";
import { SocialIcons } from "./SocialIcons";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Navy mobile menu: a drawer that slides in from the right, full width on a phone and a 440px panel on a tablet
 * with the page dimmed beside it. Swipe it right, tap outside it, press Escape or use Close to put it away.
 *
 * While it is open: focus moves in and Tab stays inside (round 26, Lucas), the rest of the page is made inert so
 * screen readers cannot wander into it, and the page does not scroll. On close, focus returns to the Menu button,
 * or to the search box when the menu closed to open search. Stays mounted after the first open so it can slide
 * out as well as in. Inside: accordion divisions (Fraunces 26), clinic cards with status, EN / Tiếng Việt, 44px
 * social icons, referring doctors link and a sticky Book + Call row.
 */
export function MobileMenu({
  open: shown,
  onClose,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  // Going to search from the menu: focus belongs in the search box, not back on the Menu button.
  const toSearch = useRef(false);
  // The header passes a new onClose on each render; read the latest one so the effect below runs only on open and close.
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });

  // Opens at the section you are in: on an aesthetics page, Medical Aesthetics is already expanded.
  useEffect(() => {
    if (!shown) return;
    const here = navOrder.find((k) => {
      const base = href(divisions[k].explore[0]?.page ?? k);
      return base !== "/" && (pathname === base || pathname?.startsWith(`${base}/`));
    });
    setOpen(here ?? null);
  }, [shown, pathname]);

  useEffect(() => {
    if (!shown) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Lets the cookie banner step aside while the menu is open (it sits above the header's layer).
    document.documentElement.dataset.menu = "open";
    // Everything else on the page is inert while the menu is open: no focus, no clicks, hidden from screen readers.
    const others = Array.from(document.body.children).filter(
      (el): el is HTMLElement =>
        el !== root.current && el instanceof HTMLElement && !el.inert,
    );
    others.forEach((el) => (el.inert = true));
    box.current?.querySelector<HTMLElement>("button, a[href]")?.focus();
    // Escape closes the menu (two testers pressed it and nothing happened).
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close.current();
      // Tab stays inside the open menu instead of reaching the page hidden behind it (round 26, Lucas).
      if (e.key === "Tab" && box.current) {
        const items = [
          ...box.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        ].filter((el) => el.offsetParent !== null);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        const inside = box.current.contains(document.activeElement);
        if (e.shiftKey && (document.activeElement === first || !inside)) {
          e.preventDefault();
          last.focus();
        } else if (
          !e.shiftKey &&
          (document.activeElement === last || !inside)
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      delete document.documentElement.dataset.menu;
      others.forEach((el) => (el.inert = false));
      if (toSearch.current) toSearch.current = false;
      else document.querySelector<HTMLElement>(".rm-menu-btn")?.focus();
    };
  }, [shown]);

  // Swipe right to close, on touch only. The gesture locks to the first clear direction, so scrolling the menu up
  // and down is never mistaken for a swipe. Past 80px, or a quick flick, it closes; otherwise it springs back.
  const drag = useRef<{
    x: number;
    y: number;
    t: number;
    dx: number;
    axis: "x" | "y" | null;
  } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    drag.current = {
      x: t.clientX,
      y: t.clientY,
      t: Date.now(),
      dx: 0,
      axis: null,
    };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const d = drag.current;
    if (!d || !box.current) return;
    const t = e.touches[0];
    const dx = t.clientX - d.x;
    const dy = t.clientY - d.y;
    if (!d.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 10)
      d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    if (d.axis !== "x") return;
    d.dx = Math.max(0, dx);
    box.current.style.transition = "none";
    box.current.style.transform = `translateX(${d.dx}px)`;
  };
  const onTouchEnd = () => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.axis !== "x" || !box.current) return;
    box.current.style.transition = "";
    box.current.style.transform = "";
    if (d.dx > 80 || d.dx / Math.max(1, Date.now() - d.t) > 0.5) onClose();
  };

  return createPortal(
    <div ref={root} className="rm-drawer" data-open={shown ? "true" : "false"}>
      {/* Tablet: the dimmed page beside the panel; a tap closes the menu. Hidden from screen readers (Close is there). */}
      <div
        aria-hidden
        className="rm-drawer-overlay fixed inset-0 z-50 bg-ink/40"
        onClick={onClose}
      />
      <div
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        className="rm-drawer-panel fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-hidden rm-ink-surface bg-ink text-white md:max-w-[440px]"
      >
        <div className="flex shrink-0 items-center justify-between px-4 pb-2.5 pt-3.5">
          <Wordmark size="sm" inverse />
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => {
                toSearch.current = true;
                onSearch();
              }}
              aria-label="Search"
              className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-white/25"
            >
              <Icon name="search" size={16} stroke={2} />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[22px] leading-none text-ink"
            >
              ×
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[18px] overflow-y-auto px-4 pb-8 pt-1">
          <TextControls inverse className="flex-wrap text-[13px]" />
          <div className="flex flex-col">
            {navOrder.map((k) => {
              const d = divisions[k];
              const on = open === k;
              return (
                <div key={k} className="flex flex-col border-b border-white/12">
                  {/* The whole row expands the section (people expect that on a phone); "All ..." is its first link. */}
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={(e) => {
                      const row = e.currentTarget;
                      setOpen(on ? null : k);
                      requestAnimationFrame(() => row.scrollIntoView({ block: "nearest" }));
                    }}
                    className="grid grid-cols-[1fr_44px] items-center text-left"
                  >
                    <span className="display py-4 text-[26px] leading-none">
                      {d.label}
                    </span>
                    <span
                      aria-hidden
                      className="flex h-11 w-11 items-center justify-center text-[22px] text-white/70"
                    >
                      {on ? "−" : "+"}
                    </span>
                  </button>
                  {on ? (
                    <div className="flex flex-col pb-3">
                      {/* Every link the desktop mega menu offers: explore, book, then more. */}
                      {[d.explore, d.book, d.more].map((group, gi) => (
                        <div
                          key={gi}
                          className={cn(
                            "flex flex-col",
                            gi > 0 && "mt-2 border-t border-white/12 pt-2",
                          )}
                        >
                          {gi > 0 ? (
                            <span className="pb-1 pt-2 text-[13px] font-semibold tracking-[.04em] text-white/70">
                              {gi === 1
                                ? menuHeadings.book(d)
                                : menuHeadings.more(d)}
                            </span>
                          ) : null}
                          {group.map((e) => (
                            <Link
                              key={e.label}
                              href={href(e.page)}
                              onClick={onClose}
                              className="flex justify-between py-3 text-[15px] text-white/85"
                            >
                              <span>{e.label}</span>
                              <span aria-hidden className="text-white/50">
                                ›
                              </span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] font-semibold tracking-[.04em] text-white/55">
              CLINICS
            </span>
            {locations.map((l) => (
              <Link
                key={l.key}
                href={`${routes.locations}#${l.key}`}
                onClick={onClose}
                className="flex items-center justify-between gap-3 rounded-row bg-white/7 px-4 py-3.5"
              >
                <span className="flex min-w-0 flex-col gap-[3px]">
                  <span className="text-[15px] font-semibold">{l.name}</span>
                  <span className="text-[13px] text-white/65">
                    {l.addressLines[0]}
                  </span>
                </span>
                {l.soon ? (
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold text-sun">
                    <span
                      aria-hidden
                      className="h-[7px] w-[7px] rounded-full bg-sun"
                    />
                    Coming soon
                  </span>
                ) : (
                  <OpenBadge inverse className="text-right text-white" />
                )}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3">
            {viEnabled ? (
              <Link
                href={viPairs[pathname ?? "/"] ?? viRoutes.home}
                hrefLang="vi"
                lang="vi"
                className="rounded-chip border-[1.5px] border-white/25 px-4 py-[10px] text-[13px] font-semibold text-white"
              >
                Tiếng Việt
              </Link>
            ) : (
              <span />
            )}
            <SocialIcons size={44} />
          </div>
          {/* For people who are not sure it is an emergency: a tester short of breath found only departments here. */}
          <a
            href="tel:811"
            className="flex flex-col gap-0.5 rounded-row bg-white/7 px-4 py-3.5"
          >
            <span className="text-[13px] text-white/75">
              {emergencyCopy.unsure}
            </span>
            <span className="text-[15px] font-semibold text-white">
              {emergencyCopy.call811}
            </span>
          </a>
          <Link
            href={routes.contact}
            onClick={onClose}
            className="text-[15px] font-semibold text-white"
          >
            {menuHeadings.contact} ›
          </Link>
          <Link
            href={routes.referrals}
            onClick={onClose}
            className="text-[13px] font-semibold text-sun"
          >
            For referring doctors ›
          </Link>
        </div>
        <div className="rm-menu-foot flex shrink-0 flex-col gap-2 border-t border-white/12 rm-ink-surface bg-ink px-4 pb-4 pt-2.5">
          {/* No tel:911 link anywhere on the site: the clinic does not want accidental emergency calls. 911 is plain text. */}
          <p
            aria-label={emergencyCopy.closedLine}
            className="text-center text-[15px] font-semibold leading-tight text-sun"
          >
            <span className="rm-911-long">{emergencyCopy.closedLine}</span>
            <span aria-hidden className="rm-911-short">
              {emergencyCopy.call911}
            </span>
          </p>
          <div className="flex flex-1 gap-2">
            <Link
              href={routes.book}
              onClick={onClose}
              className="flex flex-[1.4] items-center justify-center rounded-chip bg-sun px-3 py-[13px] text-center text-[15px] font-semibold leading-tight text-sun-ink"
            >
              <span className="rm-menu-book-long">Book an appointment</span>
              <span className="rm-menu-book-short">Book</span>
            </Link>
            <a
              href={site.phoneHref}
              aria-label={`${emergencyCopy.callClinic}, ${site.phone}`}
              className="flex flex-1 items-center justify-center rounded-chip border-[1.5px] border-white/35 px-2 py-[13px] text-center text-[15px] font-semibold leading-tight"
            >
              {emergencyCopy.callClinic}
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
