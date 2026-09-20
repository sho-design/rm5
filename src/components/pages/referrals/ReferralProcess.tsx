import { Button } from "@/components/ui";
import { referralsPage, type RefStep } from "@/content/referrals";

/**
 * Referral form PDF. The clinic supplies the file at public/for-physicians/
 * referral-form.pdf; the prototype button was a placeholder.
 */
const REFERRAL_FORM_PDF = "/for-physicians/referral-form.pdf";

/**
 * "How a referral moves": numbered steps on a paper card left; download
 * card (sun soft) and physicians / good-to-know card (white) stacked right.
 */
export function ReferralProcess({ steps }: { steps: RefStep[] }) {
  const c = referralsPage;
  return (
    <section className="grid grid-cols-1 items-stretch gap-block px-4 pt-10 md:px-content md:pt-12 lg:grid-cols-2">
      <div className="flex flex-col gap-5 rounded-card border border-border bg-card p-6 md:p-8">
        <h2 className="display-tight text-[26px] tracking-[-.02em] lg:text-[30px]">{c.stepsTitle}</h2>
        <ol className="flex flex-col gap-3.5">
          {steps.map((s) => (
            <li key={s.n} className="grid grid-cols-[36px_1fr] items-start gap-3.5">
              <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-[16px] text-white">
                {s.n}
              </span>
              <div className="flex flex-col gap-[3px] pt-1.5">
                <span className="text-[15px] font-semibold">{s.t}</span>
                <span className="text-[14px] leading-[1.5] text-muted">{s.d}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="grid grid-rows-[auto_1fr] gap-block">
        <div className="flex flex-col gap-3.5 rounded-card bg-sun-soft p-6 text-ink md:p-8">
          <h2 className="display-tight text-[26px] leading-[1.05] tracking-[-.02em]">{c.download.title}</h2>
          <p className="text-[14px] leading-[1.5] text-ink/75">{c.download.sub}</p>
          <div className="flex flex-wrap gap-2.5">
            <a href={REFERRAL_FORM_PDF} className="inline-flex items-center justify-center rounded-chip bg-ink px-[22px] py-3 text-[14px] font-semibold leading-none text-white transition-all hover:opacity-90 active:scale-[.98]">
              {c.download.pdf}
            </a>
            <Button to="#refer" variant="inverse" size="sm" className="h-auto px-[22px] py-3 text-[14px]">
              {c.download.upload}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 rounded-card border border-border bg-raised p-6 sm:grid-cols-2 md:p-8">
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-semibold text-muted">{c.physiciansLabel}</span>
            {c.physicians.map((p) => (
              <div key={p.name} className="flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold">{p.name}</span>
                <span className="text-[13px] leading-[1.45] text-muted">{p.d}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-semibold text-muted">{c.goodToKnowLabel}</span>
            <ul className="flex flex-col gap-2 text-[13px] leading-[1.45] text-muted">
              {c.goodToKnow.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
