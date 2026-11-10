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
    const q = new URLSearchParams(window.location.search);
    const i = aesConcerns.findIndex((x) => x.k === q.get("concern"));
    if (i >= 0) setCon(i + 1);
    const f = families.indexOf(q.get("family") as AesFamily);
    if (f >= 0) setFam(f + 1);
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
      <ChipRow items={[c.anyConcern, ...aesConcerns.map((x) => x.t)]} value={con} onChange={setCon} ariaLabel="Filter by concern" size="sm" />
      {/* Only the family row stays pinned, so it never covers more than one line of the menu. */}
      <div className="sticky top-16 z-20 -mx-4 border-b border-border bg-page/95 px-4 py-2.5 backdrop-blur md:top-[76px] md:-mx-content md:px-content">
        <ChipRow items={[c.allFamilies, ...families.map((f) => aesFamilies[f].t)]} value={fam} onChange={setFam} ariaLabel="Filter by family" size="sm" />
      </div>

      {/* An editorial menu: each family is a sticky heading beside rows of treatments, so no card sits half empty
          and no row ends on a lone card. One booking link per family instead of one per treatment. */}
      <div aria-live="polite" className="flex flex-col">
        {groups.length ? (
          groups.map(({ f, items }) => (
            <div key={f} className="grid grid-cols-1 gap-x-12 border-t border-border py-8 first:border-t-0 md:py-12 lg:grid-cols-[300px_1fr]">
              <div className="mb-2 flex flex-col gap-3 lg:sticky lg:top-[156px] lg:mb-0 lg:self-start">
                <span aria-hidden className="h-1.5 w-12 rounded-full" style={{ background: aesFamilies[f].color }} />
                <h3 className="font-display text-[30px] font-medium leading-[1.02] tracking-[-.02em] md:text-[36px]">{aesFamilies[f].t}</h3>
                <p className="pretty text-[15px] leading-[1.5] text-secondary">{aesFamilies[f].d}</p>
                <span className="text-[13px] font-semibold text-muted">{c.count(items.length)}</span>
                <SmartLink to={bookFor("aesthetics", visitFor[f])} className="mt-1 w-fit text-[14px] font-semibold text-link">
                  {c.book}
                  <span className="sr-only"> for {aesFamilies[f].t}</span>
                  <span aria-hidden> ›</span>
                </SmartLink>
              </div>
              <ul className="flex flex-col divide-y divide-border">
                {items.map((t) => (
                  <li key={t.id} className="rm-fade grid grid-cols-1 gap-x-10 gap-y-4 py-6 first:pt-2 md:grid-cols-[1fr_minmax(240px,320px)] md:py-7 lg:first:pt-0">
                    <div className="flex flex-col gap-2">
                      {t.brand ? <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-muted">{t.brand}</span> : null}
                      <h4 className="font-display text-[24px] font-medium leading-[1.08] tracking-[-.02em] md:text-[26px]">{t.name}</h4>
                      <p className="pretty max-w-[520px] text-[15px] leading-[1.55] text-secondary">{t.d}</p>
                      {t.note ? <span className="text-[13px] font-semibold text-muted">{t.note}</span> : null}
                    </div>
                    {t.sessions?.length ? (
                      <ul className="flex flex-col gap-2.5 self-start text-[14px] md:pt-1">
                        {t.sessions.map((s) => (
                          <li key={s.t} className="flex items-baseline gap-2">
                            <span className="pretty">{s.t}</span>
                            {s.mins ? (
                              <>
                                <span aria-hidden className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-border-strong" />
                                <span className="shrink-0 font-semibold tabular-nums">{c.minutes(s.mins)}</span>
                              </>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
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
