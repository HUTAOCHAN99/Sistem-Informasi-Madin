import { Database, CalendarCheck2, ClipboardCheck, Smartphone } from "lucide-react";
import Reveal from "./Reveal";

const features = [
  {
    icon: Database,
    title: "Data Terpusat",
    desc: "Data guru, santri, dan kelas tersimpan rapi dalam satu sistem.",
  },
  {
    icon: CalendarCheck2,
    title: "Jadwal & Absensi",
    desc: "Guru mengisi jadwal dan absensi langsung dari HP, tanpa kertas.",
  },
  {
    icon: ClipboardCheck,
    title: "Nilai & Rapor",
    desc: "Nilai harian, UTS, dan UAS terekap otomatis per santri.",
  },
  {
    icon: Smartphone,
    title: "Akses via HP (PWA)",
    desc: "Bisa dipasang di layar utama HP tanpa lewat Play Store.",
  },
];

export default function Features() {
  return (
    <div className="relative z-10 -mt-20 px-6">
      <div className="mx-auto max-w-7xl grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 100}>
            <div className="bg-white rounded-2xl border border-madin-line shadow-lg shadow-black/5 p-6 h-full hover:-translate-y-1 hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-xl bg-madin-orange/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-madin-orange" />
              </div>
              <h3 className="font-display font-semibold text-madin-navy">{f.title}</h3>
              <p className="text-sm text-madin-navy/50 mt-2 leading-relaxed">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
