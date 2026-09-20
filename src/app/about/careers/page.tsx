import type { Metadata } from "next";
import { CtaBand } from "@/components/ui";
import { careersCopy } from "@/content/about";
import { postedAgo } from "@/content/jobs";
import { getJobs } from "@/lib/cms";
import { CareersHero } from "@/components/pages/careers/CareersHero";
import { CareersBento } from "@/components/pages/careers/CareersBento";
import { WhyCards } from "@/components/pages/careers/WhyCards";
import { CareersBoard } from "@/components/pages/careers/CareersBoard";
import { Placements } from "@/components/pages/careers/Placements";

export const metadata: Metadata = {
  title: careersCopy.h1,
  description: careersCopy.lead,
};

/** Refresh the job board hourly so "posted ago" and new roles stay current. */
export const revalidate = 3600;

export default async function CareersPage() {
  const jobs = (await getJobs()).map((j) => ({ ...j, ago: postedAgo(j.postedDate) }));
  return (
    <>
      <CareersHero />
      <CareersBento />
      <WhyCards />
      <CareersBoard jobs={jobs} placements={<Placements />} />
      <CtaBand title={careersCopy.foot.title} sub={careersCopy.foot.sub} cta={careersCopy.foot.cta} ctaTo="#apply" cta2={careersCopy.foot.cta2} cta2To="team" callLine={false} />
    </>
  );
}
