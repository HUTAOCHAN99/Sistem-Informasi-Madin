import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { Announcement } from "@/lib/types";

export async function getAnnouncements(): Promise<Announcement[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("announcements")
    .select("id, judul, isi, tanggal")
    .order("tanggal", { ascending: false });

  if (error) throw new Error(`Gagal memuat pengumuman: ${error.message}`);
  return (data ?? []) as Announcement[];
}
