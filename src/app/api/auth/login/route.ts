import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/auth/admin-credentials";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
} from "@/lib/auth/session";

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

  const token = await createSessionToken(email.trim().toLowerCase());

  const res = NextResponse.json({ ok: true, message: "Login berhasil." });

  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return res;
}
