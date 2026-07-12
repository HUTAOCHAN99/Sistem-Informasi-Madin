import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { Teacher, SelectOption } from "@/lib/types";

export async function getTeachers(): Promise<Teacher[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("teachers")
    .select("id, nama, mapel, hp, foto_url")
    .order("nama", { ascending: true });

  if (error) throw new Error(`Gagal memuat data guru: ${error.message}`);
  return (data ?? []) as Teacher[];
}

export async function getTeacherOptions(): Promise<SelectOption[]> {
  const teachers = await getTeachers();
  return teachers.map((t) => ({ id: t.id, label: t.nama }));
}

export async function getTeacherById(id: string): Promise<Teacher | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("teachers")
    .select("id, nama, mapel, hp, foto_url")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Gagal memuat data guru: ${error.message}`);
  return (data as Teacher) ?? null;
}
