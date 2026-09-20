"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { divisions, navOrder } from "@/content/divisions";
import { locations, site } from "@/content/site";
import { href, routes } from "@/lib/routes";
import { viEnabled } from "@/lib/prefs";
import { Wordmark } from "./Wordmark";
import { SocialIcons } from "./SocialIcons";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Full-screen navy mobile menu: accordion divisions (Fraunces 26), clinic
 * cards with status, EN / Tiếng Việt toggle, 44px social icons, referring
 * doctors link and a sticky Book + Call row.
 */
export function MobileMenu({ onClose, onSearch }: { onClose: () => void; onSearch: () => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const [lang, setLang] = useState<"en" | "vi">("en");
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-ink text-white" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="flex shrink-0 items-center justify-between px-4 pb-2.5 pt-3.5">
        <Wordmark size="sm" inverse />
        <div className="flex gap-1.5">
          <button type="button" onClick={onSearch} aria-label="Search" className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-white/25">
            <Icon name="search" size={16} stroke={2} />
          </button>
          <button type="button" onClick={onClose} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[22px] leading-none text-ink">
            ×
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[18px] overflow-y-auto px-4 pb-4 pt-1">
        <div className="flex flex-col">
          {navOrder.map((k) => {
            const d = divisions[k];
            const on = open === k;
            return (
              <div key={k} className="flex flex-col border-b border-white/12">
                <div className="grid grid-cols-[1fr_44px] items-center">
                  <Link href={href(k)} onClick={onClose} className="display py-4 text-[26px] leading-none">
                    {d.label}
                  </Link>
                  <button type="button" aria-label={on ? `Collapse ${d.label}` : `Expand ${d.label}`} aria-expanded={on} onClick={() => setOpen(on ? null : k)} className="flex h-11 w-11 items-center justify-center text-[22px] text-white/70">
                    {on ? "−" : "+"}
                  </button>
                </div>
                {on ? (
                  <div className="flex flex-col pb-3">
                    {d.explore.slice(0, 6).map((e) => (
                      <Link key={e.label} href={href(e.page)} onClick={onClose} className="flex justify-between py-3 text-[15px] text-white/85">
                        <span>{e.label}</span>
                        <span className="text-white/50">›</span>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-semibold tracking-[.04em] text-white/55">CLINICS</span>
          {locations.map((l) => (
            <Link key={l.key} href={routes.locations} onClick={onClose} className="flex items-center justify-between gap-3 rounded-row bg-white/7 px-4 py-3.5">
              <span className="flex flex-col gap-[3px]">
                <span className="text-[15px] font-semibold">{l.name}</span>
                <span className="text-[12px] text-white/65">{l.addressLines[0]}</span>
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap text-[12px] font-semibold" style={{ color: l.soon ? "var(--rm-sun)" : "var(--rm-sage)" }}>
                <span aria-hidden className="h-[7px] w-[7px] rounded-full" style={{ background: l.soon ? "var(--rm-sun)" : "var(--rm-sage)" }} />
                {l.soon ? "Opening 2026" : "Open today"}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          {viEnabled ? (
            <div className="flex rounded-chip border-[1.5px] border-white/25 p-[3px]">
              <button type="button" onClick={() => setLang("en")} className={cn("rounded-chip px-3.5 py-[9px] text-[13px] font-semibold", lang === "en" ? "bg-white text-ink" : "text-white")} aria-pressed={lang === "en"}>
                EN
              </button>
              <button type="button" onClick={() => setLang("vi")} className={cn("rounded-chip px-3.5 py-[9px] text-[13px] font-semibold", lang === "vi" ? "bg-white text-ink" : "text-white")} aria-pressed={lang === "vi"}>
                Tiếng Việt
              </button>
            </div>
          ) : (
            <span />
          )}
          <SocialIcons size={44} />
        </div>
        <Link href={routes.referrals} onClick={onClose} className="text-[13px] font-semibold text-sun">
          For referring doctors ›
        </Link>
      </div>
      <div className="flex shrink-0 gap-2 border-t border-white/12 bg-ink px-4 pb-4 pt-3">
        <Link href={routes.book} onClick={onClose} className="flex-[1.4] rounded-chip bg-sun py-[15px] text-center text-[15px] font-semibold text-sun-ink">
          Book an appointment
        </Link>
        <a href={site.phoneHref} className="flex-1 rounded-chip border-[1.5px] border-white/35 py-[15px] text-center text-[15px] font-semibold">
          Call
        </a>
      </div>
    </div>
  );
}
