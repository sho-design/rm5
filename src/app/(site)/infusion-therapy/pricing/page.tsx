import type { Metadata } from "next";
import { Button, Display, Eyebrow, Section } from "@/components/ui";
import { InfusionBand, InfusionHeader, InfusionSmallPrint, NumberedCards } from "@/components/pages/infusion/InfusionBits";
import { infusionCopy, memberships, pricingPrinciples } from "@/content/infusion-site";
import { bookFor } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

const c = infusionCopy.pricing;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("infusionPricing", { title: "Infusion pricing and memberships", description: c.lead });
}

export default function InfusionPricingPage() {
  return (
    <>
      <InfusionHeader pageKey="infusionPricing" page="Pricing" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <Section className="pt-10 md:pt-12">
        <NumberedCards items={pricingPrinciples} />
      </Section>
      <Section id="memberships" className="scroll-mt-6">
        <div className="grid grid-cols-1 gap-8 rounded-card bg-inverse p-6 text-on-inverse md:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="sun">{memberships.eyebrow}</Eyebrow>
            <Display size="xs">{memberships.title}</Display>
            <p className="pretty text-[16px] leading-[1.55] text-white/75">{memberships.p}</p>
          </div>
          <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-3 text-[16px] leading-[1.5]">
              {memberships.points.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden className="text-sun">
                    ✓
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <span className="text-[13px] text-white/60">{memberships.note}</span>
          </div>
        </div>
      </Section>
      <Section>
        <div className="flex flex-col items-start justify-between gap-5 rounded-card border border-border bg-card p-6 md:flex-row md:items-center md:p-8">
          <div className="flex flex-col gap-2">
            <Display size="2xs">{c.askTitle}</Display>
            <span className="pretty max-w-[560px] text-[15px] text-secondary">{c.askP}</span>
          </div>
          <Button to={bookFor("infusion")}>{infusionCopy.band.cta}</Button>
        </div>
      </Section>
      <InfusionSmallPrint />
      <InfusionBand />
    </>
  );
}
