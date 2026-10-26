# Testing status and strategy

The portal includes Node built-in tests for redirect allowlisting, tenure calculation, signup-disabled local configuration, and marketing-route source presence; all four passed on 26 October 2026. TypeScript checking and both portal and marketing production builds also passed. npm audit reported zero advisories for both dependency trees on that date.

The pgTAP RLS suite is present but remains unverified: `npm run test:db` loaded the Supabase project configuration and then failed to connect to `127.0.0.1:54322` because the local Supabase database is not running. The CLI recommends starting it with `supabase start`; Docker is not available in this environment. No database migration or pgTAP assertion was executed.

Remaining suites: PostgreSQL integration tests for full invitations, role changes and suspension; direct scope tests for finance/platform roles; browser tests for auth/MFA/invite UX; and public route rendering/contact form regression. CI should run lint, typecheck, build, tests, dependency audit and secret scanning. Use synthetic data only; do not probe the live domain.
