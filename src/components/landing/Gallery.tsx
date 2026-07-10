const TILES = [
  { caption: "Kegiatan mengaji sore", tone: "bg-madin-navy" },
  { caption: "Praktik ibadah bersama", tone: "bg-madin-teal" },
  { caption: "Suasana kelas Awaliyah", tone: "bg-madin-orange" },
  { caption: "Kajian akhlak santri", tone: "bg-madin-navySoft" },
  { caption: "Wisuda santri Ulya", tone: "bg-madin-teal" },
  { caption: "Kegiatan hari besar Islam", tone: "bg-madin-navy" },
];

function Motif() {
  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-20" fill="none">
      <path
        d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function Gallery() {
  return (
    <section id="galeri" className="bg-madin-cream py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <p className="text-madin-teal text-xs font-semibold tracking-wide uppercase">
          Galeri
        </p>
        <h2 className="font-display font-bold text-madin-navy text-2xl sm:text-3xl mt-3 max-w-xl">
          Sekilas suasana kegiatan madrasah
        </h2>
        <p className="text-black/50 text-sm mt-3 max-w-xl">
          Foto kegiatan akan segera diperbarui — ruang di bawah ini menampilkan
          gambaran sementara.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {TILES.map((t) => (
            <div
              key={t.caption}
              className={`relative aspect-[4/3] rounded-xl2 ${t.tone} flex items-center justify-center overflow-hidden`}
            >
              <Motif />
              <span className="absolute bottom-4 left-4 right-4 text-white text-sm font-display font-medium">
                {t.caption}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
