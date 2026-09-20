import type { Metadata } from "next";
import { CtaBand } from "@/components/ui";
import { storyPage, storyTimeline, storyValues } from "@/content/about";
import { divisions } from "@/content/divisions";
import { StoryHero } from "@/components/pages/story/StoryHero";
import { StoryTimeline } from "@/components/pages/story/StoryTimeline";
import { StoryValues } from "@/components/pages/story/StoryValues";

export const metadata: Metadata = {
  title: "Our story",
  description: storyPage.lead,
};

export default function StoryPage() {
  return (
    <>
      <StoryHero img={divisions.about.img} />
      <StoryTimeline items={storyTimeline} />
      <StoryValues values={storyValues} />
      <CtaBand tone="navy" title={storyPage.band.title} sub={storyPage.band.sub} cta={storyPage.band.cta} ctaTo="team" cta2={storyPage.band.cta2} cta2To="standards" callLine={false} />
    </>
  );
}
