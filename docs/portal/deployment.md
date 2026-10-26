# Deployment guide (not executable yet)

The marketing site and `portal/` app should be separate deployments at the approved public and portal origins. No DNS or hosting changes have been made. Local portal app commands and environment variables are in `portal/README.md` and `portal/.env.example`.

Before deployment: approve providers/regions; create isolated dev, staging, production Supabase projects; configure verified-email identity, privileged MFA, database migrations, custom SMTP and exact redirect allowlists, host-only secure session settings, rate limits, secrets manager, logging/alerts and backups. Ensure preview builds have no production credentials/data. Configure query redaction for the confirmation token route. Run migrations in staging, execute authorization and restore checks, and complete launch checklist. Private object bucket/scanner are prerequisites before document modules. Production deployment and DNS changes require owner approval.

Environment placeholders are in `portal/.env.example`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, and `PORTAL_ORIGIN`. Never put privileged keys in `NEXT_PUBLIC_` variables or commit actual secrets.
