import { buttonClass } from "@/components/ui/Button";
import { linkPhones } from "@/components/ui/Phones";
import { bookingExtra as x } from "@/content/booking-extra";

/**
 * Sends the patient to Ocean for the part that needs their details, so names, health card numbers and notes go
 * straight into OSCAR Pro and never through this site. Nothing is added to the link: Ocean asks for everything.
 */
export function OceanHandoff({ url, kind }: { url: string; kind: "book" | "register" | "renewal" }) {
  return (
    <div className="flex flex-col gap-3">
      {kind === "book" ? <p className="pretty rounded-tile bg-[color:var(--div-pain)] px-4 py-3 text-[14px] font-semibold leading-[1.5] text-ink">{x.ocean.gate}</p> : null}
      <a href={url} rel="noopener" className={buttonClass("primary", "lg", "self-start")}>
        {x.ocean[kind]}
      </a>
      <p className="pretty text-[13px] leading-[1.5] text-secondary">{x.ocean.note}</p>
      <p className="text-[13px] leading-[1.5] text-secondary">{linkPhones(x.ocean.call)}</p>
    </div>
  );
}
