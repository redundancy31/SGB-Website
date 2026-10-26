begin;
create extension if not exists pgtap with schema extensions;
select plan(18);

insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at)
values
  ('00000000-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'worker.a@example.test', '', now()),
  ('00000000-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated', 'worker.b@example.test', '', now()),
  ('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', 'authenticated', 'authenticated', 'supervisor@example.test', '', now()),
  ('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000004', 'authenticated', 'authenticated', 'hr@example.test', '', now()),
  ('00000000-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000005', 'authenticated', 'authenticated', 'uninvited@example.test', '', now());
insert into auth.sessions (id,user_id,created_at,updated_at,aal) values
  ('40000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001',now()-interval '1 day',now(),'aal1'),
  ('40000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000002',now()-interval '1 day',now(),'aal1'),
  ('40000000-0000-0000-0000-000000000003','10000000-0000-0000-0000-000000000003',now()-interval '1 day',now(),'aal1'),
  ('40000000-0000-0000-0000-000000000004','10000000-0000-0000-0000-000000000004',now()-interval '1 day',now(),'aal1'),
  ('40000000-0000-0000-0000-000000000005','10000000-0000-0000-0000-000000000005',now()-interval '1 day',now(),'aal1');

insert into public.teams(id,name) values
  ('20000000-0000-0000-0000-000000000001','Synthetic Team A'),
  ('20000000-0000-0000-0000-000000000002','Synthetic Team B');
insert into public.employees(id,employee_number,legal_name,position,team_id,supervisor_employee_id) values
  ('30000000-0000-0000-0000-000000000001','SYN-001','Synthetic Worker A','Installer','20000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000003'),
  ('30000000-0000-0000-0000-000000000002','SYN-002','Synthetic Worker B','Technician','20000000-0000-0000-0000-000000000002',null),
  ('30000000-0000-0000-0000-000000000003','SYN-003','Synthetic Supervisor','Supervisor','20000000-0000-0000-0000-000000000001',null),
  ('30000000-0000-0000-0000-000000000004','SYN-004','Synthetic HR','HR Admin',null,null);
insert into public.employee_hr_details(employee_id,employment_start_date,employment_status,contact_phone) values
  ('30000000-0000-0000-0000-000000000001','2020-01-01','ACTIVE','+6500000001'),
  ('30000000-0000-0000-0000-000000000002','2021-02-02','ACTIVE','+6500000002'),
  ('30000000-0000-0000-0000-000000000003','2019-03-03','ACTIVE','+6500000003'),
  ('30000000-0000-0000-0000-000000000004','2018-04-04','ACTIVE','+6500000004');
insert into public.user_employee_links(user_id,employee_id,account_status) values
  ('10000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000001','ACTIVE'),
  ('10000000-0000-0000-0000-000000000002','30000000-0000-0000-0000-000000000002','ACTIVE'),
  ('10000000-0000-0000-0000-000000000003','30000000-0000-0000-0000-000000000003','ACTIVE'),
  ('10000000-0000-0000-0000-000000000004','30000000-0000-0000-0000-000000000004','ACTIVE');
insert into public.employee_roles(user_id,role) values
  ('10000000-0000-0000-0000-000000000001','WORKER'),
  ('10000000-0000-0000-0000-000000000002','WORKER'),
  ('10000000-0000-0000-0000-000000000003','SUPERVISOR'),
  ('10000000-0000-0000-0000-000000000004','HR_ADMIN');
insert into public.employee_invitations(employee_id,target_email,provider_user_id,status,created_by)
  values ('30000000-0000-0000-0000-000000000001','worker.a@example.test','10000000-0000-0000-0000-000000000001','PENDING','10000000-0000-0000-0000-000000000004');

set local role anon;
select throws_ok($$select * from public.employees$$, '42501', 'anonymous database access has no table privilege');
reset role;

set local role authenticated;
select set_config('request.jwt.claims','{"sub":"10000000-0000-0000-0000-000000000001","session_id":"40000000-0000-0000-0000-000000000001","role":"authenticated","aal":"aal1"}',true);
select is((select count(*)::int from public.employees), 1, 'worker reads only own employee row');
select is((select count(*)::int from public.employees where id='30000000-0000-0000-0000-000000000002'), 0, 'worker cannot read another employee');
select is((select count(*)::int from public.employee_hr_details), 1, 'worker reads only own HR details');
select throws_ok($$update public.employee_roles set role='HR_ADMIN' where user_id=auth.uid()$$, '42501', 'worker cannot change own role');
select throws_ok($$update public.employee_hr_details set employment_start_date='2000-01-01' where employee_id='30000000-0000-0000-0000-000000000001'$$, '42501', 'worker cannot change own start date');
select is((with changed as (update public.employee_hr_details set contact_phone='+6509999999' where employee_id='30000000-0000-0000-0000-000000000002' returning *) select count(*)::int from changed), 0, 'worker cannot modify another worker contact');
select set_config('request.jwt.claims','{"sub":"10000000-0000-0000-0000-000000000005","session_id":"40000000-0000-0000-0000-000000000005","role":"authenticated","aal":"aal1"}',true);
select is((select public.activate_invited_employee()), false, 'uninvited user cannot activate another employee invitation');

select set_config('request.jwt.claims','{"sub":"10000000-0000-0000-0000-000000000003","session_id":"40000000-0000-0000-0000-000000000003","role":"authenticated","aal":"aal1"}',true);
select is((select count(*)::int from public.employees where id='30000000-0000-0000-0000-000000000001'), 0, 'supervisor access requires privileged MFA');
select set_config('request.jwt.claims','{"sub":"10000000-0000-0000-0000-000000000003","session_id":"40000000-0000-0000-0000-000000000003","role":"authenticated","aal":"aal2"}',true);
select is((select count(*)::int from public.employees where id='30000000-0000-0000-0000-000000000001'), 1, 'supervisor sees assigned direct report');
select is((select count(*)::int from public.employees where id='30000000-0000-0000-0000-000000000002'), 0, 'supervisor cannot read another team');
select is((select count(*)::int from public.employee_hr_details), 1, 'supervisor cannot read team HR details');

select set_config('request.jwt.claims','{"sub":"10000000-0000-0000-0000-000000000004","session_id":"40000000-0000-0000-0000-000000000004","role":"authenticated","aal":"aal1"}',true);
select throws_ok($$select public.create_team('Should Fail')$$, '42501', 'HR privileged operation requires MFA');
select set_config('request.jwt.claims','{"sub":"10000000-0000-0000-0000-000000000004","session_id":"40000000-0000-0000-0000-000000000004","role":"authenticated","aal":"aal2"}',true);
select lives_ok($$select public.create_team('Synthetic HR Team')$$, 'HR AAL2 can create a team');

reset role;
update public.user_employee_links set account_status='SUSPENDED' where user_id='10000000-0000-0000-0000-000000000001';
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"10000000-0000-0000-0000-000000000001","session_id":"40000000-0000-0000-0000-000000000001","role":"authenticated","aal":"aal2"}',true);
select is((select count(*)::int from public.employees), 0, 'suspension immediately blocks profile reads');
select is((select count(*)::int from public.user_employee_links), 0, 'suspension blocks account mapping reads');
select is((with changed as (update public.employee_hr_details set contact_phone='+6509999998' where employee_id='30000000-0000-0000-0000-000000000001' returning *) select count(*)::int from changed), 0, 'suspension immediately blocks profile writes');
reset role;
update public.user_employee_links set account_status='ACTIVE' where user_id='10000000-0000-0000-0000-000000000001';
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"10000000-0000-0000-0000-000000000001","session_id":"40000000-0000-0000-0000-000000000001","role":"authenticated","aal":"aal2"}',true);
select is((select count(*)::int from public.employees), 0, 'pre-suspension JWT cannot regain access after reinstatement');

select * from finish();
rollback;
