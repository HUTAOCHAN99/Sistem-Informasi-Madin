"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Moon,
} from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/guru", label: "Data Guru", icon: Users },
  { href: "/dashboard/santri", label: "Data Santri", icon: GraduationCap },
  { href: "/dashboard/kelas", label: "Data Kelas", icon: School },
  { href: "/dashboard/jadwal", label: "Jadwal", icon: CalendarDays },
  { href: "/dashboard/absensi", label: "Absensi", icon: ClipboardCheck },
  { href: "/dashboard/nilai", label: "Nilai", icon: NotebookPen },
  { href: "/dashboard/pengumuman", label: "Pengumuman", icon: Megaphone },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 shrink-0 bg-madin-navy text-white/90 min-h-screen">
      <div className="flex items-center gap-2 px-6 py-6 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-madin-orange flex items-center justify-center">
          <Moon className="w-5 h-5 text-madin-navy" />
        </div>
        <div>
          <p className="font-display font-semibold leading-tight">Madin</p>
          <p className="text-[11px] text-white/50 leading-tight">Sistem Informasi</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
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

      <div className="px-3 py-4 border-t border-white/10">
        <Link
          href="/dashboard/pengaturan"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
        >
          <Settings className="w-4 h-4" />
          Pengaturan
        </Link>
      </div>
    </aside>
  );
}
