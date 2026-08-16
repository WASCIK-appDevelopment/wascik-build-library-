create table if not exists public.catalog_health_ignores (
  id uuid primary key default gen_random_uuid(),
  scope text not null check (scope in ('product', 'brand')),
  scope_key text not null,
  reason text,
  created_at timestamptz not null default now(),
  unique (scope, scope_key)
);

create table if not exists public.catalog_image_overrides (
  id uuid primary key default gen_random_uuid(),
  product_key text not null unique,
  image_url text not null,
  source_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.catalog_health_ignores enable row level security;
alter table public.catalog_image_overrides enable row level security;

revoke all on public.catalog_health_ignores from anon, authenticated;
revoke all on public.catalog_image_overrides from anon, authenticated;

grant all on public.catalog_health_ignores to service_role;
grant all on public.catalog_image_overrides to service_role;
