# Patient handouts

Printed and PDF sheets patients take home: care instructions before and after a treatment, medication schedules, and plain-language topic sheets (a vaccine, a screening test). They use the website's look on paper, so a patient who reads one and then visits restorationmedical.ca sees the same clinic. Every handout is one US Letter page, portrait.

There are two templates. Pick by what the patient needs to do.

| Template | Use it for | Examples |
|---|---|---|
| Care sheet | Steps the patient follows, in order, around a treatment or a medicine | PicoSure Pro pre and post care; Two creams, two different jobs |
| Topic sheet | Explaining one test, vaccine or condition, and when to book | The HPV vaccine; Cervical screening; Breast screening |

## Page

- US Letter, 8.5 by 11 inches, portrait. Margins 0.5 inch (48px at 96dpi). Design at 816 by 1056px.
- One page. If it runs over, cut copy; never shrink type below the sizes here and never add a second page.
- Print in colour on white uncoated stock. The tints stay pale enough to read in a black-and-white copy, and no meaning depends on colour alone (steps are numbered, warnings are titled).
- Build in HTML with the system's tokens and export to PDF; keep the source next to the PDF.

## Anatomy, top to bottom

1. **Header row.** The logo lockup left (RM tile and the name in Fraunces), with the service line under the name in 11px (`text-muted`): "Medical Aesthetics, Thornhill". On the right, one pill in the sheet's tint with a 11px semibold line that says what the sheet is for: "Please read before your treatment and keep for the series", or the topic path "Women's health, Vaccines, The HPV vaccine".
2. **Hero.** A tinted block, `radius-card`, the full width.
   - Care sheet: eyebrow ("Pre and post care", "Medication instructions") and a Fraunces headline on the left; a 13px lead paragraph on the right that says what the treatment or medicine is and how many sessions or doses.
   - Topic sheet: the tinted block takes the left half with eyebrow, a Fraunces title ending in a full stop ("The HPV vaccine."), a short paragraph and three white fact tiles (a Fraunces figure over a 10px label: "Grade 7, free school program in Ontario", "25 to 69, screening ages", "OHIP, covered"). A photo fills the right half at the same height, `radius-card`.
3. **Two cards side by side.** White, 1px `border-default`, `radius-card`.
   - Care sheet: "Before your treatment" and "After your treatment", each titled with a navy numbered disc (1, 2), or one card per medicine with an eyebrow in its colour ("Before treatment" in terracotta, "After treatment" in sage).
   - Topic sheet: "What it is" (prose) and "When and how often" (bullets).
4. **What to expect.**
   - Care sheet: a `surface-card` panel with bullets, ending in a white callout box for the one thing not to do ("Do not pick, scratch, peel or remove any crusting or flaking.").
   - Topic sheet: a navy band with three step tiles, each with a sage numbered disc: screen, the visit, results.
5. **The important panel.** One sunshine (`rm-sun-tint`) panel per sheet for what must not be missed: "Sun and heat protection" with a small "Very important" label, "Only 4 applications.", or "Book a visit sooner if". Bullets with amber dots.
6. **Contact.**
   - Care sheet: a navy band: a Fraunces lead ("Call us if you have", "Bring to every visit"), one or two lines of 12px white text, and the phone number in a white pill.
   - Topic sheet: a white card beside the sunshine panel: "Ask our Family Medicine team", the phone number in Fraunces, "Book online or by phone. Bring your health card.", and a QR code to the matching web page with the page address under it.
7. **Footer.** Above a hairline, 9 to 10px `text-muted`. Left: the clinic block. Right: the guidance line and the document code.

## Schedules and steps (care sheets)

- **Schedule tiles:** a row of three small tiles that show how the routine changes over time ("Week 1, Every 3rd night", "If tolerated, Every other night", "Before laser, Stop 5 days prior"). Tiles use the sheet's tint; the stop or deadline tile is sunshine.
- **Numbered application rows:** one row per dose, number in a navy disc, the moment in bold on the left, the action on the right ("Same evening, Thin layer at home"). The dose given in clinic is the first row, tinted sage with a sage disc.
- End a medicine card with a callout: a `surface-card` box for when to restart, or a sunshine box for a hard limit ("Only 4 applications. Clobetasol is a strong steroid meant for a single day of recovery, not for ongoing use.").

## Type on paper

| Role | Style |
|---|---|
| Hero headline | Fraunces 500, 34 to 40px, leading 1.02, -0.025em |
| Card title | Fraunces 500, 20px |
| Fact tile figure | Fraunces 500, 18px |
| Eyebrow, pill label | Instrument Sans 600, 11px, sentence case |
| Body and bullets | Instrument Sans 400, 12 to 13px, leading 1.45 |
| Bold lead-in in a bullet | Instrument Sans 600, same size ("Hydroquinone cream. A thin layer…") |
| Footer | Instrument Sans 400, 9 to 10px |

Nothing on a handout is smaller than 9px, and only the footer goes below 11px.

## Colour on paper

- Ink is `rm-ink` on white. Navy bands are `rm-ink` with white text and a white phone pill.
- One tint per sheet, set by the service line, exactly as on the website. It colours the hero, the header pill and the schedule tiles; bullet dots and eyebrows use the matching text colour.

| Service line | Tint | Text and dots |
|---|---|---|
| Family Medicine (vaccines, screening, women's health, children) | `div-family` (`rm-sky-soft`) | `rm-sky-text` |
| Pain Centre | `div-pain` (`rm-terracotta-tint`) | `rm-terracotta-text` |
| Infusion Therapy | `div-infusion` (`rm-sage-tint`) | `rm-sage-text` |
| Medical Aesthetics | `div-aesthetics` (`rm-lilac-tint`) | `rm-lilac-text` |
| Rehab & Recovery | `div-rehab` (`rm-sun-tint`) | `rm-amber-text` |

- Never pick the tint by topic: the HPV vaccine and cervical screening sheets are both Family Medicine, so both are sky. A PicoSure Pro sheet is Medical Aesthetics, so it is lilac.
- Sunshine (`rm-sun-tint`, amber dots) is only for the one panel that must not be missed.
- On medication sheets, sage marks the "after" side and the steps done in clinic, and the "before" eyebrow takes the sheet's own service colour. These are status colours inside the sheet, not a second service colour. Never use colour as the only signal: every step has a number and every warning a title.

## Words

The website's copy rules apply to every handout, with these additions.

- Lead with what the patient does, in the order they do it. One instruction per bullet.
- Give numbers as numbers: "every 3rd night", "2 to 4 weeks", "SPF 30 to 50+", "4 applications".
- Name the medicine and the product category, not a promise. "Hydroquinone cream. A thin layer on the targeted areas as directed." Never say what a treatment or drip will do for the skin or the body.
- Tell people what is normal before you tell them what is not: "What to expect" comes before "Call us if".
- "Call us if" lists specific signs and a time: "Increasing redness, swelling or pain after 48 hours. Blistering. Any signs of infection."
- No middots. Separate with commas: "Medical Aesthetics, Thornhill", "905-709-3222, fax 905-761-7306".
- Write "General guidance; your provider's specific instructions take precedence." on care sheets, and "General information based on Ontario and Canadian guidance as of <month year>. Your clinician will tailor advice to you." on topic sheets.

## Footer and document control

- Left, every sheet: "Restoration Medical, 700 Centre St (inside Walmart), Thornhill, ON L4J 0A7", the phone, fax and email, and restorationmedical.ca.
- Topic sheets add the hours (Mon, Wed, Thu 9am to 4pm. Tue 3pm to 9pm. Sat 8am to 4pm, Sun 8am to 2pm. Fri closed.), "Emergency: 911. After hours: Health811." and, on women's health sheets, "Women's health day: the last Sunday of every month, 8am to 2pm, with our nurses."
- Right: the document code and version. Codes read `RM-<service>-PTE-<number>`: AES for Medical Aesthetics, FAM for Family Medicine (RM-AES-PTE-001, RM-FAM-PTE-101). Add "version 1.0, November 2026", the approval record (RM-INF-MOD-004) and, for a companion sheet, "Companion to RM-AES-PTE-001".
- Change a sheet only through the clinic's approval process, and raise the version on every change.

## Logo

Every sheet uses the same lockup: the white-on-navy RM monogram tile (`rm-mark-white-on-blue.png`) at 26px with 7px corners, beside "Restoration Medical" in Fraunces 500, 15 to 16px, -0.02em, in `rm-logo-navy`. Care sheets add the service line under the name in Instrument Sans ("Medical Aesthetics, Thornhill"). Never redraw the monogram.

## Check before printing

1. One page, Letter portrait, nothing below 9px.
2. One tint for the sheet, one sunshine panel, navy only for the contact or expect band.
3. Steps numbered, warnings titled, nothing told by colour alone.
4. No outcome claims, no middots, no em dashes, sentence case throughout.
5. Phone number, guidance line, document code and version present.
6. QR code (topic sheets) scanned and landing on the right page.
