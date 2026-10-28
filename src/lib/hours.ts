import { openingHours, thornhillHours } from "@/content/site";

const torontoParts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hourCycle: "h23" });

/**
 * Current time in the clinic's time zone, as a Date whose local fields
 * (getFullYear, getHours...) read Toronto wall-clock time whatever the
 * visitor's own time zone is. Built from formatToParts, which every browser
 * parses the same way.
 */
export function torontoNow(date = new Date()): Date {
  const p: Record<string, number> = {};
  for (const part of torontoParts.formatToParts(date)) if (part.type !== "literal") p[part.type] = Number(part.value);
  return new Date(p.year, p.month - 1, p.day, p.hour % 24, p.minute, p.second);
}

/** Calendar date of a wall-clock Date as YYYY-MM-DD (no UTC conversion, so the day never shifts). */
export function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const short = (s: string) => s.replace(/:00/g, "").replace(/ (am|pm)/g, "$1");
const toMinutes = (s: string) => {
  const m = s.match(/(\d+):(\d+) (am|pm)/);
  if (!m) return 0;
  const hh = (+m[1] % 12) + (m[3] === "pm" ? 12 : 0);
  return hh * 60 + +m[2];
};

/** "Thornhill open now until 4pm" style status for the utility bar. */
export function openStatus(now = torontoNow()): { text: string; open: boolean } {
  const di = (now.getDay() + 6) % 7; // Monday first
  const cur = now.getHours() * 60 + now.getMinutes();
  const today = thornhillHours[di][1];
  if (today !== "Closed") {
    const [o, c] = today.split(" to ");
    if (cur >= toMinutes(o) && cur < toMinutes(c)) return { text: `Thornhill open now until ${short(c)}`, open: true };
    if (cur < toMinutes(o)) return { text: `Thornhill closed, opens today at ${short(o)}`, open: false };
  }
  for (let i = 1; i <= 7; i++) {
    const [d, v] = thornhillHours[(di + i) % 7];
    if (v !== "Closed") return { text: `Thornhill closed, opens ${i === 1 ? "tomorrow" : d} at ${short(v.split(" to ")[0])}`, open: false };
  }
  return { text: "Thornhill", open: false };
}

export const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Format a decimal hour (9, 15.5) as "9:00 am" / "3:30 pm". */
export function fmtTime(t: number): string {
  const hh = Math.floor(t);
  const mm = t % 1 ? "30" : "00";
  return `${((hh + 11) % 12) + 1}:${mm} ${hh < 12 ? "am" : "pm"}`;
}

export interface BookingDay {
  /** Toronto wall-clock date (local fields read Toronto time). */
  date: Date;
  /** Toronto calendar date, YYYY-MM-DD. */
  iso: string;
  dow: string;
  num: number;
  open: boolean;
  today: boolean;
  slots: number[];
}

/**
 * The next seven clinic days in Toronto time, with the slots the prototype
 * offers (respects clinic hours; Friday closed). Today is included only
 * while it still has a slot at least an hour away, so a past time is never
 * offered.
 */
export function bookingDays(now = torontoNow(), count = 7): BookingDay[] {
  const nowHours = now.getHours() + now.getMinutes() / 60;
  const out: BookingDay[] = [];
  for (let i = 0; out.length < count && i <= count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const h = openingHours[d.getDay()];
    let slots = h
      ? Array.from({ length: (h[1] - h[0]) * 2 }, (_, j) => h[0] + j / 2)
          .filter((_, j) => (j * 7 + i * 3) % 5 !== 1)
          .slice(0, 12)
      : [];
    if (i === 0) {
      slots = slots.filter((t) => t >= nowHours + 1);
      if (!slots.length) continue;
    }
    out.push({ date: d, iso: ymd(d), dow: DOW[d.getDay()], num: d.getDate(), open: !!h, today: i === 0, slots });
  }
  return out;
}
