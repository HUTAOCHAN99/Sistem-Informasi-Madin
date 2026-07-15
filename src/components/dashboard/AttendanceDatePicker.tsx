"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function AttendanceDatePicker({ tanggal }: { tanggal: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tanggal", value);
    router.push(`/dashboard/absensi?${params.toString()}`);
  }

  return (
    <input
      type="date"
      defaultValue={tanggal}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-lg border border-madin-line px-3 py-1.5 text-sm text-madin-navy focus:outline-none focus:ring-2 focus:ring-madin-teal/40"
    />
  );
}
