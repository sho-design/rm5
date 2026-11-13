"use client";

import { useId, useState, type ReactNode } from "react";
import {
  Display,
  Eyebrow,
  Section,
  SmartLink,
  TextLink,
} from "@/components/ui";
import { Flow } from "@/components/ui/Flow";
import { scBuilder as c } from "@/content/aes-skinceuticals";
import { programsCopy, regimens } from "@/content/programs";
import {
  skinFilters,
  skinProduct,
  type SkinGroup,
  type SkinShape,
} from "@/content/skincare";
import { radioKeys, rovingTab, useReducedMotion } from "@/lib/a11y";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { draft } from "@/content/review";

const skins = [{ k: "any", t: draft("Not sure") }, ...skinFilters.slice(1)];

/** Body colour of a bottle by its step, so the shelf reads cleanse, correct, protect at a glance. */
const bodyFill: Record<SkinGroup, string> = {
  cleanse: "var(--rm-sky-soft)",
  prevent: "var(--rm-sun-tint)",
  correct: "var(--rm-lilac-tint)",
  moisturize: "var(--rm-sage-tint)",
  protect: "var(--rm-paper)",
};

/** A simple bottle drawing for each packaging shape in skincare.ts. */
function Bottle({ shape, fill }: { shape: SkinShape; fill: string }) {
  const line = {
    stroke: "var(--rm-ink)",
    strokeWidth: 2,
    strokeLinejoin: "round" as const,
  };
  const parts: Record<SkinShape, ReactNode> = {
    dropper: (
      <>
        <ellipse cx="30" cy="20" rx="8" ry="12" fill="var(--rm-ink)" />
        <rect
          x="22"
          y="30"
          width="16"
          height="14"
          rx="2"
          fill="var(--rm-ink-2)"
        />
        <rect
          x="11"
          y="44"
          width="38"
          height="70"
          rx="8"
          fill={fill}
          {...line}
        />
        <rect
          x="11"
          y="66"
          width="38"
          height="22"
          fill="#FFFFFF"
          opacity=".8"
        />
      </>
    ),
    pump: (
      <>
        <rect
          x="16"
          y="12"
          width="26"
          height="10"
          rx="3"
          fill="var(--rm-ink)"
        />
        <rect x="38" y="14" width="14" height="5" rx="2" fill="var(--rm-ink)" />
        <rect x="24" y="22" width="10" height="16" fill="var(--rm-ink-2)" />
        <rect
          x="9"
          y="38"
          width="42"
          height="76"
          rx="10"
          fill={fill}
          {...line}
        />
        <rect x="9" y="62" width="42" height="24" fill="#FFFFFF" opacity=".8" />
      </>
    ),
    tube: (
      <>
        <rect
          x="19"
          y="10"
          width="22"
          height="20"
          rx="4"
          fill="var(--rm-ink)"
        />
        <path d="M14 30 L46 30 L42 106 L18 106 Z" fill={fill} {...line} />
        <rect
          x="16"
          y="106"
          width="28"
          height="8"
          rx="2"
          fill={fill}
          {...line}
        />
        <rect
          x="16"
          y="54"
          width="28"
          height="22"
          fill="#FFFFFF"
          opacity=".8"
        />
      </>
    ),
    jar: (
      <>
        <rect x="5" y="48" width="50" height="16" rx="5" fill="var(--rm-ink)" />
        <rect
          x="8"
          y="64"
          width="44"
          height="50"
          rx="10"
          fill={fill}
          {...line}
        />
        <rect x="8" y="78" width="44" height="20" fill="#FFFFFF" opacity=".8" />
      </>
    ),
    bottle: (
      <>
        <rect
          x="21"
          y="12"
          width="18"
          height="24"
          rx="4"
          fill="var(--rm-ink)"
        />
        <rect
          x="13"
          y="36"
          width="34"
          height="78"
          rx="11"
          fill={fill}
          {...line}
        />
        <rect
          x="13"
          y="62"
          width="34"
          height="24"
          fill="#FFFFFF"
          opacity=".8"
        />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 60 120" aria-hidden className="h-[104px] w-auto">
      {parts[shape]}
    </svg>
  );
}

const css = `
@keyframes sc-slide { from { transform: translate(48px, -14px) rotate(6deg); opacity: 0; } to { transform: none; opacity: 1; } }
.sc-shelf-item { animation: sc-slide 650ms cubic-bezier(.2,.8,.2,1) both; }
@media (prefers-reduced-motion: reduce) { .sc-shelf-item { animation: none; } }
`;

/** One choice group as radio chips. */
function Choices<T extends { k: string; t: string }>({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: T[];
  value: string;
  onChange: (k: string) => void;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2.5">
      <span id={id} className="text-[14px] font-semibold">
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={id}
        onKeyDown={radioKeys}
        className="flex flex-wrap gap-2"
      >
        {items.map((it, i) => {
          const on = it.k === value;
          return (
            <button
              key={it.k}
              type="button"
              role="radio"
              aria-checked={on}
              tabIndex={rovingTab(on, i, true)}
              onClick={() => onChange(it.k)}
              className={cn(
                "min-h-[44px] rounded-chip border-[1.5px] px-4 text-[14px] font-semibold transition-colors duration-[250ms]",
                on
                  ? "border-ink bg-ink text-white"
                  : "border-border bg-white text-primary hover:border-ink",
              )}
            >
              {it.t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Routine builder: pick a skin type and a main concern, get the closest regimen from programs.ts as a shelf of
 * bottles that slide on in order (numbered), the morning and night order, and the total rolling up. Links to the full
 * regimen with notes. A starting point only; the nurse adjusts it at the consult.
 */
export function RoutineBuilder() {
  const reduced = useReducedMotion();
  const [skin, setSkin] = useState("any");
  const [concern, setConcern] = useState("start");

  const chosen = c.concerns.find((x) => x.k === concern) ?? c.concerns[0];
  let regKey = chosen.reg;
  let note: string | null = null;
  if (concern === "start" && (skin === "oily" || skin === "acne")) {
    regKey = "acne";
    note = c.oilyStarter;
  } else if (concern === "start" && skin === "sensitive") {
    regKey = "redness";
    note = c.sensitiveStarter;
  } else if (
    skin === "sensitive" &&
    regKey !== "redness" &&
    regKey !== "recovery"
  ) {
    note = c.gentle;
  }
  const r = regimens.find((x) => x.k === regKey) ?? regimens[0];
  const items = r.items.map(skinProduct);
  const total = items.reduce((s, p) => s + p.srp, 0);

  return (
    <Section id="routine-builder" className="scroll-mt-24">
      <style>{css}</style>
      <div className="flex flex-col gap-8 rounded-block border border-border bg-card p-6 md:p-10 lg:p-12">
        <div className="flex max-w-[720px] flex-col gap-3">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.lead}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Choices
            label={c.skinLabel}
            items={skins}
            value={skin}
            onChange={setSkin}
          />
          <Choices
            label={c.concernLabel}
            items={c.concerns}
            value={concern}
            onChange={setConcern}
          />
        </div>

        <div className="flex flex-col gap-6 rounded-[24px] bg-white p-5 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-[24px] font-medium leading-[1.1] lg:text-[28px]">
              {c.shelfLabel(r.t)}
            </h3>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[13px] font-semibold text-muted">
                {c.total}
              </span>
              <Flow
                value={total}
                prefix="$"
                className="font-display text-[32px] font-medium leading-none tabular-nums"
              />
            </div>
          </div>
          <p className="pretty -mt-2 max-w-[640px] text-[15px] leading-[1.5] text-secondary">
            {r.why}
          </p>

          {/* The shelf: each cell carries a piece of plank, so rows read as shelves when they wrap on a phone. */}
          <ol
            key={r.k}
            className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-y-6"
            aria-label={c.shelfLabel(r.t)}
          >
            {items.map((p, i) => (
              <li
                key={p.id}
                className={cn(
                  "flex flex-col items-center gap-2 text-center",
                  !reduced && "sc-shelf-item",
                )}
                style={{ animationDelay: `${i * 130}ms` }}
              >
                <span className="relative flex w-full flex-col items-center border-b-[8px] border-lilac pb-0.5">
                  <span
                    aria-hidden
                    className="absolute left-1 top-0 grid h-6 w-6 place-items-center rounded-full bg-lilac-deep text-[13px] font-semibold text-white"
                  >
                    {i + 1}
                  </span>
                  <Bottle shape={p.shape} fill={bodyFill[p.group]} />
                </span>
                <span className="flex flex-col gap-0.5 px-1">
                  <span className="pretty text-[13px] font-semibold leading-[1.3]">
                    {p.name}
                  </span>
                  <span className="text-[13px] tabular-nums text-secondary">
                    ${p.srp}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {(
              [
                [c.am, r.am],
                [c.pm, r.pm],
              ] as const
            ).map(([label, ids]) => (
              <div
                key={label}
                className="flex flex-col gap-2 rounded-[16px] bg-lilac-tint p-4"
              >
                <span className="text-[13px] font-semibold text-lilac-text">
                  {label}
                </span>
                {ids.length ? (
                  <ol className="flex flex-col gap-2">
                    {ids.map((id, n) => (
                      <li
                        key={id}
                        className="flex items-baseline gap-2.5 text-[14px] leading-[1.4]"
                      >
                        <span
                          aria-hidden
                          className="grid h-5 w-5 shrink-0 translate-y-[3px] place-items-center rounded-full bg-lilac-deep text-[12px] font-semibold text-white"
                        >
                          {n + 1}
                        </span>
                        <span>
                          <span className="font-semibold">
                            {skinProduct(id).name}
                          </span>
                          {programsCopy.roles[id] ? (
                            <span className="text-secondary">
                              . {programsCopy.roles[id]}
                            </span>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <span className="text-[14px]">{c.pmNone}</span>
                )}
              </div>
            ))}
          </div>

          {note || r.note ? (
            <div className="flex flex-col gap-1.5 rounded-[16px] bg-sun-tint p-4 text-[14px] leading-[1.5] text-sun-ink">
              {note ? <span>{note}</span> : null}
              {r.note ? <span>{r.note}</span> : null}
            </div>
          ) : null}

          <div className="flex flex-col gap-2 border-t border-border pt-4">
            <SmartLink
              to={`${routes.aesPlans}#regimen-${r.k}`}
              className="w-fit"
            >
              <TextLink className="text-[15px]">{c.seeRegimen}</TextLink>
            </SmartLink>
            <span className="text-[13px] text-muted">{c.totalNote}</span>
          </div>
          <p className="sr-only" aria-live="polite">
            {`${c.shelfLabel(r.t)}. ${items.length} products, $${total}.`}
          </p>
        </div>
      </div>
    </Section>
  );
}
