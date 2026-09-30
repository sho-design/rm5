import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Display, SmartLink } from "@/components/ui";
import { standardsList, standardsPage } from "@/content/about";
import { StandardsList } from "@/components/pages/standards/StandardsList";
import { StandardsColleges } from "@/components/pages/standards/StandardsColleges";
import { StandardsBand } from "@/components/pages/standards/StandardsBand";

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
      <StandardsColleges />
      <StandardsBand />
    </>
  );
}
