import type { TintCard } from "@/content/types";
import { Display, Eyebrow, Section, SmartLink } from "@/components/ui";

/**
 * "Different doors" strip: header with a right-aligned note, then three
 * tinted 22px cards (Fraunces 26 title, 15px body, ink text link).
 */
export function Compare({ eyebrow, title, note, cards, accent }: { eyebrow: string; title: string; note: string; cards: TintCard[]; accent: string }) {
  return (
    <Section className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="flex flex-col gap-2">
          <Eyebrow tone="inherit" style={{ color: accent }}>
            {eyebrow}
          </Eyebrow>
          <Display size="xs">{title}</Display>
        </div>
        <span className="max-w-[380px] text-[14px] leading-[1.5] text-muted md:text-right">{note}</span>
      </div>
      <div className="grid grid-cols-1 gap-card md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.t} className="flex min-h-[220px] flex-col justify-between gap-[18px] rounded-card-sm p-6 text-ink lg:p-7" style={{ background: c.bg }}>
            <div className="flex flex-col gap-2">
              <span className="display text-[24px] leading-[1.05] tracking-[-.02em] lg:text-[26px]">{c.t}</span>
              <span className="text-[15px] leading-[1.5] text-secondary">{c.d}</span>
            </div>
            {c.link && c.page ? (
              <SmartLink to={c.page} className="text-[14px] font-semibold text-ink">
                {c.link} ›
              </SmartLink>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
