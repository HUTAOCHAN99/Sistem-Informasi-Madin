"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";

function revalidatePaymentPaths() {
  revalidatePath("/dashboard/spp");
  revalidatePath("/dashboard");
}

function toNominal(value: FormDataEntryValue | null): number {
  const n = Number(value);
  if (Number.isNaN(n) || n < 0) return 0;
  return n;
}

function readPaymentForm(formData: FormData) {
  const siswa_id = String(formData.get("siswa_id") ?? "").trim();
  const bulan = Number(formData.get("bulan"));
  const tahun = Number(formData.get("tahun"));
  const nominal = toNominal(formData.get("nominal"));
  const status = String(formData.get("status") ?? "Belum Lunas").trim();
  const tanggal_bayar = String(formData.get("tanggal_bayar") ?? "").trim() || null;
  const keterangan = String(formData.get("keterangan") ?? "").trim();

  if (!siswa_id) throw new Error("Santri wajib dipilih.");
  if (!Number.isInteger(bulan) || bulan < 1 || bulan > 12) throw new Error("Bulan tidak valid.");
  if (!Number.isInteger(tahun) || tahun < 2000 || tahun > 2100) throw new Error("Tahun tidak valid.");
  if (!["Lunas", "Belum Lunas"].includes(status)) throw new Error("Status tidak valid.");

  return { siswa_id, bulan, tahun, nominal, status, tanggal_bayar, keterangan };
}

export async function createPayment(formData: FormData) {
  const payload = readPaymentForm(formData);

  const supabase = getSupabaseServer();
  const { error } = await supabase.from("spp_payments").insert(payload);

  if (error) {
    if (error.code === "23505") {
      throw new Error("Data SPP santri ini untuk bulan & tahun tersebut sudah ada.");
    }
    throw new Error(`Gagal menambah data pembayaran SPP: ${error.message}`);
  }

  revalidatePaymentPaths();
}

export async function updatePayment(id: string, formData: FormData) {
  const payload = readPaymentForm(formData);

  const supabase = getSupabaseServer();
  const { error } = await supabase.from("spp_payments").update(payload).eq("id", id);

  if (error) {
    if (error.code === "23505") {
      throw new Error("Data SPP santri ini untuk bulan & tahun tersebut sudah ada.");
    }
    throw new Error(`Gagal memperbarui data pembayaran SPP: ${error.message}`);
  }

  revalidatePaymentPaths();
}

export async function deletePayment(id: string) {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("spp_payments").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus data pembayaran SPP: ${error.message}`);

  revalidatePaymentPaths();
}
