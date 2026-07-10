import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold text-madin-navy">
          Sistem Informasi Madrasah Diniyah
        </h1>
        <p className="text-black/50 mt-2 text-sm">
          Halaman publik (Beranda, Profil, dll) belum dibuat — ini kerangka dashboard dulu.
        </p>
        <Link
          href="/dashboard"
          className="inline-block mt-6 bg-madin-orange text-madin-navy font-medium px-5 py-2.5 rounded-lg hover:bg-madin-orangeDark hover:text-white transition-colors"
        >
          Buka Dashboard →
        </Link>
      </div>
    </main>
  );
}
