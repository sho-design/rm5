import type { Metadata } from "next";
import { CtaBand, Display, SmartLink } from "@/components/ui";
import { divisionPageCopy, divisions, infusionPage, infusionSub } from "@/content/divisions";
import { deepDives } from "@/content/deep";
import { site } from "@/content/site";
import type { DivisionKey, NavKey } from "@/content/types";
import { AboutTeaching } from "./AboutTeaching";
import { DeepDive } from "./DeepDive";
import { Hero } from "./Hero";
import { InfusionHero } from "./InfusionExtras";
import { AesFaceMap } from "@/components/pages/aesthetics/AesFaceMap";
import { DeepDiveChooser } from "./DeepDiveChooser";
import { Offer } from "./Offer";
import { SubNav } from "./SubNav";

/** Title and description for a division page from its H1 and lead. */
export function divisionMetadata(k: NavKey): Metadata {
  const d = divisions[k];
  const description = k === "infusion" ? infusionPage.hero.p : d.blurb;
  return { title: d.label, description };
}

/**
 * One template for the five division pages and the About landing page:
 * H1 + icon sub-nav, photo hero, "What we offer" bento, then the division's
 * deep dive (or, for About, the teaching clinic block and its closing band).
 * Infusion renders its own hero and grid (the drip builder follows the concern chooser in the deep dive), with links to the
 * drips, shots, concern and pricing pages under /infusion-therapy.
 */
export function DivisionPage({ k }: { k: NavKey }) {
  const d = divisions[k];
  const isInfusion = k === "infusion";
  const isAbout = k === "about";
  const painHelper = k === "pain" ? `Referrals by fax ${site.fax} or Ocean eReferral. Questions: ${site.phone}.` : undefined;

  return (
    <>
      {/* One headline per page (design review, Nov 2026): the division name is the page label (h1, subsection size)
          and the photo headline below carries the message. Two headlines at 84 and 56px competed for attention. */}
      <header className="flex flex-col gap-4 px-4 pt-6 md:gap-7 md:px-content md:pt-12">
        <SmartLink to="home" className="text-[13px] font-medium text-muted md:hidden">
          ‹ {divisionPageCopy.home}
        </SmartLink>
        {isInfusion ? (
          <div className="flex items-end justify-between gap-8">
            <Display as="h1" size="2xs">
              {d.label}
            </Display>
            <span className="hidden pb-1 text-[14px] text-muted md:block">{infusionPage.tagline}</span>
          </div>
        ) : (
          <Display as="h1" size="2xs">
            {d.label}
          </Display>
        )}
        <SubNav items={isInfusion ? infusionSub : (d.sub ?? [])} label={d.label} />
      </header>

      {isInfusion ? (
        <>
          <InfusionHero />
          {/* Patient first: how you feel comes before any list of services. */}
          <DeepDiveChooser k="infusion" dive={deepDives.infusion} />
        </>
      ) : (
        <>
          <Hero
            img={d.img}
            alt={d.label}
            eyebrow={d.eyebrow}
            headline={d.headline}
            blurb={d.blurb}
            cta={d.cta}
            ctaTo={d.ctaPage ?? "book"}
            cta2={d.cta2}
            cta2To={d.cta2Page}
            helper={painHelper}
          />
          {/* Patient first: their concern or situation, then what we offer for it. */}
          {k === "aesthetics" ? <AesFaceMap /> : !isAbout ? <DeepDiveChooser k={k as DivisionKey} dive={deepDives[k as DivisionKey]} /> : null}
          <Offer services={d.services ?? []} division={k} />
        </>
      )}

      {isAbout ? (
        <>
          <AboutTeaching />
          <CtaBand title={d.footCta ?? ""} cta="Contact us" ctaTo="contact" />
        </>
      ) : (
        <DeepDive k={k as DivisionKey} division={d} dive={deepDives[k as DivisionKey]} />
      )}
    </>
  );
}
