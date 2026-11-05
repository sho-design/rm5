import { Display, Eyebrow, SmartLink } from "@/components/ui";
import { shotBar as c } from "@/content/infusion-site";

const tints = ["bg-sky-soft", "bg-sun-tint", "bg-sage-tint"];

/** A shot visit in three parts, then a shot set against a drip. */
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
      <div className="flex flex-col gap-5">
        <Display size="xs">{c.vsTitle}</Display>
        <div className="grid grid-cols-1 gap-card md:grid-cols-2">
          {c.vs.map((v, i) => {
            const inner = (
              <>
                <span className="text-[15px] font-semibold">{v.t}</span>
                <span className="font-display text-[40px] font-medium leading-[1] tracking-[-.03em] md:text-[48px]">{v.big}</span>
                <span className="text-[15px] leading-[1.5] text-secondary">{v.d}</span>
                {i === 0 ? null : <span className="text-[14px] font-semibold text-link group-hover:underline group-hover:underline-offset-4">See the drips ›</span>}
              </>
            );
            const cls = `group flex flex-col gap-3 rounded-card p-6 md:p-8 ${i === 0 ? "bg-sun-tint" : "bg-sage-tint transition-shadow hover:shadow-[0_8px_24px_rgba(16,24,40,.08)]"}`;
            // The shot card describes this page, so it is not a link.
            return i === 0 ? (
              <div key={v.t} className={cls}>{inner}</div>
            ) : (
              <SmartLink key={v.t} to={v.page} className={cls}>{inner}</SmartLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
