import Link from "next/link";
import { Wordmark } from "@/components/chrome/Wordmark";
import { viChrome as c } from "@/content/vi";
import { site } from "@/content/site";
import { external, routes } from "@/lib/routes";

/** Hours, address and contact in Vietnamese, then the sign-off band. The rest of the site is English for now. */
export function ViFooter() {
  return (
    <footer id="footer" className="mx-4 mb-4 mt-12 flex flex-col gap-8 rounded-block bg-raised p-6 md:mx-6 md:mt-section md:p-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Wordmark />
          <p className="pretty text-[14px] leading-[1.55] text-secondary">{c.footerLead}</p>
          <p className="text-[14px] text-secondary">
            {c.footerAll}{" "}
            <Link href={routes.home} hrefLang="en-CA" className="font-semibold text-link">
              {c.footerAllLink}
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[15px] font-semibold">{c.hoursTitle}</span>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[14px]">
            {c.hours.map(([d, h]) => (
              <div key={d} className="contents">
                <dt className="text-secondary">{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col gap-2 text-[14px]">
          <span className="text-[15px] font-semibold">Thornhill</span>
          <span className="text-secondary">{c.address}</span>
          <a href={external.thornhillMapsShort} target="_blank" rel="noopener" className="font-semibold text-link">
            {c.directions}
          </a>
          <a href={site.phoneHref} className="pt-2 font-semibold">
            {c.phoneLabel}: {site.phone}
          </a>
          <span className="text-secondary">
            {c.faxLabel}: {site.fax}
          </span>
          <a href={`mailto:${site.email}`} className="text-secondary hover:underline">
            {site.email}
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-card bg-ink p-6 text-white md:p-8">
        <span className="font-display text-[28px] tracking-[-.02em] md:text-[36px]">
          Refined by <span className="text-sun">Medicine.</span>
        </span>
        <p className="text-[12px] leading-[1.6] text-white/70">
          © {new Date().getFullYear()} {site.name}. {c.disclaimer}
        </p>
      </div>
    </footer>
  );
}
