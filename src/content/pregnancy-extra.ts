import { draft } from "./review";

/*
 * Pregnancy care page sections (November 2026). Facts only from the pregnancy topic in content/topics.ts.
 */

/**
 * "When to call us": the pregnancy topic's "Call us the same day" fact, split into three tiers without adding
 * symptoms or advice: "If you are being sick and cannot keep fluids down, feel faint, or have bleeding. When we are
 * closed, call Health811 at 811 for advice any time. For heavy bleeding or severe pain, dial 911."
 */
export const callCopy = {
  eyebrow: draft("During your pregnancy"),
  title: draft("When to call us."),
  lead: draft("Tap what is happening and we show who to call."),
  pickLabel: draft("What is happening?"),
  tiers: [
    {
      k: "clinic",
      t: draft("Call us the same day"),
      d: draft("If you are being sick and cannot keep fluids down, feel faint, or have bleeding."),
      action: draft("Call 905-709-3222"),
    },
    {
      k: "closed",
      t: draft("When we are closed"),
      d: draft("Call Health811 at 811 for advice any time."),
      action: draft("Call 811"),
    },
    {
      k: "emergency",
      t: draft("Heavy bleeding or severe pain"),
      d: draft("Dial 911."),
      action: draft("Dial 911"),
    },
  ],
  chips: [
    { label: draft("Being sick, can't keep fluids down"), tier: 0 },
    { label: draft("Feeling faint"), tier: 0 },
    { label: draft("Bleeding"), tier: 0 },
    { label: draft("We are closed"), tier: 1 },
    { label: draft("Heavy bleeding"), tier: 2 },
    { label: draft("Severe pain"), tier: 2 },
  ],
  matched: (chip: string, tier: string) => draft(`${chip}: ${tier}.`),
};

/**
 * "Two teams, one pregnancy": replaces the topic's "What to expect" box and "Your first trimester with us." steps.
 * Their wording is kept as it was (it is draft in topics.ts too); only the lead, lane names and labels are new.
 */
export const teamsCopy = {
  eyebrow: draft("Your pregnancy with us"),
  title: draft("Two teams, one pregnancy."),
  lead: draft(
    "We start your care and stay your family doctor. From 12 weeks, obstetrics or midwifery care for the pregnancy alongside us.",
  ),
  book: draft("Book a pregnancy visit"),
  register: "Register as a patient",
  illustration: draft("Illustration. Your own care may differ."),
  // Swim lanes (Nov 2026): the band where both teams care for you, and the replay button.
  overlap: draft("Two teams at once"),
  overlapNote: draft("From 12 weeks until the baby arrives, both teams care for you."),
  replay: draft("Show again"),
  listLabel: draft("Your pregnancy with us, step by step"),
  lanes: {
    us: draft("With us"),
    obs: draft("Obstetrics or midwifery"),
    family: draft("Still your family doctor"),
    baby: draft("Your baby"),
  },
  // Glance and path wording, carried word for word.
  findTime: draft("Day one"),
  findTitle: draft("You find out"),
  findBody: draft(
    "Book as soon as you know you are pregnant. If you are new to us, register as well so we can stay your family doctor after the baby arrives.",
  ),
  firstTime: draft("As soon as you know"),
  firstTitle: draft("First visit"),
  firstBody: draft("We confirm the pregnancy, go through your health and medications, and answer your questions."),
  testsTime: draft("Same week"),
  testsTitle: draft("First-trimester tests"),
  testsBody: draft("Bloodwork drawn on site and any other tests your doctor orders."),
  whoLabel: draft("Who you see"),
  whoValue: draft("One of our physicians, with our nurses for testing"),
  referralTime: draft("By 12 weeks"),
  referralTitle: draft("Referral"),
  referralBody: draft(
    "We refer you to obstetrics or midwifery, your choice where it fits, and share your results.",
  ),
  referralChoices: [draft("Obstetrics"), draft("Midwifery")],
  throughoutTime: draft("Throughout"),
  throughoutTitle: draft("Still your family doctor"),
  throughoutBody: draft(
    "We stay your family doctor during the pregnancy and see your baby for well-baby visits after.",
  ),
  babyTime: draft("After the baby"),
  babyTitle: draft("Well-baby visits here"),
  babyBody: draft("Your baby's own line starts here, with the same family doctor."),
};

/** "From one chart to two": after the birth, your record and your baby's, with the same family doctor. */
export const chartCopy = {
  eyebrow: draft("After the baby"),
  title: draft("From one chart to two."),
  lead: draft(
    "Your record follows you through the pregnancy. When the baby arrives, your baby gets their own record here too, with the same family doctor.",
  ),
  you: draft("You"),
  baby: draft("Your baby"),
  pregnancy: draft("Pregnancy"),
  arrives: draft("The baby arrives"),
  sameDoctor: draft("Same family doctor"),
  wellBaby: draft("Well-baby visits here"),
  kidsLink: draft("Children and youth"),
  alt: draft(
    "Illustration: one chart through the pregnancy. When the baby arrives it divides into two charts, yours and your baby's, with the same family doctor and well-baby visits here.",
  ),
  illustration: draft("Illustration"),
  pause: draft("Pause"),
  play: draft("Play"),
};
