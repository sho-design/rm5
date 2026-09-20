# Handoff: Restoration Medical website

## Overview
Full public website for Restoration Medical, a physician-led multi-service clinic in Thornhill, Ontario (Maple opening 2026). Five service lines: Family Medicine, Pain Centre, Infusion Therapy, Medical Aesthetics, Rehab and Recovery. The site is a brochure plus booking funnel plus job board. It stores no patient information.

## About the design files
Everything in this bundle is a **design reference built in HTML**. `Restoration Medical.dc.html` is a single-file prototype: template markup plus a logic class that swaps "pages" by state. It shows intended look, copy and behaviour. Do not ship it. Recreate it in **Next.js (App Router) on Vercel** using the patterns below. `design-system/readme.md`, `design-system/tokens/`, `design-system/components/` and `design-system/guidelines/` are the styling source of truth.

## Fidelity
**High fidelity.** Colours, type, spacing, radii, copy and interaction states are final unless flagged in Caveats. Recreate pixel-close. Copy is compliance-reviewed (CPSO advertising, PHIPA, CASL, RM-HB-COMMS); change wording only with clinic approval.

---

## Tech stack (decided)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15, App Router, TypeScript, React Server Components | Static generation for every content page; client components only for choosers, search, job board, booking |
| Hosting | Vercel | Set `regions: ['yul1']` (Montreal) or nearest Canadian region in `vercel.json`; if unavailable use `iad1` and note it |
| Styling | Tailwind with tokens mapped from `tokens/*.css` as CSS variables | Do not hand-copy hex values; import the token files |
| CMS | **Payload CMS 3** embedded in the same Next.js app | Postgres on Neon (Canada-central or us-east-1), admin at `/admin` |
| Fonts | Self-hosted Fraunces and Instrument Sans from `assets/fonts/` via `next/font/local` | Keep `font-optical-sizing: auto` |
| Images | `next/image`, assets in `/public` or Vercel Blob | Generated photos in the prototype are placeholders; see Assets |
| Analytics | GA4 via GTM with Consent Mode v2 | No analytics or session replay on `/book`, `/register`, `/contact`, `/referrals`, `/careers#apply` |
| Forms | POST directly to clinical or CRM systems (below). Site stores nothing | |
| Search | Client-side over a build-time JSON index (pages, services, FAQ, notes) | Same behaviour as prototype search overlay |

### Why Payload over Sanity
One repo, one deploy, database can sit in Canada, content model lives beside the front end so Claude Code sees both. Sanity is fine but adds a second vendor and US-only data regions. Nothing in the CMS is patient data, so this is a residency-optics and simplicity decision, not a legal one.

### Payload collections
| Collection | Fields | Who edits |
|---|---|---|
| `healthNotes` | title, dek, division (enum), author (relation to team), coAuthor text, date, readMinutes, hero image, body (rich text: H2 + paragraphs only), ctaTitle, ctaSub, ctaPage | Physicians, marketing |
| `jobs` | title, location (Thornhill / Maple / both), division, type, schedule, postedDate, summary, requirements (array), featured (bool), status (open / closed) | Clinic manager |
| `team` | name, role, divisions (multi), photo, bio, credentials (array), preceptorTag (text), order | Clinic manager |
| `faq` | category (enum of 11), question, answer, linkLabel, linkPage | Front desk lead |
| `locations` | name, address, mapsUrl, phone, fax, hours (7 rows), accessibility, parking, transit, comingSoon | Admin |
| `announcements` | text, link, active, startsAt, endsAt | Marketing |
| Globals | `siteSettings` (social URLs, referral email, placements email, utility bar link), `legal` (privacy, accessibility, rights, terms as rich text with lastUpdated) | Admin |

Everything else (service pages, choosers, standards, pricing tables, immunization schedule) is **code**, not CMS. It changes rarely and carries compliance wording.

### Access and security
- Payload admin: passkeys or SSO (Google Workspace), 2FA enforced, roles `admin` and `editor`, audit log on, admin route rate-limited.
- Forms never persist on the site. Book, Register, Contact, Referral post server-side (Route Handler) to the destination system; no logging of request bodies; `Cache-Control: no-store`.
- Careers applications: post to ATS or Canadian-hosted inbox; CV upload goes straight to the ATS presigned URL, never to Vercel storage.
- Security headers: HSTS, CSP (self + GTM + fonts inline), X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy minimal.
- Dependabot or Renovate on; `npm audit` in CI.
- Robots: allow all; `llms.txt` at root (growth-forge deliverable, separate).

### Form destinations (clinic to confirm)
| Form | Destination | Fields |
|---|---|---|
| Book a visit (3 steps) | Ocean online booking or Jane API. Prototype shows confirmed / waitlist / error outcomes | division, who (new / existing), day, slot, name, phone, email, health card (last 4 only), notes |
| Register (new patient) | Ocean eForm or PHIPA-hosted form (e.g. OceanMD, Formstack Canada) | family members array, language pref, contact |
| Contact | Email to front desk via transactional mail, no PHI field encouraged | topic, name, email, message |
| Refer a patient | Ocean eReferral link + fax 905-761-7306 + referrals@ | physician, patient DOB, reason, attachments |
| Careers apply | ATS (Indeed, BambooHR) or careers@ inbox | role (prefilled), name, email, phone, note, CV |
| Placements | mailto placements@restorationmedical.ca (confirm address) | |

---

## Routes (one URL per prototype page key)
| Prototype key | Route | Type |
|---|---|---|
| home | / | static |
| family, pain, infusion, aesthetics, rehab | /family-medicine, /pain-centre, /infusion-therapy, /medical-aesthetics, /rehab-recovery | static + client chooser |
| kids, women, men, chronic, blood, year, numbers | /family-medicine/children-youth, /women-s-health, /men-s-health, /chronic-care, /bloodwork-ecg, /your-year, /know-your-numbers | static + client chooser |
| iron | /infusion-therapy/iron-therapy | static + client symptom chips |
| referrals | /for-physicians | static |
| about | /about | static |
| team | /about/team | ISR from CMS |
| locations | /about/clinics | ISR |
| story, standards | /about/story, /about/standards | static |
| careers | /about/careers | ISR, client filters |
| faq | /about/faq | ISR, client search |
| contact | /about/contact | static + form |
| notes, note | /health-notes, /health-notes/[slug] | ISR |
| book | /book | client, 3 steps |
| register | /register | client |
| privacy, accessibility, rights, terms | /legal/[slug] | ISR |
| sitemap | /sitemap (HTML) + sitemap.xml | |
| 404 | not-found.tsx | |

Infusion Therapy links out to infusion.restorationmedical.ca for concerns and drips (existing site); keep those as external links.

## Screens
See `readme.md` sections "Visual foundations" and "Page inventory" for layout rules, and the prototype for exact copy. Key shared patterns:

- **Utility bar** 38px navy: open-now status (7px sage dot), Instagram, Facebook, "For referring doctors ›" (sunshine), EN / VI toggle.
- **Header** 72px white: wordmark (Instrument Sans 600 + R tile), pill nav with hover mega menu per division, search (⌕), Book (navy pill). Mobile: hamburger to full-screen navy menu with accordion divisions.
- **Division hero**: photo block, protection gradient, sunshine eyebrow, up to two CTAs, optional helper line.
- **Sub-page hero**: tinted card left (Fraunces 76 H1, 19 lead, CTA row) + 28px-radius photo right with white pill captions.
- **Chooser**: option list left, result card right, state per page.
- **Sticky-label FAQ**: 1fr / 1.6fr, "+" rotates 45°.
- **Closing band**: sunshine or navy, one headline, one or two CTAs.
- **Teaching partners strip** above footer: label + About link left, TMU and Anderson College logos right with 1px divider.
- **Footer**: wordmark, 36px icon buttons (Instagram, Facebook, Google Maps, Email), two location cards with hours, fax and Maps links, legal links, sign-off "Refined by Medicine."

Careers page order: hero, photo bento (4 image slots + navy tile), why-work-here cards, featured roles (4 tinted cards), job board (300px sticky filter rail: search, location, division, type, sort; expandable rows with schedule, posted-ago, requirements, apply), placements block, application form, closing band.

## Interactions
- Hero carousel auto-advances every 5.5s, pauses on hover, swipe on touch.
- Mega menu opens on hover (desktop), closes on mouse leave of header.
- Search overlay: instant filter over index, top 8, groups by kind.
- Chooser and FAQ state is per page; reset on navigation.
- Children & youth age chooser preselects the matching immunization tab.
- Booking: step 1 division + who, step 2 day/slot (7 days, respects clinic hours, Friday closed), step 3 details; outcomes confirmed, waitlist (slot taken), error (retry).
- Job board: filters AND together; empty state with clear link; "Apply" scrolls to form and prefills role.
- Motion: 200 to 400ms, cubic-bezier(.2,.8,.2,1); respect prefers-reduced-motion.
- Themes: data-theme dark / contrast on html; utility bar toggle sets attribute.

## Design tokens
Import `tokens/colors.css`, `typography.css`, `spacing.css`, `motion.css`. Do not restate.

## Assets
- `assets/fonts/` Fraunces and Instrument Sans (OFL).
- `assets/logos/tmu-logo.webp`, `assets/logos/anderson-horizontal-dark.png` (recolour of Anderson's white PNG; request vector from Anderson). **Written logo permission from both schools required before launch.**
- All photography in the prototype is generated placeholder. Replace with real clinic photography following CLAUDE.md dress and casting rules. Image list: home hero (5), five division heroes, seven sub-page heroes, six health-note heroes, careers bento (4), team portraits, two location exteriors, contact map.
- Icons: inline SVG paths in prototype (P map). Use Lucide for gaps.

## Caveats and open items
- Team page: sample names and initials; needs real headshots, credentials, CPSO/CNO numbers.
- Jobs: ten sample roles; replace with real postings.
- placements@ and careers@ addresses unconfirmed.
- Legal pages are drafts pending privacy officer review.
- Maple has no Google Business Profile yet; footer uses a Maps search URL.
- Pain Centre referrals list includes "epidural"; Dr. Nguyen to confirm which spinal procedures are done under ultrasound (clinic has Clarius L15 and C3 only, no fluoroscopy).
- EN/VI: prototype has the toggle; Vietnamese copy not written. Ship EN, keep toggle hidden until VI is ready, or use next-intl scaffolding now.
- Prices, wait times and consult lengths marked in readme.md Caveats still need clinic confirmation.

## Files
- `Restoration Medical.dc.html` main prototype (desktop pages + mobile frames)
- `Infusion Site Fraunces.dc.html` infusion division reference
- `design-system/` readme, SKILL, styles.css, tokens/, components/, guidelines/
- `assets/` fonts and partner logos
- `support.js`, `image-slot.js` runtime for opening the prototype locally
- `image-and-copy-rules.md` image and copy rules (copy this into the new repo as CLAUDE.md)
- `RM-HB-COMMS_v2.1_2026-09-02.pdf` communications handbook
