import { Display, Eyebrow } from "@/components/ui";
import { shotBar as c } from "@/content/infusion-site";

const tints = ["bg-sky-soft", "bg-sun-tint", "bg-sage-tint"];

/** A shot visit in three parts. (The older "A shot or a drip?" cards were folded into "Shot or drip, side by side", Nov 2026.) */
export function ShotExtras() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Eyebrow>{c.visitEyebrow}</Eyebrow>
          <Display size="xs">{c.visitTitle}</Display>
        </div>
        <ol className="grid grid-cols-1 gap-2.5 md:grid-cols-3 md:gap-1.5">
          {c.visit.map((p, i) => (
            <li key={p.t} className="flex flex-col gap-2">
              <div className={`flex h-[56px] items-center gap-3 rounded-card-sm px-4 md:h-[64px] ${tints[i]} ${i === 0 ? "md:rounded-l-block" : ""} ${i === c.visit.length - 1 ? "md:rounded-r-block" : ""}`}>
                <span className="font-display text-[22px] font-medium leading-none tracking-[-.02em]">{i + 1}</span>
                <span className="text-[15px] font-semibold">{p.t}</span>
              </div>
              <span className="pretty px-1 text-[14px] leading-[1.5] text-muted">{p.d}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
