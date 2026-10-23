import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { divisionList, divisions } from "@/content/divisions";
import { legalOrder } from "@/content/legal";
import type { LinkTarget } from "@/content/types";
import { Display, Eyebrow, SmartLink } from "@/components/ui";
import { topicsFor } from "@/content/topics";
import { href } from "@/lib/routes";

const baseMetadata: Metadata = {
  title: "Sitemap",
  description: "Every page on the Restoration Medical website: services and their topic pages, infusion drips and shots, about, health notes and policies.",
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
    ...divisionList.map((d) => {
      // Explore links, then any topic or infusion page the menu reaches that Explore does not.
      const seen = new Set(d.explore.map((e) => href(e.page)));
      const extra = [...d.book, ...d.more].filter((l) => {
        const url = href(l.page);
        if (url.includes("#") || url.includes("?") || seen.has(url) || !url.startsWith(href(d.key))) return false;
        seen.add(url);
        return true;
      });
      const topicExtra = topicsFor(d.key).filter((t) => !seen.has(href(t.key))).map((t) => ({ label: t.page, page: t.key as LinkTarget }));
      return { label: d.label, page: d.key as LinkTarget, links: [...d.explore.slice(1), ...extra, ...topicExtra] };
    }),
    {
      label: "About",
      page: "about",
      links: [
        { label: "Our team", page: "team" },
        { label: "Our clinics", page: "locations" },
        { label: "FAQ", page: "faq" },
        ...about.explore.slice(3).filter((l) => l.label !== "FAQ"),
        ...topicsFor("about").map((t) => ({ label: t.page, page: t.key as LinkTarget })),
        { label: "Uninsured services and fees", page: "fees" },
      ],
    },
    {
      label: "Policies",
      page: "privacy",
      links: legalOrder.map((l) => ({ label: l.label, page: l.key })),
    },
  ];
}

export async function generateMetadata() {
  return pageMetadata("sitemap", baseMetadata);
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
