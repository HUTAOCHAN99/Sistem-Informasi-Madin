import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

const programs = [
  {
    tag: "Tingkat Dasar",
    name: "Awaliyah",
    levels: "4 Tingkatan",
    desc: "Pengenalan dasar bagi santri yang baru mulai belajar diniyah.",
    points: ["Pengenalan huruf Hijaiyah", "Doa harian & adab", "Akhlak dasar"],
  },
  {
    tag: "Tingkat Menengah",
    name: "Wustha",
    levels: "2 Tingkatan",
    desc: "Lanjutan bagi santri yang telah menyelesaikan jenjang Awaliyah.",
    points: ["Tajwid & bacaan Qur'an", "Fiqih ibadah", "Hadits pilihan"],
  },
  {
    tag: "Tingkat Lanjut",
    name: "Ulya",
    levels: "2 Tingkatan",
    desc: "Jenjang tertinggi dengan materi keagamaan yang lebih mendalam.",
    points: ["Tafsir Al-Qur'an", "Fiqih muamalah", "Dasar kitab kuning"],
  },
];

export default function Programs() {
  return (
    <section id="program" className="py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-xl mx-auto text-center">
          <span className="text-madin-orange text-xs font-semibold uppercase tracking-wide">
            Jenjang Pendidikan
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-madin-navy">
            Tiga Jenjang, Satu Arah Pembelajaran
          </h2>
          <p className="mt-3 text-madin-navy/50">
            Setiap jenjang memiliki wali kelas, jadwal, dan tingkatan tersendiri yang tercatat
            dalam sistem.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div className="rounded-2xl border border-madin-line overflow-hidden h-full hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`p-6 ${i === 1 ? "bg-madin-orange" : "bg-madin-navy"}`}>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wide ${
                      i === 1 ? "text-madin-navy/70" : "text-white/50"
                    }`}
                  >
                    {p.tag}
                  </span>
                  <h3
                    className={`font-display text-2xl font-bold mt-1 ${
                      i === 1 ? "text-madin-navy" : "text-white"
                    }`}
                  >
                    {p.name}
                  </h3>
                  <p className={`text-xs mt-1 ${i === 1 ? "text-madin-navy/60" : "text-white/40"}`}>
                    {p.levels}
                  </p>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-sm text-madin-navy/55 leading-relaxed">{p.desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-sm text-madin-navy/70">
                        <CheckCircle2 className="w-4 h-4 text-madin-teal shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
