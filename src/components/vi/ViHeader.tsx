"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/chrome/Wordmark";
import { buttonClass } from "@/components/ui/Button";
import { viChrome as c } from "@/content/vi";
import { enPairs, routes, viRoutes } from "@/lib/routes";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Header for the Vietnamese pages: a navy bar with 911 and the switch back to English (to the same page in English
 * where one exists), then the wordmark, the four Vietnamese pages and booking. The nav scrolls sideways on a phone.
 */
export function ViHeader() {
  const path = usePathname() ?? viRoutes.home;
  const en = enPairs[path] ?? routes.home;
  return (
    <header>
      <div className="bg-ink text-white">
        <div className="mx-auto flex h-[38px] w-full max-w-[1440px] items-center justify-between px-4 text-[12px] font-medium md:px-8">
          {/* Plain text, as on the English bar: the clinic does not want accidental emergency calls. */}
          <span className="font-semibold text-sun">{c.emergency}</span>
          <Link href={en} hrefLang="en-CA" lang="en" aria-label={c.englishLabel} className="rounded-[6px] px-2 py-1 font-semibold hover:underline">
            {c.english}
          </Link>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-4 py-3.5 md:px-8">
        <Wordmark href={viRoutes.home} label="Restoration Medical, trang chủ tiếng Việt" />
        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="hidden rounded-chip border-[1.5px] border-border px-4 py-2 text-[14px] font-semibold md:inline-flex">
            {site.phone}
          </a>
          <Link href={routes.book} className={buttonClass("primary", "sm")}>
            {c.book}
          </Link>
        </div>
      </div>
      <nav aria-label={c.navLabel} className="mx-auto w-full max-w-[1440px] px-4 pb-2 md:px-8">
        <ul className="flex flex-wrap gap-1.5 pb-1">
          {c.nav.map((n) => {
            const href = viRoutes[n.k];
            const on = path === href;
            return (
              <li key={n.k} className="shrink-0">
                <Link
                  href={href}
                  aria-current={on ? "page" : undefined}
                  className={cn("inline-flex rounded-chip px-4 py-2 text-[14px] font-semibold motion-safe:transition-colors motion-safe:duration-200", on ? "bg-ink text-white" : "bg-raised text-primary hover:bg-sky-soft")}
                >
                  {n.t}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
