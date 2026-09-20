---
name: restoration-medical-design
description: Use this skill to generate well-branded interfaces and assets for Restoration Medical (Thornhill clinic: Family Medicine, Pain Centre, Infusion Therapy, Medical Aesthetics, Rehab & Recovery), either for production code in this repo or throwaway prototypes and mocks. Points to the design tokens, component specs, guidelines and the prototype.
user-invocable: true
---

Read `design/handoff/design-system/readme.md` first. It carries the clinic facts, content fundamentals, visual foundations and page inventory. Then explore `design/handoff/design-system/tokens/`, `components/` (each component has a `.jsx`, `.d.ts` and `.prompt.md`), `guidelines/` and the prototype `design/handoff/Restoration Medical.dc.html` (template markup up to line 1828, logic and copy data after).

For production code in this repo, use the tokens through `src/app/globals.css` (Tailwind theme names and CSS variables), the primitives in `src/components/ui/`, the routes in `src/lib/routes.ts` and the content modules in `src/content/`. For throwaway mocks, write a static HTML file that imports `design/handoff/design-system/styles.css`.

Follow the RM-HB-COMMS copy rules in `CLAUDE.md`: no testimonials or ratings, no immunity, outcome or weight-loss claims, no superlatives or urgency, no em dashes or middots. Follow the photo rules in `CLAUDE.md` for any generated staff or clinic imagery. Use the clinic facts and service framing in the readme (Pain Centre needs a referral, chronic care is Family Medicine, iron pricing, hours, fax) rather than inventing new numbers, and flag anything the clinic has not confirmed.
