import type { Metadata } from "next";
import { CtaBand, Section, SubPageHero } from "@/components/ui";
import { ViFacts, ViSteps } from "@/components/vi/ViBits";
import { divisions } from "@/content/divisions";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { viChrome, viRegister as c } from "@/content/vi";
import { oceanRegisterUrl } from "@/lib/ocean";
import { routes, viRoutes } from "@/lib/routes";
import { langAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: `${site.url}${viRoutes.register}`, languages: langAlternates(routes.register, viRoutes.register) },
};

/** New patients in Vietnamese. The form itself is English (or Ocean when set), so the phone is always offered. */
export default function ViRegisterPage() {
  return (
    <>
      <SubPageHero
        crumb="Trang chủ"
        crumbTo={viRoutes.home}
        page={c.eyebrow}
        title={c.h1}
        lead={c.lead}
        cta={c.cta}
        ctaTo={oceanRegisterUrl ?? routes.register}
        cta2={c.bandCta}
        cta2To={site.phoneHref}
        coverage={viChrome.formsNote}
        tint={divisions.family.tint}
        accent="var(--rm-ink)"
        img={images.division.family}
        imgAlt={c.imgAlt}
      />
      <ViSteps title={c.stepsTitle} steps={c.steps} />
      <Section className="grid grid-cols-1 gap-card md:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-card bg-sky-soft p-6 md:p-8">
          <span className="text-[17px] font-semibold">{c.bringTitle}</span>
          <ul className="flex flex-col gap-2.5">
            {c.bring.map((b) => (
              <li key={b} className="flex gap-3 text-[15px] leading-[1.5]">
                <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-ink" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <ViFacts title={c.costTitle} rows={c.cost} />
      </Section>
      <CtaBand title={c.bandTitle} sub={c.bandSub} cta={c.bandCta} ctaTo={site.phoneHref} callLine={false} />
    </>
  );
}
