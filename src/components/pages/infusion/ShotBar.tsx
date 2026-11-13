"use client";

import { useState } from "react";
import { shotBar as c, shotGroups, shotInfo, shots, type ShotGroup } from "@/content/infusion-site";
import { SmartLink } from "@/components/ui";
import { buttonClass } from "@/components/ui/Button";
import { bookFor } from "@/lib/routes";
import { cn } from "@/lib/cn";

/** One tall vial. Rises onto the shelf on load (staggered), lifts on hover, lifts higher and glows when chosen. */
function Vial({ color, on, i }: { color: string; on: boolean; i: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 110"
      className={cn(
        "rm-rise h-[96px] w-[35px] drop-shadow-[0_8px_14px_rgba(0,0,0,.35)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)] md:h-[120px] md:w-[44px]",
        on ? "-translate-y-5" : "group-hover:-translate-y-2",
      )}
      style={{ animationDelay: `${i * 60}ms` }}
    >
      <rect x="9" y="2" width="22" height="13" rx="3" fill={on ? "var(--rm-sun)" : "rgba(255,255,255,.85)"} />
      <rect x="11" y="15" width="18" height="6" fill="rgba(255,255,255,.45)" />
      <rect x="5" y="21" width="30" height="86" rx="9" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
      <rect x="7.5" y={on ? 38 : 50} width="25" height={on ? 66.5 : 54.5} rx="7" fill={color} className="motion-safe:transition-all motion-safe:duration-300" />
      <rect x="10" y="30" width="3" height="60" rx="1.5" fill="white" opacity=".25" />
    </svg>
  );
}

/**
 * The Injection Bar as a shelf of vials on a dark ground. Tapping a vial picks it and shows what it is beside the
 * shelf; group chips narrow the shelf. Radio semantics, so arrow keys move between vials.
 */
export function ShotBar() {
  const [group, setGroup] = useState<ShotGroup | "all">("all");
  const [pick, setPick] = useState(0);
  const shown = shots.filter((s) => group === "all" || shotInfo[s.t]?.g === group);
  const sel = shown[Math.min(pick, shown.length - 1)] ?? shots[0];
  const info = shotInfo[sel.t];
  const color = info ? shotGroups[info.g] : "#fff";
  const chips: (ShotGroup | "all")[] = ["all", ...(Object.keys(shotGroups) as ShotGroup[])];

  const onKey = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (Math.min(pick, shown.length - 1) + dir + shown.length) % shown.length;
    setPick(next);
    (e.currentTarget.querySelectorAll<HTMLButtonElement>("[role=radio]")[next])?.focus();
  };

  return (
    <div className="relative overflow-hidden rounded-block bg-ink text-white">
      {/* Soft glow in the chosen colour. */}
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl motion-safe:transition-colors motion-safe:duration-300" style={{ background: color }} />
      <div className="relative grid grid-cols-1 gap-8 p-6 md:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:p-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-semibold text-sun">{c.eyebrow}</span>
            <span className="font-display text-[40px] font-medium leading-[1] tracking-[-.03em] md:text-[52px]">{c.title}</span>
            <p className="pretty max-w-[560px] text-[16px] leading-[1.55] text-white/70">{c.lead}</p>
          </div>
          <div role="radiogroup" aria-label="Shot group" className="scroll-x -mx-6 flex gap-1.5 px-6 md:mx-0 md:flex-wrap md:px-0">
            {chips.map((g) => (
              <button
                key={g}
                type="button"
                role="radio"
                aria-checked={group === g}
                onClick={() => {
                  setGroup(g);
                  setPick(0);
                }}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-chip border px-3.5 py-2 text-[13px] font-semibold motion-safe:transition-colors",
                  group === g ? "border-white bg-white text-ink" : "border-white/25 text-white hover:border-white/60",
                )}
              >
                <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: g === "all" ? "currentColor" : shotGroups[g] }} />
                {g === "all" ? c.all : g}
              </button>
            ))}
          </div>
          {/* The shelf */}
          <div role="radiogroup" aria-label="Shots" onKeyDown={onKey} className="relative">
            <div className="grid grid-cols-5 gap-x-1 gap-y-4 pb-3 lg:grid-cols-10">
              {shown.map((s, i) => {
                const on = s.t === sel.t;
                const col = shotInfo[s.t] ? shotGroups[shotInfo[s.t].g] : "#fff";
                return (
                  <button
                    key={s.t}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setPick(i)}
                    className="group flex flex-col items-center gap-2 rounded-tile pt-6 outline-offset-4"
                  >
                    <Vial color={col} on={on} i={i} />
                    <span className={cn("flex h-[30px] items-start text-center text-[13px] font-semibold leading-[1.2]", on ? "text-white" : "text-white/65")}>{s.t}</span>
                  </button>
                );
              })}
            </div>
            <div aria-hidden className="h-[6px] rounded-full bg-white/15" />
          </div>
        </div>

        {/* What the chosen shot is */}
        <div className="flex flex-col justify-center" aria-live="polite">
          <div key={sel.t} className="rm-fade flex flex-col gap-4 rounded-card bg-white/[.07] p-6 md:p-8">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-white/70">
              <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: color }} />
              {info?.g}
            </span>
            <span className="font-display text-[44px] font-medium leading-[1] tracking-[-.03em]">{sel.t}</span>
            <span className="text-[17px] text-white/80">{sel.d}</span>
            <span className="flex flex-wrap gap-2">
              <span className="rounded-chip bg-white/10 px-3 py-1.5 text-[13px] font-semibold">{c.time}</span>
              <span className="rounded-chip bg-white/10 px-3 py-1.5 text-[13px] font-semibold">{c.screened}</span>
            </span>
            {info?.note ? <span className="text-[14px] leading-[1.5] text-white/70">{info.note}</span> : null}
            <span className="flex flex-wrap items-center gap-3 pt-1">
              {info?.program ? (
                <SmartLink to="metabolic" className="text-[14px] font-semibold text-sun">
                  {c.program}
                </SmartLink>
              ) : (
                <SmartLink to={`${bookFor("infusion", "shot")}&reason=${encodeURIComponent(sel.t)}`} className={buttonClass("accent", "md")}>
                  {c.book}
                </SmartLink>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
