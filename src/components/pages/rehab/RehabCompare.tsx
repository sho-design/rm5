import { Display, Section, SmartLink } from "@/components/ui";
import { rehabCompare as c } from "@/content/rehab-compare";

/** Physio and chiro side by side, with the price and an "initial assessment" way out for anyone unsure. */
export function RehabCompare({ current }: { current: string }) {
  return (
    <Section className="flex flex-col gap-5" aria-labelledby="rehab-compare">
      <div className="flex flex-col gap-2">
        <Display size="xs" id="rehab-compare">
          {c.title}
        </Display>
        <p className="pretty max-w-[640px] text-[16px] leading-[1.55] text-secondary">{c.lead}</p>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {c.cols.map((col) => (
          <div key={col.t} className="flex flex-col gap-3 rounded-card-sm border border-border bg-card px-5 py-5">
            <h3 className="text-[18px] font-semibold">
              {col.page === current ? (
                col.t
              ) : (
                <SmartLink to={col.page} className="text-link underline-offset-2 hover:underline">
                  {col.t} ›
                </SmartLink>
              )}
            </h3>
            <dl className="flex flex-col gap-2.5 text-[15px] leading-[1.5]">
              {c.rows.map((row, i) => (
                <div key={row} className="flex flex-col gap-0.5">
                  <dt className="text-[13px] font-semibold text-muted">{row}</dt>
                  <dd>{col.cells[i]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <p className="pretty max-w-[640px] text-[15px] leading-[1.55] text-secondary">{c.price}</p>
      <p className="pretty max-w-[640px] text-[15px] leading-[1.55] text-ink">
        {c.notSure}{" "}
        <SmartLink to={c.ctaPage} className="font-semibold text-link underline-offset-2 hover:underline">
          {c.cta} ›
        </SmartLink>
      </p>
    </Section>
  );
}
