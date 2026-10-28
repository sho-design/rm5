# Form payloads

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
