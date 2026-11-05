import { cn } from "@/lib/cn";

const BAG = "M10 14h44a4 4 0 0 1 4 4v46c0 9-7 16-16 16H22c-9 0-16-7-16-16V18a4 4 0 0 1 4-4z";

/** Small IV bag for cards. The fluid rises a little when its card (a `group`) is hovered or focused. */
export function Bag({ color, className }: { color: string; className?: string }) {
  const id = `bag-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg aria-hidden viewBox="0 0 64 96" className={cn("h-[84px] w-[56px] shrink-0", className)}>
      <defs>
        <clipPath id={id}>
          <path d={BAG} />
        </clipPath>
      </defs>
      <rect x="27" y="2" width="10" height="9" rx="2" fill="var(--rm-ink)" opacity=".85" />
      <path d={BAG} fill="white" stroke="var(--rm-ink)" strokeOpacity=".18" strokeWidth="1.5" />
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="40" width="64" height="60" fill={color} className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-translate-y-2 group-focus-visible:-translate-y-2" />
        <rect x="0" y="40" width="64" height="4" fill="white" opacity=".35" className="motion-safe:transition-transform motion-safe:duration-300 group-hover:-translate-y-2" />
      </g>
      <path d="M16 24h10M16 30h6" stroke="var(--rm-ink)" strokeOpacity=".25" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 80v14" stroke="var(--rm-ink)" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Large hero art for a drip page: a bag on a stand with a gently swaying fluid surface and drops falling down the
 * line into a drip chamber. Decorative; still when the visitor reduces motion.
 */
export function DripHeroArt({ color, className }: { color: string; className?: string }) {
  const id = `hero-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg aria-hidden viewBox="0 0 220 300" className={cn("h-auto w-full max-w-[260px]", className)}>
      <defs>
        <clipPath id={id}>
          <path d="M50 46h120a10 10 0 0 1 10 10v118c0 26-21 46-46 46H86c-25 0-46-20-46-46V56a10 10 0 0 1 10-10z" />
        </clipPath>
        <radialGradient id={`${id}-glow`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity=".35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="130" r="110" fill={`url(#${id}-glow)`} />
      {/* Stand hook */}
      <path d="M110 6v22" stroke="var(--rm-ink)" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
      <rect x="96" y="26" width="28" height="20" rx="5" fill="var(--rm-ink)" opacity=".85" />
      {/* Bag */}
      <path d="M50 46h120a10 10 0 0 1 10 10v118c0 26-21 46-46 46H86c-25 0-46-20-46-46V56a10 10 0 0 1 10-10z" fill="white" stroke="var(--rm-ink)" strokeOpacity=".15" strokeWidth="2" />
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="108" width="220" height="140" fill={color} />
        <path className="rm-sway" d="M-20 108 Q 10 98 40 108 T 100 108 T 160 108 T 220 108 T 280 108 V 124 H -20 Z" fill="white" opacity=".3" />
      </g>
      <path d="M62 70h34M62 82h22" stroke="var(--rm-ink)" strokeOpacity=".2" strokeWidth="3" strokeLinecap="round" />
      {/* Line, drip chamber and drops */}
      <path d="M110 220v14" stroke="var(--rm-ink)" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
      <rect x="99" y="234" width="22" height="44" rx="8" fill="white" stroke="var(--rm-ink)" strokeOpacity=".2" strokeWidth="2" />
      <rect x="101" y="262" width="18" height="14" rx="6" fill={color} opacity=".8" />
      <circle className="rm-drop" cx="110" cy="240" r="3.5" fill={color} />
      <circle className="rm-drop" cx="110" cy="240" r="3.5" fill={color} style={{ animationDelay: "0.9s" }} />
      <path d="M110 278v20" stroke="var(--rm-ink)" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
