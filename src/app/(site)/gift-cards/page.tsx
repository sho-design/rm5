import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, Display, Eyebrow, FactGrid, Section, SubPageHero } from "@/components/ui";
import { divisions, divisionDot } from "@/content/divisions";
import { giftCopy as c } from "@/content/giftcards";
import { images } from "@/content/images";
import { locations, site } from "@/content/site";
import { squareGiftBalanceUrl, squareGiftUrl } from "@/lib/giftcards";

const baseMetadata: Metadata = { title: "Gift cards", description: `${c.title} ${c.lead}` };

export async function generateMetadata() {
  return pageMetadata("aesGift", baseMetadata);
}

/** Clinic-wide gift cards: buy and check a balance on the clinic's Square pages, use the card for any paid service. */
export default function GiftCardsPage() {
  const div = divisions.about;
  return (
    <>
      <SubPageHero
        crumb="Home"
        crumbTo="home"
        page={c.page}
        title={c.title}
        lead={squareGiftUrl ? c.lead : c.leadDesk}
        cta={squareGiftUrl ? c.buy : c.call}
        ctaTo={squareGiftUrl ?? site.phoneHref}
        cta2={squareGiftUrl && squareGiftBalanceUrl ? c.balance : undefined}
        cta2To={squareGiftBalanceUrl ?? undefined}
        coverage={c.coverage}
        tint={div.tint}
        accent={div.accent}
        img={images.heroFamilyPark}
        imgAlt=""
        pills={c.pills}
      />

      <Section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Display size="sm">{c.useTitle}</Display>
          <p className="pretty max-w-[640px] text-[16px] leading-[1.55] text-secondary">{c.useLead}</p>
        </div>
        <ul className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-4">
          {c.uses.map((u, i) => {
            const d = divisions[u.div as keyof typeof divisions];
            return (
              <li key={u.div} className="rm-rise flex flex-col gap-3 rounded-card p-6" style={{ background: d.tint, animationDelay: `${i * 80}ms` }}>
                <span className="flex items-center gap-2 text-[15px] font-semibold">
                  <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: divisionDot[d.label] ?? "var(--rm-ink)" }} />
                  {u.t}
                </span>
                <span className="pretty text-[15px] leading-[1.5] text-secondary">{u.d}</span>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="flex flex-col gap-6">
        <Display size="sm">{c.howTitle}</Display>
        <ol className="grid grid-cols-1 gap-card md:grid-cols-3">
          {c.how.map((s, i) => (
            <li key={s.t} className="flex gap-4 rounded-card border border-border bg-card p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-display text-[22px] text-white">{i + 1}</span>
              <span className="flex flex-col gap-1">
                <span className="text-[17px] font-semibold">{s.t}</span>
                <span className="pretty text-[15px] leading-[1.5] text-secondary">{s.d}</span>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Eyebrow>{locations[0]?.name ?? "Thornhill"}</Eyebrow>
          <Display size="xs">{c.deskTitle}</Display>
          <span className="text-[15px] text-secondary">{locations[0]?.address ?? ""}</span>
        </div>
        <FactGrid facts={[{ k: "Phone", v: site.phone }, { k: "Email", v: site.email }]} />
      </Section>

      <CtaBand title={c.bandTitle} sub={c.bandSub} cta={squareGiftUrl ? c.buy : c.call} ctaTo={squareGiftUrl ?? site.phoneHref} />
    </>
  );
}
