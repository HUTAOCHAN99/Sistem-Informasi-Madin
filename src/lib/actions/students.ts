"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function createStudent(formData: FormData) {
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
    .insert({ nama, nis, jenis_kelamin, kelas_id, orang_tua, hp });

  if (error) {
    if (error.code === "23505") throw new Error("NIS sudah dipakai santri lain.");
    throw new Error(`Gagal menambah santri: ${error.message}`);
  }

  revalidatePath("/dashboard/santri");
  revalidatePath("/dashboard/kelas");
  revalidatePath("/dashboard/absensi");
  revalidatePath("/dashboard/nilai");
  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function deleteStudent(id: string) {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("students").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus santri: ${error.message}`);

  revalidatePath("/dashboard/santri");
  revalidatePath("/dashboard/kelas");
  revalidatePath("/dashboard/absensi");
  revalidatePath("/dashboard/nilai");
  revalidatePath("/dashboard");
  revalidatePath("/");
}
