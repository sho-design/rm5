"use client";

import { useRef, useState } from "react";
import { aesConcerns, aesCopy as c, aesFamilies, aesTreatments, type AesConcern } from "@/content/aesthetics-menu";
import { Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import { buttonClass } from "@/components/ui/Button";
import { bookFor, routes } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { FemaleFace, MaleFace, type Face } from "./AesFaces";


/** Where each concern sits on the drawing (viewBox 300 x 380). "Aging well" is the whole face, so it sits on the neck. */
const SPOT_F: Record<AesConcern, { x: number; y: number }> = {
  hair: { x: 150, y: 34 },
  lines: { x: 150, y: 104 },
  pigment: { x: 214, y: 150 },
  redness: { x: 150, y: 200 },
  volume: { x: 96, y: 196 },
  texture: { x: 206, y: 214 },
  acne: { x: 186, y: 266 },
  laxity: { x: 104, y: 266 },
  aging: { x: 150, y: 330 },
};
/** The male face has a squarer jaw and a hairline that sits higher, so a few spots move with it. */
const SPOT_M: Record<AesConcern, { x: number; y: number }> = {
  ...SPOT_F,
  hair: { x: 150, y: 40 },
  lines: { x: 150, y: 100 },
  acne: { x: 192, y: 258 },
  laxity: { x: 104, y: 252 },
  aging: { x: 150, y: 332 },
};

/**
 * "Start with what you notice." as a face map. Each soft pulse is a concern; tap one (or its chip, which keeps it
 * usable without the drawing) and the panel shows what tends to help, with family colours and session times, and
 * links to the menu filtered to that concern. A starting point only; the consult decides.
 */
export function AesFaceMap() {
  const [k, setK] = useState<AesConcern>("lines");
  const [face, setFace] = useState<Face>("female");
  const panel = useRef<HTMLDivElement>(null);
  // On a phone the result sits below the drawing, so tapping a spot brings it into view (round 24, Karen).
  const pick = (next: AesConcern) => {
    setK(next);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => panel.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" }));
    }
  };
  const SPOT = face === "male" ? SPOT_M : SPOT_F;
  const concern = aesConcerns.find((x) => x.k === k) ?? aesConcerns[0];
  const helps = aesTreatments.filter((t) => t.concerns.includes(k)).slice(0, 4);

  return (
    <Section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="flex flex-col gap-2">
          <Eyebrow>{c.concernsEyebrow}</Eyebrow>
          <Display size="sm">{c.concernsTitle}</Display>
          <p className="pretty max-w-[600px] text-[16px] leading-[1.55] text-secondary">{c.faceLead}</p>
        </div>
        <SmartLink to={`${routes.aesMenu}#plan`} className="text-[15px] font-semibold text-link">
          {c.planLink} ›
        </SmartLink>
      </div>

      <div className="grid grid-cols-1 gap-card overflow-hidden rounded-block bg-lilac-tint p-5 md:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:p-12">
        <div className="flex flex-col items-center gap-5">
          <div role="radiogroup" aria-label={c.faceChoice} className="inline-flex rounded-chip bg-white p-1">
            {(["female", "male"] as const).map((f) => (
              <button
                key={f}
                type="button"
                role="radio"
                aria-checked={face === f}
                onClick={() => setFace(f)}
                className={cn("rounded-chip px-4 py-2 text-[14px] font-semibold motion-safe:transition-colors motion-safe:duration-200", face === f ? "bg-ink text-white" : "text-secondary hover:text-primary")}
              >
                {f === "female" ? c.faceFemale : c.faceMale}
              </button>
            ))}
          </div>
          <svg viewBox="0 0 300 380" className="h-auto w-full max-w-[340px]" role="group" aria-label={c.faceAria}>
            <g key={face} className="rm-fade">{face === "male" ? <MaleFace /> : <FemaleFace />}</g>
            {aesConcerns.map((x) => {
              const p = SPOT[x.k];
              const on = x.k === k;
              return (
                <g key={x.k} transform={`translate(${p.x} ${p.y})`} className="motion-safe:transition-transform motion-safe:duration-300">
                  <circle r="24" fill="transparent" className="cursor-pointer" onClick={() => pick(x.k)} aria-hidden />
                  {!on ? <circle r="16" fill="var(--rm-lilac-deep)" opacity=".18" className="origin-center motion-safe:animate-[rm-ping_2.4s_ease-out_infinite]" style={{ transformBox: "fill-box" }} /> : null}
                  <circle
                    r={on ? 13 : 9}
                    fill={on ? "var(--rm-ink)" : "var(--rm-lilac-deep)"}
                    stroke="white"
                    strokeWidth="3"
                    className="cursor-pointer motion-safe:transition-all motion-safe:duration-300"
                    role="button"
                    tabIndex={-1}
                    aria-hidden
                    onClick={() => pick(x.k)}
                  />
                  {on ? <circle r="22" fill="none" stroke="var(--rm-ink)" strokeWidth="1.5" strokeDasharray="3 5" className="origin-center motion-safe:animate-[spin_9s_linear_infinite]" style={{ transformBox: "fill-box" }} /> : null}
                </g>
              );
            })}
          </svg>
          <div role="radiogroup" aria-label={c.faceAria} className="flex flex-wrap justify-center gap-1.5">
            {aesConcerns.map((x) => (
              <button
                key={x.k}
                type="button"
                role="radio"
                aria-checked={x.k === k}
                onClick={() => setK(x.k)}
                className={cn(
                  "rounded-chip border-[1.5px] px-3 py-1.5 text-[13px] font-semibold motion-safe:transition-colors motion-safe:duration-200",
                  x.k === k ? "border-ink bg-ink text-white" : "border-border bg-white text-primary hover:border-lilac-deep",
                )}
              >
                {x.t}
              </button>
            ))}
          </div>
        </div>

        <div key={k} ref={panel} className="rm-fade flex scroll-mt-24 flex-col gap-5 self-center rounded-card bg-white p-6 md:p-8" aria-live="polite">
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-semibold text-lilac-deep">{c.youNotice}</span>
            <span className="display-tight text-[34px] md:text-[40px]">{concern.t}</span>
            <span className="pretty text-[16px] leading-[1.55] text-secondary">{concern.d}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-semibold text-muted">{c.oftenHelps}</span>
            <ul className="flex flex-col gap-2">
              {helps.map((t, i) => {
                const mins = t.sessions?.find((s) => s.mins)?.mins;
                return (
                  <li key={t.id} className="rm-rise flex items-center gap-3 rounded-card-sm bg-raised px-4 py-3" style={{ animationDelay: `${120 + i * 80}ms` }}>
                    <span aria-hidden className="h-3 w-3 shrink-0 rounded-full" style={{ background: aesFamilies[t.family].color }} />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[15px] font-semibold">{t.brand ? `${t.name}, ${t.brand}` : t.name}</span>
                      <span className="text-[12px] text-muted">{aesFamilies[t.family].t}</span>
                    </span>
                    {mins ? <span className="shrink-0 text-[13px] font-semibold text-muted">{c.minutes(mins)}</span> : null}
                  </li>
                );
              })}
            </ul>
          </div>
          <span className="text-[13px] leading-[1.5] text-muted">{c.faceNote}</span>
          <div className="flex flex-wrap items-center gap-3">
            <SmartLink to={bookFor("aesthetics", "consult")} className={buttonClass("primary", "md")}>
              {c.book}
            </SmartLink>
            <SmartLink to={`${routes.aesMenu}?concern=${k}#plan`} className="text-[15px] font-semibold text-link">
              {c.seeConcern} ›
            </SmartLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
