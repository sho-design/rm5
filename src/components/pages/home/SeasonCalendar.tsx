import { calendar, calendarClosureDot, calendarDots, monthShort, seasons } from "@/content/home";
import { site } from "@/content/site";
import { Button, Section, SmartLink } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * "This season" card (picked by the current Toronto month) beside the
 * four-month health calendar. The page revalidates hourly so the month
 * rolls over without a deploy.
 */
export function SeasonCalendar({ month }: { month: number }) {
  const season = seasons.find((s) => s.months.includes(month)) ?? seasons[0];
  const months = [0, 1, 2, 3].map((i) => (month + i) % 12);

  return (
    <Section tight className="grid grid-cols-1 items-stretch gap-block lg:grid-cols-[1fr_1.4fr]">
      <div className="flex flex-col justify-between gap-7 rounded-card p-6 text-ink md:p-8" style={{ background: season.bg }}>
        <div className="flex flex-col gap-3">
          <span className="eyebrow">{season.eyebrow}</span>
          <h2 className="font-display text-[30px] font-medium leading-[1.02] tracking-[-.02em] md:text-[36px]">{season.title}</h2>
          <p className="pretty text-[15px] leading-[1.5] text-ink/75">{season.p}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[14px] font-semibold">
          <Button to="book" size="sm" className="!h-[41px] !px-[22px]">
            {season.cta}
          </Button>
          <SmartLink to={season.page} className="text-ink">
            Learn more ›
          </SmartLink>
        </div>
      </div>

      <div className="flex flex-col gap-[18px] rounded-card border border-border bg-card p-5 md:px-8 md:py-7">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-[26px] font-medium tracking-[-.02em]">Health calendar</h2>
          <SmartLink to="year" className="whitespace-nowrap text-[13px] font-semibold text-link">
            Build your year ›
          </SmartLink>
        </div>
        <ol className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {months.map((mi, i) => {
            const now = i === 0;
            return (
              <li key={mi} className={cn("flex flex-col gap-2.5 rounded-row border p-4", now ? "border-sky bg-raised" : "border-border bg-transparent")}>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[22px] font-medium tracking-[-.02em]">{monthShort[mi]}</span>
                  {now ? <span className="text-[11px] font-semibold text-sky">Now</span> : null}
                </div>
                <div className="flex flex-col gap-1.5">
                  {calendar[mi].map((ci) => (
                    <SmartLink key={ci.label} to={ci.page ?? "locations"} className="flex items-start gap-[7px] text-[13px] leading-[1.35] hover:text-link">
                      <span aria-hidden className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ci.page ? calendarDots[ci.page] : calendarClosureDot }} />
                      <span>{ci.label}</span>
                    </SmartLink>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
        <span className="text-[12px] text-muted">Clinic closures: {site.closures}</span>
      </div>
    </Section>
  );
}
