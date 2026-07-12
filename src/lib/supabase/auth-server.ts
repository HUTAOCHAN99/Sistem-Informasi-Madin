// src/lib/supabase/auth-server.ts
//
// Client Supabase Auth untuk dipakai di SERVER COMPONENT (mis.
// src/app/dashboard/layout.tsx) — cek "siapa yang sedang login" lewat
// cookie, sebagai lapisan pertahanan kedua selain middleware.ts.
//
// Server Component tidak boleh (dan tidak perlu) MENULIS cookie — yang
// menulis/refresh cookie sesi adalah middleware.ts. Makanya setAll() di
// sini sengaja no-op (dibungkus try/catch), sesuai pola resmi Supabase
// untuk App Router.

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function createSupabaseServerComponentClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local (lihat .env.local.example)."
    );
  }

  const cookieStore = cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Dipanggil dari Server Component murni (bukan Server Action /
          // Route Handler) — tidak bisa menulis cookie, aman diabaikan
          // karena middleware.ts yang bertanggung jawab me-refresh sesi.
        }
      },
    },
  });
}
