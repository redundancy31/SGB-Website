# Stage 1 data model

Implemented relational records: Employee, separate HR-controlled employment/contact details, Auth user-to-employee mapping, role assignments, teams/supervisor IDs, invitations, and audit events. Future records remain proposed: skill/certification data, claims/lines, attachment metadata, sick report/medical files, leave policy/ledger/holidays, timesheets/amendments, notifications/outbox, privacy requests, and legal holds.

Use UUID identifiers without treating unpredictability as authorization. Money uses integer minor units and an explicit currency (initial scope SGD only). Instants use timezone-aware timestamps; date-only employment/leave values remain date-only. Tenure is calculated from employment start date. Medical content is separate from operational absence fields. Attachments store private object keys and scan state, never public URLs.

Stage 1 constraints and RLS are in `portal/supabase/migrations/20261026000100_employee_identity_and_access.sql`. There is one implied SGB organization; no multi-tenant organization key is modeled. Future workflows require additional migrations and transactional/versioned state rules. Define retention/deletion and legal holds before production data.
