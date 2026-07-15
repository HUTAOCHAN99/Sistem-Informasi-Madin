"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/**
 * Preview foto ukuran penuh (lightbox).
 *
 * Kenapa perlu komponen ini: sebelumnya foto di landing page (hero, tentang,
 * galeri, guru, lokasi) selalu dipotong (object-cover) supaya pas ke bentuk
 * kartu/thumbnail. Kalau ingin lihat foto utuh, tidak ada cara selain
 * mengubah ukuran kartunya sendiri — yang malah merusak layout.
 *
 * Komponen ini membuka foto asli (object-contain, tidak dipotong) di atas
 * seluruh layar dengan `position: fixed`.
 *
 * PENTING — kenapa dirender lewat createPortal ke document.body:
 * Tiap section landing page dibungkus <FadeInSection> yang animasinya pakai
 * class Tailwind `translate-y-*` (CSS transform) untuk efek fade-in saat
 * discroll. Elemen apa pun yang punya `transform` di CSS otomatis membuat
 * "containing block" baru untuk semua descendant `position: fixed` di
 * dalamnya — artinya kalau lightbox ini dirender di dalam section tsb,
 * "fixed" itu jadi relatif ke section itu sendiri (bukan ke layar), dan hasil
 * akhirnya foto malah kepotong navbar/tepi layar, persis seperti sebelum
 * diperbaiki. Dengan createPortal, lightbox dipindah keluar dari struktur DOM
 * manapun (termasuk section yang ber-animasi) langsung ke document.body,
 * sehingga `fixed inset-0` selalu benar-benar relatif ke viewport dan
 * z-index-nya (z-[100]) selalu di atas Navbar (z-50), berapa pun posisi
 * scroll saat itu.
 */
export default function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  // document.body cuma tersedia di client, jadi portal baru dipasang setelah
  // komponen mount (menghindari mismatch saat server-side render).
  useEffect(() => {
    setMounted(true);
  }, []);

  // Kunci scroll body & bisa ditutup pakai tombol Escape selama preview terbuka.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="madin-lightbox fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        onClick={onClose}
        aria-label="Tutup pratinjau"
        title="Tutup"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl select-none"
      />
    </div>,
    document.body
  );
}
