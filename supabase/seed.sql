-- ============================================================================
-- Madin — Data contoh (opsional)
-- Jalankan setelah schema.sql kalau ingin dashboard langsung terisi data
-- contoh yang sama seperti versi dummy sebelumnya. Aman dijalankan ulang
-- (pakai delete dulu) selama belum ada data produksi yang penting.
-- ============================================================================

-- Kosongkan dulu supaya tidak dobel kalau script ini dijalankan berkali-kali.
truncate table
  public.attendance,
  public.grades,
  public.schedule,
  public.students,
  public.classes,
  public.teachers,
  public.announcements
restart identity cascade;

-- 1) Guru
with t as (
  insert into public.teachers (nama, mapel, hp) values
    ('Ust. Ahmad Fauzi', 'Fiqih', '0812-1111-2222'),
    ('Ust. Ali Rahman', 'Al-Qur''an', '0813-2222-3333'),
    ('Usth. Siti Aminah', 'Akhlak', '0821-3333-4444'),
    ('Ust. Zainal Abidin', 'Tauhid', '0852-4444-5555'),
    ('Usth. Nur Hidayah', 'Bahasa Arab', '0878-5555-6666')
  returning id, nama
)
-- 2) Kelas (pakai wali kelas dari tabel guru di atas)
, c as (
  insert into public.classes (nama_kelas, jenjang, wali_kelas_id)
  select v.nama_kelas, v.jenjang, t.id
  from (values
    ('Awaliyah 1', 'Awaliyah', 'Ust. Ahmad Fauzi'),
    ('Awaliyah 2', 'Awaliyah', 'Usth. Siti Aminah'),
    ('Wustha 1',   'Wustha',   'Ust. Ali Rahman'),
    ('Wustha 2',   'Wustha',   'Ust. Zainal Abidin'),
    ('Ulya 1',     'Ulya',     'Usth. Nur Hidayah')
  ) as v(nama_kelas, jenjang, wali_nama)
  join t on t.nama = v.wali_nama
  returning id, nama_kelas
)
-- 3) Santri (pakai kelas dari tabel di atas)
insert into public.students (nama, nis, jenis_kelamin, kelas_id, orang_tua, hp)
select v.nama, v.nis, v.jk, c.id, v.orang_tua, v.hp
from (values
  ('Muhammad Fajar',   '2026001', 'L', 'Awaliyah 1', 'Bpk. Sudarmono', '0812-0001-0001'),
  ('Aisyah Putri',     '2026002', 'P', 'Awaliyah 1', 'Bpk. Hendra',    '0812-0002-0002'),
  ('Rizky Ramadhan',   '2026003', 'L', 'Awaliyah 2', 'Bpk. Yusuf',     '0812-0003-0003'),
  ('Nabila Zahra',     '2026004', 'P', 'Wustha 1',   'Bpk. Agus',      '0812-0004-0004'),
  ('Fikri Maulana',    '2026005', 'L', 'Wustha 2',   'Bpk. Rahmat',    '0812-0005-0005'),
  ('Salsabila Putri',  '2026006', 'P', 'Ulya 1',     'Bpk. Wahyu',     '0812-0006-0006')
) as v(nama, nis, jk, kelas_nama, orang_tua, hp)
join c on c.nama_kelas = v.kelas_nama;

-- 4) Jadwal
insert into public.schedule (hari, jam, mapel, guru_id, kelas_id)
select v.hari, v.jam, v.mapel, t.id, c.id
from (values
  ('Senin',  '16.00 - 16.45', 'Al-Qur''an',   'Ust. Ali Rahman',    'Awaliyah 1'),
  ('Senin',  '17.00 - 17.45', 'Fiqih',        'Ust. Ahmad Fauzi',   'Awaliyah 1'),
  ('Selasa', '16.00 - 16.45', 'Akhlak',       'Usth. Siti Aminah',  'Awaliyah 2'),
  ('Rabu',   '16.00 - 16.45', 'Tauhid',       'Ust. Zainal Abidin', 'Wustha 1'),
  ('Kamis',  '16.00 - 16.45', 'Bahasa Arab',  'Usth. Nur Hidayah',  'Ulya 1')
) as v(hari, jam, mapel, guru_nama, kelas_nama)
join public.teachers t on t.nama = v.guru_nama
join public.classes  c on c.nama_kelas = v.kelas_nama;

-- 5) Absensi contoh (hari ini)
insert into public.attendance (siswa_id, tanggal, status)
select s.id, current_date, v.status
from (values
  ('Muhammad Fajar',  'Hadir'),
  ('Aisyah Putri',    'Izin'),
  ('Rizky Ramadhan',  'Hadir'),
  ('Nabila Zahra',    'Sakit'),
  ('Fikri Maulana',   'Alpha')
) as v(nama, status)
join public.students s on s.nama = v.nama;

-- 6) Nilai contoh
insert into public.grades (siswa_id, mapel, harian, uts, uas)
select s.id, v.mapel, v.harian, v.uts, v.uas
from (values
  ('Muhammad Fajar',  'Al-Qur''an', 85, 80, 88),
  ('Aisyah Putri',    'Fiqih',      90, 85, 92),
  ('Rizky Ramadhan',  'Akhlak',     78, 82, 80),
  ('Nabila Zahra',    'Tauhid',     88, 90, 91)
) as v(nama, mapel, harian, uts, uas)
join public.students s on s.nama = v.nama;

-- 7) Pengumuman
insert into public.announcements (judul, isi, tanggal) values
  ('Libur Idul Adha 1447 H', 'Kegiatan belajar diliburkan selama 3 hari.', '2026-06-15'),
  ('Jadwal Imtihan Semester Genap', 'Ujian akan dilaksanakan mulai minggu depan.', '2026-07-01'),
  ('Wisuda Santri Ulya', 'Prosesi wisuda akan diadakan di aula utama.', '2026-07-20');
