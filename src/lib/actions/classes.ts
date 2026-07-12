"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function createClass(formData: FormData) {
  const nama_kelas = String(formData.get("nama_kelas") ?? "").trim();
  const jenjang = String(formData.get("jenjang") ?? "").trim();
  const wali_kelas_id = String(formData.get("wali_kelas_id") ?? "").trim() || null;

  if (!nama_kelas) throw new Error("Nama kelas wajib diisi.");
  if (!["Awaliyah", "Wustha", "Ulya"].includes(jenjang)) {
    throw new Error("Jenjang tidak valid.");
  }

  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("classes")
    .insert({ nama_kelas, jenjang, wali_kelas_id });
  if (error) throw new Error(`Gagal menambah kelas: ${error.message}`);

  revalidatePath("/dashboard/kelas");
  revalidatePath("/dashboard/santri");
  revalidatePath("/dashboard/jadwal");
  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function updateClass(id: string, formData: FormData) {
  const nama_kelas = String(formData.get("nama_kelas") ?? "").trim();
  const jenjang = String(formData.get("jenjang") ?? "").trim();
  const wali_kelas_id = String(formData.get("wali_kelas_id") ?? "").trim() || null;

  if (!nama_kelas) throw new Error("Nama kelas wajib diisi.");
  if (!["Awaliyah", "Wustha", "Ulya"].includes(jenjang)) {
    throw new Error("Jenjang tidak valid.");
  }

  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("classes")
    .update({ nama_kelas, jenjang, wali_kelas_id })
    .eq("id", id);
  if (error) throw new Error(`Gagal memperbarui kelas: ${error.message}`);

  revalidatePath("/dashboard/kelas");
  revalidatePath("/dashboard/santri");
  revalidatePath("/dashboard/jadwal");
  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function deleteClass(id: string) {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("classes").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus kelas: ${error.message}`);

  revalidatePath("/dashboard/kelas");
  revalidatePath("/dashboard/santri");
  revalidatePath("/dashboard/jadwal");
  revalidatePath("/dashboard");
  revalidatePath("/");
}
