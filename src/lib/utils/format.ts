export const NAMA_BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function namaBulan(bulan: number): string {
  return NAMA_BULAN[bulan - 1] ?? String(bulan);
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Bulan & tahun berjalan menurut timezone Asia/Jakarta. */
export function bulanTahunSekarang(): { bulan: number; tahun: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "numeric",
  }).formatToParts(new Date());

  const bulan = Number(parts.find((p) => p.type === "month")?.value ?? "1");
  const tahun = Number(parts.find((p) => p.type === "year")?.value ?? "2026");
  return { bulan, tahun };
}
