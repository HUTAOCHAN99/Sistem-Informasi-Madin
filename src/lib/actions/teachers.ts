"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function createTeacher(formData: FormData) {
  const nama = String(formData.get("nama") ?? "").trim();
  const mapel = String(formData.get("mapel") ?? "").trim();
  const hp = String(formData.get("hp") ?? "").trim();

  if (!nama) throw new Error("Nama guru wajib diisi.");

  const supabase = getSupabaseServer();
  const { error } = await supabase.from("teachers").insert({ nama, mapel, hp });
  if (error) throw new Error(`Gagal menambah guru: ${error.message}`);

  revalidatePath("/dashboard/guru");
  revalidatePath("/dashboard/kelas");
  revalidatePath("/dashboard/jadwal");
  revalidatePath("/dashboard");
}

export async function deleteTeacher(id: string) {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("teachers").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus guru: ${error.message}`);

  revalidatePath("/dashboard/guru");
  revalidatePath("/dashboard/kelas");
  revalidatePath("/dashboard/jadwal");
  revalidatePath("/dashboard");
}
