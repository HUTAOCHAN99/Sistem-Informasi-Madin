import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import IslamicPattern from "./IslamicPattern";

export default function Footer() {
  return (
    <footer className="relative bg-madin-navy pt-16 pb-8 overflow-hidden">
      <IslamicPattern id="pattern-footer" opacity={0.04} color="#ffffff" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a href="#beranda" className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-lg bg-madin-orange flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </span>
              <span className="font-display font-bold text-lg text-white">
                Madin<span className="text-madin-orange">.</span>
              </span>
            </a>
            <p className="text-white/50 text-sm mt-4 max-w-sm leading-relaxed">
              Sistem Informasi Madrasah Diniyah Takmiliyah — mengelola data santri, guru, jadwal,
              dan nilai dalam satu platform digital.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-madin-orange hover:text-madin-navy transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-madin-orange hover:text-madin-navy transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-madin-orange hover:text-madin-navy transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-semibold text-sm">Tautan</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li>
                <a href="#tentang" className="hover:text-madin-orange transition-colors">
                  Tentang Sistem
                </a>
              </li>
              <li>
                <a href="#program" className="hover:text-madin-orange transition-colors">
                  Jenjang Pendidikan
                </a>
              </li>
              <li>
                <a href="#peran" className="hover:text-madin-orange transition-colors">
                  Untuk Siapa
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-madin-orange transition-colors">
                  Masuk Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-semibold text-sm">Kontak</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-madin-orange mt-0.5 shrink-0" />
                Dusun —, Kec. —, Kab. —
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-madin-orange shrink-0" />
                +62 812-0000-0000
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-madin-orange shrink-0" />
                info@madin-diniyah.sch.id
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} Sistem Informasi Madrasah Diniyah. Seluruh hak dilindungi.
          </p>
          <p className="text-white/35 text-xs">Dibangun dengan Next.js &amp; Supabase</p>
        </div>
      </div>
    </footer>
  );
}
