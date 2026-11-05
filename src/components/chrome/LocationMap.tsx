"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A Google map that loads only when the visitor asks for it. Until then nothing is requested from Google (no
 * cookies, no tracking), in keeping with the site's no-outside-requests rule. The placeholder is a drawn street
 * grid with a pin, not a map.
 */
export function LocationMap({ query, label, directions, className }: { query: string; label: string; directions: string; className?: string }) {
  const [on, setOn] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
  return (
    <div className={cn("relative overflow-hidden rounded-[14px] border border-border bg-sky-soft", className)}>
      {on ? (
        <iframe src={src} title={`Map: ${label}`} loading="lazy" referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full border-0" />
      ) : (
        <>
          <svg aria-hidden viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full text-white">
            <g stroke="currentColor" strokeLinecap="round">
              <path d="M-10 52 L330 40" strokeWidth="9" />
              <path d="M-10 118 L330 126" strokeWidth="6" />
              <path d="M96 -10 L84 170" strokeWidth="6" />
              <path d="M228 -10 L240 170" strokeWidth="9" />
              <path d="M-10 86 L330 84" strokeWidth="3" opacity=".8" />
              <path d="M160 -10 L162 170" strokeWidth="3" opacity=".8" />
            </g>
          </svg>
          <span aria-hidden className="absolute left-1/2 top-[44%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full rounded-br-none bg-ink shadow-[0_6px_16px_rgba(16,24,40,.25)] [transform:rotate(45deg)]">
              <span className="h-2.5 w-2.5 rounded-full bg-sun" />
            </span>
          </span>
          <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setOn(true)} className="rounded-chip bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-[0_2px_8px_rgba(16,24,40,.12)] hover:bg-paper">
              Show map
            </button>
            <a href={directions} target="_blank" rel="noopener" className="rounded-chip bg-ink px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-ink-2">
              Directions ›
            </a>
          </div>
          <span className="absolute right-3 top-2.5 text-[11px] font-semibold text-muted">Loads Google Maps</span>
        </>
      )}
    </div>
  );
}
