"use client";

import { useId, useState } from "react";
import type { CarePath } from "@/content/home";
import { Block, Button, Display, Eyebrow, SmartLink } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * "Your care does not stop at one door." Navy block with five situation
 * tabs; each shows four step cards joined by arrows, an outcome line and a
 * sunshine CTA.
 */
export function CarePathways({ paths, tints }: { paths: CarePath[]; tints: Record<string, string> }) {
  const [pick, setPick] = useState(0);
  const id = useId();
  const pp = paths[pick];

  return (
    <Block tone="navy" className="flex flex-col gap-7 px-5 py-8 md:gap-9 md:px-12 md:py-14">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-end lg:gap-10">
        <div className="flex flex-col gap-2.5">
          <Eyebrow tone="sun">One clinic, connected</Eyebrow>
          <Display size="sm">Your care does not stop at one door.</Display>
        </div>
        <p className="pretty text-[16px] leading-[1.55] text-white/75">Pick a situation and see how our services hand you from one to the next, with one chart and one team. This is what a clinic is for.</p>
      </div>

      <div role="tablist" aria-label="Situations" className="scroll-x -mx-5 flex gap-1.5 px-5 md:mx-0 md:flex-wrap md:px-0">
        {paths.map((p, i) => {
          const on = i === pick;
          return (
            <button
              key={p.label}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${id}-panel`}
              onClick={() => setPick(i)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-chip border-[1.5px] px-[18px] py-[11px] text-[14px] font-semibold transition-all duration-[250ms]",
                on ? "border-sun bg-sun text-sun-ink" : "border-white/30 bg-transparent text-white hover:border-white/60",
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${pick}`} className="grid grid-cols-1 items-stretch gap-2.5 lg:grid-cols-4 lg:gap-0">
        {pp.steps.map((s, i) => {
          const last = i === pp.steps.length - 1;
          return (
            <div key={s.t} className="lg:grid lg:grid-cols-[1fr_36px] lg:items-center">
              <div className="flex h-full min-h-[200px] flex-col gap-2.5 rounded-card-sm p-6 text-ink lg:min-h-[220px]" style={{ background: tints[s.svc] }}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-semibold text-muted">{s.svc}</span>
                  <span className="rounded-chip bg-white/70 px-[9px] py-1 text-[11px] font-semibold">{s.time}</span>
                </div>
                <span className="font-display text-[24px] font-medium leading-[1.05] tracking-[-.02em]">{s.t}</span>
                <span className="flex-1 text-[14px] leading-[1.5] text-ink-2">{s.d}</span>
                <SmartLink to={s.page} className="text-[13px] font-semibold text-link">
                  {s.link} ›
                </SmartLink>
              </div>
              <span aria-hidden className={cn("hidden items-center justify-center text-[22px] text-white/40 lg:flex", last && "opacity-0")}>
                →
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 border-t border-white/12 pt-5 md:flex-row md:items-center md:justify-between md:gap-6 md:pt-2">
        <span className="text-[15px] text-white/75">{pp.outcome}</span>
        <Button to={pp.page} variant="accent" className="self-start md:self-auto">
          {pp.cta}
        </Button>
      </div>
    </Block>
  );
}
