import Link from "next/link";
import { divisions, navOrder } from "@/content/divisions";
import { locations, network, site } from "@/content/site";
import { external, href, routes } from "@/lib/routes";
import { Wordmark } from "./Wordmark";
import { FooterIcons } from "./SocialIcons";
import { TextControls } from "./TextControls";

const legalLinks: [string, string][] = [
  ["FAQ", routes.faq],
  ["Contact", routes.contact],
  ["New patients", routes.register],
  ["Your year", routes.year],
  ["Know your numbers", routes.numbers],
  ["For referring doctors", routes.referrals],
  ["Privacy policy", routes.privacy],
  ["Accessibility statement", routes.accessibility],
  ["Patient rights", routes.rights],
  ["Terms of use", routes.terms],
  ["Sitemap", routes.sitemap],
];

/**
 * Footer: wordmark and blurb, Book button, icon buttons, two location cards
 * with hours and fax, network row, six link columns, legal links with text
 * size and contrast controls, and the sign-off line.
 */
export function Footer() {
  const [thornhill, maple] = locations;
  return (
    <footer className="m-3 flex flex-col gap-10 rounded-block border border-border bg-card p-6 md:m-gutter md:p-12">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
        <div className="flex flex-col gap-3.5 lg:pr-6">
          <Wordmark size="lg" />
          <span className="pretty text-[14px] leading-[1.5] text-muted">{site.description}</span>
          <Link href={routes.book} className="self-start rounded-chip bg-ink px-[22px] py-3 text-[14px] font-semibold text-white hover:opacity-90">
            Book an appointment
          </Link>
          <FooterIcons />
        </div>
        <div className="flex flex-col gap-3 rounded-[20px] border border-border bg-raised px-6 py-[22px] text-[13px] leading-[1.5] text-muted">
          <div className="flex items-center justify-between gap-3">
            <span className="display text-[20px] text-primary">{thornhill.name}</span>
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-primary">
              <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-sage" />
              Open
            </span>
          </div>
          <a href={external.thornhillMaps} target="_blank" rel="noopener" className="hover:text-primary">
            {thornhill.addressLines[0]}
            <br />
            {thornhill.addressLines[1]}
          </a>
          <span>
            Mon, Wed, Thu 9am to 4pm
            <br />
            Tue 3pm to 9pm
            <br />
            Sat 8am to 4pm, Sun 8am to 2pm
            <br />
            Fri closed
          </span>
          <div className="flex flex-col gap-0.5 border-t border-border pt-1.5 text-primary">
            <a href={site.phoneHref}>{site.phone}</a>
            <span className="text-muted">Fax {site.fax}</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-[20px] border border-border bg-raised px-6 py-[22px] text-[13px] leading-[1.5] text-muted">
          <div className="flex items-center justify-between gap-3">
            <span className="display text-[20px] text-primary">{maple.name}</span>
            <span className="rounded-chip bg-sun-soft px-2.5 py-1 text-[12px] font-semibold text-sun-ink">Coming soon</span>
          </div>
          <a href={external.mapleMaps} target="_blank" rel="noopener" className="hover:text-primary">
            {maple.addressLines[0]}
            <br />
            {maple.addressLines[1]}
          </a>
          <span className="flex-1">Family Medicine, Pain Centre, Infusion Therapy and Rehab. Pre-registration is open now.</span>
          <Link href={routes.locations} className="w-full border-t border-border pt-1.5 font-semibold text-link">
            Join the Maple waitlist ›
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-8">
        <span className="text-[12px] font-semibold text-muted">Our network</span>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
          {network.map((n) => (
            <a key={n.t} href={n.href} target="_blank" rel="noopener" className="flex items-center justify-between gap-3 rounded-row border border-border bg-raised px-[18px] py-4 transition-colors hover:border-sky">
              <span className="flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold">{n.t}</span>
                <span className="text-[12px] text-muted">{n.d}</span>
              </span>
              <span className="whitespace-nowrap text-[12px] font-semibold text-link">{n.tag}</span>
            </a>
          ))}
        </div>
      </div>

      <nav aria-label="Footer" className="grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-3 lg:grid-cols-6">
        {navOrder.map((k) => {
          const d = divisions[k];
          const links = k === "about" ? d.explore.filter((e) => ["Our team", "Our clinics", "Health notes", "FAQ"].includes(e.label)) : d.explore.slice(1, 5);
          return (
            <div key={k} className="flex flex-col gap-[9px] text-[13px]">
              <Link href={href(k)} className="mb-1 font-semibold text-primary">
                {d.label}
              </Link>
              {links.map((l) => (
                <Link key={l.label} href={href(l.page)} className="text-muted hover:text-primary">
                  {l.label}
                </Link>
              ))}
            </div>
          );
        })}
      </nav>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <div className="flex flex-wrap justify-between gap-6 text-[12px]">
          <div className="flex flex-wrap gap-x-[18px] gap-y-2 text-muted">
            {legalLinks.map(([label, to]) => (
              <Link key={label} href={to} className="hover:text-primary">
                {label}
              </Link>
            ))}
          </div>
          <TextControls />
        </div>
        <span className="text-[12px] text-muted">© 2026 Restoration Medical. Refined by Medicine.</span>
        <span className="pretty text-[12px] leading-[1.55] text-muted">{site.landAcknowledgement}</span>
      </div>
    </footer>
  );
}
