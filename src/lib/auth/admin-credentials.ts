// src/lib/auth/admin-credentials.ts
//
// Kredensial admin disimpan di tabel Supabase `admins` (lihat
// supabase/schema.sql), BUKAN di environment variable / hardcode lagi.
// Akun bersifat statis: satu baris yang kamu insert sendiri lewat SQL
// Editor Supabase, berisi email + password yang SUDAH di-hash bcrypt
// (kolom password_hash). Password asli TIDAK PERNAH disimpan di database
// maupun di kode.
//
// Cara bikin/ganti akun admin: lihat instruksi di supabase/schema.sql
// bagian "ADMINS", atau generate hash baru dengan:
//   node -e "console.log(require('bcryptjs').hashSync('password-baru', 10))"
// lalu jalankan:
//   update public.admins set password_hash = '<hash-baru>' where email = 'admin@madin.sch.id';

import bcrypt from "bcryptjs";
import { getSupabaseServer } from "@/lib/supabase/server";

type AdminRow = {
  id: string;
  email: string;
  password_hash: string;
};

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("admins")
    .select("id, email, password_hash")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();

  if (error) {
    throw new Error(`Gagal membaca data admin: ${error.message}`);
  }

  const admin = data as AdminRow | null;
  if (!admin) return false;

  return bcrypt.compare(password, admin.password_hash);
}
