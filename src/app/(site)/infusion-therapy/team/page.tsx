import type { Metadata } from "next";
import { Display, Section } from "@/components/ui";
import { InfusionBand, InfusionHeader, InfusionSmallPrint } from "@/components/pages/infusion/InfusionBits";
import { infusionTeam as t } from "@/content/infusion-site";
import { tints } from "@/content/divisions";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("infusionTeam", { title: "Infusion Therapy team", description: t.lead });
}

export default function InfusionTeamPage() {
  const d = t.director;
  return (
    <>
      <InfusionHeader pageKey="infusionTeam" page="Our nurses" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <Section className="pt-10 md:pt-12">
        <div className="grid grid-cols-1 gap-6 rounded-card border border-border bg-card p-6 md:grid-cols-[auto_1fr] md:p-10">
          <span aria-hidden className="flex h-28 w-28 items-center justify-center rounded-full bg-[color:var(--div-infusion)] font-display text-[44px]">
            JN
          </span>
          <div className="flex flex-col gap-3">
            <span className="text-[13px] font-semibold text-muted">{d.role}</span>
            <Display size="xs">{d.name}</Display>
            <span className="text-[15px] font-semibold">{d.title}</span>
            <p className="pretty max-w-[720px] text-[16px] leading-[1.6] text-secondary">{d.bio}</p>
            <ul className="flex flex-wrap gap-1.5 pt-1">
              {d.credentials.map((x) => (
                <li key={x} className="rounded-chip border border-border bg-raised px-3 py-1.5 text-[13px] font-medium">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Display size="xs">{t.chairTitle}</Display>
          <span className="text-[14px] text-muted">{t.chairNote}</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5">
          {t.people.map((p, i) => (
            <div key={p.name} className="flex flex-col gap-3 rounded-card p-5" style={{ background: tints[i % 3] }}>
              <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 font-display text-[22px]">
                {p.name[0]}
              </span>
              <span className="flex flex-col">
                <span className="text-[16px] font-semibold text-ink">{p.name}</span>
                <span className="text-[13px] text-ink-2">{p.role}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>
      <InfusionSmallPrint />
      <InfusionBand title={t.band.title} sub={t.band.sub} />
    </>
  );
}
