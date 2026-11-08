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
      {/* Navy spotlight: founder and team on one dark band, so pastel cards and headshots stand out. */}
      <div className="mx-3 mt-3 flex flex-col gap-12 overflow-hidden rounded-block bg-ink pb-10 text-white md:mx-gutter md:mt-6 md:gap-16 md:pb-14">
        <TeamIntro />
        <TeamGrid team={team} filters={teamFilters.filter((f) => f === "All" || team.some((m) => m.divisions.includes(f)))} note={teamPage.photosNote} />
      </div>
      <SmallBand title={teamPage.band.title} sub={teamPage.band.sub} cta={teamPage.band.cta} ctaTo="book" />
    </>
  );
}
