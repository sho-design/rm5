"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChipRow, Display, SmartLink } from "@/components/ui";
import { buttonClass } from "@/components/ui/Button";
import { divisionDot, divisionKeyByLabel } from "@/content/divisions";
import { teamCarousel as c } from "@/content/team";
import type { TeamMember } from "@/content/types";
import { bookFor } from "@/lib/routes";
import { cn } from "@/lib/cn";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** What this person does for you: by name for the physicians, otherwise by role and their first service. */
function whatTheyDo(m: TeamMember): string | undefined {
  return m.bio || c.byName[m.name] || c.byRole[`${m.role.split(",")[0]}|${m.divisions[0]}`];
}

/**
 * One tall card. A headshot when the CMS has one; until then a tinted portrait with the initial. The name sits on a
 * pill with a plus; tapping it raises a panel over the lower half with what they do in your visit, their services
 * and languages, and booking for their service. Only one card is open at a time.
 */
function Card({ m, open, onToggle }: { m: TeamMember; open: boolean; onToggle: () => void }) {
  const id = `team-${slug(m.name)}`;
  const key = divisionKeyByLabel[m.divisions[0]] ?? "family";
  const book = c.book[key];
  const does = whatTheyDo(m);
  const accent = divisionDot[m.divisions[0]] ?? "var(--rm-ink)";
  // Tinted portrait (no photo) and closed: ink text on the pastel; otherwise white on the photo or the open sheet.
  const light = !m.photo && !open;
  return (
    <li className="w-[80vw] max-w-[340px] shrink-0 snap-start sm:w-[320px]" aria-label={m.name}>
      <article className="relative aspect-[3/4] overflow-hidden rounded-block bg-ink text-white">
        {m.photo ? (
          <Image src={m.photo} alt="" fill sizes="340px" className={cn("object-cover object-[50%_20%] motion-safe:transition-transform motion-safe:duration-[400ms] motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]", open && "motion-safe:scale-[1.04]")} />
        ) : (
          <div aria-hidden className="absolute inset-0" style={{ background: m.tint }}>
            <span className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-50" style={{ background: accent }} />
            <span className="absolute -bottom-10 -left-12 h-40 w-40 rounded-full bg-white/50" />
            <span className="absolute inset-0 flex items-center justify-center pb-16 font-display text-[150px] font-medium leading-none tracking-[-.04em] text-ink/85">{m.initial}</span>
          </div>
        )}
        {/* Protection so the white name reads on any photo. The tinted portraits keep ink text instead. */}
        {m.photo ? <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" /> : null}

        {m.languages && !open ? (
          <span className="absolute left-4 top-4 rounded-chip bg-white/92 px-3 py-1.5 text-[12px] font-semibold text-ink">Tiếng Việt</span>
        ) : null}

        {/* Bottom sheet: the name button stays on top and opens the details beneath it, over the lower part of the card. */}
        <div className={cn("absolute inset-x-0 bottom-0 z-10 flex max-h-full flex-col motion-safe:transition-colors motion-safe:duration-300", open ? (m.photo ? "bg-ink/90 backdrop-blur-md" : "bg-ink") : "bg-transparent")}>
          <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={id} className="flex shrink-0 items-center gap-3 p-4 text-left">
            <span aria-hidden className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full motion-safe:transition-transform motion-safe:duration-300", light ? "bg-ink text-white" : "bg-white text-ink", open && "rotate-45")}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M8 2v12M2 8h12" />
              </svg>
            </span>
            <span className="flex min-w-0 flex-col">
              <span className={cn("truncate text-[17px] font-semibold", light ? "text-ink" : "drop-shadow-[0_1px_6px_rgba(0,0,0,.35)]")}>{m.name}</span>
              <span className={cn("truncate text-[13px]", light ? "text-ink/70" : "text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,.35)]")}>{m.role}</span>
              <span className="sr-only">{open ? `, ${c.close}` : `, ${c.open} ${m.name}`}</span>
            </span>
          </button>
          <div id={id} hidden={!open} className="flex min-h-0 flex-col gap-2.5 overflow-y-auto px-5 pb-5 motion-safe:animate-[rm-rise_300ms_cubic-bezier(.2,.8,.2,1)_both]">
            {does ? <p className="pretty text-[15px] leading-[1.5]">{does}</p> : null}
            <ul className="flex flex-wrap gap-1.5">
              {m.divisions.map((d) => (
                <li key={d} className="flex items-center gap-1.5 rounded-chip bg-white/12 px-2.5 py-1 text-[12px] font-semibold">
                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: divisionDot[d] ?? "white" }} />
                  {d}
                </li>
              ))}
              {m.preceptorTag ? <li className="rounded-chip bg-sun px-2.5 py-1 text-[12px] font-semibold text-sun-ink">{m.preceptorTag}</li> : null}
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
    </li>
  );
}

/** Service chips over a sideways row of tall team cards, with arrow buttons on larger screens. */
export function TeamCarousel({ team, filters, note }: { team: TeamMember[]; filters: string[]; note: string }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const row = useRef<HTMLUListElement>(null);

  // Menu links such as "Our clinicians" open the page filtered: /about/team?service=Medical%20Aesthetics
  useEffect(() => {
    const want = new URLSearchParams(window.location.search).get("service");
    const n = want ? filters.indexOf(want) : -1;
    if (n > 0) setI(n);
  }, [filters]);

  const label = filters[i];
  const shown = label === "All" ? team : team.filter((m) => m.divisions.includes(label));

  const measure = useCallback(() => {
    const el = row.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);
  useEffect(() => {
    row.current?.scrollTo({ left: 0 });
    setOpen(null);
    measure();
  }, [i, measure]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const page = (dir: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 300), behavior: reduce ? "auto" : "smooth" });
  };

  const arrow = "flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-[0_6px_20px_rgba(16,24,40,.25)] motion-safe:transition-opacity disabled:pointer-events-none disabled:opacity-0";

  return (
    <section className="flex flex-col gap-6 pt-10 md:pt-14">
      <div className="flex flex-col gap-4 px-4 md:px-content">
        <div className="flex flex-col gap-1.5">
          <Display size="sm">{c.title}</Display>
          <p className="text-[16px] text-secondary">{c.lead}</p>
        </div>
        <ChipRow items={filters} value={i} onChange={setI} size="sm" ariaLabel="Filter team by service" />
      </div>
      <div className="relative">
        <ul
          ref={row}
          onScroll={measure}
          aria-label={c.listLabel}
          className="scroll-x flex snap-x snap-mandatory gap-3 scroll-px-4 px-4 pb-2 md:scroll-px-content md:gap-4 md:px-content"
        >
          {shown.map((m) => (
            <Card key={m.name} m={m} open={open === m.name} onToggle={() => setOpen(open === m.name ? null : m.name)} />
          ))}
        </ul>
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-3 md:flex md:px-6">
          <button type="button" aria-label={c.prev} onClick={() => page(-1)} disabled={edge.start} className={cn(arrow, "pointer-events-auto")}>
            <svg aria-hidden viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3 5 8l5 5" />
            </svg>
          </button>
          <button type="button" aria-label={c.next} onClick={() => page(1)} disabled={edge.end} className={cn(arrow, "pointer-events-auto")}>
            <svg aria-hidden viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 3 5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
      <span className="px-4 text-[13px] text-muted md:px-content">{note}</span>
    </section>
  );
}
