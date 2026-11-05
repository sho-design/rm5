"use client";

import { useState } from "react";
import { dripFamilies, dripFinder as c, signatureDrips } from "@/content/infusion-site";
import { Display, Eyebrow, SmartLink } from "@/components/ui";
import { buttonClass } from "@/components/ui/Button";
import { bookFor, dripRoute } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Bag } from "./DripArt";

/**
 * "What brings you in?" One tap shows drips that fit, matched by occasion and contents only (no results promised).
 * "Not sure" points to a consult; "unwell, being sick or pregnant" points to a doctor, never to a drip.
 */
export function DripFinder() {
  const [pick, setPick] = useState<number | null>(null);
  const opt = pick == null ? null : c.options[pick];
  const matches = opt?.drips ? opt.drips.map((s) => signatureDrips.find((d) => d.slug === s)).filter((d) => d != null) : [];
  return (
    <div className="grid grid-cols-1 gap-8 rounded-block bg-sun-tint p-6 text-ink md:p-10 lg:grid-cols-[1fr_1.3fr] lg:gap-12 lg:p-12">
      <div className="flex flex-col gap-4">
        <Eyebrow tone="inherit" className="text-sun-ink">
          {c.eyebrow}
        </Eyebrow>
        <Display size="sm">{c.title}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.lead}</p>
        <div role="radiogroup" aria-label={c.title} className="flex flex-wrap gap-2">
          {c.options.map((o, i) => (
            <button
              key={o.t}
              type="button"
              role="radio"
              aria-checked={pick === i}
              onClick={() => setPick(i)}
              className={cn(
                "rounded-chip border-[1.5px] px-4 py-2.5 text-left text-[14px] font-semibold motion-safe:transition-colors motion-safe:duration-200",
                pick === i ? "border-ink bg-ink text-white" : o.unwell ? "border-terracotta/40 bg-white text-ink hover:border-terracotta" : "border-transparent bg-white text-ink hover:border-sky",
              )}
            >
              {o.t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-[260px] flex-col justify-center gap-4" aria-live="polite">
        {opt == null ? (
          <div className="flex items-center gap-4 rounded-card bg-white/60 p-6">
            <Bag color={dripFamilies.Foundation} className="opacity-70" />
            <span className="text-[15px] text-secondary">{c.lead}</span>
          </div>
        ) : opt.unwell ? (
          <div className="flex flex-col gap-3 rounded-card bg-[color:var(--div-pain)] p-6">
            <Display size="2xs">{c.unwellTitle}</Display>
            <p className="pretty text-[15px] leading-[1.55]">{c.unwellP}</p>
            <SmartLink to={bookFor("family", "concern")} className={buttonClass("primary", "md", "self-start")}>
              {c.unwellCta}
            </SmartLink>
          </div>
        ) : opt.consult ? (
          <div className="flex flex-col gap-3 rounded-card bg-white p-6">
            <Display size="2xs">{c.consultTitle}</Display>
            <p className="pretty text-[15px] leading-[1.55] text-secondary">{c.consultP}</p>
            <SmartLink to={bookFor("infusion", "consult")} className={buttonClass("primary", "md", "self-start")}>
              Book a consult
            </SmartLink>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <span className="text-[13px] font-semibold text-secondary">{c.matches}</span>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {matches.map((d) => (
                <SmartLink key={d.slug} to={dripRoute(d.slug)} className="group flex items-center gap-4 rounded-card-sm bg-white p-4 transition-shadow hover:shadow-[0_6px_20px_rgba(16,24,40,.08)]">
                  <Bag color={dripFamilies[d.f]} className="h-[64px] w-[43px]" />
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[16px] font-semibold">{d.t} ›</span>
                    <span className="text-[13px] text-muted">{d.d}</span>
                  </span>
                </SmartLink>
              ))}
            </div>
          </div>
        )}
        {opt != null ? (
          <button type="button" onClick={() => setPick(null)} className="self-start text-[14px] font-semibold text-link">
            {c.again}
          </button>
        ) : null}
      </div>
    </div>
  );
}
