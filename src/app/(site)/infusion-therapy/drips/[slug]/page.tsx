import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, Display, Section, SmartLink } from "@/components/ui";
import { EvidenceChip, InfusionBand, InfusionSmallPrint, NumberedCards } from "@/components/pages/infusion/InfusionBits";
import { divisions } from "@/content/divisions";
import { dripBySlug, dripFamilies, infusionCopy, infusionSteps, ingredients, signatureDrips } from "@/content/infusion-site";
import { bookFor, dripRoute } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

type Params = { params: Promise<{ slug: string }> };
const c = infusionCopy.drip;

export const dynamicParams = false;
export function generateStaticParams() {
  return signatureDrips.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const d = dripBySlug((await params).slug);
  if (!d) return {};
  return pageMetadata(dripRoute(d.slug), {
    title: `${d.t} drip`,
    description: `${d.d} ${d.f}, about 45 minutes, physician-reviewed and nurse-administered at Restoration Medical in Thornhill.`,
    // Drips without full page copy stay out of search until the clinic supplies it.
    robots: d.detail ? undefined : { index: false, follow: true },
  });
}

export default async function DripPage({ params }: Params) {
  const d = dripBySlug((await params).slug);
  if (!d) notFound();
  const x = d.detail;
  const facts = [c.time, c.elective, ...(x?.screen ? [x.screen] : [])];
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          [divisions.infusion.label, "/infusion-therapy"],
          ["Drips", "/infusion-therapy/drips"],
          [d.t, dripRoute(d.slug)],
        ])}
      />
      <section className="mx-3 mt-3 flex flex-col gap-6 rounded-block p-6 md:mx-gutter md:mt-6 md:p-10 lg:p-12" style={{ background: "var(--div-infusion)" }}>
        <span className="eyebrow text-[color:var(--div-infusion-accent)]">
          <SmartLink to="infusion">{divisions.infusion.label}</SmartLink> › <SmartLink to="drips">{c.back}</SmartLink>
        </span>
        <span className="flex items-center gap-2 text-[13px] font-semibold">
          <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: dripFamilies[d.f] }} />
          {d.f}, IV drip
          <EvidenceChip ev={d.ev} />
        </span>
        <Display as="h1" size="xl">
          {d.t}
        </Display>
        <p className="pretty max-w-[640px] text-[17px] leading-[1.5] text-secondary lg:text-[19px]">{d.d}</p>
        <div className="flex flex-wrap gap-2">
          {facts.map((f) => (
            <span key={f} className="rounded-chip bg-white/80 px-3.5 py-2 text-[13px] font-semibold">
              {f}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button to={bookFor("infusion")}>{infusionCopy.band.cta}</Button>
          <Button to="infusionHow" variant="outline">
            {infusionCopy.band.cta2}
          </Button>
        </div>
      </section>

      {x ? (
        <Section className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Display size="2xs">{c.whatItIs}</Display>
              <p className="pretty text-[16px] leading-[1.6] text-secondary">{x.whatItIs}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Display size="2xs">{c.supports}</Display>
              <ul className="flex flex-col gap-2 text-[16px] leading-[1.5] text-secondary">
                {x.supports.map((s) => (
                  <li key={s} className="flex gap-2.5">
                    <span aria-hidden className="text-sage-deep">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Display size="2xs">{c.expect}</Display>
              <p className="pretty text-[16px] leading-[1.6] text-secondary">{x.expect}</p>
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
                      {ing ? <span className="text-[13px] text-muted">{ing.d}</span> : null}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col gap-1.5 rounded-card bg-sun-soft p-6 text-ink">
              <span className="text-[13px] font-semibold text-ink/65">{c.addOns}</span>
              <span className="text-[16px] font-semibold">{x.addOns}</span>
              <span className="text-[13px] text-ink/75">{x.addOnsNote}</span>
            </div>
            <div className="flex flex-col gap-2.5 rounded-card border border-border p-6">
              <span className="text-[13px] font-semibold text-muted">{c.helpsWith}</span>
              <div className="flex flex-wrap gap-1.5">
                {x.helpsWith.map((h) => (
                  <SmartLink key={h} to="concerns" className="rounded-chip border border-border bg-raised px-3 py-1.5 text-[13px] font-medium hover:border-sky">
                    {h}
                  </SmartLink>
                ))}
              </div>
              <span className="text-[13px] text-muted">{c.confirm}</span>
            </div>
          </div>
        </Section>
      ) : (
        <Section className="flex flex-col gap-6">
          <p className="pretty max-w-[640px] text-[17px] leading-[1.55] text-secondary">{c.pending}</p>
          <NumberedCards items={infusionSteps} />
        </Section>
      )}

      <InfusionSmallPrint extra={infusionCopy.wellnessNote} />
      <InfusionBand />
    </>
  );
}
