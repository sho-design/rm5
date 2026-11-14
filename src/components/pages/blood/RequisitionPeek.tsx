"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import { reqCopy as c, type ReqBox } from "@/content/blood-ecg";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const STEP_MS = 2600;

/** Grey placeholder lines: the form shows its shape, never real details. */
function Lines({ widths }: { widths: string[] }) {
  return (
    <span className="flex flex-col gap-1.5 pt-1">
      {widths.map((w, i) => (
        <span key={i} className="block h-2 rounded-full bg-[#DDE3E9]" style={{ width: w }} />
      ))}
    </span>
  );
}

function Tick({ on }: { on: boolean }) {
  return (
    <span aria-hidden className={cn("grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border-[1.5px]", on ? "border-ink bg-ink text-white" : "border-[#B8C2CC] bg-white")}>
      {on ? (
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m2.5 6.2 2.2 2.2 4.8-5" />
        </svg>
      ) : null}
    </span>
  );
}

/**
 * "Your requisition, box by box" on the Bloodwork & ECG page. A made-up, generic lab form (placeholder lines, no
 * real form, no logos) whose common boxes light up in turn, each with a one-line caption. The full explanation
 * stays in the health note it links to. Plays only on screen, with Pause; tapping a box shows it and stops the
 * loop. With reduced motion nothing moves and every caption is in the list. Copy: content/blood-ecg.ts.
 */
export function RequisitionPeek() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const n = c.boxes.length;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const moving = playing && inView && !reduced;
  useEffect(() => {
    if (!moving) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % n), STEP_MS);
    return () => window.clearInterval(t);
  }, [moving, n]);

  const pick = (i: number) => {
    setActive(i);
    setPlaying(false);
  };
  const cur = c.boxes[active];

  /** One area of the form; lit when it is the current box. A render function, so the boxes keep their elements and
   *  the highlight eases between them. */
  const area = (k: ReqBox["k"], children: ReactNode, className?: string) => {
    const i = c.boxes.findIndex((b) => b.k === k);
    const on = i === active;
    const b = c.boxes[i];
    return (
      <div
        key={k}
        className={cn(
          "rq-area relative flex flex-col gap-1 rounded-[10px] border p-3 transition-[background-color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
          on ? "z-10 -translate-y-0.5 border-[color:var(--rm-sky)] bg-[#EEF5FC] shadow-[0_10px_24px_rgba(47,127,209,.18)]" : "border-[#E3E8ED] bg-white",
          className,
        )}
        data-on={on || undefined}
      >
        <span className={cn("text-[11px] font-bold uppercase tracking-[.06em]", on ? "text-[color:var(--rm-sky-text)]" : "text-[#8A97A4]")}>{b.label}</span>
        {children}
      </div>
    );
  };

  return (
    <Section id="requisition" className="rm-paper scroll-mt-24">
      <style>{`
        @keyframes rq-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
        .rq-cap { animation: rq-in 320ms cubic-bezier(.2,.8,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .rq-cap { animation: none; } .rq-area { transition: none !important; transform: none !important; } }
        :root[data-theme="contrast"] .rq-form { border: 2px solid var(--rm-ink); }
        :root[data-theme="contrast"] .rq-area[data-on] { outline: 3px solid var(--rm-ink); }
      `}</style>
      <div ref={box} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="inherit" className="text-sky-text">
              {c.eyebrow}
            </Eyebrow>
            <Display size="sm">{c.title}</Display>
            <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.lead}</p>
          </div>
          {/* The boxes and what each is for: the text version of the picture. */}
          <ul className="flex flex-col gap-1">
            {c.boxes.map((b, i) => {
              const on = i === active;
              return (
                <li key={b.k}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "flex w-full flex-col gap-0.5 rounded-[12px] border-l-[3px] px-3.5 py-2 text-left transition-colors duration-300",
                      on ? "border-[color:var(--rm-sky)] bg-[color:var(--div-family)]" : "border-transparent hover:bg-card",
                    )}
                  >
                    <span className="text-[15px] font-semibold">{b.label}</span>
                    <span className="pretty text-[14px] leading-[1.45] text-secondary">{b.caption}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <SmartLink to={c.morePage} className="w-fit text-[15px] font-semibold text-link">
            {c.more} ›
          </SmartLink>
        </div>

        <figure className="m-0 flex min-w-0 flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <figcaption className="text-[13px] font-semibold text-sky-text">{c.note}</figcaption>
            {!reduced ? (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={!playing}
                className="flex min-h-[44px] items-center gap-2 rounded-chip border border-[color:var(--border-default)] bg-[color:var(--bg-page)] px-4 text-[14px] font-semibold"
              >
                <span aria-hidden>{playing ? "❚❚" : "▶"}</span>
                {playing ? c.pause : c.play}
              </button>
            ) : null}
          </div>
          <div className="rounded-block bg-[color:var(--div-family)] p-4 md:p-8">
            {/* A generic form, slightly turned like paper on a desk. */}
            <div
              role="img"
              aria-label={c.alt}
              className="rq-form mx-auto flex max-w-[460px] flex-col gap-2.5 rounded-[14px] bg-white p-4 text-ink shadow-[0_18px_40px_rgba(15,31,46,.12)] md:-rotate-1 md:p-5"
            >
              <div aria-hidden className="flex items-center justify-between border-b border-[#E3E8ED] pb-2.5">
                <span className="h-2.5 w-28 rounded-full bg-ink/80" />
                <span className="h-2 w-16 rounded-full bg-[#DDE3E9]" />
              </div>
              <div aria-hidden className="grid grid-cols-2 gap-2.5">
                {area("patient", <Lines widths={["80%", "55%", "65%"]} />)}
                {area("doctor", <Lines widths={["70%", "50%"]} />)}
                {area(
                  "tests",
                  <span className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                    {[true, false, true, false, false, true].map((on, i) => (
                      <span key={i} className="flex items-center gap-2">
                        <Tick on={on} />
                        <span className="block h-2 rounded-full bg-[#DDE3E9]" style={{ width: `${50 + ((i * 13) % 35)}%` }} />
                      </span>
                    ))}
                  </span>,
                  "col-span-2",
                )}
                {area(
                  "fasting",
                  <span className="flex items-center gap-2 pt-1">
                    <Tick on />
                    <span className="block h-2 w-3/5 rounded-full bg-[#DDE3E9]" />
                  </span>,
                )}
                {area("copy", <Lines widths={["60%"]} />)}
              </div>
            </div>
            {/* The caption for the lit box, under the form. */}
            <p key={cur.k} className={cn("mx-auto mt-4 max-w-[460px] text-center text-[15px] leading-[1.45]", !reduced && "rq-cap")}>
              <span className="font-semibold">{cur.label}.</span> {cur.caption}
            </p>
          </div>
        </figure>
      </div>
    </Section>
  );
}
