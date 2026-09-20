import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Display, Eyebrow, Lead } from "./Text";
import { SmartLink } from "./SmartLink";

/**
 * Text section: 32px content gutter on desktop, 16px on mobile, 72px above
 * (56 when tight). Use for grids of cards and prose blocks.
 */
export function Section({ children, className, tight, first, style, id }: { children: ReactNode; className?: string; tight?: boolean; first?: boolean; style?: CSSProperties; id?: string }) {
  return (
    <section id={id} style={style} className={cn("px-4 md:px-content", first ? "pt-6 md:pt-8" : tight ? "pt-10 md:pt-section-tight" : "pt-12 md:pt-section", className)}>
      {children}
    </section>
  );
}

/**
 * Rounded full-bleed block: sits 24px from the viewport edge (12px mobile),
 * 28px radius, 72px above. Tone decides background and text colour.
 */
export function Block({
  children,
  className,
  tone = "navy",
  tight,
  first,
  last,
  style,
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "navy" | "sun" | "sun-soft" | "paper" | "white" | "tint" | "none";
  tight?: boolean;
  first?: boolean;
  last?: boolean;
  style?: CSSProperties;
  id?: string;
}) {
  const toneClass = {
    navy: "bg-inverse text-on-inverse",
    sun: "bg-sun-soft text-ink",
    "sun-soft": "bg-sun-soft text-ink",
    paper: "bg-card border border-border",
    white: "bg-raised border border-border",
    tint: "",
    none: "",
  }[tone];
  return (
    <section
      id={id}
      style={style}
      className={cn(
        "mx-3 md:mx-gutter rounded-block overflow-hidden",
        first ? "mt-3 md:mt-6" : tight ? "mt-10 md:mt-section-tight" : "mt-12 md:mt-section",
        last && "mb-3 md:mb-6",
        toneClass,
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Section header row: heading left, optional link or action right. */
export function SectionHeader({
  eyebrow,
  eyebrowTone,
  title,
  titleSize = "sm",
  sub,
  action,
  actionLabel,
  actionTo,
  className,
  inverse,
}: {
  eyebrow?: string;
  eyebrowTone?: "muted" | "sun" | "sky" | "inherit";
  title: ReactNode;
  titleSize?: "sm" | "xs" | "md" | "2xs";
  sub?: string;
  action?: ReactNode;
  actionLabel?: string;
  actionTo?: string;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8", className)}>
      <div className="flex flex-col gap-2">
        {eyebrow ? <Eyebrow tone={eyebrowTone ?? (inverse ? "sun" : "muted")}>{eyebrow}</Eyebrow> : null}
        <Display size={titleSize}>{title}</Display>
        {sub ? <Lead size="sm" tone={inverse ? "inverse" : "muted"}>{sub}</Lead> : null}
      </div>
      {action ??
        (actionLabel && actionTo ? (
          <SmartLink to={actionTo} className="text-[15px] font-semibold text-link whitespace-nowrap">
            {actionLabel} ›
          </SmartLink>
        ) : null)}
    </div>
  );
}

/** Equal-column card grid: 1 col on mobile, 2 on md, n on lg. */
export function Grid({ cols = 3, children, className, gap = "card" }: { cols?: 2 | 3 | 4 | 5 | 6; children: ReactNode; className?: string; gap?: "card" | "block" | "tight" }) {
  const colClass = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4", 5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5", 6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6" }[cols];
  const gapClass = { card: "gap-card", block: "gap-block", tight: "gap-2.5" }[gap];
  return <div className={cn("grid grid-cols-1", colClass, gapClass, className)}>{children}</div>;
}
