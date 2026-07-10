import { ArrowRight, Mail } from "lucide-react";
import IslamicPattern from "./IslamicPattern";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section id="kontak" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative rounded-3xl bg-madin-teal px-8 py-14 lg:py-16 text-center overflow-hidden">
            <IslamicPattern id="pattern-cta" opacity={0.07} color="#ffffff" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white max-w-xl mx-auto">
                Siap Merapikan Administrasi Madrasah Anda?
              </h2>
              <p className="mt-4 text-white/60 max-w-md mx-auto">
                Mulai dari administrasi inti — data santri, guru, dan jadwal — lalu berkembang
                sesuai kebutuhan.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:info@madin-diniyah.sch.id"
                  className="inline-flex items-center gap-2 bg-white text-madin-navy font-semibold px-6 py-3.5 rounded-lg hover:bg-madin-orange transition-colors"
                >
                  <Mail className="w-4 h-4" /> Hubungi Kami
                </a>
                <a
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-white font-medium border border-white/30 px-6 py-3.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Masuk Dashboard <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
