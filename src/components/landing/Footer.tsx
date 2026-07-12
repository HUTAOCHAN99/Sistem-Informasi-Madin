import Image from "next/image";
import Link from "next/link";

const NAV = [
  { href: "#tentang", label: "Tentang" },
  { href: "#jenjang", label: "Jenjang" },
  { href: "#program", label: "Program" },
  { href: "#jadwal", label: "Jadwal" },
];
const NAV2 = [
  { href: "#pengumuman", label: "Pengumuman" },
  { href: "#galeri", label: "Galeri" },
  { href: "#guru", label: "Guru" },
  { href: "#lokasi", label: "Lokasi" },
];

export default function Footer() {
  return (
    <footer className="bg-madin-navy pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid sm:grid-cols-[1.4fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/icon.png"
                alt="Madin icon"
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="font-display font-semibold text-white text-[15px]">
                Madrasah Diniyah
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mt-4 max-w-xs">
              Membina santri mendalami Al-Qur&apos;an, fiqih, dan akhlak sejak dini,
              berjenjang dan berkesinambungan.
            </p>
          </div>

          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wide">
              Jelajahi
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-white/60 text-sm hover:text-white transition-colors">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wide">
              Informasi
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV2.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-white/60 text-sm hover:text-white transition-colors">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/10 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Madrasah Diniyah Takmiliyah. Seluruh hak cipta dilindungi.
          </p>
          <Link
            href="/dashboard"
            className="text-madin-orange text-xs font-semibold hover:text-white transition-colors"
          >
            Masuk →
          </Link>
        </div>
      </div>
    </footer>
  );
}
