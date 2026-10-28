# Usability test, 28 October 2026 (90 simulated patients)

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

## Round 4: 20 testers in new areas

Same method on the round 3 build, at about 2:40am Toronto time. This round went where earlier rounds had not: aesthetics prices, pregnancy, vaccines, a referring physician, a nursing student and an RMT applying for jobs, a complaint and records request, an out-of-province student, 200% browser zoom, dark mode with colour blindness, and Maple.

| Tester | Device | Goal | Ease /7 | Trust /7 | Done | With difficulty | Failed |
|---|---|---|---|---|---|---|---|
| Minh, 45, prefers Vietnamese | Phone | Vietnamese, injectables price and risks, book | 5 | 5 | 1 | 2 | 0 |
| Grace, 52, menopause | Desktop | Menopause, cervical screening, evening visit | 6 | 5 | 2 | 1 | 0 |
| Omar, 35, migraines | Phone | Red flags, nerve blocks, referral details | 5 | 5 | 1 | 2 | 0 |
| Elena, 64, knee arthritis | Desktop | Options and OHIP, physio or injection, book | 5 | 4 | 1 | 1 | 1 |
| Chris, 27, IV drip | Phone | Energy drip, price, book | 5 | 5 | 1 | 2 | 0 |
| Patricia, 70, vaccines | Tablet | Flu shot, shingles and RSV, book | 5 | 5 | 1 | 2 | 0 |
| Dr. Daniel, referring physician | Desktop | Fax, wait times, refer online, consult notes | 6 | 6 | 2 | 1 | 0 |
| Mei Ling, 32, pregnant | Phone | Pregnancy care, become a patient, book | 5 | 5 | 2 | 1 | 0 |
| Ravi, 50, sick note | Phone | Fees, how to get the note, book | 4 | 4 | 0 | 2 | 1 |
| Jessica, 23, nursing student | Desktop | Placements, jobs and pay, apply | 6 | 6 | 2 | 1 | 0 |
| Ahmad, 39, existing WSIB claim | Phone | Switch providers, book, reports | 5 | 6 | 1 | 2 | 0 |
| Linda, 55, Botox and a gift card | Desktop | Unit price, results, gift card | 4 | 5 | 1 | 1 | 1 |
| Tom, 80, 200% zoom, hard of hearing | Desktop | Contact in writing, send message, zoom | 5 | 6 | 2 | 1 | 0 |
| Nadia, 31, complaint and records | Desktop | Complaint, records, privacy policy | 4 | 4 | 1 | 2 | 0 |
| Jake, 19, Alberta student | Phone | No OHIP cost, same day, book | 5 | 3 | 2 | 1 | 0 |
| Sara, 46, Maple | Phone | Opening, waitlist, register | 5 | 5 | 1 | 2 | 0 |
| Bilal, 42, dark mode, colour blind | Phone | Hours, shoulder care price, book massage | 6 | 6 | 3 | 0 | 0 |
| Karen, 36, son's vaccines | Phone | Vaccines at 4, register Leo, book for him | 5 | 6 | 1 | 2 | 0 |
| Victor, 57, RMT applicant | Phone | Openings and pay, apply with resume, next steps | 5 | 5 | 1 | 2 | 0 |
| Hoa, 28, iron deficiency | Phone (4G) | Referral and cost, infusion day, book | 6 | 6 | 2 | 1 | 0 |
| **Round 4** | | | **5.1** | **5.1** | **28 of 60** | **29 of 60** | **3 of 60** |

All 20 would use the site again (Linda: "maybe"). Scores sit a little below round 3 because this round asked mostly about money, policy and edge cases, where the answers are clinic content: unit prices, drip prices, fees for notes and forms, gift cards, the privacy policy, opening dates, pay. The three failures were all missing information (a unit price, a forms fee, physio versus injection advice), not broken flows. Booking itself was completed by every tester who tried it.

What held up: booking from any page opened with the right service and visit; review step; inline errors; Tiếng Việt choice; caregiver booking; family registration; WSIB and MVA claim fields; the status bar; nothing relied on colour alone; the site reflowed at 200% zoom with no sideways scrolling; same-day slots.

### Round 4 findings fixed in code

- **Coverage told people the wrong thing:** booking now asks about the health card (Ontario, another province, none) and never shows "OHIP-insured" without one (Jake, Mei Ling). A "Form or note" visit shows the uninsured fee (Ravi). Physio and assessment self-pay show "$120 assessment, $95 follow-up" instead of "from $95" (Elena). "Book a consult" on aesthetics pages books the complimentary consult, not an injectables appointment (Minh).
- **Booking says why you are coming:** new visit types for vaccines, pregnancy care and a form or note; choosers pass the option picked ("Perimenopause and menopause") into the booking, review and confirmation (Grace, Karen, Mei Ling, Ravi). Screening cards on the family page now book the matching visit (Patricia).
- **Bring lists:** no longer ask for a claim number, employer or date the person already typed (Derek, Ahmad); no Ontario card line without one; the confirmation shows the preferred language.
- **Wrong links:** "See the fee list" opened the privacy policy (Ravi); the Maple FAQ link opened Thornhill with no form (Sara); "Referral from your doctor" opened the OHIP page (Omar); "Register a child" started as "Me" (Karen); "Our clinicians" showed the whole team (Linda). All fixed. Job search results open that job.
- **Referrals:** the referral form PDF link (a 404) is hidden until the clinic supplies the file (`NEXT_PUBLIC_REFERRAL_FORM_URL`); "Upload a referral" now reads "Send a referral online"; the form has an optional phone number and an "Urgent" box (Omar, Dr. Daniel).
- **Contact:** a "How should we reply?" choice with "Email only, please do not call" (Tom), and "A concern or complaint" topic (Nadia). Phone menu has "Contact us" next to Call.
- **Registration:** links from the children's page start as "Someone I care for"; email and phone say to use your own for a child; caregiver consent wording; the confirmation offers "Book a first visit".
- **Careers:** the form says which role you are applying for, the licence field explains what to enter, and the form no longer hides under the header.
- **Search:** finds "alberta", "out of province", "no health card", "complaint" (patient rights and legal pages are now indexed), "vaccine", "shingles", "migraine" (the headache note first), "knee arthritis", "OHIP physio", "sick note", "disability form". FAQ result lines show enough of the answer to make sense ("Yes." alone did not). Short "Search the site" hint on phones.
- **Phone menu:** tapping a section name expands it (three testers expected that); "All ..." is the first link.
- **Clinics page:** #maple scrolls to Maple's details; services at Maple have no Book buttons until it opens.
- **Cookie banner:** a mouse or touch "No thanks" no longer shows the "Skip to content" pill (four testers; a side effect of a round 3 fix); reopening shows your current choice.
- **Layout:** the date strip fits seven days on a phone again; the round Back button; dark base under photo headings so white text stays readable if a photo is slow; the sticky bar steps aside for the drip price total and the clinic card.
- **Not a real issue:** the "blank strip above the header" six testers saw was reproduced only when a script jumps the page and the screenshot catches the smooth scroll mid-way; touch and mouse scrolling are not affected.

### Round 4 findings for the clinic

- **Accuracy first.** The FAQ answers "Can I ask for a female physician?" with "Yes", but both physicians listed are men (Mei Ling). Cervical screening still says "Pap test every 3 years" (Grace, again). "Thirteen drips" versus 12 listed; iron "from $250" versus "Iron (Venofer) $400" in the drip builder (Chris). "Eight commitments" heads nine cards (Nadia). Dr. Nguyen's bio says "Woodbridge"; his team photo is a placeholder.
- **Prices people came for:** neurotoxin per unit or per area (Linda, Minh); a price on each drip page and real numbers on the infusion pricing page (Chris); forms and sick note fees (Ravi); uninsured visit fee, since the FAQ says "posted rates" (Jake); records copy fee (Nadia); massage and chiro by session length (Bilal); gift card amounts, delivery and whether you can buy by phone (Linda).
- **Vaccines:** a vaccines section (flu now, shingles, RSV, children's schedule); say flu shots are in stock and free; "funded 65 to 70" at exactly 70 (Patricia).
- **Pregnancy:** a pregnancy care path and whether to register or book first when pregnant (Mei Ling).
- **Privacy and complaints:** add Google Analytics and cookies to the privacy policy; name the Privacy Officer; put the complaint timeline on Patient rights; "reviewed within ten" business days (Nadia).
- **Careers:** pay or ranges, shift times and hours, whether new graduates or RPNs are considered, how soon applicants hear back (Jessica, Victor).
- **Pain Centre:** which headache types are treated (migraine?) (Omar); wait time per service on the physician page (Dr. Daniel); physio versus injection for knee arthritis and which knee injections OHIP covers (Elena).
- **Infusion and iron:** how to send outside lab results before a visit (the site stores no patient files) (Hoa); the iron fees on the physician card.
- **Aesthetics:** risks and side effects for injectables (Minh); rename "Before & after" (there are none) (Linda).
- **Rehab and WSIB:** switching an existing WSIB claim from another provider; what the employer sees (Ahmad).
- **Maple:** an opening month or season; whether the waitlist and pre-registration are the same; where first visits happen until it opens (Sara, Anjali).
- **Writing only:** a non-phone option for same-day issues for people who cannot use the phone (Tom).
- **Dark mode:** requested again (Bilal); still needs a design pass before it can follow the phone setting.

## Round 5: 10 testers on the clinic's answers

Run on the build with the clinic's October answers (vaccines and pregnancy care pages, women's health day, out-of-province cards, new physio and chiro prices, corrected female physician answer), at about 3:35am Toronto time.

| Tester | Device | Goal | Ease /7 | Trust /7 | Done | With difficulty | Failed |
|---|---|---|---|---|---|---|---|
| Thi, 29, 9 weeks pregnant, prefers Vietnamese | Phone | Pregnancy care, vaccines in pregnancy, book in Tiếng Việt | 5 | 6 | 2 | 1 | 0 |
| Margaret, 66 | Desktop | Vaccines at 66, flu and shingles together, book | 5 | 6 | 1 | 1 | 1 |
| Priscilla, 41, wants a female clinician | Phone | Female doctor, women's health day, book it | 5 | 5 | 2 | 1 | 0 |
| Noah, 22, Quebec card | Phone | Seen with a Quebec card, book, coverage shown | 6 | 4 | 1 | 2 | 0 |
| Daniel, 45, self-pay back pain | Desktop | Physio and chiro prices, which one, book chiro | 5 | 6 | 1 | 1 | 1 |
| Fatima, 34, newborn | Phone | Baby vaccines, register baby, book her vaccines | 5 | 5 | 1 | 2 | 0 |
| Greg, 60, blind, screen reader | Desktop | Vaccines by menu, book flu shot with an error, pregnancy page | 6 | 6 | 3 | 0 | 0 |
| Lucy, 38, low vision, largest text | Phone | Settings, vaccines at 5, book for her son | 5 | 6 | 2 | 1 | 0 |
| Hassan, 52, slow 3G | Phone | Chiro price with tax, book, search "neck" | 5 | 5 | 1 | 2 | 0 |
| Emma, 30, new patient | Desktop | New patients, register, what next and anything unfinished | 5 | 5 | 2 | 1 | 0 |
| **Round 5** | | | **5.2** | **5.4** | **16 of 30** | **12 of 30** | **2 of 30** |

All 10 would use the site again. The new content worked: the physio and chiro prices matched from page to booking to confirmation; the women's health day booking offered only the right Sundays and confirmed November 29; the corrected female physician answer was called "honest" by two testers; pregnancy care and vaccines were found and booked; typed text survived a slow phone. The two failures were missing answers (physio or chiro for back pain; whether several vaccines can be given at one visit).

### Round 5 findings fixed in code

- **Register, then book:** the "Book a first visit" button added to the registration confirmation in round 4 contradicted "we call or email to book your first visit" (Emma, Fatima). Removed. Booking explains "Registered but not seen yet? Choose New patient."
- **Out-of-province cards:** booking asks which province; Quebec, which does not take part in reciprocal billing for doctor visits, gets "you pay at the visit and claim it back from RAMQ with the receipt we give you" (Noah). The confirmation no longer promises "a reminder the day before" for a visit that day.
- **Your note:** shown on the confirmation, so requests like "a female nurse, please" or "all three vaccines" are visibly received (Priscilla, Margaret, Thi).
- **Vaccines:** "Vaccines, including flu" and "Flu shot only" replace two separate choices, so one visit can cover several (Margaret); the flu card says it is publicly funded and to tell us about other vaccines due; "Book a vaccine visit" from the children's pages books for the child (Fatima); the age buttons wrap instead of running off the screen (Lucy).
- **Women's health day:** the card says plainly that both physicians are men and the nurses do the testing; the date buttons show the month and the lead no longer says "the next seven days" (Priscilla).
- **Pregnancy care and vaccines** are now in the main Family Medicine menu list, not only under "More" (Thi). The women's hero pill "EN / Tiếng Việt" read like a language switch and now says "Care in English and Tiếng Việt". Choosing Tiếng Việt in booking shows "Both physicians and several staff speak Vietnamese."
- **Prices with tax:** "$135 plus HST ($152.55 total)", "$100 plus HST ($113 total)" (Daniel, Hassan). "Initial assessment" explains it is the first physio or chiro visit.
- **Search:** "back pain" and "neck pain" also find physio and chiro; the results panel scrolls on small phones (results 6 to 8 were unreachable, Hassan); results read title, section, then summary (Greg).
- **Screen readers:** vaccine and topic cards have headings; path steps are an ordered list with headings; the booking step bar announces the current step (Greg).
- **Large text and contrast:** the booking date strip wraps; eyebrows drawn in division colours are solid in high contrast (Lucy).
- **Sticky Book bar** slides away while you scroll down and returns on scroll up (four testers said it covered what they were reading).
- **Other:** no Book buttons on About tiles (story, standards); the teaching partners link opens the teaching section; rehab "Compare all" (to the insurance page) removed; the notes box is taller and resizable.

Second pass on round 5, the smaller items:

- "How are you paying?" has no default; booking asks for a choice instead of quietly sending "insurance" (Hassan).
- The left "Your booking" summary shows only while choosing; on review and confirmation it repeated the main panel (Emma, Margaret, Daniel). Long review values such as a note read left-aligned and labels no longer wrap.
- Phone numbers in the booking call line and FAQ intros are tap-to-call links that never split across lines (Greg).
- Contact fields always have a group name for screen readers (Greg).
- Children and youth has "On this page" links (sick visits, care by age, vaccines by age, school forms, doctors), since the page is about 21 phone screens at large text (Lucy, Fatima).
- The pregnancy page no longer repeats its intro as the first FAQ (Greg).
- At the largest text size, A+ shows as selected instead of fading out (Lucy).
- The footer's live status wraps under the clinic name instead of squeezing (Lucy); "Reschedule or cancel" lines up with the buttons on phones (Priscilla, Thi).
- The cookie banner no longer sits over an open phone menu on a slow phone (Hassan).
- Search now ranks Vaccines first for "shingles" and "pneumonia", and physio and chiro first for "back pain" and "neck pain".

### Round 5 findings for the clinic

- **Physio or chiro for back pain:** a short "which one is for me" answer (Daniel, failed task).
- **Vaccines:** whether several vaccines can be given at one visit, and whether pneumonia vaccines are free at 65 and older (Margaret, failed task). The flu card now says "publicly funded"; confirm.
- **Quebec cards:** confirm the pay-and-claim-back wording; and the uninsured visit fee, since "posted rates" are not posted (Noah, Jake).
- **Women's health:** "A female nurse is present for examinations if you prefer" reads as a chaperone; say whether a nurse does the Pap test itself (Priscilla). The hero "Care for every stage, with the same doctor" sits oddly next to nurse-led testing (Emma). The teaching clinic note under booking worried Priscilla before an intimate exam; consider stating the opt-out there.
- **Team page:** "Dr. Nguyen portrait (from restorationmedical.ca)" placeholder, "Woodbridge" in his bio, no bio for Dr. Truong (Emma, Priscilla).
- **One action, four names:** "New patients", "Join the roster", "Join our roster", "Register as a patient" (Emma).
- **Massage price:** still "From $95" from the prototype; the self-pay headline shows it (Daniel).

## Rounds 6 and 7: 20 testers, run side by side

Run about 8:20am on a Wednesday (clinic closed until 9am). New areas: iron costs, aesthetics and laser prices, physician referrals, MVA and WSIB, registering two people, keyboard only, screen reader, careers, high contrast, out-of-province pregnancy, renewals, IV drips, a sick child on a phone, fees, complaints, and dark mode with reduced motion.

| Tester | Device | Goal | Ease /7 | Trust /7 | Failed |
|---|---|---|---|---|---|
| Anh, 34, Vietnamese first | iPhone 12 | Flu shots for her and her mother | 5 | 6 | Booking two people at once |
| Robert, 71, largest text | Desktop | Iron infusion cost and booking | 6 | 6 | 0 |
| Sofia, 29 | iPhone 13 | Frown lines consult | 6 | 6 | Injectables price |
| Dr. Patel, family physician | Desktop | Urgent Pain Centre referral | 5 | 5 | 0 |
| Kevin, 40 | Pixel 7 | Car accident rehab | 6 | 5 | 0 |
| Jasmine, 26 | Galaxy S9+ | Register herself and partner, Maple | 5 | 6 | 0 |
| Paul, 58, keyboard only | Desktop | Fasting bloodwork, cookie settings | 6 | 6 | 0 |
| Linh, 45, RN | iPad | Weekend nursing job | 5 | 5 | 0 |
| Mark, 63, high contrast | Desktop | Directions, Sunday hours, women's day for his wife | 6 | 6 | 0 |
| Chloe, 31, Alberta card | iPhone 14 Pro Max | Pregnancy care, contact, booking | 6 | 5 | 0 |
| Tuan, 64 | iPhone SE | Knee injection without a referral | 6 | 6 | 0 |
| Helen, 77 | Desktop 1024 | Prescription renewal | 5 | 5 | What to do if pills run out |
| Marco, 35 | Pixel 5 | Saturday IV drip | 5 | 5 | 0 |
| Aisha, 38, one thumb | Galaxy S8 | Sick child today, school note fee | 5 | 6 | 0 |
| Bev, 55 | Desktop 1920 | Form fees, driver's medical | 5 | 3 | Fees list, form and driver's fees |
| Jordan, 30, screen reader | Desktop | Physio with benefits | 6 | 6 | 0 |
| Quynh, 24 | iPhone 15 | Laser hair removal | 5 | 5 | Laser hair removal, laser price |
| Sam, 46 | Moto G4 | WSIB back injury | 5 | 6 | 0 |
| Rita, 59 | iPad Mini | Complaint, cancel, privacy | 4 | 5 | How to cancel |
| Dev, 33, dark mode | Pixel 7 | Chest pain search, register, Tuesday evening | 6 | 6 | 0 |

Average ease 5.4, trust 5.5 (round 5: 5.2 and 5.4). All 20 finished the main booking or form and would use the site again. Every failed task was missing clinic information, not a broken flow.

### Rounds 6 and 7 findings fixed in code

- Long buttons wrap on narrow phones instead of running off the card ("Book a family medicine assessm", Tuan, iPhone SE). Applies to every Button.
- The header no longer pushes Search, the phone pill and Book off screen between 1024 and 1280px (Rita, iPad landscape): the phone menu is used below 1280px, and the phone pill steps aside until 1380px.
- "Join the Maple waitlist" on the home page and footer opens the Maple tab and its form, not Thornhill (Jasmine).
- Booking:
  - Arrow keys skip closed days, and the new times are announced when the day changes (Jordan).
  - The review names the province ("From another province: Alberta") and shows the phone as 416-555-0142 (Chloe, Paul, Bev).
  - After a morning fasting draw the confirmation gives the fasting instructions instead of "Book a slot before 10am" (Paul).
  - No "photo ID if you do not have one" for someone with a card; "Photo ID." only for no card (Chloe).
  - The confirmation repeats the claim number for MVA and WSIB (Sam).
  - The tab title starts "You are booked." after booking (Jordan).
  - New family medicine patients see "Booking is for one visit. To have us as your family doctor, register as well." with a link (Jasmine).
- The select chevron was never drawn (the Tailwind class did not compile); province and other selects now show it (Chloe).
- Skin and Laser pages open booking on "Skin consult" and "Laser consult" (Quynh). Other aesthetics pages open on "A consult".
- The rehab menu has a WSIB page link, not only the booking intake (Sam).
- Children and youth: the triage card reads "Call or book a visit with us" (was "same-week", while booking offered today), the walk-in card is tagged "When we cannot see you" (was "Same day"), and "Health811 is free, 24 hours" calls 811 (Aisha).
- Pregnancy care: the coverage line mentions cards from another province, the glance says who you see, and the out-of-province FAQ is on the page (Chloe).
- Fees page: lists the prices the site already publishes (iron, physio and chiro, massage) with links, and the phone number is a link (Bev, Robert).
- Iron: the bring-your-own card shows the course total, "Course of 3: $750, plus the iron from your pharmacy" (Robert).
- Infusion: the drip builder's "Iron (Venofer) $400" now matches the clinic price, Monoferric 500 mg $550 for a 90 minute visit. "Thirteen drips" is "Twelve drips". "Energy, immunity, skin..." drops "immunity" (no immunity claims) (Marco).
- Referrals: "Fax or upload" no longer promises an upload; urgent wording matches the Urgent checkbox; the confirmation tells physicians how to label faxed imaging so it can be matched (Dr. Patel).
- Contact: the email wraps at the @, not mid-word; hours read "9am to 4pm" and never split; the FAQ reply time matches the form, 2 business days (Rita).
- Search: menu rows show the page's description instead of "Explore" (Quynh).
- "Skip to footer" link after "Skip to content", for the 75-Tab trip to cookie settings (Paul).

### Rounds 6 and 7 findings for the clinic

- **Fees (blocker for Bev, trust 3/7):** the fee list itself (Site settings > Fees in the admin), including forms, school and sick notes, chart transfers, late cancellation and missed visits, and whether driver's medicals are offered.
- **Aesthetics:** a "from" price for neuromodulator injections; whether laser hair removal is offered, with sessions and price; what "Skin health plans" include (Sofia, Quynh).
- **Iron:** whether private plans or the Ontario Drug Benefit cover the iron in the $550 option, and whether a course can be other than 3 visits (Robert).
- **Pain Centre:** wait times to quote to referring physicians (Dr. Patel).
- **Renewals:** what to do if pills run out before the renewal is ready (Friday closed), how patients hear back, and the "portal" mentioned on the page (Helen).
- **Directions:** which Walmart entrance and where the clinic is inside the store (Mark).
- **MVA:** what OCF-1 and MIG mean for the patient and whether they can ever be charged; an adjuster field on the booking form if wanted (Kevin).
- **Cancelling:** how to cancel or reschedule (phone, form or email) and the fee (Rita).
- **Privacy:** whether contact form messages and complaints are kept, and for how long; who reads complaints, shown on the contact form (Rita).
- **Out of province:** what happens, and the fee, if the home province cannot be billed (Chloe).
- **Careers:** pay ranges, shift times and benefits (Linh).
- **Booking two people:** the site cannot book two people at once; say "book each person, or call" if that is the policy (Anh).
- **Vietnamese pages:** the footer and FAQ promise Tiếng Việt; the translation is still off (Tuan).
- **Dark mode:** still off until the dark theme is finished (Dev).

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
