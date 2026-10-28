import { kidsJumpLinks } from "@/content/kids-extra";

/**
 * "On this page" links under the children and youth hero. The page is long
 * (about 21 phone screens at large text) and parents came for one part,
 * usually the vaccine schedule.
 */
export function KidsJumpLinks() {
  return (
    <nav aria-label={kidsJumpLinks.label} className="px-4 pt-6 md:px-content">
      <ul className="flex flex-wrap gap-2">
        {kidsJumpLinks.items.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="inline-flex rounded-chip border-[1.5px] border-border bg-raised px-4 py-2 text-[14px] font-semibold transition-colors hover:border-sky">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
