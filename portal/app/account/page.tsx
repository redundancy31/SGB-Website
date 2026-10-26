import { requirePortalContext } from "@/lib/auth/context";
import { PhoneForm } from "@/app/components/forms";

export const metadata = { title: "My Profile" };

export default async function AccountPage() {
  const context = await requirePortalContext();
  const [{ data: employee }, { data: hr }] = await Promise.all([
    context.supabase.from("employees").select("employee_number,legal_name,position,team_id").eq("id", context.employeeId).maybeSingle(),
    context.supabase.from("employee_hr_details").select("contact_phone").eq("employee_id", context.employeeId).maybeSingle()
  ]);
  const teamName = employee?.team_id
    ? (await context.supabase.from("teams").select("name").eq("id", employee.team_id).maybeSingle()).data?.name
    : null;
  if (!employee) return <section className="panel"><h1>My Profile</h1><p className="notice error">Profile unavailable. Contact HR.</p></section>;
  return <section className="panel"><h1>My Profile</h1><dl className="stack">
    <div><dt>Employee ID</dt><dd>{employee.employee_number}</dd></div><div><dt>Name</dt><dd>{employee.legal_name}</dd></div>
    <div><dt>Position</dt><dd>{employee.position ?? "Not assigned"}</dd></div><div><dt>Team</dt><dd>{teamName ?? "Not assigned"}</dd></div>
  </dl><h2>Contact details</h2><PhoneForm phone={hr?.contact_phone ?? null} /></section>;
}
