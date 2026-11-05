"use client";

import { useEffect, useMemo, useState } from "react";
import { dripBrowserCopy as bc, dripCompareCopy as cc, dripFamilies, dripFamilyList, dripInside, infusionCopy, type Drip, type DripFamily } from "@/content/infusion-site";
import { Bag } from "./DripArt";
import { SmartLink } from "@/components/ui";
import { Choice } from "@/components/pages/book/FormBits";
import { bookFor, dripRoute } from "@/lib/routes";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

function Card({ d, picked, onPick, full }: { d: Drip; picked: boolean; onPick: () => void; full: boolean }) {
  const color = dripFamilies[d.f];
  const inside = dripInside[d.slug];
  return (
    <div className={cn("group relative flex flex-col gap-4 rounded-card border bg-raised p-6 transition-colors hover:border-sky", picked ? "border-ink" : "border-border")}>
      <span className="flex items-start justify-between gap-4">
        <span className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-[12px] font-semibold text-muted">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            {d.f}
          </span>
          {/* The title link covers the card; the compare button sits above it. */}
          <SmartLink to={dripRoute(d.slug)} className="display-tight text-[26px] leading-[1.1] after:absolute after:inset-0 after:rounded-card after:content-['']">
            {d.t}
          </SmartLink>
        </span>
        <Bag color={color} />
      </span>
      <span className="pretty flex-1 text-[15px] leading-[1.5] text-secondary">{d.d}</span>
      {inside ? (
        <span className="flex flex-col gap-2">
          <span className="text-[12px] font-semibold text-muted">{bc.inside}</span>
          <span className="flex flex-wrap gap-1.5">
            {inside.items.map((it) => (
              <span key={it} className="rounded-chip px-2.5 py-1 text-[12px] font-semibold text-ink" style={{ background: `color-mix(in srgb, ${color} 28%, white)` }}>
                {it}
              </span>
            ))}
            {inside.consult ? <span className="rounded-chip border border-dashed border-border px-2.5 py-1 text-[12px] text-muted">{bc.atConsult}</span> : null}
          </span>
        </span>
      ) : null}
      <span className="flex items-center justify-between gap-3">
        <span className="text-[14px] font-semibold text-link">{d.t} ›</span>
        <button
          type="button"
          onClick={onPick}
          aria-pressed={picked}
          disabled={!picked && full}
          className={cn(
            "relative z-[1] flex items-center gap-1.5 rounded-chip border-[1.5px] px-3 py-1.5 text-[13px] font-semibold motion-safe:transition-colors disabled:opacity-45",
            picked ? "border-ink bg-ink text-white" : "border-border bg-white text-ink hover:border-sky",
          )}
        >
          <span aria-hidden>{picked ? "✓" : "+"}</span>
          {picked ? cc.added : cc.add}
          <span className="sr-only"> {d.t}</span>
        </button>
      </span>
    </div>
  );
}

/** Up to three drips side by side: family, time, what's inside, and a way to book or open each one. */
function SideBySide({ drips, onClose, onRemove }: { drips: Drip[]; onClose: () => void; onRemove: (s: string) => void }) {
  return (
    <section id="drip-compare" aria-label={cc.title} className="flex scroll-mt-24 flex-col gap-4 rounded-block bg-ink p-6 text-white md:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="font-display text-[30px] font-medium tracking-[-.02em]">{cc.title}</span>
        <button type="button" onClick={onClose} className="text-[14px] font-semibold text-white/80 hover:text-white">
          {cc.close}
        </button>
      </div>
      <div className={cn("grid grid-cols-1 gap-3", drips.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
        {drips.map((d) => {
          const color = dripFamilies[d.f];
          const inside = dripInside[d.slug];
          return (
            <div key={d.slug} className="flex flex-col gap-4 rounded-card bg-white/[.07] p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="flex flex-col gap-1">
                  <span className="font-display text-[24px] font-medium leading-[1.1] tracking-[-.02em]">{d.t}</span>
                  <button type="button" onClick={() => onRemove(d.slug)} className="self-start text-[12px] text-white/60 hover:text-white">
                    Remove
                  </button>
                </span>
                <Bag color={color} className="h-[70px] w-[47px]" />
              </div>
              <dl className="flex flex-col gap-3 text-[14px]">
                <div><dt className="text-[12px] text-white/55">{cc.family}</dt><dd className="flex items-center gap-2"><span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />{d.f}</dd></div>
                <div><dt className="text-[12px] text-white/55">{cc.time}</dt><dd>{cc.timeV}</dd></div>
                <div>
                  <dt className="text-[12px] text-white/55">{cc.inside}</dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    {inside?.items.map((it) => (
                      <span key={it} className="rounded-chip px-2.5 py-1 text-[12px] font-semibold text-ink" style={{ background: `color-mix(in srgb, ${color} 55%, white)` }}>{it}</span>
                    ))}
                    {inside?.consult ? <span className="rounded-chip border border-dashed border-white/30 px-2.5 py-1 text-[12px] text-white/70">{bc.atConsult}</span> : null}
                  </dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-wrap items-center gap-3">
                <SmartLink to={`${bookFor("infusion", "drip")}&reason=${encodeURIComponent(d.t)}`} className={buttonClass("accent", "sm")}>Book this drip</SmartLink>
                <SmartLink to={dripRoute(d.slug)} className="text-[14px] font-semibold text-sun">Details ›</SmartLink>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Drips down the side, ingredients across the top, a dot where the menu says the drip has it. */
function Compare({ drips }: { drips: Drip[] }) {
  const cols = useMemo(() => {
    const seen: string[] = [];
    drips.forEach((d) => dripInside[d.slug]?.items.forEach((i) => !seen.includes(i) && seen.push(i)));
    return seen;
  }, [drips]);
  return (
    <div className="flex flex-col gap-3">
      <div className="scroll-x -mx-4 px-4 md:mx-0 md:px-0">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 overflow-hidden rounded-card border border-border bg-card text-[14px]">
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 bg-card px-4 py-3 text-left text-[12px] font-semibold text-muted">
                {bc.tableDrip}
              </th>
              {cols.map((c) => (
                <th key={c} scope="col" className="px-2 py-3 text-center text-[12px] font-semibold text-muted">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {drips.map((d) => {
              const inside = dripInside[d.slug];
              const color = dripFamilies[d.f];
              return (
                <tr key={d.slug} className="group">
                  <th scope="row" className="sticky left-0 border-t border-border bg-card px-4 py-3 text-left font-semibold group-hover:bg-paper">
                    <SmartLink to={dripRoute(d.slug)} className="flex items-center gap-2 hover:underline hover:underline-offset-4">
                      <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} />
                      {d.t}
                    </SmartLink>
                    {inside?.consult ? <span className="mt-0.5 block text-[12px] font-normal text-muted">{bc.atConsult}</span> : null}
                  </th>
                  {cols.map((c) => {
                    const has = inside?.items.includes(c);
                    return (
                      <td key={c} className="border-t border-border px-2 py-3 text-center group-hover:bg-paper">
                        {has ? <span className="mx-auto block aspect-square h-4 w-4 min-w-4 rounded-full" style={{ background: color }} /> : <span className="text-border">·</span>}
                        <span className="sr-only">{has ? "Yes" : "No"}</span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <span className="text-[13px] text-muted">{bc.tableNote}</span>
    </div>
  );
}

/**
 * Signature drips with family filter chips and a Cards / Compare view. A ?family= query (from the By concern page)
 * preselects a family; the filter is per visit.
 */
export function DripBrowser({ drips }: { drips: Drip[] }) {
  const [family, setFamily] = useState<DripFamily | "all">("all");
  const [view, setView] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const f = q.get("family");
    if (f && (dripFamilyList as string[]).includes(f)) setFamily(f as DripFamily);
    // "Compare with other drips" on a drip page starts the tray with that drip.
    const c = q.get("compare");
    if (c && drips.some((d) => d.slug === c)) setPicked([c]);
  }, [drips]);
  const toggle = (slug: string) => setPicked((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : p.length < 3 ? [...p, slug] : p));
  const pickedDrips = picked.map((s) => drips.find((d) => d.slug === s)).filter((d): d is Drip => d != null);
  useEffect(() => {
    if (picked.length < 2) setOpen(false);
  }, [picked.length]);
  const shown = family === "all" ? drips : drips.filter((d) => d.f === family);
  const chips: (DripFamily | "all")[] = ["all", ...dripFamilyList];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="radiogroup" aria-label="Treatment family" className="scroll-x -mx-4 flex gap-1.5 px-4 md:mx-0 md:flex-wrap md:px-0">
          {chips.map((c) => {
            const on = family === c;
            return (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setFamily(c)}
                className={cn("flex shrink-0 items-center gap-2 rounded-chip border px-4 py-2.5 text-[14px] font-semibold transition-colors", on ? "border-ink bg-ink text-white" : "border-border bg-card text-ink hover:border-sky")}
              >
                <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: c === "all" ? "currentColor" : dripFamilies[c] }} />
                {c === "all" ? infusionCopy.drips.all : c}
              </button>
            );
          })}
        </div>
        <Choice options={bc.views} value={view} onChange={setView} ariaLabel={bc.viewLabel} className="w-full shrink-0 lg:w-[380px]" />
      </div>
      <div className="flex items-end justify-between gap-4">
        <span className="text-[18px] font-semibold">{infusionCopy.drips.signature}</span>
        <span className="text-[14px] text-muted" aria-live="polite">
          {infusionCopy.drips.count(shown.length)}
        </span>
      </div>
      {view === 0 ? (
        <div className="grid grid-cols-1 gap-card md:grid-cols-2 lg:grid-cols-3">
          {shown.map((d) => (
            <Card key={d.slug} d={d} picked={picked.includes(d.slug)} onPick={() => toggle(d.slug)} full={picked.length >= 3} />
          ))}
        </div>
      ) : (
        <Compare drips={shown} />
      )}

      {open && pickedDrips.length >= 2 ? <SideBySide drips={pickedDrips} onClose={() => setOpen(false)} onRemove={toggle} /> : null}

      {/* Compare tray: slides up once a drip is picked. */}
      <div
        aria-live="polite"
        className={cn(
          "fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-[720px] items-center justify-between gap-3 rounded-chip bg-ink py-2 pl-5 pr-2 text-white shadow-[0_12px_32px_rgba(16,24,40,.28)] motion-safe:transition-[transform,opacity] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)] md:bottom-6",
          picked.length && view === 0 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0",
        )}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex -space-x-2">
            {pickedDrips.map((d) => (
              <span key={d.slug} className="h-6 w-6 rounded-full border-2 border-ink" style={{ background: dripFamilies[d.f] }} />
            ))}
          </span>
          <span className="truncate text-[14px] font-semibold">
            {cc.tray(picked.length)} <span className="font-normal text-white/60">({cc.max})</span>
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={() => setPicked([])} className="rounded-chip px-3 py-2 text-[13px] text-white/75 hover:text-white">
            {cc.clear}
          </button>
          <button
            type="button"
            disabled={picked.length < 2}
            onClick={() => {
              setOpen(true);
              requestAnimationFrame(() => document.getElementById("drip-compare")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }));
            }}
            className="rounded-chip bg-sun px-4 py-2 text-[14px] font-semibold text-ink disabled:opacity-45"
          >
            {cc.open}
          </button>
        </span>
      </div>
    </div>
  );
}
