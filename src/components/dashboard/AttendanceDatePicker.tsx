"use client";

import { useRouter } from "next/navigation";

export default function AttendanceDatePicker({ tanggal }: { tanggal: string }) {
  const router = useRouter();

  return (
    <input
      type="date"
      defaultValue={tanggal}
      onChange={(e) => router.push(`/dashboard/absensi?tanggal=${e.target.value}`)}
      className="rounded-lg border border-madin-line px-3 py-1.5 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40"
    />
  );
}
