import Image from "next/image";
import { SmartLink } from "@/components/ui";
import type { HealthNote } from "@/content/types";
import { divisionDot, divisionKeyByLabel, divisionTint } from "@/content/divisions";
import { noteByline, notesPage } from "@/content/notes";
import { noteRoute } from "@/lib/routes";

/** Author initial disc (Fraunces on ink). */
export function InitialDisc({ initial, size = 26 }: { initial: string; size?: number }) {
  return (
    <span aria-hidden className="flex shrink-0 items-center justify-center rounded-full bg-ink font-display text-white" style={{ width: size, height: size, fontSize: Math.round(size / 2) }}>
      {initial}
    </span>
  );
}

export const noteInitial = (n: HealthNote) => n.author.split(" ").pop()?.charAt(0) ?? "";
export const noteTint = (n: HealthNote) => divisionTint[divisionKeyByLabel[n.division]];

/**
 * Health note card: 16/9 photo with a white division pill, read time, Fraunces
 * title, dek and an author footer. Whole card is a link; border turns sky on hover.
 */
export function NoteCard({ note }: { note: HealthNote }) {
  return (
    <SmartLink to={noteRoute(note.slug)} className="flex flex-col gap-4 overflow-hidden rounded-card-sm border border-border bg-card pb-6 transition-colors hover:border-sky">
      <div className="relative aspect-video overflow-hidden" style={{ background: noteTint(note) }}>
        <Image src={note.img} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <span className="absolute left-3.5 top-3.5 whitespace-nowrap rounded-chip bg-white px-2.5 py-[5px] text-[12px] font-semibold leading-none" style={{ color: divisionDot[note.division] }}>
          {note.division}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-5 md:px-6">
        <span className="text-[12px] font-semibold text-muted">
          {note.readMinutes} {notesPage.readSuffix}
        </span>
        <h3 className="display-tight balance text-[24px] leading-[1.08] tracking-[-.02em] lg:text-[26px]">{note.title}</h3>
        <p className="flex-1 text-[14px] leading-[1.5] text-muted">{note.dek}</p>
        <div className="flex items-center gap-2.5 border-t border-border pt-3.5 text-[12px] text-muted">
          <InitialDisc initial={noteInitial(note)} />
          <span>{noteByline(note)}</span>
          <span className="ml-auto">{note.date}</span>
        </div>
      </div>
    </SmartLink>
  );
}
