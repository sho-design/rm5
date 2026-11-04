# Launch sign-off checklist

One page for the clinic to approve before restorationmedical.ca goes live. Each line points to the full wording in `docs/content-review.md` (CR). Tick it, or write the change beside it. New wording is marked `draft()` in the code. Once a section is approved, we remove the marker.

Plan for about 1 hour with a physician, 30 minutes with the nurse lead, 30 minutes at the front desk and 15 minutes with the privacy officer.

## 1. Physician (Dr. Nguyen), safety first

- [ ] **Emergency note:** chest pain "even if it feels like heartburn", stroke signs, heavy bleeding, fever in a baby under 3 months, then call 911. CR rounds 10, 11, 13, 14.
- [ ] **Crisis note:** "Call or text 988" first, then "If you might act on thoughts of suicide or are in danger now, call 911." CR round 14.
- [ ] **Children and youth triage:** fever under 3 months is on the emergency card, "Fever for more than two days, in a child over 3 months", and "Call or book a visit with us". Confirm whether sick children can often be seen the same day. CR rounds 6, 12, 13.
- [ ] **Renewals:** "Running out sooner than two business days?" and the pharmacist extension line. CR round 11.
- [ ] **Vaccines page:** eligibility for shingles (65 to 70), RSV, pneumonia and pregnancy (flu, Tdap). Funding rules change by season. CR "Clinic answers".
- [ ] **Pregnancy care:** four-step first trimester path, with referral by 12 weeks. CR "Clinic answers".
- [ ] **CPSO changes:** the low energy path ("usually tablets first"), the iron self-check intro, and the comparison table with no competitor column. CR "CPSO advertising review".
- [ ] **Drip names and evidence labels** (Established, Supported, Emerging, Supervised). Define each label, or remove the labels. CR "CPSO advertising review", and the drip names section below.
- [ ] **Metabolic program:** confirm details, and that no weight-loss or outcome claims are made. CR "Facts to confirm".
- [ ] **Joint injections:** the prototype says "ultrasound or X-ray guidance", but the clinic has ultrasound only. CR "Facts to confirm".
- [ ] **Teen privacy:** "Birth control and sexual health: confidential at any age". CR round 12.
- [ ] **Aesthetics FAQ:** a changing mole or new rash is a family medicine visit. CR round 10.
- [ ] **Pain Centre referral hint:** "usually within two to three weeks of it arriving". CR round 14.

## 2. Nurse lead (infusion and women's health)

- [ ] **Women's health day:** 8am to 2pm on the last Sunday, and which tests are offered. CR "Clinic answers".
- [ ] **Female nurse present** for examinations, as offered in booking. CR round 14.
- [ ] **Drip pages:** only Healing (Myers') has full copy. Supply ingredients, doses and what to expect for the other 11, or keep them hidden from search. CR "Facts to confirm".
- [ ] **Signature drip** (was Kingmaker, sold in Square as IV Kingmaker and IV Queenmaker): supply its ingredients so the name and line can say what is in it. CR "CPSO advertising review".
- [ ] **Drip preparation:** the new line "Mixed by our nurse at your appointment, after screening. Never made ahead." Confirm the nurse mixes every drip, and that each ingredient comes from a Health Canada authorized vial (has a DIN). CR "CPSO advertising review".
- [ ] **Iron:** about 90 minutes, $250 with your own iron or $550 with ours, Monoferric 500 mg. CR rounds 6, 11, 14.
- [ ] **Infusion team page:** each first name is on staff and agrees to be listed. CR "Facts to confirm".
- [ ] **Drip prices:** show them per drip (as now), or say "shared at your consult". Pick one. CR "Facts to confirm".

## 3. Front desk and clinic manager (how things work)

- [ ] **Prices:** massage "From $95" (HST included or not?), the rehab self-pay floor for chiro and massage, and physio and chiro at $135 and $100 plus HST. CR "Clinic answers", "Facts to confirm".
- [ ] **Fees page:** enter the uninsured fee list in the admin (Site settings > Fees).
- [ ] **Cancelling:** by phone during clinic hours, with 24 hours' notice. Does voicemail count? CR rounds 9, 11.
- [ ] **Phone and video visits**, and phone interpreters at no cost. CR rounds 8, 9.
- [ ] **Registration replies** within 2 business days. Records are requested from a previous clinic. CR round 14.
- [ ] **Out-of-province and Quebec cards:** "we may be able to bill your home province", and Quebec patients pay and claim from RAMQ. CR rounds 4, 5, "Facts to confirm".
- [ ] **WSIB and car accidents:** "No claim yet is fine, we can open it with you", and the OCF-18 and OCF-23 forms. CR rounds 13, 14.
- [ ] **STI testing:** offered to every patient, not only under Men's health. CR round 9.
- [ ] **Gift cards:** ask at the front desk. Is there a process? CR "Facts to confirm".
- [ ] **Second clinic name:** "Woodbridge" or "Vaughan" (Dr. Nguyen's bio and the infusion team page). The Maple opening date. CR "Facts to confirm".
- [ ] **Referral form PDF** for `/for-physicians`: supply it, or keep the online form only. CR "Facts to confirm".
- [ ] **Vietnamese:** launch the translated pages, or reword the FAQ that mentions a language switch. CR "Facts to confirm".

## 4. Privacy officer

- [ ] **Reminder checkbox ticked by default:** these are care messages, not marketing (CASL). CR round 9.
- [ ] **Cookie banner wording**, and a privacy policy paragraph on Google Analytics: consent only, never on form pages. CR "Patient helpers".
- [ ] **Form destinations:** booking, registration and renewals open Ocean (OSCAR Pro) once the `NEXT_PUBLIC_OCEAN_*` links are set in Vercel, so that information goes straight to the chart. Contact, careers, referrals and the Maple list still send to a PHIPA-safe inbox set in `FORM_ENDPOINT_*`. Forms with neither show an error. See `docs/forms.md`.
- [ ] **Registration notes field:** "Please do not include test results." CR round 14.

## 5. Low risk, approve in bulk

- [ ] **Photo descriptions** (alt text), page headings and short labels, such as "What to bring", "At a glance" and "By service". CR "Service and patient topic pages", "Infusion pages".
- [ ] **Booking and form labels and error messages.** CR "Usability fixes" sections and `src/content/forms.ts`.
- [ ] **Search wording.** CR rounds 11, 14.

## Before switching the domain

- [ ] Add restorationmedical.ca and the service domains in Vercel (bare and www), and set DNS.
- [ ] Remove `draft()` from approved sections, rebuild and check the site.
