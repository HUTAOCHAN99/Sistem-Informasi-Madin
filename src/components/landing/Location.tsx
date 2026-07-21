"use client";

import { useState } from "react";
import { MapPin, Phone, Clock3, ZoomIn } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

const INFO = [
  {
    icon: MapPin,
    label: "Alamat",
    value: "Kebondalem, RT.01/RW.04, Kebondalem, Sukorejo, Kec. Mojotengah, Kabupaten Wonosobo, Jawa Tengah 56351",
  },
  {
    icon: Clock3,
    label: "Jam Belajar",
    value: "Senin - Rabu dan Jumat - Minggu, pukul 18.00 - 20.00 WIB",
  },
  {
    icon: Phone,
    label: "Kontak",
    value: "0821-4368-294 (Sekretariat Madrasah)",
  },
];

const BUILDING_SRC_DEFAULT = "/lokasi/gedung.jpg";
const BUILDING_ALT = "Gedung Madrasah Diniyah";

// Foto gedung/lokasi bisa diganti admin lewat menu "Pengaturan Tampilan" di
// dashboard (disimpan di Supabase Storage). Kalau belum pernah diganti,
// otomatis pakai /public/lokasi/gedung.jpg. Kalau tidak ada foto sama
// sekali (baik kustom maupun file statis), kartu foto ini otomatis
// disembunyikan dan tata letak kembali seperti semula (info + peta saja).
// Foto bisa diklik untuk melihat versi utuhnya (tidak terpotong) lewat
// pratinjau layar penuh.
function BuildingPhoto({ src }: { src: string }) {
  const [broken, setBroken] = useState(false);
  const [preview, setPreview] = useState(false);

  if (broken) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setPreview(true)}
        className="relative w-full h-40 block group cursor-zoom-in rounded-xl2 overflow-hidden border border-madin-line"
        aria-label="Perbesar foto gedung"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={BUILDING_ALT}
          onError={() => setBroken(true)}
          className="w-full h-full object-cover"
        />
        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </span>
      </button>

      {preview && (
        <ImageLightbox src={src} alt={BUILDING_ALT} onClose={() => setPreview(false)} />
      )}
    </>
  );
}

export default function Location({
  locationImageUrl,
}: { locationImageUrl?: string | null } = {}) {
  const buildingSrc = locationImageUrl || BUILDING_SRC_DEFAULT;
  return (
    <section id="lokasi" className="bg-madin-cream py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <p className="text-madin-teal text-xs font-semibold tracking-wide uppercase">
          Lokasi
        </p>
        <h2 className="font-display font-bold text-madin-navy text-2xl sm:text-3xl mt-3 max-w-xl">
          Kunjungi madrasah kami
        </h2>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 mt-10">
          <div className="space-y-4">
            <BuildingPhoto src={buildingSrc} />
            {INFO.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl2 border border-madin-line p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-madin-teal/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-4.5 h-4.5 text-madin-teal" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-black/40 uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-madin-navy text-sm font-medium mt-1">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl2 border border-madin-line overflow-hidden min-h-[280px]">
            <iframe
              title="Lokasi Madrasah"
              className="w-full h-full min-h-[280px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
               src="https://www.google.com/maps?q=-7.323433209195681,109.89809775858323&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
