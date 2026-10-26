# One-time initial HR administrator bootstrap

This is an operator-only process. Do not expose it through an app route or execute it against production without owner approval. Use a new isolated Supabase project, an approved individual email, a recorded change ticket, and a second reviewer.

1. In Supabase Dashboard Authentication > Users, create the designated operator identity with verified email. Do not set a shared/default password. Require the operator to use password recovery after the employee mapping is created.
2. Copy the Auth user's UUID. Review the SQL file and replace every `REPLACE_WITH_*` value with approved synthetic/staging details first. The employee ID, real name, and employment start date require HR authorization.
3. Run the SQL once in the target project's SQL editor. It fails if that identity is already mapped or if an HR bootstrap event already exists. The audit entry records the operator/ticket reference without falsely naming the new admin as the operator.
4. The account is assigned WORKER and HR_ADMIN. Sign in, establish a unique password, enroll TOTP MFA, verify management access, and verify the app's AAL2 checks.
5. A second operator confirms the role/profile and records evidence. Remove the one-time script from any operator workstation and do not reuse it for routine role changes.

Replace placeholders only after approval; this file does not contain credentials and was not executed.
