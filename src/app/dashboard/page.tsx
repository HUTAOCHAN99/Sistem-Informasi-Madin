export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import { Users, GraduationCap, School, Megaphone, CalendarDays } from "lucide-react";
import { getDashboardStats } from "@/lib/data/stats";
import { getAnnouncements } from "@/lib/data/announcements";
import { getJadwalTerdekat } from "@/lib/data/schedule";
import { matchQuery } from "@/lib/utils/search";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q ?? "";
  const [stats, allAnnouncements, allSchedule] = await Promise.all([
    getDashboardStats(),
    getAnnouncements(),
    getJadwalTerdekat(),
  ]);
  const announcements = allAnnouncements.filter((a) => matchQuery(q, a.judul, a.isi));
  const schedule = allSchedule.filter((s) => matchQuery(q, s.mapel, s.guru, s.kelas, s.hari));

  return (
    <>
      <Topbar title="Dashboard" searchPlaceholder="Cari pengumuman, jadwal..." />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard icon={Users} label="Jumlah Guru" value={stats.totalGuru} />
          <StatCard icon={GraduationCap} label="Jumlah Santri" value={stats.totalSantri} />
          <StatCard icon={School} label="Jumlah Kelas" value={stats.totalKelas} />
          <StatCard icon={Megaphone} label="Pengumuman Aktif" value={stats.pengumumanAktif} />
          <StatCard icon={CalendarDays} label="Jadwal Hari Ini" value={stats.jadwalHariIni} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl2 border border-madin-line p-5">
            <h2 className="font-display font-semibold text-madin-navy mb-4">Pengumuman Terbaru</h2>
            <ul className="space-y-3">
              {announcements.slice(0, 5).map((a) => (
                <li key={a.id} className="border-b border-madin-line last:border-0 pb-3 last:pb-0">
                  <p className="text-sm font-medium text-madin-navy">{a.judul}</p>
                  <p className="text-xs text-black/50 mt-0.5">{a.isi}</p>
                  <p className="text-[11px] text-madin-orangeDark mt-1">{a.tanggal}</p>
                </li>
              ))}
              {announcements.length === 0 && (
                <p className="text-sm text-black/40">Belum ada pengumuman.</p>
              )}
            </ul>
          </div>

          <div className="bg-white rounded-xl2 border border-madin-line p-5">
            <h2 className="font-display font-semibold text-madin-navy mb-4">Jadwal Terdekat</h2>
            <ul className="space-y-3">
              {schedule.slice(0, 5).map((s) => {
                const detail = [s.kelas, s.guru].filter(Boolean).join(" · ");
                return (
                  <li
                    key={s.id}
                    className="flex items-center justify-between text-sm border-b border-madin-line last:border-0 pb-3 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-madin-navy">{s.mapel || s.hari}</p>
                      {detail && <p className="text-xs text-black/50">{detail}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-madin-teal">{s.hari}</p>
                      {s.jam && <p className="text-[11px] text-black/40">{s.jam}</p>}
                    </div>
                  </li>
                );
              })}
              {schedule.length === 0 && (
                <p className="text-sm text-black/40">Belum ada jadwal.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
