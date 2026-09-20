import Image from "next/image";
import { Block, Display, Eyebrow, Lead, SmartLink } from "@/components/ui";
import { aboutTeaching as t } from "@/content/divisions";

/** About only: the teaching clinic block (sky tint, supervision copy, preceptor cards, placement partner logos). */
export function AboutTeaching() {
  return (
    <Block tone="tint" className="grid grid-cols-1 gap-8 bg-sky-soft p-6 md:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-12 lg:px-12 lg:py-14">
      <div className="flex flex-col gap-[18px]">
        <Eyebrow tone="sky">{t.eyebrow}</Eyebrow>
        <Display size="xs">{t.title}</Display>
        <Lead size="md">{t.p}</Lead>
        <div className="grid grid-cols-1 gap-card pt-2 sm:grid-cols-2">
          {t.cards.map((c) => (
            <div key={c.k} className="flex flex-col gap-1.5 rounded-tile bg-raised p-5">
              <span className="text-[12px] font-semibold text-muted">{c.k}</span>
              <span className="text-[15px] leading-[1.5]">{c.v}</span>
            </div>
          ))}
        </div>
        <SmartLink to="standards" className="text-[14px] font-semibold text-link">
          {t.link} ›
        </SmartLink>
      </div>
      <div className="flex flex-col gap-card">
        <span className="text-[12px] font-semibold text-muted">{t.partnersLabel}</span>
        <div className="grid grid-cols-2 gap-card">
          {t.partners.map((p) => (
            <div key={p.name} className="flex h-[120px] items-center justify-center rounded-tile border border-border bg-raised p-5">
              <div className="relative w-full" style={{ height: p.maxHeight }}>
                <Image src={p.logo} alt={p.name} fill sizes="240px" className="object-contain" />
              </div>
            </div>
          ))}
        </div>
        <span className="text-[14px] leading-[1.5] text-muted">{t.partnersNote}</span>
      </div>
    </Block>
  );
}
