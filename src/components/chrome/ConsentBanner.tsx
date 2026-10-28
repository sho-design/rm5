"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { analyticsExcluded } from "./Analytics";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { OPEN_SETTINGS_EVENT, readConsent, writeConsent } from "@/lib/consent";
import { consentCopy } from "@/content/consent";

/**
 * Analytics consent. Shown only when the site has an analytics ID and the
 * visitor has not chosen yet, or when they open "Cookie settings" in the
 * footer. Accept and decline carry equal weight (PIPEDA and Quebec Law 25
 * guidance), and declining is remembered just like accepting.
 *
 * Keyboard and screen readers: the banner is first in the page's tab order
 * (it renders before the skip link) but never takes focus on page load and
 * never lands on "Allow". Reopened from the footer, focus goes to its title.
 * Escape inside the banner declines.
 */
export function ConsentBanner({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [reopened, setReopened] = useState(false);
  const title = useRef<HTMLSpanElement>(null);
  const box = useRef<HTMLDivElement>(null);
  /** Where focus was when the banner was reopened from the footer, to return there after a choice. */
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (readConsent() === null) setOpen(true);
    const reopen = () => {
      returnTo.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setReopened(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, [enabled]);

  useEffect(() => {
    if (open && reopened) title.current?.focus({ preventScroll: true });
  }, [open, reopened]);

  // Analytics never runs on the booking and form pages, so do not ask there.
  const excluded = analyticsExcluded.some((r) => pathname === r || pathname.startsWith(`${r}/`));
  if (!enabled || !open || (excluded && !reopened)) return null;
  const current = readConsent();
  const choose = (c: "granted" | "denied", viaKeyboard = true) => {
    // If the choice was made from inside the banner, do not leave focus on the page body:
    // go back to the footer link it was opened from, or to "Skip to content" on first visit.
    // Mouse and touch users do not need focus moved (it would show the "Skip to content" pill).
    const hadFocus = viaKeyboard && !!box.current?.contains(document.activeElement);
    writeConsent(c);
    setOpen(false);
    setReopened(false);
    if (hadFocus) {
      const target = returnTo.current ?? document.querySelector<HTMLElement>('a[href="#main"]');
      requestAnimationFrame(() => target?.focus());
    }
    returnTo.current = null;
  };
  const btn = "inline-flex h-11 flex-1 items-center justify-center rounded-chip px-5 text-[14px] font-semibold sm:flex-none";
  return (
    <div
      ref={box}
      role="region"
      aria-label={consentCopy.label}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          choose("denied");
        }
      }}
      className="fixed inset-x-3 bottom-3 z-50 md:inset-x-auto md:bottom-6 md:right-6 md:max-w-[440px]">
      <div className="flex flex-col gap-4 rounded-card border border-border bg-raised p-5 shadow-card md:p-6">
        <div className="flex flex-col gap-1.5">
          <span ref={title} tabIndex={-1} className="text-[16px] font-semibold outline-none">
            {consentCopy.title}
          </span>
          <p className="pretty text-[14px] leading-[1.5] text-secondary">
            {consentCopy.body}{" "}
            <Link href={routes.privacy} className="font-semibold text-link">
              {consentCopy.privacy} ›
            </Link>
          </p>
          {reopened && current ? <p className="text-[13px] font-semibold text-primary">{consentCopy.current(current === "granted" ? consentCopy.accept : consentCopy.decline)}</p> : null}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={(e) => choose("granted", e.detail === 0)} className={`${btn} bg-ink text-white hover:opacity-90`}>
            {consentCopy.accept}
          </button>
          <button type="button" onClick={(e) => choose("denied", e.detail === 0)} className={`${btn} border-[1.5px] border-ink text-ink hover:bg-card`}>
            {consentCopy.decline}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner. */
export function ConsentSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))} className={className}>
      {consentCopy.settings}
    </button>
  );
}
