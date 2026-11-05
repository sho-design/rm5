import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { divisions, navOrder } from "@/content/divisions";
import { locations, network, site } from "@/content/site";
import { external, href, routes } from "@/lib/routes";
import { Wordmark } from "./Wordmark";
import { OpenBadge } from "./OpenBadge";
import { FooterIcons } from "./SocialIcons";
import { TextControls } from "./TextControls";
import { ConsentSettingsLink } from "./ConsentBanner";
import { LocationMap } from "./LocationMap";
import { divisionDot } from "@/content/divisions";

/** Grouped so the eleven loose links read as three short lists. */
const linkGroups: { t: string; links: [string, string][] }[] = [
  { t: "For patients", links: [["New patients", routes.register], ["Contact", routes.contact], ["Fees", routes.fees], ["Your year", routes.year], ["Know your numbers", routes.numbers], ["Referrals for doctors", routes.referrals]] },
  { t: "Policies", links: [["Privacy policy", routes.privacy], ["Accessibility statement", routes.accessibility], ["Patient rights", routes.rights], ["Terms of use", routes.terms], ["Sitemap", routes.sitemap]] },
];

/**
 * Footer in three bands: wordmark, Book button and the two clinic cards (a map for Thornhill only, as Maple is not
 * open); one link grid (six services, patients, policies, with no link repeated); and the sign-off band carrying
 * text size and contrast, the network link and the land acknowledgement.
 */
export function Footer({ analytics = false }: { analytics?: boolean }) {
  const [thornhill, maple] = locations;
  const knee = network.find((n) => n.t === "Canada Knee Clinic");
  // A link listed under patients or policies is not repeated under a service.
  const grouped = new Set(linkGroups.flatMap((g) => g.links.map(([, to]) => to)));
  return (
    <footer id="footer" tabIndex={-1} className="m-3 flex outline-none flex-col gap-10 rounded-block border border-border bg-card p-6 md:m-gutter md:p-12">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
        <div className="flex flex-col gap-3.5 lg:pr-6">
          <Wordmark size="lg" />
          <span className="pretty text-[14px] leading-[1.5] text-muted">{site.description}</span>
          <Link href={routes.book} className={buttonClass("primary", "md", "self-start")}>
            Book an appointment
          </Link>
          <FooterIcons />
        </div>
        <div className="flex flex-col gap-3 rounded-[20px] border border-border bg-raised px-6 py-[22px] text-[13px] leading-[1.5] text-muted">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <span className="display text-[20px] text-primary">{thornhill.name}</span>
            <OpenBadge className="text-primary" />
          </div>
          <a href={external.thornhillMaps} target="_blank" rel="noopener" className="hover:text-primary">
            {thornhill.addressLines[0]}
            <br />
            {thornhill.addressLines[1]}
          </a>
          <LocationMap query="Restoration Medical, 700 Centre St, Thornhill, ON L4J 0A7" label={thornhill.name} directions={external.thornhillMaps} className="h-[150px]" />
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
          <span className="flex-1">Family Medicine, Pain Centre, Infusion Therapy and Rehab. The Maple list is open now.</span>
          <Link href={`${routes.locations}#maple-waitlist`} className="w-full border-t border-border pt-1.5 font-semibold text-link">
            Join the Maple list ›
          </Link>
        </div>
      </div>

      <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 md:grid-cols-4">
        {navOrder.map((k) => {
          const d = divisions[k];
          const links = k === "about" ? d.explore.filter((e) => ["Our team", "Our clinics", "Health notes", "FAQ"].includes(e.label)) : d.explore.slice(1, 5);
          const shown = links.filter((l) => !grouped.has(href(l.page)));
          return (
            <div key={k} className="flex flex-col gap-2.5 text-[14px]">
              <Link href={href(k)} className="group mb-1 flex items-center gap-2 font-semibold text-primary">
                <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: divisionDot[d.label] ?? "var(--rm-ink)" }} />
                <span className="group-hover:underline group-hover:underline-offset-4">{d.label}</span>
              </Link>
              {shown.map((l) => (
                <Link key={l.label} href={href(l.page)} className="w-fit text-muted transition-colors hover:text-primary">
                  {l.label}
                </Link>
              ))}
            </div>
          );
        })}
        {linkGroups.map((g) => (
          <div key={g.t} className="flex flex-col gap-2.5 text-[14px]">
            <span className="mb-1 font-semibold text-primary">{g.t}</span>
            {g.links.map(([label, to]) => (
              <Link key={label} href={to} className="w-fit text-muted transition-colors hover:text-primary">
                {label}
              </Link>
            ))}
            {g.t === "Policies" && analytics ? <ConsentSettingsLink className="w-fit text-left text-muted hover:text-primary" /> : null}
          </div>
        ))}
      </nav>

      {/* Sign-off band. */}
      <div className="flex flex-col gap-5 rounded-[24px] bg-ink p-6 text-white md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <span className="font-display text-[34px] font-medium leading-none tracking-[-.03em] md:text-[44px]">
            Refined by <span className="text-sun">Medicine.</span>
          </span>
          {/* Wraps at larger text: "High contrast" ran off the screen on a small phone. */}
          <TextControls inverse className="flex-wrap text-[13px]" />
        </div>
        <div className="flex flex-col gap-2 border-t border-white/15 pt-4 text-[12px] leading-[1.6] text-white/65">
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            <span>© 2026 Restoration Medical</span>
            {knee ? (
              <a href={knee.href} target="_blank" rel="noopener" className="font-semibold text-white hover:underline">
                {`Our network: ${knee.t} ›`}
              </a>
            ) : null}
          </span>
          <span className="pretty">{site.landAcknowledgement}</span>
        </div>
      </div>
    </footer>
  );
}
