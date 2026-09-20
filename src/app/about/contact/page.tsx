import type { Metadata } from "next";
import { Display, Eyebrow, Photo, SmartLink } from "@/components/ui";
import { ContactForm } from "@/components/pages/contact/ContactForm";
import { HoursLead } from "@/components/pages/contact/HoursLead";
import { contactCopy } from "@/content/booking";
import { images } from "@/content/images";
import { site, thornhillHours } from "@/content/site";
import { external } from "@/lib/routes";

export const metadata: Metadata = {
  title: contactCopy.title,
  description: `${site.name}, Thornhill. Call ${site.phone}, fax ${site.fax} or email ${site.email}. ${contactCopy.leadSuffix}`,
};

const tile = "flex flex-col gap-1.5 rounded-card-sm p-5 md:p-6 transition-colors";

export default function ContactPage() {
  return (
    <>
      <header className="flex max-w-[820px] flex-col gap-4 px-4 pt-8 md:px-content md:pt-16">
        <Eyebrow tone="sky">{contactCopy.eyebrow}</Eyebrow>
        <Display as="h1" size="lg">
          {contactCopy.title}
        </Display>
        <HoursLead suffix={contactCopy.leadSuffix} />
      </header>

      <div className="grid grid-cols-2 gap-2 px-4 pt-6 md:px-content md:pt-10 lg:grid-cols-4 lg:gap-3">
        <a href={site.phoneHref} className={`${tile} bg-inverse text-on-inverse hover:opacity-95`}>
          <span className="text-[12px] text-white/60">{contactCopy.tiles.call.k}</span>
          <span className="font-display text-[20px] tracking-[-.02em] md:text-[26px]">{site.phone}</span>
          <span className="text-[13px] text-white/70">{contactCopy.tiles.call.sub}</span>
        </a>
        <div className={`${tile} border border-border bg-card`}>
          <span className="text-[12px] text-muted">{contactCopy.tiles.fax.k}</span>
          <span className="font-display text-[20px] tracking-[-.02em] md:text-[26px]">{site.fax}</span>
          <span className="text-[13px] text-muted">{contactCopy.tiles.fax.sub}</span>
        </div>
        <a href={`mailto:${site.email}`} className={`${tile} border border-border bg-card hover:border-sky`}>
          <span className="text-[12px] text-muted">{contactCopy.tiles.email.k}</span>
          <span className="break-all text-[15px] font-semibold md:text-[16px]">{site.email}</span>
          <span className="text-[13px] text-muted">{contactCopy.tiles.email.sub}</span>
        </a>
        <SmartLink to="locations" className={`${tile} bg-sun-soft text-ink hover:opacity-95`}>
          <span className="text-[12px] text-ink/60">{contactCopy.tiles.visit.k}</span>
          <span className="text-[15px] font-semibold md:text-[16px]">{contactCopy.tiles.visit.v}</span>
          <span className="text-[13px] text-ink/70">{contactCopy.tiles.visit.sub} ›</span>
        </SmartLink>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 pb-8 pt-6 md:px-content md:pt-10 md:pb-10 lg:grid-cols-2 lg:items-start lg:gap-8">
        <ContactForm />
        <div className="flex flex-col gap-3.5">
          <Photo src={images.division.about} alt={contactCopy.mapAlt} radius="block" ratio="16 / 10" sizes="(max-width: 1024px) 100vw, 50vw">
            <a href={external.thornhillMapsShort} target="_blank" rel="noopener" className="absolute bottom-4 left-4 rounded-chip bg-white px-4 py-2.5 text-[13px] font-semibold text-ink shadow-card hover:opacity-90">
              {contactCopy.mapLink} ›
            </a>
          </Photo>
          <div className="grid grid-cols-1 gap-4 rounded-card-sm border border-border p-5 text-[14px] leading-[1.5] sm:grid-cols-2 md:p-6">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-muted">{contactCopy.hoursTitle}</span>
              <table className="w-full border-collapse">
                <tbody>
                  {thornhillHours.map(([d, h]) => (
                    <tr key={d}>
                      <th scope="row" className="py-0.5 pr-3 text-left font-normal text-secondary">
                        {d}
                      </th>
                      <td className="py-0.5 text-right tabular-nums sm:text-left">{h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-muted">{contactCopy.gettingHereTitle}</span>
              <span>{contactCopy.gettingHere}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
