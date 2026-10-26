begin;
do $$
declare
  operator_user_id uuid := 'REPLACE_WITH_VERIFIED_AUTH_USER_UUID';
  new_employee_id uuid;
begin
  if operator_user_id::text like 'REPLACE_%' then raise exception 'Replace the approved Auth user UUID first'; end if;
  if exists (select 1 from public.audit_events where action = 'bootstrap_hr_admin') then
    raise exception 'The initial HR administrator bootstrap has already been used';
  end if;
  if not exists (select 1 from auth.users where id = operator_user_id and email_confirmed_at is not null) then
    raise exception 'The Auth user must exist and have a confirmed email';
  end if;
  if exists (select 1 from public.user_employee_links where user_id = operator_user_id) then
    raise exception 'The Auth user is already linked to an employee';
  end if;

  insert into public.employees(employee_number, legal_name, position)
    values ('REPLACE_WITH_APPROVED_EMPLOYEE_ID', 'REPLACE_WITH_APPROVED_NAME', 'HR Administrator')
    returning id into new_employee_id;
  insert into public.employee_hr_details(employee_id, employment_start_date, employment_status)
    values (new_employee_id, date 'REPLACE_WITH_APPROVED_START_DATE', 'ACTIVE');
  insert into public.user_employee_links(user_id, employee_id, account_status)
    values (operator_user_id, new_employee_id, 'ACTIVE');
  insert into public.employee_roles(user_id, role, granted_by)
    values (operator_user_id, 'WORKER', operator_user_id), (operator_user_id, 'HR_ADMIN', operator_user_id);
  insert into public.audit_events(actor_user_id, action, resource_type, resource_id, outcome, reason, changed_fields)
    values (null, 'bootstrap_hr_admin', 'employee_account', new_employee_id::text, 'success',
      'Authorized one-time bootstrap; operator/ticket: REPLACE_WITH_OPERATOR_AND_CHANGE_TICKET',
      array['employee_link', 'WORKER', 'HR_ADMIN']);
end
$$;
commit;
