import { BookOpen, Users2, Layers3 } from "lucide-react";
import IslamicPattern from "./IslamicPattern";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="tentang" className="py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative">
            <div className="relative rounded-3xl bg-madin-teal p-8 lg:p-10 overflow-hidden">
              <IslamicPattern id="pattern-about" opacity={0.08} color="#ffffff" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-white/10 border border-white/15 rounded-2xl p-5">
                  <Users2 className="w-6 h-6 text-white" />
                  <p className="text-white font-display font-semibold mt-3">Guru & Santri</p>
                  <p className="text-white/60 text-xs mt-1">Satu data, tanpa duplikasi pencatatan</p>
                </div>
                <div className="bg-white rounded-2xl p-5">
                  <Layers3 className="w-6 h-6 text-madin-orange" />
                  <p className="font-display font-bold text-madin-navy mt-3">3 Jenjang</p>
                  <p className="text-madin-navy/50 text-xs mt-1">Awaliyah–Wustha–Ulya</p>
                </div>
                <div className="bg-white rounded-2xl p-5">
                  <BookOpen className="w-6 h-6 text-madin-orange" />
                  <p className="font-display font-bold text-madin-navy mt-3">8 Kelas</p>
                  <p className="text-madin-navy/50 text-xs mt-1">Terjadwal per jenjang</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-madin-orange rounded-2xl px-5 py-4 shadow-xl">
              <p className="text-madin-navy font-display font-bold text-2xl leading-none">01</p>
              <p className="text-madin-navy/70 text-[11px] font-medium mt-1">Sistem Terpadu</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <span className="text-madin-orange text-xs font-semibold uppercase tracking-wide">
            Tentang Sistem
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-madin-navy leading-tight">
            Satu Sistem untuk Seluruh Administrasi Madrasah Diniyah
          </h2>
          <p className="mt-4 text-madin-navy/55 leading-relaxed">
            Dibangun khusus untuk kebutuhan Madrasah Diniyah Takmiliyah (MDT) — mulai dari
            pendataan santri dan guru, penjadwalan, absensi, hingga penilaian — dapat diakses
            admin dan ustadz dari mana saja.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-madin-orange/10 flex items-center justify-center shrink-0">
                <Users2 className="w-5 h-5 text-madin-orange" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-madin-navy">Hak Akses Sesuai Peran</h3>
                <p className="text-sm text-madin-navy/50 mt-1 leading-relaxed">
                  Admin, ustadz, dan pengunjung mendapat tampilan yang sesuai kebutuhan
                  masing-masing.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-madin-teal/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-madin-teal" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-madin-navy">
                  Riwayat Belajar Tersimpan Rapi
                </h3>
                <p className="text-sm text-madin-navy/50 mt-1 leading-relaxed">
                  Nilai, hafalan, dan absensi setiap santri terekam dari tahun ke tahun.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
