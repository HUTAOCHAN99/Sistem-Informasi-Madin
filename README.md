# Madin — Kerangka Dashboard (Next.js)

Ini kerangka **bagian dashboard** dari Sistem Informasi Madrasah Diniyah, sesuai
struktur di ringkasan (Data Guru, Data Santri, Data Kelas, Jadwal, Absensi,
Nilai, Pengumuman). Halaman publik (Beranda, Profil, Galeri, dst) belum
dibuat — fokus dulu ke dashboard supaya ada gambaran.

## Status data

Semua halaman saat ini membaca dari `src/lib/dummy-data.ts` — data statis
yang **bentuknya sudah disamakan** dengan struktur tabel Supabase di
ringkasan (`teachers`, `students`, `classes`, `schedule`, `attendance`,
`grades`, `announcements`). Jadi nanti tinggal ganti sumbernya, tidak perlu
bongkar ulang tampilan.

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`, lalu klik "Buka Dashboard".

## Menyambungkan ke Supabase asli (langkah selanjutnya)

1. Buat project di supabase.com, buat tabel sesuai struktur di ringkasan.
2. Copy `.env.local.example` menjadi `.env.local`, isi URL dan anon key project.
3. Di `src/lib/supabase/client.ts` sudah ada client Supabase siap pakai.
4. Di tiap `page.tsx` (misalnya `src/app/dashboard/guru/page.tsx`), ganti:
   ```ts
   import { teachers } from "@/lib/dummy-data";
   ```
   menjadi query ke Supabase, contoh:
   ```ts
   import { supabase } from "@/lib/supabase/client";

   const { data: teachers } = await supabase!.from("teachers").select("*");
   ```
   (dan ubah komponennya jadi async server component seperlunya)
5. Tambahkan Supabase Auth untuk halaman login + middleware untuk
   membedakan akses Admin / Guru sesuai role di ringkasan.

## Struktur folder

```
src/
├── app/
│   ├── page.tsx                  # halaman awal sementara
│   ├── dashboard/
│   │   ├── layout.tsx            # sidebar + shell
│   │   ├── page.tsx              # overview / statistik
│   │   ├── guru/page.tsx
│   │   ├── santri/page.tsx
│   │   ├── kelas/page.tsx
│   │   ├── jadwal/page.tsx
│   │   ├── absensi/page.tsx
│   │   ├── nilai/page.tsx
│   │   └── pengumuman/page.tsx
├── components/dashboard/
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   ├── StatCard.tsx
│   └── DataTable.tsx
└── lib/
    ├── dummy-data.ts             # data dummy, bentuk = tabel Supabase
    └── supabase/client.ts        # koneksi Supabase (belum aktif dipakai)
```

## Langkah lanjutan yang disarankan

Sesuai catatan di ringkasan: mulai dari versi 1.0 yang fokus administrasi
inti (guru, santri, kelas, jadwal, absensi, nilai, pengumuman) dulu. Setelah
dipakai beberapa bulan dan dapat masukan dari pengurus/ustadz, baru
tambahkan fitur seperti pembayaran SPP atau rapor digital.
