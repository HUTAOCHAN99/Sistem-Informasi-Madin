"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";
import { uploadSitePhoto, deleteSitePhoto } from "@/lib/supabase/storage";

// Kolom di tabel site_settings untuk tiap bagian landing page yang bisa
// diganti fotonya lewat dashboard.
const COLUMN = {
  hero: "hero_image_url",
  about: "about_image_url",
  lokasi: "location_image_url",
} as const;

export type SiteImageKey = keyof typeof COLUMN;

function revalidateSettingsPaths() {
  revalidatePath("/dashboard/pengaturan");
  revalidatePath("/");
}

async function getExistingUrl(key: SiteImageKey): Promise<string | null> {
  const column = COLUMN[key];
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("site_settings")
    .select(column)
    .eq("id", 1)
    .maybeSingle();
  if (error) throw new Error(`Gagal memuat pengaturan tampilan: ${error.message}`);
  const row = data as Record<string, string | null> | null;
  return row?.[column] ?? null;
}

/**
 * Ganti foto salah satu bagian landing page (Hero, Tentang, atau Lokasi).
 * Baris pengaturan (id = 1) dibuat otomatis kalau belum ada (upsert), foto
 * lama dihapus dari storage setelah foto baru tersimpan.
 */
export async function updateSiteImage(key: SiteImageKey, formData: FormData) {
  const foto = formData.get("foto");
  if (!(foto instanceof File) || foto.size === 0) {
    throw new Error("Pilih file foto terlebih dahulu.");
  }

  const column = COLUMN[key];
  const oldUrl = await getExistingUrl(key);
  const newUrl = await uploadSitePhoto(foto);

  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, [column]: newUrl }, { onConflict: "id" });
  if (error) throw new Error(`Gagal memperbarui foto: ${error.message}`);

  await deleteSitePhoto(oldUrl);

  revalidateSettingsPaths();
}

/**
 * Kembalikan bagian tertentu ke foto statis bawaan (hapus foto kustom dari
 * storage & kosongkan kolomnya).
 */
export async function resetSiteImage(key: SiteImageKey) {
  const column = COLUMN[key];
  const oldUrl = await getExistingUrl(key);

  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, [column]: null }, { onConflict: "id" });
  if (error) throw new Error(`Gagal menghapus foto: ${error.message}`);

  await deleteSitePhoto(oldUrl);

  revalidateSettingsPaths();
}
