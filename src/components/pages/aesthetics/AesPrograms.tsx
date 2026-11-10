import { Display, Eyebrow, Section, SmartLink, TextLink } from "@/components/ui";
import { aesPrograms, combinedPlans, programsCopy as c, regimens } from "@/content/programs";
import { bookFor } from "@/lib/routes";

/** The aesthetics programs: each a short, ordered list of treatments with a typical length, priced at the consult. */
export function AesPrograms() {
  return (
    <Section id="programs" className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow>{c.aesEyebrow}</Eyebrow>
        <Display size="sm">{c.aesTitle}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.aesLead}</p>
      </div>
      <ul className="grid grid-cols-1 gap-card sm:grid-cols-2 xl:grid-cols-4">
        {aesPrograms.map((p) => (
          <li key={p.k} id={`program-${p.k}`} className="flex scroll-mt-24 flex-col gap-4 rounded-card border border-border bg-card p-6">
            <div className="flex flex-col gap-1.5">
              <span aria-hidden className="h-1.5 w-10 rounded-full" style={{ background: p.color }} />
              <h3 className="font-display text-[22px] font-medium leading-[1.15] tracking-[-.01em]">{p.t}</h3>
              <span className="pretty text-[14px] leading-[1.45] text-secondary">
                <span className="font-semibold text-primary">{c.forLabel}: </span>
                {p.forWhom}
              </span>
            </div>
            <ol className="flex flex-col gap-2.5">
              {p.steps.map((s, i) => (
                <li key={s} className="flex gap-3 text-[14px] leading-[1.45]">
                  <span aria-hidden className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lilac-tint text-[12px] font-semibold text-lilac-deep">
                    {i + 1}
                  </span>
                  <span className="pretty pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-auto flex flex-col gap-1 border-t border-border pt-3 text-[13px]">
              <span>
                <span className="font-semibold">{c.lengthLabel}: </span>
                {p.length}
              </span>
              <span className="text-muted">{c.priceNote}</span>
            </div>
            <SmartLink to={bookFor("aesthetics", "consult")} className="w-fit">
              <TextLink>{c.book}</TextLink>
            </SmartLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Plans that start in Family Medicine or rehab and carry on into drips or aesthetics. Used on infusion pricing. */
export function CombinedPlans() {
  return (
    <Section id="combined" className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow>{c.combinedEyebrow}</Eyebrow>
        <Display size="xs">{c.combinedTitle}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.combinedLead}</p>
      </div>
      <ul className="grid grid-cols-1 gap-card md:grid-cols-2 xl:grid-cols-3">
        {combinedPlans.map((p) => (
          <li key={p.k} className="flex flex-col gap-3 rounded-card bg-raised p-6">
            <h3 className="font-display text-[21px] font-medium leading-[1.15]">{p.t}</h3>
            <dl className="flex flex-col gap-2.5 text-[14px] leading-[1.45]">
              {(
                [
                  [c.startLabel, p.start],
                  [c.thenLabel, p.then],
                  [c.upkeepLabel, p.upkeep],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5">
                  <dt className="text-[12px] font-semibold uppercase tracking-[.1em] text-muted">{k}</dt>
                  <dd className="pretty">{v}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** SkinCeuticals home regimens with suggested retail prices. Used on the skin health plans page. */
export function SkinRegimens() {
  return (
    <Section id="regimens" className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow>{c.regEyebrow}</Eyebrow>
        <Display size="xs">{c.regTitle}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.regLead}</p>
      </div>
      <ul className="grid grid-cols-1 gap-card md:grid-cols-2 xl:grid-cols-3">
        {regimens.map((r) => {
          const total = r.items.reduce((s, [, p]) => s + p, 0);
          return (
            <li key={r.k} className="flex flex-col gap-4 rounded-card bg-lilac-tint p-6">
              <h3 className="font-display text-[21px] font-medium leading-[1.15]">{r.t}</h3>
              <ul className="flex flex-col gap-1.5 text-[14px]">
                {r.items.map(([name, price]) => (
                  <li key={name} className="flex items-baseline gap-2">
                    <span className="pretty">{name}</span>
                    <span aria-hidden className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-ink-3" />
                    <span className="shrink-0 tabular-nums">${price}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-1 text-[14px]">
                <span className="flex items-baseline justify-between font-semibold">
                  <span>{c.regTotal}</span>
                  <span className="tabular-nums">${total}</span>
                </span>
                <span className="text-[13px] text-secondary">
                  {c.regPairs}: {r.pairs}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="pretty max-w-[720px] text-[13px] leading-[1.5] text-muted">{c.regNote}</p>
    </Section>
  );
}
