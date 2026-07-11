import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { StudentClass, SelectOption } from "@/lib/types";

type ClassRowFromDb = {
  id: string;
  nama_kelas: string;
  jenjang: StudentClass["jenjang"];
  wali_kelas_id: string | null;
  teachers: { nama: string } | null;
};

export async function getClasses(): Promise<StudentClass[]> {
  const supabase = getSupabaseServer();

  const [{ data: classRows, error: classError }, { data: countRows, error: countError }] =
    await Promise.all([
      supabase
        .from("classes")
        .select("id, nama_kelas, jenjang, wali_kelas_id, teachers ( nama )")
        .order("nama_kelas", { ascending: true }),
      supabase.from("class_student_counts").select("kelas_id, jumlah_santri"),
    ]);

  if (classError) throw new Error(`Gagal memuat data kelas: ${classError.message}`);
  if (countError) throw new Error(`Gagal memuat jumlah santri: ${countError.message}`);

  const countMap = new Map<string, number>(
    (countRows ?? []).map((r: any) => [r.kelas_id as string, Number(r.jumlah_santri)])
  );

  return ((classRows ?? []) as unknown as ClassRowFromDb[]).map((c) => ({
    id: c.id,
    nama_kelas: c.nama_kelas,
    jenjang: c.jenjang,
    wali_kelas_id: c.wali_kelas_id,
    wali_kelas: c.teachers?.nama ?? "-",
    jumlah_santri: countMap.get(c.id) ?? 0,
  }));
}

export async function getClassOptions(): Promise<SelectOption[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("classes")
    .select("id, nama_kelas")
    .order("nama_kelas", { ascending: true });

  if (error) throw new Error(`Gagal memuat pilihan kelas: ${error.message}`);
  return (data ?? []).map((c) => ({ id: c.id, label: c.nama_kelas }));
}
