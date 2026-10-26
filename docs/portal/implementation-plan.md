# Implementation plan

**Status:** Stage 0 assessment complete. Stage 1 code and a minimal profile vertical slice are implemented locally; execution against a Supabase database remains pending. Stages 2–5 remain unimplemented.

1. **Stage 0 – Assessment:** inspected README, package/lockfile, routes/layout, components, Next config, and repository guidance. Document architecture, permissions, threats, inventory, and unresolved decisions.
2. **Stage 1 – Foundations:** Supabase Auth/SSR, invitation and recovery flows, TOTP MFA, identity mapping, employee/role/team schema, RLS, suspension, audit, pgTAP tests, and a worker profile/HR employee management vertical slice are implemented in `portal/`. Run local migrations/tests and fix all failures before considering this stage verified. No remote Supabase project is configured.
3. **Stage 2 – Worker records:** profiles, team scope, skills, certifications, access rules, and worker UI.
4. **Stage 3 – Workflows:** claims, sick reports/MC verification, leave ledger, timesheets, review transitions, and concurrency controls.
5. **Stage 4 – Operations UI:** scoped dashboards, approval inbox, absence calendar, in-app/email notifications and retryable outbox.
6. **Stage 5 – Assurance:** authorization and workflow tests, privacy/retention workflows, headers, CI, deployment/incident runbooks, and public login-link integration.

Every stage must record actual code, executed checks, configuration gaps, and policy decisions. Do not activate production identities or use production data before explicit owner approval. The public marketing Worker Login page remains informational and links to no assumed live portal.

## Next concrete decisions

- Confirm worker access to individual personal email and account recovery.
- Choose hosting, dedicated Supabase project/region, email and malware scan providers, and later private Storage.
- Confirm administrator MFA requirement and supported assurance level.
- Approve HR role/permission assignments, medical reviewer set, leave policy, and retention schedule.
