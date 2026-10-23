import type { Metadata } from "next";
import { Display, Eyebrow, Faq, Grid, Section } from "@/components/ui";
import { InfusionBand, InfusionHeader, InfusionSmallPrint, NumberedCards } from "@/components/pages/infusion/InfusionBits";
import { infusionCopy, infusionPages, infusionSteps, whyPhysicianLed } from "@/content/infusion-site";
import { faqItems } from "@/content/faq";
import { tints } from "@/content/divisions";
import { pageMetadata } from "@/lib/seo";

const c = infusionCopy.how;
const meta = infusionPages.find((p) => p.key === "infusionHow");

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("infusionHow", { title: "How infusion therapy works", description: meta?.description });
}

export default function HowItWorksPage() {
  const faq = faqItems.filter((f) => f.category === "Infusion");
  return (
    <>
      <InfusionHeader pageKey="infusionHow" page="How it works" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <Section className="pt-10 md:pt-12">
        <NumberedCards items={infusionSteps} />
      </Section>
      <Section id="screening" className="scroll-mt-6">
        <div className="flex flex-col gap-4 rounded-card bg-sun-soft p-6 text-ink md:p-10">
          <Eyebrow tone="inherit">{c.rightEyebrow}</Eyebrow>
          <Display size="xs" className="max-w-[760px]">
            {c.rightTitle}
          </Display>
          <p className="pretty max-w-[680px] text-[16px] leading-[1.55] text-ink/75">{c.rightP}</p>
        </div>
      </Section>
      <Section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Eyebrow>{c.whyEyebrow}</Eyebrow>
          <Display size="xs">{c.whyTitle}</Display>
          <p className="pretty max-w-[640px] text-[16px] leading-[1.55] text-secondary">{c.whyP}</p>
        </div>
        <Grid cols={4}>
          {whyPhysicianLed.map((w, i) => (
            <div key={w.t} className="flex flex-col gap-2 rounded-card p-6 text-ink" style={{ background: tints[i % tints.length] }}>
              <span className="text-[17px] font-semibold">{w.t}</span>
              <span className="text-[14px] leading-[1.5] text-ink-2">{w.d}</span>
            </div>
          ))}
        </Grid>
      </Section>
      <Faq items={faq} />
      <InfusionSmallPrint />
      <InfusionBand />
    </>
  );
}
