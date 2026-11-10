"use client";

import { useState, type ReactNode } from "react";
import { ChipRow } from "@/components/ui";
import { skinFilters, skincareCopy as c } from "@/content/skincare";

/**
 * Skin type filter for the skincare list. The cards are rendered on the server; this only sets data-skin on the
 * wrapper, and CSS in globals.css hides cards whose data-skin-types do not include the type (or "all"). Every
 * group keeps at least one "all" product, so no group empties out.
 */
export function SkinFilter({ counts, children }: { counts: Record<string, number>; children: ReactNode }) {
  const [i, setI] = useState(0);
  const f = skinFilters[i];
  return (
    <div className="rm-skin" data-skin={f.k}>
      <div className="flex flex-col gap-2.5 px-4 pt-6 md:px-content">
        <span className="text-[13px] font-semibold text-secondary" id="skin-filter-label">
          {c.filterLabel}
        </span>
        <ChipRow items={skinFilters.map((x) => x.t)} value={i} onChange={setI} ariaLabel={c.filterLabel} size="sm" scroll controls="skin-list" />
        <span className="text-[13px] text-muted" aria-live="polite">
          {f.k === "any" ? c.showingAll(counts.any) : c.showing(counts[f.k], f.t)}. {c.filterNote}
        </span>
      </div>
      <div id="skin-list" role="tabpanel" aria-label={f.t}>
        {children}
      </div>
    </div>
  );
}
