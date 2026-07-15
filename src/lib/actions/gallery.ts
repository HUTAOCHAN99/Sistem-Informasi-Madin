"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";
import { uploadGalleryPhoto, deleteGalleryPhoto } from "@/lib/supabase/storage";

function revalidateGalleryPaths() {
  revalidatePath("/dashboard/galeri");
  revalidatePath("/");
}

/**
 * Tambah foto galeri baru. Foto wajib diisi (beda dengan foto guru/santri
 * yang opsional) karena tanpa foto, tile galeri tidak ada gunanya.
 */
export async function createGalleryItem(formData: FormData) {
  const caption = String(formData.get("caption") ?? "").trim();
  const urutanRaw = String(formData.get("urutan") ?? "").trim();
  const urutan = urutanRaw ? Number(urutanRaw) : 0;
  const foto = formData.get("foto");

  if (!(foto instanceof File) || foto.size === 0) {
    throw new Error("Foto wajib diunggah.");
  }

  const foto_url = await uploadGalleryPhoto(foto);

  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("gallery")
    .insert({ caption, foto_url, urutan: Number.isFinite(urutan) ? urutan : 0 });
  if (error) throw new Error(`Gagal menambah foto galeri: ${error.message}`);

  revalidateGalleryPaths();
}

/**
 * Perbarui caption/urutan foto galeri. Kalau file foto baru disertakan,
 * foto lama diganti dan dihapus dari storage; kalau tidak, foto lama tetap
 * dipakai.
 */
export async function updateGalleryItem(id: string, formData: FormData) {
  const caption = String(formData.get("caption") ?? "").trim();
  const urutanRaw = String(formData.get("urutan") ?? "").trim();
  const urutan = urutanRaw ? Number(urutanRaw) : 0;
  const foto = formData.get("foto");

  const supabase = getSupabaseServer();

  const updates: Record<string, unknown> = {
    caption,
    urutan: Number.isFinite(urutan) ? urutan : 0,
  };

  let oldFotoUrl: string | null | undefined;
  if (foto instanceof File && foto.size > 0) {
    const { data: existing, error: fetchError } = await supabase
      .from("gallery")
      .select("foto_url")
      .eq("id", id)
      .maybeSingle();
    if (fetchError) throw new Error(`Gagal memuat data galeri: ${fetchError.message}`);

    oldFotoUrl = existing?.foto_url as string | null | undefined;
    updates.foto_url = await uploadGalleryPhoto(foto);
  }

  const { error } = await supabase.from("gallery").update(updates).eq("id", id);
  if (error) throw new Error(`Gagal memperbarui foto galeri: ${error.message}`);

  if (oldFotoUrl) {
    await deleteGalleryPhoto(oldFotoUrl);
  }

  revalidateGalleryPaths();
}

export async function deleteGalleryItem(id: string) {
  const supabase = getSupabaseServer();

  const { data: existing } = await supabase
    .from("gallery")
    .select("foto_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus foto galeri: ${error.message}`);

  await deleteGalleryPhoto(existing?.foto_url as string | null | undefined);

  revalidateGalleryPaths();
}
