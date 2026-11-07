"use client";

import { useState } from "react";
import { aesConcerns, aesCopy as c, aesFamilies, aesTreatments, type AesConcern } from "@/content/aesthetics-menu";
import { Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import { buttonClass } from "@/components/ui/Button";
import { bookFor, routes } from "@/lib/routes";
import { cn } from "@/lib/cn";

/** Where each concern sits on the face drawing (viewBox 300 x 380). "Aging well" is the whole face, so it sits on the neck. */
const SPOT: Record<AesConcern, { x: number; y: number }> = {
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

/** Calm line drawing of a face, no gender or age cues beyond a soft hairline. Purely decorative. */
function Face() {
  return (
    <g fill="none" stroke="var(--rm-ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Neck and shoulders sit behind the face, so the neck runs up into the jaw with no gap. */}
      <path d="M116 262c2 34 4 66 2 92M184 262c-2 34-4 66-2 92" />
      <path d="M118 352c-22 6-42 14-58 26M182 352c22 6 42 14 58 26" />
      <path d="M150 22c-58 0-92 40-92 104 0 34 6 66 20 96 16 34 42 66 72 66s56-32 72-66c14-30 20-62 20-96 0-64-34-104-92-104z" fill="var(--rm-paper)" />
      <path d="M62 112c8-46 44-74 88-74s80 28 88 74c-22-24-52-36-88-36s-66 12-88 36z" fill="var(--rm-lilac-tint)" stroke="none" />
      <path d="M62 112c8-46 44-74 88-74s80 28 88 74" />
      <path d="M58 150c-12-2-18 10-14 26 4 14 12 22 22 20M242 150c12-2 18 10 14 26-4 14-12 22-22 20" />
      <path d="M94 142c10-8 26-8 36-2M170 140c10-6 26-6 36 2" />
      <path d="M98 166c8-6 22-6 30 0M172 166c8-6 22-6 30 0" />
      <path d="M150 158v40c-4 6-10 10-16 10M150 208c6 2 12 0 16-4" />
      <path d="M124 246c10 8 42 8 52 0M124 246c14-6 38-6 52 0" />
    </g>
  );
}

/**
 * "Start with what you notice." as a face map. Each soft pulse is a concern; tap one (or its chip, which keeps it
 * usable without the drawing) and the panel shows what tends to help, with family colours and session times, and
 * links to the menu filtered to that concern. A starting point only; the consult decides.
 */
export function AesFaceMap() {
  const [k, setK] = useState<AesConcern>("lines");
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
          <svg viewBox="0 0 300 380" className="h-auto w-full max-w-[340px]" role="group" aria-label={c.faceAria}>
            <Face />
            {aesConcerns.map((x) => {
              const p = SPOT[x.k];
              const on = x.k === k;
              return (
                <g key={x.k} transform={`translate(${p.x} ${p.y})`}>
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
                    onClick={() => setK(x.k)}
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

        <div key={k} className="rm-fade flex flex-col gap-5 self-center rounded-card bg-white p-6 md:p-8" aria-live="polite">
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
            <SmartLink to={`${routes.aesMenu}?concern=${k}#menu`} className="text-[15px] font-semibold text-link">
              {c.seeConcern} ›
            </SmartLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
