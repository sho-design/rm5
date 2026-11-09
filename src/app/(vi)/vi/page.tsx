import type { Metadata } from "next";
import { CtaBand, Display, Eyebrow, Section, SmartLink, SubPageHero } from "@/components/ui";
import { divisions, divisionDot } from "@/content/divisions";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { viChrome, viHome as c } from "@/content/vi";
import { routes, viRoutes } from "@/lib/routes";
import { langAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: { canonical: `${site.url}${viRoutes.home}`, languages: langAlternates(routes.home, viRoutes.home) },
};

/** Vietnamese home: who we are, the five services, why language matters here, the doctors, then new patients. */
export default function ViHomePage() {
  return (
    <>
      <SubPageHero
        crumb="Restoration Medical"
        crumbTo={viRoutes.home}
        page={c.eyebrow}
        title={c.h1}
        lead={c.lead}
        cta={viChrome.book}
        ctaTo={`${routes.book}?lang=vi`}
        cta2={c.cta2}
        cta2To={site.phoneHref}
        coverage={viChrome.formsNote}
        tint={divisions.family.tint}
        accent="var(--rm-ink)"
        img={images.heroFamilyPark}
        imgAlt={c.imgAlt}
        pills={c.pills}
      />

      <Section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Display size="sm">{c.servicesTitle}</Display>
          <p className="pretty max-w-[640px] text-[16px] leading-[1.55] text-secondary">{c.servicesLead}</p>
        </div>
        <ul className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-3">
          {c.services.map((s, i) => {
            const d = divisions[s.k as keyof typeof divisions];
            const vi = s.to === "viIron";
            return (
              <li key={s.k} className="rm-rise" style={{ animationDelay: `${i * 70}ms` }}>
                <SmartLink
                  to={vi ? viRoutes.iron : routes[s.to as keyof typeof routes]}
                  hrefLang={vi ? "vi" : "en-CA"}
                  className="group flex h-full flex-col gap-3 rounded-card p-6 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1"
                  style={{ background: d.tint }}
                >
                  <span className="flex items-center gap-2 text-[17px] font-semibold">
                    <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: divisionDot[d.label] ?? "var(--rm-ink)" }} />
                    {s.t}
                  </span>
                  <span className="pretty text-[15px] leading-[1.55] text-secondary">{s.d}</span>
                  <span className="mt-auto pt-1 text-[14px] font-semibold text-link">{vi ? viChrome.seeMore : viChrome.readMoreEn}</span>
                </SmartLink>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="grid grid-cols-1 gap-block lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6 rounded-block bg-sage-tint p-6 md:p-10">
          <Display size="sm">{c.whyTitle}</Display>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {c.why.map((w) => (
              <li key={w.t} className="flex flex-col gap-1.5">
                <span className="text-[17px] font-semibold">{w.t}</span>
                <span className="pretty text-[15px] leading-[1.55] text-secondary">{w.d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 rounded-block bg-ink p-6 text-white md:p-10">
          <Eyebrow tone="sun">{c.doctorsTitle}</Eyebrow>
          <ul className="flex flex-col gap-4">
            {c.doctors.map((d) => (
              <li key={d.n} className="flex flex-col">
                <span className="font-display text-[28px] tracking-[-.02em]">{d.n}</span>
                <span className="text-[14px] text-white/70">{d.r}</span>
              </li>
            ))}
          </ul>
          <span className="mt-auto text-[15px] text-white/85">{c.doctorsNote}</span>
        </div>
      </Section>

      <CtaBand title={c.bandTitle} sub={c.bandSub} cta={c.bandCta} ctaTo={viRoutes.register} callLine={false}>
        <a href={site.phoneHref} className="text-[15px] font-semibold">
          {viChrome.orCall}
        </a>
      </CtaBand>
    </>
  );
}
