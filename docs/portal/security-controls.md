# Security controls and gaps

## Implemented in this repository

- Separate `portal/` Next.js application and environment; root marketing app remains independent.
- Supabase SSR browser/server clients, Next 15 `middleware.ts` refresh using `auth.getClaims()`, protected route layouts, and server actions that recheck identity/account/roles.
- Supabase Auth password login, recovery, invitation confirmation callback, password establishment, generic recovery responses, and no public signup UI. Local Supabase config disables signup; hosted Dashboard settings remain operator-controlled.
- TOTP enrollment/challenge UI. AAL2 is required by server actions and SQL helper/policies for management actions.
- Employee/profile/HR details, user mapping, role/team/invitation/audit tables; row-level security and explicit grants in the Stage 1 migration.
- Employee self-read/contact-phone update, HR employee/team management, invitation activation/revocation/reissue, role grant/revoke, and account suspend/reinstate.
- Manager-visible operational employee columns are separate from HR dates/status/contact. Platform admin does not inherit employee or medical access.
- Append-style audit events for HR record, role, invitation, activation, and account status changes; ordinary roles cannot mutate audit rows.
- Portal uses host-only cookies, `Secure` and `__Host-` in HTTPS production, `SameSite=Lax`, and `HttpOnly=false` because browser Supabase MFA APIs need token access. RLS also checks the JWT `session_id` against `auth.sessions` and an application `revoked_before` cutoff so signed-out/suspended sessions cannot regain portal access after reinstatement.
- Public Worker Login page is informational and accepts no credentials.

## Not implemented

Production credentials/project, custom SMTP delivery, hosting, private document storage and malware scanning, monitoring, backups, CI security scans, production privacy request process, and security review. Supabase access JWTs remain cryptographically valid until expiration after ban/sign-out. Database checks session existence and the application cutoff for portal access, so old sessions remain denied after reinstatement until a fresh Auth session is established; Auth itself does not revoke the JWT.

## Deployment controls required

Separate portal host/deployment/secrets; TLS; exact callback allowlists; query-string redaction for `/auth/confirm`; custom email templates and SMTP; database region/transfer review; MFA configuration; provider rate limits; object storage/scanning before document features; redacted logs; alerting; encrypted backups and tested restoration; dependency/secret scanning; vulnerability response and offboarding.

Do not describe planned controls as active. Infrastructure/database owners can retain privileged access; constrain and document it.
