import { Display, Section } from "@/components/ui";

/** Numbered steps, three across on desktop. */
export function ViSteps({ title, steps }: { title: string; steps: { t: string; d: string }[] }) {
  return (
    <Section className="flex flex-col gap-6">
      <Display size="sm">{title}</Display>
      <ol className="grid grid-cols-1 gap-card md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.t} className="rm-rise flex gap-4 rounded-card border border-border bg-card p-6" style={{ animationDelay: `${i * 80}ms` }}>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-display text-[22px] text-white">{i + 1}</span>
            <span className="flex flex-col gap-1">
              <span className="text-[17px] font-semibold">{s.t}</span>
              <span className="pretty text-[15px] leading-[1.55] text-secondary">{s.d}</span>
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** Label and value rows on a tinted card. */
export function ViFacts({ title, rows, tint = "var(--rm-paper-2)" }: { title: string; rows: { k: string; v: string }[]; tint?: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-card p-6 md:p-8" style={{ background: tint }}>
      <span className="text-[17px] font-semibold">{title}</span>
      <dl className="flex flex-col divide-y divide-border">
        {rows.map((r) => (
          <div key={r.k} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <dt className="text-[15px] text-secondary">{r.k}</dt>
            <dd className="text-[15px] font-semibold sm:text-right">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
