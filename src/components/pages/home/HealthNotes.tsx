import Image from "next/image";
import type { HealthNote } from "@/content/types";
import { divisionDot, divisionKeyByLabel, divisions } from "@/content/divisions";
import { noteByline } from "@/content/notes";
import { noteRoute } from "@/lib/routes";
import { Section, SectionHeader, SmartLink } from "@/components/ui";

/** Three latest health notes: 16/9 photo, division pill, title, dek, byline. */
export function HealthNotes({ notes }: { notes: HealthNote[] }) {
  return (
    <Section tight className="flex flex-col gap-6">
      <SectionHeader title="Health notes." sub="Short, plain-language notes written and reviewed by our physicians." actionLabel="All notes" actionTo="notes" />
      <div className="grid grid-cols-1 gap-card md:grid-cols-2 lg:grid-cols-3">
        {notes.map((n) => {
          const key = divisionKeyByLabel[n.division];
          const initial = n.author.split(" ").pop()?.[0] ?? "";
          return (
            <SmartLink key={n.slug} to={noteRoute(n.slug)} className="flex flex-col gap-4 overflow-hidden rounded-card-sm border border-border bg-card pb-6 transition-colors hover:border-sky">
              <div className="relative aspect-video overflow-hidden" style={{ background: divisions[key].tint }}>
                <Image src={n.img} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-cover" />
                <span className="absolute left-3.5 top-3.5 whitespace-nowrap rounded-chip bg-white px-2.5 py-[5px] text-[12px] font-semibold leading-none" style={{ color: divisionDot[n.division] }}>
                  {n.division}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 px-6">
                <span className="text-[12px] font-semibold text-muted">{n.readMinutes} min read</span>
                <h3 className="balance font-display text-[26px] font-medium leading-[1.08] tracking-[-.02em]">{n.title}</h3>
                <span className="flex-1 text-[14px] leading-[1.5] text-muted">{n.dek}</span>
                <div className="flex items-center gap-2.5 border-t border-border pt-3.5 text-[12px] text-muted">
                  <span aria-hidden className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-ink font-display text-[13px] text-white">
                    {initial}
                  </span>
                  <span>{noteByline(n)}</span>
                  <span className="ml-auto">{n.date}</span>
                </div>
              </div>
            </SmartLink>
          );
        })}
      </div>
    </Section>
  );
}
