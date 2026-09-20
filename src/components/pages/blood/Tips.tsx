import type { TintCard } from "@/content/types";
import { Display, Eyebrow, Section } from "@/components/ui";

/**
 * "Before you come in" strip: header with a right-aligned note, then four
 * tinted 22px cards with a Fraunces 22 title, 14px body and a small meta line.
 */
export function Tips({ eyebrow, title, note, tips, accent }: { eyebrow: string; title: string; note: string; tips: TintCard[]; accent: string }) {
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
      <div className="grid grid-cols-1 gap-card md:grid-cols-2 lg:grid-cols-4">
        {tips.map((s) => (
          <div key={s.t} className="flex min-h-[190px] flex-col justify-between gap-4 rounded-card-sm border border-border p-6 text-ink lg:p-[26px]" style={{ background: s.bg }}>
            <div className="flex flex-col gap-1.5">
              <span className="display text-[22px] leading-[1.05] tracking-[-.02em]">{s.t}</span>
              <span className="text-[14px] leading-[1.5] text-secondary">{s.d}</span>
            </div>
            {s.meta ? <span className="text-[12px] font-semibold text-muted">{s.meta}</span> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
