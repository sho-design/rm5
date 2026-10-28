"use client";

import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [reopened, setReopened] = useState(false);
  const title = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    if (readConsent() === null) setOpen(true);
    const reopen = () => {
      setReopened(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, [enabled]);

  useEffect(() => {
    if (open && reopened) title.current?.focus({ preventScroll: true });
  }, [open, reopened]);

  if (!enabled || !open) return null;
  const choose = (c: "granted" | "denied") => {
    writeConsent(c);
    setOpen(false);
    setReopened(false);
  };
  const btn = "inline-flex h-11 flex-1 items-center justify-center rounded-chip px-5 text-[14px] font-semibold sm:flex-none";
  return (
    <div
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
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => choose("granted")} className={`${btn} bg-ink text-white hover:opacity-90`}>
            {consentCopy.accept}
          </button>
          <button type="button" onClick={() => choose("denied")} className={`${btn} border-[1.5px] border-ink text-ink hover:bg-card`}>
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
