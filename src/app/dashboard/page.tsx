import Topbar from "@/components/dashboard/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import { Users, GraduationCap, School, Megaphone, CalendarDays } from "lucide-react";
import { dashboardStats, announcements, schedule } from "@/lib/dummy-data";

export default function DashboardPage() {
  return (
    <>
      <Topbar title="Dashboard" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard icon={Users} label="Jumlah Guru" value={dashboardStats.totalGuru} />
          <StatCard icon={GraduationCap} label="Jumlah Santri" value={dashboardStats.totalSantri} />
          <StatCard icon={School} label="Jumlah Kelas" value={dashboardStats.totalKelas} />
          <StatCard icon={Megaphone} label="Pengumuman Aktif" value={dashboardStats.pengumumanAktif} />
          <StatCard icon={CalendarDays} label="Jadwal Hari Ini" value={dashboardStats.jadwalHariIni} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl2 border border-madin-line p-5">
            <h2 className="font-display font-semibold text-madin-navy mb-4">Pengumuman Terbaru</h2>
            <ul className="space-y-3">
              {announcements.map((a) => (
                <li key={a.id} className="border-b border-madin-line last:border-0 pb-3 last:pb-0">
                  <p className="text-sm font-medium text-madin-navy">{a.judul}</p>
                  <p className="text-xs text-black/50 mt-0.5">{a.isi}</p>
                  <p className="text-[11px] text-madin-orangeDark mt-1">{a.tanggal}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl2 border border-madin-line p-5">
            <h2 className="font-display font-semibold text-madin-navy mb-4">Jadwal Terdekat</h2>
            <ul className="space-y-3">
              {schedule.slice(0, 5).map((s) => (
                <li key={s.id} className="flex items-center justify-between text-sm border-b border-madin-line last:border-0 pb-3 last:pb-0">
                  <div>
                    <p className="font-medium text-madin-navy">{s.mapel}</p>
                    <p className="text-xs text-black/50">{s.kelas} · {s.guru}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-madin-teal">{s.hari}</p>
                    <p className="text-[11px] text-black/40">{s.jam}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
