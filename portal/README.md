# SGB Employee Portal

This is an independently installable Next.js 15 app. The marketing website remains at the repository root; deploy this directory separately to the approved portal origin. Stage 1 covers Supabase Auth, invitations/recovery, MFA, RLS-protected employee profile data, management employee records, role assignment, suspension, and audit. Claims, medical files, leave, timesheets, and document storage are not implemented.

## Local setup

Requirements: Node.js 22+, npm, and Docker Desktop/compatible Docker runtime for the Supabase CLI.

```powershell
cd portal
Copy-Item .env.example .env.local
npm install
npm run db:start
npm run db:reset
```

Use the local `supabase status` output to copy the local Project URL, publishable key, and secret key into `portal/.env.local`. Keep the secret key server-side. Then run:

```powershell
npm run dev
```

Open `http://localhost:3100`. Supabase local email is captured by the local Inbucket service; inspect it through the local Supabase status URL. Do not invite real workers in local development. The local auth configuration disables public signups. `npm run test:unit` runs local security/utility tests; `npm run test:db` runs pgTAP tests against the local database.

## Supabase project settings before any real use

- Disable public signups for all providers in Authentication settings; verify email confirmations are required.
- Configure custom SMTP, sender domain authentication, email limits, and tested invite/recovery templates. The default Supabase email service is not suitable for worker rollout.
- Set Site URL and add only the exact portal origin and callback destinations used by this app. Review `auth/confirm` link handling and prevent query-string tokens from appearing in application/platform logs.
- Enable TOTP enrollment and verification. Enroll designated privileged accounts and retain the database AAL2 enforcement in the migration.
- Enable leaked-password protection if available on the selected plan; set a minimum password length of 12.
- Review JWT expiry, refresh/session limits, Auth rate limits, MFA recovery, and email verification.
- Apply the migration to a new dedicated project only after owner approval. Never apply it to production from a local preview.

The app uses host-only cookies, `Secure` in production, `SameSite=Lax`, and a `__Host-` cookie name in HTTPS production. Supabase SSR stores tokens in cookies that are intentionally **not HttpOnly**, because the browser client also performs MFA operations. Do not claim that these cookies are inaccessible to JavaScript. Protect against XSS and redact auth callback query values at the hosting/logging layer.

## One-time initial HR administrator bootstrap

There is no public bootstrap route, default password, or code path that promotes a user from a query parameter. Follow `scripts/bootstrap-hr-admin.md` using an authorized operator and a pre-approved verified Supabase Auth user. After use, record the operator/ticket and remove the one-time SQL file from any operator workstation. Bootstrap a separate platform administrator if needed; platform administration does not grant employee/medical record access.

## Limits

No production Supabase project, SMTP credentials, or deployment configuration is connected. Supabase Auth's user ban does not invalidate already-issued access-token JWTs. Suspension immediately denies all portal database reads/writes using RLS and bans new sign-ins; an existing access JWT can remain cryptographically valid until it expires. A launch decision must set an acceptable JWT lifetime and session/revocation procedure. This app is not production-ready or a compliance determination.
