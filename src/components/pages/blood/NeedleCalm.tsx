"use client";

import { useEffect, useState } from "react";
import { needleCopy as c } from "@/content/blood-journey";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const HALF = 4000; // four seconds in, four seconds out

/**
 * "Nervous about needles?": the page's note, plus an opt-in breathing circle (November 2026). Start opens a slow
 * circle that grows on the in breath and settles on the out breath, with the words changing every four seconds.
 * With reduced motion the circle stays still and only the words change. Made for the navy visit block.
 */
export function NeedleCalm({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [on, setOn] = useState(false);
  const [inBreath, setInBreath] = useState(true);

  useEffect(() => {
    if (!on) return;
    setInBreath(true);
    const t = window.setInterval(() => setInBreath((v) => !v), HALF);
    return () => window.clearInterval(t);
  }, [on]);

  return (
    <div className={cn("flex max-w-[380px] flex-col gap-3 md:items-end md:text-right", className)}>
      <style>{`
        .nc-ring { transition: transform ${HALF}ms cubic-bezier(.45,0,.55,1); }
        @media (prefers-reduced-motion: reduce) { .nc-ring { transition: none; } }
        :root[data-theme="contrast"] .nc-ring { background: transparent !important; border: 2px solid #fff !important; }
      `}</style>
      <span className="text-[14px] leading-[1.5] text-white/80">{c.note}</span>
      <div className="flex items-center gap-4 md:flex-row-reverse">
        <button
          type="button"
          onClick={() => setOn((v) => !v)}
          aria-pressed={on}
          className="min-h-[44px] shrink-0 rounded-chip border border-white/40 px-4 text-[14px] font-semibold text-white transition-colors hover:border-white"
        >
          {on ? c.stop : c.start}
        </button>
        {on ? (
          <div className="flex items-center gap-3 md:flex-row-reverse">
            <span aria-hidden className="relative grid h-16 w-16 place-items-center">
              <span
                className="nc-ring absolute inset-0 rounded-full border border-white/50 bg-[color:var(--rm-sky)]/30"
                style={{ transform: `scale(${reduced ? 0.85 : inBreath ? 1 : 0.55})` }}
              />
              <span className="relative h-2 w-2 rounded-full bg-sun" />
            </span>
            <span className="flex flex-col">
              <span aria-live="polite" className="text-[15px] font-semibold text-white">
                {inBreath ? c.breatheIn : c.breatheOut}
              </span>
              <span className="text-[13px] text-white/70">{c.hint}</span>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
