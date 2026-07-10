"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import { attendance as initialAttendance, AttendanceStatus } from "@/lib/dummy-data";

const STATUS_OPTIONS: AttendanceStatus[] = ["Hadir", "Izin", "Sakit", "Alpha"];

const statusColor: Record<AttendanceStatus, string> = {
  Hadir: "bg-madin-teal/10 text-madin-teal border-madin-teal/30",
  Izin: "bg-blue-50 text-blue-600 border-blue-200",
  Sakit: "bg-amber-50 text-amber-600 border-amber-200",
  Alpha: "bg-red-50 text-red-600 border-red-200",
};

export default function AbsensiPage() {
  // Sementara disimpan di state lokal saja (belum ditulis ke Supabase).
  const [rows, setRows] = useState(initialAttendance);

  function setStatus(id: string, status: AttendanceStatus) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return (
    <>
      <Topbar title="Absensi" />
      <div className="p-6 space-y-4">
        <p className="text-sm text-black/50">
          Absensi tanggal {rows[0]?.tanggal ?? "-"} — pilih status lalu nanti tombol simpan akan menulis ke Supabase.
        </p>
        <div className="bg-white rounded-xl2 border border-madin-line divide-y divide-madin-line">
          {rows.map((row) => (
            <div key={row.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-madin-navy">{row.siswa}</p>
                <p className="text-xs text-black/40">{row.kelas}</p>
              </div>
              <div className="flex gap-2">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setStatus(row.id, opt)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      row.status === opt
                        ? statusColor[opt]
                        : "bg-white text-black/40 border-madin-line hover:bg-madin-cream"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="bg-madin-orange text-madin-navy text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-madin-orangeDark hover:text-white transition-colors">
          Simpan Absensi
        </button>
      </div>
    </>
  );
}
