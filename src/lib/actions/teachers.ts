"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";
import { uploadTeacherPhoto, deleteTeacherPhoto } from "@/lib/supabase/storage";

function revalidateTeacherPaths() {
  revalidatePath("/dashboard/guru");
  revalidatePath("/dashboard/kelas");
  revalidatePath("/dashboard/jadwal");
  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function createTeacher(formData: FormData) {
  const nama = String(formData.get("nama") ?? "").trim();
  const mapel = String(formData.get("mapel") ?? "").trim();
  const hp = String(formData.get("hp") ?? "").trim();
  const foto = formData.get("foto");

  if (!nama) throw new Error("Nama guru wajib diisi.");

  // Foto opsional. Kalau tidak ada file yang dipilih, browser tetap
  // mengirim field "foto" sebagai File kosong (size 0) — jadi dicek juga.
  let foto_url: string | null = null;
  if (foto instanceof File && foto.size > 0) {
    foto_url = await uploadTeacherPhoto(foto);
  }

  const supabase = getSupabaseServer();
  const { error } = await supabase.from("teachers").insert({ nama, mapel, hp, foto_url });
  if (error) throw new Error(`Gagal menambah guru: ${error.message}`);

  revalidateTeacherPaths();
}

/**
 * Ganti foto guru yang sudah ada (dipakai tombol "Ubah foto" di tabel Data
 * Guru). Foto lama otomatis dihapus dari storage setelah foto baru
 * tersimpan, supaya tidak menumpuk file yatim di bucket.
 */
export async function updateTeacherPhoto(id: string, formData: FormData) {
  const foto = formData.get("foto");
  if (!(foto instanceof File) || foto.size === 0) {
    throw new Error("Pilih file foto terlebih dahulu.");
  }

  const supabase = getSupabaseServer();
  const { data: existing, error: fetchError } = await supabase
    .from("teachers")
    .select("foto_url")
    .eq("id", id)
    .maybeSingle();
  if (fetchError) throw new Error(`Gagal memuat data guru: ${fetchError.message}`);

  const foto_url = await uploadTeacherPhoto(foto);

  const { error } = await supabase.from("teachers").update({ foto_url }).eq("id", id);
  if (error) throw new Error(`Gagal memperbarui foto guru: ${error.message}`);

  await deleteTeacherPhoto(existing?.foto_url as string | null | undefined);

  revalidateTeacherPaths();
}

/**
 * Perbarui data teks guru (nama, mapel, hp). Foto guru punya alur sendiri
 * lewat updateTeacherPhoto di atas, jadi tidak disentuh di sini.
 */
export async function updateTeacher(id: string, formData: FormData) {
  const nama = String(formData.get("nama") ?? "").trim();
  const mapel = String(formData.get("mapel") ?? "").trim();
  const hp = String(formData.get("hp") ?? "").trim();

  if (!nama) throw new Error("Nama guru wajib diisi.");

  const supabase = getSupabaseServer();
  const { error } = await supabase.from("teachers").update({ nama, mapel, hp }).eq("id", id);
  if (error) throw new Error(`Gagal memperbarui guru: ${error.message}`);

  revalidateTeacherPaths();
}

export async function deleteTeacher(id: string) {
  const supabase = getSupabaseServer();

  const { data: existing } = await supabase
    .from("teachers")
    .select("foto_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("teachers").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus guru: ${error.message}`);

  await deleteTeacherPhoto(existing?.foto_url as string | null | undefined);

  revalidateTeacherPaths();
}
