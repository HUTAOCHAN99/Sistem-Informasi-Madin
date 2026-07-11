"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Moon, Lock, Mail, ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import OtpInput from "@/components/auth/OtpInput";

type Step = "credentials" | "otp";

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/dashboard";

  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("admin@madin.sch.id");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  function startCooldown(seconds: number) {
    setResendCooldown(seconds);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setResendCooldown((s) => {
        if (s <= 1) {
          if (cooldownRef.current) clearInterval(cooldownRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  async function handleSubmitCredentials(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Email atau password salah.");
        return;
      }
      setDevOtp(data.devOtp ?? null);
      setStep("otp");
      startCooldown(30);
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(code: string) {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Kode OTP salah.");
        setOtp("");
        return;
      }
      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0) return;
    setError(null);
    try {
      const res = await fetch("/api/auth/resend-otp", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Gagal mengirim ulang kode.");
        return;
      }
      setDevOtp(data.devOtp ?? null);
      setOtp("");
      startCooldown(30);
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-madin-cream px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-madin-orange flex items-center justify-center">
            <Moon className="w-6 h-6 text-madin-navy" />
          </div>
          <p className="font-display font-semibold text-madin-navy text-lg">Madin</p>
          <p className="text-xs text-black/40">Sistem Informasi Madrasah Diniyah</p>
        </div>

        <div className="bg-white border border-madin-line rounded-xl2 shadow-sm p-6 sm:p-8">
          {step === "credentials" ? (
            <>
              <h1 className="font-display text-xl font-semibold text-madin-navy mb-1">
                Masuk sebagai Admin
              </h1>
              <p className="text-sm text-black/50 mb-6">
                Masukkan email dan password admin untuk melanjutkan.
              </p>

              <form onSubmit={handleSubmitCredentials} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-madin-navy/70 mb-1.5 block">
                    Email
                  </label>
                  <div className="flex items-center gap-2 border border-madin-line rounded-lg px-3 py-2.5 focus-within:border-madin-orange focus-within:ring-2 focus-within:ring-madin-orange/30 transition-colors">
                    <Mail className="w-4 h-4 text-black/30 shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@madin.sch.id"
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-madin-navy/70 mb-1.5 block">
                    Password
                  </label>
                  <div className="flex items-center gap-2 border border-madin-line rounded-lg px-3 py-2.5 focus-within:border-madin-orange focus-within:ring-2 focus-within:ring-madin-orange/30 transition-colors">
                    <Lock className="w-4 h-4 text-black/30 shrink-0" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-madin-orange hover:bg-madin-orangeDark text-madin-navy font-semibold rounded-lg py-2.5 text-sm transition-colors disabled:opacity-60"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Lanjutkan
                </button>
              </form>

              <p className="text-xs text-black/40 mt-5 text-center">
                Demo: admin@madin.sch.id / admin123
              </p>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setStep("credentials");
                  setError(null);
                  setOtp("");
                }}
                className="flex items-center gap-1.5 text-xs text-black/40 hover:text-madin-navy mb-4 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Kembali
              </button>

              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-5 h-5 text-madin-teal" />
                <h1 className="font-display text-xl font-semibold text-madin-navy">
                  Verifikasi OTP
                </h1>
              </div>
              <p className="text-sm text-black/50 mb-6">
                Masukkan 5 digit kode OTP yang dikirim ke <b>{email}</b>. Kode berlaku 5 menit.
              </p>

              <OtpInput
                value={otp}
                onChange={setOtp}
                onComplete={handleVerifyOtp}
                disabled={loading}
              />

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-4">
                  {error}
                </p>
              )}

              {devOtp && (
                <p className="text-xs text-madin-teal bg-madin-teal/10 border border-madin-teal/20 rounded-lg px-3 py-2 mt-4">
                  <b>Mode pengembangan:</b> layanan email/WA belum disambungkan,
                  jadi kode OTP ditampilkan di sini: <b>{devOtp}</b>
                </p>
              )}

              <button
                onClick={() => handleVerifyOtp(otp)}
                disabled={loading || otp.length !== 5}
                className="w-full flex items-center justify-center gap-2 bg-madin-orange hover:bg-madin-orangeDark text-madin-navy font-semibold rounded-lg py-2.5 text-sm transition-colors disabled:opacity-60 mt-5"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Verifikasi & Masuk
              </button>

              <button
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="w-full text-xs text-black/50 hover:text-madin-navy mt-3 disabled:opacity-50 transition-colors"
              >
                {resendCooldown > 0
                  ? `Kirim ulang kode dalam ${resendCooldown}s`
                  : "Kirim ulang kode OTP"}
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}
