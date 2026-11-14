"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Button, Display, Eyebrow, Section } from "@/components/ui";
import { teamsCopy as c } from "@/content/pregnancy-extra";
import { bookFor, routes } from "@/lib/routes";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

/* Lane colours: our care in sky, obstetrics or midwifery in lilac, your baby in sage. */
const SKY = "var(--rm-sky)";
const LILAC = "var(--rm-lilac-deep)";
const SAGE = "var(--rm-sage-deep)";

type Lane = "us" | "obs" | "baby";
const LANES: { k: Lane; label: string; color: string }[] = [
  { k: "us", label: c.lanes.us, color: SKY },
  { k: "obs", label: c.lanes.obs, color: LILAC },
  { k: "baby", label: c.lanes.baby, color: SAGE },
];
const laneColor = (l: Lane) => LANES.find((x) => x.k === l)?.color ?? SKY;

type Moment = { k: string; time: string; lane: Lane; title: string; body: string; extra?: "who" | "choices" };

/** The six moments, in the order a patient lives them. Each sits on the lane of the team that looks after it. */
const MOMENTS: Moment[] = [
  { k: "find", time: c.findTime, lane: "us", title: c.findTitle, body: c.findBody },
  { k: "first", time: c.firstTime, lane: "us", title: c.firstTitle, body: c.firstBody },
  { k: "tests", time: c.testsTime, lane: "us", title: c.testsTitle, body: c.testsBody, extra: "who" },
  { k: "referral", time: c.referralTime, lane: "obs", title: c.referralTitle, body: c.referralBody, extra: "choices" },
  { k: "throughout", time: c.throughoutTime, lane: "us", title: c.throughoutTitle, body: c.throughoutBody },
  { k: "baby", time: c.babyTime, lane: "baby", title: c.babyTitle, body: c.babyBody },
];

/** Order the drawing reaches each moment (ms after the start), so its stop and card pop in then. */
const REACH = [0, 260, 520, 1150, 1450, 1900];

function Extra({ m }: { m: Moment }) {
  if (m.extra === "who")
    return (
      <p className="text-[13px] leading-[1.45] text-secondary">
        <span className="font-semibold text-primary">{c.whoLabel}:</span> {c.whoValue}
      </p>
    );
  if (m.extra === "choices")
    return (
      <span className="flex flex-wrap gap-1.5">
        {c.referralChoices.map((x) => (
          <span key={x} className="rounded-chip px-2.5 py-1 text-[13px] font-semibold" style={{ background: "var(--rm-lilac-tint)", color: "var(--rm-lilac-text)" }}>
            {x}
          </span>
        ))}
      </span>
    );
  return null;
}

/** One moment's card, with its lane colour as a left border. */
function Card({ m, shown, delay, className }: { m: Moment; shown: boolean; delay: number; className?: string }) {
  return (
    <div
      className={cn("tt-card tt-pop flex min-w-0 flex-col gap-1.5 rounded-[14px] border border-[color:var(--rm-line)] bg-white p-3.5", className)}
      style={{ borderLeft: `4px solid ${laneColor(m.lane)}`, transitionDelay: `${delay}ms`, opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(8px)" } as CSSProperties}
    >
      <span className="text-[13px] font-semibold" style={{ color: m.lane === "obs" ? "var(--rm-lilac-text)" : m.lane === "baby" ? "var(--rm-sage-text)" : "var(--rm-sky-text)" }}>
        {m.time}
      </span>
      <span className="text-[16px] font-semibold leading-[1.25]">{m.title}</span>
      <p className="pretty text-[14px] leading-[1.45] text-secondary">{m.body}</p>
      <Extra m={m} />
    </div>
  );
}

type Geo = { w: number; h: number; xs: number[]; ys: Record<Lane, number> };

/**
 * "Two teams, one pregnancy" as swim lanes (November 2026, option A). Wide screens: the six moments run left to
 * right; three lanes run under them. With us is solid until the same-week tests, then a thin dashed line ("still
 * your family doctor") to the end. At 12 weeks a hand-off curves down to obstetrics or midwifery, which runs
 * alongside us until the baby arrives (a soft band, "Two teams at once"). The baby's lane branches off at the end.
 * The lines draw once when the section comes on screen ("Show again" replays it). Phones and tablets: the lanes
 * turn vertical, side by side, with each moment as a row. The drawings are decoration; an ordered list carries
 * every word for screen readers. Reduced motion: drawn at once.
 */
export function TwoTeams() {
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const heads = useRef<(HTMLDivElement | null)[]>([]);
  const rails = useRef<Record<Lane, HTMLDivElement | null>>({ us: null, obs: null, baby: null });
  const [geo, setGeo] = useState<Geo | null>(null);
  const [shown, setShown] = useState(false);
  // Replaying snaps everything back with no transition, then draws again.
  const [resetting, setResetting] = useState(false);

  // Draw once when the section comes on screen.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Where the columns and the lanes are, for the drawing over the wide layout.
  const measure = useCallback(() => {
    const g = grid.current;
    if (!g || g.offsetParent === null) return setGeo(null);
    const r = g.getBoundingClientRect();
    const xs = heads.current.map((h) => {
      const b = h?.getBoundingClientRect();
      return b ? b.left - r.left + 18 : 0;
    });
    const y = (l: Lane) => {
      const b = rails.current[l]?.getBoundingClientRect();
      return b ? b.top - r.top + b.height / 2 : 0;
    };
    setGeo({ w: r.width, h: r.height, xs, ys: { us: y("us"), obs: y("obs"), baby: y("baby") } });
  }, []);
  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (grid.current) ro.observe(grid.current);
    return () => ro.disconnect();
  }, [measure]);

  const drawn = shown || reduced;
  const replay = () => {
    setResetting(true);
    setShown(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setResetting(false);
        setShown(true);
      }),
    );
  };

  // Path pieces, each drawing on its own delay (ms) once shown.
  let paths: { d: string; color: string; delay: number; dur: number; thin?: boolean; dashed?: boolean }[] = [];
  let band: { x: number; y: number; w: number; h: number } | null = null;
  if (geo) {
    const [x0, , x2, x3, , x5] = geo.xs;
    const { us, obs, baby } = geo.ys;
    paths = [
      { d: `M${x0} ${us} H${x2}`, color: SKY, delay: 0, dur: 600 },
      { d: `M${x2} ${us} H${geo.w - 8}`, color: SKY, delay: 560, dur: 1500, thin: true, dashed: true },
      { d: `M${x3 - 56} ${us} C${x3 - 10} ${us}, ${x3 - 46} ${obs}, ${x3} ${obs}`, color: LILAC, delay: 900, dur: 300 },
      { d: `M${x3} ${obs} H${x5}`, color: LILAC, delay: 1150, dur: 700 },
      { d: `M${x5 - 56} ${us} C${x5 - 10} ${us}, ${x5 - 46} ${baby}, ${x5} ${baby} H${geo.w - 8}`, color: SAGE, delay: 1750, dur: 500 },
    ];
    band = { x: x3 - 14, y: us - 18, w: x5 - x3 + 28, h: obs - us + 36 };
  }

  const reach = (i: number) => (reduced ? 0 : REACH[i]);
  const cell = (lane: Lane, i: number): ReactNode => {
    const m = MOMENTS[i];
    if (m.lane === lane) return <Card m={m} shown={drawn} delay={reach(i) + 120} />;
    // The obstetrics lane's empty "Throughout" cell carries the overlap label.
    if (lane === "obs" && m.k === "throughout")
      return (
        <div className="tt-pop flex flex-col gap-1 rounded-[14px] border border-dashed px-3.5 py-3" style={{ borderColor: LILAC, background: "color-mix(in srgb, var(--rm-lilac-tint) 70%, white)", transitionDelay: `${reach(4) + 200}ms`, opacity: drawn ? 1 : 0 }}>
          <span className="text-[14px] font-semibold" style={{ color: "var(--rm-lilac-text)" }}>
            {c.overlap}
          </span>
          <span className="pretty text-[13px] leading-[1.4] text-secondary">{c.overlapNote}</span>
        </div>
      );
    return <div aria-hidden />;
  };

  return (
    <Section id="two-teams" className="rm-paper scroll-mt-24">
      <style>{`
        .tt-pop { transition: opacity 400ms cubic-bezier(.2,.8,.2,1), transform 400ms cubic-bezier(.2,.8,.2,1); }
        .tt-path { transition-property: stroke-dashoffset; transition-timing-function: cubic-bezier(.2,.8,.2,1); }
        .tt-dot { transition: opacity 300ms cubic-bezier(.2,.8,.2,1), transform 300ms cubic-bezier(.2,.8,.2,1); transform-box: fill-box; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) { .tt-pop, .tt-path, .tt-dot { transition: none !important; } }
        .tt-reset .tt-pop, .tt-reset .tt-path, .tt-reset .tt-dot { transition: none !important; }
        :root[data-theme="contrast"] .tt-card { border: 2px solid var(--rm-ink) !important; }
        :root[data-theme="contrast"] .tt-track { opacity: 1 !important; }
        :root[data-theme="contrast"] .tt-band { fill: none !important; stroke: var(--rm-ink); stroke-dasharray: 4 4; }
      `}</style>
      <div ref={box} className={cn("flex flex-col gap-8 rounded-block p-5 md:p-10 lg:p-12", resetting && "tt-reset")} style={{ background: "var(--rm-sky-soft)" }}>
        <div className="flex max-w-[760px] flex-col gap-4">
          <Eyebrow tone="inherit" className="text-sky-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[17px] leading-[1.55] text-secondary">{c.lead}</p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <Button to={bookFor("family", "pregnancy")}>{c.book}</Button>
            <Button to={routes.register} variant="outline">
              {c.register}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[13px] text-muted">{c.illustration}</span>
          {!reduced ? (
            <button type="button" onClick={replay} className="min-h-[40px] rounded-chip border border-[color:var(--rm-line)] bg-white px-4 text-[13px] font-semibold text-ink hover:border-ink">
              {c.replay}
            </button>
          ) : null}
        </div>

        {/* Every word, in reading order, for screen readers. The two drawings below are decoration. */}
        <ol aria-label={c.listLabel} className="sr-only">
          {MOMENTS.map((m) => (
            <li key={m.k}>
              {`${m.time}. ${LANES.find((l) => l.k === m.lane)?.label}. ${m.title}. ${m.body}`}
              {m.extra === "who" ? ` ${c.whoLabel}: ${c.whoValue}.` : ""}
              {m.extra === "choices" ? ` ${c.referralChoices.join(", ")}.` : ""}
            </li>
          ))}
          <li>{`${c.overlap}. ${c.overlapNote}`}</li>
        </ol>

        {/* Wide screens: swim lanes, left to right. */}
        <div aria-hidden className="relative hidden lg:block">
          <div ref={grid} className="relative grid grid-cols-[104px_repeat(6,minmax(0,1fr))] gap-x-3 gap-y-0">
            {geo ? (
              <svg className="pointer-events-none absolute inset-0 z-0 overflow-visible" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} fill="none">
                {band ? (
                  <rect className="tt-band tt-pop" x={band.x} y={band.y} width={band.w} height={band.h} rx="18" style={{ fill: "color-mix(in srgb, var(--rm-lilac-tint) 55%, transparent)", opacity: drawn ? 1 : 0, transitionDelay: `${reduced ? 0 : 1000}ms` }} />
                ) : null}
                {paths.map((p, i) => (
                  <path
                    key={i}
                    className="tt-path tt-track"
                    d={p.d}
                    pathLength={p.dashed ? undefined : 1}
                    stroke={p.color}
                    strokeWidth={p.thin ? 2.5 : 5}
                    strokeLinecap="round"
                    strokeDasharray={p.dashed ? undefined : "1 1"}
                    strokeDashoffset={drawn ? 0 : 1}
                    style={
                      p.dashed
                        ? { opacity: drawn ? 0.85 : 0, transition: `opacity ${p.dur}ms cubic-bezier(.2,.8,.2,1) ${reduced ? 0 : p.delay}ms`, strokeDasharray: "2 9" }
                        : { transitionDuration: `${reduced ? 0 : p.dur}ms`, transitionDelay: `${reduced ? 0 : p.delay}ms` }
                    }
                  />
                ))}
                {/* Stops: where each moment sits on its lane. */}
                {MOMENTS.map((m, i) => {
                  const x = geo.xs[i];
                  const y = geo.ys[m.lane];
                  const hollow = m.k === "throughout";
                  return (
                    <circle
                      key={m.k}
                      className="tt-dot tt-track"
                      cx={x}
                      cy={y}
                      r={hollow ? 7 : 8}
                      fill={hollow ? "#fff" : laneColor(m.lane)}
                      stroke={laneColor(m.lane)}
                      strokeWidth={hollow ? 3 : 0}
                      style={{ opacity: drawn ? 1 : 0, transform: drawn ? "none" : "scale(.4)", transitionDelay: `${reach(i)}ms` }}
                    />
                  );
                })}
              </svg>
            ) : null}

            {/* Header row: the six moments. */}
            <div />
            {MOMENTS.map((m, i) => (
              <div key={m.k} ref={(el) => { heads.current[i] = el; }} className="relative z-[1] pb-3 text-[13px] font-semibold text-secondary">
                {m.time}
              </div>
            ))}

            {/* The three lanes. */}
            {LANES.map((l) => (
              <div key={l.k} className="contents">
                <div className="relative z-[1] flex items-start pt-1.5">
                  <span className="text-[14px] font-semibold leading-[1.25]" style={{ color: l.k === "obs" ? "var(--rm-lilac-text)" : l.k === "baby" ? "var(--rm-sage-text)" : "var(--rm-sky-text)" }}>
                    {l.label}
                  </span>
                </div>
                <div className="relative z-[1] col-span-6 flex flex-col">
                  <div ref={(el) => { rails.current[l.k] = el; }} className="h-8" />
                  <div className="grid grid-cols-6 gap-x-3 pb-6">
                    {MOMENTS.map((_, i) => (
                      <div key={i} className="min-w-0">
                        {cell(l.k, i)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phones and tablets: the lanes turn vertical, side by side; each moment is a row. */}
        <div aria-hidden className="flex flex-col lg:hidden">
          <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-x-3 pb-2">
            <div className="grid grid-cols-3 text-center">
              {LANES.map((l) => (
                <span key={l.k} className="mx-auto h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] font-semibold">
              {LANES.map((l) => (
                <span key={l.k} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
          {MOMENTS.map((m, i) => {
            // Which lanes run through this row: with us always (dashed after the tests), obstetrics from 12 weeks
            // until the baby, the baby's lane from the baby on.
            const usDashed = i > 2;
            const obsOn = i >= 3 && i <= 5;
            const obsEnds = i === 5;
            const babyOn = i === 5;
            const col = (n: number) => `${12 + n * 24}px`;
            return (
              <div key={m.k} className="grid grid-cols-[72px_minmax(0,1fr)] gap-x-3">
                <div className="relative">
                  {/* With us */}
                  <span className="absolute top-0 h-full" style={{ left: col(0), width: 0, borderLeft: usDashed ? `2.5px dashed ${SKY}` : `4px solid ${SKY}` }} />
                  {/* Obstetrics or midwifery */}
                  {obsOn ? <span className="absolute" style={{ left: col(1), top: i === 3 ? 22 : 0, height: obsEnds ? 22 : i === 3 ? "calc(100% - 22px)" : "100%", borderLeft: `4px solid ${LILAC}` }} /> : null}
                  {i === 3 ? <span className="absolute h-[4px]" style={{ left: col(0), top: 20, width: 24, background: LILAC }} /> : null}
                  {/* Your baby */}
                  {babyOn ? (
                    <>
                      <span className="absolute h-[4px]" style={{ left: col(0), top: 20, width: 48, background: SAGE }} />
                      <span className="absolute" style={{ left: col(2), top: 22, bottom: 0, borderLeft: `4px solid ${SAGE}` }} />
                    </>
                  ) : null}
                  {/* This row's stop. */}
                  <span
                    className="tt-pop absolute h-4 w-4 -translate-x-[6px] rounded-full border-[3px]"
                    style={{
                      left: col(m.lane === "us" ? 0 : m.lane === "obs" ? 1 : 2),
                      top: 14,
                      background: m.k === "throughout" ? "#fff" : laneColor(m.lane),
                      borderColor: laneColor(m.lane),
                      opacity: drawn ? 1 : 0,
                      transitionDelay: `${reduced ? 0 : i * 140}ms`,
                    }}
                  />
                </div>
                <div className="pb-3">
                  <Card m={m} shown={drawn} delay={reduced ? 0 : i * 140 + 80} />
                  {m.k === "throughout" ? (
                    <div className="tt-pop mt-2 flex flex-col gap-1 rounded-[14px] border border-dashed px-3.5 py-3" style={{ borderColor: LILAC, background: "color-mix(in srgb, var(--rm-lilac-tint) 70%, white)", opacity: drawn ? 1 : 0, transitionDelay: `${reduced ? 0 : i * 140 + 160}ms` }}>
                      <span className="text-[14px] font-semibold" style={{ color: "var(--rm-lilac-text)" }}>
                        {c.overlap}
                      </span>
                      <span className="pretty text-[13px] leading-[1.4] text-secondary">{c.overlapNote}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
