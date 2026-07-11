"use client";

import { useState } from "react";
import { teachers } from "@/lib/dummy-data";

function initials(name: string) {
  const parts = name.replace(/^(Ust\.|Usth\.)\s*/i, "").split(" ");
  return parts
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

// Cara pakai: taruh foto tiap guru di /public/guru/ dengan nama sesuai id:
// 1.jpg = Ust. Ahmad Fauzi, 2.jpg = Ust. Ali Rahman, 3.jpg = Usth. Siti Aminah,
// 4.jpg = Ust. Zainal Abidin, 5.jpg = Usth. Nur Hidayah.
// Kalau file belum ada, otomatis kembali ke inisial nama seperti sekarang.
function TeacherAvatar({ id, nama }: { id: string; nama: string }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div className="w-14 h-14 rounded-full bg-madin-teal/10 text-madin-teal font-display font-semibold flex items-center justify-center mx-auto">
        {initials(nama)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/guru/${id}.jpg`}
      alt={nama}
      onError={() => setBroken(true)}
      className="w-14 h-14 rounded-full object-cover mx-auto"
    />
  );
}

export default function Teachers() {
  return (
    <section id="guru" className="bg-white py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <p className="text-madin-teal text-xs font-semibold tracking-wide uppercase">
          Tenaga Pengajar
        </p>
        <h2 className="font-display font-bold text-madin-navy text-2xl sm:text-3xl mt-3 max-w-xl">
          Diampu oleh ustadz dan ustadzah berpengalaman
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-12">
          {teachers.map((t) => (
            <div
              key={t.id}
              className="rounded-xl2 border border-madin-line p-6 text-center"
            >
              <TeacherAvatar id={t.id} nama={t.nama} />
              <h3 className="font-display font-semibold text-madin-navy text-sm mt-4">
                {t.nama}
              </h3>
              <p className="text-madin-orange text-xs font-medium mt-1">
                {t.mapel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
