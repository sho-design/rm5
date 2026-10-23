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

## Other wording changes

- Infusion page, "Browse by how you feel" card: was "Every drip and shot, on the Infusion site." / "infusion.restorationmedical.ca", now "Start with how you feel." / "Browse by concern" (both from the Infusion design file).
- Infusion deep dive, navy block: eyebrow "The full menu lives on its own site" is now "The full menu"; body drops "Our Infusion Therapy site has" and "and a journal"; button "Explore the Infusion site" is now "Explore drips and shots".
- Footer "Our network" no longer lists infusion.restorationmedical.ca.
- Infusion design copy: "personalised", "itemised" and "finalised" spelled with -ize to match the rest of the site.

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
