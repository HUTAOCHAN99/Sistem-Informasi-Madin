"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";
import { uploadStudentPhoto, deleteStudentPhoto } from "@/lib/supabase/storage";

function revalidateStudentPaths() {
  revalidatePath("/dashboard/santri");
  revalidatePath("/dashboard/kelas");
  revalidatePath("/dashboard/absensi");
  revalidatePath("/dashboard/nilai");
  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function createStudent(formData: FormData) {
  const nama = String(formData.get("nama") ?? "").trim();
  const nis = String(formData.get("nis") ?? "").trim();
  const jenis_kelamin = String(formData.get("jenis_kelamin") ?? "").trim();
  const kelas_id = String(formData.get("kelas_id") ?? "").trim() || null;
  const orang_tua = String(formData.get("orang_tua") ?? "").trim();
  const hp = String(formData.get("hp") ?? "").trim();
  const foto = formData.get("foto");

  if (!nama) throw new Error("Nama santri wajib diisi.");
  if (!nis) throw new Error("NIS wajib diisi.");
  if (!["L", "P"].includes(jenis_kelamin)) throw new Error("Jenis kelamin tidak valid.");

  // Foto opsional. Kalau tidak ada file yang dipilih, browser tetap
  // mengirim field "foto" sebagai File kosong (size 0) — jadi dicek juga.
  let foto_url: string | null = null;
  if (foto instanceof File && foto.size > 0) {
    foto_url = await uploadStudentPhoto(foto);
  }

  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("students")
    .insert({ nama, nis, jenis_kelamin, kelas_id, orang_tua, hp, foto_url });

  if (error) {
    if (error.code === "23505") throw new Error("NIS sudah dipakai santri lain.");
    throw new Error(`Gagal menambah santri: ${error.message}`);
  }

  revalidateStudentPaths();
}

/**
 * Ganti foto santri yang sudah ada (dipakai tombol "Ubah foto" di tabel Data
 * Santri). Foto lama otomatis dihapus dari storage setelah foto baru
 * tersimpan, supaya tidak menumpuk file yatim di bucket.
 */
export async function updateStudentPhoto(id: string, formData: FormData) {
  const foto = formData.get("foto");
  if (!(foto instanceof File) || foto.size === 0) {
    throw new Error("Pilih file foto terlebih dahulu.");
  }

  const supabase = getSupabaseServer();
  const { data: existing, error: fetchError } = await supabase
    .from("students")
    .select("foto_url")
    .eq("id", id)
    .maybeSingle();
  if (fetchError) throw new Error(`Gagal memuat data santri: ${fetchError.message}`);

  const foto_url = await uploadStudentPhoto(foto);

  const { error } = await supabase.from("students").update({ foto_url }).eq("id", id);
  if (error) throw new Error(`Gagal memperbarui foto santri: ${error.message}`);

  await deleteStudentPhoto(existing?.foto_url as string | null | undefined);

  revalidateStudentPaths();
}

export async function updateStudent(id: string, formData: FormData) {
  const nama = String(formData.get("nama") ?? "").trim();
  const nis = String(formData.get("nis") ?? "").trim();
  const jenis_kelamin = String(formData.get("jenis_kelamin") ?? "").trim();
  const kelas_id = String(formData.get("kelas_id") ?? "").trim() || null;
  const orang_tua = String(formData.get("orang_tua") ?? "").trim();
  const hp = String(formData.get("hp") ?? "").trim();

  if (!nama) throw new Error("Nama santri wajib diisi.");
  if (!nis) throw new Error("NIS wajib diisi.");
  if (!["L", "P"].includes(jenis_kelamin)) throw new Error("Jenis kelamin tidak valid.");

  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("students")
    .update({ nama, nis, jenis_kelamin, kelas_id, orang_tua, hp })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") throw new Error("NIS sudah dipakai santri lain.");
    throw new Error(`Gagal memperbarui santri: ${error.message}`);
  }

  revalidateStudentPaths();
}

export async function deleteStudent(id: string) {
  const supabase = getSupabaseServer();

  const { data: existing } = await supabase
    .from("students")
    .select("foto_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("students").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus santri: ${error.message}`);

  await deleteStudentPhoto(existing?.foto_url as string | null | undefined);

  revalidateStudentPaths();
}
