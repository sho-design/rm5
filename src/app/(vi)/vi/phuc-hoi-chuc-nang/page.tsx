import type { Metadata } from "next";
import { CtaBand, Display, Section, SubPageHero } from "@/components/ui";
import { ViFacts } from "@/components/vi/ViBits";
import { divisions } from "@/content/divisions";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { viChrome, viRehab as c } from "@/content/vi";
import { bookFor, routes, viRoutes } from "@/lib/routes";
import { langAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: `${site.url}${viRoutes.rehab}`, languages: langAlternates(routes.rehab, viRoutes.rehab) },
};

/** Rehab and Recovery in Vietnamese: the four services, prices (plus HST), and car accident and WSIB claims. */
export default function ViRehabPage() {
  const book = `${bookFor("rehab", "assessment")}&lang=vi`;
  return (
    <>
      <SubPageHero
        crumb="Trang chủ"
        crumbTo={viRoutes.home}
        page={c.eyebrow}
        title={c.h1}
        lead={c.lead}
        cta={c.cta}
        ctaTo={book}
        cta2={viChrome.orCall}
        cta2To={site.phoneHref}
        coverage={viChrome.formsNote}
        tint={divisions.rehab.tint}
        accent="var(--rm-ink)"
        img={images.division.rehab}
        imgAlt={c.imgAlt}
        pills={c.pills}
      />
      <Section className="flex flex-col gap-6">
        <Display size="sm">{c.svcTitle}</Display>
        <ul className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-4">
          {c.svcs.map((s, i) => (
            <li key={s.t} className="rm-rise flex flex-col gap-2 rounded-card p-6" style={{ background: divisions.rehab.tint, animationDelay: `${i * 60}ms` }}>
              <span className="text-[17px] font-semibold">{s.t}</span>
              <span className="pretty text-[15px] leading-[1.55] text-secondary">{s.d}</span>
            </li>
          ))}
        </ul>
      </Section>
      <Section className="grid grid-cols-1 gap-card lg:grid-cols-[1.4fr_1fr]">
        <ViFacts title={c.priceTitle} rows={c.prices} />
        <div className="flex flex-col gap-4 rounded-block bg-ink p-6 text-white md:p-8">
          <span className="font-display text-[26px] leading-tight tracking-[-.02em]">{c.claimsTitle}</span>
          {c.claims.map((x) => (
            <div key={x.t} className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold text-sun">{x.t}</span>
              <span className="pretty text-[15px] leading-[1.55] text-white/85">{x.d}</span>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand title={c.bandTitle} sub={c.bandSub} cta={c.cta} ctaTo={book} callLine={false}>
        <a href={site.phoneHref} className="text-[15px] font-semibold">
          {viChrome.orCall}
        </a>
      </CtaBand>
    </>
  );
}
