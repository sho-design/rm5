"use client";

import { useState, type CSSProperties } from "react";
import { Display, Eyebrow } from "@/components/ui";
import type { LadderRung } from "@/content/deep";
import { deepModuleCopy } from "@/content/deep";
import { cn } from "@/lib/cn";

/**
 * Medical Aesthetics deep dive: three rungs of increasing height, bottom
 * aligned. The open rung takes the lilac tint and border and reveals its facts.
 */
export function Ladder({ rungs }: { rungs: LadderRung[] }) {
  const c = deepModuleCopy.ladder;
  const [open, setOpen] = useState(0);
  return (
    <section className="flex flex-col gap-5 px-4 pt-12 md:px-content md:pt-section">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="flex flex-col gap-2">
          <Eyebrow tone="inherit" className="text-lilac-deep">
            {c.eyebrow}
          </Eyebrow>
          <Display size="xs">{c.title}</Display>
        </div>
        <span className="max-w-[300px] text-[14px] text-muted md:text-right">{c.note}</span>
      </div>
      <div className="grid grid-cols-1 items-end gap-card md:grid-cols-3">
        {rungs.map((l, i) => {
          const on = open === i;
          return (
            <button
              key={l.t}
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(i)}
              style={{ "--rung": `${l.h}px` } as CSSProperties}
              className={cn(
                "flex flex-col gap-3.5 rounded-card border-[1.5px] p-6 text-left transition-all duration-300 md:min-h-[var(--rung)] md:p-7",
                on ? "border-lilac-deep bg-lilac-tint" : "border-border bg-card hover:border-lilac",
              )}
            >
              <span className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-muted">
                  {c.step} {i + 1}
                </span>
                <span className="rounded-chip bg-raised px-2.5 py-[5px] text-[12px] font-semibold">{l.tag}</span>
              </span>
              <span className="display-tight text-[24px] md:text-[28px]">{l.t}</span>
              <span className="text-[14px] leading-[1.5] text-secondary">{l.d}</span>
              {on ? (
                <span className="flex flex-col gap-2 border-t border-ink/10 pt-3 text-[13px] leading-[1.45]">
                  {l.facts.map((f) => (
                    <span key={f.k} className="flex justify-between gap-3">
                      <span className="text-muted">{f.k}</span>
                      <span className="text-right font-semibold">{f.v}</span>
                    </span>
                  ))}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
