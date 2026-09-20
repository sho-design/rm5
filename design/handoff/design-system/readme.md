# Restoration Medical Design System

Physician-led multi-service clinic in Thornhill, Ontario (Maple opening 2026, pre-registration open). Five service lines under one standard of care: Family Medicine, Pain Centre (Dr. Johnny Nguyen), Infusion Therapy (own site at infusion.restorationmedical.ca), Medical Aesthetics, Rehab & Recovery. Physicians: Dr. Johnny Nguyen (Medical Director, Family Medicine and Pain), Dr. Joseph Truong (Family Medicine). Bilingual English / Tiếng Việt. Sign-off: "Refined by Medicine."

Clinic facts used across the site: Thornhill at 700 Centre St (inside Walmart), L4J 0A7; 905-709-3222; referral fax 905-761-7306; referrals@restorationmedical.ca; Ocean eReferral accepted. Hours Mon, Wed, Thu 9am to 4pm; Tue 3pm to 9pm; Sat 8am to 4pm; Sun 8am to 2pm; Fri closed. Maple at 2620 Rutherford Rd, Unit 105 to 107, L4K 0H1. Social: instagram.com/restorationmedicalofficial, facebook.com/restorationmedicalofficial. Lab technician on site for bloodwork and 10-lead ECG.

Sources: this project's site designs (Restoration Medical.dc.html, Infusion Site Fraunces.dc.html, Iron Handout Options.dc.html), the live Infusion site reference https://it-1-gold.vercel.app/, restorationmedical.ca, the RM-HB-COMMS communications handbook in uploads/, and CLAUDE.md (image-generation rules). No logo file was provided: the wordmark is the name in Instrument Sans 600 with an "R" tile.

## Content fundamentals
- Plain, warm, unhurried. Short sentences. Second person ("you"), first person plural ("we").
- Sentence case everywhere, including buttons and eyebrows. No exclamation marks.
- Every claim is a fact the clinic can stand behind: "A physician is on site", "Prices include HST". Never outcomes ("feel better in days"), immunity or weight-loss claims, superlatives ("best"), or urgency ("limited spots").
- No testimonials or ratings. Trust comes from named clinicians, coverage clarity and honest screening.
- No em dashes, no middots. Use commas, full stops or "and". Ranges read "8am to 4pm", "4 to 8 weeks".
- Money: "$250", "HST included", "OHIP-insured" vs "uninsured fee, receipt provided". Iron therapy pricing: $250 administration only (patient-supplied iron), $550 per visit clinic-supplied Monoferric 500 mg, 3 visits per course; assessment and bloodwork OHIP.
- Pain Centre framing: physician-led, OHIP-covered with a physician referral. Never "self-referral". No family doctor? Route to a Family Medicine assessment and internal referral. Pain assessments and procedures are stated as about 20 minutes.
- Chronic care is Family Medicine (long-term conditions); the Pain Centre is procedures for pain. Pages cross-link but never merge the two.
- FAQ answers are facts the desk can repeat: 24 hour cancellation notice, 15 minute late rule, 2 business day registration confirmation, results in about a week, urgent results phoned same day.
- CTAs are verbs plus object: "Book an iron assessment", "Register your family", "Refer a patient". Text links end in " ›".
- Headlines are questions or plain statements: "Tired of being tired?", "Bring a book. We handle the rest.", "Start with the spot."
- Bilingual: Vietnamese is a first-class language, shown as "Tiếng Việt". Reminders and forms offer both.
- No emoji. Checks (✓), plus (+), chevrons (›) and × are the only glyphs.

## Visual foundations
- Colour: navy ink #0F1F2E on white paper; sky #2F7FD1 for links and step-2 actions; sunshine #FFD84D / #FFE58A for CTAs on navy and closing bands; terracotta, sage and lilac as division accents. Each division has a pale tint and a deep accent (tokens/colors.css). Canvas behind the page is warm grey #E9E7E2. Three themes: light, dark (navy paper, translucent tints), high contrast (pure ink, 2px borders).
- Type: Fraunces 500 for all display and numerals (84 / 72 / 56 / 48 / 44 / 40 / 26 / 22, tracking -.02 to -.025em, leading .96 to 1.05). Instrument Sans for UI (18 lead, 16 body, 15 card, 14 links, 13 eyebrow, 12 label). Semibold for buttons, eyebrows, labels. Never Inter, never all caps.
- Layout: rounded blocks (28px) sit 24px from the viewport edge; text sections use a 32px gutter; card grids gap 12; blocks gap 14; sections 72 apart (56 tight). Intro copy max 820px, prose 720px. Grids are 3 or 4 equal columns, or 1fr / 1.25fr splits with a sticky left column.
- Shape: radius 28 block, 24 card, 18 tile, 16 row, 12 field, 999 pills. Borders 1px line on cards, 1.5px on interactive, 2px ink when selected.
- Shadow: almost none. One soft shadow (0 24px 60px -30px) on floating result cards and the modal; a stronger one on the mobile sticky Book button.
- Surfaces: white cards with 1px line, or tinted division cards with no border, or navy inverse blocks with white text and sunshine eyebrows. Sunshine bands close every page.
- Imagery: editorial daylight photography, rounded 28px, often with a bottom protection gradient (rgba(10,20,30,0) 38% to .72). Staff dress code fixed (see brand-photo card). No text in images. Around 45% Vietnamese / East Asian people.
- Icons: bare line pictograms, 1.4 to 2.4 stroke, one hover animation per icon.
- Motion: 200 to 400ms, cubic-bezier(.2,.8,.2,1). Hover: border turns sky or background tints; press: scale .98; selected chips fill ink. Accordion plus rotates 45°. Hero auto-advances every 5.5s. No bounces, parallax or fades on content switches. Respect reduced-motion.
- Interaction patterns: chooser (options list reveals a result card), tappable symptom chips with a live tally, sliders with a Fraunces readout, body map hotspots, 7-day slot picker that respects clinic hours, three-step booking with confirmation / waitlist / error outcomes.
- Transparency and blur: rgba white pills over photos (.92); rgba(255,255,255,.06 to .12) tiles on navy. No backdrop blur.
- Mobile: 390 frame, 12px gutters, stacked grids, horizontal chip scrollers, sticky Book button, hamburger (☰ toggles to ×) opening a full-screen navy menu with accordion divisions, location cards, EN / Tiếng Việt toggle and 44px social icons.
- Utility bar (38px, navy): live open-now status with a 7px sage dot on the left; on the right, 26px round social icons (Instagram, Facebook) separated by a 1px rgba(255,255,255,.25) rule from the sunshine "For referring doctors ›" link and the EN / VI toggle. Keep it to one row and one accent link; anything more reads busy.
- Footer: 36px round bordered icon buttons (Instagram, Facebook, Google Maps, Email) under the wordmark, two location cards with hours and fax, legal links and the sign-off line.
- Sub-page hero: two-column block 24px from the edge, tinted division card left (76px Fraunces H1, 19px lead, CTA row, small coverage line) and a 28px-radius photo right with rgba white .92 pill captions bottom-left. Breadcrumb eyebrow "Division › Page" in the division accent. Used by Children & youth, Women's health, Men's health, Chronic care, Bloodwork and Iron therapy.
- Division hero (Family, Pain, Aesthetics, Rehab): photo block with protection gradient, sunshine eyebrow, up to two CTAs (white primary, 1.5px white-outline secondary) and an optional 13px helper line under them (used for referral fax and Ocean on Pain Centre).
- Sticky-label FAQ: 1fr / 1.6fr grid, Fraunces 44 heading sticky at top 24px, hairline-divided rows with a "+" that rotates 45° when open. Every division deep dive and sub-page ends with one before the closing band.
- Site FAQ page: search field (56px, 16px radius, sky focus border), sticky 260px category rail with counts (11 categories: All, Visits, Coverage, Results, Prescriptions, Clinic, Privacy, Pain Centre, Infusion, Aesthetics, Rehab), grouped accordions, empty state card, sunshine "Still have a question?" card in the rail.
- Immunization tab set: age chips (2 months to Teens, plus Every fall) driving a sage card that lists vaccines with a count badge; the Children & youth age chooser preselects the matching tab.
- Compare strip: three tinted cards in a row that settle a "this vs that" question (Chronic care is / The Pain Centre is / Both, if). Use when two services overlap in a patient's mind.

## Iconography
Bare line pictograms drawn as 24px SVG paths (stroke currentColor, round caps), defined inline in the site file (P map: drip, shot, iron, spine, skin, band, cal, clinic, kids, price, heart). Each has a hover animation. Utility glyphs are unicode: ✓ + › ‹ × ☰ ⌕ ☏. No icon font, no emoji. For new icons, match 1.6 stroke, 24 grid, no fills. Substitute Lucide (same stroke language) when a needed glyph is missing and flag it.

## Themes
Set data-theme="dark" or data-theme="contrast" on a wrapper; every semantic token re-maps. The utility bar's high-contrast toggle should set the attribute rather than override colours.

## Index
- styles.css: entry; imports tokens/*.css
- tokens/: colors (light, dark, contrast), typography, spacing (radius, borders, shadow, hit targets), motion, fonts (@font-face)
- assets/fonts/: Fraunces and Instrument Sans variable files plus licences
- guidelines/: 16 specimen cards (Colors, Type, Spacing, Motion, Brand)
- components/actions: Button, IconButton
- components/forms: Field, Input, Textarea, Select, Checkbox, Segmented, Chip, Range
- components/feedback: Tag, Notice (inline / toast), StateCard (success / waitlist / error)
- components/navigation: UtilityBar, PillNav, Tabs, Stepper
- components/overlay: Modal
- components/data: Table
- components/content: Card, BenefitCard, PriceCard, PathSteps, Accordion, Chooser, CtaBand
- Screens: Restoration Medical.dc.html (main site, all pages and mobile frames), Infusion Site Fraunces.dc.html (division site), Iron Handout Options.dc.html (print)
- Page inventory in the main site: Home; Family Medicine, Pain Centre, Infusion Therapy, Medical Aesthetics, Rehab & Recovery (division pages with deep-dive chooser, benefits, path, FAQ, closing band); Family sub-pages Children & youth, Women's health, Men's health, Chronic care, Bloodwork and ECG on site, Your year, Know your numbers; Iron therapy; Referrals (for physicians); Health notes index and article; About: Our team, Our clinics, Our story, Standards of care, Careers, FAQ, Contact; Book (3 steps with confirmed, waitlist and error states); Register; Legal: Privacy, Accessibility, Patient rights, Terms; Sitemap; 404; mobile frames for Home, Service, Search, Deep dive, Book, Iron, 404.
- SKILL.md: agent skill entry

## Intentional additions
Field, Notice, Modal, Table, Tabs, Stepper and Select were not yet in the site designs. They were added to close gaps identified before the Claude Code handoff (form states, toasts, tabs, dialogs, fee tables) and follow the same tokens.

## Caveats
- Fonts are self-hosted variable TTFs in assets/fonts/ (Fraunces and Instrument Sans, OFL). Fraunces optical size axis auto-adjusts; keep font-optical-sizing: auto.
- No logo asset exists; do not draw one.
- Clinical copy (ranges, screening ages, prices) in examples is placeholder pending physician review. Still unconfirmed by the clinic: Pain Centre wait time (2 to 3 weeks), migraine treatment, MVA/WSIB at the Pain Centre, private pain procedure pricing, aesthetics consult length (30 min), infusion observation time (30 min).
- Utility bar and mobile menu social icons link to "#" until the final handle list is confirmed; footer icons carry the live URLs.
