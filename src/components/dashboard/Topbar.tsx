"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Bell, Search, LogOut, ChevronDown, X } from "lucide-react";

export default function Topbar({
  title,
  searchPlaceholder = "Cari...",
}: {
  title: string;
  searchPlaceholder?: string;
}) {
  const [email, setEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(currentQ);

  // Sinkronkan input kalau query berubah dari luar (mis. navigasi via link
  // lain atau tombol back/forward browser).
  useEffect(() => {
    setQuery(currentQ);
  }, [currentQ]);

  // Debounce: baru dorong ke URL 400ms setelah user berhenti mengetik,
  // supaya tidak nge-refetch data server tiap ketikan huruf.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query === currentQ) return;
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set("q", query.trim());
      } else {
        params.delete("q");
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setEmail(data?.email ?? null))
      .catch(() => setEmail(null));
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    // Sengaja pakai full page reload (bukan router.push + router.refresh).
    // router.push() cuma soft-navigation dan tidak membersihkan Next.js
    // Client-side Router Cache milik route lain (mis. /dashboard) yang
    // sudah sempat dikunjungi sebelum logout. Kalau tetap pakai
    // router.push, klik balik ke /dashboard dalam ~30 detik bisa
    // menyajikan versi ter-cache di browser tanpa request baru ke server
    // — sehingga middleware.ts (yang mengecek cookie sesi) tidak sempat
    // jalan, dan kelihatan seperti masih login padahal cookie-nya sudah
    // kehapus. window.location memaksa reload penuh, jadi cache lama
    // ikut dibuang dan request berikutnya pasti lewat middleware.
    window.location.href = "/";
  }

  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 bg-white border-b border-madin-line">
      <div>
        <h1 className="font-display text-lg font-semibold text-madin-navy">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-madin-cream border border-madin-line rounded-lg px-3 py-2 w-56">
          <Search className="w-4 h-4 text-black/30 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="bg-transparent text-sm outline-none w-full placeholder:text-black/30"
          />
          {query && (
            <button
              type="button"
              aria-label="Bersihkan pencarian"
              onClick={() => setQuery("")}
              className="text-black/30 hover:text-black/60 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-madin-cream transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-madin-orange/20 flex items-center justify-center text-madin-orangeDark text-sm font-semibold">
              A
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-black/40 hidden sm:block" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-madin-line rounded-lg shadow-lg py-1 z-10">
              <div className="px-3 py-2 border-b border-madin-line">
                <p className="text-xs text-black/40">Masuk sebagai</p>
                <p className="text-sm font-medium text-madin-navy truncate">
                  {email ?? "Admin"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
