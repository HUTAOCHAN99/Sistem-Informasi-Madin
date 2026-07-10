import { BookOpenText, Scale, Heart, Sparkle, Languages } from "lucide-react";

const PROGRAMS = [
  {
    icon: BookOpenText,
    name: "Al-Qur'an",
    desc: "Tahsin, tajwid, dan hafalan surat-surat pilihan sesuai jenjang santri.",
  },
  {
    icon: Scale,
    name: "Fiqih",
    desc: "Tata cara bersuci, shalat, puasa, dan ibadah sehari-hari lainnya.",
  },
  {
    icon: Heart,
    name: "Akhlak",
    desc: "Adab kepada orang tua, guru, dan sesama dalam keseharian santri.",
  },
  {
    icon: Sparkle,
    name: "Tauhid",
    desc: "Dasar-dasar keimanan dan pengenalan asma dan sifat Allah.",
  },
  {
    icon: Languages,
    name: "Bahasa Arab",
    desc: "Kosakata dan tata bahasa dasar untuk membantu memahami teks agama.",
  },
];

export default function Programs() {
  return (
    <section id="program" className="bg-white py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <p className="text-madin-teal text-xs font-semibold tracking-wide uppercase">
          Program Pembelajaran
        </p>
        <h2 className="font-display font-bold text-madin-navy text-2xl sm:text-3xl mt-3 max-w-xl">
          Lima mata pelajaran inti di setiap jenjang
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-12">
          {PROGRAMS.map((p) => (
            <div
              key={p.name}
              className="rounded-xl2 border border-madin-line p-6 bg-madin-cream hover:bg-white hover:shadow-sm transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-madin-navy flex items-center justify-center">
                <p.icon className="w-5 h-5 text-madin-orange" />
              </div>
              <h3 className="font-display font-semibold text-madin-navy mt-4">
                {p.name}
              </h3>
              <p className="text-black/55 text-sm leading-relaxed mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
