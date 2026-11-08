"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Adds `is-in` once the element scrolls into view, for `.rm-reveal`. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || !("IntersectionObserver" in window)) {
      setIn(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setIn(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

/**
 * The light band: four soft colour glows drifting behind the content and a gentle spotlight that follows the pointer.
 * Decorative only; content stays readable on plain paper.
 */
export function TeamBand({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    el.addEventListener("pointermove", move);
    return () => {
      el.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  const glow = "pointer-events-none absolute rounded-full blur-[90px] rm-drift";
  return (
    <div ref={ref} className={cn("relative isolate overflow-hidden", className)} style={{ "--mx": "70%", "--my": "10%" } as CSSProperties}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className={cn(glow, "-left-[10%] -top-[8%] h-[520px] w-[520px] bg-sky opacity-30")} />
        <span className={cn(glow, "right-[-12%] top-[18%] h-[460px] w-[460px] bg-lilac opacity-30")} style={{ animationDelay: "-6s" }} />
        <span className={cn(glow, "bottom-[18%] left-[20%] h-[420px] w-[420px] bg-sage opacity-25")} style={{ animationDelay: "-12s" }} />
        <span className={cn(glow, "bottom-[-10%] right-[10%] h-[380px] w-[380px] bg-sun opacity-35")} style={{ animationDelay: "-17s" }} />
        <span className="absolute inset-0 motion-reduce:hidden" style={{ background: "radial-gradient(600px circle at var(--mx) var(--my), rgba(255,255,255,.55), transparent 60%)" }} />
      </div>
      {children}
    </div>
  );
}

/** A number that counts up once when it scrolls into view. Screen readers get the final number only. */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const { ref, inView } = useReveal<HTMLSpanElement>();
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!inView || reduced()) return;
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setN(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      <span aria-hidden>{n}</span>
      <span className="sr-only">{to}</span>
    </span>
  );
}

/** Wraps a block so it rises into view, with an optional stagger delay. */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" }) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <Tag ref={ref as never} className={cn("rm-reveal", inView && "is-in", className)} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
