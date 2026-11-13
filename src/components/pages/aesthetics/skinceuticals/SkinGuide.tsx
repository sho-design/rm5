import { Display, Eyebrow, Section } from "@/components/ui";
import { scApply, scSteps, scVitC } from "@/content/aes-skinceuticals";
import { skinProduct } from "@/content/skincare";

const stepTint = [
  "var(--rm-sky-soft)",
  "var(--rm-lilac-tint)",
  "var(--rm-sun-tint)",
];

/** Cleanse, correct, protect: the three jobs of a routine, for someone new to skincare. */
export function CleanseCorrectProtect() {
  return (
    <Section id="routine-steps" className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow tone="inherit" className="text-lilac-text">
          {scSteps.eyebrow}
        </Eyebrow>
        <Display size="sm">{scSteps.title}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">
          {scSteps.lead}
        </p>
      </div>
      <ol className="grid grid-cols-1 gap-card md:grid-cols-3">
        {scSteps.items.map((s, i) => (
          <li
            key={s.k}
            className="relative flex flex-col gap-3 overflow-hidden rounded-card p-6 md:p-7"
            style={{ background: stepTint[i] }}
          >
            <span
              aria-hidden
              className="font-display text-[56px] font-medium leading-none tracking-[-.03em] text-ink/15"
            >
              {s.n}
            </span>
            <h3 className="font-display text-[24px] font-medium leading-[1.1]">
              {s.t}
            </h3>
            <p className="pretty text-[15px] leading-[1.5] text-ink-2">{s.d}</p>
            <span className="mt-auto text-[13px] font-semibold text-ink-2">
              {s.eg}
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** How to apply, plus the vitamin C serum comparison table. */
export function ApplyAndCompare() {
  return (
    <Section
      id="how-to-apply"
      className="grid scroll-mt-24 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {scApply.eyebrow}
          </Eyebrow>
          <Display size="2xs">{scApply.title}</Display>
        </div>
        <ol className="flex flex-col gap-3">
          {scApply.steps.map((s, i) => (
            <li
              key={s.t}
              className="flex gap-3.5 rounded-[16px] border border-border bg-card p-4"
            >
              <span
                aria-hidden
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lilac-deep text-[13px] font-semibold text-white"
              >
                {i + 1}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[16px] font-semibold">{s.t}</span>
                <span className="pretty text-[14px] leading-[1.5] text-secondary">
                  {s.d}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {scVitC.eyebrow}
          </Eyebrow>
          <Display size="2xs">{scVitC.title}</Display>
          <p className="pretty text-[15px] leading-[1.55] text-secondary">
            {scVitC.lead}
          </p>
        </div>
        <div className="overflow-x-auto rounded-[20px] border border-border">
          <table className="w-full min-w-[520px] border-collapse text-left text-[14px] leading-[1.45]">
            <caption className="sr-only">{scVitC.caption}</caption>
            <thead className="bg-lilac-tint">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  {scVitC.cols.name}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  {scVitC.cols.suits}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  {scVitC.cols.what}
                </th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">
                  {scVitC.cols.price}
                </th>
              </tr>
            </thead>
            <tbody>
              {scVitC.rows.map((r) => {
                const p = skinProduct(r.id);
                return (
                  <tr key={r.id} className="border-t border-border align-top">
                    <th scope="row" className="px-4 py-3 font-semibold">
                      <a href={`#${p.id}`} className="hover:underline">
                        {p.name}
                      </a>
                    </th>
                    <td className="px-4 py-3">{r.suits}</td>
                    <td className="px-4 py-3 text-secondary">{p.d}</td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      ${p.srp}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <span className="text-[13px] text-muted">{scVitC.priceNote}</span>
      </div>
    </Section>
  );
}
