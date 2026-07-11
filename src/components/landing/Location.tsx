"use client";

import { useState } from "react";
import { MapPin, Phone, Clock3 } from "lucide-react";

const INFO = [
  {
    icon: MapPin,
    label: "Alamat",
    value: "Jl. Pendidikan Raya No. 12, Ungaran, Kabupaten Semarang, Jawa Tengah",
  },
  {
    icon: Clock3,
    label: "Jam Belajar",
    value: "Senin - Kamis, pukul 16.00 - 17.45 WIB",
  },
  {
    icon: Phone,
    label: "Kontak",
    value: "0812-0000-0000 (Sekretariat Madrasah)",
  },
];

// Cara pakai: taruh foto gedung/gerbang di /public/lokasi/gedung.jpg.
// Kalau file belum ada, kartu foto ini otomatis disembunyikan dan
// tata letak kembali seperti semula (info + peta saja).
function BuildingPhoto() {
  const [broken, setBroken] = useState(false);

  if (broken) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/lokasi/gedung.jpg"
      alt="Gedung Madrasah Diniyah"
      onError={() => setBroken(true)}
      className="w-full h-40 object-cover rounded-xl2 border border-madin-line"
    />
  );
}

export default function Location() {
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
            <BuildingPhoto />
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
              src="https://www.google.com/maps?q=Ungaran,Kabupaten+Semarang,Jawa+Tengah&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
