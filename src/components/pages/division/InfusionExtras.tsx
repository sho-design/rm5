import { Block, Button, Display, Eyebrow, Lead, Photo, Section, SmartLink } from "@/components/ui";
import { divisions, infusionConcerns, infusionPage as ip } from "@/content/divisions";
import { deepModuleCopy } from "@/content/deep";
import type { CompareRow } from "@/content/deep";
import type { InfusionLink } from "@/content/home";
import { images } from "@/content/images";
import { external } from "@/lib/routes";

const concernsUrl = `${external.infusionSite}/concerns`;

/** Infusion hero: photo block, sunshine pill, Fraunces 72 headline with italic phrase, three CTAs, location note. */
export function InfusionHero() {
  return (
    <section className="relative mx-3 mt-4 flex min-h-[420px] items-end overflow-hidden rounded-[22px] md:mx-gutter md:mt-8 md:min-h-[620px] md:rounded-block">
      <div className="absolute inset-0">
        <Photo src={divisions.infusion.img} alt={ip.hero.alt} radius="none" protect className="h-full w-full" priority sizes="100vw" />
      </div>
      <div className="relative flex w-full flex-col gap-4 p-[18px] text-white md:p-12 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="flex max-w-[760px] flex-col gap-3 md:gap-5">
          <span className="inline-flex self-start rounded-chip bg-sun px-3.5 py-[7px] text-[12px] font-semibold text-sun-ink md:text-[13px]">{ip.hero.pill}</span>
          <h2 className="display-tight balance text-[32px] md:text-[56px] lg:text-[72px]">
            {ip.hero.h2} <em>{ip.hero.h2em}</em>
          </h2>
          <p className="pretty max-w-[600px] text-[14px] leading-[1.5] text-white/85 md:text-[19px]">{ip.hero.p}</p>
          <div className="flex flex-wrap gap-2.5">
            <Button to="book" variant="inverse">
              {ip.hero.cta}
            </Button>
            <Button to={external.infusionDrips} variant="outline-inverse">
              {ip.hero.cta2}
            </Button>
            <Button to="iron" variant="outline-inverse">
              {ip.hero.cta3}
            </Button>
          </div>
        </div>
        <span className="text-[13px] text-white/80 lg:whitespace-nowrap">{ip.hero.note}</span>
      </div>
    </section>
  );
}

/** "Wellness and clinical, under one roof." three-column bento with the concern chips. */
export function InfusionGrid() {
  const g = ip.grid;
  return (
    <section className="flex flex-col gap-5 px-4 pt-10 md:gap-6 md:px-content md:pt-16">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
        <Display size="xs" className="max-w-[640px]">
          {g.title}
        </Display>
        <span className="pretty max-w-[320px] text-[14px] text-muted">{g.note}</span>
      </div>
      <div className="grid grid-cols-1 gap-block md:grid-cols-3">
        <SmartLink to={external.infusionDrips} className="flex min-h-[280px] flex-col justify-between gap-10 rounded-card bg-inverse p-6 text-on-inverse transition-opacity hover:opacity-95 md:col-span-2 md:min-h-[360px] md:gap-20 md:p-8">
          <span className="text-[13px] font-semibold">{g.wellness.k}</span>
          <span className="flex flex-col gap-2.5">
            <span className="display-tight text-[28px] md:text-[34px]">{g.wellness.t}</span>
            <span className="text-[15px] text-white/72">{g.wellness.d}</span>
            <span className="text-[15px] font-semibold">{g.wellness.cta} ›</span>
          </span>
        </SmartLink>

        <SmartLink to="iron" className="relative flex min-h-[280px] flex-col justify-between gap-10 overflow-hidden rounded-card bg-sky p-6 text-white transition-opacity hover:opacity-95 md:min-h-[360px] md:p-7">
          <div className="absolute inset-0">
            {/* Prototype reuses this family-medicine photo as a muted backdrop. */}
            <Photo src={images.services.family[3]} alt="" radius="none" className="h-full w-full" imgClassName="opacity-[.28] mix-blend-luminosity" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
          <span className="relative flex items-center justify-between">
            <span className="text-[13px] font-semibold">{g.iron.k}</span>
            <span className="rounded-chip bg-white/22 px-2.5 py-[5px] text-[11px] font-semibold">{g.iron.tag}</span>
          </span>
          <span className="relative flex flex-col gap-2.5">
            <span className="display-tight text-[28px] md:text-[34px]">{g.iron.t}</span>
            <span className="text-[15px] leading-[1.45] opacity-90">{g.iron.d}</span>
            <span className="text-[15px] font-semibold">{g.iron.cta} ›</span>
          </span>
        </SmartLink>

        <SmartLink to={external.infusionSite} className="flex flex-col justify-between gap-10 rounded-card bg-sun-soft p-6 text-ink transition-opacity hover:opacity-95 md:p-7">
          <span className="text-[13px] font-semibold">{g.how.k}</span>
          <span className="flex flex-col gap-1.5">
            <span className="display-tight text-[24px] leading-[1.1]">{g.how.t}</span>
            <span className="text-[14px] opacity-75">{g.how.d}</span>
          </span>
        </SmartLink>

        <SmartLink to={concernsUrl} className="grid grid-cols-1 items-center gap-5 rounded-card border border-border bg-card p-6 transition-colors hover:border-sky md:col-span-2 md:grid-cols-[1fr_1.3fr] md:gap-6 md:p-7">
          <span className="flex flex-col gap-1.5">
            <span className="text-[13px] font-semibold text-muted">{g.concerns.k}</span>
            <span className="display-tight text-[24px] md:text-[28px]">{g.concerns.t}</span>
            <span className="pt-1.5 text-[13px] font-semibold text-link">{g.concerns.cta} ›</span>
          </span>
          <span className="scroll-x -mx-6 flex gap-1.5 px-6 md:mx-0 md:flex-wrap md:px-0">
            {infusionConcerns.map((c) => (
              <span key={c} className="shrink-0 rounded-chip border border-border bg-raised px-3.5 py-2 text-[13px] font-medium">
                {c}
              </span>
            ))}
          </span>
        </SmartLink>
      </div>
    </section>
  );
}

/** Deep dive, infusion only: "A medical clinic, not a drip bar." comparison table. */
export function CompareTable({ rows }: { rows: CompareRow[] }) {
  const c = deepModuleCopy.compare;
  return (
    <Section className="flex flex-col gap-5">
      <Display size="xs">{c.title}</Display>
      <div role="table" className="overflow-hidden rounded-card border border-border">
        <div role="row" className="hidden grid-cols-[1.4fr_1fr_1fr] bg-card text-[13px] font-semibold text-muted md:grid">
          <span role="columnheader" className="px-6 py-4" />
          <span role="columnheader" className="px-6 py-4 text-ink">
            {c.us}
          </span>
          <span role="columnheader" className="px-6 py-4">
            {c.them}
          </span>
        </div>
        {rows.map((r) => (
          <div key={r.k} role="row" className="grid grid-cols-1 border-t border-border text-[15px] md:grid-cols-[1.4fr_1fr_1fr]">
            <span role="cell" className="px-5 pt-4 font-semibold md:px-6 md:py-[18px]">
              {r.k}
            </span>
            <span role="cell" className="flex flex-col gap-1 bg-sage-tint px-5 py-3 md:px-6 md:py-[18px]">
              <span className="text-[12px] font-semibold text-muted md:hidden">{c.us}</span>
              <span className="flex items-start gap-2">
                <span aria-hidden className="text-sage-deep">
                  ✓
                </span>
                <span>{r.us}</span>
              </span>
            </span>
            <span role="cell" className="flex flex-col gap-1 px-5 pb-4 pt-3 text-muted md:px-6 md:py-[18px]">
              <span className="text-[12px] font-semibold md:hidden">{c.them}</span>
              <span>{r.them}</span>
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/** Deep dive, infusion only: navy handoff to the external Infusion site with four link cards. */
export function InfusionHandoff({ links }: { links: InfusionLink[] }) {
  const h = deepModuleCopy.handoff;
  return (
    <Block tone="navy" className="grid grid-cols-1 gap-8 p-6 md:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-12 lg:px-12 lg:py-14">
      <div className="flex flex-col gap-5">
        <Eyebrow tone="sun">{h.eyebrow}</Eyebrow>
        <Display size="sm">{h.title}</Display>
        <Lead size="base" tone="inverse">
          {h.p}
        </Lead>
        <div className="flex flex-wrap gap-2.5">
          <Button to={external.infusionSite} variant="accent" trailing>
            {h.cta}
          </Button>
          <Button to="book" variant="outline-inverse">
            {h.cta2}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {links.map((l) => (
          <SmartLink key={l.k} to={l.href} className="flex min-h-[150px] flex-col gap-2 rounded-[20px] border border-white/12 bg-white/6 p-[22px] transition-colors hover:bg-white/12">
            <span className="text-[12px] font-semibold" style={{ color: l.c }}>
              {l.k}
            </span>
            <span className="display-tight text-[22px]">{l.t}</span>
            <span className="flex-1 text-[13px] leading-[1.45] text-white/70">{l.d}</span>
            <span className="text-[13px] font-semibold">{l.cta} ›</span>
          </SmartLink>
        ))}
      </div>
    </Block>
  );
}
