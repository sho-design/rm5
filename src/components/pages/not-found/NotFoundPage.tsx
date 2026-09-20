import { divisionList } from "@/content/divisions";
import { site } from "@/content/site";
import { Button, Display, SmartLink } from "@/components/ui";
import { SearchSiteButton } from "./SearchSiteButton";

export const notFoundCopy = {
  title: "This page took a sick day.",
  lead: "The page you were looking for has moved or does not exist. Here are a few places that will help.",
} as const;

/** 404: big sky numeral, headline and two CTAs left; division tiles right. */
export function NotFoundPage() {
  return (
    <div className="grid grid-cols-1 items-center gap-8 px-4 pb-10 pt-10 md:px-content md:pt-20 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col gap-3.5 md:gap-5">
        <span aria-hidden className="font-display text-[88px] font-medium leading-[.9] tracking-[-.04em] text-sky md:text-[120px]">
          404
        </span>
        <Display as="h1" size="md" className="!leading-none">
          {notFoundCopy.title}
        </Display>
        <p className="pretty max-w-[480px] text-[14px] leading-[1.55] text-muted md:text-[17px]">{notFoundCopy.lead}</p>
        <div className="flex gap-2 md:gap-2.5">
          <Button to="home" className="flex-1 md:flex-none">
            <span className="md:hidden">Home</span>
            <span className="hidden md:inline">Back to home</span>
          </Button>
          <SearchSiteButton className="inline-flex h-12 flex-1 items-center justify-center rounded-chip border-[1.5px] border-border px-6 text-[15px] font-medium leading-none transition-colors hover:border-sky active:scale-[.98] md:flex-none">
            <span className="md:hidden">Search</span>
            <span className="hidden md:inline">Search the site</span>
          </SearchSiteButton>
        </div>
        <span className="text-[13px] text-muted">
          Need a person? Call <a href={site.phoneHref} className="hover:text-link">{site.phone}</a>.
        </span>
      </div>

      <nav aria-label="Popular pages" className="grid grid-cols-1 gap-2 pt-3 md:grid-cols-2 md:gap-card md:pt-0">
        {divisionList.map((d) => (
          <SmartLink key={d.key} to={d.key} className="flex flex-col gap-1.5 rounded-[14px] px-4 py-3.5 transition-opacity hover:opacity-90 md:rounded-tile md:p-5" style={{ background: d.tint }}>
            <span className="font-display text-[18px] font-medium tracking-[-.02em] md:text-[20px]">{d.label}</span>
            <span className="hidden text-[13px] text-muted md:block">{d.tag}</span>
          </SmartLink>
        ))}
        <SmartLink to="book" className="hidden flex-col gap-1.5 rounded-tile bg-sun-soft p-5 text-ink transition-opacity hover:opacity-90 md:flex">
          <span className="font-display text-[20px] font-medium tracking-[-.02em]">Book an appointment</span>
          <span className="text-[13px] opacity-75">Any service, any location.</span>
        </SmartLink>
      </nav>
    </div>
  );
}
