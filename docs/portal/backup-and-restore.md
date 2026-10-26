# Backup and restore

No database, object store, backup job, or backup verification is configured. Do not assume a backup exists.

Before launch document provider-native encrypted backup schedules, access controls, retention and region; coordinate database snapshots with object versions and audit/outbox consistency; specify RPO/RTO with owners; and run a restoration drill in an isolated environment using synthetic or approved protected data. Reapply deletion/legal-hold state after restoration. Record evidence, gaps, approver, and next drill date. Never restore production data into development.
