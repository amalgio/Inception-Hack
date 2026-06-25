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

alter table public.registrations enable row level security;
alter table public.admins enable row level security;
alter table public.website_settings enable row level security;
alter table public.announcements enable row level security;
alter table public.faq enable row level security;
alter table public.timeline enable row level security;
alter table public.sponsors enable row level security;
