"use client";

import { useMemo, useState } from "react";
import { ZoomIn, ChevronDown, ChevronUp } from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import type { GalleryItem } from "@/lib/types";

// Konten galeri sekarang dinamis: dikelola lewat Dashboard > Galeri (CRUD +
// upload foto ke Supabase Storage), bukan lagi file statis di /public/gallery.
// Kalau fotonya gagal dimuat (mis. URL rusak), tile otomatis kembali ke
// tampilan placeholder warna supaya layout tidak rusak.

const TONES = [
  "bg-madin-navy",
  "bg-madin-teal",
  "bg-madin-orange",
  "bg-madin-navySoft",
  "bg-madin-teal",
  "bg-madin-navy",
];

const PREVIEW_COUNT = 6;

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

function GalleryTile({
  src,
  caption,
  tone,
}: {
  src: string;
  caption: string;
  tone: string;
}) {
  const [broken, setBroken] = useState(false);
  const [preview, setPreview] = useState(false);

  return (
    <>
      <div
        role={!broken ? "button" : undefined}
        tabIndex={!broken ? 0 : undefined}
        onClick={() => !broken && setPreview(true)}
        onKeyDown={(e) => {
          if (!broken && (e.key === "Enter" || e.key === " ")) setPreview(true);
        }}
        aria-label={!broken ? `Perbesar foto: ${caption}` : undefined}
        className={`relative aspect-[4/3] rounded-xl2 overflow-hidden group ${
          !broken ? "cursor-zoom-in" : ""
        }`}
      >
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
        {!broken && (
          <ZoomIn className="absolute top-4 right-4 w-5 h-5 text-white/0 group-hover:text-white/90 transition-colors" />
        )}
        <span className="absolute bottom-4 left-4 right-4 text-white text-sm font-display font-medium">
          {caption}
        </span>
      </div>

      {preview && (
        <ImageLightbox src={src} alt={caption} onClose={() => setPreview(false)} />
      )}
    </>
  );
}

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = useMemo(
    () => (expanded ? items : items.slice(0, PREVIEW_COUNT)),
    [items, expanded]
  );

  const hasMore = items.length > PREVIEW_COUNT;

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
          Dokumentasi kegiatan santri dan madrasah, diperbarui langsung oleh
          pengurus lewat dashboard.
        </p>

        {items.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {visibleItems.map((item, i) => (
                <GalleryTile
                  key={item.id}
                  src={item.foto_url}
                  caption={item.caption || "Kegiatan madrasah"}
                  tone={TONES[i % TONES.length]}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="flex items-center gap-2 bg-white border border-madin-line text-madin-navy text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-madin-navy hover:text-white hover:border-madin-navy transition-colors"
                >
                  {expanded ? (
                    <>
                      Tampilkan Lebih Sedikit
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Lihat Semua Foto ({items.length})
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-black/40 mt-10">
            Foto kegiatan akan segera ditambahkan oleh pengurus madrasah.
          </p>
        )}
      </div>
    </section>
  );
}
