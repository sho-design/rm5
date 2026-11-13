import type { CSSProperties } from "react";
import {
  Display,
  Eyebrow,
  Section,
  SmartLink,
  TextLink,
} from "@/components/ui";
import {
  aesPrograms,
  combinedPlans,
  programsCopy,
  regimens,
} from "@/content/programs";
import { skinProduct } from "@/content/skincare";
import { bookFor, routes } from "@/lib/routes";

/** The aesthetics programs: each a short, ordered list of treatments with a typical length, priced at the consult. */
export function AesPrograms({
  programs = aesPrograms,
  c = programsCopy,
  bookTo = bookFor("aesthetics", "consult"),
  eventPlan = false,
  routines = regimens,
  routinesAt = routes.aesPlans,
}: {
  programs?: typeof aesPrograms;
  c?: typeof programsCopy;
  bookTo?: string;
  eventPlan?: boolean;
  /** Regimens for the "Home routine" link, and where they live (another page in English, this page in Vietnamese). */
  routines?: typeof regimens;
  routinesAt?: string;
}) {
  return (
    <Section id="programs" className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow>{c.aesEyebrow}</Eyebrow>
        <Display size="sm">{c.aesTitle}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">
          {c.aesLead}
        </p>
      </div>
      {/* Card motion: lift, the step line fills in the program colour, the dots fill, the button darkens.
          Hover or keyboard focus inside the card; off with reduced motion; full strength in high contrast. */}
      <style>{`
        .pg-card { transition: transform 300ms cubic-bezier(.2,.8,.2,1), box-shadow 300ms cubic-bezier(.2,.8,.2,1), border-color 300ms; }
        .pg-card:hover, .pg-card:focus-within { transform: translateY(-4px); box-shadow: 0 14px 34px rgba(15,31,46,.10); border-color: var(--p); }
        .pg-fill { transform: scaleY(0); transform-origin: top; transition: transform 500ms cubic-bezier(.2,.8,.2,1); }
        .pg-card:hover .pg-fill, .pg-card:focus-within .pg-fill { transform: scaleY(1); }
        .pg-dot { transition: background-color 250ms, color 250ms; }
        .pg-card:hover .pg-dot, .pg-card:focus-within .pg-dot { background: var(--p); color: var(--rm-ink); }
        .pg-card:hover .pg-dot, .pg-card:focus-within .pg-dot { transition-delay: calc(var(--i) * 120ms); }
        .pg-cta { transition: background-color 250ms, color 250ms, border-color 250ms; }
        .pg-card:hover .pg-cta { background: var(--action-primary-bg); color: var(--action-primary-fg); border-color: transparent; }
        .pg-arrow { display: inline-block; transition: transform 250ms cubic-bezier(.2,.8,.2,1); }
        .pg-card:hover .pg-arrow, .pg-cta:focus-visible .pg-arrow { transform: translateX(4px); }
        @media (prefers-reduced-motion: reduce) {
          .pg-card, .pg-fill, .pg-dot, .pg-arrow { transition: none; }
          .pg-card:hover, .pg-card:focus-within { transform: none; }
        }
        :root[data-theme="contrast"] .pg-card { border: 2px solid var(--rm-ink); }
        :root[data-theme="contrast"] .pg-head { background: transparent !important; border-bottom: 2px solid var(--rm-ink); }
      `}</style>
      <ul className="grid grid-cols-1 gap-card sm:grid-cols-2 xl:grid-cols-4">
        {programs.map((p) => (
          <li
            key={p.k}
            id={`program-${p.k}`}
            className="pg-card flex scroll-mt-24 flex-col overflow-hidden rounded-card border border-border bg-card"
            style={{ "--p": p.color } as CSSProperties}
          >
            {/* Header, washed in the program colour. */}
            <div
              className="pg-head flex flex-col gap-2 px-6 pb-5 pt-5"
              style={{
                background: `linear-gradient(160deg, color-mix(in srgb, ${p.color} 30%, var(--surface-card)), color-mix(in srgb, ${p.color} 8%, var(--surface-card)))`,
              }}
            >
              <span className="flex w-fit items-center gap-1.5 rounded-chip bg-[color:color-mix(in_srgb,var(--surface-card)_80%,transparent)] px-2.5 py-1 text-[13px] font-semibold">
                <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="8" cy="8" r="6.2" />
                  <path d="M8 4.6V8l2.3 1.5" />
                </svg>
                <span className="sr-only">{c.lengthLabel}: </span>
                {p.length}
              </span>
              <h3 className="font-display text-[24px] font-medium leading-[1.1] tracking-[-.01em]">
                {p.t}
              </h3>
              <span className="pretty text-[14px] leading-[1.45] text-secondary">
                <span className="font-semibold text-primary">
                  {c.forLabel}:{" "}
                </span>
                {p.forWhom}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-5 px-6 pb-6 pt-5">
              {/* The steps in order, joined by a line that fills in the program colour. */}
              <ol className="relative flex flex-col gap-3.5">
                <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-0.5 rounded-full bg-[color:var(--border-default)]" />
                <span aria-hidden className="pg-fill absolute bottom-3 left-[11px] top-3 w-0.5 rounded-full" style={{ background: p.color }} />
                {p.steps.map((s, i) => (
                  <li key={s} className="relative flex gap-3 text-[14px] leading-[1.45]">
                    <span
                      aria-hidden
                      className="pg-dot grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 bg-card text-[12px] font-bold text-primary"
                      style={{ borderColor: p.color, "--i": i } as CSSProperties}
                    >
                      {i + 1}
                    </span>
                    <span className="pretty pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-auto flex flex-col gap-3">
                <span className="text-[13px] text-muted">{c.priceNote}</span>
                {/* The program name rides along as the booking reason, so the nurse knows before the consult. */}
                <SmartLink
                  to={`${bookTo}&reason=${encodeURIComponent(c.reason(p.t))}`}
                  className="pg-cta flex min-h-[44px] w-full items-center justify-between rounded-chip border border-[color:var(--border-default)] px-4 text-[14px] font-semibold"
                  aria-label={`${c.book}: ${p.t}`}
                >
                  {c.book}
                  <span aria-hidden className="pg-arrow text-[16px]">›</span>
                </SmartLink>
                {p.regimen || (eventPlan && p.k === "event") ? (
                  <span className="flex flex-col gap-1">
                    {p.regimen ? (
                      <a href={`${routinesAt}#regimen-${p.regimen}`} className="w-fit text-[14px]">
                        <TextLink>{c.routine(routines.find((r) => r.k === p.regimen)?.t ?? "")}</TextLink>
                      </a>
                    ) : null}
                    {eventPlan && p.k === "event" ? (
                      <a href="#event-plan" className="w-fit text-[14px]">
                        <TextLink>{c.eventLink}</TextLink>
                      </a>
                    ) : null}
                  </span>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Plans that start in Family Medicine or rehab and carry on into drips or aesthetics. Used on infusion pricing. */
export function CombinedPlans({
  plans = combinedPlans,
  c = programsCopy,
}: {
  plans?: typeof combinedPlans;
  c?: typeof programsCopy;
}) {
  return (
    <Section id="combined" className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow>{c.combinedEyebrow}</Eyebrow>
        <Display size="xs">{c.combinedTitle}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">
          {c.combinedLead}
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-card md:grid-cols-2 xl:grid-cols-3">
        {plans.map((p) => (
          <li
            key={p.k}
            className="flex flex-col gap-3 rounded-card border border-border bg-card p-6"
          >
            <h3 className="font-display text-[21px] font-medium leading-[1.15]">
              {p.t}
            </h3>
            <dl className="flex flex-col gap-2.5 text-[14px] leading-[1.45]">
              {(
                [
                  [c.startLabel, p.start],
                  [c.thenLabel, p.then],
                  [c.upkeepLabel, p.upkeep],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5">
                  <dt className="text-[13px] font-semibold text-muted">
                    {k}
                  </dt>
                  <dd className="pretty">{v}</dd>
                </div>
              ))}
            </dl>
            <SmartLink to={`${p.to}&reason=${encodeURIComponent(p.t)}`} className="mt-auto w-fit pt-1">
              <TextLink>{p.toLabel}</TextLink>
            </SmartLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** SkinCeuticals home regimens with suggested retail prices. Used on the skin health plans page. */
export function SkinRegimens({
  list = regimens,
  c = programsCopy,
}: {
  list?: typeof regimens;
  c?: typeof programsCopy;
}) {
  return (
    <Section id="regimens" className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow>{c.regEyebrow}</Eyebrow>
        <Display size="xs">{c.regTitle}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">
          {c.regLead}
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-card md:grid-cols-2 xl:grid-cols-3">
        {list.map((r) => {
          const items = r.items.map(skinProduct);
          const total = items.reduce((s, p) => s + p.srp, 0);
          return (
            <li
              key={r.k}
              id={`regimen-${r.k}`}
              className="flex flex-col gap-4 rounded-card bg-lilac-tint p-6"
            >
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-[22px] font-medium leading-[1.15] lg:text-[24px]">
                  {r.t}
                </h3>
                {/* Who it is for, in plain words (Nov 2026: written for someone new to skincare). */}
                <p className="pretty text-[15px] leading-[1.45] text-secondary">{r.why}</p>
              </div>
              <ul className="flex flex-col gap-2.5 text-[14px]">
                {items.map((p) => (
                  <li key={p.id} className="flex flex-col gap-0.5">
                    <span className="flex items-baseline gap-2">
                      <span className="pretty font-semibold">{p.name}</span>
                      <span
                        aria-hidden
                        className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-ink-3"
                      />
                      <span className="shrink-0 tabular-nums">${p.srp}</span>
                    </span>
                    {c.roles[p.id] ? (
                      <span className="pretty text-[13px] leading-[1.4] text-secondary">{c.roles[p.id]}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-1">
                <span className="text-[13px] font-semibold text-lilac-text">{c.regHow}</span>
                <p className="pretty text-[14px] leading-[1.5]">{r.how}</p>
              </div>
              {/* The order to use them, morning and night (round 28 follow-up). */}
              <div
                className="flex flex-col gap-2 rounded-[14px] bg-white/70 p-3.5"
                role="group"
                aria-label={c.regOrder}
              >
                {(
                  [
                    [c.regAm, r.am],
                    [c.regPm, r.pm],
                  ] as const
                ).map(([label, ids]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-[13px] font-semibold text-muted">
                      {label}
                    </span>
                    {ids.length ? (
                      <ol className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] leading-[1.4]">
                        {ids.map((id, n) => (
                          <li key={id} className="flex items-baseline gap-1.5">
                            <span
                              aria-hidden
                              className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-lilac-deep text-[12px] font-semibold text-white"
                            >
                              {n + 1}
                            </span>
                            {skinProduct(id).name}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <span className="text-[13px] leading-[1.4]">
                        {c.regPmNone}
                      </span>
                    )}
                  </div>
                ))}
                {r.note ? (
                  <span className="pretty text-[13px] leading-[1.4] text-secondary">
                    {r.note}
                  </span>
                ) : null}
              </div>
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
      <div className="flex flex-col gap-2">
        <SmartLink
          to={routes.aesSkincare}
          className="w-fit"
          hrefLang={c === programsCopy ? undefined : "en-CA"}
        >
          <TextLink className="text-[15px]">{c.seeAll}</TextLink>
        </SmartLink>
        <p className="pretty max-w-[62ch] text-[13px] leading-[1.5] text-muted">
          {c.regNote}
        </p>
      </div>
    </Section>
  );
}
