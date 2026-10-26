# Portal architecture and repository assessment

**Assessment date:** 2026-10-26. **Status:** Stage 1 implementation in progress.

## Detected repository

- Next.js App Router 15.5.12, React 19.2.4, TypeScript 5.8.2, Tailwind CSS 3.4.17; npm lockfile.
- Existing site is a public marketing website under `app/`, with shared header/footer, content in `data/`, and reusable components in `components/`.
- `README.md` describes client-only contact/careers forms. No existing auth, database, migrations, middleware, API, CI workflow, deployment manifest, test suite, or environment-variable example was found during this assessment.
- `next.config.mjs` has image optimization disabled and separate development/production build directories. No security headers are configured there.
- No `AGENTS.md` was found. No runtime version file was found in the inspected root.

## Proposed boundary

Keep the current repository and public routes as the marketing site. The portal lives in `portal/` as an independently installable Next.js app and deployable from that directory. Production should use `portal.sgbengg.com` with a separate origin, secrets, environment, Supabase project, and later a private Storage bucket. It uses Supabase Auth, PostgreSQL, the Supabase SSR package, and migrations under `portal/supabase/`. Do not share cookies or secrets across origins. The portal URL allowlist is explicit; server authorization and RLS enforce account, role, and row scope.

The requester superseded the earlier Auth.js choice with Supabase Auth on 2026-10-26. The current repository has no Supabase credentials, project, SMTP configuration, or production deployment. Portal code and local configuration are being added, but no remote project is connected. Private Storage and document workflows remain a later stage. Do not add a mock sign-in or claim a production integration is configured.

## Reuse and additions

Reuse the company logo and restrained company card/button treatment where practical. Portal layouts are independent from the marketing header/footer. The public Worker Login route in the marketing app remains informational and collects no information.

Portal dependencies are Next.js 15, React 19, `@supabase/ssr` and `@supabase/supabase-js`; exact package versions and whether installation completed are recorded in the portal package and handoff. Next.js 15 uses `middleware.ts`, not `proxy.ts`, for refresh. The SSR cookies are session storage and are not treated as HttpOnly when browser Supabase APIs are used. No Auth.js is used.

## Security boundaries

- Public marketing deployment must have no HR database credentials, storage credentials, or HR API routes.
- Portal uses host-only secure sessions, explicit origin checks/CSRF defense, rate limits, verified email, backend MFA assurance for privileged actions, and deny-by-default permission checks.
- Medical document permission is explicit and independent of platform administration. Finance receives classification only by default.
- No real employee data in development, preview, or tests. Use synthetic records.
- Infrastructure operators may retain privileged access; constrain, audit, and document it.

## Assumptions and unresolved decisions

Assumptions: invitation-only; one SGB organization for Phase 1; personal email is available per worker; Singapore is the operational timezone; no payroll or payment automation; HR configures leave entitlements; employment data is not migrated until approved.

Company/HR/DPO must confirm individual-email availability and recovery, legal name necessity, role assignments, review routing, medical reviewer eligibility, retention and legal-hold periods, privacy notice, notification channels, leave policy, holidays, receipt rules, and incident contact. Operations must select hosting, Singapore-region availability, database/storage/email/scanning providers, backup plan, DNS/TLS, MFA assurance, and monitoring. No live domain or deployment configuration was inspected or changed.
