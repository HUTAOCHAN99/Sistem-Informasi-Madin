"use client";

import { useState } from "react";
import PreviewableImage from "@/components/ui/PreviewableImage";
import type { Teacher } from "@/lib/types";

function initials(name: string) {
  const parts = name.replace(/^(Ust\.|Usth\.)\s*/i, "").split(" ");
  return parts
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

// Foto guru diambil dari kolom foto_url (diisi lewat upload di halaman
// /dashboard/guru). Kalau guru belum punya foto, sebagai fallback dicoba
// dulu file statis di /public/guru/{id}.jpg (cara lama), dan kalau itu pun
// tidak ada, otomatis kembali ke inisial nama.
function TeacherAvatar({ id, nama, fotoUrl }: { id: string; nama: string; fotoUrl: string | null }) {
  const [broken, setBroken] = useState(false);
  const src = fotoUrl || `/guru/${id}.jpg`;

  if (broken) {
    return (
      <div className="w-14 h-14 rounded-full bg-madin-teal/10 text-madin-teal font-display font-semibold flex items-center justify-center mx-auto">
        {initials(nama)}
      </div>
    );
  }

  return (
    <PreviewableImage
      src={src}
      alt={nama}
      onError={() => setBroken(true)}
      className="w-14 h-14 rounded-full object-cover mx-auto"
      previewClassName="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
    />
  );
}

export default function Teachers({ teachers }: { teachers: Teacher[] }) {
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
              <TeacherAvatar id={t.id} nama={t.nama} fotoUrl={t.foto_url} />
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
