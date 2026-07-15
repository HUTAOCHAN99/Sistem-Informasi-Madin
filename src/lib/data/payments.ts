import "server-only";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { PaymentRow, PaymentStatus, PaymentSummary } from "@/lib/types";

type PaymentRowFromDb = {
  id: string;
  siswa_id: string;
  bulan: number;
  tahun: number;
  nominal: number;
  status: PaymentStatus;
  tanggal_bayar: string | null;
  keterangan: string;
  students: { nama: string; classes: { nama_kelas: string } | null } | null;
};

/**
 * Data pembayaran SPP untuk satu bulan & tahun tertentu, satu baris per
 * santri yang sudah punya catatan pembayaran (belum tentu semua santri —
 * catatan baru dibuat lewat tombol "Tambah Pembayaran").
 */
export async function getPayments(bulan: number, tahun: number): Promise<PaymentRow[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("spp_payments")
    .select(
      "id, siswa_id, bulan, tahun, nominal, status, tanggal_bayar, keterangan, students ( nama, classes ( nama_kelas ) )"
    )
    .eq("bulan", bulan)
    .eq("tahun", tahun);

  if (error) throw new Error(`Gagal memuat data pembayaran SPP: ${error.message}`);

  return ((data ?? []) as unknown as PaymentRowFromDb[])
    .map((p) => ({
      id: p.id,
      siswa_id: p.siswa_id,
      siswa: p.students?.nama ?? "-",
      kelas: p.students?.classes?.nama_kelas ?? "-",
      bulan: p.bulan,
      tahun: p.tahun,
      nominal: Number(p.nominal),
      status: p.status,
      tanggal_bayar: p.tanggal_bayar,
      keterangan: p.keterangan,
    }))
    .sort((a, b) => a.siswa.localeCompare(b.siswa));
}

/** Ringkasan pembayaran SPP bulan & tahun tertentu, dipakai kartu statistik. */
export async function getPaymentSummary(bulan: number, tahun: number): Promise<PaymentSummary> {
  const rows = await getPayments(bulan, tahun);
  const jumlahLunas = rows.filter((r) => r.status === "Lunas").length;
  return {
    totalSantri: rows.length,
    jumlahLunas,
    jumlahBelumLunas: rows.length - jumlahLunas,
    totalTerkumpul: rows.filter((r) => r.status === "Lunas").reduce((sum, r) => sum + r.nominal, 0),
  };
}
