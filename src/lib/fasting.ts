/**
 * Fasting cut-off times for a blood draw. Times are decimal hours on the clinic clock (9 is 9am, 15.5 is 3:30pm),
 * the same as booking slots.
 */

/** "9pm", "10:30pm", "midnight", "noon": the site's time style ("8am to 4pm"). Wraps past midnight. */
export function clock(h: number): string {
  const t = ((h % 24) + 24) % 24;
  const hh = Math.floor(t);
  const mm = Math.round((t - hh) * 60);
  if (mm === 0 && hh === 0) return "midnight";
  if (mm === 0 && hh === 12) return "noon";
  const h12 = ((hh + 11) % 12) + 1;
  return `${h12}${mm ? `:${String(mm).padStart(2, "0")}` : ""}${hh < 12 ? "am" : "pm"}`;
}

/** The last time to eat before a draw at `slot` for a fast of `hours`, and whether that falls the day before. */
export function fastStop(slot: number, hours: number): { time: string; dayBefore: boolean } {
  const t = slot - hours;
  return { time: clock(t), dayBefore: t < 0 };
}
