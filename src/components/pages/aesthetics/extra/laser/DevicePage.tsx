import Image from "next/image";
import {
  CtaBand,
  Display,
  Eyebrow,
  Faq,
  Section,
  SmartLink,
  SubPageHero,
} from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { laserDevices, type LaserDevice } from "@/content/aes-laser";
import {
  deviceConcerns,
  deviceCopy as c,
  deviceFaq,
  devicePath,
  devicePhotos,
  deviceSeo,
} from "@/content/aes-laser-devices";
import { divisionAccent, divisionTint, divisions } from "@/content/divisions";
import { topics } from "@/content/topics";
import { breadcrumbs, faqPage } from "@/lib/schema";
import { bookFor, href, routes } from "@/lib/routes";
import { site } from "@/content/site";
import { LightTarget } from "./LightTarget";
import { SafetyCare } from "./LaserGuide";

/**
 * One laser or energy device (November 2026): what it is, the facts at a glance, the "How light finds its target"
 * picture set to this device, the concerns it is often considered for, the clinic's own before and after photos
 * (only once added, with consent), safety and care, questions, and the other devices.
 */
export function DevicePage({ d }: { d: LaserDevice }) {
  const laser = topics.find((t) => t.key === "aesLaser");
  const book = bookFor("aesthetics", "laser");
  const facts = [
    {
      k: c.usedFor,
      v: d.usedFor
        .map((u, i) => (i ? u.charAt(0).toLowerCase() + u.slice(1) : u))
        .join(", "),
    },
    { k: c.feels, v: d.feels },
    { k: c.downtime, v: d.downtime },
    { k: c.sessions, v: d.sessions },
  ];
  const concerns = deviceConcerns(d.k);
  const photos = devicePhotos[d.k];
  const faq = deviceFaq(d);
  const others = laserDevices.filter((o) => o.k !== d.k);
  const path = devicePath(d.k);
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          [divisions.aesthetics.label, href("aesthetics")],
          ["Laser", href("aesLaser")],
          [d.name, path],
        ])}
      />
      <JsonLd data={faqPage(faq)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          name: d.name,
          alternateName: d.kind,
          description: deviceSeo[d.k].description,
          procedureType: "https://schema.org/NoninvasiveProcedure",
          url: `${site.url}${path}`,
          howPerformed: d.plain,
        }}
      />
      <SubPageHero
        crumb="Laser"
        crumbTo="aesLaser"
        page={d.name}
        title={d.name}
        lead={d.plain}
        cta={c.book}
        ctaTo={book}
        tint={divisionTint.aesthetics}
        accent={divisionAccent.aesthetics}
        img={laser?.img ?? ""}
        imgAlt={laser?.imgAlt ?? ""}
        pills={[d.kind]}
      />

      <Section className="flex flex-col gap-6">
        <Display size="xs">{c.factsTitle}</Display>
        <dl className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {facts.map((f) => (
            <div
              key={f.k}
              className="flex flex-col gap-1 rounded-card bg-lilac-tint px-5 py-4"
            >
              <dt className="text-[13px] font-semibold text-lilac-text">
                {f.k}
              </dt>
              <dd className="pretty text-[16px] leading-[1.5]">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <LightTarget start={d.k} />

      {concerns.length ? (
        <Section className="flex flex-col gap-4">
          <Display size="2xs">{c.concernsTitle}</Display>
          <ul className="flex flex-wrap gap-2">
            {concerns.map((t) => (
              <li
                key={t}
                className="rounded-chip border border-border bg-card px-4 py-2 text-[15px] font-medium"
              >
                {t}
              </li>
            ))}
          </ul>
          <p className="pretty text-[14px] leading-[1.5] text-muted">
            {c.concernsNote}
          </p>
        </Section>
      ) : null}

      {/* The clinic's own photos, only once added with written consent (content/aes-laser-devices.ts). */}
      {photos.length ? (
        <Section className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Display size="2xs">{c.photosTitle}</Display>
            <p className="pretty text-[14px] leading-[1.5] text-muted">
              {c.photosNote}
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-card md:grid-cols-2">
            {photos.map((p) => (
              <li key={p.before} className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-1.5 overflow-hidden rounded-card">
                  {[p.before, p.after].map((src, i) => (
                    <div key={src} className="relative aspect-[4/5]">
                      <Image
                        src={src}
                        alt={`${p.alt}, ${i ? "after" : "before"}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                      <span className="absolute left-2 top-2 rounded-chip bg-white/92 px-2.5 py-1 text-[13px] font-semibold text-ink">
                        {i ? "After" : "Before"}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="pretty text-[13px] leading-[1.45] text-muted">
                  {p.caption}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <SafetyCare />

      <Faq title={`${c.faqTitle} ${d.name}`} items={faq} />

      <Section className="flex flex-col gap-5">
        <Eyebrow tone="inherit" className="text-lilac-text">
          {c.othersTitle}
        </Eyebrow>
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <li key={o.k}>
              <SmartLink
                to={devicePath(o.k)}
                className="flex min-h-[64px] items-center justify-between gap-3 rounded-row border border-border bg-card px-5 py-3 transition-colors hover:border-ink"
              >
                <span className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-2 text-[16px] font-semibold">
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: o.color }}
                    />
                    {o.name}
                  </span>
                  <span className="text-[13px] text-muted">{o.kind}</span>
                </span>
                <span aria-hidden className="text-[18px] text-link">
                  ›
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
        <SmartLink
          to={routes.aesLaser}
          className="w-fit text-[15px] font-semibold text-link"
        >
          {c.allDevices} ›
        </SmartLink>
      </Section>

      <CtaBand
        title={divisions.aesthetics.footCta ?? c.book}
        cta={c.book}
        ctaTo={book}
      />
    </>
  );
}
