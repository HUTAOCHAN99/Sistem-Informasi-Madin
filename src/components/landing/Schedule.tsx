import { Clock } from "lucide-react";
import { schedule } from "@/lib/dummy-data";

export default function Schedule() {
  return (
    <section id="jadwal" className="bg-madin-cream py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-madin-teal text-xs font-semibold tracking-wide uppercase">
              Jadwal Belajar
            </p>
            <h2 className="font-display font-bold text-madin-navy text-2xl sm:text-3xl mt-3">
              Kegiatan belajar sore, Senin - Kamis
            </h2>
          </div>
          <p className="text-black/50 text-sm max-w-xs">
            Jadwal lengkap per kelas dapat dilihat oleh wali santri melalui sistem informasi.
          </p>
        </div>

        <div className="bg-white rounded-xl2 border border-madin-line mt-10 overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_1fr_1fr] sm:grid-cols-[120px_1fr_1fr_1fr] bg-madin-navy text-white text-xs font-semibold uppercase tracking-wide">
            <div className="px-4 py-3.5">Hari</div>
            <div className="px-4 py-3.5">Jam</div>
            <div className="px-4 py-3.5">Mata Pelajaran</div>
            <div className="px-4 py-3.5 hidden sm:block">Kelas</div>
          </div>
          {schedule.map((s, i) => (
            <div
              key={s.id}
              className={`grid grid-cols-[auto_1fr_1fr_1fr] sm:grid-cols-[120px_1fr_1fr_1fr] text-sm ${
                i !== schedule.length - 1 ? "border-b border-madin-line" : ""
              }`}
            >
              <div className="px-4 py-3.5 font-medium text-madin-navy">{s.hari}</div>
              <div className="px-4 py-3.5 text-black/60 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-madin-orange shrink-0" />
                <span className="truncate">{s.jam}</span>
              </div>
              <div className="px-4 py-3.5 text-black/70">{s.mapel}</div>
              <div className="px-4 py-3.5 text-black/60 hidden sm:block">{s.kelas}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
