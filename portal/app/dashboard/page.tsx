import Link from "next/link";
import { requirePortalContext } from "@/lib/auth/context";
import { calculateTenure } from "@/lib/tenure";

export const metadata = { title: "Home" };

function formatDate(value: string | null) {
  if (!value) return "Not recorded";
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-SG", { dateStyle: "long", timeZone: "Asia/Singapore" }).format(new Date(Date.UTC(year, month - 1, day)));
}

export default async function DashboardPage() {
  const context = await requirePortalContext();
  const [{ data: employee }, { data: hr }] = await Promise.all([
    context.supabase.from("employees").select("id,employee_number,legal_name,position,team_id").eq("id", context.employeeId).maybeSingle(),
    context.supabase.from("employee_hr_details").select("employment_start_date,employment_status,contact_phone").eq("employee_id", context.employeeId).maybeSingle()
  ]);
  const team = employee?.team_id
    ? (await context.supabase.from("teams").select("name").eq("id", employee.team_id).maybeSingle()).data
    : null;
  const startDate = hr?.employment_start_date as string | undefined;
  const currentDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Singapore", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return <section>
    <h1>Welcome{employee?.legal_name ? `, ${employee.legal_name}` : ""}</h1>
    <p className="muted">Employment details shown here are scoped to your own account. Dates use the Singapore calendar.</p>
    {!employee || !hr ? <p className="notice error">Your employee profile could not be loaded. Contact HR; do not create another account.</p> : <dl className="grid">
      <div className="metric"><dt>Employee ID</dt><dd>{employee.employee_number}</dd></div>
      <div className="metric"><dt>Position</dt><dd>{employee.position ?? "Not assigned"}</dd></div>
      <div className="metric"><dt>Team</dt><dd>{team?.name ?? "Not assigned"}</dd></div>
      <div className="metric"><dt>Employment start date</dt><dd>{formatDate(startDate ?? null)}</dd></div>
      <div className="metric"><dt>Company tenure</dt><dd>{startDate ? calculateTenure(startDate, new Date(`${currentDate}T12:00:00+08:00`)) : "Not available"}</dd></div>
      <div className="metric"><dt>Employment status</dt><dd>{hr.employment_status}</dd></div>
    </dl>}
    <div className="row" style={{ marginTop: "1rem" }}><Link className="button secondary" href="/account">My Profile</Link><Link className="button secondary" href="/account/security">Account &amp; Security</Link></div>
    {context.roles.some((role) => ["SUPERVISOR", "HR_ADMIN", "FINANCE", "PLATFORM_ADMIN"].includes(role)) && <p className="notice" style={{ marginTop: "1rem" }}>Management actions require an enrolled MFA factor and a verified AAL2 session.</p>}
    <h2>Portal services</h2><p className="notice">Claims, leave and sickness reporting, timesheets, certifications, and notifications are not available yet. Do not send those records through email or this site.</p>
  </section>;
}
