import Image from "next/image";
import { SmartLink } from "@/components/ui";
import type { HealthNote } from "@/content/types";
import { divisionDot } from "@/content/divisions";
import { notesPage } from "@/content/notes";
import { noteRoute } from "@/lib/routes";
import { noteTint } from "./NoteCard";

/** Sticky right column: sun CTA card and "More notes" list. */
export function NoteAside({ note, related }: { note: HealthNote; related: HealthNote[] }) {
  const a = notesPage.article;
  return (
    <div className="flex flex-col gap-block lg:sticky lg:top-6">
      <SmartLink to={note.ctaPage} className="flex flex-col gap-3.5 rounded-card-sm bg-sun-soft p-6 text-ink transition-opacity hover:opacity-95 md:p-7">
        <span className="display-tight text-[26px] leading-[1.05] tracking-[-.02em]">{note.ctaTitle}</span>
        <span className="text-[14px] leading-[1.5] text-ink/75">{note.ctaSub}</span>
        <span className="self-start rounded-chip bg-ink px-[22px] py-3 text-[14px] font-semibold leading-none text-white">{a.cta}</span>
      </SmartLink>
      {related.length ? (
        <nav aria-label={a.more} className="flex flex-col gap-3 rounded-card-sm border border-border bg-card p-6">
          <span className="text-[12px] font-semibold text-muted">{a.more}</span>
          <ul className="flex flex-col">
            {related.map((r) => (
              <li key={r.slug} className="border-t border-border">
                <SmartLink to={noteRoute(r.slug)} className="grid grid-cols-[64px_1fr] items-center gap-3 py-2.5 transition-colors hover:text-link">
                  <span className="relative block aspect-square overflow-hidden rounded-field" style={{ background: noteTint(r) }}>
                    <Image src={r.img} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <span className="flex flex-col gap-[3px]">
                    <span className="text-[12px] font-semibold" style={{ color: divisionDot[r.division] }}>
                      {r.division}
                    </span>
                    <span className="display-tight text-[17px] leading-[1.15] tracking-[-.01em] text-primary">{r.title}</span>
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
