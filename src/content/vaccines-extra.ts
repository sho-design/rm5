import { draft } from "./review";
import { kidsCopy } from "./kids";

/*
 * Vaccines page sections (November 2026). Facts only from the page's glance box and kidsCopy.imm; new wording is
 * draft and needs clinic review.
 */

/** "From card to chart": what to bring, where the record goes, and slower updates for records from elsewhere. */
export const cardCopy = {
  eyebrow: draft("Your record"),
  title: draft("From card to chart."),
  lead: kidsCopy.imm.whereNote,
  steps: [
    { t: draft("Bring both cards"), d: draft("Your yellow immunization card and your health card.") },
    { t: draft("After the shot"), d: draft("We write it on your yellow card.") },
    { t: draft("Recorded in your chart"), d: draft("The same entry is added to your chart, so your doctor sees it at every visit.") },
  ],
  abroadTitle: draft("Vaccines from another country?"),
  abroadBody: draft(
    "Updating your yellow card can sometimes take a bit more time, especially when vaccines were given in another country.",
  ),
  abroadTip: kidsCopy.imm.catchBody,
  labels: {
    yellow: draft("Yellow card"),
    health: draft("Health card"),
    abroad: draft("Record from elsewhere"),
    chart: draft("Your chart"),
    recorded: draft("Recorded"),
  },
  alt: draft(
    "Illustration: a yellow immunization card and a health card are brought to the visit. After the shot, the entry moves from the yellow card into your chart, which gets a check mark. A record from another country takes a slower path into the chart.",
  ),
  illustration: draft("Illustration. Your nurse updates the record with you."),
  pause: draft("Pause"),
  play: draft("Play"),
};

/** "The family lines up": one booking per person, back to back, seen together. */
export const familyCopy = {
  eyebrow: draft("Coming as a family"),
  title: draft("One booking each, seen together."),
  rule: draft("One booking per person. Book each person back to back and we see you together."),
  steps: [
    { t: draft("Book each person"), d: draft("One booking for each family member, so each record is updated.") },
    { t: draft("Back to back"), d: draft("Pick times next to each other.") },
    { t: draft("Seen together"), d: draft("You come in as one family visit.") },
  ],
  people: [draft("Parent"), draft("Grandparent"), draft("Teen"), draft("Child")],
  slot: (n: number) => draft(`Booking ${n}`),
  together: draft("Seen together"),
  cta: kidsCopy.imm.catchCta,
  alt: draft(
    "Illustration: four family members, a parent, a grandparent, a teen and a child, each drop into their own booking in back-to-back time slots. The slots then join into one visit, seen together.",
  ),
  illustration: draft("Illustration. Book each person back to back."),
  pause: draft("Pause"),
  play: draft("Play"),
};

/** "Vaccines through a lifetime": the stages a person passes through, each with what is usually given then. */
export const lifetimeCopy = {
  eyebrow: draft("Through a lifetime"),
  title: draft("Vaccines at every stage."),
  lead: draft(
    "From the first months to every fall after 65, here is when vaccines usually come up. Your doctor confirms what is due for you at the visit.",
  ),
  illustration: draft("Illustration. Timing is adjusted for each person."),
  alt: draft(
    "Illustration of one line through a lifetime: a baby, a child, a teen, an adult and an older adult, with the vaccines usually given at each stage and a flu shot every fall.",
  ),
  stops: [
    { k: "baby", age: draft("Baby"), t: draft("Ontario routine schedule"), d: draft("Given in clinic at well-baby visits and recorded on the yellow card."), link: draft("See what is due at each age") },
    { k: "child", age: draft("4 to 6 years"), t: draft("The preschool booster"), d: draft("Given at the yearly checkup, with daycare and school forms done the same visit."), link: draft("See what is due at each age") },
    { k: "teen", age: draft("Grade 7 and high school"), t: draft("HPV, meningococcal, hepatitis B"), d: draft("Teens can see the doctor on their own for part of the visit."), link: draft("See what is due at each age") },
    { k: "adult", age: draft("Adults"), t: draft("Catch-up doses"), d: draft("For a dose you missed or are not sure you had. Your doctor checks your record with you."), link: draft("Book a vaccine visit") },
    { k: "older", age: draft("65 to 70"), t: draft("Shingles"), d: draft("Publicly funded 65 to 70."), link: draft("Book a vaccine visit") },
    { k: "flu", age: draft("Every fall"), t: draft("The flu shot"), d: draft("From October, every fall."), link: draft("Book a flu shot") },
  ],
  note: draft("Funding rules change from season to season. If a vaccine is not funded for you, we tell you the cost before it is given."),
};

/** "Every fall, the flu shot": a small year ring with October lit. */
export const fluCopy = {
  eyebrow: draft("Flu season"),
  title: draft("Every fall, the flu shot."),
  line: draft("Starting in October"),
  cta: draft("Book a flu shot"),
  alt: draft("Illustration of a year as a ring of twelve months, with October lit for the flu shot and a marker going around once a year."),
  illustration: draft("Illustration"),
  pause: draft("Pause"),
  play: draft("Play"),
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};
