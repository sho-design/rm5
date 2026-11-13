import {
  Display,
  Eyebrow,
  Section,
  SmartLink,
  TextLink,
} from "@/components/ui";
import {
  laserConcerns,
  laserCopy as c,
  laserDevices,
} from "@/content/aes-laser";
import { routes } from "@/lib/routes";

/** Concern by device: which tools are often considered for what. A starting point; the consult decides. */
export function ConcernGrid() {
  return (
    <Section id="which-device" className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow tone="inherit" className="text-lilac-text">
          {c.gridEyebrow}
        </Eyebrow>
        <Display size="sm">{c.gridTitle}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">
          {c.gridLead}
        </p>
      </div>
      <div
        className="overflow-x-auto rounded-card border border-border"
        tabIndex={0}
        role="region"
        aria-label={c.gridTitle}
      >
        <table className="w-full min-w-[680px] border-collapse text-[14px]">
          <thead>
            <tr className="bg-card">
              <th scope="col" className="px-4 py-3 text-left font-semibold">
                {c.gridConcern}
              </th>
              {laserDevices.map((d) => (
                <th
                  key={d.k}
                  scope="col"
                  className="px-2 py-3 text-center font-semibold"
                >
                  <span className="flex flex-col items-center gap-1">
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: d.color }}
                    />
                    {d.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {laserConcerns.map((row) => (
              <tr key={row.t} className="border-t border-border">
                <th scope="row" className="px-4 py-3 text-left font-medium">
                  {row.t}
                </th>
                {laserDevices.map((d) => {
                  const yes = row.devices.includes(d.k);
                  return (
                    <td key={d.k} className="px-2 py-3 text-center">
                      {yes ? (
                        <span
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full"
                          style={{
                            background: `color-mix(in srgb, ${d.color} 18%, white)`,
                          }}
                        >
                          <span
                            aria-hidden
                            className="h-3 w-3 rounded-full"
                            style={{ background: d.color }}
                          />
                          <span className="sr-only">{c.gridYes}</span>
                        </span>
                      ) : (
                        <span className="sr-only">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/** Downtime as a ruler: each device placed under no downtime, a day or two, or several days. */
export function DowntimeRuler() {
  return (
    <Section id="downtime" className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow tone="inherit" className="text-lilac-text">
          {c.rulerEyebrow}
        </Eyebrow>
        <Display size="sm">{c.rulerTitle}</Display>
      </div>
      <div className="rounded-card bg-lilac-tint p-6 md:p-8">
        <div
          aria-hidden
          className="relative mb-5 hidden h-2 rounded-full md:block"
          style={{
            background: "linear-gradient(90deg, #C9E7D5, #F2D59A, #EBA894)",
          }}
        />
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {c.rulerStops.map((stop, level) => (
            <li key={stop} className="flex flex-col gap-3">
              <span className="text-[15px] font-semibold">{stop}</span>
              <ul className="flex flex-wrap gap-2">
                {laserDevices
                  .filter((d) => d.level === level)
                  .map((d) => (
                    <li
                      key={d.k}
                      className="flex min-h-[36px] items-center gap-2 rounded-chip bg-white px-3.5 text-[14px] font-medium"
                    >
                      <span
                        aria-hidden
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: d.color }}
                      />
                      {d.name}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/** Skin tone and safety, then care before and after. */
export function SafetyCare() {
  return (
    <Section
      id="safety"
      className="grid scroll-mt-24 grid-cols-1 gap-card lg:grid-cols-2"
    >
      <div className="flex flex-col gap-4 rounded-card border border-border bg-card p-6 md:p-8">
        <Eyebrow tone="inherit" className="text-lilac-text">
          {c.safetyEyebrow}
        </Eyebrow>
        <h2 className="display-tight text-[26px] leading-[1.1] lg:text-[32px]">
          {c.safetyTitle}
        </h2>
        <p className="pretty text-[15px] leading-[1.55] text-secondary">
          {c.safetyLead}
        </p>
        <p className="text-[15px] font-semibold">{c.safetyWait}</p>
        <ul className="flex flex-col gap-2 text-[15px] leading-[1.45]">
          {c.safetyItems.map((it) => (
            <li key={it} className="flex gap-2.5">
              <span
                aria-hidden
                className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-lilac-deep"
              />
              {it}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 rounded-card bg-lilac-tint p-6 md:p-8">
        <Eyebrow tone="inherit" className="text-lilac-text">
          {c.careEyebrow}
        </Eyebrow>
        <h2 className="display-tight text-[26px] leading-[1.1] lg:text-[32px]">
          {c.careTitle}
        </h2>
        <div className="flex flex-col gap-2">
          <h3 className="text-[16px] font-semibold">{c.before}</h3>
          <ul className="flex flex-col gap-1.5 text-[15px] leading-[1.45]">
            {c.beforeItems.map((it) => (
              <li key={it} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-lilac-deep"
                />
                {it}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-[16px] font-semibold">{c.after}</h3>
          <ol className="flex flex-col gap-2.5">
            {c.afterSteps.map((s) => (
              <li
                key={s.t}
                className="flex flex-col gap-0.5 rounded-[14px] bg-white/75 px-4 py-3"
              >
                <span className="text-[14px] font-semibold">{s.t}</span>
                <span className="text-[14px] leading-[1.45] text-secondary">
                  {s.d}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <SmartLink to={`${routes.aesPlans}#regimen-recovery`} className="w-fit">
          <TextLink>{c.afterLink}</TextLink>
        </SmartLink>
      </div>
    </Section>
  );
}
