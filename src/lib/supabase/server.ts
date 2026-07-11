// src/lib/supabase/server.ts
//
// Client Supabase khusus SERVER (Server Components, Server Actions, Route
// Handlers). Menggunakan SUPABASE_SERVICE_ROLE_KEY, BUKAN anon key, supaya
// bisa baca/tulis penuh ke semua tabel tanpa terhalang RLS.
//
// PENTING: file ini hanya boleh dipakai di kode yang jalan di server.
// Jangan pernah import file ini dari komponen "use client", karena
// SUPABASE_SERVICE_ROLE_KEY tidak boleh sampai terkirim ke browser.
// Next.js akan melempar error kalau ini ter-bundle ke client karena env
// var-nya tidak diawali NEXT_PUBLIC_.
//
// Akses ke data lewat client ini sudah aman karena setiap halaman di bawah
// /dashboard sudah dijaga middleware.ts (cek cookie sesi admin) sebelum
// Server Component / Server Action mana pun sempat jalan.

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

// Tidak memakai tipe Database yang di-generate (proyek ini belum
// menjalankan `supabase gen types`), jadi client di-tipekan permisif
// (any-schema) supaya .select()/.insert()/.delete() tetap type-safe di
// level pemanggil tanpa TypeScript salah mengira baris tabel = `never`.
let cachedClient: SupabaseClient<any, any, any> | null = null;

/**
 * Ambil client Supabase sisi server (service role). Melempar error yang
 * jelas kalau env belum diisi, supaya gampang di-debug ketimbang error
 * "fetch failed" yang membingungkan.
 */
export function getSupabaseServer() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan " +
        "SUPABASE_SERVICE_ROLE_KEY di file .env.local (lihat .env.local.example)."
    );
  }

  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return cachedClient;
}

/** true kalau env Supabase sudah diisi (dipakai untuk pesan fallback di UI). */
export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && serviceRoleKey);
}
