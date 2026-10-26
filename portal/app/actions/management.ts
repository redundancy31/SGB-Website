"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { portalOrigin } from "@/lib/supabase/config";
import { getPortalContext, type PortalRole } from "@/lib/auth/context";
import type { FormState } from "./auth";

async function requireManagement(allowed: PortalRole[] = ["HR_ADMIN"]) {
  const context = await getPortalContext();
  if (!context || context.aal !== "aal2" || !allowed.some((role) => context.roles.includes(role))) return null;
  return context;
}

export async function createEmployeeAndInviteAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const context = await requireManagement(["HR_ADMIN"]);
  if (!context) return { error: "This action requires an active HR account with MFA." };
  const employeeNumber = String(formData.get("employee_number") ?? "").trim();
  const name = String(formData.get("legal_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const position = String(formData.get("position") ?? "").trim();
  const startDate = String(formData.get("employment_start_date") ?? "");
  const teamRaw = String(formData.get("team_id") ?? "");
  const supervisorRaw = String(formData.get("supervisor_employee_id") ?? "");
  const teamId = teamRaw && /^[0-9a-f-]{36}$/i.test(teamRaw) ? teamRaw : null;
  const supervisorId = supervisorRaw && /^[0-9a-f-]{36}$/i.test(supervisorRaw) ? supervisorRaw : null;
  if (!employeeNumber || employeeNumber.length > 40 || !name || name.length > 160 || !email || email.length > 320 || !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    return { error: "Complete the required fields with valid values." };
  }
  if ((teamRaw && !teamId) || (supervisorRaw && !supervisorId)) return { error: "Team or supervisor selection is invalid." };

  const { data: created, error: createError } = await context.supabase.rpc("create_employee_invitation", {
    p_employee_number: employeeNumber, p_legal_name: name, p_email: email,
    p_position: position || null, p_team_id: teamId, p_supervisor_employee_id: supervisorId, p_start_date: startDate
  });
  const row = Array.isArray(created) ? created[0] : created;
  if (createError || !row?.employee_id || !row?.invitation_id) return { error: "The employee record could not be created. Check for duplicate employee number or invitation." };

  try {
    const admin = createAdminClient();
    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo: `${portalOrigin()}/` });
    const providerUserId = data.user?.id ?? null;
    const inviteFailed = Boolean(error || !providerUserId);
    const update = await admin.rpc("set_invitation_provider_result", {
      p_invitation_id: row.invitation_id,
      p_provider_user_id: providerUserId,
      p_status: inviteFailed ? "DELIVERY_FAILED" : "PENDING",
      p_error_code: inviteFailed ? (error ? "PROVIDER_INVITE_FAILED" : "PROVIDER_USER_MISSING") : null
    });
    if (update.error) return { error: "The employee record exists, but invitation status could not be saved. Ask an operator to reconcile it before retrying." };
    if (inviteFailed) return { error: "The employee record was saved, but the invitation could not be confirmed as sent. Check Supabase Auth email settings before retrying." };
    return { success: "Employee record created and invitation sent." };
  } catch {
    return { error: "The employee record was saved, but the invitation service is unavailable. The record remains pending; ask an operator to reconcile delivery." };
  }
}

export async function resendInvitationAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const context = await requireManagement(["HR_ADMIN"]);
  if (!context) return { error: "This action requires an active HR account with MFA." };
  const invitationId = String(formData.get("invitation_id") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(invitationId)) return { error: "Invitation record is invalid." };
  const reason = String(formData.get("reason") ?? "").trim();
  if (reason.length < 8 || reason.length > 500) return { error: "Provide a reason of 8 to 500 characters." };
  const { data: invitation, error } = await context.supabase.from("employee_invitations")
    .select("id,employee_id,target_email,provider_user_id,status,expires_at,revoked_at")
    .eq("id", invitationId).maybeSingle();
  if (error || !invitation || invitation.status === "ACTIVATED" || invitation.revoked_at) return { error: "This invitation cannot be resent. Check the account with an operator." };

  const admin = createAdminClient();
  if (invitation.provider_user_id) {
    const { data: userData, error: userError } = await admin.auth.admin.getUserById(invitation.provider_user_id);
    if (!userError && userData.user?.email_confirmed_at) return { error: "This identity is already confirmed but not linked. Stop and ask an operator to reconcile it." };
    if (!userError && userData.user) {
      if (userData.user.email?.toLowerCase() !== invitation.target_email.toLowerCase()) return { error: "Provider identity does not match the invited address. Operator review is required." };
      const { error: deleteError } = await admin.auth.admin.deleteUser(invitation.provider_user_id);
      if (deleteError) return { error: "Previous unconfirmed provider identity could not be revoked. No new invitation was sent." };
    }
  }

  const { data: replacementId, error: issueError } = await context.supabase.rpc("issue_employee_invitation", {
    p_employee_id: invitation.employee_id, p_email: invitation.target_email, p_reason: reason
  });
  if (issueError || !replacementId) return { error: "A replacement invitation could not be recorded." };
  const { data, error: inviteError } = await admin.auth.admin.inviteUserByEmail(invitation.target_email, { redirectTo: `${portalOrigin()}/` });
  const providerUserId = data.user?.id ?? null;
  const inviteFailed = Boolean(inviteError || !providerUserId);
  const { error: persistError } = await admin.rpc("set_invitation_provider_result", {
    p_invitation_id: replacementId, p_provider_user_id: providerUserId,
    p_status: inviteFailed ? "DELIVERY_FAILED" : "PENDING",
    p_error_code: inviteFailed ? (inviteError ? "PROVIDER_INVITE_FAILED" : "PROVIDER_USER_MISSING") : null
  });
  if (persistError) return { error: "Provider invitation was attempted, but application status could not be saved. Operator reconciliation is required." };
  if (inviteFailed) return { error: "The new invitation could not be confirmed as delivered. Check Supabase SMTP and retry after resolving the failed invitation." };
  return { success: "A new invitation was sent. Earlier application invitations are no longer eligible for activation." };
}

export async function revokeInvitationAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const context = await requireManagement(["HR_ADMIN"]);
  if (!context) return { error: "This action requires an active HR account with MFA." };
  const invitationId = String(formData.get("invitation_id") ?? "");
  const reason = String(formData.get("reason") ?? "").trim();
  if (!/^[0-9a-f-]{36}$/i.test(invitationId) || reason.length < 8 || reason.length > 500) return { error: "Invitation and reason are required." };
  const { error } = await context.supabase.rpc("revoke_employee_invitation", { p_invitation_id: invitationId, p_reason: reason });
  return error ? { error: "Invitation could not be revoked. It may already be activated or revoked." } : { success: "Application activation for this invitation is revoked." };
}

export async function updateEmployeeAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const context = await requireManagement(["HR_ADMIN"]);
  if (!context) return { error: "This action requires an active HR account with MFA." };
  const employeeId = String(formData.get("employee_id") ?? "");
  const position = String(formData.get("position") ?? "").slice(0, 120);
  const startDate = String(formData.get("employment_start_date") ?? "");
  const employmentStatus = String(formData.get("employment_status") ?? "");
  const teamRaw = String(formData.get("team_id") ?? "");
  const supervisorRaw = String(formData.get("supervisor_employee_id") ?? "");
  const reason = String(formData.get("reason") ?? "").trim();
  const teamId = teamRaw && /^[0-9a-f-]{36}$/i.test(teamRaw) ? teamRaw : null;
  const supervisorId = supervisorRaw && /^[0-9a-f-]{36}$/i.test(supervisorRaw) ? supervisorRaw : null;
  if ((teamRaw && !teamId) || (supervisorRaw && !supervisorId)) return { error: "Team or supervisor selection is invalid." };
  if (!/^[0-9a-f-]{36}$/i.test(employeeId) || !/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !["ACTIVE", "ON_LEAVE", "ENDED"].includes(employmentStatus) || reason.length < 8 || reason.length > 500) return { error: "Employee details and a change reason are required." };
  const { error } = await context.supabase.rpc("update_employee_admin", {
    p_employee_id: employeeId, p_position: position || null, p_team_id: teamId, p_supervisor_employee_id: supervisorId,
    p_start_date: startDate, p_employment_status: employmentStatus, p_reason: reason
  });
  return error ? { error: "Employee record could not be updated." } : { success: "Employee record updated." };
}

export async function createTeamAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const context = await requireManagement(["HR_ADMIN"]);
  if (!context) return { error: "This action requires an active HR account with MFA." };
  const name = String(formData.get("name") ?? "").trim();
  if (!name || name.length > 100) return { error: "Enter a team name up to 100 characters." };
  const { error } = await context.supabase.rpc("create_team", { p_name: name });
  return error ? { error: "The team could not be created. The name may already exist." } : { success: "Team created." };
}

export async function changeAccountStatusAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const context = await requireManagement(["HR_ADMIN", "PLATFORM_ADMIN"]);
  if (!context) return { error: "This action requires an active authorized management account with MFA." };
  const userId = String(formData.get("user_id") ?? "");
  const reason = String(formData.get("reason") ?? "").trim();
  const status = String(formData.get("status") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(userId) || reason.length < 8 || reason.length > 500 || !["ACTIVE", "SUSPENDED"].includes(status) || userId === context.userId) {
    return { error: "Provide a valid employee user ID, status, and reason. You cannot change your own account status." };
  }

  const admin = createAdminClient();
  if (status === "ACTIVE") {
    const { error: unbanError } = await admin.auth.admin.updateUserById(userId, { ban_duration: "none" });
    if (unbanError) return { error: "The Auth account could not be reinstated; application access remains suspended." };
  }
  const { error } = await context.supabase.rpc("set_employee_account_status", {
    p_user_id: userId, p_status: status, p_reason: reason
  });
  if (error) return { error: "Account status could not be changed. No success was recorded." };

  if (status === "SUSPENDED") {
    const { error: banError } = await admin.auth.admin.updateUserById(userId, { ban_duration: "876000h" });
    if (banError) return { error: "Portal reads and writes are blocked by database status, but the Supabase sign-in ban failed and needs operator follow-up." };
    return { success: "Portal reads and writes are blocked and new sign-ins are banned. Existing JWTs may remain valid until expiration." };
  }
  return { success: "Account access reinstated." };
}

export async function changeRoleAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const context = await requireManagement(["HR_ADMIN", "PLATFORM_ADMIN"]);
  if (!context) return { error: "This action requires an active authorized management account with MFA." };
  const userId = String(formData.get("user_id") ?? "");
  const role = String(formData.get("role") ?? "") as PortalRole;
  const reason = String(formData.get("reason") ?? "").trim();
  const action = String(formData.get("action") ?? "grant");
  const roles: PortalRole[] = ["WORKER", "SUPERVISOR", "HR_ADMIN", "FINANCE", "PLATFORM_ADMIN"];
  if (!/^[0-9a-f-]{36}$/i.test(userId) || userId === context.userId || !roles.includes(role) || reason.length < 8 || reason.length > 500) return { error: "Provide a valid target user, role, and reason. Self role changes are prohibited." };
  const { error } = await context.supabase.rpc(action === "revoke" ? "revoke_employee_role" : "assign_employee_role", {
    p_user_id: userId, p_role: role, p_reason: reason
  });
  return error ? { error: "Role change was denied or could not be recorded." } : { success: "Role change recorded." };
}
