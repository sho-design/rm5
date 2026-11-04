import { buttonClass } from "@/components/ui/Button";
import { linkPhones } from "@/components/ui/Phones";
import { bookingExtra as x } from "@/content/booking-extra";

/**
 * Sends the patient to Ocean for the part that needs their details, so names, health card numbers and notes go
 * straight into OSCAR Pro and never through this site. Nothing is added to the link: Ocean asks for everything.
 */
export function OceanHandoff({ url, kind, privateNote }: { url: string; kind: "book" | "register" | "renewal"; privateNote?: string }) {
  return (
    <div className="flex flex-col gap-3">
      {kind === "book" ? <p className="pretty rounded-tile bg-[color:var(--div-pain)] px-4 py-3 text-[14px] font-semibold leading-[1.5] text-ink">{x.ocean.gate}</p> : null}
      {privateNote ? <p className="pretty text-[15px] font-semibold leading-[1.5] text-ink">{privateNote}</p> : null}
      {kind === "register" ? <p className="pretty text-[15px] leading-[1.5] text-ink">{x.ocean.registerReady}</p> : null}
      <p className="pretty text-[14px] leading-[1.5] text-secondary">{x.ocean.note(new URL(url).hostname)}</p>
      <a href={url} rel="noopener" className={buttonClass("primary", "lg", "self-start")}>
        {x.ocean[kind]}
      </a>
      {/* Booking already shows the call line under each step; it appeared twice (round 23). */}
      {kind === "book" ? null : <p className="text-[13px] leading-[1.5] text-secondary">{linkPhones(x.ocean.call)}</p>}
    </div>
  );
}
