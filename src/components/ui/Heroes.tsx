import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Display, Eyebrow, Lead } from "./Text";
import { Button } from "./Button";
import { Photo, PhotoPill } from "./Photo";
import { SmartLink } from "./SmartLink";

/**
 * Sub-page hero: two-column block 24px from the edge. Tinted division card
 * left (Fraunces 76 H1, 19 lead, CTA row, small coverage line) and a
 * 28px-radius photo right with white pill captions bottom-left.
 * Breadcrumb eyebrow "Division › Page" in the division accent.
 */
export function SubPageHero({
  crumb,
  crumbTo,
  page,
  title,
  lead,
  cta,
  ctaTo = "book",
  cta2,
  cta2To,
  coverage,
  tint,
  accent,
  img,
  imgAlt,
  pills = [],
  children,
}: {
  crumb: string;
  crumbTo: string;
  page: string;
  title: ReactNode;
  lead: string;
  cta: string;
  ctaTo?: string;
  cta2?: string;
  cta2To?: string;
  coverage?: string;
  tint: string;
  accent: string;
  img: string;
  imgAlt: string;
  pills?: string[];
  children?: ReactNode;
}) {
  return (
    <section className="mx-3 mt-3 grid grid-cols-1 gap-block md:mx-gutter md:mt-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="flex flex-col justify-between gap-8 rounded-block p-6 md:p-10 lg:p-12" style={{ background: tint }}>
        <div className="flex flex-col gap-5">
          <span className="eyebrow" style={{ color: accent }}>
            <SmartLink to={crumbTo}>{crumb}</SmartLink> › {page}
          </span>
          <Display as="h1" size="xl">
            {title}
          </Display>
          <Lead>{lead}</Lead>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <Button to={ctaTo}>{cta}</Button>
            {cta2 && cta2To ? (
              <Button to={cta2To} variant="outline">
                {cta2}
              </Button>
            ) : null}
          </div>
          {coverage ? <span className="text-[13px] text-muted">{coverage}</span> : null}
          {children}
        </div>
      </div>
      <Photo src={img} alt={imgAlt} radius="block" className="min-h-[320px] lg:min-h-[520px]" priority sizes="(max-width: 1024px) 100vw, 45vw">
        {pills.length ? (
          <div className="absolute bottom-5 left-5 flex flex-wrap gap-1.5">
            {pills.map((p) => (
              <PhotoPill key={p}>{p}</PhotoPill>
            ))}
          </div>
        ) : null}
      </Photo>
    </section>
  );
}

/**
 * Division hero: photo block with protection gradient, sunshine eyebrow,
 * Fraunces 84 headline, lead, up to two CTAs (white primary, white-outline
 * secondary) and an optional 13px helper line under them.
 */
export function DivisionHero({
  img,
  imgAlt,
  eyebrow,
  title,
  lead,
  cta,
  ctaTo = "book",
  cta2,
  cta2To,
  helper,
  children,
  minHeight = 620,
}: {
  img: string;
  imgAlt: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  cta?: string;
  ctaTo?: string;
  cta2?: string;
  cta2To?: string;
  helper?: ReactNode;
  children?: ReactNode;
  minHeight?: number;
}) {
  return (
    <section className="relative mx-3 mt-3 flex items-end overflow-hidden rounded-block bg-ink-2 md:mx-gutter md:mt-6" style={{ minHeight }}>
      <Photo src={img} alt={imgAlt} radius="none" protect className="absolute inset-0" priority sizes="100vw" />
      <div className="relative flex w-full flex-col gap-5 p-6 text-white md:p-10 lg:p-12">
        {eyebrow ? <Eyebrow tone="sun">{eyebrow}</Eyebrow> : null}
        <Display as="h1" size="hero" className="max-w-[900px]">
          {title}
        </Display>
        {lead ? <p className="pretty max-w-[680px] text-[16px] leading-[1.5] text-white/85 lg:text-[19px]">{lead}</p> : null}
        {cta ? (
          <div className="flex flex-wrap gap-2.5 pt-1">
            <Button to={ctaTo} variant="inverse">
              {cta}
            </Button>
            {cta2 && cta2To ? (
              <Button to={cta2To} variant="outline-inverse">
                {cta2}
              </Button>
            ) : null}
          </div>
        ) : null}
        {helper ? <span className="text-[13px] text-white/80">{helper}</span> : null}
        {children}
      </div>
    </section>
  );
}

/** Simple page header for text pages (About sub-pages, legal, notes index). */
export function PageHeader({ eyebrow, title, lead, action, className, size = "lg" }: { eyebrow?: string; title: ReactNode; lead?: string; action?: ReactNode; className?: string; size?: "lg" | "md" }) {
  return (
    <header className={cn("flex flex-col gap-5 px-4 pt-10 md:flex-row md:items-end md:justify-between md:px-content md:pt-16", className)}>
      <div className="flex max-w-[820px] flex-col gap-4">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Display as="h1" size={size}>
          {title}
        </Display>
        {lead ? <Lead>{lead}</Lead> : null}
      </div>
      {action}
    </header>
  );
}
