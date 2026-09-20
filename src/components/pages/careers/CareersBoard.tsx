"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Display, Icon } from "@/components/ui";
import { cn } from "@/lib/cn";
import { careersCopy } from "@/content/about";
import { jobFilters, type JobSort } from "@/content/jobs";
import { ApplyForm } from "./ApplyForm";
import { JobRow } from "./JobRow";
import type { BoardJob } from "./types";

type Filters = { q: string; loc: string; dept: string; type: string; sort: JobSort };
const initial: Filters = { q: "", loc: "All", dept: "All", type: "All", sort: "Newest" };

/**
 * Featured roles, the filterable job board and the application form share
 * one piece of state: the role that "Apply" prefills. The placements block
 * (server content) is slotted between the board and the form.
 */
export function CareersBoard({ jobs, placements }: { jobs: BoardJob[]; placements: ReactNode }) {
  const [f, setF] = useState<Filters>(initial);
  const [open, setOpen] = useState<string | null>(null);
  const [role, setRole] = useState("");
  const c = careersCopy.board;

  const list = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const out = jobs.filter(
      (j) =>
        (!q || `${j.title} ${j.division} ${j.location} ${j.summary}`.toLowerCase().includes(q)) &&
        (f.loc === "All" || j.location.includes(f.loc)) &&
        (f.dept === "All" || j.division === f.dept) &&
        (f.type === "All" || j.type === f.type),
    );
    out.sort((a, b) => (f.sort === "Newest" ? b.postedDate.localeCompare(a.postedDate) : a.title.localeCompare(b.title)));
    return out;
  }, [jobs, f]);

  const featured = jobs.filter((j) => j.featured);
  const clear = () => setF((s) => ({ ...initial, sort: s.sort }));

  function apply(j: BoardJob) {
    setRole(j.title);
    setOpen(null);
    const el = document.getElementById("apply");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => document.getElementById("ap-role")?.focus({ preventScroll: true }), 450);
  }

  return (
    <>
      {/* Featured roles */}
      <section className="flex flex-col gap-5 px-4 pt-12 md:px-content md:pt-section" aria-labelledby="featured-roles">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
          <Display size="xs" id="featured-roles">
            {careersCopy.featured.title}
          </Display>
          <span className="text-[14px] text-muted">{careersCopy.featured.updated}</span>
        </div>
        <div className="grid grid-cols-1 gap-card md:grid-cols-2 lg:grid-cols-4">
          {featured.map((r) => (
            <div key={r.id} className="flex min-h-[250px] flex-col justify-between gap-5 rounded-card p-6 text-ink md:p-7" style={{ background: r.tint }}>
              <div className="flex flex-col gap-2">
                <span className="display-tight text-[24px] leading-[1.05] tracking-[-.02em]">{r.title}</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-chip bg-white/75 px-2.5 py-[5px] text-[12px] font-semibold">{r.location}</span>
                  <span className="rounded-chip bg-white/75 px-2.5 py-[5px] text-[12px] font-semibold">{r.type}</span>
                </div>
                <span className="text-[14px] leading-[1.5] text-ink-2">{r.summary}</span>
              </div>
              <button type="button" onClick={() => apply(r)} className="self-start text-[14px] font-semibold text-ink hover:opacity-80">
                {careersCopy.featured.apply} ›
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Job board */}
      <section id="roles" className="flex scroll-mt-6 flex-col gap-5 px-4 pt-12 md:px-content md:pt-section" aria-labelledby="all-roles">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
          <Display size="xs" id="all-roles">
            {c.title}
          </Display>
          <span className="text-[14px] text-muted" aria-live="polite">
            {list.length} {list.length === 1 ? "role" : "roles"}
          </span>
        </div>
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="flex flex-col gap-5 rounded-card border border-border bg-card p-5 md:p-6 lg:sticky lg:top-6 lg:gap-[22px]">
            <label className="flex h-12 items-center gap-2.5 rounded-field border-[1.5px] border-[color:var(--field-border)] bg-[var(--field-bg)] px-3.5 transition-colors focus-within:border-[color:var(--field-border-focus)]">
              <Icon name="search" size={16} className="shrink-0 text-muted" />
              <span className="sr-only">{c.search}</span>
              <input
                type="search"
                value={f.q}
                onChange={(e) => setF({ ...f, q: e.target.value })}
                placeholder={c.search}
                className="min-w-0 flex-1 bg-transparent text-[15px] text-primary outline-none placeholder:text-[var(--field-placeholder)]"
              />
            </label>
            <ChipGroup label={c.location} items={jobFilters.locations} value={f.loc} onChange={(v) => setF({ ...f, loc: v })} />
            <ChipGroup label={c.division} items={jobFilters.divisions} value={f.dept} onChange={(v) => setF({ ...f, dept: v })} />
            <ChipGroup label={c.type} items={jobFilters.types} value={f.type} onChange={(v) => setF({ ...f, type: v })} />
            <ChipGroup label={c.sort} items={jobFilters.sorts} value={f.sort} onChange={(v) => setF({ ...f, sort: v as JobSort })} />
            <button type="button" onClick={clear} className="self-start text-[13px] font-semibold text-link hover:opacity-80">
              {c.clear}
            </button>
          </aside>
          <div className="flex flex-col gap-2.5">
            {list.map((j) => (
              <JobRow key={j.id} job={j} open={open === j.id} onToggle={() => setOpen(open === j.id ? null : j.id)} onApply={() => apply(j)} />
            ))}
            {list.length === 0 ? (
              <div className="flex flex-col items-start gap-2.5 rounded-[20px] border border-border bg-card p-6 md:p-10">
                <span className="display-tight text-[26px]">{c.emptyTitle}</span>
                <span className="text-[15px] text-muted">{c.emptyBody}</span>
                <button type="button" onClick={clear} className="text-[14px] font-semibold text-link hover:opacity-80">
                  {c.clear} ›
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {placements}

      <ApplyForm roles={jobs.map((j) => j.title)} role={role} onRoleChange={setRole} />
    </>
  );
}

/** Labelled group of filter chips: wraps on desktop, scrolls sideways on mobile. */
function ChipGroup({ label, items, value, onChange }: { label: string; items: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[12px] font-semibold text-muted">{label}</span>
      <div role="radiogroup" aria-label={label} className="scroll-x -mx-5 flex gap-1.5 px-5 md:-mx-6 md:px-6 lg:mx-0 lg:flex-wrap lg:px-0">
        {items.map((it) => {
          const on = value === it;
          return (
            <button
              key={it}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(it)}
              className={cn(
                "shrink-0 rounded-chip border-[1.5px] px-3 py-2 text-[13px] font-semibold transition-all duration-[250ms] active:scale-[.98]",
                on ? "border-ink bg-ink text-white" : "border-border bg-white text-primary hover:border-sky",
              )}
            >
              {it}
            </button>
          );
        })}
      </div>
    </div>
  );
}
