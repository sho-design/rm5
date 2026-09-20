"use client";

import { useState } from "react";
import type { QA } from "@/content/types";
import { cn } from "@/lib/cn";
import { Display, Lead } from "./Text";
import { SmartLink } from "./SmartLink";

export interface FaqRowItem extends QA {
  linkLabel?: string;
  linkPage?: string;
}

/**
 * Sticky-label FAQ: 1fr / 1.6fr grid, Fraunces 44 heading sticky at top 24px,
 * hairline-divided rows with a "+" that rotates 45° when open. One open at a
 * time; the first row starts open.
 */
export function Faq({
  title = "Good to know.",
  sub = "Anything else, ask us at your visit or call 905-709-3222.",
  items,
  defaultOpen = 0,
  className,
  id,
}: {
  title?: string;
  sub?: string;
  items: FaqRowItem[];
  defaultOpen?: number;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("grid grid-cols-1 gap-6 px-4 pt-12 md:px-content md:pt-section lg:grid-cols-[1fr_1.6fr] lg:gap-12 lg:items-start", className)}>
      <div className="flex flex-col gap-3 lg:sticky lg:top-6">
        <Display size="xs">{title}</Display>
        <Lead size="sm" tone="muted">{sub}</Lead>
      </div>
      <FaqList items={items} defaultOpen={defaultOpen} />
    </section>
  );
}

/** The accordion rows alone (used inside the site FAQ page and cards). */
export function FaqList({ items, defaultOpen = 0, className, compact }: { items: FaqRowItem[]; defaultOpen?: number; className?: string; compact?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={i} className="border-t border-border">
            <button
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(on ? -1 : i)}
              className={cn("flex w-full items-center justify-between gap-5 text-left", compact ? "py-4" : "py-5")}
            >
              <span className={cn("font-semibold tracking-[-.01em]", compact ? "text-[16px]" : "text-[17px] lg:text-[18px]")}>{f.q}</span>
              <span
                aria-hidden
                className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-border text-[18px] transition-transform duration-[250ms]"
                style={{ transform: on ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            {on ? (
              <div className="flex flex-col gap-3 pb-[22px]">
                <p className="pretty max-w-[640px] text-[16px] leading-[1.6] text-muted">{f.a}</p>
                {f.linkLabel && f.linkPage ? (
                  <SmartLink to={f.linkPage} className="text-[13px] font-semibold text-link">
                    {f.linkLabel} ›
                  </SmartLink>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
