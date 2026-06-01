-- Run once in Supabase: SQL Editor → New query → Run

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) >= 2),
  phone text not null check (char_length(trim(phone)) >= 7),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  created_at timestamptz not null default now()
);

create index if not exists contact_leads_created_at_idx
  on public.contact_leads (created_at desc);

alter table public.contact_leads enable row level security;

-- No public policies: only the service role (server API) can insert/read.
