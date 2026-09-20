"use client";

import { Icon } from "@/components/ui";
import { cn } from "@/lib/cn";
import { careersCopy } from "@/content/about";
import type { BoardJob } from "./types";

/** One expandable job row: title, meta line, + that rotates 45° when open. */
export function JobRow({ job, open, onToggle, onApply }: { job: BoardJob; open: boolean; onToggle: () => void; onApply: () => void }) {
  const c = careersCopy.board;
  const panelId = `job-${job.id}`;
  return (
    <div className="overflow-hidden rounded-[20px] border border-border bg-raised">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="grid w-full grid-cols-[1fr_auto] items-center gap-4 px-5 py-[18px] text-left md:px-6 md:py-[22px]"
      >
        <div className="flex flex-col gap-2">
          <span className="display-tight text-[20px] leading-[1.1] tracking-[-.02em] md:text-[22px]">{job.title}</span>
          <div className="flex flex-wrap gap-x-3.5 gap-y-1 text-[13px] text-muted">
            <span className="flex items-center gap-1.5">
              <Icon name="pin" size={14} />
              {job.location}
            </span>
            <span>{job.division}</span>
            <span>{job.type}</span>
            <span>{job.schedule}</span>
            <span>Posted {job.ago}</span>
          </div>
        </div>
        <span
          aria-hidden
          className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-border text-[20px] leading-none transition-transform duration-200", open && "rotate-45")}
        >
          +
        </span>
      </button>
      {open ? (
        <div id={panelId} className="mx-5 grid grid-cols-1 gap-5 border-t border-border pb-6 md:mx-6 lg:grid-cols-[1.2fr_1fr] lg:gap-6">
          <div className="flex flex-col gap-3 pt-5">
            <span className="text-[12px] font-semibold text-muted">{c.role}</span>
            <p className="text-[15px] leading-[1.55] text-secondary">{job.summary}</p>
            <button
              type="button"
              onClick={onApply}
              className="mt-1 inline-flex self-start rounded-chip bg-ink px-5 py-3 text-[14px] font-semibold leading-none text-white transition-opacity hover:opacity-90 active:scale-[.98]"
            >
              {c.apply}
            </button>
          </div>
          <div className="flex flex-col gap-2 pt-5">
            <span className="text-[12px] font-semibold text-muted">{c.bring}</span>
            {job.requirements.map((q) => (
              <span key={q} className="flex gap-2 text-[14px] leading-[1.5] text-secondary">
                <span className="text-sage-deep" aria-hidden>
                  ✓
                </span>
                <span>{q}</span>
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
