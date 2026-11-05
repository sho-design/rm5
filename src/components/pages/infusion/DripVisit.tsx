import { dripVisit as c } from "@/content/infusion-site";
import { Display, Eyebrow } from "@/components/ui";

const tints = ["bg-sky-soft", "bg-sun-tint", "bg-sage-tint", "bg-lilac-tint"];

/** A drip visit as a proportioned bar: screening, mixed for you, the drip, back to your day. */
export function DripVisit() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <Display size="xs">{c.title}</Display>
      </div>
      <ol className="flex flex-col gap-2.5 md:flex-row md:gap-1.5">
        {c.parts.map((p, i) => (
          <li key={p.t} className="flex flex-col gap-2 md:min-w-0" style={{ flexGrow: p.w, flexBasis: 0 }}>
            <div className={`flex h-[56px] items-center gap-3 rounded-card-sm px-4 md:h-[64px] ${tints[i]} ${i === 0 ? "md:rounded-l-block" : ""} ${i === c.parts.length - 1 ? "md:rounded-r-block" : ""}`}>
              <span className="font-display text-[22px] font-medium leading-none tracking-[-.02em]">{i + 1}</span>
              <span className="truncate text-[15px] font-semibold">{p.t}</span>
            </div>
            <span className="pretty px-1 text-[14px] leading-[1.5] text-muted">{p.d}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
