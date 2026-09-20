import { Photo, SmartLink } from "@/components/ui";
import { careersCopy } from "@/content/about";
import { images } from "@/content/images";

/**
 * Clinic b-roll bento: one tall photo (2 rows) plus three photos and a navy
 * "Two sites, one team" tile. 1.6fr 1fr 1fr on desktop, 2 columns on mobile.
 */
export function CareersBento() {
  const [a, b, c, d] = images.services.about;
  const alts = careersCopy.bento.alts;
  return (
    <div className="grid grid-cols-2 gap-2.5 px-3 pt-8 md:gap-card md:px-content md:pt-12 lg:grid-cols-[1.6fr_1fr_1fr] lg:grid-rows-[260px_260px]">
      <Photo src={a} alt={alts[0]} radius="card" className="col-span-2 min-h-[220px] lg:col-span-1 lg:row-span-2 lg:min-h-0" sizes="(max-width: 1024px) 100vw, 45vw" />
      <Photo src={b} alt={alts[1]} radius="card" className="min-h-[160px] md:min-h-[220px] lg:min-h-0" sizes="(max-width: 1024px) 50vw, 28vw" />
      <Photo src={c} alt={alts[2]} radius="card" className="min-h-[160px] md:min-h-[220px] lg:min-h-0" sizes="(max-width: 1024px) 50vw, 28vw" />
      <Photo src={d} alt={alts[3]} radius="card" className="min-h-[160px] md:min-h-[220px] lg:min-h-0" sizes="(max-width: 1024px) 50vw, 28vw" />
      <div className="flex min-h-[160px] flex-col justify-between gap-4 rounded-card bg-inverse p-5 text-on-inverse md:min-h-[220px] md:p-7 lg:min-h-0">
        <span className="text-[12px] font-semibold text-white/60">{careersCopy.bento.eyebrow}</span>
        <span className="display-tight text-[22px] leading-[1.1] tracking-[-.02em] md:text-[26px]">{careersCopy.bento.title}</span>
        <SmartLink to="locations" className="text-[14px] font-semibold text-white">
          {careersCopy.bento.link} ›
        </SmartLink>
      </div>
    </div>
  );
}
