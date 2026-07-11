import { NextRequest, NextResponse } from "next/server";
import { verifyOtp } from "@/lib/auth/otp-store";
import {
  PENDING_COOKIE,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
} from "@/lib/auth/session";

const REASON_MESSAGE: Record<string, string> = {
  not_found:
    "Sesi OTP tidak ditemukan atau sudah kedaluwarsa. Silakan login ulang.",
  expired: "Kode OTP sudah kedaluwarsa. Silakan minta kode baru.",
  too_many_attempts: "Terlalu banyak percobaan salah. Silakan login ulang.",
  invalid_code: "Kode OTP salah. Coba lagi.",
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.trim() : "";

  const pendingId = req.cookies.get(PENDING_COOKIE)?.value;
  if (!pendingId) {
    return NextResponse.json(
      { ok: false, message: REASON_MESSAGE.not_found },
      { status: 400 },
    );
  }

  if (!/^\d{5}$/.test(code)) {
    return NextResponse.json(
      { ok: false, message: "Kode OTP harus 5 digit angka." },
      { status: 400 },
    );
  }

  const result = verifyOtp(pendingId, code);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: REASON_MESSAGE[result.reason] },
      { status: 400 },
    );
  }

  const token = await createSessionToken(result.email);

  const res = NextResponse.json({ ok: true, message: "Login berhasil." });

  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  res.cookies.set(PENDING_COOKIE, "", { path: "/", maxAge: 0 });

  return res;
}
