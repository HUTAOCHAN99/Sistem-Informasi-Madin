import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { DashboardStats } from "@/lib/types";
import { namaHariIni } from "@/lib/data/schedule";

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = getSupabaseServer();

  const [teachers, students, classes, announcements, jadwalHariIni] = await Promise.all([
    supabase.from("teachers").select("id", { count: "exact", head: true }),
    supabase.from("students").select("id", { count: "exact", head: true }),
    supabase.from("classes").select("id", { count: "exact", head: true }),
    supabase.from("announcements").select("id", { count: "exact", head: true }),
    supabase
      .from("schedule")
      .select("id", { count: "exact", head: true })
      .eq("hari", namaHariIni()),
  ]);

  const firstError = [teachers, students, classes, announcements, jadwalHariIni].find(
    (r) => r.error
  )?.error;
  if (firstError) throw new Error(`Gagal memuat statistik dashboard: ${firstError.message}`);

  return {
    totalGuru: teachers.count ?? 0,
    totalSantri: students.count ?? 0,
    totalKelas: classes.count ?? 0,
    pengumumanAktif: announcements.count ?? 0,
    jadwalHariIni: jadwalHariIni.count ?? 0,
  };
}
