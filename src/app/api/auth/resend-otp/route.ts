import { NextRequest, NextResponse } from "next/server";
import { canResend, getOtpEntry, resendOtp } from "@/lib/auth/otp-store";
import { sendOtpEmail } from "@/lib/auth/send-otp";
import { PENDING_COOKIE } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  const pendingId = req.cookies.get(PENDING_COOKIE)?.value;
  if (!pendingId) {
    return NextResponse.json(
      { ok: false, message: "Sesi OTP tidak ditemukan. Silakan login ulang." },
      { status: 400 }
    );
  }

  if (!(await canResend(pendingId))) {
    return NextResponse.json(
      { ok: false, message: "Tunggu beberapa detik sebelum minta kode baru." },
      { status: 429 }
    );
  }

  const entry = await getOtpEntry(pendingId);
  if (!entry) {
    return NextResponse.json(
      { ok: false, message: "Sesi OTP sudah kedaluwarsa. Silakan login ulang." },
      { status: 400 }
    );
  }

  const code = await resendOtp(pendingId);
  if (!code) {
    return NextResponse.json(
      { ok: false, message: "Gagal mengirim ulang kode. Silakan login ulang." },
      { status: 400 }
    );
  }

  const { devMode, devCode } = await sendOtpEmail(entry.email, code);

  return NextResponse.json({
    ok: true,
    message: devMode
      ? "Kode OTP baru berhasil dibuat (mode pengembangan)."
      : "Kode OTP baru telah dikirim.",
    devOtp: devCode,
  });
}
