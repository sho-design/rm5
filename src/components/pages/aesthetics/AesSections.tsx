import { aesConcerns, aesCopy as c, aesFamilies, aesTreatments, type AesFamily } from "@/content/aesthetics-menu";
import { Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import { routes } from "@/lib/routes";

/** "Start with what you notice.": nine concerns, each opening the menu filtered to it. */
export function AesConcerns({ title = c.concernsTitle }: { title?: string }) {
  return (
    <Section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Eyebrow>{c.concernsEyebrow}</Eyebrow>
        <Display size="sm">{title}</Display>
        <p className="pretty max-w-[640px] text-[16px] leading-[1.55] text-secondary">{c.concernsLead}</p>
        <SmartLink to={`${routes.aesMenu}#plan`} className="text-[15px] font-semibold text-link">
          {c.planLink} ›
        </SmartLink>
      </div>
      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {aesConcerns.map((x) => (
          <li key={x.k}>
            <SmartLink
              to={`${routes.aesMenu}?concern=${x.k}#plan`}
              className="group flex h-full items-center justify-between gap-4 rounded-card-sm border border-border bg-card px-5 py-4 transition-colors hover:border-lilac"
            >
              <span className="flex flex-col gap-1">
                <span className="text-[16px] font-semibold">{x.t}</span>
                <span className="text-[13px] leading-[1.45] text-muted">{x.d}</span>
              </span>
              <span aria-hidden className="text-[18px] text-muted motion-safe:transition-transform group-hover:translate-x-1">
                ›
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** The devices and product lines the clinic names, as a quiet strip. */
export function AesTools() {
  return (
    <Section tight className="flex flex-col gap-3">
      <span className="text-[13px] font-semibold text-muted">{c.toolsTitle}</span>
      <ul className="flex flex-wrap gap-2">
        {c.tools.map((t) => (
          <li key={t} className="rounded-chip border border-border bg-card px-3.5 py-1.5 text-[14px] font-semibold">
            {t}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** "Screened first, treated second.": who we screen out, what to expect, downtime, how long it lasts. */
export function AesCandidacy() {
  return (
    <Section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Eyebrow>{c.candidacyEyebrow}</Eyebrow>
        <Display size="sm">{c.candidacyTitle}</Display>
        <p className="pretty max-w-[640px] text-[16px] leading-[1.55] text-secondary">{c.candidacyLead}</p>
      </div>
      <div className="grid grid-cols-1 gap-card md:grid-cols-2">
        {c.candidacy.map((b, i) => (
          <div key={b.t} className="flex gap-4 rounded-card bg-raised p-6">
            <span className="font-display text-[28px] font-medium leading-none text-muted">{i + 1}</span>
            <span className="flex flex-col gap-2">
              <span className="text-[17px] font-semibold">{b.t}</span>
              <span className="pretty text-[15px] leading-[1.55] text-secondary">{b.d}</span>
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/** The six treatment families as colour cards, each opening the menu filtered to that family. */
export function AesFamilies() {
  const fams = Object.keys(aesFamilies) as AesFamily[];
  return (
    <Section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="flex flex-col gap-2">
          <Eyebrow>{c.menuEyebrow}</Eyebrow>
          <Display size="sm">{c.menuTitle}</Display>
        </div>
        <SmartLink to={`${routes.aesMenu}#menu`} className="text-[15px] font-semibold text-link">
          {c.seeMenu} ›
        </SmartLink>
      </div>
      <ul className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-3">
        {fams.map((f, i) => {
          const items = aesTreatments.filter((t) => t.family === f);
          return (
            <li key={f} className="rm-rise" style={{ animationDelay: `${i * 70}ms` }}>
              <SmartLink
                to={`${routes.aesMenu}#family-${f}`}
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-card border border-border bg-card p-6 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1"
              >
                <span aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-60 motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-125" style={{ background: aesFamilies[f].color }} />
                <span className="relative flex items-center gap-2 text-[13px] font-semibold text-muted">
                  <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: aesFamilies[f].color }} />
                  {c.count(items.length)}
                </span>
                <span className="relative display-tight text-[28px]">{aesFamilies[f].t}</span>
                <span className="relative pretty text-[15px] leading-[1.5] text-secondary">{aesFamilies[f].d}</span>
                <span className="relative mt-auto flex flex-wrap gap-1.5">
                  {items.slice(0, 3).map((t) => (
                    <span key={t.id} className="rounded-chip bg-raised px-3 py-1 text-[13px] font-semibold">
                      {t.brand ?? t.name}
                    </span>
                  ))}
                </span>
              </SmartLink>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
