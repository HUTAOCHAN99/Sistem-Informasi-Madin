"use client";

import { useState } from "react";

// Cara pakai:
// 1. Taruh file foto di folder /public/gallery/ dengan nama persis seperti di bawah
//    (misalnya public/gallery/mengaji.jpg).
// 2. Ganti teks "caption" jika perlu — itu yang tampil di bawah foto.
// 3. Kalau file belum ada / nama tidak cocok, tile otomatis kembali ke
//    tampilan placeholder warna supaya layout tidak rusak.
const TILES = [
  { file: "mengaji.jpg", caption: "Kegiatan mengaji sore", tone: "bg-madin-navy" },
  { file: "ibadah.jpg", caption: "Praktik ibadah bersama", tone: "bg-madin-teal" },
  { file: "kelas-awaliyah.jpg", caption: "Suasana kelas Awaliyah", tone: "bg-madin-orange" },
  { file: "kajian-akhlak.jpg", caption: "Kajian akhlak santri", tone: "bg-madin-navySoft" },
  { file: "wisuda.jpg", caption: "Wisuda santri Ulya", tone: "bg-madin-teal" },
  { file: "hari-besar.jpg", caption: "Kegiatan hari besar Islam", tone: "bg-madin-navy" },
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

function GalleryTile({ file, caption, tone }: (typeof TILES)[number]) {
  const [broken, setBroken] = useState(false);
  const src = `/gallery/${file}`;

  return (
    <div className="relative aspect-[4/3] rounded-xl2 overflow-hidden group">
      {!broken ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={caption}
          onError={() => setBroken(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className={`w-full h-full ${tone} flex items-center justify-center`}>
          <Motif />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
      <span className="absolute bottom-4 left-4 right-4 text-white text-sm font-display font-medium">
        {caption}
      </span>
    </div>
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
          gambaran sementara sampai foto asli ditambahkan.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {TILES.map((t) => (
            <GalleryTile key={t.file} file={t.file} caption={t.caption} tone={t.tone} />
          ))}
        </div>
      </div>
    </section>
  );
}
