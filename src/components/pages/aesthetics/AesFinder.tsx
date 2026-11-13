"use client";

import { useEffect, useState } from "react";
import { aesAreas, aesConcerns, aesCopy as c, aesFamilies, aesTreatments, type AesTreatment } from "@/content/aesthetics-menu";
import { ChipRow, Display, Eyebrow, SmartLink } from "@/components/ui";
import { bookFor } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { FemaleFace, MaleFace, type Face } from "./AesFaces";

/** Booking visit per family, so the consult lands with the right clinician. */
const visitFor: Record<AesTreatment["family"], string> = { injectables: "injectables", regenerative: "skin", energy: "laser", plasma: "consult", facials: "skin", skin: "skin" };

/** "60 min", "45 to 75 min" or "Planned at consult", from the clinic's session lengths. */
function visitTime(t: AesTreatment) {
  const mins = (t.sessions ?? []).map((s) => s.mins).filter((m): m is number => typeof m === "number");
  return mins.length ? c.range(Math.min(...mins), Math.max(...mins)) : c.plannedAtConsult;
}

/**
 * "Where would you like to start?": pick an area of the face or a concern, see what is often considered, and
 * read each visit start to finish (consult, the visit, the days after, coming back). A downtime filter answers
 * "I have an event in two weeks". Built from the patient's point of view (design options board, November 2026).
 * A concern can arrive in the URL (?concern=pigment) from the concern cards and the face map.
 */
export function AesFinder() {
  const [mode, setMode] = useState(0);
  const [area, setArea] = useState(2);
  const [con, setCon] = useState(0);
  const [down, setDown] = useState(0);
  const [face, setFace] = useState<Face>("female");
  useEffect(() => {
    const i = aesConcerns.findIndex((x) => x.k === new URLSearchParams(window.location.search).get("concern"));
    if (i >= 0) {
      setMode(1);
      setCon(i);
    }
  }, []);

  const pick = mode === 0 ? aesAreas[area] : null;
  const concern = mode === 1 ? aesConcerns[con] : null;
  const all = pick ? pick.ids.map((id) => aesTreatments.find((t) => t.id === id)).filter((t): t is AesTreatment => !!t) : aesTreatments.filter((t) => concern && t.concerns.includes(concern.k));
  // Downtime chips: 0 any, 1 none, 2 up to a day or two, 3 up to a few days.
  const shown = down ? all.filter((t) => t.downtime <= down - 1) : all;
  const hidden = all.length - shown.length;
  const title = pick ? pick.t : concern?.t ?? "";
  const lead = pick ? pick.d : concern?.d ?? "";

  return (
    <section id="plan" className="flex scroll-mt-24 flex-col gap-8 px-4 pt-10 md:px-content md:pt-16">
      <div className="flex max-w-[760px] flex-col gap-2">
        <Eyebrow>{c.startEyebrow}</Eyebrow>
        <Display size="sm">{c.startTitle}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.startLead}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-12">
        {/* The picker stays in view on a laptop while the results scroll beside it. */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          <ChipRow items={[c.byArea, c.byConcern]} value={mode} onChange={setMode} ariaLabel={c.startTitle} size="sm" controls="aes-results" />
          {mode === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-block bg-lilac-tint px-4 pb-6 pt-5 md:px-6">
              {/* The same drawings as the face map on the aesthetics page, so the two feel like one tool. */}
              <div role="radiogroup" aria-label={c.faceChoice} className="inline-flex rounded-chip bg-white p-1">
                {(["female", "male"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    role="radio"
                    aria-checked={face === f}
                    onClick={() => setFace(f)}
                    className={cn("rounded-chip px-4 py-2 text-[14px] font-semibold motion-safe:transition-colors motion-safe:duration-200", face === f ? "bg-ink text-white" : "text-secondary hover:text-primary")}
                  >
                    {f === "female" ? c.faceFemale : c.faceMale}
                  </button>
                ))}
              </div>
              <div role="group" aria-label={c.areaAria} className="relative aspect-[300/380] w-full max-w-[340px]">
                <svg aria-hidden viewBox="0 0 300 380" className="absolute inset-0 h-full w-full">
                  <g key={face} className="rm-fade">{face === "male" ? <MaleFace /> : <FemaleFace />}</g>
                </svg>
                {aesAreas.map((a, i) => (
                  <button
                    key={a.k}
                    type="button"
                    aria-pressed={area === i}
                    aria-controls="aes-results"
                    onClick={() => setArea(i)}
                    style={{ left: `${a.x}%`, top: `${a.y}%` }}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-chip border px-3 py-1.5 text-[13px] font-semibold shadow-sm motion-safe:transition-colors md:px-3.5 md:py-2 md:text-[14px]",
                      area === i ? "border-ink bg-ink text-white" : "border-lilac-deep/40 bg-white text-ink hover:border-ink",
                    )}
                  >
                    {a.t}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div role="group" aria-label={c.byConcern} className="flex flex-col gap-2">
              {aesConcerns.map((x, i) => {
                const n = aesTreatments.filter((t) => t.concerns.includes(x.k)).length;
                return (
                  <button
                    key={x.k}
                    type="button"
                    aria-pressed={con === i}
                    aria-controls="aes-results"
                    onClick={() => setCon(i)}
                    className={cn(
                      "flex min-h-[52px] items-center justify-between gap-3 rounded-card-sm border px-5 text-left text-[15px] font-semibold motion-safe:transition-colors",
                      con === i ? "border-ink bg-ink text-white" : "border-border bg-card hover:border-ink",
                    )}
                  >
                    <span>{x.t}</span>
                    <span className="text-[13px] opacity-70">{n}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div id="aes-results" aria-live="polite" className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-col gap-2 rounded-block bg-lilac-tint px-6 py-6 md:px-8 md:py-7">
            <span className="text-[13px] font-semibold text-lilac-text">{c.oftenConsidered(shown.length)}</span>
            <h3 className="font-display text-[32px] font-normal leading-[1.05] tracking-[-.02em] md:text-[40px]">{title}</h3>
            <p className="pretty text-[15px] leading-[1.55] text-secondary md:text-[16px]">{lead}</p>
          </div>
          <ChipRow items={[c.downtimeAny, ...c.downtimeChips]} value={down} onChange={setDown} ariaLabel={c.downtimeLabel} size="sm" controls="aes-results" />

          {shown.length ? (
            <ul className="flex flex-col gap-3">
              {shown.map((t) => (
                <li key={t.id} className="rm-fade flex flex-col gap-4 rounded-block border border-border p-5 md:p-7">
                  <div className="flex flex-col gap-1.5">
                    <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-secondary">
                      <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: aesFamilies[t.family].color }} />
                      {t.brand ? `${aesFamilies[t.family].t}, ${t.brand}` : aesFamilies[t.family].t}
                    </span>
                    <h4 className="font-display text-[24px] font-medium leading-[1.1] tracking-[-.02em] md:text-[28px]">{t.name}</h4>
                    <p className="pretty max-w-[640px] text-[15px] leading-[1.55] text-secondary">{t.d}</p>
                  </div>
                  {/* Start to finish: what most people want to know before they book. */}
                  <dl className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {[
                      [c.stepConsult, c.consultValue],
                      [c.stepVisit, visitTime(t)],
                      [c.stepAfter, c.downtimeChips[t.downtime]],
                      [c.stepBack, t.note ?? c.asPlanned],
                    ].map(([k, v], i) => (
                      <div key={k} className={cn("flex flex-col gap-1 rounded-card-sm px-3.5 py-3", i === 0 ? "bg-lilac-tint" : "bg-card")}>
                        <dt className="text-[13px] text-muted">{k}</dt>
                        <dd className="text-[14px] font-semibold leading-[1.35]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <SmartLink to={bookFor("aesthetics", visitFor[t.family])} className="w-fit text-[14px] font-semibold text-link">
                    {c.book}
                    <span className="sr-only"> for {t.name}</span>
                    <span aria-hidden> ›</span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-card-sm bg-raised p-5 text-[15px] text-secondary">{c.noneAtDowntime}</p>
          )}
          {hidden && shown.length ? <p className="text-[14px] text-muted">{c.downtimeHiddenNote(hidden)}</p> : null}
          <p className="pretty text-[14px] leading-[1.55] text-muted">
            {c.whoLine} {c.faceNote}
          </p>
        </div>
      </div>
    </section>
  );
}
