import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Fact } from "@/content/types";
import { FactGrid } from "./Card";
import { Button } from "./Button";
import { SmartLink } from "./SmartLink";

/**
 * Floating result card beside a chooser: white, 24px radius, one soft
 * shadow, tags, Fraunces title, body, 2-col facts and a CTA row.
 */
export function ResultCard({
  tags,
  tagTint,
  title,
  p,
  facts,
  cta,
  ctaTo = "book",
  link,
  linkTo,
  children,
  className,
  minHeight = 520,
  titleSize = 40,
}: {
  tags?: string[];
  tagTint?: string;
  title: string;
  p: string;
  facts?: Fact[];
  cta?: string;
  ctaTo?: string;
  link?: string;
  linkTo?: string;
  children?: ReactNode;
  className?: string;
  minHeight?: number;
  titleSize?: 36 | 40;
}) {
  return (
    <div className={cn("flex flex-col gap-6 rounded-card bg-raised p-6 shadow-card md:p-8 lg:p-10", className)} style={{ minHeight }}>
      {tags && tags.length ? (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span key={t} className="rounded-chip px-3 py-1.5 text-[12px] font-semibold text-ink" style={{ background: tagTint ?? "var(--surface-card)" }}>
              {t}
            </span>
          ))}
        </div>
      ) : null}
      <span className={cn("display-tight balance leading-none", titleSize === 40 ? "text-[32px] lg:text-[40px]" : "text-[30px] lg:text-[36px]")}>{title}</span>
      <p className="pretty text-[16px] leading-[1.55] text-secondary">{p}</p>
      {facts ? <FactGrid facts={facts} className="flex-1" /> : null}
      {children}
      {cta || link ? (
        <div className="flex flex-wrap items-center gap-3.5 border-t border-border pt-4 text-[15px] font-semibold">
          {cta ? <Button to={ctaTo}>{cta}</Button> : null}
          {link && linkTo ? (
            <SmartLink to={linkTo} className="text-link">
              {link} ›
            </SmartLink>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
