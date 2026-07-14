"use client";

import Image from "next/image";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react";

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/dashboard";

  const [email, setEmail] = useState("admin@madin.sch.id");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
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
      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-madin-cream px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-white/70 border border-madin-line p-2 shadow-sm">
            <Image
              src="/icon.png"
              alt="Madin icon"
              width={80}
              height={80}
              priority
              className="w-full h-full object-contain"
            />
          </div>
          <Image
            src="/madin-teks.png"
            alt="Madin"
            width={180}
            height={48}
            priority
            className="h-8 w-auto"
          />
          <p className="text-xs text-black/40">Sistem Informasi Madrasah Diniyah</p>
        </div>

        <div className="bg-white border border-madin-line rounded-xl2 shadow-sm p-6 sm:p-8">
          <h1 className="font-display text-xl font-semibold text-madin-navy mb-1">
            Masuk sebagai Admin
          </h1>
          <p className="text-sm text-black/50 mb-6">
            Masukkan email dan password admin untuk melanjutkan.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  className="text-black/40 hover:text-madin-navy transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
              Masuk
            </button>
          </form>

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
