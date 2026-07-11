// src/lib/auth/session.ts
//
// Session admin disimpan di cookie httpOnly berisi payload + signature
// (HMAC SHA-256), jadi tidak bisa dipalsukan dari sisi client tanpa tahu
// SESSION_SECRET. Ini dipakai supaya kita tidak perlu tabel `sessions` dulu
// sebelum Supabase Auth beneran disambungkan.
//
// Sengaja pakai Web Crypto API (globalThis.crypto.subtle), BUKAN modul
// "crypto" bawaan Node.js — soalnya file ini dipakai juga oleh
// middleware.ts, yang di Next.js berjalan di Edge Runtime dan tidak
// mendukung modul Node "crypto".
//
// Nanti kalau sudah pakai Supabase Auth, file ini bisa diganti total
// dengan session bawaan Supabase (supabase.auth.getSession(), dst).

export const SESSION_COOKIE = "madin_admin_session";
export const PENDING_COOKIE = "madin_otp_pending";

const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 jam
const SECRET = process.env.SESSION_SECRET ?? "madin-dev-secret-ganti-di-produksi";

type SessionPayload = {
  email: string;
  role: "admin";
  exp: number; // epoch ms
};

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  arr.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

async function getKey(): Promise<CryptoKey> {
  const keyData = new TextEncoder().encode(SECRET);
  return crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function sign(data: string): Promise<string> {
  const key = await getKey();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return toBase64Url(signatureBuffer);
}

export async function createSessionToken(email: string): Promise<string> {
  const payload: SessionPayload = {
    email,
    role: "admin",
    exp: Date.now() + SESSION_TTL_MS,
  };
  const data = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await sign(data);
  return `${data}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token) return null;
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;

  const expectedSignature = await sign(data);
  if (expectedSignature.length !== signature.length || expectedSignature !== signature) {
    return null;
  }

  try {
    const payload = JSON.parse(
      new TextDecoder().decode(fromBase64Url(data))
    ) as SessionPayload;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;
