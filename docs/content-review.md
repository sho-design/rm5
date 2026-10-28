# Content needing clinic review

Pages added in October 2026 behind the mega-menu links, and the Infusion pages moved onto this site, reuse approved prototype copy wherever it exists. The strings below are new wording written to join pages together. Each one is wrapped in `draft()` in the source. Approve, reword or remove each before launch (RM-HB-COMMS).

Approved copy is quoted through guards that fail the build if the source text changes, so only the strings below are unreviewed.

## Service and patient topic pages

Source: `src/content/topics.ts`

- Physician reviewing a patient's imaging at the Pain Centre
- At a glance
- What may be used.
- About nerve blocks
- About joint pain
- Physician preparing an ultrasound-guided knee injection
- One plan, one building.
- Physician performing a nerve block with a nurse assisting
- Read before your visit.
- Physician examining a patient's upper back
- Physician talking with a patient at a first Pain Centre visit
- Reception desk at the Thornhill clinic
- Physician planning an injectable treatment with a patient
- Aesthetic nurse preparing a skin treatment
- Treatment room prepared for a laser consult
- Clinician mapping a skin health plan with a patient
- Physician consulting with a male patient
- Clinician going through a written plan with a patient
- Before and after photos
- This site does not show before and after photos of patients. Photos taken at your consult stay in your chart.
- Medical Aesthetics photos at Restoration Medical in Thornhill are taken at your consult for your file. This site does not show patient photos.
- Consult room in the Medical Aesthetics suite
- Gift cards
- Ask the front desk about Medical Aesthetics gift cards, in person at Thornhill or by phone.
- Medical Aesthetics gift cards at Restoration Medical in Thornhill. Ask the front desk in person or call 905-709-3222.
- Call the clinic
- Front desk at the Thornhill clinic
- Ask at the desk
- Physiotherapist assessing a patient's knee
- What it costs
- Chiropractor working with a patient
- Registered massage therapist treating a patient's shoulder
- Kinesiologist coaching a patient through an exercise
- Physiotherapist and patient reviewing a treatment plan
- Kinesiologist guiding a graded return-to-work exercise
- Insurance and direct billing
- Front desk staff helping a patient with an insurance card
- What to bring
- A few things make your first visit quicker.
- What to bring to a first rehab visit in Thornhill: your insurance card, claim number, surgical report and clothing you can move in.
- Patient arriving for a first physiotherapy visit
- Bring these.
- Clothing you can move in
- Your home program
- Patient doing a home exercise routine
- Between visits
- Questions about your program? Call 905-709-3222.
- Prescription renewals
- Family physician reviewing a medication list with a patient
- Lab results
- Lab technician labelling a blood sample
- Before your bloodwork.
- Patient forms
- The forms you may need, and where each one goes.
- Patient forms at Restoration Medical in Thornhill: new patient registration, records requests, third-party forms and physician referrals.
- Forms and requests.
- New patient registration
- Copies of your records
- Third-party forms
- For physicians: Ocean eReferral, fax 905-761-7306 or referrals@restorationmedical.ca.
- Insurance and billing
- Front desk staff explaining a receipt to a patient
- By service.

## Infusion pages

Source: `src/content/infusion-site.ts`

- See the Injection Bar
- Ingredients and doses for this drip are confirmed with you at your consult.
- The Injection Bar
- Physician-supervised program
- Metabolic program
- What we say.
- Part of the program.
- What you may hear
- What we say
- Ingredient library
- Core ingredients.
- Also given as shots.
- Drips by evidence label.
- Ten vitamin and nutrient shots at Restoration Medical in Thornhill, about 10 minutes each, physician-reviewed and nurse-administered.
- A physician-supervised medical weight management program at Restoration Medical in Thornhill, with screening and follow-up.
- What a drip bar promises, and what a physician-led clinic says instead. Screening first, real medical oversight and registered nurses.
- The ingredients in our drips and shots, what each one is for, and where the evidence is still developing.

## Patient helpers (added before launch)

Source: `src/content/patient-help.ts` and `src/content/consent.ts`. All new wording.

- Emergency note on booking, registration, contact and the renewal form: "Is this an emergency? Call 911 or go to the nearest emergency department. For health advice any time, day or night, call Health811 at 811 or visit health811.ontario.ca. Online requests are read during clinic hours."
- Prescription renewal request form on `/family-medicine/prescription-renewals`: labels, the "existing patient" and contact consent lines, the success message ("Request sent. Allow two business days. If a visit is needed first, we call you to book one.") and the failure line.
- Uninsured fees page `/about/fees`: heading, "Ask us for the current list." and the receipts line. The fee list itself is entered by the clinic in the admin (Site settings > Fees); no fees are written in code.
- "Finding us" on the clinics page: shown only when the clinic writes it in the admin (Clinics > Finding us), with an optional photo.
- Cookie banner: "Can we count visits?" and its body, "Allow analytics", "No thanks", "Cookie settings".
- The privacy policy should add one paragraph on Google Analytics: used only with consent, never on form pages, no health information, how to change the choice.

## Other wording changes

- Infusion page, "Browse by how you feel" card: was "Every drip and shot, on the Infusion site." / "infusion.restorationmedical.ca", now "Start with how you feel." / "Browse by concern" (both from the Infusion design file).
- Infusion deep dive, navy block: eyebrow "The full menu lives on its own site" is now "The full menu"; body drops "Our Infusion Therapy site has" and "and a journal"; button "Explore the Infusion site" is now "Explore drips and shots".
- Footer "Our network" no longer lists infusion.restorationmedical.ca.
- Infusion design copy: "personalised", "itemised" and "finalised" spelled with -ize to match the rest of the site.

## Usability fixes (October 2026)

New wording from the fixes after the 30-tester usability test. Every new string is wrapped in `draft()` in these files, so the full list is in the code:

- `src/content/booking-extra.ts` and `src/content/booking-visits.ts`: booking visit types per service ("What is the visit for?", "A health concern", "Bloodwork or ECG", "Flu shot", "First visit with a referral", "An IV drip", "A shot from the Injection Bar" and others), "Who is this appointment for?", claim and insurer fields, the Review step ("Check your booking.", "Nothing is sent until you confirm."), separate reminder and clinic-update checkboxes, the confirmation line when reminders are off, "Closed" and "Today" on the date strip, coverage lines ("Private or work insurance, billed directly", "Self-pay, from $95, HST included") and the per-visit "Bring" lines. Most labels and bring lines reuse approved copy and fail the build if that copy changes.
- `src/content/forms-copy.ts`: registration for someone else, clinic choice, family member blocks, split consent lines, and the contact form's reply line.
- `src/content/forms.ts`: inline form error messages ("Add your first name.", "Check the email address...").
- `src/content/search-synonyms.ts` and the search overlay: "Health advice after hours", "Health811 at 811, any time, day or night", "Close".
- Menus: the About menu column heading "Get in touch" (was "Book About").
- Rehab: "Book a WSIB visit" replaces "Start a WSIB claim" (people who already have a claim thought it was not for them).
- Clinics page: "Thornhill is open now." now reads "Thornhill is seeing patients." (it read as a live open-now status); same change in the Maple waitlist confirmation.

## Usability fixes, round 3

- Booking: "Insurer", "Your note", "If your doctor asked for fasting bloodwork with this visit:" (before the approved fasting line on morning checkups), "You are their daughter." style caregiver line, the insurance coverage line now "Private or work insurance, we bill most plans directly" (was "billed directly"), and the preferred language choice (approved "Preferred language", "English", "Tiếng Việt").
- Registration confirmation: "Registered", "Registered, 2 people", "Clinic".
- Family Medicine menu: "Request a prescription renewal".
- Search: "Close search" (button name).

## Usability fixes, round 4

- Booking: "Health card", "Ontario health card", "From another province", "No health card", "ending", the two notes ("That is fine. Coverage for a card from another province depends on the service...", "That is fine. Without a health card the visit is uninsured...") and coverage lines, "Photo ID, and your health card from another province if you have one."; visit types "Vaccines", "Pregnancy care", "A form or note"; "Self-pay: $120 assessment, $95 follow-up, HST included" (figures from the rehab coverage checker).
- Registration: "Book a first visit", "Use your own email and phone if they do not have one.", and the caregiver consent line "I consent to Restoration Medical collecting this information to register the person named above as a patient, as described in the ".
- Contact: "How should we reply?", "Email or phone", "Email only, please do not call", "A concern or complaint".
- Careers: "You are applying for (role). Add your details below. We keep applications for 12 months.", licence hint.
- Referrals: "Send a referral online" (was "Upload a referral"; there is no upload), "Send a referral." (title while there is no PDF form), "Your phone (optional)", "Urgent", "We review urgent referrals first. Please also call the referral line."
- Phone menu: "Contact us". Search: "Search the site". Cookie banner: "Your current choice: No thanks."

## Clinic answers, October 2026

New and changed wording after the clinic's answers (all wrapped in `draft()`):

- **Female physician FAQ** (women's health page): "Not yet. Both of our physicians are men. Our nurses take care of much of our women's health care, including testing on our women's health day, the last Sunday of every month. A female nurse is present for examinations if you prefer." The hero pill "Female or male physician, your choice" is now "Women's health with our nurses".
- **Out-of-province cards:** new FAQ "I have a health card from another province. Can I be seen?" ("Yes. We may be able to bill your home province directly. Bring your health card and we confirm coverage, and any fee, before the visit."); booking note and coverage line say the same.
- **Physio and chiro prices:** "Physio or chiro assessment $135 plus HST", "Physio or chiro treatment $100 plus HST"; the self-pay intro now says "plus HST". **Massage stays "From $95" from the prototype: confirm the massage price and whether it includes HST.**
- **Women's health day** (`src/content/womens-day.ts`): a section on the women's health page with the next date, a "Women's health day" visit type that only offers the last Sunday of each month (8am to 2pm), an announcement on the home page, and a link from pregnancy care. Wording: "The last Sunday of every month.", "Testing and screening with our nurses at Thornhill, 8am to 2pm. Book a spot, and tell us what you would like done so we can have everything ready." Confirm the hours and which tests are offered.
- **Vaccines page** `/family-medicine/vaccines`: flu shot (from October, everyone 6 months and older), children and teens (Ontario schedule, links to the schedule by age), shingles (publicly funded 65 to 70), pregnancy (flu and whooping cough, Tdap), RSV and pneumonia ("ask us whether you are eligible"), catch-up and records. Coverage line: "Publicly funded vaccines are free with your Ontario health card. We tell you before the visit if one is not." **A physician should review the eligibility wording; funding rules change by season.**
- **Pregnancy care page** `/family-medicine/pregnancy-care`: built from the approved answer "Do you follow pregnancies?" and the women's health chooser ("Referral to obstetrics or midwifery by 12 weeks"), plus a four-step first trimester path (first visit, tests drawn on site, referral by 12 weeks, still your family doctor), "Book a pregnancy visit", and links to vaccines, women's health and children.
- Booking visit types "Vaccines", "Pregnancy care" and "Women's health day" are in the Family Medicine list.

## Facts to confirm

- **Infusion prices.** The Infusion Therapy page drip builder shows per-drip prices (prototype), while the Infusion design says pricing is shared at the consult. Pick one.
- **Infusion team.** First names on `/infusion-therapy/team` come from the Infusion design file. Confirm each person is on staff and agrees to be listed.
- **Drip pages.** Only Healing (Myers') has full copy. The other 11 drip pages show the one-line description and are `noindex` and out of the sitemap until the clinic supplies ingredients, doses and what to expect.
- **Metabolic program.** The page uses only the design file's lines. Confirm the program details and that no outcome or weight-loss claims are wanted.
- **Laser.** No device or treatment list exists. The page says only "Redness, pigment and texture." plus the consult and pricing FAQ.
- **Gift cards** and the **home exercise portal** have no process or system named. The pages point to the front desk and phone.
- **Joint injections** copy (prototype) mentions "ultrasound or X-ray guidance"; the clinic has ultrasound only (see handoff caveats).
- **Second clinic name.** Dr. Nguyen's bio on the team page says "Restoration Medical Woodbridge"; the Infusion team page says "Restoration Medical (Vaughan)". Pick one.
- **Referral form.** `/for-physicians` links to `referral-form.pdf`, which does not exist yet. Supply the clinic's form.
- **Search titles.** Location-led title tags live in `src/content/seo-titles.ts` (for example "Family doctor in Thornhill"). Page headings are unchanged.
- **Wait times and consult lengths** quoted from the prototype (for example "two to three weeks", "20 min" versus "30 minute consult") still need confirmation.
- **Vietnamese FAQ.** The answer to "Do you speak Vietnamese?" mentions a language switch at the top of the site. The switch stays hidden until the Vietnamese pages are ready (`NEXT_PUBLIC_VI_ENABLED`), so reword the answer or launch the translation.
- **Rehab self-pay floor.** The booking coverage line "Self-pay, from $95, HST included" comes from the rehab coverage checker. Confirm it covers chiro and massage too.
