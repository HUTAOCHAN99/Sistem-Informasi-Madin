"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { AttendanceStatus } from "@/lib/types";

/**
 * Simpan absensi satu tanggal sekaligus. Dipakai oleh halaman Absensi:
 * tiap baris (siswa_id, status) di-upsert dengan constraint unique
 * (siswa_id, tanggal), jadi aman dipanggil berkali-kali di hari yang sama
 * (edit ulang) tanpa membuat duplikat.
 */
export async function saveAttendance(
  tanggal: string,
  rows: { siswa_id: string; status: AttendanceStatus }[]
) {
  if (!tanggal) throw new Error("Tanggal wajib diisi.");
  if (rows.length === 0) return;

  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("attendance")
    .upsert(
      rows.map((r) => ({ siswa_id: r.siswa_id, tanggal, status: r.status })),
      { onConflict: "siswa_id,tanggal" }
    );

  if (error) throw new Error(`Gagal menyimpan absensi: ${error.message}`);

  revalidatePath("/dashboard/absensi");
  revalidatePath("/dashboard");
}
