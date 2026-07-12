// src/lib/auth/otp-store.ts
//
// Penyimpanan kode OTP di tabel Supabase `otp_pending` (lihat
// supabase/migrations/002_otp_pending.sql), BUKAN di memori server lagi.
//
// Kenapa diganti dari Map: di Vercel (serverless) setiap request bisa
// dilayani instance/lambda yang berbeda-beda dengan memori masing-masing,
// jadi Map yang diisi saat /api/auth/login belum tentu masih ada saat
// /api/auth/verify-otp dipanggil -> selalu gagal dengan "Sesi OTP tidak
// ditemukan". Tabel database persist antar-instance sehingga masalah ini
// hilang.
//
// Kode OTP disimpan sebagai HASH (bcrypt), bukan plaintext, supaya kalau
// tabel ini ter-expose (misal lewat backup/log) kode OTP tidak langsung
// bisa dipakai. Akses ke tabel ini hanya lewat SUPABASE_SERVICE_ROLE_KEY
// dari server (lihat getSupabaseServer()), dan RLS tabelnya tidak
// mengizinkan akses anon sama sekali.

import bcrypt from "bcryptjs";
import { getSupabaseServer } from "@/lib/supabase/server";

const OTP_TTL_MS = 5 * 60 * 1000; // 5 menit
const RESEND_COOLDOWN_MS = 30 * 1000; // 30 detik
const MAX_ATTEMPTS = 5;
const HASH_ROUNDS = 10;

function generateCode(): string {
  // 5 digit, 00000–99999, padStart supaya leading zero tidak hilang
  const n = Math.floor(Math.random() * 100000);
  return n.toString().padStart(5, "0");
}

type OtpRow = {
  pending_id: string;
  email: string;
  code_hash: string;
  expires_at: string;
  attempts: number;
  last_sent_at: string;
};

/** Hapus baris-baris OTP yang sudah kedaluwarsa. Dipanggil sesekali, gagal-diam. */
async function cleanupExpired() {
  const supabase = getSupabaseServer();
  await supabase
    .from("otp_pending")
    .delete()
    .lt("expires_at", new Date().toISOString())
    .then(
      () => {},
      () => {}
    );
}

async function getRow(pendingId: string): Promise<OtpRow | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("otp_pending")
    .select("*")
    .eq("pending_id", pendingId)
    .maybeSingle();

  if (error) throw new Error(`Gagal membaca data OTP: ${error.message}`);
  return (data as OtpRow) ?? null;
}

export async function createOtp(pendingId: string, email: string): Promise<string> {
  const code = generateCode();
  const codeHash = await bcrypt.hash(code, HASH_ROUNDS);
  const supabase = getSupabaseServer();

  const { error } = await supabase.from("otp_pending").insert({
    pending_id: pendingId,
    email,
    code_hash: codeHash,
    expires_at: new Date(Date.now() + OTP_TTL_MS).toISOString(),
    attempts: 0,
    last_sent_at: new Date().toISOString(),
  });

  if (error) throw new Error(`Gagal membuat OTP: ${error.message}`);

  // Bersih-bersih baris expired di background, tidak perlu ditunggu.
  void cleanupExpired();

  return code;
}

export async function getOtpEntry(pendingId: string) {
  const row = await getRow(pendingId);
  if (!row) return undefined;

  return {
    email: row.email,
    expiresAt: new Date(row.expires_at).getTime(),
    attempts: row.attempts,
    lastSentAt: new Date(row.last_sent_at).getTime(),
  };
}

export async function canResend(pendingId: string): Promise<boolean> {
  const row = await getRow(pendingId);
  if (!row) return true;
  return Date.now() - new Date(row.last_sent_at).getTime() >= RESEND_COOLDOWN_MS;
}

export async function resendOtp(pendingId: string): Promise<string | null> {
  const row = await getRow(pendingId);
  if (!row) return null;
  if (Date.now() - new Date(row.last_sent_at).getTime() < RESEND_COOLDOWN_MS) return null;

  const code = generateCode();
  const codeHash = await bcrypt.hash(code, HASH_ROUNDS);
  const supabase = getSupabaseServer();

  const { error } = await supabase
    .from("otp_pending")
    .update({
      code_hash: codeHash,
      expires_at: new Date(Date.now() + OTP_TTL_MS).toISOString(),
      attempts: 0,
      last_sent_at: new Date().toISOString(),
    })
    .eq("pending_id", pendingId);

  if (error) throw new Error(`Gagal mengirim ulang OTP: ${error.message}`);

  return code;
}

export type VerifyResult =
  | { ok: true; email: string }
  | { ok: false; reason: "not_found" | "expired" | "too_many_attempts" | "invalid_code" };

export async function verifyOtp(pendingId: string, code: string): Promise<VerifyResult> {
  const supabase = getSupabaseServer();
  const row = await getRow(pendingId);
  if (!row) return { ok: false, reason: "not_found" };

  if (Date.now() > new Date(row.expires_at).getTime()) {
    await supabase.from("otp_pending").delete().eq("pending_id", pendingId);
    return { ok: false, reason: "expired" };
  }

  if (row.attempts >= MAX_ATTEMPTS) {
    await supabase.from("otp_pending").delete().eq("pending_id", pendingId);
    return { ok: false, reason: "too_many_attempts" };
  }

  const codeMatch = await bcrypt.compare(code, row.code_hash);
  if (!codeMatch) {
    await supabase
      .from("otp_pending")
      .update({ attempts: row.attempts + 1 })
      .eq("pending_id", pendingId);
    return { ok: false, reason: "invalid_code" };
  }

  await supabase.from("otp_pending").delete().eq("pending_id", pendingId);
  return { ok: true, email: row.email };
}

export async function clearOtp(pendingId: string) {
  const supabase = getSupabaseServer();
  await supabase.from("otp_pending").delete().eq("pending_id", pendingId);
}
