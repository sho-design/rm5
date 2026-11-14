"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import { chartCopy as c } from "@/content/pregnancy-extra";
import { kidsCopy } from "@/content/kids";
import { routes } from "@/lib/routes";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const INK = "#0F1F2E";
const LINE = "#C9D2DB";
const SKY = "#2F7FD1";
const SAGE = "#3D9B78";

/** How long each part of the loop holds: one chart, then the two charts. */
const ONE_MS = 2600;
const TWO_MS = 4200;

/** A plain chart: a clipboard with a few lines, a label underneath. */
function Chart({ label, accent, small }: { label: string; accent: string; small?: boolean }) {
  const w = small ? 112 : 150;
  const h = small ? 140 : 186;
  return (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="14" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
      <rect x={-22} y={-h / 2 - 9} width="44" height="16" rx="6" fill={INK} />
      <rect x={-w / 2 + 16} y={-h / 2 + 24} width={w * 0.42} height="7" rx="3.5" fill={accent} />
      {[0, 1, 2, 3].map((n) => (
        <rect key={n} x={-w / 2 + 16} y={-h / 2 + 46 + n * (small ? 18 : 24)} width={w - 32 - (n % 2) * 22} height="6" rx="3" fill={LINE} />
      ))}
      <text y={h / 2 + 28} textAnchor="middle" fontSize="16" fontWeight="600" fill={INK}>
        {label}
      </text>
    </g>
  );
}

/**
 * "From one chart to two" (Pregnancy care, November 2026). Your chart sits in the middle through the pregnancy;
 * when the baby arrives it divides into two, yours and your baby's, joined by "Same family doctor", with
 * "Well-baby visits here" on the baby's. Loops while on screen (Pause stops it); with reduced motion the two charts
 * are shown. The words beside the drawing say the same.
 */
export function ChartToTwo() {
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [two, setTwo] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const moving = inView && playing && !reduced;
  useEffect(() => {
    if (!moving) return;
    const t = window.setTimeout(() => setTwo((v) => !v), two ? TWO_MS : ONE_MS);
    return () => window.clearTimeout(t);
  }, [moving, two]);

  const split = reduced || two;

  return (
    <Section id="one-chart-to-two" className="rm-paper scroll-mt-24">
      <style>{`
        .ct-move { transition: transform 700ms cubic-bezier(.2,.8,.2,1), opacity 500ms cubic-bezier(.2,.8,.2,1); }
        @media (prefers-reduced-motion: reduce) { .ct-move { transition: none; } }
        :root[data-theme="contrast"] .ct-art [data-soft] { opacity: 1 !important; }
      `}</style>
      <div
        ref={box}
        className="grid grid-cols-1 items-center gap-8 rounded-block bg-[color:var(--rm-sage-tint)] p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12 lg:p-12"
      >
        <div className="flex flex-col gap-4">
          <Eyebrow tone="inherit" className="text-sage-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[17px] leading-[1.55] text-secondary">{c.lead}</p>
          <p className="text-[16px] font-semibold">{kidsCopy.band.title}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
            <Button to={routes.register}>{kidsCopy.band.cta}</Button>
            <SmartLink to={routes.kids} className="flex min-h-[44px] items-center text-[15px] font-semibold text-link">
              {c.kidsLink} ›
            </SmartLink>
          </div>
        </div>

        <figure className="m-0 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[13px] font-semibold text-sage-text">
              {split ? c.arrives : c.pregnancy}
            </span>
            {!reduced ? (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={!playing}
                className="min-h-[44px] rounded-chip border border-[color:var(--border-default)] bg-white px-4 text-[13px] font-semibold text-ink hover:border-ink"
              >
                {playing ? c.pause : c.play}
              </button>
            ) : null}
          </div>
          <svg role="img" aria-label={c.alt} viewBox="0 0 520 320" className="ct-art h-auto w-full rounded-card bg-white">
            {/* Same family doctor: the dashed join that appears once there are two charts. */}
            <g data-soft className="ct-move" style={{ opacity: split ? 1 : 0 }}>
              <path d="M210 160 H 316" stroke={SKY} strokeWidth="2.5" strokeDasharray="6 7" />
              {/* Two lines so the label fits in the gap between the charts. */}
              <rect x="216" y="94" width="94" height="44" rx="14" fill="#EEF5FC" />
              <text x="263" y="112" textAnchor="middle" fontSize="13" fontWeight="600" fill={SKY}>
                {(() => {
                  const w = c.sameDoctor.split(" ");
                  const cut = Math.ceil(w.length / 2);
                  return (
                    <>
                      <tspan x="263">{w.slice(0, cut).join(" ")}</tspan>
                      <tspan x="263" dy="16">{w.slice(cut).join(" ")}</tspan>
                    </>
                  );
                })()}
              </text>
            </g>
            {/* Your chart: centred through the pregnancy, moves left when the baby's chart appears. */}
            <g className="ct-move" style={{ transform: `translate(${split ? 130 : 260}px, 150px)` }}>
              <Chart label={c.you} accent={SKY} />
            </g>
            {/* Your baby's chart: grows out of yours. */}
            <g
              className="ct-move"
              style={{
                transform: `translate(${split ? 392 : 260}px, ${split ? 162 : 150}px) scale(${split ? 1 : 0.5})`,
                opacity: split ? 1 : 0,
              }}
            >
              <Chart label={c.baby} accent={SAGE} small />
              <g transform="translate(0 -104)">
                <rect x="-74" y="-16" width="148" height="30" rx="15" fill={SAGE} />
                <text y="4" textAnchor="middle" fontSize="13" fontWeight="600" fill="#FFFFFF">
                  {c.wellBaby}
                </text>
              </g>
            </g>
          </svg>
          <figcaption className={cn("text-[13px] text-secondary")}>{c.illustration}</figcaption>
        </figure>
      </div>
    </Section>
  );
}
