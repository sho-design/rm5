# Form payloads

## Ocean for OSCAR Pro (preferred)

The clinic's EMR is OSCAR Pro, and Ocean (OceanMD) books into its schedule and files forms to the chart. When an Ocean link is set, that step of the site opens Ocean, so names, health card numbers, dates of birth, medications and notes are entered there and never pass through this site:

| Variable | What it replaces |
|---|---|
| `NEXT_PUBLIC_OCEAN_BOOKING_URL` | The details, time and review steps of `/book`, for every visit |
| `NEXT_PUBLIC_OCEAN_BOOKING_LINKS` | The same, per service or `service:visit`, as JSON. The most specific link wins, then the service, then the single URL |
| `NEXT_PUBLIC_OCEAN_REGISTER_URL` | The `/register` form |
| `NEXT_PUBLIC_OCEAN_RENEWAL_URL` | The prescription renewal form |

What stays on the site for booking: choosing the service and visit, the emergency box and a last "dial 911 instead" line, coverage and what to bring. Nothing is added to the Ocean link (no reason, no name). Contact, careers, referrals and the Maple list keep the site's own forms below, which carry little or no health information. Any link left unset falls back to the site's form and its `FORM_ENDPOINT_*`.

These are build-time variables: redeploy after changing them. Visit keys for `service:visit` are in `src/content/booking-visits.ts` (for example `family:pap`, `family:newpatient`, `rehab:wsib`, `infusion:iron`).


Each form posts JSON to `/api/<kind>`, which forwards `{ kind, submittedAt, data }` to the `FORM_ENDPOINT_<KIND>` destination and stores nothing. Below is the shape of `data`, for whoever connects the destination systems. Fields not listed are unchanged from the original build.

## book

| Field | Value |
|---|---|
| `division` | Service label, for example "Rehab & Recovery" |
| `service` | Service key: `family`, `pain`, `infusion`, `aesthetics`, `rehab` |
| `visit`, `visitKey` | Visit type label and key, for example "Workplace injury (WSIB)" and `wsib` |
| `forSomeoneElse` | `true` when a caregiver books for someone |
| `patient` | `{ first, last, relationship }` when booking for someone else, else `null` |
| `who` | "New patient" or "Existing patient" |
| `language` | Preferred language: "English" or "Tiếng Việt" |
| `healthCard` | "Ontario health card", "From another province" or "No health card" |
| `reason` | Why they are coming, carried from the page they booked from (for example "Perimenopause and menopause"), or `null` |
| `day`, `slot` | Toronto calendar date `YYYY-MM-DD` and time, for example "9:30 am" |
| `name`, `phone`, `email`, `healthCardLast4`, `notes` | Contact details (the booker's when booking for someone else) |
| `claim` | MVA or WSIB: `{ type, number, insurerOrEmployer, date }`, all optional, else `null` |
| `payment`, `benefitsInsurer` | Rehab visits: "Private or work insurance" or "Paying myself", and the insurer name if given |
| `reminders` | Appointment reminders by email or text (separate from updates) |
| `updates` | Clinic updates by email (marketing). Off unless ticked |
| `waitlist` | `true` on a waitlist request |

Visit keys accepted in booking links (`/book?service=rehab&visit=physio`) are listed in `src/lib/routes.ts` (`bookFor`).

## register

- `clinic`: "Thornhill" or "Maple".
- `submittedBy`: `{ name, relationship, phone }` when someone registers on a patient's behalf, else `null`.
- `family`: `[{ relation: "Partner" | "Child" | "Parent", first, last, dob, card }]` (was a list of labels).
- `reminders` (reminders only) and `updates` (clinic updates) are separate.

## contact

- `updates` comes only from the separate "clinic updates" checkbox. Replies use the contact details given.
- `replyBy`: "Email or phone" or "Email only, please do not call".
- `topic` can also be "A concern or complaint".

## referral

- New: `phone` (optional) and `urgent` (boolean).

## renewal, careers, Maple waitlist

Same keys as before.

## Gift cards (Square eGift Cards)

Gift cards are clinic-wide: one card works for any service a patient pays for (aesthetics, drips and shots, iron infusion visits, physio, chiro, massage, kinesiology and uninsured fees). They are sold on the clinic's hosted Square eGift Card page. The buyer chooses an amount and pays on Square's checkout, and Square emails the card. No payment or personal details pass through this site.

- **Find the link:** in the Square Dashboard, go to Gift Cards, then eGift Cards, and copy the link to your eGift Card page. It looks like `https://squareup.com/gift/XXXXXXXX/order` or a `square.link` short link.
- **Where it is set:** the clinic's pages are built in as defaults in `src/lib/giftcards.ts`: `https://app.squareup.com/gift/MLDR38SA366F5/order` to buy, and `.../check-balance` to check a balance. `NEXT_PUBLIC_SQUARE_GIFT_URL` and `NEXT_PUBLIC_SQUARE_GIFT_BALANCE_URL` in Vercel override them. Only Square addresses are accepted.
- **What changes:** with the link set, `/gift-cards` (content in `src/content/giftcards.ts`) shows "Buy an eGift card" and "Check a card balance". Both open Square in a new tab, and the front desk phone and email stay on the page. Without it, the page keeps "Call the clinic" and the front desk details. The old `/medical-aesthetics/gift-cards` address redirects to `/gift-cards`. The page is linked from the footer (For patients) and the Infusion, Rehab and Aesthetics menus.
- **At the desk:** the card is redeemed on the clinic's Square point of sale, so the front desk should accept it for every paid service, not only aesthetics.
- **Optional:** the Square connector in claude.ai lets Claude look up gift card activity and settings. Selling does not need it.
