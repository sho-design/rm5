"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import {
  addOnsOf,
  dripsWith,
  evidenceCopy as c,
  familyOrder,
  ingredientList,
  insideOf,
  kindColor,
  kindOrder,
} from "@/content/inf-evidence";
import {
  dripFamilies,
  showEvidenceLabels,
  signatureDrips,
} from "@/content/infusion-site";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";
import { dripRoute } from "@/lib/routes";

type Mode = "drips" | "ingredients" | "evidence";
type Tile = { id: string; label: string; color: string };
type Lane = { name: string; color: string; tiles: Tile[]; note?: string };

const LEVELS = ["Established", "Supported", "Emerging"] as const;

function lanesFor(mode: Mode): Lane[] {
  if (mode === "ingredients") {
    return kindOrder.map((k) => ({
      name: k,
      color: kindColor[k],
      tiles: ingredientList
        .filter((i) => i.kind === k)
        .map((i) => ({ id: `i:${i.k}`, label: i.t, color: kindColor[k] })),
    }));
  }
  if (mode === "evidence") {
    return LEVELS.map((ev) => ({
      name: ev,
      color:
        ev === "Emerging"
          ? "var(--rm-sun-soft)"
          : ev === "Supported"
            ? "var(--rm-sun)"
            : "var(--rm-sage)",
      note: c.levels[ev],
      tiles: signatureDrips
        .filter((d) => d.ev === ev)
        .map((d) => ({
          id: `d:${d.slug}`,
          label: d.t,
          color: dripFamilies[d.f],
        })),
    }));
  }
  return familyOrder.map((f) => ({
    name: f,
    color: dripFamilies[f],
    tiles: signatureDrips
      .filter((d) => d.f === f)
      .map((d) => ({ id: `d:${d.slug}`, label: d.t, color: dripFamilies[f] })),
  }));
}

/** Where a tile starts before it settles into its lane: scattered above, the same every time. */
const scatter = (i: number) =>
  `translate(${(((i * 37) % 7) - 3) * 22}px, ${-48 - ((i * 13) % 5) * 14}px) rotate(${((i * 11) % 9) - 4}deg) scale(.86)`;

/**
 * "What is in the bag" on the honest menu. Every drip, or every ingredient, flies into a lane for what it is when
 * the section comes into view (and again when you switch views). Tap one for what is inside or where it is used,
 * from copy already on the site; where a blend is set at the consult it says so instead of guessing. No ratings:
 * the evidence-label view appears only once the clinic turns those labels on (see content/inf-evidence.ts).
 * Nothing loops; reduced motion shows the lanes settled; high contrast draws every tile at full strength.
 */
export function EvidenceMeter() {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("drips");
  const [sel, setSel] = useState<string | null>(null);
  const [seen, setSeen] = useState(false);
  const [settled, setSettled] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const detail = useRef<HTMLDivElement>(null);

  // Settle once the section is on screen.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Each new view (and the first sight of the section) plays the settle again.
  useEffect(() => {
    if (reduced) {
      setSettled(true);
      return;
    }
    if (!seen) return;
    setSettled(false);
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setSettled(true)),
    );
    return () => cancelAnimationFrame(id);
  }, [mode, seen, reduced]);

  const pick = (m: Mode) => {
    setMode(m);
    setSel(null);
  };
  const choose = (id: string) => {
    setSel((s) => (s === id ? null : id));
    // Bring the details into view on narrow screens, where they sit below the lanes.
    requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 1023px)").matches)
        detail.current?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "nearest",
        });
    });
  };

  const lanes = lanesFor(mode);
  const modes: Mode[] = showEvidenceLabels
    ? ["drips", "ingredients", "evidence"]
    : ["drips", "ingredients"];
  let n = 0;

  return (
    <Section id="whats-in-the-bag" className="rm-paper scroll-mt-6">
      <style>{`
        .ev-tile { transition: transform 720ms cubic-bezier(.2,.8,.2,1), opacity 420ms cubic-bezier(.2,.8,.2,1), background-color 250ms, box-shadow 250ms; }
        .ev-chip { animation: ev-in 360ms cubic-bezier(.2,.8,.2,1) both; }
        @keyframes ev-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
        @media (prefers-reduced-motion: reduce) { .ev-tile { transition: none !important; } .ev-chip { animation: none; } }
        :root[data-theme="contrast"] .ev-tile { opacity: 1 !important; transform: none !important; border: 2px solid var(--text-primary) !important; }
        :root[data-theme="contrast"] .ev-lane { border: 2px solid var(--text-primary); }
      `}</style>
      <div
        ref={box}
        className="flex flex-col gap-6 overflow-hidden rounded-block bg-[color:var(--div-infusion)] p-5 text-ink md:p-10 lg:p-12"
      >
        <div className="flex max-w-[760px] flex-col gap-3">
          <Eyebrow tone="inherit" className="text-sage-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.lead}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className="text-[14px] font-semibold text-secondary"
            id="ev-modes"
          >
            {c.modesLabel}
          </span>
          <div
            role="group"
            aria-labelledby="ev-modes"
            className="flex flex-wrap gap-2"
          >
            {modes.map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => pick(m)}
                className={cn(
                  "min-h-[44px] rounded-chip border px-5 text-[15px] font-semibold transition-colors",
                  mode === m
                    ? "border-ink bg-ink text-white"
                    : "border-[color:var(--border-default)] bg-page hover:border-ink",
                )}
              >
                {c.modes[m]}
              </button>
            ))}
          </div>
          <span className="text-[14px] text-secondary">{c.tap}</span>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
          <ul
            className={cn(
              "grid grid-cols-1 gap-3 sm:grid-cols-2",
              lanes.length > 4 ? "xl:grid-cols-3" : "",
            )}
          >
            {lanes.map((lane) => (
              <li
                key={lane.name}
                className="ev-lane flex flex-col gap-3 rounded-card bg-page/80 p-4"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-[14px] font-semibold">
                    <span
                      aria-hidden
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ background: lane.color }}
                    />
                    {lane.name}
                  </span>
                  <span className="text-[13px] tabular-nums text-muted">
                    {lane.tiles.length}
                  </span>
                </span>
                {lane.note ? (
                  <span className="text-[13px] leading-[1.4] text-secondary">
                    {lane.note}
                  </span>
                ) : null}
                <ul className="flex flex-wrap gap-2">
                  {lane.tiles.map((t) => {
                    const i = n++;
                    const on = sel === t.id;
                    return (
                      <li key={t.id}>
                        <button
                          type="button"
                          aria-expanded={on}
                          aria-controls="ev-detail"
                          onClick={() => choose(t.id)}
                          className={cn(
                            "ev-tile flex min-h-[44px] items-center gap-2 rounded-[14px] border px-3.5 text-left text-[15px] font-medium",
                            on
                              ? "border-ink bg-ink text-white shadow-card"
                              : "border-[color:var(--border-default)] bg-page hover:border-ink",
                          )}
                          style={{
                            transform: settled ? "none" : scatter(i),
                            opacity: settled ? 1 : 0,
                            transitionDelay: settled ? `${i * 45}ms` : "0ms",
                          }}
                        >
                          <span
                            aria-hidden
                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ background: t.color }}
                          />
                          {t.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>

          <div
            ref={detail}
            id="ev-detail"
            aria-live="polite"
            className="scroll-mt-24 lg:sticky lg:top-24"
          >
            {sel ? <Detail id={sel} onClose={() => setSel(null)} /> : <Empty />}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[color:var(--border-default)] pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="pretty max-w-[640px] text-[13px] leading-[1.5] text-secondary">
            {c.note}
          </p>
          <SmartLink
            to="honest#ingredients"
            className="shrink-0 text-[15px] font-semibold text-link"
          >
            {c.ingredientsLink} ›
          </SmartLink>
        </div>
      </div>
    </Section>
  );
}

function Empty() {
  return (
    <div className="hidden min-h-[220px] flex-col items-center justify-center gap-2 rounded-card border border-dashed border-[color:var(--border-default)] bg-page/60 p-6 text-center lg:flex">
      <svg aria-hidden width="56" height="72" viewBox="0 0 56 72" fill="none">
        <rect
          x="8"
          y="10"
          width="40"
          height="46"
          rx="12"
          fill="var(--surface-card)"
          stroke="var(--div-infusion-accent)"
          strokeWidth="2"
        />
        <rect
          x="22"
          y="2"
          width="12"
          height="9"
          rx="3"
          fill="var(--div-infusion-accent)"
        />
        <path
          d="M14 34h28"
          stroke="var(--div-infusion-accent)"
          strokeWidth="2"
          strokeDasharray="3 4"
        />
        <path
          d="M28 56v12"
          stroke="var(--div-infusion-accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[15px] font-semibold">{c.tap}</span>
    </div>
  );
}

function Detail({ id, onClose }: { id: string; onClose: () => void }) {
  const [kind, key] = id.split(":");
  if (kind === "d") {
    const d = signatureDrips.find((x) => x.slug === key);
    if (!d) return null;
    const inside = insideOf(d)
      .map((k) => ingredientList.find((i) => i.k === k))
      .filter((x) => Boolean(x));
    const addOns = addOnsOf(d)
      .map((k) => ingredientList.find((i) => i.k === k))
      .filter((x) => Boolean(x));
    return (
      <Card title={d.t} color={dripFamilies[d.f]} sub={d.f} onClose={onClose}>
        <p className="pretty text-[15px] leading-[1.5]">{d.d}</p>
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-semibold text-sage-text">
            {c.inside}
          </span>
          {inside.length ? (
            <ul className="flex flex-wrap gap-1.5">
              {inside.map((i, n) => (
                <li
                  key={i!.k}
                  className="ev-chip flex items-center gap-1.5 rounded-chip bg-[color:var(--div-infusion)] px-3 py-1.5 text-[14px]"
                  style={{ animationDelay: `${n * 60}ms` }}
                >
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full"
                    style={{ background: kindColor[i!.kind] }}
                  />
                  {i!.t}
                </li>
              ))}
            </ul>
          ) : (
            <p className="pretty text-[14px] leading-[1.5] text-secondary">
              {c.insideUnknown}
            </p>
          )}
        </div>
        {addOns.length ? (
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-semibold text-secondary">
              {c.addOns}
            </span>
            <span className="text-[14px]">
              {addOns.map((a) => a!.t).join(", ")}
            </span>
          </div>
        ) : null}
        <SmartLink
          to={dripRoute(d.slug)}
          className="w-fit text-[15px] font-semibold text-link"
        >
          {c.seeDrip} ›
        </SmartLink>
      </Card>
    );
  }
  const ing = ingredientList.find((i) => i.k === key);
  if (!ing) return null;
  const drips = dripsWith(ing.k);
  const addOnIn = signatureDrips.filter((d) => addOnsOf(d).includes(ing.k));
  const program = ing.kind === "Program add-ons";
  return (
    <Card
      title={ing.t}
      color={kindColor[ing.kind]}
      sub={ing.kind}
      onClose={onClose}
    >
      <p className="pretty text-[15px] leading-[1.5]">{ing.d}</p>
      {ing.note ? (
        <p className="pretty rounded-[12px] bg-sun-tint px-3.5 py-2.5 text-[14px] leading-[1.45]">
          {ing.note}
        </p>
      ) : null}
      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-semibold text-sage-text">
          {c.foundIn}
        </span>
        <ul className="flex flex-col gap-1.5 text-[15px]">
          {drips.map((d, n) => (
            <li
              key={d.slug}
              className="ev-chip"
              style={{ animationDelay: `${n * 60}ms` }}
            >
              <SmartLink
                to={dripRoute(d.slug)}
                className="font-semibold hover:text-link"
              >
                {d.t} ›
              </SmartLink>
            </li>
          ))}
          {addOnIn.map((d) => (
            <li key={`a-${d.slug}`} className="ev-chip text-secondary">
              {d.t}: {c.addOns.toLowerCase()}
            </li>
          ))}
          {ing.shot && !program ? (
            <li className="ev-chip">
              <SmartLink to="shots" className="font-semibold hover:text-link">
                {c.injectionBar} ›
              </SmartLink>
            </li>
          ) : null}
          {program ? (
            <li className="ev-chip text-secondary">{c.programOnly}</li>
          ) : null}
          {!drips.length && !addOnIn.length && !ing.shot ? (
            <li className="text-secondary">{c.foundInNone}</li>
          ) : null}
        </ul>
      </div>
    </Card>
  );
}

function Card({
  title,
  sub,
  color,
  onClose,
  children,
}: {
  title: string;
  sub: string;
  color: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="ev-chip flex flex-col gap-4 rounded-card bg-page p-5 shadow-card md:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="flex flex-col gap-1">
          <span className="flex items-center gap-2 text-[13px] font-semibold text-secondary">
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: color }}
            />
            {sub}
          </span>
          <h3 className="font-display text-[24px] font-medium leading-[1.1]">
            {title}
          </h3>
        </span>
        <button
          type="button"
          onClick={onClose}
          className="min-h-[44px] shrink-0 rounded-chip border border-[color:var(--border-default)] px-4 text-[14px] font-semibold hover:border-ink"
        >
          {c.close}
        </button>
      </div>
      {children}
    </div>
  );
}
