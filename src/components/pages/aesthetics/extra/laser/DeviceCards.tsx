"use client";

import { useEffect, useState, type PointerEvent } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import { laserCopy as c, laserDevices } from "@/content/aes-laser";
import { useReducedMotion } from "@/lib/a11y";
import Link from "next/link";
import { devicePath } from "@/content/aes-laser-devices";

/**
 * The six devices as cards. With a mouse, a card leans a little toward the pointer and a soft light follows it;
 * off for touch screens and reduced motion.
 */
export function DeviceCards() {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(hover: hover) and (pointer: fine)");
    const on = () => setFine(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  const tilt = fine && !reduced;

  const move = (e: PointerEvent<HTMLElement>) => {
    if (!tilt || e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--lx-rx", `${(0.5 - y) * 5}deg`);
    el.style.setProperty("--lx-ry", `${(x - 0.5) * 6}deg`);
    el.style.setProperty("--lx-mx", `${x * 100}%`);
    el.style.setProperty("--lx-my", `${y * 100}%`);
    el.style.setProperty("--lx-glow", "1");
  };
  const leave = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--lx-rx", "0deg");
    el.style.setProperty("--lx-ry", "0deg");
    el.style.setProperty("--lx-glow", "0");
  };

  return (
    <Section id="devices" className="rm-paper flex scroll-mt-24 flex-col gap-6">
      <style>{`
        .lx-card { transform: perspective(900px) rotateX(var(--lx-rx, 0deg)) rotateY(var(--lx-ry, 0deg)); transition: transform 300ms cubic-bezier(.2,.8,.2,1); }
        .lx-card::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: var(--lx-glow, 0); transition: opacity 300ms cubic-bezier(.2,.8,.2,1);
          background: radial-gradient(320px circle at var(--lx-mx, 50%) var(--lx-my, 0%), rgba(255,255,255,.75), rgba(255,255,255,0) 60%); mix-blend-mode: soft-light; }
        @media (prefers-reduced-motion: reduce) { .lx-card { transform: none; transition: none; } .lx-card::after { display: none; } }
      `}</style>
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow tone="inherit" className="text-lilac-text">
          {c.devicesEyebrow}
        </Eyebrow>
        <Display size="sm">{c.devicesTitle}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">
          {c.devicesLead}
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-card md:grid-cols-2 xl:grid-cols-3">
        {laserDevices.map((d) => (
          <li
            key={d.k}
            onPointerMove={move}
            onPointerLeave={leave}
            className="lx-card relative flex flex-col gap-4 overflow-hidden rounded-card bg-lilac-tint p-6"
          >
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-3 w-3 rounded-full"
                  style={{ background: d.color }}
                />
                <h3 className="font-display text-[24px] font-medium leading-[1.1]">
                  {d.name}
                </h3>
              </span>
              <span className="text-[13px] font-semibold text-lilac-text">
                {d.kind}
              </span>
            </div>
            <p className="pretty text-[15px] leading-[1.5]">{d.plain}</p>
            <dl className="mt-auto flex flex-col gap-2.5 rounded-[14px] bg-white/75 p-4 text-[14px] leading-[1.45]">
              <div className="flex flex-col gap-0.5">
                <dt className="text-[13px] font-semibold text-secondary">
                  {c.usedFor}
                </dt>
                <dd>{d.usedFor.join(", ")}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-[13px] font-semibold text-secondary">
                  {c.feels}
                </dt>
                <dd>{d.feels}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-[13px] font-semibold text-secondary">
                  {c.downtime}
                </dt>
                <dd>{d.downtime}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-[13px] font-semibold text-secondary">
                  {c.sessions}
                </dt>
                <dd>{d.sessions}</dd>
              </div>
            </dl>
            <Link
              href={devicePath(d.k)}
              className="w-fit text-[14px] font-semibold text-link"
            >
              More about {d.name}
              <span aria-hidden> ›</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
