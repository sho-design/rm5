import Image from "next/image";
import { trust } from "@/content/site";
import { images } from "@/content/images";
import { Section, SmartLink } from "@/components/ui";

/** Infusion feature card, "Looking for a family doctor?" and the trust stats. */
export function FeatureRow() {
  return (
    <Section tight className="grid grid-cols-1 gap-block pb-6 lg:grid-cols-2">
      <SmartLink to="infusion" className="relative flex min-h-[260px] flex-col justify-between gap-10 overflow-hidden rounded-card bg-inverse p-6 text-on-inverse transition-opacity hover:opacity-95 md:min-h-[340px] md:gap-20 md:p-9">
        <Image src={images.division.infusion} alt="" fill sizes="(max-width: 1024px) 100vw, 610px" className="object-cover opacity-35" />
        <span className="relative text-[13px] font-semibold">New: Infusion Therapy</span>
        <div className="relative flex flex-col gap-2.5">
          <span className="display-tight text-[30px] md:text-[40px]" style={{ lineHeight: 1, letterSpacing: "-.02em" }}>
            Come as you are. <em>Leave feeling restored.</em>
          </span>
          <span className="text-[15px] text-white/75">Physician-reviewed, nurse-administered drips, shots and iron therapy.</span>
          <span className="text-[15px] font-semibold">Explore Infusion Therapy ›</span>
        </div>
      </SmartLink>

      <div className="grid grid-cols-1 gap-block md:grid-rows-2">
        <SmartLink to="book" className="flex flex-col justify-between gap-6 rounded-card bg-sun-soft p-6 text-ink transition-opacity hover:opacity-95 md:p-8">
          <span className="text-[13px] font-semibold">Accepting new patients</span>
          <div className="flex flex-col gap-1.5">
            <span className="font-display text-[26px] font-medium leading-[1.05] tracking-[-.02em] md:text-[28px]">Looking for a family doctor?</span>
            <span className="text-[14px] opacity-75">Join our Family Medicine roster in Thornhill.</span>
          </div>
        </SmartLink>
        <dl className="grid grid-cols-3 gap-4 rounded-card border border-border bg-card p-6 md:p-8">
          {trust.map((t) => (
            <div key={t.k} className="flex flex-col gap-1">
              <dd className="font-display text-[24px] font-medium leading-none tracking-[-.02em] md:text-[30px]">{t.v}</dd>
              <dt className="text-[13px] leading-[1.4] text-muted">{t.k}</dt>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
