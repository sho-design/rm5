"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { divisions, menuHeadings, navOrder } from "@/content/divisions";
import { locations, site } from "@/content/site";
import { emergencyCopy } from "@/content/patient-help";
import { href, routes, viPairs, viRoutes } from "@/lib/routes";
import { viEnabled } from "@/lib/prefs";
import { Wordmark } from "./Wordmark";
import { OpenBadge } from "./OpenBadge";
import { TextControls } from "./TextControls";
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
  const pathname = usePathname();
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Lets the cookie banner step aside while the menu is open (it sits above the header's layer).
    document.documentElement.dataset.menu = "open";
    // Escape closes the menu (two testers pressed it and nothing happened).
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      delete document.documentElement.dataset.menu;
    };
  }, [onClose]);
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
      <div className="flex flex-1 flex-col gap-[18px] overflow-y-auto px-4 pb-8 pt-1">
        <TextControls inverse className="flex-wrap text-[13px]" />
        <div className="flex flex-col">
          {navOrder.map((k) => {
            const d = divisions[k];
            const on = open === k;
            return (
              <div key={k} className="flex flex-col border-b border-white/12">
                {/* The whole row expands the section (people expect that on a phone); "All ..." is its first link. */}
                <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : k)} className="grid grid-cols-[1fr_44px] items-center text-left">
                  <span className="display py-4 text-[26px] leading-none">{d.label}</span>
                  <span aria-hidden className="flex h-11 w-11 items-center justify-center text-[22px] text-white/70">
                    {on ? "−" : "+"}
                  </span>
                </button>
                {on ? (
                  <div className="flex flex-col pb-3">
                    {/* Every link the desktop mega menu offers: explore, book, then more. */}
                    {[d.explore, d.book, d.more].map((group, gi) => (
                      <div key={gi} className={cn("flex flex-col", gi > 0 && "mt-2 border-t border-white/12 pt-2")}>
                        {gi > 0 ? <span className="pb-1 pt-2 text-[11px] font-semibold tracking-[.04em] text-white/70">{gi === 1 ? menuHeadings.book(d) : menuHeadings.more(d)}</span> : null}
                        {group.map((e) => (
                          <Link key={e.label} href={href(e.page)} onClick={onClose} className="flex justify-between py-3 text-[15px] text-white/85">
                            <span>{e.label}</span>
                            <span aria-hidden className="text-white/50">
                              ›
                            </span>
                          </Link>
                        ))}
                      </div>
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
            <Link key={l.key} href={`${routes.locations}#${l.key}`} onClick={onClose} className="flex items-center justify-between gap-3 rounded-row bg-white/7 px-4 py-3.5">
              <span className="flex min-w-0 flex-col gap-[3px]">
                <span className="text-[15px] font-semibold">{l.name}</span>
                <span className="text-[12px] text-white/65">{l.addressLines[0]}</span>
              </span>
              {l.soon ? (
                <span className="flex items-center gap-1.5 whitespace-nowrap text-[12px] font-semibold text-sun">
                  <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-sun" />
                  Coming soon
                </span>
              ) : (
                <OpenBadge inverse className="text-right text-white" />
              )}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          {viEnabled ? (
            <Link href={viPairs[pathname ?? "/"] ?? viRoutes.home} hrefLang="vi" lang="vi" className="rounded-chip border-[1.5px] border-white/25 px-4 py-[10px] text-[13px] font-semibold text-white">
              Tiếng Việt
            </Link>
          ) : (
            <span />
          )}
          <SocialIcons size={44} />
        </div>
        {/* For people who are not sure it is an emergency: a tester short of breath found only departments here. */}
        <a href="tel:811" className="flex flex-col gap-0.5 rounded-row bg-white/7 px-4 py-3.5">
          <span className="text-[13px] text-white/75">{emergencyCopy.unsure}</span>
          <span className="text-[15px] font-semibold text-white">{emergencyCopy.call811}</span>
        </a>
        <Link href={routes.contact} onClick={onClose} className="text-[15px] font-semibold text-white">
          {menuHeadings.contact} ›
        </Link>
        <Link href={routes.referrals} onClick={onClose} className="text-[13px] font-semibold text-sun">
          For referring doctors ›
        </Link>
      </div>
      <div className="rm-menu-foot flex shrink-0 flex-col gap-2 border-t border-white/12 bg-ink px-4 pb-4 pt-2.5">
        {/* No tel:911 link anywhere on the site: the clinic does not want accidental emergency calls. 911 is plain text. */}
        <p aria-label={emergencyCopy.closedLine} className="text-center text-[15px] font-semibold leading-tight text-sun">
          <span className="rm-911-long">{emergencyCopy.closedLine}</span>
          <span aria-hidden className="rm-911-short">{emergencyCopy.call911}</span>
        </p>
        <div className="flex flex-1 gap-2">
          <Link href={routes.book} onClick={onClose} className="flex flex-[1.4] items-center justify-center rounded-chip bg-sun px-3 py-[13px] text-center text-[15px] font-semibold leading-tight text-sun-ink">
            <span className="rm-menu-book-long">Book an appointment</span>
            <span className="rm-menu-book-short">Book</span>
          </Link>
          <a href={site.phoneHref} aria-label={`${emergencyCopy.callClinic}, ${site.phone}`} className="flex flex-1 items-center justify-center rounded-chip border-[1.5px] border-white/35 px-2 py-[13px] text-center text-[15px] font-semibold leading-tight">
            {emergencyCopy.callClinic}
          </a>
        </div>
      </div>
    </div>
  );
}
