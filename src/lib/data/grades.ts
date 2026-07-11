import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { GradeRow } from "@/lib/types";

type GradeRowFromDb = {
  id: string;
  siswa_id: string;
  mapel: string;
  harian: number;
  uts: number;
  uas: number;
  students: { nama: string } | null;
};

export async function getGrades(): Promise<GradeRow[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("grades")
    .select("id, siswa_id, mapel, harian, uts, uas, students ( nama )")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Gagal memuat nilai: ${error.message}`);

  return ((data ?? []) as unknown as GradeRowFromDb[]).map((g) => ({
    id: g.id,
    siswa_id: g.siswa_id,
    siswa: g.students?.nama ?? "-",
    mapel: g.mapel,
    harian: Number(g.harian),
    uts: Number(g.uts),
    uas: Number(g.uas),
  }));
}
