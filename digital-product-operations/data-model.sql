-- Customer-neutral PostgreSQL/Supabase reference schema.
-- Adapt identifiers and RLS policies to the host application's auth model.

create extension if not exists pgcrypto;

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table product_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  slug text not null,
  title text not null,
  category text not null,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  unique (organization_id, slug)
);

create table product_template_versions (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references product_templates(id) on delete cascade,
  version_number integer not null check (version_number > 0),
  definition jsonb not null,
  created_at timestamptz not null default now(),
  unique (template_id, version_number)
);

create table customer_projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  owner_user_id uuid not null,
  template_version_id uuid not null references product_template_versions(id),
  title text not null,
  status text not null default 'active' check (status in ('active', 'completed', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table customer_project_answers (
  project_id uuid not null references customer_projects(id) on delete cascade,
  field_key text not null,
  answer jsonb not null default 'null'::jsonb,
  accepted_ai_suggestion boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (project_id, field_key)
);

create table digital_products (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  template_id uuid references product_templates(id),
  slug text not null,
  title text not null,
  lifecycle text not null default 'idea' check (lifecycle in (
    'idea', 'content_draft', 'template_ready', 'customer_files_built',
    'qa_in_progress', 'sellable', 'published', 'retired'
  )),
  regular_price_cents integer check (regular_price_cents is null or regular_price_cents >= 0),
  launch_price_cents integer check (launch_price_cents is null or launch_price_cents >= 0),
  currency text not null default 'USD',
  purchase_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, slug)
);

create table product_releases (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references digital_products(id) on delete cascade,
  version_label text not null,
  page_count integer check (page_count is null or page_count >= 0),
  interactive_field_count integer check (interactive_field_count is null or interactive_field_count >= 0),
  immutable boolean not null default true check (immutable = true),
  created_at timestamptz not null default now(),
  unique (product_id, version_label)
);

create table release_assets (
  id uuid primary key default gen_random_uuid(),
  release_id uuid not null references product_releases(id) on delete cascade,
  asset_kind text not null check (asset_kind in (
    'cover', 'fillable_pdf', 'editable_document', 'quick_start',
    'license', 'preview', 'customer_zip'
  )),
  private_storage_key text not null,
  file_name text not null,
  mime_type text not null,
  byte_size bigint not null check (byte_size >= 0),
  checksum_sha256 text not null,
  qa_status text not null default 'pending' check (qa_status in ('pending', 'passed', 'failed', 'replaced')),
  created_at timestamptz not null default now()
);

create table product_bundles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  slug text not null,
  title text not null,
  lifecycle text not null default 'idea',
  regular_price_cents integer check (regular_price_cents is null or regular_price_cents >= 0),
  launch_price_cents integer check (launch_price_cents is null or launch_price_cents >= 0),
  currency text not null default 'USD',
  unique (organization_id, slug)
);

create table product_bundle_items (
  bundle_id uuid not null references product_bundles(id) on delete cascade,
  release_id uuid not null references product_releases(id),
  display_order integer not null check (display_order >= 0),
  primary key (bundle_id, release_id),
  unique (bundle_id, display_order)
);

create index customer_projects_owner_idx on customer_projects (owner_user_id, updated_at desc);
create index release_assets_release_idx on release_assets (release_id, asset_kind, qa_status);

-- Enable RLS before connecting this schema to a client application.
-- No permissive example policies are included because tenant membership and
-- service-role boundaries must be defined by the host application's auth model.
alter table organizations enable row level security;
alter table product_templates enable row level security;
alter table product_template_versions enable row level security;
alter table customer_projects enable row level security;
alter table customer_project_answers enable row level security;
alter table digital_products enable row level security;
alter table product_releases enable row level security;
alter table release_assets enable row level security;
alter table product_bundles enable row level security;
alter table product_bundle_items enable row level security;
