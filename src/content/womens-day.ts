import { draft } from "./review";

/**
 * Women's health day: the last Sunday of every month at Thornhill, during
 * Sunday hours, with testing by our nurses (clinic, October 2026). New
 * wording, listed in docs/content-review.md.
 */
export const womensHealthDay = {
  eyebrow: draft("Women’s health day"),
  title: draft("The last Sunday of every month."),
  when: draft("Last Sunday of the month, 8am to 2pm"),
  body: draft("Testing and screening done by our nurses at Thornhill, 8am to 2pm. Book a spot, and tell us what you would like done so we can have everything ready."),
  /** Shown on the card: there is no female physician yet (clinic, October 2026). */
  who: draft("Both of our physicians are men. On women’s health day, our nurses do the testing."),
  next: draft("Next one"),
  cta: draft("Book a spot"),
  visitLabel: draft("Women’s health day"),
  bring: draft("Your health card, and any results or letters from other clinics."),
};

/** Last Sunday of the month for the given year and month (0 = January). */
export function lastSundayOf(year: number, month: number): Date {
  const d = new Date(year, month + 1, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

/**
 * The next `count` women's health days on or after `from` (a Toronto wall-clock
 * date). Today counts until the day is over.
 */
export function nextWomensDays(from: Date, count: number): Date[] {
  const out: Date[] = [];
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  for (let m = 0; out.length < count && m < count + 2; m++) {
    const d = lastSundayOf(from.getFullYear(), from.getMonth() + m);
    if (d >= today) out.push(d);
  }
  return out;
}
