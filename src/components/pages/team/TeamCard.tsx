import type { TeamMember } from "@/content/types";

/**
 * Team member card: square tinted tile with the initial in Fraunces 36
 * (real headshots replace the initial tiles once each member is photographed;
 * names are the prototype's sample roster), name, role, divisions and an
 * optional preceptor pill.
 */
export function TeamCard({ m }: { m: TeamMember }) {
  return (
    <div className="flex flex-col gap-3 rounded-[20px] border border-border bg-card p-[18px]">
      <div aria-hidden className="flex aspect-square items-center justify-center rounded-row font-display text-[36px] font-medium text-ink" style={{ background: m.tint }}>
        {m.initial}
      </div>
      <div className="flex flex-col gap-[3px]">
        <span className="text-[16px] font-semibold">{m.name}</span>
        <span className="text-[12px] text-muted">{m.role}</span>
        <span className="pt-1 text-[12px] font-semibold text-link">{m.divisions.join(", ")}</span>
        {m.preceptorTag ? <span className="mt-1.5 self-start rounded-chip bg-sun-tint px-[9px] py-[5px] text-[11px] font-semibold leading-[1.2] text-[color:var(--rm-sun-ink)]">{m.preceptorTag}</span> : null}
      </div>
    </div>
  );
}
