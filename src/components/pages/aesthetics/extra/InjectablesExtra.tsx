import { Display, Eyebrow, Section } from "@/components/ui";
import {
  injCopy as c,
  injFamilies,
  type InjFamilyKey,
} from "@/content/aes-injectables";
import { FaceMap } from "./injectables/FaceMap";
import { HowItWorks } from "./injectables/HowItWorks";
import { UltrasoundMap } from "./injectables/UltrasoundMap";

/** Small drawing for each family card: a relaxed muscle, a gel cushion, collagen threads. */
function FamilyIcon({ k }: { k: InjFamilyKey }) {
  return (
    <svg viewBox="0 0 96 56" aria-hidden className="h-14 w-24">
      <path
        d="M 4 18 C 30 18, 66 18, 92 18"
        fill="none"
        stroke="#D9A88F"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {k === "neuro" ? (
        <>
          <rect x="14" y="30" width="68" height="16" rx="8" fill="#E39A8E" />
          <path
            d="M 6 52 C 20 48, 28 44, 36 38"
            fill="none"
            stroke="#E2B13C"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx="36"
            cy="38"
            r="3.5"
            fill="#FFD84D"
            stroke="#B8860B"
            strokeWidth="1"
          />
        </>
      ) : null}
      {k === "filler" ? (
        <ellipse
          cx="48"
          cy="34"
          rx="30"
          ry="12"
          fill="#D9C2EA"
          stroke="#B48DD3"
          strokeWidth="1.5"
        />
      ) : null}
      {k === "bio" ? (
        <>
          {[20, 36, 52, 68, 80].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy={i % 2 ? 40 : 32}
              r="3.5"
              fill="#FFFFFF"
              stroke="#8E5FB5"
              strokeWidth="1.5"
            />
          ))}
          <path
            d="M 20 32 C 28 40, 30 40, 36 40 C 44 36, 46 32, 52 32 C 60 38, 62 40, 68 40 C 74 36, 76 32, 80 32"
            fill="none"
            stroke="#8E5FB5"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      ) : null}
    </svg>
  );
}

/**
 * Injectables page extras (Nov 2026): the three families, the animated "what each one does" explainer, a face
 * map, safety with ultrasound vessel mapping, a timeline after treatment and common worries.
 */
export function InjectablesExtra() {
  return (
    <>
      <Section
        id="injectables-families"
        className="flex scroll-mt-24 flex-col gap-6"
      >
        <div className="flex max-w-[720px] flex-col gap-3">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {c.famEyebrow}
          </Eyebrow>
          <Display size="sm">{c.famTitle}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.famLead}
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-card md:grid-cols-3">
          {injFamilies.map((f) => (
            <li
              key={f.k}
              className="flex flex-col gap-4 rounded-card p-6 md:p-7"
              style={{ background: f.tint }}
            >
              <FamilyIcon k={f.k} />
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-[24px] font-medium leading-tight">
                  {f.t}
                </h3>
                <span className="text-[15px] font-semibold text-lilac-text">
                  {f.short}
                </span>
                {f.brand ? (
                  <span className="text-[13px] font-semibold text-muted">
                    {f.brand}
                  </span>
                ) : null}
              </div>
              <p className="pretty text-[15px] leading-[1.5] text-ink-2">
                {f.d}
              </p>
              <div className="mt-auto flex flex-col gap-0.5 rounded-row bg-white/75 px-4 py-3">
                <span className="text-[13px] font-semibold text-muted">
                  {c.lastsLabel}
                </span>
                <span className="text-[15px] font-semibold">{f.lasts}</span>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <HowItWorks />

      <FaceMap />

      <Section id="injectables-safety" className="scroll-mt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Eyebrow tone="inherit" className="text-lilac-text">
                {c.safeEyebrow}
              </Eyebrow>
              <Display size="sm">{c.safeTitle}</Display>
            </div>
            <ul className="flex flex-col gap-4">
              {c.safety.map((s) => (
                <li key={s.t} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lilac-tint"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="#5D2E85"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[17px] font-semibold">{s.t}</span>
                    <span className="pretty text-[15px] leading-[1.5] text-secondary">
                      {s.d}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 rounded-card bg-[color:var(--div-pain)] p-5 md:p-6">
              <h3 className="text-[17px] font-semibold">{c.screenTitle}</h3>
              <ul className="flex flex-col gap-2 text-[15px] leading-[1.45]">
                {c.screen.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta-deep"
                    />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-block bg-lilac-tint p-5 md:p-8">
            <div className="flex flex-col gap-2">
              <Eyebrow tone="inherit" className="text-lilac-text">
                {c.usEyebrow}
              </Eyebrow>
              <h3 className="font-display text-[28px] font-medium leading-tight lg:text-[32px]">
                {c.usTitle}
              </h3>
              <p className="pretty text-[15px] leading-[1.5] text-secondary">
                {c.usLead}
              </p>
            </div>
            <UltrasoundMap />
          </div>
        </div>
      </Section>

      <Section
        id="injectables-after"
        className="flex scroll-mt-24 flex-col gap-6"
      >
        <div className="flex flex-col gap-3">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {c.timeEyebrow}
          </Eyebrow>
          <Display size="sm">{c.timeTitle}</Display>
        </div>
        <ol className="relative grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-3">
          <span
            aria-hidden
            className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-lilac-tint md:left-4 md:right-4 md:top-[15px] md:bottom-auto md:h-0.5 md:w-auto"
          />
          {c.timeline.map((s, i) => (
            <li
              key={s.when}
              className="relative flex gap-4 md:flex-col md:gap-3"
            >
              <span
                aria-hidden
                className={
                  i === 2
                    ? "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-[13px] font-semibold text-white"
                    : "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-lilac-deep bg-page text-[13px] font-semibold text-lilac-text"
                }
              >
                {i + 1}
              </span>
              <span className="flex flex-col gap-1 md:rounded-card md:bg-card md:p-4">
                <span className="text-[13px] font-semibold text-lilac-text">
                  {s.when}
                </span>
                <span className="text-[17px] font-semibold leading-tight">
                  {s.t}
                </span>
                <span className="pretty text-[14px] leading-[1.45] text-secondary">
                  {s.d}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="injectables-worries"
        className="flex scroll-mt-24 flex-col gap-6"
      >
        <div className="flex flex-col gap-3">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {c.mythEyebrow}
          </Eyebrow>
          <Display size="sm">{c.mythTitle}</Display>
        </div>
        <ul className="grid grid-cols-1 gap-card md:grid-cols-3">
          {c.myths.map((m) => (
            <li
              key={m.q}
              className="flex flex-col gap-3 rounded-card border border-border bg-white p-6"
            >
              <h3 className="font-display text-[24px] font-medium leading-tight">
                {m.q}
              </h3>
              <p className="pretty text-[15px] leading-[1.5] text-secondary">
                {m.a}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
