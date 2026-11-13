"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { NavKey } from "@/content/types";
import { divisionAccent, divisionTint, divisions } from "@/content/divisions";
import { href } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { bookingFor } from "./StickyBook";

type Section = { el: HTMLElement; label: string };

/** The page's own name: the label it has in its division's menu, else its h1. */
function pageLabel(pathname: string, k: NavKey | undefined): string | null {
  if (pathname === "/") return "Home";
  if (k && pathname === href(k)) return null;
  if (k) {
    for (const v of Object.values(divisions[k])) {
      if (!Array.isArray(v)) continue;
      for (const it of v as { label?: string; page?: string }[]) {
        if (
          it &&
          typeof it.label === "string" &&
          typeof it.page === "string" &&
          href(it.page) === pathname
        )
          return it.label;
      }
    }
  }
  const h1 = document.querySelector("main h1");
  return h1?.textContent?.trim().replace(/\.$/, "") || null;
}

/** Visible section headings in the page, in order. */
function findSections(): Section[] {
  return [...document.querySelectorAll<HTMLElement>("main h2")]
    .filter(
      (h) =>
        h.offsetParent !== null &&
        !h.closest(
          ".sr-only,[hidden],[aria-hidden='true'],dialog,details:not([open])",
        ) &&
        (h.textContent ?? "").trim().length > 1,
    )
    .map((h) => ({
      el: h,
      label: (h.textContent ?? "").trim().replace(/[.?]$/, "").slice(0, 60),
    }));
}

/**
 * The slim "you are here" bar (navigation review, Nov 2026, option H). Once you scroll past the opening of a
 * page, the full header steps aside and this one line shows the section of the site, the page and the part of
 * the page you are reading, with a progress line and the page's own booking button. The last part opens a
 * list of the page's sections. Scrolling back up, or tabbing into the header, brings the full header back.
 */
export function WayBar({
  show,
  active,
  onMenu,
}: {
  show: boolean;
  active: NavKey | undefined;
  onMenu: () => void;
}) {
  const pathname = usePathname();
  const [page, setPage] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [current, setCurrent] = useState(-1);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const listId = useId();
  // Mouse users: the section list opens on hover after a short pause and closes a moment after the pointer
  // leaves the button and the list (so it does not flash open in passing). Click, keyboard and touch unchanged.
  const hoverTimer = useRef<number | undefined>(undefined);
  const byHover = useRef(false);
  // The list sits under the section button on wider screens.
  const toggle = useRef<HTMLButtonElement>(null);
  const [listLeft, setListLeft] = useState<number | null>(null);
  useEffect(() => {
    if (!open || !toggle.current || !bar.current) return;
    const b = bar.current.firstElementChild?.getBoundingClientRect();
    const t = toggle.current.getBoundingClientRect();
    setListLeft(b && t.width ? Math.max(0, t.left - b.left) : null);
  }, [open]);
  const hoverIn = (e: { pointerType: string }) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    if (open) return;
    hoverTimer.current = window.setTimeout(() => {
      byHover.current = true;
      setOpen(true);
    }, 140);
  };
  const hoverOut = (e: { pointerType: string }) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    if (!byHover.current) return;
    hoverTimer.current = window.setTimeout(() => {
      byHover.current = false;
      setOpen(false);
    }, 280);
  };
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  // Read the page once it has rendered (and again shortly after, for sections that load late).
  useEffect(() => {
    setOpen(false);
    const read = () => {
      setPage(pageLabel(pathname, active));
      setSections(findSections());
    };
    read();
    const t = window.setTimeout(read, 900);
    return () => window.clearTimeout(t);
  }, [pathname, active]);

  // Which section is under the bar, and how far down the page you are.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = 120;
      let i = -1;
      sections.forEach((s, n) => {
        if (s.el.getBoundingClientRect().top < line) i = n;
      });
      setCurrent(i);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sections]);

  // The list closes on Escape, on a tap outside, and when the bar hides.
  useEffect(() => {
    if (!show) setOpen(false);
  }, [show]);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        bar.current
          ?.querySelector<HTMLButtonElement>("[data-way-toggle]")
          ?.focus();
      }
    };
    const click = (e: MouseEvent) => {
      if (bar.current && !bar.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("mousedown", click);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("mousedown", click);
    };
  }, [open]);

  const go = (s: Section) => {
    byHover.current = false;
    setOpen(false);
    s.el.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    if (!s.el.hasAttribute("tabindex")) s.el.setAttribute("tabindex", "-1");
    s.el.focus({ preventScroll: true });
  };

  const division = active ? divisions[active].label : null;
  const here = current >= 0 ? sections[current]?.label : null;
  const short = here ?? page ?? division ?? "Restoration Medical";
  const book = bookingFor(pathname);

  return (
    <div
      ref={bar}
      inert={!show}
      aria-hidden={!show}
      className={cn(
        "rm-waybar fixed inset-x-0 top-2 z-40 px-2 transition-[opacity,transform] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-opacity md:px-gutter",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-3 opacity-0",
      )}
    >
      <div className="relative mx-auto flex h-14 w-full max-w-[1392px] items-center gap-2 overflow-hidden rounded-[16px] border border-border bg-page pl-2 pr-2 shadow-sticky md:gap-3 md:pl-3">
        <Link
          href="/"
          aria-label="Restoration Medical home"
          className="flex h-11 w-11 shrink-0 items-center justify-center"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-ink font-display text-[16px] font-medium text-white">
            R
          </span>
        </Link>
        <nav
          aria-label="You are here"
          className="flex min-w-0 flex-1 items-center gap-2 text-[15px] md:flex-none"
        >
          {/* Phones: one button with the page or section you are on. */}
          <button
            type="button"
            data-way-toggle
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={listId}
            className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-[12px] px-2 text-left md:hidden"
          >
            {active ? (
              <span
                aria-hidden
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: divisionAccent[active] }}
              />
            ) : null}
            {/* Two lines on phones (the page above, the part you are reading below) so neither is cut off. */}
            <span className="flex min-w-0 flex-col leading-tight">
              {(page ?? division) && here ? (
                <span className="truncate text-[13px] font-medium text-secondary">
                  {page ?? division}
                </span>
              ) : null}
              <span className="truncate font-semibold">{short}</span>
            </span>
            <span aria-hidden className="ml-auto shrink-0 text-[13px]">
              {open ? "▴" : "▾"}
            </span>
            <span className="sr-only">, show the sections of this page</span>
          </button>
          {/* Wider screens: the whole path. */}
          <span className="hidden min-w-0 items-center gap-2 md:flex">
            {active ? (
              <Link
                href={href(active)}
                className="flex h-10 shrink-0 items-center gap-2 rounded-chip px-3 font-semibold"
                style={{ background: divisionTint[active] }}
              >
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ background: divisionAccent[active] }}
                />
                {division}
              </Link>
            ) : null}
            {page ? (
              <>
                {active ? (
                  <span aria-hidden className="text-muted">
                    ›
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="truncate font-semibold hover:underline"
                  title="Back to the top of this page"
                >
                  {page}
                </button>
              </>
            ) : null}
            {sections.length ? (
              <>
                {active || page ? (
                  <span aria-hidden className="text-muted">
                    ›
                  </span>
                ) : null}
                <button
                  ref={toggle}
                  type="button"
                  data-way-toggle
                  onClick={() => {
                    window.clearTimeout(hoverTimer.current);
                    // A click on a list opened by hover keeps it open; otherwise it toggles.
                    if (byHover.current && open) byHover.current = false;
                    else setOpen((o) => !o);
                  }}
                  onPointerEnter={hoverIn}
                  onPointerLeave={hoverOut}
                  aria-expanded={open}
                  aria-controls={listId}
                  className="flex h-10 min-w-0 items-center gap-1.5 rounded-chip border border-border px-3 text-secondary transition-colors hover:border-ink"
                >
                  <span className="truncate">{here ?? "On this page"}</span>
                  <span aria-hidden className="text-[12px]">
                    {open ? "▴" : "▾"}
                  </span>
                  <span className="sr-only">
                    , show the sections of this page
                  </span>
                </button>
              </>
            ) : null}
          </span>
        </nav>
        <span
          aria-hidden
          className="mx-2 hidden h-1 min-w-[48px] flex-1 overflow-hidden rounded-full bg-[color:var(--border-default)] md:block"
        >
          <span
            ref={progress}
            className="block h-full w-full origin-left rounded-full"
            style={{
              background: active ? divisionAccent[active] : "var(--rm-ink)",
              transform: "scaleX(0)",
            }}
          />
        </span>
        <button
          type="button"
          onClick={onMenu}
          className="flex h-11 shrink-0 items-center rounded-chip border border-border px-3.5 text-[14px] font-medium transition-colors hover:border-ink md:h-10"
        >
          Menu
        </button>
        <Link
          href={book}
          className="hidden h-10 shrink-0 items-center rounded-chip bg-ink px-4 text-[14px] font-semibold text-white hover:opacity-90 sm:flex"
        >
          Book
        </Link>
      </div>
      {open ? (
        <div id={listId} className="mx-auto w-full max-w-[1392px] pt-2">
          <ul
            onPointerEnter={hoverIn}
            onPointerLeave={hoverOut}
            className="max-h-[60vh] w-full overflow-auto rounded-[16px] border border-border bg-page p-2 shadow-sticky md:ml-[var(--way-left)] md:w-[360px]"
            style={{ "--way-left": `${listLeft ?? 64}px` } as CSSProperties}
          >
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex min-h-[44px] w-full items-center rounded-[10px] px-3 text-left text-[15px] text-secondary hover:bg-card"
              >
                Top of the page
              </button>
            </li>
            {sections.map((s, n) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => go(s)}
                  aria-current={n === current ? "location" : undefined}
                  className={cn(
                    "flex min-h-[44px] w-full items-center justify-between gap-3 rounded-[10px] px-3 text-left text-[15px] hover:bg-card",
                    n === current && "font-semibold",
                  )}
                  style={
                    n === current && active
                      ? { background: divisionTint[active] }
                      : undefined
                  }
                >
                  {s.label}
                  {n < current ? (
                    <span aria-hidden className="text-[13px] text-muted">
                      ✓
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
