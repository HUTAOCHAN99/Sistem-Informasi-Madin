"use client";

import { FileSpreadsheet } from "lucide-react";

export default function CetakSppButton({
  bulan,
  tahun,
  q,
}: {
  bulan: number;
  tahun: number;
  q?: string;
}) {
  const params = new URLSearchParams({ bulan: String(bulan), tahun: String(tahun) });
  if (q?.trim()) params.set("q", q.trim());

  return (
    <a
      href={`/api/export/spp?${params.toString()}`}
      // Bukan Server Action / fetch, sengaja pakai <a download> biasa
      // supaya browser yang menangani unduhan file (lewat header
      // Content-Disposition dari route API), tidak perlu JS tambahan.
      className="flex items-center gap-2 bg-madin-teal text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-madin-teal/90 transition-colors"
    >
      <FileSpreadsheet className="w-4 h-4" />
      Cetak Excel
    </a>
  );
}
