// src/lib/auth/admin-credentials.ts
//
// Kredensial admin untuk tahap sekarang masih 1 akun, disimpan lewat
// environment variable (bukan hardcode di kode, bukan pula tabel Supabase
// dulu — supaya login+OTP bisa langsung jalan sebelum Supabase Auth
// beneran disambungkan).
//
// Nanti kalau sudah pakai Supabase Auth / tabel `users` dengan role
// admin & guru, fungsi verifyAdminCredentials() ini tinggal diganti jadi
// query ke database. Bentuk return-nya (boolean) sengaja dibuat sederhana
// supaya gampang di-swap.

import bcrypt from "bcryptjs";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@madin.sch.id";

// Hash bcrypt dari password default "admin123".
// GANTI di .env.local (ADMIN_PASSWORD_HASH) untuk pemakaian sungguhan.
// Cara bikin hash baru:
//   node -e "console.log(require('bcryptjs').hashSync('password-baru', 10))"
const ADMIN_PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH ??
  "$2b$10$I7az/.KoxoMYA0PRUcWJye5i2AwJH1ZQpxV5FNQZF83/xNw.ZQXYG";

export function getAdminEmail() {
  return ADMIN_EMAIL;
}

export async function verifyAdminCredentials(email: string, password: string) {
  const emailMatch = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
  if (!emailMatch) return false;

  const passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  return passwordMatch;
}
