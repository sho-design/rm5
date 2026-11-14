import { draft } from "./review";

/*
 * Women's health page sections (November 2026). New wording is draft for clinic review; facts come from
 * content/womens-day.ts and the women's FAQ in content/subpages.ts.
 */

/** "Women's health day" calendar: the flipping month pages. */
export const dayCopy = {
  weekdays: ["S", "M", "T", "W", "T", "F", "S"],
  alt: (month: string, day: string) =>
    draft(`Calendar for ${month}, with the last Sunday, ${day}, marked as women's health day.`),
  replay: draft("Show again"),
  bringLabel: draft("Bring"),
};

/** "Who you'll see": the honest panel about physicians and nurses. */
export const whoCopy = {
  eyebrow: draft("Who you'll see"),
  title: draft("Our nurses do the testing."),
  physicians: draft("Our physicians"),
  nurses: draft("Our nurses"),
  alt: draft("Illustration: two physicians in navy scrubs and a row of nurses in black scrubs."),
};

/**
 * "Your screening line" (women's health): the four screenings on an age ruler. The ages and intervals mirror the
 * existing screening cards (womenScreen in content/subpages.ts), which stay the source of every description.
 */
export const lineCopy = {
  ageLabel: draft("Your age"),
  ageValue: (a: number) => draft(`${a} years old`),
  dueNow: draft("Due now"),
  next: draft("Coming up next"),
  nextAt: (age: number) => draft(`From ${age}`),
  noneNow: draft("Nothing on this list is due at this age. Your doctor checks what fits you at a checkup."),
  noneNext: draft("Nothing further on this list. Your doctor talks through what still makes sense for you."),
  doneOnce: draft("Once, at 65 or after"),
  someoneElse: draft("Checking for someone else? Try Am I due?"),
  illustration: draft("Illustration. Drag the handle or use the arrow keys."),
  alt: draft(
    "An age ruler from 20 to 80. Cervical screening every 3 years from 25 to 69, breast screening every 2 years from 40 to 74, colon screening every 2 years from 50 to 74, and one bone density scan at 65.",
  ),
};
