import type { Metadata } from "next";
import { divisionList, divisions } from "@/content/divisions";
import { legalOrder } from "@/content/legal";
import type { LinkTarget } from "@/content/types";
import { Display, Eyebrow, SmartLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Every page on the Restoration Medical website: services, family medicine sub-pages, about, health notes and policies.",
};

interface Group {
  label: string;
  page: LinkTarget;
  links: { label: string; page: LinkTarget }[];
}

/** Link groups from the prototype: Home, each service line, About, Policies. */
function groups(): Group[] {
  const about = divisions.about;
  return [
    {
      label: "Home",
      page: "home",
      links: [
        { label: "Book an appointment", page: "book" },
        { label: "Locations", page: "locations" },
        { label: "Our team", page: "team" },
      ],
    },
    ...divisionList.map((d) => ({ label: d.label, page: d.key as LinkTarget, links: d.explore.slice(1) })),
    {
      label: "About",
      page: "about",
      links: [
        { label: "Our team", page: "team" },
        { label: "Our clinics", page: "locations" },
        { label: "FAQ", page: "faq" },
        ...about.explore.slice(3).filter((l) => l.label !== "FAQ"),
      ],
    },
    {
      label: "Policies",
      page: "privacy",
      links: legalOrder.map((l) => ({ label: l.label, page: l.key })),
    },
  ];
}

export default function SitemapPage() {
  return (
    <>
      <header className="flex flex-col gap-3 px-4 pt-10 md:px-content md:pt-16">
        <Eyebrow tone="sky">Every page</Eyebrow>
        <Display as="h1" size="lg" className="!leading-[.98] lg:!text-[64px]">
          Sitemap
        </Display>
      </header>
      <div className="grid grid-cols-1 gap-7 px-4 pb-12 pt-8 sm:grid-cols-2 md:px-content md:pt-10 lg:grid-cols-4">
        {groups().map((g) => (
          <nav key={g.label} aria-label={g.label} className="flex flex-col gap-2 text-[14px]">
            <SmartLink to={g.page} className="mb-1.5 font-display text-[22px] font-medium tracking-[-.02em] hover:text-link">
              {g.label}
            </SmartLink>
            {g.links.map((l) => (
              <SmartLink key={l.label} to={l.page} className="text-muted hover:text-link">
                {l.label}
              </SmartLink>
            ))}
          </nav>
        ))}
      </div>
    </>
  );
}
