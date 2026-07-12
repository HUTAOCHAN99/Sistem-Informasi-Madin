"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";

function toScore(value: FormDataEntryValue | null): number {
  const n = Number(value);
  if (Number.isNaN(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

export async function createGrade(formData: FormData) {
  const siswa_id = String(formData.get("siswa_id") ?? "").trim();
  const mapel = String(formData.get("mapel") ?? "").trim();
  const harian = toScore(formData.get("harian"));
  const uts = toScore(formData.get("uts"));
  const uas = toScore(formData.get("uas"));

  if (!siswa_id) throw new Error("Santri wajib dipilih.");
  if (!mapel) throw new Error("Mata pelajaran wajib diisi.");

  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("grades")
    .insert({ siswa_id, mapel, harian, uts, uas });
  if (error) throw new Error(`Gagal menambah nilai: ${error.message}`);

  revalidatePath("/dashboard/nilai");
}

export async function updateGrade(id: string, formData: FormData) {
  const siswa_id = String(formData.get("siswa_id") ?? "").trim();
  const mapel = String(formData.get("mapel") ?? "").trim();
  const harian = toScore(formData.get("harian"));
  const uts = toScore(formData.get("uts"));
  const uas = toScore(formData.get("uas"));

  if (!siswa_id) throw new Error("Santri wajib dipilih.");
  if (!mapel) throw new Error("Mata pelajaran wajib diisi.");

  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("grades")
    .update({ siswa_id, mapel, harian, uts, uas })
    .eq("id", id);
  if (error) throw new Error(`Gagal memperbarui nilai: ${error.message}`);

  revalidatePath("/dashboard/nilai");
}

export async function deleteGrade(id: string) {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("grades").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus nilai: ${error.message}`);

  revalidatePath("/dashboard/nilai");
}
