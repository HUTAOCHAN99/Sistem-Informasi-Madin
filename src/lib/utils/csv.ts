// src/lib/utils/csv.ts
//
// Util pembuat file CSV yang rapi ketika dibuka di Microsoft Excel /
// Google Sheets — dipakai fitur "Cetak Excel" (mis. rekap SPP).
//
// Catatan desain:
// - Delimiter pakai titik-koma (;), bukan koma. Excel versi Indonesia
//   (locale id-ID) memakai koma sebagai pemisah desimal, jadi kalau CSV
//   dipisah koma, angka nominal & delimiter kolom jadi tercampur dan semua
//   data numpuk di satu kolom saat dibuka. Titik-koma aman untuk locale ID.
// - File diberi BOM UTF-8 (\uFEFF) di awal supaya Excel mendeteksi encoding
//   UTF-8 dengan benar (kalau tidak, karakter seperti "é" atau simbol Rupiah
//   bisa muncul sebagai karakter aneh).

const DELIMITER = ";";

/** Escape satu nilai sel sesuai aturan CSV (RFC 4180), pakai delimiter ";". */
function escapeCsvField(value: string | number | null | undefined): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (str.includes(DELIMITER) || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/** Satu baris CSV dari array nilai sel. */
export function csvRow(values: (string | number | null | undefined)[]): string {
  return values.map(escapeCsvField).join(DELIMITER);
}

/** Baris kosong, dipakai sebagai jarak antar-blok (judul, tabel, ringkasan). */
export function csvBlankRow(): string {
  return "";
}

/**
 * Gabungkan baris-baris CSV jadi satu string file lengkap dengan BOM UTF-8,
 * siap dikirim sebagai response file .csv.
 */
export function buildCsvFile(rows: string[]): string {
  return "\uFEFF" + rows.join("\r\n") + "\r\n";
}
