"use client";

import { useEffect, useState } from "react";
import { dripFamilies, dripFamilyList, infusionCopy, type Drip, type DripFamily } from "@/content/infusion-site";
import { cn } from "@/lib/cn";
import { DripCard } from "./InfusionBits";

/**
 * Signature drips with the family filter chips. A ?family= query (from the
 * By concern page) preselects a family; the filter is per visit.
 */
export function DripBrowser({ drips }: { drips: Drip[] }) {
  const [family, setFamily] = useState<DripFamily | "all">("all");
  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get("family");
    if (f && (dripFamilyList as string[]).includes(f)) setFamily(f as DripFamily);
  }, []);
  const shown = family === "all" ? drips : drips.filter((d) => d.f === family);
  const chips: (DripFamily | "all")[] = ["all", ...dripFamilyList];
  return (
    <div className="flex flex-col gap-6">
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
      <div className="flex items-end justify-between gap-4">
        <span className="text-[18px] font-semibold">{infusionCopy.drips.signature}</span>
        <span className="text-[14px] text-muted" aria-live="polite">
          {infusionCopy.drips.count(shown.length)}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-card md:grid-cols-2 lg:grid-cols-3">
        {shown.map((d) => (
          <DripCard key={d.slug} drip={d} />
        ))}
      </div>
    </div>
  );
}
