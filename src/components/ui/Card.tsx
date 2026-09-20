import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SmartLink } from "./SmartLink";
import type { Benefit, Fact, TintCard as TintCardData } from "@/content/types";

/**
 * Surface card: white with a 1px line, or tinted with no border, or navy.
 * Radius 24 by default (card), 18 for tiles, 16 for rows.
 */
export function Card({
  children,
  className,
  style,
  tone = "white",
  radius = "card",
  padding = "md",
  tint,
  to,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  tone?: "white" | "paper" | "tint" | "navy" | "sun" | "ghost";
  radius?: "card" | "card-sm" | "tile" | "row" | "block";
  padding?: "none" | "sm" | "md" | "lg";
  /** Background for tone="tint" (a division tint or a tints[] value). */
  tint?: string;
  /** Makes the whole card a link. */
  to?: string;
}) {
  const toneClass = {
    white: "bg-raised border border-border",
    paper: "bg-card border border-border",
    tint: "",
    navy: "bg-inverse text-on-inverse",
    sun: "bg-sun-soft text-ink",
    ghost: "border border-border",
  }[tone];
  const radiusClass = { card: "rounded-card", "card-sm": "rounded-card-sm", tile: "rounded-tile", row: "rounded-row", block: "rounded-block" }[radius];
  const padClass = { none: "", sm: "p-4 md:p-5", md: "p-5 md:p-6", lg: "p-6 md:p-8 lg:p-10" }[padding];
  const classes = cn("flex flex-col", radiusClass, toneClass, padClass, to && "transition-colors hover:border-sky", className);
  const s = { ...(tone === "tint" && tint ? { background: tint } : {}), ...style };
  if (to) {
    return (
      <SmartLink to={to} className={classes} style={s}>
        {children}
      </SmartLink>
    );
  }
  return (
    <div className={classes} style={s}>
      {children}
    </div>
  );
}

/** Fact tile: small muted key over a semibold value. Used in 2-col grids inside result cards. */
export function FactTile({ k, v, inverse }: Fact & { inverse?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-1 rounded-row px-[18px] py-4", inverse ? "bg-white/7" : "bg-card border border-border")}>
      <span className={cn("text-[12px] font-semibold", inverse ? "text-white/55" : "text-muted")}>{k}</span>
      <span className="text-[15px] font-semibold leading-[1.35]">{v}</span>
    </div>
  );
}

export function FactGrid({ facts, inverse, className }: { facts: Fact[]; inverse?: boolean; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-2.5 sm:grid-cols-2", className)}>
      {facts.map((f, i) => (
        <FactTile key={i} {...f} inverse={inverse} />
      ))}
    </div>
  );
}

/** Benefit card: big Fraunces numeral, title, description, tinted background, min-height 260. */
export function BenefitCard({ big, t, d, bg }: Benefit) {
  return (
    <div className="flex min-h-[220px] flex-col justify-between gap-7 rounded-card p-7 lg:min-h-[260px] lg:p-8" style={{ background: bg }}>
      <span className="display-tight text-[48px] leading-none tracking-[-.03em] text-ink lg:text-[56px]">{big}</span>
      <div className="flex flex-col gap-2">
        <span className="text-[18px] font-semibold tracking-[-.01em] text-ink">{t}</span>
        <span className="text-[14px] leading-[1.5] text-ink-2">{d}</span>
      </div>
    </div>
  );
}

/** Tinted content card with title, description and optional meta pill / link. */
export function TintCard({ t, d, bg, meta, link, page, time, className }: TintCardData & { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2.5 rounded-tile p-5 text-ink", className)} style={{ background: bg }}>
      {meta || time ? (
        <div className="flex items-center justify-between gap-3">
          <span className="text-[16px] font-semibold">{t}</span>
          <span className="shrink-0 rounded-chip bg-white/70 px-2.5 py-1 text-[11px] font-semibold">{meta ?? time}</span>
        </div>
      ) : (
        <span className="text-[16px] font-semibold">{t}</span>
      )}
      <span className="text-[13px] leading-[1.45] text-ink-2">{d}</span>
      {link && page ? (
        <SmartLink to={page} className="pt-1 text-[13px] font-semibold text-link">
          {link} ›
        </SmartLink>
      ) : null}
    </div>
  );
}
