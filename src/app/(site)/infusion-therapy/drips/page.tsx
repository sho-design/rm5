import type { Metadata } from "next";
import { Button, Display, Section } from "@/components/ui";
import { DripBrowser } from "@/components/pages/infusion/DripBrowser";
import { InfusionBand, InfusionHeader, InfusionSmallPrint, ShotGrid } from "@/components/pages/infusion/InfusionBits";
import { infusionCopy, shots, signatureDrips } from "@/content/infusion-site";
import { bookFor } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

const c = infusionCopy.drips;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("drips", { title: "Drips and shots", description: c.lead });
}

export default function DripsPage() {
  return (
    <>
      <InfusionHeader pageKey="drips" page="Drips" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <Section first className="pt-10 md:pt-12">
        <DripBrowser drips={signatureDrips} />
      </Section>
      <Section id="injection-bar" className="flex flex-col gap-5 scroll-mt-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <Display size="xs">{c.shotsTitle}</Display>
          <span className="text-[14px] text-muted">{c.shotsSub}</span>
        </div>
        <ShotGrid shots={shots} />
      </Section>
      <Section>
        <div className="flex flex-col items-start justify-between gap-5 rounded-card bg-sun-soft p-6 md:flex-row md:items-center md:p-8">
          <div className="flex flex-col gap-2">
            <Display size="2xs">{c.buildTitle}</Display>
            <span className="text-[15px] text-ink/75">{c.buildSub}</span>
          </div>
          <Button to={bookFor("infusion")}>{c.buildCta}</Button>
        </div>
      </Section>
      <InfusionSmallPrint extra={infusionCopy.wellnessNote} />
      <InfusionBand />
    </>
  );
}
