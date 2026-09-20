"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HeroSlide } from "@/content/types";
import { site } from "@/content/site";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Home hero carousel: five photo slides that auto-advance every 5.5s, pause
 * on hover, and can be swiped on touch. Images cross-fade over 0.9s while the
 * active one drifts to scale 1.06 over 6s.
 */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const n = slides.length;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);

  const next = useCallback(() => setIdx((i) => (i + 1) % n), [n]);
  const prev = useCallback(() => setIdx((i) => (i + n - 1) % n), [n]);

  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [paused, next, n]);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const x = e.changedTouches[0]?.clientX;
    if (startX.current == null || x == null) return;
    const dx = x - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

  const hero = slides[idx];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative mx-3 mt-3 flex min-h-[440px] select-none items-end overflow-hidden rounded-card md:mx-gutter md:mt-6 md:min-h-[620px] md:rounded-block"
      style={{ touchAction: "pan-y" }}
    >
      {slides.map((s, i) => {
        const on = i === idx;
        return (
          <Image
            key={s.img + i}
            src={s.img}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="(max-width: 1280px) 100vw, 1232px"
            draggable={false}
            aria-hidden={!on}
            className="object-cover"
            style={{ opacity: on ? 1 : 0, transform: `scale(${on ? 1.06 : 1})`, transition: "opacity .9s ease, transform 6s linear" }}
          />
        );
      })}
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(10,20,30,0) 38%,rgba(10,20,30,.72) 100%)" }} />

      <div className="relative flex w-full flex-col gap-5 p-5 text-white md:p-12 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="flex max-w-[800px] flex-col gap-2.5 md:gap-5">
          <span className="inline-flex self-start rounded-chip bg-sun px-2.5 py-[5px] text-[11px] font-semibold text-sun-ink md:px-3.5 md:py-[7px] md:text-[13px]">{hero.eyebrow}</span>
          <h1 className="display-tight balance text-[34px] md:text-[56px] lg:text-[78px]">
            {hero.h1} <em>{hero.h1em}</em>
          </h1>
          <p className="pretty max-w-[620px] text-[13px] leading-[1.45] text-white/85 md:text-[19px] md:leading-[1.5]">{hero.p}</p>
          <div className="mt-1 flex flex-wrap gap-2.5 md:mt-0">
            <Button to={hero.page} variant="inverse">
              {hero.cta}
            </Button>
            <a href={site.phoneHref} className="hidden h-12 items-center rounded-chip border-[1.5px] border-white/60 px-6 text-[15px] font-medium leading-none transition-colors hover:border-white md:inline-flex">
              Call {site.phone}
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2 lg:flex-col lg:items-end lg:pt-0">
          <div className="order-2 flex gap-2 lg:order-1">
            <button type="button" onClick={prev} aria-label="Previous slide" className="flex h-[34px] w-[34px] items-center justify-center rounded-full border-[1.5px] border-white/50 text-[16px] leading-none transition-colors hover:border-white md:h-10 md:w-10 md:text-[18px]">
              ‹
            </button>
            <button type="button" onClick={next} aria-label="Next slide" className="flex h-[34px] w-[34px] items-center justify-center rounded-full border-[1.5px] border-white/50 text-[16px] leading-none transition-colors hover:border-white md:h-10 md:w-10 md:text-[18px]">
              ›
            </button>
          </div>
          <div className="order-1 flex gap-1.5 lg:order-2" role="group" aria-label="Choose a slide">
            {slides.map((s, i) => {
              const on = i === idx;
              return (
                <button
                  key={s.alt + i}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={s.alt}
                  aria-current={on ? "true" : undefined}
                  className={cn("h-1 rounded-chip transition-all duration-[400ms]", on ? "w-9 bg-sun" : "w-3.5 bg-white/45 hover:bg-white/70")}
                />
              );
            })}
          </div>
          <span className="order-3 hidden whitespace-nowrap text-[13px] text-white/80 lg:block">{hero.sub}</span>
        </div>
      </div>
    </section>
  );
}
