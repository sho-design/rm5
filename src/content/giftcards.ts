import { draft } from "./review";

/** Clinic-wide gift cards (Nov 2026). One Square card works for any service a patient pays for. All draft. */
export const giftCopy = {
  page: draft("Gift cards"),
  title: draft("A gift card for any service."),
  lead: draft("One card for anything you pay for at Restoration Medical. Buy online in any amount, and Square emails it to you or to the person you choose."),
  leadDesk: draft("One card for anything you pay for at Restoration Medical. Ask the front desk at Thornhill, in person or by phone."),
  buy: draft("Buy an eGift card"),
  balance: draft("Check a card balance"),
  call: draft("Call the clinic"),
  coverage: draft("OHIP-insured care is free, so a card is only needed for services you pay for."),
  pills: [draft("Any amount"), draft("Emailed by Square"), draft("Any service you pay for")],
  useTitle: draft("Where you can use it."),
  useLead: draft("The same card works at the front desk for every service you pay for."),
  uses: [
    { div: "aesthetics", t: draft("Medical Aesthetics"), d: draft("Consults, injectables, skin treatments, laser and skin health plans.") },
    { div: "infusion", t: draft("Infusion Therapy"), d: draft("Drips, Injection Bar shots and iron infusion visits.") },
    { div: "rehab", t: draft("Rehab & Recovery"), d: draft("Physiotherapy, chiropractic, massage and kinesiology, for anything your plan does not cover.") },
    { div: "family", t: draft("Family Medicine"), d: draft("Uninsured fees, such as forms and notes, or a doctor visit without OHIP coverage.") },
  ],
  howTitle: draft("How it works."),
  how: [
    { t: draft("Choose an amount"), d: draft("On our Square page, for yourself or as a gift.") },
    { t: draft("Square emails the card"), d: draft("To you, or straight to the person you choose, with your message.") },
    { t: draft("Use it at the desk"), d: draft("Show the card when you pay, for any visit. Check the balance online any time.") },
  ],
  deskTitle: draft("Or ask at the desk"),
  bandTitle: draft("A gift for someone you care about."),
  bandSub: draft("A card works for any service you pay for, from a drip to physiotherapy."),
};
