"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  CalendarDays,
  ClipboardCheck,
  NotebookPen,
  Megaphone,
  Settings,
  Menu,
  X,
  Wallet,
  Image as ImageIcon,
} from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/guru", label: "Data Guru", icon: Users },
  { href: "/dashboard/santri", label: "Data Santri", icon: GraduationCap },
  { href: "/dashboard/kelas", label: "Data Kelas", icon: School },
  { href: "/dashboard/jadwal", label: "Jadwal", icon: CalendarDays },
  { href: "/dashboard/absensi", label: "Absensi", icon: ClipboardCheck },
  { href: "/dashboard/nilai", label: "Nilai", icon: NotebookPen },
  { href: "/dashboard/spp", label: "Pembayaran SPP", icon: Wallet },
  { href: "/dashboard/pengumuman", label: "Pengumuman", icon: Megaphone },
  { href: "/dashboard/galeri", label: "Galeri", icon: ImageIcon },
];

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-lg bg-white/10 p-1.5 shrink-0">
        <Image src="/icon.png" alt="Madin icon" width={40} height={40} className="w-full h-full object-contain" />
      </div>
      <div className="min-w-0">
        <Image src="/madin-teks.png" alt="Madin" width={96} height={24} className="h-5 w-auto" />
        <p className="text-[11px] text-white/50 leading-tight mt-0.5">Sistem Informasi</p>
      </div>
    </div>
  );
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              active
                ? "bg-madin-orange text-madin-navy font-medium"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}



export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Tutup drawer otomatis setiap kali pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Kunci scroll body saat drawer mobile terbuka
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Topbar mobile: hamburger + logo, cuma tampil di layar kecil */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between gap-2 px-4 h-14 bg-madin-navy text-white/90">
        <Brand />
        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Overlay gelap saat drawer mobile terbuka */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer mobile: geser dari kiri */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[80%] flex flex-col bg-madin-navy text-white/90 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-6 py-6 border-b border-white/10">
          <Brand />
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
      </aside>

      {/* Sidebar desktop: tetap seperti semula */}
      <aside className="hidden md:flex md:flex-col md:w-64 shrink-0 bg-madin-navy text-white/90 min-h-screen">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-white/10">
          <Brand />
        </div>
        <NavLinks pathname={pathname} />
      </aside>
    </>
  );
}
