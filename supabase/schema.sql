-- ============================================================================
-- Madin — Skema database Supabase
-- ============================================================================
-- Cara pakai:
--   1. Buka project di supabase.com -> SQL Editor -> New query.
--   2. Paste seluruh isi file ini -> Run.
--   3. (Opsional) jalankan supabase/seed.sql untuk data contoh.
--
-- Skema ini relasional (pakai foreign key sungguhan ke id, bukan cuma
-- nama sebagai teks) supaya data konsisten: kalau nama guru diubah,
-- semua jadwal/kelas yang menunjuk ke guru itu otomatis ikut berubah.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. TEACHERS (Data Guru)
-- ----------------------------------------------------------------------------
create table if not exists public.teachers (
  id         uuid primary key default gen_random_uuid(),
  nama       text not null,
  mapel      text not null default '',
  hp         text not null default '',
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 2. CLASSES (Data Kelas)
-- ----------------------------------------------------------------------------
create table if not exists public.classes (
  id             uuid primary key default gen_random_uuid(),
  nama_kelas     text not null,
  jenjang        text not null check (jenjang in ('Awaliyah', 'Wustha', 'Ulya')),
  wali_kelas_id  uuid references public.teachers(id) on delete set null,
  created_at     timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 3. STUDENTS (Data Santri)
-- ----------------------------------------------------------------------------
create table if not exists public.students (
  id             uuid primary key default gen_random_uuid(),
  nama           text not null,
  nis            text not null unique,
  jenis_kelamin  text not null check (jenis_kelamin in ('L', 'P')),
  kelas_id       uuid references public.classes(id) on delete set null,
  orang_tua      text not null default '',
  hp             text not null default '',
  created_at     timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 4. SCHEDULE (Jadwal Pelajaran)
-- ----------------------------------------------------------------------------
create table if not exists public.schedule (
  id         uuid primary key default gen_random_uuid(),
  hari       text not null check (hari in ('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu')),
  jam        text not null,
  mapel      text not null,
  guru_id    uuid references public.teachers(id) on delete set null,
  kelas_id   uuid references public.classes(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 5. ATTENDANCE (Absensi) — satu baris per santri per tanggal
-- ----------------------------------------------------------------------------
create table if not exists public.attendance (
  id         uuid primary key default gen_random_uuid(),
  siswa_id   uuid not null references public.students(id) on delete cascade,
  tanggal    date not null default current_date,
  status     text not null check (status in ('Hadir','Izin','Sakit','Alpha')),
  created_at timestamptz not null default now(),
  unique (siswa_id, tanggal)
);

-- ----------------------------------------------------------------------------
-- 6. GRADES (Nilai)
-- ----------------------------------------------------------------------------
create table if not exists public.grades (
  id         uuid primary key default gen_random_uuid(),
  siswa_id   uuid not null references public.students(id) on delete cascade,
  mapel      text not null,
  harian     numeric(5,2) not null default 0 check (harian between 0 and 100),
  uts        numeric(5,2) not null default 0 check (uts between 0 and 100),
  uas        numeric(5,2) not null default 0 check (uas between 0 and 100),
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 7. ANNOUNCEMENTS (Pengumuman)
-- ----------------------------------------------------------------------------
create table if not exists public.announcements (
  id         uuid primary key default gen_random_uuid(),
  judul      text not null,
  isi        text not null default '',
  tanggal    date not null default current_date,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Index bantu untuk query yang sering dipakai
-- ----------------------------------------------------------------------------
create index if not exists idx_students_kelas_id on public.students(kelas_id);
create index if not exists idx_schedule_kelas_id on public.schedule(kelas_id);
create index if not exists idx_schedule_guru_id on public.schedule(guru_id);
create index if not exists idx_attendance_tanggal on public.attendance(tanggal);
create index if not exists idx_attendance_siswa_id on public.attendance(siswa_id);
create index if not exists idx_grades_siswa_id on public.grades(siswa_id);
create index if not exists idx_classes_wali_kelas_id on public.classes(wali_kelas_id);

-- ----------------------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------------------
-- Aplikasi ini pakai login admin kustom (OTP + cookie session, lihat
-- src/lib/auth/session.ts), BUKAN Supabase Auth. Karena itu semua baca/tulis
-- dari dashboard dilakukan lewat server (Server Actions / Route Handlers)
-- memakai SUPABASE_SERVICE_ROLE_KEY, yang otomatis melewati RLS.
--
-- RLS tetap diaktifkan di semua tabel supaya kunci "anon" (yang dipakai di
-- browser lewat NEXT_PUBLIC_SUPABASE_ANON_KEY) TIDAK BISA membaca/menulis
-- apa pun secara langsung kecuali yang diizinkan lewat policy di bawah.
-- Satu-satunya bacaan publik yang diizinkan adalah "announcements", untuk
-- keperluan halaman beranda (landing page) menampilkan pengumuman terbaru.

alter table public.teachers      enable row level security;
alter table public.classes       enable row level security;
alter table public.students      enable row level security;
alter table public.schedule      enable row level security;
alter table public.attendance    enable row level security;
alter table public.grades        enable row level security;
alter table public.announcements enable row level security;

drop policy if exists "public read announcements" on public.announcements;
create policy "public read announcements"
  on public.announcements
  for select
  to anon, authenticated
  using (true);

-- Tidak ada policy insert/update/delete untuk anon/authenticated di tabel
-- manapun -> hanya service_role (dipakai server-side) yang bisa menulis.

-- ----------------------------------------------------------------------------
-- View bantu: jumlah santri per kelas (dipakai halaman Data Kelas)
-- ----------------------------------------------------------------------------
create or replace view public.class_student_counts as
select c.id as kelas_id, count(s.id) as jumlah_santri
from public.classes c
left join public.students s on s.kelas_id = c.id
group by c.id;
