import { GraduationCap, Users, School, CalendarCheck } from "lucide-react";
import { dashboardStats } from "@/lib/dummy-data";

const ITEMS = [
  { icon: Users, value: dashboardStats.totalSantri, label: "Santri Aktif" },
  { icon: GraduationCap, value: dashboardStats.totalGuru, label: "Pengajar" },
  { icon: School, value: dashboardStats.totalKelas, label: "Kelas Berjalan" },
  { icon: CalendarCheck, value: dashboardStats.jadwalHariIni, label: "Jadwal Hari Ini" },
];

export default function Stats() {
  return (
    <section id="statistik" className="bg-white py-16 border-y border-madin-line">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {ITEMS.map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <div className="w-11 h-11 rounded-lg bg-madin-orange/10 flex items-center justify-center mx-auto sm:mx-0">
                <item.icon className="w-5 h-5 text-madin-orange" />
              </div>
              <p className="font-display font-bold text-madin-navy text-3xl mt-4">
                {item.value}
              </p>
              <p className="text-black/50 text-xs mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
