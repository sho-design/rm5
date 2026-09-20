import type { Metadata } from "next";
import { heroSlides } from "@/content/site";
import { carePathTints, carePaths } from "@/content/home";
import { getAnnouncements, getHealthNotes } from "@/lib/cms";
import { torontoNow } from "@/lib/hours";
import { CtaBand } from "@/components/ui";
import { HeroCarousel } from "@/components/pages/home/HeroCarousel";
import { QuickActions } from "@/components/pages/home/QuickActions";
import { Announcements } from "@/components/pages/home/Announcements";
import { ExploreServices } from "@/components/pages/home/ExploreServices";
import { CarePathways } from "@/components/pages/home/CarePathways";
import { SeasonCalendar } from "@/components/pages/home/SeasonCalendar";
import { FeatureRow } from "@/components/pages/home/FeatureRow";
import { WholeFamily } from "@/components/pages/home/WholeFamily";
import { HealthNotes } from "@/components/pages/home/HealthNotes";

/** Re-render hourly so "This season" and the health calendar follow the Toronto month. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: `${heroSlides[0].h1} ${heroSlides[0].h1em} | Restoration Medical` },
  description: heroSlides[0].p,
};

export default async function HomePage() {
  const [announcements, notes] = await Promise.all([getAnnouncements(), getHealthNotes()]);
  const month = torontoNow().getMonth();

  return (
    <>
      <HeroCarousel slides={heroSlides} />
      <QuickActions />
      <Announcements items={announcements} />
      <ExploreServices />
      <CarePathways paths={carePaths} tints={carePathTints} />
      <SeasonCalendar month={month} />
      <FeatureRow />
      <WholeFamily />
      <HealthNotes notes={notes.slice(0, 3)} />
      <CtaBand title="Care that begins with you." sub="Whatever brings you in, the standard of care is the same. Tell us what you need and we will point you to the right team." cta="Book an appointment" ctaTo="book" callLine={false} />
    </>
  );
}
