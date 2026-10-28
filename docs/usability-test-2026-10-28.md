# Usability test, 28 October 2026 (40 simulated patients)

Thirty simulated test patients, in two rounds of 10 and 20, used the production build in a real browser (Chromium via Playwright) on a phone (390x844, touch) or desktop (1440x900). Each followed a persona and three tasks, decided every step from screenshots of what was on screen, and reported friction, quotes and ratings. Forms simulated a successful send. Photos were blank (the image CDN is blocked in the test sandbox) and were not judged. The run happened about 10:50pm on a Tuesday, so the clinic showed as closed.

These are AI participants, not real patients. They are good at finding navigation, wording and flow problems; they do not replace a round with real patients, especially older and Vietnamese-speaking patients.

## Round 1: 10 testers

| Tester | Device | Goal | Ease /7 | Trust /7 | Tasks done | Done with difficulty | Failed or gave up |
|---|---|---|---|---|---|---|---|
| Lan, 68, Vietnamese first language, low vision | Phone | Register, Vietnamese staff, Saturday hours | 4 | 6 | 1 | 2 | 0 |
| Marcus, 34, back pain, no family doctor | Desktop | Pain Centre access, OHIP, book | 5 | 6 | 2 | 1 | 0 |
| Priya, 29, new mom | Phone | Baby vaccines, register mother and baby, parking | 5 | 5 | 1 | 2 | 0 |
| David, 45, car accident | Desktop | MVA cost, what to bring, start claim | 5 | 5 | 1 | 2 | 0 |
| Sarah, 52, iron | Phone | Iron cost and OHIP, bloodwork, book | 5 | 6 | 2 | 1 | 0 |
| Kevin, 40, existing patient | Phone | Renewal, turnaround, running out | 3 | 4 | 1 | 1 | 1 |
| Dr. Patel, referring physician | Desktop | How to refer, wait time, send referral | 5 | 6 | 2 | 0 | 1 |
| Jenna, 31, injectables | Phone | Price, who injects, book consult | 4 | 5 | 1 | 1 | 1 |
| Robert, 60, keyboard only | Desktop | Hours and access, FAQ, booking step 1 | 4 | 6 | 1 | 2 | 0 |
| Amira, 24, no OHIP | Phone | Cost without OHIP, sick visit, after hours | 5 | 4 | 1 | 1 | 1 |
| **Total / average** | | | **4.5** | **5.3** | **13 of 30** | **13 of 30** | **4 of 30** |

All ten said they would use the site again; Kevin, Jenna and Amira added they would phone or compare first.

## Round 2: 20 more testers (same build)

| Tester | Device | Goal | Ease /7 | Trust /7 | Done | With difficulty | Failed or gave up |
|---|---|---|---|---|---|---|---|
| Mei, 38, caregiver for father with diabetes | Desktop | Chronic care, booking on his behalf, register him | 5 | 5 | 1 | 1 | 1 |
| Tom, 16, acne and low mood | Phone | Private teen visit, acne coverage, book | 5 | 5 | 2 | 1 | 0 |
| Grace, 44, women's health | Phone | Screening at 44, perimenopause, book | 5 | 6 | 1 | 2 | 0 |
| Raj, 55, men's checkup | Desktop | Checks at 55, fasting bloodwork, annual physical | 5 | 6 | 1 | 2 | 0 |
| Nina, 30, post-ACL surgery | Phone | Post-surgical physio, direct billing, book | 6 | 5 | 2 | 1 | 0 |
| Carlos, 48, WSIB, reads English slowly | Phone | WSIB cost, what to bring, book | 5 | 5 | 1 | 2 | 0 |
| Hannah, 27, wellness drip | Phone | Compare drips, price, book | 5 | 6 | 1 | 1 | 1 |
| Paul, 58, metabolic program | Desktop | What it involves, cost, book | 5 | 4 | 1 | 1 | 1 |
| Olivia, 35, acne scars and laser | Phone | Treatments and downtime, prices, book | 4 | 6 | 1 | 2 | 0 |
| Ben, 41, gift card | Phone | Buy a gift card tonight | 3 | 5 | 0 | 2 | 1 |
| Ahmed, 50, Maple | Phone | Opening date, services, waitlist | 4 | 5 | 0 | 3 | 0 |
| Linh, 33, RN job seeker | Desktop | Part-time roles, apply | 6 | 5 | 2 | 1 | 0 |
| Sofia, 22, nursing student | Phone | Placement info, supervision, express interest | 4 | 6 | 0 | 3 | 0 |
| George, 81, cataracts | Desktop | Bigger text and contrast, Sunday hours, companion | 4 | 4 | 1 | 2 | 0 |
| Fatima, 39, records and privacy | Desktop | Records transfer, privacy, complaints | 4 | 5 | 1 | 2 | 0 |
| Jordan, 29, blind, screen reader | Desktop | Iron cost, structure audit, book | 4 | 6 | 2 | 1 | 0 |
| Emily, 45, health notes | Desktop | Headache note, flu shot, book | 6 | 5 | 2 | 1 | 0 |
| Sam, 36, colour blind, dark mode | Phone | Drip families, open status, pick a time | 5 | 5 | 2 | 1 | 0 |
| Tara, 34, slow 3G phone | Phone | Hours, book, search "cough" | 4 | 4 | 1 | 1 | 1 |
| Mike, 62, massage on benefits | Small laptop | Prices, direct billing, book massage | 5 | 5 | 1 | 2 | 0 |
| **Round 2** | | | **4.7** | **5.2** | **23 of 60** | **32 of 60** | **5 of 60** |
| **All 30 testers** | | | **4.6** | **5.2** | **36 of 90** | **45 of 90** | **9 of 90** |

29 of 30 would use the site again. Ben would not, for gift cards.

A consent check was run separately because two testers saw a blocked Google Tag Manager request in the shared sandbox log: with "No thanks" chosen, the site made no Google requests on desktop or phone across several pages. The request came from another tester who had allowed analytics.

## Findings across all 30 testers, most widespread first

"Code" means fixable in the site. "Clinic" needs facts, prices or wording from the clinic.

1. **Search misses obvious words** (18 testers, major, code). Zero results for botox, acne, Vietnamese, pap test, menopause, diabetes, cough, sick, fever, emergency, after hours, refill, pharmacy, records, student, microneedling, Sun Life, wheelchair, daughter, occipital, wait time. Search matches labels as one phrase and ignores FAQ answers, topic text and note bodies. Health note results open the notes list, the "Teaching clinic" result opens the top of About, and the "Pricing" shortcut goes to infusion pricing only. Fix: index FAQ questions and answers, topic and page text, note titles and condition and treatment synonyms; match each word; link results to the exact page or anchor; route emergency words to the 911 and Health811 note; "1 result"; stack results on phones.
2. **Open or closed contradicts itself** (20 testers, major for trust, code). The utility bar said "closed, opens tomorrow at 9am" while the mobile menu card said "Open today", the footer card a green "Open" and the clinics page intro "Thornhill is open now". Part of this may come from parts of the site using the visitor's clock (the test browsers ran on UTC); the static badges and the clinics intro are wrong regardless. Fix: one live status in Toronto time used everywhere; the status bar links to hours and fits on a phone.
3. **Booking forgets context and never says what was booked** (17 testers, major, code). Iron, aesthetics, WSIB and annual-physical links and the sticky "Book an appointment" bar open booking on Family Medicine or with only a division chosen; there is no visit type (physio or massage, consult, physical, iron assessment, flu shot), no claim number field for MVA or WSIB, and no insurer field. The confirmation omits the service and coverage, and its "Bring" list is always health card, medications and results (wrong for WSIB, MVA, uninsured, drips and rehab; no fasting reminder for morning bloodwork; "arrive early for your first visit" shown to existing patients). Fix: carry service and visit type from every link (including the sticky bar on a service page), add a second choice per division, claim and insurer fields for rehab, and a confirmation that repeats service, coverage and a service-specific "Bring" list.
4. **The result of a step appears off screen** (15 testers, major, code). After sending registration, a renewal, a job application or a Maple waitlist, and after "Continue" in booking, the page stays scrolled down; people thought nothing happened and two sent forms twice. Focus drops to the page body, so screen readers announce nothing. Fix: scroll to and focus the new step heading or the confirmation.
5. **Prices and facts people came for are missing** (12 testers, major, clinic). Injectable price or range, uninsured visit fee ("posted rates" are not posted), drip and membership prices (the infusion pricing page is titled "Clear costs, no surprises" but has no numbers), metabolic program contents and cost, laser details, massage and chiro price per session length, direct-billed insurers (Sun Life, Manulife), records transfer fee and address, gift card amounts and how to buy, Maple opening month, flu shot availability now, job hours and pay.
6. **Links that go to the wrong place** (9 testers, major, code). Home "Renew a prescription" tile and the Family Medicine chooser (to booking instead of the renewal form), Pain Centre "No family doctor?" (to registration), "MVA claim intake" (back to the MVA page), "Send a referral" (top of For Physicians, not the form), Aesthetics "Compare all ›" (to booking), health note "Book an appointment" (to the Family Medicine overview), the Maple menu card (opens the Thornhill tab), WSIB "Start a WSIB claim" for people who already have one.
7. **"Confirm booking" books without a review, and consent is bundled** (9 testers, minor to major, code). The step bar promises a Confirm step that is the success screen. One checkbox covers both reminders and marketing on booking and contact, yet the confirmation promises reminders when it was left unticked (a privacy worry for a teen on a family phone). Fix: a short review panel; separate reminder and marketing checkboxes; confirmation text that matches the choice.
8. **Sticky "Book an appointment" bar covers content** (7 testers, minor, code). It overlaps in-page buttons, the last FAQ rows, form buttons and, at large text, the hours.
9. **Phone menu hides the "More" links** (4 testers, major, code). The mobile menu shows only the first six Explore links per section, so Gift cards, Pricing, Careers, WSIB, Patient forms, Prescription renewals and similar pages are unreachable from the phone menu. The About mega menu column heading reads "Book About" (3 testers).
10. **Accessibility** (6 testers, major, code).
    - Cookie banner focuses "Allow analytics" first and Escape does not decline.
    - Mega menus open on focus, ignore Escape and put their links after Search and Book in the tab order.
    - The home h1 changes as the carousel rotates.
    - Booking choices are one Tab stop each with no arrow keys (a wrong service was booked by accident).
    - Booking errors are only browser pop-ups.
    - Repeated "Learn more" and "Book" link names.
    - Input focus rings are 1px.
    - FAQ focus can sit off screen.
    - Text size A+ leaves the status bar, footer and hours table small.
    - High contrast is not remembered after a reload.
    - Contrast labels at 60% opacity on navy.
    - Dark mode on the phone is ignored.
    - Closed days in booking are shown only by fading.
11. **Registration cannot add family members** (3 testers, major, code). "My children", "My partner" and "My parents" add no fields; the form also has no "filling this in for someone else" option and no Thornhill or Maple choice.
12. **Slow phones** (1 tester, high impact, code). On slow 3G with a slow CPU, text typed into booking before the page finished loading was erased, buttons did nothing for about 14 seconds, and fonts were about 765 KB of uncompressed TTF (about 70% of each first page load). Fix: compressed, subset WOFF2 fonts; keep typed values through hydration.
13. **Booking time bugs** (2 testers, major, code). Late at night the picker still offered today's slots that had already passed, and the date strip follows the visitor's time zone instead of Toronto time.
14. **Content to correct or add** (clinic copy).
    - **Cervical screening.** The site says "Pap test every 3 years, 25 to 69"; Ontario moved to HPV testing in 2025 and the interval changed, so a physician must review this wording.
    - **Intervals.** Men's health and Know your numbers give different A1c intervals.
    - **Second clinic name.** "Woodbridge" versus Maple and Vaughan (4 testers).
    - **Clinic info.** Pain Centre wait time on the referral page; occipital nerve block named.
    - **Patient FAQs to add.** What to do if you run out of medication; an after-hours FAQ; a teen confidentiality answer; booking for a family member; "booking versus registering"; patients rostered elsewhere.
    - **Privacy and complaints.** A visible complaints process; cookies and analytics in the privacy policy.
    - **Content gaps.** Nursing learners on the standards page; ingredients for 11 drips; the Maple services note on aesthetics.

## Fixes made after the test (code)

Checked in a production build with Playwright on desktop (1440x900) and phone (iPhone 13), visitor clock set to UTC.

| # | Finding | Status |
|---|---|---|
| 1 | Search misses obvious words | Fixed. Every word matched in any order, light stemming, synonyms for the words testers typed, FAQ answers, topic text, notes, team, jobs and fees indexed (static `/search-index.json`, read through the CMS layer). Results are links to the exact page or note; FAQ results open the question. Emergency words pin the 911 and Health811 note. "1 result". Results stack on phones; "Close" instead of "Esc" on touch. |
| 2 | Open or closed contradicts itself | Fixed. One live Toronto-time status (`useOpenStatus`) drives the utility bar, phone menu, footer, contact and referral pages. The status bar links to hours and shortens on phones. The clinics intro no longer says "open now". |
| 3 | Booking forgets context | Fixed. Every booking link passes service and visit type (`bookFor(service, visit)`); booking adds "What is the visit for?", someone-else booking, MVA and WSIB claim fields, insurer for direct billing. Confirmation repeats service, visit, coverage and a visit-specific "Bring" list (fasting line only for early bloodwork, "arrive early" only for new patients). |
| 4 | Result of a step off screen | Fixed. Booking steps and every form confirmation scroll into view and take focus. |
| 5 | Prices and facts missing | Clinic. Not changed in code. |
| 6 | Links to the wrong place | Fixed. Home renewal tile and Family chooser go to the renewal form; "No family doctor?" books a family assessment; MVA and WSIB intake book those visits; "Send a referral" opens the referral form; "Compare all" only where a comparison page exists; health note cards book the matching visit; Maple cards open the Maple tab; "Book a WSIB visit" replaces "Start a WSIB claim". Chooser results now each have their own destination (they all went to booking before, including "Register as a patient"). |
| 7 | No review step, bundled consent | Fixed. Details, Time, Review, then confirmed; only "Confirm booking" sends. Reminders and clinic updates are separate checkboxes on booking, registration and contact; the confirmation only promises a reminder when asked for. |
| 8 | Sticky bar covers content | Fixed. It books the service of the page you are on, steps aside while typing and when the footer is in view, and is hidden on form pages. |
| 9 | Phone menu hides links, "Book About" | Fixed. Phone menu lists every Explore, Book and More link. About column reads "Get in touch". |
| 10 | Accessibility | Fixed: cookie banner never takes focus on load, is first in tab order, Escape declines; mega menus no longer open on focus, have a toggle after each link, sit next to it in tab order and close with Escape; the home h1 is stable; radio groups use arrow keys with one Tab stop; inline form errors (no browser pop-ups) linked to fields; "Book" and "Learn more" links name their service; 3px input focus ring; FAQ rows stay in view; text size scales the whole page (status bar, footer, hours) and is also in the utility bar and phone menu; high contrast persists and makes faded labels solid; closed days say "Closed". Not done: automatic dark mode (see below). |
| 11 | Registration family members | Fixed. Partner, children (up to 6) and parents (up to 2) get name, date of birth and health card fields; "Someone I care for" asks for the helper's details; Thornhill or Maple choice. |
| 12 | Slow phones | Fixed. Fonts are WOFF2 subsets (about 170 KB instead of about 1.1 MB). Text typed before the page finishes loading is kept (checked with delayed scripts). |
| 13 | Booking time bugs | Fixed. Dates follow Toronto time, today is offered only with slots at least an hour away, and the date sent is the Toronto date. |
| 14 | Content to correct | Clinic. Not changed in code. |

**Dark mode is not switched on.** The dark theme in the design tokens is not finished across the site (several buttons and chips render white on white, the logo disappears), so following the phone's dark setting would make pages unreadable. It needs a design pass before it can follow the system setting.

## Round 3: 10 testers on the fixed build

Same method, run on the build with the round 1 and 2 fixes, at about 1:30am Toronto time. Several personas retried journeys that had failed before (keyboard only, screen reader, slow phone, large text, caregiver booking, family registration).

| Tester | Device | Goal | Ease /7 | Trust /7 | Done | With difficulty | Failed |
|---|---|---|---|---|---|---|---|
| Lan, 67, prefers Vietnamese, large text | Phone | Vietnamese speaker, Sunday hours, weekend visit | 5 | 6 | 2 | 1 | 0 |
| Derek, 45, car accident | Phone | MVA cost, book with claim, what to bring | 6 | 5 | 3 | 0 | 0 |
| Anjali, 34, family of four | Desktop | New patients, register all four, next steps | 6 | 6 | 2 | 1 | 0 |
| Marcus, 52, keyboard only | Desktop | Menu to chiro, book with benefits, search access | 5 | 6 | 1 | 2 | 0 |
| Rosa, 29, back pain, no family doctor | Phone | OHIP pain care, first step, wait time | 6 | 6 | 2 | 1 | 0 |
| Kevin, 38, renewal at 1:30am | Phone | Renewal, what if it is late, hours | 5 | 5 | 2 | 0 | 1 |
| Helen, 74, low vision | Desktop | Large text and contrast, iron cost, book | 4 | 6 | 1 | 2 | 0 |
| Jamal, 26, blind, screen reader | Desktop | Landmarks, search flu shot, book with an error | 6 | 6 | 3 | 0 | 0 |
| Sophie, 41, booking for her mother | Tablet | Fasting checkup for mother, fasting, A1c | 6 | 6 | 1 | 2 | 0 |
| Tyler, 31, slow 3G | Phone | Massage price and Sun Life, book, search | 3 | 4 | 0 | 3 | 0 |
| **Round 3** | | | **5.2** | **5.6** | **17 of 30** | **12 of 30** | **1 of 30** |

Compared with rounds 1 and 2 (30 testers): ease 4.6 to 5.2, trust 5.2 to 5.6, tasks done smoothly 40% to 57%, failed 10% to 3%. All 10 would use the site again.

What held up: booking opened with the right service and visit every time; the review step; inline errors that move focus to the field; focus moving to each new step; the status bar; menus and radio groups by keyboard; caregiver booking; family registration; typed text surviving a slow load; large text and contrast remembered.

### Round 3 findings fixed in code

- **Blocker (slow phone):** pressing Continue before the page finished loading did a plain browser submit, wiping the form and putting name, contact and health notes in the address bar. Site forms can no longer submit natively (`method="post"` and a submit guard in the head script), so nothing reaches the URL and typed text stays.
- **Large text on desktop:** the header ran off screen and the page scrolled sideways; Continue then slid the page 260px. At larger text the header now switches to the menu button below 1440px (1600px at the largest step), and the page can never scroll sideways.
- **Focus:** after choosing a page from the menu, focus now starts at the main content; Escape in search returns to the Search button; declining cookies moves to "Skip to content"; the skip link now moves focus.
- **Search:** "wheelchair", "wait time", "run out", "shoulder" now find the accessibility, wait time, renewal and physio or massage answers; FAQ answers rank higher; the result count is announced once typing pauses; the close button reads "Close search". Search and the phone menu load only when opened (home page JavaScript 139 KB to 128 KB).
- **Booking:** the step title stays in view on each step; "Review your booking" sits right under the times (waitlist below it) and can be reached with Tab before a time is chosen; closed days are announced; the review shows your note and preferred language and no longer repeats coverage as "Paying by"; claim dates read "Oct 21, 2026"; caregiver lines read "Thu Tran. You are their daughter."; morning checkups show the fasting line as "If your doctor asked for fasting bloodwork"; a preferred language choice (English or Tiếng Việt) was added; the date strip has room for "Today" and "Closed" at large text; confirmation details are a list for screen readers.
- **Registration:** the confirmation lists everyone registered and the clinic chosen.
- **Sticky Book bar:** steps aside while a form or another booking button is on screen and has an outline so it shows on navy.
- **Other:** cookie banner not shown on booking and form pages (analytics never runs there); "Coming soon" instead of "Opening 2026" in the phone menu; text size controls labelled and at the top of the phone menu; "Request a prescription renewal" in the Family Medicine menu; long card buttons wrap; phone numbers never split across lines; high contrast uses the darker blue for action buttons; landmarks for the status bar and teaching partners; duplicate photo links hidden from keyboard and screen readers.

### Round 3 findings for the clinic

- **Running out of medication** (Kevin, failed): the renewal page says "allow two business days" with no plan B. Say what to do if you will run out sooner (call at opening, ask your pharmacist about an emergency supply) and whether the form can be marked urgent. The hint "Do not include anything you need today" confused him.
- **Car accidents** (Derek): "No upfront cost" reads as "a bill later". Say plainly whether patients ever pay and what happens if the insurer declines. The MVA bring list could add photo ID and the auto policy card.
- **Language** (Lan): the FAQ promises a Tiếng Việt switch that is hidden; the team page should say who speaks Vietnamese.
- **Sun Life and other insurers** (Tyler): name the plans billed directly; give massage prices by session length.
- **Diabetes and fasting** (Sophie): add advice on diabetes medication when fasting; reconcile "bloodwork the week before" (chronic care) with "requisition at the visit"; A1c "every 3 months" chip versus "three to six months" text.
- **Pain Centre wait time** (Rosa): show it on the Pain Centre page, say when the count starts after an internal referral, and the FAQ's "Refer a patient" link is a doctors' link in a patient answer.
- **Registration** (Anjali): say Maple is in Vaughan; whether first visits happen at Thornhill until Maple opens; one first visit per person; why the health card is optional for family members; "New patients" versus "Join the roster".
- **Sky blue buttons** (Helen): white on the brand sky blue is about 4:1, below the 4.5:1 AA level for normal text. A design decision for the token owner; the high contrast theme now uses the darker blue.

### Not fixed

- On a slow phone the booking form briefly shows Family Medicine before switching to the linked service (the page is static; the service is read from the link once scripts load).
- Buttons are inert until scripts load (about 10 seconds on the throttled test phone). Less JavaScript now, but a full fix needs a deeper performance pass.
- A blank strip briefly above the sticky header while scrolling (3 testers) was not reproduced; it may be screenshots taken mid-scroll.

## What worked

- Coverage answers: Pain Centre framing (referral, OHIP, no family doctor route) and the MVA "$0" chooser were understood at once.
- Iron therapy price transparency ("$1,650 for the course, HST included, assessment and bloodwork $0") built trust.
- Booking is fast once on it; Saturday slots, a clear confirmation with address, parking and calendar.
- Tone: plain, low-pressure, no outcome promises. Consent banner easy to decline. Emergency note calm and visible.
- Keyboard: skip link visible and reliable, no keyboard traps, booking step 1 fully operable.
- Screen reader basics: one h1 per page, sensible heading order, every field labelled, meaningful alt text.
- Colour: selected states and drip families never rely on colour alone.
- Page-level answers people praised: "Know your numbers", the WSIB "Cost to you: None" card, the post-surgical rehab card, the chronic care condition picker, the women's health screening planner, the honest menu.
- Careers: filters and "Apply for this role" with the role filled in (6 of 7 ease).

## Test material

Per-tester screenshots and step scripts were kept in the test session's scratchpad (not in the repo). Round 1 findings that were already listed above the round 2 table are folded into the combined list.
