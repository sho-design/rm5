import Image from "next/image";
import { Display, SmartLink } from "@/components/ui";
import type { HealthNote } from "@/content/types";
import { divisionDot } from "@/content/divisions";
import { noteByline, notesPage } from "@/content/notes";
import { InitialDisc, noteInitial, noteTint } from "./NoteCard";

/**
 * Article column (max 720px): back link, 2:1 hero, division label, Fraunces
 * 56 title, 19px dek, byline row, 17px body at 1.65 leading, disclaimer.
 */
export function NoteArticle({ note }: { note: HealthNote }) {
  const a = notesPage.article;
  return (
    <article className="flex min-w-0 flex-col gap-6 md:gap-7">
      <SmartLink to="notes" className="text-[13px] font-semibold text-link">
        ‹ {a.back}
      </SmartLink>
      <div className="relative aspect-[2/1] overflow-hidden rounded-card" style={{ background: noteTint(note) }}>
        <Image src={note.img} alt="" fill priority sizes="(max-width: 1024px) 100vw, 720px" className="object-cover" />
      </div>
      <header className="flex flex-col gap-4">
        <span className="eyebrow" style={{ color: divisionDot[note.division] }}>
          {note.division}
        </span>
        <Display as="h1" size="md">
          {note.title}
        </Display>
        <p className="pretty text-[17px] leading-[1.5] text-muted lg:text-[19px]">{note.dek}</p>
      </header>
      <div className="flex items-center gap-3 border-y border-border py-3.5 text-[13px] text-muted">
        <InitialDisc initial={noteInitial(note)} size={34} />
        <span className="flex min-w-0 flex-col">
          <span className="font-semibold text-primary">{noteByline(note)}</span>
          <span>
            {a.reviewed}, {note.date}
          </span>
        </span>
        <span className="ml-auto shrink-0">
          {note.readMinutes} {notesPage.readSuffix}
        </span>
      </div>
      <div className="flex flex-col gap-[22px] text-[17px] leading-[1.65] text-primary">
        {note.body.map((b, i) =>
          b.type === "h" ? (
            <h2 key={i} className="display-tight -mb-1.5 mt-3 text-[26px] leading-[1.1] tracking-[-.02em] lg:text-[28px]">
              {b.text}
            </h2>
          ) : (
            <p key={i} className="pretty">
              {b.text}
            </p>
          ),
        )}
      </div>
      <aside className="rounded-tile border border-border bg-card px-6 py-5 text-[14px] leading-[1.5] text-muted">{a.disclaimer}</aside>
    </article>
  );
}
