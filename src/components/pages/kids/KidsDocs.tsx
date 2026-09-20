import { Display, Eyebrow, Lead, Section, SmartLink } from "@/components/ui";
import { kidsCopy, kidsDocs } from "@/content/kids";

/** "Two family doctors, one chart": sticky intro left, two physician cards right. */
export function KidsDocs() {
  return (
    <Section id="doctors" className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr] lg:items-start lg:gap-12">
      <div className="flex flex-col gap-3 lg:sticky lg:top-6">
        <Eyebrow tone="sky">{kidsCopy.docs.eyebrow}</Eyebrow>
        <Display size="xs">{kidsCopy.docs.title}</Display>
        <Lead size="base" tone="muted">
          {kidsCopy.docs.body}
        </Lead>
        <SmartLink to="team" className="text-[14px] font-semibold text-link">
          {kidsCopy.docs.link} ›
        </SmartLink>
      </div>
      <div className="grid grid-cols-1 gap-card sm:grid-cols-2">
        {kidsDocs.map((d) => (
          <div key={d.name} className="flex min-h-[300px] flex-col gap-[18px] rounded-card border border-border p-6 text-ink md:p-7" style={{ background: d.bg }}>
            <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-display text-[24px] text-white">
              {d.initial}
            </span>
            <div className="flex flex-col gap-1">
              <span className="display text-[24px] leading-[1.05] lg:text-[26px]">{d.name}</span>
              <span className="text-[13px] font-semibold text-muted">{d.role}</span>
            </div>
            <span className="flex-1 text-[15px] leading-[1.5] text-secondary">{d.p}</span>
            <div className="flex flex-wrap gap-1.5">
              {d.tags.map((t) => (
                <span key={t} className="rounded-chip bg-white/80 px-3 py-1.5 text-[12px] font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
