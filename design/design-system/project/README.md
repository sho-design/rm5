The system behind restorationmedical.ca: a physician-led, multi-service clinic in Thornhill, Ontario, with a second location opening in Maple. Five service lines share one standard of care: Family Medicine, Pain Centre, Infusion Therapy, Medical Aesthetics, and Rehab & Recovery. Use this system for web pages, booking flows, emails and on-screen material that sits beside the website. Sign-off: "Refined by Medicine."

The look in one line: navy ink on white paper, large Fraunces headlines, rounded blocks, one pale tint per service line, and sunshine yellow saved for the closing call to action.

## Content fundamentals

Copy on the site is compliance-reviewed under the clinic's communications handbook (RM-HB-COMMS). Change clinic wording only with clinic approval.

- Write plain, warm and unhurried. Short sentences. Speak to "you" as "we".
- Use sentence case everywhere, including buttons, eyebrows and tags. Never all caps, never tracked capitals.
- No exclamation marks, no emoji, no em dashes, no middots. Use commas, full stops or "and".
- Write ranges as "8am to 4pm", "4 to 8 weeks", "Unit 105 to 107".
- State facts the clinic can stand behind: "A physician is on site", "HST included". Never outcomes, immunity or weight-loss claims, superlatives ("best") or urgency ("limited spots"). No testimonials, ratings or before-and-after pictures.
- Write money as "$250", "HST included" (infusions), "plus HST" (aesthetics and skincare) or "no HST" (physio and chiro, which are HST-exempt). Say "OHIP-insured", or "uninsured fee, receipt provided".
- Write calls to action as a verb plus an object: "Book an iron assessment", "Register your family", "Refer a patient". End text links in " ›": "Read about iron therapy ›".
- Write headlines as plain statements or questions: "Start with the spot.", "Bring a book. We handle the rest.", "Not sure where to start?"
- Pain Centre: physician-led, OHIP-covered with a physician referral. Never write "self-referral". Chronic care belongs to Family Medicine; the Pain Centre is procedures for pain.
- Drips are mixed at the appointment, after screening. Never say a drip is premixed or "Health Canada approved".
- Vietnamese is a first-class language, shown as "Tiếng Việt". Both physicians speak Vietnamese.
- The only glyphs are ✓ + › ‹ × ☰ ⌕.

| Write | Not |
|---|---|
| "A nurse stays with you the whole time." | "The safest infusion clinic in Thornhill." |
| "Your own iron, $250 per visit, HST included." | "Limited spots. Book now." |
| "Book a doctor visit" | "BOOK NOW" |
| "Ingredients are confirmed with you at your consult." | "Boosts your immunity." |

### Clinic facts used across the site

Thornhill: 700 Centre St (inside Walmart), Thornhill, ON L4J 0A7. Phone 905-709-3222, fax 905-761-7306, contact@restorationmedical.ca, referrals@restorationmedical.ca. Hours: Mon, Wed and Thu 9am to 4pm; Tue 3pm to 9pm; Sat 8am to 4pm; Sun 8am to 2pm; Fri closed. Maple: 2620 Rutherford Rd, Unit 105 to 107, L4K 0H1, coming soon (no opening month yet). Physicians: Dr. Johnny Nguyen (Medical Director) and Dr. Joseph Truong. Appointments are 20-minute slots. Do not invent other numbers.

## Visual foundations

### Colour

- Set text in `text-primary` on `bg-page`. Use `text-secondary` for leads and card body, `text-muted` for eyebrows, meta and helpers.
- Fill default cards with `surface-card` and edge them with a 1px `border-default`. Use `surface-raised` for things that float: result cards, modals.
- Use `surface-inverse` (navy) for the utility bar, path-step blocks and the footer, with `text-on-inverse` on it. Sunshine eyebrows (`rm-sun`) read well on navy.
- Close every page with one `surface-accent` band, text in `text-on-accent`.
- Give each service line its own pair: a pale tint for the card or hero, and a deep accent for its icons, rules and large marks. `div-family` and `div-family-accent` (sky), `div-pain` and `div-pain-accent` (terracotta), `div-infusion` and `div-infusion-accent` (sage), `div-aesthetics` and `div-aesthetics-accent` (lilac), `div-rehab` and `div-rehab-accent` (amber on sunshine). Never mix two service colours in one card.
- The brand accents are fills. For small text in an accent (eyebrows, breadcrumbs, labels) use the text versions, mixed toward ink: `rm-sky-text`, `rm-terracotta-text`, `rm-sage-text`, `rm-lilac-text`, `rm-amber-text`. Each reaches at least 4.5:1 on white and on its own tint.
- Use `text-link` for text links and `action-secondary-bg` for booking-step buttons.
- Status: `status-success-*`, `status-warning-*`, `status-error-*`, `status-info-*`. Always pair a status colour with a word or a glyph (✓, ×), never colour alone.

### Themes

Three themes, set with `data-theme` on `<html>`: light (default), `dark` (navy paper, translucent tints, white primary buttons, sunshine focus ring) and `contrast` (pure ink on white, tints removed, 2px borders, darker blue links). Every semantic token remaps, so build with semantic tokens (`text-*`, `surface-*`, `action-*`, `div-*`) and reach for the `rm-*` base palette only for fixed brand moments such as the wordmark. Text size steps up with `data-text` of `1` or `2`.

In the dark theme, pale surfaces keep their paper colours: sunshine bands, white cards and division tints that stay pale restore the light tokens inside them (set `data-theme="light"` on that element), and navy panels stay navy (`rm-ink`). Never let ink text land on navy or white text on sunshine.

### Type

- Set every heading and numeral in Fraunces 500 (`display-page` 76, `display-photo` 56, `display-section` 48, `display-sub` 32, `title-card` 24, `title-row` 22), tracking -0.025em, leading 0.96 to 1.05. One fixed scale: do not invent in-between sizes. On phones the page title drops to 40px and section heads to 32px.
- Put at most one italic phrase in a heading (`display-em`, Fraunces italic 400).
- Set everything else in Instrument Sans: `lead` 19, `text-lg` 18, `text-article` 17, `body` 16, `card-body` 15, `button` 15 semibold, `link` 14 semibold, `eyebrow` 13 semibold, `label` 13 semibold, `micro` 12. Nothing smaller than 12px.
- Use Fraunces for prices (`numeral-price`, 52px) and big benefit numerals (`numeral-lg`, 64px).
- Never Inter, never a mono label face, never all caps.

### Space and layout

- Rounded blocks sit `page-gutter` (24px) from the viewport edge; text sections use `content-gutter` (32px). On phones the gutter is 12px.
- Card grids gap `card-gap` (12px), large blocks `block-gap` (14px), sections `section-gap` (72px, or 56px tight).
- Keep intro copy within `content-max` (820px) and articles within `prose-max` (720px).
- Grids are 3 or 4 equal columns, or a 1fr / 1.25fr split with a sticky left column. FAQ sections use 1fr / 1.6fr with the heading sticky.
- Every tap target is at least `hit-min` (44px). Buttons are 48px (38px small), fields 48px.

### Shape, borders and shadow

- Radii: `radius-block` 28 for heroes, photos and the footer; `radius-card` 24 for cards; `radius-tile` 18; `radius-row` 16 for option rows and the search field; `radius-field` 12 for inputs; `radius-chip` for every pill (buttons, tags, chips).
- Borders: 1px `border-default` on cards, 1.5px on interactive controls, 2px `border-strong` when selected.
- Shadow almost never. `shadow-card` only on floating result cards and the modal; `shadow-sticky` on the mobile sticky Book button.
- No gradients except `--photo-protection` over photos. No blur. White pills at .92 over photos; white at .06 to .12 for tiles on navy.

### Motion

200 to 400ms on `cubic-bezier(.2,.8,.2,1)`. Hover turns a border sky or tints a background; press scales to .98; selected chips fill ink; the FAQ plus rotates 45°. The hero advances every 5.5s. No bounces, no parallax. Honour `prefers-reduced-motion` by dropping durations to 0.

### Imagery

Editorial daylight photography of the clinic, in 28px rounded frames. Follow the staff dress code and casting rules in the Photography asset group. Never put text in an image. Crop so heads are never cut off at the top.

### Interaction patterns

- Chooser: a question, a vertical list of options and a floating result card with tags, a 2x2 fact grid and one call to action. One per division page.
- Booking: three steps (details, time, confirm) with a Stepper, 20-minute slots that respect clinic hours, and confirmation, waitlist and error outcomes as StateCards. Booking never asks for date of birth.
- Every division page and sub-page ends with a sticky-heading FAQ, then one sunshine CtaBand before the footer.

## Iconography

Use the 81 line pictograms in the Icons asset group: a 24px grid, one round-capped stroke, no fills, coloured by the surrounding text (`currentColor` on the site). Utility glyphs (✓ + › ‹ × ☰ ⌕) are typed as text. No icon font and no emoji. When a needed icon is missing, draw it to the same grid and stroke; if you must substitute a library icon (Lucide is the closest), say so.

## Logo

The logo is the RM monogram tile from the clinic's artwork beside "Restoration Medical" set in Fraunces 500 at -0.02em (clinic decision, November 2026). The name is `rm-logo-navy` on light surfaces and white on navy. Use the monogram files in the Logos asset group and never redraw them; the original full logo file (with its serif lettering) is kept for reference.

- Website: see the Wordmark card for sizes.
- Print and handouts: the white-on-navy tile at 26px with the name at 15 to 16px.

## Components

The `RM` bundle holds 26 React components from the site's design handoff, the reference the website's Tailwind components in `src/components/ui` were built from: Button, IconButton, PillNav, Stepper, Tabs, UtilityBar, Accordion, BenefitCard, Card, Chooser, CtaBand, PathSteps, PriceCard, Checkbox, Chip, Field, Input, Range, Segmented, Select, Textarea, Notice, StateCard, Tag, Table and Modal. Each reads only this system's CSS variables. One primary button per block; footer order is always Book, then Learn more.

Not carried over from the codebase: the photo-hero and sub-page hero layouts, the mega menu, mobile menu, search, footer, and the site's page-specific widgets (body map, routine builder, laser guide and similar). The Wordmark card is static HTML.

## Patient handouts

Printed care sheets and topic sheets use this same system on a US Letter page. Follow the Patient handouts section, and start from the HandoutCareSheet and HandoutTopicSheet templates.
