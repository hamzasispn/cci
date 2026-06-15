create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  company text not null,
  email text not null,
  phone text not null,
  message text not null default '',
  score int not null,
  tier text not null check (tier in ('A','B','C','D')),
  answers jsonb not null default '[]'::jsonb,
  synced_to_sheet boolean not null default false,
  email_sent boolean not null default false
);

-- RLS on, no policies: only the service-role key (server-side) can read/write.
-- Authenticated dashboard read policies are added in Stage 2.
alter table public.leads enable row level security;
