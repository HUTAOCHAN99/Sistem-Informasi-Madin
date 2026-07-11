import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { AttendanceRow, AttendanceStatus } from "@/lib/types";

type AttendanceRowFromDb = {
  id: string;
  siswa_id: string;
  tanggal: string;
  status: AttendanceStatus;
  students: { nama: string; classes: { nama_kelas: string } | null } | null;
};

/**
 * Absensi untuk satu tanggal tertentu. Kalau belum ada baris absensi untuk
 * seorang santri di tanggal itu, dia tetap dimunculkan dengan status
 * default "Hadir" (belum tersimpan) supaya wali kelas tinggal koreksi,
 * bukan input dari nol tiap hari.
 */
export async function getAttendanceByDate(tanggal: string): Promise<AttendanceRow[]> {
  const supabase = getSupabaseServer();

  const [{ data: students, error: studentsError }, { data: existing, error: attendanceError }] =
    await Promise.all([
      supabase
        .from("students")
        .select("id, nama, classes ( nama_kelas )")
        .order("nama", { ascending: true }),
      supabase
        .from("attendance")
        .select("id, siswa_id, tanggal, status, students ( nama, classes ( nama_kelas ) )")
        .eq("tanggal", tanggal),
    ]);

  if (studentsError) throw new Error(`Gagal memuat data santri: ${studentsError.message}`);
  if (attendanceError) throw new Error(`Gagal memuat absensi: ${attendanceError.message}`);

  const existingMap = new Map<string, AttendanceRowFromDb>(
    ((existing ?? []) as unknown as AttendanceRowFromDb[]).map((a) => [a.siswa_id, a])
  );

  return (students ?? []).map((s: any) => {
    const found = existingMap.get(s.id);
    return {
      id: found?.id ?? `new:${s.id}`,
      siswa_id: s.id,
      siswa: s.nama,
      kelas: s.classes?.nama_kelas ?? "-",
      tanggal,
      status: found?.status ?? "Hadir",
    } satisfies AttendanceRow;
  });
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
