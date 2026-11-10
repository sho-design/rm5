import type { Metadata } from "next";
import { Display, Eyebrow, Photo, Section } from "@/components/ui";
import { ViFacts } from "@/components/vi/ViBits";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { viChrome, viContact as c } from "@/content/vi";
import { external, routes, viRoutes } from "@/lib/routes";
import { langAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: `${site.url}${viRoutes.contact}`, languages: langAlternates(routes.contact, viRoutes.contact) },
};

const tile = "flex flex-col gap-1.5 rounded-card-sm p-5 md:p-6";

/** Contact in Vietnamese. No form here: the phone is the Vietnamese route, and email carries no health details. */
export default function ViContactPage() {
  return (
    <>
      <header className="flex max-w-[820px] flex-col gap-4 px-4 pt-8 md:px-content md:pt-16">
        <Eyebrow tone="sky">{c.eyebrow}</Eyebrow>
        <Display as="h1" size="lg">
          {c.h1}
        </Display>
        <p className="pretty text-[17px] leading-[1.55] text-secondary">{c.lead}</p>
      </header>

      <div className="grid grid-cols-1 gap-2 px-4 pt-6 sm:grid-cols-3 md:px-content md:pt-10 lg:gap-3">
        <a href={site.phoneHref} className={`${tile} bg-inverse text-on-inverse hover:opacity-95`}>
          <span className="text-[12px] text-white/60">{viChrome.phoneLabel}</span>
          <span className="whitespace-nowrap font-display text-[24px] tracking-[-.02em] md:text-[28px]">{site.phone}</span>
          <span className="text-[13px] text-white/70">{c.callSub}</span>
        </a>
        <a href={`mailto:${site.email}`} className={`${tile} bg-sky-soft hover:opacity-95`}>
          <span className="text-[12px] text-muted">{viChrome.emailLabel}</span>
          <span className="break-all text-[17px] font-semibold">{site.email}</span>
          <span className="text-[13px] text-secondary">{c.emailSub}</span>
        </a>
        <div className={`${tile} bg-raised`}>
          <span className="text-[12px] text-muted">{viChrome.faxLabel}</span>
          <span className="font-display text-[24px] tracking-[-.02em] md:text-[28px]">{site.fax}</span>
          <span className="text-[13px] text-secondary">{c.faxSub}</span>
        </div>
      </div>

      <Section className="grid grid-cols-1 gap-block lg:grid-cols-2">
        <div className="flex flex-col gap-card">
          <div className="flex flex-col gap-2 rounded-card bg-sage-tint p-6 md:p-8">
            <span className="text-[17px] font-semibold">{c.visitTitle}</span>
            <span className="text-[15px]">{viChrome.address}</span>
            <span className="text-[14px] text-secondary">{c.visitNote}</span>
            <a href={external.thornhillMapsShort} target="_blank" rel="noopener" className="pt-1 text-[15px] font-semibold text-link">
              {viChrome.directions}
            </a>
          </div>
          <div id="gio" className="scroll-mt-32">
            <ViFacts title={viChrome.hoursTitle} rows={viChrome.hours.map(([k, v]) => ({ k, v }))} />
          </div>
          <div className="flex flex-col gap-2 rounded-card border border-border p-6">
            <span className="text-[15px] font-semibold">{c.mapleTitle}</span>
            <span className="text-[14px] text-secondary">{c.maple}</span>
          </div>
        </div>
        <div className="flex flex-col gap-card">
          <Photo src={images.division.about} alt="" className="min-h-[280px] flex-1" />
          <div role="note" className="flex flex-col gap-2 rounded-card bg-sun-tint p-6">
            <span className="text-[17px] font-semibold">{c.emergencyTitle}</span>
            <span className="pretty text-[15px] leading-[1.55]">{c.emergency}</span>
          </div>
        </div>
      </Section>
    </>
  );
}
