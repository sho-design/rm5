"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOpenStatus } from "@/lib/use-open-status";
import { routes, viPairs, viRoutes } from "@/lib/routes";
import { emergencyCopy } from "@/content/patient-help";
import { viEnabled } from "@/lib/prefs";
import { SocialIcons } from "./SocialIcons";
import { TextControls } from "./TextControls";
import { cn } from "@/lib/cn";

/**
 * 38px navy utility bar: live open-now status with a 7px sage dot on the
 * left; on the right, social icons, a hairline, the sunshine "For referring
 * doctors ›" link and a Tiếng Việt link to the Vietnamese version of the page (or the Vietnamese home page).
 */
export function UtilityBar() {
  const status = useOpenStatus();
  const path = usePathname() ?? "/";
  // Same page in Vietnamese where one exists, otherwise the Vietnamese home page.
  const vi = viPairs[path] ?? viRoutes.home;
  return (
    <div role="region" aria-label="Clinic status and display settings" className="bg-ink text-white">
    <div className="mx-auto flex h-[38px] w-full max-w-[1440px] items-center justify-between px-4 text-[12px] font-medium md:px-8">
      {/* Closed: the status leads to after-hours advice (911, Health811), not just the hours again. */}
      <Link
        href={status.ready && !status.open ? `${routes.contact}#emergency` : `${routes.locations}#thornhill`}
        className="flex min-w-0 items-center gap-2 hover:underline"
        aria-label={status.ready ? (status.open ? `${status.text}. See hours` : `${status.text}. Advice while we are closed`) : "Thornhill hours"}
      >
        <span aria-hidden className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: status.open ? "var(--status-open)" : "rgba(255,255,255,.45)" }} />
        <span className="truncate sm:hidden">{status.ready ? status.tiny : "Thornhill"}</span>
        <span className="hidden truncate sm:inline">{status.text}</span>
      </Link>
      <div className="flex items-center gap-1">
        {/* While closed, 911 sits in the bar on every page (a 3am chest pressure test found no 911 on the home page).
            Plain text, not a tel: link: the clinic does not want accidental emergency calls. */}
        {status.ready && !status.open ? (
          <span aria-label={emergencyCopy.closedLine} className="ml-3 shrink-0 whitespace-nowrap font-semibold text-sun md:mr-3">
            <span className="rm-911-long">{emergencyCopy.closedLine}</span>
            <span aria-hidden className="rm-911-short">{emergencyCopy.call911}</span>
          </span>
        ) : null}
        <TextControls inverse compact className="mr-3 hidden text-[13px] md:flex" />
        <SocialIcons className="hidden sm:flex" />
        <span aria-hidden className={cn("mx-2.5 hidden h-4 w-px bg-white/25", status.ready && !status.open ? "md:block" : "sm:block")} />
        <Link href={routes.referrals} className={cn("hidden whitespace-nowrap font-semibold text-sun hover:text-sun-soft", status.ready && !status.open ? "md:inline" : "min-[400px]:inline")}>
          For referring doctors ›
        </Link>
        {viEnabled ? (
          <>
            <span aria-hidden className="ml-3 h-4 w-px bg-white/25 sm:ml-4" />
            <Link href={vi} hrefLang="vi" lang="vi" className="ml-1 shrink-0 whitespace-nowrap rounded-[6px] px-2 py-1 font-semibold hover:underline">
              Tiếng Việt
            </Link>
          </>
        ) : null}
      </div>
    </div>
    </div>
  );
}
