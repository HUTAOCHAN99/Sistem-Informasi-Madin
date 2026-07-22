import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { DashboardStats, HeroStats } from "@/lib/types";
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

/**
 * Statistik untuk kartu di section Hero (landing page). Dihitung dari data
 * asli di database, bukan angka hardcode:
 * - jumlahJenjang: jenjang unik (Awaliyah/Wustha/Ulya) yang punya kelas.
 * - jumlahMapel: mata pelajaran unik yang sudah diinput di jadwal.
 * - jumlahHariBelajar: hari unik dalam seminggu yang punya jadwal.
 */
export async function getHeroStats(): Promise<HeroStats> {
  const supabase = getSupabaseServer();

  const [classesRes, scheduleRes] = await Promise.all([
    supabase.from("classes").select("jenjang"),
    supabase.from("schedule").select("mapel, hari"),
  ]);

  if (classesRes.error) {
    throw new Error(`Gagal memuat statistik hero: ${classesRes.error.message}`);
  }
  if (scheduleRes.error) {
    throw new Error(`Gagal memuat statistik hero: ${scheduleRes.error.message}`);
  }

  const jenjangUnik = new Set((classesRes.data ?? []).map((c) => c.jenjang));
  const mapelUnik = new Set(
    (scheduleRes.data ?? [])
      .map((s) => s.mapel?.trim())
      .filter((m): m is string => Boolean(m))
  );
  const hariUnik = new Set((scheduleRes.data ?? []).map((s) => s.hari));

  return {
    jumlahJenjang: jenjangUnik.size,
    jumlahMapel: mapelUnik.size,
    jumlahHariBelajar: hariUnik.size,
  };
}
