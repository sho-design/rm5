"use client";

import Link from "next/link";
import { useState } from "react";
import { useOpenStatus } from "@/lib/use-open-status";
import { routes } from "@/lib/routes";
import { viEnabled } from "@/lib/prefs";
import { SocialIcons } from "./SocialIcons";
import { TextControls } from "./TextControls";
import { cn } from "@/lib/cn";

/**
 * 38px navy utility bar: live open-now status with a 7px sage dot on the
 * left; on the right, social icons, a hairline, the sunshine "For referring
 * doctors ›" link and the EN / Tiếng Việt toggle (hidden until VI is ready).
 */
export function UtilityBar() {
  const status = useOpenStatus();
  const [lang, setLang] = useState<"en" | "vi">("en");
  return (
    <div role="region" aria-label="Clinic status and display settings" className="bg-ink text-white">
    <div className="mx-auto flex h-[38px] w-full max-w-[1440px] items-center justify-between px-4 text-[12px] font-medium md:px-8">
      <Link href={`${routes.locations}#thornhill`} className="flex min-w-0 items-center gap-2 hover:underline" aria-label={status.ready ? `${status.text}. See hours` : "Thornhill hours"}>
        <span aria-hidden className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: status.open ? "var(--status-open)" : "rgba(255,255,255,.45)" }} />
        <span className="truncate sm:hidden">{status.ready ? status.short : "Thornhill"}</span>
        <span className="hidden truncate sm:inline">{status.text}</span>
      </Link>
      <div className="flex items-center gap-1">
        <TextControls inverse compact className="mr-3 hidden text-[13px] md:flex" />
        <SocialIcons className="hidden sm:flex" />
        <span aria-hidden className="mx-2.5 hidden h-4 w-px bg-white/25 sm:block" />
        <Link href={routes.referrals} className="hidden whitespace-nowrap font-semibold text-sun hover:text-sun-soft min-[400px]:inline">
          For referring doctors ›
        </Link>
        {viEnabled ? (
          <>
            <span aria-hidden className="ml-4 h-4 w-px bg-white/25" />
            <button type="button" onClick={() => setLang("en")} className={cn("rounded-[6px] px-2 py-1", lang === "en" ? "font-semibold text-white" : "text-white/60")} aria-pressed={lang === "en"} lang="en">
              EN
            </button>
            <button type="button" onClick={() => setLang("vi")} className={cn("rounded-[6px] px-2 py-1", lang === "vi" ? "font-semibold text-white" : "text-white/60")} aria-pressed={lang === "vi"} lang="vi">
              Tiếng Việt
            </button>
          </>
        ) : null}
      </div>
    </div>
    </div>
  );
}
