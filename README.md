# INCEPTION Hackathon Platform

Production-ready Vite/React frontend for the INCEPTION hackathon with Supabase-backed registration, admin authentication, CMS content, analytics, and exports.

## Stack

- React 19 + Vite
- Tailwind CSS
- Supabase PostgreSQL, Auth, RLS, and REST/RPC APIs
- Vercel static hosting

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
copy .env.example .env.local
```

3. Fill:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
VITE_GOOGLE_FORM_URL=https://forms.gle/YOUR_GOOGLE_FORM_LINK
```

4. Run the app:

```bash
npm run dev
```

## Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run [`supabase/schema.sql`](./supabase/schema.sql).
4. In Authentication, create an email/password user for the first admin.
5. In SQL Editor, insert that email into `admins`:

```sql
insert into public.admins (email, role)
values ('admin@example.com', 'admin')
on conflict (email) do nothing;
```

The admin dashboard opens from the existing organizer trigger and requires that Supabase Auth user plus a matching row in `admins`.

## Registration Rules

- Server-side insert runs through `public.register_team(payload jsonb)`.
- Duplicate email and mobile numbers are blocked in PostgreSQL.
- Registration IDs are generated as `INC-2026-0001`, `INC-2026-0002`, etc.
- When the configured limit is reached, registration closes automatically.
- The public modal displays `Registrations are currently closed.` when closed or full.

## Admin Features

- Overview cards: total registrations, limit, remaining slots, today's registrations.
- Registration search and CSV / Excel-compatible export.
- Website settings: hero copy, contact details, registration open/close, registration limit, themes, social links.
- CMS collections: announcements, FAQ, timeline, sponsors.
- Admin management: add/remove admin emails.

## Vercel Deployment

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.
5. Add the same `VITE_*` environment variables in Vercel Project Settings.
6. Deploy.

## Production Checklist

- Run the Supabase SQL script.
- Create the first Supabase Auth admin.
- Insert the first row in `admins`.
- Confirm RLS is enabled on all public tables.
- Set Vercel environment variables.
- Run `npm run build`.
- Test registration, duplicate email/mobile rejection, admin login, exports, and CMS updates.
