import { requireRole } from "@/lib/auth/context";
import { RoleForm } from "@/app/components/forms";

export const metadata = { title: "Access Management" };

export default async function AccessPage() {
  const context = await requireRole(["HR_ADMIN", "PLATFORM_ADMIN"]);
  const canAssignAdmins = context.roles.includes("PLATFORM_ADMIN");
  return <section className="panel"><h1>Access Management</h1>
    <p className="muted">Role changes require MFA, a reason, and an active linked employee account. You cannot change your own roles. HR can assign operational roles; PLATFORM_ADMIN can assign all role templates but does not receive employee-record access.</p>
    <RoleForm canAssignAdmins={canAssignAdmins} />
    <p className="muted">Use the Auth user ID shown on an HR employee record. Platform administrators can obtain a user ID through the approved operator workflow without accessing profile data.</p>
  </section>;
}
