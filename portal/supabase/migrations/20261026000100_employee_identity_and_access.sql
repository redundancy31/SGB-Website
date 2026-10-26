begin;

create type public.portal_role as enum ('WORKER', 'SUPERVISOR', 'HR_ADMIN', 'FINANCE', 'PLATFORM_ADMIN');
create type public.employment_status as enum ('ACTIVE', 'ON_LEAVE', 'ENDED');
create type public.account_status as enum ('PENDING', 'ACTIVE', 'SUSPENDED');
create type public.invitation_status as enum ('PREPARING', 'PENDING', 'DELIVERY_FAILED', 'REVOKED', 'ACTIVATED', 'EXPIRED');

create schema if not exists portal_private;
revoke all on schema portal_private from public, anon;
grant usage on schema portal_private to authenticated;

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (length(trim(name)) between 1 and 100),
  created_at timestamptz not null default now()
);

create table public.employees (
  id uuid primary key default gen_random_uuid(),
  employee_number text not null unique check (length(trim(employee_number)) between 1 and 40),
  legal_name text not null check (length(trim(legal_name)) between 1 and 160),
  position text check (position is null or length(position) <= 120),
  team_id uuid references public.teams(id) on delete set null,
  supervisor_employee_id uuid references public.employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (supervisor_employee_id is null or supervisor_employee_id <> id)
);

-- HR-controlled dates/status and contact data are separated from supervisor-visible operational fields.
create table public.employee_hr_details (
  employee_id uuid primary key references public.employees(id) on delete restrict,
  employment_start_date date not null,
  employment_status public.employment_status not null default 'ACTIVE',
  contact_phone text check (contact_phone is null or length(contact_phone) <= 40),
  updated_at timestamptz not null default now()
);

create table public.user_employee_links (
  user_id uuid primary key references auth.users(id) on delete restrict,
  employee_id uuid not null unique references public.employees(id) on delete restrict,
  account_status public.account_status not null default 'ACTIVE',
  revoked_before timestamptz,
  linked_at timestamptz not null default now(),
  status_updated_at timestamptz not null default now()
);

create table public.employee_roles (
  user_id uuid not null references auth.users(id) on delete restrict,
  role public.portal_role not null,
  granted_by uuid references auth.users(id) on delete set null,
  granted_at timestamptz not null default now(),
  primary key (user_id, role)
);

create table public.employee_invitations (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete restrict,
  target_email text not null check (length(target_email) <= 320),
  provider_user_id uuid references auth.users(id) on delete set null,
  status public.invitation_status not null default 'PREPARING',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '3 days'),
  revoked_at timestamptz,
  activated_at timestamptz,
  delivery_error_code text check (delivery_error_code is null or length(delivery_error_code) <= 80)
);

create unique index employee_invitation_open_email_uq
  on public.employee_invitations (lower(target_email))
  where status in ('PREPARING', 'PENDING', 'DELIVERY_FAILED') and revoked_at is null;
create index employees_supervisor_idx on public.employees(supervisor_employee_id);
create index employees_team_idx on public.employees(team_id);

create table public.audit_events (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null check (length(action) between 1 and 100),
  resource_type text not null check (length(resource_type) between 1 and 80),
  resource_id text,
  outcome text not null default 'success' check (outcome in ('success', 'failure')),
  reason text check (reason is null or length(reason) <= 500),
  changed_fields text[] not null default '{}',
  created_at timestamptz not null default now()
);

create or replace function portal_private.current_account_active()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1
    from public.user_employee_links l
    join auth.sessions s on s.user_id = l.user_id
    where l.user_id = (select auth.uid())
      and l.account_status = 'ACTIVE'
      and s.id = nullif((select auth.jwt() ->> 'session_id'), '')::uuid
      and (l.revoked_before is null or s.created_at > l.revoked_before)
  )
$$;

create or replace function portal_private.current_employee_id()
returns uuid language sql stable security definer set search_path = '' as $$
  select l.employee_id from public.user_employee_links l
  where l.user_id = (select auth.uid()) and portal_private.current_account_active()
$$;

create or replace function portal_private.has_role(required_role public.portal_role)
returns boolean language sql stable security definer set search_path = '' as $$
  select portal_private.current_account_active() and exists (
    select 1 from public.employee_roles r where r.user_id = (select auth.uid()) and r.role = required_role)
$$;

create or replace function portal_private.is_privileged_aal2()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((select auth.jwt() ->> 'aal') = 'aal2', false)
$$;

create or replace function portal_private.can_manage_employees()
returns boolean language sql stable security definer set search_path = '' as $$
  select portal_private.is_privileged_aal2() and portal_private.has_role('HR_ADMIN')
$$;

create or replace function portal_private.can_manage_access()
returns boolean language sql stable security definer set search_path = '' as $$
  select portal_private.is_privileged_aal2() and
    (portal_private.has_role('HR_ADMIN') or portal_private.has_role('PLATFORM_ADMIN'))
$$;

create or replace function portal_private.is_assigned_supervisor(target_employee_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select portal_private.is_privileged_aal2() and portal_private.has_role('SUPERVISOR') and exists (
    select 1 from public.employees e where e.id = target_employee_id
      and e.supervisor_employee_id = portal_private.current_employee_id())
$$;

grant execute on function portal_private.current_employee_id() to authenticated;
grant execute on function portal_private.current_account_active() to authenticated;
grant execute on function portal_private.has_role(public.portal_role) to authenticated;
grant execute on function portal_private.is_privileged_aal2() to authenticated;
grant execute on function portal_private.can_manage_employees() to authenticated;
grant execute on function portal_private.can_manage_access() to authenticated;
grant execute on function portal_private.is_assigned_supervisor(uuid) to authenticated;

create or replace function portal_private.write_audit_event()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  actor uuid;
  resource text;
  changes text[] := '{}';
begin
  actor := coalesce(auth.uid(), case when tg_table_name = 'employee_invitations' then coalesce(new.created_by, old.created_by) else null end);
  if tg_op = 'INSERT' then
    resource := case when tg_table_name = 'employee_hr_details' then new.employee_id::text else new.id::text end;
    if tg_table_name = 'employees' then
      changes := array['employee_number', 'legal_name', 'position', 'team_id', 'supervisor_employee_id'];
    elsif tg_table_name = 'employee_hr_details' then
      changes := array['employment_start_date', 'employment_status'];
    else
      changes := array['employee_id', 'target_email', 'status'];
    end if;
  elsif tg_op = 'UPDATE' then
    resource := case when tg_table_name = 'employee_hr_details' then new.employee_id::text else new.id::text end;
    if tg_table_name = 'employees' then
      if new.employee_number is distinct from old.employee_number then changes := array_append(changes, 'employee_number'); end if;
      if new.legal_name is distinct from old.legal_name then changes := array_append(changes, 'legal_name'); end if;
      if new.position is distinct from old.position then changes := array_append(changes, 'position'); end if;
      if new.team_id is distinct from old.team_id then changes := array_append(changes, 'team_id'); end if;
      if new.supervisor_employee_id is distinct from old.supervisor_employee_id then changes := array_append(changes, 'supervisor_employee_id'); end if;
    elsif tg_table_name = 'employee_hr_details' then
      if new.employment_start_date is distinct from old.employment_start_date then changes := array_append(changes, 'employment_start_date'); end if;
      if new.employment_status is distinct from old.employment_status then changes := array_append(changes, 'employment_status'); end if;
      if new.contact_phone is distinct from old.contact_phone then changes := array_append(changes, 'contact_phone'); end if;
    else
      if new.status is distinct from old.status then changes := array_append(changes, 'status'); end if;
      if new.provider_user_id is distinct from old.provider_user_id then changes := array_append(changes, 'provider_user_id'); end if;
      if new.revoked_at is distinct from old.revoked_at then changes := array_append(changes, 'revoked_at'); end if;
    end if;
  else
    resource := case when tg_table_name = 'employee_hr_details' then old.employee_id::text else old.id::text end;
  end if;
  insert into public.audit_events(actor_user_id, action, resource_type, resource_id, changed_fields)
    values (actor, lower(tg_op), tg_table_name, resource, changes);
  return coalesce(new, old);
end
$$;

create trigger employees_audit after insert or update or delete on public.employees
  for each row execute function portal_private.write_audit_event();
create trigger employee_hr_details_audit after insert or update or delete on public.employee_hr_details
  for each row execute function portal_private.write_audit_event();
create trigger invitations_audit after insert or update on public.employee_invitations
  for each row execute function portal_private.write_audit_event();

create or replace function public.create_employee_invitation(
  p_employee_number text, p_legal_name text, p_email text, p_position text,
  p_team_id uuid, p_supervisor_employee_id uuid, p_start_date date
)
returns table(employee_id uuid, invitation_id uuid)
language plpgsql security definer set search_path = '' as $$
declare
  new_employee_id uuid;
  new_invitation_id uuid;
  normalized_email text := lower(trim(p_email));
begin
  if not portal_private.can_manage_employees() then raise exception 'not authorized' using errcode = '42501'; end if;
  if normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then raise exception 'invalid email' using errcode = '22023'; end if;
  insert into public.employees(employee_number, legal_name, position, team_id, supervisor_employee_id)
    values (trim(p_employee_number), trim(p_legal_name), nullif(trim(p_position), ''), p_team_id, p_supervisor_employee_id)
    returning id into new_employee_id;
  insert into public.employee_hr_details(employee_id, employment_start_date)
    values (new_employee_id, p_start_date);
  insert into public.employee_invitations(employee_id, target_email, created_by)
    values (new_employee_id, normalized_email, auth.uid()) returning id into new_invitation_id;
  return query select new_employee_id, new_invitation_id;
end
$$;

create or replace function public.issue_employee_invitation(p_employee_id uuid, p_email text, p_reason text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare new_id uuid; normalized_email text := lower(trim(p_email));
begin
  if not portal_private.can_manage_employees() then raise exception 'not authorized' using errcode = '42501'; end if;
  if length(trim(coalesce(p_reason, ''))) < 8 then raise exception 'reason required' using errcode = '22023'; end if;
  if not exists (select 1 from public.employees e where e.id = p_employee_id) then raise exception 'employee not found' using errcode = 'P0002'; end if;
  if exists (select 1 from public.user_employee_links l where l.employee_id = p_employee_id) then raise exception 'employee already linked' using errcode = '23505'; end if;
  if normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then raise exception 'invalid email' using errcode = '22023'; end if;
  update public.employee_invitations set status = 'REVOKED', revoked_at = now()
    where employee_id = p_employee_id and status in ('PREPARING', 'PENDING', 'DELIVERY_FAILED') and revoked_at is null;
  if found then
    insert into public.audit_events(actor_user_id, action, resource_type, resource_id, reason, changed_fields)
      values (auth.uid(), 'revoke_for_resend', 'employee_invitation', p_employee_id::text, trim(p_reason), array['status']);
  end if;
  insert into public.employee_invitations(employee_id, target_email, created_by)
    values (p_employee_id, normalized_email, auth.uid()) returning id into new_id;
  return new_id;
end
$$;

create or replace function public.revoke_employee_invitation(p_invitation_id uuid, p_reason text)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not portal_private.can_manage_employees() then raise exception 'not authorized' using errcode = '42501'; end if;
  if length(trim(coalesce(p_reason, ''))) < 8 then raise exception 'reason required' using errcode = '22023'; end if;
  update public.employee_invitations set status = 'REVOKED', revoked_at = now()
    where id = p_invitation_id and status in ('PREPARING', 'PENDING', 'DELIVERY_FAILED') and revoked_at is null;
  if not found then raise exception 'invitation not revocable' using errcode = 'P0002'; end if;
  insert into public.audit_events(actor_user_id, action, resource_type, resource_id, reason, changed_fields)
    values (auth.uid(), 'revoke', 'employee_invitation', p_invitation_id::text, trim(p_reason), array['status']);
end
$$;

create or replace function public.set_invitation_provider_result(
  p_invitation_id uuid, p_provider_user_id uuid, p_status public.invitation_status, p_error_code text default null
)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if (select auth.role()) <> 'service_role' then raise exception 'not authorized' using errcode = '42501'; end if;
  update public.employee_invitations set provider_user_id = p_provider_user_id, status = p_status,
    delivery_error_code = left(p_error_code, 80)
  where id = p_invitation_id and status in ('PREPARING', 'PENDING', 'DELIVERY_FAILED');
  if not found then raise exception 'invitation unavailable' using errcode = 'P0002'; end if;
end
$$;

create or replace function public.activate_invited_employee()
returns boolean language plpgsql security definer set search_path = '' as $$
declare
  current_user_id uuid := auth.uid();
  auth_email text;
  pending_invitation public.employee_invitations%rowtype;
begin
  if current_user_id is null then return false; end if;
  if exists (select 1 from public.user_employee_links l where l.user_id = current_user_id and l.account_status = 'ACTIVE') then return true; end if;
  select lower(u.email) into auth_email from auth.users u where u.id = current_user_id and u.email_confirmed_at is not null;
  if auth_email is null then return false; end if;
  select i.* into pending_invitation from public.employee_invitations i
  where lower(i.target_email) = auth_email and i.provider_user_id = current_user_id
    and i.status = 'PENDING' and i.revoked_at is null and i.expires_at > now()
  order by i.created_at desc limit 1 for update;
  if not found then return false; end if;
  insert into public.user_employee_links(user_id, employee_id, account_status)
    values (current_user_id, pending_invitation.employee_id, 'ACTIVE');
  insert into public.employee_roles(user_id, role) values (current_user_id, 'WORKER');
  update public.employee_invitations set status = 'ACTIVATED', activated_at = now() where id = pending_invitation.id;
  insert into public.audit_events(actor_user_id, action, resource_type, resource_id, changed_fields)
    values (current_user_id, 'activate', 'employee_account', pending_invitation.employee_id::text, array['account_status', 'worker_role']);
  return true;
exception when unique_violation then return false;
end
$$;

create or replace function public.update_employee_admin(
  p_employee_id uuid, p_position text, p_team_id uuid, p_supervisor_employee_id uuid,
  p_start_date date, p_employment_status public.employment_status, p_reason text
)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not portal_private.can_manage_employees() then raise exception 'not authorized' using errcode = '42501'; end if;
  if length(trim(coalesce(p_reason, ''))) < 8 then raise exception 'reason required' using errcode = '22023'; end if;
  update public.employees set position = nullif(trim(p_position), ''), team_id = p_team_id,
    supervisor_employee_id = p_supervisor_employee_id, updated_at = now() where id = p_employee_id;
  if not found then raise exception 'employee not found' using errcode = 'P0002'; end if;
  update public.employee_hr_details set employment_start_date = p_start_date,
    employment_status = p_employment_status, updated_at = now() where employee_id = p_employee_id;
  insert into public.audit_events(actor_user_id, action, resource_type, resource_id, reason, changed_fields)
    values (auth.uid(), 'employment_update', 'employee', p_employee_id::text, trim(p_reason), array['position', 'team', 'supervisor', 'employment_start_date', 'employment_status']);
end
$$;

create or replace function public.create_team(p_name text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare new_team_id uuid;
begin
  if not portal_private.can_manage_employees() then raise exception 'not authorized' using errcode = '42501'; end if;
  insert into public.teams(name) values (trim(p_name)) returning id into new_team_id;
  insert into public.audit_events(actor_user_id, action, resource_type, resource_id, changed_fields)
    values (auth.uid(), 'create', 'team', new_team_id::text, array['name']);
  return new_team_id;
end
$$;

create or replace function public.set_employee_account_status(p_user_id uuid, p_status public.account_status, p_reason text)
returns void language plpgsql security definer set search_path = '' as $$
declare target_employee_id uuid;
begin
  if not portal_private.can_manage_access() or p_user_id = auth.uid() then raise exception 'not authorized' using errcode = '42501'; end if;
  if length(trim(coalesce(p_reason, ''))) < 8 then raise exception 'reason required' using errcode = '22023'; end if;
  if p_status not in ('ACTIVE', 'SUSPENDED') then raise exception 'invalid account status' using errcode = '22023'; end if;
  update public.user_employee_links set account_status = p_status, status_updated_at = now(),
    revoked_before = case when p_status = 'SUSPENDED' then now() else revoked_before end
    where user_id = p_user_id returning employee_id into target_employee_id;
  if target_employee_id is null then raise exception 'employee account not found' using errcode = 'P0002'; end if;
  insert into public.audit_events(actor_user_id, action, resource_type, resource_id, reason, changed_fields)
    values (auth.uid(), case when p_status = 'SUSPENDED' then 'suspend' else 'reinstate' end,
      'employee_account', target_employee_id::text, nullif(trim(p_reason), ''), array['account_status']);
end
$$;

create or replace function public.assign_employee_role(p_user_id uuid, p_role public.portal_role, p_reason text)
returns void language plpgsql security definer set search_path = '' as $$
declare actor_is_platform boolean := portal_private.has_role('PLATFORM_ADMIN');
begin
  if not portal_private.is_privileged_aal2() or not (actor_is_platform or portal_private.has_role('HR_ADMIN')) then
    raise exception 'not authorized' using errcode = '42501';
  end if;
  if p_user_id = auth.uid() then raise exception 'self role changes are prohibited' using errcode = '42501'; end if;
  if length(trim(coalesce(p_reason, ''))) < 8 then raise exception 'reason required' using errcode = '22023'; end if;
  if not exists (select 1 from public.user_employee_links l where l.user_id = p_user_id and l.account_status = 'ACTIVE') then
    raise exception 'active employee account required' using errcode = 'P0002';
  end if;
  if not actor_is_platform and p_role in ('HR_ADMIN', 'PLATFORM_ADMIN') then raise exception 'role assignment not permitted' using errcode = '42501'; end if;
  insert into public.employee_roles(user_id, role, granted_by) values (p_user_id, p_role, auth.uid()) on conflict do nothing;
  insert into public.audit_events(actor_user_id, action, resource_type, resource_id, reason, changed_fields)
    values (auth.uid(), 'role_grant', 'employee_role', p_user_id::text, nullif(trim(p_reason), ''), array[p_role::text]);
end
$$;

create or replace function public.revoke_employee_role(p_user_id uuid, p_role public.portal_role, p_reason text)
returns void language plpgsql security definer set search_path = '' as $$
declare actor_is_platform boolean := portal_private.has_role('PLATFORM_ADMIN');
begin
  if not portal_private.is_privileged_aal2() or not (actor_is_platform or portal_private.has_role('HR_ADMIN')) then
    raise exception 'not authorized' using errcode = '42501';
  end if;
  if p_user_id = auth.uid() then raise exception 'self role changes are prohibited' using errcode = '42501'; end if;
  if length(trim(coalesce(p_reason, ''))) < 8 then raise exception 'reason required' using errcode = '22023'; end if;
  if not actor_is_platform and p_role in ('HR_ADMIN', 'PLATFORM_ADMIN') then raise exception 'role change not permitted' using errcode = '42501'; end if;
  if p_role = 'PLATFORM_ADMIN' and (select count(*) from public.employee_roles r where r.role = 'PLATFORM_ADMIN') <= 1 then raise exception 'cannot revoke final platform administrator' using errcode = '23514'; end if;
  delete from public.employee_roles where user_id = p_user_id and role = p_role;
  if not found then raise exception 'role assignment not found' using errcode = 'P0002'; end if;
  insert into public.audit_events(actor_user_id, action, resource_type, resource_id, reason, changed_fields)
    values (auth.uid(), 'role_revoke', 'employee_role', p_user_id::text, nullif(trim(p_reason), ''), array[p_role::text]);
end
$$;

alter table public.teams enable row level security;
alter table public.employees enable row level security;
alter table public.employee_hr_details enable row level security;
alter table public.user_employee_links enable row level security;
alter table public.employee_roles enable row level security;
alter table public.employee_invitations enable row level security;
alter table public.audit_events enable row level security;

revoke all on public.teams, public.employees, public.employee_hr_details, public.user_employee_links, public.employee_roles,
  public.employee_invitations, public.audit_events from anon, authenticated;
grant select on public.teams, public.employees, public.employee_hr_details, public.user_employee_links, public.employee_roles,
  public.employee_invitations to authenticated;
grant update (contact_phone) on public.employee_hr_details to authenticated;

create policy employee_profile_read on public.employees for select to authenticated using (
  portal_private.current_account_active() and (
    id = portal_private.current_employee_id() or portal_private.can_manage_employees()
    or portal_private.is_assigned_supervisor(id))
);
create policy employee_hr_details_self_read on public.employee_hr_details for select to authenticated using (
  portal_private.current_account_active() and (employee_id = portal_private.current_employee_id() or portal_private.can_manage_employees())
);
create policy employee_contact_update on public.employee_hr_details for update to authenticated
  using (portal_private.current_account_active() and employee_id = portal_private.current_employee_id())
  with check (portal_private.current_account_active() and employee_id = portal_private.current_employee_id());
create policy teams_read on public.teams for select to authenticated using (
  portal_private.current_account_active() and (portal_private.can_manage_employees() or exists (
    select 1 from public.employees e where e.team_id = teams.id and
      (e.id = portal_private.current_employee_id() or portal_private.is_assigned_supervisor(e.id))))
);
create policy link_self_or_hr_read on public.user_employee_links for select to authenticated using (
      portal_private.current_account_active() and (user_id = (select auth.uid()) or portal_private.can_manage_employees())
);
create policy roles_self_or_admin_read on public.employee_roles for select to authenticated using (
  portal_private.current_account_active() and (user_id = (select auth.uid()) or portal_private.can_manage_employees()
  or (portal_private.is_privileged_aal2() and portal_private.has_role('PLATFORM_ADMIN')))
);
create policy invitation_hr_read on public.employee_invitations for select to authenticated using (
  portal_private.can_manage_employees()
);
create policy audit_hr_read on public.audit_events for select to authenticated using (
  portal_private.is_privileged_aal2() and portal_private.has_role('HR_ADMIN')
);

revoke all on function public.create_employee_invitation(text,text,text,text,uuid,uuid,date) from public, anon;
revoke all on function public.set_invitation_provider_result(uuid,uuid,public.invitation_status,text) from public, anon, authenticated;
revoke all on function public.issue_employee_invitation(uuid,text,text) from public, anon;
revoke all on function public.revoke_employee_invitation(uuid,text) from public, anon;
revoke all on function public.activate_invited_employee() from public, anon;
revoke all on function public.update_employee_admin(uuid,text,uuid,uuid,date,public.employment_status,text) from public, anon;
revoke all on function public.create_team(text) from public, anon;
revoke all on function public.set_employee_account_status(uuid,public.account_status,text) from public, anon;
revoke all on function public.assign_employee_role(uuid,public.portal_role,text) from public, anon;
revoke all on function public.revoke_employee_role(uuid,public.portal_role,text) from public, anon;
grant execute on function public.create_employee_invitation(text,text,text,text,uuid,uuid,date) to authenticated;
grant execute on function public.set_invitation_provider_result(uuid,uuid,public.invitation_status,text) to service_role;
grant execute on function public.issue_employee_invitation(uuid,text,text) to authenticated;
grant execute on function public.revoke_employee_invitation(uuid,text) to authenticated;
grant execute on function public.activate_invited_employee() to authenticated;
grant execute on function public.update_employee_admin(uuid,text,uuid,uuid,date,public.employment_status,text) to authenticated;
grant execute on function public.create_team(text) to authenticated;
grant execute on function public.set_employee_account_status(uuid,public.account_status,text) to authenticated;
grant execute on function public.assign_employee_role(uuid,public.portal_role,text) to authenticated;
grant execute on function public.revoke_employee_role(uuid,public.portal_role,text) to authenticated;

-- Audit rows are append-only for application roles; triggers and security-definer paths write events.
revoke insert, update, delete, truncate, references, trigger on public.audit_events from anon, authenticated;

commit;
