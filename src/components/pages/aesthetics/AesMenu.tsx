"use client";

import { useEffect, useState } from "react";
import { aesConcerns, aesCopy as c, aesFamilies, aesTreatments, type AesFamily } from "@/content/aesthetics-menu";
import { ChipRow, Display, Eyebrow, SmartLink } from "@/components/ui";
import { bookFor } from "@/lib/routes";

const families = Object.keys(aesFamilies) as AesFamily[];
/** Booking visit per family, so the consult lands with the right clinician. */
const visitFor: Record<AesFamily, string> = { injectables: "injectables", regenerative: "skin", energy: "laser", plasma: "consult", facials: "skin", skin: "skin" };

/**
 * The full menu, grouped by family. Family and concern chips narrow it; a concern can arrive in the URL
 * (?concern=pigment) from the concern cards. Session lengths come from the clinic; prices are set at the consult.
 */
export function AesMenu() {
  const [fam, setFam] = useState(0);
  const [con, setCon] = useState(0);
  useEffect(() => {
    const want = new URLSearchParams(window.location.search).get("concern");
    const i = aesConcerns.findIndex((x) => x.k === want);
    if (i >= 0) setCon(i + 1);
  }, []);
  const famKey = fam ? families[fam - 1] : null;
  const conKey = con ? aesConcerns[con - 1].k : null;
  const shown = aesTreatments.filter((t) => (!famKey || t.family === famKey) && (!conKey || t.concerns.includes(conKey)));
  const groups = families.map((f) => ({ f, items: shown.filter((t) => t.family === f) })).filter((g) => g.items.length);

  return (
    <section id="menu" className="flex scroll-mt-6 flex-col gap-6 px-4 pt-10 md:px-content md:pt-16">
      <div className="flex flex-col gap-2">
        <Eyebrow>{c.menuEyebrow}</Eyebrow>
        <Display size="sm">{c.menuTitle}</Display>
        <p className="pretty max-w-[760px] text-[16px] leading-[1.55] text-secondary">{c.menuLead}</p>
      </div>
      <div className="flex flex-col gap-2.5">
        <ChipRow items={[c.allFamilies, ...families.map((f) => aesFamilies[f].t)]} value={fam} onChange={setFam} ariaLabel="Filter by family" size="sm" />
        <ChipRow items={[c.anyConcern, ...aesConcerns.map((x) => x.t)]} value={con} onChange={setCon} ariaLabel="Filter by concern" size="sm" />
      </div>

      <div aria-live="polite" className="flex flex-col gap-10">
        {groups.length ? (
          groups.map(({ f, items }) => (
            <div key={f} className="flex flex-col gap-4">
              <div className="flex items-baseline gap-3 border-b border-border pb-3">
                <span aria-hidden className="h-3 w-3 shrink-0 translate-y-[-2px] rounded-full" style={{ background: aesFamilies[f].color }} />
                <h3 className="font-display text-[26px] font-medium leading-none tracking-[-.02em]">{aesFamilies[f].t}</h3>
                <span className="hidden text-[14px] text-muted md:inline">{aesFamilies[f].d}</span>
              </div>
              <div className="grid grid-cols-1 gap-card md:grid-cols-2 lg:grid-cols-3">
                {items.map((t) => (
                  <article key={t.id} className="rm-fade flex flex-col gap-3 rounded-card border border-border bg-card p-5 md:p-6">
                    <span className="flex flex-col gap-1">
                      {t.brand ? <span className="text-[12px] font-semibold uppercase tracking-[.08em] text-muted">{t.brand}</span> : null}
                      <span className="font-display text-[24px] font-medium leading-[1.05] tracking-[-.02em]">{t.name}</span>
                    </span>
                    <p className="pretty text-[15px] leading-[1.5] text-secondary">{t.d}</p>
                    {t.sessions?.length ? (
                      <ul className="flex flex-col divide-y divide-border rounded-card-sm bg-raised px-4 text-[14px]">
                        {t.sessions.map((s) => (
                          <li key={s.t} className="flex items-baseline justify-between gap-3 py-2.5">
                            <span>{s.t}</span>
                            {s.mins ? <span className="shrink-0 font-semibold text-muted">{c.minutes(s.mins)}</span> : null}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {t.note ? <span className="text-[13px] text-muted">{t.note}</span> : null}
                    <SmartLink to={bookFor("aesthetics", visitFor[t.family])} className="mt-auto pt-1 text-[14px] font-semibold text-link">
                      {c.book}
                      <span className="sr-only"> for {t.name}</span> ›
                    </SmartLink>
                  </article>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-card-sm bg-raised p-5 text-[15px] text-secondary">{c.noMatch}</p>
        )}
      </div>
      <p className="pretty max-w-[760px] text-[14px] leading-[1.55] text-muted">{c.babyNote}</p>
    </section>
  );
}
