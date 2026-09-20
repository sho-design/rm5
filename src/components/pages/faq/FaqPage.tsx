"use client";

import { useMemo, useState } from "react";
import { Block, Button, ChipRow, Display, SmartLink } from "@/components/ui";
import type { FaqItem } from "@/content/types";
import { faqCopy } from "@/content/faq";
import { cn } from "@/lib/cn";

interface Props {
  items: FaqItem[];
  categories: string[];
}

/**
 * FAQ page: search + category rail filter the list; questions stay grouped
 * by category and only one answer is open across the page. Typing in the
 * search closes the open answer, as the prototype does.
 */
export function FaqPage({ items, categories }: Props) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(0);
  const [open, setOpen] = useState(0);

  const counts = useMemo(() => categories.map((c, i) => (i === 0 ? items.length : items.filter((x) => x.category === c).length)), [categories, items]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const active = categories[cat];
    const matches = items.filter((x) => (cat === 0 || x.category === active) && (!q || `${x.q} ${x.a}`.toLowerCase().includes(q)));
    return categories
      .slice(1)
      .map((c) => ({ label: c, items: matches.filter((x) => x.category === c).map((x) => ({ ...x, id: items.indexOf(x) })) }))
      .filter((g) => g.items.length);
  }, [categories, cat, items, query]);

  const railItems = categories.map((c, i) => ({ label: c, count: counts[i] }));

  return (
    <>
      {/* Header: title left, search right */}
      <div className="grid grid-cols-1 gap-5 px-4 pt-8 md:px-content md:pt-16 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-10">
        <div className="flex flex-col gap-4">
          <SmartLink to="about" className="eyebrow text-link">
            {faqCopy.crumb}
          </SmartLink>
          <Display as="h1" size="lg">
            {faqCopy.title}
          </Display>
          <p className="pretty max-w-[560px] text-[16px] leading-[1.55] text-muted lg:text-[18px]">{faqCopy.lead}</p>
        </div>
        <label className="flex h-14 items-center gap-2.5 rounded-row border-[1.5px] border-border bg-card px-[18px] transition-colors focus-within:border-sky">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="shrink-0 text-muted" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <span className="sr-only">{faqCopy.searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(-1);
            }}
            placeholder={faqCopy.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-[15px] text-primary outline-none placeholder:text-muted"
          />
        </label>
      </div>

      {/* Rail + groups */}
      <div className="grid grid-cols-1 gap-6 px-4 pt-6 md:px-content md:pt-10 lg:grid-cols-[260px_1fr] lg:items-start lg:gap-10">
        <ChipRow items={railItems} value={cat} onChange={setCat} ariaLabel="Category" size="sm" className="lg:hidden" />
        <div className="hidden flex-col gap-1 lg:sticky lg:top-[80px] lg:flex">
          <div role="tablist" aria-label="Category" aria-orientation="vertical" className="flex flex-col gap-1">
            {categories.map((c, i) => {
              const on = cat === i;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setCat(i)}
                  className={cn("flex items-center justify-between gap-3 rounded-[14px] px-4 py-3 text-left text-[14px] font-semibold transition-colors", on ? "bg-ink text-white" : "text-ink hover:bg-card")}
                >
                  <span>{c}</span>
                  <span className="text-[12px] opacity-60">{counts[i]}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex flex-col gap-2.5 rounded-[20px] bg-sun-soft p-5 text-ink">
            <Display as="h2" size="title-xs" balance={false} className="leading-[1.05]">
              {faqCopy.still.title}
            </Display>
            <span className="text-[13px] leading-[1.5] text-secondary">{faqCopy.still.body}</span>
            <Button to="contact" size="sm" className="self-start">
              {faqCopy.still.cta}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:gap-10">
          {groups.map((g) => (
            <section key={g.label} className="flex flex-col gap-1.5" aria-labelledby={`faq-${g.label}`}>
              <h2 id={`faq-${g.label}`} className="eyebrow pb-2.5 text-link">
                {g.label}
              </h2>
              <div className="flex flex-col">
                {g.items.map((f) => {
                  const on = open === f.id;
                  return (
                    <div key={f.id} className="border-t border-border">
                      <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : f.id)} className="flex w-full items-center justify-between gap-5 py-4 text-left md:py-5">
                        <span className="text-[16px] font-semibold leading-[1.3] md:text-[17px]">{f.q}</span>
                        <span aria-hidden className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-border text-[17px] transition-transform duration-[250ms]" style={{ transform: on ? "rotate(45deg)" : "rotate(0deg)" }}>
                          +
                        </span>
                      </button>
                      {on ? (
                        <div className="mb-[22px] flex max-w-[640px] flex-col gap-3">
                          <p className="pretty text-[16px] leading-[1.6] text-secondary">{f.a}</p>
                          {f.linkLabel && f.linkPage ? (
                            <SmartLink to={f.linkPage} className="text-[14px] font-semibold text-link">
                              {f.linkLabel} ›
                            </SmartLink>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                <div className="border-t border-border" />
              </div>
            </section>
          ))}
          {groups.length === 0 ? (
            <div className="flex flex-col gap-2.5 rounded-card border border-border bg-card p-7 md:p-10" role="status">
              <Display as="h2" size="title-md" balance={false}>
                {faqCopy.empty.title}
              </Display>
              <span className="text-[15px] leading-[1.5] text-muted">{faqCopy.empty.body}</span>
              <Button to="contact" size="md" className="mt-1.5 self-start">
                {faqCopy.empty.cta}
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Closing band (sky tint, per the prototype) */}
      <Block tone="none" last className="grid grid-cols-1 items-center gap-8 bg-sky-soft p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:gap-10 lg:p-14">
        <div className="flex flex-col gap-3">
          <Display size="sm">{faqCopy.band.title}</Display>
          <p className="pretty max-w-[620px] text-[16px] leading-[1.5] text-[color:var(--rm-ink-2)] lg:text-[17px]">{faqCopy.band.sub}</p>
        </div>
        <div className="flex flex-col items-start gap-2.5 lg:items-end">
          <Button to="book" size="lg">
            {faqCopy.band.cta}
          </Button>
          <SmartLink to="register" className="text-[14px] font-semibold text-[color:var(--rm-ink-2)]">
            {faqCopy.band.link} ›
          </SmartLink>
        </div>
      </Block>
    </>
  );
}
