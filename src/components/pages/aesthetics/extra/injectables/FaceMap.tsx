"use client";

import { useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import { FemaleFace } from "@/components/pages/aesthetics/AesFaces";
import { injAreas, injCopy as c, injFamilies } from "@/content/aes-injectables";
import { radioKeys, rovingTab } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const FAM_COLOR: Record<string, string> = {
  neuro: "#8E5FB5",
  filler: "#2F7FD1",
  bio: "#3D9B78",
};

/**
 * Injectables face map: tap a spot on the face (or a chip below it) to see what is often considered for that
 * area and how long it usually lasts. A starting point for the consult, never a plan. No units or prices.
 */
export function FaceMap() {
  const [k, setK] = useState(injAreas[0].k);
  const area = injAreas.find((a) => a.k === k) ?? injAreas[0];

  return (
    <Section id="injectables-map" className="scroll-mt-24">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
        <div className="flex flex-col items-center gap-5">
          <svg
            viewBox="0 0 300 380"
            className="h-auto w-full max-w-[340px]"
            aria-hidden
          >
            <FemaleFace />
            {injAreas.map((a) => {
              const on = a.k === k;
              const color = FAM_COLOR[a.families[0]];
              return (
                <g
                  key={a.k}
                  transform={`translate(${a.x} ${a.y})`}
                  className="cursor-pointer"
                  onClick={() => setK(a.k)}
                >
                  <circle r="22" fill="transparent" />
                  {!on ? (
                    <circle
                      r="14"
                      fill={color}
                      opacity=".18"
                      className="origin-center motion-safe:animate-[rm-ping_2.4s_ease-out_infinite]"
                      style={{ transformBox: "fill-box" }}
                    />
                  ) : null}
                  <circle
                    r={on ? 12 : 8}
                    fill={on ? "var(--rm-ink)" : color}
                    stroke="white"
                    strokeWidth="3"
                    className="motion-safe:transition-all motion-safe:duration-300"
                  />
                  {on ? (
                    <circle
                      r="21"
                      fill="none"
                      stroke="var(--rm-ink)"
                      strokeWidth="1.5"
                      strokeDasharray="3 5"
                      className="origin-center motion-safe:animate-[spin_9s_linear_infinite]"
                      style={{ transformBox: "fill-box" }}
                    />
                  ) : null}
                </g>
              );
            })}
          </svg>
          <div
            role="radiogroup"
            aria-label={c.mapLabel}
            onKeyDown={radioKeys}
            className="flex flex-wrap justify-center gap-1.5"
          >
            {injAreas.map((a, i) => (
              <button
                key={a.k}
                type="button"
                role="radio"
                aria-checked={a.k === k}
                tabIndex={rovingTab(a.k === k, i, true)}
                onClick={() => setK(a.k)}
                className={cn(
                  "min-h-[44px] rounded-chip border-[1.5px] px-3.5 text-[14px] font-semibold motion-safe:transition-colors motion-safe:duration-200",
                  a.k === k
                    ? "border-ink bg-ink text-white"
                    : "border-border bg-white text-primary hover:border-lilac-deep",
                )}
              >
                {a.t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="inherit" className="text-lilac-text">
              {c.mapEyebrow}
            </Eyebrow>
            <Display size="sm">{c.mapTitle}</Display>
            <p className="pretty text-[16px] leading-[1.55] text-secondary">
              {c.mapLead}
            </p>
          </div>
          <div
            key={area.k}
            aria-live="polite"
            className="rm-fade flex flex-col gap-4 rounded-card border border-border bg-white p-6 shadow-card md:p-7"
          >
            <h3 className="font-display text-[24px] font-medium leading-tight">
              {area.t}
            </h3>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-semibold text-muted">
                {c.considered}
              </span>
              <p className="pretty text-[16px] leading-[1.5]">{area.what}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {area.families.map((f) => {
                const fam = injFamilies.find((x) => x.k === f);
                return fam ? (
                  <span
                    key={f}
                    className="flex items-center gap-2 rounded-chip px-3 py-1.5 text-[13px] font-semibold"
                    style={{ background: fam.tint }}
                  >
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full"
                      style={{ background: FAM_COLOR[f] }}
                    />
                    {fam.t}
                  </span>
                ) : null;
              })}
            </div>
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex flex-col gap-0.5 rounded-row bg-card px-4 py-3">
                <dt className="text-[13px] font-semibold text-muted">
                  {c.lasts}
                </dt>
                <dd className="text-[15px] font-semibold leading-[1.35]">
                  {area.lasts}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 rounded-row bg-lilac-tint px-4 py-3">
                <dt className="text-[13px] font-semibold text-muted">
                  {c.reviewK}
                </dt>
                <dd className="text-[15px] font-semibold leading-[1.35]">
                  {c.reviewV}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
