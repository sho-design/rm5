import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { healthNotes } from "@/content/notes";
import { getHealthNote, getHealthNotes } from "@/lib/cms";
import { NoteArticle } from "@/components/pages/notes/NoteArticle";
import { NoteAside } from "@/components/pages/notes/NoteAside";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return healthNotes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const note = await getHealthNote(slug);
  if (!note) return { title: "Health note not found" };
  return { title: note.title, description: note.dek };
}

export default async function HealthNotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const note = await getHealthNote(slug);
  if (!note) notFound();
  const related = (await getHealthNotes()).filter((n) => n.slug !== note.slug).slice(0, 3);
  return (
    <div className="grid grid-cols-1 items-start gap-10 px-4 pb-6 pt-8 md:px-content md:pt-14 lg:grid-cols-[minmax(0,720px)_1fr] lg:gap-12">
      <NoteArticle note={note} />
      <NoteAside note={note} related={related} />
    </div>
  );
}
