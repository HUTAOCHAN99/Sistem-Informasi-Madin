"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { NAMA_BULAN } from "@/lib/utils/format";

export default function SppPeriodPicker({ bulan, tahun }: { bulan: number; tahun: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function go(nextBulan: number, nextTahun: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("bulan", String(nextBulan));
    params.set("tahun", String(nextTahun));
    router.push(`/dashboard/spp?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={bulan}
        onChange={(e) => go(Number(e.target.value), tahun)}
        className="rounded-lg border border-madin-line px-3 py-1.5 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40"
      >
        {NAMA_BULAN.map((nama, i) => (
          <option key={nama} value={i + 1}>
            {nama}
          </option>
        ))}
      </select>
      <select
        value={tahun}
        onChange={(e) => go(bulan, Number(e.target.value))}
        className="rounded-lg border border-madin-line px-3 py-1.5 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40"
      >
        {Array.from({ length: 6 }, (_, i) => tahun - 2 + i).map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
