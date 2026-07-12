import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { Student, SelectOption } from "@/lib/types";

type StudentRowFromDb = {
  id: string;
  nama: string;
  nis: string;
  jenis_kelamin: "L" | "P";
  kelas_id: string | null;
  orang_tua: string;
  hp: string;
  classes: { nama_kelas: string; jenjang: string } | null;
};

export async function getStudents(): Promise<Student[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("students")
    .select("id, nama, nis, jenis_kelamin, kelas_id, orang_tua, hp, classes ( nama_kelas, jenjang )")
    .order("nama", { ascending: true });

  if (error) throw new Error(`Gagal memuat data santri: ${error.message}`);

  return ((data ?? []) as unknown as StudentRowFromDb[]).map((s) => ({
    id: s.id,
    nama: s.nama,
    nis: s.nis,
    jenis_kelamin: s.jenis_kelamin,
    kelas_id: s.kelas_id,
    kelas: s.classes ? `${s.classes.nama_kelas} (${s.classes.jenjang})` : "-",
    orang_tua: s.orang_tua,
    hp: s.hp,
  }));
}

export async function getStudentOptions(): Promise<SelectOption[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("students")
    .select("id, nama")
    .order("nama", { ascending: true });

  if (error) throw new Error(`Gagal memuat pilihan santri: ${error.message}`);
  return (data ?? []).map((s) => ({ id: s.id, label: s.nama }));
}
