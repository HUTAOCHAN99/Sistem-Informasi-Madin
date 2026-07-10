import { ArrowRight, PlayCircle, Users, BookOpenCheck, School, Bell } from "lucide-react";
import IslamicPattern from "./IslamicPattern";
import Reveal from "./Reveal";

const previewStats = [
  { icon: Users, label: "Jumlah Guru", value: "12" },
  { icon: School, label: "Jumlah Santri", value: "150" },
  { icon: BookOpenCheck, label: "Jumlah Kelas", value: "7" },
  { icon: Bell, label: "Pengumuman Aktif", value: "2" },
];

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-madin-navy pt-16 pb-32 lg:pt-20 lg:pb-40"
    >
      <IslamicPattern id="pattern-hero" opacity={0.05} color="#ffffff" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-madin-orange/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-madin-teal/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 bg-white/10 text-madin-orange text-xs font-semibold tracking-wide uppercase px-3.5 py-1.5 rounded-full border border-white/10">
            Sistem Informasi Madrasah Diniyah
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl font-bold text-white leading-[1.15]">
            Administrasi Madrasah, <span className="text-madin-orange">Rapi dan Digital</span> dalam Satu Sistem
          </h1>
          <p className="mt-5 text-white/60 text-base leading-relaxed max-w-lg">
            Kelola data santri, guru, jadwal, absensi, dan nilai madrasah diniyah tanpa lagi
            bergantung pada catatan kertas — bisa diakses dari komputer maupun HP.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#tentang"
              className="inline-flex items-center gap-2 bg-madin-orange text-madin-navy font-semibold px-6 py-3.5 rounded-lg hover:bg-white transition-colors"
            >
              Lihat Profil Madrasah <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#program"
              className="inline-flex items-center gap-2 text-white font-medium px-2 py-3.5 hover:text-madin-orange transition-colors"
            >
              <PlayCircle className="w-5 h-5" /> Jenjang Pendidikan
            </a>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative mx-auto max-w-md">
            <div className="rounded-2xl bg-white shadow-2xl shadow-black/40 overflow-hidden border border-white/10">
              <div className="flex items-center gap-1.5 bg-madin-cream px-4 py-3 border-b border-madin-line">
                <span className="w-2.5 h-2.5 rounded-full bg-madin-orange/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-madin-teal/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-madin-navy/30" />
                <span className="ml-3 text-[11px] text-madin-navy/40 font-medium truncate">
                  madin.vercel.app/dashboard
                </span>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-madin-navy/40">
                  Dashboard
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {previewStats.map((s) => (
                    <div key={s.label} className="rounded-xl border border-madin-line p-3.5">
                      <s.icon className="w-4 h-4 text-madin-teal" />
                      <p className="mt-2 font-display text-xl font-bold text-madin-navy">{s.value}</p>
                      <p className="text-[10px] text-madin-navy/40 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl bg-madin-navy p-3.5 flex items-center justify-between">
                  <span className="text-[11px] text-white/60">Jadwal Hari Ini</span>
                  <span className="text-white font-display font-bold text-sm">5 Kelas</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-madin-orange text-madin-navy rounded-xl px-4 py-3 shadow-xl hidden sm:block">
              <p className="font-display font-bold text-lg leading-none">PWA</p>
              <p className="text-[10px] font-medium mt-1">Terpasang di HP</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
