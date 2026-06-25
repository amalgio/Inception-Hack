create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as 'select exists (select 1 from public.admins where lower(email) = lower(coalesce(auth.email(), '''')))';

create or replace function public.register_team(payload jsonb)
returns table (registration_id text)
language sql
security definer
set search_path = public
as '
  with locked as (
    select pg_advisory_xact_lock(1782026)
  ),
  settings as (
    select registration_limit, registration_open
    from public.website_settings
    where id = ''default''
  ),
  current_stats as (
    select count(*)::integer as total
    from public.registrations
  ),
  prepared as (
    select
      ''INC-2026-'' || lpad((current_stats.total + 1)::text, 4, ''0'') as generated_id,
      trim(payload->>''team_name'') as team_name,
      trim(payload->>''college_name'') as college_name,
      lower(trim(payload->>''email'')) as email,
      trim(payload->>''mobile_number'') as mobile_number,
      trim(payload->>''member_1'') as member_1,
      trim(payload->>''member_2'') as member_2,
      trim(payload->>''member_3'') as member_3,
      trim(payload->>''member_4'') as member_4,
      settings.registration_limit,
      settings.registration_open,
      current_stats.total
    from locked, settings, current_stats
  ),
  inserted as (
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
    select
      generated_id,
      team_name,
      college_name,
      email,
      mobile_number,
      member_1,
      member_2,
      member_3,
      member_4
    from prepared
    where registration_open = true
      and (registration_limit <= 0 or total < registration_limit)
      and team_name <> ''''
      and college_name <> ''''
      and email ~ ''^[^@\s]+@[^@\s]+\.[^@\s]+$''
      and mobile_number ~ ''^(\+91)?[6-9][0-9]{9}$''
      and member_1 <> ''''
      and member_2 <> ''''
      and member_3 <> ''''
      and member_4 <> ''''
    returning public.registrations.registration_id
  ),
  close_limit as (
    update public.website_settings
    set registration_open = false, updated_at = now()
    where id = ''default''
      and (select registration_limit from prepared) > 0
      and (select total + 1 from prepared) >= (select registration_limit from prepared)
      and exists (select 1 from inserted)
    returning id
  )
  select inserted.registration_id
  from inserted
';

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
