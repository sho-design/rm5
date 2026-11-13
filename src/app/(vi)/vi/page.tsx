import type { Metadata } from "next";
import { CtaBand, Display, Eyebrow, Photo, Section, SmartLink, SubPageHero } from "@/components/ui";
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
        {/* Photo cards like the English home page, all five in one row on a laptop (a lone gap read as unfinished). */}
        <ul className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-5">
          {c.services.map((s, i) => {
            const d = divisions[s.k as keyof typeof divisions];
            const viTo: Record<string, string> = { viIron: viRoutes.iron, viFamily: viRoutes.family, viPain: viRoutes.pain, viAesthetics: viRoutes.aesthetics, viRehab: viRoutes.rehab };
            const vi = s.to in viTo;
            const img = (images.location as Record<string, string>)[s.k] ?? d.img;
            return (
              <li key={s.k} className="rm-rise" style={{ animationDelay: `${i * 70}ms` }}>
                <SmartLink
                  to={vi ? viTo[s.to] : routes[s.to as keyof typeof routes]}
                  hrefLang={vi ? "vi" : "en-CA"}
                  className="group flex h-full flex-col gap-3 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1"
                >
                  <Photo src={img} alt="" ratio="4/5" radius="card-sm" tint={d.tint} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px" />
                  <span className="flex items-center gap-2 text-[18px] font-semibold">
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: divisionDot[d.label] ?? "var(--rm-ink)" }} />
                    {s.t}
                  </span>
                  <span className="pretty text-[14px] leading-[1.55] text-secondary">{s.d}</span>
                  <span className="mt-auto pt-1 text-[14px] font-semibold text-link">{vi ? viChrome.seeMore : viChrome.seeMoreEn}</span>
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
                {/* Women's health day had no time or way to book in Vietnamese (round 26, Bà Hạnh). */}
                {"to" in w && w.to ? (
                  <SmartLink to={w.to} className="text-[14px] font-semibold text-link">
                    {w.link}
                  </SmartLink>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 rounded-block rm-ink-surface bg-ink p-6 text-white md:p-10">
          <Eyebrow tone="sun">{c.doctorsTitle}</Eyebrow>
          <ul className="flex flex-col gap-5">
            {c.doctors.map((d) => (
              <li key={d.n} className="flex items-center gap-4">
                <span aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sun font-display text-[24px] text-ink">
                  {d.n.replace("Dr. ", "").split(" ").pop()?.[0]}
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-[26px] leading-tight tracking-[-.02em]">{d.n}</span>
                  <span className="text-[14px] text-white/70">{d.r}</span>
                </span>
              </li>
            ))}
          </ul>
          <span className="text-[15px] text-white/85">{c.doctorsNote}</span>
          <SmartLink to={`${routes.book}?lang=vi`} className="mt-auto inline-flex w-fit items-center rounded-chip bg-sun px-6 py-3 text-[15px] font-semibold text-sun-ink">
            {viChrome.book}
          </SmartLink>
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
