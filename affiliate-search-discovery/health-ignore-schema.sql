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

-- Suppress original/hard-coded products without deleting source data or
-- rearranging the merchant/category sections that own their placement.
create table if not exists public.catalog_product_suppressions (
  product_key text primary key,
  product_source text not null default 'builtin',
  merchant text not null,
  title text not null,
  reason text,
  removed_at timestamptz not null default now()
);

alter table public.catalog_health_ignores enable row level security;
alter table public.catalog_image_overrides enable row level security;
alter table public.catalog_product_suppressions enable row level security;

revoke all on public.catalog_health_ignores from anon, authenticated;
revoke all on public.catalog_image_overrides from anon, authenticated;
revoke all on public.catalog_product_suppressions from anon, authenticated;

grant all on public.catalog_health_ignores to service_role;
grant all on public.catalog_image_overrides to service_role;
grant all on public.catalog_product_suppressions to service_role;

-- Remove from publication:
-- insert into public.catalog_product_suppressions
--   (product_key, product_source, merchant, title, reason)
-- values (...)
-- on conflict (product_key) do update
-- set reason = excluded.reason, removed_at = now();

-- Restore:
-- delete from public.catalog_product_suppressions
-- where product_key = ...;
