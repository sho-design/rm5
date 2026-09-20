import type { Metadata } from "next";
import { teamFilters, teamPage } from "@/content/team";
import { getTeam } from "@/lib/cms";
import { TeamIntro } from "@/components/pages/team/TeamIntro";
import { TeamGrid } from "@/components/pages/team/TeamGrid";
import { SmallBand } from "@/components/pages/notes/NotesBand";

export const metadata: Metadata = {
  title: "Our team",
  description: teamPage.lead,
};

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
