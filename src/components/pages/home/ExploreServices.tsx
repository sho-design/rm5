import Image from "next/image";
import { divisionList } from "@/content/divisions";
import { images } from "@/content/images";

/** The hero slides already use the division photos, so these cards use the other set (it showed each photo twice). */
const cardImg = (k: string) => (images.location as Record<string, string>)[k] ?? "";
import { Section, SectionHeader, SmartLink, Photo } from "@/components/ui";
import { buttonClass } from "@/components/ui/Button";
import { bookFor } from "@/lib/routes";

/**
 * "Explore our services." Five portrait photo cards on desktop, tinted rows
 * with a 72px thumbnail on mobile (Mobile Home frame).
 */
export function ExploreServices() {
  return (
    <Section className="flex flex-col gap-6 pb-6 pt-12 md:pt-16">
      <SectionHeader title="Explore our services." actionLabel="Not sure where to start?" actionTo="#start-here" />

      <div className="hidden grid-cols-3 gap-card md:grid lg:grid-cols-5">
        {divisionList.map((d) => (
          <div key={d.key} className="flex flex-col gap-3.5">
            {/* The photo repeats the card's own link, so it is hidden from keyboard and screen readers. */}
            <SmartLink to={d.key} tabIndex={-1} aria-hidden className="block transition-opacity hover:opacity-95">
              <Photo src={cardImg(d.key) || d.img} alt={d.label} ratio="4/5" radius="card-sm" tint={d.tint} sizes="(max-width: 1024px) 75vw, 600px" />
            </SmartLink>
            <div className="flex flex-1 flex-col gap-1.5 px-1">
              <h3 className="font-display text-[24px] font-medium leading-[1.05] tracking-[-.02em]">{d.label}</h3>
              <span className="text-[13px] leading-[1.45] text-muted">{d.tag}</span>
            </div>
            <div className="flex items-center gap-3 px-1 text-[14px] font-semibold">
              <SmartLink to={bookFor(d.key)} className={buttonClass("secondary", "sm")}>
                Book<span className="sr-only"> {d.label}</span>
              </SmartLink>
              <SmartLink to={d.key} className="text-link">
                Learn more<span className="sr-only"> about {d.label}</span> ›
              </SmartLink>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-card md:hidden">
        {divisionList.map((d) => (
          <SmartLink key={d.key} to={d.key} className="grid grid-cols-[72px_1fr_auto] items-center gap-3.5 rounded-tile p-2.5 active:scale-[.98]" style={{ background: d.tint }}>
            <span className="relative block h-[72px] w-[72px] overflow-hidden rounded-[14px]">
              <Image src={cardImg(d.key) || d.img} alt="" fill sizes="160px" quality={85} className="object-cover" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-display text-[19px] font-medium tracking-[-.02em]">{d.label}</span>
              <span className="text-[13px] leading-[1.4] text-muted">{d.tag}</span>
            </span>
            <span aria-hidden className="pr-1.5 text-[18px] text-link">›</span>
          </SmartLink>
        ))}
      </div>
    </Section>
  );
}
