"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, LogOut, ChevronDown } from "lucide-react";

export default function Topbar({ title }: { title: string }) {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 bg-white border-b border-madin-line">
      <div>
        <h1 className="font-display text-lg font-semibold text-madin-navy">{title}</h1>
        <p className="text-xs text-black/40">Data ditampilkan sementara masih dummy</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-madin-cream border border-madin-line rounded-lg px-3 py-2 w-56">
          <Search className="w-4 h-4 text-black/30" />
          <input
            placeholder="Cari..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-black/30"
          />
        </div>
        <button className="relative w-9 h-9 rounded-lg border border-madin-line flex items-center justify-center hover:bg-madin-cream">
          <Bell className="w-4 h-4 text-madin-navy" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-madin-orange" />
        </button>

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

