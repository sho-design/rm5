import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Display, Section, SmartLink } from "@/components/ui";
import { standardsList, standardsPage } from "@/content/about";
import { StandardsList } from "@/components/pages/standards/StandardsList";
import { StandardsColleges } from "@/components/pages/standards/StandardsColleges";
import { StandardsBand } from "@/components/pages/standards/StandardsBand";
import { PhotoSteps } from "@/components/pages/aesthetics/extra/photos/PhotoSteps";
import { photosSection } from "@/content/aes-photos";

const baseMetadata: Metadata = {
  title: "Standards of care",
  description: standardsPage.lead,
};

export async function generateMetadata() {
  return pageMetadata("standards", baseMetadata);
}

export default function StandardsPage() {
  return (
    <>
      <header className="flex max-w-[820px] flex-col gap-4 px-4 pt-10 md:px-content md:pt-16">
        <span className="eyebrow text-link">
          <SmartLink to="about">About</SmartLink> › {standardsPage.crumb}
        </span>
        <Display as="h1" size="lg">
          {standardsPage.title}
        </Display>
        <p className="pretty text-[16px] leading-[1.55] text-muted lg:text-[17px]">{standardsPage.lead}</p>
      </header>
      <StandardsList items={standardsList} />
      {/* Aesthetics photos (was the "Before and after" page until Nov 2026): how they are taken and kept. */}
      <div id="photos" className="scroll-mt-24">
        <Section className="flex max-w-[820px] flex-col gap-3">
          <Display size="xs">{photosSection.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">{photosSection.lead}</p>
        </Section>
        <PhotoSteps />
      </div>
      <StandardsColleges />
      <StandardsBand />
    </>
  );
}
