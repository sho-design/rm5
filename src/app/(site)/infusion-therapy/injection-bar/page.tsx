import type { Metadata } from "next";
import { Section } from "@/components/ui";
import {
  InfusionBand,
  InfusionHeader,
  InfusionSmallPrint,
} from "@/components/pages/infusion/InfusionBits";
import { ShotBar } from "@/components/pages/infusion/ShotBar";
import { ShotExtras } from "@/components/pages/infusion/ShotExtras";
import { ShotOrDrip } from "@/components/pages/infusion/extra/shot/ShotOrDrip";
import { infusionCopy, infusionPages } from "@/content/infusion-site";
import { pageMetadata } from "@/lib/seo";

const meta = infusionPages.find((p) => p.key === "shots");

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("shots", {
    title: "The Injection Bar",
    description: meta?.description,
  });
}

export default function InjectionBarPage() {
  const c = infusionCopy.shots;
  return (
    <>
      <InfusionHeader
        pageKey="shots"
        page="The Injection Bar"
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
      />
      <Section className="pt-10 md:pt-12">
        {/* Every drip page had this line and the shots page had none (public health reviewer, round 22). */}
        <p className="pretty mb-6 max-w-[640px] rounded-tile bg-[color:var(--div-pain)] px-4 py-3 text-[15px] font-semibold leading-[1.5] text-ink">
          {infusionCopy.drip.shotsUnwell}
        </p>
        <ShotBar />
      </Section>
      <Section>
        <ShotOrDrip />
      </Section>
      <Section>
        <ShotExtras />
      </Section>
      <InfusionSmallPrint extra={infusionCopy.wellnessNote} />
      <InfusionBand />
    </>
  );
}
