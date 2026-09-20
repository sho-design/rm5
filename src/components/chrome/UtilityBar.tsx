"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { openStatus } from "@/lib/hours";
import { routes } from "@/lib/routes";
import { viEnabled } from "@/lib/prefs";
import { SocialIcons } from "./SocialIcons";
import { cn } from "@/lib/cn";

/**
 * 38px navy utility bar: live open-now status with a 7px sage dot on the
 * left; on the right, social icons, a hairline, the sunshine "For referring
 * doctors ›" link and the EN / Tiếng Việt toggle (hidden until VI is ready).
 */
export function UtilityBar() {
  const [status, setStatus] = useState<{ text: string; open: boolean }>({ text: "Thornhill", open: false });
  const [lang, setLang] = useState<"en" | "vi">("en");
  useEffect(() => {
    const tick = () => setStatus(openStatus());
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex h-[38px] items-center justify-between bg-ink px-4 text-[12px] font-medium text-white md:px-8">
      <span className="flex min-w-0 items-center gap-2" aria-live="polite">
        <span aria-hidden className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: status.open ? "var(--status-open)" : "rgba(255,255,255,.45)" }} />
        <span className="truncate">{status.text}</span>
      </span>
      <div className="flex items-center gap-1">
        <SocialIcons className="hidden sm:flex" />
        <span aria-hidden className="mx-2.5 hidden h-4 w-px bg-white/25 sm:block" />
        <Link href={routes.referrals} className="whitespace-nowrap font-semibold text-sun hover:text-sun-soft">
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
  );
}
