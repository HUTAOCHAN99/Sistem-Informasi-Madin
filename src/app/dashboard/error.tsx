"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-madin-cream p-6">
      <div className="max-w-lg w-full bg-white rounded-xl2 border border-madin-line p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h1 className="font-display font-semibold text-madin-navy">Terjadi masalah memuat data</h1>
        </div>
        <p className="text-sm text-black/60">{error.message}</p>
        <p className="text-xs text-black/40">
          Kalau pesannya soal env Supabase belum diisi, cek file <code>.env.local</code> —
          isi <code>NEXT_PUBLIC_SUPABASE_URL</code> dan <code>SUPABASE_SERVICE_ROLE_KEY</code>
          sesuai project Supabase kamu (lihat README), lalu restart server dev.
        </p>
        <button
          onClick={reset}
          className="bg-madin-orange text-madin-navy text-sm font-medium px-4 py-2 rounded-lg hover:bg-madin-orangeDark hover:text-white transition-colors"
        >
          Coba lagi
        </button>
      </div>
    </div>
  );
}
