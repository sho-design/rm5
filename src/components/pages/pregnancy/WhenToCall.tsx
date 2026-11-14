"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import { callCopy as c } from "@/content/pregnancy-extra";
import { site } from "@/content/site";
import { radioKeys, rovingTab, useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

/** Tier colours: clinic in sky, after hours in sun, emergency in the site's terracotta tint (calm, never pulsing). */
const TIER = [
  { bg: "var(--rm-sky-soft)", line: "var(--rm-sky)", ink: "var(--rm-sky-text)", href: site.phoneHref },
  { bg: "var(--rm-sun-tint)", line: "var(--rm-amber-deep)", ink: "var(--rm-amber-text)", href: "tel:811" },
  { bg: "var(--rm-terracotta-tint)", line: "var(--rm-terracotta-deep)", ink: "var(--rm-terracotta-text)", href: "tel:911" },
];

/**
 * "When to call us" (Pregnancy care, November 2026). Added because a pregnant tester with bad nausea found no
 * warning signs on the page (round 18): the topic's one-line "Call us the same day" fact becomes a three-tier ladder.
 * The tiers stack in once when the section comes on screen; tapping what is happening slides a marker to its tier,
 * which lights. Slow and steady on purpose: nothing flashes or pulses. With reduced motion the tiers are simply
 * shown and the chosen one lights. Every tier ends in a real tel: link. Copy: content/pregnancy-extra.ts.
 */
export function WhenToCall() {
  const reduced = useReducedMotion();
  const [pick, setPick] = useState(-1);
  const [seen, setSeen] = useState(false);
  const [markY, setMarkY] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const tiers = useRef<(HTMLLIElement | null)[]>([]);
  const ladder = useRef<HTMLOListElement>(null);
  const tier = pick >= 0 ? c.chips[pick].tier : -1;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The marker sits beside the chosen tier, measured from the ladder so it follows wrapping text.
  useLayoutEffect(() => {
    const place = () => {
      const t = tier >= 0 ? tiers.current[tier] : null;
      const l = ladder.current;
      if (!t || !l) return setMarkY(null);
      setMarkY(t.offsetTop + t.offsetHeight / 2);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [tier]);

  return (
    <Section id="when-to-call" className="rm-paper scroll-mt-24">
      <style>{`
        @keyframes wc-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .wc-tier { opacity: 0; }
        .wc-seen .wc-tier { animation: wc-in 400ms cubic-bezier(.2,.8,.2,1) both; }
        .wc-tier { transition: box-shadow 300ms cubic-bezier(.2,.8,.2,1), transform 300ms cubic-bezier(.2,.8,.2,1), border-color 300ms; }
        .wc-mark { transition: top 400ms cubic-bezier(.2,.8,.2,1), opacity 300ms; }
        @media (prefers-reduced-motion: reduce) {
          .wc-tier { opacity: 1; }
          .wc-seen .wc-tier { animation: none; }
          .wc-tier, .wc-mark { transition: none; }
        }
        :root[data-theme="contrast"] .wc-tier { border: 2px solid var(--rm-ink) !important; }
        :root[data-theme="contrast"] .wc-chip { border: 2px solid var(--rm-ink) !important; }
      `}</style>
      <div
        ref={box}
        className={cn(
          "grid grid-cols-1 gap-8 rounded-block bg-page p-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12",
          (seen || reduced) && "wc-seen",
        )}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="inherit" className="text-terracotta-text">
              {c.eyebrow}
            </Eyebrow>
            <Display size="sm">{c.title}</Display>
            <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.lead}</p>
          </div>
          <div className="flex flex-col gap-2.5">
            <span id="wc-pick" className="text-[15px] font-semibold">
              {c.pickLabel}
            </span>
            <div role="radiogroup" aria-labelledby="wc-pick" onKeyDown={radioKeys} className="flex flex-wrap gap-2">
              {c.chips.map((ch, i) => {
                const on = i === pick;
                const tc = TIER[ch.tier];
                return (
                  <button
                    key={ch.label}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={rovingTab(on, i, pick >= 0)}
                    onClick={() => setPick(i)}
                    className={cn(
                      "wc-chip flex min-h-[44px] items-center gap-2 rounded-chip border-[1.5px] px-4 text-left text-[14px] font-semibold transition-colors duration-300",
                      on ? "border-ink bg-ink text-white" : "border-[color:var(--border-default)] bg-page text-ink hover:border-ink",
                    )}
                  >
                    <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ background: tc.line }} />
                    {ch.label}
                  </button>
                );
              })}
            </div>
            <p aria-live="polite" className="sr-only">
              {pick >= 0 ? c.matched(c.chips[pick].label, `${c.tiers[tier].t}. ${c.tiers[tier].d}`) : ""}
            </p>
          </div>
        </div>

        {/* The ladder: three tiers, the chosen one lit, with a marker that moves beside it. */}
        <div className="relative pl-7">
          <span
            aria-hidden
            className="wc-mark absolute left-0 h-4 w-4 -translate-y-1/2 rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(15,31,46,.25)]"
            style={{
              top: markY ?? 0,
              opacity: markY == null ? 0 : 1,
              background: tier >= 0 ? TIER[tier].line : "transparent",
            }}
          />
          <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-0.5 rounded-full bg-[color:var(--border-default)]" />
          <ol ref={ladder} className="relative flex flex-col gap-3">
            {c.tiers.map((t, i) => {
              const tc = TIER[i];
              const on = i === tier;
              return (
                <li
                  key={t.k}
                  ref={(el) => {
                    tiers.current[i] = el;
                  }}
                  className="wc-tier flex flex-col gap-2 rounded-card border-2 p-5 md:flex-row md:items-center md:justify-between md:gap-6"
                  style={{
                    background: tc.bg,
                    borderColor: on ? tc.line : "transparent",
                    boxShadow: on ? "0 10px 28px rgba(15,31,46,.10)" : "none",
                    transform: on && !reduced ? "translateX(4px)" : "none",
                    animationDelay: `${i * 140}ms`,
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[17px] font-semibold leading-[1.25]" style={{ color: "var(--rm-ink)" }}>
                      {t.t}
                    </span>
                    <span className="pretty text-[15px] leading-[1.5]" style={{ color: "var(--rm-ink-2)" }}>
                      {t.d}
                    </span>
                  </div>
                  <a
                    href={tc.href}
                    className="flex min-h-[44px] w-fit shrink-0 items-center rounded-chip bg-ink px-4 text-[15px] font-semibold text-white hover:opacity-90"
                  >
                    {t.action}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
