# Usability test, 28 October 2026

Ten simulated test patients used the production build in a real browser (Chromium via Playwright) on a phone (390x844, touch) or desktop (1440x900). Each followed a persona and three tasks, decided every step from screenshots of what was on screen, and reported friction, quotes and ratings. Forms simulated a successful send. Photos were blank (the image CDN is blocked in the test sandbox) and were not judged. The run happened about 10:50pm on a Tuesday, so the clinic showed as closed.

These are AI participants, not real patients. They are good at finding navigation, wording and flow problems; they do not replace a round with real patients, especially older and Vietnamese-speaking patients.

## Results

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

## Findings, most widespread first

Severity is the highest any tester gave. "Code" means fixable in the site; "Clinic" needs a decision or facts from the clinic.

1. **Open or closed contradicts itself** (8 testers, major for trust, code). At 10:50pm the utility bar said "Thornhill closed, opens tomorrow at 9am" while the mobile menu card said "Open today", the footer card a green "Open" and the clinics page intro "Thornhill is open now". Fix: one live status used everywhere; static "Open" badges become hours.
2. **Site search misses obvious words** (7 testers, major, code). Zero results for botox, Vietnamese, language, wheelchair (FAQ search), occipital, wait time, no OHIP, fever, emergency, after hours, refill, pharmacy, renew prescription. Search only matches labels as one phrase and does not index FAQ answers or topic text. The FAQ link from search does not carry the term. "Pricing" under popular searches goes to infusion pricing only. Fix: index FAQ questions and answers, topic leads and synonyms; match each word; route emergency words to the 911 and Health811 note.
3. **The result of a step appears off screen** (6 testers, major, code). After sending registration or a renewal, and after "Continue" in booking, the page stays scrolled down: the confirmation or the time slots are above the viewport, the waitlist button is the first thing seen, and keyboard focus drops to the page body. Fix: scroll to and focus the new step's heading or the confirmation.
4. **Booking forgets where you came from and does not say what you booked** (5 testers, major, code). "Book an iron assessment" and aesthetics links open booking with Family Medicine selected; "Start an MVA claim" has no claim number, insurer or accident date fields; the summary keeps "Insurance, MVA, WSIB or self-pay"; the confirmation shows when and where but not the service or cost, and says "Bring: Ontario health card" to someone who said they have none. Fix: carry service and visit type from every CTA, add an MVA/WSIB claim block, show service and coverage on the confirmation, and tailor "Bring".
5. **"Confirm booking" books without a review** (4 testers, minor, code). The step bar promises a Confirm step that is really the success screen. Fix: a short review panel, or rename the button "Book this time" and mark step 3 done.
6. **Some links still go to the old destination** (4 testers, major, code). Home "Renew a prescription" tile and the Family Medicine chooser go to Family Medicine or booking, not the renewal form; Pain Centre "No family doctor?" goes to registration while the Pain Centre page says to book an assessment; "MVA claim intake" reopens the MVA page; "Send a referral" lands at the top of For Physicians, two screens above the form.
7. **Prices people expect are missing** (2 testers, major, clinic and code). No injectable price or range (Jenna failed this task); no uninsured visit fee although the FAQ says "posted rates" (Amira gave up). The aesthetics pricing page exists but nothing led to it. Fix: clinic supplies a neuromodulator starting price and the uninsured visit fee (admin, Site settings > Fees); link aesthetics pricing from search and Injectables.
8. **Keyboard and low-vision access** (2 testers, major, code). Cookie banner focuses "Allow analytics" first, so one Enter gives consent, and Escape does not decline. Mega menus open on focus, ignore Escape and put their links after Search and Book in the tab order. FAQ focus scrolls off screen. Text fields have a 1px focus border. Text size control is small and only at the bottom of the footer. Fix: focus the banner heading, Escape declines; disclosure-button menus; scroll focused rows into view; 2px rings on inputs; text size in the mobile menu.
9. **Registration cannot take a child's details** (1 tester, major, code). Ticking "My children" adds nothing to fill in. The handoff specifies a family members array. Fix: name, date of birth and health card fields per person.
10. **Answers people looked for and did not find** (5 testers, minor to major, clinic copy):
    - Pain Centre wait time on the referral page (the FAQ says two to three weeks, but not there).
    - What to do if you run out of medication before a renewal.
    - An after-hours FAQ (the 911 and Health811 note appears only on form pages).
    - What happens if an auto insurer declines.
    - Which languages each clinician speaks, near the top of the team page.
    - Occipital nerve block named under headache procedures.
    - Woodbridge versus Maple in Dr. Nguyen's bio.
11. **Search results cramped on phones** (3 testers, cosmetic, code). Three narrow columns, "1 results", an "Esc" button on touch.
12. **Sticky "Book an appointment" bar covers content** (3 testers, minor, code). It overlaps in-page CTAs, the last FAQ rows and, at large text, the Saturday hours row.

## What worked

- Coverage answers: Pain Centre framing (referral, OHIP, no family doctor route) and the MVA "$0" chooser were understood at once.
- Iron therapy price transparency ("$1,650 for the course, HST included, assessment and bloodwork $0") built trust.
- Booking is fast once on it; Saturday slots, a clear confirmation with address, parking and calendar.
- Tone: plain, low-pressure, no outcome promises. Consent banner easy to decline. Emergency note calm and visible.
- Keyboard: skip link visible and reliable, no keyboard traps, booking step 1 fully operable.

## Test material

Per-tester screenshots and step scripts were kept in the test session's scratchpad (not in the repo).
