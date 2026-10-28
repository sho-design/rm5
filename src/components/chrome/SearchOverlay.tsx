"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { baseSearchDocs } from "@/content/search-index";
import { emergencyCopy } from "@/content/patient-help";
import { draft } from "@/content/review";
import { popularSearches, site } from "@/content/site";
import { href } from "@/lib/routes";
import { isEmergencyQuery, searchDocs, type SearchDoc } from "@/lib/search";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/** The full index (page text, FAQ answers, notes, team) is fetched once per visit, the first time search opens. */
let fullIndex: Promise<SearchDoc[] | null> | null = null;
const loadFullIndex = () =>
  (fullIndex ??= fetch("/search-index.json")
    .then((r) => (r.ok ? (r.json() as Promise<SearchDoc[]>) : null))
    .catch(() => null));

const copy = {
  placeholder: "Search services, team, locations, FAQs",
  placeholderShort: draft("Search the site"),
  label: "Search the site",
  count: (n: number) => (n === 1 ? "1 result" : `${n} results`),
  none: `Nothing matched. Try a service, a symptom or a clinician name, or call ${site.phone}.`,
  popular: "Popular",
  close: draft("Close"),
  closeLabel: draft("Close search"),
};

const isExternal = (url: string) => /^https?:/.test(url);

/**
 * Search overlay under the header. Matches every word of the query against
 * the built-in index straight away, then against the full index once it has
 * loaded. Top 8 results as links; arrow keys move through them, Enter opens
 * the first. Emergency words bring up the 911 and Health811 note first.
 * Esc closes (the Esc key hint shows only with a mouse; touch gets Close).
 */
export function SearchOverlay({ onClose, mobile }: { onClose: () => void; mobile?: boolean }) {
  const [q, setQ] = useState("");
  // The long hint is cut off on a phone (and at larger text); use the short one there.
  // The overlay only renders in the browser (loaded on open), so the width is known on first render.
  const [narrow] = useState(() => typeof window !== "undefined" && window.innerWidth < 560);
  const [docs, setDocs] = useState<SearchDoc[]>(baseSearchDocs);
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    input.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    let live = true;
    loadFullIndex().then((full) => {
      if (live && full && full.length) setDocs(full);
    });
    return () => {
      live = false;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const query = q.trim();
  const results = useMemo(() => (query ? searchDocs(docs, query) : []), [docs, query]);
  // Announce the count only once typing pauses, so screen readers do not read "0 results" mid-word.
  const [announced, setAnnounced] = useState("");
  useEffect(() => {
    const t = window.setTimeout(() => setAnnounced(query ? copy.count(results.length) : ""), 700);
    return () => window.clearTimeout(t);
  }, [query, results.length]);
  const emergency = query ? isEmergencyQuery(query) : false;

  const open = (page: string) => {
    const url = href(page);
    onClose();
    if (isExternal(url)) window.open(url, "_blank", "noopener");
    else router.push(url);
  };

  const links = () => Array.from(list.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && results[0]) {
      e.preventDefault();
      open(results[0].page);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      links()[0]?.focus();
    }
  };
  const onListKey = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const all = links();
    const i = all.indexOf(document.activeElement as HTMLAnchorElement);
    const next = e.key === "ArrowDown" ? i + 1 : i - 1;
    if (next < 0) input.current?.focus();
    else all[Math.min(next, all.length - 1)]?.focus();
  };

  const rowClass = cn(
    "flex flex-col gap-0.5 rounded-field border border-border bg-raised px-3.5 py-3 text-left transition-colors hover:border-sky",
    !mobile && "md:grid md:grid-cols-[140px_1fr_auto] md:items-center md:gap-4 md:px-4 md:py-3.5",
  );

  return (
    // Scrolls on its own: on a small phone the results are taller than the screen under the sticky header.
    <div className={cn("flex max-h-[calc(100dvh-56px)] flex-col gap-4 overflow-y-auto overscroll-contain bg-card p-4", !mobile && "md:gap-6 md:px-8 md:pb-10 md:pt-8")} role="search">
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {announced}
      </span>
      <div className={cn("flex h-[52px] items-center gap-2.5 rounded-[14px] border-[1.5px] border-border bg-raised px-3.5 focus-within:border-sky", !mobile && "md:h-[60px] md:gap-3.5 md:rounded-row md:px-5")}>
        <Icon name="search" size={18} stroke={2} color="var(--rm-ink-3)" />
        <input
          ref={input}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onInputKey}
          placeholder={mobile || narrow ? copy.placeholderShort : copy.placeholder}
          aria-label={copy.label}
          aria-controls="search-results"
          enterKeyHint="search"
          autoComplete="off"
          className={cn("min-w-0 flex-1 bg-transparent text-[16px] outline-none", !mobile && "md:text-[18px]")}
        />
        <button type="button" onClick={onClose} aria-label={copy.closeLabel} className="hidden rounded-[8px] border border-border px-2.5 py-1.5 text-[13px] font-semibold text-muted pointer-fine:inline-flex">
          Esc
        </button>
        <button type="button" onClick={onClose} className="shrink-0 px-1 py-1.5 text-[14px] font-semibold text-link pointer-fine:hidden">
          {copy.close}
        </button>
      </div>

      {query ? (
        <div className="flex flex-col gap-1.5">
          {emergency ? (
            <aside aria-label={emergencyCopy.title} className="mb-1.5 flex flex-col gap-1.5 rounded-tile border border-border bg-[color:var(--div-pain)] px-5 py-4 text-ink">
              <span className="text-[15px] font-semibold">{emergencyCopy.title}</span>
              <p className="pretty text-[14px] leading-[1.5] text-ink-2">
                {emergencyCopy.body}{" "}
                <a href={emergencyCopy.link} target="_blank" rel="noopener" className="font-semibold text-link">
                  {emergencyCopy.linkLabel} ›
                </a>
              </p>
            </aside>
          ) : null}
          <span className="text-[12px] font-semibold text-muted" aria-hidden>
            {copy.count(results.length)}
          </span>
          {results.length ? (
            <ul id="search-results" ref={list} onKeyDown={onListKey} className="flex flex-col gap-1.5" aria-label={copy.count(results.length)}>
              {results.map((r) => {
                const url = href(r.page);
                const inner = (
                  <>
                    {/* Read as: title, section, then summary (screen readers heard the whole summary before the section). */}
                    <span className="text-[15px] font-semibold md:col-start-2 md:row-start-1 md:font-medium">{r.label}</span>
                    <span className="order-first text-[12px] font-semibold text-link md:order-none md:col-start-1 md:row-start-1">
                      <span className="sr-only">, </span>
                      {r.kind}
                      <span className="sr-only">, </span>
                    </span>
                    {r.sub ? <span className={cn("pretty text-[13px] leading-[1.45] text-muted", !mobile && "md:col-start-3 md:row-start-1 md:max-w-[420px] md:text-right")}>{r.sub} ›</span> : null}
                  </>
                );
                return (
                  <li key={`${r.group ?? r.page}|${r.label}`}>
                    {isExternal(url) ? (
                      <a href={url} target="_blank" rel="noopener" onClick={onClose} className={rowClass}>
                        {inner}
                      </a>
                    ) : (
                      <Link href={url} onClick={onClose} className={rowClass}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <span id="search-results" className="py-3 text-[14px] text-muted">
              {copy.none}
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          <span className="text-[12px] font-semibold text-muted">{copy.popular}</span>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((p) => (
              <Link key={p.label} href={href(p.page)} onClick={onClose} className="rounded-chip border border-border bg-raised px-3.5 py-[9px] text-[13px] font-medium transition-colors hover:border-sky">
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
