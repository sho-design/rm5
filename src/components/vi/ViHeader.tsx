"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/chrome/Wordmark";
import { buttonClass } from "@/components/ui/Button";
import { viChrome as c } from "@/content/vi";
import { enPairs, routes, viRoutes } from "@/lib/routes";
import { site } from "@/content/site";
import { viOpenStatus } from "@/lib/hours";
import { cn } from "@/lib/cn";

/**
 * Header for the Vietnamese pages, built like the English one: a navy bar with whether the clinic is open now,
 * 911 and the switch back to English, then one row with the wordmark, the Vietnamese pages, the phone and
 * booking. Below xl the pages sit in one sideways-scrolling row under the sticky bar, not inside it.
 */
export function ViHeader() {
  const path = usePathname() ?? viRoutes.home;
  const en = enPairs[path] ?? routes.home;
  // Worked out in the browser so the status matches the visitor's moment, not the build.
  const [status, setStatus] = useState<{ text: string; open: boolean } | null>(
    null,
  );
  useEffect(() => {
    const tick = () => setStatus(viOpenStatus());
    tick();
    const t = window.setInterval(tick, 60_000);
    return () => window.clearInterval(t);
  }, []);

  const nav = (
    <ul className="scroll-x flex gap-1 xl:flex-wrap">
      {c.nav.map((n) => {
        const href = viRoutes[n.k];
        const on = path === href;
        return (
          <li key={n.k} className="shrink-0">
            <Link
              href={href}
              aria-current={on ? "page" : undefined}
              className={cn(
                "inline-flex rounded-chip px-3 py-2 text-[14px] font-semibold motion-safe:transition-colors motion-safe:duration-200 md:px-3.5 md:text-[15px]",
                on ? "bg-ink text-white" : "text-primary hover:bg-raised",
              )}
            >
              {n.t}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-page/95 backdrop-blur">
        <div className="bg-ink text-white">
          <div className="mx-auto flex h-[38px] w-full max-w-[1440px] items-center justify-between gap-3 px-4 text-[12px] font-medium md:px-8">
            <Link
              href={`${viRoutes.contact}#gio`}
              className="flex min-w-0 items-center gap-2 hover:underline"
            >
              <span
                aria-hidden
                className={cn(
                  "h-2 w-2 shrink-0 rounded-full",
                  status?.open
                    ? "bg-[color:var(--status-open)]"
                    : "bg-white/40",
                )}
              />
              <span className="truncate">
                {status ? `Thornhill: ${status.text}` : "Thornhill"}
              </span>
            </Link>
            <span className="flex shrink-0 items-center gap-4">
              {/* Plain text, as on the English bar: the clinic does not want accidental emergency calls. */}
              <span className="hidden font-semibold text-sun sm:inline">
                {c.emergency}
              </span>
              <Link
                href={en}
                hrefLang="en-CA"
                lang="en"
                aria-label={c.englishLabel}
                className="rounded-[6px] px-2 py-1 font-semibold hover:underline"
              >
                {c.english}
              </Link>
            </span>
          </div>
        </div>
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-4 md:h-[76px] md:px-8">
          <span className="flex items-center gap-8">
            <span className="md:hidden">
              <Wordmark
                href={viRoutes.home}
                label="Restoration Medical, trang chủ tiếng Việt"
              />
            </span>
            <span className="hidden md:inline">
              <Wordmark
                size="lg"
                href={viRoutes.home}
                label="Restoration Medical, trang chủ tiếng Việt"
              />
            </span>
            <nav aria-label={c.navLabel} className="hidden xl:block">
              {nav}
            </nav>
          </span>
          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden rounded-chip border-[1.5px] border-border px-4 py-2 text-[14px] font-semibold md:inline-flex"
            >
              {site.phone}
            </a>
            <Link
              href={`${routes.book}?lang=vi`}
              className={buttonClass("primary", "sm")}
            >
              {c.book}
            </Link>
          </div>
        </div>
      </header>
      {/* Phone and tablet: the page links sit under the sticky bar in one sideways row, so the bar stays short
        (it was 232px with three rows of links, round 28, Anh). */}
      <nav
        aria-label={c.navLabel}
        className="mx-auto w-full max-w-[1440px] border-b border-border px-3 py-2.5 md:px-7 xl:hidden"
      >
        {nav}
      </nav>
    </>
  );
}
