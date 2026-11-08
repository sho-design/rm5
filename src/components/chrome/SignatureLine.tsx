"use client";

import { useEffect, useId, useRef } from "react";
import { iconPaths } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * The Restoration line: one calm stroke that draws itself as you scroll, the site's signature. It shares the icon
 * set's language (single stroke, round caps) so pages, icons and merch read as one system.
 *  - "pulse": a gentle beat that settles into a flat horizon (restoration, not alarm).
 *  - "services": a horizon that draws the five service marks in their colours as it passes.
 *  - "end": the line comes to rest on a sun dot, the sign-off.
 * Decorative only (aria-hidden). With reduced motion it is shown fully drawn and the marks show at once.
 */
type Variant = "pulse" | "services" | "end";

const W = 1200;
const H = 140;
const Y = 96;

const MAIN: Record<Variant, string> = {
  pulse: `M0 ${Y} H420 L440 ${Y} L456 ${Y - 52} L476 ${Y + 30} L492 ${Y - 30} L506 ${Y + 10} L518 ${Y - 8} C548 ${Y - 14} 572 ${Y + 8} 604 ${Y} C640 ${Y - 6} 668 ${Y + 4} 704 ${Y} H${W}`,
  services: `M0 ${Y} H${W}`,
  end: `M0 ${Y} H${W / 2}`,
};

/** Service marks on the horizon, from the icon set, in each service's colour. */
const MARKS = [
  { icon: "heart", x: 160, color: "var(--div-family-accent)" },
  { icon: "spine", x: 380, color: "var(--div-pain-accent)" },
  { icon: "drip", x: 600, color: "var(--div-infusion-accent)" },
  { icon: "skin", x: 820, color: "var(--div-aesthetics-accent)" },
  { icon: "joint", x: 1040, color: "var(--rm-amber-deep)" },
];
const SCALE = 2.6;

export function SignatureLine({ variant = "pulse", className }: { variant?: Variant; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const main = useRef<SVGPathElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const marks = useRef<(SVGGElement | null)[]>([]);
  const reveal = useRef<SVGRectElement>(null);
  const clipId = `sig-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const el = wrap.current;
    const path = main.current;
    if (!el || !path) return;
    const total = path.getTotalLength();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = (p: number) => {
      // Every line moves left to right, so a clip that ends at the dot reveals exactly the drawn part.
      const pt = path.getPointAtLength(total * p);
      if (reveal.current) reveal.current.setAttribute("width", String(p >= 1 ? W + 20 : pt.x));
      if (dot.current) {
        dot.current.setAttribute("cx", String(pt.x));
        dot.current.setAttribute("cy", String(pt.y));
        // The travelling dot fades out once the line is drawn, except on "end" where it stays as the full stop.
        dot.current.style.opacity = variant === "end" ? (p > 0.02 ? "1" : "0") : p > 0.02 && p < 0.985 ? "1" : "0";
      }
      marks.current.forEach((g, i) => {
        if (!g) return;
        const at = MARKS[i].x / W;
        const on = p >= at - 0.02;
        g.style.opacity = on ? "1" : "0";
        g.style.transform = on ? "none" : "translateY(10px)";
      });
    };

    if (reduce) {
      paint(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts drawing as the line enters the lower part of the screen, finishes about a third of the way up.
      const p = Math.max(0, Math.min(1, (vh * 0.95 - r.top) / (vh * 0.6)));
      paint(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [variant]);

  return (
    <div ref={wrap} aria-hidden data-sig={variant} className={cn("px-4 pt-8 md:px-content md:pt-12", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <clipPath id={clipId}>
            <rect ref={reveal} x={-10} y={-20} width={0} height={H + 40} />
          </clipPath>
        </defs>
        <path ref={main} d={MAIN[variant]} clipPath={`url(#${clipId})`} stroke="var(--rm-ink)" strokeOpacity={0.55} strokeWidth={1.75} vectorEffect="non-scaling-stroke" />
        {variant === "services"
          ? MARKS.map((m, i) => (
              // Each mark rises in as the line reaches it.
              <g
                key={m.icon}
                ref={(g) => {
                  marks.current[i] = g;
                }}
                style={{ opacity: 0, transform: "translateY(10px)", transition: "opacity 400ms cubic-bezier(.2,.8,.2,1), transform 400ms cubic-bezier(.2,.8,.2,1)" }}
              >
                <g transform={`translate(${m.x - 12 * SCALE} ${Y - 24 * SCALE - 14}) scale(${SCALE})`} stroke={m.color} strokeWidth={2.2}>
                  {iconPaths[m.icon].map((d) => (
                    <path key={d} d={d} vectorEffect="non-scaling-stroke" />
                  ))}
                </g>
              </g>
            ))
          : null}
        {variant === "end" ? <circle cx={W / 2} cy={Y} r={22} fill="var(--rm-sun)" opacity={0.25} className="motion-safe:animate-[rm-ping_3s_ease-out_infinite]" style={{ transformBox: "fill-box", transformOrigin: "center" }} /> : null}
        <circle ref={dot} cx={0} cy={Y} r={variant === "end" ? 9 : 5} fill="var(--rm-sun)" stroke="var(--rm-ink)" strokeWidth={variant === "end" ? 0 : 1.2} vectorEffect="non-scaling-stroke" style={{ opacity: 0, transition: "opacity 200ms" }} />
      </svg>
    </div>
  );
}
