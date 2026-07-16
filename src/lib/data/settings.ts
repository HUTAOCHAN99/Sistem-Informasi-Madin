import "server-only";
import { getSupabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";
import type { SiteSettings } from "@/lib/types";

const DEFAULT_SETTINGS: SiteSettings = {
  hero_image_url: null,
  about_image_url: null,
  location_image_url: null,
};

/**
 * Ambil pengaturan tampilan (foto Hero/Tentang/Lokasi). Selalu ada tepat
 * satu baris (id = 1) di tabel site_settings — kalau baris belum ada (mis.
 * migrasi baru dijalankan) atau Supabase belum dikonfigurasi, kembalikan
 * default (semua null) supaya komponen landing otomatis pakai foto statis
 * bawaan di /public.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) return DEFAULT_SETTINGS;

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("site_settings")
    .select("hero_image_url, about_image_url, location_image_url")
    .eq("id", 1)
    .maybeSingle();

  if (error) throw new Error(`Gagal memuat pengaturan tampilan: ${error.message}`);

  return {
    hero_image_url: data?.hero_image_url ?? null,
    about_image_url: data?.about_image_url ?? null,
    location_image_url: data?.location_image_url ?? null,
  };
}
