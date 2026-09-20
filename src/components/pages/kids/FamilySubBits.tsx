import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Block, Button, Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import type { TintCard } from "@/content/types";

/**
 * Section header used across the Family Medicine sub-pages: accent eyebrow
 * and Fraunces 44 title left, a short 14px muted note right (stacks on mobile).
 */
export function SubHeader({ eyebrow, accentClass, title, note, className }: { eyebrow: string; accentClass: string; title: string; note?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8", className)}>
      <div className="flex flex-col gap-2">
        <Eyebrow tone="inherit" className={accentClass}>
          {eyebrow}
        </Eyebrow>
        <Display size="xs">{title}</Display>
      </div>
      {note ? <span className="max-w-[380px] text-[14px] leading-[1.5] text-muted md:text-right">{note}</span> : null}
    </div>
  );
}

/**
 * Tinted 22px tile with a Fraunces 22 title, 14px body and a 12px muted meta
 * line pinned to the bottom (screening ages, decades, forms).
 */
export function MetaTile({ t, d, meta, time, bg, minHeight = 190, className }: TintCard & { minHeight?: number; className?: string }) {
  return (
    <div className={cn("flex flex-col justify-between gap-4 rounded-card-sm border border-border p-6 text-ink lg:p-[26px]", className)} style={{ background: bg, minHeight }}>
      <div className="flex flex-col gap-1.5">
        <span className="display text-[22px] leading-[1.05]">{t}</span>
        <span className="text-[14px] leading-[1.5] text-secondary">{d}</span>
      </div>
      <span className="text-[12px] font-semibold text-muted">{meta ?? time}</span>
    </div>
  );
}

/** Header plus a four-up row of MetaTiles (women's screening, men's decades). */
export function MetaTileSection({ eyebrow, accentClass, title, note, items, id }: { eyebrow: string; accentClass: string; title: string; note?: string; items: TintCard[]; id?: string }) {
  return (
    <Section id={id} className="flex flex-col gap-5">
      <SubHeader eyebrow={eyebrow} accentClass={accentClass} title={title} note={note} />
      <div className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s) => (
          <MetaTile key={s.t} {...s} />
        ))}
      </div>
    </Section>
  );
}

/**
 * Tinted closing band for the sub-pages: Fraunces 48 title, 17px line,
 * ink pill CTA and a text link under it. Sits 24px above the teaching strip.
 */
export function TintBand({ tint, title, body, bodyClass, cta, ctaTo, link, linkTo, children }: { tint: string; title: string; body: string; bodyClass: string; cta: string; ctaTo: string; link: string; linkTo: string; children?: ReactNode }) {
  return (
    <Block tone="tint" last style={{ background: tint }} className="grid grid-cols-1 items-center gap-8 p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:gap-10 lg:p-14">
      <div className="flex flex-col gap-3">
        <Display size="sm">{title}</Display>
        <p className={cn("pretty max-w-[620px] text-[16px] leading-[1.5] lg:text-[17px]", bodyClass)}>{body}</p>
        {children}
      </div>
      <div className="flex flex-col items-start gap-2.5 lg:items-end">
        <Button to={ctaTo} size="lg">
          {cta}
        </Button>
        <SmartLink to={linkTo} className={cn("text-[14px] font-semibold", bodyClass)}>
          {link} ›
        </SmartLink>
      </div>
    </Block>
  );
}
