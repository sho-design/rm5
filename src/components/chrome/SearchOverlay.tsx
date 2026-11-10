"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { baseSearchDocs } from "@/content/search-index";
import { EmergencyNote } from "@/components/pages/help/EmergencyNote";
import { draft } from "@/content/review";
import { popularSearches, site } from "@/content/site";
import { href } from "@/lib/routes";
import {
  correctQuery,
  isCrisisQuery,
  isEmergencyQuery,
  searchDocs,
  type SearchDoc,
  type SearchHit,
} from "@/lib/search";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { linkPhones } from "@/components/ui/Phones";

/** The full index (page text, FAQ answers, notes, team) is fetched once per visit, the first time search opens. */
let fullIndex: Promise<SearchDoc[] | null> | null = null;
const loadFullIndex = () =>
  (fullIndex ??= fetch("/search-index.json")
    .then((r) => (r.ok ? (r.json() as Promise<SearchDoc[]>) : null))
    .catch(() => null));

const copy = {
  placeholder: draft("Search services, products, team, FAQs"),
  placeholderShort: draft("Search the site"),
  label: "Search the site",
  count: (n: number) => (n === 1 ? "1 result" : `${n} results`),
  none: draft(
    `Nothing matched. Try a service, a symptom or a clinician name, or call ${site.phone} during clinic hours. For health advice any time, call Health811 at 811.`,
  ),
  /** Typed in a script the index cannot read (Chinese, Korean, Arabic...): point to the free interpreter. */
  otherScript: draft(
    `Search works in English and Vietnamese for now. Call ${site.phone} and ask for an interpreter, at no cost to you.`,
  ),
  popular: "Popular",
  close: draft("Close"),
  noneShort: draft("Nothing matched"),
  didYouMean: (fixed: string) => draft(`Showing results for “${fixed}”`),
  closeLabel: draft("Close search"),
};

const isExternal = (url: string) => /^https?:/.test(url);

/**
 * Search overlay under the header, built as an ARIA combobox: focus stays in the box while the arrow keys move
 * the highlight through the results (wrapping at the ends), Enter opens the highlighted one, and screen readers
 * hear each result as it is highlighted (aria-activedescendant). Our matcher does the ranking: every word of the query,
 * synonyms and Vietnamese, then a typo correction when nothing matched. Results are grouped by section, groups
 * in the order of their best result. Emergency words bring up the 911 and Health811 note first, and Enter then
 * goes to the note instead of a result. Esc closes (the Esc key hint shows only with a mouse; touch gets Close).
 */
export function SearchOverlay({
  onClose,
  mobile,
  takeTyped,
}: {
  onClose: () => void;
  mobile?: boolean;
  /** Hands over the letters typed while search was loading (Header holds them), once, when the box appears. */
  takeTyped?: () => string;
}) {
  const [q, setQ] = useState("");
  // The long hint is cut off on a phone (and at larger text); use the short one there.
  // The overlay only renders in the browser (loaded on open), so the width is known on first render.
  const [narrow] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 560,
  );
  const [docs, setDocs] = useState<SearchDoc[]>(baseSearchDocs);
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Letters typed while the box was loading go into it (round 28, Jordan lost "chiro").
    const early = takeTyped?.() ?? "";
    if (early) setQ((v) => v + early);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    input.current?.focus();
    // The cookie banner steps aside while search is open: it covered the emergency note for a stroke tester.
    document.documentElement.dataset.search = "open";
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
      delete document.documentElement.dataset.search;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const query = q.trim();
  const { results, fixed } = useMemo(() => {
    if (!query)
      return { results: [] as SearchHit[], fixed: null as string | null };
    const direct = searchDocs(docs, query);
    if (direct.length) return { results: direct, fixed: null };
    const f = correctQuery(docs, query);
    return { results: f ? searchDocs(docs, f) : direct, fixed: f };
  }, [docs, query]);
  // Sections in the order of their best result, results kept in rank order within each.
  const groups = useMemo(() => {
    const m = new Map<string, SearchHit[]>();
    for (const r of results) m.set(r.kind, [...(m.get(r.kind) ?? []), r]);
    return [...m.entries()];
  }, [results]);
  // The highlighted result, by rank. Back to the first whenever the results change.
  const [active, setActive] = useState(0);
  useEffect(() => setActive(0), [results]);
  useEffect(() => {
    document
      .getElementById(`search-opt-${active}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);
  // Announce the count only once typing pauses, so screen readers do not read "0 results" mid-word.
  const [announced, setAnnounced] = useState("");
  useEffect(() => {
    const t = window.setTimeout(
      // Screen readers hear the correction and an empty result too, not only the count (round 28, Jordan).
      () => setAnnounced(!query ? "" : !results.length ? copy.noneShort : `${fixed ? `${copy.didYouMean(fixed)}. ` : ""}${copy.count(results.length)}`),
      700,
    );
    return () => window.clearTimeout(t);
  }, [query, results.length, fixed]);
  const emergency = query ? isEmergencyQuery(query) : false;
  const emergencyBox = useRef<HTMLDivElement>(null);

  const open = (page: string) => {
    const url = href(page);
    onClose();
    if (isExternal(url)) window.open(url, "_blank", "noopener");
    else router.push(url);
  };

  const rowClass = cn(
    // data-selected is the highlight (arrow keys or pointer): the row Enter will open.
    "flex flex-col gap-0.5 rounded-field border border-border bg-raised px-3.5 py-3 text-left transition-colors hover:border-sky data-[selected=true]:border-sky data-[selected=true]:bg-sky-soft",
    !mobile &&
      "md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-4 md:px-4 md:py-3.5",
  );

  return (
    // Scrolls on its own: on a small phone the results are taller than the screen under the sticky header.
    // Tab stays inside while it covers the page: a keyboard tester tabbed into the hidden footer behind it.
    <div
      aria-label={copy.label}
      className={cn(
        "flex max-h-[calc(100dvh-56px)] flex-col gap-4 overflow-y-auto overscroll-contain bg-card p-4",
        !mobile && "md:gap-6 md:px-8 md:pb-10 md:pt-8",
      )}
      role="search"
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const items = Array.from(
          e.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => el.offsetParent !== null);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }}
    >
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {announced}
      </span>
      <div
        className={cn(
          "flex h-[52px] items-center gap-2.5 rounded-[14px] border-[1.5px] border-border bg-raised px-3.5 focus-within:border-sky",
          !mobile && "md:h-[60px] md:gap-3.5 md:rounded-row md:px-5",
        )}
      >
        <Icon name="search" size={18} stroke={2} color="var(--rm-ink-3)" />
        {/* autoFocus focuses on mount, before effects run: testers typing straight away lost the first letters. */}
        <input
          autoFocus
          ref={input}
          type="text"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="search-results"
          aria-autocomplete="list"
          aria-activedescendant={
            results.length ? `search-opt-${active}` : undefined
          }
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            // Emergency words: Enter moves focus to the emergency note instead of opening a result, which sent a
            // tester with arm pain and breathlessness to the Pain Centre page with no warning.
            if (e.key === "Enter" && emergency) {
              e.preventDefault();
              emergencyBox.current
                ?.querySelector<HTMLElement>("aside")
                ?.focus();
            } else if (e.key === "Enter" && results[active]) {
              e.preventDefault();
              open(results[active].page);
            } else if (
              (e.key === "ArrowDown" || e.key === "ArrowUp") &&
              results.length
            ) {
              e.preventDefault();
              const n = results.length;
              setActive((a) =>
                e.key === "ArrowDown" ? (a + 1) % n : (a - 1 + n) % n,
              );
            }
          }}
          placeholder={
            mobile || narrow ? copy.placeholderShort : copy.placeholder
          }
          aria-label={copy.label}
          // The browser clear (x) sat over the end of long queries; Esc and Close already clear.
          enterKeyHint="search"
          autoComplete="off"
          className={cn(
            "min-w-0 flex-1 bg-transparent text-[16px] outline-none [&::-webkit-search-cancel-button]:hidden",
            !mobile && "md:text-[18px]",
          )}
        />
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.closeLabel}
          className="hidden rounded-[8px] border border-border px-2.5 py-1.5 text-[13px] font-semibold text-muted pointer-fine:inline-flex"
        >
          Esc
        </button>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 px-1 py-1.5 text-[14px] font-semibold text-link pointer-fine:hidden"
        >
          {copy.close}
        </button>
      </div>

      {query ? (
        <div className="flex flex-col gap-1.5">
          {emergency ? (
            <div ref={emergencyBox}>
              <EmergencyNote
                id="search-emergency"
                className="mb-1.5"
                crisisFirst={isCrisisQuery(query)}
              />
            </div>
          ) : null}
          <span className="text-[12px] font-semibold text-muted" aria-hidden>
            {fixed && results.length ? `${copy.didYouMean(fixed)}. ` : ""}
            {copy.count(results.length)}
          </span>
          {results.length ? (
            <div
              id="search-results"
              role="listbox"
              aria-label={copy.count(results.length)}
              className="flex flex-col gap-2.5"
            >
              {groups.map(([kind, rows], gi) => (
                <div
                  key={kind}
                  role="group"
                  aria-labelledby={`search-group-${gi}`}
                  className="flex flex-col gap-1.5"
                >
                  <div
                    id={`search-group-${gi}`}
                    className="px-1 pt-1 text-[12px] font-semibold text-muted"
                  >
                    {kind}
                  </div>
                  {rows.map((r) => {
                    const i = results.indexOf(r);
                    const url = href(r.page);
                    const inner = (
                      <>
                        {/* The section shows as the group heading; screen readers get "title, section" from the label. */}
                        <span
                          className={cn(
                            "text-[15px] font-semibold",
                            !mobile &&
                              "md:col-start-1 md:row-start-1 md:font-medium",
                          )}
                        >
                          {r.label}
                        </span>
                        {r.sub ? (
                          <span
                            className={cn(
                              "pretty text-[13px] leading-[1.45] text-muted",
                              !mobile &&
                                "md:col-start-2 md:row-start-1 md:max-w-[420px] md:text-right",
                            )}
                          >
                            {r.sub} ›
                          </span>
                        ) : null}
                      </>
                    );
                    // Real links, so a result can still be opened in a new tab; out of the Tab order, as options are.
                    const props = {
                      id: `search-opt-${i}`,
                      role: "option",
                      "aria-selected": i === active,
                      "data-selected": i === active,
                      "aria-label": `${r.label}, ${r.kind}`,
                      tabIndex: -1,
                      onMouseMove: () => i !== active && setActive(i),
                      onClick: onClose,
                      className: rowClass,
                    };
                    return isExternal(url) ? (
                      <a
                        key={`${r.group ?? r.page}|${r.label}`}
                        href={url}
                        target="_blank"
                        rel="noopener"
                        {...props}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link
                        key={`${r.group ?? r.page}|${r.label}`}
                        href={url}
                        {...props}
                      >
                        {inner}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <span id="search-results" className="py-3 text-[14px] text-muted">
              {/[^\u0000-\u024F\u1E00-\u1EFF\s\d\p{P}]/u.test(query)
                ? linkPhones(copy.otherScript)
                : copy.none}
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          <span className="text-[12px] font-semibold text-muted">
            {copy.popular}
          </span>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((p) => (
              <Link
                key={p.label}
                href={href(p.page)}
                onClick={onClose}
                className="rounded-chip border border-border bg-raised px-3.5 py-[9px] text-[13px] font-medium transition-colors hover:border-sky"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
