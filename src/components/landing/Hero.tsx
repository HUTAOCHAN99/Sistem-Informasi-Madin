"use client";

import { useState } from "react";
import { BookOpen, Sparkles, ZoomIn } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

const HERO_SRC = "/hero/madrasah.jpg";
const HERO_ALT = "Suasana Madrasah Diniyah";

// Cara pakai: taruh foto di /public/hero/madrasah.jpg (foto gedung atau
// suasana belajar). Kalau file belum ada, otomatis kembali ke motif
// geometris seperti sekarang. Foto bisa diklik untuk melihat versi utuhnya
// (tidak terpotong) lewat pratinjau layar penuh.
function HeroPhoto() {
  const [broken, setBroken] = useState(false);
  const [preview, setPreview] = useState(false);

  if (broken) {
    return (
      <div className="w-full aspect-[4/3] bg-madin-navy flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-28 h-28 opacity-20" fill="none">
          <path
            d="M100 10 L118 82 L190 100 L118 118 L100 190 L82 118 L10 100 L82 82 Z"
            stroke="white"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setPreview(true)}
        className="relative w-full aspect-[4/3] block group cursor-zoom-in"
        aria-label="Perbesar foto"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_SRC}
          alt={HERO_ALT}
          onError={() => setBroken(true)}
          className="w-full h-full object-cover"
        />
        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </span>
      </button>

      {preview && (
        <ImageLightbox src={HERO_SRC} alt={HERO_ALT} onClose={() => setPreview(false)} />
      )}
    </>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative bg-madin-navy pt-32 pb-24 overflow-hidden">
      {/* Geometric motif watermark */}
      <svg
        className="absolute -top-24 -right-24 w-[440px] h-[440px] opacity-[0.08]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M100 0 L123 77 L200 100 L123 123 L100 200 L77 123 L0 100 L77 77 Z"
          stroke="white"
          strokeWidth="1"
        />
        <path
          d="M100 30 L116 84 L170 100 L116 116 L100 170 L84 116 L30 100 L84 84 Z"
          stroke="white"
          strokeWidth="1"
        />
        <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1" />
      </svg>

      <div className="relative max-w-6xl mx-auto px-5 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 text-madin-orange text-xs font-semibold tracking-wide uppercase bg-madin-orange/10 border border-madin-orange/25 rounded-full px-3 py-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Madrasah Diniyah Takmiliyah
          </span>

          <h1 className="font-display font-bold text-white text-[34px] leading-[1.2] sm:text-[44px] sm:leading-[1.15] mt-5">
            Menempa akhlak dan ilmu agama,
            <span className="text-madin-orange"> generasi demi generasi.</span>
          </h1>

          <p className="text-white/60 text-[15px] sm:text-base leading-relaxed mt-5 max-w-lg">
            Madrasah kami membimbing santri mempelajari Al-Qur&apos;an, fiqih, akhlak,
            dan bahasa Arab dengan suasana belajar yang hangat, tertib, dan
            berjenjang dari Awaliyah hingga Ulya.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="#tentang"
              className="inline-flex items-center gap-2 bg-madin-orange text-madin-navy font-display font-semibold text-sm px-5 py-3 rounded-lg hover:bg-madin-orangeDark hover:text-white transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Kenali Madrasah
            </a>
            <a
              href="#lokasi"
              className="inline-flex items-center gap-2 bg-white/5 text-white font-display font-semibold text-sm px-5 py-3 rounded-lg border border-white/15 hover:bg-white/10 transition-colors"
            >
              Kunjungi Kami
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-xl2 bg-madin-navySoft border border-white/10 overflow-hidden">
            <HeroPhoto />
            <div className="p-6 sm:p-8">
              <p className="font-display text-white/90 text-lg sm:text-xl leading-snug">
                &ldquo;Sebaik-baik kalian adalah yang mempelajari Al-Qur&apos;an dan
                mengajarkannya.&rdquo;
              </p>
              <p className="text-madin-orange text-xs font-semibold tracking-wide uppercase mt-4">
                HR. Bukhari
              </p>
              <div className="h-px bg-white/10 my-6" />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="font-display font-bold text-white text-2xl">3</p>
                  <p className="text-white/50 text-xs mt-1">Jenjang</p>
                </div>
                <div>
                  <p className="font-display font-bold text-white text-2xl">5</p>
                  <p className="text-white/50 text-xs mt-1">Mata Pelajaran</p>
                </div>
                <div>
                  <p className="font-display font-bold text-white text-2xl">6</p>
                  <p className="text-white/50 text-xs mt-1">Hari Belajar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
