// src/app/api/export/spp/route.ts
//
// Endpoint untuk fitur "Cetak Excel" di halaman /dashboard/spp. Menghasilkan
// file .csv (dibuka rapi di Excel/Google Sheets) berisi rekap pembayaran SPP
// untuk satu periode (bulan & tahun), lengkap dengan judul, tanggal cetak,
// tabel data, dan ringkasan total di bagian bawah — supaya bisa langsung
// dicetak/dilampirkan tanpa perlu dirapikan manual dulu.
//
// Dijaga sesi admin yang sama seperti halaman dashboard lain (lihat
// middleware.ts), sebab route API tidak otomatis kena middleware itu kalau
// path-nya tidak match — jadi pengecekan sesi diulang di sini juga supaya
// data tidak bisa diunduh oleh yang belum login.

import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";
import { getPayments, getPaymentSummary } from "@/lib/data/payments";
import { matchQuery } from "@/lib/utils/search";
import { namaBulan } from "@/lib/utils/format";
import { buildCsvFile, csvBlankRow, csvRow } from "@/lib/utils/csv";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: "Belum login." }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const bulan = Number(searchParams.get("bulan"));
  const tahun = Number(searchParams.get("tahun"));
  const q = searchParams.get("q") ?? "";

  if (!Number.isInteger(bulan) || bulan < 1 || bulan > 12 || !Number.isInteger(tahun)) {
    return NextResponse.json({ error: "Parameter bulan/tahun tidak valid." }, { status: 400 });
  }

  const [allPayments, summary] = await Promise.all([
    getPayments(bulan, tahun),
    getPaymentSummary(bulan, tahun),
  ]);

  const payments = allPayments.filter((p) =>
    matchQuery(q, p.siswa, p.kelas, p.keterangan, p.status)
  );

  const periode = `${namaBulan(bulan)} ${tahun}`;
  const tanggalCetak = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  const rows: string[] = [];

  // --- Judul & meta ---
  rows.push(csvRow(["DATA PEMBAYARAN SPP"]));
  rows.push(csvRow([`Periode: ${periode}`]));
  rows.push(csvRow([`Dicetak: ${tanggalCetak} WIB`]));
  if (q.trim()) rows.push(csvRow([`Filter pencarian: "${q.trim()}"`]));
  rows.push(csvBlankRow());

  // --- Tabel data ---
  rows.push(
    csvRow(["No", "Nama Santri", "Kelas", "Nominal (Rp)", "Status", "Tanggal Bayar", "Keterangan"])
  );
  payments.forEach((p, i) => {
    rows.push(
      csvRow([
        i + 1,
        p.siswa,
        p.kelas,
        p.nominal,
        p.status,
        p.tanggal_bayar ?? "-",
        p.keterangan || "-",
      ])
    );
  });
  if (payments.length === 0) {
    rows.push(csvRow(["-", "Tidak ada data untuk periode/filter ini.", "", "", "", "", ""]));
  }

  // --- Ringkasan ---
  rows.push(csvBlankRow());
  rows.push(csvRow(["RINGKASAN"]));
  rows.push(csvRow(["Total Santri Tercatat", summary.totalSantri]));
  rows.push(csvRow(["Sudah Lunas", summary.jumlahLunas]));
  rows.push(csvRow(["Belum Lunas", summary.jumlahBelumLunas]));
  rows.push(csvRow(["Total Terkumpul (Rp)", summary.totalTerkumpul]));

  const csv = buildCsvFile(rows);
  const filename = `SPP-${namaBulan(bulan)}-${tahun}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
