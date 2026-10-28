# Usability test, 28 October 2026 (30 simulated patients)

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
