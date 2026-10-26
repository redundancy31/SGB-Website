# Workflow decisions (draft)

Implemented in Stage 1: password sign-in/recovery, invite callback activation, password establishment, TOTP enrollment/challenge, self-contact update, HR employee creation/invitation, invitation revoke/reissue, role grant/revoke, and account suspend/reinstate. Claims/leave/sickness/timesheets below remain future workflow proposals.

- Invitation: issued → accepted; issued → revoked/expired. Resend invalidates outstanding token. Activation links an already verified identity once and audits it.
- Claims: draft → submitted → supervisor review (when configured) → finance review (when configured) → approved for payment; submitted/review → needs changes → resubmitted; eligible unprocessed claim → cancelled; rejection requires a reason. No payment state until manual payment recording exists.
- Sick report: report absence independently of document; document may arrive later. Verification state does not erase reported absence. Medical detail stays restricted; finance gets classification only.
- Leave: draft → submitted → approved/rejected/needs clarification; cancellation is separately requested. Approved usage/reversal uses an append-only ledger with idempotency and concurrency checks.
- Timesheet: draft → submitted → approved/needs changes; approved edits require audited amendment and reapproval.
- Skills/certifications: proposed → submitted → verified/needs changes/rejected. Expiration is computed independently of review state.

Review routing with no eligible reviewer leaves work pending and displays a configuration issue; self-review is forbidden. All transitions must validate current state, scope, permission, separation of duties, and record version in the backend.
