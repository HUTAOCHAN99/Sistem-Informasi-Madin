"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";

const HARI_VALID = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export async function createSchedule(formData: FormData) {
  const hari = String(formData.get("hari") ?? "").trim();
  const jam = String(formData.get("jam") ?? "").trim() || null;
  const mapel = String(formData.get("mapel") ?? "").trim() || null;
  const guru_id = String(formData.get("guru_id") ?? "").trim() || null;
  const kelas_id = String(formData.get("kelas_id") ?? "").trim() || null;

  if (!HARI_VALID.includes(hari)) throw new Error("Hari tidak valid.");
  // Jam, mata pelajaran, guru, dan kelas semuanya opsional (boleh kosong).
  // Kolom yang kosong tidak akan ditampilkan di jadwal landing page.

  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("schedule")
    .insert({ hari, jam, mapel, guru_id, kelas_id });
  if (error) throw new Error(`Gagal menambah jadwal: ${error.message}`);

  revalidatePath("/dashboard/jadwal");
  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function updateSchedule(id: string, formData: FormData) {
  const hari = String(formData.get("hari") ?? "").trim();
  const jam = String(formData.get("jam") ?? "").trim() || null;
  const mapel = String(formData.get("mapel") ?? "").trim() || null;
  const guru_id = String(formData.get("guru_id") ?? "").trim() || null;
  const kelas_id = String(formData.get("kelas_id") ?? "").trim() || null;

  if (!HARI_VALID.includes(hari)) throw new Error("Hari tidak valid.");
  // Jam, mata pelajaran, guru, dan kelas semuanya opsional (boleh kosong).

  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("schedule")
    .update({ hari, jam, mapel, guru_id, kelas_id })
    .eq("id", id);
  if (error) throw new Error(`Gagal memperbarui jadwal: ${error.message}`);

  revalidatePath("/dashboard/jadwal");
  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function deleteSchedule(id: string) {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("schedule").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus jadwal: ${error.message}`);

  revalidatePath("/dashboard/jadwal");
  revalidatePath("/dashboard");
  revalidatePath("/");
}
