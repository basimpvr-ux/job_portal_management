-- ===== Job Portal schema (normalised, 3NF) =====

create type public.app_role as enum ('admin', 'recruiter', 'seeker');
create type public.application_status as enum ('applied', 'reviewed', 'shortlisted', 'rejected');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

-- Secure role-check helper (security definer avoids RLS recursion)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- ===== Tables =====

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  phone text,
  location text,
  headline text,
  qualifications text,
  experience_years numeric check (experience_years >= 0),
  skills text[] not null default '{}',
  resume_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(user_id) on delete cascade,
  name text not null,
  location text,
  industry text,
  description text,
  website_url text,
  created_at timestamptz not null default now()
);

create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  recruiter_id uuid not null references public.profiles(user_id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  title text not null,
  description text not null,
  skills text[] not null default '{}',
  location text,
  job_type text not null default 'full-time' check (job_type in ('full-time','part-time','contract','internship','remote')),
  salary_min numeric check (salary_min >= 0),
  salary_max numeric check (salary_max >= 0),
  status text not null default 'open' check (status in ('open','closed')),
  posted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  seeker_id uuid not null references public.profiles(user_id) on delete cascade,
  resume_path text,
  cover_note text,
  status public.application_status not null default 'applied',
  applied_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (job_id, seeker_id)
);

-- ===== Grants (same migration, before RLS) =====

grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
grant select on public.companies to anon;
grant select, insert, update, delete on public.companies to authenticated;
grant all on public.companies to service_role;
grant select on public.jobs to anon;
grant select, insert, update, delete on public.jobs to authenticated;
grant all on public.jobs to service_role;
grant select, insert, update, delete on public.applications to authenticated;
grant all on public.applications to service_role;

-- ===== RLS =====

alter table public.user_roles enable row level security;
alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;

-- user_roles: read own; admins read all; writes only via service role / triggers
create policy "users_read_own_roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);
create policy "admins_read_all_roles" on public.user_roles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- profiles
create policy "profiles_read_own" on public.profiles
  for select to authenticated using (auth.uid() = user_id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "profiles_admin_read" on public.profiles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "profiles_recruiter_read_applicants" on public.profiles
  for select to authenticated using (
    exists (
      select 1 from public.applications a
      join public.jobs j on j.id = a.job_id
      where a.seeker_id = profiles.user_id and j.recruiter_id = auth.uid()
    )
  );

-- companies
create policy "companies_public_read" on public.companies
  for select to anon, authenticated using (true);
create policy "companies_owner_insert" on public.companies
  for insert to authenticated with check (owner_id = auth.uid());
create policy "companies_owner_update" on public.companies
  for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "companies_owner_delete" on public.companies
  for delete to authenticated using (owner_id = auth.uid());
create policy "companies_admin_all" on public.companies
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- jobs
create policy "jobs_public_read_open" on public.jobs
  for select to anon, authenticated using (status = 'open');
create policy "jobs_recruiter_read_own" on public.jobs
  for select to authenticated using (recruiter_id = auth.uid());
create policy "jobs_admin_read" on public.jobs
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "jobs_recruiter_insert_own" on public.jobs
  for insert to authenticated with check (
    recruiter_id = auth.uid()
    and exists (select 1 from public.companies c where c.id = company_id and c.owner_id = auth.uid())
  );
create policy "jobs_recruiter_update_own" on public.jobs
  for update to authenticated using (recruiter_id = auth.uid()) with check (recruiter_id = auth.uid());
create policy "jobs_recruiter_delete_own" on public.jobs
  for delete to authenticated using (recruiter_id = auth.uid());
create policy "jobs_admin_all" on public.jobs
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- applications
create policy "applications_seeker_read_own" on public.applications
  for select to authenticated using (seeker_id = auth.uid());
create policy "applications_recruiter_read" on public.applications
  for select to authenticated using (
    exists (select 1 from public.jobs j where j.id = applications.job_id and j.recruiter_id = auth.uid())
  );
create policy "applications_admin_read" on public.applications
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "applications_seeker_insert_own" on public.applications
  for insert to authenticated with check (
    seeker_id = auth.uid()
    and exists (select 1 from public.jobs j where j.id = job_id and j.status = 'open')
  );
create policy "applications_recruiter_update" on public.applications
  for update to authenticated
  using (exists (select 1 from public.jobs j where j.id = applications.job_id and j.recruiter_id = auth.uid()))
  with check (exists (select 1 from public.jobs j where j.id = applications.job_id and j.recruiter_id = auth.uid()));
create policy "applications_admin_all" on public.applications
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ===== Indexes for fast search =====

create index jobs_status_posted_idx on public.jobs (status, posted_at desc);
create index jobs_location_idx on public.jobs (lower(location));
create index jobs_title_idx on public.jobs (lower(title));
create index jobs_skills_idx on public.jobs using gin (skills);
create index jobs_recruiter_idx on public.jobs (recruiter_id);
create index jobs_company_idx on public.jobs (company_id);
create index applications_job_idx on public.applications (job_id);
create index applications_seeker_idx on public.applications (seeker_id);
create index applications_status_idx on public.applications (status);
create index companies_owner_idx on public.companies (owner_id);

-- ===== updated_at triggers =====

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();
create trigger jobs_touch before update on public.jobs
  for each row execute function public.touch_updated_at();
create trigger applications_touch before update on public.applications
  for each row execute function public.touch_updated_at();

-- ===== Auto-create profile + role at signup =====
-- Role from signup metadata; 'admin' can never be assigned at signup.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  assigned_role public.app_role := 'seeker';
begin
  if (new.raw_user_meta_data->>'role') in ('recruiter', 'seeker') then
    assigned_role := (new.raw_user_meta_data->>'role')::public.app_role;
  end if;
  insert into public.profiles (user_id, full_name, email)
    values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), coalesce(new.email, ''));
  insert into public.user_roles (user_id, role) values (new.id, assigned_role);
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ===== Sample data =====
-- Demo recruiters (confirmed accounts, password Demo1234!), companies and jobs.

insert into auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at) values
  ('a1000000-0000-0000-0000-000000000001', 'recruiter@technova.demo', crypt('Demo1234!', gen_salt('bf')), now(), '{"role":"recruiter","full_name":"Aarav Sharma"}', now(), now()),
  ('a1000000-0000-0000-0000-000000000002', 'recruiter@cloudpeak.demo', crypt('Demo1234!', gen_salt('bf')), now(), '{"role":"recruiter","full_name":"Priya Nair"}', now(), now()),
  ('a1000000-0000-0000-0000-000000000003', 'recruiter@finedge.demo', crypt('Demo1234!', gen_salt('bf')), now(), '{"role":"recruiter","full_name":"Rohan Mehta"}', now(), now()),
  ('a2000000-0000-0000-0000-000000000001', 'seeker@jobportal.demo', crypt('Demo1234!', gen_salt('bf')), now(), '{"role":"seeker","full_name":"Ananya Verma"}', now(), now());

update public.profiles set
  location = case email
    when 'recruiter@technova.demo' then 'Bengaluru'
    when 'recruiter@cloudpeak.demo' then 'Hyderabad'
    when 'recruiter@finedge.demo' then 'Mumbai'
    else 'Bengaluru' end,
  phone = case email
    when 'recruiter@technova.demo' then '+91 90000 00001'
    when 'recruiter@cloudpeak.demo' then '+91 90000 00002'
    when 'recruiter@finedge.demo' then '+91 90000 00003'
    else '+91 90000 00004' end,
  headline = case when email = 'seeker@jobportal.demo' then 'Frontend Developer' else null end,
  qualifications = case when email = 'seeker@jobportal.demo' then 'B.Tech in Computer Science' else null end,
  experience_years = case when email = 'seeker@jobportal.demo' then 3 else null end,
  skills = case when email = 'seeker@jobportal.demo' then array['React','TypeScript','SQL'] else array[]::text[] end
;

insert into public.companies (owner_id, name, location, industry, description) values
  ((select user_id from public.profiles where email = 'recruiter@technova.demo'), 'TechNova Solutions', 'Bengaluru', 'Software Development', 'Product engineering studio building developer tools and SaaS platforms for global clients.'),
  ((select user_id from public.profiles where email = 'recruiter@cloudpeak.demo'), 'CloudPeak Systems', 'Hyderabad', 'IT Services & Consulting', 'Cloud infrastructure and consulting partner for enterprise migrations and modernisation.'),
  ((select user_id from public.profiles where email = 'recruiter@finedge.demo'), 'FinEdge Analytics', 'Mumbai', 'Financial Services', 'Data-driven financial analytics firm serving banks and investment houses.');

insert into public.jobs (recruiter_id, company_id, title, description, skills, location, job_type, salary_min, salary_max, status) values
  ((select user_id from public.profiles where email = 'recruiter@technova.demo'), (select id from public.companies where name = 'TechNova Solutions'), 'Senior Frontend Engineer', 'Own our customer-facing web products. You will lead the frontend architecture, mentor two junior engineers, and ship features weekly with a strong focus on performance and accessibility.', array['React','TypeScript','CSS','Testing Library'], 'Bengaluru', 'full-time', 1200000, 1800000, 'open'),
  ((select user_id from public.profiles where email = 'recruiter@technova.demo'), (select id from public.companies where name = 'TechNova Solutions'), 'Backend Developer (Node.js)', 'Design and build REST and GraphQL APIs powering our platform. You will work closely with product and data teams on high-throughput services.', array['Node.js','PostgreSQL','GraphQL','Redis'], 'Remote', 'full-time', 900000, 1400000, 'open'),
  ((select user_id from public.profiles where email = 'recruiter@technova.demo'), (select id from public.companies where name = 'TechNova Solutions'), 'Data Analyst', 'Turn product and usage data into insights. Build dashboards, define metrics with stakeholders, and support A/B testing.', array['SQL','Python','Tableau','Statistics'], 'Bengaluru', 'full-time', 600000, 900000, 'open'),
  ((select user_id from public.profiles where email = 'recruiter@cloudpeak.demo'), (select id from public.companies where name = 'CloudPeak Systems'), 'DevOps Engineer', 'Automate our clients'' cloud estates: CI/CD pipelines, infrastructure as code, observability, and cost optimisation across AWS.', array['AWS','Docker','Kubernetes','Terraform','CI/CD'], 'Hyderabad', 'full-time', 1000000, 1600000, 'open'),
  ((select user_id from public.profiles where email = 'recruiter@cloudpeak.demo'), (select id from public.companies where name = 'CloudPeak Systems'), 'Full Stack Developer', 'Build end-to-end features for client portals, from React frontends to Node.js services and PostgreSQL schemas.', array['React','Node.js','PostgreSQL','AWS'], 'Hyderabad', 'full-time', 800000, 1300000, 'open'),
  ((select user_id from public.profiles where email = 'recruiter@cloudpeak.demo'), (select id from public.companies where name = 'CloudPeak Systems'), 'Cloud Architect', 'Lead architecture reviews and multi-account landing-zone designs for enterprise customers. Client-facing role with mentoring responsibilities.', array['AWS','Terraform','Networking','Security'], 'Hyderabad', 'full-time', 1800000, 2500000, 'open'),
  ((select user_id from public.profiles where email = 'recruiter@cloudpeak.demo'), (select id from public.companies where name = 'CloudPeak Systems'), 'QA Automation Engineer', 'Grow our automated regression suites and shift testing left into the delivery pipeline.', array['Selenium','Java','API Testing','Jenkins'], 'Remote', 'full-time', 500000, 800000, 'closed'),
  ((select user_id from public.profiles where email = 'recruiter@finedge.demo'), (select id from public.companies where name = 'FinEdge Analytics'), 'Financial Analyst', 'Support valuation and portfolio analytics for banking clients. Prepare models, reports, and presentations for senior stakeholders.', array['Excel','SQL','Financial Modelling'], 'Mumbai', 'full-time', 600000, 1000000, 'open'),
  ((select user_id from public.profiles where email = 'recruiter@finedge.demo'), (select id from public.companies where name = 'FinEdge Analytics'), 'Risk Analyst', 'Quantify credit and market risk. Improve scoring models and stress-testing frameworks used by our banking clients.', array['Python','Statistics','SQL','Risk Modelling'], 'Mumbai', 'full-time', 700000, 1100000, 'open'),
  ((select user_id from public.profiles where email = 'recruiter@finedge.demo'), (select id from public.companies where name = 'FinEdge Analytics'), 'Business Intelligence Developer', 'Own the BI stack: semantic models, executive dashboards, and self-service analytics for finance teams.', array['Power BI','SQL','DAX','Data Warehousing'], 'Mumbai', 'full-time', 800000, 1200000, 'open');

insert into public.applications (job_id, seeker_id, cover_note, status) values
  ((select id from public.jobs where title = 'Senior Frontend Engineer'), (select user_id from public.profiles where email = 'seeker@jobportal.demo'), 'I have three years of React and TypeScript experience and would love to bring that to TechNova''s product team.', 'applied'),
  ((select id from public.jobs where title = 'Data Analyst'), (select user_id from public.profiles where email = 'seeker@jobportal.demo'), 'My SQL and Python background fits the dashboards and A/B testing work described.', 'reviewed');
