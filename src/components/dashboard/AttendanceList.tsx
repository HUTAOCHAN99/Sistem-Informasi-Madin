"use client";

import { useState, useTransition } from "react";
import { saveAttendance } from "@/lib/actions/attendance";
import type { AttendanceRow, AttendanceStatus } from "@/lib/types";

const STATUS_OPTIONS: AttendanceStatus[] = ["Hadir", "Izin", "Sakit", "Alpha"];

const statusColor: Record<AttendanceStatus, string> = {
  Hadir: "bg-madin-teal/10 text-madin-teal border-madin-teal/30",
  Izin: "bg-blue-50 text-blue-600 border-blue-200",
  Sakit: "bg-amber-50 text-amber-600 border-amber-200",
  Alpha: "bg-red-50 text-red-600 border-red-200",
};

export default function AttendanceList({
  tanggal,
  initialRows,
}: {
  tanggal: string;
  initialRows: AttendanceRow[];
}) {
  const [rows, setRows] = useState(initialRows);
  const [isPending, startTransition] = useTransition();
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function setStatus(siswa_id: string, status: AttendanceStatus) {
    setRows((prev) => prev.map((r) => (r.siswa_id === siswa_id ? { ...r, status } : r)));
  }

  function handleSave() {
    setSavedMessage(null);
    setErrorMessage(null);
    startTransition(async () => {
      try {
        await saveAttendance(
          tanggal,
          rows.map((r) => ({ siswa_id: r.siswa_id, status: r.status }))
        );
        setSavedMessage("Absensi tersimpan.");
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : "Gagal menyimpan absensi.");
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl2 border border-madin-line divide-y divide-madin-line">
        {rows.map((row) => (
          <div key={row.siswa_id} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium text-madin-navy">{row.siswa}</p>
              <p className="text-xs text-black/40">{row.kelas}</p>
            </div>
            <div className="flex gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setStatus(row.siswa_id, opt)}
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
        {rows.length === 0 && (
          <p className="px-5 py-8 text-center text-black/40 text-sm">Belum ada data santri.</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={isPending || rows.length === 0}
          className="bg-madin-orange text-madin-navy text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-madin-orangeDark hover:text-white transition-colors disabled:opacity-50"
        >
          {isPending ? "Menyimpan..." : "Simpan Absensi"}
        </button>
        {savedMessage && <p className="text-sm text-madin-teal">{savedMessage}</p>}
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      </div>
    </div>
  );
}
