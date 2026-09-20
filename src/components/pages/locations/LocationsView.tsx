"use client";

import { useState } from "react";
import { Block, Button, Display, Photo, SmartLink } from "@/components/ui";
import { cn } from "@/lib/cn";
import { locationsCopy } from "@/content/about";
import { site } from "@/content/site";
import { HoursCard } from "./HoursCard";
import { WaitlistForm } from "./WaitlistForm";
import type { LocationView } from "./types";

/**
 * Thornhill / Maple tabs and everything that changes with them: photo,
 * navy detail card, hours, service tiles, the Maple waitlist and the band.
 */
export function LocationsView({ locations }: { locations: LocationView[] }) {
  const [i, setI] = useState(0);
  const [waitlist, setWaitlist] = useState(false);
  const loc = locations[i];
  const c = locationsCopy;
  const phone = loc.phone ?? site.phone;
  const phoneHref = `tel:${phone.replace(/\D/g, "")}`;

  function pick(n: number) {
    setI(n);
    setWaitlist(false);
  }
  function openWaitlist() {
    setWaitlist(true);
    window.setTimeout(() => {
      document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("wl-name")?.focus({ preventScroll: true });
    }, 50);
  }

  const Cta = ({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) =>
    loc.soon ? (
      <Button size={size} onClick={openWaitlist} className={className} aria-expanded={waitlist} aria-controls="waitlist">
        {loc.cta}
      </Button>
    ) : (
      <Button size={size} to="book" className={className}>
        {loc.cta}
      </Button>
    );

  return (
    <>
      {/* Tabs */}
      <div role="tablist" aria-label={c.eyebrow} className="scroll-x flex gap-1.5 px-4 pt-8 md:px-content md:pt-10">
        {locations.map((l, n) => {
          const on = n === i;
          return (
            <button
              key={l.key}
              type="button"
              role="tab"
              id={`loc-tab-${l.key}`}
              aria-selected={on}
              aria-controls={`loc-panel-${l.key}`}
              onClick={() => pick(n)}
              className={cn(
                "shrink-0 rounded-chip border-[1.5px] px-5 py-[11px] text-[14px] font-semibold transition-all duration-[250ms] active:scale-[.98]",
                on ? "border-ink bg-ink text-white" : "border-border bg-white text-primary hover:border-sky",
              )}
            >
              {l.name}
              {l.soon ? c.soonTab : ""}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`loc-panel-${loc.key}`} aria-labelledby={`loc-tab-${loc.key}`}>
        {/* Photo + detail */}
        <div className="grid grid-cols-1 items-stretch gap-block px-3 pt-6 md:px-content lg:grid-cols-[1.2fr_1fr]">
          <Photo src={loc.img} alt={loc.name} radius="block" className="min-h-[300px] md:min-h-[420px] lg:min-h-[480px]" sizes="(max-width: 1024px) 100vw, 55vw" priority>
            {loc.soon ? <span className="absolute left-5 top-5 rounded-chip bg-sun px-3.5 py-[7px] text-[13px] font-semibold text-sun-ink">{c.soonPill}</span> : null}
          </Photo>
          <div className="flex flex-col gap-block">
            <div className="flex flex-1 flex-col gap-[18px] rounded-card bg-inverse p-6 text-on-inverse md:p-8">
              <Display as="h2" size="2xs" tight className="text-white">
                {loc.name}
              </Display>
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-semibold text-white/60">{c.address}</span>
                <span className="text-[16px] leading-[1.45]">{loc.address}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-semibold text-white/60">{c.phone}</span>
                <a href={phoneHref} className="self-start text-[16px]">
                  {phone}
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-semibold text-white/60">{c.access}</span>
                <span className="text-[15px] leading-[1.45] text-white/80">{loc.access}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1.5">
                {loc.soon ? (
                  <Button variant="inverse" onClick={openWaitlist} aria-expanded={waitlist} aria-controls="waitlist">
                    {loc.cta}
                  </Button>
                ) : (
                  <Button variant="inverse" to="book">
                    {loc.cta}
                  </Button>
                )}
                <Button variant="outline-inverse" to={loc.map}>
                  {c.directions}
                </Button>
              </div>
            </div>
            <HoursCard hours={loc.hours} live={!loc.soon} />
          </div>
        </div>

        {loc.soon && waitlist ? (
          <div id="waitlist" className="scroll-mt-6 px-3 pt-block md:px-content">
            <WaitlistForm />
          </div>
        ) : null}

        {/* Services at this location */}
        <section className="flex flex-col gap-4 px-4 pt-10 md:px-content" aria-label={c.servicesAt + loc.name}>
          <Display as="h2" size="title-lg" tight={false} className="text-[28px] lg:text-[32px]">
            {c.servicesAt}
            {loc.name}
          </Display>
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-6 md:grid-cols-3 md:gap-card lg:grid-cols-5">
            {loc.tiles.map((s) => (
              <div key={s.key} className="flex flex-col gap-3.5">
                <SmartLink to={s.key} className="block" aria-label={s.label}>
                  <Photo src={s.img} alt="" ratio="4 / 5" radius="card-sm" tint={s.tint} sizes="(max-width: 768px) 50vw, 20vw" />
                </SmartLink>
                <div className="flex flex-1 flex-col gap-1.5 px-1">
                  <span className="display-tight text-[19px] leading-[1.05] tracking-[-.02em] md:text-[22px]">{s.label}</span>
                  <span className="text-[13px] leading-[1.45] text-muted">{s.tag}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 px-1 text-[14px] font-semibold">
                  <Button to="book" variant="secondary" size="sm" className="h-auto px-5 py-[11px] text-[14px]">
                    {c.book}
                  </Button>
                  <SmartLink to={s.key} className="text-link">
                    {c.learn} ›
                  </SmartLink>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing band */}
        <Block tone="sun" tight last className="flex flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:gap-8 md:px-12 md:py-10">
          <div className="flex flex-col gap-1.5">
            <Display as="h2" size="title-lg" tight={false}>
              {loc.footCta}
            </Display>
            <span className="text-[15px] leading-[1.5] text-ink/75">{loc.footSub}</span>
          </div>
          <Cta className="shrink-0 self-start md:self-auto" />
        </Block>
      </div>
    </>
  );
}
