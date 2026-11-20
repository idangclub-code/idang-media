-- 아이당 직원 릴스 업로드 (2026-11-20)
create table if not exists public.reels (
  id uuid primary key default gen_random_uuid(),
  idxs int[] not null,                 -- 아임웹 상품번호들 (4개 몰 공통)
  products jsonb not null default '[]',-- [["상품 짧은 이름", 상품번호], ...]
  title text not null default '',
  video_url text not null,
  poster_url text not null default '',
  video_path text, poster_path text,
  uploader text default '',
  sort int not null default 0,         -- 클수록 앞
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists reels_idxs_gin on public.reels using gin (idxs);
alter table public.reels enable row level security;
drop policy if exists "reels public read" on public.reels;
create policy "reels public read" on public.reels for select to anon, authenticated using (active);
-- 쓰기는 Edge Function(reels-staff, service role)만. 버킷: 공개 읽기 'reels'
insert into storage.buckets (id, name, public) values ('reels','reels',true) on conflict (id) do nothing;
