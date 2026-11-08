import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { teamFilters, teamPage } from "@/content/team";
import { getTeam } from "@/lib/cms";
import { TeamIntro } from "@/components/pages/team/TeamIntro";
import { TeamGrid } from "@/components/pages/team/TeamGrid";
import { TeamBand } from "@/components/pages/team/TeamMotion";
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
      {/* Without JavaScript nothing would reveal, so show it all. */}
      <noscript>
        <style>{".rm-reveal{opacity:1!important;transform:none!important}"}</style>
      </noscript>
      {/* Spotlight band: founder and team on one soft band with drifting colour glows. */}
      <TeamBand className="mx-3 mt-3 flex flex-col gap-14 rounded-block bg-raised pb-10 text-primary md:mx-gutter md:mt-6 md:gap-20 md:pb-16">
        <TeamIntro physicians={team.filter((m) => m.role.startsWith("Physician")).length} nurses={team.filter((m) => m.role.includes("Nurse")).length} />
        <TeamGrid team={team} filters={teamFilters.filter((f) => f === "All" || team.some((m) => m.divisions.includes(f)))} note={teamPage.photosNote} />
      </TeamBand>
      <SmallBand title={teamPage.band.title} sub={teamPage.band.sub} cta={teamPage.band.cta} ctaTo="book" />
    </>
  );
}
