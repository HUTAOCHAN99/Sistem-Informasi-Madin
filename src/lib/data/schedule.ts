import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { ScheduleItem, Hari } from "@/lib/types";

type ScheduleRowFromDb = {
  id: string;
  hari: Hari;
  jam: string;
  mapel: string;
  guru_id: string | null;
  kelas_id: string | null;
  teachers: { nama: string } | null;
  classes: { nama_kelas: string } | null;
};

const HARI_ORDER: Hari[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export async function getSchedule(): Promise<ScheduleItem[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("schedule")
    .select("id, hari, jam, mapel, guru_id, kelas_id, teachers ( nama ), classes ( nama_kelas )")
    .order("jam", { ascending: true });

  if (error) throw new Error(`Gagal memuat jadwal: ${error.message}`);

  const rows = ((data ?? []) as unknown as ScheduleRowFromDb[]).map((s) => ({
    id: s.id,
    hari: s.hari,
    jam: s.jam,
    mapel: s.mapel,
    guru_id: s.guru_id,
    guru: s.teachers?.nama ?? "-",
    kelas_id: s.kelas_id,
    kelas: s.classes?.nama_kelas ?? "-",
  }));

  return rows.sort((a, b) => HARI_ORDER.indexOf(a.hari) - HARI_ORDER.indexOf(b.hari));
}

/** Nama hari ini dalam Bahasa Indonesia, dipakai untuk kartu "Jadwal Hari Ini". */
export function namaHariIni(): Hari {
  const idx = new Date().getDay(); // 0 = Minggu ... 6 = Sabtu
  const map: Hari[] = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return map[idx];
}
