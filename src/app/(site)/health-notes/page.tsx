import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui";
import { noteFilters, notesPage } from "@/content/notes";
import { getHealthNotes } from "@/lib/cms";
import { NotesGrid } from "@/components/pages/notes/NotesGrid";
import { SmallBand } from "@/components/pages/notes/NotesBand";

const baseMetadata: Metadata = {
  title: notesPage.title.replace(/\.$/, ""),
  description: notesPage.lead,
};

export async function generateMetadata() {
  return pageMetadata("notes", baseMetadata);
}

export default async function HealthNotesPage() {
  const notes = await getHealthNotes();
  return (
    <>
      <PageHeader eyebrow={notesPage.eyebrow} title={notesPage.title} lead={notesPage.lead} />
      <NotesGrid notes={notes} filters={[...noteFilters]} />
      <SmallBand title={notesPage.band.title} sub={notesPage.band.sub} cta={notesPage.band.cta} ctaTo="book" />
    </>
  );
}
