"use client";

import { useActionState, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { FormState } from "@/app/actions/auth";
import { establishPasswordAction, loginAction, requestRecoveryAction, updateOwnPhoneAction } from "@/app/actions/auth";
import { createEmployeeAndInviteAction, changeAccountStatusAction, changeRoleAction, updateEmployeeAction, createTeamAction, resendInvitationAction, revokeInvitationAction } from "@/app/actions/management";
import { createClient } from "@/lib/supabase/browser";

const initial: FormState = {};

function Feedback({ state }: { state: FormState }) {
  if (state.error) return <p className="notice error" role="alert">{state.error}</p>;
  if (state.success) return <p className="notice" role="status">{state.success}</p>;
  return null;
}

export function LoginForm({ next = "/dashboard" }: { next?: string }) {
  const [state, action, pending] = useActionState(loginAction, initial);
  return <form action={action} className="stack">
    <input type="hidden" name="next" value={next} />
    <label>Email address<input name="email" type="email" autoComplete="username" required maxLength={320} /></label>
    <label>Password<input name="password" type="password" autoComplete="current-password" required maxLength={1024} /></label>
    <Feedback state={state} />
    <button disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
  </form>;
}

export function RecoveryForm() {
  const [state, action, pending] = useActionState(requestRecoveryAction, initial);
  return <form action={action} className="stack">
    <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={320} /></label>
    <Feedback state={state} />
    <button disabled={pending}>{pending ? "Sending…" : "Send recovery instructions"}</button>
  </form>;
}

export function PasswordForm() {
  const [state, action, pending] = useActionState(establishPasswordAction, initial);
  return <form action={action} className="stack">
    <label>New password<input name="password" type="password" autoComplete="new-password" minLength={12} maxLength={1024} required /></label>
    <label>Confirm password<input name="confirmation" type="password" autoComplete="new-password" minLength={12} maxLength={1024} required /></label>
    <Feedback state={state} />
    <button disabled={pending}>{pending ? "Saving…" : "Set password"}</button>
  </form>;
}

export function PhoneForm({ phone }: { phone: string | null }) {
  const [state, action, pending] = useActionState(updateOwnPhoneAction, initial);
  return <form action={action} className="stack">
    <label>Contact phone (optional)<input name="contact_phone" type="tel" autoComplete="tel" maxLength={40} defaultValue={phone ?? ""} /></label>
    <Feedback state={state} />
    <button disabled={pending}>{pending ? "Saving…" : "Save contact number"}</button>
  </form>;
}

export function EmployeeCreateForm({ teams, supervisors }: { teams: { id: string; name: string }[]; supervisors: { id: string; legal_name: string }[] }) {
  const [state, action, pending] = useActionState(createEmployeeAndInviteAction, initial);
  const router = useRouter();
  useEffect(() => { if (state.success) router.refresh(); }, [state.success, router]);
  return <form action={action} className="stack">
    <h2>Create employee and send invitation</h2>
    <div className="grid">
      <label>Employee ID<input name="employee_number" required maxLength={40} /></label>
      <label>Legal/display name<input name="legal_name" required maxLength={160} /></label>
      <label>Individual email<input name="email" type="email" required maxLength={320} /></label>
      <label>Position<input name="position" maxLength={120} /></label>
      <label>Employment start date<input name="employment_start_date" type="date" required /></label>
      <label>Team<select name="team_id" defaultValue=""><option value="">Not assigned</option>{teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}</select></label>
      <label>Supervisor<select name="supervisor_employee_id" defaultValue=""><option value="">Not assigned</option>{supervisors.map((person) => <option key={person.id} value={person.id}>{person.legal_name}</option>)}</select></label>
    </div>
    <Feedback state={state} />
    <button disabled={pending}>{pending ? "Creating…" : "Create and invite"}</button>
    <p className="muted">The invitation email is sent by Supabase Auth. Do not use production worker addresses in local development.</p>
  </form>;
}

export function EmployeeEditForm({ employee, teams, supervisors }: {
  employee: { id: string; position: string | null; employment_start_date: string; employment_status: string; team_id: string | null; supervisor_employee_id: string | null };
  teams: { id: string; name: string }[]; supervisors: { id: string; legal_name: string }[];
}) {
  const [state, action, pending] = useActionState(updateEmployeeAction, initial);
  const router = useRouter();
  useEffect(() => { if (state.success) router.refresh(); }, [state.success, router]);
  return <form action={action} className="stack">
    <input type="hidden" name="employee_id" value={employee.id} />
    <label>Position<input name="position" maxLength={120} defaultValue={employee.position ?? ""} /></label>
    <label>Start date<input name="employment_start_date" type="date" required defaultValue={employee.employment_start_date} /></label>
    <label>Employment status<select name="employment_status" defaultValue={employee.employment_status}><option>ACTIVE</option><option>ON_LEAVE</option><option>ENDED</option></select></label>
    <label>Team<select name="team_id" defaultValue={employee.team_id ?? ""}><option value="">Not assigned</option>{teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}</select></label>
    <label>Supervisor<select name="supervisor_employee_id" defaultValue={employee.supervisor_employee_id ?? ""}><option value="">Not assigned</option>{supervisors.filter((item) => item.id !== employee.id).map((person) => <option key={person.id} value={person.id}>{person.legal_name}</option>)}</select></label>
    <label>Reason for change<input name="reason" required minLength={8} maxLength={500} /></label>
    <Feedback state={state} /><button className="secondary" disabled={pending}>{pending ? "Saving…" : "Save employment record"}</button>
  </form>;
}

export function TeamCreateForm() {
  const [state, action, pending] = useActionState(createTeamAction, initial);
  const router = useRouter();
  useEffect(() => { if (state.success) router.refresh(); }, [state.success, router]);
  return <form action={action} className="stack">
    <label>Team name<input name="name" required maxLength={100} /></label>
    <Feedback state={state} />
    <button className="secondary" disabled={pending}>{pending ? "Creating…" : "Add team"}</button>
  </form>;
}

export function InvitationActions({ invitationId, status, expired }: { invitationId: string; status: string; expired: boolean }) {
  const [resendState, resendAction, resendPending] = useActionState(resendInvitationAction, initial);
  const [revokeState, revokeAction, revokePending] = useActionState(revokeInvitationAction, initial);
  const router = useRouter();
  useEffect(() => { if (resendState.success || revokeState.success) router.refresh(); }, [resendState.success, revokeState.success, router]);
  if (!["PENDING", "DELIVERY_FAILED"].includes(status)) return null;
  return <div className="stack">
    <details><summary>Resend invitation</summary><form action={resendAction} className="stack"><input type="hidden" name="invitation_id" value={invitationId} />
      <label>Reason<input name="reason" required minLength={8} maxLength={500} /></label><Feedback state={resendState} />
      <button className="secondary" disabled={resendPending}>{resendPending ? "Sending…" : "Issue a fresh invitation"}</button>
      <p className="muted">Resend deletes only a matching, unconfirmed Auth identity after verifying it is not linked to an employee. Confirmed but unlinked identities require operator review.</p>
    </form></details>
    <details><summary>Revoke invitation</summary><form action={revokeAction} className="stack"><input type="hidden" name="invitation_id" value={invitationId} />
      <label>Reason<input name="reason" required minLength={8} maxLength={500} /></label><Feedback state={revokeState} />
      <button className="secondary" disabled={revokePending}>{revokePending ? "Revoking…" : "Revoke activation"}</button>
      <p className="muted">This blocks application activation. Supabase Auth does not expose provider-link revocation by invitation ID; a pending unconfirmed identity is removed during a resend.</p>
    </form></details>
  </div>;
}

export function AccountStatusForm({ userId, suspended }: { userId: string; suspended: boolean }) {
  const [state, action, pending] = useActionState(changeAccountStatusAction, initial);
  const router = useRouter();
  useEffect(() => { if (state.success) router.refresh(); }, [state.success, router]);
  return <form action={action} className="stack">
    <input type="hidden" name="user_id" value={userId} />
    <label>Reason<input name="reason" required minLength={8} maxLength={500} /></label>
    <input type="hidden" name="status" value={suspended ? "ACTIVE" : "SUSPENDED"} />
    <Feedback state={state} /><button className="secondary" disabled={pending}>{pending ? "Updating…" : suspended ? "Reinstate account" : "Suspend account"}</button>
  </form>;
}

export function RoleForm({ canAssignAdmins }: { canAssignAdmins: boolean }) {
  const [state, action, pending] = useActionState(changeRoleAction, initial);
  return <form action={action} className="stack">
    <label>Target employee Auth user ID<input name="user_id" required inputMode="text" autoComplete="off" /></label>
    <label>Role<select name="role" defaultValue="WORKER"><option>WORKER</option><option>SUPERVISOR</option><option>FINANCE</option>{canAssignAdmins && <><option>HR_ADMIN</option><option>PLATFORM_ADMIN</option></>}</select></label>
    <label>Reason<input name="reason" required minLength={8} maxLength={500} /></label>
    <div className="row"><button name="action" value="grant" disabled={pending}>Grant role</button><button className="secondary" name="action" value="revoke" disabled={pending}>Revoke role</button></div>
    <Feedback state={state} />
  </form>;
}

export function MfaSetup() {
  const [client, setClient] = useState<ReturnType<typeof createClient> | null>(null);
  const [factorId, setFactorId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [needsEnrollment, setNeedsEnrollment] = useState(false);
  const [aal2, setAal2] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setClient(createClient());
  }, []);

  useEffect(() => {
    let alive = true;
    void (async () => {
      if (!client) return;
      const [{ data: factors }, { data: assurance }] = await Promise.all([
        client.auth.mfa.listFactors(), client.auth.mfa.getAuthenticatorAssuranceLevel()
      ]);
      if (!alive) return;
      const verified = factors?.totp?.find((factor: { id: string; status: string }) => factor.status === "verified");
      if (verified && assurance?.currentLevel === "aal2") {
        setAal2(true);
        setStatus("Multi-factor authentication is active for this session.");
      } else if (verified) {
        setFactorId(verified.id);
        setStatus("Enter the current code from your authenticator app to elevate this session.");
      } else {
        setNeedsEnrollment(true);
        setStatus("Set up an authenticator app to access management functions.");
      }
    })();
    return () => { alive = false; };
  }, [client]);

  async function beginEnrollment() {
    if (!client) return;
    setBusy(true); setStatus("");
    const { data, error } = await client.auth.mfa.enroll({ factorType: "totp", friendlyName: "SGB employee portal" });
    setBusy(false);
    if (error || !data?.id || !data.totp) { setStatus("MFA setup could not start. Contact the portal administrator."); return; }
    setFactorId(data.id); setQrCode(data.totp.qr_code); setSecret(data.totp.secret); setNeedsEnrollment(false);
    setStatus("Scan the QR code, then enter the six digit authenticator code.");
  }

  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true);
    if (!client) { setBusy(false); return; }
    const { error } = await client.auth.mfa.challengeAndVerify({ factorId, code: code.trim() });
    setBusy(false);
    if (error) { setStatus("That code could not be verified. Try the current code from your authenticator."); return; }
    setAal2(true); setQrCode(""); setSecret(""); setCode("");
    setStatus("MFA verified.");
    router.refresh();
  }

  return <div className="stack">
    <p className="notice" role="status">{status || "Loading MFA status…"}</p>
    {needsEnrollment && <button disabled={busy} onClick={beginEnrollment}>{busy ? "Starting…" : "Set up MFA"}</button>}
    {qrCode && <div className="stack"><img src={qrCode} alt="Authenticator enrollment QR code" width="220" height="220" /><p>Manual setup code: <strong>{secret}</strong></p>
      <form className="stack" onSubmit={verify}><label>Authenticator code<input value={code} onChange={(event) => setCode(event.target.value)} inputMode="numeric" pattern="[0-9]{6,8}" autoComplete="one-time-code" minLength={6} maxLength={8} required /></label><button disabled={busy}>{busy ? "Verifying…" : "Verify and enable MFA"}</button></form>
    </div>}
    {!qrCode && factorId && !aal2 && <form className="stack" onSubmit={verify}><label>Authenticator code<input value={code} onChange={(event) => setCode(event.target.value)} inputMode="numeric" autoComplete="one-time-code" minLength={6} maxLength={8} required /></label><button disabled={busy}>{busy ? "Verifying…" : "Verify MFA"}</button></form>}
  </div>;
}
