-- ========================================
-- カンタン出欠調整 - データベース作成SQL
-- Supabase の SQL Editor で実行してください
-- ========================================

-- 1. events テーブル
create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  created_at timestamptz default now()
);

-- 2. date_options テーブル
create table date_options (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  label text not null,
  sort_order int not null default 0
);

-- 3. responses テーブル
create table responses (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  name text not null,
  comment text,
  created_at timestamptz default now()
);

-- 4. response_items テーブル
create table response_items (
  id uuid primary key default gen_random_uuid(),
  response_id uuid not null references responses(id) on delete cascade,
  date_option_id uuid not null references date_options(id) on delete cascade,
  availability text not null check (availability in ('○', '△', '×'))
);

-- インデックス
create index idx_date_options_event_id on date_options(event_id);
create index idx_responses_event_id on responses(event_id);
create index idx_response_items_response_id on response_items(response_id);

-- RLS (Row Level Security) - 全員が読み書きできる設定
alter table events enable row level security;
alter table date_options enable row level security;
alter table responses enable row level security;
alter table response_items enable row level security;

create policy "Anyone can read events" on events for select using (true);
create policy "Anyone can create events" on events for insert with check (true);

create policy "Anyone can read date_options" on date_options for select using (true);
create policy "Anyone can create date_options" on date_options for insert with check (true);

create policy "Anyone can read responses" on responses for select using (true);
create policy "Anyone can create responses" on responses for insert with check (true);

create policy "Anyone can read response_items" on response_items for select using (true);
create policy "Anyone can create response_items" on response_items for insert with check (true);
