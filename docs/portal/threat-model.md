# Threat model (initial)

**Assets:** identity/session credentials; employment/contact data; medical certificates and absence records; receipts and claims; leave balances; timesheets; audit records; invitation links; storage/database credentials.

**Trust boundaries:** public marketing origin; portal origin; browser; application server; identity/email provider; PostgreSQL; private object storage; scanning service; operators and backups.

**Threat actors:** opportunistic internet attacker, phishing victim, malicious/over-curious worker or manager, compromised account, misconfigured operator, compromised dependency/provider, and privileged infrastructure operator.

| Threat | Required control/evidence |
|---|---|
| Cross-user IDOR or team-scope leak | Server-side permission/ownership checks on every operation; deny-by-default tests using distinct identities |
| Invitation theft/replay/elevation | High entropy, hashed token storage, expiry, one-use, revocation/resend invalidation, no token logs; role assignment server-side |
| Account takeover/session theft | Verified email, MFA for privileged operations, secure host-only session, rate limits, revocation and recovery audit |
| CSRF/XSS/open redirect | Origin allowlist, CSRF defense, output escaping, safe URLs, no untrusted HTML |
| Medical/receipt exposure | Private bucket, opaque keys, malware quarantine, per-download authorization, short-lived download path, access audit |
| Malicious upload | Allowlisted formats, size limits, signature checks, quarantine/scan before access, safe disposition |
| Approval fraud or race | State machine, separation of duties, transaction/concurrency check, idempotency, reasoned decisions |
| Log/backup leakage | Redaction, least privilege, encryption where available, retention, restore controls and audit |
| Insider abuse / infrastructure access | Narrow permissions, medical access separation, audit, operator controls and explicit residual-risk documentation |

This is a starting model, not a completed security review. Deployment architecture and provider-specific threat analysis are still outstanding.
