import { ShieldCheck, BookUser, Users } from "lucide-react";
import Reveal from "./Reveal";

const roles = [
  {
    icon: ShieldCheck,
    title: "Admin",
    desc: "Mengelola seluruh data madrasah, biasanya 1–3 orang.",
    items: ["Mengelola guru & santri", "Mengatur jadwal & kelas", "Membuat pengumuman", "Melihat dashboard"],
  },
  {
    icon: BookUser,
    title: "Guru / Ustadz",
    desc: "Fokus mengajar tanpa perlu mengubah data santri.",
    items: ["Melihat jadwal mengajar", "Mengisi absensi", "Mengisi nilai & hafalan", "Membaca pengumuman"],
  },
  {
    icon: Users,
    title: "Pengunjung",
    desc: "Masyarakat umum dapat melihat tanpa perlu login.",
    items: ["Profil & sejarah madrasah", "Visi misi", "Galeri & berita", "Jadwal pendaftaran"],
  },
];

export default function RoleShowcase() {
  return (
    <section id="peran" className="py-24 bg-madin-cream">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-xl">
          <span className="text-madin-orange text-xs font-semibold uppercase tracking-wide">
            Untuk Siapa
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-madin-navy">
            Satu Sistem, Tiga Peran Pengguna
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {roles.map((r, i) => (
            <Reveal key={r.title} delay={i * 120}>
              <div className="bg-white rounded-2xl border border-madin-line p-7 h-full">
                <div className="w-12 h-12 rounded-xl bg-madin-navy flex items-center justify-center">
                  <r.icon className="w-5 h-5 text-madin-orange" />
                </div>
                <h3 className="font-display font-bold text-lg text-madin-navy mt-5">{r.title}</h3>
                <p className="text-sm text-madin-navy/50 mt-1.5">{r.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {r.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm text-madin-navy/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-madin-orange mt-2 shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
