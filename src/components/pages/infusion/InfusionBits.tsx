import type { ReactNode } from "react";
import {
  Button,
  CtaBand,
  Display,
  Eyebrow,
  Lead,
  Section,
  SmartLink,
} from "@/components/ui";
import { divisions } from "@/content/divisions";
import { dripFamilies, infusionCopy, type Drip } from "@/content/infusion-site";
import { bookFor, dripRoute, href, type PageKey } from "@/lib/routes";
import { breadcrumbs } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { cn } from "@/lib/cn";

/** Header for the infusion pages: breadcrumb, eyebrow, Fraunces title, lead and a consult CTA. */
export function InfusionHeader({
  pageKey,
  page,
  eyebrow,
  title,
  lead,
  action,
}: {
  pageKey: PageKey;
  page: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  action?: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          [divisions.infusion.label, href("infusion")],
          [page, href(pageKey)],
        ])}
      />
      <header className="flex flex-col gap-5 px-4 pt-8 md:flex-row md:items-end md:justify-between md:gap-10 md:px-content md:pt-16">
        <div className="flex max-w-[860px] flex-col gap-4">
          <span className="eyebrow text-[color:var(--div-infusion-accent)]">
            <SmartLink to="infusion">{divisions.infusion.label}</SmartLink> ›{" "}
            {page}
          </span>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <Display as="h1" size="lg">
            {title}
          </Display>
          {lead ? <Lead>{lead}</Lead> : null}
        </div>
        {action ?? (
          <Button to={bookFor("infusion")}>{infusionCopy.band.cta}</Button>
        )}
      </header>
    </>
  );
}

/** Numbered cards (01, 02, 03...) used for steps and pricing principles. */
export function NumberedCards({
  items,
  className,
}: {
  items: { n: string; t: string; d: string }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-card md:grid-cols-2",
        items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
        className,
      )}
    >
      {items.map((s) => (
        <div
          key={s.n}
          className="flex flex-col gap-4 rounded-card border border-border bg-card p-6 md:p-7"
        >
          <span className="font-display text-[34px] leading-none text-[color:var(--div-infusion-accent)]">
            {s.n}
          </span>
          <span className="text-[18px] font-semibold tracking-[-.01em]">
            {s.t}
          </span>
          <span className="pretty text-[15px] leading-[1.5] text-secondary">
            {s.d}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Evidence label chip: Established, Supported, Emerging or Supervised. */
export function EvidenceChip({
  ev,
  className,
}: {
  ev: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-chip border border-border bg-raised px-2.5 py-1 text-[11px] font-semibold",
        className,
      )}
    >
      {ev}
    </span>
  );
}

/** One signature drip: family dot and label, evidence chip, name, line. Links to its page. */
export function DripCard({ drip }: { drip: Drip }) {
  return (
    <SmartLink
      to={dripRoute(drip.slug)}
      className="group flex min-h-[200px] flex-col gap-4 rounded-card border border-border bg-raised p-6 transition-colors hover:border-sky"
    >
      <span className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[12px] font-semibold text-muted">
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: dripFamilies[drip.f] }}
          />
          {drip.f}
        </span>
        <EvidenceChip ev={drip.ev} />
      </span>
      <span className="display-tight text-[26px] leading-[1.1]">{drip.t}</span>
      <span className="pretty flex-1 text-[15px] leading-[1.5] text-secondary">
        {drip.d}
      </span>
      <span className="text-[14px] font-semibold text-link">{drip.t} ›</span>
    </SmartLink>
  );
}

/** The Injection Bar grid. */
export function ShotGrid({ shots }: { shots: { t: string; d: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5">
      {shots.map((s) => (
        <div
          key={s.t}
          className="flex flex-col gap-1 rounded-tile border border-border bg-card px-5 py-4"
        >
          <span className="text-[16px] font-semibold">{s.t}</span>
          <span className="text-[13px] text-muted">{s.d}</span>
        </div>
      ))}
    </div>
  );
}

/** Infusion closing band: consult CTA plus "Is this right for me?". */
export function InfusionBand({
  title = infusionCopy.band.title,
  sub = infusionCopy.band.sub,
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <CtaBand
      title={title}
      sub={sub}
      cta={infusionCopy.band.cta}
      ctaTo={bookFor("infusion")}
      cta2={infusionCopy.band.cta2}
      cta2To="infusionHow"
    />
  );
}

/** Infusion small print, above the closing band on every infusion page. */
export function InfusionSmallPrint({ extra }: { extra?: string }) {
  return (
    <Section tight>
      <p className="pretty max-w-[820px] text-[13px] leading-[1.55] text-muted">
        {extra ? `${extra} ` : ""}
        {infusionCopy.smallPrint}
      </p>
    </Section>
  );
}
