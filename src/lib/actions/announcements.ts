"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function createAnnouncement(formData: FormData) {
  const judul = String(formData.get("judul") ?? "").trim();
  const isi = String(formData.get("isi") ?? "").trim();
  const tanggalRaw = String(formData.get("tanggal") ?? "").trim();
  const tanggal = tanggalRaw || new Date().toISOString().slice(0, 10);

  if (!judul) throw new Error("Judul pengumuman wajib diisi.");

  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("announcements")
    .insert({ judul, isi, tanggal });
  if (error) throw new Error(`Gagal membuat pengumuman: ${error.message}`);

  revalidatePath("/dashboard/pengumuman");
  revalidatePath("/dashboard");
}

export async function deleteAnnouncement(id: string) {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus pengumuman: ${error.message}`);

  revalidatePath("/dashboard/pengumuman");
  revalidatePath("/dashboard");
}
