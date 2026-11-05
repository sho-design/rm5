import type { ReactNode } from "react";
import { Display, Section, SmartLink } from "@/components/ui";
import { pricingPrinciples, pricingVisual as v } from "@/content/infusion-site";
import { cn } from "@/lib/cn";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
/** Line icons for the four pricing principles, in order. */
const icons: ReactNode[] = [
  <svg key="a" viewBox="0 0 24 24" {...stroke}><path d="M4 5h16v10H9l-5 4z" /><path d="M8 9h8M8 12h5" /></svg>,
  <svg key="b" viewBox="0 0 24 24" {...stroke}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6M9 16h3" /></svg>,
  <svg key="c" viewBox="0 0 24 24" {...stroke}><path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z" /></svg>,
  <svg key="d" viewBox="0 0 24 24" {...stroke}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h4" /></svg>,
];
const tints = ["bg-sky-soft", "bg-sun-tint", "bg-terracotta-tint", "bg-sage-tint"];

/** The four pricing principles as icon cards. */
export function PricingPrinciples() {
  return (
    <div className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-4">
      {pricingPrinciples.map((p, i) => (
        <div key={p.n} className="flex flex-col gap-3 rounded-card-sm border border-border bg-card p-6">
          <span className={cn("flex h-12 w-12 items-center justify-center rounded-[14px] text-ink [&>svg]:h-6 [&>svg]:w-6", tints[i])}>{icons[i]}</span>
          <span className="display text-[21px] leading-[1.1] tracking-[-.02em]">{p.t}</span>
          <span className="text-[14px] leading-[1.5] text-muted">{p.d}</span>
        </div>
      ))}
    </div>
  );
}

/** Covered by OHIP vs paid by you, side by side. */
export function CoverSplit() {
  const col = (x: typeof v.covered, tone: string, dot: string) => (
    <div className={cn("flex flex-col gap-4 rounded-card p-6 md:p-8", tone)}>
      <div className="flex items-start justify-between gap-4">
        <span className="text-[15px] font-semibold">{x.t}</span>
        <span className="font-display text-[56px] font-medium leading-[.8] tracking-[-.04em] md:text-[72px]">{x.big}</span>
      </div>
      <ul className="flex flex-col gap-2.5 text-[16px] leading-[1.45]">
        {x.items.map((it) => (
          <li key={it} className="flex items-center gap-3 rounded-row bg-white/70 px-4 py-3">
            <span aria-hidden className={cn("h-2.5 w-2.5 shrink-0 rounded-full", dot)} />
            {it}
          </li>
        ))}
      </ul>
      <span className="text-[13px] text-secondary">{x.note}</span>
    </div>
  );
  return (
    <Section className="flex flex-col gap-5">
      <Display size="xs">{v.coverTitle}</Display>
      <div className="grid grid-cols-1 gap-card md:grid-cols-2">
        {col(v.covered, "bg-sage-tint", "bg-sage-deep")}
        {col(v.selfPay, "bg-sun-tint", "bg-sun-ink")}
      </div>
    </Section>
  );
}

const barTone: Record<string, string> = { sky: "bg-sky", sage: "bg-sage-deep" };

/** Per-visit prices as bars on one scale, so the difference is visible at a glance. */
export function PriceGuide() {
  return (
    <Section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Display size="xs">{v.guideTitle}</Display>
        <span className="text-[15px] text-muted">{v.guideSub}</span>
      </div>
      <div className="flex flex-col gap-5 rounded-card border border-border bg-card p-6 md:p-8">
        {v.guide.map((g, i) => (
          <SmartLink key={g.t} to={g.page} className="group grid grid-cols-1 gap-2 md:grid-cols-[260px_1fr] md:items-center md:gap-6">
            <span className="flex flex-col">
              <span className="text-[16px] font-semibold group-hover:underline group-hover:underline-offset-4">{g.t} ›</span>
              <span className="text-[13px] text-muted">{g.sub}</span>
            </span>
            <span className="flex items-center gap-3">
              <span className="relative h-10 flex-1 overflow-hidden rounded-chip bg-paper">
                <span
                  className={cn("rm-grow-x absolute inset-y-0 left-0 rounded-chip", barTone[g.tone])}
                  style={{ width: `${(g.price / v.scaleMax) * 100}%`, animationDelay: `${i * 90}ms` }}
                />
              </span>
              <span className="w-[72px] shrink-0 text-right font-display text-[26px] font-medium leading-none tracking-[-.02em]">{g.label}</span>
            </span>
          </SmartLink>
        ))}
        <span className="border-t border-border pt-4 text-[13px] text-muted">{v.guideNote}</span>
      </div>
    </Section>
  );
}

/** Decorative twelve-month row for the membership block: a steady, repeating rhythm, no numbers. */
export function RhythmRow() {
  const m = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return (
    <div className="flex flex-col gap-2" aria-hidden>
      <span className="text-[12px] font-semibold text-white/60">{v.rhythmLabel}</span>
      <div className="grid grid-cols-12 gap-1.5">
        {m.map((x, i) => (
          <span key={`${x}${i}`} className="flex flex-col items-center gap-1.5">
            <span className="h-9 w-full rounded-[8px] bg-sun" />
            <span className="text-[11px] text-white/55">{x}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
