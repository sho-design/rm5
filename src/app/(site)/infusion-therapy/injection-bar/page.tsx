import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { InfusionBand, InfusionHeader, InfusionSmallPrint, NumberedCards, ShotGrid } from "@/components/pages/infusion/InfusionBits";
import { infusionCopy, infusionPages, infusionSteps, shots } from "@/content/infusion-site";
import { pageMetadata } from "@/lib/seo";

const meta = infusionPages.find((p) => p.key === "shots");

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("shots", { title: "The Injection Bar", description: meta?.description });
}

export default function InjectionBarPage() {
  const c = infusionCopy.shots;
  return (
    <>
      <InfusionHeader pageKey="shots" page="The Injection Bar" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <Section className="pt-10 md:pt-12">
        <ShotGrid shots={shots} />
      </Section>
      <Section className="flex flex-col gap-6">
        <NumberedCards items={infusionSteps} />
      </Section>
      <InfusionSmallPrint extra={infusionCopy.wellnessNote} />
      <InfusionBand />
    </>
  );
}
