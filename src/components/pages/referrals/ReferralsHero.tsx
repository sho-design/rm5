import { Display, Eyebrow } from "@/components/ui";
import { referralsPage } from "@/content/referrals";
import { site } from "@/content/site";

/**
 * Referrals header: sky eyebrow, Fraunces 72 H1 and 18px lead on the left,
 * navy contact card (fax, referral line, secure email, also accepted) right.
 */
export function ReferralsHero() {
  const c = referralsPage;
  return (
    <header className="grid grid-cols-1 items-end gap-8 px-4 pt-10 md:px-content md:pt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
      <div className="flex flex-col gap-4">
        <Eyebrow tone="sky">{c.eyebrow}</Eyebrow>
        <Display as="h1" size="lg">
          {c.title}
        </Display>
        <p className="pretty text-[17px] leading-[1.5] text-muted lg:text-[18px]">{c.lead}</p>
      </div>
      <dl className="grid grid-cols-1 gap-5 rounded-card bg-inverse p-6 text-on-inverse sm:grid-cols-[1.25fr_1fr] md:px-8 md:py-7">
        <div className="flex flex-col gap-1">
          <dt className="text-[12px] text-white/60">{c.contactLabels.fax}</dt>
          <dd className="display-tight text-[26px] tracking-[-.02em]">{site.fax}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-[12px] text-white/60">{c.contactLabels.line}</dt>
          <dd>
            <a href={site.phoneHref} className="display-tight text-[26px] tracking-[-.02em] hover:text-sun">
              {site.phone}
            </a>
          </dd>
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <dt className="text-[12px] text-white/60">{c.contactLabels.email}</dt>
          <dd className="min-w-0">
            <a href={`mailto:${site.referralsEmail}`} className="text-[14px] font-semibold hover:text-sun lg:text-[15px] lg:tracking-[-.01em]">
              {site.referralsEmail}
            </a>
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-[12px] text-white/60">{c.contactLabels.also}</dt>
          <dd className="text-[15px] font-semibold">{c.alsoAccepted}</dd>
        </div>
      </dl>
    </header>
  );
}
