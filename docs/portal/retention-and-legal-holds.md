# Retention and legal holds

**Draft; periods need HR/DPO/legal approval.** No retention automation or deletion workflow exists.

Before launch, create a record-class schedule for identity/security events, employment files, claims/receipts, leave ledger, medical certificates, timesheets, notifications, and backups. For each class define purpose, trigger, period, deletion/anonymization method, owner, backup expiry behavior, and lawful hold exception. Apply holds with scope, reason, approver, start/review/end date and audit. A hold must suspend relevant deletion without silently expanding access. Test restoration against deletion/hold state. Do not invent a retention period or claim deletion until verified across database, object storage, outbox, logs, and backups.
