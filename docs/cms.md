# Content management (Payload CMS)

The site's editable content and search settings live in Payload CMS, embedded in this same Next.js app. There is one codebase, one deploy and one database. The public site stays static: an edit in the admin panel revalidates only the pages it touches, so pages keep loading from the edge cache.

## Where

| What | Where |
|---|---|
| Admin panel | `https://<site>/admin` |
| Content API (admin panel's own, JSON) | `https://<site>/cms-api/...` |
| Config | `src/payload.config.ts` |
| Collections and globals | `src/payload/collections/*`, `src/payload/globals/*` |
| Access rules | `src/payload/access.ts` |
| Audit and revalidation hooks | `src/payload/hooks/*` |
| Read façade used by pages | `src/lib/cms.ts` |
| Per-page SEO merge | `src/lib/seo.ts` |
| Seed from the typed content | `scripts/seed.ts` |

## What editors can change

| Collection | Content | Feeds |
|---|---|---|
| Health notes | Physician-reviewed articles with drafts, autosave and version history | `/health-notes`, `/health-notes/[slug]`, home |
| Job postings | Roles with location, type, schedule, requirements, featured flag, open or closed | `/about/careers` |
| Team members | Names, roles, divisions, headshots, credentials, preceptor tag, order | `/about/team` |
| FAQ | Question, answer, category, optional link | `/about/faq` |
| Clinics | Address, hours, phone, fax, access notes, "Finding us" text and photo, services, coming-soon flag | `/about/clinics`, footer, contact |
| Announcements | "What's new" strip items with start and end dates | Home |
| Legal pages | Privacy, accessibility, patient rights, terms | `/legal/[slug]` |
| Images | Uploads, resized to thumbnail, card and hero sizes | Anywhere an image field is set |
| Page SEO | Title tag, meta description, social image, canonical, hide from search, per page | Every page's `<head>` |
| Site settings (admins) | Phone, fax, emails, social links, search defaults, analytics ID (Tag Manager or GA4), uninsured fees list | Global, `/about/fees` |
| Redirects | Old address to new page, for links from the previous website or print | Any address with no page |

Service pages, choosers, pricing tables and the immunization schedule stay in code. They change rarely and carry compliance wording that needs clinic approval; see `design/handoff/README.md`.

Anything left blank in Page SEO or missing from a collection falls back to the built-in content in `src/content`. A fresh checkout with no database still builds and renders the full site.

## Security model

- **No public sign-up.** The first admin is created by the seed (or the one-time `/admin/create-first-user` screen on an empty database). After that only admins create accounts.
- **Two roles.** `editor` edits content and Page SEO. `admin` also manages staff accounts and Site settings and can read the audit log.
- **Two-factor sign-in.** Everyone signs in with a password and a six-digit code from an authenticator app (Google Authenticator, Microsoft Authenticator, 1Password or any TOTP app). The first sign-in shows a QR code to set it up. The code is checked at `/admin-mfa`; until it is, the admin panel redirects there and every `/cms-api` call from that sign-in answers 401. Each code works once. Five wrong codes lock the step for 15 minutes. The pass is tied to that one sign-in and lasts at most 12 hours. Secrets are encrypted in the database with a key derived from `PAYLOAD_SECRET` and are never returned by the API.
- **Lost phone.** An admin opens the person's staff account, ticks **Reset two-factor** and saves; the person sets it up again at their next sign-in. If the only admin is locked out, run `DATABASE_URL=... PAYLOAD_SECRET=... npm run reset-2fa -- person@clinic.ca` from a trusted machine. `ADMIN_2FA=off` turns the requirement off entirely; use it only in an emergency and remove it straight after.
- **Account lockout.** Five failed logins lock the account for 15 minutes. Passwords must be at least 12 characters. Sessions expire after two hours; cookies are `HttpOnly`, `Secure` in production, `SameSite=Lax`.
- **Rate limiting.** `src/middleware.ts` limits login and password-reset calls to 10 per minute per IP and marks `/admin` and `/cms-api` as `noindex` and `no-store`. The counter is per server instance; add a WAF rate-limit rule for `/admin` and `/cms-api` at the host for a shared limit.
- **Audit log.** Every create, update and delete in the panel is recorded with the user, time, collection, document and changed fields. Entries cannot be edited or deleted through the panel or API.
- **Content API.** GraphQL is off. The REST API serves published content read-only to the public (the same content the site renders) and requires a session for every write. CSRF and CORS are locked to the site's own origin.
- **Headers.** HSTS, CSP, `X-Frame-Options: DENY`, `Referrer-Policy` and `Permissions-Policy` come from `next.config.ts` and cover the admin too.
- **No patient data.** The CMS holds marketing content only. Booking, registration, contact, referral and careers forms post to their destination systems and never touch this database.

### Recommended at the hosting layer

- Optional extra layer: put `/admin` behind an identity provider (Cloudflare Access, or Google Workspace SSO) so the sign-in page is not public at all. Two-factor is already enforced in the app.
- Turn on the platform's attack challenge mode and a rate-limit rule for `/admin/*` and `/cms-api/users/*`.
- Keep `PAYLOAD_SECRET` and `DATABASE_URL` in the host's encrypted environment variables only.

## Running it

### Locally

```bash
cp .env.example .env.local        # set PAYLOAD_SECRET (openssl rand -base64 48)
npm install
ADMIN_EMAIL=you@clinic.ca ADMIN_PASSWORD='at least 12 characters' npm run seed
npm run dev                        # site at :3000, admin at :3000/admin
```

Local data lives in `data/payload.db` (SQLite) and uploads in `public/media`. Both are git-ignored.

### Production (Vercel + Neon)

The site deploys from the `claude/new-session-kp96am` branch and is live at `https://rm5-nine.vercel.app`. The public pages work with no configuration. The admin at `/admin` shows a short "not set up yet" notice until the variables below exist, then becomes the sign-in screen.

1. **Database.** In the Vercel project open Storage, choose Neon (Postgres) and create a database in a US East or Canada region. Vercel adds `DATABASE_URL` to the project. Alternatively create it at neon.tech and paste the pooled connection string as `DATABASE_URL`.
2. **Uploads.** In Storage, create a Blob store and connect it to the project. Vercel adds `BLOB_READ_WRITE_TOKEN`.
3. **Variables.** In Settings, Environment Variables, add for Production:
   - `PAYLOAD_SECRET`: a long random string (`openssl rand -base64 48`). Mark it sensitive.
   - `NEXT_PUBLIC_SITE_URL`: the public origin, for example `https://rm5-nine.vercel.app`, later `https://restorationmedical.ca`. Cookies, CSRF and canonical links use it.
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD` (12 characters or more) and `SEED_ON_BUILD=1` to create the first admin and fill the empty database with the site's current content during the next build.
4. **Redeploy** (Deployments, latest, Redeploy). `npm run build` runs `scripts/build.mjs`, which applies the migrations in `src/payload/migrations`, seeds when asked, then builds the site. No custom build command is needed.
5. Sign in at `/admin`, scan the QR code with an authenticator app and enter the code. Then remove `ADMIN_PASSWORD` from the project. `SEED_ON_BUILD` can stay on: it only adds documents that are missing and never overwrites an edit.

Deployment protection is on for the `*.vercel.app` URLs, so visitors are asked to sign in to Vercel. Turn it off in Settings, Deployment Protection, or attach the clinic's domain, which is never protected.

Schema changes in production only ever go through migrations (`push` is disabled for Postgres). After changing a collection run `DATABASE_URL=... npm run migrate:create` and commit the new files in `src/payload/migrations`. `migrate:create` does not connect to the database, so any Postgres URL will do for generating the file.

## Analytics

Paste the Google Tag Manager container ID (GTM-...) or the GA4 measurement ID (G-...) into Site settings > Search defaults and save; every page picks it up within a minute. Nothing loads until a visitor presses "Allow analytics" in the cookie banner, advertising storage is always denied, and analytics is switched off on booking, registration, contact, referral, careers and the renewal form. "Cookie settings" in the footer reopens the banner. With Tag Manager, keep the container to analytics tags only; do not add advertising pixels (Meta, TikTok) on a health site.

## Redirects

Old addresses are handled in three places: the infusion.restorationmedical.ca paths and a list of likely old main-site paths in `src/content/redirects.ts` (deployed with the code), and the Redirects collection in the admin for anything else. Admin redirects are checked only when no page matches, so they can never hide a real page. Before launch, export the old site's sitemap and add any address that is not covered.

## Editing workflow

1. Sign in at `/admin`.
2. Health notes save as drafts and autosave every two seconds; publish when the physician has reviewed the copy. Older versions can be restored.
3. Other collections publish on save. The affected pages refresh within seconds.
4. Page SEO: open the page's row, set the title (up to 70 characters) and description (120 to 160). Leave a field blank to keep the built-in default.
5. Images: upload once, reuse anywhere. Alt text is required. Follow the photo rules in `CLAUDE.md`.

## Adding a field or collection

Edit the collection in `src/payload/collections`, run `npm run generate:types`, map the new field in `src/lib/cms.ts`, then `DATABASE_URL=postgres://x:y@localhost/x npm run migrate:create <name>`. Commit the migration with the code; the build applies it on the next deploy.
