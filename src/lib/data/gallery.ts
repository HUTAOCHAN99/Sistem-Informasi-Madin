import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { GalleryItem } from "@/lib/types";

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("gallery")
    .select("id, caption, foto_url, urutan")
    .order("urutan", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Gagal memuat galeri: ${error.message}`);
  return (data ?? []) as GalleryItem[];
}
