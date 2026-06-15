create table if not exists public.google_connection (
  id int primary key default 1 check (id = 1),
  google_email text,
  refresh_token text,
  spreadsheet_id text,
  sheet_name text not null default 'Leads',
  connected_at timestamptz
);

-- RLS on, no policies: only the service-role key (server-side) can read the
-- stored refresh token.
alter table public.google_connection enable row level security;
