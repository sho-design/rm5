import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, Display, Faq, Section, SmartLink } from "@/components/ui";
import {
  EvidenceChip,
  InfusionBand,
  InfusionSmallPrint,
} from "@/components/pages/infusion/InfusionBits";
import { Bag, DripHeroArt } from "@/components/pages/infusion/DripArt";
import { DripInside } from "@/components/pages/infusion/extra/drip/DripInside";
import { divisions } from "@/content/divisions";
import {
  dripBrowserCopy,
  dripBySlug,
  dripCompareCopy,
  dripFamilies,
  dripInside,
  infusionCopy,
  ingredients,
  signatureDrips,
} from "@/content/infusion-site";
import { bookFor, dripRoute, routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { breadcrumbs, faqPage } from "@/lib/schema";
import { dripFaq, dripSeo } from "@/content/inf-drip";
import { site } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";

const tiredDrips = new Set([
  "foundation",
  "myers",
  "vitamin-c-zinc",
  "signature",
  "nad",
]);

type Params = { params: Promise<{ slug: string }> };
const c = infusionCopy.drip;

export const dynamicParams = false;
export function generateStaticParams() {
  return signatureDrips.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const d = dripBySlug((await params).slug);
  if (!d) return {};
  const seo = dripSeo(d);
  return pageMetadata(dripRoute(d.slug), {
    title: seo.title,
    description: seo.description,
    // Drips without full page copy stay out of search until the clinic supplies it.
    robots: d.detail ? undefined : { index: false, follow: true },
  });
}

export default async function DripPage({ params }: Params) {
  const d = dripBySlug((await params).slug);
  if (!d) notFound();
  const x = d.detail;
  const facts = [c.time, c.elective, c.mixed, ...(x?.screen ? [x.screen] : [])];
  const color = dripFamilies[d.f];
  const inside = dripInside[d.slug];
  // Same family first, then the rest, three in all.
  const similar = [
    ...signatureDrips.filter((o) => o.f === d.f && o.slug !== d.slug),
    ...signatureDrips.filter((o) => o.f !== d.f),
  ].slice(0, 3);
  const dripsHref = routes.drips;
  const faq = dripFaq(d);
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          [divisions.infusion.label, "/infusion-therapy"],
          ["Drips", "/infusion-therapy/drips"],
          [d.t, dripRoute(d.slug)],
        ])}
      />
      <JsonLd data={faqPage(faq)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          name: `${d.t.replace(/ drip$/i, "")} IV drip`,
          description: dripSeo(d).description,
          procedureType: "https://schema.org/PercutaneousProcedure",
          url: `${site.url}${dripRoute(d.slug)}`,
          howPerformed:
            "Screened first by a registered nurse, mixed at the appointment, then given through a small IV in the arm over about 45 minutes.",
        }}
      />
      <section
        className="relative mx-3 mt-3 grid grid-cols-1 gap-8 overflow-hidden rounded-block p-6 md:mx-gutter md:mt-6 md:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:p-12"
        style={{
          background: `linear-gradient(135deg, var(--div-infusion) 55%, color-mix(in srgb, ${color} 30%, var(--div-infusion)))`,
        }}
      >
        <div className="flex flex-col gap-6">
          <span className="eyebrow text-sage-text">
            <SmartLink to="infusion">{divisions.infusion.label}</SmartLink> ›{" "}
            <SmartLink to="drips">{c.back}</SmartLink>
          </span>
          <span className="flex items-center gap-2 text-[13px] font-semibold">
            <span
              aria-hidden
              className="h-3 w-3 rounded-full"
              style={{ background: dripFamilies[d.f] }}
            />
            {d.f}, IV drip
            <EvidenceChip ev={d.ev} />
          </span>
          <Display as="h1" size="xl">
            {d.t}
          </Display>
          <p className="pretty max-w-[640px] text-[17px] leading-[1.5] text-secondary lg:text-[19px]">
            {d.d}
          </p>
          {/* "Formerly NAD+ Longevity" put back the claim the rename took out (compliance reviewer, round 20). Old
            names stay in search only, where they lead here. */}
          <div className="flex flex-wrap gap-2">
            {facts.map((f) => (
              <span
                key={f}
                className="rounded-chip bg-white/80 px-3.5 py-2 text-[13px] font-semibold"
              >
                {f}
              </span>
            ))}
          </div>
          {/* A pregnant tester who could not keep fluids down found a hydration drip and an anti-nausea add-on with
            nothing telling her to see a doctor first (round 20). */}
          <p className="pretty max-w-[640px] rounded-tile bg-[color:var(--div-pain)] px-4 py-3 text-[15px] font-semibold leading-[1.5] text-ink">
            {c.unwell}{" "}
            <SmartLink
              to="pregnancy"
              className="font-semibold text-link underline-offset-2 hover:underline"
            >
              {c.pregnancyCta} ›
            </SmartLink>
          </p>
          {/* The tiredness line read oddly on hydration and skin drips (round 20). */}
          {tiredDrips.has(d.slug) ? (
            <p className="pretty max-w-[640px] text-[15px] leading-[1.5] text-ink">
              {c.tired}{" "}
              <SmartLink
                to={`${bookFor("family", "concern")}&reason=${encodeURIComponent("Low energy")}`}
                className="font-semibold text-link underline-offset-2 hover:underline"
              >
                {c.tiredCta} ›
              </SmartLink>
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2.5">
            <Button
              to={`${bookFor("infusion", "drip")}&reason=${encodeURIComponent(d.t)}`}
            >
              {c.bookDrip}
            </Button>
            <Button to="infusionHow" variant="outline">
              {infusionCopy.band.cta2}
            </Button>
          </div>
        </div>
        {/* Large animated bag in the family colour. */}
        <div className="flex justify-center lg:justify-end">
          <DripHeroArt
            color={color}
            className="max-w-[200px] md:max-w-[240px]"
          />
        </div>
      </section>

      {/* What's inside, as far as the menu says, and where it sits among the other drips. */}
      <Section
        className={cn(
          "grid grid-cols-1 items-start gap-card",
          !x && "lg:grid-cols-[1.2fr_1fr]",
        )}
      >
        {/* Drips with full page copy list their ingredients further down; the chips would repeat them. */}
        {x ? null : (
          <div className="flex flex-col gap-4 rounded-card border border-border bg-card p-6 md:p-8">
            <span className="text-[13px] font-semibold text-muted">
              {dripBrowserCopy.inside}
            </span>
            <div className="flex flex-wrap gap-2">
              {inside?.items.map((it) => (
                <span
                  key={it}
                  className="rounded-chip px-4 py-2 text-[15px] font-semibold text-ink"
                  style={{
                    background: `color-mix(in srgb, ${color} 30%, white)`,
                  }}
                >
                  {it}
                </span>
              ))}
              {inside?.consult ? (
                <span className="rounded-chip border border-dashed border-border px-4 py-2 text-[15px] text-muted">
                  {dripBrowserCopy.atConsult}
                </span>
              ) : null}
            </div>
            <span className="text-[13px] text-muted">
              {dripBrowserCopy.tableNote}
            </span>
            <SmartLink
              to={`${dripsHref}?compare=${d.slug}`}
              className="text-[14px] font-semibold text-link"
            >
              {dripCompareCopy.compareThis}
            </SmartLink>
          </div>
        )}
        <div
          className={cn(
            "grid grid-cols-1 gap-3 rounded-card bg-paper p-6 md:p-8",
            x && "md:grid-cols-3",
          )}
        >
          <span
            className={cn(
              "flex items-center justify-between gap-3 text-[13px] font-semibold text-muted",
              x && "md:col-span-3",
            )}
          >
            {dripCompareCopy.similar}
            {x ? (
              <SmartLink
                to={`${dripsHref}?compare=${d.slug}`}
                className="text-[14px] text-link"
              >
                {dripCompareCopy.compareThis}
              </SmartLink>
            ) : null}
          </span>
          {similar.map((s) => (
            <SmartLink
              key={s.slug}
              to={dripRoute(s.slug)}
              className="group flex items-center gap-4 rounded-card-sm bg-white p-3.5 transition-shadow hover:shadow-[0_6px_20px_rgba(16,24,40,.08)]"
            >
              <Bag color={dripFamilies[s.f]} className="h-[56px] w-[37px]" />
              <span className="flex min-w-0 flex-col">
                <span className="text-[15px] font-semibold">{s.t} ›</span>
                <span className="truncate text-[13px] text-muted">{s.d}</span>
              </span>
            </SmartLink>
          ))}
        </div>
      </Section>

      {/* "Inside your drip", set to this drip (it replaces the general visit steps here). */}
      <DripInside drip={d.slug} />

      {x ? (
        <Section className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Display size="2xs">{c.whatItIs}</Display>
              <p className="pretty text-[16px] leading-[1.6] text-secondary">
                {x.whatItIs}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Display size="2xs">{c.supports}</Display>
              <ul className="flex flex-col gap-2 text-[16px] leading-[1.5] text-secondary">
                {x.supports.map((s) => (
                  <li key={s} className="flex gap-2.5">
                    <span aria-hidden className="text-sage-text">
                      ✓
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Display size="2xs">{c.expect}</Display>
              <p className="pretty text-[16px] leading-[1.6] text-secondary">
                {x.expect}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-6">
              <span className="text-[18px] font-semibold">{c.inside}</span>
              <span className="text-[13px] text-muted">{x.insideNote}</span>
              <ul className="flex flex-col divide-y divide-[color:var(--border-default)]">
                {x.inside.map((name) => {
                  const ing = ingredients.find((i) => i.t === name);
                  return (
                    <li key={name} className="flex flex-col gap-0.5 py-3">
                      <span className="text-[15px] font-semibold">{name}</span>
                      {ing ? (
                        <span className="text-[13px] text-muted">{ing.d}</span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col gap-1.5 rounded-card bg-sun-soft p-6 text-ink">
              <span className="text-[13px] font-semibold text-ink/65">
                {c.addOns}
              </span>
              <span className="text-[16px] font-semibold">{x.addOns}</span>
              <span className="text-[13px] text-ink/75">{x.addOnsNote}</span>
            </div>
            {x.helpsWith.length ? (
              <div className="flex flex-col gap-2.5 rounded-card border border-border p-6">
                <span className="text-[13px] font-semibold text-muted">
                  {c.helpsWith}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {x.helpsWith.map((h) => (
                    <SmartLink
                      key={h}
                      to="concerns"
                      className="rounded-chip border border-border bg-raised px-3 py-1.5 text-[13px] font-medium hover:border-sky"
                    >
                      {h}
                    </SmartLink>
                  ))}
                </div>
                <span className="text-[13px] text-muted">{c.confirm}</span>
              </div>
            ) : null}
          </div>
        </Section>
      ) : (
        <Section>
          <p className="pretty max-w-[640px] text-[17px] leading-[1.55] text-secondary">
            {c.pending}
          </p>
        </Section>
      )}

      <Faq
        title={`Questions about the ${d.t.replace(/ drip$/i, "")} drip`}
        items={faq}
      />

      <InfusionSmallPrint extra={infusionCopy.wellnessNote} />
      <InfusionBand />
    </>
  );
}
