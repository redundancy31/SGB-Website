# Launch checklist

**Current status: local Stage 1 implementation is built and statically checked, but database integration and provider configuration remain incomplete. The app is not ready for employee use.**

- [ ] Company confirms individual email access, identity recovery, and Supabase project/region.
- [ ] Hosting, private Storage, scanner, custom SMTP, regions, transfers, costs, and operators approved.
- [ ] HR/DPO approve roles, medical reviewers, leave/expense policy, notice, retention/legal holds, and privacy workflows.
- [ ] Start local Supabase, apply the migration, and pass pgTAP; this environment has no local DB/Docker runtime. Complete hosted SMTP/provider and session-revocation review.
- [x] Invitation, activation, suspension, MFA, scoped authorization, and audit implementation are present; local unit tests, typecheck, and production builds pass. Database authorization has not yet been exercised against PostgreSQL. Private attachments and notifications remain later modules.
- [ ] Migration/backup/restore, incident response, monitoring, support/offboarding, and CI operationalized.
- [ ] Synthetic pgTAP tests pass; browser tests and public route/form/metadata regression checks remain.
- [ ] Security/privacy review completed; blockers and residual risks accepted by accountable owners.
- [ ] Owner approves production deployment and DNS change separately.

The existing Worker Login page is informational only. Do not distribute it as an available sign-in service.
