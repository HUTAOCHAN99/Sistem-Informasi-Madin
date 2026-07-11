// src/lib/auth/otp-store.ts
//
// Penyimpanan kode OTP sementara di memori server (Map). Ini cukup untuk
// tahap sekarang karena hanya ada 1 proses dev server / 1 admin.
//
// CATATAN untuk produksi: kalau nanti deploy ke platform serverless
// (misalnya Vercel dengan banyak instance) atau butuh OTP tetap valid
// walau server restart, ganti Map ini dengan penyimpanan eksternal, misalnya
// tabel `otp_codes` di Supabase atau Redis (Upstash). Struktur data & fungsi
// di bawah ini sengaja dibuat sederhana supaya gampang di-swap nanti.

type OtpEntry = {
  email: string;
  code: string;
  expiresAt: number; // epoch ms
  attempts: number; // percobaan verifikasi yang salah
  lastSentAt: number; // epoch ms, untuk rate-limit kirim ulang
};

const OTP_TTL_MS = 5 * 60 * 1000; // 5 menit
const RESEND_COOLDOWN_MS = 30 * 1000; // 30 detik
const MAX_ATTEMPTS = 5;

const store = new Map<string, OtpEntry>();

function generateCode(): string {
  // 5 digit, 00000–99999, tidak diawali angka yang bikin "00001" hilang leading zero
  const n = Math.floor(Math.random() * 100000);
  return n.toString().padStart(5, "0");
}

export function createOtp(pendingId: string, email: string): string {
  const code = generateCode();
  store.set(pendingId, {
    email,
    code,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
    lastSentAt: Date.now(),
  });
  return code;
}

export function getOtpEntry(pendingId: string): OtpEntry | undefined {
  return store.get(pendingId);
}

export function canResend(pendingId: string): boolean {
  const entry = store.get(pendingId);
  if (!entry) return true;
  return Date.now() - entry.lastSentAt >= RESEND_COOLDOWN_MS;
}

export function resendOtp(pendingId: string): string | null {
  const entry = store.get(pendingId);
  if (!entry) return null;
  if (!canResend(pendingId)) return null;

  const code = generateCode();
  entry.code = code;
  entry.expiresAt = Date.now() + OTP_TTL_MS;
  entry.attempts = 0;
  entry.lastSentAt = Date.now();
  store.set(pendingId, entry);
  return code;
}

export type VerifyResult =
  | { ok: true; email: string }
  | { ok: false; reason: "not_found" | "expired" | "too_many_attempts" | "invalid_code" };

export function verifyOtp(pendingId: string, code: string): VerifyResult {
  const entry = store.get(pendingId);
  if (!entry) return { ok: false, reason: "not_found" };

  if (Date.now() > entry.expiresAt) {
    store.delete(pendingId);
    return { ok: false, reason: "expired" };
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    store.delete(pendingId);
    return { ok: false, reason: "too_many_attempts" };
  }

  if (entry.code !== code) {
    entry.attempts += 1;
    store.set(pendingId, entry);
    return { ok: false, reason: "invalid_code" };
  }

  store.delete(pendingId);
  return { ok: true, email: entry.email };
}

export function clearOtp(pendingId: string) {
  store.delete(pendingId);
}
