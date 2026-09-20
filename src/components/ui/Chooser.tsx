"use client";

import { useState, type ReactNode } from "react";
import type { ChooserOption, ChooserResult, SubChooserItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { Display, Eyebrow, Lead } from "./Text";
import { OptionList } from "./OptionList";
import { ResultCard } from "./ResultCard";

/**
 * Chooser block: tinted 28px block, option list left (sticky), floating
 * result card right. State is local to the page; resets on navigation.
 */
export function Chooser({
  eyebrow,
  title,
  intro,
  options,
  results,
  tint,
  accent,
  ctaTo = "book",
  defaultValue = 0,
  value,
  onChange,
  left,
  optionsNote,
  compactOptions,
  className,
  asSection = true,
  titleSize = "md",
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  options: ChooserOption[];
  results: ChooserResult[];
  tint: string;
  accent: string;
  ctaTo?: string;
  defaultValue?: number;
  value?: number;
  onChange?: (i: number) => void;
  /** Extra content rendered in the left column below the intro (e.g. the pain body map). */
  left?: ReactNode;
  optionsNote?: string;
  compactOptions?: boolean;
  className?: string;
  asSection?: boolean;
  titleSize?: "md" | "sm" | "xs";
  id?: string;
}) {
  const [inner, setInner] = useState(defaultValue);
  const pick = value ?? inner;
  const set = (i: number) => {
    setInner(i);
    onChange?.(i);
  };
  const r = results[pick] ?? results[0];
  const sizeClass = { md: "text-[36px] md:text-[44px] lg:text-[52px]", sm: "text-[32px] md:text-[40px] lg:text-[48px]", xs: "text-[30px] md:text-[36px] lg:text-[44px]" }[titleSize];
  return (
    <section
      id={id}
      className={cn(
        asSection && "mx-3 mt-12 md:mx-gutter md:mt-section",
        "grid grid-cols-1 gap-8 rounded-block p-5 md:p-10 lg:grid-cols-[1fr_1.25fr] lg:gap-12 lg:items-start lg:px-12 lg:py-14",
        className,
      )}
      style={{ background: tint }}
    >
      <div className="flex flex-col gap-5 lg:sticky lg:top-6">
        <Eyebrow tone="inherit" style={{ color: accent }}>
          {eyebrow}
        </Eyebrow>
        <Display size="md" className={sizeClass}>
          {title}
        </Display>
        {intro ? <Lead size="base">{intro}</Lead> : null}
        {left}
        {!left ? (
          <div className="flex flex-col gap-1.5 pt-1.5">
            {optionsNote ? <span className="pb-1 text-[12px] font-semibold text-muted">{optionsNote}</span> : null}
            <OptionList options={options} value={pick} onChange={set} compact={compactOptions} />
          </div>
        ) : null}
      </div>
      <ResultCard tags={r.tags} tagTint={tint} title={r.title} p={r.p} facts={r.facts} cta={r.cta} ctaTo={r.ctaPage ?? ctaTo} link={r.link} linkTo={r.linkPage} />
    </section>
  );
}

/**
 * Sub-page chooser (women, men, bloodwork, chronic, kids): each option carries
 * its own result. Result card shows tags, title, body, facts and one CTA.
 */
export function SubChooser({
  eyebrow,
  title,
  intro,
  items,
  tint,
  accent,
  ctaTo = "book",
  link,
  linkTo,
  value,
  onChange,
  titleSize = "sm",
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  items: SubChooserItem[];
  tint: string;
  accent: string;
  ctaTo?: string;
  link?: string;
  linkTo?: string;
  value?: number;
  onChange?: (i: number) => void;
  titleSize?: "md" | "sm" | "xs";
  id?: string;
}) {
  const results: ChooserResult[] = items.map((it) => ({ title: it.title, p: it.p, facts: it.facts, tags: it.tags, cta: it.cta, link, linkPage: linkTo }));
  return (
    <Chooser
      id={id}
      eyebrow={eyebrow}
      title={title}
      intro={intro}
      options={items.map((it) => ({ label: it.label, sub: it.sub }))}
      results={results}
      tint={tint}
      accent={accent}
      ctaTo={ctaTo}
      value={value}
      onChange={onChange}
      titleSize={titleSize}
    />
  );
}
