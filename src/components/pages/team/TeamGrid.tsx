"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChipRow, Display, SmartLink } from "@/components/ui";
import { buttonClass } from "@/components/ui/Button";
import { divisionDot, divisionKeyByLabel } from "@/content/divisions";
import { teamCarousel as c } from "@/content/team";
import type { TeamMember } from "@/content/types";
import { bookFor } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Reveal } from "./TeamMotion";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** What this person does for you: by name for the physicians, otherwise by role and their first service. */
function whatTheyDo(m: TeamMember): string | undefined {
  return m.bio || c.byName[m.name] || c.byRole[`${m.role.split(",")[0]}|${m.divisions[0]}`];
}

/**
 * One tall card in the grid. A headshot when the CMS has one; until then a tinted portrait with the initial. The name sits on a
 * pill with a plus; tapping it raises a panel over the lower half with what they do in your visit, their services
 * and languages, and booking for their service. Only one card is open at a time.
 */
function Card({ m, open, onToggle, index }: { m: TeamMember; open: boolean; onToggle: () => void; index: number }) {
  const id = `team-${slug(m.name)}`;
  const key = divisionKeyByLabel[m.divisions[0]] ?? "family";
  const book = c.book[key];
  const does = whatTheyDo(m);
  const accent = divisionDot[m.divisions[0]] ?? "var(--rm-ink)";
  // Tinted portrait (no photo) and closed: ink text on the pastel; otherwise white on the photo or the open sheet.
  const light = !m.photo && !open;
  return (
    // On a phone the grid is two across, so an open card widens to the full row to fit its details.
    <Reveal as="li" delay={(index % 4) * 90} className={cn("group min-w-0", open && "col-span-2 sm:col-span-1")}>
      <article
        aria-label={m.name}
        onKeyDown={(e) => {
          // Escape closes an open card and keeps focus on its name (round 24).
          if (e.key === "Escape" && open) {
            e.preventDefault();
            onToggle();
            e.currentTarget.querySelector("button")?.focus();
          }
        }}
        className="relative flex aspect-[3/4] flex-col justify-end rounded-block rm-ink-surface bg-ink text-white ring-1 ring-ink/5 shadow-[0_8px_24px_rgba(16,24,40,.06)] motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(16,24,40,.16)]">
        {m.photo ? (
          <Image src={m.photo} alt="" fill sizes="(max-width: 640px) 50vw, 320px" className={cn("rounded-block object-cover object-[50%_20%] motion-safe:transition-transform motion-safe:duration-[400ms] motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]", open && "motion-safe:scale-[1.04]")} />
        ) : (
          <div aria-hidden className="absolute inset-0 overflow-hidden rounded-block" style={{ background: m.tint }}>
            <span className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-50 motion-safe:transition-transform motion-safe:duration-[400ms] motion-safe:ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-125 sm:h-56 sm:w-56" style={{ background: accent }} />
            <span className="absolute -bottom-10 -left-12 h-40 w-40 rounded-full bg-white/50" />
            <span className="absolute inset-0 flex items-center justify-center pb-16 font-display text-[88px] font-medium leading-none tracking-[-.04em] text-ink/85 motion-safe:transition-transform motion-safe:duration-[400ms] motion-safe:ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-translate-y-1 group-hover:scale-105 sm:text-[130px] xl:text-[150px]">{m.initial}</span>
          </div>
        )}
        {/* Protection so the white name reads on any photo. The tinted portraits keep ink text instead. */}
        {m.photo ? <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-block bg-gradient-to-t from-black/50 to-transparent" /> : null}

        {m.languages && !open ? (
          <span className="absolute left-3 top-3 rounded-chip bg-white/92 px-2.5 py-1 text-[13px] sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[13px] font-semibold text-ink">Tiếng Việt</span>
        ) : null}

        {/* Bottom sheet: the name button stays on top and opens the details beneath it, over the lower part of the card. */}
        <div className={cn("z-10 flex flex-col rounded-block motion-safe:transition-colors motion-safe:duration-300", open ? cn("relative flex-1", m.photo ? "bg-ink/90 backdrop-blur-md" : "bg-ink") : "absolute inset-x-0 bottom-0 bg-transparent")}>
          <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={id} aria-label={`${m.name}, ${m.role}`} className="flex shrink-0 items-center gap-2.5 rounded-block p-3 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-sun sm:gap-3 sm:p-4">
            <span aria-hidden className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full motion-safe:transition-transform motion-safe:duration-300", light ? "bg-ink text-white" : "bg-white text-ink", open && "rotate-45")}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M8 2v12M2 8h12" />
              </svg>
            </span>
            <span className="flex min-w-0 flex-col">
              <span className={cn("pretty text-[15px] font-semibold leading-[1.2] sm:text-[17px]", light ? "text-ink" : "drop-shadow-[0_1px_6px_rgba(0,0,0,.35)]")}>{m.name}</span>
              <span className={cn("pretty text-[13px] leading-[1.3] sm:text-[13px]", light ? "text-ink/70" : "text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,.35)]")}>{m.role}</span>
            </span>
          </button>
          <div id={id} hidden={!open} className="flex flex-col gap-2.5 px-5 pb-5 motion-safe:animate-[rm-rise_300ms_cubic-bezier(.2,.8,.2,1)_both]">
            {does ? <p className="pretty text-[15px] leading-[1.5]">{does}</p> : null}
            <ul className="flex flex-wrap gap-1.5">
              {m.divisions.map((d) => (
                <li key={d} className="flex items-center gap-1.5 rounded-chip bg-white/12 px-2.5 py-1 text-[13px] font-semibold">
                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: divisionDot[d] ?? "white" }} />
                  {d}
                </li>
              ))}
              {m.preceptorTag ? <li className="rounded-chip bg-sun px-2.5 py-1 text-[13px] font-semibold text-sun-ink">{m.preceptorTag}</li> : null}
            </ul>
            {m.languages ? <span className="text-[13px] text-white/80">{m.languages}</span> : null}
            {book ? (
              <SmartLink to={bookFor(book.service, book.visit)} className={buttonClass("inverse", "md", "mt-1 self-start")}>
                {book.t}
              </SmartLink>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** Service chips over a grid of tall team cards, on the navy band. Each card opens to what that person does for you. */
export function TeamGrid({ team: listed, filters, note }: { team: TeamMember[]; filters: string[]; note: string }) {
  const [i, setI] = useState(0);
  // Physicians stay first, in their set order. Nurses and other staff come in a new random order on each visit,
  // so no one is always last. Shuffled after the page loads, so the server and the browser agree on the first paint.
  const [team, setTeam] = useState(listed);
  useEffect(() => {
    const isDoctor = (m: TeamMember) => m.name.startsWith("Dr. ") || m.role.startsWith("Physician");
    const doctors = listed.filter(isDoctor);
    const rest = listed.filter((m) => !isDoctor(m));
    for (let n = rest.length - 1; n > 0; n--) {
      const r = Math.floor(Math.random() * (n + 1));
      [rest[n], rest[r]] = [rest[r], rest[n]];
    }
    setTeam([...doctors, ...rest]);
  }, [listed]);
  const [open, setOpen] = useState<string | null>(null);

  // Menu links such as "Our clinicians" open the page filtered: /about/team?service=Medical%20Aesthetics
  useEffect(() => {
    const want = new URLSearchParams(window.location.search).get("service");
    const n = want ? filters.indexOf(want) : -1;
    if (n > 0) setI(n);
  }, [filters]);

  const label = filters[i];
  const shown = label === "All" ? team : team.filter((m) => m.divisions.includes(label));

  return (
    <section aria-labelledby="team-title" className="flex flex-col gap-6 border-t border-border px-6 pt-10 md:px-12 md:pt-14 lg:px-16">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Display size="sm" id="team-title">
            {c.title}
          </Display>
          <p className="text-[16px] text-secondary">{c.lead}</p>
        </div>
        <ChipRow
          items={filters}
          value={i}
          onChange={(n) => {
            setI(n);
            setOpen(null);
          }}
          size="sm"
          ariaLabel="Filter team by service"
          controls="team-list"
        />
        <p className="sr-only" aria-live="polite">
          {c.showing(shown.length, label)}
        </p>
      </div>
      <ul id="team-list" aria-label={c.listLabel} className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((m, idx) => (
          <Card key={m.name} index={idx} m={m} open={open === m.name} onToggle={() => setOpen(open === m.name ? null : m.name)} />
        ))}
      </ul>
      <span className="text-[13px] text-muted">{note}</span>
    </section>
  );
}
