import Link from "next/link";
import { Wordmark } from "@/components/chrome/Wordmark";
import { LocationMap } from "@/components/chrome/LocationMap";
import { buttonClass } from "@/components/ui/Button";
import { divisionDot, divisions } from "@/content/divisions";
import { viChrome as c } from "@/content/vi";
import { locations, site } from "@/content/site";
import { external, routes, viRoutes } from "@/lib/routes";

/**
 * The Vietnamese footer, laid out like the English one: wordmark and booking beside Thornhill (address and
 * contact, hours, map) with Maple as a slim strip, one link grid (the Vietnamese pages, then the English site and
 * policies), and the navy sign-off band.
 */
export function ViFooter() {
  const [thornhill, maple] = locations;
  const services: [string, string, keyof typeof divisions][] = [
    [c.f.family, viRoutes.family, "family"],
    [c.f.pain, viRoutes.pain, "pain"],
    [c.f.iron, viRoutes.iron, "infusion"],
    [c.f.aesthetics, viRoutes.aesthetics, "aesthetics"],
    [c.f.rehab, viRoutes.rehab, "rehab"],
  ];
  const groups: { t: string; links: [string, string, string?][] }[] = [
    { t: c.f.patients, links: [[c.f.register, viRoutes.register], [c.f.contact, viRoutes.contact], [c.f.book, `${routes.book}?lang=vi`]] },
    { t: c.f.english, links: [[c.f.allSite, routes.home, "en-CA"], [c.f.fees, (routes.billing + "#fees"), "en-CA"], [c.f.privacy, routes.privacy, "en-CA"], [c.f.accessibility, routes.accessibility, "en-CA"]] },
  ];
  return (
    <footer id="footer" tabIndex={-1} className="m-3 flex flex-col gap-10 rounded-block border border-border bg-card p-6 outline-none md:m-gutter md:p-12">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,.8fr)_minmax(0,2fr)] lg:gap-8">
        <div className="flex flex-col gap-3.5">
          <Wordmark size="lg" href={viRoutes.home} label="Restoration Medical, trang chủ tiếng Việt" />
          <span className="pretty text-[14px] leading-[1.5] text-muted">{c.footerLead}</span>
          <Link href={`${routes.book}?lang=vi`} className={buttonClass("primary", "md", "self-start")}>
            {c.book}
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="grid grid-cols-1 gap-5 rounded-[20px] border border-border bg-raised p-5 text-[13px] leading-[1.5] text-muted sm:grid-cols-2 md:p-6 xl:grid-cols-[1fr_1fr_1.15fr]">
            <div className="flex flex-col gap-2">
              <h2 className="display text-[20px] text-primary">{thornhill.name}</h2>
              <a href={external.thornhillMaps} target="_blank" rel="noopener" className="hover:text-primary">
                {c.address}
              </a>
              <div className="flex flex-col gap-0.5 pt-1 text-primary">
                <a href={site.phoneHref} className="font-semibold">
                  {c.phoneLabel}: {site.phone}
                </a>
                <span className="text-muted">
                  {c.faxLabel} {site.fax}
                </span>
                <a href={`mailto:${site.email}`} className="break-all">
                  {site.email}
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[13px] font-semibold text-primary">{c.hoursTitle}</h3>
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                {c.hours.map(([d, h]) => (
                  <div key={d} className="contents">
                    <dt>{d}</dt>
                    <dd className="text-primary">{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <LocationMap
              query="Restoration Medical, 700 Centre St, Thornhill, ON L4J 0A7"
              label={thornhill.name}
              directions={external.thornhillMaps}
              t={{ show: c.f.showMap, directions: c.directions, loads: c.f.loadsMap }}
              className="h-[150px] sm:col-span-2 xl:col-span-1 xl:h-full xl:min-h-[150px]"
            />
          </div>
          <div className="flex flex-col gap-2 rounded-[20px] border border-border bg-raised px-5 py-4 text-[13px] leading-[1.5] text-muted md:flex-row md:items-center md:gap-5 md:px-6">
            <span className="flex shrink-0 items-center gap-2.5">
              <h2 className="display text-[18px] text-primary">{maple.name}</h2>
              <span className="rounded-chip bg-sun-soft px-2.5 py-1 text-[13px] font-semibold text-sun-ink">{c.f.soon}</span>
            </span>
            <span className="min-w-0 md:flex-1">{maple.addressLines.join(", ")}</span>
          </div>
        </div>
      </div>

      <nav aria-label={c.f.navLabel} className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 md:grid-cols-3">
        <div className="col-span-2 flex flex-col gap-2.5 text-[14px] md:col-span-1">
          <h2 className="mb-1 font-semibold text-primary">{c.f.services}</h2>
          {services.map(([label, to, k]) => (
            <Link key={to} href={to} className="flex w-fit items-center gap-2 text-muted transition-colors hover:text-primary">
              <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: divisionDot[divisions[k].label] ?? "var(--rm-ink)" }} />
              {label}
            </Link>
          ))}
        </div>
        {groups.map((g) => (
          <div key={g.t} className="flex flex-col gap-2.5 text-[14px]">
            <h2 className="mb-1 font-semibold text-primary">{g.t}</h2>
            {g.links.map(([label, to, lang]) => (
              <Link key={label} href={to} hrefLang={lang} className="w-fit text-muted transition-colors hover:text-primary">
                {label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-5 rounded-[24px] rm-ink-surface bg-ink p-6 text-white md:p-8">
        <span className="font-display text-[34px] font-medium leading-none tracking-[-.03em] md:text-[44px]">
          Refined by <span className="text-sun">Medicine.</span>
        </span>
        <p className="border-t border-white/15 pt-4 text-[13px] leading-[1.6] text-white/65">
          © {new Date().getFullYear()} {site.name}. {c.disclaimer}
        </p>
      </div>
    </footer>
  );
}
