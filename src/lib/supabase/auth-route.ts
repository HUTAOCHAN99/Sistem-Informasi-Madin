// src/lib/supabase/auth-route.ts
//
// Client Supabase khusus untuk Route Handler (src/app/api/auth/*), dipakai
// untuk fitur AUTH (signInWithOtp, verifyOtp, signOut, getUser) — BUKAN
// untuk baca-tulis data madrasah (itu tetap lewat src/lib/supabase/server.ts
// yang pakai service role key).
//
// Client ini pakai ANON KEY (bukan service role) karena semua operasi Auth
// (kirim OTP, verifikasi OTP, cek sesi) memang didesain aman dipakai dengan
// anon key — yang membedakan penggunanya adalah cookie sesi, bukan key-nya.
//
// Kenapa perlu file terpisah dari server.ts: client Auth butuh akses BACA
// dan TULIS cookie request/response (supaya sesi login tersimpan di
// browser), sedangkan client service role di server.ts sengaja tidak
// menyentuh cookie sama sekali.

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Bikin client Supabase untuk dipakai di dalam Route Handler auth.
 * `res` adalah NextResponse yang NANTINYA dikembalikan dari handler —
 * cookie sesi (access token & refresh token) otomatis ditulis ke situ
 * setiap kali Supabase Auth mengubah sesi (login, refresh, logout).
 */
export function createSupabaseRouteClient(req: NextRequest, res: NextResponse) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local (lihat .env.local.example)."
    );
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          res.cookies.set(name, value, options);
        });
      },
    },
  });
}
