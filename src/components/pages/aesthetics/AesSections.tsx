import { aesConcerns, aesCopy as c } from "@/content/aesthetics-menu";
import { Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import { routes } from "@/lib/routes";

/** "Start with what you notice.": nine concerns, each opening the menu filtered to it. */
export function AesConcerns({ title = c.concernsTitle }: { title?: string }) {
  return (
    <Section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Eyebrow>{c.concernsEyebrow}</Eyebrow>
        <Display size="sm">{title}</Display>
        <p className="pretty max-w-[640px] text-[16px] leading-[1.55] text-secondary">{c.concernsLead}</p>
      </div>
      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {aesConcerns.map((x) => (
          <li key={x.k}>
            <SmartLink
              to={`${routes.aesMenu}?concern=${x.k}#menu`}
              className="group flex h-full items-center justify-between gap-4 rounded-card-sm border border-border bg-card px-5 py-4 transition-colors hover:border-lilac"
            >
              <span className="flex flex-col gap-1">
                <span className="text-[16px] font-semibold">{x.t}</span>
                <span className="text-[13px] leading-[1.45] text-muted">{x.d}</span>
              </span>
              <span aria-hidden className="text-[18px] text-muted motion-safe:transition-transform group-hover:translate-x-1">
                ›
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** The devices and product lines the clinic names, as a quiet strip. */
export function AesTools() {
  return (
    <Section tight className="flex flex-col gap-3">
      <span className="text-[13px] font-semibold text-muted">{c.toolsTitle}</span>
      <ul className="flex flex-wrap gap-2">
        {c.tools.map((t) => (
          <li key={t} className="rounded-chip border border-border bg-card px-3.5 py-1.5 text-[14px] font-semibold">
            {t}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** "Screened first, treated second.": who we screen out, what to expect, downtime, how long it lasts. */
export function AesCandidacy() {
  return (
    <Section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Eyebrow>{c.candidacyEyebrow}</Eyebrow>
        <Display size="sm">{c.candidacyTitle}</Display>
        <p className="pretty max-w-[640px] text-[16px] leading-[1.55] text-secondary">{c.candidacyLead}</p>
      </div>
      <div className="grid grid-cols-1 gap-card md:grid-cols-2">
        {c.candidacy.map((b, i) => (
          <div key={b.t} className="flex gap-4 rounded-card bg-raised p-6">
            <span className="font-display text-[28px] font-medium leading-none text-muted">{i + 1}</span>
            <span className="flex flex-col gap-2">
              <span className="text-[17px] font-semibold">{b.t}</span>
              <span className="pretty text-[15px] leading-[1.55] text-secondary">{b.d}</span>
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
