import { BenefitCard, CtaBand, Display, Faq, FactGrid, Grid, PathSteps, Section, SectionHeader, SmartLink, SubPageHero } from "@/components/ui";
import { CoverageChecker } from "@/components/pages/division/CoverageChecker";
import { RenewalForm } from "@/components/pages/help/RenewalForm";
import { Ladder } from "@/components/pages/division/Ladder";
import { aestheticsLadder, rehabCoverage } from "@/content/deep";
import { divisionAccent, divisionTint, divisions, tints } from "@/content/divisions";
import type { Topic } from "@/content/topics";
import { cn } from "@/lib/cn";
import { href } from "@/lib/routes";
import { breadcrumbs } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

/**
 * Topic page: one service or patient topic under a division (Pain Centre
 * nerve blocks, Rehab MVA, Family Medicine lab results...). Same building
 * blocks as the prototype sub-pages: sub-page hero, an "at a glance" fact
 * card, tinted option cards, benefit cards, the navy path, the sticky FAQ
 * and a closing band.
 */
export function TopicPage({ t }: { t: Topic }) {
  const d = divisions[t.division];
  const tint = divisionTint[t.division];
  const accent = divisionAccent[t.division];
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          [d.label, href(t.division)],
          [t.page, href(t.key)],
        ])}
      />
      <SubPageHero
        crumb={d.label}
        crumbTo={t.division}
        page={t.page}
        title={t.title}
        lead={t.lead}
        cta={t.cta}
        ctaTo={t.ctaTo}
        cta2={t.cta2}
        cta2To={t.cta2To}
        coverage={t.coverage}
        tint={tint}
        accent={accent}
        img={t.img}
        imgAlt={t.imgAlt}
        pills={t.pills}
      />

      {t.glance ? (
        <Section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-12">
          <div className="flex flex-col gap-3">
            <Display size="xs">{t.glance.title}</Display>
            <p className="pretty max-w-[520px] text-[16px] leading-[1.55] text-secondary">{t.glance.p}</p>
          </div>
          <FactGrid facts={t.glance.facts} />
        </Section>
      ) : null}

      {t.cards ? (
        <Section className="flex flex-col gap-6">
          <SectionHeader title={t.cards.title} sub={t.cards.sub} />
          <Grid cols={t.cards.items.length === 4 ? 2 : t.cards.items.length >= 3 ? 3 : 2}>
            {t.cards.items.map((c, i) => (
              <div key={c.t + i} className="flex flex-col gap-4 rounded-card p-6 text-ink md:p-7" style={{ background: tints[i % tints.length] }}>
                <div className="flex items-start justify-between gap-3">
                  <span className="display-tight text-[24px] leading-[1.1] md:text-[26px]">{c.t}</span>
                  {c.meta ? <span className="shrink-0 rounded-chip bg-white/70 px-2.5 py-1 text-[11px] font-semibold">{c.meta}</span> : null}
                </div>
                <p className="pretty text-[15px] leading-[1.5] text-ink-2">{c.d}</p>
                {c.facts ? (
                  <dl className="mt-auto grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {c.facts.map((f) => (
                      <div key={f.k} className="flex flex-col gap-0.5 rounded-row bg-white/70 px-4 py-3">
                        <dt className="text-[12px] font-semibold text-ink/60">{f.k}</dt>
                        <dd className="text-[14px] font-semibold leading-[1.35]">{f.v}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                {c.link && c.page ? (
                  <SmartLink to={c.page} className={cn("text-[14px] font-semibold text-link", !c.facts && "mt-auto")}>
                    {c.link} ›
                  </SmartLink>
                ) : null}
              </div>
            ))}
          </Grid>
        </Section>
      ) : null}

      {t.coverageChooser ? <CoverageChecker options={rehabCoverage} /> : null}
      {t.ladder ? <Ladder rungs={aestheticsLadder} /> : null}

      {t.benefits ? (
        <Section className="flex flex-col gap-6">
          <Display size="xs">{t.benefits.title}</Display>
          <Grid cols={3}>
            {t.benefits.items.map((b) => (
              <BenefitCard key={b.t} {...b} />
            ))}
          </Grid>
        </Section>
      ) : null}

      {t.path ? <PathSteps title={t.path.title} steps={t.path.steps} /> : null}

      {t.related ? (
        <Section className="flex flex-col gap-5">
          <Display size="2xs">{t.related.title}</Display>
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {t.related.items.map((r) => (
              <SmartLink key={r.t} to={r.page} className="flex items-center justify-between gap-4 rounded-row border border-border bg-card px-5 py-4 transition-colors hover:border-sky">
                <span className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-semibold">{r.t}</span>
                  <span className="text-[13px] text-muted">{r.d}</span>
                </span>
                <span aria-hidden className="text-[18px] text-link">
                  ›
                </span>
              </SmartLink>
            ))}
          </div>
        </Section>
      ) : null}

      {t.extra === "renewal" ? <RenewalForm /> : null}

      {t.faq && t.faq.length ? <Faq items={t.faq} /> : null}

      {t.note ? (
        <Section tight>
          <p className="pretty max-w-[760px] text-[13px] leading-[1.55] text-muted">{t.note}</p>
        </Section>
      ) : null}

      <CtaBand title={t.band.title} sub={t.band.sub} cta={t.band.cta} ctaTo={t.band.ctaTo} cta2={t.band.cta2} cta2To={t.band.cta2To} />
    </>
  );
}
