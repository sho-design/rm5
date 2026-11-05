"use client";

import { useEffect, useMemo, useState } from "react";
import { dripBrowserCopy as bc, dripFamilies, dripFamilyList, dripInside, infusionCopy, type Drip, type DripFamily } from "@/content/infusion-site";
import { SmartLink } from "@/components/ui";
import { Choice } from "@/components/pages/book/FormBits";
import { dripRoute } from "@/lib/routes";
import { cn } from "@/lib/cn";

/** An IV bag in the family colour. The fluid rises a little when the card is hovered or focused. */
function Bag({ color }: { color: string }) {
  return (
    <svg aria-hidden viewBox="0 0 64 96" className="h-[84px] w-[56px] shrink-0">
      <defs>
        <clipPath id={`bag-${color.slice(1)}`}>
          <path d="M10 14h44a4 4 0 0 1 4 4v46c0 9-7 16-16 16H22c-9 0-16-7-16-16V18a4 4 0 0 1 4-4z" />
        </clipPath>
      </defs>
      <rect x="27" y="2" width="10" height="9" rx="2" fill="var(--rm-ink)" opacity=".85" />
      <path d="M10 14h44a4 4 0 0 1 4 4v46c0 9-7 16-16 16H22c-9 0-16-7-16-16V18a4 4 0 0 1 4-4z" fill="white" stroke="var(--rm-ink)" strokeOpacity=".18" strokeWidth="1.5" />
      <g clipPath={`url(#bag-${color.slice(1)})`}>
        <rect
          x="0"
          y="40"
          width="64"
          height="60"
          fill={color}
          className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-translate-y-2 group-focus-visible:-translate-y-2"
        />
        <rect x="0" y="40" width="64" height="4" fill="white" opacity=".35" className="motion-safe:transition-transform motion-safe:duration-300 group-hover:-translate-y-2" />
      </g>
      <path d="M16 24h10M16 30h6" stroke="var(--rm-ink)" strokeOpacity=".25" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 80v14" stroke="var(--rm-ink)" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Card({ d }: { d: Drip }) {
  const color = dripFamilies[d.f];
  const inside = dripInside[d.slug];
  return (
    <SmartLink to={dripRoute(d.slug)} className="group flex flex-col gap-4 rounded-card border border-border bg-raised p-6 transition-colors hover:border-sky">
      <span className="flex items-start justify-between gap-4">
        <span className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-[12px] font-semibold text-muted">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            {d.f}
          </span>
          <span className="display-tight text-[26px] leading-[1.1]">{d.t}</span>
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
      <span className="text-[14px] font-semibold text-link">{d.t} ›</span>
    </SmartLink>
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
  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get("family");
    if (f && (dripFamilyList as string[]).includes(f)) setFamily(f as DripFamily);
  }, []);
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
            <Card key={d.slug} d={d} />
          ))}
        </div>
      ) : (
        <Compare drips={shown} />
      )}
    </div>
  );
}
