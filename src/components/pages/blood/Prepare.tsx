import { Display, Eyebrow, Section } from "@/components/ui";
import { bloodPrep as c } from "@/content/subpages";
import { site } from "@/content/site";

/**
 * How to prepare for tests: the four fasting rules with the tests under each (filled from the lab's list), what to
 * do on the day, the ECG, urine samples, and the lab team's email for anything else.
 */
export function Prepare({ accent }: { accent: string }) {
  return (
    <Section id="prepare" className="flex scroll-mt-28 flex-col gap-6">
      <div className="flex max-w-[720px] flex-col gap-2">
        <Eyebrow tone="inherit" style={{ color: accent }}>
          {c.eyebrow}
        </Eyebrow>
        <Display size="xs">{c.title}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.lead}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-[17px] font-semibold">{c.fastingTitle}</h3>
        <p className="pretty max-w-[720px] text-[15px] leading-[1.5] text-secondary">{c.fastingMeans}</p>
        <ul className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-4">
          {c.fasting.map((f) => (
            <li key={f.k} className="flex flex-col gap-3 rounded-card-sm border border-border p-6 text-ink" style={{ background: f.bg }}>
              <span className="display text-[24px] leading-[1.05] tracking-[-.02em]">{f.t}</span>
              <span className="pretty text-[14px] font-semibold leading-[1.45]">{f.rule}</span>
              {f.tests.length ? (
                <ul className="flex flex-col gap-1 text-[14px] leading-[1.45] text-secondary">
                  {f.tests.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span aria-hidden>•</span>
                      {t}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-[13px] text-secondary">{c.noList}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-card md:grid-cols-2 xl:grid-cols-4">
        {[
          [c.dayTitle, c.day],
          [c.ecgTitle, c.ecg],
          [c.urineTitle, c.urine],
        ].map(([t, items]) => (
          <div key={t as string} className="flex flex-col gap-3 rounded-card border border-border bg-card p-6">
            <h3 className="text-[17px] font-semibold">{t as string}</h3>
            <ul className="flex flex-col gap-2 text-[15px] leading-[1.5] text-secondary">
              {(items as string[]).map((x) => (
                <li key={x} className="flex gap-2.5">
                  <span aria-hidden style={{ color: accent }}>
                    ✓
                  </span>
                  <span className="pretty">{x}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col gap-3 rounded-card bg-inverse p-6 text-on-inverse">
          <h3 className="text-[17px] font-semibold">{c.askTitle}</h3>
          <p className="pretty text-[15px] leading-[1.5] text-white/80">{c.ask}</p>
          <a href={`mailto:${site.labEmail}`} className="mt-auto w-fit break-all text-[16px] font-semibold text-sun hover:underline">
            {site.labEmail}
          </a>
        </div>
      </div>
    </Section>
  );
}
