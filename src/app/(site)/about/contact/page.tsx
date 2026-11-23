import type { Metadata } from "next";
import { EmailText } from "@/components/ui/EmailText";
import { pageMetadata } from "@/lib/seo";
import { Display, Eyebrow, Lead, Photo, SmartLink } from "@/components/ui";
import { locationsCopy } from "@/content/about";
import { divisions, divisionOrder, tints } from "@/content/divisions";
import { getLocations } from "@/lib/cms";
import { LocationsView } from "@/components/pages/locations/LocationsView";
import type { LocationView } from "@/components/pages/locations/types";
import { ContactForm } from "@/components/pages/contact/ContactForm";
import { HoursLead } from "@/components/pages/contact/HoursLead";
import { contactCopy } from "@/content/booking";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { external } from "@/lib/routes";
import { EmergencyNote } from "@/components/pages/help/EmergencyNote";

const baseMetadata: Metadata = {
  title: contactCopy.title,
  description: `${site.name}, Thornhill. Call ${site.phone}, fax ${site.fax} or email ${site.email}. ${contactCopy.leadSuffix}`,
};

const tile = "flex flex-col gap-1.5 rounded-card-sm p-5 md:p-6 transition-colors";

export async function generateMetadata() {
  return pageMetadata("contact", baseMetadata);
}

export default async function ContactPage() {
  const locations: LocationView[] = (await getLocations()).map((l) => ({
    ...l,
    tiles: divisionOrder
      .filter((k) => l.services.includes(k))
      .map((k, i) => ({ key: k, label: divisions[k].label, tag: divisions[k].tag, tint: tints[i % tints.length], img: images.location[k] })),
  }));
  return (
    <>
      <header className="flex max-w-[820px] flex-col gap-4 px-4 pt-8 md:px-content md:pt-16">
        <Eyebrow tone="sky">{contactCopy.eyebrow}</Eyebrow>
        <Display as="h1" size="lg">
          {contactCopy.title}
        </Display>
        <HoursLead suffix={contactCopy.leadSuffix} />
      </header>

      <div className="rm-contact-tiles grid grid-cols-2 gap-2 px-4 pt-6 md:px-content md:pt-10 lg:grid-cols-4 lg:gap-3">
        <a href={site.phoneHref} className={`${tile} bg-inverse text-on-inverse hover:opacity-95`}>
          <span className="text-[13px] text-white/60">{contactCopy.tiles.call.k}</span>
          <span className="whitespace-nowrap font-display text-[20px] tracking-[-.02em] md:text-[26px]">{site.phone}</span>
          <span className="text-[13px] text-white/70">{contactCopy.tiles.call.sub}</span>
        </a>
        <div className={`${tile} border border-border bg-card`}>
          <span className="text-[13px] text-muted">{contactCopy.tiles.fax.k}</span>
          <span className="whitespace-nowrap font-display text-[20px] tracking-[-.02em] md:text-[26px]">{site.fax}</span>
          <span className="text-[13px] text-muted">{contactCopy.tiles.fax.sub}</span>
        </div>
        <a href={`mailto:${site.email}`} className={`${tile} border border-border bg-card hover:border-sky`}>
          <span className="text-[13px] text-muted">{contactCopy.tiles.email.k}</span>
          {/* Wrap at the @ on narrow tiles, never mid-word. */}
          <span className="text-[15px] font-semibold md:text-[16px]">
            <EmailText email={site.email} />
          </span>
          <span className="text-[13px] text-muted">{contactCopy.tiles.email.sub}</span>
        </a>
        {/* "Directions ›" opens the map; it only jumped down this page (round 33). */}
        <a href={external.thornhillMapsShort} target="_blank" rel="noopener" className={`${tile} bg-sun-soft text-ink hover:opacity-95`}>
          <span className="text-[13px] text-ink/60">{contactCopy.tiles.visit.k}</span>
          <span className="text-[15px] font-semibold md:text-[16px]">{contactCopy.tiles.visit.v}</span>
          <span className="text-[13px] text-ink/70">{contactCopy.tiles.visit.sub} ›</span>
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 pb-8 pt-6 md:px-content md:pt-10 md:pb-10 lg:grid-cols-2 lg:items-start lg:gap-8">
        <div className="flex flex-col gap-3.5">
          <EmergencyNote id="emergency" className="scroll-mt-24" />
          <ContactForm />
        </div>
        <div className="flex flex-col gap-3.5">
          <Photo src={images.division.about} alt={contactCopy.mapAlt} radius="block" ratio="16 / 10" sizes="(max-width: 1024px) 100vw, 50vw">
            <a href={external.thornhillMapsShort} target="_blank" rel="noopener" className="absolute bottom-4 left-4 rounded-chip bg-white px-4 py-2.5 text-[13px] font-semibold text-ink shadow-card hover:opacity-90">
              {contactCopy.mapLink} ›
            </a>
          </Photo>
          {/* Round 30: the hours were listed here and again under Our clinics below. They stay below only. */}
          <div className="flex flex-col gap-2 rounded-card-sm border border-border p-5 text-[14px] leading-[1.5] md:p-6">
            <span className="text-[13px] font-semibold text-muted">{contactCopy.gettingHereTitle}</span>
            <span>{contactCopy.gettingHere}</span>
            <SmartLink to="contact#thornhill-hours" className="w-fit pt-1 text-[14px] font-semibold text-link">
              {contactCopy.hoursTitle} ›
            </SmartLink>
          </div>
        </div>
      </div>

      {/* Our clinics (its own page until Nov 2026): Thornhill now, Maple coming soon. */}
      <section id="clinics" className="scroll-mt-24">
        <div className="flex max-w-[820px] flex-col gap-3 px-4 pt-12 md:px-content md:pt-section">
          <Eyebrow tone="sky">{locationsCopy.eyebrow}</Eyebrow>
          <Display size="sm">{locationsCopy.h1}</Display>
          <Lead size="md" tone="muted">
            {locationsCopy.lead}
          </Lead>
        </div>
        <LocationsView locations={locations} />
      </section>
    </>
  );
}
