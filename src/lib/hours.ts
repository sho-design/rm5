import { openingHours, thornhillHours } from "@/content/site";

/** Current time in the clinic's time zone. */
export function torontoNow(date = new Date()): Date {
  return new Date(date.toLocaleString("en-US", { timeZone: "America/Toronto" }));
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
  date: Date;
  dow: string;
  num: number;
  open: boolean;
  slots: number[];
}

/** The next seven days with the slots the prototype offers (respects clinic hours; Friday closed). */
export function bookingDays(now = torontoNow()): BookingDay[] {
  return [0, 1, 2, 3, 4, 5, 6].map((i) => {
    const d = new Date(now);
    d.setDate(now.getDate() + 1 + i);
    const h = openingHours[d.getDay()];
    const slots = h
      ? Array.from({ length: (h[1] - h[0]) * 2 }, (_, j) => h[0] + j / 2)
          .filter((_, j) => (j * 7 + i * 3) % 5 !== 1)
          .slice(0, 12)
      : [];
    return { date: d, dow: DOW[d.getDay()], num: d.getDate(), open: !!h, slots };
  });
}
