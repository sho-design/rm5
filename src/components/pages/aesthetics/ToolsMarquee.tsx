"use client";

import Image from "next/image";
import { useState } from "react";
import { aesCopy as c, aesFamilies, type AesFamily } from "@/content/aesthetics-menu";
import { cn } from "@/lib/cn";

export type ToolTile = { name: string; what: string; family?: AesFamily; logo: string | null };

function Tile({ t, hidden }: { t: ToolTile; hidden?: boolean }) {
  const color = t.family ? aesFamilies[t.family].color : "#9BB0C9";
  const body = (
    <>
      <span className="flex h-[40px] items-center">
        {t.logo ? (
          <Image src={t.logo} alt={t.name} width={140} height={40} className="h-[34px] w-auto max-w-[150px] object-contain" />
        ) : (
          <span className="flex items-center gap-2 font-display text-[22px] font-medium leading-none tracking-[-.01em]">
            <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} />
            {t.name}
          </span>
        )}
      </span>
      <span className="text-[13px] leading-[1.35] text-muted">{t.what}</span>
    </>
  );
  const cls = "flex w-[220px] shrink-0 flex-col justify-between gap-3 rounded-card border border-border bg-card px-5 py-4 motion-safe:transition-[border-color,transform] motion-safe:duration-300 hover:-translate-y-0.5 hover:border-sky";
  return t.family ? (
    <a href={`#family-${t.family}`} className={cls} tabIndex={hidden ? -1 : undefined} aria-label={hidden ? undefined : `${t.name}, ${t.what}`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/**
 * The brands and devices we use, as tiles drifting slowly to the left. Hover or focus pauses it, and a Pause
 * button stops it for good (motion that runs over 5 seconds needs one). With reduced motion it is a still,
 * wrapping grid. The second copy that makes the loop seamless is hidden from screen readers and the Tab order.
 */
export function ToolsMarquee({ tools }: { tools: ToolTile[] }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-muted">{c.toolsTitle}</span>
          <span className="pretty text-[15px] text-secondary">{c.toolsLead}</span>
        </div>
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
          className="rm-marquee-btn hidden min-h-[40px] shrink-0 rounded-chip border-[1.5px] border-border px-4 text-[13px] font-semibold hover:border-sky motion-safe:inline-flex motion-safe:items-center"
        >
          {paused ? c.toolsPlay : c.toolsPause}
        </button>
      </div>
      <div className={cn("rm-marquee", paused && "rm-marquee-paused")}>
        <ul className="rm-marquee-track">
          {tools.map((t) => (
            <li key={t.name} className="flex">
              <Tile t={t} />
            </li>
          ))}
          {tools.map((t) => (
            <li key={`${t.name}-2`} className="rm-marquee-copy flex" aria-hidden>
              <Tile t={t} hidden />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
