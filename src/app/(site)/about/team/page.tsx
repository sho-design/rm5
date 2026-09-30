import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { teamFilters, teamPage } from "@/content/team";
import { getTeam } from "@/lib/cms";
import { TeamIntro } from "@/components/pages/team/TeamIntro";
import { TeamGrid } from "@/components/pages/team/TeamGrid";
import { SmallBand } from "@/components/pages/notes/NotesBand";

const baseMetadata: Metadata = {
  title: "Our team",
  description: teamPage.lead,
};

export async function generateMetadata() {
  return pageMetadata("team", baseMetadata);
}

export default async function TeamPage() {
  const team = await getTeam();
  return (
    <>
      <TeamIntro />
      <TeamGrid team={team} filters={[...teamFilters]} note={teamPage.photosNote} />
      <SmallBand title={teamPage.band.title} sub={teamPage.band.sub} cta={teamPage.band.cta} ctaTo="book" />
    </>
  );
}
