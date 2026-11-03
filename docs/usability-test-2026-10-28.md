# Usability test, 28 October 2026 (330 simulated patients)

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

## Round 8: 20 testers, harder areas

Run about 9:20am on a Wednesday (clinic open). Areas: same-day sick visit as a non-patient, menopause, diabetes, a caregiver for a parent with dementia, Sun Life physio at 1024px, migraine injections, search with typos on a slow phone, largest text on an iPhone SE, a 16 year old, B12 shots, phone and video visits, a skeptic checking credentials, two children's vaccines, a Pain Centre follow-up, a records transfer, a men's physical, the weight program, a massage gift, a UX designer's tour, and a female clinician and Arabic.

| Tester | Device | Ease /7 | Trust /7 | Failed |
|---|---|---|---|---|
| Bao, sore throat, not a patient | iPhone 12 | 5 | 6 | 0 |
| Carol, menopause | Desktop | 6 | 6 | 0 |
| Femi, diabetes | Galaxy S9+ | 5 | 6 | 0 |
| Gloria, caregiver | iPad | 5 | 6 | 0 |
| Hiro, Sun Life physio | Desktop 1024 | 6 | 5 | 0 |
| Ines, migraine | Pixel 7 | 4 | 6 | Botox for migraine |
| Jamal, search, slow phone | Moto G4 | 5 | 6 | 0 |
| Kim, 74, largest text | iPhone SE | 5 | 4 | 0 |
| Leo, 16 | iPhone 13 | 5 | 4 | 0 |
| Maria, B12 | Galaxy S8 | 5 | 4 | B12 coverage |
| Nina, phone or video visit | Desktop | 4 | 5 | Messaging a doctor |
| Oscar, skeptic | Desktop 1920 | 5 | 4 | 0 |
| Phuong, two children's vaccines | iPhone 12 | 6 | 6 | 0 |
| Raj, Pain Centre follow-up | Pixel 5 | 4 | 5 | RFA for patients |
| Susan, records transfer | Desktop | 5 | 4 | 0 |
| Tam, men's physical | iPhone 14 Pro Max | 6 | 6 | 0 |
| Ursula, weight program | iPhone 15 | 4 | 5 | Program cost |
| Vince, massage gift | Desktop | 4 | 6 | 0 |
| Wendy, UX tour | Galaxy S9+ | 6 | 5 | 0 |
| Yusuf, booking for his wife | Pixel 7 | 5 | 5 | 0 |

Average ease 5.0, trust 5.2. Every booking and form was finished; 19 of 20 would use the site again (Maria: maybe). All five failed tasks were missing clinic information.

### Round 8 findings fixed in code

- Booking buttons book the right visit: massage pages say "Book a massage" and book massage (Vince); physio and chiro "Book an assessment" book an initial assessment (Wendy); Lab results books the new "Results or follow-up" visit (Nina); the men's "Book a confidential visit" books a health concern, not an annual physical (Jamal).
- New "Results or follow-up" visit with "How would you like the visit?": at the clinic, by phone or by video, as the FAQ already offers to existing patients. The review and confirmation say "By phone. We call you at the number you gave us." or the video line (Nina).
- Pain Centre follow-up and procedure visits start on "Existing patient" and no longer show the referral note (Raj).
- Vaccine bookings no longer say "OHIP-insured" (shingles is funded only 65 to 70); they use the vaccines page line (Kim).
- Preferred language has "Another language" with a box and an interpreter note (Yusuf).
- The confirmation keeps the reason ("A health concern (Perimenopause and menopause)") (Carol), says "Their Ontario health card" when booking for someone else (Yusuf), and massage brings "Comfortable clothing." instead of the physio clothing tip (Vince). The no-reminder line says email only and no longer says "You chose not to get reminders" (Leo, Jamal).
- Review reads "Your relationship: husband." and the hint lists spouse (Yusuf, Vince).
- "Times on Thu Oct 29" above the times, so at larger text they do not look like Tuesday's (Kim).
- Back then Forward after booking shows "You booked an appointment in this tab..." instead of a blank form, so nobody books twice. Only a flag is kept in the tab, no details (Wendy).
- Largest text on a small phone: the header shows the R tile only, so search and the menu button fit (Kim).
- Know your numbers opens on the number in the link (#a1c); chronic care links to A1c (Femi).
- Search: "std test" finds Men's health; "dementia", "senior", "caregiver" find Chronic care; "facet" and "radiofrequency" find Back and neck; "migraine" finds Nerve blocks; "physio price" finds Physiotherapy; "anxiety" finds Family Medicine and Children and youth. Menu result rows show a description, not "Explore". The browser's clear button no longer covers long queries (Jamal, Leo, Gloria, Raj, Ines).
- Standards says "Nine commitments", counted from the list (Oscar).
- About menu: the second FAQ link is now Fees (Wendy).
- What's new stacks on phones instead of cutting off mid-word (Bao).

### Round 8 findings for the clinic

- **Online services:** is there a patient portal or online messaging? Several pages mention "the portal" with no link (Nina).
- **Prices:** sick notes, records transfer, B12 shot (and whether a prescribed one is covered), drips, the weight program, shingles after 70, massage length and HST (Bao, Susan, Maria, Ursula, Kim, Vince).
- **Weight program:** whether it includes medication such as GLP-1; it sits under Infusion Therapy and reads like drips (Ursula).
- **Migraine:** whether Botox for migraine or headache procedures are offered to patients, and under which division (Ines).
- **Pain Centre:** patient information on facet injections and RFA, when to follow up, and driving home (one page says most people drive, the nerve block note says arrange a ride) (Raj).
- **Women's care:** whether a female clinician can be requested, and whether women's health day covers a concern or only testing (Yusuf, Carol).
- **Consent:** what a caregiver or substitute decision-maker needs to speak for a patient; what parents can see of a teen's care, and "part of every teen visit is private" vs "attend alone" (Gloria, Leo).
- **Privacy:** a named Privacy Officer with their own email; records transfer steps and consent form (Susan).
- **Team and story:** CPSO numbers, Dr. Truong's bio, the portrait placeholder, Woodbridge vs Maple, the award chip that does not match the bio, the 10+ / ten / 11 years and the story timeline (Oscar).
- **Drips:** "we list what is in the bag and the dose" vs doses at the consult; "No fixed menu" under a menu of 12; define Established, Supported, Emerging (Oscar, Marco).
- **Direct billing:** a list of insurers billed directly, for example Sun Life (Hiro).
- **Fasting:** a plain answer for a first physical, and a caution for people on diabetes medication; an A1c target for people with diabetes (Tam, Femi).
- **Same-day:** the Family Medicine menu says "Same-day" while the card says "Same-week visit" (Bao).
- **Content gaps:** teen page written to teens, older adults and caregivers, headache and migraine, gift cards for massage.

## Round 9: 20 testers, after hours

Run about 11pm on a Sunday (clinic closed until Monday 9am). Areas: a toddler's fever at night, a phone follow-up, Mandarin, an IUD, ADHD skimming, pregnancy with back pain, a Parkinson's caregiver at the largest text size, a Vietnamese grandmother searching in Vietnamese, a paralegal, injectables prices, a student with UHIP, a physician recruit, a wheelchair user, iron while breastfeeding, Farsi and sciatica, 200% zoom by keyboard, a nonbinary patient seeking STI testing and PrEP, cancelling at night, "tired and achy", and a reporter.

Average ease 5.0, trust 5.1. Every booking went through. 18 of 20 would use the site again; Quinn said maybe, Hanh only with her grandson. Lowest: Hanh 2 of 7 ease on her own (no Vietnamese site, Vietnamese search found nothing), Quinn, Rosa and George 4. Failed tasks: Vietnamese search and a language switch, UHIP, IUD preparation, a lawyer contact, injectables prices, STI and PrEP outside Men's health, physio in pregnancy, breastfeeding and iron.

### Round 9 findings fixed in code

- "Reschedule or cancel" on the confirmation only started a new booking (Eli, Ben, Rosa). It is now "Book another visit", with "To change or cancel, call 905-709-3222 during clinic hours. Please give us 24 hours notice when you can." The cancellation FAQ now says how to cancel.
- While the clinic is closed, the status in the top bar links to the emergency and Health811 note on the contact page, not the hours again; searching "fever" shows the same note (Amara).
- Search in Vietnamese: "bác sĩ nói tiếng Việt", "tiêm cúm" and "đau lưng" find the team, Vaccines and Physiotherapy (Hanh). "Mandarin", "Chinese", "Farsi" and other languages find the interpreter FAQ (Chen, Omid). "Parkinson", "MS", "stroke" and "falls" find Chronic care (George). "breastfeeding" and "postpartum" find Pregnancy care and Iron (Nora). "cancel" finds the cancellation FAQ (Rosa).
- "Sexual health and STI testing" is its own search result, booking a confidential family medicine visit, so it is not reached only through Men's health (Quinn).
- Chronic care "Book a review" books a new "Chronic care review" visit (George).
- Another language: the hint and the confirmation now say "We arrange a phone interpreter for <language>, at no cost to you", matching the FAQ (Chen, Omid).
- Reminders start ticked; they are care messages, not marketing (Eli, Hanh, Khoa, Rosa).
- Phone and video visits: no Directions button; the booking summary shows "By phone" and the reason while choosing (Ben, Quinn).
- Small phones: the seven days wrap onto two rows instead of hiding Saturday and Sunday (Khoa, Hanh, Rosa). "Times for today, Nov 2" above the times.
- Text size and contrast buttons are at least 40 px in the phone menu and footer (George).
- Contact page phone and fax numbers no longer break across lines (Rosa).

### Round 9 findings for the clinic

- **Vietnamese site:** still the largest gap for the core community (Hanh).
- **Cancelling after hours:** whether voicemail or the contact form counts as notice; the late-cancellation fee amount (Rosa, Eli).
- **Uninsured visits:** the fee, and whether UHIP is billed directly (Khoa).
- **Injectables:** "from" prices per unit or syringe, and injector credentials (Julia).
- **IUD:** who inserts, device cost, how to prepare and pain relief (Dina).
- **Sexual health:** whether PrEP is offered; a sexual health section not split by men and women; the "Your year" planner's Female or Male toggle (Quinn).
- **Pregnancy:** physio and massage in pregnancy; Tdap timing (Farah). Iron while breastfeeding, and whether a baby can come along (Nora).
- **Accessibility specifics:** entrance, door widths, adjustable tables, washroom (Mo).
- **Medico-legal:** reports and a contact for lawyers (Ivan).
- **Physician recruitment:** billing model, hours, support (Dr. Park).
- **Transparency (Tess):** home page paths that start with an OHIP visit and end in a paid service; the "Typical IV lounge" comparison; drip names and evidence labels; complaints and privacy sharing the general inbox.

## Round 10: 20 testers, 2:50am Monday

Average ease 4.8, trust 5.2; every booking went through. Lowest: Kofi 2 of 7 (chest pressure at night), Duc 3 (Vietnamese), Vera, Isla, Grace, Priya 4. Ravi rated wellness drips 3 for trust.

### Round 10 findings fixed in code

- **Safety (Kofi):** while closed, the top bar on every page shows "Emergency? Call 911" as a call link; the phone menu always shows it above Book and Call. The emergency note now leads with "Chest pain or pressure, trouble breathing, signs of a stroke or heavy bleeding: call 911 now", a "Call 911" button, then Health811 (also a call link). "heartburn", "chest pressure", "trouble breathing", "numbness", "fainted", "crisis" and similar searches show it.
- Search finds: insomnia and sleep, mole and skin check (Family Medicine), rosacea (Laser and Skin), phone appointment and virtual (the phone or video FAQ), Vietnamese "huyết áp cao", "đăng ký bệnh nhân mới", "giờ mở cửa", Spanish "vacuna", "médico", "español", and newborn. Result links read "title, section" to screen readers.
- Buttons book the right visit: "Book a well-baby visit" (new "Well-baby or newborn check" visit), "Book a blood draw" and "Bring an outside requisition" (bloodwork, with the reason), "Book a drip" (an IV drip).
- No health card: newborns whose card has not arrived are told to choose Ontario health card and leave the digits blank (Priya).
- "Book another visit" now says "You already booked a visit. This books another one. To move or cancel the first, call us." (Bilal).
- Phone visits: the summary reads "Where: By phone" (Owen).
- Aesthetics skin and laser pages: "Is this the place for a changing mole or a rash? No. ... a family medicine visit, covered by OHIP." (Grace).
- Hero headlines get a side shade so white text reads on bright photos (Carmen, Chen, Hugo).
- Your year: season month ranges wrap whole at larger text (Vera). Phone menu leaves room above the bottom bar (Marco).

### Round 10 findings for the clinic

- Travel health and malaria (Isla); a line on sleep, stress and mood, and whether to show 988 (Ada); Pap and celiac preparation (Nadia, Emily); WSIB progress note cost and booking a block of sessions (Marco); Maple date and waitlist vs pre-registration (Tran); same doctor for a whole family, and guardians for teens (Sofia, Felix); drip numbers, names, times and pricing (Ravi); iron days vs assessment days (Hugo); Vietnamese pages (Duc).

## Round 11: 40 testers, Monday 2 November

Average ease 5.2, trust 5.4 (38 of 40 scored in their reports; round 10 was 4.8 and 5.2); every booking went through. Lowest: Bà Mai 3 of 7 (Vietnamese search), Paul 4 (bleeding spot), Gail 4 (complaint), Jess 4 (drip prices), Maya 4 and 4 (teen birth control), Dana 4 for trust (evidence labels).

### Round 11 findings fixed in code

- **Safety:**
  - The emergency note is now a real heading. It names stroke signs (face drooping, arm weakness, slurred speech).
  - It adds a mental health crisis line: "Thoughts of suicide or self-harm? Call or text 988". A tester with low mood found only physical emergencies listed.
  - "Not sure if it is urgent?" has its own "Call Health811 at 811" button and a separately named website link. Before, two Health811 links sat side by side and read as one sentence.
  - Searches for self-harm phrases show the note.
- **Phone menu:**
  - 911 is a full-width outlined button with no "›".
  - The clinic button says "Call clinic".
  - A "Not sure if it is urgent? Call Health811" row sits above Contact.
  - At larger text the Book button reads "Book", so the list keeps room.
- **Top bar:**
  - On phones the status reads "Opens today at 9am" instead of the cut-off "Closed, opens tod…".
  - The 911 link is an outlined pill. "For referring doctors" steps aside on phones while the clinic is closed.
- **Booking:**
  - A short "Chest pain, trouble breathing or signs of a stroke? Do not book. Call 911 now." line sits at the top of the form, with a link to the full note.
  - Pain Centre "First visit with a referral" says to wait for the call if the referral is not sent yet.
  - The well-baby visit shows the newborn card advice with the visit, and its Bring list no longer demands the health card.
  - WSIB and car accident visits say both new and ongoing claims start there.
  - Vaccines read "including flu and catch-up". They ask for any records from any country, and the coverage line follows "No health card".
  - "Book another visit" names the visit that stays booked. Same-day bookings drop the 24 hours notice line. The insurer shows on the confirmation, and the Back button says "Back".
  - Long emails wrap in the review.
- **Cookie banner:**
  - Hides while search is open (it covered the emergency note).
  - Keeps keyboard focus and in-page jumps clear of itself.
  - Is more compact on phones.
- **Date of birth:** separate Day, Month (by name) and Year fields replace the native date input on register, renewal and referral forms. A keyboard tester got stuck in its segments, and phones showed MM/DD.
- **Search:**
  - "Mood, anxiety and sleep" (with 988), "A mole or skin spot that is changing" (Family Medicine, above aesthetics) and "Memory concerns and dementia care".
  - Vietnamese "khám sức khỏe", "thuốc" and "đau đầu".
  - STI testing points to women's health day.
  - "massage price" finds massage.
  - Queries in a script the index cannot read (Chinese, for example) say to call and ask for a free interpreter.
- **Renewals:** "Running out sooner than two business days?" explains calling the clinic or asking the pharmacist for a short extension, also on the confirmation.
- **Fees:** the page also lists drip prices and the skin treatment "from" prices. Its lead is about costs, not camp forms. "Self-pay rates are on our fees page and at the desk." No-OHIP answer: visitors are welcome, the fee is told before you are seen, and you can call to ask first.
- **Consistency:**
  - Home iron card "About 90 minutes" (was three hours).
  - Aesthetics consult "20 minute" (was 30 in one FAQ).
  - Bloodwork results "go to the doctor who ordered them". The outside requisition card says you can book online.
- **Pages:**
  - "Not sure where to start?" goes to the home symptom paths, not straight to booking.
  - Chronic care "Book a first visit" books a chronic care review.
  - Teens booking from the children's page book for themselves.
  - Contact "A concern or complaint" says the Medical Director reads it.
  - The Maple list confirmation keeps "Register as a new patient".
- **Looks:**
  - Focus rings are sunshine on navy.
  - Division hero eyebrows sit on a dark chip, and "What we offer" photo cards have a deeper shade.
  - The sticky phone Book bar steps aside at larger text.
  - Footer text controls wrap.

### Round 11 findings for the clinic

- **Prices:**
  - Uninsured doctor visit fee for visitors (Luis).
  - Massage length and HST (Leo).
  - Injectables price indicator (Bianca).
  - Drip prices on the drip and pricing pages (Jess, Marie).
  - Pain Centre FAQ "Private procedures are listed with their prices" (Dana).
- **Who you see:**
  - Whether women's health day nurses are women, and Pap preparation (Fatima, Alex).
  - Aesthetics team physician and injector credentials (Bianca).
  - RPN eligibility for nursing roles (Priya).
  - Teen confidentiality wording written for teens, and what reminder texts say (Maya).
- **Services:**
  - Pelvic floor or postpartum physio (Sara).
  - Mood and mental health on Family Medicine (Sam).
  - RFA candidacy criteria and a referral reference number (Dr. Kwan).
  - Substitute decision-maker or power of attorney guidance (Hoa).
  - Booking a series of sessions (Tony).
  - Insurers billed directly by name (Grace).
  - Foreign vaccine records (Omar).
- **Evidence:**
  - Define Established, Supported, Emerging and Supervised, and the promised ingredient pages and doses.
  - Source or remove the "Typical IV lounge" comparison.
  - Pap interval against HPV screening.
  - "Low energy" by concern going straight to paid drips (Dana).
- **Facts:**
  - Dr. Nguyen's bio names "Restoration Medical Woodbridge".
  - Home "10+ years" vs team "11 years".
  - Roles "Updated September 2026".
  - Privacy policy on contact messages (Gail).
- **Vietnamese pages** (Bà Mai, Hoa) and Chinese (Wei).
- **Thin pages and labels** (Zoe): Gift cards and Lab results are stubs. "Dr. Johnny Nguyen" opens the team page. "Home exercise portal" has no portal. "Book online (Ocean)" names a vendor.
- **Dark mode (follow-up, code):** a light-sensitive tester (Ivy) asked for it. The dark tokens exist, but components hard-code white backgrounds (68 places) and navy text, so a dark theme needs its own pass before it can follow the phone's setting.

## Round 12: 20 testers, retest of round 11, Monday 2 November 7:50am

Average ease 5.5, trust 5.8 across all 20 (round 11 was 5.2 and 5.4); every booking went through. Lowest: Wei 4 for ease (Mandarin, registration language), Maya 4 for trust (teen messages), Marie 4 for price transparency.

Retests that now work: one tap to 911 from the top bar, the 988 line, the mood and skin spot search rows, Chinese search pointing to a free interpreter, teens booking as themselves, newborn card advice, the vaccine coverage line without a card, referral patients told not to book, the "first visit stays booked" note, the complaint hint, "Not sure where to start?", and the Maple list leading to registration.

### Round 12 findings fixed in code

- **911 while scrolling:** the phone header shows a "911" button once the top bar has scrolled away (Linh). The top bar's 911 link is taller.
- **Date of birth:** the month box shrank to its arrow and hid the chosen month (Ed, Kevin, Hal). Day and Month now share a row and Year wraps below; the day and year fields take digits only.
- **Registration:**
  - "Another language" with a "Which language?" field, as on booking (Wei).
  - The health card hint says "Optional. Newborn whose card has not arrived yet? Leave it blank." (Kim).
  - The confirmation says to keep a visit already booked and mention it when we call (Wei, Kim, Kevin).
  - Coming from the Maple list starts on Maple (Kevin).
- **Booking:**
  - The top line adds "Thoughts of suicide or self-harm? Call or text 988." (Sam).
  - Choosing Physiotherapy or Chiropractic as a new patient suggests the initial assessment (Tara).
  - Existing patients see a claim hint that does not mention "the first visit" (Tony).
  - "Book another visit" is an outlined button.
  - The 24 hours notice line reads more plainly.
  - Review values no longer break phone numbers.
- **Phone menu:** Escape closes it. At larger text, 911, Book and Call share one row. The clinic status wraps instead of running off the screen (Bà Mai).
- **Text size:** the active size is filled, and the largest reads "A++" (Bà Mai, Zoe).
- **Readability:**
  - Division heroes (Family Medicine, Pain Centre) get a side and bottom shade, and the eyebrow sits on a dark chip (Bob, Ana).
  - "What we offer" cards have an even shade (Bob).
  - Skip links are sunshine pills.
- **Children and youth (please review first):** "A fever in a baby under 3 months" moved from the Health811 or walk-in card to the Emergency card (Kim). The teen panel links "Birth control and sexual health: confidential at any age" (Maya).
- **Other:**
  - "Flu shots are available now" replaces "available from October" (Zoe).
  - Renewal errors move focus to the field once it is drawn (Hal).

### Round 12 findings for the clinic

- A visitor or uninsured visit fee or range, and payment methods (Luis, Omar).
- What confirmation and reminder messages say, and a discreet option for teens (Maya). What "within the limits of the law" means.
- Booking a series of WSIB sessions (Tony).
- Whether someone who has just registered may use the renewal form (Hal).
- Prices for the Injection Bar, injectables, laser and kinesiology. Fees is not in the header or About menu (Marie).
- A short Family Medicine line on mood, anxiety and sleep (Sam). Headache in Vietnamese search ("đau đầu").
- The Iron therapy hero says "Thornhill, Tue, Sat and Sun" while assessments book any day (Bob).
- Dark mode, as before.

## Round 13: 20 testers, Monday 2 November about 8:50am

Average ease 5.3, trust 5.6 (round 12 was 5.5 and 5.8; this round leaned toward harder tasks: infant fever, a screen reader and a keyboard user, gift cards, a desktop polish review). Every booking went through. Lowest: Thao 4 for ease (infant fever), Wei 4 (Mandarin), Leo 4 (gift card and massage).

Retests that now work: one tap to 911 from halfway down a page; stroke signs in the emergency note; registration in another language; text on photos readable with High contrast on four division pages; Alberta card booking.

### Round 13 findings fixed in code

- **Safety, children's page (please review first):**
  - On phones, "Where to go, and when" shows the Emergency card first.
  - Its "Call 911" is now a real call button; it was plain text (Thao).
  - "Fever for more than two days" now says "in a child over 3 months".
  - The emergency note lists "a fever in a baby under 3 months".
- **911 header:** the scrolled phone header reads "Call 911", not just "911" (Doug).
- **Screen readers and keyboard (Nia, Hal):**
  - The renewal medications hint is linked to its field.
  - The date of birth fields are marked required. A started but impossible date (31 February, a future date, a 2-digit year) says "Check the date of birth: a day, a month and a 4-digit year".
  - An error on the date of birth scrolls the Day field into view.
  - Links to #emergency or #request move focus there.
  - The Health811 website link says it opens in a new tab.
  - The date of birth fits on one row on desktop.
- **Booking:**
  - New visit "First visit as a new patient" (Wei).
  - The reason carried from a page or search shows on the first step ("Reason for the visit: Memory or dementia").
  - Insured physio and chiro visits also show the self-pay price if the plan does not cover it (Dev).
  - The health card field says "Digits only. Leave out the two letters at the end."
  - Pain Centre "Book a family medicine assessment" carries "Pain Centre referral" as the reason (Marcus).
  - Chronic care condition cards book a chronic care review (Hoa).
  - The 24 hours notice line is fixed.
- **Car accidents (Mira):**
  - The claim number reads "if you have one" on the card, the WSIB card and the FAQ.
  - The OCF forms are explained.
  - The card's button says "Book a car accident assessment".
- **Iron (Carol):** the drip builder no longer adds 10 minutes of screening to iron's "about 90 minutes".
- **Registration (Ruth):**
  - Darker labels and checkbox borders.
  - In "Someone I care for" mode, "Also registering from the patient's household" and "Send the registration".
- **Other:**
  - The referral box no longer implies a printable fax form (Dr. Kwan).
  - "Messages and renewal requests" are read during clinic hours (no longer "booking requests", next to "You are booked").
  - Aesthetics "Our standards of care" opens the Standards page.
  - The fees links keep "›" with the last word.

### Round 13 findings for the clinic

- **Prices and products:**
  - Gift cards: amounts, buying online, whether they cover massage. Massage length and HST (Leo).
  - Injectables price and named injectors with credentials (Bianca).
  - Uninsured or out-of-province fallback fee (Kai).
- **Content to review:**
  - The iron page's "One good afternoon" against three visits (Carol).
  - Reminder language for Vietnamese patients (Hoa).
  - The front desk role's hours and Maple start date (Grace).
  - "Woodbridge" in Dr. Nguyen's bio.
- **Design system, a follow-up pass (Zoe):**
  - Five primary button styles. Done after round 13: buttons share one helper, `buttonClass` in `src/components/ui/Button.tsx`. They keep the design system's colour roles: navy primary, sky for booking steps and service-card Book, sunshine on navy, white on photos, outline for secondary actions. The confirmation row has one primary and outlined secondaries. The disabled "Choose a time above" is an outline, and "Edit details" and "Change time" end in " ›".
  - Mixed "&" and "and", and heading punctuation.
  - "10:00 am" against "9am".
  - The two sub-page hero templates.

## Round 14: 20 testers, Monday 2 November about 8:30pm (clinic closed)

Average ease 5.5, trust 5.5 (round 13 was 5.3 and 5.6). Every booking went through. Lowest trust: Ravi 4 (drip evidence labels), Maya 4 (teen privacy wording), Hugo 4 (Pain Centre referral process).

Retests that now work:
- Date of birth: impossible dates are caught with a clear message (Ed).
- The "Call 911" header pill after scrolling.
- Keyboard focus moves to each step's heading, with no traps.
- Screen reader labels, groups and step focus.
- Text on photos in high contrast.
- Memory search leads to a caregiver-friendly booking.
- The Maple list leads to registration with Maple preselected.

### Round 14 findings fixed in code

- **Safety:**
  - Searching "sweaty", "tight chest", "indigestion" or "jaw pain" now shows the emergency note. The note now says "Chest pain, pressure or tightness (even if it feels like heartburn, especially with sweating)" (Kofi).
  - Crisis words ("hopeless", "suicide", "self harm") show a crisis-first note: "You do not have to wait for us. Talk to someone now: call or text 988…", with a "Call or text 988" button, then the 911 line (Jordan).
  - The no-results line adds Health811 instead of only the clinic phone.
- **Forms:**
  - Phone numbers need at least 10 digits, and emails need a domain ending (Nia).
  - Error messages are 14px with a marker, and the consent checkbox border turns to the error colour (Bob).
  - The date of birth fits one row on desktop.
  - Tab stays inside the search overlay (Hal).
- **Booking:**
  - Family Medicine offers "I would like a female nurse present for any examination", repeated on review and confirmation with "Both of our physicians are men" (Nadia).
  - Bookings for someone else say "their first visit" (Nia).
  - A next-day visit says "Your visit is tomorrow, so this confirmation is your reminder".
  - The 24 hours notice line no longer says "the day before" (closed Fridays).
  - The children's "Book a sick visit" books for the child (Sofia).
  - The drip builder button reads "Book this drip" or "Book an iron assessment", and carries the chosen drips and total to the booking (Ravi).
  - The Pain Centre referral hint gives the two to three week wait and how a self-booked time is confirmed (Hugo).
  - The claim label reads "Claim details".
- **Registration (Hoa, Priya, Kevin):**
  - Caregiver mode shows "Their partner / Their children / Their parents" and "The patient's preferred language".
  - A new optional notes field.
  - Registration and booking now agree that a visit booked online is the first visit.
  - Maple registrations say the first visit is booked once Maple opens.
- **Search:** "earache", "therapy", "need to talk" and "hopeless" find care (Sofia, Jordan).
- **Car accidents and work injuries:** "No claim yet is fine" on the cards, and the duplicate WSIB claim line is removed (Luis).
- **Small phones:**
  - The top bar pill reads "Call 911", so "Opens tomorrow at 3pm" fits.
  - At larger text, the contact phone and fax tiles stack, so the numbers are not cut off (Bà Lan).
- **Iron:** the builder no longer double-counts screening, and the hub reads "Iron infusion, $250 with your own iron or $550 with ours" (Dana).

### Round 14 findings for the clinic

- **Drips (please review):**
  - Evidence labels are undefined, and Myers' is labelled "Established".
  - The ingredient library promises labels on ingredients that it does not show.
  - The pricing page has no numbers, and drip detail pages list no ingredients or prices (Ravi, Dana).
- **Prices:** sick note fee, and whether a note can be done by phone (Owen).
- **Teens:** consistent teen privacy wording ("part of the visit" against "confidential at any age"), what "the limits of the law" are, and discreet messages (Maya).
- **Who sees you:** who does skin consults and microneedling, nurse or physician (Grace).
- **Waits and dates:** a patient-facing Pain Centre wait on the pain pages (Hugo); a Maple opening month (Kevin).
- **Consistency:** iron visit length across the FAQ (about an hour plus observation), the health note and the infusion path ("45 to 180 minutes"); "10+" against "11" years; the past Thanksgiving closure still listed (Dana).
- **Wellness and caregivers:** home-care advice for a feverish child tonight (Sofia); consent on behalf of a parent (Hoa).

## Round 15: 20 testers, Monday 2 November about 11:35pm (clinic closed)

Average ease 5.6, trust 5.2 (round 14 was 5.5 and 5.5). Every booking, registration and form went through. Trust dropped on the infusion and iron pages: Ravi (pharmacist) 4, Dr. Haddad (referring physician) 4, Gerald (arm pain) 4, Maya (teen) 4. The low energy path now sends people to a doctor first, and no one felt pushed to buy (Linh).

### Round 15 findings fixed in code

- **Safety (Gerald, Sarah):**
  - In search, pressing Enter on emergency words moves to the Call 911 (or 988) button instead of opening the first result. It used to open the Pain Centre page for "arm pain short of breath".
  - The emergency note adds "pain spreading to the arm, jaw or back, sudden shortness of breath".
  - The booking top line adds arm or jaw pain, shortness of breath and a fever in a baby under 3 months.
  - If the booking note mentions an emergency symptom, a 911 and Health811 prompt appears under it.
- **Iron (Priya):** the self-check tally now shows under the chips on phones. It no longer says "A ferritin test is a sensible next step" at three ticks; any count says to mention it to your doctor, and to bring a low result to an iron assessment.
- **Drips (Marcus, Ravi, Grace):**
  - Every drip page shows "Mixed by our nurse at your appointment".
  - Searching "Kingmaker", "Queenmaker", "mixed" or "premixed" finds the drips.
  - Comparative lines removed: "Why choose a clinic, not a lounge", "not sold from a counter", "delivered by people, not a counter", "real medical oversight".
  - The ingredient library no longer promises labels on each ingredient or ingredient pages that do not exist. "We list what is in the bag and the dose" now says this is done at your consult.
  - The infusion RN job ad no longer says "in a lounge setting".
- **Renewals (Kevin, Diane):** an after-hours line ("We count the two business days from the next day we are open"), a caregiver hint, and the FAQ no longer mentions a portal.
- **Vietnamese (Bà Hoa):** the FAQ no longer promises a language switch that is hidden until the Vietnamese pages launch.
- **Small fixes:** the morning cancel line only shows for morning visits (Tomasz had a 5:30pm visit); no double full stop on claim lines; the team page shows initials instead of "Dr. Nguyen portrait (from restorationmedical.ca)".

### Round 15 findings for the clinic

- **Infusion and iron, clinical (Ravi, Dr. Haddad, Grace):**
  - Evidence labels are still undefined; "Supervised" is not an evidence level.
  - Most drips list no ingredients or doses, including the Signature drip.
  - Whose orders the nurse follows when "tailoring" a drip or adding add-ons.
  - A pregnancy drip filed as elective wellness.
  - Iron: a fixed 500 mg times 3 against "the physician chooses the iron and dose"; safety wording ("Serious reactions are rare") without hypersensitivity, low phosphate or skin staining; how brought-in iron is checked and stored; "Most private drug plans cover the iron".
  - Marketing tone on iron: "Tired of being tired?", "One good afternoon" for a three-visit course, "restores your iron".
  - Outcome lines: "healthy-aging support", "Investing in how you age", "Bones & mood", "Steady energy", "Leave feeling restored", "recovering harder".
- **Prices:** an uninsured family medicine visit fee (Arjun); drip prices on the pricing page, and fee names (Hydration, Vitamin blend, Recovery) that match the menu (Marcus); a pay range on job ads (Grace).
- **Referrals (Dr. Haddad):** the online referral asks for no patient name, so physicians would fax instead; a reference number for matching faxed results.
- **Teens (Maya):** what reminder texts say on a lock screen; whether anything reaches parents on a shared health card.
- **Women's health day (Thu):** say who does the Pap test on that day (a female nurse?).
- **Maple (Olivia):** an opening month; one name for the list ("waitlist", "pre-registration", "register").
- **Car accidents (Tomasz):** what happens if the insurer denies the claim.
- **Who injects (Jenny):** which physician does aesthetics consults.
- **Newcomers (Arjun):** whether you can register before OHIP is active.

## Round 16: 20 testers, Tuesday 3 November about 12:55am (clinic closed)

Average ease 5.3, trust 5.1 (round 15 was 5.6 and 5.2). Every booking and form went through. Lowest trust: Sunita (pharmacist) 3, Wendy (jaw ache) 4, Anh (Pap by a woman) 4, Kim (Queenmaker receipt) 4, Lisa (NP, iron) 4. Derek (men's hormones) found the site honest compared with low-T ads: no men's drip, broad testing first.

No "Call 911" dials any more. Two testers (Wendy, Tran) tapped the yellow "Call 911" in the top bar expecting a call; three (Ông Minh, Rachel, Fatima) found it alarming on calm pages.

### Round 16 findings fixed in code

- **Safety:**
  - Searching "jaw ache", "drowsy", "hard to wake", "limp", "stiff neck" or "lethargic" now shows the emergency note (Wendy, Tran).
  - The emergency note and the booking note prompt add "a child who is very drowsy, limp or hard to wake".
- **Pap tests (Anh, Sam):**
  - New visit type "Pap test with a nurse", with "Pap tests are done by our nurses, who are women." The Women's health "Book a screening visit" opens it.
  - The chaperone option is now "I would like a nurse in the room for any examination. Our nurses are women." It no longer adds "Both of our physicians are men" on the confirmation.
  - The Women's health lead no longer says "Handled by your family doctor".
- **No OHIP (Mei, Gord):** the fee shows on the review and confirmation ("Uninsured: a doctor visit is $100 plus HST ($113 total), receipt provided"), the bring list adds travel or student insurance, and the fees page lists "Doctor visit without OHIP".
- **Renewals (Paul, Omar):** a "Who is this request for? Me / Someone I care for" choice with "Patient's name", "Your name", "Your relationship", "Your phone" and "The person I am asking for is an existing Restoration Medical patient." Links to the form now move focus to it.
- **All forms (Omar):** a field's error clears as soon as it is fixed, instead of staying until the next submit.
- **Drips (Kim, Brianna, Sunita):**
  - Searching "Queenmaker" or "Kingmaker" finds the Signature drip.
  - Every drip page says "Often tired? Start with a family doctor visit and bloodwork. OHIP-insured." with "Book a doctor visit ›".
  - Promises the pages did not keep are reworded: "Every ingredient explained, with the evidence labelled honestly", "Clear per-visit pricing … HST included", "priced with HST on the menu".
- **Iron (Fatima):** the self-check result has a "Book an iron assessment ›" link.
- **Teens (Jay):** the teen panel says reminders do not name the reason, its link books a confidential sexual health visit (it went to Women's health), "reminder text" finds the answer in search, and the STI result no longer points boys to women's health day.
- **Complaints (Gord):** the confirmation for a complaint says it goes to the Medical Director, is logged and reviewed.
- **Maple (Raj):** the Maple list says up front that it does not register you, and to register too.
- **Search:** "libido", "vitality" and "low T" find Men's health (Derek); "complication" and "side effects" find the standards page (Rachel).

### Round 16 findings for the clinic

- **Iron, clinical (Lisa, Sunita):** the referral card lists iron sucrose and ferric derisomaltose while patients see only Monoferric; a fixed 500 mg times 3; pregnancy shown as a common group without a first-trimester caution; safety wording without hypersensitivity, skin staining or low phosphate; the referral checklist (weight, eGFR, CRP, pregnancy, allergies); handling of brought-in iron.
- **Drips:** evidence labels undefined; ingredients, doses and prices on drip pages; "Healing" and "NAD+ Longevity" names; outcome lines ("Leave feeling restored", "recovering harder", "Investing in how you age").
- **Square:** rename IV Kingmaker and IV Queenmaker to match the site (Kim's receipt said Queenmaker).
- **Aesthetics (Rachel):** injector credentials beyond a first name; what happens with a filler complication and who to call after hours.
- **WSIB and car accidents (Carlos):** what happens if a claim is denied; the self-pay headline "From $95" is the massage price.
- **Pain Centre (Helen):** say on the pain pages that a referred patient waits for our call, and what to do if no call comes in three weeks.
- **Registration (Mei, Sam, Ông Minh):** can people without OHIP register; a "name you go by" and pronouns field; booking by phone only, without an email.
- **Wording kept by request:** "Call 911" is plain text, not a link. Consider "Dial 911" so it does not look tappable.

## Round 17: 20 testers, Tuesday 3 November about 1:30am (clinic closed)

Average ease 5.35, trust 5.2 (round 16 was 5.3 and 5.1). Every booking and form went through. Lowest trust: Dr. Leung (hematologist) 3, Kevin (16, STI testing) 4, Alex (trans patient) 4, Sofia (filler safety) 4, Dev (WSIB) 4, Tony (Kingmaker receipt) 4.

Retests that now work: caregiver renewals (Mai, Ben), errors clearing as you type, the no-OHIP price on every booking screen (Graham), the Pap visit with a nurse (Huong, about 85% sure a woman does it), the Maple list saying it does not register you (Joanne), complaints naming the Medical Director (Maria), and the drowsy child sign in search (Nadia). The compliance consultant found no em dashes, exclamation marks, testimonials, ratings or urgency wording.

Plain-text 911: Linda (stroke signs) reached "call 911" in under 15 seconds, but tapped the yellow "Call 911" first and nothing happened.

### Round 17 findings fixed in code

- **Emergency note:** it now opens with a large "Dial 911 now if someone has:", then the signs as a list (stroke first), then "Or go to the nearest emergency department." It used to be one long sentence ending in "call 911", with 811 as the only big button (Linda, Nadia).
- **Booking:** the note warning says "Please do not book for this. What you wrote can be an emergency. … dial 911 now", not "may need care today" (Nadia). The top line adds a limp child.
- **Iron health note:** chest tightness, trouble breathing or face and throat swelling after an infusion is now "call 911", not "call us" (Dr. Leung).
- **Privacy:** calendar files are titled "Appointment", never the visit reason (Kevin's said "Sexual health").
- **Bugs:** arrowing past a follow-up visit no longer leaves "Existing patient" set, and date of birth errors clear once the boxes are fixed (Ben).
- **Pap visits:** no "nurse in the room" box, and the confirmation says "Your Pap test is with one of our nurses, who are women." (Huong).
- **Pain Centre:** the wait FAQ adds "Not heard from us after three weeks? Call 905-709-3222 and we check that your referral arrived." (Bob).
- **Men's health:** the energy assessment books a health concern, not an annual physical, and suggests a morning time for a testosterone test (Rick).
- **Flu shots:** "One booking per person. Booking for your family? Book each person at the same time or back to back, and we see you together." (Jess). The vaccines page says where: "Thornhill, 700 Centre St. Maple is not open yet." (Joanne).
- **Renewals:** caregiver mode labels "Your email (optional)", and the side hint no longer says to type your name in the note (Mai).
- **Complaints:** the hint adds the College of Physicians and Surgeons of Ontario and the College of Nurses of Ontario (Maria).
- **Smaller:** rehab self-pay reads "From $95 for massage"; the OHIP drip FAQ links to infusion pricing; registration notes suggest the name and pronouns you use (Alex).

### Round 17 findings for the clinic

- **Iron (Dr. Leung, Monique):** a fixed 1,500 mg course; iron sucrose against Monoferric; "Find out in one blood test" against the referral panel; no cause work-up (for example GI in men and post-menopausal women); safety wording; first-trimester and other contraindications; a named prescription iron and price next to a symptom checklist and "restores your iron"; iron in the drip builder.
- **Drips and outcome lines (Monique):** evidence badges, "Healing", "beauty-from-within", "repair", "healthy-aging", "Steady energy", "Bones & mood", "Leave feeling restored", "gets you moving", "Look like yourself, on a good day", weight content (Metabolic, MIC, L-carnitine), biotin and lab tests, NAD+ infusion time.
- **Aesthetics:** "complimentary consult with a physician" against "Consult: Nurse, 20 min"; injector credentials; filler complications and after-hours plan (Sofia).
- **Teens (Kevin):** how the booking system knows a visit is a teen visit (no age asked) and what confirmation messages say.
- **Names and pronouns (Alex, Sam):** add optional "name you go by" and pronouns fields, and say what happens when the health card name differs.
- **Vietnamese (Thao):** list languages on the doctor cards and let families ask for a Vietnamese-speaking doctor.
- **WSIB (Dev):** what is paid if a claim is denied.
- **Consistency:** Woodbridge against Maple, "10+ years" against 11, iron visit length, "Both physicians" against "Most of our staff" speak Vietnamese.

## Round 18: 20 testers, Tuesday 3 November about 9am (clinic closed until 3pm)

Average ease 5.5, trust 5.35, the highest so far (round 17 was 5.35 and 5.2). Every booking and form went through. Retests that now work: the "Dial 911 now" box (Kim reached the stroke instruction in about 2 seconds), patient status no longer changing on its own and date errors clearing (Rosa), the private calendar title (Ava), the no-OHIP fee in five places (Omar), Pap with a nurse (Fatima, 6 out of 7 sure), the morning testosterone tip (Mike), and Maple preselected from the Maple list (Sam). Both compliance reviewers found no em dashes, exclamation marks, testimonials or ratings. Lowest trust: Jordan (preferred name not shown back) 4, Ava (reason in the web address) 4, Dr. Ali 4.

No tracker loads on the form pages: a check of /book, /register and /about/contact found no outside requests. A tester's facebook.com request came from the Facebook icon in the top bar.

### Round 18 findings fixed in code

- **Emergency box:** Health811 is now a text link, not a button. With 911 as plain text, the 811 button was the only large control and two testers said they might press it. The booking top line names pressure, tightness and heartburn, and its link reads "See the full list of emergency signs".
- **Preferred name and pronouns:** shown back on the booking review ("Preferred name: Jordan (he/him)") and on the registration confirmation. The first name field adds "As on the health card."
- **Teen privacy:** the visit reason is removed from the web address once read, so it does not stay in browser history.
- **Pregnancy:** the "Hydration in pregnancy" drip is off the menu and redirects to pregnancy care. Searching "morning sickness" or "nausea" finds pregnancy care and family medicine. The pregnancy page adds when to call the same day and when to dial 911.
- **Iron:** the health note says "Plan for about 3 hours in all"; the drips FAQ says the infusion visit itself is not OHIP-insured; the steps heading is "Three steps, over a few weeks."
- **Old drip names:** searching a receipt name ("Beauty Elixir", "NAD+ Longevity", "Healing", "Radiance", "Recover") finds the renamed drip, with "Drip names changed in November 2026".
- **Dates of birth:** "That date does not exist. Check the day and the month." for 31 February, and a separate message for future dates.
- **Pain Centre:** its FAQ adds "My doctor sent a referral. What happens now?", and the booking hint says to call after three weeks.
- **Smaller:** vaccines page "Families: One booking per person…"; the "Program" drip filter with no drips is gone; footer and ticker say "Maple list" and the ticker opens the form; drip page lead and how-it-works steps no longer say "No fixed menu", "how you want to feel" or "so any treatment is safe"; one "Results vary" instead of two.

### Round 18 findings for the clinic

- **Iron (Dr. Ali, Pierre):** fixed 500 mg course; iron sucrose on the referral page; first-trimester and other contraindications; the cause work-up; skin staining and low phosphate; Monoferric and its price next to "restores your iron" and "Serious reactions are rare".
- **Weight program (Pierre):** the struck-through "Detoxes and melts fat" quote, "medical weight management" and the MIC and L-carnitine add-ons.
- **Aesthetics (Carmen, Pierre):** who injects; injectable prices; aftercare and complications; "Look like yourself, on a good day"; "complimentary consult" as an inducement.
- **Outcome lines (Pierre):** "Leave feeling restored", "gets you moving", "back to the sport, not just out of pain", "Steady numbers, fewer surprises", "From booking to back on your feet".
- **Drips:** prices and doses on drip pages; fee names (Hydration, Vitamin blend, Recovery) that match the menu; a way to pick the drip when booking.
- **WSIB (Ray):** what happens if a claim is denied.
- **Choosing a doctor (Hanh, Thao):** families want to ask for a Vietnamese-speaking doctor; Vietnamese name order on forms.
- **Consistency:** Woodbridge against Maple.

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
