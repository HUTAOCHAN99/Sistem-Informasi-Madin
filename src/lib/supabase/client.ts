// src/lib/supabase/client.ts
//
// Ini KERANGKA koneksi ke Supabase. Untuk tahap sekarang belum dipakai
// secara aktif — semua halaman dashboard masih membaca dari
// src/lib/dummy-data.ts. Begitu project Supabase asli sudah siap,
// tinggal:
//   1) isi .env.local dengan NEXT_PUBLIC_SUPABASE_URL & ANON_KEY
//   2) di tiap page.tsx, ganti import dari "@/lib/dummy-data"
//      menjadi query lewat client di file ini.
//
// Contoh pemakaian nanti:
//   const { data: santri } = await supabase.from("students").select("*");

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Guard supaya tidak crash saat env belum diisi (masa pengembangan awal).
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
