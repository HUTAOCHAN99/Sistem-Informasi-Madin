export const dynamic = "force-dynamic";

import Topbar from "@/components/dashboard/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import DeleteButton from "@/components/dashboard/DeleteButton";
import EditModal from "@/components/dashboard/EditModal";
import AddPanel from "@/components/dashboard/AddPanel";
import SppPeriodPicker from "@/components/dashboard/SppPeriodPicker";
import CetakSppButton from "@/components/dashboard/CetakSppButton";
import AddSppForm from "@/components/dashboard/forms/AddSppForm";
import EditSppForm from "@/components/dashboard/forms/EditSppForm";
import { getPayments, getPaymentSummary } from "@/lib/data/payments";
import { getStudentOptions } from "@/lib/data/students";
import { deletePayment } from "@/lib/actions/payments";
import { matchQuery } from "@/lib/utils/search";
import { formatRupiah, namaBulan, bulanTahunSekarang } from "@/lib/utils/format";
import { Users, CheckCircle2, CircleDollarSign, Wallet } from "lucide-react";
import type { PaymentRow } from "@/lib/types";

export default async function SppPage({
  searchParams,
}: {
  searchParams: { bulan?: string; tahun?: string; q?: string };
}) {
  const now = bulanTahunSekarang();
  const bulan = Number(searchParams.bulan) || now.bulan;
  const tahun = Number(searchParams.tahun) || now.tahun;
  const q = searchParams.q ?? "";

  const [allPayments, summary, studentOptions] = await Promise.all([
    getPayments(bulan, tahun),
    getPaymentSummary(bulan, tahun),
    getStudentOptions(),
  ]);

  const payments = allPayments.filter((p) =>
    matchQuery(q, p.siswa, p.kelas, p.keterangan, p.status)
  );

  const columns: Column<PaymentRow>[] = [
    { key: "siswa", header: "Santri" },
    { key: "kelas", header: "Kelas" },
    {
      key: "nominal",
      header: "Nominal",
      render: (row) => formatRupiah(row.nominal),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <span
          className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
            row.status === "Lunas"
              ? "bg-madin-teal/10 text-madin-teal border-madin-teal/30"
              : "bg-amber-50 text-amber-600 border-amber-200"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "tanggal_bayar",
      header: "Tanggal Bayar",
      render: (row) => row.tanggal_bayar ?? "-",
    },
    {
      key: "keterangan",
      header: "Keterangan",
      render: (row) => row.keterangan || "-",
    },
    {
      key: "id",
      id: "aksi",
      header: "Aksi",
      render: (row) => (
        <div className="flex items-center gap-1">
          <EditModal title={`Edit SPP: ${row.siswa} - ${namaBulan(row.bulan)} ${row.tahun}`}>
            <EditSppForm payment={row} studentOptions={studentOptions} />
          </EditModal>
          <DeleteButton
            action={deletePayment.bind(null, row.id)}
            confirmText={`Hapus data SPP ${row.siswa} untuk ${namaBulan(row.bulan)} ${row.tahun}?`}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Topbar title="Pembayaran SPP" searchPlaceholder="Cari nama santri, kelas..." />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm font-medium text-madin-navy">
              Periode {namaBulan(bulan)} {tahun}
            </p>
            <p className="text-xs text-black/50 mt-0.5">
              Data pembayaran SPP santri per bulan.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SppPeriodPicker bulan={bulan} tahun={tahun} />
            <CetakSppButton bulan={bulan} tahun={tahun} q={q} />
            <AddPanel label="Tambah Pembayaran">
              <AddSppForm studentOptions={studentOptions} defaultBulan={bulan} defaultTahun={tahun} />
            </AddPanel>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Santri Tercatat" value={summary.totalSantri} />
          <StatCard icon={CheckCircle2} label="Sudah Lunas" value={summary.jumlahLunas} />
          <StatCard icon={Wallet} label="Belum Lunas" value={summary.jumlahBelumLunas} />
          <StatCard
            icon={CircleDollarSign}
            label="Total Terkumpul"
            value={formatRupiah(summary.totalTerkumpul)}
          />
        </div>

        <DataTable columns={columns} rows={payments} emptyMessage={q ? "Tidak ada data SPP yang cocok dengan pencarian." : "Belum ada data pembayaran untuk periode ini."} />
      </div>
    </>
  );
}
