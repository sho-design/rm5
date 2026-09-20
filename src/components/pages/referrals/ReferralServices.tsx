import { Display, Grid } from "@/components/ui";
import { referralsPage, type RefService } from "@/content/referrals";

function ServiceCard({ r }: { r: RefService }) {
  return (
    <article className="flex flex-col gap-3.5 rounded-card-sm border border-border p-5 md:p-[26px]" style={{ background: r.tint }}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="display-tight text-[26px] leading-[1.05] tracking-[-.02em]">{r.title}</h3>
        <span className="shrink-0 whitespace-nowrap rounded-chip bg-white px-2.5 py-[5px] text-[12px] font-semibold">{r.lead}</span>
      </div>
      <p className="text-[14px] leading-[1.5] text-muted">{r.p}</p>
      <ul className="flex flex-col gap-1.5 border-t border-ink/8 pt-1.5 text-[14px] leading-[1.4]">
        {r.items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <span aria-hidden className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-ink" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-0.5 pt-1.5 text-[13px]">
        <span className="font-semibold">{referralsPage.includeLabel}</span>
        <span className="leading-[1.45] text-muted">{r.include}</span>
      </div>
      <p className="text-[13px] text-muted">
        <strong className="font-semibold text-ink">{referralsPage.coverageLabel}</strong> {r.coverage}
      </p>
    </article>
  );
}

/** "What we accept referrals for": three tinted service cards. */
export function ReferralServices({ services }: { services: RefService[] }) {
  return (
    <section className="flex flex-col gap-5 px-4 pt-10 md:px-content md:pt-12">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
        <Display size="2xs">{referralsPage.servicesTitle}</Display>
        <span className="text-[14px] text-muted">{referralsPage.servicesNote}</span>
      </div>
      <Grid cols={3}>
        {services.map((r) => (
          <ServiceCard key={r.title} r={r} />
        ))}
      </Grid>
    </section>
  );
}
