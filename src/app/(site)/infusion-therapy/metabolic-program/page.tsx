import type { Metadata } from "next";
import { Display, Section } from "@/components/ui";
import { DripCard, InfusionBand, InfusionHeader, InfusionSmallPrint, NumberedCards, ShotGrid } from "@/components/pages/infusion/InfusionBits";
import { dripBySlug, honestClaims, infusionCopy, infusionPages, infusionSteps, shots } from "@/content/infusion-site";
import { pageMetadata } from "@/lib/seo";

const c = infusionCopy.metabolic;
const meta = infusionPages.find((p) => p.key === "metabolic");

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("metabolic", { title: c.title, description: meta?.description });
}

export default function MetabolicPage() {
  const drip = dripBySlug("metabolic");
  const claim = honestClaims[0];
  const programShots = shots.filter((s) => s.d === "Program add-on");
  return (
    <>
      <InfusionHeader pageKey="metabolic" page="Metabolic program" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      {claim ? (
        <Section className="pt-10 md:pt-12">
          <div className="grid grid-cols-1 gap-6 rounded-card bg-inverse p-6 text-on-inverse md:grid-cols-[1fr_1.4fr] md:p-10">
            <Display size="xs">{c.whatWeSayTitle}</Display>
            <div className="flex flex-col gap-3">
              <span className="text-[15px] text-white/60 line-through decoration-white/40">{claim.p}</span>
              <span className="pretty text-[18px] leading-[1.5]">{claim.s}</span>
            </div>
          </div>
        </Section>
      ) : null}
      <Section className="flex flex-col gap-5">
        <Display size="xs">{c.partsTitle}</Display>
        <div className="grid grid-cols-1 gap-card lg:grid-cols-[1fr_2fr] lg:items-start">
          {drip ? <DripCard drip={drip} /> : null}
          <ShotGrid shots={programShots} />
        </div>
      </Section>
      <Section className="flex flex-col gap-6">
        <NumberedCards items={infusionSteps} />
      </Section>
      <InfusionSmallPrint />
      <InfusionBand />
    </>
  );
}
