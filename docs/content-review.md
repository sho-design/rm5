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

## Usability fixes, round 5

- Booking: "Registered but not seen yet? Choose New patient.", "Which province or territory?", the Quebec note ("Quebec cards cannot be billed directly for doctor visits. You pay at the visit and claim it back from RAMQ with the receipt we give you. We tell you the fee before the visit.") and its coverage line, "Your appointment is today, so there is no reminder.", "Your note", "Current step: ", "Women's health days at Thornhill, the last Sunday of each month.", "Your first visit with physio or chiro. Choose this if you are new to rehab here.", visit labels "Vaccines, including flu" and "Flu shot only". The Tiếng Việt hint reuses the approved FAQ line "Both physicians and several staff speak Vietnamese."
- Vaccines page, flu card: "Publicly funded, so no cost to you. Due for other vaccines too? Tell us when you book and we plan them together."
- Women's health day card: "Testing and screening done by our nurses..." and "Both of our physicians are men. On women's health day, our nurses do the testing." Women's hero pill: "Care in English and Tiếng Việt".
- Rehab prices now show totals: "$135 plus HST ($152.55 total)", "$100 plus HST ($113 total)" (13% HST).
- Registration: the relationship hint is now "For example parent, adult child, partner or caregiver."; the "Book a first visit" button was removed.
- Booking: "Choose how you are paying.", "Your details" (screen reader group name). Children and youth: "On this page", "Sick visits", "Care by age", "Vaccines by age", "School forms", "Our doctors".

## Usability fixes, rounds 6 and 7

- Booking: "Booking is for one visit. To have us as your family doctor, register as well." and "Register as a patient"; "Your health card from another province." and "Photo ID." (replaces "Your health card from another province, or photo ID if you do not have one."); after a morning fasting draw, "Fast 8 to 12 hours before your visit. Nothing to eat after midnight, water is fine. Take your usual medications unless your doctor said otherwise."; screen reader only "N times on <day>.".
- Children and youth triage: "Call or book a visit with us" (was "Book a same-week visit with us"), tag "When we cannot see you" (was "Same day"). Confirm whether sick children can often be seen the same day.
- Pregnancy care: coverage "OHIP-insured. Bring your health card. Card from another province? We may be able to bill your home province."; glance "Who you see: One of our physicians, with our nurses for testing".
- Fees page: "Prices on our service pages", "These are already published with each service. HST is shown as on the service page.", "Iron therapy".
- Iron: "Per visit, HST included. Course of 3: $750, plus the iron from your pharmacy" on the bring-your-own card (3 x $250).
- Infusion: "Twelve drips, one standard" (was "Thirteen", there are 12 drip pages); "Energy, skin, recovery, healthy aging." (was "Energy, immunity, skin...", no immunity claims); drip builder iron is "Iron (Monoferric 500 mg)", $550, 90 minutes (was "Iron (Venofer)", $400, 120 minutes), to match the iron page.
- Referrals: "Fax a referral or send it online, and we will contact your patient directly to book...", "One form for all services. Tick the service, then fax it with any relevant results.", "Urgent referrals: tick Urgent online or write URGENT on a faxed form, and call the referral line.", and on the confirmation "Faxing imaging or notes for this patient? Write "online referral" and the patient's date of birth on the cover page so we can match them."
- FAQ "Still stuck?": "We reply within 2 business days" (was "one business day", the contact form says 2).
- Rehab menu: "WSIB and work injuries".

## Usability fixes, round 8

- Booking: visit "Results or follow-up"; "How would you like the visit?" with "At the clinic", "By phone", "By video"; "By phone. We call you at the number you gave us." and "By video. We email you a link before the visit." **Confirm the clinic does phone and video visits this way.**
- Booking: "Another language", "Which language?", "Tell us and we will arrange an interpreter where we can." **Confirm interpreters.**
- Booking: "Times on <day>", "Your relationship: <relationship>." (was "You are their ..."), relationship hint adds spouse, "Comfortable clothing." for massage, vaccine coverage "Publicly funded vaccines are free with your Ontario health card. We tell you before the visit if one is not." (same as the vaccines page), "You booked an appointment in this tab. Your confirmation is in your email. To change it, call us.", no-reminder line "A confirmation is on its way to the email you gave us. We will not send reminders, so add the visit to your calendar."
- Massage page button: "Book a massage".
- Standards lead: the count now follows the list ("Nine commitments").
- About menu: "Fees" replaces the second "FAQ".

## Usability fixes, round 9

- Booking confirmation: "Book another visit" (was "Reschedule or cancel"), "To change or cancel, call 905-709-3222 during clinic hours. Please give us 24 hours notice when you can.", "We arrange a phone interpreter for <language>, at no cost to you." Language hint: "Tell us the language and we arrange a phone interpreter at no cost to you." (both follow the approved interpreter FAQ). Times label: "Times for <day>".
- Cancellation FAQ adds "To cancel, call 905-709-3222 during clinic hours." **Confirm that calling is the way to cancel, and whether voicemail counts.**
- Visit type "Chronic care review".
- Search result "Sexual health and STI testing": "Confidential, with your family doctor, OHIP-insured". **Confirm STI testing is offered to every patient, not only under Men's health.**
- Reminders checkbox now starts ticked (transactional care messages, not CASL marketing). **Confirm with the privacy officer.**

## Usability fixes, round 10

- **Emergency note (please review first):** "Chest pain or pressure, trouble breathing, signs of a stroke or heavy bleeding: call 911 now, or go to the nearest emergency department.", "Call 911", "For health advice any time, day or night, call Health811 at 811.", "Online requests are read during clinic hours." Top bar while closed and phone menu: "Emergency? Call 911".
- Visit type "Well-baby or newborn check". No-card note adds "Booking for a newborn whose card has not arrived yet? Choose Ontario health card and leave the digits blank." Second booking: "You already booked a visit. This books another one. To move or cancel the first, call us." Summary key "Where".
- Aesthetics FAQ: "Is this the place for a changing mole or a rash?" / "No. A mole that changes, a spot that bleeds or will not heal, or a new rash is a family medicine visit, covered by OHIP. Book a health concern with Family Medicine."

## Usability fixes, round 11

- **Emergency note (please review first):**
  - "Chest pain or pressure, trouble breathing, heavy bleeding, or signs of a stroke (face drooping, arm weakness, slurred speech): call 911 now, or go to the nearest emergency department."
  - "Thoughts of suicide or self-harm?" / "Call or text 988, any time, day or night."
  - "Not sure if it is urgent? Health811 gives health advice any time, day or night." / "Call Health811 at 811" / "Visit health811.ontario.ca".
  - "Booking requests and messages sent on this website are read during clinic hours."
  - Phone menu: "Call clinic". Booking form top: "Chest pain, trouble breathing or signs of a stroke? Do not book. Call 911 now." / "Not sure? More help".
- **Renewals:**
  - "Running out sooner than two business days?" / "Call us at 905-709-3222 during clinic hours. Your pharmacist can also often extend a regular prescription for a short time. If you have no medication and feel unwell, call Health811 at 811 or 911."
  - Confirmation: "If you will run out before then, call us at 905-709-3222 or ask your pharmacist about a short extension."
- **Booking:**
  - Referral hint: "Choose this once your doctor has sent the referral. Not sent yet? There is no need to book: your doctor faxes it and we call you to book."
  - Well-baby: "Bring the yellow immunization card, and the health card if it has arrived." / "Newborn whose health card has not arrived yet? Keep Ontario health card and leave the digits blank. Add your baby's age in the note."
  - WSIB and MVA: "New claim or already in treatment, both start here. Say physio or chiro in the note, and how many sessions you still need." / "Your WSIB claim number, if you have one."
  - Vaccines: "Vaccines, including flu and catch-up", "Any vaccine records you have, from Ontario or another country. No records? Come anyway, and we plan from there.", "Your health card, if you have one.", "We tell you before the visit if a vaccine is not."
  - "Your first visit stays booked: …. This books a second, separate visit. To move or cancel the first, call us."
  - "Your visit is today, so we do not send a reminder."
  - "… Please give us 24 hours notice when you can, For a morning visit, that means calling the clinic day before." / same day: "To change or cancel, call 905-709-3222 as soon as you can."
- **Fees and FAQ:**
  - Fees eyebrow "Fees". Lead: "What OHIP does not cover, and what it costs. We tell you the fee before any uninsured service, and every payment comes with a receipt."
  - "Anything not listed below? Ask us." Rows "IV drip: …" ("HST included, plus a 10 minute nurse screening") and "Medical Aesthetics: …" ("Per visit. Your exact price is given in writing at the consult.").
  - Rehab billing FAQ ends "Self-pay rates are on our fees page and at the desk."
  - No OHIP: "Yes, visitors and people without OHIP are welcome. The visit is uninsured: the front desk tells you the fee before you are seen, and you get a receipt for your travel or private insurance. Call 905-709-3222 to ask the fee before you book."
  - Aesthetics consult "A 20 minute consult" (was 30; the page says 20 elsewhere).
- **Consistency:**
  - Home iron card "About 90 minutes in a lounge chair with a nurse nearby." (prototype said three hours; iron page says about 90 minutes).
  - Bloodwork hero ends "Results go straight to the doctor who ordered them."
  - Outside requisition: "… results go to the doctor who ordered them, who shares them with you. You can book online. If you are not sure we can process a test, call ahead."
- **Search rows:**
  - "Mood, anxiety and sleep" / "Talk to a family doctor, OHIP-insured. In crisis, call or text 988".
  - "A mole or skin spot that is changing" / "See a family doctor first, OHIP-insured".
  - "Memory concerns and dementia care" / "With your family doctor, OHIP-insured. Family and caregivers are welcome at the visit".
  - "Annual physical" / "Khám sức khỏe, OHIP-insured".
  - STI sub "Confidential and OHIP-insured. Prefer testing with our nurses? Choose women's health day".
  - Other scripts: "Search works in English and Vietnamese for now. Call 905-709-3222 and ask for an interpreter, at no cost to you."
- **Contact and Maple:**
  - Complaint topic: "Concerns and complaints, including billing mistakes, go to our Medical Director. Each one is logged and reviewed, and we reply within 2 business days."
  - Maple list done: "Want a family doctor with us? The list only tells you when Maple opens. Register as a new patient too, and choose Maple." / "Register as a new patient".

## Usability fixes, round 12

- **Children and youth (please review first):** "A fever in a baby under 3 months" moved to the Emergency card ("Go to the emergency department or call 911"). Teen panel link: "Birth control and sexual health: confidential at any age".
- **Booking:**
  - Top line: "Thoughts of suicide or self-harm? Call or text 988."
  - Rehab: "New to rehab here? Your first visit with physio or chiro is an initial assessment." / "Choose Initial assessment".
  - Existing claim: "Already in treatment? Add the claim number if you have it handy, or leave it blank."
- **Registration:**
  - "Optional. Newborn whose card has not arrived yet? Leave it blank."
  - "Already booked a visit online? Keep it, and mention it when we call so we do not book you twice."
  - "Another language" / "Which language?" (booking wording).
- **What's new:** "Flu shots are available now".

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
- **Quebec cards.** Booking says Quebec cards cannot be billed directly for doctor visits (Quebec is not part of reciprocal medical billing) and patients pay and claim back from RAMQ. Confirm this matches how the clinic handles Quebec patients.
