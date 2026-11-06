import { Display, SmartLink } from "@/components/ui";
import { infusionPage as ip } from "@/content/divisions";
import { infusionDoors } from "@/content/infusion-site";
import { DripHeroArt } from "./DripArt";

const tint: Record<string, string> = { drips: "bg-sky-soft", shots: "bg-sun-tint", iron: "bg-sage-tint" };

/** Five vials rising onto a shelf, echoing the Injection Bar page. */
function VialsArt() {
  const cols = ["var(--rm-sun)", "var(--rm-terracotta)", "var(--rm-sky)", "var(--rm-sage)", "var(--rm-lilac)"];
  return (
    <svg aria-hidden viewBox="0 0 220 180" className="h-auto w-full max-w-[240px]">
      <rect x="10" y="160" width="200" height="8" rx="4" fill="var(--rm-ink)" opacity=".15" />
      {cols.map((c, i) => (
        <g key={i} className="rm-rise motion-safe:[animation-iteration-count:1]" style={{ animationDelay: `${150 + i * 90}ms` }}>
          <g className="motion-safe:animate-[rm-bob_3.2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.4}s` }}>
            <rect x={22 + i * 38} y="48" width="22" height="10" rx="3" fill="var(--rm-ink)" />
            <rect x={20 + i * 38} y="58" width="26" height="100" rx="9" fill="white" stroke="var(--rm-ink)" strokeOpacity=".2" strokeWidth="1.5" />
            <rect x={23 + i * 38} y={86 - (i % 3) * 8} width="20" height={68 + (i % 3) * 8} rx="7" fill={c} />
          </g>
        </g>
      ))}
    </svg>
  );
}

/** An iron drop that fills, with the three infusion days beneath. */
function IronArt() {
  return (
    <svg aria-hidden viewBox="0 0 220 200" className="h-auto w-full max-w-[220px]">
      <defs>
        <clipPath id="iron-drop">
          <path d="M110 14C130 50 160 78 160 116a50 50 0 0 1-100 0c0-38 30-66 50-102z" />
        </clipPath>
      </defs>
      <path d="M110 14C130 50 160 78 160 116a50 50 0 0 1-100 0c0-38 30-66 50-102z" fill="white" stroke="var(--rm-ink)" strokeOpacity=".2" strokeWidth="2" />
      <g clipPath="url(#iron-drop)">
        <rect x="50" y="10" width="120" height="170" fill="var(--rm-terracotta-deep)" className="origin-bottom motion-safe:animate-[rm-fill_2.4s_cubic-bezier(.2,.8,.2,1)_both]" style={{ transformBox: "fill-box" }} />
      </g>
      {["Tue", "Sat", "Sun"].map((d, i) => (
        <g key={d}>
          <rect x={40 + i * 50} y="174" width="40" height="22" rx="11" fill="var(--rm-ink)" />
          <text x={60 + i * 50} y="189" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" fontFamily="inherit">
            {d}
          </text>
        </g>
      ))}
    </svg>
  );
}

/**
 * "Wellness and clinical, under one roof." as three ways in. Each card leads with the patient's situation, then
 * names the service, with the moving art of its page and how long it takes. Each card opens the page with that service's interactive tool.
 */
export function InfusionDoors() {
  const g = ip.grid;
  return (
    <section className="flex flex-col gap-5 px-4 pt-10 md:gap-6 md:px-content md:pt-16">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
        <Display size="xs" className="max-w-[640px]">
          {g.title}
        </Display>
        <span className="pretty max-w-[320px] text-[14px] text-muted">{g.note}</span>
      </div>
      <ul className="grid grid-cols-1 gap-block md:grid-cols-3">
        {infusionDoors.map((x, i) => (
          <li key={x.k} className="rm-rise" style={{ animationDelay: `${i * 90}ms` }}>
            <SmartLink
              to={x.to}
              className={`group flex h-full flex-col gap-6 overflow-hidden rounded-card ${tint[x.k]} p-6 text-ink motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1 md:p-8`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-[13px] font-semibold">{x.kind}</span>
                <span className="rounded-chip bg-ink px-3 py-1.5 text-[13px] font-semibold text-white">{x.time}</span>
              </span>
              <span className="flex min-h-[200px] items-center justify-center">
                {x.k === "drips" ? <DripHeroArt color="var(--rm-sky)" className="max-w-[170px]" /> : x.k === "shots" ? <VialsArt /> : <IronArt />}
              </span>
              <span className="mt-auto flex flex-col gap-2">
                {/* Patient first: their situation is the headline, the service is the answer. */}
                <span className="display-tight balance text-[26px] md:text-[28px]">{x.who}</span>
                <span className="text-[17px] font-semibold">{x.t}</span>
                <span className="pretty text-[15px] leading-[1.5] text-secondary">{x.d}</span>
                <span className="pt-1 text-[15px] font-semibold text-link">
                  {x.cta} <span className="inline-block motion-safe:transition-transform group-hover:translate-x-1">›</span>
                </span>
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
