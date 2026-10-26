# Official implementation references

Reviewed 26 October 2026. These references informed the Stage 1 implementation; recheck provider and framework guidance before deployment because these interfaces can change.

- [Supabase SSR client setup for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs): server/browser clients, cookie refresh middleware, and server-side claims validation.
- [Supabase Auth MFA](https://supabase.com/docs/guides/auth/auth-mfa): assurance levels and requiring AAL2 for privileged operations.
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security): enable RLS, grant only needed table privileges, and scope policies to authenticated access.
- [Supabase invite user by email](https://supabase.com/docs/reference/javascript/auth-admin-inviteuserbyemail): administrative invitation flow and callback URL requirements.
- [Supabase Auth email templates](https://supabase.com/docs/guides/auth/auth-email-templates): invite and password recovery templates.
- [Supabase custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp): production email delivery configuration.
- [Next.js 15.5.28](https://github.com/vercel/next.js/releases/tag/v15.5.28): selected patched release in the Next.js 15 line.
- [PostCSS advisory GHSA-fxqj-rqcc-2cmp](https://github.com/postcss/postcss/security/advisories/GHSA-fxqj-rqcc-2cmp): fixed in PostCSS 8.5.23; this release is pinned through npm overrides for Next.js' older transitive pin.
- [PostCSS 8.5.23 release](https://github.com/postcss/postcss/releases/tag/8.5.23): confirms the source map fix.
