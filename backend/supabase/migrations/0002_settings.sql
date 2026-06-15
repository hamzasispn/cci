create table if not exists public.settings (
  id int primary key default 1 check (id = 1),
  from_email text not null default 'hello@coachabilityconsultants.com',
  admin_to_email text not null default 'hello@coachabilityconsultants.com',
  thankyou_subject text not null default 'Your Coachability results, {{firstName}}',
  thankyou_html text not null default '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1E1E1E;"><h1 style="font-size:22px;font-weight:600;margin:0 0 16px;">Thank you, {{firstName}}!</h1><p style="font-size:15px;line-height:1.6;color:#484848;">Thanks for completing the Coachability assessment. Based on your responses, your organization is at the <strong>{{tierLabel}}</strong> stage (Tier {{tier}}), with a coachability score of {{score}}.</p><p style="font-size:15px;line-height:1.6;color:#484848;">One of our consultants will reach out shortly with a tailored next step. If you would like to talk sooner, simply reply to this email.</p><p style="font-size:15px;line-height:1.6;color:#484848;">&mdash; The Coachability Consultants Team</p></div>',
  updated_at timestamptz not null default now()
);

insert into public.settings (id) values (1) on conflict (id) do nothing;

alter table public.settings enable row level security;
