import { requireRole } from "@/lib/auth/context";
import { AccountStatusForm, EmployeeCreateForm, EmployeeEditForm, TeamCreateForm, InvitationActions } from "@/app/components/forms";

export const metadata = { title: "Employee Management" };

type EmployeeRow = {
  id: string; employee_number: string; legal_name: string; position: string | null; team_id: string | null; supervisor_employee_id: string | null;
  employee_hr_details: { employment_start_date: string; employment_status: string } | null;
  user_employee_links: { user_id: string; account_status: string; employee_roles: { role: string }[] }[] | { user_id: string; account_status: string; employee_roles: { role: string }[] } | null;
  employee_invitations: { id: string; target_email: string; status: string; created_at: string; expires_at: string; revoked_at: string | null }[];
};

export default async function EmployeesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const context = await requireRole(["HR_ADMIN"]);
  const params = await searchParams;
  const page = Math.max(1, Math.min(1000, Number.parseInt(params.page ?? "1", 10) || 1));
  const pageSize = 25;
  const [{ data: result, count, error }, { data: teamRows }, { data: allEmployees, error: allError }] = await Promise.all([
    context.supabase.from("employees")
      .select("id,employee_number,legal_name,position,team_id,supervisor_employee_id,employee_hr_details(employment_start_date,employment_status),user_employee_links(user_id,account_status,employee_roles(role)),employee_invitations(id,target_email,status,created_at,expires_at,revoked_at)", { count: "exact" })
      .order("employee_number").range((page - 1) * pageSize, page * pageSize - 1),
    context.supabase.from("teams").select("id,name").order("name"),
    context.supabase.from("employees").select("id,legal_name").order("legal_name").range(0, 499)
  ]);
  const employees = (result ?? []) as unknown as EmployeeRow[];
  const teams = (teamRows ?? []) as { id: string; name: string }[];
  const teamNames = new Map(teams.map((team) => [team.id, team.name]));
  const allStaff = (allEmployees ?? []) as { id: string; legal_name: string }[];
  const pages = Math.max(1, Math.ceil((count ?? 0) / pageSize));
  return <section className="stack">
    <h1>Employee Management</h1><p className="muted">HR records and access details. Management access requires MFA (AAL2). The supervisor list is capped at 500 records per request.</p>
    {error && <p className="notice error">Employee records could not be loaded. Check database configuration and access.</p>}
    {allError && <p className="notice error">Team and supervisor selectors are unavailable until the employee directory is accessible.</p>}
    <section className="panel wide"><EmployeeCreateForm teams={teams} supervisors={allStaff} /></section>
    <section className="panel wide"><h2>Teams</h2><TeamCreateForm /><ul>{teams.map((team) => <li key={team.id}>{team.name}</li>)}</ul></section>
    <div className="table-wrap"><table><thead><tr><th>Employee</th><th>Employment</th><th>Invitation</th><th>Portal account</th><th>Edit</th></tr></thead>
      <tbody>{employees.map((employee) => {
        const details = employee.employee_hr_details;
        const links = Array.isArray(employee.user_employee_links) ? employee.user_employee_links : employee.user_employee_links ? [employee.user_employee_links] : [];
        const link = links[0];
        const invitation = employee.employee_invitations?.sort((a, b) => b.created_at.localeCompare(a.created_at))[0];
        const supervisor = allStaff.find((person) => person.id === employee.supervisor_employee_id);
        const expired = Boolean(invitation && new Date(invitation.expires_at).getTime() <= Date.now());
        return <tr key={employee.id}><td><strong>{employee.legal_name}</strong><br />{employee.employee_number}<br />{employee.position ?? "Position unassigned"}<br />{teamNames.get(employee.team_id ?? "") ?? "Team not assigned"}<br />Supervisor: {supervisor?.legal_name ?? "Not assigned"}</td>
          <td>{details?.employment_status ?? "Pending"}<br />Start: {details?.employment_start_date ?? "Not recorded"}</td>
          <td>{invitation ? <>{invitation.target_email}<br />{expired && invitation.status === "PENDING" ? "EXPIRED" : invitation.status}<br /><time dateTime={invitation.created_at}>{new Date(invitation.created_at).toLocaleDateString("en-SG", { timeZone: "Asia/Singapore" })}</time>{invitation.revoked_at ? null : <InvitationActions invitationId={invitation.id} status={invitation.status} expired={expired} />}</> : "No invitation record"}</td>
          <td>{link ? <><code>{link.user_id}</code><br />{link.account_status}<br />Roles: {link.employee_roles.map((item) => item.role).join(", ") || "None"}<AccountStatusForm userId={link.user_id} suspended={link.account_status === "SUSPENDED"} /></> : "Not activated"}</td>
          <td><details><summary>Edit employment record</summary><EmployeeEditForm employee={{ id: employee.id, position: employee.position, employment_start_date: details?.employment_start_date ?? "", employment_status: details?.employment_status ?? "ACTIVE", team_id: employee.team_id, supervisor_employee_id: employee.supervisor_employee_id }} teams={teams} supervisors={allStaff} /></details></td>
        </tr>;
      })}</tbody></table></div>
    <nav className="row" aria-label="Employee list pages"><span>Page {page} of {pages} · {count ?? 0} records</span>{page > 1 && <a href={`/management/employees?page=${page - 1}`}>Previous</a>}{page < pages && <a href={`/management/employees?page=${page + 1}`}>Next</a>}</nav>
  </section>;
}
