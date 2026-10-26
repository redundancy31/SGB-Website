import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type PortalRole = "WORKER" | "SUPERVISOR" | "HR_ADMIN" | "FINANCE" | "PLATFORM_ADMIN";

export async function getPortalContext() {
  const supabase = await createClient();
  const { data: claimData, error: claimError } = await supabase.auth.getClaims();
  const claims = claimData?.claims;
  if (claimError || !claims?.sub) return null;

  const userId = claims.sub;
  const [{ data: link, error: linkError }, { data: roles, error: roleError }] = await Promise.all([
    supabase.from("user_employee_links").select("employee_id, account_status").eq("user_id", userId).maybeSingle(),
    supabase.from("employee_roles").select("role").eq("user_id", userId)
  ]);
  if (linkError || roleError || !link || link.account_status !== "ACTIVE") return null;

  return {
    supabase, userId,
    employeeId: link.employee_id as string,
    roles: (roles ?? []).map((item: { role: PortalRole }) => item.role),
    aal: typeof claims.aal === "string" ? claims.aal : "aal1"
  };
}

export async function requirePortalContext() {
  const context = await getPortalContext();
  if (!context) redirect("/login?error=sign-in");
  return context;
}

export async function requireRole(allowed: PortalRole[]) {
  const context = await requirePortalContext();
  if (!allowed.some((role) => context.roles.includes(role))) redirect("/dashboard?error=not-authorized");
  if (context.roles.some((role) => ["SUPERVISOR", "HR_ADMIN", "FINANCE", "PLATFORM_ADMIN"].includes(role)) && context.aal !== "aal2") {
    redirect("/account/security?required=1");
  }
  return context;
}
