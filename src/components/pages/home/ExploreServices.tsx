import Image from "next/image";
import { divisionList } from "@/content/divisions";
import { Section, SectionHeader, SmartLink, Photo } from "@/components/ui";

/**
 * "Explore our services." Five portrait photo cards on desktop, tinted rows
 * with a 72px thumbnail on mobile (Mobile Home frame).
 */
export function ExploreServices() {
  return (
    <Section className="flex flex-col gap-6 pb-6 pt-12 md:pt-16">
      <SectionHeader title="Explore our services." actionLabel="Not sure where to start?" actionTo="book" />

      <div className="hidden grid-cols-3 gap-card md:grid lg:grid-cols-5">
        {divisionList.map((d) => (
          <div key={d.key} className="flex flex-col gap-3.5">
            <SmartLink to={d.key} className="block transition-opacity hover:opacity-95">
              <Photo src={d.img} alt={d.label} ratio="4/5" radius="card-sm" tint={d.tint} sizes="(max-width: 1024px) 33vw, 240px" />
            </SmartLink>
            <div className="flex flex-1 flex-col gap-1.5 px-1">
              <h3 className="font-display text-[24px] font-medium leading-[1.05] tracking-[-.02em]">{d.label}</h3>
              <span className="text-[13px] leading-[1.45] text-muted">{d.tag}</span>
            </div>
            <div className="flex items-center gap-3 px-1 text-[14px] font-semibold">
              <SmartLink to="book" className="rounded-chip bg-sky px-5 py-[11px] leading-none text-white transition-opacity hover:opacity-90 active:scale-[.98]">
                Book
              </SmartLink>
              <SmartLink to={d.key} className="text-link">
                Learn more ›
              </SmartLink>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-card md:hidden">
        {divisionList.map((d) => (
          <SmartLink key={d.key} to={d.key} className="grid grid-cols-[72px_1fr_auto] items-center gap-3.5 rounded-tile p-2.5 active:scale-[.98]" style={{ background: d.tint }}>
            <span className="relative block h-[72px] w-[72px] overflow-hidden rounded-[14px]">
              <Image src={d.img} alt="" fill sizes="72px" className="object-cover" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-display text-[19px] font-medium tracking-[-.02em]">{d.label}</span>
              <span className="text-[12px] leading-[1.4] text-muted">{d.tag}</span>
            </span>
            <span aria-hidden className="pr-1.5 text-[18px] text-sky">›</span>
          </SmartLink>
        ))}
      </div>
    </Section>
  );
}
