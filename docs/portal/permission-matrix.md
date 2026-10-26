# Permission matrix (Stage 1 partially enforced; workflow permissions remain proposed)

| Capability | Worker | Supervisor | HR Admin | Finance | Platform Admin |
|---|---|---|---|---|---|
| Own profile / own submissions | Read; edit approved contact fields | Own records | HR scope | None by default | None by default |
| Team operational records | Own absence only | Assigned team; minimum necessary | Organization HR scope | Claim classification only | None by default |
| Employment record management | None | None | Manage | None | Technical account/config only |
| Invitation and role assignment | None | None | Manage approved roles | None | Access administration, no HR content by default |
| Skills/certifications | Submit/read own | Verify where assigned | Verify/manage | None | None |
| Claims | Create/read own | Review assigned claims | Review/manage | Review finance stage; record manual payment only if enabled | None |
| Sick report | Create/read own | Operational absence dates only | Verify/classify with explicit medical permission | Classification only; no MC download | No medical access by role alone |
| Ordinary leave | Create/read own | Review assigned team | Policy/manage and authorized review | None | None |
| Timesheets | Create/read own | Review assigned team | HR scope only if approved | None | None |
| Audit | Own action confirmation only | Scoped where authorized | Scoped HR audit | Scoped finance audit | Access/config events only by default |
| Privacy requests | Submit own | None | Handle only when designated | None | System support, no content access by default |

Stage 1 enforces worker self row scope, HR employee management, supervisor direct-report operational rows, platform/HR access-role changes, active-account checks, and MFA/AAL2 for privileged actions. Role rows cannot be edited directly by client roles. Platform administrators do not read employee records through RLS. Future claim/medical/leave/timesheet permissions are not implemented. The full matrix still requires HR/DPO approval and backend enforcement before those features are used.
