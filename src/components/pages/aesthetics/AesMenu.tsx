import { aesCopy as c, aesFamilies, aesTreatments, type AesFamily, type AesTreatment } from "@/content/aesthetics-menu";
import { Display, Eyebrow, SmartLink } from "@/components/ui";
import { bookFor } from "@/lib/routes";

const families = Object.keys(aesFamilies) as AesFamily[];

function Sessions({ t }: { t: AesTreatment }) {
  if (!t.sessions?.length) return null;
  return (
    <ul className="flex flex-col gap-1.5 text-[14px]">
      {t.sessions.map((s) => (
        <li key={s.t} className="flex items-baseline gap-2">
          <span className="pretty">{s.t}</span>
          {s.mins ? (
            <>
              <span aria-hidden className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-ink-3" />
              <span className="shrink-0 font-semibold tabular-nums">{c.minutes(s.mins)}</span>
            </>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function Item({ t }: { t: AesTreatment }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
        <h4 className="text-[18px] font-semibold leading-[1.25]">{t.name}</h4>
        {t.brand ? <span className="text-[13px] font-semibold text-muted">{t.brand}</span> : null}
      </div>
      <p className="pretty text-[14px] leading-[1.5] text-secondary">{t.d}</p>
      {t.note ? <span className="text-[13px] font-semibold text-muted">{t.note}</span> : null}
      <Sessions t={t} />
    </div>
  );
}

/**
 * The full menu, for browsing once you know what you are looking for. On a laptop it is one printed menu sheet
 * (families in two columns, session times on dotted leaders); on a phone each family folds open on tap.
 * Families carry ids (#family-energy) so links from the aesthetics page land on them.
 */
export function AesMenu() {
  const groups = families.map((f) => ({ f, items: aesTreatments.filter((t) => t.family === f) }));
  return (
    <section id="menu" className="flex scroll-mt-24 flex-col gap-6 px-4 pt-14 md:px-content md:pt-20">
      {/* Phone: an accordion, one family at a time. */}
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex flex-col gap-2">
          <Eyebrow>{c.menuEyebrow}</Eyebrow>
          <Display size="sm">{c.menuTitleAll}</Display>
          <p className="pretty text-[15px] leading-[1.55] text-secondary">{c.menuLeadAll}</p>
        </div>
        <div className="flex flex-col border-t border-border">
          {groups.map(({ f, items }) => (
            <details key={f} id={`family-${f}-m`} className="group scroll-mt-24 border-b border-border">
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center gap-3 px-1 [&::-webkit-details-marker]:hidden">
                <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: aesFamilies[f].color }} />
                <span className="flex-1 font-display text-[21px] font-medium">{aesFamilies[f].t}</span>
                <span className="text-[13px] font-semibold text-muted">{items.length}</span>
                <span aria-hidden className="w-4 text-center text-[18px] group-open:hidden">+</span>
                <span aria-hidden className="hidden w-4 text-center text-[18px] group-open:inline">−</span>
              </summary>
              <div className="flex flex-col gap-3 pb-5">
                <p className="pretty text-[14px] leading-[1.5] text-secondary">{aesFamilies[f].d}</p>
                {items.map((t) => (
                  <div key={t.id} className="rounded-card-sm bg-lilac-tint p-4">
                    <Item t={t} />
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Laptop and tablet: the printed menu sheet. */}
      <div className="hidden flex-col gap-10 rounded-block bg-lilac-tint px-10 py-14 md:flex lg:px-[72px] lg:py-16">
        {/* Left-aligned and sentence case like the rest of the site (design review, Nov 2026). */}
        <div className="flex flex-col gap-3">
          <span className="eyebrow text-lilac-text">{c.menuEyebrow}</span>
          <h2 className="display-tight text-[48px] leading-none">{c.menuTitleAll}</h2>
          <p className="pretty max-w-[600px] text-[16px] leading-[1.55] text-secondary">{c.menuLeadAll}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-16 gap-y-12">
          {groups.map(({ f, items }) => (
            <section key={f} id={`family-${f}`} aria-labelledby={`family-${f}-h`} className="flex scroll-mt-28 flex-col gap-5">
              <h3 id={`family-${f}-h`} className="flex items-center gap-2.5 border-b border-ink/20 pb-3 font-display text-[28px] font-medium leading-[1.1] tracking-[-.01em]">
                <span aria-hidden className="h-3 w-3 shrink-0 rounded-full" style={{ background: aesFamilies[f].color }} />
                {aesFamilies[f].t}
              </h3>
              {items.map((t) => (
                <Item key={t.id} t={t} />
              ))}
            </section>
          ))}
        </div>
        <div className="flex flex-col items-start gap-3 pt-2">
          <SmartLink to={bookFor("aesthetics", "consult")} className="inline-flex h-[52px] items-center rounded-chip bg-ink px-7 text-[16px] font-semibold text-white">
            {c.book}
          </SmartLink>
          <span className="text-[13px] text-muted">{c.menuNote}</span>
        </div>
      </div>
      <p className="pretty max-w-[62ch] text-[14px] leading-[1.55] text-muted">{c.babyNote}</p>
    </section>
  );
}
