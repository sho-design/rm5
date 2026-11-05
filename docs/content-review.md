# Content needing clinic review

Pages added in October 2026 behind the mega-menu links, and the Infusion pages moved onto this site, reuse approved prototype copy wherever it exists. The strings below are new wording written to join pages together. Each one is wrapped in `draft()` in the source. Approve, reword or remove each before launch (RM-HB-COMMS).

For a one-page checklist grouped by who approves what, see `docs/launch-signoff.md`.

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
- Common claims about IV drips, and what our physicians say. Screening first, medical oversight and registered nurses.
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

## Usability fixes, round 13

- Referral box: "Send it online here, one patient and one service at a time, or fax your own referral letter with any relevant results." (was "One form for all services. Tick the service, then fax it", which read as a printable fax form that does not exist).

- **Children and youth (please review first):**
  - Emergency card first on phones, with a "Call 911" button.
  - "Fever for more than two days, in a child over 3 months".
  - Emergency note adds "or a fever in a baby under 3 months".
- **Header and forms:**
  - Scrolled phone header: "Call 911".
  - Date of birth check: "Check the date of birth: a day, a month and a 4-digit year, for example 14 March 1956."
- **Booking:**
  - "First visit as a new patient" / "Registering too? Keep this visit, and mention it when we call so we do not book you twice."
  - "Reason for the visit".
  - "Not covered by your plan?" (followed by the self-pay price).
  - "Digits only. Leave out the two letters at the end."
  - "… Please give us 24 hours’ notice when you can. For a morning visit, that means calling the day before."
  - "Everything you need for the visit is here."
- **Car accidents and WSIB:**
  - "Your insurer's name, and the claim number if you have one".
  - "We complete the insurer's treatment forms (OCF-18 and OCF-23)".
  - "Book a car accident assessment".
  - WSIB "Your claim number, if you have one".
  - FAQ "Yes. Bring your claim number if you have one; no claim yet is fine, we can open it with you. …"
- **Registration (caregiver):** "Send the registration" / "Also registering from the patient's household (their partner, children or parents)".
- **Emergency note:** "Messages and renewal requests sent on this website are read during clinic hours."

## Usability fixes, round 14

- **Emergency note (please review first):** "Chest pain, pressure or tightness (even if it feels like heartburn, especially with sweating), trouble breathing, …" A tester who thought his chest tightness was heartburn read "chest pain or pressure" as not meant for him.
- **Search with no results:** "Nothing matched. Try a service, a symptom or a clinician name, or call 905-709-3222 during clinic hours. For health advice any time, call Health811 at 811." It used to send people to the clinic phone only, even at night.
- **Emergency words:** sweaty, sweating, cold sweat, clammy, indigestion, tight chest, jaw pain, arm pain.

- **Crisis note (please review first):**
  - "You do not have to wait for us. Talk to someone now: call or text 988, any time, day or night. It is free and confidential."
  - Button: "Call or text 988".
  - "If you might act on thoughts of suicide or are in danger now, call 911."
- **Booking:**
  - "I would like a female nurse present for any examination. Optional." / "A female nurse present" / "You asked for a female nurse to be present for any examination. Both of our physicians are men."
  - "Arrive 10 minutes early for their first visit."
  - "Your visit is tomorrow, so this confirmation is your reminder."
  - "… For a morning visit, that means calling on an earlier clinic day."
  - "Book this drip" / "Book an iron assessment".
  - "Claim details".
  - First visit as a new patient: "Registering too? This visit counts as your first visit, so there is nothing else to book."
- **Pain Centre referral hint (please review):** "Your doctor sends the referral and we call you to book, usually within two to three weeks of it arriving. Already sent? You can ask for a time here; we confirm it once the referral is with us. Not sent yet? There is no need to book."
- **Registration:**
  - Done: "We review it within 2 business days. Already booked a first visit online? Keep it, that is your first visit. If not, we call or email to book it with you. If you told us about a previous clinic, we request your records now."
  - Maple done: "We review it within 2 business days and confirm by phone or email. We contact you to book your first visit once Maple opens. Until then you can be seen at Thornhill. …"
  - Caregiver: "Their partner" / "Their children" / "Their parents", "Also registering from the patient's household", "The patient's preferred language".
  - Notes: "Anything we should know? (optional)" / "For example, if you will come to visits with them, or need an interpreter. Please do not include test results."
- **Car accidents and WSIB:** "… No claim yet is fine, we can open it with you." / "… No claim yet is fine."
- **Iron:** "Iron infusion, $250 with your own iron or $550 with ours".

## Usability fixes, round 15

- **Emergency note (please review first):** "… pain spreading to the arm, jaw or back, sudden shortness of breath or trouble breathing, …". Booking top line: "Chest pain, arm or jaw pain, shortness of breath, signs of a stroke, or a fever in a baby under 3 months? Do not book. Call 911 now." Under the booking note: "What you wrote may need care today. If you have chest pain, arm or jaw pain, shortness of breath or signs of a stroke, or a baby under 3 months has a fever, call 911 now. Not sure? Call Health811 at 811, any time."
- **Iron self-check:** "N selected. Worth mentioning to your doctor, who can tell you whether a blood test makes sense. Already have a low result? Bring it to an iron assessment."
- **Drips:** "Mixed by our nurse at your appointment" on every drip page; "Why a physician-led clinic."; "Every treatment is reviewed by our physician."; "A physician reviews every plan; registered nurses give every treatment. Calm, careful, and accountable."; "Screening first, a physician on site, and nurses who do this every day."; "Where the evidence is still developing, we say so." / "Ask at your consult what the evidence supports for each ingredient, and what we will and will not claim."; "We tell you what is in the bag and the dose at your consult. …"
- **Jobs:** "IV starts, drip administration and patient monitoring, under physician orders."
- **Renewals:** "Sent outside clinic hours? We count the two business days from the next day we are open." / "Asking for someone you care for? Use their name and date of birth, and add your name and relationship in the note." FAQ: "Existing patients can request a renewal by phone or with the online form. Allow two business days, counted from the next day we are open. …"
- **Vietnamese FAQ** (until the switch launches): "Yes. Both physicians and several staff speak Vietnamese. Call 905-709-3222 and ask for Vietnamese, or choose Tiếng Việt as your language when you book or register."

## Clinic answers, 3 November 2026

- **No 911 phone links.** Every "Call 911" is now plain text, so nobody dials by accident. 988 and 811 stay as call buttons.
- **Doctor visit without OHIP: $100 plus HST.** FAQ: "Yes, visitors and people without OHIP are welcome. A doctor visit without OHIP is $100 plus HST ($113 total), and you get a receipt for your travel or private insurance. We confirm the fee before you are seen." Booking note: "That is fine. Without a health card the visit is uninsured: a doctor visit is $100 plus HST ($113 total). …"
- **Pap tests are done by nurses.** Routine screening card "Pap test: Done by our nurses"; women's health day "Both of our physicians are men. Pap tests are done by our nurses, on women's health day and on other days."; screening planner "Book a Pap with our nurses".
- **Maple:** no opening month yet, so the site keeps "Coming soon".
- **Nurses are women.** Women's health day: "Both of our physicians are men. Our nurses are women, and they do Pap tests, on women's health day and on other days." Screening card: "Pap test: Done by our nurses, who are women".
- **Teen reminders use a neutral label.** New children and youth FAQ: "Will a reminder text say what my visit is for?" / "No. Reminder texts and emails for a teen visit do not say what the visit is for. Use your own phone number and email when you book, so messages come to you." Confirm the booking system does this before launch.

## Usability fixes, round 16

- **Emergency (please review first):** the note adds "a child who is very drowsy, limp or hard to wake"; the booking note prompt says the same.
- **Pap and chaperone:** visit "Pap test with a nurse" / "Your health card, and the date of your last Pap if you know it." / "Pap tests are done by our nurses, who are women."; "I would like a nurse in the room for any examination. Our nurses are women. Optional." / "A nurse in the room" / "You asked for a nurse in the room for any examination. Our nurses are women, and they do Pap tests."; Women's health lead "… With your family doctor and our nurses, in a room where nothing is rushed and nothing is awkward to ask."
- **No OHIP:** coverage "Uninsured: a doctor visit is $100 plus HST ($113 total), receipt provided"; bring "Photo ID, and your travel or student insurance details if you have them."; FAQ now starts "You are welcome here."; fees row "Doctor visit without OHIP" / "Receipt provided for travel or private insurance" / "$100 plus HST ($113 total)".
- **Renewals for someone else:** "Who is this request for?", "Me", "Someone I care for", "Patient's first name", "Patient's last name", "Patient's date of birth", "Your name", "Your relationship to them", "Your phone", "The person I am asking for is an existing Restoration Medical patient."
- **Drips:** "Often tired? Start with a family doctor visit and bloodwork. OHIP-insured." / "Book a doctor visit"; home cards "What each ingredient is for, and where the evidence is still developing." and "How pricing works, and what to ask at your consult."; FAQ "… self-pay, with HST included in the price."; search entry "Signature drip" / "Our house blend, the same for everyone".
- **Iron:** "Book an iron assessment" under the self-check.
- **Teens:** "Reminder texts and emails for a teen visit do not say what the visit is for. Use your own phone and email when you book." / "Book a confidential visit for birth control or sexual health"; STI search sub "Confidential and OHIP-insured, at any age".
- **Complaints:** "Your concern goes to our Medical Director. It is logged and reviewed, and we reply within 2 business days."
- **Maple list:** "Leave your details and we will tell you when Maple opens. This list does not register you. To have us as your family doctor, register as a new patient too and choose Maple."

## Usability fixes, round 17

- **Emergency note (please review first):** "Dial 911 now if someone has:" then "Signs of a stroke: face drooping, arm weakness, slurred speech" / "Chest pain, pressure or tightness, even if it feels like heartburn, especially with sweating" / "Pain spreading to the arm, jaw or back" / "Sudden shortness of breath or trouble breathing" / "Heavy bleeding" / "A child who is very drowsy, limp or hard to wake" / "A fever in a baby under 3 months", then "Or go to the nearest emergency department."
- **Booking:** top line "… a child who is limp or hard to wake … Do not book. Dial 911 now."; note "Please do not book for this. What you wrote can be an emergency. … dial 911 now. …"; calendar title "Appointment"; "Your Pap test is with one of our nurses, who are women."; flu "One booking per person. Booking for your family? Book each person at the same time or back to back, and we see you together."; Pap bring "The health card, and the date of the last Pap if known."
- **Iron health note (please review):** "… Call us if you notice a rash or swelling. For chest tightness, trouble breathing or swelling of the face or throat, call 911. …"
- **Pain Centre wait FAQ:** "… Not heard from us after three weeks? Call 905-709-3222 and we check that your referral arrived."
- **Men's health:** "Testosterone test: Best drawn in the morning, so pick a morning time".
- **Vaccines:** "Where: Thornhill, 700 Centre St. Maple is not open yet."
- **Complaints:** "If you are not satisfied with our reply, you can contact the College of Physicians and Surgeons of Ontario, or the College of Nurses of Ontario for nursing care."
- **Forms:** "Your email (optional)"; "Asking for someone you care for? Choose Someone I care for in the form."; registration notes "For example, the name and pronouns you use if they differ from your health card, or if you need an interpreter. …"; rehab "From $95 for massage".

## Clinic decisions, 3 November 2026

- **Iron visit about 3 hours.** "3 visits, about 3 hours each" (hero and steps); FAQ "Wellness drips 45 to 60 minutes. An iron infusion visit takes about 3 hours, including the time we watch you afterwards. …"; infusion path "45 minutes to about 3 hours". Iron page CTA "Start with an iron assessment." / "OHIP-insured, with bloodwork on site. Your doctor goes through the results with you and tells you whether an infusion makes sense." The symptom self-check now sits after prices and the FAQ.
- **Iron left the drip builder.** "Low iron? Iron therapy is a physician-led service, booked separately ›".
- **Doctor languages.** Doctor cards "Speaks English and Tiếng Việt"; Pain Centre FAQ "Yes. Both physicians and several staff speak Vietnamese."
- **One name: Maple list.** "Join the Maple list"; hours row "Maple list: Open now"; announcement "The Maple list is open"; footer "Join the Maple list and we will tell you when we open. To have us as your family doctor, register as a new patient too."; FAQ "… Join the Maple list to hear when it opens, and register as a new patient now to have us as your family doctor there."; About "… The Maple list is open." Registration links from Maple open with Maple chosen.
- **Dial 911.** "Dial 911" and "Emergency? Dial 911" in the top bar, phone menu, emergency box and children's card.
- **Preferred name and pronouns.** Optional fields on registration and booking: "Preferred name (optional)" / "If it differs from the name on the health card. We use it when we talk to you." (or "… their health card … talk to them."), "Pronouns (optional)" / "For example she/her, he/him or they/them."
- **Evidence labels hidden** until a physician defines them (`showEvidenceLabels` in `src/content/infusion-site.ts`).
- **Drip names by contents.** Myers' cocktail (was Healing (Myers')), Antioxidant drip (Radiance), Biotin drip (Hair & Nails, with "Tell us before any blood test, as biotin can affect some results."), Vitamin C, zinc and B vitamins (Seasonal Support), Hydration after exercise (Recover), Hydration drip (Revive), NAD+ drip (NAD+ Longevity, "The evidence for NAD+ drips is still developing."), Hydration in pregnancy (Pregnancy Care). Beauty Elixir removed; Metabolic shows only on the program page. Families: Foundation, Skin and hair, Vitamins, Signature and NAD+, Hydration. Shot lines describe contents ("A B vitamin", "An antioxidant"). By-concern cards reworded without outcomes. Myers' add-ons "Added only on a physician's order, after a quick screening." Old drip addresses redirect. Rename the Square items to match.

## Usability fixes, round 18

- **Booking emergency line:** "Chest pain, pressure or tightness (even if it feels like heartburn), arm or jaw pain, … Do not book. Dial 911 now." / "See the full list of emergency signs".
- **Preferred name:** review key "Preferred name"; first name hint "As on the health card."
- **Pregnancy page (please review):** "Call us the same day: If you are being sick and cannot keep fluids down, feel faint, or have bleeding. For heavy bleeding or severe pain, dial 911."
- **Iron:** health note "… Plan for about 3 hours in all, including screening, the infusion and the time we watch you afterwards. …"; drips FAQ "… The iron assessment and bloodwork are OHIP-insured; the infusion visit itself is not, and the iron product may be covered by your drug plan."; "Three steps, over a few weeks."
- **Search entries for old drip names:** "Drip names changed in November 2026"; "Beauty Elixir is no longer offered. See the skin and hair drips".
- **Dates of birth:** "That date does not exist. Check the day and the month." / "That date is in the future. Check the year."
- **Pain Centre FAQ:** "My doctor sent a referral. What happens now?" / "We call you to book, usually within two to three weeks of the referral arriving. Not heard from us after three weeks? Call 905-709-3222 and we check that your referral arrived."; booking hint adds "as a request" and the three-week call.
- **Vaccines:** "Families: One booking per person. Book each person back to back and we see you together."
- **Infusion:** drips lead "Drips are grouped by what is in them. Pick a group to narrow the list, or browse everything."; steps "We review your health first, and we adjust or decline a treatment if it is not right for you." / "Your treatment" / "Our physician reviews every plan, and any change to a drip is on a physician's order. No pressure."; "An elective wellness service. Not a treatment for any disease."
- **Chaperone confirmation:** "You asked for a nurse in the room for any examination. Our nurses are women."

## Usability fixes, round 19

- **Emergency box:** "Other help lines" above 988 and 811; sign "A seizure, or a child who is very drowsy, limp or hard to wake"; booking line adds "a seizure".
- **Pregnancy:** Rehydration "Pregnant?" / "See a doctor first. Book a pregnancy visit, or call Health811 at 811 when we are closed."; pregnancy page "… When we are closed, call Health811 at 811 for advice any time. …"
- **Drips:** "Formerly" line on drip pages; "Book this drip"; "All drips"; "Nine drips, one standard"; coverage "Iron assessment OHIP-insured; drips and infusions are an uninsured fee".
- **Compliance:** Standards "We check each product's Health Canada status before we use it, buy from licensed Canadian distributors, …"; rehab "Billed to your insurer"; home slide "physician-led and OHIP-covered with a referral."
- **Forms:** "health card name:" label on the registration confirmation; registration lead "Two minutes now. We confirm within 2 business days. If you have not booked a first visit online, we book it with you: a longer appointment so your doctor can get to know you."; Maple hours "Taking names now".

## Usability fixes, round 20

- **Booking:** urgent note pause "Before you book: is this happening now? If so, please dial 911 instead of booking." / "It is not happening now. Continue my booking ›"; reminders "Reminders give the day and time only, never the reason for your visit." (shown for sensitive reasons; confirm this holds for every reminder); Pap bring "Your health card, and the date of your last Pap test if you know it."
- **Drips:** every drip page "Pregnant, being sick or cannot keep fluids down? A drip is not the place to start. Call us the same day at 905-709-3222, or Health811 at 811 when we are closed." with "Pregnancy care ›"; anti-nausea add-on "Added to any drip. Pregnant or being sick? See a doctor first."; the "Formerly" line is removed; "Often tired?" on energy drips only.
- **Infusion hub:** "Clinic for assessment, labs and infusion" / "No separate lab trip. Iron is an assessment visit, then 3 infusion visits."
- **Compliance:** metabolic "Claims that a drip detoxes or burns fat."; iron description "your doctor may suggest an iron infusion course over three visits".
- **Pain Centre first visit lead:** "Already referred? There is no need to book. We call you, usually within two to three weeks of the referral arriving."
- **Forms:** renewal "Add their date of birth."

## Usability fixes, round 21

- **Infusion chooser:**
  - Nausea option: "See a doctor first" / "Being sick or not keeping fluids down is a reason to see a doctor, not to start with a drip. Call us the same day, or Health811 at 811 when we are closed."
  - Facts: "Family medicine, OHIP-insured"; "Pregnant? Book a pregnancy visit, or call us the same day"; "Dial 911: Vomiting blood, a stiff neck, severe belly pain, or very drowsy" (physician to confirm).
  - Button: "Book a doctor visit".
  - Recovery add-on: "Vitamin C".
- **Drip pages:** "Being sick or cannot keep fluids down? A drip is not the place to start. Call us the same day at 905-709-3222, or Health811 at 811 when we are closed. Pregnant? Please see a doctor before any drip."
- **Booking:**
  - Pause: "Before you book: does anyone have one of the signs above right now, or on and off today? Signs that come and go count. If so, please dial 911 instead of booking." / "No, none of these signs. Continue my booking ›"
  - Date of birth: "Their date of birth (optional)" / "Helps us find the right chart when names are common."
  - Claim dates: "accident on" / "injury on".
  - No card, non-family visit: "That is fine. Without a health card the visit is uninsured. We confirm the fee before the visit and give you a receipt."
  - Quebec: "Quebec cards cannot be billed directly for doctor visits. You pay at the visit, $100 plus HST ($113 total) for a doctor visit, and claim it back from RAMQ with the receipt we give you." (confirm that the $100 fee applies to Quebec cards)
- **FAQ:**
  - Out of province: "Yes. For most provinces we may be able to bill your home province directly. Quebec cards cannot be billed directly: you pay at the visit and claim it back from RAMQ with our receipt. Without billing, a doctor visit is $100 plus HST ($113 total). …"
  - No OHIP adds: "Booking for a newborn whose card has not arrived yet? Choose Ontario health card and leave the number blank."
- **Pain Centre first visit lead** adds: "Not heard from us after three weeks? Call 905-709-3222."

## Usability fixes, round 22

- **Booking:**
  - After the pause: "You told us about signs we take seriously. If they come back or get worse before your visit, dial 911. Not sure? Call Health811 at 811, any time."
  - Review: "Born" before the patient's date of birth.
- **Infusion:**
  - The anti-nausea add-on is removed from the builder.
  - "Not sure" button: "Book a family medicine visit".
  - Iron tally adds "Chest pain, fainting, or short of breath at rest? Dial 911."
  - Injection Bar: "Being sick, cannot keep fluids down, or pregnant? Please see a doctor before any shot. Call us the same day at 905-709-3222, or Health811 at 811 when we are closed."
- **Privacy policy:** "Website analytics runs only if you allow it in Cookie settings, and never on booking, registration, contact, referral, renewal or careers pages. If you allow it, Google Analytics stores an identifier in your browser to count return visits. It does not receive your name or health information. Your choice is saved in your browser, and you can change it at any time under Cookie settings at the bottom of every page." (privacy officer)
- **Contact:**
  - Email-only reply: "We reply by email within 2 business days."
  - The complaint hint and done text add "Raising a concern does not affect your care." The hint names "long waits".
- **FAQ and pages:**
  - No OHIP adds: "Student or travel plan, such as UHIP? We give you a receipt to claim from your plan."
  - Children: "Newborn card not here yet? Leave the number blank when you book, and bring the card once it arrives."
  - Vaccines: "If a vaccine is not funded for you, we tell you the cost before it is given."

## Usability fixes, round 23

- **Booking:**
  - Infant fever stop: "A fever in a baby under 3 months needs to be seen now, not at a later visit. Please dial 911 or go to the nearest emergency department. Not sure? Call Health811 at 811, any time. We cannot book this online." (physician)
  - After the pause: "If anything changes or gets worse before your visit, dial 911."
  - The urgent line adds "a head injury with vomiting".
  - Fasting: "No fasting times left today. Fasting already? Call us at 905-709-3222 to ask about a draw this morning, or book a time before 10am on another day."
  - Interpreter on review: "phone interpreter at no cost".
- **Video and phone:**
  - "Keep your phone nearby at your visit time. Missed our call? Call us back at 905-709-3222."
  - "Use a phone, tablet or computer with a camera, somewhere private. No link by your visit time? Call 905-709-3222."
  - "Have ready".
- **Ocean hand-off:**
  - "Next you go to Ocean, the secure booking and forms system we use with our medical records, at <address>. It shows our name. What you enter goes straight to your chart with us, not through this website." (confirm once Ocean is set up)
  - Buttons: "Continue to Ocean to choose a time ›", "… to register ›", "… to request a renewal ›".
  - Lead: "Tell us which service you need. You choose a time and add your details on the next page."
  - Register: "Have ready: each person's health card and date of birth, your address, and your previous family doctor's name if you had one. Registering your family too? Each person gets their own registration." (confirm with the Ocean form)
  - Sensitive booking: "Booking for yourself? Use your own phone and email. Reminders give the day and time only, never the reason for your visit."
- **Clinics:** "Chest pain, signs of a stroke or trouble breathing? Do not walk or drive here. Dial 911." Maple "Opening: No date set yet".
- **Emergency box:** "Dial 911 now if you or someone else has:".
- **Renewal hint:** "Name and strength, one per line. Run out today or tomorrow? Please call us at 905-709-3222 or ask your pharmacist instead."
- **Injectables FAQ:** "Pregnant or breastfeeding?" / "Tell us when you book. We talk it through at your consult before any treatment, and some treatments wait until after pregnancy and breastfeeding." (physician)

## Physio or chiro explainer (clinic request, 2026-11-04)

On the Physiotherapy and Chiropractic pages, after "What it costs", and as the first Rehab & Recovery FAQ. Text is in `src/content/rehab-compare.ts`. Physio and chiro leads to review the scope lines.

- **Title:** "Physio or chiro?" / "Both are regulated health professionals. Both assess you first and give you a plan, and both cost the same here."
- **Physiotherapy:**
  - Focus: "How you move: muscles, joints and strength. Back and neck pain, sprains, sports injuries, and getting back to activity after surgery."
  - A visit often includes: "Guided exercise, hands-on treatment, and a routine to do at home."
  - Regulated by: "College of Physiotherapists of Ontario".
- **Chiropractic:**
  - Focus: "The spine and joints, most often back and neck pain."
  - A visit often includes: "Spinal and joint adjustment, soft tissue work, and exercises."
  - Regulated by: "College of Chiropractors of Ontario".
- **Price line:** "Either one: assessment $135 plus HST ($152.55 total), treatment $100 plus HST ($113 total). We bill most insurers directly."
- **Not sure:** "Not sure which? Tell us what is going on at an initial assessment, and we suggest which to start with." with "Book an initial assessment ›".
- **FAQ:** "Should I see physio or chiro?" / "Either can be a place to start for back or neck pain. Physio focuses on movement, strength and recovery from injury or surgery. Chiro focuses on the spine and joints, often with adjustments. Not sure? Book an initial assessment and we suggest which to start with. Both cost the same."

## Iron therapy page redesign (clinic request, 2026-11-04)

Clinic fact: iron infusions run on Tuesday, Saturday and Sunday; the assessment can be any open day (added to CLAUDE.md). New sections, text in `src/content/iron.ts`:

- **Hero:** "Physician-led. Nurse-administered. Infusions on Tuesday, Saturday and Sunday at Thornhill." Second button "Plan your three visits".
- **One visit, start to finish:** "About 3 hours, in four parts."
  - Check in: "A short nurse screening, your vitals, and a chance to ask questions."
  - IV placed: "A small IV in your arm. Your nurse stays close throughout."
  - Infusion: "500 mg runs in while you sit back in a lounge chair. Read, work or rest."
  - 30 minutes after: "We watch you for 30 minutes, then you go back to your day."

  The bar widths are illustrative; only the total and the 30 minutes are clinic facts. Then "Eat normally beforehand. No fasting, and you can drive home." and the three days with hours (Tuesday "Evenings" 3pm to 9pm, Saturday "All day" 8am to 4pm, Sunday "Mornings" 8am to 2pm).
- **Course planner (interactive):** "Plan your course" / "See your three visits on a calendar." The visitor picks:
  - a first infusion day (the next Tuesdays, Saturdays and Sundays, starting 3 days out);
  - 1 or 2 weeks between visits;
  - clinic-supplied or own iron.

  It shows the three visit dates, the repeat bloodwork window (4 to 8 weeks after the last visit), the course total ($1,650 or $750 plus the iron) and "About 9 hours, over 3 visits". Fine print: "A planning guide, not a booking. Your physician confirms the iron, the dose and the number of visits after your assessment, and we book the dates with you." Nothing is stored.
- **Step 3:** "On a Tuesday, Saturday or Sunday. A nurse places a small IV and you relax in a lounge chair while 500 mg runs in, then we watch you for 30 minutes. About 3 hours in all. Repeat one to two weeks later until the course is done."
- **Latest start (clinic answer, 2026-11-04):** 6:30pm Tuesday, 1pm Saturday, 11am Sunday. The day cards show "Last start …" with "Open …" underneath, and each planner visit says "Start by …". Saturday reads "Daytime" instead of "All day".
- **New FAQ:** "Which days are infusions?" / "Tuesday, Saturday and Sunday at Thornhill. A visit takes about 3 hours, so the last start is 6:30pm on Tuesday, 1pm on Saturday and 11am on Sunday. Your assessment can be on any day we are open."

## Infusion pricing page graphics (2026-11-05)

- **Principles:** shown as four icon cards (same text as before).
- **"Who pays for what.":**
  - "Covered by OHIP" ($0): "Iron assessment with a physician", "Bloodwork for iron, done on site", "Ontario health card required".
  - "You pay, receipt provided": "IV drips", "Injection Bar shots", "Iron infusion visits", "Prices include HST. Many private plans cover the iron itself."
- **"A price guide, per visit."** / "HST included. Your written plan at the consult has the exact amount." Bars on one scale:
  - "IV drips" from $150. This is the prototype's lowest drip fee (Hydration); confirm it for the new drip names, or remove the row.
  - "Iron infusion, your own iron" $250.
  - "Iron infusion, our Monoferric 500 mg" $550.

  Note: "Drip prices vary by drip and are confirmed at your consult. An iron course is 3 visits."
- **Memberships:** a decorative twelve-month "A steady rhythm" row, no numbers. The membership wording itself ("Priority booking") is still on the compliance list.

## Footer redesign (2026-11-05)

- Each clinic card has a map that loads from Google only when "Show map" is tapped (nothing from Google loads before that), plus "Directions ›".
- Division colour dots on the link columns.
- Links grouped into "For patients", "For doctors" ("Send a referral") and "Policies".
- Text size and contrast in an "Easier to read" card.
- A dark sign-off band with "Refined by Medicine." and the land acknowledgement.
- The privacy policy should mention that the map, when opened, loads from Google (privacy officer).

## Drips page graphics (2026-11-05)

- The page leads with the being-sick and pregnancy line (the same as on each drip page).
- Each card has an IV bag drawing in the family colour, and "What's inside" chips taken only from what the menu already says. Foundation, Antioxidant and Signature also say "Confirmed at your consult". The chips are in `dripInside` in `src/content/infusion-site.ts`; nurse lead to confirm.
- A "Cards / Compare what's inside" switch shows a table of drips against ingredients, with the note "Doses are set with you at your consult, after screening. Each drip is mixed at your appointment."
- Shots show as small vials. The subtitle is "Quick shots, about 10 minutes. Screened first, like every drip."

## Drips: finder, compare and drip pages (2026-11-05)

- **Find a drip:** "What brings you in?" leads to drips that fit, matched by occasion and contents. No results are promised, and the lead says "A consult confirms what is right for you, and we may suggest something else, or nothing at all."
  - "After exercise or a long day outdoors" → Hydration after exercise, Hydration.
  - "Travel or a busy week" → Hydration, Foundation.
  - "A regular vitamin routine" → Myers', Vitamin C zinc and B, Foundation.
  - "A skin and hair routine" → Biotin, Antioxidant.
  - "Curious about NAD+" → NAD+.
  - "Not sure yet" → consult.
  - "I am unwell, being sick or pregnant" → "Please see a doctor first." with "Book a doctor visit".

  Physician and compliance to review the mapping.
- **Compare:** a "+ Compare" button on each card (up to 3). A tray slides up from the bottom, and "Compare side by side ›" shows family, "About 45 minutes" and what's inside, with "Book this drip". Drip pages link to "Compare with other drips ›", which opens the tray with that drip already picked.
- **A drip visit:** "About an hour, start to finish."
  1. Screening, "About 10 minutes with your nurse".
  2. Mixed for you, "mixed at your appointment, after screening. Never made ahead."
  3. The drip, "About 45 minutes in a lounge chair".
  4. Back to your day, "Your nurse removes the IV and checks in with you before you go."

  Nurse lead to confirm the hour in all.
- **Drip pages:** a large animated bag in the family colour (drops fall when motion is allowed), "What's inside" chips (only on pages without full copy), "Similar drips", and the visit timeline.

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

## CPSO advertising review (2026-11-03)

Changed so the site does not compare us with other providers or promote a paid service before an assessment (O. Reg. 114/94 Part III, CPSO Advertising policy). All new lines are `draft()` and need clinic approval.

- Removed the "Typical IV lounge" column from the infusion comparison table. It now lists only how an infusion works here ("How an infusion works here.").
- "Not a drip bar" lines reworded to describe only the clinic: "Physician-led, with screening first." Honest menu title is now "Common claims, and what we say." with "Claims you may see online".
- Home, "Low energy" path: step 3 was "Iron infusion, same week". Now "Treatment, if your results show it: for low iron, usually tablets first. An iron infusion only if tablets are not right for you." Step 2 no longer says "we book step three". Outcome no longer says "books the fix".
- Iron self-check intro: dropped "Three or more is a good reason to check your ferritin". Now "These feelings have many causes, and low iron is only one. A blood test, ordered by your doctor, is the only way to know."
- Infusion concerns, "Low energy & fatigue": now goes to a family doctor visit (OHIP-insured) instead of the drips list.
- Clinic fact: drips are mixed at the appointment, never ahead. New row in the infusion table: "When your drip is made" / "Mixed by our nurse at your appointment, after screening. Never made ahead."
- Kingmaker renamed "Signature drip" (`/infusion-therapy/drips/signature`, the old address redirects): "Our house blend, the same for everyone. Ingredients and doses are confirmed with you at your consult." Square sells it as IV Kingmaker and IV Queenmaker, the same recipe; a men's or women's drip implies a sex-specific benefit. Rename the Square items to match when convenient. Name to be confirmed once the ingredients are known.
- Still open, needs clinic decision: drip names that carry health claims ("NAD+ Longevity", "Beauty Elixir", "Bones & mood", "Healing (Myers')"), the evidence badges, and "Low energy & fatigue" as a drip "helps with" label.
