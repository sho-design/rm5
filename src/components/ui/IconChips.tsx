import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

export interface IconChip {
  icon: string;
  label: string;
}

/** A row of small facts, each with its icon from the site set: parking, access, languages and similar. */
export function IconChips({ items, inverse, className }: { items: readonly IconChip[]; inverse?: boolean; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((it) => (
        <li
          key={it.label}
          className={cn(
            "inline-flex items-center gap-2 rounded-chip px-3 py-1.5 text-[13px] font-semibold",
            inverse ? "bg-white/10 text-white" : "border border-border bg-card text-primary",
          )}
        >
          <Icon name={it.icon} size={18} stroke={1.8} />
          {it.label}
        </li>
      ))}
    </ul>
  );
}
