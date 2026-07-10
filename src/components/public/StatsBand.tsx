import { Layers3, School, LayoutGrid, Smartphone } from "lucide-react";
import IslamicPattern from "./IslamicPattern";
import Reveal from "./Reveal";

const stats = [
  { icon: Layers3, value: "3", label: "Jenjang Pendidikan" },
  { icon: School, value: "8", label: "Tingkatan Kelas" },
  { icon: LayoutGrid, value: "10", label: "Modul Digital" },
  { icon: Smartphone, value: "100%", label: "Berbasis Web & PWA" },
];

export default function StatsBand() {
  return (
    <section className="relative bg-madin-navy py-16 overflow-hidden">
      <IslamicPattern id="pattern-stats" opacity={0.05} color="#ffffff" />
      <div className="relative mx-auto max-w-7xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100} className="text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-madin-orange flex items-center justify-center">
              <s.icon className="w-6 h-6 text-madin-navy" />
            </div>
            <p className="mt-4 font-display text-3xl font-bold text-white">{s.value}</p>
            <p className="text-white/50 text-xs mt-1">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
