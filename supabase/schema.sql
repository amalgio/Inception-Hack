create extension if not exists pgcrypto;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  registration_id text unique not null,
  team_name text not null,
  college_name text not null,
  email text unique not null,
  mobile_number text unique not null,
  member_1 text not null,
  member_2 text not null,
  member_3 text not null,
  member_4 text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists public.website_settings (
  id text primary key default 'default',
  registration_limit integer not null default 500,
  registration_open boolean not null default true,
  hero_title text not null default 'INCEPTION',
  hero_subtitle text not null default 'A premium 24-hour inter-college hackathon crafted for developers and engineers who build.',
  contact_email text not null default 'ece@licet.ac.in',
  contact_phone text not null default '+91 00000 00000',
  about_content text not null default '',
  themes jsonb not null default '[]'::jsonb,
  social_links jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.timeline (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  event_date timestamptz not null
);

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  sponsor_name text not null,
  sponsor_logo text,
  sponsor_website text
);

insert into public.website_settings (id)
values ('default')
on conflict (id) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admins
    where lower(email) = lower(coalesce(auth.email(), ''))
  );
$$;

create or replace function public.register_team(payload jsonb)
returns table (registration_id text)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
  limit_count integer;
  is_open boolean;
  next_number integer;
  generated_id text;
begin
  perform pg_advisory_xact_lock(1782026);

  if payload is null then
    raise exception 'Registration payload is required.';
  end if;

  if nullif(trim(payload->>'team_name'), '') is null
    or nullif(trim(payload->>'college_name'), '') is null
    or nullif(trim(payload->>'email'), '') is null
    or nullif(trim(payload->>'mobile_number'), '') is null
    or nullif(trim(payload->>'member_1'), '') is null
    or nullif(trim(payload->>'member_2'), '') is null
    or nullif(trim(payload->>'member_3'), '') is null
    or nullif(trim(payload->>'member_4'), '') is null then
    raise exception 'All registration fields are required.';
  end if;

  if lower(trim(payload->>'email')) !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'Enter a valid email address.';
  end if;

  if trim(payload->>'mobile_number') !~ '^(\+91)?[6-9][0-9]{9}$' then
    raise exception 'Enter a valid Indian mobile number.';
  end if;

  select registration_limit, registration_open
  into limit_count, is_open
  from public.website_settings
  where id = 'default';

  if not coalesce(is_open, false) then
    raise exception 'Registrations are currently closed.';
  end if;

  select count(*) into current_count from public.registrations;

  if limit_count > 0 and current_count >= limit_count then
    update public.website_settings
    set registration_open = false, updated_at = now()
    where id = 'default';
    raise exception 'Registrations are currently closed.';
  end if;

  if exists (select 1 from public.registrations where lower(email) = lower(payload->>'email')) then
    raise exception 'This email is already registered.';
  end if;

  if exists (select 1 from public.registrations where mobile_number = payload->>'mobile_number') then
    raise exception 'This mobile number is already registered.';
  end if;

  next_number := current_count + 1;
  generated_id := 'INC-2026-' || lpad(next_number::text, 4, '0');

  while exists (select 1 from public.registrations r where r.registration_id = generated_id) loop
    next_number := next_number + 1;
    generated_id := 'INC-2026-' || lpad(next_number::text, 4, '0');
  end loop;

  insert into public.registrations (
    registration_id,
    team_name,
    college_name,
    email,
    mobile_number,
    member_1,
    member_2,
    member_3,
    member_4
  )
  values (
    generated_id,
    trim(payload->>'team_name'),
    trim(payload->>'college_name'),
    lower(trim(payload->>'email')),
    trim(payload->>'mobile_number'),
    trim(payload->>'member_1'),
    trim(payload->>'member_2'),
    trim(payload->>'member_3'),
    trim(payload->>'member_4')
  );

  if limit_count > 0 and next_number >= limit_count then
    update public.website_settings
    set registration_open = false, updated_at = now()
    where id = 'default';
  end if;

  return query select generated_id;
end;
$$;

alter table public.registrations enable row level security;
alter table public.admins enable row level security;
alter table public.website_settings enable row level security;
alter table public.announcements enable row level security;
alter table public.faq enable row level security;
alter table public.timeline enable row level security;
alter table public.sponsors enable row level security;

drop policy if exists "admins can read registrations" on public.registrations;
create policy "admins can read registrations"
on public.registrations for select
to authenticated
using (public.is_admin());

drop policy if exists "admins manage admins" on public.admins;
create policy "admins manage admins"
on public.admins for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read website settings" on public.website_settings;
create policy "public read website settings"
on public.website_settings for select
to anon, authenticated
using (true);

drop policy if exists "admins update website settings" on public.website_settings;
create policy "admins update website settings"
on public.website_settings for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read announcements" on public.announcements;
create policy "public read announcements"
on public.announcements for select
to anon, authenticated
using (true);

drop policy if exists "admins manage announcements" on public.announcements;
create policy "admins manage announcements"
on public.announcements for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read faq" on public.faq;
create policy "public read faq"
on public.faq for select
to anon, authenticated
using (true);

drop policy if exists "admins manage faq" on public.faq;
create policy "admins manage faq"
on public.faq for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read timeline" on public.timeline;
create policy "public read timeline"
on public.timeline for select
to anon, authenticated
using (true);

drop policy if exists "admins manage timeline" on public.timeline;
create policy "admins manage timeline"
on public.timeline for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read sponsors" on public.sponsors;
create policy "public read sponsors"
on public.sponsors for select
to anon, authenticated
using (true);

drop policy if exists "admins manage sponsors" on public.sponsors;
create policy "admins manage sponsors"
on public.sponsors for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant usage on schema public to anon, authenticated;
grant execute on function public.register_team(jsonb) to anon, authenticated;
grant execute on function public.is_admin() to authenticated;
