import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { verifyAdminCredentials } from "@/lib/auth/admin-credentials";
import { createOtp } from "@/lib/auth/otp-store";
import { sendOtpEmail } from "@/lib/auth/send-otp";
import { PENDING_COOKIE } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, message: "Email dan password wajib diisi." },
      { status: 400 }
    );
  }

  const isValid = await verifyAdminCredentials(email, password);
  if (!isValid) {
    return NextResponse.json(
      { ok: false, message: "Email atau password salah." },
      { status: 401 }
    );
  }

  const pendingId = crypto.randomUUID();
  const code = await createOtp(pendingId, email.trim().toLowerCase());
  const { devMode, devCode } = await sendOtpEmail(email, code);

  const res = NextResponse.json({
    ok: true,
    message: devMode
      ? "Kode OTP berhasil dibuat (mode pengembangan — lihat di bawah)."
      : "Kode OTP telah dikirim ke email kamu.",
    devOtp: devCode, // hanya terisi kalau OTP_DEV_MODE=true
  });

  res.cookies.set(PENDING_COOKIE, pendingId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 5 * 60, // 5 menit, samakan dengan TTL OTP
  });

  return res;
}
