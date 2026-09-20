"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchIndexFilter } from "@/content/search-index";
import { popularSearches } from "@/content/site";
import { href } from "@/lib/routes";
import { Icon } from "@/components/ui/Icon";

/**
 * Search overlay under the header: instant filter over the build-time index,
 * top 8, grouped by kind label. Esc closes.
 */
export function SearchOverlay({ onClose, mobile }: { onClose: () => void; mobile?: boolean }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const ql = q.trim().toLowerCase();
  const results = ql ? searchIndexFilter(ql) : [];
  const go = (page: string) => {
    onClose();
    const url = href(page);
    if (url.startsWith("http")) window.open(url, "_blank", "noopener");
    else router.push(url);
  };
  return (
    <div className={mobile ? "flex min-h-[640px] flex-col gap-4 bg-card p-4" : "flex flex-col gap-6 bg-card px-4 pb-10 pt-6 md:px-8 md:pt-8"} role="search">
      <div className={mobile ? "flex h-[52px] items-center gap-2.5 rounded-[14px] border-[1.5px] border-sky bg-raised px-3.5" : "flex h-[60px] items-center gap-3.5 rounded-row border-[1.5px] border-border bg-raised px-5 focus-within:border-sky"}>
        <Icon name="search" size={mobile ? 18 : 20} stroke={2} color="var(--rm-ink-3)" />
        <input
          ref={ref}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results[0]) go(results[0].page);
          }}
          placeholder={mobile ? "Search services, team, locations" : "Search services, team, locations, FAQs"}
          aria-label="Search the site"
          className={mobile ? "flex-1 bg-transparent text-[15px] outline-none" : "flex-1 bg-transparent text-[18px] outline-none"}
        />
        {!mobile ? (
          <button type="button" onClick={onClose} className="rounded-[8px] border border-border px-2.5 py-1.5 text-[13px] font-semibold text-muted">
            Esc
          </button>
        ) : null}
      </div>
      {ql ? (
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-semibold text-muted">{results.length} results</span>
          {results.map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(r.page)}
              className={mobile ? "flex flex-col gap-0.5 rounded-field border border-border bg-raised px-3.5 py-3 text-left" : "grid grid-cols-[120px_1fr_auto] items-center gap-4 rounded-field border border-border bg-raised px-4 py-3.5 text-left transition-colors hover:border-sky md:grid-cols-[140px_1fr_auto]"}
            >
              <span className="text-[12px] font-semibold text-link">{r.kind}</span>
              <span className={mobile ? "text-[14px] font-medium" : "text-[15px] font-medium"}>{r.label}</span>
              {!mobile ? <span className="text-[13px] text-muted">{r.sub} ›</span> : null}
            </button>
          ))}
          {results.length === 0 ? <span className="py-3 text-[14px] text-muted">Nothing matched. Try a service, a symptom or a clinician name, or call 905-709-3222.</span> : null}
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          <span className="text-[12px] font-semibold text-muted">Popular</span>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((p) => (
              <button key={p.label} type="button" onClick={() => go(p.page)} className="rounded-chip border border-border bg-raised px-3.5 py-[9px] text-[13px] font-medium transition-colors hover:border-sky">
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
